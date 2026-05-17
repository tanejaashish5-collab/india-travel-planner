import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { ExploreGrid } from "@/components/explore-grid";
import { notFound } from "next/navigation";
import { STATE_MAP, getSupabase } from "@/lib/seo-maps";
import { localeAlternates } from "@/lib/seo-utils";
import { currentMonthIST, currentMonthLongIST } from "@itp/shared";
import { CinemaStyles } from "@/components/landing-cinema/cinema-styles";
import { CinematicRelatedRail } from "@/components/cinematic-related-rail";

export const revalidate = 86400;
export const dynamicParams = true;

export async function generateMetadata({ params }: { params: Promise<{ locale: string; stateSlug: string}> }): Promise<Metadata> {
  const { locale, stateSlug } = await params;
  const stateName = STATE_MAP[stateSlug];
  if (!stateName) return {
  };
  const currentMonth = currentMonthLongIST();
  return {
    title: `Places to Visit in ${stateName} — Every Destination Scored | NakshIQ`,
    description: `All destinations in ${stateName} scored 1-5 for ${currentMonth}. Kids ratings, safety data, infrastructure reality, and honest assessments. No sponsored content.`,
    ...localeAlternates(locale, `/explore/state/${stateSlug}`),
  };
}

export default async function ExploreByStatePage({ params }: { params: Promise<{ locale: string; stateSlug: string }> }) {
  const { locale, stateSlug } = await params;
  const stateName = STATE_MAP[stateSlug];
  if (!stateName) notFound();

  const supabase = getSupabase();
  if (!supabase) notFound();

  const currentMonth = currentMonthIST();

  const { data: destinations } = await supabase
    .from("destinations")
    .select("id, name, tagline, difficulty, elevation_m, tags, best_months, translations, state_id, state:states(name), kids_friendly(suitable, rating), destination_months(month, score, note)")
    .eq("state_id", stateSlug)
    .order("name");

  // Sort by current month score descending
  const sorted = (destinations ?? []).sort((a: any, b: any) => {
    const aScore = a.destination_months?.find((m: any) => m.month === currentMonth)?.score ?? 0;
    const bScore = b.destination_months?.find((m: any) => m.month === currentMonth)?.score ?? 0;
    return bScore - aScore;
  });

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
            EXPLORE · {stateName.toUpperCase()} · {String(sorted.length).padStart(3, "0")} DESTINATIONS
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
            Places to visit in {stateName}.
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
            {sorted.length} destinations scored for every month — sorted by this month&apos;s score.
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
            <ExploreGrid destinations={sorted} states={[{ id: stateSlug, name: stateName }]} />
          </Suspense>
        </div>
      </main>
      <CinematicRelatedRail />
      <Footer />
    </div>
  );
}
