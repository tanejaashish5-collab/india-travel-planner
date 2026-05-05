import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import { localeAlternates } from "@/lib/seo-utils";
import { SectionLabel } from "@/components/landing-cinema/helpers";
import { getIssueNumber } from "@/components/landing-cinema/issue-number";
import { CinemaStyles } from "@/components/landing-cinema/cinema-styles";

// Live-computed freshness: ISR-cached daily, but the numbers come from DB
// state, not hardcoded dates.
export const revalidate = 86400;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "How We Score — Methodology",
    description:
      "Our scoring methodology explained: how we rate destinations on a 0–10 monthly scale, calculate kids suitability, assess safety, and evaluate infrastructure. Every number is explainable.",
    ...localeAlternates(locale, "/methodology"),
  };
}

async function getFreshnessStats() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;

  const supabase = createClient(url, key);
  const { data, error } = await supabase
    .from("destinations")
    .select("content_reviewed_at");

  if (error || !data) return null;

  const total = data.length;
  const ninetyDaysAgo = Date.now() - 90 * 24 * 60 * 60 * 1000;
  const reviewed = data.filter((d) => {
    const ts = (d as { content_reviewed_at: string | null }).content_reviewed_at;
    return ts && new Date(ts).getTime() >= ninetyDaysAgo;
  }).length;
  const pct = total > 0 ? Math.round((reviewed / total) * 100) : 0;

  const latest = data
    .map((d) => (d as { content_reviewed_at: string | null }).content_reviewed_at)
    .filter((ts): ts is string => !!ts)
    .sort()
    .pop();

  return { pct, latest };
}

const SCORE_BANDS: { range: string; label: string; desc: string }[] = [
  {
    range: "10.0",
    label: "Peak — go now",
    desc: "This is what the place is famous for. Weather perfect, everything open, activities at their best.",
  },
  {
    range: "8.0",
    label: "Excellent",
    desc: "Minor tradeoffs — shoulder crowds, slight weather risk, but still a great time to visit.",
  },
  {
    range: "6.0",
    label: "Doable",
    desc: "Open and worth it, but not the headline experience. Shoulder season.",
  },
  {
    range: "4.0",
    label: "Marginal",
    desc: "Significant downsides — rain, cold, partial closures, low payoff for the effort.",
  },
  {
    range: "2.0",
    label: "Avoid unless specific reason",
    desc: "Most things shut, conditions poor, or genuinely risky.",
  },
  {
    range: "0.0",
    label: "Closed / inaccessible",
    desc: "Place is physically inaccessible — snow, floods, official closure.",
  },
];

const SCORE_FACTORS = [
  "Weather (temperature, rain, snow, visibility)",
  "Road access (passes open/closed, landslide risk)",
  "Crowd levels (peak season, festivals, holidays)",
  "Activity availability (treks, rafting, skiing, temple openings)",
  "Safety conditions (monsoon flooding, extreme cold, AMS risk)",
  "Infrastructure status (seasonal closures, services)",
];

const KIDS_CHECKS = [
  "Medical access — how far is the nearest hospital?",
  "ATM availability — can you get cash?",
  "Phone signal — can you call for help?",
  "Altitude — is AMS a risk for children?",
  "Road safety — cliff edges, barriers, road quality",
  "Stroller accessibility — can you use a pram?",
  "Food options — will picky eaters survive?",
  "Activities — is there anything for kids to DO?",
];

const INFRA_FIELDS: { label: string; desc: string }[] = [
  { label: "Network", desc: "Which carriers work? Jio/Airtel/BSNL/Vi — honestly, per area." },
  { label: "ATM", desc: "Available or not? If not, how far to nearest? Carry how much cash?" },
  { label: "Medical", desc: "Nearest hospital name + distance. PHC vs real hospital distinction." },
  { label: "Fuel", desc: "Nearest petrol pump. Next after that. EV charging. Jerry can recommendation." },
  { label: "Permits", desc: "Required or not? Which type? How to get it? Government link." },
  { label: "Night weather", desc: "Summer low and winter low temperatures. What to carry." },
];

