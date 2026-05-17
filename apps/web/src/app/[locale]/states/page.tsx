import type { Metadata } from "next";
import { Suspense } from "react";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { StatesExplorer } from "@/components/states-explorer";
import { createClient } from "@supabase/supabase-js";
import { localeAlternates } from "@/lib/seo-utils";
import { currentMonthIST } from "@itp/shared";
import { CinemaStyles } from "@/components/landing-cinema/cinema-styles";
import { Title } from "@/components/landing-cinema/editorial";
import { CinematicRelatedRail } from "@/components/cinematic-related-rail";

export const revalidate = 3600;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "Browse India by State — Every Destination Scored",
    description: "Explore India state by state. 340+ destinations across 27 states, each scored for every month. Find the best places to visit in any Indian state.",
    ...localeAlternates(locale, "/states"),
  };
}

type StateRowFromDb = {
  id: string;
  name: string;
  region: string;
  description: string | null;
  capital: string | null;
  display_order: number;
};

type DestSummary = {
  id: string;
  state_id: string;
  destination_months?: { month: number; score: number | null }[] | null;
};

type RegionSummary = {
  id: string;
  name: string;
  state_id: string;
  hero_tagline: string | null;
  tags: string[] | null;
  best_months: number[] | null;
  subregions: Array<{ id: string; name: string; description: string }> | null;
};

async function getData() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return { states: [] };

  const supabase = createClient(url, key);

  const [statesResult, regionsResult, destResult] = await Promise.all([
    supabase.from("states").select("id, name, region, description, capital, display_order").order("display_order"),
    supabase.from("regions").select("id, name, state_id, hero_tagline, tags, best_months, subregions").order("id"),
    supabase.from("destinations").select("id, state_id, destination_months(month, score)"),
  ]);

  const currentMonth = currentMonthIST();

  const countMap: Record<string, number> = {};
  const allDestsByState: Record<string, string[]> = {};
  const scoreSum: Record<string, { total: number; count: number }> = {};

  (destResult.data ?? []).forEach((d: DestSummary) => {
    countMap[d.state_id] = (countMap[d.state_id] || 0) + 1;
    (allDestsByState[d.state_id] ??= []).push(d.id);

    const monthData = d.destination_months?.find((m) => m.month === currentMonth);
    if (monthData?.score) {
      if (!scoreSum[d.state_id]) scoreSum[d.state_id] = { total: 0, count: 0 };
      scoreSum[d.state_id].total += monthData.score;
      scoreSum[d.state_id].count++;
    }
  });

  const firstDestMap: Record<string, string> = {};
  for (const [stateId, dests] of Object.entries(allDestsByState)) {
    const sorted = [...dests].sort();
    const tokens = stateId.split("-");
    firstDestMap[stateId] = sorted.find((d) => tokens.includes(d)) ?? sorted[0];
  }

  const regionMap: Record<string, RegionSummary> = {};
  (regionsResult.data ?? []).forEach((r: RegionSummary) => {
    regionMap[r.state_id] = r;
  });

  const states = (statesResult.data ?? []).map((s: StateRowFromDb) => ({
    ...s,
    destCount: countMap[s.id] ?? 0,
    heroDestId: firstDestMap[s.id] ?? s.id,
    avgScore: scoreSum[s.id] ? Math.round((scoreSum[s.id].total / scoreSum[s.id].count) * 10) / 10 : null,
    regionDetail: regionMap[s.id] ?? null,
  }));

  return { states };
}

export default async function StatesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const { states } = await getData();
  const totalDests = states.reduce((sum: number, s: { destCount: number }) => sum + s.destCount, 0);

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `https://www.nakshiq.com/${locale}` },
      { "@type": "ListItem", position: 2, name: "India by state", item: `https://www.nakshiq.com/${locale}/states` },
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
              marginBottom: 24,
              letterSpacing: "0.22em",
            }}
          >
            INDIA BY STATE · {String(states.length).padStart(2, "0")} STATES · {String(totalDests).padStart(3, "0")} DESTINATIONS
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
            Browse India.
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
            {totalDests} destinations across {states.length} states — each
            scored for every month.
          </p>
        </header>

        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Suspense fallback={<div style={{ minHeight: 400 }} />}>
            <StatesExplorer states={states} locale={locale} />
          </Suspense>
        </div>
      </main>

      <CinematicRelatedRail />
      <Footer />
    </div>
  );
}
