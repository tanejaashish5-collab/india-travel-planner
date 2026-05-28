import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { TrendingMonthPages } from "@/components/trending-month-pages";
import { createClient } from "@supabase/supabase-js";
import { currentMonthIST, currentMonthLongIST } from "@itp/shared";
import { CinemaStyles } from "@/components/landing-cinema/cinema-styles";
import { Title } from "@/components/landing-cinema/editorial";
import { CinematicRelatedRail } from "@/components/cinematic-related-rail";

export const revalidate = 86400;

const SITE = "https://www.nakshiq.com";

const MONTHS: { num: number; slug: string; long: string; short: string }[] = [
  { num: 1,  slug: "january",   long: "January",   short: "Jan" },
  { num: 2,  slug: "february",  long: "February",  short: "Feb" },
  { num: 3,  slug: "march",     long: "March",     short: "Mar" },
  { num: 4,  slug: "april",     long: "April",     short: "Apr" },
  { num: 5,  slug: "may",       long: "May",       short: "May" },
  { num: 6,  slug: "june",      long: "June",      short: "Jun" },
  { num: 7,  slug: "july",      long: "July",      short: "Jul" },
  { num: 8,  slug: "august",    long: "August",    short: "Aug" },
  { num: 9,  slug: "september", long: "September", short: "Sep" },
  { num: 10, slug: "october",   long: "October",   short: "Oct" },
  { num: 11, slug: "november",  long: "November",  short: "Nov" },
  { num: 12, slug: "december",  long: "December",  short: "Dec" },
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const title = "Where to Go in India — by Month";
  const description = "Pick a month and see India's 10/10 destinations for that window. Honest verdicts, weather windows, and skip-list flags. 460+ destinations scored.";
  const canonical = `${SITE}/${locale}/where-to-go`;
  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        en: `${SITE}/en/where-to-go`,
        hi: `${SITE}/hi/where-to-go`,
        "x-default": `${SITE}/en/where-to-go`,
      },
    },
    openGraph: { title, description, url: canonical, type: "website" },
  };
}

async function getMonthCounts(): Promise<Record<number, { go: number; skip: number }>> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return {};
  const supabase = createClient(url, key);

  const countFor = async (m: number, bucket: "go" | "skip") => {
    const q = supabase
      .from("destination_months")
      .select("*", { count: "exact", head: true })
      .eq("month", m);
    const r = bucket === "go" ? await q.gte("score", 4) : await q.lte("score", 1);
    return { month: m, bucket, count: r.count ?? 0 };
  };

  const queries: Array<Promise<{ month: number; bucket: "go" | "skip"; count: number }>> = [];
  for (let m = 1; m <= 12; m++) {
    queries.push(countFor(m, "go"));
    queries.push(countFor(m, "skip"));
  }
  const results = await Promise.all(queries);

  const out: Record<number, { go: number; skip: number }> = {};
  for (let m = 1; m <= 12; m++) out[m] = { go: 0, skip: 0 };
  for (const r of results) out[r.month][r.bucket] = r.count;
  return out;
}

