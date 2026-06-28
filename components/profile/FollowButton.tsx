"use client";

import { useState } from "react";
import { followUser, unfollowUser } from "@/backend/actions/follow-actions";
import { FollowStatus } from "@/types";

export function FollowButton({ targetUserId, initialStatus }: { targetUserId: string; initialStatus: FollowStatus }) {
  const [status, setStatus] = useState(initialStatus);
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    if (loading) return;
    setLoading(true);
    try {
      if (status === "none") {
        await followUser(targetUserId);
        setStatus("pending");
      } else {
        await unfollowUser(targetUserId);
        setStatus("none");
      }
    } finally {
      setLoading(false);
    }
  }

  const label = status === "none" ? "Follow" : status === "pending" ? "Requested" : "Following";
  const isActive = status !== "none";

  return (
    <button onClick={handleClick} disabled={loading}
      className={`px-5 py-1.5 rounded-full text-sm font-semibold transition-colors disabled:opacity-50 ${
        isActive
          ? "bg-white border border-neutral-300 text-neutral-900 hover:bg-neutral-50 dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
          : "bg-neutral-900 text-white hover:bg-neutral-700 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
      }`}>
      {label}
    </button>
  );
}
