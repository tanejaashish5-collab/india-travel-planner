import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { localeAlternates } from "@/lib/seo-utils";
import { CinemaStyles } from "@/components/landing-cinema/cinema-styles";
import { Title } from "@/components/landing-cinema/editorial";
import { CinematicRelatedRail } from "@/components/cinematic-related-rail";

export const revalidate = 21600;

const BASE_URL = "https://www.nakshiq.com";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "Press & research — NakshIQ",
    description:
      "Citable datasets on India travel: the NakshIQ Cost Index (7,000+ verified cost rows across 505 destinations), month-by-month scoring on 5,856 destination-months, and the Tourist Trap Atlas. Attribution, methodology, and a direct line to the newsroom.",
    ...localeAlternates(locale, "/press"),
  };
}

async function getCounts() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    return { rows: 7449, destinations: 491, goCount: 2720, skipCount: 1893, waitCount: 1058, totalDm: 5856, traps: 109 };
  }
  const supabase = createClient(url, key);
  const [costs, dests, goCnt, skipCnt, waitCnt, totalDm, traps] = await Promise.all([
    supabase.from("destination_costs").select("*", { count: "exact", head: true }),
    supabase.from("destinations").select("*", { count: "exact", head: true }),
    supabase.from("destination_months").select("*", { count: "exact", head: true }).eq("verdict", "go"),
    supabase.from("destination_months").select("*", { count: "exact", head: true }).eq("verdict", "skip"),
    supabase.from("destination_months").select("*", { count: "exact", head: true }).eq("verdict", "wait"),
    supabase.from("destination_months").select("*", { count: "exact", head: true }),
    supabase.from("tourist_trap_alternatives").select("*", { count: "exact", head: true }),
  ]);
  return {
    rows: costs.count ?? 7449,
    destinations: dests.count ?? 491,
    goCount: goCnt.count ?? 2720,
    skipCount: skipCnt.count ?? 1893,
    waitCount: waitCnt.count ?? 1058,
    totalDm: totalDm.count ?? 5856,
    traps: traps.count ?? 109,
  };
}

