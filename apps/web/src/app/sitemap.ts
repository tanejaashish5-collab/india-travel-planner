import type { MetadataRoute } from "next";
import { createClient } from "@supabase/supabase-js";
import { unstable_cache } from "next/cache";
import { STATE_MAP, ALL_STATE_SLUGS, ALL_MONTH_SLUGS } from "@/lib/seo-maps";

/*
 * Sitemap split into 5 chunks via generateSitemaps().
 * Next.js auto-generates a sitemap index at /sitemap.xml
 * pointing to /sitemap/0.xml through /sitemap/4.xml.
 *
 * 0 = static pages + where-to-go hubs
 * 1 = destinations + destination-month pages
 * 2 = collections + routes + articles + treks
 * 3 = programmatic SEO (state×month, difficulty, tags, festivals, stays, camping, family)
 * 4 = vs comparisons + skip-lists + with-kids + region-months
 */

const LOCALES = ["en", "hi"] as const;
const BASE = "https://www.nakshiq.com";

const MONTH_SLUGS = ALL_MONTH_SLUGS;
const STATE_SLUGS = ALL_STATE_SLUGS;

const TREK_STATES = [
  "himachal-pradesh","uttarakhand","jammu-kashmir","ladakh","sikkim",
  "arunachal-pradesh","meghalaya","nagaland","west-bengal","rajasthan",
];

const CAMP_STATES = [
  "himachal-pradesh","uttarakhand","jammu-kashmir","ladakh","sikkim",
  "rajasthan","meghalaya","arunachal-pradesh","madhya-pradesh","uttar-pradesh",
];

const FAMILY_STATES = [
  "himachal-pradesh","uttarakhand","jammu-kashmir","ladakh","rajasthan","punjab",
  "sikkim","meghalaya","assam","uttar-pradesh","madhya-pradesh","west-bengal",
  "arunachal-pradesh","nagaland",
];

const DIFFICULTIES = ["easy", "moderate", "hard", "extreme"];

const TAGS = [
  "offbeat","trek","spiritual","heritage","wildlife","lake","romantic",
  "adventure","family","winter","monsoon","photography","budget","pilgrimage",
  "hill-station","border","desert","valley","monastery","waterfall",
];

export async function generateSitemaps() {
  return [{ id: "0" }, { id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }];
}

function entry(path: string, freq: "daily" | "weekly" | "monthly", priority: number): MetadataRoute.Sitemap {
  return LOCALES.map((locale) => ({
    url: `${BASE}/${locale}${path ? `/${path}` : ""}`,
    lastModified: new Date(),
    changeFrequency: freq,
    priority,
  }));
}

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

// Cache destination IDs across sitemap chunks (chunk 1 + chunk 4 both need them).
// 6hr TTL — destinations are added rarely.
const getDestinationIds = unstable_cache(
  async (): Promise<string[]> => {
    const supabase = getSupabase();
    if (!supabase) return [];
    const { data } = await supabase.from("destinations").select("id").order("id");
    return (data ?? []).map((d: any) => d.id);
  },
  ["sitemap-destination-ids-v1"],
  { revalidate: 21600, tags: ["sitemap"] }
);

