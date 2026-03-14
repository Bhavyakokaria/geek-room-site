"use client";

import { useState } from "react";
import { Trash2, Loader2 } from "lucide-react";
import { deleteEvent } from "@/app/actions/eventActions";
import { useRouter } from "next/navigation";

export default function DeleteEventButton({ eventId }: { eventId: string }) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to completely delete this event and its gallery? This cannot be undone.")) {
      return;
    }

    setIsDeleting(true);
    const result = await deleteEvent(eventId);
    if (result.success) {
      router.refresh();
    } else {
      alert("Failed to delete event.");
      setIsDeleting(false);
    }
  };

  return (
    <button 
      onClick={handleDelete}
      disabled={isDeleting}
      className="p-2 bg-red-500/10 hover:bg-red-500 hover:text-white text-red-500 rounded-lg transition-colors flex items-center justify-center disabled:opacity-50"
      title="Delete Event"
    >
      {isDeleting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
    </button>
  );
}
