import { NextResponse } from "next/server";
import { getSnowOutlooks } from "@/lib/snow-outlook";

export const revalidate = 600;

/**
 * GET /api/snow-toast — what the home-page snow toast shows. Only "likely" calls from the
 * latest run count, and getSnowOutlooks already returns nothing when that run is over 36 h
 * old, so a stopped job can never leave an old forecast sitting on the landing page.
 */
export async function GET() {
  const view = await getSnowOutlooks();
  const likely = view.stale ? [] : view.outlooks.filter((o) => o.confidence === "likely");
  if (!likely.length) {
    return NextResponse.json({ toast: null }, { headers: { "Cache-Control": "public, s-maxage=600, stale-while-revalidate=1800" } });
  }
  const names = likely.slice(0, 2).map((o) => ({ en: o.point?.name ?? o.point_id, hi: o.point?.name_hi ?? o.point?.name ?? o.point_id }));
  const toast = {
    count: likely.length,
    names,
    window_start: likely.reduce((m, o) => (o.window_start < m ? o.window_start : m), likely[0].window_start),
    window_end: likely.reduce((m, o) => (o.window_end > m ? o.window_end : m), likely[0].window_end),
    run_at: view.lastRun?.run_at ?? null,
  };
  return NextResponse.json({ toast }, { headers: { "Cache-Control": "public, s-maxage=600, stale-while-revalidate=1800" } });
}
