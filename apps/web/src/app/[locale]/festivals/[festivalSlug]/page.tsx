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
import { CinematicRelatedRail } from "@/components/cinematic-related-rail";
import { localeAlternates } from "@/lib/seo-utils";
import { singleFestivalEventJsonLd, type FestivalRow } from "@/lib/festival-schema";
import { buildFestivalSlugMap, type FestivalSlugRow } from "@/lib/festival-slug";

// Per-festival detail page. 331 festivals × 2 locales ≈ 662 indexed URLs.
// Slugs collision-aware (11 names duplicate across destinations — those get
// a `-{destination_id}` suffix; see lib/festival-slug.ts).

export const revalidate = 86400; // 24h — festival data is mostly static
export const dynamicParams = true;

const MONTHS_LONG = [
  "", "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

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

async function loadAllSlugs(): Promise<FestivalSlugRow[]> {
  const supabase = getSupabase();
  if (!supabase) return [];
  const { data } = await supabase
    .from("festivals")
    .select("id, name, destination_id");
  return (data ?? []) as FestivalSlugRow[];
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

export async function generateStaticParams() {
  const rows = await loadAllSlugs();
  const slugMap = buildFestivalSlugMap(rows);
  return Array.from(slugMap.values()).map((festivalSlug) => ({ festivalSlug }));
}

export async function generateMetadata({
  params,
}: { params: Promise<{ locale: string; festivalSlug: string }> }): Promise<Metadata> {
  const { locale, festivalSlug } = await params;
  const f = await loadFestivalBySlug(festivalSlug);
  if (!f) return {};
  const destName = (() => {
    const d = f.destinations as { name?: string } | { name?: string }[] | null | undefined;
    if (Array.isArray(d)) return d[0]?.name;
    return d?.name;
  })();
  const dateLabel = f.approximate_date ?? MONTHS_LONG[f.month];
  const where = destName ? ` in ${destName}` : "";
  return {
    title: `${f.name} — ${dateLabel}${where} | NakshIQ`,
    description: f.description
      ? f.description.length > 160
        ? `${f.description.slice(0, 157)}...`
        : f.description
      : `${f.name}, celebrated${where} during ${dateLabel}. Dates, location, and host destination.`,
    ...localeAlternates(locale, `/festivals/${festivalSlug}`),
  };
}

export default async function FestivalDetailPage({
  params,
}: { params: Promise<{ locale: string; festivalSlug: string }> }) {
  const { locale, festivalSlug } = await params;
  const f = await loadFestivalBySlug(festivalSlug);
  if (!f) notFound();

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

  // Related festivals: same month, same state if known, otherwise same month.
  let related: Array<{ id: string; name: string; destination_id: string | null; approximate_date: string | null }> = [];
  const supabase = getSupabase();
  if (supabase) {
    if (stateName && f.destination_id) {
      const { data: destState } = await supabase
        .from("destinations")
        .select("state_id")
        .eq("id", f.destination_id)
        .single();
      const sId = (destState as { state_id?: string } | null)?.state_id;
      if (sId) {
        const { data } = await supabase
          .from("festivals")
          .select("id, name, destination_id, approximate_date, destinations!inner(state_id)")
          .eq("month", f.month)
          .eq("destinations.state_id", sId)
          .neq("id", f.id)
          .limit(6);
        related = (data ?? []) as typeof related;
      }
    }
    if (related.length < 3) {
      const { data } = await supabase
        .from("festivals")
        .select("id, name, destination_id, approximate_date")
        .eq("month", f.month)
        .neq("id", f.id)
        .limit(6 - related.length);
      related = [...related, ...((data ?? []) as typeof related)].slice(0, 6);
    }
  }

  // Slug map for related-festival links
  const allSlugs = await loadAllSlugs();
  const slugMap = buildFestivalSlugMap(allSlugs);

  return (
    <div className="nakshiq-cinema" style={{ minHeight: "100vh" }}>
      <CinemaStyles />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <Nav />

      <main
        id="main-content"
        className="nq-grain"
        style={{ position: "relative", padding: "140px 24px 64px" }}
      >
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

        {f.destination_id && destName && (
          <aside style={{ maxWidth: 980, margin: "0 auto 64px" }}>
            <Link
              href={`/${locale}/destination/${f.destination_id}`}
              style={{
                display: "block",
                position: "relative",
                overflow: "hidden",
                border: "1px solid var(--hair)",
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <div style={{ position: "relative", aspectRatio: "16 / 6", background: "var(--paper-2)" }}>
                <Image
                  src={`/images/destinations/${f.destination_id}.jpg`}
                  alt={`${destName} — host of ${f.name}`}
                  fill
                  sizes="(max-width: 980px) 100vw, 980px"
                  style={{ objectFit: "cover", filter: "saturate(0.92) brightness(0.78)" }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(180deg, transparent 40%, rgba(10,10,8,0.78) 100%)",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    left: 24,
                    right: 24,
                    bottom: 24,
                    display: "flex",
                    flexDirection: "column",
                    gap: 8,
                  }}
                >
                  <span
                    className="nq-mono"
                    style={{
                      fontSize: 11,
                      letterSpacing: "0.22em",
                      textTransform: "uppercase",
                      color: "var(--vermillion)",
                    }}
                  >
                    {t("hostDestination")}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--cinema-display)",
                      fontStyle: "italic",
                      fontSize: "clamp(22px, 3vw, 32px)",
                      lineHeight: 1.1,
                      color: "var(--paper)",
                    }}
                  >
                    {destName} →
                  </span>
                </div>
              </div>
            </Link>
          </aside>
        )}

        {related.length > 0 && (
          <section style={{ maxWidth: 980, margin: "0 auto" }}>
            <h2
              className="nq-mono"
              style={{
                fontFamily: "var(--cinema-mono)",
                fontSize: 12,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "var(--bone-dim)",
                marginBottom: 20,
                paddingBottom: 16,
                borderBottom: "1px solid var(--hair)",
              }}
            >
              {t("relatedHeading", { month: monthName })}
            </h2>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 12 }}>
              {related.map((r) => {
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
                      <span
                        style={{
                          fontFamily: "var(--cinema-display)",
                          fontStyle: "italic",
                          fontSize: 18,
                          lineHeight: 1.3,
                        }}
                      >
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
                marginTop: 24,
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
      </main>

      <CinematicRelatedRail />
      <Footer />
    </div>
  );
}
