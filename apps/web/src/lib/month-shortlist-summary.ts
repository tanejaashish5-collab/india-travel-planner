import { currentMonthIST } from "@itp/shared";
import SUMMARY from "@/data/month-shortlist-summary.json";

// Client-safe counts for the shortlist offer, picked for the CURRENT IST month.
// The data file carries all 12 months (scripts/build-month-shortlist.mjs), so
// the copy turns over on the 1st without a rebuild. Until 2026-10-10 it held
// one month and the site said "The August shortlist" through October.
export type ShortlistTotals = {
  destinations: number;
  atTheirBest: number;
  inAMonthToAvoid: number;
  listed: number;
};

export function shortlistSummaryNow(): { month: number; monthLong: string; totals: ShortlistTotals } {
  const month = currentMonthIST();
  const m = (SUMMARY.months as Record<string, { monthLong: string; totals: ShortlistTotals }>)[String(month)];
  return { month, ...m };
}
