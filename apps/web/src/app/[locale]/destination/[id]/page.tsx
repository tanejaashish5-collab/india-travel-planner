import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { DestinationDetail } from "@/components/destination-detail";
import { PrevNextNav } from "@/components/prev-next-nav";
import Link from "next/link";
import { VS_PAIRS } from "@/lib/vs-pairs";
import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";
import { StickyDestinationTabs, BottomCTABar } from "@/components/mobile-destination-enhancements";
import { NewsletterStickyTray } from "@/components/newsletter-sticky-tray";
import { destinationImage } from "@/lib/image-url";
import { AuthorByline } from "@/components/author-byline";
import { getPrimaryEditor } from "@/lib/editor";
import { videoObjectJsonLd } from "@/lib/video-schema";

export const revalidate = 86400; // 24h — UGC moderation lag is already 24-48h, so hourly revalidation just burned function invocations
// dynamicParams=true → pages not pre-rendered at build time ISR-generate on
// first hit and then cache. We flipped this from false to true after the
// Supabase free-plan quota grace period started rate-limiting queries —
// pre-rendering 460 dests × 2 locales = 920 pages × 17 queries each was
// exhausting the API limit and hanging builds for hours.
//
// Tradeoff: unknown dest slugs now soft-404 (return 200 via notFound()
// instead of a native 404). Acceptable while the moat work is shipping.
// If SEO rankings drop, flip back and upgrade Supabase to Pro.
export const dynamicParams = true;

// Pre-render the marquee destinations at build time for FCP-critical pages.
// Long-tail destinations lazy-generate via ISR on first hit (dynamicParams=true).
// Sprint 11 expansion: 3 Sprint-2 pilots + Tier-1 marquee set (~50 total).
// Using a hardcoded list rather than a DB query so build-time latency stays
// predictable. Re-evaluate quarterly based on GA4 traffic.
const PRE_RENDER_IDS = [
  // Sprint-2 pilots — demo-critical, kept first
  "bomdila", "gurez-valley", "kaza",
  // Himalayas — Ladakh / J&K
  "leh", "pangong-lake", "nubra-valley", "srinagar", "gulmarg", "pahalgam",
  // Himalayas — Himachal
  "manali", "shimla", "dharamshala", "mcleod-ganj", "spiti-valley",
  // Himalayas — Uttarakhand
  "rishikesh", "mussoorie", "nainital", "valley-of-flowers", "auli",
  // Northeast
  "tawang", "dzukou-valley", "cherrapunji", "gangtok", "ziro-valley", "shillong",
  // Rajasthan heritage spine
  "jaisalmer", "udaipur", "jaipur", "jodhpur", "pushkar",
  // UP / Delhi / Agra
  "varanasi", "agra", "delhi",
  // Heritage + UNESCO
  "hampi", "khajuraho", "ajanta-caves", "ellora-caves", "mahabalipuram", "konark",
  // Southern marquee
  "munnar", "alleppey", "kochi", "kodaikanal", "ooty", "coorg",
  // Coastal
  "panaji", "palolem", "havelock-island", "neil-island", "puducherry", "gokarna",
  // Gujarat / Central
  "rann-of-kutch", "ahmedabad",
];

