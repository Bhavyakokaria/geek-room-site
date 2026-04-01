"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useSpring, useTransform, motion, MotionValue } from "framer-motion";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";

const FRAME_COUNT = 232;
// Generate paths from ezgif-frame-001.jpg to ezgif-frame-232.jpg
const getFramePath = (index: number) => {
  const paddedIndex = index.toString().padStart(3, "0");
  return `/ezgif-6bd10c8b75cb7195-jpg/ezgif-frame-${paddedIndex}.jpg`;
};

export function LogoSequence() {
  const { isSignedIn } = useUser();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Smooth the scroll
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const frameIndex = useTransform(smoothProgress, [0, 1], [1, FRAME_COUNT]);

  // Preload images
  useEffect(() => {
    let loadedCount = 0;
    const loadedImages: HTMLImageElement[] = [];

    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      img.src = getFramePath(i);
      img.onload = () => {
        loadedCount++;
        setLoadingProgress(loadedCount / FRAME_COUNT);
        if (loadedCount === FRAME_COUNT) {
          setIsLoaded(true);
        }
      };
      loadedImages[i] = img;
    }
    setImages(loadedImages);
  }, []);

  // Make canvas responsive
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const render = () => {
      // Get current frame index
      const currentIndex = Math.min(
        FRAME_COUNT,
        Math.max(1, Math.round(frameIndex.get()))
      );

      const img = images[currentIndex];
      if (!img || !img.complete) return;

      // Ensure canvas matches screen logic, using object-contain approach
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      // Improve image scaling for mobile devices - handle wide vs tall screens
      canvas.width = width;
      canvas.height = height;

      // scale logic (object-contain)
      const scale = Math.min(width / img.width, height / img.height);
      // Scale slightly up on mobile to avoid small logo feeling disconnected
      const finalScale = window.innerWidth < 768 ? scale * 1.2 : scale;

      const scaledWidth = img.width * finalScale;
      const scaledHeight = img.height * finalScale;
      const x = (width - scaledWidth) / 2;
      // Shift upwards slightly on mobile to accommodate text below
      const yOffset = window.innerWidth < 768 ? -50 : 0;
      const y = (height - scaledHeight) / 2 + yOffset;

      ctx.clearRect(0, 0, width, height);
      ctx.drawImage(img, x, y, scaledWidth, scaledHeight);
    };

    // Listen to frame changes
    const unsubscribe = frameIndex.on("change", render);
    
    // Also render on resize
    window.addEventListener("resize", render);

    // Initial render if loaded
    if (isLoaded) {
      setTimeout(render, 50); // slight delay to ensure dimmensions
    }

    return () => {
      unsubscribe();
      window.removeEventListener("resize", render);
    };
  }, [frameIndex, images, isLoaded]);

  return (
    <div ref={containerRef} className="relative h-[400vh] w-full bg-[#050505]">
      {/* Sticky Canvas Container */}
      <div className="sticky top-[env(safe-area-inset-top,0px)] h-screen w-full overflow-hidden flex flex-col items-center justify-center">
        {!isLoaded && (
          <div className="absolute inset-0 flex flex-col items-center justify-center z-50 bg-[#050505] text-[#4F9EFF] px-6 text-center">
            <div className="text-sm sm:text-lg md:text-xl tracking-[0.2em] mb-4 uppercase font-mono">Initializing Sequence</div>
            <div className="w-full max-w-xs h-1 bg-gray-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[#4F9EFF] to-[#FF8C00] transition-all duration-300"
                style={{ width: `${loadingProgress * 100}%` }}
              />
            </div>
            <div className="mt-4 text-[10px] sm:text-xs font-mono text-gray-500">
              FRAME {Math.round(loadingProgress * FRAME_COUNT)} / {FRAME_COUNT}
            </div>
          </div>
        )}
        <canvas
          ref={canvasRef}
          className="w-full h-full block"
        />

        {/* Text Beats Overlay */}
        {isLoaded && (
          <div className="absolute inset-0 pointer-events-none flex items-end sm:items-center justify-center container mx-auto px-4 z-10 pb-[15vh] sm:pb-0">
            {/* Beat A (0-20%) */}
            <Beat 
              progress={smoothProgress} 
              range={[0, 0.1, 0.2, 0.25]} 
              title="GEEKROOM JIMSEMTC" 
              subtitle="The premier tech society." 
            />
            {/* Beat B (25-45%) */}
            <Beat 
              progress={smoothProgress} 
              range={[0.25, 0.35, 0.45, 0.5]} 
              title="HACK. BUILD. LEARN." 
              subtitle="Transforming ideas into reality." 
            />
            {/* Beat C (50-70%) */}
            <Beat 
              progress={smoothProgress} 
              range={[0.5, 0.6, 0.7, 0.75]} 
              title="COMMUNITY DRIVEN" 
              subtitle="Elevating student developers together." 
            />
            {/* Beat D (75-100%) */}
            <BeatD progress={smoothProgress} range={[0.75, 0.85, 1, 1]} isSignedIn={!!isSignedIn} />
          </div>
        )}
      </div>
    </div>
  );
}

