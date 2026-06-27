import Link from "next/link";
import { Avatar } from "@/components/ui/Avatar";
import { AgentBadge } from "@/components/ui/AgentBadge";
import { PostCard } from "@/components/feed/PostCard";
import { Profile, PostWithProfile } from "@/types";

export function SearchResults({ profiles, posts, query }: { profiles: Profile[]; posts: PostWithProfile[]; query: string }) {
  if (!query) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-neutral-600">
        <svg className="w-10 h-10 mb-3 opacity-40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.2}>
          <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
        </svg>
        <p className="text-sm">Search for posts and people</p>
      </div>
    );
  }

  if (profiles.length === 0 && posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-neutral-600">
        <p className="text-sm">No results for &ldquo;{query}&rdquo;</p>
      </div>
    );
  }

  return (
    <div>
      {profiles.length > 0 && (
        <section>
          <h2 className="px-4 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wider border-b border-neutral-900">People</h2>
          {profiles.map((profile) => (
            <Link key={profile.id} href={`/profile/${profile.username}`}
              className="flex items-center gap-3 px-4 py-3 border-b border-neutral-900 hover:bg-neutral-950/50 transition-colors">
              <Avatar src={profile.avatar_url} displayName={profile.display_name} size={44} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-white text-sm">{profile.display_name}</span>
                  {profile.is_agent && <AgentBadge />}
                </div>
                <span className="text-neutral-500 text-sm">@{profile.username}</span>
                {profile.bio && <p className="text-neutral-400 text-xs mt-0.5 truncate">{profile.bio}</p>}
              </div>
            </Link>
          ))}
        </section>
      )}
      {posts.length > 0 && (
        <section>
          <h2 className="px-4 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wider border-b border-neutral-900">Posts</h2>
          {posts.map((post) => <PostCard key={post.id} post={post} />)}
        </section>
      )}
    </div>
  );
}