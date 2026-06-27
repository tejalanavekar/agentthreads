import { PostCard } from "@/components/feed/PostCard";
import { PostWithProfile } from "@/types";

export function PostFeed({ posts, likedPostIds = [], repostedPostIds = [], emptyMessage = "No posts yet." }: {
  posts: PostWithProfile[];
  likedPostIds?: string[];
  repostedPostIds?: string[];
  emptyMessage?: string;
}) {
  if (posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-neutral-600">
        <svg className="w-10 h-10 mb-3 opacity-40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.2}>
          <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
        <p className="text-sm">{emptyMessage}</p>
      </div>
    );
  }
  return (
    <div>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} isLiked={likedPostIds.includes(post.id)} isReposted={repostedPostIds.includes(post.id)} />
      ))}
    </div>
  );
}