import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser();

  // If there's no active session, kick them back to sign-in or home
  if (!user) {
    redirect("/sign-in");
  }

  // Extract custom role strictly from publicMetadata
  const role = user.publicMetadata?.role as string | undefined;

  // The admin subtree requires EITHER "admin" OR "owner" privileges.
  if (role !== "admin" && role !== "owner") {
    // Standard members or unassigned logins do not have access here
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-black text-white selection:bg-[#00F2FF]/30 selection:text-white">
      {children}
    </div>
  );
}
