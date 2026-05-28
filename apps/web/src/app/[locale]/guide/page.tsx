import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { createClient } from "@supabase/supabase-js";
import { GuideContent } from "@/components/guide-content";
import { CinemaStyles } from "@/components/landing-cinema/cinema-styles";
import { Title } from "@/components/landing-cinema/editorial";
import { CinematicRelatedRail } from "@/components/cinematic-related-rail";
import { localeAlternates } from "@/lib/seo-utils";
import { currentMonthIST, currentMonthLongIST } from "@itp/shared";

// 1-hour ISR window so the month rollover flips within ~1h after IST
// midnight instead of up to ~24h. Combined with IST-aware currentMonth
// below, May 1 visitors see May content within the first hour.
export const revalidate = 21600;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "Travel Guides — Data-Driven Destination Intelligence",
    description: "In-depth travel guides for 340+ India destinations. Best time to visit, costs, family suitability, infrastructure reality, and honest opinions.",
    ...localeAlternates(locale, "/guide"),
  };
}

async function getGuideData() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return { destinations: [], comparisons: [], monthScores: [], currentMonth: currentMonthIST() };

  const supabase = createClient(url, key);
  const currentMonth = currentMonthIST();

  const [{ data: dests }, { data: pairs }, { data: monthScores }] = await Promise.all([
    supabase
      .from("destinations")
      .select("id, name, difficulty, elevation_m, best_months, state:states(name), kids_friendly(suitable, rating, min_recommended_age, reasons)")
      .order("name"),
    supabase
      .from("tourist_trap_alternatives")
      .select("trap_destination_id, alternative_destination_id, destinations!tourist_trap_alternatives_trap_destination_id_fkey(name), destination:destinations!tourist_trap_alternatives_alternative_destination_id_fkey(name)")
      .limit(20),
    supabase
      .from("destination_months")
      .select("destination_id, score, note")
      .eq("month", currentMonth),
  ]);

  return {
    destinations: dests ?? [],
    comparisons: pairs ?? [],
    monthScores: monthScores ?? [],
    currentMonth,
  };
}

export default async function GuidesPage() {
  const { destinations, comparisons, monthScores, currentMonth } = await getGuideData();
  const monthLabel = currentMonthLongIST();

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.nakshiq.com" },
      { "@type": "ListItem", position: 2, name: "Guides", item: "https://www.nakshiq.com/en/guide" },
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
            FIELD GUIDES · {String(destinations.length).padStart(3, "0")} DESTINATIONS
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
            Travel guides.
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
            Data-driven guides for {destinations.length} India destinations.
            Best time to visit, costs, family suitability, infrastructure
            reality, and honest opinions.
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
            Filter by month, region, difficulty · Current month {monthLabel}
          </p>
        </header>

        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <GuideContent
            destinations={destinations}
            comparisons={comparisons}
            monthScores={monthScores}
            currentMonth={currentMonth}
          />
        </div>
      </main>

      <CinematicRelatedRail />
      <Footer />
    </div>
  );
}
