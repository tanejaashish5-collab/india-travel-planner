import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { COUNTRY_PROFILES, COUNTRY_LIST } from "@/lib/india-vs-countries";
import { localeAlternates } from "@/lib/seo-utils";
import { CinemaStyles } from "@/components/landing-cinema/cinema-styles";
import { Title } from "@/components/landing-cinema/editorial";
import { CinematicRelatedRail } from "@/components/cinematic-related-rail";

export const revalidate = 86400;

const SITE = "https://www.nakshiq.com";

export async function generateStaticParams() {
  const locales = ["en", "hi"];
  return COUNTRY_LIST.flatMap((c) =>
    locales.map((locale) => ({ locale, country: c.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ country: string; locale: string }>;
}): Promise<Metadata> {
  const { country, locale } = await params;
  const profile = COUNTRY_PROFILES[country];
  if (!profile) return {};
  return {
    title: `India vs ${profile.name} — Honest Comparison for Travelers Choosing Between`,
    description: profile.meta_description,
    ...localeAlternates(locale, `/india-vs/${country}`),
  };
}

export default async function IndiaVsCountryPage({
  params,
}: {
  params: Promise<{ country: string; locale: string }>;
}) {
  const { country, locale } = await params;
  const profile = COUNTRY_PROFILES[country];
  if (!profile) notFound();

  const otherCountries = COUNTRY_LIST.filter((c) => c.slug !== country);

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `India vs ${profile.name}: Honest Travel Comparison`,
    description: profile.meta_description,
    url: `${SITE}/${locale}/india-vs/${profile.slug}`,
    about: [
      { "@type": "Country", name: "India" },
      { "@type": "Country", name: profile.name },
    ],
    author: { "@type": "Organization", name: "NakshIQ" },
    publisher: { "@type": "Organization", name: "NakshIQ" },
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/${locale}` },
      { "@type": "ListItem", position: 2, name: "India vs the world", item: `${SITE}/${locale}/india-vs` },
      { "@type": "ListItem", position: 3, name: profile.name, item: `${SITE}/${locale}/india-vs/${profile.slug}` },
    ],
  };

  const facts: { label: string; value: string }[] = [
    { label: "Best months", value: profile.facts.best_months },
    { label: "Visa for Indians", value: profile.facts.visa_for_indians },
    { label: "Daily cost", value: profile.facts.daily_cost_usd },
    { label: "Language", value: profile.facts.language_overlap },
    { label: "Safety read", value: profile.facts.safety_read },
    { label: "Cuisine", value: profile.facts.cuisine_signature },
  ];

  return (
    <div className="nakshiq-cinema" style={{ minHeight: "100vh" }}>
      <CinemaStyles />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />
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
        <header style={{ maxWidth: 900, margin: "0 auto 56px" }}>
          <p
            className="nq-kicker"
            style={{
              color: "var(--vermillion)",
              marginBottom: 20,
              letterSpacing: "0.22em",
            }}
          >
            COUNTRY COMPARISON · {profile.overline.toUpperCase()}
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
            India{" "}
            <span
              style={{
                fontFamily: "var(--cinema-mono)",
                fontStyle: "normal",
                fontWeight: 400,
                fontSize: "0.42em",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "var(--bone-faint)",
                verticalAlign: "middle",
                margin: "0 0.3em",
              }}
            >
              vs
            </span>{" "}
            {profile.name}{" "}
            <span style={{ fontStyle: "normal", color: "var(--bone-faint)" }}>{profile.flag}</span>
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
            {profile.lede}
          </p>
        </header>

        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          {/* At a glance */}
          <section style={{ marginBottom: 56 }}>
            <p
              className="nq-kicker"
              style={{
                color: "var(--vermillion)",
                marginBottom: 16,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
              }}
            >
              At a glance
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                gap: 1,
                background: "var(--hair)",
                border: "1px solid var(--hair)",
              }}
            >
              {facts.map((row) => (
                <div key={row.label} style={{ padding: 20, background: "var(--paper)" }}>
                  <p
                    style={{
                      fontFamily: "var(--cinema-mono)",
                      fontSize: 10,
                      letterSpacing: "0.22em",
                      textTransform: "uppercase",
                      color: "var(--bone-faint)",
                      margin: 0,
                    }}
                  >
                    {row.label}
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--cinema-ui)",
                      fontSize: 14,
                      lineHeight: 1.6,
                      color: "var(--bone)",
                      margin: "8px 0 0",
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    {row.value}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* What India offers more */}
          <section style={{ marginBottom: 56 }}>
            <h2
              style={{
                fontFamily: "var(--cinema-display)",
                fontStyle: "italic",
                fontWeight: 500,
                fontSize: 32,
                lineHeight: 1.1,
                color: "var(--bone)",
                margin: "0 0 24px",
              }}
            >
              What India offers more.
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              {profile.india_more.map((item) => (
                <div
                  key={item.topic}
                  style={{
                    paddingLeft: 16,
                    borderLeft: "2px solid var(--vermillion)",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "var(--cinema-display)",
                      fontStyle: "italic",
                      fontWeight: 500,
                      fontSize: 19,
                      lineHeight: 1.3,
                      color: "var(--bone)",
                      margin: "0 0 6px",
                    }}
                  >
                    {item.topic}
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--cinema-ui)",
                      fontSize: 14,
                      lineHeight: 1.7,
                      color: "var(--bone-dim)",
                      margin: 0,
                    }}
                  >
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* What the country offers more */}
          <section style={{ marginBottom: 56 }}>
            <h2
              style={{
                fontFamily: "var(--cinema-display)",
                fontStyle: "italic",
                fontWeight: 500,
                fontSize: 32,
                lineHeight: 1.1,
                color: "var(--bone)",
                margin: "0 0 24px",
              }}
            >
              What {profile.name} offers more.
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              {profile.country_more.map((item) => (
                <div
                  key={item.topic}
                  style={{
                    paddingLeft: 16,
                    borderLeft: "2px solid var(--bone-faint)",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "var(--cinema-display)",
                      fontStyle: "italic",
                      fontWeight: 500,
                      fontSize: 19,
                      lineHeight: 1.3,
                      color: "var(--bone)",
                      margin: "0 0 6px",
                    }}
                  >
                    {item.topic}
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--cinema-ui)",
                      fontSize: 14,
                      lineHeight: 1.7,
                      color: "var(--bone-dim)",
                      margin: 0,
                    }}
                  >
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Swap list */}
          <section style={{ marginBottom: 56 }}>
            <h2
              style={{
                fontFamily: "var(--cinema-display)",
                fontStyle: "italic",
                fontWeight: 500,
                fontSize: 32,
                lineHeight: 1.1,
                color: "var(--bone)",
                margin: "0 0 8px",
              }}
            >
              If you loved it there, try this here.
            </h2>
            <p
              style={{
                fontFamily: "var(--cinema-ui)",
                fontSize: 13,
                lineHeight: 1.7,
                color: "var(--bone-dim)",
                margin: "0 0 24px",
              }}
            >
              Concrete swap pairs — what scratches the same itch in India.
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr",
                gap: 1,
                background: "var(--hair)",
                border: "1px solid var(--hair)",
              }}
            >
              {profile.swaps.map((s, i) => (
                <div key={i} style={{ padding: 20, background: "var(--paper)" }}>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr auto 1fr",
                      gap: 16,
                      alignItems: "baseline",
                      marginBottom: 12,
                    }}
                  >
                    <div>
                      <p
                        style={{
                          fontFamily: "var(--cinema-mono)",
                          fontSize: 10,
                          letterSpacing: "0.22em",
                          textTransform: "uppercase",
                          color: "var(--bone-faint)",
                          margin: "0 0 4px",
                        }}
                      >
                        {profile.name}
                      </p>
                      <p
                        style={{
                          fontFamily: "var(--cinema-display)",
                          fontStyle: "italic",
                          fontWeight: 500,
                          fontSize: 18,
                          lineHeight: 1.2,
                          color: "var(--bone)",
                          margin: 0,
                        }}
                      >
                        {s.their}
                      </p>
                    </div>
                    <span
                      style={{
                        fontFamily: "var(--cinema-mono)",
                        fontSize: 14,
                        color: "var(--vermillion)",
                      }}
                    >
                      →
                    </span>
                    <div>
                      <p
                        style={{
                          fontFamily: "var(--cinema-mono)",
                          fontSize: 10,
                          letterSpacing: "0.22em",
                          textTransform: "uppercase",
                          color: "var(--vermillion)",
                          margin: "0 0 4px",
                        }}
                      >
                        India
                      </p>
                      <p
                        style={{
                          fontFamily: "var(--cinema-display)",
                          fontStyle: "italic",
                          fontWeight: 500,
                          fontSize: 18,
                          lineHeight: 1.2,
                          color: "var(--bone)",
                          margin: 0,
                        }}
                      >
                        {s.our}
                      </p>
                    </div>
                  </div>
                  <p
                    style={{
                      fontFamily: "var(--cinema-ui)",
                      fontSize: 13,
                      lineHeight: 1.7,
                      color: "var(--bone-dim)",
                      margin: 0,
                    }}
                  >
                    {s.reason}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Expectations */}
          <section style={{ marginBottom: 56 }}>
            <h2
              style={{
                fontFamily: "var(--cinema-display)",
                fontStyle: "italic",
                fontWeight: 500,
                fontSize: 32,
                lineHeight: 1.1,
                color: "var(--bone)",
                margin: "0 0 24px",
              }}
            >
              If {profile.name} was your reference point, expect this.
            </h2>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 14 }}>
              {profile.expectations.map((line, i) => (
                <li
                  key={i}
                  style={{
                    display: "flex",
                    gap: 12,
                    alignItems: "baseline",
                    fontFamily: "var(--cinema-ui)",
                    fontSize: 14,
                    lineHeight: 1.7,
                    color: "var(--bone-dim)",
                  }}
                >
                  <span
                    style={{
                      flexShrink: 0,
                      fontFamily: "var(--cinema-mono)",
                      fontSize: 10,
                      color: "var(--vermillion)",
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Verdict */}
          <section
            style={{
              marginBottom: 56,
              padding: 28,
              border: "1px solid var(--vermillion)",
              background: "rgba(229, 86, 66, 0.04)",
            }}
          >
            <p
              style={{
                fontFamily: "var(--cinema-mono)",
                fontSize: 10,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "var(--vermillion)",
                margin: "0 0 14px",
              }}
            >
              NakshIQ verdict
            </p>
            <p
              style={{
                fontFamily: "var(--cinema-display)",
                fontStyle: "italic",
                fontWeight: 400,
                fontSize: "clamp(18px, 2vw, 22px)",
                lineHeight: 1.4,
                color: "var(--bone)",
                margin: 0,
              }}
            >
              {profile.verdict}
            </p>
          </section>

          {/* Next steps */}
          <section style={{ marginBottom: 56 }}>
            <p
              className="nq-kicker"
              style={{
                color: "var(--vermillion)",
                marginBottom: 16,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
              }}
            >
              Next
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: 1,
                background: "var(--hair)",
                border: "1px solid var(--hair)",
              }}
            >
              <Link
                href={`/${locale}/guide/first-trip-india`}
                style={{
                  display: "block",
                  padding: 20,
                  background: "var(--paper)",
                  textDecoration: "none",
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--cinema-display)",
                    fontStyle: "italic",
                    fontWeight: 500,
                    fontSize: 18,
                    color: "var(--bone)",
                    margin: "0 0 6px",
                  }}
                >
                  First trip to India
                </p>
                <p
                  style={{
                    fontFamily: "var(--cinema-ui)",
                    fontSize: 13,
                    lineHeight: 1.6,
                    color: "var(--bone-dim)",
                    margin: 0,
                  }}
                >
                  The decision-grade primer for travellers planning their first India trip.
                </p>
              </Link>
              <Link
                href={`/${locale}/plan`}
                style={{
                  display: "block",
                  padding: 20,
                  background: "var(--paper)",
                  textDecoration: "none",
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--cinema-display)",
                    fontStyle: "italic",
                    fontWeight: 500,
                    fontSize: 18,
                    color: "var(--bone)",
                    margin: "0 0 6px",
                  }}
                >
                  Plan your trip
                </p>
                <p
                  style={{
                    fontFamily: "var(--cinema-ui)",
                    fontSize: 13,
                    lineHeight: 1.6,
                    color: "var(--bone-dim)",
                    margin: 0,
                  }}
                >
                  The AI itinerary planner — tell it your dates and constraints.
                </p>
              </Link>
            </div>
          </section>

          {/* Other comparisons */}
          <section
            style={{
              padding: 24,
              borderTop: "1px solid var(--hair)",
            }}
          >
            <p
              className="nq-kicker"
              style={{
                color: "var(--bone-faint)",
                marginBottom: 16,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
              }}
            >
              Other India comparisons
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {otherCountries.map((c) => (
                <Link
                  key={c.slug}
                  href={`/${locale}/india-vs/${c.slug}`}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    fontFamily: "var(--cinema-mono)",
                    fontSize: 11,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    padding: "6px 12px",
                    border: "1px solid var(--hair)",
                    color: "var(--bone-dim)",
                    textDecoration: "none",
                  }}
                >
                  <span>{c.flag}</span>
                  <span>India vs {c.name}</span>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>

      <CinematicRelatedRail />
      <Footer />
    </div>
  );
}
