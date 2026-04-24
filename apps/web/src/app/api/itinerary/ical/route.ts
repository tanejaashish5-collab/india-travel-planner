/**
 * /api/itinerary/ical — convert a NakshIQ itinerary JSON into a VCALENDAR file
 * for Google Calendar, Apple Calendar, Outlook. Each day becomes a full-day VEVENT.
 * A preparation reminder is added 7 days before Day 1.
 *
 * POST body: { itinerary: <Itinerary>, startDate: "YYYY-MM-DD" }
 */
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

function escapeICS(s: string): string {
  return String(s ?? "")
    .replace(/\\/g, "\\\\")
    .replace(/\n/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;");
}

function formatDateICS(date: Date): string {
  const yyyy = date.getUTCFullYear();
  const mm = String(date.getUTCMonth() + 1).padStart(2, "0");
  const dd = String(date.getUTCDate()).padStart(2, "0");
  return `${yyyy}${mm}${dd}`;
}

function formatTimestampICS(date: Date): string {
  const yyyy = date.getUTCFullYear();
  const mm = String(date.getUTCMonth() + 1).padStart(2, "0");
  const dd = String(date.getUTCDate()).padStart(2, "0");
  const hh = String(date.getUTCHours()).padStart(2, "0");
  const mi = String(date.getUTCMinutes()).padStart(2, "0");
  const ss = String(date.getUTCSeconds()).padStart(2, "0");
  return `${yyyy}${mm}${dd}T${hh}${mi}${ss}Z`;
}

function addDays(date: Date, n: number): Date {
  const d = new Date(date);
  d.setUTCDate(d.getUTCDate() + n);
  return d;
}

export async function POST(req: NextRequest) {
  let body: { itinerary?: any; startDate?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const itinerary = body.itinerary;
  if (!itinerary?.days || !Array.isArray(itinerary.days) || itinerary.days.length === 0) {
    return NextResponse.json({ error: "missing_itinerary_days" }, { status: 400 });
  }

  // Default start: 14 days from today if no startDate provided.
  const startRaw = typeof body.startDate === "string" ? body.startDate : "";
  const startDate = /^\d{4}-\d{2}-\d{2}$/.test(startRaw)
    ? new Date(`${startRaw}T00:00:00Z`)
    : addDays(new Date(), 14);

  if (isNaN(startDate.getTime())) {
    return NextResponse.json({ error: "invalid_start_date" }, { status: 400 });
  }

  const now = formatTimestampICS(new Date());
  const uidBase = `${Date.now()}-nakshiq`;

  const lines: string[] = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//NakshIQ//Itinerary Export//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    `X-WR-CALNAME:${escapeICS(itinerary.title || "NakshIQ Trip")}`,
    `X-WR-CALDESC:${escapeICS(itinerary.summary || "Trip plan from NakshIQ")}`,
  ];

  // Pre-trip prep reminder: 7 days before Day 1.
  const prepDate = addDays(startDate, -7);
  lines.push(
    "BEGIN:VEVENT",
    `UID:${uidBase}-prep@nakshiq.com`,
    `DTSTAMP:${now}`,
    `DTSTART;VALUE=DATE:${formatDateICS(prepDate)}`,
    `DTEND;VALUE=DATE:${formatDateICS(addDays(prepDate, 1))}`,
    "SUMMARY:Trip prep — NakshIQ pack list + permits",
    `DESCRIPTION:${escapeICS(
      `One week out from your ${itinerary.title || "trip"}.\n\n` +
      `Packing tips:\n${(itinerary.packingTips || []).map((t: string) => `- ${t}`).join("\n")}\n\n` +
      `Warnings:\n${(itinerary.warnings || []).map((w: string) => `- ${w}`).join("\n")}`
    )}`,
    "BEGIN:VALARM",
    "TRIGGER:-PT9H",
    "ACTION:DISPLAY",
    "DESCRIPTION:Trip in 7 days — pack and confirm bookings",
    "END:VALARM",
    "END:VEVENT"
  );

  // One full-day event per itinerary day.
  itinerary.days.forEach((d: any, idx: number) => {
    const dayDate = addDays(startDate, idx);
    const dayEnd = addDays(dayDate, 1);

    const descParts: string[] = [];
    if (d.rationale) descParts.push(d.rationale);
    if (d.travelTime) descParts.push(`Travel: ${d.travelTime}`);
    if (d.stayAt) descParts.push(`Stay: ${d.stayAt}`);
    if (d.meals) descParts.push(`Meals: ${d.meals}`);
    if (d.tips) descParts.push(`Tip: ${d.tips}`);
    if (Array.isArray(d.activities) && d.activities.length) {
      descParts.push("\nActivities:");
      d.activities.forEach((a: string) => descParts.push(`- ${a}`));
    }

    const title = d.title || d.destinationName || `Day ${d.day ?? idx + 1}`;

    lines.push(
      "BEGIN:VEVENT",
      `UID:${uidBase}-day${idx + 1}@nakshiq.com`,
      `DTSTAMP:${now}`,
      `DTSTART;VALUE=DATE:${formatDateICS(dayDate)}`,
      `DTEND;VALUE=DATE:${formatDateICS(dayEnd)}`,
      `SUMMARY:${escapeICS(`Day ${d.day ?? idx + 1} — ${title}`)}`,
      `DESCRIPTION:${escapeICS(descParts.join("\n"))}`,
      `LOCATION:${escapeICS(d.destinationName || title)}`,
      "END:VEVENT"
    );
  });

  lines.push("END:VCALENDAR");

  // Fold lines longer than 75 octets per RFC 5545.
  const folded = lines
    .map((line) => {
      if (line.length <= 75) return line;
      const parts: string[] = [];
      let remaining = line;
      parts.push(remaining.slice(0, 75));
      remaining = remaining.slice(75);
      while (remaining.length > 74) {
        parts.push(" " + remaining.slice(0, 74));
        remaining = remaining.slice(74);
      }
      if (remaining.length) parts.push(" " + remaining);
      return parts.join("\r\n");
    })
    .join("\r\n");

  const filename = (itinerary.title || "nakshiq-trip")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60) + ".ics";

  return new Response(folded, {
    headers: {
      "content-type": "text/calendar; charset=utf-8",
      "content-disposition": `attachment; filename="${filename}"`,
      "cache-control": "no-store",
    },
  });
}
