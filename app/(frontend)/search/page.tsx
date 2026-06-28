import { Suspense } from "react";
import { SearchInput } from "@/components/search/SearchInput";
import { SearchResults } from "@/components/search/SearchResults";
import { searchPosts } from "@/backend/services/post-service";
import { searchProfiles } from "@/backend/services/profile-service";

export const dynamic = "force-dynamic";

async function Results({ query }: { query: string }) {
  if (!query) return <SearchResults profiles={[]} posts={[]} query="" />;
  const [profiles, posts] = await Promise.all([searchProfiles(query), searchPosts(query)]);
  return <SearchResults profiles={profiles} posts={posts} query={query} />;
}

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q } = await searchParams;
  const query = q?.trim() ?? "";

  return (
    <div>
      <div className="sticky top-0 z-10 bg-white/80 dark:bg-neutral-950/80 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800 px-4 py-3">
        <SearchInput />
      </div>
      <Suspense fallback={<div className="flex justify-center py-12"><div className="w-5 h-5 border-2 border-neutral-700 border-t-neutral-300 rounded-full animate-spin" /></div>}>
        <Results query={query} />
      </Suspense>
    </div>
  );
}