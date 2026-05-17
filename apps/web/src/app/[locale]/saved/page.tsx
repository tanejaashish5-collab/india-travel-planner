import type { Metadata } from "next";
import { Suspense } from "react";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { SavedContent } from "@/components/saved-content";
import { createClient } from "@supabase/supabase-js";
import { localeAlternates } from "@/lib/seo-utils";
import { CinemaStyles } from "@/components/landing-cinema/cinema-styles";
import { Title } from "@/components/landing-cinema/editorial";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "Saved — your NakshIQ shortlist",
    description: "Destinations you've saved on NakshIQ — ready to compare, sequence into a trip, or revisit later.",
    robots: { index: false, follow: true },
    ...localeAlternates(locale, "/saved"),
  };
}

async function getAllDestinations() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return [];

  const supabase = createClient(url, key);
  const { data } = await supabase
    .from("destinations")
    .select(`
      id, name, tagline, difficulty, elevation_m, budget_tier, tags, best_months, state_id, solo_female_score,
      state:states(name),
      kids_friendly(suitable, rating),
      destination_months(month, score, note),
      confidence_cards(safety_rating, network)
    `)
    .order("name");

  return data ?? [];
}

export default async function SavedPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const destinations = await getAllDestinations();

  return (
    <div className="nakshiq-cinema" style={{ minHeight: "100vh" }}>
      <CinemaStyles />
      <Nav />

      <main
        id="main-content"
        className="nq-grain"
        style={{ position: "relative", padding: "140px 24px 48px" }}
      >
        <header style={{ maxWidth: 1200, margin: "0 auto 32px" }}>
          <p
            className="nq-kicker"
            style={{
              color: "var(--vermillion)",
              marginBottom: 20,
              letterSpacing: "0.22em",
            }}
          >
            SHORTLIST · LOCAL TO THIS BROWSER
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
            Saved.
          </Title>
          <p
            style={{
              fontFamily: "var(--cinema-ui)",
              fontSize: 14,
              lineHeight: 1.7,
              color: "var(--bone-dim)",
              marginTop: 16,
              maxWidth: 640,
            }}
          >
            Destinations you&apos;ve flagged on NakshIQ. Open the heart on any destination page to add or
            remove. Saved list is local — clearing your browser clears it.{" "}
            <a
              href={`/${locale}/trip`}
              style={{ color: "var(--vermillion)", textDecoration: "underline", textUnderlineOffset: "3px" }}
            >
              Open your trip board
            </a>{" "}
            to keep them.
          </p>
        </header>

        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <Suspense
            fallback={
              <div
                style={{
                  minHeight: 400,
                  background: "rgba(245, 241, 232, 0.04)",
                  border: "1px solid var(--hair)",
                }}
                aria-busy="true"
              />
            }
          >
            <SavedContent destinations={destinations} />
          </Suspense>
        </div>
      </main>

      <Footer />
    </div>
  );
}
