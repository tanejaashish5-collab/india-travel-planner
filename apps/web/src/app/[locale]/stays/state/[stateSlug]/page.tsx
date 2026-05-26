import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";
import { STATE_MAP } from "@/lib/seo-maps";
import { localeAlternates } from "@/lib/seo-utils";
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

export async function generateMetadata({ params }: { params: Promise<{ locale: string; stateSlug: string}> }): Promise<Metadata> {
  const { locale, stateSlug } = await params;
  const stateName = STATE_MAP[stateSlug];
  if (!stateName) return {};
  return {
    title: `Where to Stay in ${stateName} — Verified Accommodations`,
    description: `Hotels, homestays, camps, and hostels across ${stateName}. Honest reviews, real prices, no sponsored placements.`,
    ...localeAlternates(locale, `/stays/state/${stateSlug}`),
  };
}

type StayRow = {
  id: string;
  name: string;
  type?: string | null;
  price_range?: string | null;
  description?: string | null;
  destination?: { name?: string } | null;
};

export default async function StaysByStatePage({ params }: { params: Promise<{ locale: string; stateSlug: string }> }) {
  const { locale, stateSlug } = await params;
  const stateName = STATE_MAP[stateSlug];
  if (!stateName) notFound();

  const supabase = getSupabase();
  if (!supabase) notFound();

  const { data: stays } = await supabase
    .from("local_stays")
    .select("*, destination:destinations!inner(name, state_id, state:states(name))")
    .eq("destination.state_id", stateSlug)
    .order("name");

  const grouped = (stays ?? []).reduce((acc: Record<string, StayRow[]>, s: StayRow) => {
    const destName = s.destination?.name || "Other";
    if (!acc[destName]) acc[destName] = [];
    acc[destName].push(s);
    return acc;
  }, {});

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `https://www.nakshiq.com/${locale}` },
      { "@type": "ListItem", position: 2, name: "Stays", item: `https://www.nakshiq.com/${locale}/stays` },
      { "@type": "ListItem", position: 3, name: stateName, item: `https://www.nakshiq.com/${locale}/stays/state/${stateSlug}` },
    ],
  };

  return (
    <div className="nakshiq-cinema" style={{ minHeight: "100vh" }}>
      <CinemaStyles />
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
            WHERE TO STAY · {stateName.toUpperCase()} · {String((stays ?? []).length).padStart(3, "0")}
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
            Where to stay in {stateName}.
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
            {(stays ?? []).length} verified accommodations across{" "}
            {stateName} — no sponsored listings.
          </p>
        </header>

        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          {Object.entries(grouped).sort(([a], [b]) => a.localeCompare(b)).map(([destName, destStays]) => (
            <section key={destName} style={{ marginBottom: 48 }}>
              <h2
                style={{
                  fontFamily: "var(--cinema-display)",
                  fontStyle: "italic",
                  fontWeight: 500,
                  fontSize: 28,
                  lineHeight: 1.1,
                  color: "var(--bone)",
                  margin: "0 0 16px",
                  paddingBottom: 10,
                  borderBottom: "1px solid var(--hair)",
                }}
              >
                {destName}
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
                {(destStays as StayRow[]).map((s) => (
                  <div
                    key={s.id}
                    style={{
                      padding: 18,
                      background: "var(--paper)",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "baseline",
                        gap: 8,
                        marginBottom: 6,
                      }}
                    >
                      <h3
                        style={{
                          fontFamily: "var(--cinema-display)",
                          fontStyle: "italic",
                          fontWeight: 500,
                          fontSize: 18,
                          lineHeight: 1.25,
                          color: "var(--bone)",
                          margin: 0,
                          flex: 1,
                        }}
                      >
                        {s.name}
                      </h3>
                      {s.type && (
                        <span
                          style={{
                            fontFamily: "var(--cinema-mono)",
                            fontSize: 9,
                            letterSpacing: "0.18em",
                            textTransform: "uppercase",
                            color: "var(--bone-faint)",
                            border: "1px solid var(--hair)",
                            padding: "2px 6px",
                          }}
                        >
                          {s.type}
                        </span>
                      )}
                    </div>
                    {s.price_range && (
                      <p
                        style={{
                          fontFamily: "var(--cinema-mono)",
                          fontSize: 11,
                          color: "var(--vermillion)",
                          margin: "0 0 6px",
                        }}
                      >
                        {s.price_range}
                      </p>
                    )}
                    {s.description && (
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
                        {s.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          ))}
          {(stays ?? []).length === 0 && (
            <p
              style={{
                padding: "80px 0",
                textAlign: "center",
                fontFamily: "var(--cinema-ui)",
                color: "var(--bone-dim)",
              }}
            >
              No stays listed for {stateName} yet.
            </p>
          )}
        </div>
      </main>

      <CinematicRelatedRail />
      <Footer />
    </div>
  );
}
