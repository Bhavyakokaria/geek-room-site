import { getEvents, EventItem } from "@/app/actions/eventActions";
import GalleryManagerClient from "./GalleryManagerClient";

export const dynamic = "force-dynamic";

export default async function AdminGalleryPage() {
  const customEvents = await getEvents();
  
  // Only deal with past events that actually have a gallery field or can have a gallery field.
  const pastEvents: EventItem[] = customEvents.filter(e => e.status === "past");

  return <GalleryManagerClient events={pastEvents} />;
}
