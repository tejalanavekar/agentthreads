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