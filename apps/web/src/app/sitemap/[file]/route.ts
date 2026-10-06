import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { STATE_MAP, ALL_STATE_SLUGS, ALL_MONTH_SLUGS } from "@/lib/seo-maps";
import { buildFestivalSlugMap, type FestivalSlugRow } from "@/lib/festival-slug";
import { allBestSlugs } from "@/lib/best-pages";
import { allVillagePaths } from "@/lib/village-slugs";
import { getCachedDestinationsIndex, getCachedItinerarySlugs } from "@/lib/cached-data";

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

// <lastmod> only where we hold a real modification date (2026-10-03). Every
// URL used to carry lastmod=new Date(), so all ~25K URLs claimed "changed this
// second" on every fetch — Google ignores lastmod site-wide once it proves
// unreliable. <changefreq>/<priority> dropped too: Google ignores both, and
// they were ~45% of the bytes (chunk 1 was 3.2 MB).
type Entry = {
  url: string;
  lastModified?: string | null;
};

// Mirror of middleware.ts (lines 305-312) noindex rule: these /hi path
// families render ENGLISH content and are served X-Robots-Tag: noindex,follow.
// A sitemap should list only canonical, indexable URLs — submitting the
// noindex'd /hi duplicates permanently refills GSC's "Excluded by noindex" +
// duplicate-canonical buckets and wastes crawl budget. So we emit only the /en
// variant for these families. KEEP IN SYNC with the middleware regex.
// (Translated /hi families — destination, vs, festivals/<slug>, best, explore,
// treks, cost, etc. — are NOT here and keep both locales.)
const HI_NOINDEX_PREFIXES = [
  "where-to-go", "state", "with-kids", "india-vs", "the-window",
  "guide", "arrival", "skip-list", "blog", "festivals/state",
];

function isHiNoindexed(path: string): boolean {
  return HI_NOINDEX_PREFIXES.some((p) => path === p || path.startsWith(`${p}/`));
}

function entry(path: string, lastModified?: string | null): Entry[] {
  return LOCALES.flatMap((locale) => {
    // Skip the /hi variant of noindex'd English-duplicate families.
    if (locale === "hi" && isHiNoindexed(path)) return [];
    return [{
      url: `${BASE}/${locale}${path ? `/${path}` : ""}`,
      lastModified,
    }];
  });
}

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

async function getDestinationIds(): Promise<string[]> {
  // 24h-cached reference list (see lib/cached-data) — this route is
  // force-dynamic, so without the cache every crawler hit re-queried the DB.
  return (await getCachedDestinationsIndex()).map((d) => d.id);
}

/** id → content_reviewed_at (the page's VERIFIED stamp), same cached list. */
async function getDestinationReviewedAt(): Promise<Map<string, string | null>> {
  return new Map((await getCachedDestinationsIndex()).map((d) => [d.id, d.content_reviewed_at]));
}

// Destinations that carry destination_costs rows — only these get a /cost/[slug]
// page (the rest notFound()), so we never sitemap a 404. One inner-join query
// with the embed capped at 1 row: it used to page all ~12.7K cost rows over
// REST (13 sequential round trips, ~5s) just to dedupe 525 ids.
async function getCostDestinationIds(): Promise<string[]> {
  const supabase = getSupabase();
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("destinations")
    .select("id, destination_costs!inner(destination_id)")
    .limit(1, { referencedTable: "destination_costs" });
  if (error || !data) return [];
  return (data as { id: string }[]).map((r) => r.id).sort();
}

// Destinations that carry a published park_safaris row — only these get a
// /safari/[slug] page (the rest notFound()), so we never sitemap a 404.
async function getSafariDestinationIds(): Promise<string[]> {
  const supabase = getSupabase();
  if (!supabase) return [];
  const { data } = await supabase
    .from("park_safaris")
    .select("destination_id")
    .eq("published", true);
  return (data ?? []).map((r: { destination_id: string }) => r.destination_id).sort();
}

// Pilgrimage routes that are published — only these get a /pilgrimage/[slug]
// page (keyed by own slug, not destination_id). New route family → no allowlist.
async function getPilgrimageSlugs(): Promise<string[]> {
  const supabase = getSupabase();
  if (!supabase) return [];
  const { data } = await supabase
    .from("pilgrimage_routes")
    .select("slug")
    .eq("published", true);
  return (data ?? []).map((r: { slug: string }) => r.slug).sort();
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
    const t = e.lastModified ? new Date(e.lastModified) : null;
    const lastmod = t && !Number.isNaN(t.getTime()) ? `<lastmod>${t.toISOString()}</lastmod>` : "";
    return `  <url><loc>${escapeXml(e.url)}</loc>${lastmod}</url>`;
  }).join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

