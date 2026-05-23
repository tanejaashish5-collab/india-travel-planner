import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { STATE_MAP, ALL_STATE_SLUGS, ALL_MONTH_SLUGS } from "@/lib/seo-maps";
import { buildFestivalSlugMap, type FestivalSlugRow } from "@/lib/festival-slug";

// Manual sitemap chunk handlers. Replaces Next.js 16's sitemap.ts +
// generateSitemaps() convention because its auto-generated /sitemap.xml
// index was 500-ing (E132 SSG-vs-dynamic detection bug). All chunk
// generation logic is ported verbatim from the previous sitemap.ts; the
// only change is emitting XML directly instead of returning
// MetadataRoute.Sitemap entries.

export const dynamic = "force-dynamic";

const LOCALES = ["en", "hi"] as const;
const BASE = "https://www.nakshiq.com";

const MONTH_SLUGS = ALL_MONTH_SLUGS;
const STATE_SLUGS = ALL_STATE_SLUGS;

const TREK_STATES = [
  "himachal-pradesh", "uttarakhand", "jammu-kashmir", "ladakh", "sikkim",
  "arunachal-pradesh", "meghalaya", "nagaland", "west-bengal", "rajasthan",
];

const CAMP_STATES = [
  "himachal-pradesh", "uttarakhand", "jammu-kashmir", "ladakh", "sikkim",
  "rajasthan", "meghalaya", "arunachal-pradesh", "madhya-pradesh", "uttar-pradesh",
];

const FAMILY_STATES = [
  "himachal-pradesh", "uttarakhand", "jammu-kashmir", "ladakh", "rajasthan", "punjab",
  "sikkim", "meghalaya", "assam", "uttar-pradesh", "madhya-pradesh", "west-bengal",
  "arunachal-pradesh", "nagaland",
];

const DIFFICULTIES = ["easy", "moderate", "hard", "extreme"];

const TAGS = [
  "offbeat", "trek", "spiritual", "heritage", "wildlife", "lake", "romantic",
  "adventure", "family", "winter", "monsoon", "photography", "budget", "pilgrimage",
  "hill-station", "border", "desert", "valley", "monastery", "waterfall",
];

type Freq = "daily" | "weekly" | "monthly";

type Entry = {
  url: string;
  lastModified: Date;
  changeFrequency: Freq;
  priority: number;
};

