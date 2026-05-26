import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";
import Link from "next/link";
import { localeAlternates } from "@/lib/seo-utils";
import { festivalsItemListJsonLd } from "@/lib/festival-schema";
import { buildFestivalSlugMap, type FestivalSlugRow } from "@/lib/festival-slug";
import { CinemaStyles } from "@/components/landing-cinema/cinema-styles";
import { Title } from "@/components/landing-cinema/editorial";
import { CinematicRelatedRail } from "@/components/cinematic-related-rail";

export const revalidate = 86400;
export const dynamicParams = true;

const MONTH_MAP: Record<string, { num: number; name: string }> = {
  january: { num: 1, name: "January" }, february: { num: 2, name: "February" },
  march: { num: 3, name: "March" }, april: { num: 4, name: "April" },
  may: { num: 5, name: "May" }, june: { num: 6, name: "June" },
  july: { num: 7, name: "July" }, august: { num: 8, name: "August" },
  september: { num: 9, name: "September" }, october: { num: 10, name: "October" },
  november: { num: 11, name: "November" }, december: { num: 12, name: "December" },
};

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; monthSlug: string}> }): Promise<Metadata> {
  const { locale, monthSlug } = await params;
  const m = MONTH_MAP[monthSlug];
  if (!m) return {};
  return {
    title: `Festivals in India in ${m.name} — Complete Calendar`,
    description: `Every festival happening across India in ${m.name} with dates, locations, and what to expect. Time your trip around India's celebrations.`,
    ...localeAlternates(locale, `/festivals/month/${monthSlug}`),
  };
}

type FestivalRow = {
  id: string;
  name: string;
  description?: string | null;
  approximate_date?: string | null;
  destination_id?: string | null;
  destinations?: { name?: string; state?: { name?: string } | null } | null;
};

export default async function FestivalsByMonthPage({ params }: { params: Promise<{ locale: string; monthSlug: string }> }) {
  const { locale, monthSlug } = await params;
  const m = MONTH_MAP[monthSlug];
  if (!m) notFound();

  const supabase = getSupabase();
  if (!supabase) notFound();

  const { data: festivals } = await supabase
    .from("festivals")
    .select("*, destinations(name, state:states(name))")
    .eq("month", m.num)
    .order("name");

  // Full slug map (across all 331 rows) so each card can link to its
  // per-festival page. Collision-aware: 11 names dup across destinations.
  const { data: allRows } = await supabase
    .from("festivals")
    .select("id, name, destination_id");
  const slugMap = buildFestivalSlugMap((allRows ?? []) as FestivalSlugRow[]);

  const MONTH_SLUGS = Object.keys(MONTH_MAP);
  const pageUrl = `https://www.nakshiq.com/${locale}/festivals/month/${monthSlug}`;
  const eventListLd = festivalsItemListJsonLd((festivals ?? []) as Parameters<typeof festivalsItemListJsonLd>[0], m.num, pageUrl);

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `https://www.nakshiq.com/${locale}` },
      { "@type": "ListItem", position: 2, name: "Festivals", item: `https://www.nakshiq.com/${locale}/festivals` },
      { "@type": "ListItem", position: 3, name: m.name, item: pageUrl },
    ],
  };

  return (
    <div className="nakshiq-cinema" style={{ minHeight: "100vh" }}>
      <CinemaStyles />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventListLd) }}
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
        <header style={{ maxWidth: 1100, margin: "0 auto 48px" }}>
          <p
            className="nq-kicker"
            style={{
              color: "var(--vermillion)",
              marginBottom: 20,
              letterSpacing: "0.22em",
            }}
          >
            FESTIVAL CALENDAR · {m.name.toUpperCase()}
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
            Festivals in {m.name}.
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
            {(festivals ?? []).length} festivals happening across India in {m.name}.
            Dates, locations, and host destinations.
          </p>
        </header>

        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          {/* Month picker */}
          <div
            style={{
              display: "flex",
              gap: 8,
              overflowX: "auto",
              paddingBottom: 16,
              marginBottom: 32,
              borderBottom: "1px solid var(--hair)",
            }}
          >
            {MONTH_SLUGS.map((ms) => {
              const isActive = ms === monthSlug;
              return (
                <Link
                  key={ms}
                  href={`/${locale}/festivals/month/${ms}`}
                  style={{
                    flexShrink: 0,
                    padding: "8px 16px",
                    fontFamily: "var(--cinema-mono)",
                    fontSize: 11,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: isActive ? "var(--paper)" : "var(--bone-dim)",
                    background: isActive ? "var(--vermillion)" : "transparent",
                    border: `1px solid ${isActive ? "var(--vermillion)" : "var(--hair)"}`,
                    textDecoration: "none",
                    transition: "color 200ms ease, border-color 200ms ease",
                  }}
                >
                  {MONTH_MAP[ms].name.slice(0, 3)}
                </Link>
              );
            })}
          </div>

          {(festivals ?? []).length > 0 ? (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: 1,
                background: "var(--hair)",
                border: "1px solid var(--hair)",
              }}
            >
              {(festivals ?? []).map((f: FestivalRow) => {
                const fSlug = slugMap.get(f.id);
                return (
                <div
                  key={f.id}
                  style={{
                    padding: 20,
                    background: "var(--paper)",
                    display: "flex",
                    flexDirection: "column",
                    gap: 8,
                  }}
                >
                  <h3
                    style={{
                      fontFamily: "var(--cinema-display)",
                      fontStyle: "italic",
                      fontWeight: 500,
                      fontSize: 22,
                      lineHeight: 1.2,
                      color: "var(--bone)",
                      margin: 0,
                    }}
                  >
                    {fSlug ? (
                      <Link
                        href={`/${locale}/festivals/${fSlug}`}
                        style={{ color: "inherit", textDecoration: "none" }}
                      >
                        {f.name}
                      </Link>
                    ) : (
                      f.name
                    )}
                  </h3>
                  <div
                    style={{
                      fontFamily: "var(--cinema-mono)",
                      fontSize: 10,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: "var(--bone-faint)",
                    }}
                  >
                    {f.destinations?.name}
                    {f.destinations?.state?.name && ` · ${f.destinations.state.name}`}
                  </div>
                  {f.description && (
                    <p
                      style={{
                        fontFamily: "var(--cinema-ui)",
                        fontSize: 14,
                        lineHeight: 1.55,
                        color: "var(--bone-dim)",
                        margin: 0,
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {f.description}
                    </p>
                  )}
                  {f.approximate_date && (
                    <p
                      style={{
                        fontFamily: "var(--cinema-mono)",
                        fontSize: 11,
                        letterSpacing: "0.06em",
                        color: "var(--vermillion)",
                        margin: 0,
                      }}
                    >
                      {f.approximate_date}
                    </p>
                  )}
                </div>
                );
              })}
            </div>
          ) : (
            <div
              style={{
                padding: "80px 0",
                textAlign: "center",
                fontFamily: "var(--cinema-ui)",
                color: "var(--bone-dim)",
              }}
            >
              <p>No festivals listed for {m.name} yet.</p>
              <Link
                href={`/${locale}/festivals`}
                style={{
                  display: "inline-block",
                  marginTop: 12,
                  color: "var(--vermillion)",
                  textDecoration: "underline",
                  textUnderlineOffset: "3px",
                }}
              >
                View all festivals →
              </Link>
            </div>
          )}
        </div>
      </main>

      <CinematicRelatedRail />
      <Footer />
    </div>
  );
}
