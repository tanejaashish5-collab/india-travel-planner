import { NextResponse } from "next/server";

// Manual sitemap index. Replaces the Next.js 16 auto-generated /sitemap.xml
// from the sitemap.ts + generateSitemaps() convention, which was 500-ing
// despite force-dynamic + non-cached helpers (E132 inside the framework's
// auto-index path). The 6 chunk handlers at /sitemap/[file].xml continue
// to serve the actual URL data; this file only emits the index that
// references them.

export const dynamic = "force-dynamic";

const BASE = "https://www.nakshiq.com";
const CHUNK_IDS = ["0", "1", "2", "3", "4", "5"] as const;

export async function GET() {
  const now = new Date().toISOString();
  const sitemaps = CHUNK_IDS.map(
    (id) => `  <sitemap>\n    <loc>${BASE}/sitemap/${id}.xml</loc>\n    <lastmod>${now}</lastmod>\n  </sitemap>`,
  ).join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemaps}\n</sitemapindex>\n`;

  return new NextResponse(xml, {
    headers: {
      "content-type": "application/xml; charset=utf-8",
      "cache-control": "public, max-age=0, s-maxage=21600, stale-while-revalidate=86400",
    },
  });
}
