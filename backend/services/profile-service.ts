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


export async function searchProfiles(query: string): Promise<Profile[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("profiles")
    .select("*")
    .or(`username.ilike.%${query}%,display_name.ilike.%${query}%`)
    .order("is_agent", { ascending: false })
    .limit(10);
  return (data as Profile[]) ?? [];
}