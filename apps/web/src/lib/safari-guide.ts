// Pure (framework-free) helpers for the /safari/[slug] booking guide.
//
// Imported by BOTH the server page (SSR'd structured content — the bit Google +
// AI engines read) and any client widget, so month/fee formatting agrees on
// both sides (no hydration drift).
//
// Every field is rendered verbatim from a `park_safaris` row — NakshIQ's
// verified, source-cited safari data. Nothing is fabricated here; this module
// only formats month-sets and fees and picks the right-language strings.

import { MONTH_NAMES_EN, MONTH_NAMES_HI, inr } from "./trip-cost";

export { MONTH_NAMES_EN, MONTH_NAMES_HI, inr };

// Destinations that have a /safari/[slug] guide. Gates the inbound link on the
// destination hub (the page itself notFound()s for anything without a published
// park_safaris row, so this only governs whether we *advertise* the link).
// Keep in sync with the published rows in park_safaris when coverage grows.
export const SAFARI_PARK_SLUGS: ReadonlySet<string> = new Set([
  "ranthambore", "sariska", "corbett-national-park", "dudhwa-national-park",
  "kanha", "bandhavgarh", "tadoba", "pench-maharashtra",
  "thekkady", "wayanad", "gir-national-park",
  "bandipur", "nagarhole", "kabini", "dandeli", "mudumalai",
  "kaziranga", "manas-national-park", "sundarbans", "bhitarkanika",
]);

export function hasSafariGuide(slug: string): boolean {
  return SAFARI_PARK_SLUGS.has(slug);
}

// Fees can be an exact number (₹2,000) OR a verbatim string when the real
// tariff is a range / weekday-weekend split ("₹4,500–6,000 per jeep") — keeping
// the agent's sourced nuance beats flattening it to one wrong number.
export type Fee = number | string | null;

export type SafariType = {
  type: string;
  capacity: number | string | null;
  shifts: string[];
  price_inr_indian: Fee;
  price_inr_foreigner: Fee;
  notes: string;
};

export type SafariZone = {
  name: string;
  gate?: string;
  best_for: string;
  premium: boolean;
  notes: string;
};

export type SafariPitfall = { title: string; detail: string };
export type SafariSource = { label: string; url: string };

/** One row of the `park_safaris` table (the columns we read). */
export type SafariRow = {
  destination_id: string;
  park_full_name: string;
  booking_authority: string | null;
  official_booking_url: string | null;
  advance_booking_days: number | null;
  has_tatkal: boolean;
  booking_opens_note: string | null;
  open_months: number[];
  closed_months: number[];
  best_months: number[];
  id_required: string[];
  safari_types: SafariType[];
  zones: SafariZone[];
  booking_steps: string[];
  pitfalls: SafariPitfall[];
  fees_note: string | null;
  core_buffer_note: string | null;
  sources: SafariSource[];
  translations: {
    hi?: Partial<{
      park_full_name: string;
      booking_authority: string;
      booking_opens_note: string;
      id_required: string[];
      safari_types: { type: string; notes: string }[];
      zones: { name: string; best_for: string; notes: string }[];
      booking_steps: string[];
      pitfalls: SafariPitfall[];
      fees_note: string;
      core_buffer_note: string;
    }>;
  } | null;
  last_verified: string | null;
};

/**
 * Resolve a row into a single locale's strings. Numbers, months, URLs, sources,
 * capacities and the premium flag are language-neutral and pass through; only
 * the prose fields swap to Hindi when present (English fallback otherwise — so
 * a missing translation never blanks the page).
 */
export function localizeSafari(row: SafariRow, locale: string): SafariRow {
  if (locale !== "hi" || !row.translations?.hi) return row;
  const hi = row.translations.hi;

  const mergeByIndex = <T extends object, U extends object>(
    base: T[],
    over: U[] | undefined,
  ): (T & Partial<U>)[] =>
    base.map((b, i) => ({ ...b, ...(over?.[i] ?? {}) }));

  return {
    ...row,
    park_full_name: hi.park_full_name || row.park_full_name,
    booking_authority: hi.booking_authority ?? row.booking_authority,
    booking_opens_note: hi.booking_opens_note ?? row.booking_opens_note,
    id_required: hi.id_required?.length ? hi.id_required : row.id_required,
    safari_types: mergeByIndex(row.safari_types, hi.safari_types) as SafariType[],
    zones: mergeByIndex(row.zones, hi.zones) as SafariZone[],
    booking_steps: hi.booking_steps?.length ? hi.booking_steps : row.booking_steps,
    pitfalls: hi.pitfalls?.length ? hi.pitfalls : row.pitfalls,
    fees_note: hi.fees_note ?? row.fees_note,
    core_buffer_note: hi.core_buffer_note ?? row.core_buffer_note,
  };
}

