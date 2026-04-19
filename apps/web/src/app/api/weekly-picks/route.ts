import { NextRequest, NextResponse } from "next/server";
import {
  currentMonth,
  currentYear,
  weekOfMonth,
} from "@/lib/weekly-picks/weight";
import { computeWeeklyPicks } from "@/lib/weekly-picks/compute";

export const revalidate = 3600;

/**
 * GET /api/weekly-picks?month=&week=&year=
 *
 * Thin HTTP wrapper over computeWeeklyPicks(). Exists so external consumers
 * (the YouTube autoposter, future newsletter generators, shareable-card
 * workers) see the same picks the landing page renders — they call this;
 * the page calls computeWeeklyPicks() directly. Same function, same output,
 * no self-fetch at build time.
 */
export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;
  const today = new Date();
  const month = clamp(Number(params.get("month") || currentMonth(today)), 1, 12);
  const week = clamp(Number(params.get("week") || weekOfMonth(today)), 1, 5);
  const year = Number(params.get("year") || currentYear(today));

  try {
    const response = await computeWeeklyPicks(month, week, year);
    if (!response) {
      return NextResponse.json(
        { error: "Database not configured" },
        { status: 500 },
      );
    }
    return NextResponse.json(response, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message ?? "weekly-picks compute failed" },
      { status: 500 },
    );
  }
}

function clamp(n: number, lo: number, hi: number): number {
  if (Number.isNaN(n)) return lo;
  return Math.max(lo, Math.min(hi, n));
}
