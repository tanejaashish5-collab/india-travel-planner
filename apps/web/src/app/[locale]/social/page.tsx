import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { localeAlternates } from "@/lib/seo-utils";
import { currentMonthSlugIST, currentMonthLongIST } from "@itp/shared";
import { getTranslations } from "next-intl/server";

// ISR-cached daily — the destination cards are static-ish but the
// month-keyed Dhanaulti card needs to roll over with currentMonthSlugIST.
export const revalidate = 86400;

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
  // Targets chosen from the 2026-05-04 GA4 baseline:
  //   /en/explore        — 169s avg time (highest engagement on site)
  //   /en/methodology    — 6/6 engaged sessions / users
  //   /en/destination/dhanaulti/{month} — 120s avg time, recurring high
  //   /en/nakshiq-100, /en/tourist-traps, /en/festivals — direct campaign matches
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

  return (
    <div className="min-h-screen">
      <Nav />
      <main className="mx-auto max-w-xl px-4 py-10">
        <header className="mb-8">
          <p className="text-xs uppercase tracking-[0.08em] text-muted-foreground mb-2">
            {t("overline")}
          </p>
          <h1 className="text-3xl font-semibold mb-3">{t("heading")}</h1>
          <p className="text-base text-muted-foreground">{t("intro", { month: monthLong })}</p>
        </header>

        <ul className="space-y-3">
          {list.map((card) => (
            <li key={card.key}>
              <Link
                href={withUtm(card.href, card.utm_campaign, locale)}
                className="block rounded-lg border border-border bg-card px-5 py-4 hover:border-foreground/30 transition-colors"
              >
                <div className="flex items-baseline justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-base font-medium">
                      {t(`cards.${card.key}.title`)}
                    </p>
                    <p className="text-sm text-muted-foreground mt-0.5 line-clamp-2">
                      {t(`cards.${card.key}.subtitle`, { month: monthLong })}
                    </p>
                  </div>
                  <span className="text-muted-foreground/60 shrink-0">→</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        <footer className="mt-10 pt-6 border-t border-border">
          <p className="text-xs text-muted-foreground">
            {t("foot", { month: monthLong })}
          </p>
        </footer>
      </main>
      <Footer />
    </div>
  );
}
