import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { createClient } from "@supabase/supabase-js";
import { localeAlternates } from "@/lib/seo-utils";
import { formatScoreInline } from "@itp/shared";
import { CinemaStyles } from "@/components/landing-cinema/cinema-styles";
import { Title } from "@/components/landing-cinema/editorial";
import { getIssueNumber } from "@/components/landing-cinema/issue-number";

export const revalidate = 21600;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isHindi = locale === "hi";
  return {
    title: isHindi
      ? "NakshIQ 100 — 2026 के भारत के सर्वश्रेष्ठ यात्रा महीने"
      : "NakshIQ 100 — India's 100 best destination-months, 2026",
    description: isHindi
      ? "भारत के 5,856 स्थल × महीना संयोजनों में से शीर्ष 100 — मौसम, पहुँच, भीड़ और सुरक्षा पर आधारित। प्रत्येक वर्ष अद्यतन।"
      : "The 100 highest-scored destination × month combinations for India, ranked across weather, access, crowd, and safety. Drawn from 5,856 scored rows across 505 destinations. An annual index.",
    ...localeAlternates(locale, "/nakshiq-100"),
  };
}

const BASE_URL = "https://www.nakshiq.com";

const MONTH_NAMES = [
  "", "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const MONTH_SLUGS = [
  "", "january", "february", "march", "april", "may", "june",
  "july", "august", "september", "october", "november", "december",
];

type ScoredRow = {
  destination_id: string;
  month: number;
  score: number;
  verdict: string;
  why_go: string;
  destinations: {
    name: string;
    state: { name: string } | { name: string }[] | null;
  } | null;
};

async function getTop100() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return { rows: [] as ScoredRow[], totalRows: 0 };

  const supabase = createClient(url, key);

  const all: ScoredRow[] = [];
  const page = 1000;
  let from = 0;
  while (true) {
    const { data, error } = await supabase
      .from("destination_months")
      .select(`
        destination_id, month, score, verdict, why_go,
        destinations!inner(name, state:states(name))
      `)
      .eq("verdict", "go")
      .order("score", { ascending: false })
      .range(from, from + page - 1);
    if (error) break;
    all.push(...((data as unknown as ScoredRow[]) ?? []));
    if (!data || data.length < page || all.length >= 200) break;
    from += page;
  }

  const byDest = new Map<string, ScoredRow>();
  for (const r of all) {
    const existing = byDest.get(r.destination_id);
    if (!existing || r.score > existing.score) byDest.set(r.destination_id, r);
  }
  const deduped = Array.from(byDest.values())
    .sort((a, b) => b.score - a.score)
    .slice(0, 100);

  return { rows: deduped, totalRows: all.length };
}

function getStateName(state: ScoredRow["destinations"] extends infer T ? T extends { state: infer S } ? S : never : never) {
  if (!state) return null;
  if (Array.isArray(state)) return state[0]?.name ?? null;
  return state.name ?? null;
}

