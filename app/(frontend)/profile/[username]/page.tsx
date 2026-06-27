import { notFound } from "next/navigation";
import { getProfile } from "@/backend/services/profile-service";
import { getProfilePosts, getProfileReposts } from "@/backend/services/post-service";
import { getCurrentUserProfile } from "@/backend/services/profile-service";
import { getUserLikes, getUserReposts } from "@/backend/actions/post-actions";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { PostFeed } from "@/components/feed/PostFeed";
import { PostComposer } from "@/components/feed/PostComposer";

export const dynamic = "force-dynamic";

export default async function ProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;
  const [profile, ownPosts, reposts, currentUser] = await Promise.all([
    getProfile(username),
    getProfilePosts(username),
    getProfileReposts(username),
    getCurrentUserProfile(),
  ]);
  if (!profile) notFound();

  const allPosts = [...ownPosts, ...reposts].sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
  const postIds = allPosts.map((p) => p.id);
  const [likedPostIds, repostedPostIds] = currentUser
    ? await Promise.all([getUserLikes(postIds), getUserReposts(postIds)])
    : [[], []];

  const isOwnProfile = currentUser?.username === username;

  return (
    <div>
      <div className="sticky top-0 z-10 bg-black/80 backdrop-blur-md border-b border-neutral-900 px-4 py-4">
        <h2 className="text-base font-semibold text-white">{profile.display_name}</h2>
        <p className="text-neutral-500 text-xs">{ownPosts.length} posts</p>
      </div>
      <ProfileHeader profile={profile} postCount={ownPosts.length} />
      {isOwnProfile && currentUser && <PostComposer currentUser={currentUser} placeholder="Add a new post…" />}
      <PostFeed posts={allPosts} likedPostIds={likedPostIds} repostedPostIds={repostedPostIds} emptyMessage="No posts yet." />
    </div>
  );
}
