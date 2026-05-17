import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { localeAlternates } from "@/lib/seo-utils";
import { CinemaStyles } from "@/components/landing-cinema/cinema-styles";
import { Title } from "@/components/landing-cinema/editorial";
import { CinematicRelatedRail } from "@/components/cinematic-related-rail";

export const revalidate = 86400;

const SITE = "https://www.nakshiq.com";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "sos" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    ...localeAlternates(locale, "/sos"),
  };
}

// Official India emergency numbers. Sources:
// - 112: Ministry of Home Affairs (ERSS)
// - 100/101/102: long-standing national services
// - 108: state emergency response (operated via EMRI in most states)
// - 1091/1098: Ministry of Women & Child Development
// - 1073: Ministry of Road Transport & Highways
// - 1363: Ministry of Tourism (24x7, multi-lingual)
// - 139: Indian Railways
// - 1077: NDMA district control rooms
const HELPLINES: { num: string; labelKey: string }[] = [
  { num: "100", labelKey: "police100" },
  { num: "101", labelKey: "fire101" },
  { num: "102", labelKey: "ambulance102" },
  { num: "108", labelKey: "emergency108" },
  { num: "1091", labelKey: "women1091" },
  { num: "1098", labelKey: "child1098" },
  { num: "1073", labelKey: "road1073" },
  { num: "1363", labelKey: "tourist1363" },
  { num: "139", labelKey: "rail139" },
  { num: "1077", labelKey: "disaster1077" },
];

export default async function SosLandingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "sos" });

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/${locale}` },
      { "@type": "ListItem", position: 2, name: "SOS", item: `${SITE}/${locale}/sos` },
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
        <header style={{ maxWidth: 900, margin: "0 auto 40px" }}>
          <p
            className="nq-kicker"
            style={{
              color: "var(--vermillion)",
              marginBottom: 20,
              letterSpacing: "0.22em",
            }}
          >
            {t("emergencyNumbers").toUpperCase()}
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
            {t("landingHeading")}
          </Title>
          <p
            style={{
              fontFamily: "var(--cinema-ui)",
              fontSize: 15,
              lineHeight: 1.7,
              color: "var(--bone-dim)",
              marginTop: 20,
              maxWidth: 720,
            }}
          >
            {t("landingIntro")}
          </p>
        </header>

        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          {/* 112 hero — vermillion outline for urgency */}
          <section
            style={{
              padding: 28,
              border: "2px solid var(--vermillion)",
              background: "rgba(229, 86, 66, 0.06)",
              marginBottom: 48,
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
              All-India emergency
            </p>
            <a
              href="tel:112"
              style={{
                display: "inline-flex",
                alignItems: "baseline",
                gap: 16,
                textDecoration: "none",
                color: "var(--bone)",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--cinema-display)",
                  fontStyle: "italic",
                  fontWeight: 500,
                  fontSize: "clamp(56px, 9vw, 96px)",
                  lineHeight: 1,
                  color: "var(--vermillion)",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                112
              </span>
              <span
                style={{
                  fontFamily: "var(--cinema-mono)",
                  fontSize: 11,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "var(--vermillion)",
                  borderBottom: "1px solid var(--vermillion)",
                  paddingBottom: 2,
                }}
              >
                {t("callNow")}
              </span>
            </a>
            <p
              style={{
                fontFamily: "var(--cinema-ui)",
                fontSize: 13,
                lineHeight: 1.6,
                color: "var(--bone-dim)",
                margin: "16px 0 0",
              }}
            >
              {t("worksAllNetworks")}
            </p>
          </section>

          {/* National helplines grid */}
          <section style={{ marginBottom: 48 }}>
            <p
              className="nq-kicker"
              style={{
                color: "var(--vermillion)",
                marginBottom: 16,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
              }}
            >
              {t("nationalHelplines")} · {HELPLINES.length}
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                gap: 1,
                background: "var(--hair)",
                border: "1px solid var(--hair)",
              }}
            >
              {HELPLINES.map(({ num, labelKey }) => (
                <a
                  key={num}
                  href={`tel:${num}`}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 12,
                    padding: "16px 20px",
                    background: "var(--paper)",
                    textDecoration: "none",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--cinema-display)",
                      fontStyle: "italic",
                      fontWeight: 500,
                      fontSize: 15,
                      lineHeight: 1.3,
                      color: "var(--bone)",
                    }}
                  >
                    {t(labelKey)}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--cinema-mono)",
                      fontWeight: 500,
                      fontSize: 18,
                      color: "var(--vermillion)",
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    {num}
                  </span>
                </a>
              ))}
            </div>
            <p
              style={{
                fontFamily: "var(--cinema-ui)",
                fontSize: 12,
                lineHeight: 1.6,
                color: "var(--bone-faint)",
                margin: "16px 0 0",
              }}
            >
              {t("sourceDisclaimer")}
            </p>
          </section>

          {/* Per-destination pointer */}
          <section
            style={{
              padding: 24,
              border: "1px solid var(--hair)",
              background: "rgba(245, 241, 232, 0.02)",
            }}
          >
            <p
              style={{
                fontFamily: "var(--cinema-display)",
                fontStyle: "italic",
                fontWeight: 500,
                fontSize: 22,
                lineHeight: 1.2,
                color: "var(--bone)",
                margin: "0 0 12px",
              }}
            >
              {t("perDestinationTitle")}
            </p>
            <p
              style={{
                fontFamily: "var(--cinema-ui)",
                fontSize: 14,
                lineHeight: 1.7,
                color: "var(--bone-dim)",
                margin: "0 0 16px",
              }}
            >
              {t("perDestinationBody")}
            </p>
            <Link
              href={`/${locale}/explore`}
              style={{
                fontFamily: "var(--cinema-mono)",
                fontSize: 11,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--vermillion)",
                textDecoration: "none",
                borderBottom: "1px solid var(--vermillion)",
                paddingBottom: 2,
              }}
            >
              {t("goToExplore")} →
            </Link>
          </section>
        </div>
      </main>

      <CinematicRelatedRail />
      <Footer />
    </div>
  );
}
