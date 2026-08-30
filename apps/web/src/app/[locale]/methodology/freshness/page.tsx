import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { createClient } from "@supabase/supabase-js";
import { currentMonthIST } from "@itp/shared";
import { localeAlternates } from "@/lib/seo-utils";
import { CinemaStyles } from "@/components/landing-cinema/cinema-styles";
import { CinematicRelatedRail } from "@/components/cinematic-related-rail";

export const revalidate = 21600;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "Data freshness",
    description:
      "How current is NakshIQ's data? Live dashboard of review coverage, stay-pick refresh cadence, and scheduled jobs.",
    ...localeAlternates(locale, "/methodology/freshness"),
  };
}

type Metrics = {
  totalDests: number;
  reviewedPct90d: number;
  oldestUnreviewed: { id: string; name: string; state: string | null } | null;
  staysTotal: number;
  staysRefreshedPct30d: number;
  monthRows: number;
  lastRuns: Record<string, { run_at: string; alerts: number } | null>;
  botHits30d: Array<{ bot_name: string; count: number }>;
  botHitsTotal30d: number;
};

async function getMetrics(): Promise<Metrics | null> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;

  const supabase = createClient(url, key);

  const ninetyDaysAgoISO = new Date(Date.now() - 90 * 86400000).toISOString();
  const thirtyDaysAgoISO = new Date(Date.now() - 30 * 86400000).toISOString();

  // Exact head-counts, not row reads: PostgREST caps un-ranged reads at 1000
  // rows, which silently truncated these metrics once tables outgrew the cap
  // (stay picks showed "of 1000" when 1,908 were published).
  const [
    { count: total },
    { count: reviewed90 },
    { count: staysTotal },
    { count: staysRefreshed30 },
    { count: monthRows },
    { data: unreviewedRows },
  ] = await Promise.all([
    supabase.from("destinations").select("*", { count: "exact", head: true }),
    supabase.from("destinations").select("*", { count: "exact", head: true }).gte("content_reviewed_at", ninetyDaysAgoISO),
    supabase.from("destination_stay_picks").select("*", { count: "exact", head: true }),
    supabase.from("destination_stay_picks").select("*", { count: "exact", head: true }).gte("refreshed_at", thirtyDaysAgoISO),
    supabase.from("destination_months").select("*", { count: "exact", head: true }),
    supabase
      .from("destinations")
      .select("id, name, state:states(name)")
      .is("content_reviewed_at", null)
      .order("id")
      .limit(1),
  ]);

  const totalDests = total ?? 0;
  const reviewedPct90d = totalDests ? Math.round(((reviewed90 ?? 0) / totalDests) * 100) : 0;
  const staysTotalCount = staysTotal ?? 0;
  const staysRefreshedPct30d = staysTotalCount ? Math.round(((staysRefreshed30 ?? 0) / staysTotalCount) * 100) : 0;

  const first = unreviewedRows?.[0];
  const oldestUnreviewed = first
    ? {
        id: first.id as string,
        name: first.name as string,
        state: Array.isArray(first.state)
          ? first.state[0]?.name ?? null
          : (first.state as { name: string } | null)?.name ?? null,
      }
    : null;

  // Latest run per card, queried per job name. A shared "last 30 rows" scan
  // can never surface weekly/monthly jobs — canary-probe alone writes 48
  // rows/day, so it always owned the whole window and every card read "never".
  // Stay picks moved to a cloud agent 2026-08-04 and logs under -agent since.
  const jobNames: Record<string, string[]> = {
    "stay-picks": ["refresh-stay-picks-agent", "refresh-stay-picks"],
    "freshness-drift": ["freshness-drift"],
    "news-sweep": ["news-sweep"],
  };
  const lastRuns: Metrics["lastRuns"] = {};
  await Promise.all(
    Object.entries(jobNames).map(async ([card, names]) => {
      const { data } = await supabase
        .from("ops_reports")
        .select("run_at, alerts_count")
        .in("job", names)
        .order("run_at", { ascending: false })
        .limit(1);
      const row = data?.[0];
      lastRuns[card] = row
        ? { run_at: row.run_at as string, alerts: (row.alerts_count ?? 0) as number }
        : null;
    })
  );

  // Bot-traffic metrics — last 30 days, grouped by bot_name. Paged in ordered
  // 1000-row ranges so counts stay correct past the PostgREST cap.
  const botCountsMap = new Map<string, number>();
  let botHitsTotal30d = 0;
  for (let page = 0; page < 10; page++) {
    const { data: chunk } = await supabase
      .from("bot_visits")
      .select("bot_name")
      .gte("hit_at", thirtyDaysAgoISO)
      .order("hit_at", { ascending: true })
      .range(page * 1000, page * 1000 + 999);
    for (const row of chunk ?? []) {
      const name = (row as { bot_name: string }).bot_name;
      botCountsMap.set(name, (botCountsMap.get(name) ?? 0) + 1);
    }
    botHitsTotal30d += chunk?.length ?? 0;
    if (!chunk || chunk.length < 1000) break;
  }
  const botHits30d = Array.from(botCountsMap.entries())
    .map(([bot_name, count]) => ({ bot_name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 15);

  return {
    totalDests,
    reviewedPct90d,
    oldestUnreviewed,
    staysTotal: staysTotalCount,
    staysRefreshedPct30d,
    monthRows: monthRows ?? 0,
    lastRuns,
    botHits30d,
    botHitsTotal30d,
  };
}

function relativeAge(iso: string | null | undefined): string {
  if (!iso) return "—";
  const days = Math.max(0, Math.floor((Date.now() - new Date(iso).getTime()) / 86400000));
  if (days === 0) return "today";
  if (days === 1) return "yesterday";
  if (days < 30) return `${days} days ago`;
  const months = Math.round(days / 30);
  if (months < 12) return `${months} month${months > 1 ? "s" : ""} ago`;
  const years = Math.round(days / 365);
  return `${years} year${years > 1 ? "s" : ""} ago`;
}

export default async function FreshnessDashboardPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const m = await getMetrics();
  const now = new Date();
  const asOf = now.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });

  // Live counts feed the structured data below; the fallbacks only fire when
  // Supabase env vars are absent (never in prod).
  const destCount = m?.totalDests ?? 533;
  const verdictRows = m?.monthRows ?? destCount * 12;
  const istYear = new Intl.DateTimeFormat("en", { timeZone: "Asia/Kolkata", year: "numeric" }).format(now);

  // Dataset schema — makes the destination×month×dimension coverage claim
  // machine-readable for search engines + answer engines. Treats the live
  // scoring corpus as a citeable dataset so AI can cite us as a data source.
  const datasetLd = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    "@id": "https://www.nakshiq.com/en/methodology/freshness#dataset",
    name: "NakshIQ India Destination Scoring Dataset",
    alternateName: "NakshIQ Monthly Destination Verdicts",
    description: `Human-curated dataset of monthly go/wait/skip verdicts and 0–10 suitability scores for ${destCount} Indian destinations across 36 states and union territories. Each destination × month pair is scored across 6 dimensions: weather, access, crowd, cost, safety, and kids-suitability. Total coverage: ${verdictRows.toLocaleString("en-IN")} verdict rows. Updated on a rolling 90-day review cadence.`,
    url: "https://www.nakshiq.com/en/methodology/freshness",
    keywords: [
      "India travel",
      "destination scoring",
      "monthly travel verdicts",
      "travel intelligence",
      "India climate calendar",
      "kids safety scoring",
      "solo female travel safety",
    ],
    creator: { "@id": "https://www.nakshiq.com#organization" },
    publisher: { "@id": "https://www.nakshiq.com#organization" },
    isAccessibleForFree: true,
    license: "https://www.nakshiq.com/en/terms",
    spatialCoverage: {
      "@type": "Place",
      geo: {
        "@type": "GeoShape",
        box: "6.7531 68.1114 37.6173 97.3956", // India bounding box
      },
      name: "India",
    },
    temporalCoverage: "2026/..",
    measurementTechnique: [
      "IMD weather-window analysis",
      "CPCB air-quality seasonal averaging",
      "civil-engineering pass-status verification",
      "editorial field review",
    ],
    variableMeasured: [
      { "@type": "PropertyValue", name: "Monthly verdict", description: "go / wait / skip for each destination × month" },
      { "@type": "PropertyValue", name: "Suitability score", description: "0-10 numeric score combining weather + access + crowd" },
      { "@type": "PropertyValue", name: "Kids suitability", description: "1-5 rating with age-band guidance" },
      { "@type": "PropertyValue", name: "Solo-female safety", description: "1-5 annual index + monthly overrides" },
      { "@type": "PropertyValue", name: "Infrastructure grid", description: "7-field local-logistics grid per destination" },
      { "@type": "PropertyValue", name: "Best-for segments", description: "4 persona-fit segments per destination" },
    ],
    distribution: [
      {
        "@type": "DataDownload",
        encodingFormat: "text/html",
        contentUrl: "https://www.nakshiq.com/en/explore",
        name: "Browse by destination",
      },
      {
        "@type": "DataDownload",
        encodingFormat: "application/xml",
        contentUrl: "https://www.nakshiq.com/sitemap/1.xml",
        name: "Destination sitemap",
      },
    ],
    dateModified: now.toISOString(),
    version: `${istYear}.${String(currentMonthIST()).padStart(2, "0")}`,
  };

  // CreativeWork — the methodology + freshness page itself as a citeable work
  const methodologyLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "@id": "https://www.nakshiq.com/en/methodology/freshness#article",
    headline: "NakshIQ data freshness — review cadence and scheduled jobs",
    description: `How NakshIQ keeps its ${destCount}-destination dataset current: rolling 90-day editorial review, nightly stay-pick refresh, weekly freshness-drift alerting, monthly news-sweep.`,
    author: { "@id": "https://www.nakshiq.com#organization" },
    publisher: { "@id": "https://www.nakshiq.com#organization" },
    dateModified: now.toISOString(),
    inLanguage: "en-IN",
    isPartOf: { "@id": "https://www.nakshiq.com#website" },
    about: { "@id": "https://www.nakshiq.com/en/methodology/freshness#dataset" },
  };

  return (
    <div className="nakshiq-cinema" style={{ minHeight: "100vh" }}>
      <CinemaStyles />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(methodologyLd) }}
      />
      <Nav />
      <main
        id="main-content"
        className="nq-grain"
        style={{ position: "relative", padding: "140px 24px 64px" }}
      >
        <header style={{ maxWidth: 820, margin: "0 auto 48px" }}>
          <p
            className="nq-kicker"
            style={{
              color: "var(--vermillion)",
              marginBottom: 20,
              letterSpacing: "0.22em",
            }}
          >
            METHODOLOGY · DATA FRESHNESS · LIVE
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
            Data freshness.
          </h1>
          <p
            className="nq-mono"
            style={{
              fontSize: 11,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--bone-faint)",
              margin: "20px 0 0",
              fontVariantNumeric: "tabular-nums",
            }}
          >
            Live as of {asOf} · reads directly from the database, nothing hardcoded
          </p>
          <div style={{ marginTop: 20 }}>
            <Link
              href={`/${locale}/methodology`}
              className="nq-mono"
              style={{
                fontSize: 11,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--vermillion)",
                textDecoration: "none",
              }}
            >
              ← Methodology
            </Link>
          </div>
        </header>

        <div style={{ maxWidth: 820, margin: "0 auto" }}>

        {/* Split principle */}
        <section className="mb-10 rounded-2xl border border-border bg-card/40 p-6">
          <h2 className="text-xs font-medium uppercase tracking-[0.08em] text-muted-foreground/70 mb-3">
            The principle
          </h2>
          <p className="text-sm leading-relaxed text-foreground/85">
            Weather, season, and permit-regime content is structurally cycle-based — "June in Leh" reads
            the same every year. We don't pretend it needs yearly verification. Infrastructure, stays,
            and contacts are on a rolling 90-day review cadence.
          </p>
        </section>

        {/* Review coverage */}
        {m && (
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Review coverage</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-border p-5">
                <div className="text-[11px] font-medium uppercase tracking-[0.08em] text-muted-foreground/70">
                  Destinations reviewed ≤ 90 days
                </div>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-4xl font-semibold tabular-nums">{m.reviewedPct90d}%</span>
                  <span className="text-xs text-muted-foreground">of {m.totalDests}</span>
                </div>
              </div>
              <div className="rounded-2xl border border-border p-5">
                <div className="text-[11px] font-medium uppercase tracking-[0.08em] text-muted-foreground/70">
                  Stay picks refreshed ≤ 30 days
                </div>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-4xl font-semibold tabular-nums">{m.staysRefreshedPct30d}%</span>
                  <span className="text-xs text-muted-foreground">of {m.staysTotal}</span>
                </div>
              </div>
            </div>
            {m.oldestUnreviewed && (
              <p className="mt-4 text-xs text-muted-foreground">
                Oldest unreviewed: <span className="text-foreground">{m.oldestUnreviewed.name}</span>
                {m.oldestUnreviewed.state ? ` (${m.oldestUnreviewed.state})` : ""} — flagged for the next review sprint.
              </p>
            )}
          </section>
        )}

        {/* AI + search bot traffic */}
        {m && (
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">AI + search crawl activity</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Last 30 days of recognised crawler hits. Reads from our middleware bot-tag log —
              proof that LLM and search engines are actually crawling, not just claiming to.
            </p>
            {m.botHitsTotal30d > 0 ? (
              <div className="rounded-2xl border border-border p-5">
                <div className="flex items-baseline justify-between mb-4">
                  <div className="text-[11px] font-medium uppercase tracking-[0.08em] text-muted-foreground/70">
                    Total hits · last 30 days
                  </div>
                  <div className="text-3xl font-semibold tabular-nums">{m.botHitsTotal30d.toLocaleString()}</div>
                </div>
                <div className="space-y-1.5">
                  {m.botHits30d.map((b) => {
                    const pct = Math.round((b.count / m.botHitsTotal30d) * 100);
                    return (
                      <div key={b.bot_name} className="flex items-center gap-3">
                        <div className="w-40 shrink-0 text-xs tabular-nums text-foreground/90">{b.bot_name}</div>
                        <div className="flex-1 h-1.5 rounded-full bg-border/30 overflow-hidden">
                          <div className="h-full bg-primary/70" style={{ width: `${Math.max(pct, 2)}%` }} />
                        </div>
                        <div className="w-16 text-right text-xs tabular-nums text-muted-foreground">{b.count.toLocaleString()}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="rounded-2xl border border-border bg-card/40 p-5 text-sm text-muted-foreground">
                No recognised bot hits logged yet. The tag-and-log middleware ships with Sprint 7b —
                data accrues from here forward. Check back after the next 7 days.
              </div>
            )}
          </section>
        )}

        {/* Scheduled jobs */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Scheduled jobs</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Three scheduled jobs maintain data currency. Each writes a run log; the latest run is shown below.
          </p>
          <div className="space-y-3">
            {[
              { job: "stay-picks", label: "Stay picks", cadence: "Nightly", schedule: "~03:50 IST" },
              { job: "freshness-drift", label: "Freshness drift", cadence: "Weekly (Mon)", schedule: "06:30 IST" },
              { job: "news-sweep", label: "News sweep", cadence: "Monthly (1st)", schedule: "06:30 IST" },
            ].map((row) => {
              const last = m?.lastRuns[row.job] ?? null;
              return (
                <div key={row.job} className="rounded-xl border border-border p-4">
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div>
                      <div className="text-sm font-semibold text-foreground">{row.label}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">
                        {row.cadence} · {row.schedule}
                      </div>
                    </div>
                    <div className="text-right text-xs tabular-nums">
                      <div className="text-foreground/85">Last run: {last ? relativeAge(last.run_at) : "never"}</div>
                      {last && (
                        <div className="text-muted-foreground mt-0.5">
                          {last.alerts > 0 ? `${last.alerts} alert${last.alerts > 1 ? "s" : ""}` : "no alerts"}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Principle footer */}
        <section className="rounded-2xl border border-border bg-card/40 p-6 text-sm leading-relaxed text-muted-foreground">
          <p>
            <span className="text-foreground font-medium">Why show this?</span> Any site can claim &ldquo;we
            keep data current.&rdquo; We&apos;d rather prove it. If a number looks wrong, hit{" "}
            <Link href={`/${locale}/methodology`} className="text-foreground underline underline-offset-2">
              how we score
            </Link>{" "}
            for the methodology, or tell us directly — every destination page has a &ldquo;Suggest an edit&rdquo;
            CTA that files into our triage queue.
          </p>
        </section>
        </div>
      </main>
      <CinematicRelatedRail />
      <Footer />
    </div>
  );
}
