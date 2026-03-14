"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Image, Film, X, ChevronLeft, ChevronRight, Filter } from "lucide-react";
import { EventDetails } from "../events/data";

type MediaType = "all" | "photos" | "videos";

interface GalleryClientProps {
  events: EventDetails[];
}

export default function GalleryClient({ events }: GalleryClientProps) {
  const [filter, setFilter] = useState<MediaType>("all");
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());

  // Collect all media from all passed events
  const mediaItems = events.flatMap(event => {
    const items: Array<{ src: string; type: "photo" | "video"; event: string; eventTitle: string }> = [];

    // Add gallery images
    if (event.gallery) {
      event.gallery.forEach(img => {
        const isVideo = img.toLowerCase().endsWith('.mp4') || img.toLowerCase().endsWith('.webm') || img.toLowerCase().endsWith('.mov');
        items.push({
          src: img,
          type: isVideo ? "video" : "photo",
          event: event.slug,
          eventTitle: event.title
        });
      });
    }

    return items;
  });

  // Filter media by type
  const filteredMedia = filter === "all"
    ? mediaItems
    : mediaItems.filter(item => item.type === (filter === "photos" ? "photo" : "video"));

  // Group media by event
  const groupedByEvent: Record<string, typeof mediaItems> = {};
  filteredMedia.forEach(item => {
    if (!groupedByEvent[item.event]) {
      groupedByEvent[item.event] = [];
    }
    groupedByEvent[item.event].push(item);
  });

  const handleImageLoad = (src: string) => {
    setLoadedImages((prev) => new Set([...prev, src]));
  };

  const openLightbox = (eventSlug: string, index: number) => {
    setSelectedIndex(filteredMedia.findIndex(m => m.event === eventSlug && filteredMedia.indexOf(m) === index));
  };

  const nextImage = () => {
    if (selectedIndex === null) return;
    setSelectedIndex((prev) => (prev! + 1) % filteredMedia.length);
  };

  const prevImage = () => {
    if (selectedIndex === null) return;
    setSelectedIndex((prev) => (prev! - 1 + filteredMedia.length) % filteredMedia.length);
  };

  return (
    <main className="min-h-screen bg-[#050505]">
      {/* Page Header */}
      <div className="relative py-16 px-4 text-center border-b border-[#00F2FF]/10">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#00F2FF]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#FF8C00]/5 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-4 mb-6"
          >
            <div className="h-px w-24 bg-gradient-to-r from-transparent to-[#00F2FF]/50" />
            <Film className="h-8 w-8 text-[#00F2FF] animate-pulse" />
            <div className="h-px w-24 bg-gradient-to-l from-transparent to-[#FF8C00]/50" />
          </motion.div>

          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00F2FF] via-white to-[#FF8C00]">
              <span className="text-[#00F2FF] opacity-80">{'<'}</span>
              MEDIA ARCHIVE
              <span className="text-[#FF8C00] opacity-80">{'/>'}</span>
            </span>
          </h1>

          <p className="text-lg text-white/60 max-w-xl mx-auto">
            Explore photos and videos from all GeekRoom events
          </p>

          {/* Filter Buttons */}
          <div className="flex justify-center gap-3 mt-8">
            {(["all", "photos", "videos"] as MediaType[]).map((type) => (
              <motion.button
                key={type}
                onClick={() => setFilter(type)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-2 rounded-full font-bold uppercase text-xs tracking-wider border transition-all ${
                  filter === type
                    ? "bg-[#00F2FF]/20 border-[#00F2FF] text-[#00F2FF] shadow-[0_0_20px_rgba(0,242,255,0.3)]"
                    : "border-white/10 text-white/50 hover:border-white/30 hover:text-white"
                }`}
              >
                {type}
              </motion.button>
            ))}
          </div>

          {/* Stats */}
          <div className="flex justify-center gap-8 mt-8">
            <div className="text-center">
              <span className="block text-2xl font-bold text-[#00F2FF]">{mediaItems.length.toString().padStart(2, '0')}</span>
              <span className="text-xs text-white/40 uppercase tracking-wider">Total Files</span>
            </div>
            <div className="text-center">
              <span className="block text-2xl font-bold text-[#FF8C00]">
                {mediaItems.filter(m => m.type === "video").length.toString().padStart(2, '0')}
              </span>
              <span className="text-xs text-white/40 uppercase tracking-wider">Videos</span>
            </div>
            <div className="text-center">
              <span className="block text-2xl font-bold text-white">
                {mediaItems.filter(m => m.type === "photo").length.toString().padStart(2, '0')}
              </span>
              <span className="text-xs text-white/40 uppercase tracking-wider">Photos</span>
            </div>
          </div>
        </div>
      </div>

      {/* Media Grid by Event */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {Object.entries(groupedByEvent).map(([eventSlug, items], groupIndex) => {
          const eventData = events.find(e => e.slug === eventSlug);

          return (
            <motion.div
              key={eventSlug}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: groupIndex * 0.1 }}
              className="mb-16 last:mb-0"
            >
              {/* Event Header */}
              <div className="flex items-center gap-4 mb-6 sticky top-0 bg-[#050505] py-2 z-10">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#00F2FF]/30" />
                <h2 className="text-xl md:text-2xl font-bold text-white uppercase tracking-wider">
                  {eventData?.title || eventSlug}
                </h2>
                <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#FF8C00]/30" />
              </div>

              {/* Media Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
                {items.map((item, index) => {
                  const globalIndex = mediaItems.indexOf(item);
                  const isLoaded = loadedImages.has(item.src);

                  return (
                    <motion.div
                      key={`${item.event}-${index}`}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: (groupIndex * 0.1) + (index * 0.02) }}
                      className="relative group cursor-pointer aspect-square rounded-lg overflow-hidden border border-[#00F2FF]/20 bg-[#0a0a0a]"
                      onClick={() => openLightbox(item.event, globalIndex)}
                    >
                      {/* Loading State */}
                      {!isLoaded && item.type === "photo" && (
                        <div className="absolute inset-0 flex items-center justify-center bg-[#0a0a0a]">
                          <motion.div
                            className="w-8 h-8 border-2 border-[#00F2FF] border-t-transparent rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity }}
                          />
                        </div>
                      )}

                      {/* Media Content */}
                      {item.type === "video" ? (
                        <video
                          src={item.src}
                          className="w-full h-full object-cover"
                          muted
                          loop
                          playsInline
                          onMouseEnter={(e) => {
                            const video = e.currentTarget as HTMLVideoElement;
                            video.play();
                          }}
                          onMouseLeave={(e) => {
                            const video = e.currentTarget as HTMLVideoElement;
                            video.pause();
                            video.currentTime = 0;
                          }}
                        />
                      ) : (
                        <img
                          src={item.src}
                          alt={`${item.eventTitle} - ${index + 1}`}
                          className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 ${isLoaded ? "opacity-100" : "opacity-0"}`}
                          onLoad={() => handleImageLoad(item.src)}
                        />
                      )}

                      {/* Type Badge */}
                      <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm border border-white/10 rounded-full p-1.5">
                        {item.type === "video" ? (
                          <Film className="h-3 w-3 text-[#FF8C00]" />
                        ) : (
                          <Image className="h-3 w-3 text-[#00F2FF]" />
                        )}
                      </div>

                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                        <span className="text-xs font-mono text-white/80">
                          #{(index + 1).toString().padStart(2, "0")}
                        </span>
                      </div>

                      {/* Tech Corners */}
                      <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-[#00F2FF]/50 group-hover:border-[#00F2FF] transition-colors rounded-tl" />
                      <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-[#FF8C00]/50 group-hover:border-[#FF8C00] transition-colors rounded-tr" />
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedIndex(null)}
              className="fixed inset-0 bg-black/95 backdrop-blur-xl z-50 flex items-center justify-center p-4"
            >
              {/* Close Button */}
              <motion.button
                initial={{ scale: 0, rotate: -90 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 90 }}
                onClick={() => setSelectedIndex(null)}
                className="absolute top-4 right-4 md:top-8 md:right-8 bg-[#FF8C00]/20 hover:bg-[#FF8C00]/30 border border-[#FF8C00] text-[#FF8C00] rounded-full p-3 transition-colors z-50"
              >
                <X className="h-6 w-6" />
              </motion.button>

              {/* Navigation */}
              <motion.button
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -20, opacity: 0 }}
                onClick={(e) => { e.stopPropagation(); prevImage(); }}
                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 bg-[#00F2FF]/20 hover:bg-[#00F2FF]/30 border border-[#00F2FF] text-[#00F2FF] rounded-full p-3 transition-colors"
              >
                <ChevronLeft className="h-6 w-6" />
              </motion.button>

              <motion.button
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 20, opacity: 0 }}
                onClick={(e) => { e.stopPropagation(); nextImage(); }}
                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 bg-[#00F2FF]/20 hover:bg-[#00F2FF]/30 border border-[#00F2FF] text-[#00F2FF] rounded-full p-3 transition-colors"
              >
                <ChevronRight className="h-6 w-6" />
              </motion.button>

              {/* Media Content */}
              <div className="max-w-5xl w-full">
                {filteredMedia[selectedIndex]?.type === "video" ? (
                  <video
                    src={filteredMedia[selectedIndex]?.src}
                    className="max-w-full max-h-[80vh] object-contain rounded-lg border-2 border-[#00F2FF]/30 shadow-[0_0_50px_rgba(0,242,255,0.3)]"
                    controls
                    autoPlay
                    playsInline
                  />
                ) : (
                  <motion.img
                    key={selectedIndex}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ type: "spring", damping: 30 }}
                    src={filteredMedia[selectedIndex]?.src}
                    alt={`Gallery ${selectedIndex + 1}`}
                    className="max-w-full max-h-[80vh] object-contain rounded-lg border-2 border-[#00F2FF]/30 shadow-[0_0_50px_rgba(0,242,255,0.3)]"
                  />
                )}

                {/* Info */}
                <div className="mt-4 text-center">
                  <p className="text-sm text-white/60 font-mono">
                    {filteredMedia[selectedIndex]?.eventTitle}
                  </p>
                  <p className="text-xs text-white/40 mt-1">
                    {selectedIndex + 1} / {filteredMedia.length}
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Tech Footer */}
      <div className="flex justify-center py-8">
        <div className="flex gap-2">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="h-1 w-8 bg-[#00F2FF]/20"
              animate={{
                opacity: [0.3, 1, 0.3],
                scaleY: [1, 1.5, 1]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.1
              }}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
