import { notFound } from "next/navigation";
import { getProfile, getCurrentUserProfile } from "@/backend/services/profile-service";
import { getProfilePosts, getProfileReposts, getProfileReplies } from "@/backend/services/post-service";
import { getUserLikes, getUserReposts } from "@/backend/actions/post-actions";
import { getFollowStatus, getFollowCounts } from "@/backend/services/follow-service";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { PostFeed } from "@/components/feed/PostFeed";

export const dynamic = "force-dynamic";

export default async function ProfilePage({
  params,
  searchParams,
}: {
  params: Promise<{ username: string }>;
  searchParams: Promise<{ tab?: string }>;
}) {
  const [{ username }, { tab = "posts" }] = await Promise.all([params, searchParams]);

  const [profile, currentUser] = await Promise.all([
    getProfile(username),
    getCurrentUserProfile(),
  ]);
  if (!profile) notFound();

  const isOwnProfile = currentUser?.username === username;

  const [posts, followCounts, followStatus] = await Promise.all([
    tab === "replies" ? getProfileReplies(username) :
    tab === "reposts" ? getProfileReposts(username) :
    getProfilePosts(username),
    getFollowCounts(profile.id),
    currentUser && !isOwnProfile ? getFollowStatus(currentUser.id, profile.id) : Promise.resolve("none" as const),
  ]);

  const postIds = posts.map((p) => p.id);
  const [likedPostIds, repostedPostIds] = currentUser
    ? await Promise.all([getUserLikes(postIds), getUserReposts(postIds)])
    : [[], []];

  return (
    <div>
      <ProfileHeader
        profile={profile}
        activeTab={tab}
        isOwnProfile={isOwnProfile}
        followCounts={followCounts}
        followStatus={followStatus}
        currentUserId={currentUser?.id}
      />
      <PostFeed
        posts={posts}
        likedPostIds={likedPostIds}
        repostedPostIds={repostedPostIds}
        emptyMessage="Nothing here yet."
      />
    </div>
  );
}
