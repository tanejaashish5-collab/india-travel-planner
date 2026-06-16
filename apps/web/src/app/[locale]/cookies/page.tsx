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
    title: "Cookie Policy",
    description:
      "NakshIQ uses minimal cookies. No advertising cookies, no third-party tracking. Only functional cookies for authentication and language preference.",
    ...localeAlternates(locale, "/cookies"),
  };
}

export default async function CookiesPage({
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
            COOKIES · ISSUE Nº {issueNum}
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
            Cookie policy.
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
            What we store on your device and what we don&apos;t. Spoiler: we
            run no advertising cookies, no third-party tracking, and no
            retargeting pixels.
          </p>
        </header>

        {/* I — The short version (callout) */}
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
                marginBottom: 16,
              }}
            >
              NakshIQ uses almost no cookies. The ones we do use are strictly
              functional — they keep you logged in and remember your language.
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
              We run zero advertising cookies, zero third-party tracking
              cookies, and zero retargeting pixels.
            </p>
          </div>
        </section>

        {/* II — Cookies we use */}
        <section style={sectionStyle}>
          <SectionLabel num="II" name="COOKIES WE USE" />
          <Prose>
            <p>
              The full list of cookies set by NakshIQ. Both are functional —
              the site can&apos;t do its job without them.
            </p>
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
              title="Supabase auth session"
              body="If you sign in, Supabase stores a session token to maintain your authenticated state. Without this cookie, you would need to log in on every page load. It is not used for tracking or analytics."
            />
            <EditorialEntry
              num="2"
              title="Locale preference (next-intl)"
              body="Stores your language preference (English or Hindi) so we serve content in the right language. This is a local preference cookie — it stays on your device and is not sent to any third party."
            />
          </div>
        </section>

        {/* III — Cookies we do not use */}
        <section style={sectionStyle}>
          <SectionLabel num="III" name="COOKIES WE DO NOT USE" />
          <Prose>
            <p>
              The list of things you might expect to find on a typical
              travel website that you will not find on NakshIQ:
            </p>
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
              title="Advertising cookies"
              body="None. We do not run ads and do not serve advertising cookies."
            />
            <EditorialEntry
              num="2"
              title="Third-party tracking cookies"
              body="None. No Google Analytics tracking cookies for advertising, no Facebook Pixel, no retargeting scripts."
            />
            <EditorialEntry
              num="3"
              title="Social media cookies"
              body="None. We do not embed social media widgets that set cookies."
            />
          </div>
        </section>

        {/* IV — Vercel analytics is cookieless */}
        <section style={sectionStyle}>
          <SectionLabel num="IV" name="VERCEL ANALYTICS IS COOKIELESS" />
          <Prose>
            <p>
              Our analytics provider, Vercel Analytics, operates without
              cookies. It does not set any cookies on your device, does not
              use local storage for tracking, and does not collect personally
              identifiable information. The same applies to Vercel Speed
              Insights.
            </p>
          </Prose>
        </section>

        {/* V — Third-party booking links */}
        <section style={sectionStyle}>
          <SectionLabel num="V" name="THIRD-PARTY BOOKING LINKS" />
          <Prose>
            <p>
              When you click an affiliate link to a booking platform (such as
              Booking.com or Agoda), that platform may set its own cookies
              once you reach their site. Those cookies are governed by their
              privacy and cookie policies, not ours. We have no control over
              their behaviour.
            </p>
          </Prose>
        </section>

        {/* VI — Managing cookies */}
        <section style={sectionStyle}>
          <SectionLabel num="VI" name="MANAGING COOKIES" />
          <Prose>
            <p>
              You can clear or block cookies through your browser settings.
              Since we only use functional cookies, blocking them may prevent
              sign-in or language preference from working correctly. The rest
              of NakshIQ will function normally without cookies.
            </p>
          </Prose>
        </section>

        {/* VII — Contact */}
        <section style={sectionStyle}>
          <SectionLabel num="VII" name="CONTACT" />
          <Prose>
            <p>
              Questions about cookies:{" "}
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
            We change this policy only when our cookie footprint changes.
            Material updates carry a revised &ldquo;last updated&rdquo; date.
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
          <Link href={`/${locale}/terms`} style={ctaSecondary}>
            TERMS OF SERVICE
          </Link>
          <Link href={`/${locale}/editorial-policy`} style={ctaSecondary}>
            EDITORIAL POLICY
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
