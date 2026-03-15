import { LogoSequence } from "@/components/LogoSequence";
import { AboutPreview } from "@/components/AboutPreview";
import { TeamPreview } from "@/components/TeamPreview";
import { EventsPreview } from "@/components/EventsPreview";
import { GalleryPreview } from "@/components/GalleryPreview";

import { getMembers } from "@/app/actions/teamActions";
import { getEvents } from "@/app/actions/eventActions";

export default async function Home() {
  const members = await getMembers();
  const events = await getEvents();

  // Pick top core members for the team preview
  const previewMembers = members.filter(member => member.category === "Core");
  
  // Pick all past events for the scrolling events preview
  const previewEvents = events.filter(event => event.status === "past");

  return (
    <main className="relative bg-[#050505] min-h-screen text-[#ededed]">
      {/* 400vh Scrollytelling hero section */}
      <LogoSequence />
      
      {/* Redesigned Home/About Flow */}
      <AboutPreview />
      <TeamPreview members={previewMembers} />
      <EventsPreview events={previewEvents} />
      <GalleryPreview events={events} />
    </main>
  );
}
