"use client";

import { UserData, UserRole, updateUserRole } from "@/app/actions/userActions";
import { useState, useTransition } from "react";
import { Check, Loader2, ShieldX } from "lucide-react";

export default function RoleManagerClient({
  users,
  activeOwnerId
}: {
  users: UserData[];
  activeOwnerId: string;
}) {
  const [isPending, startTransition] = useTransition();
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleRoleChange = (userId: string, newRole: UserRole) => {
    setStatusMessage(null);
    startTransition(async () => {
      try {
        await updateUserRole(userId, newRole);
        setStatusMessage({ type: "success", text: "Role updated successfully." });
        
        // Clear success message after 3 seconds
        setTimeout(() => setStatusMessage(null), 3000);
      } catch (error: any) {
        setStatusMessage({ type: "error", text: error.message || "Failed to update role." });
      }
    });
  };

  return (
    <div className="w-full">
      {statusMessage && (
        <div className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${statusMessage.type === "success" ? "bg-green-500/10 text-green-400 border border-green-500/20" : "bg-red-500/10 text-red-400 border border-red-500/20"}`}>
          {statusMessage.type === "success" ? <Check className="w-5 h-5" /> : <ShieldX className="w-5 h-5" />}
          {statusMessage.text}
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-zinc-800 text-sm font-mono text-zinc-500 uppercase tracking-wider">
              <th className="pb-4 font-normal">Registered Entity</th>
              <th className="pb-4 font-normal hidden sm:table-cell">Joined</th>
              <th className="pb-4 font-normal text-right">System Access Level</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/50">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-zinc-800/20 transition-colors group">
                <td className="py-4 py">
                  <div className="flex items-center gap-4">
                    <img 
                      src={user.imageUrl} 
                      alt="Avatar" 
                      className="w-10 h-10 rounded-full bg-zinc-800 border-2 border-zinc-700 group-hover:border-[#00F2FF]/50 transition-colors object-cover" 
                    />
                    <div>
                      <div className="font-bold whitespace-nowrap">
                        {user.firstName || "Unknown"} {user.lastName || "User"}
                      </div>
                      <div className="text-xs font-mono text-zinc-500 truncate max-w-[200px] md:max-w-none">
                        {user.email}
                      </div>
                    </div>
                  </div>
                </td>
                
                <td className="py-4 hidden sm:table-cell text-sm text-zinc-400 font-mono">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
                
                <td className="py-4 text-right">
                  <div className="flex items-center justify-end gap-3">
                    {/* Badge for strict Owners */}
                    {user.role === "owner" && (
                      <span className="px-3 py-1 bg-[#B026FF]/10 text-[#B026FF] border border-[#B026FF]/30 rounded-full text-xs font-mono uppercase tracking-widest hidden md:inline-block">
                        Owner
                      </span>
                    )}

                    <select
                      disabled={isPending || user.id === activeOwnerId}
                      value={user.role || ""}
                      onChange={(e) => handleRoleChange(user.id, (e.target.value as UserRole) || null)}
                      className={`
                        appearance-none bg-zinc-900 border text-sm rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-[#00F2FF]/50 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed
                        ${user.role === "owner" ? "border-[#B026FF]/40 text-[#B026FF]" : ""}
                        ${user.role === "admin" ? "border-[#00F2FF]/40 text-[#00F2FF]" : ""}
                        ${user.role === "member" ? "border-[#00FF66]/40 text-[#00FF66]" : ""}
                        ${!user.role ? "border-zinc-700 text-zinc-400" : ""}
                      `}
                    >
                      <option value="">Unassigned</option>
                      <option value="member">Member</option>
                      <option value="admin">Admin</option>
                      <option value="owner" disabled>Owner (Locked)</option>
                    </select>

                    {/* Pending state spinner placeholder */}
                    <div className="w-5 h-5 flex-shrink-0">
                      {isPending && <Loader2 className="w-4 h-4 text-zinc-500 animate-spin" />}
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
