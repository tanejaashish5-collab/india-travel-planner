import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { RoadConditionsContent } from "@/components/road-conditions-content";
import { createClient } from "@supabase/supabase-js";
import { localeAlternates } from "@/lib/seo-utils";
import { CinemaStyles } from "@/components/landing-cinema/cinema-styles";
import { Title } from "@/components/landing-cinema/editorial";
import { CinematicRelatedRail } from "@/components/cinematic-related-rail";

export const revalidate = 86400;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "Road Conditions — Live Highway Status",
    description: "Current road conditions for major India highway segments. Manali-Leh, Srinagar-Leh, Char Dham roads, Spiti circuit, and more. Updated regularly.",
    ...localeAlternates(locale, "/road-conditions"),
  };
}

async function getRoadReports() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return [];

  const supabase = createClient(url, key);
  const { data } = await supabase
    .from("road_reports")
    .select("*, destinations(name)")
    .order("segment");

  return data ?? [];
}

export default async function RoadConditionsPage() {
  const reports = await getRoadReports();

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.nakshiq.com" },
      { "@type": "ListItem", position: 2, name: "Road conditions", item: "https://www.nakshiq.com/en/road-conditions" },
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
            LIVE UPDATES · {String(reports.length).padStart(3, "0")} SEGMENTS
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
            Road conditions.
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
            {reports.length} highway segments — Manali-Leh, Srinagar-Leh, Char
            Dham, Spiti circuit, and more. Check before you drive.
          </p>
        </header>

        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <RoadConditionsContent reports={reports} />
        </div>
      </main>

      <CinematicRelatedRail />
      <Footer />
    </div>
  );
}
