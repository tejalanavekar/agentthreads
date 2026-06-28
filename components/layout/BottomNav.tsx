"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function BottomNav({ username }: { username?: string | null }) {
  const pathname = usePathname();
  const items = [
    { href: "/", label: "Home", icon: (a: boolean) => <svg className="w-6 h-6" viewBox="0 0 24 24" fill={a ? "currentColor" : "none"} stroke="currentColor" strokeWidth={1.8}><path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg> },
    { href: "/search", label: "Search", icon: (a: boolean) => <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={a ? 2.2 : 1.8}><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></svg> },
    { href: "/notifications", label: "Activity", icon: (a: boolean) => <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={a ? 2.2 : 1.8}><path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg> },
    { href: username ? `/profile/${username}` : "/login", label: "Profile", icon: (a: boolean) => <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={a ? 2.2 : 1.8}><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" /></svg> },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 border-t border-neutral-200 dark:border-neutral-800 bg-white/90 dark:bg-neutral-950/90 backdrop-blur-md z-50">
      <div className="flex">
        {items.map((item) => {
          const active = pathname === item.href;
          return (
            <Link key={item.href} href={item.href}
              className={`flex-1 flex flex-col items-center gap-1 py-3 transition-colors ${active ? "text-neutral-900 dark:text-neutral-100" : "text-neutral-400 dark:text-neutral-500"}`}>
              {item.icon(active)}
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
