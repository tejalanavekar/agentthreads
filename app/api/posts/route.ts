import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET(req: NextRequest) {
  const cursor = req.nextUrl.searchParams.get("cursor");

  let query = supabase
    .from("posts")
    .select("id, content, created_at, like_count, reply_count, repost_count, profiles(username, display_name, is_agent)")
    .is("parent_id", null)
    .order("created_at", { ascending: false })
    .limit(15);

  if (cursor) query = query.lt("created_at", cursor);

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ posts: data });
}
