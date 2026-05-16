import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";
import { localeAlternates } from "@/lib/seo-utils";
import {
  PERSONAS,
  PERSONA_ORDER,
  matchDestinationsForPersona,
  type PersonaSlug,
  type DestRecord,
} from "@/lib/personas";

export const revalidate = 3600;

export function generateStaticParams() {
  return PERSONA_ORDER.flatMap((persona) =>
    ["en", "hi"].map((locale) => ({ persona, locale }))
  );
}

const BASE_URL = "https://www.nakshiq.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ persona: string; locale: string }>;
}): Promise<Metadata> {
  const { persona, locale } = await params;
  const config = PERSONAS[persona as PersonaSlug];
  if (!config) return {};

  const isHindi = locale === "hi";
  return {
    title: isHindi ? config.titleHindi : config.title,
    description: (isHindi ? config.taglineHindi : config.tagline).slice(0, 160) + " " + config.description.slice(0, 300),
    ...localeAlternates(locale, `/for/${persona}`),
    openGraph: {
      title: isHindi ? config.titleHindi : config.title,
      description: isHindi ? config.taglineHindi : config.tagline,
      type: "article",
      url: `${BASE_URL}/${locale}/for/${persona}`,
      siteName: "NakshIQ",
      locale: isHindi ? "hi_IN" : "en_IN",
    },
  };
}

async function fetchDestinations(): Promise<DestRecord[]> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return [];

  const supabase = createClient(url, key);

  // Paginate past 1000-row default
  const all: DestRecord[] = [];
  const page = 1000;
  let from = 0;
  while (true) {
    const { data, error } = await supabase
      .from("destinations")
      .select(`
        id, name, state_id, tagline, difficulty, elevation_m, solo_female_score,
        persona_blocks, best_for_segments,
        kids_friendly(rating, suitable)
      `)
      .range(from, from + page - 1);
    if (error) break;
    all.push(
      ...(((data ?? []).map((d: Record<string, unknown>) => ({
        ...d,
        kids_friendly: Array.isArray(d.kids_friendly) ? d.kids_friendly[0] : d.kids_friendly,
      }))) as unknown as DestRecord[])
    );
    if (!data || data.length < page) break;
    from += page;
  }

  return all;
}

function computeHeroStat(
  persona: PersonaSlug,
  all: DestRecord[],
  matched: DestRecord[],
): string | null {
  const totalCorpus = all.length;
  const matchedCount = matched.length;
  if (matchedCount === 0) return null;

  switch (persona) {
    case "solo-female": {
      const highConfidence = all.filter(
        (d) => (d.solo_female_score?.annual_score ?? 0) >= 4,
      ).length;
      return `${matchedCount} of ${totalCorpus} destinations currently match — ${highConfidence} score 4/5 or higher on NakshIQ's annual solo-female safety index. The index is rebuilt each season, not curated once.`;
    }
    case "families": {
      const suitableHigh = all.filter(
        (d) => d.kids_friendly?.suitable === true && (d.kids_friendly?.rating ?? 0) >= 4,
      ).length;
      const underAlt = matched.filter((d) => (d.elevation_m ?? 0) < 2500).length;
      return `${matchedCount} family-suitable destinations in the corpus, ${suitableHigh} of them at 4/5 or higher for kids. ${underAlt} sit under 2,500 m — the altitude ceiling we recommend for children under ten.`;
    }
    case "elderly": {
      const lowAlt = matched.filter((d) => (d.elevation_m ?? 0) < 2000).length;
      const easy = matched.filter((d) => d.difficulty === "easy" || !d.difficulty).length;
      return `${matchedCount} destinations suit travellers prioritising low-effort access — ${lowAlt} below 2,000 m and ${easy} marked easy on terrain. Hospital distance and emergency contacts surface on each page.`;
    }
    case "honeymooners": {
      const states = new Set(matched.map((d) => d.state_id).filter(Boolean)).size;
      return `${matchedCount} destinations across ${states} states. We list the ones with consistent stay quality and clear seasonality — the months we'd avoid are flagged on each destination page.`;
    }
    case "pilgrims": {
      const states = new Set(matched.map((d) => d.state_id).filter(Boolean)).size;
      return `${matchedCount} pilgrimage destinations across ${states} states. Permit windows, darshan timings, and access cutoffs (Char Dham, Sabarimala, Vaishno Devi) are tracked per destination, not assumed from listicles.`;
    }
    case "nri-parents-visit": {
      const lowAlt = matched.filter((d) => (d.elevation_m ?? 0) < 2000).length;
      const easy = matched.filter((d) => d.difficulty === "easy" || !d.difficulty).length;
      return `${matchedCount} destinations suit a trip with parents joining from abroad — ${lowAlt} below 2,000 m, ${easy} marked easy on terrain. Each destination carries hospital distance and verified emergency contacts because the worry is the actual product here.`;
    }
    default: {
      return `${matchedCount} of ${totalCorpus} destinations match this persona today, drawn from NakshIQ's verified corpus rather than editorial-curated lists.`;
    }
  }
}

