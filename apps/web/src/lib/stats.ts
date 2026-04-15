import { createClient } from "@supabase/supabase-js";

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

// Fallback values if DB is unavailable — keep these updated (April 2026, Kerala expansion)
export const FALLBACK: AppStats = {
  destinations: 373,
  places: 808,
  routes: 53,
  festivals: 234,
  collections: 75,
  treks: 89,
  states: 28,
  traps: 88,
  permits: 21,
  campingSpots: 77,
};

// No caching — always fetch fresh on server to avoid stale counts
export async function getAppStats(): Promise<AppStats> {

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
