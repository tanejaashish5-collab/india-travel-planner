/**
 * Editorial weight calculator + week-number utility.
 *
 * Pure functions — no imports, no side effects, fully testable.
 *
 * Why a weight at all: with 68+ destinations tied at 5/5 in April, `score`
 * alone can't rank them. This adds a transparent, data-completeness
 * tiebreaker so Jibhi (rich note) outranks Anamalai (empty note) without
 * anyone editing scores.
 *
 * Formula locked in plan (Weekly_Picks_PRD_v1.docx §4.1 Stage 2). Points are
 * additive, not multiplicative, and every signal is a field that already
 * exists in Supabase — no new data required.
 */

export interface WeightableMonthRow {
  note: string | null;
  prose_lead: string | null;
  who_should_go: string | null;
  who_should_avoid: string | null;
}

export interface WeightableDestination {
  tagline: string | null;
  tags: string[] | null;
  elevation_m: number | null;
  budget_tier: string | null;
  /** present=true bumps weight by 1 regardless of suitable/rating values. */
  has_kids_friendly: boolean;
}

/** 14 possible points, roughly calibrated so empty rows score ≤2 and fully
 *  populated rows hit 12-14. */
export function editorialWeight(
  monthRow: WeightableMonthRow,
  dest: WeightableDestination,
): number {
  let w = 0;
  const noteLen = (monthRow.note ?? "").trim().length;
  if (noteLen >= 40) w += 3;
  if (noteLen >= 80) w += 2;
  if (noteLen >= 120) w += 1;

  if (hasText(monthRow.prose_lead)) w += 2;
  if (hasText(monthRow.who_should_go)) w += 1;
  if (hasText(monthRow.who_should_avoid)) w += 1;

  if ((dest.tagline ?? "").trim().length >= 30) w += 1;
  const tagCount = Array.isArray(dest.tags) ? dest.tags.length : 0;
  if (tagCount >= 3) w += 1;
  if (tagCount >= 5) w += 1;

  if (dest.elevation_m !== null && dest.elevation_m !== undefined) w += 1;
  if (hasText(dest.budget_tier)) w += 1;

  if (dest.has_kids_friendly) w += 1;

  return w;
}

export function noteLength(monthRow: WeightableMonthRow): number {
  return (monthRow.note ?? "").trim().length;
}

function hasText(s: string | null | undefined): boolean {
  return typeof s === "string" && s.trim().length > 0;
}

/* ────────────────────────────────────────────────────────────────────────
 * Week utilities
 *
 * Week boundary = Monday 00:00 IST. For simplicity we use day-of-month /7
 * bucketing, which aligns closely enough to the autoposter's weekly cadence
 * (it runs 3×/week — the week number won't drift mid-week in any way that
 * causes Shorts/landing desync).
 * ─────────────────────────────────────────────────────────────────────── */

export function weekOfMonth(date: Date = new Date()): number {
  const day = date.getDate();
  return Math.min(5, Math.max(1, Math.floor((day - 1) / 7) + 1));
}

export function currentMonth(date: Date = new Date()): number {
  return date.getMonth() + 1;
}

export function currentYear(date: Date = new Date()): number {
  return date.getFullYear();
}

/** "April 15–21, 2026" style label for a given month/week/year. */
export function weekDateRange(
  year: number,
  month: number,
  week: number,
): string {
  const startDay = (week - 1) * 7 + 1;
  const lastDayOfMonth = new Date(year, month, 0).getDate();
  const endDay = Math.min(lastDayOfMonth, startDay + 6);
  const monthName = MONTH_NAMES[month];
  return `${monthName} ${startDay}–${endDay}, ${year}`;
}

export const MONTH_NAMES: Record<number, string> = {
  1: "January", 2: "February", 3: "March", 4: "April",
  5: "May", 6: "June", 7: "July", 8: "August",
  9: "September", 10: "October", 11: "November", 12: "December",
};

/** Previous / next week, handling month rollover. Returns null for
 *  navigation beyond the current month (PRD §6: next_week null if future). */
export function previousWeek(
  year: number,
  month: number,
  week: number,
): { year: number; month: number; week: number } {
  if (week > 1) return { year, month, week: week - 1 };
  const prevMonth = month === 1 ? 12 : month - 1;
  const prevYear = month === 1 ? year - 1 : year;
  return { year: prevYear, month: prevMonth, week: 4 };
}

export function nextWeek(
  year: number,
  month: number,
  week: number,
): { year: number; month: number; week: number } | null {
  const today = new Date();
  const todayMonth = today.getMonth() + 1;
  const todayYear = today.getFullYear();
  const todayWeek = weekOfMonth(today);

  if (week < 4) {
    if (year > todayYear) return null;
    if (year === todayYear && month > todayMonth) return null;
    if (year === todayYear && month === todayMonth && week + 1 > todayWeek) return null;
    return { year, month, week: week + 1 };
  }
  const nMonth = month === 12 ? 1 : month + 1;
  const nYear = month === 12 ? year + 1 : year;
  if (nYear > todayYear) return null;
  if (nYear === todayYear && nMonth > todayMonth) return null;
  return { year: nYear, month: nMonth, week: 1 };
}
