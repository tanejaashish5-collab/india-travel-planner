import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { StaysContent } from "@/components/stays-content";
import { createClient } from "@supabase/supabase-js";
import { localeAlternates } from "@/lib/seo-utils";
import { CinemaStyles } from "@/components/landing-cinema/cinema-styles";
import { Title } from "@/components/landing-cinema/editorial";
import { CinematicRelatedRail } from "@/components/cinematic-related-rail";

export const revalidate = 3600;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "Stay Intelligence — Where to Stay, Not Where to Book",
    description: "Decision-grade accommodation guidance for every destination. Best zones by traveler type, budget bands, stay types, and honest avoid-this warnings. Not a booking site.",
    ...localeAlternates(locale, "/stays"),
  };
}

async function getStayData() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return [];

  const supabase = createClient(url, key);
  const { data } = await supabase
    .from("destinations")
    .select("id, name, stay_zones, food_scene, workability, vehicle_fit, family_stress, difficulty, elevation_m, state:states(name)")
    .not("stay_zones", "eq", "{}")
    .not("vehicle_fit", "is", null)
    .order("name");

  return data ?? [];
}

export default async function StaysPage() {
  const destinations = await getStayData();

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.nakshiq.com" },
      { "@type": "ListItem", position: 2, name: "Stays", item: "https://www.nakshiq.com/en/stays" },
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
        <header style={{ maxWidth: 1100, margin: "0 auto 56px" }}>
          <p
            className="nq-kicker"
            style={{
              color: "var(--vermillion)",
              marginBottom: 24,
              letterSpacing: "0.22em",
            }}
          >
            WHERE TO STAY · {String(destinations.length).padStart(3, "0")} DESTINATIONS
          </p>
          <Title
            as="h1"
            className="nq-display"
            style={{
              fontFamily: "var(--cinema-display)",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "clamp(40px, 7vw, 88px)",
              lineHeight: 0.98,
              letterSpacing: "-0.025em",
              margin: 0,
              textWrap: "balance",
            }}
          >
            Local stays.
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
            Decision-grade accommodation intelligence. Best zones by traveler
            type, budget bands, stay types, and honest avoid-this warnings.
            This is not a booking site.
          </p>
          <p
            className="nq-mono"
            style={{
              fontFamily: "var(--cinema-mono)",
              fontSize: 11,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "var(--bone-faint)",
              marginTop: 28,
            }}
          >
            Filter by state, traveler type, budget, vehicle fit
          </p>
        </header>

        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <StaysContent destinations={destinations} />
        </div>
      </main>

      <CinematicRelatedRail />
      <Footer />
    </div>
  );
}
