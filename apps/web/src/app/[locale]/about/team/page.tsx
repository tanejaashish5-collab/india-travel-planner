import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { createClient } from "@supabase/supabase-js";
import { localeAlternates } from "@/lib/seo-utils";
import { AuthorByline, personJsonLd, type AuthorRecord } from "@/components/author-byline";
import { CinemaStyles } from "@/components/landing-cinema/cinema-styles";
import { CinematicRelatedRail } from "@/components/cinematic-related-rail";

export const revalidate = 86400;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "Team — NakshIQ",
    description:
      "The people behind NakshIQ. Named editors and contributors who stand behind every destination score, every itinerary, every honest skip verdict on the site.",
    ...localeAlternates(locale, "/about/team"),
  };
}

const BASE_URL = "https://www.nakshiq.com";

async function getTeam(): Promise<AuthorRecord[]> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return [];
  const supabase = createClient(url, key);
  const { data } = await supabase
    .from("authors")
    .select("*")
    .order("role")
    .order("created_at");
  return (data ?? []) as AuthorRecord[];
}

export default async function TeamPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const team = await getTeam();
  const pageUrl = `${BASE_URL}/${locale}/about/team`;

  // Founders sort to the top, then editors/family/contributors/experts.
  // Single flat list since with 2 founders, role-based subsections are noise.
  const ROLE_ORDER: Record<string, number> = {
    founder: 0,
    "co-founder": 1,
    editor: 2,
    family: 3,
    contributor: 4,
    expert: 5,
  };
  const founders = team
    .filter((a) => a.role === "founder" || a.role === "co-founder")
    .sort((a, b) => (ROLE_ORDER[a.role] ?? 99) - (ROLE_ORDER[b.role] ?? 99));
  const contributors = team.filter((a) => a.role === "contributor");
  const experts = team.filter((a) => a.role === "expert");

  const aboutPageLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${pageUrl}#page`,
    url: pageUrl,
    name: "Team — NakshIQ",
    description: "Named editors and contributors behind NakshIQ's India travel intelligence.",
    inLanguage: locale === "hi" ? "hi-IN" : "en-IN",
    isPartOf: { "@id": `${BASE_URL}#website` },
    mainEntity: team.map((a) => personJsonLd(a)),
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${BASE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: "About", item: `${BASE_URL}/${locale}/about` },
      { "@type": "ListItem", position: 3, name: "Team", item: pageUrl },
    ],
  };

  const sectionKickerStyle: React.CSSProperties = {
    color: "var(--vermillion)",
    marginBottom: 20,
    letterSpacing: "0.22em",
  };
  const sectionStyle: React.CSSProperties = { marginBottom: 56 };

  return (
    <div className="nakshiq-cinema" style={{ minHeight: "100vh" }}>
      <CinemaStyles />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <Nav />
      <main
        id="main-content"
        className="nq-grain"
        style={{ position: "relative", padding: "140px 24px 64px" }}
      >
        <header style={{ maxWidth: 820, margin: "0 auto 56px" }}>
          <p
            className="nq-kicker"
            style={{
              color: "var(--vermillion)",
              marginBottom: 20,
              letterSpacing: "0.22em",
            }}
          >
            ABOUT · NAMED BYLINES · {String(team.length).padStart(2, "0")}
          </p>
          <h1
            className="nq-display"
            style={{
              fontFamily: "var(--cinema-display)",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "clamp(40px, 7vw, 88px)",
              lineHeight: 0.98,
              letterSpacing: "-0.025em",
              margin: 0,
              color: "var(--bone)",
            }}
          >
            Team.
          </h1>
          <p
            style={{
              fontFamily: "var(--cinema-display)",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "clamp(18px, 2vw, 24px)",
              lineHeight: 1.4,
              color: "var(--bone-dim)",
              margin: "24px 0 0",
              maxWidth: 720,
            }}
          >
            Named editors and contributors behind every page on NakshIQ. Each byline is the
            person who stands behind the recommendation — not a shared account, not an AI
            pseudonym.
          </p>
          <div style={{ marginTop: 20 }}>
            <Link
              href={`/${locale}/about`}
              className="nq-mono"
              style={{
                fontSize: 11,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--vermillion)",
                textDecoration: "none",
              }}
            >
              ← About
            </Link>
          </div>
        </header>

        <div style={{ maxWidth: 820, margin: "0 auto" }}>
          {founders.length > 0 && (
            <section style={sectionStyle}>
              <p className="nq-kicker" style={sectionKickerStyle}>
                FOUNDERS
              </p>
              <div style={{ display: "grid", gap: 32 }}>
                {founders.map((a) => (
                  <div
                    key={a.slug}
                    id={a.slug}
                    style={{
                      padding: 24,
                      border: "1px solid var(--hair)",
                      background: "rgba(245, 241, 232, 0.02)",
                    }}
                  >
                    <AuthorByline author={a} locale={locale} variant="full" />
                  </div>
                ))}
              </div>
            </section>
          )}

          {contributors.length > 0 && (
            <section style={sectionStyle}>
              <p className="nq-kicker" style={sectionKickerStyle}>
                CONTRIBUTORS
              </p>
              <div style={{ display: "grid", gap: 32 }}>
                {contributors.map((a) => (
                  <div
                    key={a.slug}
                    id={a.slug}
                    style={{
                      padding: 24,
                      border: "1px solid var(--hair)",
                      background: "rgba(245, 241, 232, 0.02)",
                    }}
                  >
                    <AuthorByline author={a} locale={locale} variant="full" />
                  </div>
                ))}
              </div>
            </section>
          )}

          {experts.length > 0 && (
            <section style={sectionStyle}>
              <p className="nq-kicker" style={sectionKickerStyle}>
                EXPERT CONTRIBUTORS
              </p>
              <div style={{ display: "grid", gap: 32 }}>
                {experts.map((a) => (
                  <div
                    key={a.slug}
                    id={a.slug}
                    style={{
                      padding: 24,
                      border: "1px solid var(--hair)",
                      background: "rgba(245, 241, 232, 0.02)",
                    }}
                  >
                    <AuthorByline author={a} locale={locale} variant="full" />
                  </div>
                ))}
              </div>
            </section>
          )}

          <section
            style={{
              marginTop: 64,
              padding: 32,
              borderLeft: "3px solid var(--vermillion)",
              background: "rgba(229, 86, 66, 0.04)",
            }}
          >
            <p
              className="nq-kicker"
              style={{
                color: "var(--vermillion)",
                marginBottom: 12,
                letterSpacing: "0.22em",
                fontSize: 10,
              }}
            >
              THE BYLINE RULE
            </p>
            <p
              style={{
                fontFamily: "var(--cinema-ui)",
                fontSize: 15,
                lineHeight: 1.65,
                color: "var(--bone-dim)",
                margin: 0,
              }}
            >
              NakshIQ doesn&apos;t publish anonymous scoring. Every destination page, every skip
              verdict, every &ldquo;don&apos;t travel with kids under 10 to this altitude&rdquo;
              claim traces back to a named editor who put their name behind it. If you disagree
              with a call we&apos;ve made, the{" "}
              <Link
                href={`/${locale}/contact`}
                style={{ color: "var(--vermillion)", textDecoration: "underline" }}
              >
                editor&apos;s email
              </Link>{" "}
              is public. Corrections run in the open — read our{" "}
              <Link
                href={`/${locale}/editorial-policy`}
                style={{ color: "var(--vermillion)", textDecoration: "underline" }}
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
