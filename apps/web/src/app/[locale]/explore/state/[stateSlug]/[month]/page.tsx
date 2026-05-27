import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { ExploreGrid } from "@/components/explore-grid";
import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";
import { STATE_MAP, MONTH_MAP } from "@/lib/seo-maps";
import { localeAlternates } from "@/lib/seo-utils";
import { CinemaStyles } from "@/components/landing-cinema/cinema-styles";
import { CinematicRelatedRail } from "@/components/cinematic-related-rail";

export const revalidate = 86400;
export const dynamicParams = true;

// Next 16: a dynamic-segment route without generateStaticParams is treated as
// fully dynamic (Cache-Control: private/no-cache/no-store) regardless of the
// `revalidate` value. Return [] to opt into ISR-on-demand without pre-building.
export async function generateStaticParams() {
  return [];
}

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; stateSlug: string; month: string}> }): Promise<Metadata> {
  const { locale, stateSlug, month } = await params;
  const stateName = STATE_MAP[stateSlug];
  const m = MONTH_MAP[month];
  if (!stateName || !m) return {
  };
  return {
    title: `Places to Visit in ${stateName} in ${m.name} — Scored & Ranked`,
    description: `Best destinations in ${stateName} for ${m.name}, scored 1-5 based on weather, crowds, and accessibility. See which score 5/5 and which to avoid.`,
    ...localeAlternates(locale, `/explore/state/${stateSlug}/${month}`),
  };
}

export default async function ExploreStateMonthPage({ params }: { params: Promise<{ locale: string; stateSlug: string; month: string }> }) {
  const { locale, stateSlug, month } = await params;
  const stateName = STATE_MAP[stateSlug];
  const m = MONTH_MAP[month];
  if (!stateName || !m) notFound();

  const supabase = getSupabase();
  if (!supabase) notFound();

  const { data: destinations } = await supabase
    .from("destinations")
    .select("id, name, tagline, difficulty, elevation_m, tags, best_months, translations, state_id, state:states(name), kids_friendly(suitable, rating), destination_months(month, score, note)")
    .eq("state_id", stateSlug)
    .order("name");

  const sorted = (destinations ?? []).sort((a: any, b: any) => {
    const aScore = a.destination_months?.find((dm: any) => dm.month === m.num)?.score ?? 0;
    const bScore = b.destination_months?.find((dm: any) => dm.month === m.num)?.score ?? 0;
    return bScore - aScore;
  });

  const score5 = sorted.filter((d: any) => d.destination_months?.find((dm: any) => dm.month === m.num)?.score === 5).length;

  return (
    <div className="nakshiq-cinema" style={{ minHeight: "100vh" }}>
      <CinemaStyles />
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
            EXPLORE · {stateName.toUpperCase()} · {m.name.toUpperCase()} · {String(sorted.length).padStart(3, "0")} · {score5} PEAK
          </p>
          <h1
            className="nq-display"
            style={{
              fontFamily: "var(--cinema-display)",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "clamp(36px, 6vw, 80px)",
              lineHeight: 0.98,
              letterSpacing: "-0.025em",
              margin: 0,
              color: "var(--bone)",
              textWrap: "balance",
            }}
          >
            Places to visit in {stateName} in {m.name}.
          </h1>
          <p
            style={{
              fontFamily: "var(--cinema-display)",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "clamp(17px, 1.8vw, 22px)",
              lineHeight: 1.4,
              color: "var(--bone-dim)",
              margin: "24px 0 0",
              maxWidth: 720,
            }}
          >
            {sorted.length} destinations — {score5} score 5/5 this month. Sorted by {m.name}{" "}
            suitability.
          </p>
          <div style={{ marginTop: 20 }}>
            <Link
              href={`/${locale}/explore/state/${stateSlug}`}
              className="nq-mono"
              style={{
                fontSize: 11,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--vermillion)",
                textDecoration: "none",
              }}
            >
              ← {stateName} (all months)
            </Link>
          </div>
        </header>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Suspense fallback={<div style={{ minHeight: 400, background: "rgba(245, 241, 232, 0.03)" }} />}>
            <ExploreGrid destinations={sorted} states={[{ id: stateSlug, name: stateName }]} />
          </Suspense>
        </div>
      </main>
      <CinematicRelatedRail />
      <Footer />
    </div>
  );
}
