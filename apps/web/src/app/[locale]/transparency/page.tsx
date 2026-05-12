import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { createClient } from "@supabase/supabase-js";
import { localeAlternates } from "@/lib/seo-utils";
import {
  FABRICATION_AUDIT,
  CROSS_STATE_CATCHES,
  CODE_GUARDRAILS,
  getAuditTotals,
} from "@/lib/fabrication-audit";

// 24h ISR — same cadence as /methodology. Audit log is hardcoded, but the
// corpus counters strip below it is live-fetched.
export const revalidate = 86400;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "Fabrication audit — NakshIQ",
    description:
      "What we caught while auditing destination stays state by state. Hotels that don't exist, listicles that swap towns, properties listed under the wrong city. The catching is the moat — and we publish it.",
    ...localeAlternates(locale, "/transparency"),
  };
}

async function getCorpusCounts() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;

  const supabase = createClient(url, key);
  const [destinations, eateries, stays] = await Promise.all([
    supabase.from("destinations").select("id", { count: "exact", head: true }),
    supabase
      .from("local_eateries")
      .select("id", { count: "exact", head: true })
      .eq("is_active", true),
    supabase
      .from("destination_stay_picks")
      .select("destination_id", { count: "exact", head: true }),
  ]);

  return {
    destinations: destinations.count ?? null,
    eateries: eateries.count ?? null,
    stays: stays.count ?? null,
  };
}

function formatPct(p: number | null): string {
  if (p == null) return "—";
  if (p === 0) return "0%";
  if (p < 1) return `${p.toFixed(1)}%`;
  return `${Math.round(p)}%`;
}

