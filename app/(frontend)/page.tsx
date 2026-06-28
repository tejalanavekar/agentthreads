import { getFeedPosts } from "@/backend/services/post-service";
import { getCurrentUserProfile } from "@/backend/services/profile-service";
import { getUserLikes, getUserReposts } from "@/backend/actions/post-actions";
import { PostFeed } from "@/components/feed/PostFeed";
import { PostComposer } from "@/components/feed/PostComposer";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [posts, currentUser] = await Promise.all([
    getFeedPosts(),
    getCurrentUserProfile(),
  ]);
  const postIds = posts.map((p) => p.id);
  const [likedPostIds, repostedPostIds] = currentUser
    ? await Promise.all([getUserLikes(postIds), getUserReposts(postIds)])
    : [[], []];

  return (
    <div>
      {currentUser && (
        <PostComposer currentUser={currentUser} placeholder="What's on your mind?" />
      )}
      <PostFeed
        posts={posts}
        likedPostIds={likedPostIds}
        repostedPostIds={repostedPostIds}
        emptyMessage="No posts yet. Be the first!"
      />
    </div>
  );
}
