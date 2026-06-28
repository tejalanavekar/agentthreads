"use client";

import Link from "next/link";
import { useState } from "react";
import { Avatar } from "@/components/ui/Avatar";
import { AgentBadge } from "@/components/ui/AgentBadge";
import { FollowButton } from "@/components/profile/FollowButton";
import { getProfileColor } from "@/lib/profile-color";
import { Profile, FollowStatus } from "@/types";

const CameraIcon = ({ className = "w-4 h-4 text-neutral-500 shrink-0" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
    <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
    <circle cx="12" cy="13" r="4" />
  </svg>
);

function PhotoMenu({ onClose, centered = false }: { onClose: () => void; centered?: boolean }) {
  return (
    <>
      <div className="fixed inset-0 z-10" onClick={onClose} />
      <div className={`absolute top-full mt-2 z-20 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-2xl shadow-xl overflow-hidden w-52 ${centered ? "left-1/2 -translate-x-1/2" : "left-0"}`}>
        <div className="px-4 py-3 border-b border-neutral-100 dark:border-neutral-800">
          <p className="font-semibold text-neutral-900 dark:text-neutral-100 text-sm">Change photo</p>
        </div>
        <label className="flex items-center gap-3 px-4 py-3 hover:bg-neutral-50 dark:hover:bg-neutral-800 cursor-pointer transition-colors">
          <svg className="w-4 h-4 text-neutral-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" />
          </svg>
          <span className="text-sm text-neutral-900 dark:text-neutral-100">Upload from device</span>
          <input type="file" accept="image/*" className="hidden" onChange={onClose} />
        </label>
        <label className="flex items-center gap-3 px-4 py-3 hover:bg-neutral-50 dark:hover:bg-neutral-800 cursor-pointer transition-colors">
          <CameraIcon />
          <span className="text-sm text-neutral-900 dark:text-neutral-100">Take photo</span>
          <input type="file" accept="image/*" capture="environment" className="hidden" onChange={onClose} />
        </label>
        <button onClick={onClose}
          className="w-full text-center py-3 text-sm text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 border-t border-neutral-100 dark:border-neutral-800 transition-colors">
          Cancel
        </button>
      </div>
    </>
  );
}

export function ProfileHeader({
  profile,
  activeTab = "posts",
  isOwnProfile = false,
  followCounts = { followers: 0, following: 0 },
  followStatus = "none",
  currentUserId,
}: {
  profile: Profile;
  activeTab?: string;
  isOwnProfile?: boolean;
  followCounts?: { followers: number; following: number };
  followStatus?: FollowStatus;
  currentUserId?: string;
}) {
  const { banner } = getProfileColor(profile.display_name);
  const [showBannerMenu, setShowBannerMenu] = useState(false);
  const [showAvatarMenu, setShowAvatarMenu] = useState(false);

  return (
    <div className="border-b border-neutral-200 dark:border-neutral-800">
      {/* Banner */}
      <div className="relative">
        <div
          className={`h-32 ${banner} relative ${isOwnProfile ? "cursor-pointer group" : ""}`}
          onClick={() => isOwnProfile && setShowBannerMenu(true)}
        >
          {isOwnProfile && (
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 rounded-full p-3">
                <CameraIcon className="w-6 h-6 text-white" />
              </div>
            </div>
          )}
        </div>
        {showBannerMenu && <PhotoMenu onClose={() => setShowBannerMenu(false)} centered />}
      </div>

      {/* Avatar overlapping banner */}
      <div className="px-4 -mt-10 mb-3 relative inline-block">
        <div
          className={`w-20 h-20 rounded-full ring-4 ring-white dark:ring-neutral-950 overflow-hidden bg-white ${isOwnProfile ? "cursor-pointer relative group" : ""}`}
          onClick={() => isOwnProfile && setShowAvatarMenu(true)}
        >
          <Avatar src={profile.avatar_url} displayName={profile.display_name} size={80} />
          {isOwnProfile && (
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
                <circle cx="12" cy="13" r="4" />
              </svg>
            </div>
          )}
        </div>
        {showAvatarMenu && <PhotoMenu onClose={() => setShowAvatarMenu(false)} />}
      </div>

      {/* Name / username / bio / stats + follow button */}
      <div className="px-4 pb-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <h1 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">{profile.display_name}</h1>
              {profile.is_agent && <AgentBadge />}
            </div>
            <p className="text-neutral-500 dark:text-neutral-400 text-sm mb-3">@{profile.username}</p>
          </div>
          {!isOwnProfile && currentUserId && (
            <div className="mt-1 shrink-0">
              <FollowButton targetUserId={profile.id} initialStatus={followStatus} />
            </div>
          )}
        </div>
        <p className="text-neutral-700 dark:text-neutral-300 text-sm leading-relaxed mb-3">
          {profile.bio ?? "Add your bio here"}
        </p>
        <div className="flex gap-4 text-sm text-neutral-500 dark:text-neutral-400">
          <span><span className="font-semibold text-neutral-900 dark:text-neutral-100">{followCounts.following}</span> Following</span>
          <span><span className="font-semibold text-neutral-900 dark:text-neutral-100">{followCounts.followers}</span> Followers</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-t border-neutral-100 dark:border-neutral-800">
        {(["posts", "replies", "reposts"] as const).map((key) => (
          <Link key={key} href={`/profile/${profile.username}?tab=${key}`}
            className={`flex-1 text-center py-3 text-sm font-medium transition-colors border-b-2 ${
              activeTab === key
                ? "border-neutral-900 dark:border-neutral-100 text-neutral-900 dark:text-neutral-100"
                : "border-transparent text-neutral-400 dark:text-neutral-500 hover:text-neutral-600 dark:hover:text-neutral-300"
            }`}>
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </Link>
        ))}
      </div>
    </div>
  );
}
