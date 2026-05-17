import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { RouteBuilder } from "@/components/route-builder";
import { createClient } from "@supabase/supabase-js";
import { localeAlternates } from "@/lib/seo-utils";
import { CinemaStyles } from "@/components/landing-cinema/cinema-styles";
import { Title } from "@/components/landing-cinema/editorial";
import { CinematicRelatedRail } from "@/components/cinematic-related-rail";

export const revalidate = 3600;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "Build Your Route — Custom Trip Builder",
    description: "Pick destinations, we'll sequence them by drive time and season fit. Build your perfect North India road trip.",
    ...localeAlternates(locale, "/build-route"),
  };
}

async function getDestinations() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return [];

  const supabase = createClient(url, key);
  const { data } = await supabase
    .from("destinations")
    .select("id, name, state_id, difficulty, elevation_m, state:states(name), destination_months(month, score)")
    .order("name");

  return data ?? [];
}

export default async function BuildRoutePage() {
  const destinations = await getDestinations();

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.nakshiq.com" },
      { "@type": "ListItem", position: 2, name: "Build route", item: "https://www.nakshiq.com/en/build-route" },
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
            PLANNING TOOLS · ROUTE BUILDER
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
            Build your route.
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
            Pick destinations and we&apos;ll sequence them by drive time and
            season fit. Built for India road trips.
          </p>
        </header>

        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <RouteBuilder destinations={destinations} />
        </div>
      </main>

      <CinematicRelatedRail />
      <Footer />
    </div>
  );
}
