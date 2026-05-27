import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { ExploreGrid } from "@/components/explore-grid";
import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";
import { DIFFICULTY_MAP } from "@/lib/seo-maps";
import { localeAlternates } from "@/lib/seo-utils";
import { currentMonthIST } from "@itp/shared";
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

const DIFF_DESC: Record<string, string> = {
  easy: "Paved roads, good infrastructure, suitable for all ages and fitness levels.",
  moderate: "Some rough roads, moderate altitude, basic fitness required.",
  hard: "High altitude, rough terrain, limited infrastructure. Experience recommended.",
  extreme: "Remote, dangerous roads, extreme altitude. Only for experienced travelers.",
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string; level: string}> }): Promise<Metadata> {
  const { locale, level } = await params;
  const name = DIFFICULTY_MAP[level];
  if (!name) return {
  };
  return {
    title: `${name} Destinations in India — Scored & Ranked`,
    description: `All ${name.toLowerCase()} destinations in India. ${DIFF_DESC[level]} Scored for every month with kids ratings and safety data.`,
    ...localeAlternates(locale, `/explore/difficulty/${level}`),
  };
}

export default async function ExploreByDifficultyPage({ params }: { params: Promise<{ locale: string; level: string }> }) {
  const { locale, level } = await params;
  const name = DIFFICULTY_MAP[level];
  if (!name) notFound();

  const supabase = getSupabase();
  if (!supabase) notFound();

  const currentMonth = currentMonthIST();

  const { data } = await supabase
    .from("destinations")
    .select("id, name, tagline, difficulty, elevation_m, tags, best_months, translations, state_id, state:states(name), kids_friendly(suitable, rating), destination_months(month, score, note)")
    .eq("difficulty", level)
    .order("name");

  const sorted = (data ?? []).sort((a: any, b: any) => {
    const aScore = a.destination_months?.find((dm: any) => dm.month === currentMonth)?.score ?? 0;
    const bScore = b.destination_months?.find((dm: any) => dm.month === currentMonth)?.score ?? 0;
    return bScore - aScore;
  });

  const states = [...new Set((data ?? []).map((d: any) => {
    const s = Array.isArray(d.state) ? d.state[0] : d.state;
    return s ? JSON.stringify({ id: d.state_id, name: s.name }) : null;
  }).filter(Boolean))].map(s => JSON.parse(s!));

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
            EXPLORE · DIFFICULTY · {name.toUpperCase()} · {String(sorted.length).padStart(3, "0")}
          </p>
          <h1
            className="nq-display"
            style={{
              fontFamily: "var(--cinema-display)",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "clamp(40px, 7vw, 88px)",
              lineHeight: 0.98,
              letterSpacing: "-0.025em",
              margin: 0,
              color: "var(--bone)",
            }}
          >
            {name} destinations.
          </h1>
          <p
            style={{
              fontFamily: "var(--cinema-display)",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "clamp(18px, 2vw, 24px)",
              lineHeight: 1.4,
              color: "var(--bone-dim)",
              margin: "24px 0 0",
              maxWidth: 720,
            }}
          >
            {sorted.length} destinations — {DIFF_DESC[level]}
          </p>
          <div style={{ marginTop: 20 }}>
            <Link
              href={`/${locale}/explore`}
              className="nq-mono"
              style={{
                fontSize: 11,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--vermillion)",
                textDecoration: "none",
              }}
            >
              ← All destinations
            </Link>
          </div>
        </header>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Suspense fallback={<div style={{ minHeight: 400, background: "rgba(245, 241, 232, 0.03)" }} />}>
            <ExploreGrid destinations={sorted} states={states} />
          </Suspense>
        </div>
      </main>
      <CinematicRelatedRail />
      <Footer />
    </div>
  );
}
