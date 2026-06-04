/**
 * Cached reference-data accessors.
 *
 * WHY THIS EXISTS
 * ---------------
 * Destinations / collections / states / the global search index are read on
 * nearly every page render and every search-palette open, but they only change
 * when a data backfill runs. Before this layer those reads went straight to
 * PostgREST on every request — ~1.5M uncached list fetches over ~2 months,
 * which drove the seq-scan storm and the temp-file spills behind the Supabase
 * "Disk IO budget" alert (see memory: reference_supabase_disk_io_temp_spills).
 *
 * `@supabase/supabase-js` uses its own fetch, so Next's fetch cache does NOT
 * apply — the ONLY way to get cross-request caching is to wrap the query in
 * `unstable_cache` (or the `use cache` directive, which would require flipping
 * `cacheComponents` on app-wide — out of scope). This mirrors the existing
 * pattern in lib/stats.ts.
 *
 * INVALIDATION
 * ------------
 * Each accessor is tagged. Bust on demand after a data write via the existing
 * admin route, e.g.:
 *   POST /api/admin/revalidate?tag=ref-destinations
 * `scripts/bust-reference-cache.mjs` does this for all reference tags at once,
 * and `scripts/_lib/pg-bulk.mjs` calls it automatically after a bulk UPDATE.
 *
 * Reads use the anon key (RLS-respecting, public reference data) — same as
 * lib/stats.ts. The supabase client is created INSIDE each cached function
 * because `unstable_cache` callbacks must not capture non-serialisable args.
 */
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { unstable_cache } from "next/cache";

// 24h — reference data only changes on backfill, and a tag-bust forces it sooner.
const REVALIDATE_SECONDS = 86400;

export const REF_TAGS = {
  destinations: "ref-destinations",
  collections: "ref-collections",
  states: "ref-states",
  searchIndex: "ref-search-index",
} as const;

/** All reference tags — bust these after any reference-data write. */
export const ALL_REF_TAGS = Object.values(REF_TAGS);

