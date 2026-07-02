import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { localeAlternates } from "@/lib/seo-utils";
import { HillStationQuiz } from "@/components/hill-station-quiz";
import { getCachedHillStations } from "@/lib/cached-data";
import { VS_PAIRS } from "@/lib/vs-pairs";
import { CinemaStyles } from "@/components/landing-cinema/cinema-styles";
import { Title } from "@/components/landing-cinema/editorial";
import { CinematicRelatedRail } from "@/components/cinematic-related-rail";

export const revalidate = 86400;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isHindi = locale === "hi";
  // <title> OMITS "| NakshIQ" — the locale layout's title.template appends it.
  const title = isHindi
    ? "कौन सा हिल स्टेशन जाएँ? 30-सेकंड की क्विज़"
    : "Which hill station should you visit? A 30-second quiz";
  const description = isHindi
    ? "महीना, बजट और यात्रा की शैली चुनें — सत्यापित स्कोरिंग से आपके लिए 3 सर्वश्रेष्ठ हिल स्टेशन। कोई ईमेल नहीं, कोई अकाउंट नहीं।"
    : "Pick your month, budget, and travel style — get the 3 best-matched hill stations from verified month-by-month scoring. No email, no account.";
  const ogTitle = `${title} | NakshIQ`; // template skips OG/twitter — brand inline
  return {
    title,
    description,
    openGraph: { title: ogTitle, description },
    twitter: { title: ogTitle, description },
    ...localeAlternates(locale, "/quiz/hill-station"),
  };
}

const BASE_URL = "https://www.nakshiq.com";

export default async function HillStationQuizPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isHindi = locale === "hi";
  const t = await getTranslations("hillQuiz");
  const pageUrl = `${BASE_URL}/${locale}/quiz/hill-station`;

  const pool = await getCachedHillStations();
  const poolIds = new Set(pool.map((p) => p.id));
  // Only the /vs slugs where BOTH sides are in the quiz pool — the client
  // checks the top-2 result pair against this instead of bundling the full
  // (large) generated pairs module.
  const vsSlugs = VS_PAIRS.filter((p) => poolIds.has(p.id1) && poolIds.has(p.id2)).map(
    (p) => `${p.id1}-vs-${p.id2}`,
  );

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${BASE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: "Hill station quiz", item: pageUrl },
    ],
  };
  const webAppLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "@id": `${pageUrl}#app`,
    name: "NakshIQ hill station matcher",
    url: pageUrl,
    description:
      "A three-question matcher that recommends the best Indian hill stations for the user's month, budget, and travel style, from verified month-by-month scoring.",
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

      <main id="main-content" className="nq-grain" style={{ position: "relative", padding: "140px 24px 64px" }}>
        <header style={{ maxWidth: 760, margin: "0 auto 48px" }}>
          {/* 0.08em not the site-wide 0.22em — voice.md caps uppercase tracking. */}
          <p className="nq-kicker" style={{ color: "var(--vermillion)", marginBottom: 20, letterSpacing: "0.08em" }}>
            {isHindi ? "प्लानिंग टूल · हिल स्टेशन" : "PLANNING TOOLS · HILL STATIONS"}
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
            {t("pageTitle")}
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
            {t("pageIntro", { count: pool.length })}
          </p>
        </header>

        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <HillStationQuiz locale={locale} pool={pool} vsSlugs={vsSlugs} />

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
              {t("howHeading")}
            </h2>
            <p style={{ fontFamily: "var(--cinema-ui)", fontSize: 14, lineHeight: 1.7, color: "var(--bone-dim)", margin: 0 }}>
              {t("howBody", { count: pool.length })}
            </p>
            {/* Static, crawlable list of the pool — the interactive matcher is
                JS-gated, so this is the page's named-entity signal for search. */}
            <p style={{ fontFamily: "var(--cinema-ui)", fontSize: 13, lineHeight: 1.8, color: "var(--bone-faint)", margin: "12px 0 0" }}>
              {t("howPool")} {pool.map((p) => (isHindi && p.name_hi ? p.name_hi : p.name)).join(" · ")}
            </p>
          </section>
        </div>
      </main>

      <CinematicRelatedRail />
      <Footer />
    </div>
  );
}
