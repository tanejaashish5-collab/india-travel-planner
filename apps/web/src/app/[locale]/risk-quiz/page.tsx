import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { localeAlternates } from "@/lib/seo-utils";
import { RiskQuiz } from "@/components/risk-quiz";
import { CinemaStyles } from "@/components/landing-cinema/cinema-styles";
import { Title } from "@/components/landing-cinema/editorial";
import { CinematicRelatedRail } from "@/components/cinematic-related-rail";

export const revalidate = 86400;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isHindi = locale === "hi";
  return {
    title: isHindi ? "यात्रा मिलान प्रश्नोत्तरी — NakshIQ" : "Find your trip — NakshIQ's 5-question matcher",
    description: isHindi
      ? "5 प्रश्न, 60 सेकंड। आपके लिए 5 सर्वश्रेष्ठ स्थल — आपके महीने, आराम स्तर, और यात्रा समूह के लिए।"
      : "Five questions, sixty seconds. Get the 5 best India destinations for your month, comfort level, and travel group. No email required, no account.",
    ...localeAlternates(locale, "/risk-quiz"),
  };
}

const BASE_URL = "https://www.nakshiq.com";

export default async function RiskQuizPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const pageUrl = `${BASE_URL}/${locale}/risk-quiz`;

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${BASE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: "Find your trip", item: pageUrl },
    ],
  };

  const webAppLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "@id": `${pageUrl}#app`,
    name: "NakshIQ trip matcher",
    url: pageUrl,
    description: "A five-question matcher that recommends five India destinations tailored to the user's travel group, month, duration, priorities, and comfort tolerance.",
    applicationCategory: "TravelApplication",
    isPartOf: { "@id": `${BASE_URL}#website` },
    publisher: { "@id": `${BASE_URL}#organization` },
    operatingSystem: "All",
    offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
  };

  return (
    <div className="nakshiq-cinema" style={{ minHeight: "100vh" }}>
      <CinemaStyles />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppLd) }} />
      <Nav />

      <main
        id="main-content"
        className="nq-grain"
        style={{ position: "relative", padding: "140px 24px 64px" }}
      >
        <header style={{ maxWidth: 760, margin: "0 auto 48px" }}>
          <p
            className="nq-kicker"
            style={{
              color: "var(--vermillion)",
              marginBottom: 20,
              letterSpacing: "0.22em",
            }}
          >
            PLANNING TOOLS · FIND YOUR TRIP
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
            Find your trip — in five questions.
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
            Five questions, sixty seconds. We&apos;ll map your answers to the
            NakshIQ destination-month scoring and hand back the five best
            matches. No email, no account.
          </p>
        </header>

        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <RiskQuiz locale={locale} />

          <section
            style={{
              marginTop: 48,
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
                margin: "0 0 12px",
              }}
            >
              How it maps
            </h2>
            <p
              style={{
                fontFamily: "var(--cinema-ui)",
                fontSize: 14,
                lineHeight: 1.7,
                color: "var(--bone-dim)",
                margin: 0,
              }}
            >
              Your answers map to a persona (family / solo / couple / adventure /
              wellness), then query the 5,856-row destination-month score table
              filtered by the month and comfort tier you selected. Top 5
              highest-scored matches land here. No remote API call — the matcher
              runs on the live NakshIQ scoring database.
            </p>
          </section>
        </div>
      </main>

      <CinematicRelatedRail />
      <Footer />
    </div>
  );
}
