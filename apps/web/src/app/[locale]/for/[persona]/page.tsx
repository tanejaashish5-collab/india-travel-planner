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
import { CinemaStyles } from "@/components/landing-cinema/cinema-styles";
import { Title } from "@/components/landing-cinema/editorial";
import { CinematicRelatedRail } from "@/components/cinematic-related-rail";

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

  const heroStat = computeHeroStat(persona as PersonaSlug, all, matched);

  const pageUrl = `${BASE_URL}/${locale}/for/${persona}`;

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

  const byState = new Map<string, DestRecord[]>();
  for (const d of matched) {
    const s = d.state_id ?? "unknown";
    if (!byState.has(s)) byState.set(s, []);
    byState.get(s)!.push(d);
  }
  const states = Array.from(byState.entries()).sort((a, b) => b[1].length - a[1].length);

  return (
    <div className="nakshiq-cinema" style={{ minHeight: "100vh" }}>
      <CinemaStyles />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <Nav />

      <main
        id="main-content"
        className="nq-grain"
        style={{ position: "relative", padding: "140px 24px 64px" }}
      >
        <header style={{ maxWidth: 900, margin: "0 auto 48px" }}>
          <p
            className="nq-kicker"
            style={{
              color: "var(--vermillion)",
              marginBottom: 20,
              letterSpacing: "0.22em",
            }}
          >
            FOR · {config.label.toUpperCase()} · {String(matched.length).padStart(3, "0")} DESTINATIONS
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
            {isHindi ? config.titleHindi : config.title}.
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
            {isHindi ? config.taglineHindi : config.tagline}
          </p>
          <p
            style={{
              fontFamily: "var(--cinema-ui)",
              fontSize: 14,
              lineHeight: 1.7,
              color: "var(--bone-dim)",
              marginTop: 16,
              maxWidth: 720,
            }}
          >
            {config.description}
          </p>

          {heroStat && (
            <p
              style={{
                fontFamily: "var(--cinema-ui)",
                fontSize: 14,
                lineHeight: 1.7,
                color: "var(--bone)",
                marginTop: 24,
                paddingLeft: 16,
                borderLeft: "2px solid var(--vermillion)",
                maxWidth: 720,
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {heroStat}
            </p>
          )}
        </header>

        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 1,
              background: "var(--hair)",
              border: "1px solid var(--hair)",
              marginBottom: 56,
            }}
          >
            <div style={{ padding: 20, background: "var(--paper)" }}>
              <p
                style={{
                  fontFamily: "var(--cinema-mono)",
                  fontSize: 10,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "var(--bone-faint)",
                  margin: 0,
                }}
              >
                Destinations matched
              </p>
              <p
                style={{
                  fontFamily: "var(--cinema-display)",
                  fontStyle: "italic",
                  fontWeight: 500,
                  fontSize: 36,
                  color: "var(--bone)",
                  margin: "4px 0 0",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {matched.length}
              </p>
            </div>
            <div style={{ padding: 20, background: "var(--paper)" }}>
              <p
                style={{
                  fontFamily: "var(--cinema-mono)",
                  fontSize: 10,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "var(--bone-faint)",
                  margin: 0,
                }}
              >
                States covered
              </p>
              <p
                style={{
                  fontFamily: "var(--cinema-display)",
                  fontStyle: "italic",
                  fontWeight: 500,
                  fontSize: 36,
                  color: "var(--bone)",
                  margin: "4px 0 0",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {states.length}
              </p>
            </div>
          </div>

          <section style={{ marginBottom: 56 }}>
            <h2
              style={{
                fontFamily: "var(--cinema-display)",
                fontStyle: "italic",
                fontWeight: 500,
                fontSize: 32,
                lineHeight: 1.1,
                color: "var(--bone)",
                margin: "0 0 24px",
              }}
            >
              {matched.length > 0
                ? (isHindi ? `${matched.length} मिलान स्थल` : `${matched.length} matching destinations`)
                : (isHindi ? "कोई स्थल मेल नहीं खाता" : "No destinations currently match this persona")}
            </h2>

            {states.length > 0 ? (
              <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
                {states.map(([stateId, destsInState]) => (
                  <div key={stateId}>
                    <p
                      className="nq-kicker"
                      style={{
                        color: "var(--vermillion)",
                        marginBottom: 12,
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                      }}
                    >
                      {stateId.replace(/-/g, " ")} · {destsInState.length}
                    </p>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
                        gap: 1,
                        background: "var(--hair)",
                        border: "1px solid var(--hair)",
                      }}
                    >
                      {destsInState.map((d) => (
                        <Link
                          key={d.id}
                          href={`/${locale}/destination/${d.id}`}
                          style={{
                            display: "block",
                            padding: 16,
                            background: "var(--paper)",
                            textDecoration: "none",
                          }}
                        >
                          <p
                            style={{
                              fontFamily: "var(--cinema-display)",
                              fontStyle: "italic",
                              fontWeight: 500,
                              fontSize: 18,
                              color: "var(--bone)",
                              margin: "0 0 4px",
                            }}
                          >
                            {d.name}
                          </p>
                          {d.tagline && (
                            <p
                              style={{
                                fontFamily: "var(--cinema-ui)",
                                fontSize: 12,
                                lineHeight: 1.5,
                                color: "var(--bone-dim)",
                                margin: 0,
                                display: "-webkit-box",
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: "vertical",
                                overflow: "hidden",
                              }}
                            >
                              {d.tagline}
                            </p>
                          )}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p
                style={{
                  fontFamily: "var(--cinema-ui)",
                  fontSize: 14,
                  color: "var(--bone-dim)",
                  margin: 0,
                }}
              >
                Editorial is actively expanding this persona. Check back as coverage grows, or
                browse{" "}
                <Link
                  href={`/${locale}/explore`}
                  style={{ color: "var(--vermillion)", textDecoration: "underline", textUnderlineOffset: "3px" }}
                >
                  all 505 destinations
                </Link>
                .
              </p>
            )}
          </section>

          <section style={{ marginBottom: 48 }}>
            <h2
              style={{
                fontFamily: "var(--cinema-display)",
                fontStyle: "italic",
                fontWeight: 500,
                fontSize: 32,
                lineHeight: 1.1,
                color: "var(--bone)",
                margin: "0 0 24px",
              }}
            >
              Frequently asked
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              {config.faq.map((f, i) => (
                <div
                  key={i}
                  style={{
                    paddingTop: i === 0 ? 0 : 16,
                    borderTop: i === 0 ? "none" : "1px solid var(--hair)",
                  }}
                >
                  <h3
                    style={{
                      fontFamily: "var(--cinema-display)",
                      fontStyle: "italic",
                      fontWeight: 500,
                      fontSize: 19,
                      lineHeight: 1.3,
                      color: "var(--bone)",
                      margin: "0 0 8px",
                    }}
                  >
                    {f.q}
                  </h3>
                  <p
                    style={{
                      fontFamily: "var(--cinema-ui)",
                      fontSize: 14,
                      lineHeight: 1.7,
                      color: "var(--bone-dim)",
                      margin: 0,
                    }}
                  >
                    {f.a}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section
            style={{
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
                margin: "0 0 16px",
              }}
            >
              Browse other personas
            </h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {PERSONA_ORDER.filter((p) => p !== persona).map((p) => (
                <Link
                  key={p}
                  href={`/${locale}/for/${p}`}
                  style={{
                    fontFamily: "var(--cinema-mono)",
                    fontSize: 11,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    padding: "6px 12px",
                    border: "1px solid var(--hair)",
                    color: "var(--bone-dim)",
                    textDecoration: "none",
                  }}
                >
                  {PERSONAS[p].label}
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>

      <CinematicRelatedRail />
      <Footer />
    </div>
  );
}
