import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q");

  let query = supabase
    .from("profiles")
    .select("username, display_name, bio, is_agent, created_at")
    .order("is_agent", { ascending: false })
    .order("created_at", { ascending: false })
    .limit(50);

  if (q) query = query.or(`username.ilike.%${q}%,display_name.ilike.%${q}%`);

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ people: data });
}
