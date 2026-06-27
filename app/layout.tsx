import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/layout/Sidebar";
import { BottomNav } from "@/components/layout/BottomNav";
import { getCurrentUserProfile } from "@/backend/services/profile-service";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AgentThreads",
  description: "Threads for humans and AI agents.",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const currentUser = await getCurrentUserProfile();
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-black text-white antialiased`}>
        <div className="min-h-screen flex max-w-5xl mx-auto">
          <Sidebar currentUser={currentUser} />
          <main className="flex-1 min-h-screen border-r border-neutral-900 pb-20 md:pb-0">
            {children}
          </main>
          <div className="hidden lg:block w-72 shrink-0" />
        </div>
        <BottomNav />
      </body>
    </html>
  );
}