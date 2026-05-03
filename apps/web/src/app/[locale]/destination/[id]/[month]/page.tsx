import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Nav } from "@/components/nav";
import { DestinationMonth } from "@/components/destination-month";
import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";
import { destinationImage } from "@/lib/image-url";
import { AuthorByline } from "@/components/author-byline";
import { getPrimaryEditor } from "@/lib/editor";
import { videoObjectJsonLd } from "@/lib/video-schema";

export const revalidate = 86400; // 24h — 5,856 month pages × bots = function-invocation tax. Monthly content doesn't need 6h freshness.
export const dynamicParams = true;

// No generateStaticParams — 6,840 month pages render on-demand via ISR
// instead of at build time. Cuts build from 20min to ~2min.
// First visit: 1-2s server render, then cached for 24h (revalidate=86400).

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

  // Same setRequestLocale rationale as the page handler — the metadata pass
  // is a separate render context.
  setRequestLocale(locale);

  const supabase = getSupabase();
  if (!supabase) return {};

  const monthNum = MONTH_NUMBER[month];
  const monthName = MONTH_NAMES[month];

  const [{ data: dest }, { data: monthData }, { data: card }] = await Promise.all([
    supabase.from("destinations").select("name, tagline, state:states(name)").eq("id", id).single(),
    supabase.from("destination_months").select("score, note, why_go, why_not, verdict").eq("destination_id", id).eq("month", monthNum).single(),
    supabase.from("confidence_cards").select("weather_night").eq("destination_id", id).single(),
  ]);

  if (!dest) return {};

  const name = dest.name;
  const score = monthData?.score ?? 0;
  const note = (monthData?.note ?? "").toString();
  const whyGo = (monthData?.why_go ?? "").toString();
  const whyNot = (monthData?.why_not ?? "").toString();
  const verdict = (monthData?.verdict ?? "").toString().toLowerCase();
  const stateData = dest.state as any;
  const stateName = Array.isArray(stateData) ? stateData[0]?.name : stateData?.name;

  // Temperature range — try multiple JSONB shapes (weather_night schema is sparse).
  // Most dests use summer_low_c/winter_low_c; some (south India) use min_temp_c/max_temp_c.
  const weather = (card?.weather_night ?? {}) as {
    summer_low_c?: number; winter_low_c?: number;
    summer_high_c?: number; winter_high_c?: number;
    min_temp_c?: number; max_temp_c?: number;
  };
  const isSummer = monthNum >= 4 && monthNum <= 9;
  const lowTemp = isSummer ? weather.summer_low_c ?? weather.min_temp_c : weather.winter_low_c ?? weather.min_temp_c;
  const highTemp = isSummer ? weather.summer_high_c ?? weather.max_temp_c : weather.winter_high_c ?? weather.max_temp_c;

  // Try to extract a day-temp range straight from the editorial note (e.g. "Extreme 38-46°C.").
  // The note is hand-written per dest×month and usually leads with the temp story —
  // pulling that range gives us a more honest signal than the JSONB extremes.
  const noteRangeMatch = note.match(/(-?\d{1,2})\s*(?:to|-|–|—)\s*(-?\d{1,2})\s*°?\s*[Cc]/);
  const noteLow = noteRangeMatch ? Number(noteRangeMatch[1]) : null;
  const noteHigh = noteRangeMatch ? Number(noteRangeMatch[2]) : null;

  const rangeStr =
    typeof noteLow === "number" && typeof noteHigh === "number"
      ? `${noteLow}–${noteHigh}°C`
      : typeof lowTemp === "number" && typeof highTemp === "number"
      ? `${lowTemp}–${highTemp}°C`
      : typeof lowTemp === "number"
      ? `${lowTemp}°C nights`
      : "";

  // 2026-04-29 CTR rewrite: replace "{Name} Weather in {Month}" template
  // with verdict-led titles + verb-first descriptions. The previous template
  // (factual "weather + temp") was getting 800+ impressions / 1 click on
  // high-volume URLs (Vrindavan/May, Yercaud/May, Kodaikanal/June) — Google
  // showed it, users scrolled past. Verdict-led copy front-loads the answer
  // ("Skip", "Visit", "Wait") in both title and description.

  // Title hook keyed off score. Honest but click-driving:
  // 5 → "Peak season" (best month)
  // 4 → "Great time"
  // 3 → "Mixed conditions" (typically wait verdict)
  // 2 → "Tough season"
  // 1 → "Avoid this month"
  const titleHook = score >= 5 ? "Peak season"
    : score >= 4 ? "Great time"
    : score >= 3 ? "Mixed conditions"
    : score >= 2 ? "Tough season"
    : score >= 1 ? "Avoid this month"
    : "Travel guide";

  // OG title — used in social link previews. Longer + brand-anchored.
  const scoreVerdict = score >= 5 ? "Perfect Time to Visit"
    : score >= 4 ? "Great Time to Visit"
    : score >= 3 ? "Is It Worth Visiting?"
    : score >= 2 ? "Should You Go?"
    : score >= 1 ? "Why to Avoid"
    : "Travel Guide";

  const year = new Date().getFullYear();

  // Title with progressive shortening. Layout appends " | NakshIQ" via title.template
  // (10 chars), so the page-specific portion needs to fit ≤50 chars to stay
  // under Google's ~60-char SERP truncation total.
  // Long: "{name} in {month} {year}: {hook} ({temp})"
  // Med:  "{name} in {month}: {hook} ({temp})"
  // Min:  "{name} in {month} {year}"
  const TITLE_BUDGET = 50;
  const titleLong = rangeStr
    ? `${name} in ${monthName} ${year}: ${titleHook} (${rangeStr})`
    : `${name} in ${monthName} ${year}: ${titleHook}`;
  const titleMed = rangeStr
    ? `${name} in ${monthName}: ${titleHook} (${rangeStr})`
    : `${name} in ${monthName}: ${titleHook}`;
  const title =
    titleLong.length <= TITLE_BUDGET ? titleLong
    : titleMed.length <= TITLE_BUDGET ? titleMed
    : `${name} in ${monthName} ${year}`;

  const ogTitle = `${name} in ${monthName} — ${scoreVerdict} | NakshIQ`;

  // Editorial note often starts with "{Month} at {Name}: ..." — strip that prefix
  // so the description doesn't read awkwardly when our verb-led lead joins it.
  const escName = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const stripPrefix = new RegExp(`^${monthName}(?:\\s+at\\s+${escName})?\\s*:\\s*`, "i");

  const trimToBoundary = (s: string, max: number): string => {
    if (s.length <= max) return s.trim();
    const slice = s.slice(0, max);
    const lastSentence = Math.max(slice.lastIndexOf(". "), slice.lastIndexOf("? "), slice.lastIndexOf("! "));
    if (lastSentence > max * 0.5) return slice.slice(0, lastSentence + 1).trim();
    const lastSpace = slice.lastIndexOf(" ");
    return (lastSpace > 0 ? slice.slice(0, lastSpace) : slice).trim();
  };

  // Verb-first lead based on verdict. "Skip" / "Visit" / "Wait on" fronts
  // the answer in the first ~15 chars — exactly where the eye lands in a SERP.
  const descVerb =
    verdict === "skip" ? "Skip"
    : verdict === "go" ? "Visit"
    : verdict === "wait" ? "Wait on"
    : "";
  const descLead = descVerb
    ? `${descVerb} ${name} in ${monthName} ${year}:`
    : `${name} in ${monthName} ${year}:`;
  const descClose = stateName
    ? `NakshIQ verdict: ${score}/5 (${stateName}).`
    : `NakshIQ verdict: ${score}/5.`;

  // Fallback chain by verdict: skip → why_not first, others → why_go first.
  // Note already contains the editorial perspective for most rows; fall
  // through only when note is empty.
  const noteSource = note
    || (verdict === "skip" ? (whyNot || whyGo) : (whyGo || whyNot))
    || "";
  const noteStripped = noteSource.replace(stripPrefix, "").trim();

  const noteBudget = Math.max(40, 155 - descLead.length - descClose.length - 2);
  const descBody = noteStripped ? trimToBoundary(noteStripped, noteBudget) : "";
  // Strip trailing punctuation + conjunctions so the auto-period doesn't stick
  // an awkward "and." or ", but." at the end (caught: Yercaud/May ended ", and.").
  const descBodyTrimmed = descBody
    .replace(/[,;:\-—\s]+(and|or|but|with|for|to|of|the|a|an|on|at|in)$/i, "")
    .replace(/[,;:\-—]+$/, "")
    .trim();
  const descBodyClean = descBodyTrimmed ? (/[.!?]$/.test(descBodyTrimmed) ? descBodyTrimmed : `${descBodyTrimmed}.`) : "";
  const description = [descLead, descBodyClean, descClose].filter(Boolean).join(" ").trim();
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
        "x-default": `https://www.nakshiq.com/en/destination/${id}/${month}`,
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

  // Destination core data — note we drop the raw `coords` column (PostGIS
  // GEOGRAPHY arrives as a WKB hex string from PostgREST, useless for JSON-LD)
  // and pull lat/lng from the destinations_with_coords view in parallel.
  const [{ data: dest, error }, { data: coordRow }] = await Promise.all([
    supabase
      .from("destinations")
      .select(`
        id, name, tagline, difficulty, elevation_m, budget_tier, best_months, content_reviewed_at,
        state:states(id, name),
        kids_friendly(*),
        confidence_cards(*),
        destination_months(*)
      `)
      .eq("id", id)
      .single(),
    supabase
      .from("destinations_with_coords")
      .select("lat, lng")
      .eq("id", id)
      .single(),
  ]);

  if (error || !dest) return null;
  (dest as any).coords =
    coordRow && typeof coordRow.lat === "number" && typeof coordRow.lng === "number"
      ? { lat: coordRow.lat, lng: coordRow.lng }
      : null;

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

  // Per-page setRequestLocale call — required for on-demand ISR with next-intl
  // when the page doesn't have generateStaticParams. Without it, the layout's
  // setRequestLocale call alone leaves THIS render context dynamic (we
  // intentionally skipped generateStaticParams here to avoid pre-rendering
  // 6,840 month pages at build time).
  setRequestLocale(locale);

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
      ...(typeof (destination as any).coords?.lat === "number" && typeof (destination as any).coords?.lng === "number" && {
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

  // Schema.org JSON-LD — FAQPage (month-specific, expanded to 7 questions).
  // 2026-04-27: split "weather" and "temperature" questions to double-target
  // the GSC patterns "<dest> weather in <month>" + "<dest> temperature in <month>".
  const kf = Array.isArray(destination.kids_friendly) ? destination.kids_friendly[0] : destination.kids_friendly;
  const cc = Array.isArray(destination.confidence_cards) ? destination.confidence_cards[0] : destination.confidence_cards;
  const bestMonthsArr: number[] = (destination as any).best_months ?? [];
  const bestMonthNamesMonth = bestMonthsArr
    .map((m: number) => ["", "January","February","March","April","May","June","July","August","September","October","November","December"][m])
    .filter(Boolean)
    .join(", ");

  // Extract day-temp range from the editorial note (e.g., "Extreme 38-46°C.").
  // Hand-written notes already lead with the temp story per dest×month.
  const faqNote = (currentMonth?.note ?? "").toString();
  const faqRangeMatch = faqNote.match(/(-?\d{1,2})\s*(?:to|-|–|—)\s*(-?\d{1,2})\s*°?\s*[Cc]/);
  const faqRangeStr = faqRangeMatch ? `${faqRangeMatch[1]}–${faqRangeMatch[2]}°C` : "";

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

  // Temperature Q — explicit numeric answer for the "temperature in X in Y" pattern.
  if (faqRangeStr) {
    faqEntries.push({
      name: `What is the temperature in ${destination.name} in ${monthName}?`,
      text: `${destination.name} sees ${faqRangeStr} in ${monthName}. ${faqNote}`,
    });
  }

  faqEntries.push({
    name: `What is the weather like in ${destination.name} in ${monthName}?`,
    text: faqRangeStr
      ? `${destination.name} weather in ${monthName}: ${faqRangeStr}. ${faqNote || currentMonth?.why_go || ""}`.trim()
      : currentMonth?.note || currentMonth?.why_go || `Check the ${destination.name} page on NakshIQ for detailed monthly weather data including temperature range, precipitation, and season-specific warnings.`,
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

  // VideoObject JSON-LD — same pattern as the parent /destination/[id] page
  // (see [id]/page.tsx:511). Each dest×month page renders the destination's
  // hero MP4; without this schema Google's video index flagged 3,669 pages as
  // "Video isn't on a watch page" (GSC export 2026-04-30). Description is
  // month-aware so each /destination/{id}/{month} variant has unique text.
  const videoLd = videoObjectJsonLd({
    id,
    name: `${destination.name} in ${monthName} — NakshIQ travel reel`,
    description: (destination as any).tagline
      ? `${(destination as any).tagline}. ${destination.name} in ${monthName} — aerial and on-ground footage from NakshIQ's coverage.`
      : `${destination.name} (${stateName ?? "India"}) in ${monthName} — aerial and on-ground footage from NakshIQ's coverage.`,
    thumbnailUrl: destinationImage(id),
  });

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
      {videoLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(videoLd) }}
        />
      )}
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
