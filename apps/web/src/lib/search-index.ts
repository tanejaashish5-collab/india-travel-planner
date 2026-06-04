"use client";

import { useEffect, useState } from "react";
// These MUST stay `import type` / `export type`: cached-data.ts is server-only
// (imports next/cache + @supabase/supabase-js). The `type` keyword guarantees
// erasure so no server code leaks into this "use client" bundle. Never import a
// VALUE (e.g. getCachedSearchIndex, EMPTY_INDEX) from cached-data here.
import type { SearchIndex } from "@/lib/cached-data";

export type { SearchIndex } from "@/lib/cached-data";

const SESSION_KEY = "nakshiq_search_index_v1";

// Module-level memo: one fetch per page load, shared across all search surfaces
// (command palette, mobile modal, hero typeahead) and across client-side route
// changes. The /api/search-index response is also CDN- and browser-cached.
let memo: SearchIndex | null = null;
let inflight: Promise<SearchIndex> | null = null;

export function loadSearchIndex(): Promise<SearchIndex> {
  if (memo) return Promise.resolve(memo);

  // Survive full page reloads within a session without a network round-trip.
  if (typeof window !== "undefined") {
    try {
      const cached = sessionStorage.getItem(SESSION_KEY);
      if (cached) {
        memo = JSON.parse(cached) as SearchIndex;
        return Promise.resolve(memo);
      }
    } catch {
      /* ignore corrupt/unavailable storage */
    }
  }

  if (inflight) return inflight;

  inflight = fetch("/api/search-index")
    .then((r) => (r.ok ? (r.json() as Promise<SearchIndex>) : Promise.reject(new Error(`search-index ${r.status}`))))
    .then((data) => {
      memo = data;
      try {
        sessionStorage.setItem(SESSION_KEY, JSON.stringify(data));
      } catch {
        /* storage full / unavailable — fine, module memo still holds it */
      }
      return data;
    })
    .catch((e) => {
      inflight = null; // allow retry on next open
      throw e;
    });

  return inflight;
}

/**
 * Loads the global search index the first time `enabled` becomes true.
 * Returns the index (null until loaded) plus a `loaded` flag.
 */
export function useSearchIndex(enabled: boolean): { index: SearchIndex | null; loaded: boolean } {
  const [index, setIndex] = useState<SearchIndex | null>(memo);

  useEffect(() => {
    if (!enabled || index) return;
    let cancelled = false;
    loadSearchIndex()
      .then((data) => {
        if (!cancelled) setIndex(data);
      })
      .catch(() => {
        /* network error — leave index null; surfaces degrade to empty results */
      });
    return () => {
      cancelled = true;
    };
  }, [enabled, index]);

  return { index, loaded: index !== null };
}