export default async function NakshIQ100Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const { rows } = await getTop100();
  const issueNum = getIssueNumber();

  const pageUrl = `${BASE_URL}/${locale}/nakshiq-100`;

  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${pageUrl}#top100`,
    name: "NakshIQ 100 — India's best destination-months, 2026",
    description: "The 100 highest-scored destination × month combinations across all of India, ranked across weather, access, crowd, and safety.",
    numberOfItems: rows.length,
    itemListOrder: "https://schema.org/ItemListOrderDescending",
    itemListElement: rows.map((r, idx) => {
      const destUrl = `${BASE_URL}/${locale}/destination/${r.destination_id}/${MONTH_SLUGS[r.month]}`;
      const destName = r.destinations?.name ?? r.destination_id;
      return {
        "@type": "ListItem",
        position: idx + 1,
        item: {
          "@type": "TouristDestination",
          name: `${destName} in ${MONTH_NAMES[r.month]}`,
          url: destUrl,
          description: (r.why_go || "").slice(0, 280),
        },
      };
    }),
  };

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${pageUrl}#article`,
    headline: "NakshIQ 100 — India's 100 best destination-months, 2026",
    description:
      "An annual ranked index of India's 100 highest-scored destination × month combinations, drawn from 5,856 scored rows across 505 destinations.",
    author: { "@id": `${BASE_URL}#organization` },
    publisher: { "@id": `${BASE_URL}#organization` },
    isPartOf: { "@id": `${BASE_URL}#website` },
    inLanguage: locale === "hi" ? "hi-IN" : "en-IN",
    mainEntityOfPage: pageUrl,
    url: pageUrl,
    dateModified: new Date().toISOString(),
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${BASE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: "NakshIQ 100", item: pageUrl },
    ],
  };

  return (
    <div className="nakshiq-cinema" style={{ minHeight: "100vh" }}>
      <CinemaStyles />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <Nav />

      <main
        id="main-content"
        className="nq-grain"
        style={{ position: "relative", padding: "140px 24px 96px" }}
      >
        {/* Masthead */}
        <header style={{ maxWidth: 1100, margin: "0 auto 72px" }}>
          <p
            className="nq-kicker"
            style={{ color: "var(--vermillion)", marginBottom: 24, letterSpacing: "0.22em" }}
          >
            THE ANNUAL INDEX · ISSUE Nº {issueNum}
          </p>
          <Title
            as="h1"
            className="nq-display"
            style={{
              fontFamily: "var(--cinema-display)",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "clamp(40px, 7vw, 88px)",
              lineHeight: 0.98,
              letterSpacing: "-0.025em",
              margin: 0,
              textWrap: "balance",
            }}
          >
            NakshIQ 100.
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
            India&apos;s 100 best destination-months, ranked across weather, access,
            crowd, and safety. Drawn from 5,856 scored rows across 505 destinations.
          </p>
          <p
            className="nq-mono"
            style={{
              fontFamily: "var(--cinema-mono)",
              fontSize: 11,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "var(--bone-faint)",
              marginTop: 28,
            }}
          >
            An annual index · Edition{" "}
            {new Date().toLocaleDateString("en-IN", { month: "long", year: "numeric" })}
          </p>
        </header>

        {/* Top 10 — hero rail with numbered cards */}
        <section style={{ maxWidth: 1100, margin: "0 auto 96px" }}>
          <p
            className="nq-kicker"
            style={{ color: "var(--vermillion)", marginBottom: 28, letterSpacing: "0.22em" }}
          >
            TOP 10
          </p>
          <div
            style={{ borderTop: "1px solid var(--hair)" }}
          >
            {rows.slice(0, 10).map((r, i) => {
              const stateName = getStateName(r.destinations?.state ?? null);
              return (
                <Link
                  key={`${r.destination_id}-${r.month}`}
                  href={`/${locale}/destination/${r.destination_id}/${MONTH_SLUGS[r.month]}`}
                  className="nq-entry-link"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "64px 1fr auto",
                    gap: 24,
                    alignItems: "baseline",
                    padding: "28px 0",
                    borderBottom: "1px solid var(--hair)",
                    textDecoration: "none",
                    color: "inherit",
                    transition: "background 220ms ease",
                  }}
                >
                  <span
                    className="nq-mono"
                    style={{
                      fontFamily: "var(--cinema-mono)",
                      fontSize: 28,
                      fontWeight: 700,
                      letterSpacing: "-0.02em",
                      color: "var(--vermillion)",
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div style={{ minWidth: 0 }}>
                    <h3
                      style={{
                        fontFamily: "var(--cinema-display)",
                        fontStyle: "italic",
                        fontWeight: 500,
                        fontSize: 26,
                        lineHeight: 1.15,
                        letterSpacing: "-0.014em",
                        color: "var(--bone)",
                        margin: 0,
                      }}
                    >
                      {r.destinations?.name} in {MONTH_NAMES[r.month]}.
                    </h3>
                    {r.why_go && (
                      <p
                        style={{
                          fontFamily: "var(--cinema-ui)",
                          fontSize: 14,
                          lineHeight: 1.6,
                          color: "var(--bone-dim)",
                          margin: "10px 0 0",
                          maxWidth: 720,
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {r.why_go}
                      </p>
                    )}
                  </div>
                  <span
                    className="nq-mono"
                    style={{
                      fontFamily: "var(--cinema-mono)",
                      fontSize: 11,
                      letterSpacing: "0.16em",
                      textTransform: "uppercase",
                      color: "var(--bone-faint)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {stateName ? `${stateName} · ` : ""}{formatScoreInline(r.score)}
                  </span>
                </Link>
              );
            })}
          </div>
        </section>

        {/* 11–100 compact ledger */}
        <section style={{ maxWidth: 1100, margin: "0 auto 96px" }}>
          <p
            className="nq-kicker"
            style={{ color: "var(--vermillion)", marginBottom: 28, letterSpacing: "0.22em" }}
          >
            11 — 100
          </p>
          <div style={{ borderTop: "1px solid var(--hair)" }}>
            {rows.slice(10).map((r, i) => {
              const stateName = getStateName(r.destinations?.state ?? null);
              return (
                <Link
                  key={`${r.destination_id}-${r.month}`}
                  href={`/${locale}/destination/${r.destination_id}/${MONTH_SLUGS[r.month]}`}
                  className="nq-entry-link"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "48px minmax(0, 2fr) minmax(0, 1fr) auto",
                    gap: 16,
                    alignItems: "baseline",
                    padding: "16px 0",
                    borderBottom: "1px solid var(--hair)",
                    textDecoration: "none",
                    color: "inherit",
                    transition: "background 220ms ease",
                  }}
                >
                  <span
                    className="nq-mono"
                    style={{
                      fontFamily: "var(--cinema-mono)",
                      fontSize: 13,
                      letterSpacing: "0.12em",
                      color: "var(--bone-faint)",
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    {String(i + 11).padStart(3, " ")}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--cinema-display)",
                      fontStyle: "italic",
                      fontSize: 18,
                      color: "var(--bone)",
                    }}
                  >
                    {r.destinations?.name}
                    <span style={{ color: "var(--bone-dim)", fontStyle: "normal", fontFamily: "var(--cinema-ui)", fontSize: 13, marginLeft: 10 }}>
                      · {MONTH_NAMES[r.month]}
                    </span>
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--cinema-ui)",
                      fontSize: 13,
                      color: "var(--bone-faint)",
                    }}
                  >
                    {stateName ?? "—"}
                  </span>
                  <span
                    className="nq-mono"
                    style={{
                      fontFamily: "var(--cinema-mono)",
                      fontSize: 13,
                      letterSpacing: "0.06em",
                      color: "var(--vermillion)",
                      fontVariantNumeric: "tabular-nums",
                      textAlign: "right",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {formatScoreInline(r.score)}
                  </span>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Methodology + embed + citation in a stacked editorial block */}
        <section style={{ maxWidth: 820, margin: "0 auto" }}>
          <div style={{ marginBottom: 64 }}>
            <p
              className="nq-kicker"
              style={{ color: "var(--vermillion)", marginBottom: 16, letterSpacing: "0.22em" }}
            >
              HOW THE 100 IS CHOSEN
            </p>
            <p
              style={{
                fontFamily: "var(--cinema-ui)",
                fontSize: 16,
                lineHeight: 1.75,
                color: "var(--bone-dim)",
                margin: "0 0 16px",
              }}
            >
              Every destination × month pair in the NakshIQ database carries a 0–10
              suitability score combining weather (IMD data), access (road/pass/flight
              status), crowd math, local festival calendars, and risk flags. The NakshIQ
              100 takes the single best month for each destination, ranks across all 505
              destinations, and publishes the top 100. One destination never appears
              twice; the ranking is the destination at its best, not a month-by-month scan.
            </p>
            <p
              style={{
                fontFamily: "var(--cinema-ui)",
                fontSize: 14,
                lineHeight: 1.7,
                color: "var(--bone-faint)",
                margin: 0,
              }}
            >
              See{" "}
              <Link
                href={`/${locale}/methodology`}
                style={{ color: "var(--vermillion)", textDecoration: "underline", textUnderlineOffset: "3px" }}
              >
                how we score
              </Link>{" "}
              for the full rubric. An updated edition is published annually.
            </p>
          </div>

          <div style={{ marginBottom: 64, paddingTop: 32, borderTop: "1px solid var(--hair)" }}>
            <p
              className="nq-kicker"
              style={{ color: "var(--vermillion)", marginBottom: 16, letterSpacing: "0.22em" }}
            >
              EMBED THE BADGE
            </p>
            <p
              style={{
                fontFamily: "var(--cinema-ui)",
                fontSize: 16,
                lineHeight: 1.7,
                color: "var(--bone-dim)",
                margin: "0 0 20px",
              }}
            >
              For tourism boards, destination operators, and editors whose region appears
              on this list — embed the NakshIQ 100 badge on your site. Free to use,
              attribution required (the snippet handles it).
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 16, marginBottom: 18 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/badges/nakshiq-100.svg"
                alt="Featured in NakshIQ 100 — 2026 Annual Index"
                width={240}
                height={80}
                style={{ borderRadius: 4, border: "1px solid var(--hair)" }}
              />
              <a
                href="/badges/nakshiq-100.svg"
                download
                className="nq-mono"
                style={{
                  fontFamily: "var(--cinema-mono)",
                  fontSize: 11,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--vermillion)",
                  textDecoration: "none",
                  borderBottom: "1px solid var(--vermillion)",
                  paddingBottom: 2,
                }}
              >
                Download SVG ↓
              </a>
            </div>
            <pre
              style={{
                background: "rgba(10, 10, 8, 0.4)",
                border: "1px solid var(--hair)",
                padding: 16,
                fontFamily: "var(--cinema-mono)",
                fontSize: 11,
                lineHeight: 1.6,
                color: "var(--bone-dim)",
                overflowX: "auto",
              }}
            >{`<a href="https://www.nakshiq.com/${locale}/nakshiq-100" rel="noopener" target="_blank">
  <img src="https://www.nakshiq.com/badges/nakshiq-100.svg"
       alt="Featured in NakshIQ 100 — 2026 Annual Index"
       width="240" height="80" />
</a>`}</pre>
          </div>

          <div
            className="nq-mono"
            style={{
              fontFamily: "var(--cinema-mono)",
              fontSize: 11,
              lineHeight: 1.7,
              color: "var(--bone-faint)",
              letterSpacing: "0.04em",
              paddingTop: 32,
              borderTop: "1px solid var(--hair)",
            }}
          >
            <p style={{ margin: "0 0 6px" }}>
              <strong style={{ color: "var(--bone-dim)" }}>Citations welcomed.</strong>{" "}
              Cite as: <em>NakshIQ 100 — India&apos;s best destination-months, 2026. nakshiq.com/{locale}/nakshiq-100</em>.
            </p>
            <p style={{ margin: 0 }}>
              Press &amp; research queries:{" "}
              <Link
                href={`/${locale}/contact`}
                style={{ color: "var(--vermillion)", textDecoration: "underline", textUnderlineOffset: "3px" }}
              >
                editor@nakshiq.com
              </Link>
              .
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
