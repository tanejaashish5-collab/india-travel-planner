import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { CampingContent } from "@/components/camping-content";
import { createClient } from "@supabase/supabase-js";
import { localeAlternates } from "@/lib/seo-utils";
import { CinemaStyles } from "@/components/landing-cinema/cinema-styles";
import { Title } from "@/components/landing-cinema/editorial";
import { CinematicRelatedRail } from "@/components/cinematic-related-rail";

export const revalidate = 21600;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "Camping Spots — Best Campsites Across India",
    description: "Scored camping spots from riverside sites in Rishikesh to high-altitude camps near Pangong. Facilities, elevation, best months, and permit requirements.",
    ...localeAlternates(locale, "/camping"),
  };
}

async function getCampingData() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return [];

  const supabase = createClient(url, key);
  const { data } = await supabase
    .from("camping_spots")
    .select("*, destinations(name, state_id)")
    .order("name");

  return data ?? [];
}

export default async function CampingPage() {
  const spots = await getCampingData();

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.nakshiq.com" },
      { "@type": "ListItem", position: 2, name: "Camping", item: "https://www.nakshiq.com/en/camping" },
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
            WILD &amp; FREE · {String(spots.length).padStart(3, "0")} SITES
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
            Camping spots.
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
            {spots.length} campsites scored and mapped — from riverside spots
            in Rishikesh to high-altitude camps near Pangong. Facilities,
            elevation, best months, and permit requirements.
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
            Filter by altitude, facilities, season, kids-friendly
          </p>
        </header>

        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <CampingContent spots={spots} />
        </div>
      </main>

      <CinematicRelatedRail />
      <Footer />
    </div>
  );
}
