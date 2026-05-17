import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { COUNTRY_LIST } from "@/lib/india-vs-countries";
import { localeAlternates } from "@/lib/seo-utils";
import { CinemaStyles } from "@/components/landing-cinema/cinema-styles";
import { Title } from "@/components/landing-cinema/editorial";
import { CinematicRelatedRail } from "@/components/cinematic-related-rail";

export const revalidate = 86400;

const SITE = "https://www.nakshiq.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "India vs the World — Honest Country Comparisons for Travelers",
    description:
      "Decision-grade comparisons between India and 14 travel-heavy countries — Vietnam, Thailand, Indonesia, Morocco, Peru, Egypt, Sri Lanka, Nepal, Bhutan, Singapore, Japan, Tibet, Iran, UAE.",
    ...localeAlternates(locale, "/india-vs"),
  };
}

export default async function IndiaVsIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/${locale}` },
      { "@type": "ListItem", position: 2, name: "India vs the world", item: `${SITE}/${locale}/india-vs` },
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
        <header style={{ maxWidth: 900, margin: "0 auto 56px" }}>
          <p
            className="nq-kicker"
            style={{
              color: "var(--vermillion)",
              marginBottom: 20,
              letterSpacing: "0.22em",
            }}
          >
            COUNTRY COMPARISONS · {String(COUNTRY_LIST.length).padStart(2, "0")} COUNTRIES
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
            India vs the world.
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
            For travellers deciding between India and a comparable country.
          </p>
          <p
            style={{
              fontFamily: "var(--cinema-ui)",
              fontSize: 14,
              lineHeight: 1.7,
              color: "var(--bone-dim)",
              marginTop: 16,
              maxWidth: 720,
            }}
          >
            Each comparison runs decision-grade — what India does better, what the other country
            does better, concrete swap pairs, and what to expect if you did the other country
            first.
          </p>
        </header>

        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: 1,
              background: "var(--hair)",
              border: "1px solid var(--hair)",
            }}
          >
            {COUNTRY_LIST.map((c) => (
              <Link
                key={c.slug}
                href={`/${locale}/india-vs/${c.slug}`}
                style={{
                  display: "block",
                  padding: 24,
                  background: "var(--paper)",
                  textDecoration: "none",
                }}
              >
                <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 10 }}>
                  <span style={{ fontSize: 28, lineHeight: 1 }}>{c.flag}</span>
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
                    {c.region}
                  </p>
                </div>
                <p
                  style={{
                    fontFamily: "var(--cinema-display)",
                    fontStyle: "italic",
                    fontWeight: 500,
                    fontSize: 22,
                    lineHeight: 1.15,
                    color: "var(--bone)",
                    margin: "0 0 10px",
                  }}
                >
                  India vs {c.name}
                </p>
                <p
                  style={{
                    fontFamily: "var(--cinema-ui)",
                    fontSize: 13,
                    lineHeight: 1.6,
                    color: "var(--bone-dim)",
                    margin: 0,
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {c.lede}
                </p>
              </Link>
            ))}
          </div>

          <p
            style={{
              fontFamily: "var(--cinema-ui)",
              fontSize: 13,
              lineHeight: 1.7,
              color: "var(--bone-dim)",
              marginTop: 40,
            }}
          >
            More comparisons in development. If there&apos;s a specific comparison you&apos;d find
            useful,{" "}
            <Link
              href={`/${locale}/contact`}
              style={{ color: "var(--vermillion)", textDecoration: "underline", textUnderlineOffset: "3px" }}
            >
              tell us
            </Link>
            .
          </p>
        </div>
      </main>

      <CinematicRelatedRail />
      <Footer />
    </div>
  );
}
