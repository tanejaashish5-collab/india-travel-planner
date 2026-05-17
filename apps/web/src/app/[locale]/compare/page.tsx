import type { Metadata } from "next";
import { Suspense } from "react";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { CompareView } from "@/components/compare-view";
import { createClient } from "@supabase/supabase-js";
import { localeAlternates } from "@/lib/seo-utils";
import { CinemaStyles } from "@/components/landing-cinema/cinema-styles";
import { Title } from "@/components/landing-cinema/editorial";
import { CinematicRelatedRail } from "@/components/cinematic-related-rail";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "Compare Destinations — Side by Side",
    description: "Compare up to 3 destinations on monthly score, kids rating, safety, network, medical access, budget, difficulty, and more.",
    ...localeAlternates(locale, "/compare"),
  };
}

async function getDestinations() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return [];

  const supabase = createClient(url, key);
  const { data } = await supabase
    .from("destinations")
    .select(`
      id, name, tagline, difficulty, elevation_m, budget_tier, best_months, vehicle_fit, family_stress, daily_cost, solo_female_score,
      state:states(name),
      kids_friendly(suitable, rating),
      destination_months(month, score),
      confidence_cards(safety_rating, network)
    `)
    .order("name");

  return data ?? [];
}

export default async function ComparePage() {
  const destinations = await getDestinations();

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.nakshiq.com" },
      { "@type": "ListItem", position: 2, name: "Compare", item: "https://www.nakshiq.com/en/compare" },
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
            PLANNING TOOLS · COMPARE
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
            Compare destinations.
          </Title>
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
            Pick up to three destinations and see them side by side — monthly
            score, kids rating, safety, network, medical access, budget,
            difficulty.
          </p>
        </header>

        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Suspense fallback={<div style={{ minHeight: 400 }} />}>
            <CompareView destinations={destinations} />
          </Suspense>
        </div>
      </main>

      <CinematicRelatedRail />
      <Footer />
    </div>
  );
}
