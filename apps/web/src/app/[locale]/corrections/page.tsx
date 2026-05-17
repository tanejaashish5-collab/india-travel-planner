import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { localeAlternates } from "@/lib/seo-utils";
import { CinemaStyles } from "@/components/landing-cinema/cinema-styles";
import { Title } from "@/components/landing-cinema/editorial";
import { CinematicRelatedRail } from "@/components/cinematic-related-rail";

export const revalidate = 3600;

type Severity = "typo" | "factual" | "score-impact" | "safety";

type Correction = {
  id: string;
  published_at: string;
  error_published_at: string;
  fixed_at: string;
  page_url: string;
  element: string | null;
  what_we_said: string;
  what_is_correct: string;
  source_url: string | null;
  source_description: string | null;
  severity: Severity;
  editor_slug: string | null;
  reporter_note: string | null;
};

const BASE_URL = "https://www.nakshiq.com";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "Corrections log — NakshIQ",
    description:
      "Every correction we've run on NakshIQ, in public. When we got something wrong, when we fixed it, and who signed off. Accountability is non-negotiable.",
    ...localeAlternates(locale, "/corrections"),
  };
}

async function getCorrections(): Promise<Correction[]> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return [];
  const supabase = createClient(url, key);
  const { data } = await supabase
    .from("corrections")
    .select("*")
    .order("published_at", { ascending: false })
    .limit(200);
  return (data ?? []) as Correction[];
}

function formatDate(s: string): string {
  return new Date(s).toLocaleDateString("en-IN", { year: "numeric", month: "short", day: "numeric" });
}

function gapDays(from: string, to: string): number {
  const ms = new Date(to).getTime() - new Date(from).getTime();
  return Math.max(0, Math.round(ms / (1000 * 60 * 60 * 24)));
}

const SEVERITY_COLOR: Record<Severity, string> = {
  typo: "var(--bone-faint)",
  factual: "var(--bone-dim)",
  "score-impact": "var(--vermillion)",
  safety: "var(--vermillion)",
};

const SEVERITY_LABEL: Record<Severity, string> = {
  typo: "typo",
  factual: "factual",
  "score-impact": "score impact",
  safety: "safety",
};