export async function generateStaticParams() {
  const locales = ["en", "hi"];
  return PRE_RENDER_IDS.flatMap((id) => locales.map((locale) => ({ id, locale })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string; locale: string }>;
}): Promise<Metadata> {
  const { id, locale } = await params;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return {};

  const supabase = createClient(url, key);
  const { data } = await supabase
    .from("destinations")
    .select("name, tagline, difficulty, elevation_m, translations, state:states(name)")
    .eq("id", id)
    .single();

  if (!data) return {};

  const name = (locale !== "en" && (data.translations as any)?.[locale]?.name) || data.name;
  const tagline = (locale !== "en" && (data.translations as any)?.[locale]?.tagline) || data.tagline;
  const stateData = data.state as any;
  const stateName = Array.isArray(stateData) ? stateData[0]?.name : stateData?.name;

  const title = stateName
    ? `${name}, ${stateName}: Best Time to Visit & Weather`
    : `${name}: Best Time to Visit, Weather & Travel Guide`;
  const description = `Plan your trip to ${name}${stateName ? `, ${stateName}` : ""}. ${tagline} Monthly weather scores, kids safety ratings, road conditions, and real infrastructure data — not sponsored content.`.slice(0, 160);
  const canonicalUrl = `https://www.nakshiq.com/${locale}/destination/${id}`;
  const imageUrl = destinationImage(id);

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: `https://www.nakshiq.com/en/destination/${id}`,
        hi: `https://www.nakshiq.com/hi/destination/${id}`,
      },
    },
    openGraph: {
      title: `${title} | NakshIQ`,
      description,
      type: "article",
      url: canonicalUrl,
      siteName: "NakshIQ",
      locale: locale === "hi" ? "hi_IN" : "en_IN",
      images: [{ url: imageUrl, width: 1200, height: 630, alt: `${name} — ${stateName || "India"}` }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | NakshIQ`,
      description,
      images: [imageUrl],
    },
  };
}

async function getDestination(id: string) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;

  const supabase = createClient(url, key);

  const { data, error } = await supabase
    .from("destinations")
    .select(`
      *,
      state:states(name),
      kids_friendly(*),
      confidence_cards(*),
      destination_months(*),
      sub_destinations(*),
      local_legends(*),
      viral_eats(*)
    `)
    .eq("id", id)
    .single();

  if (error || !data) return null;

  // Pre-fetch coords — needed for the PostGIS nearby query that runs in the parallel batch.
  const { data: coordData } = await supabase
    .from("destinations_with_coords")
    .select("lat, lng")
    .eq("id", id)
    .single();

  // Distance-sorted nearby via PostGIS, with same-state fallback when coords are missing.
  const fetchNearby = async () => {
    if (coordData?.lat != null && coordData?.lng != null) {
      const { data: rpcData, error: rpcErr } = await supabase.rpc("find_nearby_destinations", {
        lat: coordData.lat,
        lng: coordData.lng,
        radius_km: 150,
      });
      if (!rpcErr && Array.isArray(rpcData) && rpcData.length > 0) {
        const nearbyIds = rpcData
          .filter((n: any) => n.destination_id !== id)
          .slice(0, 8)
          .map((n: any) => n.destination_id);
        if (nearbyIds.length > 0) {
          // Fetch details + coords in parallel. Coords power the enriched
          // mini-map pins (destination-map.tsx); details feed the textual
          // "Nearby" section lower on the page.
          const [{ data: full }, { data: coords }] = await Promise.all([
            supabase
              .from("destinations")
              .select("id, name, difficulty, elevation_m, state:states(name)")
              .in("id", nearbyIds),
            supabase
              .from("destinations_with_coords")
              .select("id, lat, lng")
              .in("id", nearbyIds),
          ]);
          const distMap = new Map<string, number>(
            rpcData.map((n: any) => [n.destination_id, n.distance_km])
          );
          const coordMap = new Map<string, { lat: number; lng: number }>(
            (coords ?? []).map((c: any) => [c.id, { lat: c.lat, lng: c.lng }])
          );
          return { data: (full ?? [])
            .map((d: any) => ({
              ...d,
              distance_km: Math.round(distMap.get(d.id) ?? 0),
              lat: coordMap.get(d.id)?.lat ?? null,
              lng: coordMap.get(d.id)?.lng ?? null,
            }))
            .sort((a: any, b: any) => a.distance_km - b.distance_km) };
        }
      }
    }
    // Fallback: same-state, no distance
    const { data: sameState } = await supabase
      .from("destinations")
      .select("id, name, difficulty, elevation_m")
      .eq("state_id", data.state_id)
      .neq("id", id)
      .limit(8);
    return { data: (sameState ?? []).map((d: any) => ({ ...d, distance_km: null })) };
  };

  // Scenario matcher — runs inline because it depends on `data.region`
  // / `data.elevation_m` / border flags from the main destinations row.
  // OR-match across 4 criteria, dedup by id.
  const fetchScenarios = async () => {
    const orClauses: string[] = [
      `applies_to_destinations.cs.{${id}}`,
    ];
    if (data.region) orClauses.push(`applies_to_regions.cs.{${data.region}}`);
    if (data.state_id) orClauses.push(`applies_to_regions.cs.{${data.state_id}}`);
    // PostgREST `.or()` takes comma-joined filter expressions.
    const { data: byMatch } = await supabase
      .from("scenarios")
      .select("*")
      .or(orClauses.join(","))
      .order("severity", { ascending: false });
    let scenarios = byMatch ?? [];

    // Altitude match — separate query because .or() doesn't mix well with
    // range filters, and altitude scenarios (AMS etc.) need explicit bounds.
    if (data.elevation_m) {
      const { data: byAlt } = await supabase
        .from("scenarios")
        .select("*")
        .lte("applies_to_altitude_min", data.elevation_m)
        .or(`applies_to_altitude_max.is.null,applies_to_altitude_max.gte.${data.elevation_m}`);
      for (const s of byAlt ?? []) {
        if (!scenarios.find((x: any) => x.id === s.id)) scenarios.push(s);
      }
    }
    return { data: scenarios };
  };

  // Fire all remaining queries in parallel — ~70% faster than sequential
  const [
    gems, trapAlts, festivals, localStays, travelerNotes,
    allDests, reviews, relatedArticles, relatedCollections, relatedRoutes,
    nearbyDests, emergencySos, pois, editorStayPicks, scenarios, tripReports,
    questions,
  ] = await Promise.all([
    supabase.from("hidden_gems").select("*").eq("near_destination_id", id),
    supabase
      .from("tourist_trap_alternatives")
      .select(`
        *,
        destination:destinations!tourist_trap_alternatives_alternative_destination_id_fkey(
          name, tagline, difficulty, elevation_m
        )
      `)
      .eq("trap_destination_id", id)
      .order("rank"),
    supabase.from("festivals").select("*").eq("destination_id", id).order("month"),
    supabase.from("local_stays").select("*").eq("destination_id", id).order("type"),
    supabase.from("traveler_notes").select("*").eq("destination_id", id).order("created_at", { ascending: false }).limit(20),
    supabase.from("destinations").select("id, name").order("name"),
    supabase
      .from("reviews")
      .select("id, rating, text, traveler_type, visit_month, visit_year, created_at")
      .eq("destination_id", id)
      .eq("status", "approved")
      .order("created_at", { ascending: false })
      .limit(20),
    supabase.from("articles").select("slug, title, depth, reading_time, category").contains("destinations", [id]).order("depth", { ascending: false }).limit(5),
    supabase.from("collections").select("id, name, description").filter("items", "cs", JSON.stringify([{ destination_id: id }])).limit(5),
    supabase.from("routes").select("id, name, days, difficulty").contains("stops", [id]).limit(5),
    fetchNearby(),
    supabase.from("emergency_sos").select("*").eq("destination_id", id).single(),
    supabase.from("points_of_interest").select("id, name, type, description, time_needed, entry_fee, kids_suitable, tags").eq("destination_id", id).order("type"),
    supabase.from("destination_stay_picks")
      .select("slot, name, property_type, price_band, why_nakshiq, signature_experience, sources, contact_only, contact_info, published, confidence")
      .eq("destination_id", id)
      .eq("published", true),
    fetchScenarios(),
    supabase
      .from("trip_reports")
      .select("id, destination_id, visited_month, visited_year, rating, summary, body, reporter_name, reporter_location, highlights, warnings, approved_at")
      .eq("destination_id", id)
      .eq("status", "approved")
      .order("approved_at", { ascending: false })
      .limit(10),
    supabase
      .from("questions")
      .select("id, slug, question, answer, category, traveler_type, editor_handle, answered_at")
      .eq("destination_id", id)
      .eq("status", "answered")
      .order("answered_at", { ascending: false })
      .limit(5),
  ]);

  return {
    ...data,
    hidden_gems: gems.data ?? [],
    trap_alternatives: trapAlts.data ?? [],
    festivals: festivals.data ?? [],
    local_stays: localStays.data ?? [],
    traveler_notes: travelerNotes.data ?? [],
    reviews: reviews.data ?? [],
    coords: coordData ? { lat: coordData.lat, lng: coordData.lng } : null,
    allDestinations: allDests.data ?? [],
    relatedArticles: relatedArticles.data ?? [],
    relatedCollections: relatedCollections.data ?? [],
    relatedRoutes: relatedRoutes.data ?? [],
    nearbyDestinations: nearbyDests.data ?? [],
    emergencySos: emergencySos.data ?? null,
    points_of_interest: pois.data ?? [],
    editor_stay_picks: editorStayPicks.data ?? [],
    scenarios: scenarios.data ?? [],
    trip_reports: tripReports.data ?? [],
    questions: questions.data ?? [],
  };
}

export default async function DestinationPage({
  params,
}: {
  params: Promise<{ id: string; locale: string }>;
}) {
  const { id, locale } = await params;
  const [dest, editor] = await Promise.all([getDestination(id), getPrimaryEditor()]);
  if (!dest) notFound();
  const reviewedAt = (dest as any).content_reviewed_at ?? null;

  // Find comparison pairs involving this destination
  const comparisons = VS_PAIRS
    .filter((p) => p.id1 === id || p.id2 === id)
    .map((p) => {
      const other = p.id1 === id ? p.id2 : p.id1;
      return { other, pair: `${p.id1}-vs-${p.id2}` };
    })
    .slice(0, 6);
  const comparisonDests = comparisons.length > 0
    ? (dest.allDestinations ?? []).filter((d: any) => comparisons.some((c) => c.other === d.id))
    : [];

  // Schema.org JSON-LD — TouristDestination with @id chain back to the
  // Organization/WebSite entities declared in the root layout. This lets
  // search + AI engines resolve "this destination is published by NakshIQ"
  // without having to re-fetch the site's homepage.
  const stateInfo = dest.state as any;
  const stateName = Array.isArray(stateInfo) ? stateInfo[0]?.name : stateInfo?.name;
  const destUrl = `https://www.nakshiq.com/${locale}/destination/${id}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    "@id": `${destUrl}#destination`,
    name: dest.name,
    description: dest.tagline || `Travel guide for ${dest.name}`,
    url: destUrl,
    image: destinationImage(id),
    inLanguage: locale === "hi" ? "hi-IN" : "en-IN",
    isPartOf: { "@id": "https://www.nakshiq.com#website" },
    publisher: { "@id": "https://www.nakshiq.com#organization" },
    ...(dest.elevation_m && { elevation: { "@type": "QuantitativeValue", value: dest.elevation_m, unitCode: "MTR" } }),
    ...(dest.coords && {
      geo: { "@type": "GeoCoordinates", latitude: dest.coords.lat, longitude: dest.coords.lng },
    }),
    containedInPlace: {
      "@type": "AdministrativeArea",
      name: stateName || "India",
      containedInPlace: { "@type": "Country", name: "India" },
    },
    touristType: dest.difficulty === "easy" ? "Family" : dest.difficulty === "extreme" ? "Adventure" : "General",
    ...((() => {
      // AggregateRating — computed live from approved reviews + trip_reports.
      // Only emitted when there's at least one to average, per schema.org spec.
      // Combining the two tables gives a more honest reviewCount and avg —
      // they're separate UGC streams (long-form trip_reports and quick reviews)
      // but both rate 1-5, so averaging together is fair.
      const reports: Array<{ rating: number }> = (dest as any).trip_reports ?? [];
      const reviews: Array<{ rating: number }> = (dest as any).reviews ?? [];
      const total = reports.length + reviews.length;
      if (total === 0) return {};
      const sum =
        reports.reduce((a, r) => a + Number(r.rating), 0) +
        reviews.reduce((a, r) => a + Number(r.rating), 0);
      const avg = sum / total;
      return {
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: Number(avg.toFixed(1)),
          reviewCount: total,
          bestRating: 5,
          worstRating: 1,
        },
      };
    })()),
  };

  // BreadcrumbList schema — locale-aware
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `https://www.nakshiq.com/${locale}` },
      { "@type": "ListItem", position: 2, name: "Destinations", item: `https://www.nakshiq.com/${locale}/explore` },
      { "@type": "ListItem", position: 3, name: stateName || "India", item: `https://www.nakshiq.com/${locale}/region/${dest.state_id || "india"}` },
      { "@type": "ListItem", position: 4, name: dest.name, item: destUrl },
    ],
  };

  // FAQPage schema — generated from destination data
  const kf = Array.isArray(dest.kids_friendly) ? dest.kids_friendly[0] : dest.kids_friendly;
  const cc = Array.isArray(dest.confidence_cards) ? dest.confidence_cards[0] : dest.confidence_cards;
  const bestMonthNames = (dest.best_months || []).map((m: number) => ["","January","February","March","April","May","June","July","August","September","October","November","December"][m]).filter(Boolean).join(", ");

  // FAQPage schema — expanded to 8 questions covering best-time, kids, safety,
  // solo-female, altitude, reach, stay, budget. Each answer pulls from real DB
  // data (no fabrication). Structured so LLM answer engines (ChatGPT Search,
  // Perplexity, AIO) can extract specific sub-answers.
  const solofScore = (dest as any).solo_female_score ?? null;
  const soloPct = solofScore?.annual_score ?? null;
  const budgetTier = (dest as any).budget_tier ?? null;
  const budgetText = budgetTier === 1 ? "Budget-friendly (under ₹2,000/day)"
    : budgetTier === 2 ? "Mid-range (₹2,000–5,000/day)"
    : budgetTier === 3 ? "Premium (₹5,000–15,000/day)"
    : budgetTier === 4 ? "Luxury (₹15,000+/day)"
    : null;

  const faqQuestions: Array<{ name: string; text: string }> = [];

  if (bestMonthNames) {
    faqQuestions.push({
      name: `What is the best time to visit ${dest.name}?`,
      text: `The best months to visit ${dest.name} are ${bestMonthNames}. Every month has a separate go/wait/skip verdict with specific weather reasoning on NakshIQ — see /destination/${id}/[month] pages for month-level detail.`,
    });
  }
  if (kf) {
    faqQuestions.push({
      name: `Is ${dest.name} safe for families with kids?`,
      text: kf.suitable
        ? `Yes, ${dest.name} is rated ${kf.rating}/5 for families with kids. ${(kf.reasons || []).slice(0, 2).join(". ")}.`
        : `${dest.name} is rated ${kf.rating}/5 for families and is not recommended for young children. ${(kf.reasons || []).slice(0, 2).join(". ")}.`,
    });
  }
  if (soloPct != null) {
    faqQuestions.push({
      name: `Is ${dest.name} safe for solo female travelers?`,
      text: `${dest.name} scores ${soloPct}/5 for solo-female travel safety on NakshIQ's annual index. ${solofScore?.note ? String(solofScore.note) : "See the Safety & Logistics section for month-by-month overrides and local advisory notes."}`,
    });
  }
  if (cc?.reach) {
    faqQuestions.push({
      name: `How do I reach ${dest.name}?`,
      text: typeof cc.reach === "object"
        ? (cc.reach.from_nearest_city || cc.reach.public_transport || `See the ${dest.name} travel guide on NakshIQ for detailed route information.`)
        : String(cc.reach),
    });
  }
  if (dest.elevation_m) {
    faqQuestions.push({
      name: `What altitude is ${dest.name}?`,
      text: `${dest.name} sits at ${dest.elevation_m.toLocaleString()}m above sea level. ${dest.difficulty === "extreme" ? "Altitude sickness (AMS) is a real risk — acclimatise for 24-48 hours at a lower altitude before arrival, and watch for headache, nausea, or shortness of breath." : dest.elevation_m > 3000 ? "Some altitude awareness is needed. Anyone with cardiovascular or respiratory conditions should consult a doctor before travel." : "Altitude is not a concern for most visitors."}`,
    });
  }
  if (cc?.emergency) {
    const emergency = typeof cc.emergency === "object" ? cc.emergency : {};
    const hospital = (emergency as any).nearest_hospital;
    if (hospital) {
      faqQuestions.push({
        name: `Where is the nearest hospital to ${dest.name}?`,
        text: `The nearest hospital or medical facility for ${dest.name} is ${hospital}. For altitude-related emergencies, Diamox and supplemental oxygen may be available at local chemists; for serious emergencies, evacuation to the nearest district hospital is standard.`,
      });
    }
  }
  if (cc?.network) {
    const network = typeof cc.network === "object" ? cc.network : {};
    const signal = (network as any).note || (network as any).best_carrier || (network as any).coverage;
    if (signal) {
      faqQuestions.push({
        name: `Is there mobile network and internet in ${dest.name}?`,
        text: `Mobile signal at ${dest.name}: ${String(signal)}. Carry offline maps (Google Maps offline download or Maps.me) for any stretches beyond town limits, especially if the route passes through low-signal valleys or forest corridors.`,
      });
    }
  }
  if (budgetText) {
    faqQuestions.push({
      name: `What is the budget for a trip to ${dest.name}?`,
      text: `${dest.name} falls in the ${budgetText} tier on NakshIQ's scale. This covers typical mid-range accommodation, local transport, meals, and one paid activity per day. Solo travelers, families, and luxury travelers will see ±30-50% variation from this baseline.`,
    });
  }

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${destUrl}#faq`,
    isPartOf: { "@id": "https://www.nakshiq.com#website" },
    about: { "@id": `${destUrl}#destination` },
    mainEntity: faqQuestions.map((q) => ({
      "@type": "Question",
      name: q.name,
      acceptedAnswer: { "@type": "Answer", text: q.text },
    })),
  };

  // VideoObject JSON-LD — only emit when an MP4 actually exists. We don't
  // probe R2; we infer presence from the same id pattern videoSrc() uses.
  // Description pulls from tagline so it's destination-specific.
  const videoLd = videoObjectJsonLd({
    id,
    name: `${dest.name} — NakshIQ travel reel`,
    description: dest.tagline
      ? `${dest.tagline}. Aerial and on-ground footage from NakshIQ's ${dest.name} coverage.`
      : `Travel footage from NakshIQ's ${dest.name} coverage in ${stateName ?? "India"}.`,
    thumbnailUrl: destinationImage(id),
  });

  // Review JSON-LD — one Review entity per approved review, capped at 10
  // (Google rich results cap). Each links back to the destination via
  // itemReviewed @id chain. Skips quietly if reviews is empty.
  const reviewsForLd: Array<{
    id: string;
    rating: number;
    text: string;
    traveler_type?: string | null;
    created_at: string;
  }> = ((dest as any).reviews ?? []).slice(0, 10);
  const reviewLdBlocks = reviewsForLd.map((rev) => ({
    "@context": "https://schema.org",
    "@type": "Review",
    "@id": `${destUrl}#review-${rev.id}`,
    itemReviewed: { "@id": `${destUrl}#destination` },
    reviewRating: {
      "@type": "Rating",
      ratingValue: rev.rating,
      bestRating: 5,
      worstRating: 1,
    },
    reviewBody: rev.text,
    datePublished: rev.created_at,
    author: {
      "@type": "Person",
      name: rev.traveler_type
        ? `${rev.traveler_type.charAt(0).toUpperCase()}${rev.traveler_type.slice(1)} traveler`
        : "Anonymous traveler",
    },
    publisher: { "@id": "https://www.nakshiq.com#organization" },
  }));

  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      {videoLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(videoLd) }}
        />
      )}
      {reviewLdBlocks.map((rb) => (
        <script
          key={rb["@id"]}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(rb) }}
        />
      ))}
      <Nav />
      <StickyDestinationTabs />
      <main id="main-content" className="mx-auto max-w-4xl lg:max-w-6xl px-4 py-8 pb-24 md:pb-8">
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
        <DestinationDetail dest={dest} />

        {comparisons.length > 0 && (
          <section className="mt-12 border-t border-border/50 pt-8">
            <h2 className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground mb-3">
              Compare {dest.name} with
            </h2>
            <div className="grid gap-2 sm:grid-cols-2">
              {comparisons.map((c) => {
                const otherDest = comparisonDests.find((d: any) => d.id === c.other);
                const otherName = otherDest?.name ?? c.other.replace(/-/g, " ");
                return (
                  <Link
                    key={c.pair}
                    href={`/${locale}/vs/${c.pair}`}
                    className="group flex items-center justify-between rounded-lg border border-border bg-card px-4 py-2.5 hover:border-primary/40 transition-all"
                  >
                    <span className="text-sm">
                      <span className="font-semibold">{dest.name}</span>
                      <span className="text-muted-foreground mx-2">vs</span>
                      <span className="font-semibold capitalize">{otherName}</span>
                    </span>
                    <span className="text-xs text-muted-foreground group-hover:text-primary transition-colors">→</span>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        <PrevNextNav
          items={dest.allDestinations}
          currentId={id}
          basePath="destination"
          backLabel="All Destinations"
          backHref="explore"
        />
      </main>
      <BottomCTABar destId={id} destName={dest.name} />
      <NewsletterStickyTray />
    </div>
  );
}
