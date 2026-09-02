import { createClient } from "@supabase/supabase-js";
import { unstable_cache } from "next/cache";

export interface AppStats {
  destinations: number;
  places: number;
  routes: number;
  festivals: number;
  collections: number;
  treks: number;
  states: number;
  traps: number;
  permits: number;
  campingSpots: number;
}

// Fallback values if DB is unavailable — keep these updated (destinations
// refreshed 2026-09-02 to the live 533; others last confirmed May 2026, post
// pilgrimage-circuits expansion: 14 new dests + 11 new collections)
export const FALLBACK: AppStats = {
  destinations: 533,
  places: 1158,
  routes: 75,
  festivals: 331,
  collections: 102,
  treks: 136,
  states: 36,
  traps: 109,
  permits: 32,
  campingSpots: 110,
};

async function fetchAppStats(): Promise<AppStats> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return FALLBACK;

  try {
    const supabase = createClient(url, key);
    const [dests, subs, gems, routes, festivals, collections, treks, states, traps, permits, camping] = await Promise.all([
      supabase.from("destinations").select("*", { count: "exact", head: true }),
      supabase.from("sub_destinations").select("*", { count: "exact", head: true }),
      supabase.from("hidden_gems").select("*", { count: "exact", head: true }),
      supabase.from("routes").select("*", { count: "exact", head: true }),
      supabase.from("festivals").select("*", { count: "exact", head: true }),
      supabase.from("collections").select("*", { count: "exact", head: true }),
      supabase.from("treks").select("*", { count: "exact", head: true }),
      supabase.from("states").select("*", { count: "exact", head: true }),
      supabase.from("tourist_trap_alternatives").select("*", { count: "exact", head: true }),
      supabase.from("permits").select("*", { count: "exact", head: true }),
      supabase.from("camping_spots").select("*", { count: "exact", head: true }),
    ]);

    const stats: AppStats = {
      destinations: dests.count || FALLBACK.destinations,
      places: ((dests.count ?? 0) + (subs.count ?? 0) + (gems.count ?? 0)) || FALLBACK.places,
      routes: routes.count || FALLBACK.routes,
      festivals: festivals.count || FALLBACK.festivals,
      collections: collections.count || FALLBACK.collections,
      treks: treks.count || FALLBACK.treks,
      states: states.count || FALLBACK.states,
      traps: traps.count || FALLBACK.traps,
      permits: permits.count || FALLBACK.permits,
      campingSpots: camping.count || FALLBACK.campingSpots,
    };

    return stats;
  } catch {
    return FALLBACK;
  }
}

export const getAppStats = unstable_cache(
  fetchAppStats,
  ["app-stats-v1"],
  { revalidate: 3600, tags: ["app-stats"] }
);
