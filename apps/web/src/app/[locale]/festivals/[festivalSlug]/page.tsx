import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { createClient } from "@supabase/supabase-js";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { CinemaStyles } from "@/components/landing-cinema/cinema-styles";
import { Title } from "@/components/landing-cinema/editorial";
import { CinematicHeroParallax } from "@/components/cinematic-hero-parallax";
import { CinematicRelatedRail } from "@/components/cinematic-related-rail";
import { WeatherWidget } from "@/components/weather-widget";
import { localeAlternates } from "@/lib/seo-utils";
import { singleFestivalEventJsonLd, type FestivalRow } from "@/lib/festival-schema";
import { buildFestivalSlugMap, collidingBaseSlugs, festivalsForBaseSlug, type FestivalSlugRow } from "@/lib/festival-slug";
import { getCachedFestivalSlugRows, getCachedFestivalRows } from "@/lib/cached-data";
import { FestivalDisambiguation, type FestivalVariant } from "@/components/festival-disambiguation";
import { festivalHeroSrc, festivalHeroCredit, festivalHeroPhotoSrc, festivalHeroPhotoCredit } from "@/lib/festival-heroes";
import { destinationImage } from "@/lib/image-url";
import { videoObjectJsonLd } from "@/lib/video-schema";
import { formatScoreInline } from "@itp/shared";

// Per-festival detail page. 331 festivals × 2 locales ≈ 662 indexed URLs.
// Path A enrichment (2026-05-23): each page is a festival LENS on the host
// destination — pulls month-score, stays, eateries, POIs, other festivals,
// travel facts, live weather. Zero fabrication: every joined field is
// already verified data. Slugs collision-aware (lib/festival-slug.ts).

export const revalidate = 86400;
export const dynamicParams = true;