export default async function PersonaHubPage({
  params,
}: {
  params: Promise<{ persona: string; locale: string }>;
}) {
  const { persona, locale } = await params;
  const config = PERSONAS[persona as PersonaSlug];
  if (!config) notFound();

  const isHindi = locale === "hi";
  const all = await fetchDestinations();
  const matched = matchDestinationsForPersona(config, all);

  // Stat-led hero context — one inline numeric line per persona, computed
  // live from the matched set so it can't drift from reality. No fabricated
  // .gov.in citations; the data is NakshIQ's own corpus.
  const heroStat = computeHeroStat(persona as PersonaSlug, all, matched);

  const pageUrl = `${BASE_URL}/${locale}/for/${persona}`;

  // Schema.org — Article + FAQPage + ItemList (top 20 destinations)
  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${pageUrl}#article`,
    headline: config.title,
    description: config.description,
    author: { "@id": `${BASE_URL}#organization` },
    publisher: { "@id": `${BASE_URL}#organization` },
    inLanguage: isHindi ? "hi-IN" : "en-IN",
    isPartOf: { "@id": `${BASE_URL}#website` },
    mainEntityOfPage: pageUrl,
    url: pageUrl,
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${pageUrl}#faq`,
    isPartOf: { "@id": `${BASE_URL}#website` },
    about: { "@id": `${pageUrl}#article` },
    mainEntity: config.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${pageUrl}#destinations`,
    name: `${config.label} destinations in India`,
    numberOfItems: Math.min(matched.length, 20),
    itemListOrder: "https://schema.org/ItemListOrderDescending",
    itemListElement: matched.slice(0, 20).map((d, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      item: {
        "@type": "TouristDestination",
        name: d.name,
        url: `${BASE_URL}/${locale}/destination/${d.id}`,
      },
    })),
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${BASE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: "For", item: `${BASE_URL}/${locale}/explore-by-persona` },
      { "@type": "ListItem", position: 3, name: config.label, item: pageUrl },
    ],
  };

  // Group matched destinations by state for visual rendering
  const byState = new Map<string, DestRecord[]>();
  for (const d of matched) {
    const s = d.state_id ?? "unknown";
    if (!byState.has(s)) byState.set(s, []);
    byState.get(s)!.push(d);
  }
  const states = Array.from(byState.entries()).sort((a, b) => b[1].length - a[1].length);

  return (
    <div className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <Nav />
      <main className="mx-auto max-w-4xl px-4 py-12">
        <div className="mb-6 text-sm text-muted-foreground">
          <Link href={`/${locale}`} className="hover:text-foreground">NakshIQ</Link>
          {" → "}
          <Link href={`/${locale}/explore-by-persona`} className="hover:text-foreground">For</Link>
          {" → "}
          <span className="text-foreground">{isHindi ? config.labelHindi : config.label}</span>
        </div>

        {/* Hero */}
        <h1 className="text-4xl sm:text-5xl font-semibold mb-3">{isHindi ? config.titleHindi : config.title}</h1>
        <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
          {isHindi ? config.taglineHindi : config.tagline}
        </p>
        <p className="text-sm text-muted-foreground/90 mb-6 leading-relaxed max-w-3xl">
          {config.description}
        </p>

        {heroStat && (
          <p className="text-sm tabular-nums text-foreground/80 mb-10 leading-relaxed max-w-3xl border-l-2 border-primary/40 pl-4">
            {heroStat}
          </p>
        )}

        {/* Top-line stats */}
        <div className="grid grid-cols-2 gap-3 mb-10">
          <div className="rounded-2xl border border-border bg-card/40 p-4">
            <div className="text-[11px] font-medium uppercase tracking-[0.08em] text-muted-foreground/70">Destinations matched</div>
            <div className="text-3xl font-semibold tabular-nums mt-1">{matched.length}</div>
          </div>
          <div className="rounded-2xl border border-border bg-card/40 p-4">
            <div className="text-[11px] font-medium uppercase tracking-[0.08em] text-muted-foreground/70">States covered</div>
            <div className="text-3xl font-semibold tabular-nums mt-1">{states.length}</div>
          </div>
        </div>

        {/* Destinations grouped by state */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">
            {matched.length > 0
              ? (isHindi ? `${matched.length} मिलान स्थल` : `${matched.length} matching destinations`)
              : (isHindi ? "कोई स्थल मेल नहीं खाता" : "No destinations currently match this persona")}
          </h2>

          {states.length > 0 ? (
            <div className="space-y-8">
              {states.map(([stateId, destsInState]) => (
                <div key={stateId}>
                  <h3 className="text-sm font-semibold uppercase tracking-[0.08em] text-muted-foreground/70 mb-3 capitalize">
                    {stateId.replace(/-/g, " ")} · {destsInState.length}
                  </h3>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {destsInState.map((d) => (
                      <Link
                        key={d.id}
                        href={`/${locale}/destination/${d.id}`}
                        className="rounded-xl border border-border bg-card/40 p-4 hover:border-primary/40 transition-colors"
                      >
                        <div className="font-semibold">{d.name}</div>
                        {d.tagline && (
                          <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{d.tagline}</p>
                        )}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              Editorial is actively expanding this persona. Check back as the coverage grows, or
              browse <Link href={`/${locale}/explore`} className="underline hover:text-primary">all 505 destinations</Link>.
            </p>
          )}
        </section>

        {/* FAQ */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Frequently asked</h2>
          <div className="space-y-6">
            {config.faq.map((f, i) => (
              <div key={i} className="border-b border-border/50 pb-6 last:border-0">
                <h3 className="text-lg font-semibold mb-2">{f.q}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Cross-links to other personas */}
        <section className="rounded-2xl border border-border bg-card/40 p-6">
          <h2 className="text-lg font-semibold mb-4">Browse other personas</h2>
          <div className="flex flex-wrap gap-2">
            {PERSONA_ORDER.filter((p) => p !== persona).map((p) => (
              <Link
                key={p}
                href={`/${locale}/for/${p}`}
                className="rounded-full border border-border bg-background/40 px-3 py-1.5 text-xs font-medium hover:border-primary/40 hover:text-primary transition-colors"
              >
                {PERSONAS[p].label}
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
