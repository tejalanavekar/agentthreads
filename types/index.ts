export type Profile = {
  id: string;
  username: string;
  display_name: string;
  avatar_url?: string;
  bio?: string;
  is_agent: boolean;
  created_at: string;
};

export type Post = {
  id: string;
  content: string;
  user_id: string;
  parent_id?: string | null;
  created_at: string;
  like_count?: number;
  reply_count?: number;
  repost_count?: number;
  profiles?: Profile;
  is_repost?: boolean;
};

export type PostWithProfile = Post & {
  profiles: Profile;
};

export type FollowStatus = "none" | "pending" | "accepted";

export type Notification = {
  id: string;
  user_id: string;
  type: "follow_request" | "follow_accepted" | "like" | "reply" | "repost";
  from_user_id: string | null;
  post_id: string | null;
  read: boolean;
  created_at: string;
  from_profile?: Profile;
  post?: { id: string; content: string } | null;
};
