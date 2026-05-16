// Single source of truth for "what month is it now" across NakshIQ.
//
// Why this exists: Vercel servers run in UTC, so a naive new Date().getMonth()
// flips to the new month at 00:00 UTC = 05:30 IST — which means Indian users
// see April content on May 1 morning until 05:30. We always reason in IST so
// "best in {month}" surfaces flip when Indian phones say it's the new month.
//
// Use these helpers in every place that needs the current month — server
// components, client components, API routes, blog widgets, nav menus.
// Do NOT call new Date().getMonth() / .toLocaleString() directly.

export const MONTH_SLUGS = [
  "january", "february", "march", "april", "may", "june",
  "july", "august", "september", "october", "november", "december",
] as const;

export const MONTH_LONG_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
] as const;

export type MonthSlug = (typeof MONTH_SLUGS)[number];

/** 1-12 month number for the current IST date. */
export function currentMonthIST(): number {
  return Number(
    new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata", month: "numeric" }),
  );
}

/** Lowercase English month slug for the current IST date — e.g. "may". */
export function currentMonthSlugIST(): MonthSlug {
  return MONTH_SLUGS[currentMonthIST() - 1];
}

/** Full English month name for the current IST date — e.g. "May". */
export function currentMonthLongIST(): string {
  return new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata", month: "long" });
}

/** Locale-aware long month name — pass "hi-IN" for Hindi months. */
export function currentMonthLocalisedIST(locale: string): string {
  return new Date().toLocaleString(locale, { timeZone: "Asia/Kolkata", month: "long" });
}
