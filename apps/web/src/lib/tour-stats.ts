import { createClient } from "@supabase/supabase-js";
import { unstable_cache } from "next/cache";

export interface TourStats {
  destinations: number;
  monthVerdicts: number;       // total destination_months rows (~5,892)
  skipMonthVerdicts: number;   // score <= 1 with verdict text
  traps: number;               // distinct trap destinations in skip-list
  painPoints: number;          // total pain bullets across all traps
  places: number;              // destinations + sub_destinations + hidden_gems
  stays: number;               // active local_stays
  articles: number;            // published articles
  routes: number;
  treks: number;
  soloFemaleScored: number;    // destinations with solo_female_score
  familyVerdicts: number;      // kids_friendly with family_verdict
}

// Fallback if DB is unavailable. Keep loosely aligned with reality so the
// tour never shows zeros — better stale-but-real than a zero in front of
// a first-time visitor. Verified 2026-05-03 against prod.
export const TOUR_STATS_FALLBACK: TourStats = {
  destinations: 491,
  monthVerdicts: 5892,
  skipMonthVerdicts: 36,
  traps: 6,
  painPoints: 34,
  places: 1015,
  stays: 615,
  articles: 167,
  routes: 19,
  treks: 133,
  soloFemaleScored: 491,
  familyVerdicts: 246,
};

async function fetchTourStats(): Promise<TourStats> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return TOUR_STATS_FALLBACK;

  try {
    const supabase = createClient(url, key);

    const [
      destsRes,
      subsRes,
      gemsRes,
      monthsRes,
      skipMonthsRes,
      trapDepthRes,
      staysRes,
      articlesRes,
      routesRes,
      treksRes,
      soloRes,
      familyRes,
    ] = await Promise.all([
      supabase.from("destinations").select("*", { count: "exact", head: true }),
      supabase.from("sub_destinations").select("*", { count: "exact", head: true }),
      supabase.from("hidden_gems").select("*", { count: "exact", head: true }),
      supabase.from("destination_months").select("*", { count: "exact", head: true }),
      supabase
        .from("destination_months")
        .select("*", { count: "exact", head: true })
        .lte("score", 1)
        .not("go_or_skip_verdict", "is", null),
      // Trap dedup: rank=1 isn't unique (same trap can have multiple alts
      // at rank 1). Fetch all rows with non-empty pain_points and dedupe
      // by trap_destination_id client-side. ~50 rows — cheap.
      supabase
        .from("tourist_trap_alternatives")
        .select("trap_destination_id, pain_points")
        .not("pain_points", "is", null),
      // local_stays has no is_active flag in the schema; total row count
      // mirrors the live published-stays surface.
      supabase
        .from("local_stays")
        .select("*", { count: "exact", head: true }),
      supabase
        .from("articles")
        .select("*", { count: "exact", head: true })
        .not("published_at", "is", null),
      supabase.from("routes").select("*", { count: "exact", head: true }),
      supabase.from("treks").select("*", { count: "exact", head: true }),
      supabase
        .from("destinations")
        .select("*", { count: "exact", head: true })
        .not("solo_female_score", "is", null),
      supabase
        .from("kids_friendly")
        .select("*", { count: "exact", head: true })
        .not("family_verdict", "is", null),
    ]);

    // Dedupe traps + pain by trap_destination_id (each trap may have many alts
    // sharing the same pain_points array — count once per trap).
    const trapPain = new Map<string, number>();
    for (const row of (trapDepthRes.data ?? []) as any[]) {
      const len = Array.isArray(row.pain_points) ? row.pain_points.length : 0;
      if (len > 0 && !trapPain.has(row.trap_destination_id)) {
        trapPain.set(row.trap_destination_id, len);
      }
    }
    const trapsCount = trapPain.size;
    const painPoints = [...trapPain.values()].reduce((s, n) => s + n, 0);

    return {
      destinations: destsRes.count ?? TOUR_STATS_FALLBACK.destinations,
      monthVerdicts: monthsRes.count ?? TOUR_STATS_FALLBACK.monthVerdicts,
      skipMonthVerdicts: skipMonthsRes.count ?? TOUR_STATS_FALLBACK.skipMonthVerdicts,
      traps: trapsCount || TOUR_STATS_FALLBACK.traps,
      painPoints: painPoints || TOUR_STATS_FALLBACK.painPoints,
      places:
        ((destsRes.count ?? 0) + (subsRes.count ?? 0) + (gemsRes.count ?? 0)) ||
        TOUR_STATS_FALLBACK.places,
      stays: staysRes.count ?? TOUR_STATS_FALLBACK.stays,
      articles: articlesRes.count ?? TOUR_STATS_FALLBACK.articles,
      routes: routesRes.count ?? TOUR_STATS_FALLBACK.routes,
      treks: treksRes.count ?? TOUR_STATS_FALLBACK.treks,
      soloFemaleScored: soloRes.count ?? TOUR_STATS_FALLBACK.soloFemaleScored,
      familyVerdicts: familyRes.count ?? TOUR_STATS_FALLBACK.familyVerdicts,
    };
  } catch {
    return TOUR_STATS_FALLBACK;
  }
}

export const getTourStats = unstable_cache(
  fetchTourStats,
  ["tour-stats-v1"],
  { revalidate: 3600, tags: ["tour-stats"] }
);
