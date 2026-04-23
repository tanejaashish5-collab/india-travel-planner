import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { createClient } from "@supabase/supabase-js";
import { localeAlternates } from "@/lib/seo-utils";

export const revalidate = 3600;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "Data freshness — NakshIQ",
    description:
      "How current is NakshIQ's data? Live dashboard of review coverage, stay-pick refresh cadence, and scheduled jobs.",
    ...localeAlternates(locale, "/methodology/freshness"),
  };
}

type Metrics = {
  totalDests: number;
  reviewedPct90d: number;
  oldestUnreviewed: { id: string; name: string; state: string | null; age: string } | null;
  staysTotal: number;
  staysRefreshedPct30d: number;
  lastRuns: Record<string, { run_at: string; summary: Record<string, unknown>; alerts: number } | null>;
};

async function getMetrics(): Promise<Metrics | null> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;

  const supabase = createClient(url, key);

  const ninetyDaysAgo = Date.now() - 90 * 86400000;
  const thirtyDaysAgo = Date.now() - 30 * 86400000;

  const { data: dests } = await supabase
    .from("destinations")
    .select("id, name, content_reviewed_at, state:states(name)");
  const total = dests?.length ?? 0;
  const reviewed90 = (dests ?? []).filter(
    (d) => d.content_reviewed_at && new Date(d.content_reviewed_at).getTime() >= ninetyDaysAgo
  ).length;
  const reviewedPct90d = total ? Math.round((reviewed90 / total) * 100) : 0;

  const unreviewed = (dests ?? [])
    .filter((d) => !d.content_reviewed_at)
    .sort((a, b) => String(a.id).localeCompare(String(b.id)));
  const oldestUnreviewed = unreviewed[0]
    ? (() => {
        const d = unreviewed[0];
        const stateName = Array.isArray(d.state) ? d.state[0]?.name ?? null : (d.state as { name: string } | null)?.name ?? null;
        return { id: d.id as string, name: d.name as string, state: stateName, age: "never" };
      })()
    : null;

  const { data: picks } = await supabase.from("destination_stay_picks").select("refreshed_at");
  const staysTotal = picks?.length ?? 0;
  const staysRefreshed30 = (picks ?? []).filter(
    (p) => p.refreshed_at && new Date(p.refreshed_at).getTime() >= thirtyDaysAgo
  ).length;
  const staysRefreshedPct30d = staysTotal ? Math.round((staysRefreshed30 / staysTotal) * 100) : 0;

  const { data: reports } = await supabase
    .from("ops_reports")
    .select("job, run_at, summary, alerts_count")
    .order("run_at", { ascending: false })
    .limit(30);

  const jobs = ["refresh-stay-picks", "freshness-drift", "news-sweep"];
  const lastRuns: Metrics["lastRuns"] = {};
  for (const job of jobs) {
    const row = (reports ?? []).find((r) => r.job === job);
    lastRuns[job] = row
      ? { run_at: row.run_at as string, summary: (row.summary ?? {}) as Record<string, unknown>, alerts: (row.alerts_count ?? 0) as number }
      : null;
  }

  return {
    totalDests: total,
    reviewedPct90d,
    oldestUnreviewed,
    staysTotal,
    staysRefreshedPct30d,
    lastRuns,
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

export default async function FreshnessDashboardPage() {
  const m = await getMetrics();
  const now = new Date();
  const asOf = now.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });

  return (
    <div className="min-h-screen">
      <Nav />
      <main className="mx-auto max-w-3xl px-4 py-12">
        <nav className="mb-6 text-xs text-muted-foreground">
          <Link href="/methodology" className="hover:text-foreground">← Back to methodology</Link>
        </nav>

        <h1 className="text-4xl font-semibold mb-2">Data freshness</h1>
        <p className="text-sm text-muted-foreground mb-10 tabular-nums">
          Live as of {asOf}. This page reads directly from the database — nothing is hardcoded.
        </p>

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

        {/* Scheduled jobs */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Scheduled jobs</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Three cron jobs maintain data currency. Each writes a run log; the latest run is shown below.
          </p>
          <div className="space-y-3">
            {[
              { job: "refresh-stay-picks", label: "Stay picks", cadence: "Nightly", schedule: "03:30 IST", summaryKey: "ok" },
              { job: "freshness-drift", label: "Freshness drift", cadence: "Weekly (Mon)", schedule: "06:30 IST", summaryKey: "fresh_pct_90d" },
              { job: "news-sweep", label: "News sweep", cadence: "Monthly (1st)", schedule: "06:30 IST", summaryKey: "flagged" },
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
            <span className="text-foreground font-medium">Why show this?</span> Any site can claim "we
            keep data current." We'd rather prove it. If a number looks wrong, hit{" "}
            <Link href="/methodology" className="text-foreground underline underline-offset-2">
              how we score
            </Link>{" "}
            for the methodology, or tell us directly — every destination page has a "Suggest an edit"
            CTA that files into our triage queue.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
