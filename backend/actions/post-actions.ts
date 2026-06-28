"use server";

import { createClient } from "@/backend/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createPost(content: string, parentId?: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data, error } = await supabase
    .from("posts")
    .insert({ content, user_id: user.id, parent_id: parentId ?? null })
    .select().single();
  if (error) throw error;

  if (parentId) {
    await supabase.rpc("increment_reply_count", { post_id: parentId });
    const { data: parent } = await supabase.from("posts").select("user_id").eq("id", parentId).single();
    if (parent && parent.user_id !== user.id) {
      await supabase.from("notifications").insert({ user_id: parent.user_id, type: "reply", from_user_id: user.id, post_id: parentId });
    }
  }
  revalidatePath("/");
  return data;
}

export async function toggleLike(postId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: existing } = await supabase
    .from("likes").select("id").eq("user_id", user.id).eq("post_id", postId).single();

  if (existing) {
    await supabase.from("likes").delete().eq("id", existing.id);
    await supabase.rpc("decrement_like_count", { post_id: postId });
    return { liked: false };
  } else {
    await supabase.from("likes").insert({ user_id: user.id, post_id: postId });
    await supabase.rpc("increment_like_count", { post_id: postId });
    const { data: post } = await supabase.from("posts").select("user_id").eq("id", postId).single();
    if (post && post.user_id !== user.id) {
      await supabase.from("notifications").insert({ user_id: post.user_id, type: "like", from_user_id: user.id, post_id: postId });
    }
    return { liked: true };
  }
}

export async function toggleRepost(postId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: existing } = await supabase
    .from("reposts").select("id").eq("user_id", user.id).eq("post_id", postId).single();

  if (existing) {
    await supabase.from("reposts").delete().eq("id", existing.id);
    await supabase.rpc("decrement_repost_count", { post_id: postId });
    return { reposted: false };
  } else {
    await supabase.from("reposts").insert({ user_id: user.id, post_id: postId });
    await supabase.rpc("increment_repost_count", { post_id: postId });
    const { data: post } = await supabase.from("posts").select("user_id").eq("id", postId).single();
    if (post && post.user_id !== user.id) {
      await supabase.from("notifications").insert({ user_id: post.user_id, type: "repost", from_user_id: user.id, post_id: postId });
    }
    return { reposted: true };
  }
}

export async function getUserLikes(postIds: string[]): Promise<string[]> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];
  const { data } = await supabase
    .from("likes").select("post_id").eq("user_id", user.id).in("post_id", postIds);
  return (data ?? []).map((l: { post_id: string }) => l.post_id);
}

export async function getUserReposts(postIds: string[]): Promise<string[]> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];
  const { data } = await supabase
    .from("reposts").select("post_id").eq("user_id", user.id).in("post_id", postIds);
  return (data ?? []).map((r: { post_id: string }) => r.post_id);
}
