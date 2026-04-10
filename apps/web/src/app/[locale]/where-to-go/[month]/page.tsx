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
  const { locale, month } = await params;

  if (!VALID_MONTHS.includes(month as any)) return {};

  const supabase = getSupabase();
  if (!supabase) return {};

  const monthNum = MONTH_NUMBER[month];
  const monthName = MONTH_NAMES[month];

  // Count score-5 destinations for this month
  const { count: score5Count } = await supabase
    .from("destination_months")
    .select("*", { count: "exact", head: true })
    .eq("month", monthNum)
    .eq("score", 5);

  const title = `Where to Go in India in ${monthName} — Best Destinations Ranked | NakshIQ`;
  const description = `${score5Count ?? 0} destinations score 5/5 in ${monthName}. Ranked by monthly suitability with weather, crowds, and road data. No guesswork.`;
  const canonicalUrl = `https://nakshiq.com/${locale}/where-to-go/${month}`;
  const ogImage = `https://nakshiq.com/og-image.jpg`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: `https://nakshiq.com/en/where-to-go/${month}`,
        hi: `https://nakshiq.com/hi/where-to-go/${month}`,
      },
    },
    openGraph: {
      title,
      description,
      type: "website",
      url: canonicalUrl,
      siteName: "NakshIQ",
      locale: locale === "hi" ? "hi_IN" : "en_IN",
      images: [{ url: ogImage, width: 1200, height: 630, alt: `Best destinations in India for ${monthName}` }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

async function getMonthData(monthSlug: string) {
  const supabase = getSupabase();
  if (!supabase) return null;

  const monthNum = MONTH_NUMBER[monthSlug];

  const { data, error } = await supabase
    .from("destination_months")
    .select(`
      score,
      note,
      why_not,
      destination_id,
      destination:destinations(
        id,
        name,
        tagline,
        difficulty,
        elevation_m,
        state:states(name)
      )
    `)
    .eq("month", monthNum)
    .order("score", { ascending: false })
    .order("destination_id", { ascending: true });

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
  const { locale, month } = await params;

  if (!VALID_MONTHS.includes(month as any)) {
    notFound();
  }

  const monthNum = MONTH_NUMBER[month];
  const monthName = MONTH_NAMES[month];
  const data = await getMonthData(month);

  if (!data) notFound();

  // Score counts
  const scoreCounts: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0, 0: 0 };
  for (const d of data) {
    const s = d.score ?? 0;
    if (scoreCounts[s] !== undefined) scoreCounts[s]++;
  }

  // BreadcrumbList schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
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
      {
        "@type": "ListItem",
        position: 3,
        name: monthName,
        item: `https://nakshiq.com/${locale}/where-to-go/${month}`,
      },
    ],
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
          monthSlug={month}
          monthNum={monthNum}
          monthName={monthName}
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
