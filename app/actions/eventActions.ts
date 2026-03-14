"use server";

import fs from "fs/promises";
import path from "path";
import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

export type Winner = {
  rank: string;
  teamName: string;
  members?: string[];
  photo?: string;
};

export type EventItem = {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  registrationLink?: string;
  image: string;
  status: "upcoming" | "past";
  category?: string;
  time?: string;
  registrationOpen?: boolean;
  gallery?: string[];
  winners?: Winner[];
};

export async function addEvent(eventData: EventItem) {
  try {
    const filePath = path.join(process.cwd(), "data", "events.json");
    const fileContent = await fs.readFile(filePath, "utf-8");
    const events: EventItem[] = JSON.parse(fileContent);

    // Add new event
    events.push(eventData);

    events.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    // Write back
    await fs.writeFile(filePath, JSON.stringify(events, null, 2), "utf-8");

    // Revalidate events page
    revalidatePath("/events");
    revalidatePath("/admin");

    return { success: true };
  } catch (error: any) {
    console.error("Failed to add event:", error);
    return { success: false, error: error.message };
  }
}

export async function updateEvent(id: string, eventData: Partial<EventItem>) {
  try {
    const filePath = path.join(process.cwd(), "data", "events.json");
    const fileContent = await fs.readFile(filePath, "utf-8");
    const events: EventItem[] = JSON.parse(fileContent);

    const index = events.findIndex(e => e.id === id);
    if (index === -1) {
      return { success: false, error: "Event not found" };
    }

    events[index] = { ...events[index], ...eventData };
    events.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    await fs.writeFile(filePath, JSON.stringify(events, null, 2), "utf-8");

    revalidatePath("/events");
    revalidatePath("/admin");

    return { success: true };
  } catch (error: any) {
    console.error("Failed to update event:", error);
    return { success: false, error: error.message };
  }
}

export async function deleteEvent(id: string) {
  try {
    const filePath = path.join(process.cwd(), "data", "events.json");
    const fileContent = await fs.readFile(filePath, "utf-8");
    const events: EventItem[] = JSON.parse(fileContent);

    const index = events.findIndex(e => e.id === id);
    if (index === -1) {
      return { success: false, error: "Event not found" };
    }

    events.splice(index, 1);

    await fs.writeFile(filePath, JSON.stringify(events, null, 2), "utf-8");

    revalidatePath("/events");
    revalidatePath("/admin");
    revalidatePath("/gallery");

    return { success: true };
  } catch (error: any) {
    console.error("Failed to delete event:", error);
    return { success: false, error: error.message };
  }
}

export async function registerForEvent(registrationData: {
  eventId: string;
  name: string;
  email: string;
  phone: string;
  college: string;
}) {
  try {
    const { error } = await supabase.from("events_registration").insert([
      {
        event_id: registrationData.eventId,
        name: registrationData.name,
        email: registrationData.email,
        phone: registrationData.phone,
        college: registrationData.college,
        timestamp: new Date().toISOString(),
      },
    ]);

    if (error) throw error;

    return { success: true };
  } catch (error: any) {
    console.error("Registration failed:", error);
    return { success: false, error: error.message };
  }
}

export async function getEvents(): Promise<EventItem[]> {
  try {
    const filePath = path.join(process.cwd(), "data", "events.json");
    const fileContent = await fs.readFile(filePath, "utf-8");
    const events: EventItem[] = JSON.parse(fileContent);

    const todayDate = new Date();
    todayDate.setHours(0,0,0,0); // reset time to start of day for accurate comparison

    // Auto-transition: change status to "past" if date is strictly before today
    const modifiedEvents = events.map(e => {
      const eventDate = new Date(e.date);
      let newStatus = e.status;
      
      // If event's scheduled date is in the past, it's a past event.
      if (newStatus === "upcoming" && eventDate < todayDate) {
         newStatus = "past";
      }

      return {
        ...e,
        status: newStatus
      };
    });

    const upcoming = modifiedEvents.filter(e => e.status === "upcoming");
    const past = modifiedEvents.filter(e => e.status === "past");

    // Upcoming: Ascending (closest first)
    upcoming.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    
    // Past: Descending (most recent first)
    past.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return [...upcoming, ...past];
  } catch (error: any) {
    console.error("Failed to fetch events", error);
    return [];
  }
}

