import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { WhereToGoContent } from "@/components/where-to-go-content";
import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";

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
  const canonicalUrl = `https://nakshiq.com/${locale}/where-to-go/${slug}`;
  const ogImage = `https://nakshiq.com/og-image.jpg`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: `https://nakshiq.com/en/where-to-go/${slug}`,
        hi: `https://nakshiq.com/hi/where-to-go/${slug}`,
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

  let query = supabase
    .from("destination_months")
    .select(`
      score,
      note,
      why_not,
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
    `)
    .eq("month", monthNum);

  if (stateId) {
    query = query.eq("destination.state_id", stateId);
  }

  query = query
    .order("score", { ascending: false })
    .order("destination_id", { ascending: true });

  const { data, error } = await query;

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
  const data = await getMonthData(monthSlug, regionInfo?.stateId);

  if (!data) notFound();

  // Score counts
  const scoreCounts: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0, 0: 0 };
  for (const d of data) {
    const s = d.score ?? 0;
    if (scoreCounts[s] !== undefined) scoreCounts[s]++;
  }

  // BreadcrumbList schema
  const breadcrumbItems = [
    {
      "@type": "ListItem",
      position: 1,
      name: "NakshIQ",
      item: `https://nakshiq.com/${locale}`,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Where to Go",
      item: `https://nakshiq.com/${locale}/where-to-go`,
    },
  ];

  if (regionInfo) {
    breadcrumbItems.push({
      "@type": "ListItem",
      position: 3,
      name: regionInfo.displayName,
      item: `https://nakshiq.com/${locale}/region/${regionInfo.stateId}`,
    });
    breadcrumbItems.push({
      "@type": "ListItem",
      position: 4,
      name: `${regionInfo.displayName} in ${monthName}`,
      item: `https://nakshiq.com/${locale}/where-to-go/${slug}`,
    });
  } else {
    breadcrumbItems.push({
      "@type": "ListItem",
      position: 3,
      name: monthName,
      item: `https://nakshiq.com/${locale}/where-to-go/${slug}`,
    });
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbItems,
  };

  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Nav />
      <main className="mx-auto max-w-6xl px-4 py-8">
        <WhereToGoContent
          monthSlug={monthSlug}
          monthNum={monthNum}
          monthName={monthName}
          regionSlug={regionSlug ?? undefined}
          regionName={regionInfo?.displayName}
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
            };
          })}
          scoreCounts={scoreCounts}
        />
      </main>
    </div>
  );
}
