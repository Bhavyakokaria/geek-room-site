import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import RegisterForm from "./RegisterForm";

export default async function RegisterEventPage({ params }: { params: Promise<{ eventId: string }> }) {
  const { eventId } = await params;

  const event = await prisma.event.findUnique({
    where: { id: eventId },
  });

  if (!event) notFound();

  const formSchema = event.formSchema as any[] | null;

  return (
    <RegisterForm
      eventId={event.id}
      eventTitle={event.title}
      formSchema={formSchema}
      registrationOpen={event.registrationOpen}
    />
  );
}
