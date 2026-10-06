// Village pages: /destination/<parent>/<slug> (2026-10-06).
// A sub_destinations row with `page` + `page_published_at` gets its own URL. The
// allowlist JSON is a build-time snapshot (scripts/gen-known-village-slugs.mjs) so
// middleware can 404 unknown segments without a DB call, same as destinations.
import { cache } from "react";
import { createClient } from "@supabase/supabase-js";
import { isKnownVillage } from "@/lib/village-slugs";

export { isKnownVillage, allVillagePaths } from "@/lib/village-slugs";

type Sourced = { source_url?: string | null };
export type VillagePageData = {
  coords?: ({ lat: number; lng: number } & Sourced) | null;
  elevation_m?: ({ value: number | null; conflicts?: string | null } & Sourced) | null;
  one_line?: string | null;
  why_go?: string | null;
  honest_downsides?: string[];
  how_to_reach?: ({ from: string; mode: string; km?: number | null; time?: string | null; cost_inr?: string | null } & Sourced)[];
  permits?: ({ needed: boolean | null; detail?: string | null; fee_inr?: string | number | null; where?: string | null } & Sourced) | null;
  road_and_season_access?: ({ detail?: string | null } & Sourced) | null;
  status_2025_2026?: ({ detail?: string | null } & Sourced) | null;
  best_months?: number[];
  avoid_months?: { months: number[]; why?: string | null } | null;
  time_needed?: string | null;
  kids_ok?: boolean | null;
  kids_note?: string | null;
  things_to_do?: ({ name: string; detail?: string | null } & Sourced)[];
  stays?: ({ name: string; type?: string | null } & Sourced)[];
  eats?: ({ name: string; known_for?: string | null } & Sourced)[];
  faqs?: { q: string; a: string }[];
  nearby_villages?: string[];
  sources?: { url: string; used_for?: string | null }[];
  // Wikimedia Commons photos (scripts/upload-village-photos.mjs). `hero` only when
  // the photo shows the village itself; captions name the real place shown.
  photos?: { src: string; caption: string; hero: boolean; author: string; licence: string; source_url: string }[];
};

export type Village = {
  id: string;
  parentId: string;
  parentName: string;
  stateId: string | null;
  slug: string;
  name: string;
  page: VillagePageData;
  publishedAt: string;
  reviewedAt: string | null;
  siblings: { slug: string; name: string }[];
};

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

// React cache(): generateMetadata and the page share one fetch per request.
export const getVillage = cache(async (parentId: string, slug: string): Promise<Village | null> => {
  if (!isKnownVillage(parentId, slug)) return null;
  const supabase = getSupabase();
  if (!supabase) return null;
  const [{ data: row, error }, { data: parent }, { data: sibs }] = await Promise.all([
    supabase
      .from("sub_destinations")
      .select("id, parent_id, slug, name, page, page_published_at, page_reviewed_at")
      .eq("parent_id", parentId)
      .eq("slug", slug)
      .not("page_published_at", "is", null)
      .maybeSingle(),
    supabase.from("destinations").select("name, state_id").eq("id", parentId).maybeSingle(),
    supabase
      .from("sub_destinations")
      .select("slug, name")
      .eq("parent_id", parentId)
      .not("page_published_at", "is", null)
      .neq("slug", slug),
  ]);
  if (error) throw new Error(`village(${parentId}/${slug}): ${error.code} ${error.message}`);
  if (!row || !row.page || !parent) return null;
  return {
    id: row.id,
    parentId,
    parentName: parent.name,
    stateId: parent.state_id ?? null,
    slug,
    name: row.name,
    page: row.page as VillagePageData,
    publishedAt: row.page_published_at,
    reviewedAt: row.page_reviewed_at ?? null,
    siblings: (sibs ?? []).filter((s) => s.slug).map((s) => ({ slug: s.slug as string, name: s.name })),
  };
});