export default async function TransparencyPage() {
  const counts = await getCorpusCounts();
  const totals = getAuditTotals();

  // Sort: fabrication-rate DESC, then by completion date (most recent first)
  const rows = [...FABRICATION_AUDIT].sort((a, b) => {
    const aRate = a.fabricationRate ?? -1;
    const bRate = b.fabricationRate ?? -1;
    if (bRate !== aRate) return bRate - aRate;
    return b.completionDate.localeCompare(a.completionDate);
  });

  return (
    <div className="min-h-screen">
      <Nav />
      <main className="mx-auto max-w-3xl px-4 py-12">
        <p className="text-xs uppercase tracking-[0.08em] text-muted-foreground/60 mb-2">
          Issue 01 · Updated {new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
        </p>
        <h1 className="text-4xl font-semibold mb-2">Fabrication audit</h1>
        <p className="text-sm text-muted-foreground mb-8">
          What we caught, state by state.
        </p>

        <div className="prose prose-invert max-w-none space-y-10">
          {/* Manifesto */}
          <section>
            <h2 className="text-2xl font-semibold mb-3">Why we publish this</h2>
            <p className="text-muted-foreground leading-relaxed">
              Most travel sites don't publish their audit log. The reason is
              obvious: an audit log lists the things you almost got wrong. We
              publish ours because the catching is the actual moat. Anyone can
              write a destination page. The harder skill is recognising the
              listicle that confidently lists a hotel in the wrong town, the
              homestay that's been closed since 2022, the resort that turns out
              to share a name with a real property in the Philippines.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-3">
              Roughly one in three numbers we research turns out to be wrong,
              dead, or moved. The work of catching that — and refusing to ship
              it — is the part of the job a generic AI travel planner can't do.
              The notes below are the receipts.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-3">
              These are catches we know about. Every destination card carries a
              "Report a fabrication" link for the unknown unknowns — the ones
              we missed and you find first.
            </p>
          </section>

          {/* Live corpus counters strip */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">The audit so far</h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-xl border border-border p-4 tabular-nums">
                <div className="text-2xl font-mono font-semibold text-foreground">
                  {totals.statesCovered}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  States closed
                </div>
              </div>
              <div className="rounded-xl border border-border p-4 tabular-nums">
                <div className="text-2xl font-mono font-semibold text-foreground">
                  {totals.staysAudited.toLocaleString("en-IN")}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  Stay candidates audited
                </div>
              </div>
              <div className="rounded-xl border border-border p-4 tabular-nums">
                <div className="text-2xl font-mono font-semibold text-foreground">
                  {totals.fabricationsCaught}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  Named fabrications caught
                </div>
              </div>
              <div className="rounded-xl border border-border p-4 tabular-nums">
                <div className="text-2xl font-mono font-semibold text-foreground">
                  {totals.honestScarcityNulls}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  Honest-scarcity blanks
                </div>
              </div>
            </div>
            {counts && (
              <p className="mt-4 text-sm text-muted-foreground tabular-nums">
                Current published corpus:{" "}
                {counts.destinations != null && (
                  <>
                    <span className="font-semibold text-foreground">
                      {counts.destinations.toLocaleString("en-IN")}
                    </span>{" "}
                    destinations ·{" "}
                  </>
                )}
                {counts.eateries != null && (
                  <>
                    <span className="font-semibold text-foreground">
                      {counts.eateries.toLocaleString("en-IN")}
                    </span>{" "}
                    verified eateries ·{" "}
                  </>
                )}
                {counts.stays != null && (
                  <>
                    <span className="font-semibold text-foreground">
                      {counts.stays.toLocaleString("en-IN")}
                    </span>{" "}
                    verified stay picks
                  </>
                )}
                . What follows is what we caught before any of this got
                published.
              </p>
            )}
          </section>

          {/* Per-state catches table */}
          <section>
            <h2 className="text-2xl font-semibold mb-2">By state</h2>
            <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
              Sorted by fabrication-rate caught, highest first. A high rate
              isn't a state's failing — it's the listicle ecosystem's. It also
              means our audit on that state worked.
            </p>
            <div className="space-y-4">
              {rows.map((row) => (
                <details
                  key={row.state}
                  className="rounded-xl border border-border bg-card/30"
                >
                  <summary className="cursor-pointer list-none px-4 py-3 hover:bg-card/60 transition-colors">
                    <div className="flex items-baseline justify-between gap-3">
                      <div className="flex items-baseline gap-3">
                        <span className="font-semibold text-foreground">
                          {row.state}
                        </span>
                        <span className="text-xs text-muted-foreground tabular-nums">
                          {row.destinations} dests · {row.staysAudited} stay
                          candidates
                        </span>
                      </div>
                      <div className="flex items-center gap-3 tabular-nums">
                        {row.fabricationsCaught > 0 ? (
                          <span className="text-sm font-mono text-foreground">
                            {row.fabricationsCaught} caught ·{" "}
                            <span className="text-primary">
                              {formatPct(row.fabricationRate)}
                            </span>
                          </span>
                        ) : (
                          <span className="text-sm text-muted-foreground">
                            no fabrications
                          </span>
                        )}
                      </div>
                    </div>
                  </summary>
                  <div className="px-4 pb-4 pt-2 border-t border-border/60">
                    <p className="text-xs text-muted-foreground mb-3 tabular-nums">
                      Audit closed{" "}
                      {new Date(row.completionDate).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}{" "}
                      · {row.eateriesAudited} eateries audited ·{" "}
                      {row.honestScarcityNulls} fields left blank
                    </p>
                    <ul className="space-y-2 text-sm text-muted-foreground leading-relaxed">
                      {row.examples.map((ex, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-primary mt-0.5">—</span>
                          <span>{ex}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </details>
              ))}
            </div>
          </section>

          {/* Cross-state catches */}
          <section>
            <h2 className="text-2xl font-semibold mb-3">
              Cross-state catches
            </h2>
            <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
              The most readable proof of why we audit. A listicle confidently
              lists a property under one location; the property is somewhere
              else entirely, or somewhere else's tourism brand has been pasted
              over.
            </p>
            <ul className="space-y-3">
              {CROSS_STATE_CATCHES.map((catch_, i) => (
                <li
                  key={i}
                  className="rounded-xl border border-border bg-card/30 p-4"
                >
                  <div className="text-sm font-semibold text-foreground">
                    {catch_.claimed}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    {catch_.reality}
                  </div>
                  <div className="text-xs text-muted-foreground/60 mt-1">
                    Caught during {catch_.state}.
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* Code-side guardrails */}
          <section>
            <h2 className="text-2xl font-semibold mb-3">
              What we changed in the data layer
            </h2>
            <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
              Some failure modes get caught by an editor's eye. Others recur
              often enough that we've codified them into the database itself.
              These are the patterns that can no longer enter the corpus.
            </p>
            <ul className="space-y-4">
              {CODE_GUARDRAILS.map((g, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-primary mt-1">—</span>
                  <div>
                    <div className="text-sm font-semibold text-foreground">
                      {g.name}
                      <span className="ml-2 text-xs text-muted-foreground/70 font-normal">
                        {g.reference}
                      </span>
                    </div>
                    <div className="text-sm text-muted-foreground mt-1 leading-relaxed">
                      {g.summary}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* Footer links */}
          <section>
            <h2 className="text-2xl font-semibold mb-3">Read alongside</h2>
            <p className="text-muted-foreground leading-relaxed">
              This is the <em>what</em>. For the <em>how</em>, see our{" "}
              <Link
                href="/methodology"
                className="text-primary hover:underline"
              >
                methodology page
              </Link>
              . For the <em>why</em> — and what a blank field on a destination
              card actually means — see{" "}
              <Link
                href="/why-we-say-no-data"
                className="text-primary hover:underline"
              >
                why we say no data
              </Link>
              .
            </p>
            <p className="text-muted-foreground leading-relaxed mt-3">
              Spotted a fabrication we missed? Send the destination + the
              property name to{" "}
              <a
                href="mailto:hello@nakshiq.com"
                className="text-primary hover:underline"
              >
                hello@nakshiq.com
              </a>
              {" "}or use the "Report a fabrication" link on any destination
              page. We re-verify against a primary source before publishing
              any correction.
            </p>
          </section>

          <div className="pt-4 text-sm text-muted-foreground">
            See also:{" "}
            <Link
              href="/editorial-policy"
              className="underline underline-offset-2 hover:text-foreground"
            >
              Editorial policy
            </Link>
            {" · "}
            <Link
              href="/tourist-traps"
              className="underline underline-offset-2 hover:text-foreground"
            >
              Tourist traps
            </Link>
            {" · "}
            <Link
              href="/corrections"
              className="underline underline-offset-2 hover:text-foreground"
            >
              Corrections
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
