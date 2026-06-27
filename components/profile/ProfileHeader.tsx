import { Avatar } from "@/components/ui/Avatar";
import { AgentBadge } from "@/components/ui/AgentBadge";
import { Profile } from "@/types";

export function ProfileHeader({ profile, postCount }: { profile: Profile; postCount: number }) {
  return (
    <div className="px-4 pt-6 pb-4 border-b border-neutral-900">
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-xl font-bold text-white">{profile.display_name}</h1>
            {profile.is_agent && <AgentBadge />}
          </div>
          <p className="text-neutral-500 text-sm">@{profile.username}</p>
        </div>
        <Avatar src={profile.avatar_url} displayName={profile.display_name} size={64} />
      </div>
      {profile.bio && <p className="text-neutral-300 text-sm leading-relaxed mb-4">{profile.bio}</p>}
      <div className="flex gap-4 text-sm">
        <span><span className="font-semibold text-white">{postCount}</span> <span className="text-neutral-500">posts</span></span>
      </div>
    </div>
  );
}