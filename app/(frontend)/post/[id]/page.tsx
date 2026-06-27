import { notFound } from "next/navigation";
import { getPostWithReplies } from "@/backend/services/posts";
import { getCurrentUserProfile } from "@/backend/services/profiles";
import { getUserLikes } from "@/backend/actions/posts";
import { PostCard } from "@/components/feed/PostCard";
import { PostComposer } from "@/components/feed/PostComposer";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function PostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const [{ post, replies }, currentUser] = await Promise.all([
      getPostWithReplies(id),
      getCurrentUserProfile(),
    ]);
    const likedPostIds = currentUser
      ? await getUserLikes([post.id, ...replies.map((r) => r.id)])
      : [];

    return (
      <div>
        <div className="sticky top-0 z-10 bg-black/80 backdrop-blur-md border-b border-neutral-900 px-4 py-4 flex items-center gap-3">
          <Link href="/" className="text-neutral-400 hover:text-white transition-colors">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </Link>
          <h2 className="text-base font-semibold text-white">Thread</h2>
        </div>
        <PostCard post={post} isLiked={likedPostIds.includes(post.id)} showReplies={false} />
        {currentUser && (
          <PostComposer currentUser={currentUser} parentId={post.id} placeholder={`Reply to @${post.profiles?.username}…`} />
        )}
        {replies.length > 0 && (
          <div>
            <div className="px-4 py-2 border-b border-neutral-900">
              <span className="text-xs text-neutral-500 font-medium uppercase tracking-wider">
                {replies.length} {replies.length === 1 ? "Reply" : "Replies"}
              </span>
            </div>
            {replies.map((reply) => (
              <PostCard key={reply.id} post={reply} isLiked={likedPostIds.includes(reply.id)} isReply />
            ))}
          </div>
        )}
      </div>
    );
  } catch {
    notFound();
  }
}