import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { createClient } from "@supabase/supabase-js";
import { localeAlternates } from "@/lib/seo-utils";
import {
  PERSONAS,
  PERSONA_ORDER,
  matchDestinationsForPersona,
  type DestRecord,
} from "@/lib/personas";

export const revalidate = 3600;

const BASE_URL = "https://www.nakshiq.com";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isHindi = locale === "hi";
  return {
    title: isHindi
      ? "व्यक्तित्व के अनुसार भारत यात्रा — परिवार, बाइकर, हनीमून, और अधिक"
      : "Explore India by persona — families, bikers, honeymooners, and more",
    description: isHindi
      ? "भारत के 488 स्थलों को 10 व्यक्तित्व श्रेणियों में फ़िल्टर करें। हर पिक वास्तविक डेटाबेस मिलान — कोई संपादकीय सूची नहीं।"
      : "Filter India's 488 destinations by the 10 personas that actually travel together — families, bikers, digital nomads, elderly, photographers, solo female, honeymooners, pilgrims, wellness, culinary. Every pick is a real database match, not a hand-curated listicle.",
    ...localeAlternates(locale, "/explore-by-persona"),
  };
}

async function fetchDestinations(): Promise<DestRecord[]> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return [];

  const supabase = createClient(url, key);
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

export default async function ExploreByPersonaPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isHindi = locale === "hi";

  const all = await fetchDestinations();

  // Compute counts + sample dests per persona
  const personaStats = PERSONA_ORDER.map((slug) => {
    const config = PERSONAS[slug];
    const matched = matchDestinationsForPersona(config, all);
    return {
      slug,
      config,
      count: matched.length,
      samples: matched.slice(0, 3),
    };
  });

  const pageUrl = `${BASE_URL}/${locale}/explore-by-persona`;

  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${pageUrl}#personas`,
    name: "Explore India by persona",
    numberOfItems: PERSONA_ORDER.length,
    itemListElement: personaStats.map((p, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      item: {
        "@type": "WebPage",
        name: p.config.label,
        url: `${BASE_URL}/${locale}/for/${p.slug}`,
        description: p.config.tagline,
      },
    })),
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${BASE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: "Explore by persona", item: pageUrl },
    ],
  };

  return (
    <div className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <Nav />
      <main className="mx-auto max-w-5xl px-4 py-12">
        <div className="mb-6 text-sm text-muted-foreground">
          <Link href={`/${locale}`} className="hover:text-foreground">NakshIQ</Link>
          {" → "}
          <span className="text-foreground">{isHindi ? "व्यक्तित्व के अनुसार खोजें" : "Explore by persona"}</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-semibold mb-3">
          {isHindi ? "व्यक्तित्व के अनुसार भारत खोजें" : "Explore India by persona"}
        </h1>
        <p className="text-lg text-muted-foreground mb-4 leading-relaxed max-w-3xl">
          {isHindi
            ? "एक ही सूची में सबके लिए यात्रा नहीं होती। परिवार, बाइकर, एकल महिला यात्री — हर एक को अलग चाहिए।"
            : "Travel isn't one-size-fits-all. Families want medical access in range. Bikers want the passes. Solo female travelers want month-by-month safety. Ten personas, each with a dedicated hub and real database matching."}
        </p>
        <p className="text-sm text-muted-foreground/80 mb-10 max-w-3xl">
          {isHindi
            ? "हर पिक वास्तविक डेटाबेस मिलान है — persona_blocks, best_for_segments, या kids_friendly फ़ील्ड से। कोई हाथ-क्यूरेटेड सूची नहीं, कोई संपादकीय पक्षपात नहीं।"
            : "Every match is sourced from real destination data — persona_blocks JSONB verdicts, best_for_segments keyword matching, or base attributes. No hand-curated listicles. See methodology for how we filter."}
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          {personaStats.map((p) => (
            <Link
              key={p.slug}
              href={`/${locale}/for/${p.slug}`}
              className="block rounded-2xl border border-border bg-card/40 p-6 hover:border-primary/50 transition-colors"
            >
              <div className="flex items-baseline justify-between gap-2 mb-2">
                <h2 className="text-xl font-semibold">{isHindi ? p.config.labelHindi : p.config.label}</h2>
                <span className="shrink-0 text-xs font-mono tracking-[0.08em] uppercase text-muted-foreground">
                  {p.count} {p.count === 1 ? "dest" : "dests"}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed line-clamp-2">
                {isHindi ? p.config.taglineHindi : p.config.tagline}
              </p>
              {p.samples.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {p.samples.map((s) => (
                    <span
                      key={s.id}
                      className="rounded-full border border-border/60 bg-background/40 px-2 py-0.5 text-[11px] text-muted-foreground"
                    >
                      {s.name}
                    </span>
                  ))}
                  {p.count > 3 && (
                    <span className="text-[11px] text-muted-foreground/70 self-center">+{p.count - 3} more</span>
                  )}
                </div>
              )}
            </Link>
          ))}
        </div>

        <section className="mt-12 rounded-2xl border border-border bg-card/40 p-6">
          <h2 className="text-lg font-semibold mb-2">
            {isHindi ? "मेल कैसे होता है" : "How the matching works"}
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-3">
            {isHindi
              ? "प्रत्येक स्थल के पास पहले से ही 6 व्यक्तित्व ब्लॉक (biker/nomad/family/elderly/solo_female/photographer) हैं जिनमें हर एक के लिए स्पष्ट GO/NO-GO निर्णय है। हम उन ब्लॉकों को पहले पढ़ते हैं, फिर best_for_segments में कीवर्ड मिलान, फिर बेस विशेषताएँ (बच्चे-अनुकूलता, कठिनाई, ऊँचाई)।"
              : "Every destination already carries 6 persona blocks (biker / nomad / family / elderly / solo_female / photographer) with explicit GO or NO-GO verdicts written by the editorial team. We read those first, then keyword-match best_for_segments, then fall back to base attributes (kids rating, difficulty, elevation) for edge cases. No hand-curated lists, no editorial favorites — just deterministic filtering from verified data."}
          </p>
          <Link
            href={`/${locale}/methodology`}
            className="text-sm font-medium text-primary underline underline-offset-4 hover:text-primary/80"
          >
            {isHindi ? "पूरी कार्यप्रणाली पढ़ें →" : "Read the full methodology →"}
          </Link>
        </section>
      </main>
      <Footer />
    </div>
  );
}
