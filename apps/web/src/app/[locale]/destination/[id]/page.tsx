import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { DestinationDetail } from "@/components/destination-detail";
import { PrevNextNav } from "@/components/prev-next-nav";
import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";

export const revalidate = 86400;

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

  const title = `${name} — ${stateName || "India"} Travel Guide`;
  const description = `${tagline} | ${data.difficulty} difficulty${data.elevation_m ? ` · ${data.elevation_m}m` : ""}. Monthly scores, kids ratings, safety data & infrastructure reality for ${name}.`;
  const canonicalUrl = `https://nakshiq.com/${locale}/destination/${id}`;
  const imageUrl = `https://nakshiq.com/images/destinations/${id}.jpg`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: `https://nakshiq.com/en/destination/${id}`,
        hi: `https://nakshiq.com/hi/destination/${id}`,
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

  const { data: gems } = await supabase
    .from("hidden_gems")
    .select("*")
    .eq("near_destination_id", id);

  const { data: trapAlts } = await supabase
    .from("tourist_trap_alternatives")
    .select(`
      *,
      destination:destinations!tourist_trap_alternatives_alternative_destination_id_fkey(
        name, tagline, difficulty, elevation_m
      )
    `)
    .eq("trap_destination_id", id)
    .order("rank");

  const { data: festivals } = await supabase
    .from("festivals")
    .select("*")
    .eq("destination_id", id)
    .order("month");

  const { data: localStays } = await supabase
    .from("local_stays")
    .select("*")
    .eq("destination_id", id)
    .order("type");

  // Get coordinates for distance badge
  const { data: coordData } = await supabase
    .from("destinations_with_coords")
    .select("lat, lng")
    .eq("id", id)
    .single();

  // Get traveler notes
  const { data: travelerNotes } = await supabase
    .from("traveler_notes")
    .select("*")
    .eq("destination_id", id)
    .order("created_at", { ascending: false });

  // All destinations for prev/next nav
  const { data: allDests } = await supabase
    .from("destinations")
    .select("id, name")
    .order("name");

  // User reviews (approved only)
  const { data: reviews } = await supabase
    .from("reviews")
    .select("id, rating, text, traveler_type, visit_month, visit_year, created_at")
    .eq("destination_id", id)
    .eq("status", "approved")
    .order("created_at", { ascending: false })
    .limit(20);

  // Related blog articles
  const { data: relatedArticles } = await supabase
    .from("articles")
    .select("slug, title, depth, reading_time, category")
    .contains("destinations", [id])
    .order("depth", { ascending: false })
    .limit(5);

  // Related collections containing this destination (JSONB array containment)
  const { data: relatedCollections } = await supabase
    .from("collections")
    .select("id, name, description")
    .filter("items", "cs", JSON.stringify([{ destination_id: id }]))
    .limit(5);

  // Routes that include this destination as a stop
  const { data: relatedRoutes } = await supabase
    .from("routes")
    .select("id, name, days, difficulty")
    .contains("stops", [id])
    .limit(5);

  // Nearby destinations in same state (for internal linking)
  const { data: nearbyDests } = await supabase
    .from("destinations")
    .select("id, name, difficulty, elevation_m")
    .eq("state_id", data.state_id)
    .neq("id", id)
    .limit(8);

  // Emergency SOS data
  const { data: emergencySos } = await supabase
    .from("emergency_sos")
    .select("*")
    .eq("destination_id", id)
    .single();

  // Points of interest
  const { data: pois } = await supabase
    .from("points_of_interest")
    .select("id, name, type, description, time_needed, entry_fee, kids_suitable, tags")
    .eq("destination_id", id)
    .order("type");

  return {
    ...data,
    hidden_gems: gems ?? [],
    trap_alternatives: trapAlts ?? [],
    festivals: festivals ?? [],
    local_stays: localStays ?? [],
    traveler_notes: travelerNotes ?? [],
    reviews: reviews ?? [],
    coords: coordData ? { lat: coordData.lat, lng: coordData.lng } : null,
    allDestinations: allDests ?? [],
    relatedArticles: relatedArticles ?? [],
    relatedCollections: relatedCollections ?? [],
    relatedRoutes: relatedRoutes ?? [],
    nearbyDestinations: nearbyDests ?? [],
    emergencySos: emergencySos ?? null,
    points_of_interest: pois ?? [],
  };
}

export default async function DestinationPage({
  params,
}: {
  params: Promise<{ id: string; locale: string }>;
}) {
  const { id } = await params;
  const dest = await getDestination(id);
  if (!dest) notFound();

  // Schema.org JSON-LD for TouristDestination
  const stateInfo = dest.state as any;
  const stateName = Array.isArray(stateInfo) ? stateInfo[0]?.name : stateInfo?.name;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    name: dest.name,
    description: dest.tagline || `Travel guide for ${dest.name}`,
    url: `https://nakshiq.com/en/destination/${id}`,
    image: `https://nakshiq.com/images/destinations/${id}.jpg`,
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
      { "@type": "ListItem", position: 1, name: "Home", item: "https://nakshiq.com/en" },
      { "@type": "ListItem", position: 2, name: "Destinations", item: "https://nakshiq.com/en/explore" },
      { "@type": "ListItem", position: 3, name: stateName || "India", item: `https://nakshiq.com/en/region/${dest.state_id || "india"}` },
      { "@type": "ListItem", position: 4, name: dest.name, item: `https://nakshiq.com/en/destination/${id}` },
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
      <main id="main-content" className="mx-auto max-w-4xl px-4 py-8">
        <DestinationDetail dest={dest} />
        <PrevNextNav
          items={dest.allDestinations}
          currentId={id}
          basePath="destination"
          backLabel="All Destinations"
          backHref="explore"
        />
      </main>
    </div>
  );
}
