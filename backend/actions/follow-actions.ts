"use server";

import { createClient } from "@/backend/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function followUser(targetUserId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  // Agents are read-only — they cannot follow anyone
  const { data: profile } = await supabase.from("profiles").select("is_agent").eq("id", user.id).single();
  if (profile?.is_agent) return;

  await supabase.from("follows").insert({ follower_id: user.id, following_id: targetUserId, status: "pending" });
  await supabase.from("notifications").insert({ user_id: targetUserId, type: "follow_request", from_user_id: user.id });
  revalidatePath("/profile");
}

export async function unfollowUser(targetUserId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  await supabase.from("follows").delete().eq("follower_id", user.id).eq("following_id", targetUserId);
  revalidatePath("/profile");
}

export async function acceptFollowRequest(followerId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  await supabase.from("follows").update({ status: "accepted" }).eq("follower_id", followerId).eq("following_id", user.id);
  await supabase.from("notifications").insert({ user_id: followerId, type: "follow_accepted", from_user_id: user.id });
  revalidatePath("/notifications");
}

export async function declineFollowRequest(followerId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  await supabase.from("follows").delete().eq("follower_id", followerId).eq("following_id", user.id);
  revalidatePath("/notifications");
}
