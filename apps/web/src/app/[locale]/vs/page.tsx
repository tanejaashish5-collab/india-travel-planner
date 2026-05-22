import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { createClient } from "@supabase/supabase-js";
import { VS_PAIRS, VS_THEME_LABELS } from "@/lib/vs-pairs";
import { localeAlternates } from "@/lib/seo-utils";
import { CinemaStyles } from "@/components/landing-cinema/cinema-styles";
import { Title } from "@/components/landing-cinema/editorial";
import { CinematicRelatedRail } from "@/components/cinematic-related-rail";

export const revalidate = 86400;

const SITE = "https://www.nakshiq.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "Compare India Destinations: Side-by-Side Travel Comparisons",
    description: `${VS_PAIRS.length}+ honest destination comparisons — Manali vs Shimla, Spiti vs Ladakh, Ooty vs Kodaikanal. Weather, cost, difficulty & kid-friendliness side-by-side.`,
    ...localeAlternates(locale, "/vs"),
  };
}

async function getDestinationNames() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return {};
  const supabase = createClient(url, key);
  // Fetch the full destination set (505 rows, one page) rather than an
  // .in(VS_DESTINATION_IDS) filter — the id list now runs to a few hundred
  // entries and a long query string risks a 414.
  const { data } = await supabase
    .from("destinations")
    .select("id, name, state:states(name)");
  const map: Record<string, { name: string; state: string }> = {};
  (data ?? []).forEach((d: Record<string, unknown>) => {
    const stateField = d.state as { name: string } | { name: string }[] | null | undefined;
    map[d.id as string] = {
      name: d.name as string,
      state: (Array.isArray(stateField) ? stateField[0]?.name : stateField?.name) ?? "",
    };
  });
  return map;
}

export default async function VsIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const destMap = await getDestinationNames();

  const byTheme: Record<string, typeof VS_PAIRS> = {};
  VS_PAIRS.forEach((p) => {
    if (!byTheme[p.theme]) byTheme[p.theme] = [];
    byTheme[p.theme].push(p);
  });

  const themes = Array.from(new Set(VS_PAIRS.map((p) => p.theme)));

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/${locale}` },
      { "@type": "ListItem", position: 2, name: "Compare", item: `${SITE}/${locale}/vs` },
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
        <header style={{ maxWidth: 900, margin: "0 auto 56px" }}>
          <p
            className="nq-kicker"
            style={{
              color: "var(--vermillion)",
              marginBottom: 20,
              letterSpacing: "0.22em",
            }}
          >
            COMPARISONS · {String(VS_PAIRS.length).padStart(3, "0")} PAIRS · {themes.length} THEMES
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
            Compare destinations.
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
            {VS_PAIRS.length} side-by-side comparisons. Weather scores by month, cost, difficulty,
            kid-friendliness, infrastructure.
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
            Pick the one that fits your trip. No sponsored spin.
          </p>
        </header>

        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          {themes.map((theme) => (
            <section key={theme} style={{ marginBottom: 56 }}>
              <p
                className="nq-kicker"
                style={{
                  color: "var(--vermillion)",
                  marginBottom: 16,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                }}
              >
                {VS_THEME_LABELS[theme] ?? theme} · {String(byTheme[theme].length).padStart(2, "0")}
              </p>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                  gap: 1,
                  background: "var(--hair)",
                  border: "1px solid var(--hair)",
                }}
              >
                {byTheme[theme].map((p) => {
                  const d1 = destMap[p.id1];
                  const d2 = destMap[p.id2];
                  if (!d1 || !d2) return null;
                  return (
                    <Link
                      key={`${p.id1}-${p.id2}`}
                      href={`/${locale}/vs/${p.id1}-vs-${p.id2}`}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "18px 20px",
                        background: "var(--paper)",
                        textDecoration: "none",
                        gap: 12,
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--cinema-display)",
                          fontStyle: "italic",
                          fontWeight: 500,
                          fontSize: 18,
                          lineHeight: 1.2,
                          color: "var(--bone)",
                        }}
                      >
                        {d1.name}{" "}
                        <span
                          style={{
                            fontFamily: "var(--cinema-mono)",
                            fontStyle: "normal",
                            fontSize: 11,
                            letterSpacing: "0.18em",
                            textTransform: "uppercase",
                            color: "var(--bone-faint)",
                            margin: "0 6px",
                          }}
                        >
                          vs
                        </span>
                        {d2.name}
                      </span>
                      <span
                        style={{
                          fontFamily: "var(--cinema-mono)",
                          fontSize: 12,
                          color: "var(--vermillion)",
                          flexShrink: 0,
                        }}
                      >
                        →
                      </span>
                    </Link>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </main>

      <CinematicRelatedRail />
      <Footer />
    </div>
  );
}
