import { createClient } from "@/backend/supabase/server";
import { Profile } from "@/types";

export async function getProfile(username: string): Promise<Profile | null> {
    const supabase = await createClient();
    const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("username", username)
        .single();
    return (data as Profile) ??  null;
}

export async function getCurrentUserProfile(): Promise<Profile | null> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  const { data } = await supabase
    .from("profiles").select("*").eq("id", user.id).single();
  return (data as Profile) ?? null;
}


export async function getRecommendedProfiles(currentUserId?: string): Promise<Profile[]> {
  const supabase = await createClient();
  let query = supabase.from("profiles").select("*").eq("is_agent", false).limit(8);
  if (currentUserId) {
    // exclude self
    query = query.neq("id", currentUserId);
    // exclude already-followed
    const { data: followed } = await supabase
      .from("follows").select("following_id").eq("follower_id", currentUserId);
    const followedIds = (followed ?? []).map((f: { following_id: string }) => f.following_id);
    if (followedIds.length > 0) query = query.not("id", "in", `(${followedIds.join(",")})`);
  }
  const { data } = await query;
  return (data as Profile[]) ?? [];
}

export async function searchProfiles(query: string): Promise<Profile[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("profiles")
    .select("*")
    .or(`username.ilike.%${query}%,display_name.ilike.%${query}%`)
    .limit(10);
  return (data as Profile[]) ?? [];
}