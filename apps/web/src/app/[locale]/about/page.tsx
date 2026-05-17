import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import Link from "next/link";
import { breadcrumbSchema, articleSchema, localeAlternates } from "@/lib/seo-utils";
import { SectionLabel } from "@/components/landing-cinema/helpers";
import { getIssueNumber } from "@/components/landing-cinema/issue-number";
import { CinemaStyles } from "@/components/landing-cinema/cinema-styles";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "About NakshIQ — Built by an Indian Family, for Every Traveler",
    description:
      "No investors. No sponsored content. No tourism boards. NakshIQ is built by an NRI family for their daughters — and for every traveler who deserves honest answers before they go.",
    ...localeAlternates(locale, "/about"),
  };
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const issueNum = getIssueNumber();

  const schemas = [
    articleSchema({
      locale,
      path: "/about",
      headline: "About NakshIQ — Built by an Indian Family, for Every Traveler",
      description:
        "No investors. No sponsored content. No tourism boards. NakshIQ is built by an NRI family for their daughters — and for every traveler who deserves honest answers before they go.",
    }),
    breadcrumbSchema(locale, [{ name: "About", path: "/about" }]),
  ];

  return (
    <div
      className="nakshiq-cinema"
      style={{
        minHeight: "100vh",
      }}
    >
      <CinemaStyles />
      {schemas.map((s, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
        />
      ))}
      <Nav />
      <main
        id="main-content"
        className="nq-grain nq-glow-bookend"
        style={{
          padding: "140px 24px 96px",
          position: "relative",
        }}
      >
        {/* Masthead — issue badge + title */}
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
            ABOUT · ISSUE Nº {issueNum}
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
            The honest answers
            <br />
            your guidebook<br />
            won&apos;t give you.
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
            }}
          >
            NakshIQ is built by one family in Canberra for their daughters in India.
            What follows is the entire reason it exists, and the rules that decide
            what ships.
          </p>
        </header>

        {/* I — Why this exists */}
        <section style={sectionStyle}>
          <SectionLabel num="I" name="WHY THIS EXISTS" />
          <Prose>
            <p>
              I&apos;m an Indian father raising two daughters abroad. They speak limited Hindi.
              They&apos;ve spent more time at beaches than Indian hill stations. And one day,
              probably sooner than I think, they&apos;re going to want to see India for themselves.
            </p>
            <p>
              I won&apos;t always be there to take them. That&apos;s just how time works. Some of
              those trips will happen when I&apos;m older, or busy, or — eventually — gone.
              They&apos;ll be going to a country that should feel like home but won&apos;t quite,
              with a language they half-understand, navigating roads I learned by trial and
              error and they never had the chance to.
            </p>
            <p>
              I started NakshIQ so that when that day comes, they have the guide I would have
              written for them in person if I could. Every destination scored honestly. Every
              road condition checked. Every &ldquo;don&apos;t go there alone after dark&rdquo;
              said clearly. Every trusted contact we can verify, listed by name. The voice of a
              parent who knows India and knows what their kids won&apos;t know.
            </p>
            <p style={{ color: "var(--bone)", fontWeight: 500 }}>
              That&apos;s the actual reason this exists.
            </p>
            <p>
              It turns out that the guide I&apos;m writing for my daughters is also the guide a
              lot of other people have been waiting for — Indian families planning their first
              big trip, NRI parents bringing their children back, solo women travelers looking
              for honest answers, international visitors who don&apos;t trust the guidebooks
              anymore. Every page on NakshIQ is written for them too. But the standard for
              &ldquo;is this honest enough, is this safe enough, is this useful enough&rdquo;
              is set by one question:
            </p>
          </Prose>

          <PullQuote>Would I want my daughter to read this before she goes?</PullQuote>

          <Prose>
            <p>If yes, it ships. If no, we rewrite it.</p>
          </Prose>
        </section>

        {/* II — Who's building this */}
        <section style={sectionStyle}>
          <SectionLabel num="II" name="WHO'S BUILDING THIS" />
          <Prose>
            <p>
              NakshIQ is built by my family. I write most of the destination pages. My wife
              Aurore writes the family-perspective and women&apos;s-safety pieces. Our extended
              family across India helps verify what&apos;s actually true on the ground.
            </p>
            <p>
              There is no team. There are no investors. There are no outside writers, no
              sponsored content, no tourism boards funding our recommendations. Every word on
              this site was written by one of us, fact-checked by one of us, and stands behind
              both of our names.
            </p>
            <p>
              We will never accept money to recommend a destination. We will never accept free
              stays in exchange for coverage. We will never run advertising that compromises the
              editorial. These aren&apos;t marketing claims — they&apos;re the rules we wrote
              for ourselves on day one and they don&apos;t change.
            </p>
            <p>
              When you read that a destination scores 10.0/10 on NakshIQ, no one paid for that
              score. When you read that another scores 2.0/10, no one paid for that either.
              When the Skip List says &ldquo;don&apos;t bother with this place,&rdquo; it&apos;s
              because we genuinely think you shouldn&apos;t bother. That&apos;s the only thing
              that makes any of this worth reading.
            </p>
          </Prose>
        </section>

        {/* III — What we actually do */}
        <section style={sectionStyle}>
          <SectionLabel num="III" name="WHAT WE ACTUALLY DO" />
          <Prose>
            <p>
              We score every destination in our coverage area honestly, every month, across
              the things that actually matter:
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
              title="Monthly suitability scores"
              body="Every place is rated 0–10 for every month of the year. Not 'best time to visit: March–June' — that's lazy and it's everywhere already. We tell you March is 10.0/10 because spring flowers and clear views and 15–25°C, and July is 2.0/10 because monsoon floods the approach road and there are leeches on every trail. Specificity is the point."
            />
            <EditorialEntry
              num="2"
              title="Family and safety intelligence"
              body="Every destination has a kids rating that accounts for altitude, medical access, road safety, phone signal, and infrastructure — not just 'it's pretty so it must be family-friendly.' If the nearest hospital is four hours away, we tell you. If the altitude is risky for children under a certain age, we explain why. If we wouldn't take our own daughters there, we tell you that too."
            />
            <EditorialEntry
              num="3"
              title="Honest infrastructure data"
              body="Working ATMs. Phone signal by carrier. Nearest hospital and police station with travel times. Fuel stations. Card acceptance. The practical reality nobody else publishes because it isn't glamorous."
            />
            <EditorialEntry
              num="4"
              title="The Skip List"
              body="We've documented dozens of overhyped places we'd actively recommend skipping, with honest reasons. This is the stuff tourism boards hate. It's also the stuff that saves people from wasting their trip on the wrong destination at the wrong time of year."
            />
            <EditorialEntry
              num="5"
              title="'Before you decide' alternatives"
              body="When you open a mainstream tourist destination, we show you what's nearby that you're missing. Not to stop you going there — but so you know the options exist before you default to where everyone else goes."
            />
          </div>
        </section>

        {/* IV — What we cover */}
        <section style={sectionStyle}>
          <SectionLabel num="IV" name="WHAT WE COVER" />
          <Prose>
            <p>
              Every major Himalayan destination. The complete Buddhist Circuit. Rajasthan&apos;s
              heritage trail. The entire Northeast. India&apos;s UNESCO sites. Pilgrimage
              circuits. Motorcycle routes. Treks from single-day walks to expedition-level
              climbs. Weekend getaways and two-week itineraries. Scored for every month, rated
              for families, assessed for safety — all with the same depth.
            </p>
            <p>
              We&apos;d rather be the most honest source for the destinations we cover than a
              mediocre source for all of India. When we expand, it will be with the same depth
              we bring to everything else. No padding, no half-measures.
            </p>
          </Prose>
        </section>

        {/* V — What we're always building */}
        <section style={sectionStyle}>
          <SectionLabel num="V" name="WHAT WE'RE ALWAYS BUILDING" />
          <Prose>
            <p>
              More verified safety contacts. More local voices. Deeper international traveler
              guidance for first-timers and NRI families. Better emergency data for every
              destination. More honest motorcycle route intelligence. More collections that
              challenge the defaults.
            </p>
            <p>
              The standard is always the same: if it&apos;s not honest enough for our daughters,
              it doesn&apos;t ship. If it&apos;s not verified enough to stake our name on, it
              waits until it is.
            </p>
          </Prose>
        </section>

        {/* VI — A note to fellow parents (callout) */}
        <section style={{ ...sectionStyle, maxWidth: 1100, margin: "0 auto 100px" }}>
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
              VI · A NOTE TO FELLOW PARENTS
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
              If you&apos;re reading this and you&apos;re a parent worrying about a trip your
              child is planning, or a daughter you can&apos;t always travel with — we built
              this with you in mind.
            </p>
            <p
              style={{
                fontFamily: "var(--cinema-ui)",
                fontSize: 15,
                lineHeight: 1.7,
                color: "var(--bone-dim)",
                marginBottom: 16,
              }}
            >
              We can&apos;t make every road safe. We can&apos;t be there when you can&apos;t be.
              But we can give you the most honest information available, the most carefully
              verified safety resources we can build, and a voice that sounds like one parent
              talking to another.
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
              That&apos;s what NakshIQ is. That&apos;s the whole reason it exists.
            </p>
          </div>
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
            — A.T.
          </p>
          <p
            className="nq-meta"
            style={{
              color: "var(--bone-faint)",
              marginTop: 6,
            }}
          >
            EDITOR · NAKSHIQ
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
            NakshIQ is built by a family-owned company. We have no outside investors, no
            employees, and no commercial relationships with the destinations we cover. If
            you&apos;d like to support us, the most useful thing you can do is share NakshIQ
            with someone planning a trip.
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
          <Link
            href={`/${locale}/explore`}
            style={ctaPrimary}
          >
            START EXPLORING →
          </Link>
          <Link
            href={`/${locale}/methodology`}
            style={ctaSecondary}
          >
            HOW WE SCORE
          </Link>
          <Link
            href={`/${locale}/editorial-policy`}
            style={ctaSecondary}
          >
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