function Beat({ progress, range, title, subtitle }: { progress: MotionValue<number>, range: number[], title: string, subtitle: string }) {
  const opacity = useTransform(progress, range, [0, 1, 1, 0]);
  const y = useTransform(progress, range, [30, 0, 0, -30]);

  return (
    <motion.div 
      style={{ opacity, y }} 
      className="absolute text-center flex flex-col items-center justify-center drop-shadow-2xl w-full px-4"
    >
      <h2 className="text-3xl sm:text-4xl md:text-7xl font-bold tracking-tighter text-white mb-2 sm:mb-4 uppercase drop-shadow-[0_0_15px_rgba(0,242,255,0.3)]">
        {title}
      </h2>
      <p className="text-base sm:text-lg md:text-2xl text-gray-400 font-medium tracking-wide max-w-[280px] sm:max-w-max mx-auto leading-tight sm:leading-normal">
        {subtitle}
      </p>
    </motion.div>
  );
}

function BeatD({ progress, range, isSignedIn }: { progress: MotionValue<number>, range: number[], isSignedIn: boolean }) {
  const opacity = useTransform(progress, range, [0, 1, 1, 1]);
  const y = useTransform(progress, range, [30, 0, 0, 0]);

  return (
    <motion.div 
      style={{ opacity, y }} 
      className="absolute text-center flex flex-col items-center justify-center drop-shadow-2xl pointer-events-auto w-full px-4"
    >
      <h2 className="text-3xl sm:text-4xl md:text-7xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-[#4F9EFF] to-[#FF8C00] mb-6 sm:mb-8 uppercase drop-shadow-[0_0_20px_rgba(255,140,0,0.6)]">
        {isSignedIn ? "EXPLORE THE HUB" : "JOIN THE NETWORK"}
      </h2>
      {!isSignedIn && (
        <Link href="/sign-in" className="pointer-events-auto group relative inline-flex items-center justify-center font-sans tracking-widest text-xs sm:text-sm uppercase mt-4">
          <motion.div 
            whileTap={{ scale: 0.95 }}
            className="relative flex items-center justify-center h-10 sm:h-12 px-8 rounded-full overflow-hidden w-[160px] sm:w-[200px] border border-[#4F9EFF]/40 bg-[#050505]/60 backdrop-blur-md shadow-[0_0_15px_rgba(0,242,255,0.15)] group-hover:shadow-[0_0_30px_rgba(0,242,255,0.4)] group-hover:border-[#4F9EFF]/80 transition-all duration-300"
          >
            {/* Fill state (shown on hover) */}
            <div className="absolute inset-0 bg-[#4F9EFF]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Text */}
            <span className="relative z-10 text-[#4F9EFF] group-hover:text-white font-mono font-bold drop-shadow-md transition-colors duration-300">
              SIGN IN
            </span>
          </motion.div>
        </Link>
      )}
    </motion.div>
  );
}
