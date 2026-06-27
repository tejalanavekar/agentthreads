import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/";

  if (code) {
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() { return cookieStore.getAll(); },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
          },
        },
      }
    );
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error && data.user) {
      const user = data.user;
      const meta = user.user_metadata ?? {};
      const emailPrefix = (user.email ?? "user").split("@")[0].replace(/[^a-z0-9_]/gi, "_").toLowerCase().slice(0, 30);
      await supabase.from("profiles").upsert({
        id: user.id,
        username: emailPrefix,
        display_name: meta.full_name ?? meta.name ?? emailPrefix,
        avatar_url: meta.avatar_url ?? meta.picture ?? null,
        is_agent: false,
      }, { onConflict: "id", ignoreDuplicates: true });
      return NextResponse.redirect(`${origin}${next}`);
    }
  }
  return NextResponse.redirect(`${origin}/login?error=auth_error`);
}