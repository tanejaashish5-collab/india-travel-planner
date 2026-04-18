import type { SupabaseClient } from "@supabase/supabase-js";
import { normalizeRegion, type Persona, type Budget, type Region, type Archetype, type ExperienceTier, type Theme, type AlternativePair } from "./types";
import { archetypeRules, ICONIC_DESTINATION_IDS } from "./archetype";
import { computeClusters, haversineKm } from "./clusters";

export interface ShortlistItem {
  id: string;
  name: string;
  state: string;
  region: Region | null;
  lat: number | null;
  lng: number | null;
  score: number;                // possibly boosted
  rawScore: number;             // original destination_months.score
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
  isIconic: boolean;
  clusterId?: string;
  alsoTry?: AlternativePair | null;   // trap→alternative pair (when this row IS a trap)
}

export interface ArchetypeShortlistParams {
  month: number;
  archetype: Archetype;
  experienceTier: ExperienceTier;
  themes: Theme[];
  region?: Region;
  origin?: { lat: number; lng: number } | null;
  originProximityBoost?: boolean;     // true for month 1 and month N
  excludeIds?: string[];
  limit?: number;
}

// Legacy-compatible simple variant (kept for any callers still on v1 API).
interface LegacyShortlistParams {
  month: number;
  persona: Persona;
  budget?: Budget;
  region?: Region;
  excludeIds?: string[];
  minScore?: number;
  limit?: number;
}

/**
 * V2 shortlist: archetype-aware, trap-joined, theme-filtered, budget-boosted,
 * origin-boosted, and cluster-tagged.
 */
