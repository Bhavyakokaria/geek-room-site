"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Terminal, Globe, Users, Zap } from "lucide-react";

export function AboutPreview() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <section id="about" className="relative py-32 overflow-hidden bg-[#050505] min-h-screen flex items-center border-y border-white/5">
      {/* Background Animated Grid & Glows */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#4F9EFF]/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-[#B026FF]/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column: Text & CTA */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col items-start"
          >
            <motion.div variants={itemVariants} className="flex items-center gap-3 mb-6">
              <div className="px-3 py-1 rounded-full border border-[#4F9EFF]/30 bg-[#4F9EFF]/10 text-[#4F9EFF] text-xs font-mono uppercase tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#4F9EFF] animate-pulse" />
                Initialize_Sequence
              </div>
            </motion.div>
            
            <motion.h2 
              variants={itemVariants} 
              className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-6 uppercase"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              Beyond The <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4F9EFF] via-[#FF8C00] to-[#B026FF]">
                Classroom
              </span>
            </motion.h2>

            <motion.p variants={itemVariants} className="text-gray-400 text-lg md:text-xl leading-relaxed mb-10 max-w-lg font-light">
              GEEK ROOM is an elite collective of student developers, designers, and innovators. We don&apos;t just read about technology—we build it, break it, and revolutionize it together.
            </motion.p>

            <motion.div variants={itemVariants}>
              <Link 
                href="#team-preview" 
                className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-black rounded-lg overflow-hidden transition-transform hover:scale-105 active:scale-95"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#4F9EFF] via-[#FF8C00] to-[#B026FF] opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                <span className="font-bold tracking-wide uppercase text-sm">Initialize Deep Dive</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                
                {/* Neon border effect on hover */}
                <div className="absolute inset-0 border border-transparent group-hover:border-white/20 rounded-lg transition-colors" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Column: Animated Feature Grid */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-2 gap-4 lg:gap-6 relative"
          >
            <motion.div variants={itemVariants} className="bg-[#0A0A0A] border border-white/5 rounded-2xl p-6 lg:p-8 hover:border-[#4F9EFF]/40 hover:shadow-[0_0_30px_rgba(0,242,255,0.15)] transition-all duration-500 group translate-y-8">
              <Terminal className="w-8 h-8 text-[#4F9EFF] mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold mb-2">Build</h3>
              <p className="text-sm text-gray-500">Transforming ideas into scalable production code.</p>
            </motion.div>

            <motion.div variants={itemVariants} className="bg-[#0A0A0A] border border-white/5 rounded-2xl p-6 lg:p-8 hover:border-[#FF8C00]/40 hover:shadow-[0_0_30px_rgba(255,140,0,0.15)] transition-all duration-500 group">
              <Users className="w-8 h-8 text-[#FF8C00] mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold mb-2">Connect</h3>
              <p className="text-sm text-gray-500">A thriving network of ambitious student technologists.</p>
            </motion.div>

            <motion.div variants={itemVariants} className="bg-[#0A0A0A] border border-white/5 rounded-2xl p-6 lg:p-8 hover:border-[#B026FF]/40 hover:shadow-[0_0_30px_rgba(176,38,255,0.15)] transition-all duration-500 group translate-y-8">
              <Zap className="w-8 h-8 text-[#B026FF] mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold mb-2">Innovate</h3>
              <p className="text-sm text-gray-500">Pushing boundaries at competitive hackathons.</p>
            </motion.div>

            <motion.div variants={itemVariants} className="bg-[#0A0A0A] border border-white/5 rounded-2xl p-6 lg:p-8 hover:border-[#00FF66]/40 hover:shadow-[0_0_30px_rgba(0,255,102,0.15)] transition-all duration-500 group">
              <Globe className="w-8 h-8 text-[#00FF66] mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold mb-2">Impact</h3>
              <p className="text-sm text-gray-500">Deploying open-source solutions to real users.</p>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
