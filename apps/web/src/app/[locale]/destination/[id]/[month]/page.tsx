import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { DestinationMonth } from "@/components/destination-month";
import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";
import { destinationImage } from "@/lib/image-url";

export const revalidate = 21600;
export const dynamicParams = true;

// No generateStaticParams — 6,840 month pages render on-demand via ISR
// instead of at build time. Cuts build from 20min to ~2min.
// First visit: 1-2s server render, then cached for 1hr (revalidate=3600).

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
  params: Promise<{ id: string; locale: string; month: string }>;
}): Promise<Metadata> {
  const { id, locale, month } = await params;

  if (!VALID_MONTHS.includes(month as any)) return {};

  const supabase = getSupabase();
  if (!supabase) return {};

  const monthNum = MONTH_NUMBER[month];
  const monthName = MONTH_NAMES[month];

  const [{ data: dest }, { data: monthData }, { data: card }] = await Promise.all([
    supabase.from("destinations").select("name, tagline, state:states(name)").eq("id", id).single(),
    supabase.from("destination_months").select("score, note, why_go").eq("destination_id", id).eq("month", monthNum).single(),
    supabase.from("confidence_cards").select("weather_night").eq("destination_id", id).single(),
  ]);

  if (!dest) return {};

  const name = dest.name;
  const score = monthData?.score ?? 0;
  const note = monthData?.note ?? "";
  const whyGo = monthData?.why_go ?? "";
  const stateData = dest.state as any;
  const stateName = Array.isArray(stateData) ? stateData[0]?.name : stateData?.name;

  // Temperature range — summer (Apr-Sep) vs winter (Oct-Mar)
  const weather = (card?.weather_night ?? {}) as { summer_low_c?: number; winter_low_c?: number };
  const isSummer = monthNum >= 4 && monthNum <= 9;
  const lowTemp = isSummer ? weather.summer_low_c : weather.winter_low_c;
  const tempStr = typeof lowTemp === "number" ? `${lowTemp}°C nights` : "";

  // Short verdict for CTR (titles must stay under ~60 chars for Google)
  const scoreVerdict = score >= 5 ? "Perfect Time to Visit"
    : score >= 4 ? "Great Time to Visit"
    : score >= 3 ? "Is It Worth Visiting?"
    : score >= 2 ? "Should You Go?"
    : score >= 1 ? "Why to Avoid"
    : "Travel Guide";

  // Compact title — under 60 chars where possible
  const title = tempStr
    ? `${name} in ${monthName}: ${tempStr}, Weather Guide`
    : `${name} in ${monthName}: Weather & Travel Guide`;

  const ogTitle = `${name} in ${monthName} — ${scoreVerdict} | NakshIQ`;

  // Description: lead with the actual answer, include temp, region, and specific value prop
  const descParts = [
    tempStr ? `${monthName} in ${name}: ${tempStr}.` : `${name} in ${monthName}.`,
    note || whyGo,
    `Monthly score ${score}/5, kids safety, road conditions, and what to expect in ${stateName || "India"}.`,
  ].filter(Boolean);
  const description = descParts.join(" ").slice(0, 160);
  const canonicalUrl = `https://www.nakshiq.com/${locale}/destination/${id}/${month}`;
  const imageUrl = `https://www.nakshiq.com/api/og?dest=${encodeURIComponent(name)}&month=${monthName}&score=${score}&note=${encodeURIComponent(note?.substring(0, 80) || '')}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: `https://www.nakshiq.com/en/destination/${id}/${month}`,
        hi: `https://www.nakshiq.com/hi/destination/${id}/${month}`,
      },
    },
    openGraph: {
      title: ogTitle,
      description,
      type: "article",
      url: canonicalUrl,
      siteName: "NakshIQ",
      locale: locale === "hi" ? "hi_IN" : "en_IN",
      images: [{ url: imageUrl, width: 1200, height: 630, alt: `${name} in ${monthName} — ${stateName || "India"}` }],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
      images: [imageUrl],
    },
  };
}

