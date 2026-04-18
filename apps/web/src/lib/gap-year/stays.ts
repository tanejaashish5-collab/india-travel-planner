import type { SupabaseClient } from "@supabase/supabase-js";
import type { StayPick, StaySlot } from "./types";

const MIN_CONFIDENCE = 0.6;

/**
 * pickStays — returns up to 4 curated stay picks for a destination.
 *
 * Strategy:
 *  1. Read `destination_stay_picks` (cache table).
 *  2. If we have ≥3 published rows with confidence ≥ 0.6, use them.
 *  3. Otherwise, fall back to classifying the `local_stays` rows on-the-fly.
 *  4. If nothing is available, return an empty array — the UI shows a
 *     "NakshIQ is finalising picks" placeholder.
 */
export async function pickStays(
  supabase: SupabaseClient,
  destinationId: string
): Promise<StayPick[]> {
  // 1) cache
  const { data: cached } = await supabase
    .from("destination_stay_picks")
    .select("slot, name, property_type, price_band, why_nakshiq, source, source_ref, confidence")
    .eq("destination_id", destinationId)
    .eq("published", true);

  const goodCached = (cached ?? []).filter((r: any) => (r.confidence ?? 1) >= MIN_CONFIDENCE);
  if (goodCached.length >= 3) {
    return goodCached.map((r: any) => ({
      slot: r.slot as StaySlot,
      name: r.name,
      propertyType: r.property_type,
      priceBand: r.price_band,
      whyNakshiq: r.why_nakshiq,
      source: r.source,
      sourceRef: r.source_ref,
      confidence: r.confidence,
    }));
  }

  // 2) fallback — classify local_stays
  const { data: stays } = await supabase
    .from("local_stays")
    .select("id, name, type, location, price_range, why_special, best_for, tags")
    .eq("destination_id", destinationId);

  if (!stays || stays.length === 0) return [];

  return classifyLocalStays(stays);
}

type LocalStayRow = {
  id: string;
  name: string;
  type: string;
  location?: string | null;
  price_range?: string | null;
  why_special?: string | null;
  best_for?: string | null;
  tags?: string[] | null;
};

/**
 * Pure function (unit-testable) — takes local_stays rows and picks at most
 * one per slot: experience, value, location, xfactor.
 *
 * Rules (best-effort from the sparse columns we have):
 *  - experience: highest price_range, or heritage/luxury tag, or type IN (resort, palace, hotel).
 *  - value: lowest price_range, or type IN (homestay, hostel, camp).
 *  - location: location field mentions "center|main|station", or tag "central".
 *  - xfactor: longest why_special, or offbeat/unique tags.
 */
export function classifyLocalStays(rows: LocalStayRow[]): StayPick[] {
  if (!rows.length) return [];

  const priceScore = (r: LocalStayRow) => extractPriceMidpoint(r.price_range);
  const tagContains = (r: LocalStayRow, needle: string) =>
    (r.tags ?? []).some((t) => t.toLowerCase().includes(needle));

  const sortedByPriceDesc = [...rows].sort((a, b) => priceScore(b) - priceScore(a));
  const sortedByPriceAsc = [...rows].sort((a, b) => priceScore(a) - priceScore(b));

  const experience =
    rows.find((r) => tagContains(r, "heritage") || tagContains(r, "luxury") || tagContains(r, "palace")) ??
    sortedByPriceDesc.find((r) => ["resort", "hotel", "heritage"].includes(r.type)) ??
    sortedByPriceDesc[0];

  const value =
    rows.find((r) => ["homestay", "hostel"].includes(r.type) && priceScore(r) > 0) ??
    sortedByPriceAsc.find((r) => priceScore(r) > 0) ??
    sortedByPriceAsc[0];

  const location =
    rows.find((r) =>
      r.location && /\b(center|main|station|market|beach[- ]front|central)\b/i.test(r.location)
    ) ??
    rows.find((r) => tagContains(r, "central") || tagContains(r, "walkable"));

  const xfactor =
    rows.find(
      (r) =>
        !!r.why_special &&
        (tagContains(r, "offbeat") || tagContains(r, "unique") || tagContains(r, "treehouse") || tagContains(r, "farmstay"))
    ) ??
    [...rows].sort((a, b) => (b.why_special?.length ?? 0) - (a.why_special?.length ?? 0))[0];

  const picks: StayPick[] = [];
  const used = new Set<string>();
  function add(slot: StaySlot, row: LocalStayRow | undefined, reason: string) {
    if (!row) return;
    if (used.has(row.id)) return; // avoid the same stay in multiple slots
    used.add(row.id);
    picks.push({
      slot,
      name: row.name,
      propertyType: row.type,
      priceBand: row.price_range ?? null,
      whyNakshiq: reason || row.why_special || `${row.type} in ${row.location ?? "the area"}`,
      source: "local_stays",
      sourceRef: row.id,
      confidence: 0.9,
    });
  }

  add("experience", experience, experience ? `Experience pick — ${experience.why_special ?? "flagship property for this destination."}` : "");
  add("value", value, value ? `Value pick — ${value.why_special ?? "best bang-for-buck stay in town."}` : "");
  add("location", location, location ? `Location winner — ${location.location ?? "central and walkable."}` : "");
  add("xfactor", xfactor, xfactor ? `X-factor — ${xfactor.why_special ?? "the one stay travellers actually remember."}` : "");

  return picks;
}

function extractPriceMidpoint(s?: string | null): number {
  if (!s) return 0;
  const nums = Array.from(s.matchAll(/\d[\d,]*/g)).map((m) => Number(m[0].replace(/,/g, "")));
  if (!nums.length) return 0;
  if (nums.length === 1) return nums[0];
  return (nums[0] + nums[nums.length - 1]) / 2;
}
