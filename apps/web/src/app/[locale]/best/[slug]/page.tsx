import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";
import { CinemaStyles } from "@/components/landing-cinema/cinema-styles";
import { Title } from "@/components/landing-cinema/editorial";
import { CinematicRelatedRail } from "@/components/cinematic-related-rail";
import {
  PERSONAS,
  matchDestinationsForPersona,
  type DestRecord,
  type PersonaSlug,
} from "@/lib/personas";
import {
  parseBestSlug,
  PERSONA_COPY,
  PERSONA_MAPPING,
  EVERGREEN_CONFIG,
  MONTH_DISPLAY,
  BEST_PERSONA_ORDER,
  MONTH_SLUGS,
  EVERGREEN_SLUGS,
  buildMonthPersonaSlug,
  type BestPersonaKey,
  type MonthSlug,
} from "@/lib/best-pages";

export const revalidate = 604800; // 7d — content changes rarely; prewarm cron flushes month routes on rollover; /api/admin/revalidate covers ad-hoc edits
export const dynamicParams = true;

const BASE = "https://www.nakshiq.com";

export async function generateStaticParams() {
  return [];
}

type MonthScore = { destination_id: string; score: number | null; note: string | null; verdict: string | null; why_not: string | null; skip_reason: string | null };

type ResolvedSlug = {
  persona: BestPersonaKey;
  personaSlug: PersonaSlug;
  monthSlug: MonthSlug | null;
  monthNum: number | null;
  monthEn: string | null;
  monthHi: string | null;
  title: string;
  titleHindi: string;
  hookEn: string;
  hookHi: string;
  kind: "month-persona" | "evergreen";
};

function resolveSlug(slug: string): ResolvedSlug | null {
  const parsed = parseBestSlug(slug);
  if (!parsed) return null;

  if (parsed.kind === "evergreen") {
    const cfg = EVERGREEN_CONFIG[parsed.slug];
    const personaSlug = PERSONA_MAPPING[cfg.persona];
    return {
      persona: cfg.persona,
      personaSlug,
      monthSlug: null,
      monthNum: null,
      monthEn: null,
      monthHi: null,
      title: cfg.title,
      titleHindi: cfg.titleHindi,
      hookEn: cfg.hookEn,
      hookHi: cfg.hookHi,
      kind: "evergreen",
    };
  }

  const copy = PERSONA_COPY[parsed.persona];
  const month = MONTH_DISPLAY[parsed.month];
  return {
    persona: parsed.persona,
    personaSlug: PERSONA_MAPPING[parsed.persona],
    monthSlug: parsed.month,
    monthNum: month.num,
    monthEn: month.en,
    monthHi: month.hi,
    title: copy.catchHeadline.replace("{month}", month.en),
    titleHindi: copy.catchHeadlineHindi.replace("{month}", month.hi),
    hookEn: "Scored on weather, crowds, road conditions, and what the persona actually needs — not on stock photos.",
    hookHi: "मौसम, भीड़, सड़क, और इस यात्री-वर्ग की असली ज़रूरतों के आधार पर — तस्वीरों से नहीं।",
    kind: "month-persona",
  };
}

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

