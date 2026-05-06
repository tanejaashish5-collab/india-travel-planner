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

// Bucket every destination by its annual average score. Average across all
// 12 months (×2 for the 0–10 display scale) decides which band a place lands
// in. Each destination counts exactly once, so totals sum to the destination
// count. Average — not peak — because almost every place has at least one
// strong month, which would over-pack the PEAK bucket and tell readers nothing.
async function getScoreBandCounts(): Promise<Record<string, number> | null> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;

  const supabase = createClient(url, key);
  const counts: Record<string, number> = {
    peak: 0,
    excellent: 0,
    doable: 0,
    marginal: 0,
    avoid: 0,
  };

  // 5,856 rows max — paginate around the Supabase 1000-row cap.
  const PAGE = 1000;
  const sums = new Map<string, { sum: number; n: number }>();
  for (let from = 0; from < 8000; from += PAGE) {
    const { data, error } = await supabase
      .from("destination_months")
      .select("destination_id, score")
      .range(from, from + PAGE - 1);
    if (error || !data || data.length === 0) break;
    for (const row of data as { destination_id: string; score: number | null }[]) {
      if (row.score == null) continue;
      const cur = sums.get(row.destination_id) ?? { sum: 0, n: 0 };
      cur.sum += row.score;
      cur.n += 1;
      sums.set(row.destination_id, cur);
    }
    if (data.length < PAGE) break;
  }

  for (const { sum, n } of sums.values()) {
    if (n === 0) continue;
    const display = (sum / n) * 2;
    if (display >= 8.0) counts.peak++;
    else if (display >= 6.5) counts.excellent++;
    else if (display >= 5.0) counts.doable++;
    else if (display >= 3.5) counts.marginal++;
    else counts.avoid++;
  }
  return counts;
}

type ScoreTier = "peak" | "excellent" | "doable" | "marginal" | "avoid";

const TIER_COLOR: Record<ScoreTier, string> = {
  peak: "var(--green)",
  excellent: "var(--green)",
  doable: "var(--amber)",
  marginal: "#E9876B",
  avoid: "var(--vermillion)",
};

const SCORE_BANDS: {
  tier: ScoreTier;
  range: string;
  min: number;
  max: number; // inclusive; max=10 covers everything ≥ min
  label: string;
  tagline: string;
}[] = [
  {
    tier: "peak",
    range: "8.0–10.0",
    min: 8.0,
    max: 10.0,
    label: "PEAK",
    tagline: "Go. Now. Editors say this is the window.",
  },
  {
    tier: "excellent",
    range: "6.5–7.9",
    min: 6.5,
    max: 7.9,
    label: "EXCELLENT",
    tagline: "Worth the trip. Minor caveats. Plan around them.",
  },
  {
    tier: "doable",
    range: "5.0–6.4",
    min: 5.0,
    max: 6.4,
    label: "DOABLE",
    tagline: "Fine, with a workaround. Cruises pre-9am, hotels off-strip.",
  },
  {
    tier: "marginal",
    range: "3.5–4.9",
    min: 3.5,
    max: 4.9,
    label: "MARGINAL",
    tagline: "You can go. But you have a better option this month.",
  },
  {
    tier: "avoid",
    range: "0.0–3.4",
    min: 0.0,
    max: 3.4,
    label: "AVOID",
    tagline: "The Skip List. Editorially against. We say so out loud.",
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
  const [freshness, bandCounts] = await Promise.all([
    getFreshnessStats(),
    getScoreBandCounts(),
  ]);
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
            {SCORE_BANDS.map((s) => (
              <ScoreBand
                key={s.tier}
                tier={s.tier}
                range={s.range}
                label={s.label}
                tagline={s.tagline}
                count={bandCounts ? bandCounts[s.tier] ?? null : null}
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
                    padding: "18px 0",
                    borderTop: "1px solid var(--hair)",
                    borderBottom:
                      i === SCORE_FACTORS.length - 1
                        ? "1px solid var(--hair)"
                        : "none",
                    fontFamily: "var(--cinema-ui)",
                    fontSize: 16,
                    lineHeight: 1.6,
                    color: "var(--bone-dim)",
                  }}
                >
                  {f}
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
                    padding: "18px 0",
                    borderTop: "1px solid var(--hair)",
                    borderBottom:
                      i === KIDS_CHECKS.length - 1
                        ? "1px solid var(--hair)"
                        : "none",
                    fontFamily: "var(--cinema-ui)",
                    fontSize: 16,
                    lineHeight: 1.6,
                    color: "var(--bone-dim)",
                  }}
                >
                  {f}
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
            {INFRA_FIELDS.map((f) => (
              <EditorialEntry
                key={f.label}
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
  title,
  body,
}: {
  title: string;
  body: string;
}) {
  return (
    <div
      style={{
        padding: "28px 0",
        borderTop: "1px solid var(--hair)",
      }}
    >
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
          fontSize: 16,
          lineHeight: 1.7,
          color: "var(--bone-dim)",
          margin: 0,
        }}
      >
        {body}
      </p>
    </div>
  );
}

function ScoreBand({
  tier,
  range,
  label,
  tagline,
  count,
}: {
  tier: ScoreTier;
  range: string;
  label: string;
  tagline: string;
  count: number | null;
}) {
  const tint = TIER_COLOR[tier];
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "minmax(120px, 140px) minmax(110px, 140px) 1fr auto",
        columnGap: 32,
        rowGap: 8,
        padding: "32px 0",
        borderTop: "1px solid var(--hair)",
        alignItems: "center",
      }}
    >
      <span
        className="nq-mono"
        style={{
          fontFamily: "var(--cinema-mono)",
          fontSize: 22,
          color: tint,
          fontWeight: 500,
          fontVariantNumeric: "tabular-nums",
          letterSpacing: "0",
          whiteSpace: "nowrap",
        }}
      >
        {range}
      </span>
      <span
        className="nq-mono"
        style={{
          fontSize: 12,
          color: tint,
          letterSpacing: "0.22em",
          fontWeight: 600,
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontFamily: "var(--cinema-display)",
          fontStyle: "italic",
          fontWeight: 400,
          fontSize: 18,
          lineHeight: 1.45,
          color: "var(--bone-dim)",
          letterSpacing: "-0.005em",
        }}
      >
        {tagline}
      </span>
      <span
        className="nq-mono"
        style={{
          fontFamily: "var(--cinema-mono)",
          fontSize: 28,
          fontWeight: 500,
          color: count == null ? "var(--bone-faint)" : "var(--bone)",
          fontVariantNumeric: "tabular-nums",
          textAlign: "right",
          minWidth: 56,
        }}
      >
        {count == null ? "—" : count}
      </span>
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
