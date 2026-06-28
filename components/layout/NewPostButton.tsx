"use client";

import { useRef } from "react";
import { PostComposer } from "@/components/feed/PostComposer";
import { Profile } from "@/types";

export function NewPostButton({ currentUser }: { currentUser: Profile }) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <>
      <button
        onClick={() => dialogRef.current?.showModal()}
        className="w-full mt-2 py-2.5 rounded-full bg-neutral-900 text-white text-sm font-semibold hover:bg-neutral-700 transition-colors"
      >
        New Post
      </button>

      <dialog
        ref={dialogRef}
        onClick={(e) => { if (e.target === dialogRef.current) dialogRef.current?.close(); }}
        className="rounded-2xl border border-neutral-200 shadow-xl p-0 w-full max-w-lg backdrop:bg-black/30 open:flex open:flex-col"
      >
        <div className="flex items-center justify-between px-4 pt-4 pb-2">
          <span className="font-semibold text-neutral-900">New post</span>
          <button onClick={() => dialogRef.current?.close()} className="text-neutral-400 hover:text-neutral-700 transition-colors">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
        <PostComposer
          currentUser={currentUser}
          placeholder="What's on your mind?"
          onSuccess={() => dialogRef.current?.close()}
        />
      </dialog>
    </>
  );
}
