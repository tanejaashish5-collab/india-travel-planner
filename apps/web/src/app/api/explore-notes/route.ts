import { NextResponse } from "next/server";
import { getExploreNotesForMonth } from "@/lib/explore-catalog";

// Lazy month notes for the /explore grid. The page ships only the current
// month's note per destination (all 12 months' notes were ~550 KB of the
// page's flight payload); when a visitor switches the month filter the grid
// fetches that month's notes here once.
//
// Same pattern as /api/search-index: always executes at origin, but the DB is
// shielded by the shared explore-catalog unstable_cache (one entry for page +
// endpoint), and the CDN copy below absorbs repeat hits. 12 URL variants max.
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const month = Number(new URL(req.url).searchParams.get("month"));
  if (!Number.isInteger(month) || month < 1 || month > 12) {
    return NextResponse.json({ error: "month must be 1-12" }, { status: 400 });
  }
  const notes = await getExploreNotesForMonth(month);
  return NextResponse.json(
    { month, notes },
    {
      headers: {
        "Cache-Control": "public, max-age=3600, s-maxage=21600, stale-while-revalidate=86400",
      },
    },
  );
}