function entry(path: string, freq: Freq, priority: number): Entry[] {
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

async function getDestinationIds(): Promise<string[]> {
  const supabase = getSupabase();
  if (!supabase) return [];
  const { data } = await supabase.from("destinations").select("id").order("id");
  return (data ?? []).map((d: any) => d.id);
}

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function toUrlsetXml(entries: Entry[]): string {
  const urls = entries.map((e) => {
    const lastmod = (e.lastModified instanceof Date ? e.lastModified : new Date(e.lastModified)).toISOString();
    return `  <url>\n    <loc>${escapeXml(e.url)}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${e.changeFrequency}</changefreq>\n    <priority>${e.priority.toFixed(2)}</priority>\n  </url>`;
  }).join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

async function buildChunk(id: string): Promise<Entry[]> {
  if (id === "0") {
    const staticPages = [
      "", "explore", "states", "collections", "routes", "treks", "plan",
      "camping", "permits", "road-conditions", "superlatives",
      "stays", "festivals", "tourist-traps",
      "saved", "about", "methodology", "blog", "more",
      "terms", "privacy", "cookies", "editorial-policy",
      "india-travel", "data-deletion", "newsletter", "the-window",
      "vs", "compare", "guide/permits", "guide/book-indian-trains",
      "guide/first-trip-india", "guide/scenarios",
      "guide/visa", "guide/sim-card", "guide/currency", "guide/scams",
      "guide/transport-overview", "guide/food-safety", "guide/etiquette",
      "guide/packing",
      "weekend-from",
      "weekend-from-delhi", "weekend-from-mumbai", "weekend-from-bangalore",
      "weekend-from-chennai", "weekend-from-kolkata", "weekend-from-hyderabad",
      "weekend-from-pune", "weekend-from-ahmedabad", "weekend-from-jaipur",
      "weekend-from-lucknow", "weekend-from-indore", "weekend-from-bhopal",
      "weekend-from-kochi", "weekend-from-agra", "weekend-from-dehradun",
      "weekend-from-chandigarh", "weekend-from-coimbatore", "weekend-from-varanasi",
      "arrival", "arrival/del", "arrival/bom", "arrival/blr", "arrival/maa",
      "arrival/ccu", "arrival/hyd", "arrival/cok", "arrival/goi", "arrival/amd",
      ...Object.keys(STATE_MAP).map((s) => `state/${s}`),
    ];

    const staticEntries = staticPages.flatMap((page) => entry(
      page,
      page === "" ? "daily" : "weekly",
      page === "" ? 1.0 : page === "explore" || page === "india-travel" ? 0.9 : 0.7,
    ));

    const whereToGoEntries = MONTH_SLUGS.flatMap((month) =>
      entry(`where-to-go/${month}`, "weekly", 0.85),
    );

    return [...staticEntries, ...whereToGoEntries];
  }

  if (id === "1") {
    const destIds = await getDestinationIds();
    if (!destIds.length) return [];

    const destEntries = destIds.flatMap((dId) =>
      entry(`destination/${dId}`, "weekly", 0.8),
    );

    const destMonthEntries = destIds.flatMap((dId) =>
      MONTH_SLUGS.flatMap((month) => entry(`destination/${dId}/${month}`, "monthly", 0.7)),
    );

    return [...destEntries, ...destMonthEntries];
  }

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
      entry(`collections/${c.id}`, "monthly", 0.6),
    );

    const routeEntries = (routeResult.data ?? []).flatMap((r: any) =>
      entry(`routes/${r.id}`, "monthly", 0.6),
    );

    const articleEntries = (articleResult.data ?? []).flatMap((a: any) =>
      entry(`blog/${a.slug}`, "weekly", 0.8),
    );

    const trekEntries = (trekResult.data ?? []).flatMap((t: any) =>
      entry(`treks/${t.id}`, "monthly", 0.7),
    );

    const issueEntries = (issueResult.data ?? []).flatMap((i: any) =>
      entry(`the-window/${i.slug}`, "monthly", 0.7),
    );

    return [...collEntries, ...routeEntries, ...articleEntries, ...trekEntries, ...issueEntries];
  }

  if (id === "3") {
    const exploreState = STATE_SLUGS.flatMap((s) => entry(`explore/state/${s}`, "weekly", 0.8));
    const exploreStateMonth = STATE_SLUGS.flatMap((s) =>
      MONTH_SLUGS.flatMap((m) => entry(`explore/state/${s}/${m}`, "monthly", 0.7)),
    );
    const exploreDiff = DIFFICULTIES.flatMap((d) => entry(`explore/difficulty/${d}`, "monthly", 0.7));
    const exploreTag = TAGS.flatMap((t) => entry(`explore/tag/${t}`, "monthly", 0.7));
    const trekState = TREK_STATES.flatMap((s) => entry(`treks/state/${s}`, "monthly", 0.7));
    const trekStateMonth = TREK_STATES.flatMap((s) =>
      MONTH_SLUGS.flatMap((m) => entry(`treks/state/${s}/${m}`, "monthly", 0.65)),
    );
    const trekDiff = DIFFICULTIES.flatMap((d) => entry(`treks/difficulty/${d}`, "monthly", 0.7));
    const campState = CAMP_STATES.flatMap((s) => entry(`camping/state/${s}`, "monthly", 0.7));
    const festMonth = MONTH_SLUGS.flatMap((m) => entry(`festivals/month/${m}`, "monthly", 0.75));
    const festState = STATE_SLUGS.flatMap((s) => entry(`festivals/state/${s}`, "monthly", 0.7));
    const festStateMonth = STATE_SLUGS.flatMap((s) =>
      MONTH_SLUGS.flatMap((m) => entry(`festivals/state/${s}/${m}`, "monthly", 0.65)),
    );
    const staysState = STATE_SLUGS.flatMap((s) => entry(`stays/state/${s}`, "monthly", 0.7));
    const familyState = FAMILY_STATES.flatMap((s) => entry(`family/${s}`, "monthly", 0.7));
    const stateMonth = STATE_SLUGS.flatMap((s) =>
      MONTH_SLUGS.flatMap((m) => entry(`where-to-go/${s}-in-${m}`, "monthly", 0.75)),
    );

    return [
      ...exploreState, ...exploreStateMonth, ...exploreDiff, ...exploreTag,
      ...trekState, ...trekStateMonth, ...trekDiff, ...campState,
      ...festMonth, ...festState, ...festStateMonth,
      ...staysState, ...familyState, ...stateMonth,
    ];
  }

  if (id === "4") {
    const supabase = getSupabase();
    if (!supabase) return [];

    const [trapResult, destIds, regionResult] = await Promise.all([
      supabase.from("tourist_trap_alternatives").select("trap_destination_id, alternative_destination_id").order("rank"),
      getDestinationIds(),
      supabase.from("regions").select("id").order("id"),
    ]);

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

    const seenTraps = new Set<string>();
    const skipEntries = (trapResult.data ?? []).flatMap((t: any) => {
      if (seenTraps.has(t.trap_destination_id)) return [];
      seenTraps.add(t.trap_destination_id);
      return entry(`skip-list/${t.trap_destination_id}`, "monthly", 0.7);
    });

    const kidsEntries = destIds.flatMap((dId) =>
      entry(`with-kids/${dId}`, "monthly", 0.6),
    );

    const regionMonthEntries = (regionResult.data ?? []).flatMap((r: any) =>
      MONTH_SLUGS.flatMap((month) => entry(`region/${r.id}/${month}`, "monthly", 0.7)),
    );

    // Per-festival pages — 331 rows × 2 locales ≈ 662 URLs. Collision-aware
    // slugs (11 duplicates carry a -{destination_id} suffix).
    const { data: festivalRows } = await supabase
      .from("festivals")
      .select("id, name, destination_id");
    const festivalSlugMap = buildFestivalSlugMap((festivalRows ?? []) as FestivalSlugRow[]);
    const festivalEntries = Array.from(festivalSlugMap.values()).flatMap((slug) =>
      entry(`festivals/${slug}`, "monthly", 0.75),
    );

    return [...vsEntries, ...skipEntries, ...kidsEntries, ...regionMonthEntries, ...festivalEntries];
  }

  if (id === "5") {
    const supabase = getSupabase();
    if (!supabase) return [];

    const { data } = await supabase
      .from("questions")
      .select("destination_id, slug, answered_at")
      .eq("status", "answered")
      .order("answered_at", { ascending: false })
      .limit(50000);

    return (data ?? []).flatMap((q: { destination_id: string; slug: string; answered_at: string }) =>
      LOCALES.map((locale) => ({
        url: `${BASE}/${locale}/destination/${q.destination_id}/q/${q.slug}`,
        lastModified: q.answered_at ? new Date(q.answered_at) : new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.65,
      })),
    );
  }

  return [];
}

export async function GET(_req: Request, { params }: { params: Promise<{ file: string }> }) {
  const { file } = await params;
  const match = file.match(/^([0-5])\.xml$/);
  if (!match) {
    return new NextResponse("Not Found", { status: 404 });
  }
  const id = match[1];

  try {
    const entries = await buildChunk(id);
    // Empty chunks 404 instead of serving an empty <urlset> with HTTP 200.
    // /sitemap/5.xml had been NEW-2026-04-30-001 / NEW-2026-05-04-007 because
    // the questions table is unseeded — crawlers were treating it as a real
    // but-empty sitemap. 404 makes them drop it from the index until content
    // exists.
    if (entries.length === 0) {
      return new NextResponse("Not Found", { status: 404 });
    }
    const xml = toUrlsetXml(entries);
    return new NextResponse(xml, {
      headers: {
        "content-type": "application/xml; charset=utf-8",
        "cache-control": "public, max-age=0, s-maxage=21600, stale-while-revalidate=86400",
      },
    });
  } catch (err) {
    console.error(`[sitemap] chunk ${id} failed:`, err);
    return new NextResponse(`Sitemap chunk ${id} generation failed`, { status: 500 });
  }
}
