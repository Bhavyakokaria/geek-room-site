import { NextRequest } from "next/server";
import { exportSubmissionsCSV } from "@/app/actions/eventActions";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ eventId: string }> }
) {
  const { eventId } = await params;

  const csv = await exportSubmissionsCSV(eventId);

  if (!csv) {
    return new Response("No submissions found", { status: 404 });
  }

  return new Response(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": `attachment; filename="responses-${eventId}.csv"`,
    },
  });
}
