import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { GapYearPageClient } from "@/components/gap-year-page-client";
import { localeAlternates } from "@/lib/seo-utils";
import { CinemaStyles } from "@/components/landing-cinema/cinema-styles";
import { Title } from "@/components/landing-cinema/editorial";
import { CinematicRelatedRail } from "@/components/cinematic-related-rail";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "The Gap Year Planner — 3 to 12 Months Across India",
    description:
      "Plan a 3–12 month India trip month by month. Real monthly scoring, kid-safe filters, budget roll-up, shareable link. Not a brochure — a working plan.",
    ...localeAlternates(locale, "/gap-year"),
  };
}

export default async function GapYearPage({
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
      { "@type": "ListItem", position: 2, name: "Gap year planner", item: `https://www.nakshiq.com/${locale}/gap-year` },
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
              marginBottom: 20,
              letterSpacing: "0.22em",
            }}
          >
            PLANNING TOOLS · GAP YEAR
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
            The gap year planner.
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
            Plan a 3–12 month India trip month by month. Real monthly scoring,
            kid-safe filters, budget roll-up, shareable link. Not a brochure
            — a working plan.
          </p>
        </header>

        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <GapYearPageClient locale={locale} />
        </div>
      </main>

      <CinematicRelatedRail />
      <Footer />
    </div>
  );
}
