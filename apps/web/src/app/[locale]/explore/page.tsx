import type { Metadata } from "next";
import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { NewsletterSignup } from "@/components/newsletter-signup";
import { ExploreWithMap } from "@/components/explore-with-map";
import { TrendingMonthPages } from "@/components/trending-month-pages";
import { createClient } from "@supabase/supabase-js";
import {
  breadcrumbSchema,
  collectionPageSchema,
  itemListSchema,
  localeAlternates,
} from "@/lib/seo-utils";
import { CinemaStyles } from "@/components/landing-cinema/cinema-styles";
import { getIssueNumber } from "@/components/landing-cinema/issue-number";

export const revalidate = 21600;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "explore" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    ...localeAlternates(locale, "/explore"),
  };
}

async function getData() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return { destinations: [], states: [], coords: [] };

  const supabase = createClient(url, key);

  const fetchAll = () =>
    Promise.all([
      supabase
        .from("destinations")
        .select(`
          id, name, tagline, difficulty, elevation_m, tags, best_months, translations, state_id, budget_tier, eco_tier,
          hero_image_url, vehicle_fit, family_stress, solo_female_score,
          state:states(name),
          kids_friendly(suitable, rating),
          destination_months(month, score, note, solo_female_override)
        `)
        .order("name"),
      supabase.from("states").select("id, name, region").order("display_order"),
      supabase.from("destinations_with_coords").select("id, lat, lng"),
    ]);

  // The full-catalog query is heavy and can transiently fail under render
  // bursts. Swallowing that into [] bakes a "0 places" page into the 6h ISR
  // cache — retry, then throw so revalidation keeps the last good page (and a
  // build fails loudly) instead of caching an empty catalog.
  let results = await fetchAll();
  for (
    let attempt = 1;
    attempt < 3 && (results[0].error || !results[0].data?.length);
    attempt++
  ) {
    console.error(
      `[explore] destinations fetch attempt ${attempt} failed: ${results[0].error?.message ?? "empty result"} — retrying`,
    );
    await new Promise((r) => setTimeout(r, attempt * 1000));
    results = await fetchAll();
  }
  const [destResult, statesResult, coordsResult] = results;
  if (destResult.error || !destResult.data?.length) {
    throw new Error(
      `[explore] destinations fetch failed after retries: ${destResult.error?.message ?? "empty result"}`,
    );
  }

  return {
    destinations: destResult.data ?? [],
    states: statesResult.data ?? [],
    coords: coordsResult.data ?? [],
  };
}

export default async function ExplorePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "explore" });
  const { destinations, states, coords } = await getData();
  const issueNum = getIssueNumber();

  const schemas = [
    collectionPageSchema({
      locale,
      path: "/explore",
      name: t("metaTitle"),
      description: t("metaDescription"),
    }),
    itemListSchema(
      locale,
      "/explore",
      "Destinations",
      (destinations as { id: string; name: string }[]).slice(0, 50).map((d) => ({
        name: d.name,
        path: `/destination/${d.id}`,
      })),
    ),
    breadcrumbSchema(locale, [{ name: "Explore", path: "/explore" }]),
  ];

  const coordsMap = Object.fromEntries(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    coords.map((c: any) => [c.id, { lat: c.lat, lng: c.lng }])
  );
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const destinationsWithCoords = destinations.map((d: any) => ({
    ...d,
    coords: coordsMap[d.id] ?? null,
  }));

  return (
    <div className="nakshiq-cinema" style={{ minHeight: "100vh" }}>
      <CinemaStyles />
      {schemas.map((s, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
        />
      ))}
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
            DESTINATIONS · ISSUE Nº {issueNum}
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
            {destinations.length} places,<br />
            scored honestly.
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
            Every destination rated month-by-month for go/wait/skip, with
            kids-suitability, solo-female safety, altitude risk and infrastructure
            data. No tourism boards. No paid placements.
          </p>
        </header>

        {/* Start-from cities — editorial rail */}
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto 48px",
            borderTop: "1px solid var(--hair)",
            borderBottom: "1px solid var(--hair)",
            padding: "20px 0",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: "16px 24px",
          }}
        >
          <span
            className="nq-kicker"
            style={{
              color: "var(--bone-faint)",
              letterSpacing: "0.22em",
            }}
          >
            START FROM
          </span>
          {["delhi", "mumbai", "bangalore", "chennai", "kolkata", "hyderabad"].map((c) => (
            <a
              key={c}
              href={`/${locale}/weekend-from-${c}`}
              className="nq-mono"
              style={{
                fontSize: 11,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--bone-dim)",
                textDecoration: "none",
                transition: "color 220ms ease",
              }}
            >
              {c}
            </a>
          ))}
          <a
            href={`/${locale}/weekend-from-delhi`}
            className="nq-mono"
            style={{
              marginLeft: "auto",
              fontSize: 11,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "var(--vermillion)",
              textDecoration: "none",
            }}
          >
            WEEKEND TRIPS →
          </a>
        </div>

        {/* The map/grid widget — inherits cinematic palette via .nakshiq-cinema
            shadcn neutralisation in cinema.css */}
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
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
            <ExploreWithMap destinations={destinationsWithCoords} states={states} />
          </Suspense>
        </div>

        <div style={{ maxWidth: 1280, margin: "64px auto 0" }}>
          <TrendingMonthPages locale={locale} />
        </div>

        {/* Subscribe outro — vermillion-bordered editorial block */}
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
            Stop scrolling. Get the one that&apos;s worth it this week.
          </p>
          <NewsletterSignup
            source="explore-end"
            headline=""
            subhead="Every Sunday: the single best India destination this week, the honest skip, and what changed on the road. Free. No spam."
            buttonLabel="Get Sunday's pick"
          />
        </section>
      </main>
      <Footer />
    </div>
  );
}
