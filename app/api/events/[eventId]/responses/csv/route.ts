import { NextRequest, NextResponse } from "next/server";
import { exportSubmissionsCSV } from "@/app/actions/eventActions";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ eventId: string }> }
) {
  const { eventId } = await params;

  const csv = await exportSubmissionsCSV(eventId);

  if (!csv) {
    return new NextResponse("No submissions found", { status: 404 });
  }

  return new NextResponse(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": `attachment; filename="responses-${eventId}.csv"`,
    },
  });
}
