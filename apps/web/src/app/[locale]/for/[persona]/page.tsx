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
        <p className="text-sm text-muted-foreground/90 mb-10 leading-relaxed max-w-3xl">
          {config.description}
        </p>

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
              browse <Link href={`/${locale}/explore`} className="underline hover:text-primary">all 488 destinations</Link>.
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