const MONTHS_LONG = [
  "", "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

type DestinationRow = {
  id: string;
  name: string;
  elevation_m: number | null;
  nearest_airport: string | null;
  nearest_railhead: string | null;
  tagline: string | null;
  why_special: string | null;
  hero_image_url: string | null;
};

type MonthRow = {
  month: number;
  score: number | null;
  verdict: string | null;
  why_go: string | null;
  why_not: string | null;
  prose_lead: string | null;
};

type StayRow = {
  id: string;
  name: string;
  type: string | null;
  location: string | null;
  why_special: string | null;
  price_range: string | null;
  best_for: string | null;
};

type EateryRow = {
  id: string;
  name: string;
  area: string | null;
  signature_dish: string | null;
  why_it_matters: string | null;
  insider_tip: string | null;
  is_legendary: boolean | null;
  price_range: string | null;
};

type PoiRow = {
  id: string;
  name: string;
  type: string | null;
  description: string | null;
  time_needed: string | null;
};

type OtherFestivalRow = {
  id: string;
  name: string;
  month: number | null;
  approximate_date: string | null;
};

type FestivalDetailRow = FestivalRow & FestivalSlugRow & {
  destination_id: string | null;
  approximate_date: string | null;
  description: string | null;
  significance: string | null;
};

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

// Cached: every festival page needs the FULL row set to resolve its own
// collision-aware slug, so this was one full-table read per page (~720 per
// build) until 2026-08-11. See lib/cached-data.ts.
async function loadAllSlugs(): Promise<FestivalSlugRow[]> {
  return (await getCachedFestivalSlugRows()) as FestivalSlugRow[];
}

async function loadFestivalBySlug(slug: string): Promise<FestivalDetailRow | null> {
  const supabase = getSupabase();
  if (!supabase) return null;
  const allSlugs = await loadAllSlugs();
  const slugMap = buildFestivalSlugMap(allSlugs);
  const targetId = Array.from(slugMap.entries()).find(([, s]) => s === slug)?.[0];
  if (!targetId) return null;
  const { data } = await supabase
    .from("festivals")
    .select("id, destination_id, name, month, approximate_date, description, significance, destinations(name, state:states(name))")
    .eq("id", targetId)
    .single();
  return data ? (data as unknown as FestivalDetailRow) : null;
}

type EnrichedData = {
  destination: DestinationRow | null;
  month: MonthRow | null;
  stays: StayRow[];
  eateries: EateryRow[];
  pois: PoiRow[];
  otherFestivalsHere: OtherFestivalRow[];
  relatedSameMonth: OtherFestivalRow[];
};

async function loadEnriched(
  festivalId: string,
  destinationId: string | null,
  month: number,
): Promise<EnrichedData> {
  const supabase = getSupabase();
  if (!supabase || !destinationId) {
    return { destination: null, month: null, stays: [], eateries: [], pois: [], otherFestivalsHere: [], relatedSameMonth: [] };
  }

  const [destRes, monthRes, staysRes, eateriesRes, poisRes, otherHereRes, relatedMonthRes] = await Promise.all([
    supabase
      .from("destinations")
      .select("id, name, elevation_m, nearest_airport, nearest_railhead, tagline, why_special, hero_image_url")
      .eq("id", destinationId)
      .single(),
    supabase
      .from("destination_months")
      .select("month, score, verdict, why_go, why_not, prose_lead")
      .eq("destination_id", destinationId)
      .eq("month", month)
      .single(),
    supabase
      .from("local_stays")
      .select("id, name, type, location, why_special, price_range, best_for")
      .eq("destination_id", destinationId)
      .limit(3),
    supabase
      .from("local_eateries")
      .select("id, name, area, signature_dish, why_it_matters, insider_tip, is_legendary, price_range")
      .eq("destination_id", destinationId)
      .eq("is_active", true)
      .order("is_legendary", { ascending: false })
      .limit(4),
    supabase
      .from("points_of_interest")
      .select("id, name, type, description, time_needed")
      .eq("destination_id", destinationId)
      .limit(5),
    supabase
      .from("festivals")
      .select("id, name, month, approximate_date")
      .eq("destination_id", destinationId)
      .neq("id", festivalId)
      .order("month")
      .limit(6),
    supabase
      .from("festivals")
      .select("id, name, month, approximate_date, destination_id")
      .eq("month", month)
      .neq("id", festivalId)
      .neq("destination_id", destinationId)
      .limit(6),
  ]);

  return {
    destination: (destRes.data as DestinationRow | null) ?? null,
    month: (monthRes.data as MonthRow | null) ?? null,
    stays: (staysRes.data ?? []) as StayRow[],
    eateries: (eateriesRes.data ?? []) as EateryRow[],
    pois: (poisRes.data ?? []) as PoiRow[],
    otherFestivalsHere: (otherHereRes.data ?? []) as OtherFestivalRow[],
    relatedSameMonth: (relatedMonthRes.data ?? []) as OtherFestivalRow[],
  };
}

// A festival row carrying just enough to render a disambiguation card.
type FestivalVariantRow = FestivalSlugRow & {
  month: number | null;
  approximate_date: string | null;
  description: string | null;
  destinations?: { name?: string; state?: { name?: string } | { name?: string }[] }
    | { name?: string; state?: { name?: string } | { name?: string }[] }[]
    | null;
};

function firstOf<T>(v: T | T[] | null | undefined): T | undefined {
  return Array.isArray(v) ? v[0] : (v ?? undefined);
}

// Variants behind a bare colliding slug, e.g. "ganesh-chaturthi" -> 11 rows.
// Empty when the slug simply does not exist (a real 404).
async function loadFestivalVariants(base: string): Promise<FestivalVariant[]> {
  const rows = (await getCachedFestivalRows()) as unknown as FestivalVariantRow[];
  return festivalsForBaseSlug(rows, base)
    .map(({ row, slug }) => {
      const dest = firstOf(row.destinations);
      const state = firstOf(dest?.state);
      return {
        slug,
        name: row.name,
        destinationName: dest?.name ?? null,
        stateName: state?.name ?? null,
        monthLabel: row.month ? MONTHS_LONG[row.month] : null,
        approximateDate: row.approximate_date,
        description: row.description,
      };
    })
    .sort(
      (a, b) =>
        (a.destinationName ?? "").localeCompare(b.destinationName ?? ""),
    );
}

export async function generateStaticParams() {
  const rows = await loadAllSlugs();
  const slugMap = buildFestivalSlugMap(rows);
  // Bare colliding slugs are pre-rendered too — they are live, previously
  // indexed URLs that would otherwise 404 (see lib/festival-slug.ts).
  const slugs = new Set<string>([
    ...slugMap.values(),
    ...collidingBaseSlugs(rows),
  ]);
  return Array.from(slugs).map((festivalSlug) => ({ festivalSlug }));
}

export async function generateMetadata({
  params,
}: { params: Promise<{ locale: string; festivalSlug: string }> }): Promise<Metadata> {
  const { locale, festivalSlug } = await params;
  const f = await loadFestivalBySlug(festivalSlug);
  if (!f) {
    const variants = await loadFestivalVariants(festivalSlug);
    if (variants.length > 1) {
      const t = await getTranslations({ locale, namespace: "festivalDetail" });
      const fName = variants[0].name;
      return {
        title: t("hubTitleMeta", { name: fName, count: variants.length }),
        description: t("hubIntro", { name: fName, count: variants.length }),
        ...localeAlternates(locale, `/festivals/${festivalSlug}`),
      };
    }
    return {};
  }
  const destName = (() => {
    const d = f.destinations as { name?: string } | { name?: string }[] | null | undefined;
    if (Array.isArray(d)) return d[0]?.name;
    return d?.name;
  })();
  const dateLabel = f.approximate_date ?? MONTHS_LONG[f.month];
  const where = destName ? ` in ${destName}` : "";
  return {
    title: `${f.name} — ${dateLabel}${where}`,
    description: f.description
      ? f.description.length > 160
        ? `${f.description.slice(0, 157)}...`
        : f.description
      : `${f.name}, celebrated${where} during ${dateLabel}. Dates, location, where to stay, where to eat — everything for the trip.`,
    ...localeAlternates(locale, `/festivals/${festivalSlug}`),
  };
}

function clamp(s: string | null | undefined, max: number): string | null {
  if (!s) return null;
  if (s.length <= max) return s;
  return `${s.slice(0, max - 1).trimEnd()}…`;
}

const SECTION_HEADING_STYLE: React.CSSProperties = {
  fontFamily: "var(--cinema-mono)",
  fontSize: 12,
  letterSpacing: "0.22em",
  textTransform: "uppercase",
  color: "var(--bone-dim)",
  marginBottom: 20,
  paddingBottom: 16,
  borderBottom: "1px solid var(--hair)",
};

const SECTION_WRAP_STYLE: React.CSSProperties = {
  maxWidth: 980,
  margin: "0 auto 56px",
};

export default async function FestivalDetailPage({
  params,
}: { params: Promise<{ locale: string; festivalSlug: string }> }) {
  const { locale, festivalSlug } = await params;
  const f = await loadFestivalBySlug(festivalSlug);
  if (!f) {
    // Not a dead URL — a bare slug shared by 2+ festivals. Serve the hub.
    const variants = await loadFestivalVariants(festivalSlug);
    if (variants.length > 1) {
      const th = await getTranslations({ locale, namespace: "festivalDetail" });
      const fName = variants[0].name;
      const vars = { name: fName, count: variants.length };
      return (
        <FestivalDisambiguation
          locale={locale}
          name={fName}
          variants={variants}
          copy={{
            eyebrow: th("hubEyebrow"),
            title: th("hubTitle", vars),
            intro: th("hubIntro", vars),
            heading: th("hubHeading"),
          }}
        />
      );
    }
    notFound();
  }

  const t = await getTranslations({ locale, namespace: "festivalDetail" });
  const destName = (() => {
    const d = f.destinations as { name?: string } | { name?: string }[] | null | undefined;
    if (Array.isArray(d)) return d[0]?.name;
    return d?.name;
  })();
  const stateName = (() => {
    const d = f.destinations as { state?: { name?: string } | { name?: string }[] } | { state?: { name?: string } | { name?: string }[] }[] | null | undefined;
    const node = Array.isArray(d) ? d[0] : d;
    const st = node?.state;
    if (Array.isArray(st)) return st[0]?.name;
    return st?.name;
  })();
  const monthName = MONTHS_LONG[f.month] ?? "";
  const dateLabel = f.approximate_date ?? monthName;
  const pageUrl = `https://www.nakshiq.com/${locale}/festivals/${festivalSlug}`;
  const eventLd = singleFestivalEventJsonLd(f as FestivalRow, pageUrl);

  const enriched = await loadEnriched(f.id, f.destination_id, f.month);
  const dest = enriched.destination;

  // Real festival-footage hero clip — authentic, free-licensed video of this
  // festival type (mapped by visual family in festival-footage-map.ts), if one
  // exists. Empty string when none → the static destination image is used.
  // (Replaced the former location-only landscape B-roll, which showed the host
  // place — mountains/monsoon/fields — and never the festival itself.)
  const heroVideo = festivalHeroSrc(festivalSlug);
  const heroCredit = festivalHeroCredit(festivalSlug);
  // No video → a real festival-CELEBRATION photo if one exists, else the
  // destination/place image. Shows the festival, not the landscape.
  const heroPhoto = !heroVideo ? festivalHeroPhotoSrc(festivalSlug) : "";
  const heroPhotoCredit = heroPhoto ? festivalHeroPhotoCredit(festivalSlug) : "";

  // VideoObject schema only when a clip exists. The clip shows the festival
  // itself (Holi colour, Diwali diyas, the Ganga aarti …), so the name and
  // description describe the festival, not the host landscape.
  const festivalVideoLd =
    heroVideo && f.destination_id
      ? videoObjectJsonLd({
          id: festivalSlug,
          name: `${f.name} — festival footage`,
          description: `Footage of ${f.name}${destName ? `, celebrated at ${destName}` : ""} around ${dateLabel}.`,
          thumbnailUrl: destinationImage(f.destination_id, 1600),
          embedUrl: pageUrl,
        })
      : null;

  // Slug map (for related-festival links)
  const allSlugs = await loadAllSlugs();
  const slugMap = buildFestivalSlugMap(allSlugs);

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `https://www.nakshiq.com/${locale}` },
      { "@type": "ListItem", position: 2, name: "Festivals", item: `https://www.nakshiq.com/${locale}/festivals` },
      { "@type": "ListItem", position: 3, name: monthName, item: `https://www.nakshiq.com/${locale}/festivals/month/${monthName.toLowerCase()}` },
      { "@type": "ListItem", position: 4, name: f.name, item: pageUrl },
    ],
  };

  return (
    <div className="nakshiq-cinema" style={{ minHeight: "100vh" }}>
      <CinemaStyles />
      {eventLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(eventLd) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      {festivalVideoLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(festivalVideoLd) }}
        />
      )}
      <Nav />

      {/* Full-bleed festival hero — 100vh, video/photo/image bleeds behind the
          transparent Nav (Nav.tsx hasHero recognises /festivals/[slug]), kicker
          + title + date overlaid bottom-left. Mirrors destination-detail-cinematic's
          Act I (the dest hub) and luxury-hero-carousel — the site's "primary
          cover" convention, now extended to festivals since each one has a real,
          festival-specific clip. */}
      {f.destination_id && (
        <section
          className="nq-glow-bookend"
          style={{
            position: "relative",
            minHeight: "100vh",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            padding: "120px 24px 56px",
            color: "var(--bone)",
          }}
        >
          <CinematicHeroParallax strength={0.03}>
            <div aria-hidden style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
              {heroVideo ? (
                // LCP-safe: poster is an R2 webp that paints immediately; the
                // clip preloads metadata-only and autoplays muted over it. If the
                // video fails the poster frame stays — no broken-media state.
                // nq-kb-1 bakes the desaturate/dim filter into its keyframes, so
                // no separate inline filter is needed (matches act-1/5/9 usage).
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  aria-hidden="true"
                  className="nq-kb-1"
                  poster={destinationImage(f.destination_id, 2400)}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                >
                  <source src={heroVideo} type="video/mp4" />
                </video>
              ) : heroPhoto ? (
                // Real festival-celebration photo (R2). eslint-disable: external R2
                // host rendered as a full-bleed background, not a layout image.
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={heroPhoto}
                  alt={`${f.name} — festival celebration`}
                  loading="eager"
                  className="nq-kb-2"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    filter: "saturate(0.88) brightness(0.78)",
                  }}
                />
              ) : (
                <Image
                  src={`/images/destinations/${f.destination_id}.jpg`}
                  alt={`${destName ?? f.destination_id} — host of ${f.name}`}
                  fill
                  priority
                  sizes="100vw"
                  className="nq-kb-2"
                  style={{ objectFit: "cover", filter: "saturate(0.88) brightness(0.78)" }}
                />
              )}
            </div>
          </CinematicHeroParallax>
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 1,
              background:
                "linear-gradient(180deg, rgba(10,10,8,0.55) 0%, rgba(10,10,8,0.12) 32%, rgba(10,10,8,0.42) 68%, rgba(10,10,8,0.94) 100%)",
            }}
          />
          {(heroVideo ? heroCredit : heroPhotoCredit) && (
            <span
              style={{
                position: "absolute",
                bottom: 14,
                right: 18,
                zIndex: 2,
                fontSize: 10,
                lineHeight: 1.2,
                color: "rgba(255,255,255,0.5)",
                letterSpacing: "0.01em",
              }}
            >
              {heroVideo ? heroCredit : heroPhotoCredit}
            </span>
          )}

          {/* Bottom-anchored: kicker · title · date — same content the old
              banner-style <header> used to carry below the hero, now overlaid
              on it (magazine-cover composition, matches the dest hub Act I). */}
          <div style={{ position: "relative", zIndex: 2, maxWidth: 980 }}>
            <p
              className="nq-kicker"
              style={{
                color: "var(--vermillion)",
                marginBottom: 18,
                letterSpacing: "0.22em",
              }}
            >
              {(stateName ? `${t("kicker")} · ${stateName.toUpperCase()}` : t("kicker"))}
            </p>
            <Title
              as="h1"
              className="nq-display"
              style={{
                fontFamily: "var(--cinema-display)",
                fontStyle: "italic",
                fontWeight: 400,
                fontSize: "clamp(40px, 8vw, 120px)",
                lineHeight: 0.96,
                letterSpacing: "-0.026em",
                margin: "0 0 20px",
                textWrap: "balance",
              }}
            >
              {f.name}.
            </Title>
            <p
              className="nq-mono"
              style={{
                fontFamily: "var(--cinema-mono)",
                fontSize: 12,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--bone-dim)",
              }}
            >
              {dateLabel}{destName ? ` · ${destName}` : ""}
            </p>
          </div>
        </section>
      )}

      <main id="main-content" className="nq-grain" style={{ position: "relative", padding: "56px 24px 64px" }}>
        {/* Defensive fallback — every live festival row has a destination_id
            today (verified 501/501, 2026-07-01), but a future row without one
            would have no hero to carry the title, so it renders here instead. */}
        {!f.destination_id && (
          <header style={{ maxWidth: 980, margin: "0 auto 48px" }}>
            <p
              className="nq-kicker"
              style={{
                color: "var(--vermillion)",
                marginBottom: 20,
                letterSpacing: "0.22em",
              }}
            >
              {(stateName ? `${t("kicker")} · ${stateName.toUpperCase()}` : t("kicker"))}
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
              {f.name}.
            </Title>
            <p
              className="nq-mono"
              style={{
                fontFamily: "var(--cinema-mono)",
                fontSize: 12,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--bone-dim)",
                marginTop: 24,
              }}
            >
              {dateLabel}{destName ? ` · ${destName}` : ""}
            </p>
          </header>
        )}

        {/* Festival prose */}
        <article style={{ maxWidth: 720, margin: "0 auto 64px" }}>
          {f.description && (
            <p
              style={{
                fontFamily: "var(--cinema-display)",
                fontStyle: "italic",
                fontWeight: 400,
                fontSize: "clamp(18px, 2vw, 22px)",
                lineHeight: 1.55,
                color: "var(--bone)",
                margin: "0 0 28px",
              }}
            >
              {f.description}
            </p>
          )}
          {f.significance && (
            <p
              style={{
                fontFamily: "var(--cinema-mono)",
                fontSize: 13,
                letterSpacing: "0.04em",
                lineHeight: 1.6,
                color: "var(--bone-dim)",
                paddingTop: 24,
                borderTop: "1px solid var(--hair)",
                margin: 0,
              }}
            >
              <span style={{ color: "var(--vermillion)", textTransform: "uppercase", letterSpacing: "0.22em", fontSize: 11, marginRight: 12 }}>
                {t("whyItMatters")}
              </span>
              {f.significance}
            </p>
          )}
        </article>

        {/* Going for this festival? Month context + score */}
        {enriched.month && dest && (
          <section style={SECTION_WRAP_STYLE}>
            <h2 style={SECTION_HEADING_STYLE}>{t("monthContextHeading", { destination: dest.name, month: monthName })}</h2>
            <div
              style={{
                display: "flex",
                gap: 24,
                alignItems: "flex-start",
                flexWrap: "wrap",
              }}
            >
              {enriched.month.score !== null && (
                <div
                  style={{
                    flexShrink: 0,
                    border: "1px solid var(--hair)",
                    padding: "16px 20px",
                    minWidth: 140,
                  }}
                >
                  <div
                    style={{
                      fontFamily: "var(--cinema-mono)",
                      fontSize: 11,
                      letterSpacing: "0.22em",
                      textTransform: "uppercase",
                      color: "var(--bone-faint)",
                    }}
                  >
                    {t("nakshiqScore")}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--cinema-display)",
                      fontStyle: "italic",
                      fontSize: 36,
                      lineHeight: 1,
                      color: "var(--bone)",
                      marginTop: 6,
                    }}
                  >
                    {formatScoreInline(enriched.month.score)}
                  </div>
                  {enriched.month.verdict && (
                    <div
                      style={{
                        fontFamily: "var(--cinema-mono)",
                        fontSize: 10,
                        letterSpacing: "0.22em",
                        textTransform: "uppercase",
                        color: enriched.month.verdict === "go" ? "var(--vermillion)" : "var(--bone-dim)",
                        marginTop: 8,
                      }}
                    >
                      {enriched.month.verdict === "go" ? t("verdictGo") : enriched.month.verdict === "skip" ? t("verdictSkip") : t("verdictWait")}
                    </div>
                  )}
                </div>
              )}
              <div style={{ flex: 1, minWidth: 260 }}>
                {(enriched.month.prose_lead || enriched.month.why_go) && (
                  <p
                    style={{
                      fontFamily: "var(--cinema-ui)",
                      fontSize: 15,
                      lineHeight: 1.65,
                      color: "var(--bone-dim)",
                      margin: 0,
                    }}
                  >
                    {clamp(enriched.month.prose_lead ?? enriched.month.why_go, 420)}
                  </p>
                )}
                <p
                  style={{
                    marginTop: 16,
                    fontFamily: "var(--cinema-mono)",
                    fontSize: 12,
                    letterSpacing: "0.04em",
                  }}
                >
                  <Link
                    href={`/${locale}/destination/${dest.id}/${monthName.toLowerCase()}`}
                    style={{ color: "var(--vermillion)", textDecoration: "none" }}
                  >
                    {t("seeMonthGuide", { destination: dest.name, month: monthName })} →
                  </Link>
                </p>
              </div>
            </div>
          </section>
        )}

        {/* Travel facts + live weather */}
        {dest && (
          <section style={SECTION_WRAP_STYLE}>
            <h2 style={SECTION_HEADING_STYLE}>{t("travelFactsHeading")}</h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
                gap: 1,
                background: "var(--hair)",
                border: "1px solid var(--hair)",
                marginBottom: 16,
              }}
            >
              {dest.elevation_m !== null && (
                <FactCell label={t("factElevation")} value={`${dest.elevation_m} m`} />
              )}
              {dest.nearest_airport && (
                <FactCell label={t("factAirport")} value={dest.nearest_airport} />
              )}
              {dest.nearest_railhead && (
                <FactCell label={t("factRailhead")} value={dest.nearest_railhead} />
              )}
            </div>
            {f.destination_id && (
              <div style={{ maxWidth: 360 }}>
                <p
                  style={{
                    fontFamily: "var(--cinema-mono)",
                    fontSize: 11,
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: "var(--bone-faint)",
                    margin: "0 0 8px",
                  }}
                >
                  {t("liveWeather", { destination: dest.name })}
                </p>
                <WeatherWidget destinationId={f.destination_id} />
              </div>
            )}
          </section>
        )}

        {/* Where to stay */}
        {enriched.stays.length > 0 && dest && (
          <section style={SECTION_WRAP_STYLE}>
            <h2 style={SECTION_HEADING_STYLE}>{t("staysHeading", { destination: dest.name })}</h2>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 16 }}>
              {enriched.stays.map((s) => (
                <li
                  key={s.id}
                  style={{
                    border: "1px solid var(--hair)",
                    padding: 20,
                    background: "var(--paper)",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 16, marginBottom: 6 }}>
                    <h3
                      style={{
                        fontFamily: "var(--cinema-display)",
                        fontStyle: "italic",
                        fontWeight: 500,
                        fontSize: 19,
                        lineHeight: 1.3,
                        margin: 0,
                        color: "var(--bone)",
                      }}
                    >
                      {s.name}
                    </h3>
                    {s.price_range && (
                      <span
                        className="nq-mono"
                        style={{
                          fontFamily: "var(--cinema-mono)",
                          fontSize: 10,
                          letterSpacing: "0.18em",
                          textTransform: "uppercase",
                          color: "var(--vermillion)",
                          flexShrink: 0,
                        }}
                      >
                        {s.price_range}
                      </span>
                    )}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--cinema-mono)",
                      fontSize: 10,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: "var(--bone-faint)",
                      marginBottom: 10,
                    }}
                  >
                    {s.type}
                    {s.location && ` · ${s.location}`}
                  </div>
                  {s.why_special && (
                    <p style={{ fontFamily: "var(--cinema-ui)", fontSize: 14, lineHeight: 1.55, color: "var(--bone-dim)", margin: 0 }}>
                      {s.why_special}
                    </p>
                  )}
                </li>
              ))}
            </ul>
            <p style={{ marginTop: 16, fontFamily: "var(--cinema-mono)", fontSize: 12 }}>
              <Link
                href={`/${locale}/destination/${dest.id}#stays`}
                style={{ color: "var(--vermillion)", textDecoration: "none" }}
              >
                {t("seeAllStays", { destination: dest.name })} →
              </Link>
            </p>
          </section>
        )}

        {/* Where to eat */}
        {enriched.eateries.length > 0 && dest && (
          <section style={SECTION_WRAP_STYLE}>
            <h2 style={SECTION_HEADING_STYLE}>{t("eateriesHeading", { destination: dest.name })}</h2>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 1, background: "var(--hair)", border: "1px solid var(--hair)" }}>
              {enriched.eateries.map((e) => (
                <li key={e.id} style={{ padding: 18, background: "var(--paper)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 8, marginBottom: 4 }}>
                    <h3
                      style={{
                        fontFamily: "var(--cinema-display)",
                        fontStyle: "italic",
                        fontWeight: 500,
                        fontSize: 17,
                        lineHeight: 1.3,
                        margin: 0,
                        color: "var(--bone)",
                      }}
                    >
                      {e.name}
                    </h3>
                    {e.is_legendary && (
                      <span
                        className="nq-mono"
                        style={{
                          fontFamily: "var(--cinema-mono)",
                          fontSize: 9,
                          letterSpacing: "0.22em",
                          textTransform: "uppercase",
                          color: "var(--vermillion)",
                          flexShrink: 0,
                        }}
                      >
                        {t("legendary")}
                      </span>
                    )}
                  </div>
                  {(e.area || e.price_range) && (
                    <div
                      style={{
                        fontFamily: "var(--cinema-mono)",
                        fontSize: 10,
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                        color: "var(--bone-faint)",
                        marginBottom: 8,
                      }}
                    >
                      {[e.area, e.price_range].filter(Boolean).join(" · ")}
                    </div>
                  )}
                  {e.signature_dish && (
                    <p style={{ fontFamily: "var(--cinema-ui)", fontSize: 13, lineHeight: 1.5, color: "var(--bone-dim)", margin: "0 0 6px" }}>
                      <span style={{ color: "var(--vermillion)", textTransform: "uppercase", letterSpacing: "0.16em", fontSize: 10, marginRight: 6 }}>{t("signature")}</span>
                      {e.signature_dish}
                    </p>
                  )}
                  {e.insider_tip && (
                    <p style={{ fontFamily: "var(--cinema-ui)", fontStyle: "italic", fontSize: 13, lineHeight: 1.5, color: "var(--bone-faint)", margin: 0 }}>
                      {e.insider_tip}
                    </p>
                  )}
                </li>
              ))}
            </ul>
            <p style={{ marginTop: 16, fontFamily: "var(--cinema-mono)", fontSize: 12 }}>
              <Link
                href={`/${locale}/destination/${dest.id}#eateries`}
                style={{ color: "var(--vermillion)", textDecoration: "none" }}
              >
                {t("seeAllEateries", { destination: dest.name })} →
              </Link>
            </p>
          </section>
        )}

        {/* Other things to see */}
        {enriched.pois.length > 0 && dest && (
          <section style={SECTION_WRAP_STYLE}>
            <h2 style={SECTION_HEADING_STYLE}>{t("poisHeading", { destination: dest.name })}</h2>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 12 }}>
              {enriched.pois.map((p) => (
                <li
                  key={p.id}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr auto",
                    gap: 16,
                    padding: "14px 0",
                    borderBottom: "1px solid var(--hair)",
                  }}
                >
                  <div>
                    <h3
                      style={{
                        fontFamily: "var(--cinema-display)",
                        fontStyle: "italic",
                        fontWeight: 500,
                        fontSize: 17,
                        lineHeight: 1.3,
                        margin: "0 0 6px",
                        color: "var(--bone)",
                      }}
                    >
                      {p.name}
                    </h3>
                    {p.description && (
                      <p style={{ fontFamily: "var(--cinema-ui)", fontSize: 13, lineHeight: 1.55, color: "var(--bone-dim)", margin: 0 }}>
                        {clamp(p.description, 180)}
                      </p>
                    )}
                  </div>
                  <div
                    style={{
                      textAlign: "right",
                      fontFamily: "var(--cinema-mono)",
                      fontSize: 10,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: "var(--bone-faint)",
                      flexShrink: 0,
                    }}
                  >
                    {p.type}
                    {p.time_needed && (
                      <div style={{ color: "var(--vermillion)", marginTop: 4 }}>{p.time_needed}</div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Other festivals at the same destination */}
        {enriched.otherFestivalsHere.length > 0 && dest && (
          <section style={SECTION_WRAP_STYLE}>
            <h2 style={SECTION_HEADING_STYLE}>{t("otherFestivalsHere", { destination: dest.name })}</h2>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 12 }}>
              {enriched.otherFestivalsHere.map((r) => {
                const rSlug = slugMap.get(r.id);
                if (!rSlug) return null;
                return (
                  <li key={r.id}>
                    <Link
                      href={`/${locale}/festivals/${rSlug}`}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "baseline",
                        gap: 16,
                        padding: "14px 0",
                        borderBottom: "1px solid var(--hair)",
                        textDecoration: "none",
                        color: "var(--bone)",
                      }}
                    >
                      <span style={{ fontFamily: "var(--cinema-display)", fontStyle: "italic", fontSize: 18, lineHeight: 1.3 }}>
                        {r.name}
                      </span>
                      <span
                        className="nq-mono"
                        style={{
                          fontFamily: "var(--cinema-mono)",
                          fontSize: 11,
                          letterSpacing: "0.18em",
                          textTransform: "uppercase",
                          color: "var(--bone-faint)",
                          flexShrink: 0,
                        }}
                      >
                        {r.approximate_date ?? (r.month ? MONTHS_LONG[r.month] : "")}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        )}

        {/* Related festivals same month, other destinations */}
        {enriched.relatedSameMonth.length > 0 && (
          <section style={SECTION_WRAP_STYLE}>
            <h2 style={SECTION_HEADING_STYLE}>{t("relatedHeading", { month: monthName })}</h2>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 12 }}>
              {enriched.relatedSameMonth.map((r) => {
                const rSlug = slugMap.get(r.id);
                if (!rSlug) return null;
                return (
                  <li key={r.id}>
                    <Link
                      href={`/${locale}/festivals/${rSlug}`}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "baseline",
                        gap: 16,
                        padding: "14px 0",
                        borderBottom: "1px solid var(--hair)",
                        textDecoration: "none",
                        color: "var(--bone)",
                      }}
                    >
                      <span style={{ fontFamily: "var(--cinema-display)", fontStyle: "italic", fontSize: 18, lineHeight: 1.3 }}>
                        {r.name}
                      </span>
                      <span
                        className="nq-mono"
                        style={{
                          fontFamily: "var(--cinema-mono)",
                          fontSize: 11,
                          letterSpacing: "0.18em",
                          textTransform: "uppercase",
                          color: "var(--bone-faint)",
                          flexShrink: 0,
                        }}
                      >
                        {r.approximate_date ?? monthName}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
            <p
              style={{
                marginTop: 16,
                fontFamily: "var(--cinema-mono)",
                fontSize: 12,
                letterSpacing: "0.04em",
                color: "var(--bone-faint)",
              }}
            >
              <Link
                href={`/${locale}/festivals/month/${monthName.toLowerCase()}`}
                style={{ color: "var(--vermillion)", textDecoration: "none" }}
              >
                {t("seeAllInMonth", { month: monthName })} →
              </Link>
            </p>
          </section>
        )}

        {/* CTA to full destination guide */}
        {dest && (
          <aside style={{ maxWidth: 980, margin: "0 auto" }}>
            <Link
              href={`/${locale}/destination/${dest.id}`}
              style={{
                display: "block",
                position: "relative",
                overflow: "hidden",
                border: "1px solid var(--hair)",
                textDecoration: "none",
                color: "inherit",
                aspectRatio: "16 / 5",
                background: "var(--paper-2)",
              }}
            >
              <Image
                src={`/images/destinations/${dest.id}.jpg`}
                alt={`${dest.name} guide`}
                fill
                sizes="(max-width: 980px) 100vw, 980px"
                style={{ objectFit: "cover", filter: "saturate(0.92) brightness(0.7)" }}
              />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 40%, rgba(10,10,8,0.85) 100%)" }} />
              <div style={{ position: "absolute", left: 24, right: 24, bottom: 24 }}>
                <span
                  className="nq-mono"
                  style={{
                    fontFamily: "var(--cinema-mono)",
                    fontSize: 11,
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: "var(--vermillion)",
                  }}
                >
                  {t("fullGuideKicker")}
                </span>
                <div
                  style={{
                    fontFamily: "var(--cinema-display)",
                    fontStyle: "italic",
                    fontSize: "clamp(22px, 3vw, 32px)",
                    lineHeight: 1.1,
                    color: "var(--paper)",
                    marginTop: 6,
                  }}
                >
                  {t("fullGuideTitle", { destination: dest.name })} →
                </div>
              </div>
            </Link>
          </aside>
        )}
      </main>

      <CinematicRelatedRail />
      <Footer />
    </div>
  );
}

function FactCell({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ padding: 16, background: "var(--paper)" }}>
      <div
        style={{
          fontFamily: "var(--cinema-mono)",
          fontSize: 10,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: "var(--bone-faint)",
          marginBottom: 6,
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontFamily: "var(--cinema-display)",
          fontStyle: "italic",
          fontWeight: 500,
          fontSize: 18,
          lineHeight: 1.2,
          color: "var(--bone)",
        }}
      >
        {value}
      </div>
    </div>
  );
}
