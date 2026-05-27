import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { notFound } from "next/navigation";
import Link from "next/link";
import { STATE_MAP, getSupabase } from "@/lib/seo-maps";
import { localeAlternates } from "@/lib/seo-utils";
import { CinemaStyles } from "@/components/landing-cinema/cinema-styles";
import { Title } from "@/components/landing-cinema/editorial";
import { CinematicRelatedRail } from "@/components/cinematic-related-rail";

export const revalidate = 86400;
export const dynamicParams = true;

// Next 16: a dynamic-segment route without generateStaticParams is treated as
// fully dynamic (Cache-Control: private/no-cache/no-store) regardless of the
// `revalidate` value. Return [] to opt into ISR-on-demand without pre-building.
export async function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; stateSlug: string}> }): Promise<Metadata> {
  const { locale, stateSlug } = await params;
  const stateName = STATE_MAP[stateSlug];
  if (!stateName) return {};
  return {
    title: `Camping in ${stateName} — Scored Spots & Sites`,
    description: `Every camping spot in ${stateName} with honest reviews, facilities, water access, permit requirements, and best months. No sponsored content.`,
    ...localeAlternates(locale, `/camping/state/${stateSlug}`),
  };
}

type SpotRow = {
  id: string;
  name: string;
  description?: string | null;
  water_source?: boolean | string | null;
  permit_required?: boolean | null;
  destination?: { name?: string; state?: { name?: string } | null } | null;
};

export default async function CampingByStatePage({ params }: { params: Promise<{ locale: string; stateSlug: string }> }) {
  const { locale, stateSlug } = await params;
  const stateName = STATE_MAP[stateSlug];
  if (!stateName) notFound();

  const supabase = getSupabase();
  if (!supabase) notFound();

  const { data: spots } = await supabase
    .from("camping_spots")
    .select("*, destination:destinations(name, state:states(name))")
    .order("name");

  const filtered = (spots ?? []).filter((s: SpotRow) => s.destination?.state?.name === stateName);

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `https://www.nakshiq.com/${locale}` },
      { "@type": "ListItem", position: 2, name: "Camping", item: `https://www.nakshiq.com/${locale}/camping` },
      { "@type": "ListItem", position: 3, name: stateName, item: `https://www.nakshiq.com/${locale}/camping/state/${stateSlug}` },
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
            CAMPING · {stateName.toUpperCase()} · {String(filtered.length).padStart(3, "0")} SITES
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
            Camping in {stateName}.
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
            {filtered.length} camping spots across {stateName} — facilities,
            water access, permits, and honest reviews.
          </p>
        </header>

        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          {filtered.length > 0 ? (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: 1,
                background: "var(--hair)",
                border: "1px solid var(--hair)",
              }}
            >
              {filtered.map((spot: SpotRow) => (
                <div
                  key={spot.id}
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
                    {spot.name}
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
                    {spot.destination?.name}
                  </p>
                  {spot.description && (
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
                      {spot.description}
                    </p>
                  )}
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 4 }}>
                    {spot.water_source && (
                      <span
                        style={{
                          fontFamily: "var(--cinema-mono)",
                          fontSize: 9,
                          letterSpacing: "0.18em",
                          textTransform: "uppercase",
                          color: "var(--bone-dim)",
                          border: "1px solid var(--hair)",
                          padding: "2px 6px",
                        }}
                      >
                        Water
                      </span>
                    )}
                    {spot.permit_required && (
                      <span
                        style={{
                          fontFamily: "var(--cinema-mono)",
                          fontSize: 9,
                          letterSpacing: "0.18em",
                          textTransform: "uppercase",
                          color: "var(--vermillion)",
                          border: "1px solid var(--vermillion)",
                          padding: "2px 6px",
                        }}
                      >
                        Permit
                      </span>
                    )}
                  </div>
                </div>
              ))}
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
              <p>No camping spots listed for {stateName} yet.</p>
              <Link
                href={`/${locale}/camping`}
                style={{
                  display: "inline-block",
                  marginTop: 12,
                  color: "var(--vermillion)",
                  textDecoration: "underline",
                  textUnderlineOffset: "3px",
                }}
              >
                View all camping spots →
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
