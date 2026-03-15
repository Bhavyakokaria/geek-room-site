"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Terminal } from "lucide-react";
import { useState } from "react";
import { TeamMember } from "@/app/actions/teamActions";

export function TeamPreview({ members }: { members: TeamMember[] }) {
  const [isHovered, setIsHovered] = useState(false);

  // We map indices to predefined grid positions for visual aesthetics
  const nodePositions = [
    { x: -300, y: 150, color: "#00F2FF" },
    { x: -100, y: 250, color: "#FF8C00" },
    { x: 100, y: 250, color: "#B026FF" },
    { x: 300, y: 150, color: "#00FF66" },
  ];

  return (
    <section id="team-preview" className="relative py-32 bg-[#020202] min-h-screen flex items-center justify-center overflow-hidden border-b border-white/5">
      {/* Dynamic Background glow */}
      <motion.div 
        animate={{ 
          opacity: isHovered ? 0.3 : 0.1,
          scale: isHovered ? 1.5 : 1
        }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(0,242,255,0.2)_0%,transparent_60%)] pointer-events-none"
      />

      <div className="absolute top-[10%] left-0 w-full text-center z-20">
        <h2 className="text-5xl md:text-7xl font-bold text-white uppercase tracking-wider mix-blend-overlay opacity-20 pointer-events-none" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
          The Architects
        </h2>
      </div>

      <div 
        className="relative z-10 w-full max-w-7xl mx-auto px-4 flex flex-col items-center"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative w-full h-[600px] flex items-center justify-center perspective-[1000px]">
          
          {/* Main Central Card */}
          <motion.div
            animate={{
              scale: isHovered ? 0.7 : 1,
              y: isHovered ? -100 : 0
            }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className={`relative z-50 flex flex-col items-center justify-center w-64 h-80 rounded-2xl border transition-colors duration-500 ${isHovered ? 'bg-[#0A0A0A] border-[#00F2FF]/40 shadow-[0_0_50px_rgba(0,242,255,0.2)]' : 'bg-[#0A0A0A] border-white/10 shadow-2xl'}`}
          >
            <Terminal className={`w-12 h-12 mb-4 transition-colors duration-500 ${isHovered ? 'text-[#00F2FF]' : 'text-gray-500'}`} />
            <h3 className="text-2xl font-bold uppercase tracking-widest text-center">Meet The<br/>Team</h3>
            <p className="text-gray-500 text-xs font-mono mt-4 uppercase">Hover to expand_</p>
          </motion.div>

          {/* Hierarchy Nodes (Visible on hover) */}
          {members.map((member, i) => {
            const pos = nodePositions[i % nodePositions.length];
            return (
              <HierarchyNode 
                key={member.id} 
                isHovered={isHovered} 
                x={pos.x} 
                y={pos.y} 
                delay={0.1 * (i + 1)} 
                image={member.photo || ""}
                title={member.name} 
                subtitle={member.role || member.category}
                color={pos.color} 
              />
            );
          })}

          {/* Connecting SVG Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" style={{ overflow: "visible" }}>
            {members.map((member, i) => {
              const pos = nodePositions[i % nodePositions.length];
              return (
                <ConnectionLine 
                  key={`line-${member.id}`} 
                  isHovered={isHovered} 
                  endX={`calc(50% + ${pos.x}px)`} 
                  endY={`calc(50% + ${pos.y}px)`} 
                  delay={0.1 * (i + 1)} 
                  color={pos.color} 
                />
              );
            })}
          </svg>
        </div>

        <motion.div 
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 z-50"
        >
          <Link 
            href="/team" 
            className="group flex items-center gap-3 px-8 py-4 bg-transparent border-2 border-white/20 text-white rounded-lg hover:border-white hover:bg-white hover:text-black transition-all duration-300 overflow-hidden"
          >
            <span className="font-mono text-sm uppercase tracking-widest font-bold">Access Full Database</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function HierarchyNode({ isHovered, x, y, delay, image, title, subtitle, color }: { isHovered: boolean, x: number, y: number, delay: number, image: string, title: string, subtitle: string, color: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 0, y: 0, scale: 0 }}
      animate={{
        opacity: isHovered ? 1 : 0,
        x: isHovered ? x : 0,
        y: isHovered ? y : 0,
        scale: isHovered ? 1 : 0.5
      }}
      transition={{ type: "spring", stiffness: 100, damping: 20, delay: isHovered ? delay : 0 }}
      className="absolute top-1/2 left-1/2 -mt-[50px] -ml-[75px] w-[180px] h-auto p-3 bg-[#0A0A0A] border rounded-2xl flex items-center gap-3 z-40 transition-colors"
      style={{ borderColor: `${color}40`, boxShadow: `0 0 30px ${color}15` }}
    >
      <div 
        className="w-12 h-12 rounded-full border-2 overflow-hidden shrink-0 flex items-center justify-center bg-black/50"
        style={{ borderColor: color }}
      >
        {image ? (
          <img src={image} alt={title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gray-800" />
        )}
      </div>
      <div className="flex flex-col text-left overflow-hidden">
        <p className="text-sm font-bold text-white truncate w-full">{title}</p>
        <p className="text-[10px] font-mono uppercase tracking-wider truncate w-full" style={{ color: color }}>
          {subtitle || "Core Member"}
        </p>
      </div>
    </motion.div>
  );
}

function ConnectionLine({ isHovered, endX, endY, delay, color }: { isHovered: boolean, endX: string, endY: string, delay: number, color: string }) {
  return (
    <motion.line
      x1="50%"
      y1="calc(50% - 100px)" // Center of hoisted main card
      x2={endX}
      y2={endY}
      stroke={color}
      strokeWidth="2"
      strokeDasharray="4 4"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ 
        pathLength: isHovered ? 1 : 0,
        opacity: isHovered ? 0.3 : 0
      }}
      transition={{ duration: 0.8, delay: isHovered ? delay : 0, ease: "easeInOut" }}
    />
  );
}
