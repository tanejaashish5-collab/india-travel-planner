import { currentMonthIST } from "@itp/shared";
import DATA from "@/data/month-shortlist.json";
import type { MonthShortlistPick } from "@/emails/month-shortlist";
import type { ShortlistTotals } from "./month-shortlist-summary";

type Raw = {
  destinations: Record<string, Omit<MonthShortlistPick, "id" | "score">>;
  months: Record<string, { monthLong: string; monthSlug: string; totals: ShortlistTotals; top: { id: string; score: number }[] }>;
};

/** The month's top 10 (for the signup email) for the current IST month. Import only from server code. */
export function shortlistNow(): { monthLong: string; monthSlug: string; year: number; totals: ShortlistTotals; top: MonthShortlistPick[] } {
  const raw = DATA as Raw;
  const m = raw.months[String(currentMonthIST())];
  // IST year, same reasoning as currentMonthIST (Vercel runs UTC).
  const year = Number(new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata", year: "numeric" }));
  return {
    monthLong: m.monthLong,
    monthSlug: m.monthSlug,
    year,
    totals: m.totals,
    top: m.top.map(({ id, score }) => ({ id, score, ...raw.destinations[id] })),
  };
}