async function getMonthData(id: string, month: string) {
  const supabase = getSupabase();
  if (!supabase) return null;

  const monthNum = MONTH_NUMBER[month];

  // Destination core data
  const { data: dest, error } = await supabase
    .from("destinations")
    .select(`
      id, name, tagline, difficulty, elevation_m, budget_tier, best_months,
      state:states(id, name),
      kids_friendly(*),
      confidence_cards(*),
      destination_months(*)
    `)
    .eq("id", id)
    .single();

  if (error || !dest) return null;

  // Current month data
  const allMonths = (dest.destination_months as any[]) ?? [];
  const currentMonth = allMonths.find((m: any) => m.month === monthNum) ?? null;

  // Permits
  const { data: permits } = await supabase
    .from("permits")
    .select("*")
    .eq("destination_id", id);

  // Nearby destinations in same state scoring 4+ this month
  const stateData = dest.state as any;
  const stateId = Array.isArray(stateData) ? stateData[0]?.id : stateData?.id;

  let nearby: any[] = [];
  if (stateId) {
    const { data: nearbyRaw } = await supabase
      .from("destinations")
      .select(`
        id, name, difficulty, elevation_m, budget_tier,
        destination_months!inner(score, note, month)
      `)
      .eq("state_id", stateId)
      .neq("id", id)
      .eq("destination_months.month", monthNum)
      .gte("destination_months.score", 4)
      .limit(8);

    nearby = nearbyRaw ?? [];
  }

  return {
    destination: dest,
    currentMonth,
    allMonths,
    permits: permits ?? [],
    nearby,
  };
}

export default async function DestinationMonthPage({
  params,
}: {
  params: Promise<{ id: string; locale: string; month: string }>;
}) {
  const { id, locale, month } = await params;

  // Validate month slug
  if (!VALID_MONTHS.includes(month as any)) notFound();

  const data = await getMonthData(id, month);
  if (!data) notFound();

  const { destination, currentMonth, allMonths, permits, nearby } = data;
  const monthNum = MONTH_NUMBER[month];
  const monthName = MONTH_NAMES[month];
  const score = currentMonth?.score ?? 0;

  const stateInfo = destination.state as any;
  const stateName = Array.isArray(stateInfo) ? stateInfo[0]?.name : stateInfo?.name;

  // Schema.org JSON-LD — Article
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${destination.name} in ${monthName} — ${score}/5`,
    description: currentMonth?.note || `Travel guide for ${destination.name} in ${monthName}`,
    datePublished: "2026-04-10",
    author: {
      "@type": "Organization",
      name: "NakshIQ",
      url: "https://www.nakshiq.com",
    },
    publisher: {
      "@type": "Organization",
      name: "NakshIQ",
      url: "https://www.nakshiq.com",
    },
    image: destinationImage(id),
    url: `https://www.nakshiq.com/${locale}/destination/${id}/${month}`,
  };

  // Schema.org JSON-LD — BreadcrumbList
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `https://www.nakshiq.com/${locale}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Destinations",
        item: `https://www.nakshiq.com/${locale}/explore`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: destination.name,
        item: `https://www.nakshiq.com/${locale}/destination/${id}`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: monthName,
        item: `https://www.nakshiq.com/${locale}/destination/${id}/${month}`,
      },
    ],
  };

  // Schema.org JSON-LD — FAQPage
  const kf = Array.isArray(destination.kids_friendly) ? destination.kids_friendly[0] : destination.kids_friendly;
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Is ${monthName} a good time to visit ${destination.name}?`,
        acceptedAnswer: { "@type": "Answer", text: `${destination.name} scores ${score}/5 in ${monthName}. ${currentMonth?.note || ""}. ${currentMonth?.why_go || ""}` },
      },
      {
        "@type": "Question",
        name: `What is the weather like in ${destination.name} in ${monthName}?`,
        acceptedAnswer: { "@type": "Answer", text: currentMonth?.note || `Check the ${destination.name} page on NakshIQ for detailed monthly weather data.` },
      },
      ...(kf ? [{
        "@type": "Question",
        name: `Is ${destination.name} safe for kids in ${monthName}?`,
        acceptedAnswer: { "@type": "Answer", text: kf.suitable ? `Yes, ${destination.name} is rated ${kf.rating}/5 for families.` : `${destination.name} is not recommended for families with young children.` },
      }] : []),
    ],
  };

  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Nav />
      <main className="mx-auto max-w-4xl px-4 py-8">
        <DestinationMonth
          destination={destination}
          currentMonth={currentMonth}
          allMonths={allMonths}
          monthNum={monthNum}
          monthSlug={month}
          monthName={monthName}
          permits={permits}
          nearby={nearby}
          locale={locale}
        />
      </main>
    </div>
  );
}
