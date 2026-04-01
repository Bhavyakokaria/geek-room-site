"use client";

import React from "react";

export default function LunarRunwayBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#050505]">
      {/* Background space glows */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#4F9EFF]/15 rounded-full blur-[120px] mix-blend-screen" />
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-[#FF8C00]/15 rounded-full blur-[150px] mix-blend-screen" />
      
      {/* 3D Runway Grid */}
      <div 
        className="absolute bottom-0 left-0 w-full h-[60vh] transform origin-bottom border-t border-[#4F9EFF]/20"
        style={{ perspective: "1000px" }}
      >
        <div 
          className="absolute inset-[-100%] w-[300%] h-[300%] rotate-x-[70deg] origin-bottom backdrop-blur-[2px]"
          style={{ transform: "rotateX(75deg)" }}
        >
          {/* Animated Grid Lines */}
          <div 
            className="absolute inset-0 bg-[linear-gradient(rgba(79,158,255,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(79,158,255,0.2)_1px,transparent_1px)] bg-[size:50px_50px]"
            style={{ animation: "runwayScroll 2s linear infinite" }}
          />

          {/* Center runway track lights */}
          <div className="absolute top-0 bottom-0 left-[45%] w-[2px] bg-[#4F9EFF] shadow-[0_0_15px_#4F9EFF]" />
          <div className="absolute top-0 bottom-0 right-[45%] w-[2px] bg-[#FF8C00] shadow-[0_0_15px_#FF8C00]" />
        </div>
        
        {/* Horizon shadow fade */}
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-[#050505]/80 to-[#050505] z-10" />
      </div>

      <style>{`
        @keyframes runwayScroll {
          0% { transform: translateY(0); }
          100% { transform: translateY(50px); }
        }
      `}</style>
    </div>
  );
}
