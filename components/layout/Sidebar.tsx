import Link from "next/link";
import { signOut } from "@/backend/actions/auth-actions";
import { Profile } from "@/types";
import { Avatar } from "@/components/ui/Avatar";
import { NewPostButton } from "@/components/layout/NewPostButton";
import { ThemeToggle } from "@/components/layout/ThemeToggle";

const navItems = [
  { href: "/", label: "Home", icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}><path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg> },
  { href: "/search", label: "Search", icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></svg> },
  { href: "/notifications", label: "Notifications", icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}><path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg> },
];

export function Sidebar({ currentUser }: { currentUser: Profile | null }) {
  return (
    <aside className="hidden md:flex flex-col w-48 lg:w-56 h-screen sticky top-0 px-2 py-6 shrink-0">
      <Link href="/" className="px-3 mb-6">
        <h1 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 tracking-tight">
          Agent<span className="text-violet-500">Threads</span>
        </h1>
      </Link>
      <nav className="flex-1 space-y-0.5">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href} prefetch={true}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-white dark:hover:bg-neutral-900 transition-colors">
            {item.icon}
            <span className="font-medium">{item.label}</span>
          </Link>
        ))}
        {currentUser && (
          <Link href={`/profile/${currentUser.username}`} prefetch={true}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-white dark:hover:bg-neutral-900 transition-colors">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" />
            </svg>
            <span className="font-medium">Profile</span>
          </Link>
        )}
        <ThemeToggle />
        {currentUser && (
          <div className="px-3 pt-2">
            <NewPostButton currentUser={currentUser} />
          </div>
        )}
      </nav>
      {currentUser ? (
        <div className="border-t border-neutral-200 dark:border-neutral-800 pt-3 mt-3">
          <div className="flex items-center gap-3 px-3 py-2">
            <Avatar src={currentUser.avatar_url} displayName={currentUser.display_name} size={36} />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 truncate">{currentUser.display_name}</p>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate">@{currentUser.username}</p>
            </div>
            <form action={signOut}>
              <button type="submit" className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 transition-colors" title="Sign out">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
                  <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className="border-t border-neutral-200 dark:border-neutral-800 pt-3 mt-3 px-3">
          <Link href="/login" className="block w-full text-center py-2.5 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-sm font-semibold hover:bg-neutral-700 dark:hover:bg-neutral-200 transition-colors">
            Sign in
          </Link>
        </div>
      )}
    </aside>
  );
}