function anonClient(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

/** `state:states(name)` comes back as an object or a 1-element array — flatten it. */
function stateName(state: unknown): string {
  if (Array.isArray(state)) return state[0]?.name ?? "";
  if (state && typeof state === "object") return (state as { name?: string }).name ?? "";
  return "";
}

/**
 * PostgREST caps each response at 1000 rows, so a bare `.select()` silently
 * truncates large tables (hidden_gems ~1.6k, local_stays ~1k). These accessors
 * are cached for 24h, so paging through is essentially free and keeps the
 * index complete (the un-cached client queries this replaced were silently
 * truncated at 1000). Pages by `id` for stable ordering across requests.
 */
async function fetchAllRows<T = Record<string, unknown>>(
  supabase: SupabaseClient,
  table: string,
  select: string,
): Promise<T[]> {
  const PAGE = 1000;
  const out: T[] = [];
  for (let from = 0; ; from += PAGE) {
    const { data, error } = await supabase
      .from(table)
      .select(select)
      .order("id")
      .range(from, from + PAGE - 1);
    // Throw (don't swallow) on a real query error — otherwise unstable_cache
    // would cache a truncated/empty result for the full 24h revalidate window.
    // A throw is NOT cached, so the next request retries; ISR pages keep serving
    // their last-good render in the meantime.
    if (error) throw new Error(`fetchAllRows(${table}): ${error.message}`);
    if (!data || data.length === 0) break;
    out.push(...(data as T[]));
    if (data.length < PAGE) break;
  }
  return out;
}

// ── States ────────────────────────────────────────────────────────────────
export interface CachedState {
  id: string;
  name: string;
  region: string | null;
  description: string | null;
  capital: string | null;
  display_order: number | null;
}

export const getCachedStates = unstable_cache(
  async (): Promise<CachedState[]> => {
    const supabase = anonClient();
    if (!supabase) return [];
    const { data, error } = await supabase
      .from("states")
      .select("id, name, region, description, capital, display_order")
      .order("name");
    if (error) throw error; // don't cache an empty result on transient failure
    return (data as CachedState[]) ?? [];
  },
  ["ref-states-v1"],
  { revalidate: REVALIDATE_SECONDS, tags: [REF_TAGS.states] },
);

// ── Collections (lightweight index) ─────────────────────────────────────────
export interface CachedCollection {
  id: string;
  name: string;
  description: string | null;
  tags: string[] | null;
}

export const getCachedCollectionsIndex = unstable_cache(
  async (): Promise<CachedCollection[]> => {
    const supabase = anonClient();
    if (!supabase) return [];
    const { data, error } = await supabase
      .from("collections")
      .select("id, name, description, tags")
      .order("name");
    if (error) throw error; // don't cache an empty result on transient failure
    return (data as CachedCollection[]) ?? [];
  },
  ["ref-collections-index-v1"],
  { revalidate: REVALIDATE_SECONDS, tags: [REF_TAGS.collections] },
);

// ── Destinations (lightweight index) ────────────────────────────────────────
export interface CachedDestinationIndexRow {
  id: string;
  name: string;
  state_name: string;
  difficulty: string | null;
  tags: string[] | null;
  region: string | null;
}

export const getCachedDestinationsIndex = unstable_cache(
  async (): Promise<CachedDestinationIndexRow[]> => {
    const supabase = anonClient();
    if (!supabase) return [];
    const rows = await fetchAllRows(supabase, "destinations", "id, name, region, difficulty, tags, state:states(name)");
    return rows
      .map((r) => {
        const d = r as { id: string; name: string; region: string | null; difficulty: string | null; tags: string[] | null; state: unknown };
        return {
          id: d.id,
          name: d.name,
          region: d.region,
          difficulty: d.difficulty,
          tags: d.tags,
          state_name: stateName(d.state),
        };
      })
      .sort((a, b) => a.name.localeCompare(b.name));
  },
  ["ref-destinations-index-v1"],
  { revalidate: REVALIDATE_SECONDS, tags: [REF_TAGS.destinations] },
);

// ── Global search index (powers all 3 client search surfaces) ───────────────
export interface SearchIndex {
  destinations: { id: string; name: string; state: { name: string } | null; difficulty: string | null; tags: string[] | null }[];
  subs: { id: string; name: string; parent_id: string; parent_name: string }[];
  states: { id: string; name: string }[];
  treks: { id: string; name: string; difficulty: string | null }[];
  routes: { id: string; name: string }[];
  collections: { id: string; name: string }[];
  festivals: { id: string; name: string; month: number | null; destination_id: string | null; destination_name: string }[];
  stays: { id: string; name: string; type: string | null; destination_id: string; destination_name: string }[];
  gems: { id: string; name: string; near_destination_id: string | null; parent_name: string }[];
  articles: { slug: string; title: string; category: string | null }[];
}

const EMPTY_INDEX: SearchIndex = {
  destinations: [], subs: [], states: [], treks: [], routes: [],
  collections: [], festivals: [], stays: [], gems: [], articles: [],
};

export const getCachedSearchIndex = unstable_cache(
  async (): Promise<SearchIndex> => {
    const supabase = anonClient();
    if (!supabase) return EMPTY_INDEX;

    const refName = (v: unknown): string => (Array.isArray(v) ? v[0]?.name ?? "" : (v as { name?: string } | null)?.name ?? "");

    // destinations / local_stays / hidden_gems exceed (or approach) PostgREST's
    // 1000-row cap, so page through them. The rest are comfortably under 1000
    // and `articles` has no `id` column (PK is slug), so they use single selects.
    const [dRows, slRows, gRows] = await Promise.all([
      fetchAllRows(supabase, "destinations", "id, name, state:states(name), difficulty, tags"),
      fetchAllRows(supabase, "local_stays", "id, name, type, destination_id, destination:destinations(name)"),
      fetchAllRows(supabase, "hidden_gems", "id, name, near_destination_id, near:destinations!hidden_gems_near_destination_id_fkey(name)"),
    ]);
    const [subRes, stRes, tRes, rRes, cRes, fRes, aRes] = await Promise.all([
      supabase.from("sub_destinations").select("id, name, parent_id, parent:destinations!sub_destinations_parent_id_fkey(name)").order("name"),
      supabase.from("states").select("id, name").order("name"),
      supabase.from("treks").select("id, name, difficulty").order("name"),
      supabase.from("routes").select("id, name").order("name"),
      supabase.from("collections").select("id, name").order("name"),
      supabase.from("festivals").select("id, name, month, destination_id, destination:destinations(name)").order("name"),
      supabase.from("articles").select("slug, title, category").order("title"),
    ]);

    // Same rationale as fetchAllRows: a transient error must not get cached as an
    // empty list for 24h. Throw so the next request retries (fetchAllRows above
    // already throws for the paged tables).
    for (const res of [subRes, stRes, tRes, rRes, cRes, fRes, aRes]) {
      if (res.error) throw new Error(`getCachedSearchIndex: ${res.error.message}`);
    }

    return {
      destinations: dRows.map((r) => {
        const d = r as { id: string; name: string; state: unknown; difficulty: string | null; tags: string[] | null };
        return { id: d.id, name: d.name, state: d.state ? { name: stateName(d.state) } : null, difficulty: d.difficulty, tags: d.tags };
      }),
      subs: ((subRes.data as unknown[]) ?? []).map((r) => {
        const s = r as { id: string; name: string; parent_id: string; parent: unknown };
        return { id: s.id, name: s.name, parent_id: s.parent_id, parent_name: refName(s.parent) };
      }),
      states: ((stRes.data as { id: string; name: string }[]) ?? []),
      treks: ((tRes.data as { id: string; name: string; difficulty: string | null }[]) ?? []),
      routes: ((rRes.data as { id: string; name: string }[]) ?? []),
      collections: ((cRes.data as { id: string; name: string }[]) ?? []),
      festivals: ((fRes.data as unknown[]) ?? []).map((r) => {
        const f = r as { id: string; name: string; month: number | null; destination_id: string | null; destination: unknown };
        return { id: f.id, name: f.name, month: f.month, destination_id: f.destination_id, destination_name: refName(f.destination) };
      }),
      stays: slRows.map((r) => {
        const s = r as { id: string; name: string; type: string | null; destination_id: string; destination: unknown };
        return { id: s.id, name: s.name, type: s.type, destination_id: s.destination_id, destination_name: refName(s.destination) };
      }),
      gems: gRows.map((r) => {
        const g = r as { id: string; name: string; near_destination_id: string | null; near: unknown };
        return { id: g.id, name: g.name, near_destination_id: g.near_destination_id, parent_name: refName(g.near) };
      }),
      articles: ((aRes.data as { slug: string; title: string; category: string | null }[]) ?? []),
    };
  },
  ["ref-search-index-v1"],
  { revalidate: REVALIDATE_SECONDS, tags: [REF_TAGS.searchIndex, REF_TAGS.destinations, REF_TAGS.collections, REF_TAGS.states] },
);
