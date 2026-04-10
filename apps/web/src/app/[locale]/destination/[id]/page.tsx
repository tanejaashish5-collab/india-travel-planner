import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { DestinationDetail } from "@/components/destination-detail";
import { PrevNextNav } from "@/components/prev-next-nav";
import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";

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

  const title = `${name} — ${stateName || "India"} Travel Guide | NakshIQ`;
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
      title,
      description,
      type: "article",
      url: canonicalUrl,
      siteName: "NakshIQ",
      locale: locale === "hi" ? "hi_IN" : "en_IN",
      images: [{ url: imageUrl, width: 1200, height: 630, alt: `${name} — ${stateName || "India"}` }],
    },
    twitter: {
      card: "summary_large_image",
      title,
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

  // Related blog articles
  const { data: relatedArticles } = await supabase
    .from("articles")
    .select("slug, title, depth, reading_time, category")
    .contains("destinations", [id])
    .order("depth", { ascending: false })
    .limit(5);

  return {
    ...data,
    hidden_gems: gems ?? [],
    trap_alternatives: trapAlts ?? [],
    festivals: festivals ?? [],
    local_stays: localStays ?? [],
    traveler_notes: travelerNotes ?? [],
    coords: coordData ? { lat: coordData.lat, lng: coordData.lng } : null,
    allDestinations: allDests ?? [],
    relatedArticles: relatedArticles ?? [],
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

  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Nav />
      <main className="mx-auto max-w-4xl px-4 py-8">
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
