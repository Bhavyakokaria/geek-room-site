"use client";

import { useState } from "react";
import { deleteMember } from "@/app/actions/teamActions";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function DeleteMemberButton({ memberId }: { memberId: number }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this specific team member?")) return;

    setIsDeleting(true);
    const res = await deleteMember(memberId);
    if (res.success) {
      router.refresh();
    } else {
      alert("Failed to delete the team member: " + res.error);
      setIsDeleting(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className={`p-2 bg-red-900/50 hover:bg-red-800 text-red-200 rounded-lg transition-colors ${
        isDeleting ? "opacity-50 cursor-not-allowed" : ""
      }`}
      title="Delete Member"
    >
      <Trash2 className="w-4 h-4" />
    </button>
  );
}
