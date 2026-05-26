import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";
import { STATE_MAP } from "@/lib/seo-maps";
import { localeAlternates } from "@/lib/seo-utils";
import { festivalsItemListJsonLd } from "@/lib/festival-schema";
import { buildFestivalSlugMap, type FestivalSlugRow } from "@/lib/festival-slug";
import { CinemaStyles } from "@/components/landing-cinema/cinema-styles";
import { Title } from "@/components/landing-cinema/editorial";
import { CinematicRelatedRail } from "@/components/cinematic-related-rail";

export const revalidate = 86400;
export const dynamicParams = true;

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

const MONTH_NAMES = ["","January","February","March","April","May","June","July","August","September","October","November","December"];

export async function generateMetadata({ params }: { params: Promise<{ locale: string; stateSlug: string}> }): Promise<Metadata> {
  const { locale, stateSlug } = await params;
  const stateName = STATE_MAP[stateSlug];
  if (!stateName) return {};
  return {
    title: `Festivals in ${stateName} — Complete Calendar`,
    description: `Every festival in ${stateName} by month — dates, locations, and what to expect. Time your trip around ${stateName}'s celebrations.`,
    ...localeAlternates(locale, `/festivals/state/${stateSlug}`),
  };
}

type FestivalRow = {
  id: string;
  name: string;
  month?: number | null;
  description?: string | null;
  destinations?: { name?: string } | null;
};

export default async function FestivalsByStatePage({ params }: { params: Promise<{ locale: string; stateSlug: string }> }) {
  const { locale, stateSlug } = await params;
  const stateName = STATE_MAP[stateSlug];
  if (!stateName) notFound();

  const supabase = getSupabase();
  if (!supabase) notFound();

  const { data: festivals } = await supabase
    .from("festivals")
    .select("*, destinations!inner(name, state_id, state:states(name))")
    .eq("destinations.state_id", stateSlug)
    .order("month");

  // Full slug map (across all 331 rows) so each card can link to its
  // per-festival page. Collision-aware: 11 names dup across destinations.
  const { data: allRows } = await supabase
    .from("festivals")
    .select("id, name, destination_id");
  const slugMap = buildFestivalSlugMap((allRows ?? []) as FestivalSlugRow[]);

  const grouped = (festivals ?? []).reduce((acc: Record<number, FestivalRow[]>, f: FestivalRow) => {
    const m = f.month || 0;
    if (!acc[m]) acc[m] = [];
    acc[m].push(f);
    return acc;
  }, {});

  const pageUrl = `https://www.nakshiq.com/${locale}/festivals/state/${stateSlug}`;
  const eventListLd = festivalsItemListJsonLd(
    (festivals ?? []) as Parameters<typeof festivalsItemListJsonLd>[0],
    null,
    pageUrl,
    stateName,
  );

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `https://www.nakshiq.com/${locale}` },
      { "@type": "ListItem", position: 2, name: "Festivals", item: `https://www.nakshiq.com/${locale}/festivals` },
      { "@type": "ListItem", position: 3, name: stateName, item: pageUrl },
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
            FESTIVAL CALENDAR · {stateName.toUpperCase()} · {String((festivals ?? []).length).padStart(3, "0")}
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
            Festivals in {stateName}.
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
            {(festivals ?? []).length} festivals across {stateName} —
            organised by month.
          </p>
        </header>

        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          {Object.entries(grouped).sort(([a], [b]) => Number(a) - Number(b)).map(([month, fests]) => (
            <section key={month} style={{ marginBottom: 48 }}>
              <h2
                style={{
                  fontFamily: "var(--cinema-display)",
                  fontStyle: "italic",
                  fontWeight: 500,
                  fontSize: 32,
                  lineHeight: 1.1,
                  color: "var(--bone)",
                  margin: "0 0 20px",
                  paddingBottom: 12,
                  borderBottom: "1px solid var(--hair)",
                }}
              >
                {MONTH_NAMES[Number(month)] || "Unknown"}
              </h2>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                  gap: 1,
                  background: "var(--hair)",
                  border: "1px solid var(--hair)",
                }}
              >
                {(fests as FestivalRow[]).map((f) => {
                  const fSlug = slugMap.get(f.id);
                  return (
                  <div
                    key={f.id}
                    style={{
                      padding: 18,
                      background: "var(--paper)",
                    }}
                  >
                    <h3
                      style={{
                        fontFamily: "var(--cinema-display)",
                        fontStyle: "italic",
                        fontWeight: 500,
                        fontSize: 19,
                        lineHeight: 1.25,
                        color: "var(--bone)",
                        margin: "0 0 4px",
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
                    <p
                      style={{
                        fontFamily: "var(--cinema-mono)",
                        fontSize: 10,
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                        color: "var(--bone-faint)",
                        margin: "0 0 8px",
                      }}
                    >
                      {f.destinations?.name}
                    </p>
                    {f.description && (
                      <p
                        style={{
                          fontFamily: "var(--cinema-ui)",
                          fontSize: 13,
                          lineHeight: 1.5,
                          color: "var(--bone-dim)",
                          margin: 0,
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {f.description}
                      </p>
                    )}
                  </div>
                  );
                })}
              </div>
            </section>
          ))}
          {(festivals ?? []).length === 0 && (
            <p
              style={{
                padding: "80px 0",
                textAlign: "center",
                fontFamily: "var(--cinema-ui)",
                color: "var(--bone-dim)",
              }}
            >
              No festivals listed for {stateName} yet.
            </p>
          )}
        </div>
      </main>

      <CinematicRelatedRail />
      <Footer />
    </div>
  );
}
