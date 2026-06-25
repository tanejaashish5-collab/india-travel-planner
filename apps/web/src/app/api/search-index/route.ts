import { NextResponse } from "next/server";
import { getCachedSearchIndex } from "@/lib/cached-data";

// Always execute (never statically baked) so each origin run returns the latest
// unstable_cache contents. The DB is shielded by the unstable_cache inside
// getCachedSearchIndex (≤1 DB hit / 24h, busted on demand by revalidateTag).
//
// IMPORTANT (Next 16 cdn-caching docs): revalidateTag does NOT purge the Vercel
// CDN copy created by the Cache-Control header below — that copy self-expires
// after s-maxage. So a data write is reflected in this endpoint within the
// s-maxage window (≤1 h), not instantly. That's an acceptable lag for a
// rarely-changing search index; the DB-load goal does not depend on it.
// (s-maxage raised 300→3600 on 2026-06-25: bots were refetching the full
// catalog JSON from origin every 5 min, feeding Fast Origin Transfer.)
export const dynamic = "force-dynamic";

// Powers the global command palette (search-command), the mobile search modal,
// and the hero typeahead. Previously each of those fired 4–10 uncached Supabase
// queries per open / per keystroke from the browser. Now they fetch this one
// endpoint once per session and filter client-side.
//
export async function GET() {
  const index = await getCachedSearchIndex();
  return NextResponse.json(index, {
    headers: {
      // CDN/browser offload only (the DB shield is the unstable_cache inside).
      // s-maxage is the worst-case write→visible lag for search (revalidateTag
      // can't purge this CDN copy). stale-while-revalidate lets the edge serve
      // instantly while it refreshes in the background. 1h is plenty for a
      // rarely-changing index and stops bots refetching the full catalog hourly.
      "Cache-Control": "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
