import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { createClient } from "@supabase/supabase-js";
import { localeAlternates } from "@/lib/seo-utils";
import {
  FABRICATION_AUDIT,
  CROSS_STATE_CATCHES,
  CODE_GUARDRAILS,
  getAuditTotals,
} from "@/lib/fabrication-audit";
import { CinemaStyles } from "@/components/landing-cinema/cinema-styles";
import { Title } from "@/components/landing-cinema/editorial";
import { CinematicRelatedRail } from "@/components/cinematic-related-rail";

// 24h ISR — same cadence as /methodology. Audit log is hardcoded, but the
// corpus counters strip below it is live-fetched.
export const revalidate = 86400;

const SITE = "https://www.nakshiq.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "Fabrication audit — NakshIQ",
    description:
      "What we caught while auditing destination stays state by state. Hotels that don't exist, listicles that swap towns, properties listed under the wrong city. The catching is the moat — and we publish it.",
    ...localeAlternates(locale, "/transparency"),
  };
}

async function getCorpusCounts() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;

  const supabase = createClient(url, key);
  const [destinations, eateries, stays] = await Promise.all([
    supabase.from("destinations").select("id", { count: "exact", head: true }),
    supabase
      .from("local_eateries")
      .select("id", { count: "exact", head: true })
      .eq("is_active", true),
    supabase
      .from("destination_stay_picks")
      .select("destination_id", { count: "exact", head: true }),
  ]);

  return {
    destinations: destinations.count ?? null,
    eateries: eateries.count ?? null,
    stays: stays.count ?? null,
  };
}

function formatPct(p: number | null): string {
  if (p == null) return "—";
  if (p === 0) return "0%";
  if (p < 1) return `${p.toFixed(1)}%`;
  return `${Math.round(p)}%`;
}

const h2Style = {
  fontFamily: "var(--cinema-display)",
  fontStyle: "italic" as const,
  fontWeight: 500,
  fontSize: 28,
  lineHeight: 1.15,
  color: "var(--bone)",
  margin: "0 0 16px",
};

const proseStyle = {
  fontFamily: "var(--cinema-ui)",
  fontSize: 14,
  lineHeight: 1.75,
  color: "var(--bone-dim)",
  margin: 0,
};

const inlineLinkStyle = {
  color: "var(--vermillion)",
  textDecoration: "underline",
  textUnderlineOffset: "3px",
};

