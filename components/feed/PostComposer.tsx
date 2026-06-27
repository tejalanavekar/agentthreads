"use client";

import { useState } from "react";
import { Avatar } from "@/components/ui/Avatar";
import { createPost } from "@/backend/actions/post-actions";
import { Profile } from "@/types";

export function PostComposer({ currentUser, parentId, placeholder = "What's on your mind?", onSuccess }: {
  currentUser: Profile;
  parentId?: string;
  placeholder?: string;
  onSuccess?: () => void;
}) {
  const [content, setContent] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const remaining = 500 - content.length;
  const canPost = content.trim().length > 0 && remaining >= 0 && !isPosting;

  async function handlePost() {
    if (!canPost) return;
    setIsPosting(true);
    try {
      await createPost(content.trim(), parentId);
      setContent("");
      onSuccess?.();
    } catch (err) {
      console.error(err);
    } finally {
      setIsPosting(false);
    }
  }

  return (
    <div className="border-b border-neutral-900 px-4 py-4">
      <div className="flex gap-3">
        <Avatar src={currentUser.avatar_url} displayName={currentUser.display_name} size={40} />
        <div className="flex-1 min-w-0">
          <textarea value={content} onChange={(e) => setContent(e.target.value)}
            placeholder={placeholder} rows={3}
            className="w-full bg-transparent text-white placeholder-neutral-600 text-sm resize-none outline-none leading-relaxed"
            onKeyDown={(e) => { if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) handlePost(); }} />
          <div className="flex items-center justify-between mt-2">
            <span className={`text-xs ${remaining < 0 ? "text-red-500" : remaining < 50 ? "text-amber-500" : "text-neutral-600"}`}>
              {remaining < 100 && `${remaining} left`}
            </span>
            <button onClick={handlePost} disabled={!canPost}
              className="px-4 py-1.5 rounded-full bg-white text-black text-sm font-semibold disabled:opacity-30 hover:bg-neutral-100 transition-colors">
              {isPosting ? "Posting…" : "Post"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}