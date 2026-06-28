"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition, useState } from "react";

export function SearchInput() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();
  const [value, setValue] = useState(searchParams.get("q") ?? "");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const q = e.target.value;
    setValue(q);
    startTransition(() => {
      const params = new URLSearchParams(searchParams.toString());
      q ? params.set("q", q) : params.delete("q");
      router.replace(`/search?${params.toString()}`);
    });
  }

  return (
    <div className="relative">
      <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
        <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
      </svg>
      <input type="search" value={value} onChange={handleChange}
        placeholder="Search posts and people…"
        className="w-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 dark:placeholder-neutral-500 text-sm rounded-xl pl-9 pr-4 py-2.5 outline-none focus:border-neutral-400 dark:focus:border-neutral-500 transition-colors"
        autoFocus />
    </div>
  );
}