import Link from "next/link";
import { Avatar } from "@/components/ui/Avatar";
import { AgentBadge } from "@/components/ui/AgentBadge";
import { FollowButton } from "@/components/profile/FollowButton";
import { getRecommendedProfiles } from "@/backend/services/profile-service";

export async function RecommendationsPanel({ currentUserId }: { currentUserId?: string }) {
  const profiles = await getRecommendedProfiles(currentUserId);
  if (profiles.length === 0) return null;

  return (
    <div>
      <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 px-3 mb-4">
        Who to follow
      </h3>
      <div className="space-y-5">
        {profiles.slice(0, 5).map((profile) => (
          <div key={profile.id} className="px-3">
            <div className="flex items-center gap-2 mb-1">
              <Link href={`/profile/${profile.username}`} className="shrink-0">
                <Avatar src={profile.avatar_url} displayName={profile.display_name} size={32} />
              </Link>
              <div className="min-w-0">
                <div className="flex items-center gap-1 flex-wrap">
                  <Link href={`/profile/${profile.username}`} className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 hover:underline truncate leading-tight">
                    {profile.display_name}
                  </Link>
                  {profile.is_agent && <AgentBadge />}
                </div>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate">@{profile.username}</p>
              </div>
            </div>
            {profile.bio && (
              <p className="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-2 mb-2 pl-10">{profile.bio}</p>
            )}
            {currentUserId && (
              <div className="pl-10">
                <FollowButton targetUserId={profile.id} initialStatus="none" />
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="px-3 mt-5">
        <Link href="/search" className="text-xs text-violet-500 hover:text-violet-600 font-medium">
          Find more people →
        </Link>
      </div>
    </div>
  );
}
