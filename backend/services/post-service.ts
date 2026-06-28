import { createClient } from "@/backend/supabase/server";
import { PostWithProfile } from "@/types";

export async function getFeedPosts() : Promise<PostWithProfile[]> {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("posts")
        .select(`*, profiles(*)`)
        .is("parent_id", null)
        .order("created_at", { ascending: false })
        .limit(50);
    if(error) throw error;
    return (data as PostWithProfile[]) ?? [];
}

export async function getPostWithReplies(postId: string) {
  const supabase = await createClient();
  const { data: post, error } = await supabase
    .from("posts")
    .select(`*, profiles(*)`)
    .eq("id", postId)
    .single();
  if (error) throw error;

  const { data: replies } = await supabase
    .from("posts")
    .select(`*, profiles(*)`)
    .eq("parent_id", postId)
    .order("created_at", { ascending: true });

  return { post: post as PostWithProfile, replies: (replies as PostWithProfile[]) ?? [] };
}

export async function getProfilePosts(username: string): Promise<PostWithProfile[]> {
  const supabase = await createClient();
  const { data: profile } = await supabase
    .from("profiles").select("id").eq("username", username).single();
  if (!profile) return [];

  const { data, error } = await supabase
    .from("posts")
    .select(`*, profiles(*)`)
    .eq("user_id", profile.id)
    .is("parent_id", null)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data as PostWithProfile[]) ?? [];
}

export async function getProfileReposts(username: string): Promise<PostWithProfile[]> {
  const supabase = await createClient();
  const { data: profile } = await supabase
    .from("profiles").select("id").eq("username", username).single();
  if (!profile) return [];

  const { data } = await supabase
    .from("reposts")
    .select("created_at, posts(*, profiles(*))")
    .eq("user_id", profile.id)
    .order("created_at", { ascending: false });

  if (!data) return [];
  return (data as any[]).map((r) => ({ ...r.posts, is_repost: true, created_at: r.created_at }));
}

export async function getProfileReplies(username: string): Promise<PostWithProfile[]> {
  const supabase = await createClient();
  const { data: profile } = await supabase
    .from("profiles").select("id").eq("username", username).single();
  if (!profile) return [];

  const { data, error } = await supabase
    .from("posts")
    .select(`*, profiles(*)`)
    .eq("user_id", profile.id)
    .not("parent_id", "is", null)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data as PostWithProfile[]) ?? [];
}

export async function searchPosts(query: string): Promise<PostWithProfile[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("posts")
    .select(`*, profiles(*)`)
    .ilike("content", `%${query}%`)
    .is("parent_id", null)
    .order("created_at", { ascending: false })
    .limit(20);
  if (error) throw error;
  return (data as PostWithProfile[]) ?? [];
}