export default async function TransparencyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const counts = await getCorpusCounts();
  const totals = getAuditTotals();

  // Sort: fabrication-rate DESC, then by completion date (most recent first)
  const rows = [...FABRICATION_AUDIT].sort((a, b) => {
    const aRate = a.fabricationRate ?? -1;
    const bRate = b.fabricationRate ?? -1;
    if (bRate !== aRate) return bRate - aRate;
    return b.completionDate.localeCompare(a.completionDate);
  });

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/${locale}` },
      { "@type": "ListItem", position: 2, name: "Fabrication audit", item: `${SITE}/${locale}/transparency` },
    ],
  };

  const stats = [
    { value: String(totals.statesCovered), label: "States closed" },
    { value: totals.staysAudited.toLocaleString("en-IN"), label: "Stay candidates audited" },
    { value: String(totals.fabricationsCaught), label: "Named fabrications caught" },
    { value: String(totals.honestScarcityNulls), label: "Honest-scarcity blanks" },
  ];

  const today = new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });

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
        <header style={{ maxWidth: 820, margin: "0 auto 48px" }}>
          <p
            className="nq-kicker"
            style={{
              color: "var(--vermillion)",
              marginBottom: 20,
              letterSpacing: "0.22em",
            }}
          >
            ISSUE 01 · UPDATED {today.toUpperCase()}
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
            Fabrication audit.
          </Title>
          <p
            style={{
              fontFamily: "var(--cinema-display)",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "clamp(18px, 2vw, 24px)",
              lineHeight: 1.4,
              color: "var(--bone-dim)",
              marginTop: 20,
              maxWidth: 720,
            }}
          >
            What we caught, state by state.
          </p>
        </header>

        <div style={{ maxWidth: 820, margin: "0 auto", display: "flex", flexDirection: "column", gap: 56 }}>
          {/* Manifesto */}
          <section>
            <h2 style={h2Style}>Why we publish this.</h2>
            <p style={proseStyle}>
              Most travel sites don&apos;t publish their audit log. The reason is obvious: an audit log lists
              the things you almost got wrong. We publish ours because the catching is the actual moat. Anyone
              can write a destination page. The harder skill is recognising the listicle that confidently lists
              a hotel in the wrong town, the homestay that&apos;s been closed since 2022, the resort that turns
              out to share a name with a real property in the Philippines.
            </p>
            <p style={{ ...proseStyle, marginTop: 16 }}>
              Roughly one in three numbers we research turns out to be wrong, dead, or moved. The work of
              catching that — and refusing to ship it — is the part of the job a generic AI travel planner
              can&apos;t do. The notes below are the receipts.
            </p>
            <p style={{ ...proseStyle, marginTop: 16 }}>
              These are catches we know about. Every destination card carries a &quot;Report a fabrication&quot;
              link for the unknown unknowns — the ones we missed and you find first.
            </p>
          </section>

          {/* Stats strip */}
          <section>
            <h2 style={h2Style}>The audit so far.</h2>
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
                      fontSize: 32,
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
            {counts && (
              <p
                style={{
                  fontFamily: "var(--cinema-ui)",
                  fontSize: 13,
                  lineHeight: 1.7,
                  color: "var(--bone-dim)",
                  margin: "16px 0 0",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                Current published corpus:{" "}
                {counts.destinations != null && (
                  <>
                    <strong style={{ color: "var(--bone)", fontWeight: 600 }}>
                      {counts.destinations.toLocaleString("en-IN")}
                    </strong>{" "}
                    destinations ·{" "}
                  </>
                )}
                {counts.eateries != null && (
                  <>
                    <strong style={{ color: "var(--bone)", fontWeight: 600 }}>
                      {counts.eateries.toLocaleString("en-IN")}
                    </strong>{" "}
                    verified eateries ·{" "}
                  </>
                )}
                {counts.stays != null && (
                  <>
                    <strong style={{ color: "var(--bone)", fontWeight: 600 }}>
                      {counts.stays.toLocaleString("en-IN")}
                    </strong>{" "}
                    verified stay picks
                  </>
                )}
                . What follows is what we caught before any of this got published.
              </p>
            )}
          </section>

          {/* By-state details/summary table */}
          <section>
            <h2 style={h2Style}>By state.</h2>
            <p style={{ ...proseStyle, marginBottom: 20 }}>
              Sorted by fabrication-rate caught, highest first. A high rate isn&apos;t a state&apos;s failing
              — it&apos;s the listicle ecosystem&apos;s. It also means our audit on that state worked.
            </p>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                border: "1px solid var(--hair)",
              }}
            >
              {rows.map((row, idx) => (
                <details
                  key={row.state}
                  style={{
                    background: "var(--paper)",
                    borderTop: idx === 0 ? "none" : "1px solid var(--hair)",
                  }}
                >
                  <summary
                    style={{
                      cursor: "pointer",
                      listStyle: "none",
                      padding: "16px 20px",
                      display: "flex",
                      alignItems: "baseline",
                      justifyContent: "space-between",
                      gap: 12,
                      flexWrap: "wrap",
                    }}
                  >
                    <span style={{ display: "flex", alignItems: "baseline", gap: 12, flexWrap: "wrap" }}>
                      <span
                        style={{
                          fontFamily: "var(--cinema-display)",
                          fontStyle: "italic",
                          fontWeight: 500,
                          fontSize: 17,
                          color: "var(--bone)",
                        }}
                      >
                        {row.state}
                      </span>
                      <span
                        style={{
                          fontFamily: "var(--cinema-mono)",
                          fontSize: 11,
                          color: "var(--bone-faint)",
                          fontVariantNumeric: "tabular-nums",
                        }}
                      >
                        {row.destinations} dests · {row.staysAudited} candidates
                      </span>
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--cinema-mono)",
                        fontSize: 12,
                        color: row.fabricationsCaught > 0 ? "var(--vermillion)" : "var(--bone-faint)",
                        fontVariantNumeric: "tabular-nums",
                      }}
                    >
                      {row.fabricationsCaught > 0
                        ? `${row.fabricationsCaught} caught · ${formatPct(row.fabricationRate)}`
                        : "no fabrications"}
                    </span>
                  </summary>
                  <div style={{ padding: "0 20px 18px", borderTop: "1px solid var(--hair)", marginTop: 4 }}>
                    <p
                      style={{
                        fontFamily: "var(--cinema-mono)",
                        fontSize: 10,
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                        color: "var(--bone-faint)",
                        margin: "12px 0 12px",
                        fontVariantNumeric: "tabular-nums",
                      }}
                    >
                      Closed{" "}
                      {new Date(row.completionDate).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}{" "}
                      · {row.eateriesAudited} eateries audited · {row.honestScarcityNulls} fields left blank
                    </p>
                    <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                      {row.examples.map((ex, i) => (
                        <li
                          key={i}
                          style={{
                            display: "flex",
                            gap: 12,
                            alignItems: "baseline",
                            fontFamily: "var(--cinema-ui)",
                            fontSize: 13,
                            lineHeight: 1.65,
                            color: "var(--bone-dim)",
                          }}
                        >
                          <span style={{ flexShrink: 0, color: "var(--vermillion)" }}>—</span>
                          <span>{ex}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </details>
              ))}
            </div>
          </section>

          {/* Cross-state catches */}
          <section>
            <h2 style={h2Style}>Cross-state catches.</h2>
            <p style={{ ...proseStyle, marginBottom: 20 }}>
              The most readable proof of why we audit. A listicle confidently lists a property under one
              location; the property is somewhere else entirely, or somewhere else&apos;s tourism brand has
              been pasted over.
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12 }}>
              {CROSS_STATE_CATCHES.map((catch_, i) => (
                <li
                  key={i}
                  style={{
                    padding: 18,
                    border: "1px solid var(--hair)",
                    background: "var(--paper)",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "var(--cinema-display)",
                      fontStyle: "italic",
                      fontWeight: 500,
                      fontSize: 16,
                      lineHeight: 1.3,
                      color: "var(--bone)",
                      margin: "0 0 6px",
                    }}
                  >
                    {catch_.claimed}
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--cinema-ui)",
                      fontSize: 13,
                      lineHeight: 1.6,
                      color: "var(--bone-dim)",
                      margin: "0 0 6px",
                    }}
                  >
                    {catch_.reality}
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--cinema-mono)",
                      fontSize: 11,
                      color: "var(--bone-faint)",
                      margin: 0,
                    }}
                  >
                    Caught during {catch_.state}.
                  </p>
                </li>
              ))}
            </ul>
          </section>

          {/* Code-side guardrails */}
          <section>
            <h2 style={h2Style}>What we changed in the data layer.</h2>
            <p style={{ ...proseStyle, marginBottom: 20 }}>
              Some failure modes get caught by an editor&apos;s eye. Others recur often enough that we&apos;ve
              codified them into the database itself. These are the patterns that can no longer enter the
              corpus.
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 18 }}>
              {CODE_GUARDRAILS.map((g, i) => (
                <li
                  key={i}
                  style={{
                    display: "flex",
                    gap: 14,
                    alignItems: "baseline",
                  }}
                >
                  <span
                    style={{
                      flexShrink: 0,
                      fontFamily: "var(--cinema-mono)",
                      fontSize: 11,
                      color: "var(--vermillion)",
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p
                      style={{
                        fontFamily: "var(--cinema-display)",
                        fontStyle: "italic",
                        fontWeight: 500,
                        fontSize: 16,
                        lineHeight: 1.3,
                        color: "var(--bone)",
                        margin: "0 0 4px",
                      }}
                    >
                      {g.name}
                      <span
                        style={{
                          fontFamily: "var(--cinema-mono)",
                          fontStyle: "normal",
                          fontSize: 10,
                          letterSpacing: "0.12em",
                          color: "var(--bone-faint)",
                          marginLeft: 10,
                        }}
                      >
                        {g.reference}
                      </span>
                    </p>
                    <p style={{ ...proseStyle, fontSize: 13, lineHeight: 1.65 }}>{g.summary}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* Read alongside */}
          <section>
            <h2 style={h2Style}>Read alongside.</h2>
            <p style={proseStyle}>
              This is the <em>what</em>. For the <em>how</em>, see our{" "}
              <Link href={`/${locale}/methodology`} style={inlineLinkStyle}>methodology page</Link>. For the{" "}
              <em>why</em> — and what a blank field on a destination card actually means — see{" "}
              <Link href={`/${locale}/why-we-say-no-data`} style={inlineLinkStyle}>why we say no data</Link>.
            </p>
            <p style={{ ...proseStyle, marginTop: 16 }}>
              Spotted a fabrication we missed? Send the destination + the property name to{" "}
              <a href="mailto:hello@nakshiq.com" style={inlineLinkStyle}>hello@nakshiq.com</a> or use the
              &quot;Report a fabrication&quot; link on any destination page. We re-verify against a primary
              source before publishing any correction.
            </p>
            <p
              style={{
                fontFamily: "var(--cinema-mono)",
                fontSize: 11,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--bone-faint)",
                marginTop: 24,
              }}
            >
              See also:{" "}
              <Link href={`/${locale}/editorial-policy`} style={{ color: "var(--bone-dim)", textDecoration: "underline", textUnderlineOffset: "3px" }}>
                Editorial policy
              </Link>
              {" · "}
              <Link href={`/${locale}/tourist-traps`} style={{ color: "var(--bone-dim)", textDecoration: "underline", textUnderlineOffset: "3px" }}>
                Tourist traps
              </Link>
              {" · "}
              <Link href={`/${locale}/corrections`} style={{ color: "var(--bone-dim)", textDecoration: "underline", textUnderlineOffset: "3px" }}>
                Corrections
              </Link>
            </p>
          </section>
        </div>
      </main>

      <CinematicRelatedRail />
      <Footer />
    </div>
  );
}
