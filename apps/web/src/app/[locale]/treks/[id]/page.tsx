import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { TrekDetail } from "@/components/trek-detail";
import { PrevNextNav } from "@/components/prev-next-nav";
import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";
import { localeAlternates } from "@/lib/seo-utils";
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

export async function generateMetadata({ params }: { params: Promise<{ locale: string; id: string}> }): Promise<Metadata> {
  const { locale, id } = await params;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return {};
  const supabase = createClient(url, key);
  const { data } = await supabase.from("treks").select("name, difficulty, duration_days, max_altitude_m, distance_km").eq("id", id).single();
  if (!data) return {};
  return {
    title: `${data.name} — ${data.duration_days}-Day ${data.difficulty} Trek`,
    description: `${data.name}: ${data.duration_days} days, ${data.distance_km}km, max ${data.max_altitude_m}m. Day-by-day itinerary, campsites, gear list, costs, and safety info.`,
    ...localeAlternates(locale, `/treks/${id}`),
  };
}

async function getTrek(id: string) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;

  const supabase = createClient(url, key);
  const { data, error } = await supabase
    .from("treks")
    .select("*, destinations(name, state:states(name))")
    .eq("id", id)
    .single();

  if (error || !data) return null;

  const { data: allTreks } = await supabase
    .from("treks")
    .select("id, name")
    .order("name");

  return { ...data, allTreks: allTreks ?? [] };
}

export default async function TrekDetailPage({ params }: { params: Promise<{ id: string; locale: string }> }) {
  const { id, locale } = await params;
  const trek = await getTrek(id);
  if (!trek) notFound();

  const trekUrl = `https://www.nakshiq.com/${locale}/treks/${id}`;
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `https://www.nakshiq.com/${locale}` },
      { "@type": "ListItem", position: 2, name: "Treks", item: `https://www.nakshiq.com/${locale}/treks` },
      { "@type": "ListItem", position: 3, name: trek.name, item: trekUrl },
    ],
  };

  const difficultyLabel = trek.difficulty ? String(trek.difficulty).toUpperCase() : null;
  const kicker = [
    "TREKS",
    trek.duration_days ? `${trek.duration_days}-DAY` : null,
    difficultyLabel,
    trek.max_altitude_m ? `MAX ${trek.max_altitude_m}M` : null,
  ]
    .filter(Boolean)
    .join(" · ");

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
        <header style={{ maxWidth: 900, margin: "0 auto 48px" }}>
          <p
            className="nq-kicker"
            style={{
              color: "var(--vermillion)",
              marginBottom: 20,
              letterSpacing: "0.22em",
            }}
          >
            {kicker}
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
            {trek.name}.
          </Title>
        </header>

        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <TrekDetail trek={trek} />
          <PrevNextNav
            items={trek.allTreks}
            currentId={id}
            basePath="treks"
            backLabel="All Treks"
            backHref="treks"
          />
        </div>
      </main>

      <CinematicRelatedRail />
      <Footer />
    </div>
  );
}
