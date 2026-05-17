import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { localeAlternates } from "@/lib/seo-utils";
import { currentMonthSlugIST, currentMonthLongIST } from "@itp/shared";
import { getTranslations } from "next-intl/server";
import { CinemaStyles } from "@/components/landing-cinema/cinema-styles";
import { Title } from "@/components/landing-cinema/editorial";
import { CinematicRelatedRail } from "@/components/cinematic-related-rail";

// ISR-cached daily — the destination cards are static-ish but the
// month-keyed Dhanaulti card needs to roll over with currentMonthSlugIST.
export const revalidate = 86400;

const SITE = "https://www.nakshiq.com";

type CardKey =
  | "score"
  | "honest_avoid"
  | "this_month"
  | "methodology"
  | "festivals"
  | "plan";

type Card = {
  key: CardKey;
  href: string;
  utm_campaign: string;
};

function cards(monthSlug: string): Card[] {
  return [
    { key: "this_month", href: `/destination/dhanaulti/${monthSlug}`, utm_campaign: "social-this-month" },
    { key: "score",      href: "/nakshiq-100",                          utm_campaign: "social-top-100" },
    { key: "honest_avoid", href: "/tourist-traps",                       utm_campaign: "social-traps" },
    { key: "festivals",  href: "/festivals",                             utm_campaign: "social-festivals" },
    { key: "methodology", href: "/methodology",                          utm_campaign: "social-method" },
    { key: "plan",       href: "/plan",                                  utm_campaign: "social-plan" },
  ];
}

function withUtm(href: string, campaign: string, locale: string): string {
  const localised = href.startsWith("/") ? `/${locale}${href}` : href;
  const sep = localised.includes("?") ? "&" : "?";
  return `${localised}${sep}utm_source=ig-bio&utm_medium=link-in-bio&utm_campaign=${campaign}`;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "social" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    robots: { index: true, follow: true },
    openGraph: {
      title: t("metaTitle"),
      description: t("metaDescription"),
      type: "website",
    },
    ...localeAlternates(locale, "/social"),
  };
}

export default async function SocialPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "social" });
  const monthSlug = currentMonthSlugIST();
  const monthLong = currentMonthLongIST();
  const list = cards(monthSlug);

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/${locale}` },
      { "@type": "ListItem", position: 2, name: "Social", item: `${SITE}/${locale}/social` },
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
        <header style={{ maxWidth: 720, margin: "0 auto 40px" }}>
          <p
            className="nq-kicker"
            style={{
              color: "var(--vermillion)",
              marginBottom: 20,
              letterSpacing: "0.22em",
            }}
          >
            {t("overline").toUpperCase()} · {monthLong.toUpperCase()}
          </p>
          <Title
            as="h1"
            className="nq-display"
            style={{
              fontFamily: "var(--cinema-display)",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "clamp(32px, 5vw, 56px)",
              lineHeight: 1.05,
              letterSpacing: "-0.022em",
              margin: 0,
              textWrap: "balance",
            }}
          >
            {t("heading")}
          </Title>
          <p
            style={{
              fontFamily: "var(--cinema-ui)",
              fontSize: 15,
              lineHeight: 1.7,
              color: "var(--bone-dim)",
              marginTop: 20,
            }}
          >
            {t("intro", { month: monthLong })}
          </p>
        </header>

        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: 1,
              background: "var(--hair)",
              border: "1px solid var(--hair)",
            }}
          >
            {list.map((card, i) => (
              <Link
                key={card.key}
                href={withUtm(card.href, card.utm_campaign, locale)}
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: 14,
                  padding: "18px 20px",
                  background: "var(--paper)",
                  textDecoration: "none",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--cinema-mono)",
                    fontSize: 11,
                    letterSpacing: "0.18em",
                    color: "var(--vermillion)",
                    flexShrink: 0,
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p
                    style={{
                      fontFamily: "var(--cinema-display)",
                      fontStyle: "italic",
                      fontWeight: 500,
                      fontSize: 18,
                      lineHeight: 1.25,
                      color: "var(--bone)",
                      margin: 0,
                    }}
                  >
                    {t(`cards.${card.key}.title`)}
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--cinema-ui)",
                      fontSize: 13,
                      lineHeight: 1.6,
                      color: "var(--bone-dim)",
                      margin: "4px 0 0",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {t(`cards.${card.key}.subtitle`, { month: monthLong })}
                  </p>
                </div>
                <span
                  style={{
                    fontFamily: "var(--cinema-mono)",
                    fontSize: 12,
                    color: "var(--vermillion)",
                    flexShrink: 0,
                  }}
                >
                  →
                </span>
              </Link>
            ))}
          </div>

          <p
            style={{
              fontFamily: "var(--cinema-ui)",
              fontSize: 12,
              lineHeight: 1.7,
              color: "var(--bone-faint)",
              margin: "32px 0 0",
              paddingTop: 24,
              borderTop: "1px solid var(--hair)",
            }}
          >
            {t("foot", { month: monthLong })}
          </p>
        </div>
      </main>

      <CinematicRelatedRail />
      <Footer />
    </div>
  );
}
