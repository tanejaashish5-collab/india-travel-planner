import { createClient } from "@supabase/supabase-js";
import { Nav } from "@/components/nav";

export const dynamic = "force-dynamic";

type BotVisit = {
  id: string;
  bot_name: string;
  path: string;
  locale: string | null;
  hit_at: string;
  user_agent: string | null;
};

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

async function fetchVisits(days: number): Promise<BotVisit[]> {
  const supabase = getSupabase();
  if (!supabase) return [];
  const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();
  // 90-day window, paginated past Supabase's 1000-row default.
  const all: BotVisit[] = [];
  const page = 1000;
  let from = 0;
  while (true) {
    const { data, error } = await supabase
      .from("bot_visits")
      .select("*")
      .gte("hit_at", since)
      .order("hit_at", { ascending: false })
      .range(from, from + page - 1);
    if (error || !data) break;
    all.push(...(data as BotVisit[]));
    if (data.length < page) break;
    from += page;
  }
  return all;
}

function tally<T extends string>(arr: T[]): Array<[T, number]> {
  const m = new Map<T, number>();
  for (const v of arr) m.set(v, (m.get(v) ?? 0) + 1);
  return Array.from(m.entries()).sort((a, b) => b[1] - a[1]);
}

function dayBucket(iso: string): string {
  return iso.slice(0, 10);
}