async function fetchPersonaCorpus(): Promise<DestRecord[]> {
  const supabase = getSupabase();
  if (!supabase) return [];

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

async function fetchMonthScores(monthNum: number, destIds: string[]): Promise<Map<string, MonthScore>> {
  const out = new Map<string, MonthScore>();
  if (!destIds.length) return out;
  const supabase = getSupabase();
  if (!supabase) return out;

  // Chunk the in() filter to keep URLs short.
  const CHUNK = 200;
  for (let i = 0; i < destIds.length; i += CHUNK) {
    const slice = destIds.slice(i, i + CHUNK);
    const { data } = await supabase
      .from("destination_months")
      .select("destination_id, score, note, verdict, why_not, skip_reason")
      .eq("month", monthNum)
      .in("destination_id", slice);
    for (const row of data ?? []) {
      const r = row as MonthScore;
      out.set(r.destination_id, r);
    }
  }
  return out;
}

function localizedName(d: { name?: string; translations?: unknown } | DestRecord, locale: string): string {
  const dd = d as unknown as { name?: string; translations?: { hi?: { name?: string } } };
  const fallback = dd.name ?? "";
  if (locale !== "hi") return fallback;
  return dd.translations?.hi?.name || fallback;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}): Promise<Metadata> {
  const { slug, locale } = await params;
  const resolved = resolveSlug(slug);
  if (!resolved) return {};

  const isHindi = locale === "hi";
  const title = isHindi ? resolved.titleHindi : resolved.title;
  const description = isHindi
    ? `${resolved.titleHindi} — सत्यापित स्कोर, ईमानदार चेतावनियाँ, बिना अनुग्रहित। 505 स्थलों में से चुने हुए।`
    : `${resolved.title} — verified scores, honest catches, no sponsored picks. Drawn from 505 destinations and ranked for what the trip actually needs.`;
  const canonicalUrl = `${BASE}/${locale}/best/${slug}`;

  return {
    title,
    description: description.slice(0, 160),
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: `${BASE}/en/best/${slug}`,
        hi: `${BASE}/hi/best/${slug}`,
        "x-default": `${BASE}/en/best/${slug}`,
      },
    },
    openGraph: {
      title,
      description,
      type: "article",
      url: canonicalUrl,
      siteName: "NakshIQ",
      locale: isHindi ? "hi_IN" : "en_IN",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function BestPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;
  const resolved = resolveSlug(slug);
  if (!resolved) notFound();

  const isHindi = locale === "hi";
  const personaConfig = PERSONAS[resolved.personaSlug];
  if (!personaConfig) notFound();

  const all = await fetchPersonaCorpus();
  const personaMatches = matchDestinationsForPersona(personaConfig, all);

  const monthScores = resolved.monthNum
    ? await fetchMonthScores(resolved.monthNum, personaMatches.map((d) => d.id))
    : new Map<string, MonthScore>();

  type Ranked = { dest: DestRecord; score: number | null; note: string | null; verdict: string | null; why_not: string | null; skip_reason: string | null };
  const ranked: Ranked[] = personaMatches.map((d) => {
    const ms = monthScores.get(d.id);
    return {
      dest: d,
      score: ms?.score ?? null,
      note: ms?.note ?? null,
      verdict: ms?.verdict ?? null,
      why_not: ms?.why_not ?? null,
      skip_reason: ms?.skip_reason ?? null,
    };
  });

  if (resolved.monthNum) {
    ranked.sort((a, b) => {
      const sa = a.score ?? -1;
      const sb = b.score ?? -1;
      if (sb !== sa) return sb - sa;
      return a.dest.name.localeCompare(b.dest.name);
    });
  }

  const tier5 = ranked.filter((r) => (r.score ?? 0) === 5);
  const tier4 = ranked.filter((r) => (r.score ?? 0) === 4);
  const tier3 = ranked.filter((r) => (r.score ?? 0) === 3);
  const skips = ranked.filter((r) => r.score !== null && r.score <= 2);

  const totalMatched = personaMatches.length;
  const monthVerdictCount = resolved.monthNum
    ? ranked.filter((r) => r.score !== null && r.score >= 4).length
    : totalMatched;

  const pageUrl = `${BASE}/${locale}/best/${slug}`;

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: isHindi ? "होम" : "Home", item: `${BASE}/${locale}` },
      { "@type": "ListItem", position: 2, name: isHindi ? "सुझाव" : "Picks", item: `${BASE}/${locale}/best/places-for-couples-in-india` },
      { "@type": "ListItem", position: 3, name: isHindi ? resolved.titleHindi : resolved.title, item: pageUrl },
    ],
  };

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${pageUrl}#article`,
    headline: isHindi ? resolved.titleHindi : resolved.title,
    description: isHindi ? resolved.hookHi : resolved.hookEn,
    author: { "@id": `${BASE}#organization` },
    publisher: { "@id": `${BASE}#organization` },
    inLanguage: isHindi ? "hi-IN" : "en-IN",
    isPartOf: { "@id": `${BASE}#website` },
    mainEntityOfPage: pageUrl,
    url: pageUrl,
  };

  const topPicks = [...tier5, ...tier4].slice(0, 20);
  const itemListLd = topPicks.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${pageUrl}#picks`,
    numberOfItems: topPicks.length,
    itemListOrder: "https://schema.org/ItemListOrderDescending",
    itemListElement: topPicks.map((r, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      item: {
        "@type": "TouristDestination",
        name: r.dest.name,
        url: `${BASE}/${locale}/destination/${r.dest.id}${resolved.monthSlug ? `/${resolved.monthSlug}` : ""}`,
      },
    })),
  } : null;

  const overlineEn = resolved.kind === "month-persona"
    ? `In ${resolved.monthEn} · ${PERSONA_COPY[resolved.persona].label}`
    : `Verdict · ${PERSONA_COPY[resolved.persona].label}`;
  const overlineHi = resolved.kind === "month-persona"
    ? `${resolved.monthHi} में · ${PERSONA_COPY[resolved.persona].labelHindi}`
    : `सत्यापित · ${PERSONA_COPY[resolved.persona].labelHindi}`;

  return (
    <div className="nakshiq-cinema" style={{ minHeight: "100vh" }}>
      <CinemaStyles />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      {itemListLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }} />
      )}
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
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              fontSize: 12,
            }}
          >
            {isHindi ? overlineHi : overlineEn}
          </p>
          <Title
            as="h1"
            className="nq-display"
            style={{
              fontFamily: "var(--cinema-display)",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "clamp(32px, 5.4vw, 64px)",
              lineHeight: 1.05,
              letterSpacing: "-0.022em",
              margin: 0,
              textWrap: "balance",
            }}
          >
            {isHindi ? resolved.titleHindi : resolved.title}.
          </Title>
          <p
            style={{
              fontFamily: "var(--cinema-display)",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "clamp(17px, 1.8vw, 22px)",
              lineHeight: 1.4,
              color: "var(--bone-dim)",
              marginTop: 22,
              maxWidth: 720,
            }}
          >
            {isHindi ? resolved.hookHi : resolved.hookEn}
          </p>

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
            {resolved.kind === "month-persona"
              ? (isHindi
                  ? `${monthVerdictCount} स्थल — ${totalMatched} में से जो ${PERSONA_COPY[resolved.persona].labelHindi} के लिए सटीक हैं — ${resolved.monthHi} में 8/10 या उससे ऊपर का स्कोर रखते हैं।`
                  : `${monthVerdictCount} destinations — out of ${totalMatched} that fit ${PERSONA_COPY[resolved.persona].nounPhrase} — score 8/10 or higher for ${resolved.monthEn}.`)
              : (isHindi
                  ? `${totalMatched} स्थल भारत भर में हमारी सत्यापित सूची से ${PERSONA_COPY[resolved.persona].labelHindi} के लिए मेल खाते हैं।`
                  : `${totalMatched} destinations across India match ${PERSONA_COPY[resolved.persona].nounPhrase} from NakshIQ's verified corpus.`)}
          </p>
        </header>

        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          {resolved.kind === "month-persona" ? (
            <MonthPersonaBody
              tier5={tier5}
              tier4={tier4}
              tier3={tier3}
              skips={skips}
              locale={locale}
              monthSlug={resolved.monthSlug!}
              monthEn={resolved.monthEn!}
              monthHi={resolved.monthHi!}
              persona={resolved.persona}
            />
          ) : (
            <EvergreenBody
              matches={personaMatches}
              locale={locale}
              persona={resolved.persona}
            />
          )}

          <RelatedSection
            locale={locale}
            persona={resolved.persona}
            monthSlug={resolved.monthSlug}
            currentSlug={slug}
          />
        </div>
      </main>

      <CinematicRelatedRail />
      <Footer />
    </div>
  );
}

