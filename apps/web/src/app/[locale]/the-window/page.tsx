import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { NewsletterForm } from "../newsletter/newsletter-form";
import { localeAlternates } from "@/lib/seo-utils";
import { CinemaStyles } from "@/components/landing-cinema/cinema-styles";
import { getIssueNumber } from "@/components/landing-cinema/issue-number";

export const revalidate = 21600;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "The Window — Past Issues",
    description: "Every Sunday: the best-scored destination of the week, one honest skip, road intelligence, and what changed in our data.",
    ...localeAlternates(locale, "/the-window"),
  };
}

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

async function getIssues() {
  const supabase = getSupabase();
  if (!supabase) return [];
  const { data } = await supabase
    .from("newsletter_issues")
    .select("slug, subject, preview_text, sent_at, issue_number, recipient_count")
    .not("sent_at", "is", null)
    .order("sent_at", { ascending: false })
    .limit(60);
  return data ?? [];
}

export default async function TheWindowArchive({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const issues = await getIssues();
  const currentIssue = getIssueNumber();

  return (
    <div className="nakshiq-cinema" style={{ minHeight: "100vh" }}>
      <CinemaStyles />
      <Nav />
      <main
        id="main-content"
        className="nq-grain nq-glow-bookend"
        style={{ padding: "140px 24px 96px", position: "relative" }}
      >
        {/* Masthead */}
        <header style={{ maxWidth: 1100, margin: "0 auto 80px", textAlign: "left" }}>
          <p
            className="nq-kicker"
            style={{
              color: "var(--vermillion)",
              marginBottom: 24,
              letterSpacing: "0.22em",
            }}
          >
            THE WINDOW · ISSUE Nº {currentIssue}
          </p>
          <h1
            className="nq-display nq-balance"
            style={{
              fontFamily: "var(--cinema-display)",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "clamp(48px, 8vw, 116px)",
              lineHeight: 0.96,
              letterSpacing: "-0.028em",
              margin: 0,
            }}
          >
            Every Sunday.<br />
            Signal only.
          </h1>
          <p
            className="nq-meta"
            style={{
              color: "var(--bone-dim)",
              marginTop: 32,
              maxWidth: 720,
              fontSize: 15,
              lineHeight: 1.6,
              letterSpacing: "0.04em",
              fontFamily: "var(--cinema-ui)",
            }}
          >
            One best-scored destination. One honest skip. One road update. Four
            minutes to read. No tourism boards, no sponsors, no fluff.
          </p>
        </header>

        {/* Subscribe block — only block on the page, vermillion-bordered */}
        <section
          style={{
            maxWidth: 720,
            margin: "0 auto 96px",
            padding: "40px 32px",
            background: "var(--film-2)",
            border: "1px solid var(--vermillion)",
            borderLeftWidth: 4,
          }}
        >
          <p
            className="nq-kicker"
            style={{ color: "var(--vermillion)", marginBottom: 18 }}
          >
            SUBSCRIBE
          </p>
          <p
            style={{
              fontFamily: "var(--cinema-display)",
              fontStyle: "italic",
              fontSize: 22,
              lineHeight: 1.45,
              color: "var(--bone)",
              marginBottom: 20,
            }}
          >
            One email, every Sunday morning. Unsubscribe whenever you want.
          </p>
          <NewsletterForm source="archive-page" />
        </section>

        {/* Past issues */}
        <section style={{ maxWidth: 1100, margin: "0 auto" }}>
          <header
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              marginBottom: 40,
            }}
          >
            <span
              className="nq-kicker"
              style={{ color: "var(--vermillion)" }}
            >
              PAST ISSUES · {issues.length}
            </span>
            <span style={{ flex: 1, height: 1, background: "var(--hair)" }} />
          </header>

          {issues.length === 0 ? (
            <div
              style={{
                maxWidth: 720,
                margin: "0 auto",
                padding: "64px 32px",
                border: "1px dashed var(--hair)",
                textAlign: "center",
                fontFamily: "var(--cinema-display)",
                fontStyle: "italic",
                fontSize: 22,
                color: "var(--bone-dim)",
              }}
            >
              First issue lands this Sunday.
            </div>
          ) : (
            <ul
              style={{
                listStyle: "none",
                margin: 0,
                padding: 0,
                borderTop: "1px solid var(--hair)",
              }}
            >
              {issues.map((issue: { slug: string; subject: string; preview_text: string | null; sent_at: string; issue_number: number | null }) => {
                const date = new Date(issue.sent_at).toLocaleDateString("en-IN", {
                  year: "numeric",
                  month: "short",
                  day: "2-digit",
                }).toUpperCase();
                const num = issue.issue_number
                  ? `Nº ${String(issue.issue_number).padStart(3, "0")}`
                  : null;
                return (
                  <li
                    key={issue.slug}
                    style={{ borderBottom: "1px solid var(--hair)" }}
                  >
                    <Link
                      href={`/${locale}/the-window/${issue.slug}`}
                      className="nq-entry-link"
                      style={{
                        display: "grid",
                        gridTemplateColumns: "minmax(100px, 120px) 1fr 18px",
                        gap: 24,
                        padding: "28px 0",
                        textDecoration: "none",
                        color: "inherit",
                      }}
                    >
                      <div>
                        {num && (
                          <span
                            className="nq-mono"
                            style={{
                              display: "block",
                              fontSize: 12,
                              color: "var(--vermillion)",
                              letterSpacing: "0.18em",
                              marginBottom: 4,
                            }}
                          >
                            {num}
                          </span>
                        )}
                        <span
                          className="nq-meta"
                          style={{ color: "var(--bone-faint)" }}
                        >
                          {date}
                        </span>
                      </div>
                      <div>
                        <h3
                          style={{
                            fontFamily: "var(--cinema-display)",
                            fontStyle: "italic",
                            fontWeight: 500,
                            fontSize: "clamp(22px, 2.6vw, 30px)",
                            lineHeight: 1.2,
                            color: "var(--bone)",
                            margin: "0 0 8px",
                            letterSpacing: "-0.012em",
                            transition: "color 220ms ease",
                          }}
                        >
                          {issue.subject}
                        </h3>
                        {issue.preview_text && (
                          <p
                            style={{
                              fontFamily: "var(--cinema-ui)",
                              fontSize: 14,
                              lineHeight: 1.6,
                              color: "var(--bone-dim)",
                              margin: 0,
                              display: "-webkit-box",
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: "vertical",
                              overflow: "hidden",
                            }}
                          >
                            {issue.preview_text}
                          </p>
                        )}
                      </div>
                      <span
                        className="nq-entry-arrow nq-mono"
                        style={{
                          alignSelf: "center",
                          fontSize: 14,
                          color: "var(--bone-faint)",
                          textAlign: "right",
                          transition: "transform 220ms ease, color 220ms ease",
                        }}
                      >
                        →
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