export default async function PressPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const counts = await getCounts();
  const pageUrl = `${BASE_URL}/${locale}/press`;

  const collectionPageLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${pageUrl}#page`,
    url: pageUrl,
    name: "Press & research — NakshIQ",
    description:
      "Citable datasets on India travel: Cost Index, monthly scoring, tourist trap alternatives, and trip reports.",
    inLanguage: locale === "hi" ? "hi-IN" : "en-IN",
    isPartOf: { "@id": `${BASE_URL}#website` },
    publisher: { "@id": `${BASE_URL}#organization` },
  };

  const costIndexDatasetLd = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    "@id": `${BASE_URL}/${locale}/cost-index#dataset`,
    name: "NakshIQ Cost Index 2026",
    description: `${counts.rows.toLocaleString()} verified cost data points across ${counts.destinations} Indian destinations — homestay, hotel, transport, food, permit, and activity costs for every major tier from budget to luxury, surfaced by season.`,
    url: `${BASE_URL}/${locale}/cost-index`,
    keywords: ["India travel costs", "homestay prices India", "travel budget India", "NakshIQ Cost Index"],
    creator: { "@id": `${BASE_URL}#organization` },
    publisher: { "@id": `${BASE_URL}#organization` },
    license: "https://creativecommons.org/licenses/by/4.0/",
    isAccessibleForFree: true,
    inLanguage: locale === "hi" ? "hi-IN" : "en-IN",
    variableMeasured: ["typical_inr", "range_low_inr", "range_high_inr", "budget_tier", "season", "category"],
    spatialCoverage: { "@type": "Place", name: "India" },
    temporalCoverage: "2026-01/..",
  };

  const scoringDatasetLd = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    "@id": `${BASE_URL}/${locale}/methodology#scoring-dataset`,
    name: "NakshIQ Monthly Scoring Matrix",
    description: `${counts.totalDm.toLocaleString()} destination-month scores across ${counts.destinations} Indian destinations — weather suitability, infrastructure, crowd level, safety, and a verdict band (GO / WAIT / SKIP).`,
    url: `${BASE_URL}/${locale}/methodology`,
    keywords: ["India destination scores", "best time to visit India", "NakshIQ verdict", "month scoring India"],
    creator: { "@id": `${BASE_URL}#organization` },
    publisher: { "@id": `${BASE_URL}#organization` },
    license: "https://creativecommons.org/licenses/by/4.0/",
    isAccessibleForFree: true,
    inLanguage: locale === "hi" ? "hi-IN" : "en-IN",
    variableMeasured: ["score", "verdict", "prose_lead", "who_should_go", "who_should_avoid"],
    spatialCoverage: { "@type": "Place", name: "India" },
  };

  const trapsDatasetLd = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    "@id": `${BASE_URL}/${locale}/tourist-traps#dataset`,
    name: "NakshIQ Tourist Trap Atlas",
    description: `${counts.traps} popular Indian destinations NakshIQ scores as overrated, each paired with a verified alternative within driving distance and a sourced explanation of the difference.`,
    url: `${BASE_URL}/${locale}/tourist-traps`,
    keywords: ["tourist traps India", "overrated destinations India", "India travel alternatives"],
    creator: { "@id": `${BASE_URL}#organization` },
    publisher: { "@id": `${BASE_URL}#organization` },
    license: "https://creativecommons.org/licenses/by/4.0/",
    isAccessibleForFree: true,
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${BASE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: "Press", item: pageUrl },
    ],
  };

  const citeApa = `NakshIQ. (2026). NakshIQ Cost Index 2026 [Data set]. NakshIQ. ${BASE_URL}/${locale}/cost-index`;
  const citeMla = `NakshIQ. "NakshIQ Cost Index 2026." NakshIQ, 2026, ${BASE_URL}/${locale}/cost-index. Dataset.`;
  const citeInline = `Source: NakshIQ Cost Index 2026 (${BASE_URL}/${locale}/cost-index)`;

  const stats: { value: string; label: string }[] = [
    { value: counts.destinations.toLocaleString(), label: "Destinations scored" },
    { value: counts.totalDm.toLocaleString(), label: "Destination-months rated" },
    { value: counts.rows.toLocaleString(), label: "Cost Index rows" },
    { value: counts.traps.toLocaleString(), label: "Tourist traps + alternatives" },
  ];

  return (
    <div className="nakshiq-cinema" style={{ minHeight: "100vh" }}>
      <CinemaStyles />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPageLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(costIndexDatasetLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(scoringDatasetLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(trapsDatasetLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
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
              letterSpacing: "0.22em",
            }}
          >
            PRESS & RESEARCH · CC BY 4.0
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
            Press &amp; research.
          </Title>
          <p
            style={{
              fontFamily: "var(--cinema-ui)",
              fontSize: 15,
              lineHeight: 1.7,
              color: "var(--bone-dim)",
              marginTop: 20,
              maxWidth: 720,
            }}
          >
            NakshIQ scores, costs, and verdicts on India travel are built to be cited. Journalists,
            researchers, and travel operators use this data every week. Here&apos;s what&apos;s available, how
            to cite it, and where to reach us.
          </p>
        </header>

        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          {/* Stats strip */}
          <section style={{ marginBottom: 48 }}>
            <p
              className="nq-kicker"
              style={{
                color: "var(--vermillion)",
                marginBottom: 16,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
              }}
            >
              The NakshIQ dataset · at a glance
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                gap: 1,
                background: "var(--hair)",
                border: "1px solid var(--hair)",
              }}
            >
              {stats.map((s) => (
                <div key={s.label} style={{ padding: 20, background: "var(--paper)" }}>
                  <p
                    style={{
                      fontFamily: "var(--cinema-mono)",
                      fontSize: 10,
                      letterSpacing: "0.22em",
                      textTransform: "uppercase",
                      color: "var(--bone-faint)",
                      margin: 0,
                    }}
                  >
                    {s.label}
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--cinema-display)",
                      fontStyle: "italic",
                      fontWeight: 500,
                      fontSize: 36,
                      lineHeight: 1.05,
                      color: "var(--bone)",
                      margin: "6px 0 0",
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    {s.value}
                  </p>
                </div>
              ))}
            </div>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 16,
                marginTop: 16,
                fontFamily: "var(--cinema-mono)",
                fontSize: 11,
                letterSpacing: "0.12em",
                color: "var(--bone-dim)",
                fontVariantNumeric: "tabular-nums",
              }}
            >
              <span>
                <span style={{ color: "var(--bone)" }}>{counts.goCount.toLocaleString()}</span> GO
              </span>
              <span>
                <span style={{ color: "var(--bone)" }}>{counts.waitCount.toLocaleString()}</span> WAIT
              </span>
              <span>
                <span style={{ color: "var(--vermillion)" }}>{counts.skipCount.toLocaleString()}</span> SKIP
              </span>
            </div>
          </section>

          {/* Datasets */}
          <section style={{ marginBottom: 48 }}>
            <h2
              style={{
                fontFamily: "var(--cinema-display)",
                fontStyle: "italic",
                fontWeight: 500,
                fontSize: 32,
                lineHeight: 1.1,
                color: "var(--bone)",
                margin: "0 0 24px",
              }}
            >
              Datasets.
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {/* Cost Index */}
              <article style={{ padding: 24, border: "1px solid var(--hair)", background: "var(--paper)" }}>
                <header style={{ display: "flex", justifyContent: "space-between", gap: 16, flexWrap: "wrap", marginBottom: 14 }}>
                  <div style={{ flex: 1, minWidth: 240 }}>
                    <p
                      style={{
                        fontFamily: "var(--cinema-display)",
                        fontStyle: "italic",
                        fontWeight: 500,
                        fontSize: 22,
                        lineHeight: 1.2,
                        color: "var(--bone)",
                        margin: "0 0 8px",
                      }}
                    >
                      NakshIQ Cost Index 2026
                    </p>
                    <p style={{ fontFamily: "var(--cinema-ui)", fontSize: 13, lineHeight: 1.6, color: "var(--bone-dim)", margin: 0 }}>
                      {counts.rows.toLocaleString()} verified cost data points — homestay, hotel, food, transport,
                      permit, and activity rates across {counts.destinations} destinations and three seasonal bands.
                    </p>
                  </div>
                  <Link
                    href={`/${locale}/cost-index`}
                    style={{
                      flexShrink: 0,
                      fontFamily: "var(--cinema-mono)",
                      fontSize: 11,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      padding: "8px 14px",
                      border: "1px solid var(--vermillion)",
                      color: "var(--vermillion)",
                      textDecoration: "none",
                    }}
                  >
                    Explore →
                  </Link>
                </header>
                <dl
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
                    gap: 12,
                    paddingTop: 14,
                    borderTop: "1px solid var(--hair)",
                    margin: 0,
                  }}
                >
                  <div>
                    <dt style={{ fontFamily: "var(--cinema-mono)", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--bone-faint)", marginBottom: 4 }}>
                      Coverage
                    </dt>
                    <dd style={{ margin: 0, fontFamily: "var(--cinema-ui)", fontSize: 12, color: "var(--bone)" }}>All India, 6 categories</dd>
                  </div>
                  <div>
                    <dt style={{ fontFamily: "var(--cinema-mono)", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--bone-faint)", marginBottom: 4 }}>
                      Update cadence
                    </dt>
                    <dd style={{ margin: 0, fontFamily: "var(--cinema-ui)", fontSize: 12, color: "var(--bone)" }}>Quarterly (next: July 2026)</dd>
                  </div>
                  <div>
                    <dt style={{ fontFamily: "var(--cinema-mono)", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--bone-faint)", marginBottom: 4 }}>
                      License
                    </dt>
                    <dd style={{ margin: 0, fontFamily: "var(--cinema-ui)", fontSize: 12, color: "var(--bone)" }}>CC BY 4.0</dd>
                  </div>
                </dl>
                <div style={{ marginTop: 14 }}>
                  <Link
                    href={`/${locale}/cost-index/methodology`}
                    style={{ fontFamily: "var(--cinema-ui)", fontSize: 12, color: "var(--vermillion)", textDecoration: "underline", textUnderlineOffset: "3px" }}
                  >
                    Methodology &amp; derivation →
                  </Link>
                </div>
              </article>

              {/* Scoring */}
              <article style={{ padding: 24, border: "1px solid var(--hair)", background: "var(--paper)" }}>
                <header style={{ display: "flex", justifyContent: "space-between", gap: 16, flexWrap: "wrap", marginBottom: 14 }}>
                  <div style={{ flex: 1, minWidth: 240 }}>
                    <p
                      style={{
                        fontFamily: "var(--cinema-display)",
                        fontStyle: "italic",
                        fontWeight: 500,
                        fontSize: 22,
                        lineHeight: 1.2,
                        color: "var(--bone)",
                        margin: "0 0 8px",
                      }}
                    >
                      Monthly Scoring Matrix
                    </p>
                    <p style={{ fontFamily: "var(--cinema-ui)", fontSize: 13, lineHeight: 1.6, color: "var(--bone-dim)", margin: 0 }}>
                      {counts.totalDm.toLocaleString()} destination-month scores — weather, crowds,
                      infrastructure, safety — with a verdict band (GO / WAIT / SKIP) for every combination of
                      destination and calendar month.
                    </p>
                  </div>
                  <Link
                    href={`/${locale}/methodology`}
                    style={{
                      flexShrink: 0,
                      fontFamily: "var(--cinema-mono)",
                      fontSize: 11,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      padding: "8px 14px",
                      border: "1px solid var(--vermillion)",
                      color: "var(--vermillion)",
                      textDecoration: "none",
                    }}
                  >
                    Methodology →
                  </Link>
                </header>
                <dl
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
                    gap: 12,
                    paddingTop: 14,
                    borderTop: "1px solid var(--hair)",
                    margin: 0,
                  }}
                >
                  <div>
                    <dt style={{ fontFamily: "var(--cinema-mono)", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--bone-faint)", marginBottom: 4 }}>
                      Verdicts
                    </dt>
                    <dd style={{ margin: 0, fontFamily: "var(--cinema-ui)", fontSize: 12, color: "var(--bone)", fontVariantNumeric: "tabular-nums" }}>
                      {counts.goCount.toLocaleString()} GO / {counts.waitCount.toLocaleString()} WAIT /{" "}
                      {counts.skipCount.toLocaleString()} SKIP
                    </dd>
                  </div>
                  <div>
                    <dt style={{ fontFamily: "var(--cinema-mono)", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--bone-faint)", marginBottom: 4 }}>
                      Granularity
                    </dt>
                    <dd style={{ margin: 0, fontFamily: "var(--cinema-ui)", fontSize: 12, color: "var(--bone)" }}>
                      Destination × month
                    </dd>
                  </div>
                  <div>
                    <dt style={{ fontFamily: "var(--cinema-mono)", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--bone-faint)", marginBottom: 4 }}>
                      Refresh
                    </dt>
                    <dd style={{ margin: 0, fontFamily: "var(--cinema-ui)", fontSize: 12, color: "var(--bone)" }}>
                      Monthly on the 1st (IST)
                    </dd>
                  </div>
                </dl>
              </article>

              {/* Tourist traps */}
              <article style={{ padding: 24, border: "1px solid var(--hair)", background: "var(--paper)" }}>
                <header style={{ display: "flex", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
                  <div style={{ flex: 1, minWidth: 240 }}>
                    <p
                      style={{
                        fontFamily: "var(--cinema-display)",
                        fontStyle: "italic",
                        fontWeight: 500,
                        fontSize: 22,
                        lineHeight: 1.2,
                        color: "var(--bone)",
                        margin: "0 0 8px",
                      }}
                    >
                      Tourist Trap Atlas
                    </p>
                    <p style={{ fontFamily: "var(--cinema-ui)", fontSize: 13, lineHeight: 1.6, color: "var(--bone-dim)", margin: 0 }}>
                      {counts.traps} popular Indian destinations NakshIQ scores as overrated, each paired with a
                      verified alternative within driving distance and a sourced explanation of why.
                    </p>
                  </div>
                  <Link
                    href={`/${locale}/tourist-traps`}
                    style={{
                      flexShrink: 0,
                      fontFamily: "var(--cinema-mono)",
                      fontSize: 11,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      padding: "8px 14px",
                      border: "1px solid var(--vermillion)",
                      color: "var(--vermillion)",
                      textDecoration: "none",
                    }}
                  >
                    Atlas →
                  </Link>
                </header>
              </article>
            </div>
          </section>

          {/* Citation */}
          <section style={{ marginBottom: 48 }}>
            <h2
              style={{
                fontFamily: "var(--cinema-display)",
                fontStyle: "italic",
                fontWeight: 500,
                fontSize: 32,
                lineHeight: 1.1,
                color: "var(--bone)",
                margin: "0 0 12px",
              }}
            >
              How to cite NakshIQ.
            </h2>
            <p
              style={{
                fontFamily: "var(--cinema-ui)",
                fontSize: 14,
                lineHeight: 1.7,
                color: "var(--bone-dim)",
                margin: "0 0 20px",
              }}
            >
              NakshIQ data is CC BY 4.0 — free to use, remix, and republish with attribution. Please link back
              to the source page so readers can verify the current version.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <CiteBlock label="Inline / caption" text={citeInline} />
              <CiteBlock label="APA 7" text={citeApa} />
              <CiteBlock label="MLA 9" text={citeMla} />
            </div>
          </section>

          {/* Press contact */}
          <section
            style={{
              padding: 28,
              border: "1px solid var(--vermillion)",
              background: "rgba(229, 86, 66, 0.04)",
              marginBottom: 24,
            }}
          >
            <p
              style={{
                fontFamily: "var(--cinema-mono)",
                fontSize: 10,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "var(--vermillion)",
                margin: "0 0 14px",
              }}
            >
              Press contact
            </p>
            <p
              style={{
                fontFamily: "var(--cinema-display)",
                fontStyle: "italic",
                fontWeight: 500,
                fontSize: 22,
                lineHeight: 1.25,
                color: "var(--bone)",
                margin: "0 0 12px",
              }}
            >
              One business day for editorial queries.
            </p>
            <p style={{ fontFamily: "var(--cinema-ui)", fontSize: 14, lineHeight: 1.7, color: "var(--bone-dim)", margin: "0 0 18px" }}>
              For interviews, commissioned research, or custom data pulls for a feature, reach out directly.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              <Link
                href={`/${locale}/contact`}
                style={{
                  fontFamily: "var(--cinema-mono)",
                  fontSize: 11,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  padding: "8px 14px",
                  background: "var(--vermillion)",
                  color: "var(--paper)",
                  textDecoration: "none",
                }}
              >
                Contact newsroom →
              </Link>
              <Link
                href={`/${locale}/about/team`}
                style={{
                  fontFamily: "var(--cinema-mono)",
                  fontSize: 11,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  padding: "8px 14px",
                  border: "1px solid var(--hair)",
                  color: "var(--bone-dim)",
                  textDecoration: "none",
                }}
              >
                Masthead →
              </Link>
              <Link
                href={`/${locale}/corrections`}
                style={{
                  fontFamily: "var(--cinema-mono)",
                  fontSize: 11,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  padding: "8px 14px",
                  border: "1px solid var(--hair)",
                  color: "var(--bone-dim)",
                  textDecoration: "none",
                }}
              >
                Corrections log →
              </Link>
            </div>
          </section>

          {/* Editorial independence */}
          <section style={{ padding: 24, border: "1px solid var(--hair)", background: "var(--paper)" }}>
            <p
              style={{
                fontFamily: "var(--cinema-display)",
                fontStyle: "italic",
                fontWeight: 500,
                fontSize: 19,
                lineHeight: 1.3,
                color: "var(--bone)",
                margin: "0 0 10px",
              }}
            >
              Editorial independence.
            </p>
            <p style={{ fontFamily: "var(--cinema-ui)", fontSize: 14, lineHeight: 1.7, color: "var(--bone-dim)", margin: 0 }}>
              NakshIQ accepts no paid placements, no sponsored content, and no tourism board promotion packages.
              Scoring and cost data are built independently of any commercial relationship with a destination,
              operator, or partner. See our{" "}
              <Link
                href={`/${locale}/editorial-policy`}
                style={{ color: "var(--vermillion)", textDecoration: "underline", textUnderlineOffset: "3px" }}
              >
                editorial policy
              </Link>
              .
            </p>
          </section>
        </div>
      </main>

      <CinematicRelatedRail />
      <Footer />
    </div>
  );
}

function CiteBlock({ label, text }: { label: string; text: string }) {
  return (
    <div style={{ padding: 16, border: "1px solid var(--hair)", background: "var(--paper)" }}>
      <p
        style={{
          fontFamily: "var(--cinema-mono)",
          fontSize: 10,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: "var(--bone-faint)",
          margin: "0 0 8px",
        }}
      >
        {label}
      </p>
      <pre
        style={{
          fontFamily: "var(--cinema-mono)",
          fontSize: 12,
          lineHeight: 1.6,
          color: "var(--bone)",
          margin: 0,
          whiteSpace: "pre-wrap",
          wordBreak: "break-word",
        }}
      >
        {text}
      </pre>
    </div>
  );
}
