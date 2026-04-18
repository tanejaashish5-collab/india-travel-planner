import type { SupabaseClient } from "@supabase/supabase-js";
import { normalizeRegion, type Persona, type Budget, type Region } from "./types";

export interface ShortlistItem {
  id: string;
  name: string;
  state: string;
  region: Region | null;
  score: number;
  note: string | null;
  whyGo: string | null;
  kidsRating: number | null;
  kidsSuitable: boolean | null;
  budgetTier: string | null;
  tags: string[];
  elevation: number | null;
  difficulty: string | null;
  dailyCostInr: { budget?: number; midRange?: number; splurge?: number } | null;
  image: string;
}

interface ShortlistParams {
  month: number;
  persona: Persona;
  budget?: Budget;
  region?: Region;
  excludeIds?: string[];
  minScore?: number;
  limit?: number;
}

/**
 * Pulls top-N candidate destinations for a given month, filtered by persona
 * (kids => rating >= 3) and optional budget/region. Excludes any ids already
 * picked by the planner for other months.
 */
export async function buildShortlist(
  supabase: SupabaseClient,
  params: ShortlistParams
): Promise<ShortlistItem[]> {
  const {
    month,
    persona,
    budget,
    region,
    excludeIds = [],
    minScore = 4,
    limit = 15,
  } = params;

  let query = supabase
    .from("destination_months")
    .select(`
      score,
      note,
      why_go,
      destination:destinations!inner(
        id, name, tagline, budget_tier, tags, elevation_m, difficulty,
        deep_dive,
        state:states(name, region),
        kids_friendly(rating, suitable)
      )
    `)
    .eq("month", month)
    .gte("score", minScore)
    .order("score", { ascending: false })
    .limit(limit * 3); // over-fetch so we can filter client-side by region + exclusions

  const { data, error } = await query;
  if (error) throw error;

  const rows = (data ?? []).map((row: any) => {
    const d = row.destination;
    const stateRaw = Array.isArray(d.state) ? d.state[0] : d.state;
    const stateName = stateRaw?.name ?? "";
    const stateRegion = normalizeRegion(d.region) ?? normalizeRegion(stateRaw?.region);
    const kf = Array.isArray(d.kids_friendly) ? d.kids_friendly[0] : d.kids_friendly;
    const budgetGuide = d.deep_dive?.budget_guide ?? {};

    return {
      id: d.id,
      name: d.name,
      state: stateName,
      region: stateRegion,
      score: row.score,
      note: row.note,
      whyGo: row.why_go,
      kidsRating: kf?.rating ?? null,
      kidsSuitable: kf?.suitable ?? null,
      budgetTier: d.budget_tier,
      tags: d.tags ?? [],
      elevation: d.elevation_m ?? null,
      difficulty: d.difficulty ?? null,
      dailyCostInr: {
        budget: budgetGuide.backpacker_per_day_inr,
        midRange: budgetGuide.mid_range_per_day_inr,
        splurge: budgetGuide.splurge_per_day_inr,
      },
      image: `destinations/${d.id}.jpg`,
    } as ShortlistItem;
  });

  const excluded = new Set(excludeIds);

  return rows
    .filter((r) => !excluded.has(r.id))
    .filter((r) => {
      if (persona === "family_kids") {
        return r.kidsSuitable === true && (r.kidsRating ?? 0) >= 3;
      }
      return true;
    })
    .filter((r) => {
      if (!budget) return true;
      if (budget === "budget") return r.budgetTier === "budget" || r.budgetTier === "mixed";
      if (budget === "mid-range") return r.budgetTier !== "splurge";
      return true; // splurge accepts anything
    })
    .filter((r) => {
      if (!region) return true;
      return r.region === region;
    })
    .slice(0, limit);
}
