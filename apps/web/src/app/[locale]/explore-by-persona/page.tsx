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
import { CinemaStyles } from "@/components/landing-cinema/cinema-styles";
import { Title } from "@/components/landing-cinema/editorial";
import { CinematicRelatedRail } from "@/components/cinematic-related-rail";

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
      ? "भारत के 491 स्थलों को 10 व्यक्तित्व श्रेणियों में फ़िल्टर करें। हर पिक वास्तविक डेटाबेस मिलान — कोई संपादकीय सूची नहीं।"
      : "Filter India's 505 destinations by the 10 personas that actually travel together — families, bikers, digital nomads, elderly, photographers, solo female, honeymooners, pilgrims, wellness, culinary. Every pick is a real database match, not a hand-curated listicle.",
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
    <div className="nakshiq-cinema" style={{ minHeight: "100vh" }}>
      <CinemaStyles />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
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
            EXPLORE · {String(PERSONA_ORDER.length).padStart(2, "0")} PERSONAS
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
            {isHindi ? "व्यक्तित्व के अनुसार भारत खोजें" : "Explore India by persona."}
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
            {isHindi
              ? "एक ही सूची में सबके लिए यात्रा नहीं होती। परिवार, बाइकर, एकल महिला यात्री — हर एक को अलग चाहिए।"
              : "Travel isn't one-size-fits-all. Families want medical access in range. Bikers want the passes. Solo female travelers want month-by-month safety. Ten personas, each with a dedicated hub and real database matching."}
          </p>
        </header>

        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
              gap: 1,
              background: "var(--hair)",
              border: "1px solid var(--hair)",
              marginBottom: 40,
            }}
          >
            {personaStats.map((p) => (
              <Link
                key={p.slug}
                href={`/${locale}/for/${p.slug}`}
                style={{
                  display: "block",
                  padding: 24,
                  background: "var(--paper)",
                  textDecoration: "none",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    justifyContent: "space-between",
                    gap: 8,
                    marginBottom: 10,
                  }}
                >
                  <h2
                    style={{
                      fontFamily: "var(--cinema-display)",
                      fontStyle: "italic",
                      fontWeight: 500,
                      fontSize: 24,
                      lineHeight: 1.15,
                      color: "var(--bone)",
                      margin: 0,
                    }}
                  >
                    {isHindi ? p.config.labelHindi : p.config.label}
                  </h2>
                  <span
                    style={{
                      flexShrink: 0,
                      fontFamily: "var(--cinema-mono)",
                      fontSize: 10,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: "var(--vermillion)",
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    {p.count} {p.count === 1 ? "dest" : "dests"}
                  </span>
                </div>
                <p
                  style={{
                    fontFamily: "var(--cinema-ui)",
                    fontSize: 13,
                    lineHeight: 1.5,
                    color: "var(--bone-dim)",
                    margin: "0 0 16px",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {isHindi ? p.config.taglineHindi : p.config.tagline}
                </p>
                {p.samples.length > 0 && (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {p.samples.map((s) => (
                      <span
                        key={s.id}
                        style={{
                          fontFamily: "var(--cinema-mono)",
                          fontSize: 10,
                          padding: "2px 8px",
                          border: "1px solid var(--hair)",
                          color: "var(--bone-faint)",
                        }}
                      >
                        {s.name}
                      </span>
                    ))}
                    {p.count > 3 && (
                      <span
                        style={{
                          fontFamily: "var(--cinema-mono)",
                          fontSize: 10,
                          color: "var(--bone-faint)",
                          alignSelf: "center",
                          marginLeft: 4,
                        }}
                      >
                        +{p.count - 3} more
                      </span>
                    )}
                  </div>
                )}
              </Link>
            ))}
          </div>

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
                margin: "0 0 12px",
              }}
            >
              {isHindi ? "मेल कैसे होता है" : "How the matching works"}
            </h2>
            <p
              style={{
                fontFamily: "var(--cinema-ui)",
                fontSize: 14,
                lineHeight: 1.7,
                color: "var(--bone-dim)",
                margin: "0 0 12px",
              }}
            >
              {isHindi
                ? "प्रत्येक स्थल के पास पहले से ही 6 व्यक्तित्व ब्लॉक (biker/nomad/family/elderly/solo_female/photographer) हैं जिनमें हर एक के लिए स्पष्ट GO/NO-GO निर्णय है।"
                : "Every destination already carries 6 persona blocks (biker / nomad / family / elderly / solo_female / photographer) with explicit GO or NO-GO verdicts written by the editorial team. We read those first, then keyword-match best_for_segments, then fall back to base attributes for edge cases. No hand-curated lists, no editorial favorites — deterministic filtering from verified data."}
            </p>
            <Link
              href={`/${locale}/methodology`}
              style={{
                fontFamily: "var(--cinema-mono)",
                fontSize: 11,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "var(--vermillion)",
                textDecoration: "underline",
                textUnderlineOffset: "3px",
              }}
            >
              {isHindi ? "पूरी कार्यप्रणाली पढ़ें →" : "Read the full methodology →"}
            </Link>
          </section>
        </div>
      </main>

      <CinematicRelatedRail />
      <Footer />
    </div>
  );
}
