import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { WhereToGoContent } from "@/components/where-to-go-content";
import { TopFiveHero } from "@/components/top-five-hero";
import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";
import { weekOfMonth, currentYear } from "@/lib/weekly-picks/weight";
import { computeWeeklyPicks } from "@/lib/weekly-picks/compute";
import type { WeeklyPicksResponse } from "@/lib/weekly-picks/types";
import { getAppStats } from "@/lib/stats";

export const revalidate = 86400;
export const dynamicParams = true;

const VALID_MONTHS = [
  "january","february","march","april","may","june",
  "july","august","september","october","november","december",
] as const;

const MONTH_NAMES: Record<string, string> = {
  january: "January", february: "February", march: "March",
  april: "April", may: "May", june: "June",
  july: "July", august: "August", september: "September",
  october: "October", november: "November", december: "December",
};

const MONTH_NUMBER: Record<string, number> = {
  january: 1, february: 2, march: 3, april: 4, may: 5, june: 6,
  july: 7, august: 8, september: 9, october: 10, november: 11, december: 12,
};

// ─── Regional slug mapping ─────────────────────────────────
// Maps URL slug → state_id used in the destinations table
const REGION_SLUGS: Record<string, { stateId: string; displayName: string }> = {
  "himachal-pradesh": { stateId: "himachal-pradesh", displayName: "Himachal Pradesh" },
  "uttarakhand": { stateId: "uttarakhand", displayName: "Uttarakhand" },
  "jammu-kashmir": { stateId: "jammu-kashmir", displayName: "Jammu & Kashmir" },
  "ladakh": { stateId: "ladakh", displayName: "Ladakh" },
  "rajasthan": { stateId: "rajasthan", displayName: "Rajasthan" },
  "punjab": { stateId: "punjab", displayName: "Punjab" },
  "uttar-pradesh": { stateId: "uttar-pradesh", displayName: "Uttar Pradesh" },
  "sikkim": { stateId: "sikkim", displayName: "Sikkim" },
  "west-bengal": { stateId: "west-bengal", displayName: "West Bengal" },
  "madhya-pradesh": { stateId: "madhya-pradesh", displayName: "Madhya Pradesh" },
  "delhi": { stateId: "delhi", displayName: "Delhi" },
  "chandigarh": { stateId: "chandigarh", displayName: "Chandigarh" },
  "arunachal-pradesh": { stateId: "arunachal-pradesh", displayName: "Arunachal Pradesh" },
  "assam": { stateId: "assam", displayName: "Assam" },
  "bihar": { stateId: "bihar", displayName: "Bihar" },
  "chhattisgarh": { stateId: "chhattisgarh", displayName: "Chhattisgarh" },
  "haryana": { stateId: "haryana", displayName: "Haryana" },
  "jharkhand": { stateId: "jharkhand", displayName: "Jharkhand" },
  "manipur": { stateId: "manipur", displayName: "Manipur" },
  "meghalaya": { stateId: "meghalaya", displayName: "Meghalaya" },
  "mizoram": { stateId: "mizoram", displayName: "Mizoram" },
  "nagaland": { stateId: "nagaland", displayName: "Nagaland" },
  "tripura": { stateId: "tripura", displayName: "Tripura" },
  "andaman-nicobar": { stateId: "andaman-nicobar", displayName: "Andaman & Nicobar Islands" },
  "lakshadweep": { stateId: "lakshadweep", displayName: "Lakshadweep" },
  "puducherry": { stateId: "puducherry", displayName: "Puducherry" },
  "daman-diu": { stateId: "daman-diu", displayName: "Daman & Diu" },
  "gujarat": { stateId: "gujarat", displayName: "Gujarat" },
  "maharashtra": { stateId: "maharashtra", displayName: "Maharashtra" },
  "goa": { stateId: "goa", displayName: "Goa" },
  "karnataka": { stateId: "karnataka", displayName: "Karnataka" },
  "kerala": { stateId: "kerala", displayName: "Kerala" },
  "tamil-nadu": { stateId: "tamil-nadu", displayName: "Tamil Nadu" },
  "andhra-pradesh": { stateId: "andhra-pradesh", displayName: "Andhra Pradesh" },
  "telangana": { stateId: "telangana", displayName: "Telangana" },
  "odisha": { stateId: "odisha", displayName: "Odisha" },
};