export default async function sitemap(props: {
  id: Promise<string>;
}): Promise<MetadataRoute.Sitemap> {
  const id = await props.id;

  // ─── Chunk 0: Static pages + where-to-go hubs ───
  if (id === "0") {
    const staticPages = [
      "", "explore", "states", "collections", "routes", "treks", "plan",
      "camping", "permits", "road-conditions", "superlatives",
      "stays", "festivals", "tourist-traps",
      "saved", "about", "methodology", "blog",
      "terms", "privacy", "cookies", "editorial-policy",
      "india-travel", "data-deletion", "newsletter", "the-window",
      "vs", "compare",
      // State hub pages
      ...Object.keys(STATE_MAP).map((s) => `state/${s}`),
      // Region pages (legacy)
      "region/himachal-pradesh", "region/uttarakhand", "region/jammu-kashmir",
      "region/ladakh", "region/rajasthan", "region/punjab",
      "region/arunachal-pradesh", "region/assam", "region/bihar",
      "region/meghalaya", "region/nagaland", "region/sikkim",
      "region/manipur", "region/west-bengal", "region/madhya-pradesh",
    ];

    const staticEntries = staticPages.flatMap((page) => entry(
      page,
      page === "" ? "daily" : "weekly",
      page === "" ? 1.0 : page === "explore" || page === "india-travel" ? 0.9 : 0.7,
    ));

    // Where-to-go monthly hubs (12 × 2 = 24 URLs)
    const whereToGoEntries = MONTH_SLUGS.flatMap((month) =>
      entry(`where-to-go/${month}`, "weekly", 0.85)
    );

    return [...staticEntries, ...whereToGoEntries];
  }

  // ─── Chunk 1: Destinations + destination-month pages ───
  if (id === "1") {
    const destIds = await getDestinationIds();
    if (!destIds.length) return [];

    const destEntries = destIds.flatMap((dId) =>
      entry(`destination/${dId}`, "weekly", 0.8)
    );

    const destMonthEntries = destIds.flatMap((dId) =>
      MONTH_SLUGS.flatMap((month) => entry(`destination/${dId}/${month}`, "monthly", 0.7))
    );

    return [...destEntries, ...destMonthEntries];
  }

  // ─── Chunk 2: Collections + routes + articles + treks ───
  if (id === "2") {
    const supabase = getSupabase();
    if (!supabase) return [];

    const [collResult, routeResult, articleResult, trekResult, issueResult] = await Promise.all([
      supabase.from("collections").select("id").order("id"),
      supabase.from("routes").select("id").order("id"),
      supabase.from("articles").select("slug").order("published_at", { ascending: false }),
      supabase.from("treks").select("id").order("id"),
      supabase.from("newsletter_issues").select("slug").not("sent_at", "is", null).order("sent_at", { ascending: false }),
    ]);

    const collEntries = (collResult.data ?? []).flatMap((c: any) =>
      entry(`collections/${c.id}`, "monthly", 0.6)
    );

    const routeEntries = (routeResult.data ?? []).flatMap((r: any) =>
      entry(`routes/${r.id}`, "monthly", 0.6)
    );

    const articleEntries = (articleResult.data ?? []).flatMap((a: any) =>
      entry(`blog/${a.slug}`, "weekly", 0.8)
    );

    const trekEntries = (trekResult.data ?? []).flatMap((t: any) =>
      entry(`treks/${t.id}`, "monthly", 0.7)
    );

    const issueEntries = (issueResult.data ?? []).flatMap((i: any) =>
      entry(`the-window/${i.slug}`, "monthly", 0.7)
    );

    return [...collEntries, ...routeEntries, ...articleEntries, ...trekEntries, ...issueEntries];
  }

  // ─── Chunk 3: Programmatic SEO pages ───
  if (id === "3") {
    // Explore by state (23 × 2 = 46)
    const exploreState = STATE_SLUGS.flatMap((s) => entry(`explore/state/${s}`, "weekly", 0.8));

    // Explore state × month (23 × 12 × 2 = 552)
    const exploreStateMonth = STATE_SLUGS.flatMap((s) =>
      MONTH_SLUGS.flatMap((m) => entry(`explore/state/${s}/${m}`, "monthly", 0.7))
    );

    // Explore by difficulty (4 × 2 = 8)
    const exploreDiff = DIFFICULTIES.flatMap((d) => entry(`explore/difficulty/${d}`, "monthly", 0.7));

    // Explore by tag (20 × 2 = 40)
    const exploreTag = TAGS.flatMap((t) => entry(`explore/tag/${t}`, "monthly", 0.7));

    // Treks by state (10 × 2 = 20)
    const trekState = TREK_STATES.flatMap((s) => entry(`treks/state/${s}`, "monthly", 0.7));

    // Treks state × month (10 × 12 × 2 = 240)
    const trekStateMonth = TREK_STATES.flatMap((s) =>
      MONTH_SLUGS.flatMap((m) => entry(`treks/state/${s}/${m}`, "monthly", 0.65))
    );

    // Treks by difficulty (4 × 2 = 8)
    const trekDiff = DIFFICULTIES.flatMap((d) => entry(`treks/difficulty/${d}`, "monthly", 0.7));

    // Camping by state (10 × 2 = 20)
    const campState = CAMP_STATES.flatMap((s) => entry(`camping/state/${s}`, "monthly", 0.7));

    // Festivals by month (12 × 2 = 24)
    const festMonth = MONTH_SLUGS.flatMap((m) => entry(`festivals/month/${m}`, "monthly", 0.75));

    // Festivals by state (23 × 2 = 46)
    const festState = STATE_SLUGS.flatMap((s) => entry(`festivals/state/${s}`, "monthly", 0.7));

    // Festivals state × month (23 × 12 × 2 = 552)
    const festStateMonth = STATE_SLUGS.flatMap((s) =>
      MONTH_SLUGS.flatMap((m) => entry(`festivals/state/${s}/${m}`, "monthly", 0.65))
    );

    // Stays by state (23 × 2 = 46)
    const staysState = STATE_SLUGS.flatMap((s) => entry(`stays/state/${s}`, "monthly", 0.7));

    // Family by state (14 × 2 = 28)
    const familyState = FAMILY_STATES.flatMap((s) => entry(`family/${s}`, "monthly", 0.7));

    // State × month where-to-go (23 × 12 × 2 = 552)
    const stateMonth = STATE_SLUGS.flatMap((s) =>
      MONTH_SLUGS.flatMap((m) => entry(`where-to-go/${s}-in-${m}`, "monthly", 0.75))
    );

    return [
      ...exploreState, ...exploreStateMonth, ...exploreDiff, ...exploreTag,
      ...trekState, ...trekStateMonth, ...trekDiff, ...campState,
      ...festMonth, ...festState, ...festStateMonth,
      ...staysState, ...familyState, ...stateMonth,
    ];
  }

  // ─── Chunk 4: VS comparisons + skip-lists + with-kids + region-months ───
  if (id === "4") {
    const supabase = getSupabase();
    if (!supabase) return [];

    const [trapResult, destIds, regionResult] = await Promise.all([
      supabase.from("tourist_trap_alternatives").select("trap_destination_id, alternative_destination_id").order("rank"),
      getDestinationIds(),
      supabase.from("regions").select("id").order("id"),
    ]);

    // VS comparison pages — curated pairs first, then trap alternatives
    const { VS_PAIRS } = await import("@/lib/vs-pairs");
    const seenPairs = new Set<string>();
    const curatedVsEntries = VS_PAIRS.flatMap((p) => {
      const pair = `${p.id1}-vs-${p.id2}`;
      if (seenPairs.has(pair)) return [];
      seenPairs.add(pair);
      return entry(`vs/${pair}`, "monthly", 0.8);
    });
    const trapVsEntries = (trapResult.data ?? []).flatMap((t: any) => {
      const pair = `${t.trap_destination_id}-vs-${t.alternative_destination_id}`;
      if (seenPairs.has(pair)) return [];
      seenPairs.add(pair);
      return entry(`vs/${pair}`, "monthly", 0.7);
    });
    const vsEntries = [...curatedVsEntries, ...trapVsEntries];

    // Skip-list pages
    const seenTraps = new Set<string>();
    const skipEntries = (trapResult.data ?? []).flatMap((t: any) => {
      if (seenTraps.has(t.trap_destination_id)) return [];
      seenTraps.add(t.trap_destination_id);
      return entry(`skip-list/${t.trap_destination_id}`, "monthly", 0.7);
    });

    // With-kids pages
    const kidsEntries = destIds.flatMap((dId) =>
      entry(`with-kids/${dId}`, "monthly", 0.6)
    );

    // Region × month pages
    const regionMonthEntries = (regionResult.data ?? []).flatMap((r: any) =>
      MONTH_SLUGS.flatMap((month) => entry(`region/${r.id}/${month}`, "monthly", 0.7))
    );

    return [...vsEntries, ...skipEntries, ...kidsEntries, ...regionMonthEntries];
  }

  return [];
}
