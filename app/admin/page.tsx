import type { Metadata } from "next";
import { getSettings } from "@/app/actions/settings";
import { AdminControls } from "./AdminControls";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Admin — GEEKROOM",
  description: "Private dashboard for content management.",
  robots: "noindex, nofollow",
};

export default async function AdminPage() {
  const user = await currentUser();
  const isAdmin = user?.publicMetadata?.role === "admin";

  if (!isAdmin) {
    redirect("/");
  }

  const settings = await getSettings();

  return (
    <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-16">
      <h1 className="text-3xl font-bold sm:text-4xl text-[#00F2FF]">Admin Dashboard</h1>
      <p className="mt-3 text-base text-foreground/80 sm:mt-4">
        Private content management dashboard. Control public system nodes and view messages.
      </p>
      
      <div className="mt-8 grid gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-6">
        {/* Toggle Controls */}
        <AdminControls initialHideJoin={settings.hideJoin} />

          <Link
            href="/admin/events"
            className="p-6 bg-zinc-900/50 rounded-2xl border border-zinc-800 hover:border-blue-500 transition-colors group cursor-pointer"
          >
            <h2 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors">Event Management</h2>
            <p className="text-zinc-400 text-sm">Create, edit, and manage upcoming and past events.</p>
          </Link>

          <Link
            href="/admin/gallery"
            className="p-6 bg-zinc-900/50 rounded-2xl border border-zinc-800 hover:border-[#FF8C00] transition-colors group cursor-pointer"
          >
            <h2 className="text-xl font-bold mb-2 group-hover:text-[#FF8C00] transition-colors">Gallery Management</h2>
            <p className="text-zinc-400 text-sm">Add and remove photos globally across all past events.</p>
          </Link>
        <div className="rounded-lg border border-foreground/10 p-5 sm:p-6">
          <h3 className="font-semibold">Messages</h3>
          <p className="mt-1 text-sm text-foreground/70">View contact inquiries.</p>
        </div>
        <div className="rounded-lg border border-foreground/10 p-5 sm:p-6">
          <h3 className="font-semibold">Team</h3>
          <p className="mt-1 text-sm text-foreground/70">Update team members.</p>
        </div>
      </div>
    </main>
  );
}
