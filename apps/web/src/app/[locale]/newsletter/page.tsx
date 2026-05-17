import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { NewsletterForm } from "./newsletter-form";
import { localeAlternates } from "@/lib/seo-utils";
import { CinemaStyles } from "@/components/landing-cinema/cinema-styles";
import { Title } from "@/components/landing-cinema/editorial";
import { CinematicRelatedRail } from "@/components/cinematic-related-rail";

const SITE = "https://www.nakshiq.com";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "The Window — NakshIQ's Weekly Travel Intelligence",
    description:
      "Every Sunday: the best-scored destinations this week, one honest skip, one road you should know about, and what changed. No fluff. No sponsored picks. Just signal.",
    ...localeAlternates(locale, "/newsletter"),
  };
}

const BENEFITS: { title: string; body: string }[] = [
  {
    title: "This week's best score",
    body: "The destination that scores highest for the coming week — weather, crowds, and access all aligned. One clear recommendation.",
  },
  {
    title: "The honest skip",
    body: "One destination trending on Instagram that you should avoid this week — with a real reason and a better alternative.",
  },
  {
    title: "Road intelligence",
    body: "One road-condition update that matters — a pass opening, a landslide closure, or a fuel stop you need to know about.",
  },
  {
    title: "What changed",
    body: "Score changes, new destinations added, data corrections — total transparency on what we updated and why.",
  },
];

export default async function NewsletterPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/${locale}` },
      { "@type": "ListItem", position: 2, name: "Newsletter", item: `${SITE}/${locale}/newsletter` },
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
        <header style={{ maxWidth: 900, margin: "0 auto 48px" }}>
          <p
            className="nq-kicker"
            style={{
              color: "var(--vermillion)",
              marginBottom: 20,
              letterSpacing: "0.22em",
            }}
          >
            WEEKLY NEWSLETTER · ISSUE-BY-ISSUE
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
            The Window.
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
            Every Sunday morning: what changed, what scores shifted, and one destination you should
            know about this week.
          </p>
        </header>

        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          {/* Benefits grid */}
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
              What you get
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
              {BENEFITS.map((b, i) => (
                <div key={i} style={{ padding: 20, background: "var(--paper)" }}>
                  <p
                    style={{
                      fontFamily: "var(--cinema-mono)",
                      fontSize: 10,
                      letterSpacing: "0.22em",
                      textTransform: "uppercase",
                      color: "var(--vermillion)",
                      margin: "0 0 8px",
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--cinema-display)",
                      fontStyle: "italic",
                      fontWeight: 500,
                      fontSize: 19,
                      lineHeight: 1.25,
                      color: "var(--bone)",
                      margin: "0 0 8px",
                    }}
                  >
                    {b.title}
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--cinema-ui)",
                      fontSize: 13,
                      lineHeight: 1.6,
                      color: "var(--bone-dim)",
                      margin: 0,
                    }}
                  >
                    {b.body}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Subscribe form */}
          <section
            style={{
              padding: 32,
              border: "1px solid var(--vermillion)",
              background: "rgba(229, 86, 66, 0.04)",
              marginBottom: 32,
              textAlign: "center",
            }}
          >
            <p
              style={{
                fontFamily: "var(--cinema-mono)",
                fontSize: 10,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "var(--vermillion)",
                margin: "0 0 12px",
              }}
            >
              Subscribe
            </p>
            <h2
              style={{
                fontFamily: "var(--cinema-display)",
                fontStyle: "italic",
                fontWeight: 500,
                fontSize: "clamp(22px, 3vw, 28px)",
                lineHeight: 1.2,
                color: "var(--bone)",
                margin: "0 0 8px",
              }}
            >
              Get The Window every Sunday.
            </h2>
            <p
              style={{
                fontFamily: "var(--cinema-ui)",
                fontSize: 13,
                lineHeight: 1.6,
                color: "var(--bone-dim)",
                margin: "0 0 24px",
              }}
            >
              Free. No spam. Unsubscribe anytime. We don&apos;t sell your email.
            </p>
            <NewsletterForm />
          </section>

          {/* Trust note */}
          <p
            style={{
              fontFamily: "var(--cinema-ui)",
              fontSize: 12,
              lineHeight: 1.7,
              color: "var(--bone-faint)",
              margin: 0,
              textAlign: "center",
              maxWidth: 600,
              marginInline: "auto",
            }}
          >
            Written by the same family that builds NakshIQ. No affiliates in the newsletter. No
            sponsored recommendations. Just the week&apos;s intelligence, delivered honestly.
          </p>
        </div>
      </main>

      <CinematicRelatedRail />
      <Footer />
    </div>
  );
}
