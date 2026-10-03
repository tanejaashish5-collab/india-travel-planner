// Pure constants, safe to import from client components. Split out of
// lib/stats.ts (2026-10-03): nav-mega-menu imported FALLBACK from there, which
// dragged that file's supabase-js import (~60 KB gz) into every page's startup
// JS. Keep this file free of runtime imports.

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
