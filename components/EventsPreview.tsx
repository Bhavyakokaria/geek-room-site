"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Calendar, MapPin } from "lucide-react";
import { EventItem } from "@/app/actions/eventActions";
import { useState, useEffect } from "react";

export function EventsPreview({ events }: { events: EventItem[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide every 4 seconds loop
  useEffect(() => {
    if (events.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % events.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [events.length]);

  return (
    <section className="relative py-32 bg-[#050505] min-h-[80vh] overflow-hidden border-b border-white/5 flex flex-col items-center justify-center">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-[300px] bg-gradient-to-b from-[#020202] to-transparent pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#00F2FF]/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="text-center z-10 mb-16 cursor-default">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm font-mono text-gray-300 uppercase tracking-widest mb-6"
        >
          <span className="w-2 h-2 rounded-full bg-[#00F2FF]" />
          Event_Log
        </motion.div>
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl md:text-7xl font-bold uppercase tracking-tighter mix-blend-screen text-white"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          Chronicles of <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-[#00F2FF]">Innovation</span>
        </motion.h2>
      </div>

      {events.length > 0 ? (
        <div className="relative w-full max-w-[1400px] mx-auto px-4 h-[450px] flex justify-center items-center">
          <AnimatePresence mode="popLayout">
            <div className="flex gap-6 items-center justify-center w-full">
              {[0, 1, 2].map((offset) => {
                const itemIndex = (currentIndex + offset) % events.length;
                const event = events[itemIndex];
                
                // If there are fewer than 3 events total, and this is an empty slot, don't optionally render a dupe
                if (!event) return null;

                // Handle responsive hide - only show offset 0 on mobile, offset 0/1 on tablet, all 3 on desktop
                const responsiveClass = 
                  offset === 2 ? "hidden lg:flex" : 
                  offset === 1 ? "hidden md:flex" : 
                  "flex";

                return (
                  <motion.div
                    key={`${currentIndex}-${offset}`}
                    initial={{ opacity: 0, x: 50, scale: 0.95 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -50, scale: 0.95 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    className={`${responsiveClass} flex-col w-full md:w-[350px] lg:w-[400px] h-[400px] rounded-2xl bg-[#0A0A0A] border border-white/10 overflow-hidden shadow-2xl group relative shrink-0`}
                  >
                    <div className="h-48 w-full relative overflow-hidden shrink-0">
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] to-transparent z-10" />
                      <img 
                        src={event.image} 
                        alt={event.title} 
                        className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700" 
                      />
                    </div>

                    <div className="p-6 relative z-20 flex flex-col flex-grow">
                      <h3 className="text-2xl font-bold uppercase tracking-tight mb-3 text-white line-clamp-1">
                        {event.title}
                      </h3>
                      
                      <div className="flex flex-col gap-2 mb-4 text-xs font-mono text-gray-400">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-[#00F2FF]" />
                          <span className="truncate">{event.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-[#FF8C00]" />
                          <span className="truncate">{event.location}</span>
                        </div>
                      </div>

                      <p className="text-sm text-gray-500 leading-relaxed line-clamp-3">
                        {event.description}
                      </p>
                    </div>
                    
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#00F2FF]/40 to-transparent" />
                  </motion.div>
                );
              })}
            </div>
          </AnimatePresence>
        </div>
      ) : (
        <div className="text-gray-500 font-mono text-sm py-20">No events found in archive.</div>
      )}

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="mt-12 z-20"
      >
        <Link 
          href="/events" 
          className="group flex items-center justify-center gap-3 px-8 py-4 bg-[#00F2FF]/5 text-[#00F2FF] border border-[#00F2FF]/30 rounded-lg hover:bg-[#00F2FF] hover:text-black transition-all duration-300"
        >
          <span className="font-bold uppercase tracking-widest text-sm">See All Events</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
        </Link>
      </motion.div>
    </section>
  );
}