/**
 * Compress a month-set (1-12) into contiguous ranges, handling the common
 * wrap-around case (Oct–Jun, when Jul-Sep is the only gap). Returns ranges as
 * [start, end] pairs; a single month is [m, m].
 */
function monthRanges(months: number[]): [number, number][] {
  const set = Array.from(new Set(months.filter((m) => m >= 1 && m <= 12))).sort((a, b) => a - b);
  if (set.length === 0) return [];
  if (set.length === 12) return [[1, 12]];

  const missing: number[] = [];
  for (let m = 1; m <= 12; m++) if (!set.includes(m)) missing.push(m);

  const isContig = (arr: number[]) => arr.every((v, i) => i === 0 || v === arr[i - 1] + 1);

  // If the *gap* is a single contiguous block (no wrap), the open set is one
  // wrap-around range from (last-missing + 1) to (first-missing − 1).
  if (missing.length && isContig(missing)) {
    const start = (missing[missing.length - 1] % 12) + 1; // month after the gap
    const end = ((missing[0] - 2 + 12) % 12) + 1; // month before the gap
    return [[start, end]];
  }

  // General: linear contiguous ranges over the present set.
  const ranges: [number, number][] = [];
  let s = set[0];
  let p = set[0];
  for (let i = 1; i < set.length; i++) {
    if (set[i] === p + 1) {
      p = set[i];
    } else {
      ranges.push([s, p]);
      s = set[i];
      p = set[i];
    }
  }
  ranges.push([s, p]);
  return ranges;
}

/** "October–June" / "March–May" / "year-round". */
export function formatMonths(
  months: number[],
  names: readonly string[],
  yearRoundLabel: string,
): string {
  if (months.length === 0) return "";
  if (Array.from(new Set(months)).length === 12) return yearRoundLabel;
  return monthRanges(months)
    .map(([a, b]) => (a === b ? names[a - 1] : `${names[a - 1]}–${names[b - 1]}`))
    .join(", ");
}

/** Render one fee side: number → "₹2,000"; non-empty string → verbatim; else null. */
function feeText(fee: Fee): string | null {
  if (typeof fee === "number" && fee > 0) return inr(fee);
  if (typeof fee === "string" && fee.trim()) {
    const t = fee.trim();
    // Prefix a ₹ only when the string is bare digits/ranges (no currency word yet).
    return /^[\d][\d,\s–\-to]*$/.test(t) ? `₹${t}` : t;
  }
  return null;
}

/** "₹2,000 (Indian) · ₹4,000 (foreigner)" — omits whichever side is unknown. */
export function formatFeePair(t: SafariType, locale: string): string {
  const isHi = locale === "hi";
  const ind = isHi ? "भारतीय" : "Indian";
  const fgn = isHi ? "विदेशी" : "foreigner";
  const parts: string[] = [];
  const indFee = feeText(t.price_inr_indian);
  const fgnFee = feeText(t.price_inr_foreigner);
  if (indFee) parts.push(`${indFee} (${ind})`);
  if (fgnFee) parts.push(`${fgnFee} (${fgn})`);
  if (parts.length === 0) return isHi ? "गेट पर पूछें" : "ask at gate";
  return parts.join(" · ");
}

/** Lowest *numeric* Indian per-trip safari fee on the row, for the headline/FAQ. */
export function cheapestIndianFee(types: SafariType[]): number | null {
  const fees = types
    .map((t) => t.price_inr_indian)
    .filter((v): v is number => typeof v === "number" && v > 0);
  return fees.length ? Math.min(...fees) : null;
}
