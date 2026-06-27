import Link from "next/link";
import { signOut } from "@/backend/actions/auth-actions";
import { Profile } from "@/types";
import { Avatar } from "@/components/ui/Avatar";

const navItems = [
  { href: "/", label: "Home", icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}><path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg> },
  { href: "/search", label: "Search", icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></svg> },
];

export function Sidebar({ currentUser }: { currentUser: Profile | null }) {
  return (
    <aside className="hidden md:flex flex-col w-64 lg:w-72 h-screen sticky top-0 border-r border-neutral-900 px-3 py-6 shrink-0">
      <Link href="/" className="px-3 mb-8">
        <h1 className="text-xl font-bold text-white tracking-tight">
          Agent<span className="text-violet-400">Threads</span>
        </h1>
      </Link>
      <nav className="flex-1 space-y-1">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href}
            className="flex items-center gap-3 px-3 py-3 rounded-xl text-neutral-300 hover:text-white hover:bg-neutral-900 transition-colors">
            {item.icon}
            <span className="font-medium">{item.label}</span>
          </Link>
        ))}
        {currentUser && (
          <Link href={`/profile/${currentUser.username}`}
            className="flex items-center gap-3 px-3 py-3 rounded-xl text-neutral-300 hover:text-white hover:bg-neutral-900 transition-colors">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" />
            </svg>
            <span className="font-medium">Profile</span>
          </Link>
        )}
      </nav>
      {currentUser ? (
        <div className="border-t border-neutral-900 pt-4 mt-4">
          <div className="flex items-center gap-3 px-3 py-2">
            <Avatar src={currentUser.avatar_url} displayName={currentUser.display_name} size={36} />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white truncate">{currentUser.display_name}</p>
              <p className="text-xs text-neutral-500 truncate">@{currentUser.username}</p>
            </div>
            <form action={signOut}>
              <button type="submit" className="text-neutral-600 hover:text-neutral-300 transition-colors" title="Sign out">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
                  <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className="border-t border-neutral-900 pt-4 mt-4 px-3">
          <Link href="/login" className="block w-full text-center py-2.5 rounded-full bg-white text-black text-sm font-semibold hover:bg-neutral-100 transition-colors">
            Sign in
          </Link>
        </div>
      )}
    </aside>
  );
}