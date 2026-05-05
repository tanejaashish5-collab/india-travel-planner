import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import Link from "next/link";
import { localeAlternates } from "@/lib/seo-utils";
import { SectionLabel } from "@/components/landing-cinema/helpers";
import { getIssueNumber } from "@/components/landing-cinema/issue-number";
import { CinemaStyles } from "@/components/landing-cinema/cinema-styles";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "Terms of Service — NakshIQ",
    description:
      "Terms of Service for NakshIQ, operated by Impresa de Artiste Pty Ltd. Covers editorial content, AI itineraries, affiliate links, and user responsibilities.",
    ...localeAlternates(locale, "/terms"),
  };
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const issueNum = getIssueNumber();

  return (
    <div
      className="nakshiq-cinema"
      style={{
        minHeight: "100vh",
      }}
    >
      <CinemaStyles />
      <Nav />
      <main
        id="main-content"
        className="nq-grain nq-glow-bookend"
        style={{
          padding: "140px 24px 96px",
          position: "relative",
        }}
      >
        {/* Masthead */}
        <header
          style={{
            maxWidth: 1100,
            margin: "0 auto 80px",
            textAlign: "left",
          }}
        >
          <p
            className="nq-kicker"
            style={{
              color: "var(--vermillion)",
              marginBottom: 24,
              letterSpacing: "0.22em",
            }}
          >
            TERMS · ISSUE Nº {issueNum}
          </p>
          <h1
            className="nq-display"
            style={{
              fontFamily: "var(--cinema-display)",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "clamp(48px, 8vw, 116px)",
              lineHeight: 0.96,
              letterSpacing: "-0.028em",
              margin: 0,
              textWrap: "balance",
            }}
          >
            Terms of service.
          </h1>
          <p
            className="nq-meta"
            style={{
              color: "var(--bone-faint)",
              marginTop: 32,
              fontSize: 13,
              letterSpacing: "0.18em",
            }}
          >
            LAST UPDATED · APRIL 10, 2026
          </p>
          <p
            className="nq-meta"
            style={{
              color: "var(--bone-dim)",
              marginTop: 24,
              maxWidth: 720,
              fontSize: 15,
              lineHeight: 1.6,
              letterSpacing: "0.04em",
            }}
          >
            The rules that govern your use of NakshIQ — what we publish, what
            we promise, what we don&apos;t, and the line between editorial and
            commerce that we will not cross.
          </p>
        </header>

        {/* I — Who we are */}
        <section style={sectionStyle}>
          <SectionLabel num="I" name="WHO WE ARE" />
          <Prose>
            <p>
              NakshIQ is operated by Impresa de Artiste Pty Ltd, an Australian
              company registered in the Australian Capital Territory. When we
              say &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;NakshIQ&rdquo;
              in these terms, we mean Impresa de Artiste Pty Ltd.
            </p>
          </Prose>
        </section>

        {/* II — Editorial content, not professional advice */}
        <section style={sectionStyle}>
          <SectionLabel num="II" name="EDITORIAL CONTENT, NOT PROFESSIONAL ADVICE" />
          <Prose>
            <p>
              Everything on NakshIQ is editorial content. Our destination
              scores, monthly ratings, safety assessments, and infrastructure
              data are researched and published for informational purposes
              only. None of it constitutes professional travel advice, medical
              guidance, or safety certification.
            </p>
            <p>
              Conditions on the ground change. Roads close. Weather shifts.
              Infrastructure degrades or improves. Always verify current
              conditions with local authorities before travelling, especially
              to remote destinations.
            </p>
          </Prose>
        </section>

        {/* III — AI itineraries */}
        <section style={sectionStyle}>
          <SectionLabel num="III" name="AI ITINERARIES" />
          <Prose>
            <p>
              NakshIQ offers AI-generated itinerary suggestions. These are
              generated based on our destination data, seasonal scores, and
              travel patterns. They are suggestions — not guarantees of
              availability, pricing, road conditions, or experience quality.
              Treat them as a starting point for your own planning, not a
              finished plan.
            </p>
          </Prose>
        </section>

        {/* IV — No paid placements (callout) */}
        <section style={{ ...sectionStyle, maxWidth: 1100 }}>
          <div
            style={{
              maxWidth: 720,
              margin: "0 auto",
              padding: "48px 40px",
              background: "var(--film-2)",
              border: "1px solid var(--vermillion)",
              borderLeftWidth: 4,
            }}
          >
            <p
              className="nq-kicker"
              style={{ color: "var(--vermillion)", marginBottom: 18 }}
            >
              IV · NO PAID PLACEMENTS. NO SPONSORED CONTENT. EVER.
            </p>
            <p
              style={{
                fontFamily: "var(--cinema-display)",
                fontStyle: "italic",
                fontSize: 22,
                lineHeight: 1.55,
                color: "var(--bone)",
                marginBottom: 16,
              }}
            >
              No destination, hotel, tour operator, or tourism board pays for
              placement on NakshIQ.
            </p>
            <p
              style={{
                fontFamily: "var(--cinema-ui)",
                fontSize: 15,
                lineHeight: 1.7,
                color: "var(--bone-dim)",
                margin: 0,
              }}
            >
              No entity pays to improve their score, their ranking, or their
              prominence on any page. This is non-negotiable and permanent.
              See our{" "}
              <Link
                href={`/${locale}/editorial-policy`}
                style={{ color: "var(--vermillion)", textDecoration: "underline" }}
              >
                Editorial Policy
              </Link>{" "}
              for details.
            </p>
          </div>
        </section>

        {/* V — Affiliate links */}
        <section style={sectionStyle}>
          <SectionLabel num="V" name="AFFILIATE LINKS" />
          <Prose>
            <p>
              Some pages contain affiliate links to booking platforms such as
              Booking.com and Agoda. If you book through these links, we earn
              a small commission at no additional cost to you. Affiliate
              relationships never affect our scores, rankings, or
              recommendations. A destination can score 2.0/10 and still carry
              booking links. See our{" "}
              <Link
                href={`/${locale}/editorial-policy`}
                style={{ color: "var(--vermillion)", textDecoration: "underline" }}
              >
                Editorial Policy
              </Link>{" "}
              for our Chinese wall policy between editorial and revenue.
            </p>
          </Prose>
        </section>

        {/* VI — User-generated content */}
        <section style={sectionStyle}>
          <SectionLabel num="VI" name="USER-GENERATED CONTENT" />
          <Prose>
            <p>
              NakshIQ may introduce user reviews and community contributions
              in the future. When that happens: you retain ownership of your
              content, but grant us a non-exclusive, royalty-free licence to
              display it on NakshIQ. We reserve the right to remove content
              that is fraudulent, abusive, defamatory, or violates applicable
              law. We do not tolerate fake reviews or paid review
              manipulation.
            </p>
          </Prose>
        </section>

        {/* VII — Your use of NakshIQ */}
        <section style={sectionStyle}>
          <SectionLabel num="VII" name="YOUR USE OF NAKSHIQ" />
          <Prose>
            <p>
              You may use NakshIQ for personal, non-commercial travel
              planning. You may not scrape, reproduce, or redistribute our
              content, scores, or data at scale without written permission.
              Automated access (bots, scrapers, crawlers beyond standard
              search engine indexing) is prohibited without prior
              authorisation.
            </p>
          </Prose>
        </section>

        {/* VIII — Limitation of liability */}
        <section style={sectionStyle}>
          <SectionLabel num="VIII" name="LIMITATION OF LIABILITY" />
          <Prose>
            <p>
              To the maximum extent permitted by Australian law, NakshIQ and
              Impresa de Artiste Pty Ltd are not liable for any direct,
              indirect, incidental, consequential, or special damages arising
              from your use of this website or reliance on its content. This
              includes, without limitation, damages arising from travel
              decisions made based on our content, scores, AI-generated
              itineraries, or infrastructure data.
            </p>
            <p>
              Nothing in these terms excludes or limits liability that cannot
              be excluded or limited under Australian Consumer Law.
            </p>
          </Prose>
        </section>

        {/* IX — Changes to these terms */}
        <section style={sectionStyle}>
          <SectionLabel num="IX" name="CHANGES TO THESE TERMS" />
          <Prose>
            <p>
              We may update these terms from time to time. Material changes
              will be noted with a revised &ldquo;last updated&rdquo; date.
              Continued use of NakshIQ after changes constitutes acceptance of
              the updated terms.
            </p>
          </Prose>
        </section>

        {/* X — Governing law */}
        <section style={sectionStyle}>
          <SectionLabel num="X" name="GOVERNING LAW" />
          <Prose>
            <p>
              These terms are governed by and construed in accordance with the
              laws of the Australian Capital Territory, Australia. Any
              disputes arising from these terms or your use of NakshIQ are
              subject to the exclusive jurisdiction of the courts of the
              Australian Capital Territory.
            </p>
          </Prose>
        </section>

        {/* XI — Contact */}
        <section style={sectionStyle}>
          <SectionLabel num="XI" name="CONTACT" />
          <Prose>
            <p>
              Questions about these terms:{" "}
              <a
                href="mailto:hello@nakshiq.com"
                style={{ color: "var(--vermillion)", textDecoration: "underline" }}
              >
                hello@nakshiq.com
              </a>
            </p>
          </Prose>
        </section>

        {/* Signature */}
        <div
          style={{
            maxWidth: 720,
            margin: "0 auto 48px",
            textAlign: "right",
          }}
        >
          <p
            style={{
              fontFamily: "var(--cinema-display)",
              fontStyle: "italic",
              fontSize: 22,
              color: "var(--bone)",
              margin: 0,
            }}
          >
            — Impresa de Artiste Pty Ltd
          </p>
          <p
            className="nq-meta"
            style={{
              color: "var(--bone-faint)",
              marginTop: 6,
            }}
          >
            PUBLISHER · NAKSHIQ
          </p>
        </div>

        {/* Footer note */}
        <div
          style={{
            maxWidth: 720,
            margin: "0 auto 64px",
            paddingTop: 32,
            borderTop: "1px solid var(--hair)",
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontFamily: "var(--cinema-ui)",
              fontSize: 12,
              lineHeight: 1.7,
              color: "var(--bone-faint)",
              letterSpacing: "0.04em",
              margin: 0,
            }}
          >
            By using NakshIQ you accept these terms in full. If you do not
            agree, please do not use the site.
          </p>
        </div>

        {/* CTAs */}
        <div
          style={{
            maxWidth: 720,
            margin: "0 auto",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 14,
          }}
        >
          <Link href={`/${locale}/privacy`} style={ctaPrimary}>
            PRIVACY POLICY →
          </Link>
          <Link href={`/${locale}/editorial-policy`} style={ctaSecondary}>
            EDITORIAL POLICY
          </Link>
          <Link href={`/${locale}/cookies`} style={ctaSecondary}>
            COOKIE POLICY
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}

/* ─── Editorial style helpers ───────────────────────────── */

const sectionStyle: React.CSSProperties = {
  maxWidth: 1100,
  margin: "0 auto 100px",
};

function Prose({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        maxWidth: 720,
        margin: "0 auto",
        fontFamily: "var(--cinema-ui)",
        fontSize: 17,
        lineHeight: 1.75,
        color: "var(--bone-dim)",
        display: "flex",
        flexDirection: "column",
        gap: 18,
      }}
    >
      {children}
    </div>
  );
}

const ctaPrimary: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 14,
  padding: "18px 28px",
  background: "var(--bone)",
  color: "var(--paper)",
  fontFamily: "var(--cinema-ui)",
  fontWeight: 700,
  fontSize: 11,
  lineHeight: 1,
  textTransform: "uppercase",
  letterSpacing: "0.18em",
  textDecoration: "none",
};

const ctaSecondary: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 14,
  padding: "18px 28px",
  background: "transparent",
  color: "var(--bone)",
  border: "1px solid var(--hair)",
  fontFamily: "var(--cinema-ui)",
  fontWeight: 700,
  fontSize: 11,
  lineHeight: 1,
  textTransform: "uppercase",
  letterSpacing: "0.18em",
  textDecoration: "none",
};
