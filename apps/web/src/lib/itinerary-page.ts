// itinerary-page.ts — types + the min-content gate for the /itinerary/[slug]
// surface. Pure (framework-free), mirrors safari-guide.ts: imported by the
// server page, the sitemap allowlist (via lib/cached-data) and the destination
// hub, so all three agree on which destinations carry an itinerary page.
//
// WHY A GATE: 491/525 destinations carry day-structured `micro_itineraries`
// JSONB, but some plans are terse (five-day blocks like "Amber deep."). A page
// that thin would be index-bait with no answer, so a destination only gets
// /itinerary/[slug] when a one-day plan exists AND the combined plan text
// crosses MIN_ITINERARY_CHARS. Everything else notFound()s and stays out of
// the sitemap — the plans still render inside the destination hub either way;
// the gate only decides whether a standalone page is warranted.

/** Shapes match micro-itinerary-section.tsx (the hub renderer) verbatim. */
export type ItineraryBlock = { time: string; text: string };
export type ItineraryOneDay = {
  title?: string;
  blocks: ItineraryBlock[];
  bad_weather_plan?: string;
};
export type ItineraryDayPlan = {
  day: number;
  headline?: string;
  blocks: ItineraryBlock[];
};
export type MicroItineraries = {
  one_day?: ItineraryOneDay | null;
  three_days?: ItineraryDayPlan[] | null;
  five_days?: ItineraryDayPlan[] | null;
};

export const MIN_ITINERARY_CHARS = 400;

function blocksLength(blocks: ItineraryBlock[] | null | undefined): number {
  let n = 0;
  for (const b of blocks ?? []) n += (b?.text ?? "").length + (b?.time ?? "").length;
  return n;
}

/** Combined character count across every plan the row carries. */
export function itineraryTextLength(mi: MicroItineraries | null | undefined): number {
  if (!mi) return 0;
  let n = 0;
  if (mi.one_day) {
    n += blocksLength(mi.one_day.blocks);
    n += (mi.one_day.title ?? "").length;
    n += (mi.one_day.bad_weather_plan ?? "").length;
  }
  for (const day of mi.three_days ?? []) {
    n += (day?.headline ?? "").length + blocksLength(day?.blocks);
  }
  for (const day of mi.five_days ?? []) {
    n += (day?.headline ?? "").length + blocksLength(day?.blocks);
  }
  return n;
}

/** The min-content gate — true when /itinerary/[slug] should exist. */
export function hasItineraryPage(mi: MicroItineraries | null | undefined): boolean {
  if (!mi?.one_day || !Array.isArray(mi.one_day.blocks) || mi.one_day.blocks.length === 0) {
    return false;
  }
  return itineraryTextLength(mi) >= MIN_ITINERARY_CHARS;
}

/** Which durations a row actually carries, in page order. */
export function availableDurations(mi: MicroItineraries): (1 | 3 | 5)[] {
  const out: (1 | 3 | 5)[] = [];
  if (mi.one_day?.blocks?.length) out.push(1);
  if (mi.three_days?.length) out.push(3);
  if (mi.five_days?.length) out.push(5);
  return out;
}

/** "1, 3 & 5 days" / "1 और 3 दिन" — honest day-list for titles and headings. */
export function durationPhrase(durations: (1 | 3 | 5)[], locale: string): string {
  const isHindi = locale === "hi";
  const nums = durations.map(String);
  const and = isHindi ? "और" : "&";
  const joined =
    nums.length <= 1
      ? (nums[0] ?? "1")
      : `${nums.slice(0, -1).join(", ")} ${and} ${nums[nums.length - 1]}`;
  if (isHindi) return `${joined} दिन`;
  return durations.length === 1 && durations[0] === 1 ? `${joined} day` : `${joined} days`;
}