export default async function MethodologyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const issueNum = getIssueNumber();
  const freshness = await getFreshnessStats();
  const now = new Date();
  const monthYear = now.toLocaleDateString("en-IN", {
    month: "long",
    year: "numeric",
  });

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
            METHODOLOGY · ISSUE Nº {issueNum}
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
            How we score,
            <br />
            in plain English.
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
            Monthly suitability scores, kids ratings, and infrastructure
            assessments — every number on NakshIQ is explainable, every
            assessment auditable.
          </p>
        </header>

        {/* I — Monthly Suitability */}
        <section style={sectionStyle}>
          <SectionLabel num="I" name="MONTHLY SUITABILITY (0–10)" />
          <Prose>
            <p>
              Every destination is scored for every month of the year. The score
              reflects how suitable that specific month is for visiting that
              specific place — not a static &ldquo;best time to visit&rdquo;
              window, but a genuine month-by-month read.
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
            {SCORE_BANDS.map((s, i) => (
              <ScoreBand
                key={s.range}
                num={String(i + 1)}
                range={s.range}
                label={s.label}
                desc={s.desc}
              />
            ))}
          </div>

          <div style={{ maxWidth: 720, margin: "60px auto 0" }}>
            <h3
              style={{
                fontFamily: "var(--cinema-display)",
                fontStyle: "italic",
                fontWeight: 500,
                fontSize: 28,
                lineHeight: 1.2,
                color: "var(--bone)",
                margin: "0 0 24px",
                letterSpacing: "-0.012em",
              }}
            >
              What factors into the score?
            </h3>
            <ul
              style={{
                listStyle: "none",
                margin: 0,
                padding: 0,
                display: "flex",
                flexDirection: "column",
                gap: 0,
              }}
            >
              {SCORE_FACTORS.map((f, i) => (
                <li
                  key={f}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "48px 1fr",
                    gap: 16,
                    padding: "18px 0",
                    borderTop:
                      i === 0
                        ? "1px solid var(--hair)"
                        : "1px solid var(--hair)",
                    borderBottom:
                      i === SCORE_FACTORS.length - 1
                        ? "1px solid var(--hair)"
                        : "none",
                  }}
                >
                  <span
                    className="nq-mono"
                    style={{
                      fontSize: 13,
                      color: "var(--vermillion)",
                      letterSpacing: "0.18em",
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--cinema-ui)",
                      fontSize: 15,
                      lineHeight: 1.6,
                      color: "var(--bone-dim)",
                    }}
                  >
                    {f}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* II — Kids & Family Rating */}
        <section style={sectionStyle}>
          <SectionLabel num="II" name="KIDS & FAMILY RATING (0–10)" />
          <Prose>
            <p>
              Not just &ldquo;is it pretty for families?&rdquo; — our kids
              rating is an infrastructure-aware assessment that
              cross-references the destination&apos;s appeal with its practical
              reality on the ground.
            </p>
          </Prose>

          <div style={{ maxWidth: 720, margin: "32px auto 0" }}>
            <h3
              style={{
                fontFamily: "var(--cinema-display)",
                fontStyle: "italic",
                fontWeight: 500,
                fontSize: 24,
                lineHeight: 1.25,
                color: "var(--bone)",
                margin: "0 0 20px",
                letterSpacing: "-0.012em",
              }}
            >
              What we check
            </h3>
            <ul
              style={{
                listStyle: "none",
                margin: 0,
                padding: 0,
                display: "flex",
                flexDirection: "column",
                gap: 0,
              }}
            >
              {KIDS_CHECKS.map((f, i) => (
                <li
                  key={f}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "48px 1fr",
                    gap: 16,
                    padding: "18px 0",
                    borderTop: "1px solid var(--hair)",
                    borderBottom:
                      i === KIDS_CHECKS.length - 1
                        ? "1px solid var(--hair)"
                        : "none",
                  }}
                >
                  <span
                    className="nq-mono"
                    style={{
                      fontSize: 13,
                      color: "var(--vermillion)",
                      letterSpacing: "0.18em",
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--cinema-ui)",
                      fontSize: 15,
                      lineHeight: 1.6,
                      color: "var(--bone-dim)",
                    }}
                  >
                    {f}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <PullQuote>
            A destination with stunning views but no hospital within four hours,
            no ATM, and no phone signal will never score 10/10 for kids —
            regardless of how beautiful it is.
          </PullQuote>

          <Prose>
            <p>
              Honest safety assessment matters more than Instagram-worthy
              scenery. If we wouldn&apos;t take our own daughters there, the
              score reflects it.
            </p>
          </Prose>
        </section>

        {/* III — Infrastructure Assessment */}
        <section style={sectionStyle}>
          <SectionLabel num="III" name="INFRASTRUCTURE ASSESSMENT" />
          <Prose>
            <p>
              Every destination has structured infrastructure data — not vague
              descriptions, but specific answers to the questions travelers
              actually need answered before they go.
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
            {INFRA_FIELDS.map((f, i) => (
              <EditorialEntry
                key={f.label}
                num={String(i + 1)}
                title={f.label}
                body={f.desc}
              />
            ))}
          </div>
        </section>

        {/* IV — Data Freshness */}
        <section style={sectionStyle}>
          <SectionLabel num="IV" name="DATA FRESHNESS" />
          <Prose>
            <p>
              Weather, season, and permit-regime content is structurally
              cycle-based — June in Leh reads the same every year.
              Infrastructure, stays, and contacts sit on a rolling 90-day review
              cadence.
            </p>
            {freshness && (
              <p style={{ fontFamily: "var(--cinema-mono)", fontSize: 14 }}>
                Current as of {monthYear}
                {freshness.pct > 0 && (
                  <>
                    {" "}·{" "}
                    <span style={{ color: "var(--bone)", fontWeight: 600 }}>
                      {freshness.pct}%
                    </span>{" "}
                    of destinations reviewed in the last 90 days
                  </>
                )}
                {freshness.latest && (
                  <>
                    {" "}· latest review{" "}
                    {new Date(freshness.latest).toLocaleDateString("en-IN", {
                      month: "short",
                      year: "numeric",
                    })}
                  </>
                )}
                .{" "}
                <Link
                  href={`/${locale}/methodology/freshness`}
                  style={{
                    color: "var(--bone)",
                    borderBottom: "1px solid var(--vermillion)",
                    textDecoration: "none",
                  }}
                >
                  See the live dashboard →
                </Link>
              </p>
            )}
            <p>
              Road conditions, infrastructure, and seasonal patterns can shift —
              always verify locally before traveling, especially for remote
              destinations. If you find inaccurate data, we want to know.
            </p>
          </Prose>
        </section>

        {/* V — Disclaimer (callout) */}
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
              V · DISCLAIMER
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
              This data is for planning purposes. Always verify conditions
              locally before traveling.
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
              Mountain roads, weather, and infrastructure can change rapidly.
              We are not responsible for decisions made based on this data —
              the responsibility for the trip remains with the traveler. Treat
              every score as an honest opinion, not a guarantee.
            </p>
          </div>
        </section>

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
          <Link href={`/${locale}/methodology/freshness`} style={ctaSecondary}>
            FRESHNESS DASHBOARD
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