export default async function AdminBotTrafficPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  await params;
  const visits = await fetchVisits(90);

  const now = Date.now();
  const window = (days: number) =>
    visits.filter((v) => now - new Date(v.hit_at).getTime() < days * 24 * 60 * 60 * 1000);

  const last7 = window(7);
  const last30 = window(30);

  const botCounts = tally(last30.map((v) => v.bot_name));
  const pathCounts = tally(last30.map((v) => v.path)).slice(0, 25);

  const dailyBuckets = new Map<string, number>();
  for (const v of last30) {
    const d = dayBucket(v.hit_at);
    dailyBuckets.set(d, (dailyBuckets.get(d) ?? 0) + 1);
  }
  const dailySorted = Array.from(dailyBuckets.entries())
    .sort(([a], [b]) => (a < b ? -1 : 1));
  const peakDay = dailySorted.reduce(
    (max, [, c]) => Math.max(max, c),
    0,
  );

  return (
    <div className="min-h-screen">
      <Nav />
      <main className="mx-auto max-w-6xl px-4 py-10">
        <div className="mb-8">
          <p className="text-xs font-medium text-primary uppercase tracking-[0.18em] mb-2">
            Admin · Bot Traffic
          </p>
          <h1 className="text-3xl font-semibold">AI &amp; search-engine crawl activity</h1>
          <p className="mt-2 text-sm text-muted-foreground max-w-2xl">
            Live counts from <code className="font-mono">bot_visits</code>, populated by middleware
            → <code className="font-mono">/api/log-bot-visit</code>. Confirms that GPTBot, PerplexityBot,
            ClaudeBot, OAI-SearchBot, Google-Extended and Bingbot are reaching the site.
          </p>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
          {[
            { label: "Last 7 days", value: last7.length },
            { label: "Last 30 days", value: last30.length },
            { label: "Last 90 days", value: visits.length },
            { label: "Distinct bots (30d)", value: botCounts.length },
          ].map((c) => (
            <div key={c.label} className="rounded-2xl border border-border/60 bg-card/40 p-5">
              <div className="text-xs uppercase tracking-[0.16em] text-muted-foreground/70 mb-2">
                {c.label}
              </div>
              <div className="text-2xl font-mono tabular-nums">{c.value.toLocaleString()}</div>
            </div>
          ))}
        </div>

        {/* Per-bot breakdown */}
        <section className="mb-10">
          <h2 className="text-lg font-semibold mb-3">By bot · last 30 days</h2>
          {botCounts.length === 0 ? (
            <p className="text-sm text-muted-foreground">No bot visits in the last 30 days.</p>
          ) : (
            <div className="rounded-2xl border border-border/60 overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-muted/30 text-xs uppercase tracking-[0.12em] text-muted-foreground/70">
                  <tr>
                    <th className="text-left px-4 py-2">Bot</th>
                    <th className="text-right px-4 py-2">Hits</th>
                    <th className="text-right px-4 py-2">Share</th>
                  </tr>
                </thead>
                <tbody>
                  {botCounts.map(([bot, count]) => (
                    <tr key={bot} className="border-t border-border/30">
                      <td className="px-4 py-2 font-mono text-xs">{bot}</td>
                      <td className="px-4 py-2 text-right tabular-nums">{count.toLocaleString()}</td>
                      <td className="px-4 py-2 text-right tabular-nums text-muted-foreground">
                        {((count / last30.length) * 100).toFixed(1)}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* Top paths */}
        <section className="mb-10">
          <h2 className="text-lg font-semibold mb-3">Top crawled paths · last 30 days</h2>
          {pathCounts.length === 0 ? (
            <p className="text-sm text-muted-foreground">No paths logged yet.</p>
          ) : (
            <div className="rounded-2xl border border-border/60 overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-muted/30 text-xs uppercase tracking-[0.12em] text-muted-foreground/70">
                  <tr>
                    <th className="text-left px-4 py-2">Path</th>
                    <th className="text-right px-4 py-2">Hits</th>
                  </tr>
                </thead>
                <tbody>
                  {pathCounts.map(([path, count]) => (
                    <tr key={path} className="border-t border-border/30">
                      <td className="px-4 py-2 font-mono text-xs truncate max-w-[480px]">{path}</td>
                      <td className="px-4 py-2 text-right tabular-nums">{count.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* Daily trend (text-only sparkline — no chart lib) */}
        <section className="mb-10">
          <h2 className="text-lg font-semibold mb-3">Daily volume · last 30 days</h2>
          {dailySorted.length === 0 ? (
            <p className="text-sm text-muted-foreground">No daily data.</p>
          ) : (
            <div className="rounded-2xl border border-border/60 p-5 font-mono text-xs">
              {dailySorted.map(([day, count]) => {
                const width = peakDay > 0 ? Math.round((count / peakDay) * 60) : 0;
                return (
                  <div key={day} className="flex items-center gap-3 py-0.5">
                    <span className="text-muted-foreground w-24 shrink-0">{day}</span>
                    <span className="text-primary/70" aria-hidden="true">
                      {"▮".repeat(width)}
                    </span>
                    <span className="ml-auto tabular-nums text-muted-foreground">
                      {count}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* Recent visits */}
        <section className="mb-10">
          <h2 className="text-lg font-semibold mb-3">Most recent visits</h2>
          <div className="rounded-2xl border border-border/60 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-muted/30 text-xs uppercase tracking-[0.12em] text-muted-foreground/70">
                <tr>
                  <th className="text-left px-4 py-2">Time</th>
                  <th className="text-left px-4 py-2">Bot</th>
                  <th className="text-left px-4 py-2">Path</th>
                </tr>
              </thead>
              <tbody>
                {visits.slice(0, 50).map((v) => (
                  <tr key={v.id} className="border-t border-border/30">
                    <td className="px-4 py-2 font-mono text-xs text-muted-foreground tabular-nums">
                      {new Date(v.hit_at).toISOString().replace("T", " ").slice(0, 16)}
                    </td>
                    <td className="px-4 py-2 font-mono text-xs">{v.bot_name}</td>
                    <td className="px-4 py-2 font-mono text-xs truncate max-w-[420px]">{v.path}</td>
                  </tr>
                ))}
                {visits.length === 0 && (
                  <tr>
                    <td colSpan={3} className="px-4 py-8 text-center text-muted-foreground text-sm">
                      No bot visits recorded yet. Confirm middleware logs to <code className="font-mono">/api/log-bot-visit</code>.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}