export async function buildShortlistForArchetype(
  supabase: SupabaseClient,
  params: ArchetypeShortlistParams
): Promise<ShortlistItem[]> {
  const { month, archetype, experienceTier, themes, region, origin, originProximityBoost, excludeIds = [], limit = 15 } = params;
  const rules = archetypeRules(archetype);

  // Stage A-pre — if region constraint set, resolve to a destination-id allowlist
  // at the DB level. Without this, the global score-DESC over-fetch would
  // sample out regions (e.g. Central India's ~7 score≥4 rows get paginated out
  // when the top 60 globally are all south/east/islands).
  let regionDestIds: string[] | null = null;
  if (region) {
    const { data: statesData } = await supabase.from("states").select("name, region");
    const stateNames = (statesData ?? [])
      .filter((s: any) => normalizeRegion(s.region) === region)
      .map((s: any) => s.name);
    if (stateNames.length === 0) {
      // No states in this region — return empty shortlist early.
      return [];
    }
    const { data: destsInRegion } = await supabase
      .from("destinations")
      .select("id, state:states!inner(name)")
      .in("state.name", stateNames);
    regionDestIds = (destsInRegion ?? []).map((d: any) => d.id);
    if (regionDestIds.length === 0) return [];
  }

  // Stage A — base pool from destination_months joined with destinations.
  // Over-fetch 4x so we can filter / boost client-side and still return `limit`.
  let query = supabase
    .from("destination_months")
    .select(`
      score,
      note,
      why_go,
      destination:destinations!inner(
        id, name, tagline, budget_tier, tags, elevation_m, difficulty,
        deep_dive, coords,
        state:states(name, region),
        kids_friendly(rating, suitable)
      )
    `)
    .eq("month", month)
    .gte("score", rules.minScore);
  if (regionDestIds) query = query.in("destination_id", regionDestIds);
  const { data, error } = await query
    .order("score", { ascending: false })
    .limit(limit * 4);

  if (error) throw error;

  // Stage B — normalise rows & tag iconic
  const base: ShortlistItem[] = (data ?? [])
    .map((row: any) => {
      const d = row.destination;
      const stateRaw = Array.isArray(d.state) ? d.state[0] : d.state;
      const stateName = stateRaw?.name ?? "";
      const stateRegion = normalizeRegion(d.region) ?? normalizeRegion(stateRaw?.region);
      const kf = Array.isArray(d.kids_friendly) ? d.kids_friendly[0] : d.kids_friendly;
      const budgetGuide = d.deep_dive?.budget_guide ?? {};

      // Supabase returns PostGIS geography points as WKT-like strings or objects.
      // When `coords` is a GeoJSON point we can pull lng/lat; otherwise skip.
      let lat: number | null = null;
      let lng: number | null = null;
      if (d.coords?.coordinates && Array.isArray(d.coords.coordinates)) {
        [lng, lat] = d.coords.coordinates;
      }

      return {
        id: d.id,
        name: d.name,
        state: stateName,
        region: stateRegion,
        lat,
        lng,
        score: row.score,
        rawScore: row.score,
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
        isIconic: ICONIC_DESTINATION_IDS.has(d.id),
      } satisfies ShortlistItem;
    });

  const excluded = new Set(excludeIds);
  let filtered = base.filter((r) => !excluded.has(r.id));

  // Stage C — hard kids filter for family archetypes
  if (archetype === "marquee_family" || archetype === "confident_family") {
    filtered = filtered.filter((r) => r.kidsSuitable === true && (r.kidsRating ?? 0) >= 3);
  }

  // Stage D — region filter (if region constraint set by skeleton)
  if (region) {
    filtered = filtered.filter((r) => r.region === region);
  }

  // Stage E — theme filter (with iconic escape hatch)
  if (themes.length) {
    // Destinations that match any theme OR are iconic anchors stay in.
    const matchesTheme = (tags: string[]) =>
      tags.some((t) => themes.includes(t as Theme));
    filtered = filtered.filter((r) => matchesTheme(r.tags) || r.isIconic);
  }

  // Stage F — experience tier boost (additive, never hard-filter)
  filtered = filtered.map((r) => {
    let score = r.score;
    if (experienceTier === "splurge" && (r.budgetTier === "splurge" || r.budgetTier === "mixed")) {
      score += 1;
    }
    if (experienceTier === "thrifty" && (r.budgetTier === "budget" || r.budgetTier === "mixed")) {
      score += 1;
    }
    return { ...r, score };
  });

  // Stage G — origin proximity boost (for the first and last month of the trip)
  if (originProximityBoost && origin && origin.lat != null && origin.lng != null) {
    filtered = filtered.map((r) => {
      if (r.lat == null || r.lng == null) return r;
      const km = haversineKm({ lat: origin.lat, lng: origin.lng }, { lat: r.lat, lng: r.lng });
      const boost = km < 500 ? 0.5 : 0;
      return { ...r, score: r.score + boost };
    });
  }

  // Stage H — iconic ordering per archetype bias
  filtered.sort((a, b) => b.score - a.score);

  if (rules.iconicBias === "iconic_first") {
    const iconic = filtered.filter((r) => r.isIconic);
    const offbeat = filtered.filter((r) => !r.isIconic);
    filtered = [...iconic, ...offbeat];
  } else if (rules.iconicBias === "offbeat_first") {
    const iconic = filtered.filter((r) => r.isIconic);
    const offbeat = filtered.filter((r) => !r.isIconic);
    filtered = [...offbeat, ...iconic];
  }

  // Truncate before expensive joins
  filtered = filtered.slice(0, limit);

  // Stage I — attach tourist-trap alternative pairs for iconic rows
  if (filtered.length) {
    const ids = filtered.filter((r) => r.isIconic).map((r) => r.id);
    if (ids.length) {
      const { data: traps } = await supabase
        .from("tourist_trap_alternatives")
        .select(`
          trap_destination_id,
          alternative_destination_id,
          why_better,
          drive_time,
          vibe_difference,
          rank,
          alt:destinations!alternative_destination_id(name, state:states(name))
        `)
        .in("trap_destination_id", ids)
        .order("rank");
      const trapMap = new Map<string, AlternativePair>();
      for (const t of (traps ?? []) as any[]) {
        if (trapMap.has(t.trap_destination_id)) continue;
        const altRaw: any = Array.isArray(t.alt) ? t.alt[0] : t.alt;
        const altStateRaw: any = altRaw?.state;
        const altState: string | undefined = Array.isArray(altStateRaw)
          ? altStateRaw[0]?.name
          : altStateRaw?.name;
        trapMap.set(t.trap_destination_id, {
          altId: t.alternative_destination_id,
          altName: altRaw?.name ?? t.alternative_destination_id,
          altState,
          whyBetter: t.why_better ?? "",
          driveTime: t.drive_time ?? undefined,
          vibeDifference: t.vibe_difference ?? undefined,
        });
      }
      filtered = filtered.map((r) => ({
        ...r,
        alsoTry: trapMap.get(r.id) ?? null,
      }));
    }
  }

  // Stage J — clusters (150 km haversine)
  const clusterAssign = computeClusters(
    filtered.map((r) => ({ id: r.id, lat: r.lat, lng: r.lng })),
    150
  );
  filtered = filtered.map((r) => ({ ...r, clusterId: clusterAssign.get(r.id) }));

  return filtered;
}

/**
 * Legacy variant — kept so the v1 /api/gap-year/regenerate-month route (if any
 * still calls it) doesn't break during rollout. Thin wrapper.
 */
export async function buildShortlist(
  supabase: SupabaseClient,
  params: LegacyShortlistParams
): Promise<ShortlistItem[]> {
  const { persona, budget, ...rest } = params;
  return buildShortlistForArchetype(supabase, {
    month: rest.month,
    archetype: persona === "family_kids" ? "marquee_family" : "offbeat_seeker",
    experienceTier: budget === "splurge" ? "splurge" : budget === "budget" ? "thrifty" : "comfortable",
    themes: [],
    region: rest.region,
    excludeIds: rest.excludeIds,
    limit: rest.limit,
  });
}
