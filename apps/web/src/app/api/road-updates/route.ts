import { NextRequest, NextResponse } from "next/server";
import { getRoadUpdates, ROAD_REGIONS } from "@/lib/road-updates";

export const revalidate = 3600;

/**
 * GET /api/road-updates?format=csv|json&region=<id>&days=<n>
 * The downloadable half of the citable asset. CC BY 4.0; attribution line is
 * in the first CSV comment row and the JSON envelope.
 */
export async function GET(req: NextRequest) {
  const sp = req.nextUrl.searchParams;
  const format = sp.get("format") === "csv" ? "csv" : "json";
  const region = sp.get("region") ?? undefined;
  if (region && !ROAD_REGIONS.some((r) => r.id === region)) {
    return NextResponse.json({ error: "unknown region" }, { status: 400 });
  }
  const days = Math.min(365, Math.max(1, Number(sp.get("days") ?? 90) || 90));
  const rows = await getRoadUpdates({ region, days, limit: 2000 });
  const attribution = "NakshIQ India road conditions tracker, https://www.nakshiq.com/en/road-conditions, CC BY 4.0";

  if (format === "json") {
    return NextResponse.json(
      { attribution, generated_at: new Date().toISOString(), days, region: region ?? null, count: rows.length, updates: rows },
      { headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400" } },
    );
  }

  const esc = (v: unknown) => `"${String(v ?? "").replace(/"/g, '""')}"`;
  const header = ["update_date", "region_id", "segment", "status", "headline", "body", "source_label", "source_url", "source_published_at", "verified_at"];
  const lines = [
    `# ${attribution}`,
    header.join(","),
    ...rows.map((r) => header.map((k) => esc((r as Record<string, unknown>)[k])).join(",")),
  ];
  return new NextResponse(lines.join("\n") + "\n", {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="nakshiq-road-updates${region ? `-${region}` : ""}.csv"`,
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