async function buildChunk(id: string): Promise<Entry[]> {
  if (id === "0") {
    const staticPages = [
      "", "explore", "states", "collections", "routes", "treks", "plan",
      "camping", "permits", "road-conditions", "superlatives",
      "stays", "festivals", "luxury", "tourist-traps",
      "saved", "about", "methodology", "blog", "more",
      "risk-quiz", "quiz/hill-station",
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
      "pilgrimage",
      "arrival", "arrival/del", "arrival/bom", "arrival/blr", "arrival/maa",
      "arrival/ccu", "arrival/hyd", "arrival/cok", "arrival/goi", "arrival/amd",
      ...Object.keys(STATE_MAP).map((s) => `state/${s}`),
      // Dated road-conditions feed, one page per region (lib/road-updates.ts).
      ...["himachal-pradesh","ladakh","jammu-kashmir","uttarakhand","sikkim","arunachal-pradesh","meghalaya","rajasthan"].map((r) => `road-conditions/${r}`),
    ];

    const staticEntries = staticPages.flatMap((page) => entry(page));

    const whereToGoEntries = MONTH_SLUGS.flatMap((month) =>
      entry(`where-to-go/${month}`),
    );

    // /best/[slug] — persona × month + evergreen persona pages.
    // Scope locked by Move A validation (persona+month bucket = YELLOW; n-days
    // / weekend / generic-month buckets RED + dropped). 65 slugs × 2 locales.
    const bestEntries = allBestSlugs().flatMap((slug) =>
      entry(`best/${slug}`),
    );

    // Village pages (/destination/<parent>/<village>, 2026-10-06). English
    // only: the /hi copy is noindexed and canonicals to /en.
    const villageEntries: Entry[] = allVillagePaths().map(({ parentId, slug }) => ({
      url: `${BASE}/en/destination/${parentId}/${slug}`,
    }));

    return [...staticEntries, ...whereToGoEntries, ...bestEntries, ...villageEntries];
  }

  if (id === "1") {
    const reviewedAt = await getDestinationReviewedAt();
    const destIds = Array.from(reviewedAt.keys());
    if (!destIds.length) return [];

    const destEntries = destIds.flatMap((dId) =>
      entry(`destination/${dId}`, reviewedAt.get(dId)),
    );

    const destMonthEntries = destIds.flatMap((dId) =>
      MONTH_SLUGS.flatMap((month) => entry(`destination/${dId}/${month}`, reviewedAt.get(dId))),
    );

    // Independent lookups — run in parallel, not one round trip after another.
    const [costIds, safariIds, pilgrimageSlugs, itinerarySlugs] = await Promise.all([
      // /cost/[slug] — per-destination trip-cost calculator (only dests that
      // carry destination_costs rows; count varies as coverage grows).
      getCostDestinationIds(),
      // /safari/[slug] — per-park safari-booking guide (only dests with a
      // published park_safaris row).
      getSafariDestinationIds(),
      // /pilgrimage/[slug] — verified yatra/parikrama routing (only published rows).
      getPilgrimageSlugs(),
      // /itinerary/[slug] — 1/3/5-day plans. Same cached allowlist the page's
      // generateStaticParams + notFound() use, so we never sitemap a 404.
      getCachedItinerarySlugs(),
    ]);
    const costEntries = costIds.flatMap((dId) => entry(`cost/${dId}`));
    const safariEntries = safariIds.flatMap((dId) => entry(`safari/${dId}`));
    const pilgrimageEntries = pilgrimageSlugs.flatMap((slug) => entry(`pilgrimage/${slug}`));
    const itineraryEntries = itinerarySlugs.flatMap((dId) => entry(`itinerary/${dId}`));

    return [...destEntries, ...destMonthEntries, ...costEntries, ...safariEntries, ...pilgrimageEntries, ...itineraryEntries];
  }

  if (id === "2") {
    const supabase = getSupabase();
    if (!supabase) return [];

    const [collResult, routeResult, articleResult, trekResult, issueResult] = await Promise.all([
      supabase.from("collections").select("id").order("id"),
      supabase.from("routes").select("id").order("id"),
      supabase.from("articles").select("slug, updated_at, published_at").order("published_at", { ascending: false }),
      supabase.from("treks").select("id").order("id"),
      supabase.from("newsletter_issues").select("slug").not("sent_at", "is", null).order("sent_at", { ascending: false }),
    ]);

    const collEntries = (collResult.data ?? []).flatMap((c: any) =>
      entry(`collections/${c.id}`),
    );

    const routeEntries = (routeResult.data ?? []).flatMap((r: any) =>
      entry(`routes/${r.id}`),
    );

    const articleEntries = (articleResult.data ?? []).flatMap((a: any) =>
      entry(`blog/${a.slug}`, a.updated_at ?? a.published_at),
    );

    const trekEntries = (trekResult.data ?? []).flatMap((t: any) =>
      entry(`treks/${t.id}`),
    );

    const issueEntries = (issueResult.data ?? []).flatMap((i: any) =>
      entry(`the-window/${i.slug}`),
    );

    return [...collEntries, ...routeEntries, ...articleEntries, ...trekEntries, ...issueEntries];
  }

  if (id === "3") {
    const exploreState = STATE_SLUGS.flatMap((s) => entry(`explore/state/${s}`));
    const exploreStateMonth = STATE_SLUGS.flatMap((s) =>
      MONTH_SLUGS.flatMap((m) => entry(`explore/state/${s}/${m}`)),
    );
    const exploreDiff = DIFFICULTIES.flatMap((d) => entry(`explore/difficulty/${d}`));
    const exploreTag = TAGS.flatMap((t) => entry(`explore/tag/${t}`));
    const trekState = TREK_STATES.flatMap((s) => entry(`treks/state/${s}`));
    const trekStateMonth = TREK_STATES.flatMap((s) =>
      MONTH_SLUGS.flatMap((m) => entry(`treks/state/${s}/${m}`)),
    );
    const trekDiff = DIFFICULTIES.flatMap((d) => entry(`treks/difficulty/${d}`));
    const campState = CAMP_STATES.flatMap((s) => entry(`camping/state/${s}`));
    const festMonth = MONTH_SLUGS.flatMap((m) => entry(`festivals/month/${m}`));
    const festState = STATE_SLUGS.flatMap((s) => entry(`festivals/state/${s}`));
    const festStateMonth = STATE_SLUGS.flatMap((s) =>
      MONTH_SLUGS.flatMap((m) => entry(`festivals/state/${s}/${m}`)),
    );
    const staysState = STATE_SLUGS.flatMap((s) => entry(`stays/state/${s}`));
    const familyState = FAMILY_STATES.flatMap((s) => entry(`family/${s}`));
    // NOTE: `where-to-go/<state>-in-<month>` URLs are deliberately NOT listed —
    // every one 301-redirects to `/where-to-go/<month>` (middleware.ts lines
    // 272-281, legacy URL consolidation). Listing redirect-source URLs in a
    // sitemap is a Google anti-pattern and permanently refills the "Page with
    // redirect" indexing bucket (~672 such URLs). The middleware redirect stays
    // for any inbound links; we just stop advertising them. (Removed 2026-06-25.)

    return [
      ...exploreState, ...exploreStateMonth, ...exploreDiff, ...exploreTag,
      ...trekState, ...trekStateMonth, ...trekDiff, ...campState,
      ...festMonth, ...festState, ...festStateMonth,
      ...staysState, ...familyState,
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
      return entry(`vs/${pair}`);
    });
    const trapVsEntries = (trapResult.data ?? []).flatMap((t: any) => {
      const pair = `${t.trap_destination_id}-vs-${t.alternative_destination_id}`;
      if (seenPairs.has(pair)) return [];
      seenPairs.add(pair);
      return entry(`vs/${pair}`);
    });
    const vsEntries = [...curatedVsEntries, ...trapVsEntries];

    const seenTraps = new Set<string>();
    const skipEntries = (trapResult.data ?? []).flatMap((t: any) => {
      if (seenTraps.has(t.trap_destination_id)) return [];
      seenTraps.add(t.trap_destination_id);
      return entry(`skip-list/${t.trap_destination_id}`);
    });

    const kidsEntries = destIds.flatMap((dId) =>
      entry(`with-kids/${dId}`),
    );

    const regionMonthEntries = (regionResult.data ?? []).flatMap((r: any) =>
      MONTH_SLUGS.flatMap((month) => entry(`region/${r.id}/${month}`)),
    );

    // Per-festival pages — 331 rows × 2 locales ≈ 662 URLs. Collision-aware
    // slugs (11 duplicates carry a -{destination_id} suffix).
    const { data: festivalRows } = await supabase
      .from("festivals")
      .select("id, name, destination_id");
    const festivalSlugMap = buildFestivalSlugMap((festivalRows ?? []) as FestivalSlugRow[]);
    const festivalEntries = Array.from(festivalSlugMap.values()).flatMap((slug) =>
      entry(`festivals/${slug}`),
    );

    // Per-luxury-experience pages — ~30 rows × 2 locales ≈ 60 URLs.
    const { data: luxuryRows } = await supabase
      .from("luxury_experiences")
      .select("id")
      .eq("published", true)
      .order("id");
    const luxuryEntries = (luxuryRows ?? []).flatMap((r: { id: string }) =>
      entry(`luxury/${r.id}`),
    );

    return [...vsEntries, ...skipEntries, ...kidsEntries, ...regionMonthEntries, ...festivalEntries, ...luxuryEntries];
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
        lastModified: q.answered_at,
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
