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

export const revalidate = 3600; // Revalidate every hour
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

// Only pre-render the 3 Sprint-2 pilot destinations at build time — these
// are demo-critical. Everything else lazy-generates via ISR on first hit,
// then caches for `revalidate` seconds.
const PRE_RENDER_IDS = ["bomdila", "gurez-valley", "kaza"];

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
    nearbyDests, emergencySos, pois, editorStayPicks, scenarios,
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
  };
}

export default async function DestinationPage({
  params,
}: {
  params: Promise<{ id: string; locale: string }>;
}) {
  const { id, locale } = await params;
  const dest = await getDestination(id);
  if (!dest) notFound();

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

  // Schema.org JSON-LD for TouristDestination
  const stateInfo = dest.state as any;
  const stateName = Array.isArray(stateInfo) ? stateInfo[0]?.name : stateInfo?.name;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    name: dest.name,
    description: dest.tagline || `Travel guide for ${dest.name}`,
    url: `https://www.nakshiq.com/en/destination/${id}`,
    image: destinationImage(id),
    ...(dest.elevation_m && { elevation: { "@type": "QuantitativeValue", value: dest.elevation_m, unitCode: "MTR" } }),
    ...(dest.coords && {
      geo: { "@type": "GeoCoordinates", latitude: dest.coords.lat, longitude: dest.coords.lng },
    }),
    containedInPlace: {
      "@type": "AdministrativeArea",
      name: stateName || "India",
    },
    touristType: dest.difficulty === "easy" ? "Family" : dest.difficulty === "extreme" ? "Adventure" : "General",
  };

  // BreadcrumbList schema
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.nakshiq.com/en" },
      { "@type": "ListItem", position: 2, name: "Destinations", item: "https://www.nakshiq.com/en/explore" },
      { "@type": "ListItem", position: 3, name: stateName || "India", item: `https://www.nakshiq.com/en/region/${dest.state_id || "india"}` },
      { "@type": "ListItem", position: 4, name: dest.name, item: `https://www.nakshiq.com/en/destination/${id}` },
    ],
  };

  // FAQPage schema — generated from destination data
  const kf = Array.isArray(dest.kids_friendly) ? dest.kids_friendly[0] : dest.kids_friendly;
  const cc = Array.isArray(dest.confidence_cards) ? dest.confidence_cards[0] : dest.confidence_cards;
  const bestMonthNames = (dest.best_months || []).map((m: number) => ["","January","February","March","April","May","June","July","August","September","October","November","December"][m]).filter(Boolean).join(", ");

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `What is the best time to visit ${dest.name}?`,
        acceptedAnswer: { "@type": "Answer", text: bestMonthNames ? `The best months to visit ${dest.name} are ${bestMonthNames}. See our full month-by-month scoring at nakshiq.com.` : `Visit nakshiq.com for month-by-month scoring of ${dest.name}.` },
      },
      ...(kf ? [{
        "@type": "Question",
        name: `Is ${dest.name} safe for families with kids?`,
        acceptedAnswer: { "@type": "Answer", text: kf.suitable ? `Yes, ${dest.name} is rated ${kf.rating}/5 for families. ${(kf.reasons || []).slice(0, 2).join(". ")}.` : `${dest.name} is not recommended for families with young children. ${(kf.reasons || []).slice(0, 2).join(". ")}.` },
      }] : []),
      ...(cc?.reach ? [{
        "@type": "Question",
        name: `How do I reach ${dest.name}?`,
        acceptedAnswer: { "@type": "Answer", text: typeof cc.reach === "object" ? (cc.reach.from_nearest_city || cc.reach.public_transport || `See the ${dest.name} travel guide on NakshIQ for detailed route information.`) : String(cc.reach) },
      }] : []),
      ...(dest.elevation_m ? [{
        "@type": "Question",
        name: `What altitude is ${dest.name}?`,
        acceptedAnswer: { "@type": "Answer", text: `${dest.name} sits at ${dest.elevation_m.toLocaleString()}m above sea level. ${dest.difficulty === "extreme" ? "Altitude sickness is a real risk — acclimatize properly." : dest.elevation_m > 3000 ? "Some altitude awareness needed." : "Altitude is not a concern for most visitors."}` },
      }] : []),
    ].filter(Boolean),
  };

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
      <Nav />
      <StickyDestinationTabs />
      <main id="main-content" className="mx-auto max-w-4xl lg:max-w-6xl px-4 py-8 pb-24 md:pb-8">
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
