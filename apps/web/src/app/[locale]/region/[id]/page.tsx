import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { RegionDetail } from "@/components/region-detail";
import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";
import { CinemaStyles } from "@/components/landing-cinema/cinema-styles";
import { Title } from "@/components/landing-cinema/editorial";
import { CinematicRelatedRail } from "@/components/cinematic-related-rail";

export const revalidate = 86400;
export const dynamicParams = true;

// Next 16: a dynamic-segment route without generateStaticParams is treated as
// fully dynamic (Cache-Control: private/no-cache/no-store) regardless of the
// `revalidate` value. Return [] to opt into ISR-on-demand without pre-building.
export async function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; id: string }> }): Promise<Metadata> {
  const { locale, id } = await params;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return {};
  const supabase = createClient(url, key);
  const { data: region } = await supabase.from("regions").select("id, name").eq("id", id).single();
  if (!region) return {};
  return {
    title: `${region.name} — Travel Guide & Destinations`,
    description: `Explore destinations in ${region.name}. Monthly scores, kids ratings, safety data, and infrastructure reality for every place.`,
    alternates: {
      canonical: `https://www.nakshiq.com/${locale}/region/${id}`,
      languages: {
        en: `https://www.nakshiq.com/en/region/${id}`,
        hi: `https://www.nakshiq.com/hi/region/${id}`,
        "x-default": `https://www.nakshiq.com/en/region/${id}`,
      },
    },
  };
}

type DestRow = {
  id: string;
  name: string;
  tagline?: string | null;
  difficulty?: string | null;
  elevation_m?: number | null;
  subregion?: string | null;
  place_type?: string | null;
  crowd_level?: string | null;
  hiddenness?: number | null;
  remoteness?: number | null;
  infrastructure_score?: number | null;
  tags?: string[] | null;
  best_months?: number[] | null;
  biker_suitable?: boolean | null;
  compare_against?: string[] | null;
  kids_friendly?: { suitable?: boolean; rating?: number } | { suitable?: boolean; rating?: number }[] | null;
  destination_months?: { month: number; score: number }[] | null;
};

type RouteRow = {
  id: string;
  name: string;
  days?: number;
  difficulty?: string;
  kids_suitable?: boolean;
  bike_route?: boolean;
  stops?: string[];
};

async function getRegion(id: string) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;

  const supabase = createClient(url, key);

  const { data: region } = await supabase
    .from("regions")
    .select("*")
    .eq("id", id)
    .single();

  if (!region) return null;

  const { data: destinations } = await supabase
    .from("destinations")
    .select(`
      id, name, tagline, difficulty, elevation_m, subregion, place_type,
      crowd_level, hiddenness, remoteness, infrastructure_score, tags, best_months,
      biker_suitable, compare_against,
      kids_friendly(suitable, rating),
      destination_months(month, score)
    `)
    .eq("state_id", region.state_id)
    .order("name");

  const destIds = (destinations ?? []).map((d: DestRow) => d.id);
  const { data: gems } = await supabase
    .from("hidden_gems")
    .select("id, name, near_destination_id, distance_km, why_go, difficulty, confidence_score, tags")
    .in("near_destination_id", destIds);

  const { data: routes } = await supabase
    .from("routes")
    .select("id, name, days, difficulty, kids_suitable, bike_route, stops")
    .order("days");

  const regionRoutes = (routes ?? []).filter((r: RouteRow) =>
    r.stops?.some((s: string) => destIds.includes(s))
  );

  return {
    ...region,
    destinations: destinations ?? [],
    gems: gems ?? [],
    routes: regionRoutes,
  };
}

export default async function RegionPage({
  params,
}: {
  params: Promise<{ id: string; locale: string }>;
}) {
  const { id, locale } = await params;
  const region = await getRegion(id);
  if (!region) notFound();

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `https://www.nakshiq.com/${locale}` },
      { "@type": "ListItem", position: 2, name: "States", item: `https://www.nakshiq.com/${locale}/states` },
      { "@type": "ListItem", position: 3, name: region.name, item: `https://www.nakshiq.com/${locale}/region/${id}` },
    ],
  };

  return (
    <div className="nakshiq-cinema" style={{ minHeight: "100vh" }}>
      <CinemaStyles />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <Nav />

      <main
        id="main-content"
        className="nq-grain"
        style={{ position: "relative", padding: "140px 24px 64px" }}
      >
        <header style={{ maxWidth: 1100, margin: "0 auto 48px" }}>
          <p
            className="nq-kicker"
            style={{
              color: "var(--vermillion)",
              marginBottom: 20,
              letterSpacing: "0.22em",
            }}
          >
            REGION · {region.name?.toUpperCase()}
          </p>
          <Title
            as="h1"
            className="nq-display"
            style={{
              fontFamily: "var(--cinema-display)",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "clamp(36px, 6vw, 76px)",
              lineHeight: 1.0,
              letterSpacing: "-0.022em",
              margin: 0,
              textWrap: "balance",
            }}
          >
            {region.name}.
          </Title>
          {region.hero_tagline && (
            <p
              style={{
                fontFamily: "var(--cinema-display)",
                fontStyle: "italic",
                fontWeight: 400,
                fontSize: "clamp(18px, 2vw, 24px)",
                lineHeight: 1.4,
                color: "var(--bone-dim)",
                marginTop: 24,
                maxWidth: 720,
              }}
            >
              {region.hero_tagline}
            </p>
          )}
        </header>

        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <RegionDetail region={region} />
        </div>
      </main>

      <CinematicRelatedRail />
      <Footer />
    </div>
  );
}
