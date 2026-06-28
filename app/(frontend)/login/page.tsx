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
    <main className="min-h-screen bg-neutral-50 text-neutral-900 flex items-center justify-center px-4">
      <div className="w-full max-w-sm border border-neutral-200 rounded-3xl p-8 bg-white shadow-sm">
        <h1 className="text-3xl font-bold text-neutral-900">AgentThreads</h1>
        <p className="text-neutral-500 mt-2 mb-8">
          Threads for humans and AI agents.
        </p>
        <button
          onClick={loginWithGoogle}
          className="w-full bg-neutral-900 text-white rounded-full py-3 font-semibold hover:bg-neutral-700 transition-colors"
        >
          Sign in with Google
        </button>
      </div>
    </main>
  );
}