function ScoreBand({
  num,
  range,
  label,
  desc,
}: {
  num: string;
  range: string;
  label: string;
  desc: string;
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "48px 96px 1fr",
        gap: 24,
        padding: "28px 0",
        borderTop: "1px solid var(--hair)",
        alignItems: "baseline",
      }}
    >
      <span
        className="nq-mono"
        style={{
          fontSize: 14,
          color: "var(--vermillion)",
          letterSpacing: "0.18em",
        }}
      >
        {num.padStart(2, "0")}
      </span>
      <span
        className="nq-mono"
        style={{
          fontFamily: "var(--cinema-mono)",
          fontSize: 28,
          color: "var(--bone)",
          fontWeight: 600,
          fontVariantNumeric: "tabular-nums",
          letterSpacing: "-0.02em",
        }}
      >
        {range}
      </span>
      <div>
        <h4
          style={{
            fontFamily: "var(--cinema-display)",
            fontStyle: "italic",
            fontWeight: 500,
            fontSize: 22,
            lineHeight: 1.3,
            letterSpacing: "-0.012em",
            color: "var(--bone)",
            margin: "0 0 8px",
          }}
        >
          {label}
        </h4>
        <p
          style={{
            fontFamily: "var(--cinema-ui)",
            fontSize: 14,
            lineHeight: 1.7,
            color: "var(--bone-dim)",
            margin: 0,
          }}
        >
          {desc}
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
