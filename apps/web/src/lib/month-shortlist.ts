import { currentMonthIST } from "@itp/shared";
import DATA from "@/data/month-shortlist.json";
import type { MonthShortlistState } from "@/emails/month-shortlist";
import type { ShortlistTotals } from "./month-shortlist-summary";

type Raw = {
  destinations: Record<string, { name: string; tagline: string | null; state: string }>;
  months: Record<string, { monthLong: string; totals: ShortlistTotals; states: { state: string; ids: string[] }[] }>;
};

/** The full shortlist (for the email) for the current IST month. Import only from server code: ~180 KB of taglines. */
export function shortlistNow(): { monthLong: string; totals: ShortlistTotals; states: MonthShortlistState[] } {
  const raw = DATA as Raw;
  const m = raw.months[String(currentMonthIST())];
  return {
    monthLong: m.monthLong,
    totals: m.totals,
    states: m.states.map((s) => ({
      state: s.state,
      destinations: s.ids.map((id) => ({ id, name: raw.destinations[id].name, tagline: raw.destinations[id].tagline })),
    })),
  };
}