function MonthPersonaBody({
  tier5,
  tier4,
  tier3,
  skips,
  locale,
  monthSlug,
  monthEn,
  monthHi,
  persona,
}: {
  tier5: Array<{ dest: DestRecord; score: number | null; note: string | null; verdict: string | null; why_not: string | null; skip_reason: string | null }>;
  tier4: Array<{ dest: DestRecord; score: number | null; note: string | null; verdict: string | null; why_not: string | null; skip_reason: string | null }>;
  tier3: Array<{ dest: DestRecord; score: number | null; note: string | null; verdict: string | null; why_not: string | null; skip_reason: string | null }>;
  skips: Array<{ dest: DestRecord; score: number | null; note: string | null; verdict: string | null; why_not: string | null; skip_reason: string | null }>;
  locale: string;
  monthSlug: string;
  monthEn: string;
  monthHi: string;
  persona: BestPersonaKey;
}) {
  const isHindi = locale === "hi";
  const hasPicks = tier5.length + tier4.length + tier3.length > 0;

  if (!hasPicks) {
    return (
      <section style={{ marginBottom: 56 }}>
        <h2 style={sectionTitleStyle}>{isHindi ? "इस महीने कोई सीधा सुझाव नहीं" : `Nothing we'd send you for ${PERSONA_COPY[persona].nounPhrase} in ${monthEn}`}</h2>
        <p style={pStyle}>
          {isHindi
            ? `${monthHi} में ${PERSONA_COPY[persona].labelHindi} के लिए कोई स्थल 6/10 या उससे ऊपर का स्कोर नहीं रखता। यह ईमानदार चेतावनी है — ब्रोशर के विपरीत।`
            : `No destination scored 6/10 or higher in ${monthEn} for ${PERSONA_COPY[persona].nounPhrase}. That's the honest call — listicles will tell you otherwise.`}
        </p>
        <p style={{ ...pStyle, marginTop: 12 }}>
          {isHindi ? "बेहतर महीने देखें:" : "Try a different month:"}{" "}
          <Link href={`/${locale}/explore-by-persona`} style={linkStyle}>
            {isHindi ? "व्यक्तित्व के अनुसार खोजें" : "Browse by persona"}
          </Link>
        </p>
      </section>
    );
  }

  return (
    <>
      {tier5.length > 0 && (
        <ScoreTier
          tier="10/10"
          label={isHindi ? `${tier5.length} सीधा हाँ — 10/10 स्कोर` : `${tier5.length} clear yes — 10/10`}
          items={tier5}
          locale={locale}
          monthSlug={monthSlug}
        />
      )}
      {tier4.length > 0 && (
        <ScoreTier
          tier="8/10"
          label={isHindi ? `${tier4.length} योग्य — 8/10 स्कोर` : `${tier4.length} works with caveats — 8/10`}
          items={tier4}
          locale={locale}
          monthSlug={monthSlug}
        />
      )}
      {tier3.length > 0 && (
        <ScoreTier
          tier="6/10"
          label={isHindi ? `${tier3.length} सीमित विकल्प — 6/10` : `${tier3.length} thin pick — 6/10`}
          items={tier3}
          locale={locale}
          monthSlug={monthSlug}
        />
      )}
      {skips.length > 0 && (
        <section style={{ marginBottom: 56 }}>
          <h2 style={sectionTitleStyle}>
            {isHindi ? `${skips.length} स्थल — इस महीने न जाएँ` : `${skips.length} to skip this month`}
          </h2>
          <p style={{ ...pStyle, marginBottom: 20 }}>
            {isHindi
              ? "ये स्थल वर्ष भर इस वर्ग के लिए सही हैं — पर इस महीने नहीं। यहाँ कारण:"
              : "These fit the persona year-round but not this month. Here's why:"}
          </p>
          <div style={gridStyle}>
            {skips.slice(0, 18).map((r) => (
              <Link
                key={r.dest.id}
                href={`/${locale}/destination/${r.dest.id}/${monthSlug}`}
                style={cardLinkStyle}
              >
                <p style={cardTitleStyle}>{r.dest.name}</p>
                {(r.skip_reason || r.why_not) && (
                  <p style={cardSubStyle}>{r.skip_reason || r.why_not}</p>
                )}
              </Link>
            ))}
          </div>
        </section>
      )}
    </>
  );
}

