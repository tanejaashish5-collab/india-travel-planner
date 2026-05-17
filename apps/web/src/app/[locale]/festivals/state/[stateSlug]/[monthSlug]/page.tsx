import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";
import { STATE_MAP, MONTH_MAP } from "@/lib/seo-maps";
import { localeAlternates } from "@/lib/seo-utils";
import { festivalsItemListJsonLd } from "@/lib/festival-schema";
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

export async function generateMetadata({ params }: { params: Promise<{ locale: string; stateSlug: string; monthSlug: string }> }): Promise<Metadata> {
  const { locale, stateSlug, monthSlug } = await params;
  const stateName = STATE_MAP[stateSlug];
  const m = MONTH_MAP[monthSlug];
  if (!stateName || !m) return {};
  return {
    title: `Festivals in ${stateName} in ${m.name} | NakshIQ`,
    description: `Festivals happening in ${stateName} during ${m.name} — dates, locations, and travel tips. Plan your trip around these celebrations.`,
    ...localeAlternates(locale, `/festivals/state/${stateSlug}/${monthSlug}`),
  };
}

type FestivalRow = {
  id: string;
  name: string;
  description?: string | null;
  dates?: string | null;
  destinations?: { name?: string } | null;
};

export default async function FestivalsStateMonthPage({ params }: { params: Promise<{ locale: string; stateSlug: string; monthSlug: string }> }) {
  const { locale, stateSlug, monthSlug } = await params;
  const stateName = STATE_MAP[stateSlug];
  const m = MONTH_MAP[monthSlug];
  if (!stateName || !m) notFound();

  const supabase = getSupabase();
  if (!supabase) notFound();

  const { data: festivals } = await supabase
    .from("festivals")
    .select("*, destinations!inner(name, state_id, state:states(name))")
    .eq("destinations.state_id", stateSlug)
    .eq("month", m.num)
    .order("name");

  const pageUrl = `https://www.nakshiq.com/${locale}/festivals/state/${stateSlug}/${monthSlug}`;
  const eventListLd = festivalsItemListJsonLd(
    (festivals ?? []) as Parameters<typeof festivalsItemListJsonLd>[0],
    m.num,
    pageUrl,
    stateName,
  );

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `https://www.nakshiq.com/${locale}` },
      { "@type": "ListItem", position: 2, name: "Festivals", item: `https://www.nakshiq.com/${locale}/festivals` },
      { "@type": "ListItem", position: 3, name: stateName, item: `https://www.nakshiq.com/${locale}/festivals/state/${stateSlug}` },
      { "@type": "ListItem", position: 4, name: m.name, item: pageUrl },
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
            FESTIVALS · {stateName.toUpperCase()} · {m.name.toUpperCase()}
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
            {stateName} festivals in {m.name}.
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
            {(festivals ?? []).length} festivals this month — dates,
            locations, and travel tips.
          </p>
        </header>

        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
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
              {(festivals ?? []).map((f: FestivalRow) => (
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
                    {f.name}
                  </h3>
                  <p
                    style={{
                      fontFamily: "var(--cinema-mono)",
                      fontSize: 10,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: "var(--bone-faint)",
                      margin: 0,
                    }}
                  >
                    {f.destinations?.name}
                  </p>
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
                  {f.dates && (
                    <p
                      style={{
                        fontFamily: "var(--cinema-mono)",
                        fontSize: 11,
                        letterSpacing: "0.06em",
                        color: "var(--vermillion)",
                        margin: 0,
                      }}
                    >
                      {f.dates}
                    </p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p
              style={{
                padding: "80px 0",
                textAlign: "center",
                fontFamily: "var(--cinema-ui)",
                color: "var(--bone-dim)",
              }}
            >
              No festivals in {stateName} during {m.name}.
            </p>
          )}
        </div>
      </main>

      <CinematicRelatedRail />
      <Footer />
    </div>
  );
}
