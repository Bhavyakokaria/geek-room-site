import { getEvents } from "@/app/actions/eventActions";
import EditEventForm from "./EditEventForm";
import { notFound } from "next/navigation";

export default async function EditEventPage({ params }: { params: { id: string } }) {
  const events = await getEvents();
  // Support Next.js 14 and 15 gracefully by awaiting params if it happens to be a promise in the future,
  // but just destructuring id works in 14. We'll ignore the type complaints for now or just await it.
  const { id } = await params;
  
  const event = events.find(e => e.id === id);

  if (!event) {
    notFound();
  }

  return <EditEventForm initialEvent={event} />;
}
