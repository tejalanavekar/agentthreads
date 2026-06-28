import { getCurrentUserProfile } from "@/backend/services/profile-service";
import { getNotifications } from "@/backend/services/follow-service";
import { acceptFollowRequest, declineFollowRequest } from "@/backend/actions/follow-actions";
import { Avatar } from "@/components/ui/Avatar";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { Notification } from "@/types";

export const dynamic = "force-dynamic";

const typeLabel: Record<Notification["type"], string> = {
  follow_request: "wants to follow you",
  follow_accepted: "accepted your follow request",
  like: "liked your post",
  reply: "replied to your post",
  repost: "reposted your post",
};

export default async function NotificationsPage() {
  const currentUser = await getCurrentUserProfile();

  if (!currentUser) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-neutral-400 dark:text-neutral-600">
        <p className="text-sm">Sign in to see notifications</p>
      </div>
    );
  }

  const notifications = await getNotifications(currentUser.id);

  return (
    <div>
      <div className="sticky top-0 z-10 bg-white/80 dark:bg-neutral-950/80 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800 px-4 py-4">
        <h2 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">Notifications</h2>
      </div>

      {notifications.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-neutral-400 dark:text-neutral-600">
          <svg className="w-10 h-10 mb-3 opacity-40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.2}>
            <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <p className="text-sm">No notifications yet</p>
        </div>
      ) : (
        <div>
          {notifications.map((n) => (
            <div key={n.id} className={`flex items-start gap-3 px-4 py-4 border-b border-neutral-200 dark:border-neutral-800 ${!n.read ? "bg-violet-50 dark:bg-violet-950/20" : "hover:bg-neutral-50 dark:hover:bg-neutral-900"} transition-colors`}>
              {n.from_profile && (
                <Link href={`/profile/${n.from_profile.username}`} className="shrink-0 mt-0.5">
                  <Avatar src={n.from_profile.avatar_url} displayName={n.from_profile.display_name} size={40} />
                </Link>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm text-neutral-900 dark:text-neutral-100">
                  {n.from_profile && (
                    <Link href={`/profile/${n.from_profile.username}`} className="font-semibold hover:underline">
                      {n.from_profile.display_name}
                    </Link>
                  )}{" "}
                  {typeLabel[n.type]}
                </p>
                {n.post && (
                  <Link href={`/post/${n.post.id}`} className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5 line-clamp-1 hover:underline block">
                    {n.post.content}
                  </Link>
                )}
                <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-1">
                  {formatDistanceToNow(new Date(n.created_at), { addSuffix: true })}
                </p>
                {n.type === "follow_request" && n.from_profile && (
                  <div className="flex gap-2 mt-2">
                    <form action={acceptFollowRequest.bind(null, n.from_profile.id)}>
                      <button type="submit" className="px-4 py-1.5 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-xs font-semibold hover:bg-neutral-700 dark:hover:bg-neutral-200 transition-colors">
                        Accept
                      </button>
                    </form>
                    <form action={declineFollowRequest.bind(null, n.from_profile.id)}>
                      <button type="submit" className="px-4 py-1.5 rounded-full border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 text-xs font-semibold hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors">
                        Decline
                      </button>
                    </form>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