/** Parse slug into { regionSlug?, monthSlug } or null if invalid */
function parseSlug(slug: string): { regionSlug: string | null; regionInfo: { stateId: string; displayName: string } | null; monthSlug: string } | null {
  // Regional pattern: "himachal-pradesh-in-april"
  if (slug.includes("-in-")) {
    const inIndex = slug.lastIndexOf("-in-");
    const regionPart = slug.substring(0, inIndex);
    const monthPart = slug.substring(inIndex + 4);
    const regionInfo = REGION_SLUGS[regionPart];
    if (!regionInfo || !VALID_MONTHS.includes(monthPart as any)) return null;
    return { regionSlug: regionPart, regionInfo, monthSlug: monthPart };
  }
  // Month-only pattern: "april"
  if (VALID_MONTHS.includes(slug as any)) {
    return { regionSlug: null, regionInfo: null, monthSlug: slug };
  }
  return null;
}

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; month: string }>;
}): Promise<Metadata> {
  const { locale, month: slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) return {};

  const supabase = getSupabase();
  if (!supabase) return {};

  const { monthSlug, regionInfo } = parsed;
  const monthNum = MONTH_NUMBER[monthSlug];
  const monthName = MONTH_NAMES[monthSlug];

  // Count score-5 destinations for this month (optionally filtered by region)
  let countQuery = supabase
    .from("destination_months")
    .select("destination_id, destination:destinations!inner(state_id)", { count: "exact", head: true })
    .eq("month", monthNum)
    .eq("score", 5);

  if (regionInfo) {
    countQuery = countQuery.eq("destination.state_id", regionInfo.stateId);
  }

  // For month-only, use simpler count
  let score5Count = 0;
  if (regionInfo) {
    const { count } = await countQuery;
    score5Count = count ?? 0;
  } else {
    const { count } = await supabase
      .from("destination_months")
      .select("*", { count: "exact", head: true })
      .eq("month", monthNum)
      .eq("score", 5);
    score5Count = count ?? 0;
  }

  const regionLabel = regionInfo ? regionInfo.displayName : "India";
  const title = `Where to Go in ${regionLabel} in ${monthName} — Best Destinations Ranked | NakshIQ`;
  const description = regionInfo
    ? `${score5Count} destinations in ${regionInfo.displayName} score 5/5 in ${monthName}. Ranked by weather, crowds, and road conditions.`
    : `${score5Count} destinations score 5/5 in ${monthName}. Ranked by monthly suitability with weather, crowds, and road data. No guesswork.`;
  const canonicalUrl = `https://www.nakshiq.com/${locale}/where-to-go/${slug}`;
  const ogImage = `https://www.nakshiq.com/og-image.jpg`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: `https://www.nakshiq.com/en/where-to-go/${slug}`,
        hi: `https://www.nakshiq.com/hi/where-to-go/${slug}`,
      },
    },
    openGraph: {
      title,
      description,
      type: "website",
      url: canonicalUrl,
      siteName: "NakshIQ",
      locale: locale === "hi" ? "hi_IN" : "en_IN",
      images: [{ url: ogImage, width: 1200, height: 630, alt: `Best destinations in ${regionLabel} for ${monthName}` }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

async function getMonthData(monthSlug: string, stateId?: string) {
  const supabase = getSupabase();
  if (!supabase) return null;

  const monthNum = MONTH_NUMBER[monthSlug];

  // NOTE: content_reviewed_at is added to the select string. Before migration
  // 010 is applied, the column doesn't exist and including it would 500 the
  // query. We try-select it, fall back without (see below).
  const BASE_SELECT = `
      score,
      note,
      why_not,
      verdict,
      skip_reason,
      destination_id,
      destination:destinations!inner(
        id,
        name,
        tagline,
        difficulty,
        elevation_m,
        state_id,
        state:states(name)
      )
    `;

  let query = supabase
    .from("destination_months")
    .select(`${BASE_SELECT}, content_reviewed_at`)
    .eq("month", monthNum);

  if (stateId) {
    query = query.eq("destination.state_id", stateId);
  }

  query = query
    .order("score", { ascending: false })
    .order("destination_id", { ascending: true });

  let result = await query;
  let data: any[] | null = (result.data as unknown as any[] | null) ?? null;
  let error = result.error;

  // Fallback: if content_reviewed_at column doesn't exist yet (pre-migration-010),
  // re-run the query without that field. Keeps /where-to-go/* serving until
  // the migration is applied.
  if (error && /content_reviewed_at/.test(error.message)) {
    let fallback = supabase
      .from("destination_months")
      .select(BASE_SELECT)
      .eq("month", monthNum);
    if (stateId) fallback = fallback.eq("destination.state_id", stateId);
    fallback = fallback.order("score", { ascending: false }).order("destination_id", { ascending: true });
    const r2 = await fallback;
    data = (r2.data as unknown as any[] | null) ?? null;
    error = r2.error;
  }

  if (error || !data) return null;

  // Sort by score DESC, then name ASC (post-process for name sort within same score)
  const sorted = [...data].sort((a, b) => {
    const aScore = a.score ?? 0;
    const bScore = b.score ?? 0;
    if (bScore !== aScore) return bScore - aScore;
    const aName = (a.destination as any)?.name ?? "";
    const bName = (b.destination as any)?.name ?? "";
    return aName.localeCompare(bName);
  });

  return sorted;
}

export default async function WhereToGoPage({
  params,
}: {
  params: Promise<{ locale: string; month: string }>;
}) {
  const { locale, month: slug } = await params;
  const parsed = parseSlug(slug);

  if (!parsed) {
    notFound();
  }

  const { monthSlug, regionSlug, regionInfo } = parsed;
  const monthNum = MONTH_NUMBER[monthSlug];
  const monthName = MONTH_NAMES[monthSlug];
  const [data, stats] = await Promise.all([
    getMonthData(monthSlug, regionInfo?.stateId),
    getAppStats(),
  ]);

  if (!data) notFound();

  // Score counts
  const scoreCounts: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0, 0: 0 };
  for (const d of data) {
    const s = d.score ?? 0;
    if (scoreCounts[s] !== undefined) scoreCounts[s]++;
  }

  // Oldest review stamp across this month's destinations. If ANY is null,
  // we pass null so the strip shows "Review pending on some destinations".
  const anyNull = data.some((d) => (d as any).content_reviewed_at == null);
  const monthReviewedAt = anyNull
    ? null
    : data.reduce<string | null>((oldest, d) => {
        const ts = (d as any).content_reviewed_at as string | null;
        if (!ts) return oldest;
        return oldest && oldest < ts ? oldest : ts;
      }, null);

  // BreadcrumbList schema
  const breadcrumbItems = [
    {
      "@type": "ListItem",
      position: 1,
      name: "NakshIQ",
      item: `https://www.nakshiq.com/${locale}`,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Where to Go",
      item: `https://www.nakshiq.com/${locale}/where-to-go`,
    },
  ];

  if (regionInfo) {
    breadcrumbItems.push({
      "@type": "ListItem",
      position: 3,
      name: regionInfo.displayName,
      item: `https://www.nakshiq.com/${locale}/region/${regionInfo.stateId}`,
    });
    breadcrumbItems.push({
      "@type": "ListItem",
      position: 4,
      name: `${regionInfo.displayName} in ${monthName}`,
      item: `https://www.nakshiq.com/${locale}/where-to-go/${slug}`,
    });
  } else {
    breadcrumbItems.push({
      "@type": "ListItem",
      position: 3,
      name: monthName,
      item: `https://www.nakshiq.com/${locale}/where-to-go/${slug}`,
    });
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbItems,
  };

  // Fetch this week's picks server-side for the month-only view. We skip the
  // weekly hero on regional (state) pages — the pool is too small for
  // diversity constraints to produce meaningful rotation there.
  let weeklyPicks: WeeklyPicksResponse | null = null;
  if (!regionInfo) {
    weeklyPicks = await fetchWeeklyPicks(monthNum);
  }
  const pickedIds = new Set(weeklyPicks?.destinations.map((d) => d.id) ?? []);

  // ItemList schema for weekly picks — emitted alongside BreadcrumbList.
  const itemListSchema = weeklyPicks?.seo ?? null;

  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {itemListSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
        />
      )}
      <Nav />
      <main className="mx-auto max-w-6xl px-4 py-8">
        {weeklyPicks && weeklyPicks.destinations.length > 0 && (
          <TopFiveHero
            topFive={weeklyPicks.destinations.map((d) => ({
              id: d.id,
              name: d.name,
              tagline: d.tagline,
              state: d.state,
              elevation_m: d.elevation_m,
              score: d.score,
              whyThisWeek: d.why_this_week,
            }))}
            monthName={monthName}
            monthSlug={monthSlug}
            asOfDate={`${monthName} ${currentYear()}`}
            weekNum={weeklyPicks.week}
            dateRange={weeklyPicks.date_range}
            fallbackFromFour={weeklyPicks.fallback_from_four}
          />
        )}

        <WhereToGoContent
          monthSlug={monthSlug}
          monthNum={monthNum}
          monthName={monthName}
          regionSlug={regionSlug ?? undefined}
          regionName={regionInfo?.displayName}
          excludeIds={Array.from(pickedIds)}
          data={data.map((d) => {
            const dest = d.destination as any;
            const stateInfo = dest?.state;
            const stateName = Array.isArray(stateInfo) ? stateInfo[0]?.name : stateInfo?.name;
            return {
              id: dest?.id ?? d.destination_id,
              name: dest?.name ?? "Unknown",
              tagline: dest?.tagline ?? "",
              difficulty: dest?.difficulty ?? "moderate",
              elevation_m: dest?.elevation_m ?? null,
              state: stateName ?? "",
              score: d.score ?? 0,
              note: d.note ?? null,
              why_not: d.why_not ?? null,
              verdict: (d as any).verdict ?? null,
              skip_reason: (d as any).skip_reason ?? null,
            };
          })}
          scoreCounts={scoreCounts}
          destinationCount={stats.destinations}
          monthReviewedAt={monthReviewedAt}
        />
      </main>
    </div>
  );
}

/**
 * Compute this week's picks directly — no self-fetch. The API route at
 * /api/weekly-picks uses the same computeWeeklyPicks() helper, so external
 * consumers (autoposter, etc.) see identical results to what the page
 * renders. Calling the function directly avoids build-time deadlock where
 * static generation would try to HTTP-fetch an API route that doesn't
 * exist yet.
 */
async function fetchWeeklyPicks(monthNum: number): Promise<WeeklyPicksResponse | null> {
  try {
    const today = new Date();
    return await computeWeeklyPicks(monthNum, weekOfMonth(today), currentYear(today));
  } catch {
    return null;
  }
}
