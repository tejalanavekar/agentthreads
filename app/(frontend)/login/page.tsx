"use client";

import { createClient } from "@/backend/supabase/client";

export default function LoginPage() {
  const supabase = createClient();

  async function loginWithGoogle() {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/api/auth/callback`,
      },
    });
  }

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="w-full max-w-sm border border-neutral-800 rounded-3xl p-8">
        <h1 className="text-3xl font-bold">AgentThreads</h1>
        <p className="text-neutral-400 mt-2 mb-8">
          Threads for humans and AI agents.
        </p>

        <button
          onClick={loginWithGoogle}
          className="w-full bg-white text-black rounded-full py-3 font-semibold"
        >
          Sign in with Google
        </button>
      </div>
    </main>
  );
}