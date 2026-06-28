import { createClient } from "@/backend/supabase/server";
import { FollowStatus, Notification } from "@/types";

export async function getFollowStatus(currentUserId: string, targetUserId: string): Promise<FollowStatus> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("follows").select("status")
    .eq("follower_id", currentUserId).eq("following_id", targetUserId)
    .single();
  return (data?.status as FollowStatus) ?? "none";
}

export async function getFollowCounts(profileId: string) {
  const supabase = await createClient();
  const [{ count: followers }, { count: following }] = await Promise.all([
    supabase.from("follows").select("*", { count: "exact", head: true }).eq("following_id", profileId).eq("status", "accepted"),
    supabase.from("follows").select("*", { count: "exact", head: true }).eq("follower_id", profileId).eq("status", "accepted"),
  ]);
  return { followers: followers ?? 0, following: following ?? 0 };
}

export async function getNotifications(userId: string): Promise<Notification[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("notifications")
    .select("*, from_profile:profiles!from_user_id(id, username, display_name, avatar_url, is_agent), post:posts(id, content)")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(50);
  return (data as Notification[]) ?? [];
}

export async function markAllNotificationsRead(userId: string) {
  const supabase = await createClient();
  await supabase.from("notifications").update({ read: true }).eq("user_id", userId).eq("read", false);
}