function ScoreTier({
  tier,
  label,
  items,
  locale,
  monthSlug,
}: {
  tier: string;
  label: string;
  items: Array<{ dest: DestRecord; score: number | null; note: string | null; verdict: string | null; why_not: string | null; skip_reason: string | null }>;
  locale: string;
  monthSlug: string;
}) {
  return (
    <section style={{ marginBottom: 48 }}>
      <p
        className="nq-kicker"
        style={{
          color: "var(--vermillion)",
          marginBottom: 12,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          fontSize: 12,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        Score {tier}
      </p>
      <h2 style={sectionTitleStyle}>{label}</h2>
      <div style={{ ...gridStyle, marginTop: 20 }}>
        {items.map((r) => (
          <Link
            key={r.dest.id}
            href={`/${locale}/destination/${r.dest.id}/${monthSlug}`}
            style={cardLinkStyle}
          >
            <p style={cardTitleStyle}>{localizedName(r.dest, locale)}</p>
            {r.verdict && <p style={cardVerdictStyle}>{r.verdict}</p>}
            {!r.verdict && r.dest.tagline && <p style={cardSubStyle}>{r.dest.tagline}</p>}
          </Link>
        ))}
      </div>
    </section>
  );
}

function EvergreenBody({
  matches,
  locale,
  persona,
}: {
  matches: DestRecord[];
  locale: string;
  persona: BestPersonaKey;
}) {
  const isHindi = locale === "hi";

  const byState = new Map<string, DestRecord[]>();
  for (const d of matches) {
    const s = d.state_id ?? "unknown";
    if (!byState.has(s)) byState.set(s, []);
    byState.get(s)!.push(d);
  }
  const states = Array.from(byState.entries()).sort((a, b) => b[1].length - a[1].length);

  if (matches.length === 0) {
    return (
      <section style={{ marginBottom: 56 }}>
        <h2 style={sectionTitleStyle}>{isHindi ? "कोई मेल नहीं" : "No matches yet"}</h2>
        <p style={pStyle}>
          {isHindi
            ? `इस श्रेणी में कोई स्थल अभी मेल नहीं खाता। ${PERSONA_COPY[persona].labelHindi} के लिए हमारी संपूर्ण सूची देखें।`
            : `No destinations currently match this filter. See the full ${PERSONA_COPY[persona].label} hub instead.`}
        </p>
      </section>
    );
  }

  return (
    <section style={{ marginBottom: 56 }}>
      <h2 style={sectionTitleStyle}>
        {isHindi ? `${matches.length} मिलान स्थल` : `${matches.length} matching destinations`}
      </h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 32, marginTop: 24 }}>
        {states.map(([stateId, destsInState]) => (
          <div key={stateId}>
            <p
              className="nq-kicker"
              style={{
                color: "var(--vermillion)",
                marginBottom: 12,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                fontSize: 12,
              }}
            >
              {stateId.replace(/-/g, " ")} · {destsInState.length}
            </p>
            <div style={gridStyle}>
              {destsInState.map((d) => (
                <Link
                  key={d.id}
                  href={`/${locale}/destination/${d.id}`}
                  style={cardLinkStyle}
                >
                  <p style={cardTitleStyle}>{localizedName(d, locale)}</p>
                  {d.tagline && <p style={cardSubStyle}>{d.tagline}</p>}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function RelatedSection({
  locale,
  persona,
  monthSlug,
  currentSlug,
}: {
  locale: string;
  persona: BestPersonaKey;
  monthSlug: MonthSlug | null;
  currentSlug: string;
}) {
  const isHindi = locale === "hi";

  const otherMonths = monthSlug
    ? MONTH_SLUGS.filter((m) => m !== monthSlug).slice(0, 6)
    : [];
  const otherPersonas = BEST_PERSONA_ORDER.filter((p) => p !== persona);

  return (
    <section style={{ marginBottom: 48, borderTop: "1px solid var(--hair)", paddingTop: 32 }}>
      <h2 style={{ ...sectionTitleStyle, fontSize: 24 }}>
        {isHindi ? "और देखें" : "Related"}
      </h2>

      {monthSlug && (
        <div style={{ marginBottom: 24 }}>
          <p
            className="nq-kicker"
            style={{
              color: "var(--vermillion)",
              marginBottom: 10,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              fontSize: 11,
            }}
          >
            {isHindi
              ? `${PERSONA_COPY[persona].labelHindi} — अन्य महीने`
              : `${PERSONA_COPY[persona].label} — other months`}
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {otherMonths.map((m) => {
              const slug = buildMonthPersonaSlug(m, persona);
              if (slug === currentSlug) return null;
              return (
                <Link key={m} href={`/${locale}/best/${slug}`} style={chipLinkStyle}>
                  {isHindi ? MONTH_DISPLAY[m].hi : MONTH_DISPLAY[m].en}
                </Link>
              );
            })}
          </div>
        </div>
      )}

      <div>
        <p
          className="nq-kicker"
          style={{
            color: "var(--vermillion)",
            marginBottom: 10,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            fontSize: 11,
          }}
        >
          {monthSlug
            ? (isHindi ? `${MONTH_DISPLAY[monthSlug].hi} में — अन्य यात्री-वर्ग` : `In ${MONTH_DISPLAY[monthSlug].en} — other personas`)
            : (isHindi ? "अन्य यात्री-वर्ग" : "Other personas")}
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {otherPersonas.map((p) => {
            const slug = monthSlug
              ? buildMonthPersonaSlug(monthSlug, p)
              : evergreenSlugFor(p);
            if (!slug) return null;
            return (
              <Link key={p} href={`/${locale}/best/${slug}`} style={chipLinkStyle}>
                {isHindi ? PERSONA_COPY[p].labelHindi : PERSONA_COPY[p].label}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function evergreenSlugFor(persona: BestPersonaKey): string | null {
  for (const slug of EVERGREEN_SLUGS) {
    if (EVERGREEN_CONFIG[slug].persona === persona) return slug;
  }
  return null;
}

const sectionTitleStyle: React.CSSProperties = {
  fontFamily: "var(--cinema-display)",
  fontStyle: "italic",
  fontWeight: 500,
  fontSize: 28,
  lineHeight: 1.15,
  color: "var(--bone)",
  margin: "0 0 16px",
};

const pStyle: React.CSSProperties = {
  fontFamily: "var(--cinema-ui)",
  fontSize: 14,
  lineHeight: 1.7,
  color: "var(--bone-dim)",
  margin: 0,
};

const gridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
  gap: 1,
  background: "var(--hair)",
  border: "1px solid var(--hair)",
};

const cardLinkStyle: React.CSSProperties = {
  display: "block",
  padding: 16,
  background: "var(--paper)",
  textDecoration: "none",
};

const cardTitleStyle: React.CSSProperties = {
  fontFamily: "var(--cinema-display)",
  fontStyle: "italic",
  fontWeight: 500,
  fontSize: 18,
  color: "var(--bone)",
  margin: "0 0 4px",
};

const cardSubStyle: React.CSSProperties = {
  fontFamily: "var(--cinema-ui)",
  fontSize: 12,
  lineHeight: 1.5,
  color: "var(--bone-dim)",
  margin: 0,
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
};

const cardVerdictStyle: React.CSSProperties = {
  ...cardSubStyle,
  color: "var(--bone)",
  fontFamily: "var(--cinema-ui)",
  fontSize: 13,
};

const linkStyle: React.CSSProperties = {
  color: "var(--vermillion)",
  textDecoration: "underline",
  textUnderlineOffset: "3px",
};

const chipLinkStyle: React.CSSProperties = {
  display: "inline-block",
  padding: "6px 12px",
  background: "var(--paper)",
  border: "1px solid var(--hair)",
  textDecoration: "none",
  fontFamily: "var(--cinema-ui)",
  fontSize: 13,
  color: "var(--bone)",
};
