import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { COUNTRY_LIST } from "@/lib/india-vs-countries";
import { localeAlternates } from "@/lib/seo-utils";

export const revalidate = 86400;

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

  return (
    <div className="min-h-screen">
      <Nav />
      <main className="mx-auto max-w-3xl px-4 sm:px-6 py-8 sm:py-12">
        <header className="mb-10">
          <p className="text-xs font-medium text-primary uppercase tracking-[0.08em] mb-3">
            Country comparisons
          </p>
          <h1 className="text-3xl sm:text-5xl font-semibold leading-tight">India vs the world</h1>
          <p className="mt-5 text-base sm:text-lg text-muted-foreground leading-relaxed">
            For travelers deciding between India and a comparable country. Each
            comparison runs decision-grade: what India does better, what the other
            country does better, concrete swap pairs, and what to expect if you did
            the other country first.
          </p>
        </header>

        <div className="grid gap-4 sm:grid-cols-2">
          {COUNTRY_LIST.map((c) => (
            <Link
              key={c.slug}
              href={`/${locale}/india-vs/${c.slug}`}
              className="group rounded-2xl border border-border/50 bg-card/50 p-6 hover:border-primary/40 hover:bg-card transition-all"
            >
              <div className="flex items-start gap-3 mb-3">
                <span className="text-3xl">{c.flag}</span>
                <div>
                  <div className="text-xs font-mono uppercase tracking-[0.12em] text-muted-foreground/60 mb-1">
                    {c.region}
                  </div>
                  <h2 className="text-xl font-semibold group-hover:text-primary transition-colors">
                    India vs {c.name}
                  </h2>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                {c.lede}
              </p>
            </Link>
          ))}
        </div>

        <p className="mt-12 text-sm text-muted-foreground">
          More comparisons in development. If there's a specific comparison you'd
          find useful,{" "}
          <Link href={`/${locale}/contact`} className="text-primary hover:underline">
            tell us
          </Link>
          .
        </p>
      </main>
      <Footer />
    </div>
  );
}
