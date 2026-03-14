import type { Metadata } from "next";
import { getEvents } from "@/app/actions/eventActions";
import EventsClient from "./EventsClient";
import ScrambleText from "@/components/ScrambleText";
import { TechDecorations } from "@/components/TechDecorations";
import { EventDetails } from "./data";

export const metadata: Metadata = {
  title: "Events — GeekRoom JEMTEC",
  description: "Upcoming and past events by GeekRoom JEMTEC.",
};

export const dynamic = "force-dynamic";

// Tech Background Pattern Component
function TechBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
      {/* Ambient glow effects */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#00F2FF]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#FF8C00]/5 rounded-full blur-3xl" />

      {/* Grid Pattern */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.02]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="mainGrid" width="50" height="50" patternUnits="userSpaceOnUse">
            <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#00F2FF" strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#mainGrid)" />
      </svg>

      {/* Animated scanline */}
      <div className="absolute inset-0 overflow-hidden opacity-[0.02]">
        <div className="w-full h-[2px] bg-[#00F2FF] absolute animate-[scanline-full_8s_linear_infinite]" />
      </div>

    </div>
  );
}

export default async function EventsPage() {
  const customEvents = await getEvents();
  
  const mappedEvents: EventDetails[] = customEvents.map((e: any) => ({
    slug: e.id,
    title: e.title,
    date: e.date,
    type: e.status,
    description: e.description,
    image: e.image,
    registrationLink: e.registrationLink,
    location: e.location,
    time: e.time,
    category: e.category || "tech-fest",
    registrationOpen: e.registrationOpen,
    gallery: e.gallery,
    winners: e.winners
  }));

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-16 relative">
      <TechBackground />

      {/* Page Header with Tech Styling */}
      <div className="text-center relative z-10">
        {/* Top Tech Decoration */}
        <div className="flex items-center justify-center gap-6 mb-6">
          <div className="h-px w-24 bg-gradient-to-r from-transparent to-[#00F2FF]/50" />
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-[#00F2FF] rounded-full animate-pulse" />
            <div className="w-2 h-2 bg-[#FF8C00] rounded-full animate-pulse delay-75" />
            <div className="w-2 h-2 bg-[#00F2FF] rounded-full animate-pulse delay-150" />
          </div>
          <div className="h-px w-24 bg-gradient-to-l from-transparent to-[#00F2FF]/50" />
        </div>

        {/* Main Title */}
        <div className="relative inline-block">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00F2FF] via-white to-[#FF8C00]">
              <span className="text-[#00F2FF] opacity-80">{'<'}</span>
              <ScrambleText text="GEEKROOM" delay={100} speed={20} />
              <span className="text-[#FF8C00] opacity-80">{'>'}</span>
            </span>
          </h1>
          {/* Glowing underline */}
          <div className="absolute -bottom-2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00F2FF] to-transparent" />
        </div>

        {/* Subtitle with terminal style */}
        <div className="mt-6 flex items-center justify-center gap-2 text-sm font-mono text-white/40">
          <span className="text-[#00F2FF]">{'>>> '}</span>
          <ScrambleText text="Initialize Event Stream Protocol..." delay={300} speed={15} />
        </div>

        <p className="mt-6 max-w-2xl mx-auto text-lg text-foreground/80 sm:text-xl font-light leading-relaxed">
          <ScrambleText text="Discover our upcoming workshops, hackathons, and tech talks, or explore the highlights of our past events." delay={500} speed={10} />
        </p>
      </div>

      {/* Interactive Tabs & Event Cards */}
      <EventsClient events={mappedEvents} />

      {/* Tech Corner Decorations */}
      <TechDecorations />
    </main>
  );
}