export default async function WhereToGoIndex({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const counts = await getMonthCounts();
  const currentMonth = currentMonthIST();
  const currentLong = currentMonthLongIST();

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/${locale}` },
      { "@type": "ListItem", position: 2, name: "Where to go", item: `${SITE}/${locale}/where-to-go` },
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
        <header style={{ maxWidth: 1100, margin: "0 auto 48px" }}>
          <p
            className="nq-kicker"
            style={{
              color: "var(--vermillion)",
              marginBottom: 20,
              letterSpacing: "0.22em",
            }}
          >
            TRAVEL CALENDAR · 12 MONTHS
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
            Where to go in India.
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
            Pick a month. See the destinations that score 8+ out of 10 for that
            window — and the ones to skip. Verdicts come from weather, crowds,
            road conditions, and on-the-ground notes; not from sponsored picks.
          </p>
        </header>

        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          {/* Current month CTA */}
          <Link
            href={`/${locale}/where-to-go/${MONTHS[currentMonth - 1].slug}`}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 16,
              padding: 24,
              marginBottom: 32,
              border: "1px solid var(--vermillion)",
              background: "rgba(229, 86, 66, 0.08)",
              textDecoration: "none",
            }}
          >
            <div>
              <p
                className="nq-kicker"
                style={{
                  color: "var(--vermillion)",
                  marginBottom: 8,
                  letterSpacing: "0.22em",
                }}
              >
                TRAVELLING NOW
              </p>
              <p
                style={{
                  fontFamily: "var(--cinema-display)",
                  fontStyle: "italic",
                  fontWeight: 500,
                  fontSize: 22,
                  color: "var(--bone)",
                  margin: 0,
                }}
              >
                See the {counts[currentMonth]?.go ?? 0} 10/10 destinations for {currentLong}
              </p>
            </div>
            <span style={{ fontSize: 22, color: "var(--vermillion)" }} aria-hidden>→</span>
          </Link>

          {/* 12-month grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 1,
              background: "var(--hair)",
              border: "1px solid var(--hair)",
              marginBottom: 48,
            }}
          >
            {MONTHS.map((m) => {
              const c = counts[m.num] ?? { go: 0, skip: 0 };
              const isCurrent = m.num === currentMonth;
              return (
                <Link
                  key={m.slug}
                  href={`/${locale}/where-to-go/${m.slug}`}
                  style={{
                    display: "block",
                    padding: 20,
                    background: isCurrent ? "rgba(229, 86, 66, 0.06)" : "var(--paper)",
                    textDecoration: "none",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "baseline",
                      justifyContent: "space-between",
                      marginBottom: 12,
                    }}
                  >
                    <h2
                      style={{
                        fontFamily: "var(--cinema-display)",
                        fontStyle: "italic",
                        fontWeight: 500,
                        fontSize: 22,
                        color: "var(--bone)",
                        margin: 0,
                      }}
                    >
                      {m.long}
                    </h2>
                    {isCurrent && (
                      <span
                        style={{
                          fontFamily: "var(--cinema-mono)",
                          fontSize: 9,
                          letterSpacing: "0.22em",
                          textTransform: "uppercase",
                          color: "var(--vermillion)",
                          fontWeight: 700,
                        }}
                      >
                        Now
                      </span>
                    )}
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                      <span
                        style={{
                          fontFamily: "var(--cinema-display)",
                          fontStyle: "italic",
                          fontWeight: 500,
                          fontSize: 26,
                          color: "var(--bone)",
                          fontVariantNumeric: "tabular-nums",
                        }}
                      >
                        {c.go}
                      </span>
                      <span
                        style={{
                          fontFamily: "var(--cinema-mono)",
                          fontSize: 10,
                          letterSpacing: "0.18em",
                          textTransform: "uppercase",
                          color: "var(--bone-faint)",
                        }}
                      >
                        10/10 picks
                      </span>
                    </div>
                    {c.skip > 0 && (
                      <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                        <span
                          style={{
                            fontFamily: "var(--cinema-mono)",
                            fontSize: 14,
                            color: "var(--vermillion)",
                            fontVariantNumeric: "tabular-nums",
                          }}
                        >
                          {c.skip}
                        </span>
                        <span
                          style={{
                            fontFamily: "var(--cinema-mono)",
                            fontSize: 10,
                            letterSpacing: "0.18em",
                            textTransform: "uppercase",
                            color: "var(--bone-faint)",
                          }}
                        >
                          to skip
                        </span>
                      </div>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>

          <TrendingMonthPages locale={locale} />

          <div
            style={{
              marginTop: 48,
              padding: 24,
              border: "1px solid var(--hair)",
              background: "rgba(245, 241, 232, 0.02)",
            }}
          >
            <p
              className="nq-kicker"
              style={{
                color: "var(--vermillion)",
                marginBottom: 8,
                letterSpacing: "0.22em",
              }}
            >
              HOW SCORES WORK
            </p>
            <p
              style={{
                fontFamily: "var(--cinema-ui)",
                fontSize: 14,
                lineHeight: 1.7,
                color: "var(--bone-dim)",
                margin: 0,
              }}
            >
              Each destination is scored 0–5 for every month based on weather
              (precipitation, temperature, daylight), road accessibility,
              festival/permit windows, and altitude considerations. 4–5 means
              &ldquo;go now&rdquo;. 0–1 surfaces as a skip with a specific
              reason. Methodology and source data at{" "}
              <Link
                href={`/${locale}/methodology`}
                style={{
                  color: "var(--vermillion)",
                  textDecoration: "underline",
                  textUnderlineOffset: "3px",
                }}
              >
                /methodology
              </Link>
              .
            </p>
          </div>
        </div>
      </main>

      <CinematicRelatedRail />
      <Footer />
    </div>
  );
}
