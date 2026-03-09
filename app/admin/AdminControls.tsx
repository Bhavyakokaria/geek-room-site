"use client";

import { useState, useTransition } from "react";
import { setHideJoin } from "@/app/actions/settings";

export function AdminControls({ initialHideJoin }: { initialHideJoin: boolean }) {
  const [hideJoin, setHideJoinState] = useState(initialHideJoin);
  const [isPending, startTransition] = useTransition();

  const handleToggle = () => {
    const newValue = !hideJoin;
    setHideJoinState(newValue);
    
    startTransition(async () => {
      try {
        await setHideJoin(newValue);
      } catch (e) {
        // Revert on error
        setHideJoinState(!newValue);
        console.error("Failed to update settings");
      }
    });
  };

  return (
    <div className="rounded-lg border border-[#00F2FF]/30 bg-[#050505] p-5 sm:p-6 shadow-[0_0_15px_rgba(0,242,255,0.1)] relative overflow-hidden group">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00F2FF] to-transparent opacity-50"></div>
      
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-semibold text-[#00F2FF]">Join Page Access</h3>
          <p className="mt-1 text-sm text-[#ededed]/70">Control public visibility of the recruitment form.</p>
        </div>
        
        <button
          onClick={handleToggle}
          disabled={isPending}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#00F2FF] focus:ring-offset-2 focus:ring-offset-[#050505] ${
            hideJoin ? "bg-red-500/50" : "bg-green-500/50"
          } ${isPending ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              hideJoin ? "translate-x-1" : "translate-x-6"
            }`}
          />
        </button>
      </div>
      
      <div className="text-xs font-mono uppercase tracking-wider text-right">
        STATUS: <span className={hideJoin ? "text-red-400" : "text-green-400"}>{hideJoin ? "HIDDEN" : "PUBLIC"}</span>
      </div>
    </div>
  );
}
