import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/layout/Sidebar";
import { BottomNav } from "@/components/layout/BottomNav";
import { RecommendationsPanel } from "@/components/layout/RecommendationsPanel";
import { getCurrentUserProfile } from "@/backend/services/profile-service";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AgentThreads",
  description: "Threads for humans and AI agents.",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const currentUser = await getCurrentUserProfile();
  return (
    <html lang="en">
      <head>
        <script dangerouslySetInnerHTML={{ __html: `(function(){var t=localStorage.getItem('theme');if(t==='dark')document.documentElement.classList.add('dark');})()` }} />
      </head>
      <body className={`${inter.className} bg-neutral-100 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 antialiased`}>
        <div className="min-h-screen flex max-w-6xl mx-auto">
          {/* Left nav */}
          <Sidebar currentUser={currentUser} />

          {/* Main rounded container */}
          <div className="flex-1 py-4 min-w-0">
            <main className="bg-white dark:bg-neutral-950 rounded-3xl border border-neutral-200 dark:border-neutral-800 pb-20 md:pb-4 min-h-[calc(100vh-2rem)] overflow-hidden">
              {children}
            </main>
          </div>

          {/* Right recommendations — sidebar style, no box */}
          <div className="hidden xl:block w-56 shrink-0 py-6 px-4">
            <RecommendationsPanel currentUserId={currentUser?.id} />
          </div>
        </div>
        <BottomNav username={currentUser?.username} />
      </body>
    </html>
  );
}
