import { currentMonthIST } from "@itp/shared";
import DATA from "@/data/month-shortlist.json";
import type { MonthShortlistPick } from "@/emails/month-shortlist";
import type { ShortlistTotals } from "./month-shortlist-summary";

type Raw = {
  destinations: Record<string, { name: string; tagline: string | null; state: string }>;
  months: Record<string, { monthLong: string; monthSlug: string; totals: ShortlistTotals; top: { id: string; score: number }[] }>;
};

/** The month's top 10 (for the signup email) for the current IST month. Import only from server code. */
export function shortlistNow(): { monthLong: string; monthSlug: string; totals: ShortlistTotals; top: MonthShortlistPick[] } {
  const raw = DATA as Raw;
  const m = raw.months[String(currentMonthIST())];
  return {
    monthLong: m.monthLong,
    monthSlug: m.monthSlug,
    totals: m.totals,
    top: m.top.map(({ id }) => ({ id, ...raw.destinations[id] })),
  };
}
