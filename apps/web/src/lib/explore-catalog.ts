import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { unstable_cache } from "next/cache";

// Shared by /[locale]/explore (page) and /api/explore-notes (lazy month notes)
// so both read the SAME unstable_cache entry; the notes endpoint never adds DB
// load of its own.

/** Ordered, ranged page-through past PostgREST's 1000-row cap. */
async function fetchAllRows(
  supabase: SupabaseClient,
  table: string,
  select: string,
  orderCols: string[],
) {
  const out: Record<string, unknown>[] = [];
  for (let from = 0; ; from += 1000) {
    let q = supabase.from(table).select(select);
    for (const col of orderCols) q = q.order(col);
    const { data, error } = await q.range(from, from + 999);
    if (error) throw new Error(`[explore] ${table} page ${from} failed: ${error.message}`);
    out.push(...((data ?? []) as unknown as Record<string, unknown>[]));
    if (!data || data.length < 1000) break;
  }
  return out;
}

// Locale-INDEPENDENT catalog, shared by /en/explore and /hi/explore via
// unstable_cache, so the DB pays once per 6h total instead of once per locale.
//
// WHY (statement-timeout history, NEW-2026-08-03-002): the old shape was one
// 4-relation PostgREST embed (destinations + states + kids_friendly + all
// 6,396 destination_months rows) run uncached per locale. Under canary/cron
// contention that single statement blew the anon role's 3s statement_timeout
// (57014) — recurring "/hi/explore destinations fetch failed" error groups
// since 2026-06-16. Per the banked rule (timeouts here are CONTENTION, not
// slow SQL): cache the biggest consumer and keep each statement small. Months
// now come from a separate ordered/ranged read, so no statement carries the
// whole join. Tagged ref-destinations so bust-reference-cache propagates data
// writes. If the payload ever exceeds Next's 2MB data-cache entry limit the
// cache silently no-ops (logs a warning) and behavior degrades to the old
// per-request fetch — the field diet (2026-07-16) keeps it well under today.
//
// This server-side catalog keeps every month's note; the page sends the
// browser only the current month's (see explore/page.tsx, 2026-10-03).
export const getExploreCatalog = unstable_cache(
  async () => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\s/g, "");
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.replace(/\s/g, "");
    if (!url || !key) return { destinations: [], states: [], coords: [] };
    const supabase = createClient(url, key);

    // Field diet (2026-07-16): this payload serializes into the RSC flight
    // data for the client grid/map — it was 2MB of HTML. hero_image_url /
    // vehicle_fit / family_stress had zero consumers; month notes render in a
    // line-clamp-1 so editorial text truncates to 110 chars; translations
    // reduce to the two keys the grid reads (all locales kept here — the page
    // picks its own).
    const fetchAll = () =>
      Promise.all([
        fetchAllRows(
          supabase,
          "destinations",
          `id, name, tagline, difficulty, elevation_m, tags, translations, state_id, budget_tier, eco_tier,
           solo_female_score,
           state:states(name),
           kids_friendly(suitable, rating)`,
          ["name", "id"],
        ),
        fetchAllRows(
          supabase,
          "destination_months",
          "destination_id, month, score, note, solo_female_override",
          ["destination_id", "month"],
        ),
        supabase.from("states").select("id, name, region").order("display_order"),
        supabase.from("destinations_with_coords").select("id, lat, lng"),
      ]);

    // Transient failures must not bake a "0 places" page into the 6h ISR
    // cache — retry, then throw so revalidation keeps the last good page
    // (and a build fails loudly) instead of caching an empty catalog.
    let results;
    for (let attempt = 1; ; attempt++) {
      try {
        results = await fetchAll();
        if (results[0].length) break;
        throw new Error("empty destinations result");
      } catch (e) {
        if (attempt >= 3) {
          throw new Error(
            `[explore] destinations fetch failed after retries: ${e instanceof Error ? e.message : e}`,
          );
        }
        console.error(`[explore] destinations fetch attempt ${attempt} failed: ${e} — retrying`);
        await new Promise((r) => setTimeout(r, attempt * 1000));
      }
    }
    const [destRows, monthRows, statesResult, coordsResult] = results;

    /* eslint-disable @typescript-eslint/no-explicit-any */
    const monthsByDest = new Map<string, any[]>();
    for (const m of monthRows as any[]) {
      let arr = monthsByDest.get(m.destination_id);
      if (!arr) monthsByDest.set(m.destination_id, (arr = []));
      arr.push({
        month: m.month,
        score: m.score,
        solo_female_override: m.solo_female_override,
        note:
          typeof m.note === "string" && m.note.length > 110
            ? `${m.note.slice(0, 110).trimEnd()}…`
            : m.note,
      });
    }

    const slim = (destRows as any[]).map((d: any) => ({
      ...d,
      translations: d.translations
        ? Object.fromEntries(
            Object.entries(d.translations as Record<string, any>).map(([loc, t]) => [
              loc,
              { name: t?.name, tagline: t?.tagline },
            ]),
          )
        : null,
      destination_months: monthsByDest.get(d.id) ?? [],
    }));
    /* eslint-enable @typescript-eslint/no-explicit-any */

    return {
      destinations: slim,
      states: statesResult.data ?? [],
      coords: coordsResult.data ?? [],
    };
  },
  ["explore-catalog"],
  { revalidate: 21600, tags: ["ref-destinations"] },
);

type CatalogMonth = {
  month: number;
  score: number | null;
  solo_female_override: number | null;
  note: string | null;
};

/** One month's notes as { destinationId: note }, nulls dropped. */
export async function getExploreNotesForMonth(month: number): Promise<Record<string, string>> {
  const { destinations } = await getExploreCatalog();
  const out: Record<string, string> = {};
  for (const d of destinations as { id: string; destination_months: CatalogMonth[] }[]) {
    const note = d.destination_months.find((m) => m.month === month)?.note;
    if (note) out[d.id] = note;
  }
  return out;
}

/**
 * Browser-bound shape of one month row set: 12 scores indexed Jan..Dec (`ms`),
 * per-month solo-female overrides only when any exist (`sfo`), and only the
 * note for the month the page was rendered in (`n`). The full 12-month
 * {month, score, solo_female_override, note} objects were 871 KB of the 1.26 MB
 * flight payload on /en/explore (2026-10-03 Lighthouse 69 report).
 */
export function compactMonths(months: CatalogMonth[], notesMonth: number) {
  const ms: (number | null)[] = Array(12).fill(null);
  const sfo: (number | null)[] = Array(12).fill(null);
  let anySfo = false;
  let n: string | undefined;
  for (const m of months) {
    if (m.month < 1 || m.month > 12) continue;
    ms[m.month - 1] = m.score;
    if (m.solo_female_override != null) {
      sfo[m.month - 1] = m.solo_female_override;
      anySfo = true;
    }
    if (m.month === notesMonth && m.note) n = m.note;
  }
  return { ms, ...(anySfo ? { sfo } : {}), ...(n ? { n } : {}) };
}