export default async function CorrectionsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const corrections = await getCorrections();
  const pageUrl = `${BASE_URL}/${locale}/corrections`;

  const collectionPageLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${pageUrl}#page`,
    url: pageUrl,
    name: "Corrections log — NakshIQ",
    description: "Public record of every correction made on NakshIQ, with fix timestamps and editor attribution.",
    inLanguage: locale === "hi" ? "hi-IN" : "en-IN",
    isPartOf: { "@id": `${BASE_URL}#website` },
    publisher: { "@id": `${BASE_URL}#organization` },
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${BASE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: "Corrections", item: pageUrl },
    ],
  };

  const bySeverity = corrections.reduce<Record<Severity, number>>((acc, c) => {
    acc[c.severity] = (acc[c.severity] ?? 0) + 1;
    return acc;
  }, { typo: 0, factual: 0, "score-impact": 0, safety: 0 });

  return (
    <div className="nakshiq-cinema" style={{ minHeight: "100vh" }}>
      <CinemaStyles />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPageLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <Nav />

      <main
        id="main-content"
        className="nq-grain"
        style={{ position: "relative", padding: "140px 24px 64px" }}
      >
        <header style={{ maxWidth: 820, margin: "0 auto 40px" }}>
          <p
            className="nq-kicker"
            style={{
              color: "var(--vermillion)",
              marginBottom: 20,
              letterSpacing: "0.22em",
            }}
          >
            ACCOUNTABILITY · {String(corrections.length).padStart(3, "0")} ENTRIES
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
            Corrections log.
          </Title>
          <p
            style={{
              fontFamily: "var(--cinema-display)",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "clamp(18px, 2vw, 22px)",
              lineHeight: 1.4,
              color: "var(--bone-dim)",
              marginTop: 20,
              maxWidth: 720,
            }}
          >
            Every correction we&apos;ve run, in public.
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
            When we got something wrong, when we fixed it, what the source was, and the editor who signed
            off. No quiet edits, no unpublished retractions.
          </p>
        </header>

        <div style={{ maxWidth: 820, margin: "0 auto" }}>
          {/* How this works */}
          <section
            style={{
              padding: 24,
              border: "1px solid var(--hair)",
              background: "rgba(245, 241, 232, 0.02)",
              marginBottom: 48,
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
              How this works
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
              <li style={{ fontFamily: "var(--cinema-ui)", fontSize: 14, lineHeight: 1.7, color: "var(--bone-dim)" }}>
                Spot something wrong? Use the{" "}
                <Link href={`/${locale}/contact`} style={{ color: "var(--vermillion)", textDecoration: "underline", textUnderlineOffset: "3px" }}>
                  contact form
                </Link>{" "}
                or reply to any newsletter. We read every message.
              </li>
              <li style={{ fontFamily: "var(--cinema-ui)", fontSize: 14, lineHeight: 1.7, color: "var(--bone-dim)" }}>
                <strong style={{ color: "var(--bone)", fontWeight: 600 }}>Score-impact</strong> and{" "}
                <strong style={{ color: "var(--bone)", fontWeight: 600 }}>safety</strong> corrections publish within
                24 hours of verification. Typos and minor factual edits: within a week.
              </li>
              <li style={{ fontFamily: "var(--cinema-ui)", fontSize: 14, lineHeight: 1.7, color: "var(--bone-dim)" }}>
                Every entry names the editor who signed off. See our{" "}
                <Link href={`/${locale}/about/team`} style={{ color: "var(--vermillion)", textDecoration: "underline", textUnderlineOffset: "3px" }}>
                  masthead
                </Link>
                .
              </li>
              <li style={{ fontFamily: "var(--cinema-ui)", fontSize: 14, lineHeight: 1.7, color: "var(--bone-dim)" }}>
                The correction process lives in our{" "}
                <Link href={`/${locale}/editorial-policy`} style={{ color: "var(--vermillion)", textDecoration: "underline", textUnderlineOffset: "3px" }}>
                  editorial policy
                </Link>
                .
              </li>
            </ul>
          </section>

          {corrections.length === 0 ? (
            <div
              style={{
                padding: 40,
                border: "1px dashed var(--hair)",
                textAlign: "center",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--cinema-display)",
                  fontStyle: "italic",
                  fontWeight: 500,
                  fontSize: 22,
                  lineHeight: 1.3,
                  color: "var(--bone)",
                  margin: "0 0 12px",
                }}
              >
                The log is empty today.
              </p>
              <p
                style={{
                  fontFamily: "var(--cinema-ui)",
                  fontSize: 14,
                  lineHeight: 1.7,
                  color: "var(--bone-dim)",
                  margin: 0,
                  maxWidth: 540,
                  marginInline: "auto",
                }}
              >
                But it&apos;s here, live, and the moment we run our first correction it lands on this page.
                Being ready to be wrong matters more than claiming we&apos;re always right.
              </p>
            </div>
          ) : (
            <>
              {/* Severity strip */}
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 12,
                  alignItems: "baseline",
                  marginBottom: 32,
                  paddingBottom: 16,
                  borderBottom: "1px solid var(--hair)",
                }}
              >
                {(Object.keys(bySeverity) as Severity[])
                  .filter((s) => bySeverity[s] > 0)
                  .map((s) => (
                    <span
                      key={s}
                      style={{
                        fontFamily: "var(--cinema-mono)",
                        fontSize: 11,
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        color: SEVERITY_COLOR[s],
                        padding: "4px 10px",
                        border: `1px solid ${SEVERITY_COLOR[s]}`,
                        fontVariantNumeric: "tabular-nums",
                      }}
                    >
                      {bySeverity[s]} {SEVERITY_LABEL[s]}
                    </span>
                  ))}
                <span style={{ fontFamily: "var(--cinema-ui)", fontSize: 13, color: "var(--bone-faint)" }}>
                  · {corrections.length} total
                </span>
              </div>

              {/* Entries */}
              <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                {corrections.map((c) => {
                  const liveGap = gapDays(c.error_published_at, c.fixed_at);
                  return (
                    <article
                      key={c.id}
                      style={{
                        padding: 24,
                        border: "1px solid var(--hair)",
                        background: "var(--paper)",
                      }}
                    >
                      <header
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          alignItems: "baseline",
                          justifyContent: "space-between",
                          gap: 12,
                          marginBottom: 16,
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "baseline", gap: 12, flexWrap: "wrap" }}>
                          <span
                            style={{
                              fontFamily: "var(--cinema-mono)",
                              fontSize: 10,
                              letterSpacing: "0.14em",
                              textTransform: "uppercase",
                              color: SEVERITY_COLOR[c.severity],
                              padding: "3px 8px",
                              border: `1px solid ${SEVERITY_COLOR[c.severity]}`,
                            }}
                          >
                            {SEVERITY_LABEL[c.severity]}
                          </span>
                          <a
                            href={c.page_url}
                            style={{
                              fontFamily: "var(--cinema-display)",
                              fontStyle: "italic",
                              fontWeight: 500,
                              fontSize: 17,
                              lineHeight: 1.3,
                              color: "var(--bone)",
                              textDecoration: "none",
                              borderBottom: "1px solid var(--hair)",
                            }}
                          >
                            {c.element ?? c.page_url.replace(BASE_URL, "")}
                          </a>
                        </div>
                        <span
                          style={{
                            fontFamily: "var(--cinema-mono)",
                            fontSize: 11,
                            color: "var(--bone-faint)",
                            fontVariantNumeric: "tabular-nums",
                          }}
                        >
                          published {formatDate(c.published_at)}
                        </span>
                      </header>

                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                          gap: 1,
                          background: "var(--hair)",
                          border: "1px solid var(--hair)",
                          marginBottom: 16,
                        }}
                      >
                        <div style={{ padding: 16, background: "var(--paper)", borderLeft: "2px solid var(--vermillion)" }}>
                          <p
                            style={{
                              fontFamily: "var(--cinema-mono)",
                              fontSize: 10,
                              letterSpacing: "0.18em",
                              textTransform: "uppercase",
                              color: "var(--vermillion)",
                              margin: "0 0 8px",
                            }}
                          >
                            What we said
                          </p>
                          <p style={{ fontFamily: "var(--cinema-ui)", fontSize: 13, lineHeight: 1.6, color: "var(--bone-dim)", margin: 0 }}>
                            {c.what_we_said}
                          </p>
                        </div>
                        <div style={{ padding: 16, background: "var(--paper)", borderLeft: "2px solid var(--bone)" }}>
                          <p
                            style={{
                              fontFamily: "var(--cinema-mono)",
                              fontSize: 10,
                              letterSpacing: "0.18em",
                              textTransform: "uppercase",
                              color: "var(--bone)",
                              margin: "0 0 8px",
                            }}
                          >
                            What is correct
                          </p>
                          <p style={{ fontFamily: "var(--cinema-ui)", fontSize: 13, lineHeight: 1.6, color: "var(--bone-dim)", margin: 0 }}>
                            {c.what_is_correct}
                          </p>
                        </div>
                      </div>

                      <dl
                        style={{
                          display: "grid",
                          gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
                          gap: 12,
                          fontFamily: "var(--cinema-ui)",
                          fontSize: 12,
                          color: "var(--bone-dim)",
                          marginBottom: 12,
                          fontVariantNumeric: "tabular-nums",
                        }}
                      >
                        <div>
                          <dt style={{ fontFamily: "var(--cinema-mono)", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--bone-faint)", marginBottom: 4 }}>
                            Error lived
                          </dt>
                          <dd style={{ margin: 0, color: "var(--bone)" }}>{liveGap} day{liveGap === 1 ? "" : "s"}</dd>
                        </div>
                        <div>
                          <dt style={{ fontFamily: "var(--cinema-mono)", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--bone-faint)", marginBottom: 4 }}>
                            Fixed
                          </dt>
                          <dd style={{ margin: 0, color: "var(--bone)" }}>{formatDate(c.fixed_at)}</dd>
                        </div>
                        <div>
                          <dt style={{ fontFamily: "var(--cinema-mono)", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--bone-faint)", marginBottom: 4 }}>
                            Editor
                          </dt>
                          <dd style={{ margin: 0, color: "var(--bone)" }}>
                            {c.editor_slug ? (
                              <Link href={`/${locale}/about/team#${c.editor_slug}`} style={{ color: "var(--vermillion)", textDecoration: "underline", textUnderlineOffset: "3px" }}>
                                {c.editor_slug}
                              </Link>
                            ) : (
                              "—"
                            )}
                          </dd>
                        </div>
                      </dl>

                      {(c.source_url || c.source_description) && (
                        <div
                          style={{
                            fontFamily: "var(--cinema-ui)",
                            fontSize: 12,
                            color: "var(--bone-dim)",
                            paddingTop: 12,
                            borderTop: "1px solid var(--hair)",
                          }}
                        >
                          <span
                            style={{
                              fontFamily: "var(--cinema-mono)",
                              fontSize: 10,
                              letterSpacing: "0.18em",
                              textTransform: "uppercase",
                              color: "var(--bone-faint)",
                              marginRight: 8,
                            }}
                          >
                            Source:
                          </span>
                          {c.source_url ? (
                            <a
                              href={c.source_url}
                              rel="nofollow noopener"
                              style={{ color: "var(--bone)", textDecoration: "underline", textUnderlineOffset: "3px" }}
                            >
                              {c.source_description ?? c.source_url}
                            </a>
                          ) : (
                            <span style={{ color: "var(--bone)" }}>{c.source_description}</span>
                          )}
                        </div>
                      )}
                    </article>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </main>

      <CinematicRelatedRail />
      <Footer />
    </div>
  );
}
