import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import Link from "next/link";
import { ARRIVAL, IATA_SLUGS } from "@/lib/arrival-data";
import { localeAlternates } from "@/lib/seo-utils";
import { CinemaStyles } from "@/components/landing-cinema/cinema-styles";
import { Title } from "@/components/landing-cinema/editorial";
import { CinematicRelatedRail } from "@/components/cinematic-related-rail";

export const revalidate = 86400;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "Arrival Playbooks — India's 9 Major Airports",
    description: "Step-by-step airport arrival guides for India: prepaid taxi counters, Uber zones, SIM activation, scams to avoid. Delhi, Mumbai, Bangalore, Chennai, Kolkata, Hyderabad, Kochi, Goa, Ahmedabad.",
    ...localeAlternates(locale, "/arrival"),
  };
}

export default async function ArrivalIndexPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `https://www.nakshiq.com/${locale}` },
      { "@type": "ListItem", position: 2, name: "Arrival", item: `https://www.nakshiq.com/${locale}/arrival` },
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
        <header style={{ maxWidth: 820, margin: "0 auto 48px" }}>
          <p
            className="nq-kicker"
            style={{
              color: "var(--vermillion)",
              marginBottom: 20,
              letterSpacing: "0.22em",
            }}
          >
            INDIA GUIDE · {String(IATA_SLUGS.length).padStart(2, "0")} AIRPORTS
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
            Arrival playbooks.
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
            What to do in the 30 minutes between immigration and the city.
            Prepaid taxi fares, Uber pickup zones, SIM counter details, ATM
            guidance, and the one local scam each airport is known for.
          </p>
        </header>

        <div style={{ maxWidth: 820, margin: "0 auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: 1,
              background: "var(--hair)",
              border: "1px solid var(--hair)",
            }}
          >
            {IATA_SLUGS.map((s) => {
              const info = ARRIVAL[s];
              return (
                <Link
                  key={s}
                  href={`/${locale}/arrival/${s}`}
                  style={{
                    display: "block",
                    padding: 24,
                    background: "var(--paper)",
                    textDecoration: "none",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "baseline",
                      justifyContent: "space-between",
                      gap: 12,
                      flexWrap: "wrap",
                    }}
                  >
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
                      {info.city}
                    </h2>
                    <span
                      style={{
                        fontFamily: "var(--cinema-mono)",
                        fontSize: 10,
                        letterSpacing: "0.22em",
                        textTransform: "uppercase",
                        color: "var(--bone-faint)",
                      }}
                    >
                      {info.iata} · {info.state}
                    </span>
                  </div>
                  <p
                    style={{
                      fontFamily: "var(--cinema-ui)",
                      fontSize: 13,
                      lineHeight: 1.5,
                      color: "var(--bone-dim)",
                      margin: "8px 0 0",
                    }}
                  >
                    {info.name}
                  </p>
                </Link>
              );
            })}
          </div>

          <div
            style={{
              marginTop: 40,
              padding: 24,
              border: "1px solid var(--hair)",
              background: "rgba(245, 241, 232, 0.02)",
            }}
          >
            <h2
              style={{
                fontFamily: "var(--cinema-display)",
                fontStyle: "italic",
                fontWeight: 500,
                fontSize: 22,
                lineHeight: 1.2,
                color: "var(--bone)",
                margin: "0 0 16px",
              }}
            >
              After you&apos;ve landed
            </h2>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
              <li>
                <Link
                  href={`/${locale}/guide/permits`}
                  style={{
                    fontFamily: "var(--cinema-ui)",
                    fontSize: 14,
                    color: "var(--vermillion)",
                    textDecoration: "underline",
                    textUnderlineOffset: "3px",
                  }}
                >
                  India permits — ILP, PAP, RAP state by state →
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/guide/book-indian-trains`}
                  style={{
                    fontFamily: "var(--cinema-ui)",
                    fontSize: 14,
                    color: "var(--vermillion)",
                    textDecoration: "underline",
                    textUnderlineOffset: "3px",
                  }}
                >
                  How to book Indian trains as a foreigner →
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/methodology`}
                  style={{
                    fontFamily: "var(--cinema-ui)",
                    fontSize: 14,
                    color: "var(--vermillion)",
                    textDecoration: "underline",
                    textUnderlineOffset: "3px",
                  }}
                >
                  How NakshIQ scores destinations →
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </main>

      <CinematicRelatedRail />
      <Footer />
    </div>
  );
}
