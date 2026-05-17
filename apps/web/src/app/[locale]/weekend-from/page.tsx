import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { METRO_ANCHORS, METRO_SLUGS } from "@/lib/metro-anchors";
import { CinemaStyles } from "@/components/landing-cinema/cinema-styles";
import { Title } from "@/components/landing-cinema/editorial";
import { CinematicRelatedRail } from "@/components/cinematic-related-rail";

export const revalidate = 86400;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "Weekend Trips from Indian Metros — Destinations Within 500 km, Scored",
    description:
      "Weekend escapes from Delhi, Mumbai, Bangalore, Chennai, Kolkata, Hyderabad. Every destination scored for the current month — no hill station that's closed, no beach under monsoon water.",
    alternates: {
      canonical: `https://www.nakshiq.com/${locale}/weekend-from`,
      languages: {
        en: "https://www.nakshiq.com/en/weekend-from",
        hi: "https://www.nakshiq.com/hi/weekend-from",
        "x-default": "https://www.nakshiq.com/en/weekend-from",
      },
    },
  };
}

export default async function WeekendFromIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `https://www.nakshiq.com/${locale}` },
      { "@type": "ListItem", position: 2, name: "Weekend from", item: `https://www.nakshiq.com/${locale}/weekend-from` },
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
            WEEKEND ESCAPE · {String(METRO_SLUGS.length).padStart(2, "0")} METROS
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
            Weekend from anywhere.
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
            Pick your city. Every destination within 500 km is scored for the
            current month — no hill station already closed for winter, no
            beach under monsoon water.
          </p>
        </header>

        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 1,
              background: "var(--hair)",
              border: "1px solid var(--hair)",
            }}
          >
            {METRO_SLUGS.map((slug) => {
              const metro = METRO_ANCHORS[slug];
              return (
                <Link
                  key={slug}
                  href={`/${locale}/weekend-from-${slug}`}
                  style={{
                    display: "block",
                    padding: 24,
                    background: "var(--paper)",
                    textDecoration: "none",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "var(--cinema-mono)",
                      fontSize: 10,
                      letterSpacing: "0.22em",
                      textTransform: "uppercase",
                      color: "var(--bone-faint)",
                      margin: "0 0 10px",
                    }}
                  >
                    {metro.state}
                  </p>
                  <h2
                    style={{
                      fontFamily: "var(--cinema-display)",
                      fontStyle: "italic",
                      fontWeight: 500,
                      fontSize: 28,
                      lineHeight: 1.1,
                      color: "var(--bone)",
                      margin: 0,
                    }}
                  >
                    Weekend from {metro.name}.
                  </h2>
                  <p
                    style={{
                      fontFamily: "var(--cinema-ui)",
                      fontSize: 13,
                      lineHeight: 1.55,
                      color: "var(--bone-dim)",
                      margin: "12px 0 0",
                    }}
                  >
                    500 km radius · 3 drive bands · current-month scores
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--cinema-mono)",
                      fontSize: 11,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: "var(--vermillion)",
                      margin: "16px 0 0",
                    }}
                  >
                    Explore →
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </main>

      <CinematicRelatedRail />
      <Footer />
    </div>
  );
}
