import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { TreksContent } from "@/components/treks-content";
import { createClient } from "@supabase/supabase-js";
import { localeAlternates } from "@/lib/seo-utils";
import { CinemaStyles } from "@/components/landing-cinema/cinema-styles";
import { Title } from "@/components/landing-cinema/editorial";
import { CinematicRelatedRail } from "@/components/cinematic-related-rail";

export const revalidate = 3600;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "Treks — Scored Trails Across India",
    description: "From easy day hikes to extreme multi-day expeditions. Gear checklists, difficulty ratings, altitude data, best months, and fitness requirements for every trek.",
    ...localeAlternates(locale, "/treks"),
  };
}

async function getTrekData() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return { treks: [], trekDests: [], gearChecklists: [] };

  const supabase = createClient(url, key);

  const [treksResult, destsResult, gearResult] = await Promise.all([
    supabase.from("treks").select("*, destinations(name, state:states(name))").order("difficulty"),
    supabase
      .from("destinations")
      .select("id, name, tagline, difficulty, elevation_m, tags, state:states(name)")
      .contains("tags", ["trek"])
      .order("name"),
    supabase.from("gear_checklists").select("*").order("name"),
  ]);

  return {
    treks: treksResult.data ?? [],
    trekDests: destsResult.data ?? [],
    gearChecklists: gearResult.data ?? [],
  };
}

export default async function TreksPage() {
  const { treks, trekDests, gearChecklists } = await getTrekData();

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.nakshiq.com" },
      { "@type": "ListItem", position: 2, name: "Treks", item: "https://www.nakshiq.com/en/treks" },
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
            HIMALAYAN TRAILS · {String(treks.length).padStart(3, "0")} TREKS
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
            Treks &amp; hikes.
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
            {treks.length} treks scored across India — from easy day hikes to
            extreme multi-day expeditions. Gear checklists, altitude data,
            best months, and fitness requirements for every trail.
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
            Filter by difficulty, altitude, state, season
          </p>
        </header>

        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <TreksContent treks={treks} trekDests={trekDests} gearChecklists={gearChecklists} />
        </div>
      </main>

      <CinematicRelatedRail />
      <Footer />
    </div>
  );
}
