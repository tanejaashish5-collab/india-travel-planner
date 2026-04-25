import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { COUNTRY_PROFILES, COUNTRY_LIST } from "@/lib/india-vs-countries";
import { localeAlternates } from "@/lib/seo-utils";

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

  // ComparativeArticle JSON-LD — schema.org doesn't have a native country-comparison
  // type, so use Article with about referencing both countries.
  const ld = {
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

  return (
    <div className="min-h-screen">
      <Nav />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
      />

      <main className="mx-auto max-w-3xl px-4 sm:px-6 py-8 sm:py-12">
        <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground mb-4">
          <Link href={`/${locale}`} className="hover:text-foreground">Home</Link>
          <span aria-hidden>/</span>
          <Link href={`/${locale}/india-vs`} className="hover:text-foreground">India vs</Link>
          <span aria-hidden>/</span>
          <span className="text-foreground">{profile.name}</span>
        </div>

        <header className="mb-10">
          <p className="text-xs font-medium text-primary uppercase tracking-[0.08em] mb-3">{profile.overline}</p>
          <h1 className="text-3xl sm:text-5xl font-semibold leading-tight">
            India vs {profile.name} <span className="text-muted-foreground/40">{profile.flag}</span>
          </h1>
          <p className="mt-5 text-base sm:text-lg text-muted-foreground leading-relaxed">{profile.lede}</p>
        </header>

        {/* At a glance — facts grid */}
        <section className="mb-10 rounded-2xl border border-border/50 bg-card/50 p-6 sm:p-8">
          <h2 className="text-sm font-semibold uppercase tracking-[0.08em] text-muted-foreground/70 mb-5">
            At a glance
          </h2>
          <div className="grid gap-5 sm:grid-cols-2">
            {[
              { label: "Best months", value: profile.facts.best_months },
              { label: "Visa for Indians", value: profile.facts.visa_for_indians },
              { label: "Daily cost", value: profile.facts.daily_cost_usd },
              { label: "Language", value: profile.facts.language_overlap },
              { label: "Safety read", value: profile.facts.safety_read },
              { label: "Cuisine", value: profile.facts.cuisine_signature },
            ].map((row) => (
              <div key={row.label}>
                <div className="text-[11px] font-mono uppercase tracking-[0.12em] text-muted-foreground/60 mb-1.5">
                  {row.label}
                </div>
                <p className="text-sm text-foreground/85 leading-relaxed">{row.value}</p>
              </div>
            ))}
          </div>
        </section>

        {/* What India offers more */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-5">What India offers more</h2>
          <div className="space-y-5">
            {profile.india_more.map((item) => (
              <div key={item.topic} className="border-l-2 border-primary/40 pl-4">
                <div className="text-sm font-semibold mb-1">{item.topic}</div>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* What the country offers more */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-5">What {profile.name} offers more</h2>
          <div className="space-y-5">
            {profile.country_more.map((item) => (
              <div key={item.topic} className="border-l-2 border-amber-500/40 pl-4">
                <div className="text-sm font-semibold mb-1">{item.topic}</div>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Swap list — concrete equivalents */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-2">If you loved it there, try this here</h2>
          <p className="text-sm text-muted-foreground mb-6">
            Concrete swap pairs — what scratches the same itch in India.
          </p>
          <div className="space-y-6">
            {profile.swaps.map((s, i) => (
              <div key={i} className="rounded-xl border border-border/50 bg-card/30 p-5">
                <div className="grid sm:grid-cols-[1fr_auto_1fr] sm:gap-4 items-baseline mb-3">
                  <div>
                    <div className="text-[11px] font-mono uppercase tracking-[0.12em] text-amber-400/70 mb-1">
                      {profile.name}
                    </div>
                    <div className="text-base font-semibold">{s.their}</div>
                  </div>
                  <div className="hidden sm:block text-muted-foreground/40 text-xl">→</div>
                  <div>
                    <div className="text-[11px] font-mono uppercase tracking-[0.12em] text-primary/70 mb-1">
                      India
                    </div>
                    <div className="text-base font-semibold">{s.our}</div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.reason}</p>
              </div>
            ))}
          </div>
        </section>

        {/* What to expect — for travelers who did the other country first */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-5">
            If {profile.name} was your reference point, expect this
          </h2>
          <ul className="space-y-3">
            {profile.expectations.map((line, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Verdict */}
        <section className="mb-10 rounded-2xl border border-primary/30 bg-primary/5 p-6 sm:p-8">
          <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground/70 mb-3">
            NakshIQ verdict
          </div>
          <p className="text-base sm:text-lg leading-relaxed text-foreground/90 italic">
            {profile.verdict}
          </p>
        </section>

        {/* Next steps */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold mb-4">Next</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            <Link
              href={`/${locale}/guide/first-trip-india`}
              className="rounded-xl border border-border p-4 hover:border-primary/40 transition-all"
            >
              <div className="text-sm font-semibold">First trip to India</div>
              <div className="text-xs text-muted-foreground mt-1">
                The decision-grade primer for travelers planning their first India trip.
              </div>
            </Link>
            <Link
              href={`/${locale}/plan`}
              className="rounded-xl border border-border p-4 hover:border-primary/40 transition-all"
            >
              <div className="text-sm font-semibold">Plan your trip</div>
              <div className="text-xs text-muted-foreground mt-1">
                The AI itinerary planner — tell it your dates and constraints.
              </div>
            </Link>
          </div>
        </section>

        {/* Other comparisons */}
        <section className="border-t border-border/50 pt-8">
          <h2 className="text-sm font-semibold uppercase tracking-[0.08em] text-muted-foreground/70 mb-4">
            Other India comparisons
          </h2>
          <div className="flex flex-wrap gap-2">
            {otherCountries.map((c) => (
              <Link
                key={c.slug}
                href={`/${locale}/india-vs/${c.slug}`}
                className="rounded-full border border-border px-3 py-1.5 text-xs hover:border-primary/40 transition-all"
              >
                <span className="mr-1.5">{c.flag}</span>
                India vs {c.name}
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
