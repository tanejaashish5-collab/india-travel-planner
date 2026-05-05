import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import Link from "next/link";
import { localeAlternates } from "@/lib/seo-utils";
import { SectionLabel } from "@/components/landing-cinema/helpers";
import { getIssueNumber } from "@/components/landing-cinema/issue-number";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "Privacy Policy — NakshIQ",
    description:
      "How NakshIQ handles your data. Minimal collection, no data sales, no marketing spam, privacy-focused analytics.",
    ...localeAlternates(locale, "/privacy"),
  };
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const issueNum = getIssueNumber();

  return (
    <div
      className="cinema-page"
      style={{
        background: "var(--paper)",
        color: "var(--bone)",
        minHeight: "100vh",
      }}
    >
      <Nav />
      <main
        id="main-content"
        style={{
          padding: "140px 24px 96px",
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
            PRIVACY POLICY · ISSUE Nº {issueNum}
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
            Privacy policy.
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
            How NakshIQ handles your data — minimal collection, no data sales,
            no marketing spam, privacy-focused analytics. The full policy
            below; the short version comes first.
          </p>
        </header>

        {/* I — The Short Version (callout) */}
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
              I · THE SHORT VERSION
            </p>
            <p
              style={{
                fontFamily: "var(--cinema-display)",
                fontStyle: "italic",
                fontSize: 22,
                lineHeight: 1.55,
                color: "var(--bone)",
                margin: 0,
              }}
            >
              We collect very little data. We don&apos;t sell any of it. We
              don&apos;t send you marketing emails unless you ask for them. We
              use privacy-focused analytics that don&apos;t track you across the
              web.
            </p>
          </div>
        </section>

        {/* II — Who We Are */}
        <section style={sectionStyle}>
          <SectionLabel num="II" name="WHO WE ARE" />
          <Prose>
            <p>
              NakshIQ is operated by Impresa de Artiste Pty Ltd, registered in
              the Australian Capital Territory, Australia. For privacy matters,
              contact us at{" "}
              <a
                href="mailto:hello@nakshiq.com"
                style={{
                  color: "var(--bone)",
                  borderBottom: "1px solid var(--vermillion)",
                  textDecoration: "none",
                }}
              >
                hello@nakshiq.com
              </a>
              .
            </p>
          </Prose>
        </section>

        {/* III — Data We Collect */}
        <section style={sectionStyle}>
          <SectionLabel num="III" name="DATA WE COLLECT" />
          <div
            style={{
              maxWidth: 720,
              margin: "0 auto",
              display: "flex",
              flexDirection: "column",
              gap: 0,
            }}
          >
            <EditorialEntry
              num="1"
              title="Email address"
              body="Only if you create an account. Used for authentication and account recovery. Stored in Supabase (our database provider)."
            />
            <EditorialEntry
              num="2"
              title="Authentication session"
              body="If you sign in, Supabase maintains a session token to keep you logged in. This is a functional requirement, not tracking."
            />
            <EditorialEntry
              num="3"
              title="Locale preference"
              body="Your language preference (English or Hindi) is stored locally via next-intl to serve you content in the right language."
            />
          </div>
        </section>

        {/* IV — Analytics */}
        <section style={sectionStyle}>
          <SectionLabel num="IV" name="ANALYTICS" />
          <Prose>
            <p>We use two Vercel-provided tools:</p>
          </Prose>
          <div
            style={{
              maxWidth: 720,
              margin: "32px auto 0",
              display: "flex",
              flexDirection: "column",
              gap: 0,
            }}
          >
            <EditorialEntry
              num="1"
              title="Vercel Analytics"
              body="Privacy-focused, cookieless web analytics. No personal data collected. No cross-site tracking. No advertising profiles."
            />
            <EditorialEntry
              num="2"
              title="Vercel Speed Insights"
              body="Measures page load performance to help us keep the site fast. No personal data collected."
            />
          </div>
          <Prose>
            <p style={{ marginTop: 32 }}>
              We do not use Google Analytics. We do not run any advertising
              pixels or retargeting scripts.
            </p>
          </Prose>
        </section>

        {/* V — Affiliate Link Tracking */}
        <section style={sectionStyle}>
          <SectionLabel num="V" name="AFFILIATE LINK TRACKING" />
          <Prose>
            <p>
              When you click an affiliate link to Booking.com, Agoda, or other
              booking partners, those platforms set their own cookies and track
              your activity under their own privacy policies. We have no control
              over their tracking practices. We recommend reviewing their
              privacy policies before booking.
            </p>
          </Prose>
        </section>

        {/* VI — What We Do Not Do */}
        <section style={sectionStyle}>
          <SectionLabel num="VI" name="WHAT WE DO NOT DO" />
          <PullQuote>We do not sell your data to third parties. Ever.</PullQuote>
          <div
            style={{
              maxWidth: 720,
              margin: "32px auto 0",
              display: "flex",
              flexDirection: "column",
              gap: 0,
            }}
          >
            <EditorialEntry
              num="1"
              title="No marketing without consent"
              body="We do not send marketing emails unless you explicitly opt in."
            />
            <EditorialEntry
              num="2"
              title="No sharing with partners"
              body="We do not share your email address with booking partners or advertisers."
            />
            <EditorialEntry
              num="3"
              title="No advertising profiles"
              body="We do not build advertising profiles or track you across websites."
            />
          </div>
        </section>

        {/* VII — Data Storage */}
        <section style={sectionStyle}>
          <SectionLabel num="VII" name="DATA STORAGE" />
          <Prose>
            <p>
              Account data is stored in Supabase (hosted infrastructure). We use
              standard security practices including encrypted connections and
              secure authentication flows. We retain your data only as long as
              your account exists. Delete your account and your data goes with
              it.
            </p>
          </Prose>
        </section>

        {/* VIII — Your Rights */}
        <section style={sectionStyle}>
          <SectionLabel num="VIII" name="YOUR RIGHTS" />
          <Prose>
            <p>
              You can request access to, correction of, or deletion of your
              personal data at any time by emailing{" "}
              <a
                href="mailto:hello@nakshiq.com"
                style={{
                  color: "var(--bone)",
                  borderBottom: "1px solid var(--vermillion)",
                  textDecoration: "none",
                }}
              >
                hello@nakshiq.com
              </a>
              . We respond to all requests within 30 days. If you are in the EU,
              UK, or Australia, you have additional rights under applicable data
              protection laws (GDPR, UK GDPR, Australian Privacy Act).
            </p>
          </Prose>
        </section>

        {/* IX — Changes to This Policy */}
        <section style={sectionStyle}>
          <SectionLabel num="IX" name="CHANGES TO THIS POLICY" />
          <Prose>
            <p>
              We update this policy when our practices change. Material changes
              will be reflected with a revised &ldquo;last updated&rdquo; date.
              We do not make retroactive changes that reduce your privacy
              protections without notice.
            </p>
          </Prose>
        </section>

        {/* X — Contact */}
        <section style={sectionStyle}>
          <SectionLabel num="X" name="CONTACT" />
          <Prose>
            <p>
              Privacy questions:{" "}
              <a
                href="mailto:hello@nakshiq.com"
                style={{
                  color: "var(--bone)",
                  borderBottom: "1px solid var(--vermillion)",
                  textDecoration: "none",
                }}
              >
                hello@nakshiq.com
              </a>
            </p>
          </Prose>
        </section>

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
            NakshIQ is a family-owned editorial product. Our privacy
            commitments are not marketing — they are the rules we wrote for
            ourselves on day one.
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
          <Link href={`/${locale}/explore`} style={ctaPrimary}>
            START EXPLORING →
          </Link>
          <Link href={`/${locale}/about`} style={ctaSecondary}>
            ABOUT NAKSHIQ
          </Link>
          <Link href={`/${locale}/terms`} style={ctaSecondary}>
            TERMS OF SERVICE
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

function PullQuote({ children }: { children: React.ReactNode }) {
  return (
    <blockquote
      style={{
        maxWidth: 820,
        margin: "48px auto",
        padding: "0 24px",
        borderLeft: "4px solid var(--vermillion)",
        fontFamily: "var(--cinema-display)",
        fontStyle: "italic",
        fontWeight: 400,
        fontSize: "clamp(28px, 4vw, 44px)",
        lineHeight: 1.25,
        letterSpacing: "-0.02em",
        color: "var(--bone)",
        textWrap: "balance",
      }}
    >
      &ldquo;{children}&rdquo;
    </blockquote>
  );
}

function EditorialEntry({
  num,
  title,
  body,
}: {
  num: string;
  title: string;
  body: string;
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "48px 1fr",
        gap: 24,
        padding: "28px 0",
        borderTop: "1px solid var(--hair)",
      }}
    >
      <span
        className="nq-mono"
        style={{
          fontSize: 14,
          color: "var(--vermillion)",
          letterSpacing: "0.18em",
          paddingTop: 4,
        }}
      >
        {num.padStart(2, "0")}
      </span>
      <div>
        <h3
          style={{
            fontFamily: "var(--cinema-display)",
            fontStyle: "italic",
            fontWeight: 500,
            fontSize: 24,
            lineHeight: 1.25,
            letterSpacing: "-0.012em",
            color: "var(--bone)",
            margin: "0 0 10px",
          }}
        >
          {title}
        </h3>
        <p
          style={{
            fontFamily: "var(--cinema-ui)",
            fontSize: 15,
            lineHeight: 1.7,
            color: "var(--bone-dim)",
            margin: 0,
          }}
        >
          {body}
        </p>
      </div>
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
