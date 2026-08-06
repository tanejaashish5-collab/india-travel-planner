import type { Metadata } from "next";
import { Suspense } from "react";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { NewsletterSignup } from "@/components/newsletter-signup";
import { PlanContent } from "@/components/plan-content";
import { createClient } from "@supabase/supabase-js";
import { localeAlternates } from "@/lib/seo-utils";
import { getAppStats } from "@/lib/stats";
import { CinemaStyles } from "@/components/landing-cinema/cinema-styles";
import { getIssueNumber } from "@/components/landing-cinema/issue-number";

export const revalidate = 21600;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const stats = await getAppStats();
  return {
    title: "Plan Your Trip — Smart Destination Matcher",
    description: `Tell us when you're going, who's coming, and your budget. We'll match you to the best destinations from ${stats.destinations}+ destinations with itinerary suggestions and honest warnings.`,
    ...localeAlternates(locale, "/plan"),
  };
}

async function getAllDestinations() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return { destinations: [], states: [] };

  const supabase = createClient(url, key);
  const [destRes, stateRes] = await Promise.all([
    supabase
      .from("destinations")
      .select(`
        id, name, tagline, difficulty, elevation_m, budget_tier, tags, best_months, state_id,
        state:states(name),
        kids_friendly(suitable, rating),
        destination_months(month, score, note)
      `)
      .order("name"),
    supabase
      .from("states")
      .select("id, name, region")
      .order("name"),
  ]);

  return {
    destinations: destRes.data ?? [],
    states: stateRes.data ?? [],
  };
}

export default async function PlanTripPage() {
  const { destinations, states } = await getAllDestinations();
  const issueNum = getIssueNumber();

  return (
    <div className="nakshiq-cinema" style={{ minHeight: "100vh" }}>
      <CinemaStyles />
      <Nav />
      <main
        id="main-content"
        className="nq-grain nq-glow-bookend"
        style={{ padding: "140px 24px 96px", position: "relative" }}
      >
        {/* Masthead */}
        <header style={{ maxWidth: 1100, margin: "0 auto 64px", textAlign: "left" }}>
          <p
            className="nq-kicker"
            style={{
              color: "var(--vermillion)",
              marginBottom: 24,
              letterSpacing: "0.22em",
            }}
          >
            PLAN · ISSUE Nº {issueNum}
          </p>
          <h1
            className="nq-display nq-balance"
            style={{
              fontFamily: "var(--cinema-display)",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "clamp(48px, 8vw, 116px)",
              lineHeight: 0.96,
              letterSpacing: "-0.028em",
              margin: 0,
            }}
          >
            Tell us when.<br />
            We&apos;ll tell you where.
          </h1>
          <p
            className="nq-meta"
            style={{
              color: "var(--bone-dim)",
              marginTop: 32,
              maxWidth: 720,
              fontSize: 15,
              lineHeight: 1.6,
              letterSpacing: "0.04em",
              fontFamily: "var(--cinema-ui)",
            }}
          >
            Pick a month, a budget, who&apos;s coming. We&apos;ll match you to
            the destinations actually worth going to from {destinations.length}+
            scored places — and tell you which to skip, honestly.
          </p>
        </header>

        {/* Matcher widget — palette inherits from .nakshiq-cinema neutralisation */}
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Suspense
            fallback={
              <div
                style={{
                  minHeight: 400,
                  border: "1px solid var(--hair)",
                  background: "var(--film-2)",
                }}
              />
            }
          >
            <PlanContent destinations={destinations} states={states} />
          </Suspense>
        </div>

        {/* Subscribe outro */}
        <section
          style={{
            maxWidth: 720,
            margin: "96px auto 0",
            padding: "48px 32px",
            background: "var(--film-2)",
            border: "1px solid var(--vermillion)",
            borderLeftWidth: 4,
          }}
        >
          <p
            className="nq-kicker"
            style={{ color: "var(--vermillion)", marginBottom: 18 }}
          >
            THE WINDOW · WEEKLY DISPATCH
          </p>
          <p
            style={{
              fontFamily: "var(--cinema-display)",
              fontStyle: "italic",
              fontSize: 22,
              lineHeight: 1.45,
              color: "var(--bone)",
              marginBottom: 20,
            }}
          >
            Before you lock anything in — check it&apos;s the right month.
          </p>
          <NewsletterSignup source="plan-end" headline="" />
        </section>
      </main>
      <Footer />
    </div>
  );
}
