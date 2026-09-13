import { NextRequest, NextResponse } from "next/server";
import { getRoadUpdates, ROAD_REGIONS, STATUS_LABEL } from "@/lib/road-updates";

export const revalidate = 3600;
const SITE = "https://www.nakshiq.com";

const x = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** RSS 2.0 of the dated road log. /road-conditions/feed.xml[?region=<id>] */
export async function GET(req: NextRequest) {
  const region = req.nextUrl.searchParams.get("region") ?? undefined;
  const r = region ? ROAD_REGIONS.find((z) => z.id === region) : undefined;
  if (region && !r) return new NextResponse("unknown region", { status: 400 });
  const rows = await getRoadUpdates({ region, days: 60, limit: 200 });
  const title = r ? `NakshIQ road conditions: ${r.en}` : "NakshIQ India road conditions";
  const link = `${SITE}/en/road-conditions${r ? `/${r.id}` : ""}`;
  const items = rows.map((u) => {
    const regionName = ROAD_REGIONS.find((z) => z.id === u.region_id)?.en ?? u.region_id;
    return `    <item>
      <title>${x(`${u.segment}: ${STATUS_LABEL[u.status].en} (${u.update_date})`)}</title>
      <link>${x(`${SITE}/en/road-conditions/${u.region_id}#d-${u.update_date}`)}</link>
      <guid isPermaLink="false">${x(u.id)}</guid>
      <pubDate>${new Date(u.verified_at).toUTCString()}</pubDate>
      <category>${x(regionName)}</category>
      <description>${x(`${u.headline}${u.body ? " " + u.body : ""} Source: ${u.source_label}${u.source_published_at ? ` (${u.source_published_at})` : ""} ${u.source_url}`)}</description>
    </item>`;
  });
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${x(title)}</title>
    <link>${x(link)}</link>
    <atom:link href="${x(`${SITE}/road-conditions/feed.xml${r ? `?region=${r.id}` : ""}`)}" rel="self" type="application/rss+xml"/>
    <description>Dated, sourced log of road closures, restrictions and reopenings on Indian mountain and desert corridors. CC BY 4.0.</description>
    <language>en-in</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items.join("\n")}
  </channel>
</rss>
`;
  return new NextResponse(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8", "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400" },
  });
}
