import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { DestinationMonth } from "@/components/destination-month";
import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";
import { destinationImage } from "@/lib/image-url";
import { AuthorByline } from "@/components/author-byline";
import { getPrimaryEditor } from "@/lib/editor";

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

  // Title optimised for GSC-flagged zero-click queries (2026-04-24 audit):
  // users search "<dest> weather in <month>" and "<dest> temperature in <month>",
  // so "Weather" leads + temp range sits in subtitle. Year token signals
  // freshness and captures "is it worth going now" intent. Stays ≤60 chars
  // with a fallback to a shorter standard variant for long destinations.
  const year = new Date().getFullYear();
  const withTemp = tempStr
    ? `${name} Weather in ${monthName} ${year} — ${tempStr}`
    : null;
  const standard = `${name} Weather in ${monthName} ${year}: Temperature & Guide`;
  const title = withTemp && withTemp.length <= 60 ? withTemp : standard;

  const ogTitle = `${name} in ${monthName} — ${scoreVerdict} | NakshIQ`;

  // Description: lead with real numeric temp (matches "weather in X" query
  // intent), then a destination-specific line, then score + state. Drops the
  // generic "kids safety, road conditions" listicle that was there before —
  // GSC CTR audit 2026-04-24 flagged generic copy as under-performing at pos 7-12.
  const descParts = [
    typeof lowTemp === "number"
      ? `${monthName} in ${name}: nights drop to ${lowTemp}°C.`
      : `${monthName} in ${name}.`,
    note || whyGo,
    stateName ? `NakshIQ scores ${score}/5 for ${stateName}.` : `NakshIQ scores ${score}/5.`,
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
      id, name, tagline, difficulty, elevation_m, budget_tier, best_months, coords, content_reviewed_at,
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

  const [data, editor] = await Promise.all([
    getMonthData(id, month),
    getPrimaryEditor(),
  ]);
  if (!data) notFound();

  const { destination, currentMonth, allMonths, permits, nearby } = data;
  const monthNum = MONTH_NUMBER[month];
  const monthName = MONTH_NAMES[month];
  const score = currentMonth?.score ?? 0;

  const stateInfo = destination.state as any;
  const stateName = Array.isArray(stateInfo) ? stateInfo[0]?.name : stateInfo?.name;

  const monthUrl = `https://www.nakshiq.com/${locale}/destination/${id}/${month}`;
  const destHubUrl = `https://www.nakshiq.com/${locale}/destination/${id}`;
  const reviewedAt = (destination as any).content_reviewed_at ?? null;

  // Schema.org JSON-LD — Article (month-specific guide, @id-chained)
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${monthUrl}#article`,
    headline: `${destination.name} in ${monthName} — ${score}/5`,
    description: currentMonth?.note || currentMonth?.why_go || `Travel guide for ${destination.name} in ${monthName}`,
    inLanguage: locale === "hi" ? "hi-IN" : "en-IN",
    ...(reviewedAt && { dateModified: reviewedAt }),
    author: editor
      ? { "@id": `https://www.nakshiq.com/about/team#${editor.slug}` }
      : { "@id": "https://www.nakshiq.com#organization" },
    publisher: { "@id": "https://www.nakshiq.com#organization" },
    isPartOf: { "@id": "https://www.nakshiq.com#website" },
    about: {
      "@type": "TouristDestination",
      name: destination.name,
      url: destHubUrl,
      ...((destination as any).coords && {
        geo: {
          "@type": "GeoCoordinates",
          latitude: (destination as any).coords.lat,
          longitude: (destination as any).coords.lng,
        },
      }),
      ...((destination as any).elevation_m && {
        elevation: { "@type": "QuantitativeValue", value: (destination as any).elevation_m, unitCode: "MTR" },
      }),
    },
    image: destinationImage(id),
    url: monthUrl,
    mainEntityOfPage: monthUrl,
  };

  // Schema.org JSON-LD — TouristTrip (month-specific suggested trip envelope)
  const verdict = currentMonth?.verdict;
  const touristTripJsonLd = verdict === "go" || verdict === "wait" ? {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    "@id": `${monthUrl}#trip`,
    name: `${destination.name} in ${monthName}`,
    description: currentMonth?.why_go || `${destination.name} visit planned for ${monthName}`,
    url: monthUrl,
    touristType: (destination as any).difficulty === "easy" ? "Family"
      : (destination as any).difficulty === "extreme" ? "Adventure"
      : "General",
    itinerary: {
      "@type": "TouristDestination",
      name: destination.name,
      url: destHubUrl,
    },
    provider: { "@id": "https://www.nakshiq.com#organization" },
  } : null;

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

  // Schema.org JSON-LD — FAQPage (month-specific, expanded to 6 questions)
  const kf = Array.isArray(destination.kids_friendly) ? destination.kids_friendly[0] : destination.kids_friendly;
  const cc = Array.isArray(destination.confidence_cards) ? destination.confidence_cards[0] : destination.confidence_cards;
  const bestMonthsArr: number[] = (destination as any).best_months ?? [];
  const bestMonthNamesMonth = bestMonthsArr
    .map((m: number) => ["", "January","February","March","April","May","June","July","August","September","October","November","December"][m])
    .filter(Boolean)
    .join(", ");

  const faqEntries: Array<{ name: string; text: string }> = [];

  faqEntries.push({
    name: `Is ${monthName} a good time to visit ${destination.name}?`,
    text: `${destination.name} scores ${score}/5 in ${monthName}${verdict ? ` (verdict: ${verdict})` : ""}. ${currentMonth?.why_go || currentMonth?.why_not || currentMonth?.note || "Check the full monthly breakdown on NakshIQ for weather, crowd, and access reasoning."}`,
  });

  if (currentMonth?.why_not && verdict === "skip") {
    faqEntries.push({
      name: `Why should I skip ${destination.name} in ${monthName}?`,
      text: String(currentMonth.why_not),
    });
  }

  if (bestMonthNamesMonth) {
    faqEntries.push({
      name: `What are the best months to visit ${destination.name}?`,
      text: `The best months to visit ${destination.name} are ${bestMonthNamesMonth}. ${verdict === "go" ? `${monthName} is one of them.` : verdict === "skip" ? `${monthName} is not — consider one of the ${bestMonthNamesMonth} months instead.` : ""}`,
    });
  }

  faqEntries.push({
    name: `What is the weather like in ${destination.name} in ${monthName}?`,
    text: currentMonth?.note || currentMonth?.why_go || `Check the ${destination.name} page on NakshIQ for detailed monthly weather data including temperature range, precipitation, and season-specific warnings.`,
  });

  if (kf) {
    faqEntries.push({
      name: `Is ${destination.name} safe for kids in ${monthName}?`,
      text: kf.suitable
        ? `${destination.name} is rated ${kf.rating}/5 for families. ${monthName} ${verdict === "go" ? "is a suitable travel window" : verdict === "skip" ? "is not the recommended travel window — prefer the best-months list" : "is workable but not peak"}.`
        : `${destination.name} is rated ${kf.rating}/5 for families and not recommended for young children, regardless of month. ${(kf.reasons || []).slice(0, 1).join(". ")}.`,
    });
  }

  if (cc?.safety_rating != null) {
    faqEntries.push({
      name: `Is ${destination.name} safe in ${monthName}?`,
      text: `${destination.name} has a safety rating of ${cc.safety_rating}/5. ${cc.safety_notes ? String(cc.safety_notes) : ""}`,
    });
  }

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${monthUrl}#faq`,
    isPartOf: { "@id": "https://www.nakshiq.com#website" },
    about: { "@id": `${monthUrl}#article` },
    mainEntity: faqEntries.map((q) => ({
      "@type": "Question",
      name: q.name,
      acceptedAnswer: { "@type": "Answer", text: q.text },
    })),
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
      {touristTripJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(touristTripJsonLd) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Nav />
      <main className="mx-auto max-w-4xl lg:max-w-6xl px-4 py-8">
        {editor && (
          <div className="mb-6">
            <AuthorByline
              author={editor}
              locale={locale}
              variant="compact"
              reviewedAt={reviewedAt}
            />
          </div>
        )}
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
