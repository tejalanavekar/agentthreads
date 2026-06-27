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
  const profile = post.profiles;
  const timeAgo = formatDistanceToNow(new Date(post.created_at), { addSuffix: true });

  async function handleLike() {
    if (isActing) return;
    setIsActing(true);
    setLiked(!liked);
    setLikeCount((c) => (liked ? c - 1 : c + 1));
    try {
      await toggleLike(post.id);
    } catch {
      setLiked(liked);
      setLikeCount((c) => (liked ? c + 1 : c - 1));
    } finally {
      setIsActing(false);
    }
  }

  async function handleRepost() {
    if (isActing) return;
    setIsActing(true);
    setReposted(!reposted);
    setRepostCount((c) => (reposted ? c - 1 : c + 1));
    try {
      await toggleRepost(post.id);
    } catch {
      setReposted(reposted);
      setRepostCount((c) => (reposted ? c + 1 : c - 1));
    } finally {
      setIsActing(false);
    }
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
    <article className={`px-4 py-4 border-b border-neutral-900 hover:bg-neutral-950/50 transition-colors ${isReply ? "pl-14" : ""}`}>
      {post.is_repost && (
        <div className="flex items-center gap-1.5 text-xs text-neutral-500 mb-2 pl-1">
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M17 1l4 4-4 4M3 11V9a4 4 0 014-4h14M7 23l-4-4 4-4M21 13v2a4 4 0 01-4 4H3" />
          </svg>
          Reposted
        </div>
      )}
      <div className="flex gap-3">
        <Link href={`/profile/${profile?.username}`} className="shrink-0">
          <Avatar src={profile?.avatar_url} displayName={profile?.display_name ?? "?"} size={40} />
        </Link>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <Link href={`/profile/${profile?.username}`} className="font-semibold text-white hover:underline truncate">
              {profile?.display_name}
            </Link>
            {profile?.is_agent && <AgentBadge />}
            <Link href={`/profile/${profile?.username}`} className="text-neutral-500 text-sm truncate">
              @{profile?.username}
            </Link>
            <span className="text-neutral-600 text-sm ml-auto shrink-0">{timeAgo}</span>
          </div>
          <p className="mt-1.5 text-neutral-200 text-sm leading-relaxed whitespace-pre-wrap break-words">
            {post.content}
          </p>
          <div className="flex items-center gap-5 mt-3">
            {/* Like */}
            <button onClick={handleLike}
              className={`flex items-center gap-1.5 text-sm transition-colors ${liked ? "text-rose-500" : "text-neutral-500 hover:text-rose-400"}`}>
              <svg className="w-4 h-4" viewBox="0 0 20 20" fill={liked ? "currentColor" : "none"} stroke="currentColor" strokeWidth={1.5}>
                <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
              </svg>
              {likeCount > 0 && <span>{likeCount}</span>}
            </button>

            {/* Reply */}
            {showReplies && (
              <Link href={`/post/${post.id}`}
                className="flex items-center gap-1.5 text-sm text-neutral-500 hover:text-sky-400 transition-colors">
                <svg className="w-4 h-4" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.5}>
                  <path d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7z" />
                </svg>
                {(post.reply_count ?? 0) > 0 && <span>{post.reply_count}</span>}
              </Link>
            )}

            {/* Repost */}
            <button onClick={handleRepost}
              className={`flex items-center gap-1.5 text-sm transition-colors ${reposted ? "text-emerald-500" : "text-neutral-500 hover:text-emerald-400"}`}>
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
                <path d="M17 1l4 4-4 4M3 11V9a4 4 0 014-4h14M7 23l-4-4 4-4M21 13v2a4 4 0 01-4 4H3" />
              </svg>
              {repostCount > 0 && <span>{repostCount}</span>}
            </button>

            {/* Share */}
            <button onClick={handleShare}
              className="flex items-center gap-1.5 text-sm text-neutral-500 hover:text-neutral-300 transition-colors">
              {copied ? (
                <span className="text-xs text-emerald-400">Copied!</span>
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
