"use client";

import Link from "next/link";
import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { Avatar } from "@/components/ui/Avatar";
import { AgentBadge } from "@/components/ui/AgentBadge";
import { toggleLike, toggleRepost } from "@/backend/actions/post-actions";
import { PostWithProfile } from "@/types";

interface PostCardProps {
  post: PostWithProfile;
  isLiked?: boolean;
  isReposted?: boolean;
  showReplies?: boolean;
  isReply?: boolean;
}

export function PostCard({ post, isLiked = false, isReposted = false, showReplies = true, isReply = false }: PostCardProps) {
  const [liked, setLiked] = useState(isLiked);
  const [likeCount, setLikeCount] = useState(post.like_count ?? 0);
  const [reposted, setReposted] = useState(isReposted);
  const [repostCount, setRepostCount] = useState(post.repost_count ?? 0);
  const [isActing, setIsActing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showRepostMenu, setShowRepostMenu] = useState(false);
  const profile = post.profiles;
  const timeAgo = formatDistanceToNow(new Date(post.created_at), { addSuffix: true });

  async function handleLike() {
    if (isActing) return;
    setIsActing(true);
    setLiked(!liked);
    setLikeCount((c) => (liked ? c - 1 : c + 1));
    try { await toggleLike(post.id); }
    catch { setLiked(liked); setLikeCount((c) => (liked ? c + 1 : c - 1)); }
    finally { setIsActing(false); }
  }

  async function handleRepost() {
    if (isActing) return;
    setIsActing(true);
    setReposted(!reposted);
    setRepostCount((c) => (reposted ? c - 1 : c + 1));
    try { await toggleRepost(post.id); }
    catch { setReposted(reposted); setRepostCount((c) => (reposted ? c + 1 : c - 1)); }
    finally { setIsActing(false); }
  }

  async function handleShare() {
    const url = `${window.location.origin}/post/${post.id}`;
    if (navigator.share) {
      await navigator.share({ url }).catch(() => {});
    } else {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <article className={`px-4 py-4 border-b border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors ${isReply ? "pl-14" : ""}`}>
      {post.is_repost && (
        <div className="flex items-center gap-1.5 text-xs text-neutral-400 mb-2 pl-1">
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M17 1l4 4-4 4M3 11V9a4 4 0 014-4h14M7 23l-4-4 4-4M21 13v2a4 4 0 01-4 4H3" />
          </svg>
          Reposted
        </div>
      )}
      {post.parent_id && (
        <Link href={`/post/${post.parent_id}`} className="flex items-center gap-1.5 text-xs text-neutral-400 hover:text-violet-500 transition-colors mb-2 pl-1">
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
          </svg>
          View thread
        </Link>
      )}
      <div className="flex gap-3">
        <Link href={`/profile/${profile?.username}`} className="shrink-0">
          <Avatar src={profile?.avatar_url} displayName={profile?.display_name ?? "?"} size={40} />
        </Link>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <Link href={`/profile/${profile?.username}`} className="font-semibold text-neutral-900 dark:text-neutral-100 hover:underline truncate">
              {profile?.display_name}
            </Link>
            {profile?.is_agent && <AgentBadge />}
            <Link href={`/profile/${profile?.username}`} className="text-neutral-500 text-sm truncate">
              @{profile?.username}
            </Link>
            <span className="text-neutral-400 text-sm ml-auto shrink-0">{timeAgo}</span>
          </div>
          <p className="mt-1.5 text-neutral-700 dark:text-neutral-300 text-sm leading-relaxed whitespace-pre-wrap break-words">
            {post.content}
          </p>
          <div className="flex items-center gap-5 mt-3">
            <button onClick={handleLike}
              className={`flex items-center gap-1.5 text-sm transition-colors ${liked ? "text-rose-500" : "text-neutral-400 hover:text-rose-500"}`}>
              <svg className="w-4 h-4" viewBox="0 0 20 20" fill={liked ? "currentColor" : "none"} stroke="currentColor" strokeWidth={1.5}>
                <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
              </svg>
              {likeCount > 0 && <span>{likeCount}</span>}
            </button>

            {showReplies && (
              <Link href={`/post/${post.id}`}
                className="flex items-center gap-1.5 text-sm text-neutral-400 hover:text-sky-500 transition-colors">
                <svg className="w-4 h-4" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.5}>
                  <path d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7z" />
                </svg>
                {(post.reply_count ?? 0) > 0 && <span>{post.reply_count}</span>}
              </Link>
            )}

            <div className="relative">
              <button onClick={() => setShowRepostMenu(true)}
                className={`flex items-center gap-1.5 text-sm transition-colors ${reposted ? "text-emerald-600" : "text-neutral-400 hover:text-emerald-600"}`}>
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
                  <path d="M17 1l4 4-4 4M3 11V9a4 4 0 014-4h14M7 23l-4-4 4-4M21 13v2a4 4 0 01-4 4H3" />
                </svg>
                {repostCount > 0 && <span>{repostCount}</span>}
              </button>
              {showRepostMenu && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setShowRepostMenu(false)} />
                  <div className="absolute bottom-7 left-0 z-20 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-xl shadow-lg overflow-hidden min-w-[140px]">
                    {reposted ? (
                      <button onClick={() => { handleRepost(); setShowRepostMenu(false); }}
                        className="w-full text-left px-4 py-3 text-sm text-rose-500 font-medium hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors">
                        Undo repost
                      </button>
                    ) : (
                      <button onClick={() => { handleRepost(); setShowRepostMenu(false); }}
                        className="w-full text-left px-4 py-3 text-sm font-medium text-neutral-900 dark:text-neutral-100 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors">
                        Repost
                      </button>
                    )}
                  </div>
                </>
              )}
            </div>

            <button onClick={handleShare}
              className="flex items-center gap-1.5 text-sm text-neutral-400 hover:text-neutral-700 transition-colors">
              {copied ? (
                <span className="text-xs text-emerald-600">Copied!</span>
              ) : (
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
                  <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
