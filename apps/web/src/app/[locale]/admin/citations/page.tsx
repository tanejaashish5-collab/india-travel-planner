import { createClient } from "@supabase/supabase-js";
import { Nav } from "@/components/nav";
import { CitationsLogger } from "@/components/admin-citations-logger";
import { readFileSync } from "fs";
import { join } from "path";

export const dynamic = "force-dynamic";

type Citation = {
  id: string;
  query_id: string;
  engine: string;
  cited: boolean;
  citation_url: string | null;
  ran_at: string;
};

type Prompt = {
  id: string;
  category: string;
  query: string;
  target_url: string;
};

const ENGINES = ["perplexity", "chatgpt", "aio", "gemini", "claude", "copilot"];

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

async function fetchCitations(): Promise<Citation[]> {
  const supabase = getSupabase();
  if (!supabase) return [];
  const all: Citation[] = [];
  const page = 1000;
  let from = 0;
  while (true) {
    const { data, error } = await supabase
      .from("ai_citations")
      .select("*")
      .order("ran_at", { ascending: false })
      .range(from, from + page - 1);
    if (error || !data) break;
    all.push(...(data as Citation[]));
    if (data.length < page) break;
    from += page;
  }
  return all;
}

function loadPrompts(): Prompt[] {
  try {
    const path = join(process.cwd(), "..", "..", "data", "citation-prompts.json");
    const raw = readFileSync(path, "utf-8");
    return JSON.parse(raw).prompts ?? [];
  } catch {
    try {
      const fallback = join(process.cwd(), "data", "citation-prompts.json");
      const raw = readFileSync(fallback, "utf-8");
      return JSON.parse(raw).prompts ?? [];
    } catch {
      return [];
    }
  }
}

export default async function AdminCitationsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  await params;
  const [citations, prompts] = await Promise.all([
    fetchCitations(),
    Promise.resolve(loadPrompts()),
  ]);

  // Per-engine summary from last 30 days
  const now = Date.now();
  const last30 = citations.filter(
    (c) => now - new Date(c.ran_at).getTime() < 30 * 24 * 60 * 60 * 1000,
  );

  const engineSummary = ENGINES.map((engine) => {
    const rows = last30.filter((c) => c.engine === engine);
    const cited = rows.filter((c) => c.cited).length;
    return {
      engine,
      total: rows.length,
      cited,
      pct: rows.length > 0 ? (cited / rows.length) * 100 : 0,
    };
  });

  // Latest result per (query_id, engine) — for the pivot grid
  const latestByCell = new Map<string, Citation>();
  for (const c of citations) {
    const key = `${c.query_id}::${c.engine}`;
    if (!latestByCell.has(key)) latestByCell.set(key, c);
  }

  // Group prompts by category
  const promptsByCategory = new Map<string, Prompt[]>();
  for (const p of prompts) {
    if (!promptsByCategory.has(p.category)) promptsByCategory.set(p.category, []);
    promptsByCategory.get(p.category)!.push(p);
  }

  // Daily volume sparkline
  const dailyBuckets = new Map<string, number>();
  for (const c of last30) {
    const d = c.ran_at.slice(0, 10);
    dailyBuckets.set(d, (dailyBuckets.get(d) ?? 0) + 1);
  }
  const dailySorted = Array.from(dailyBuckets.entries()).sort(([a], [b]) => (a < b ? -1 : 1));
  const peakDay = dailySorted.reduce((max, [, c]) => Math.max(max, c), 0);

  return (
    <div className="min-h-screen">
      <Nav />
      <main className="mx-auto max-w-7xl px-4 py-10">
        <div className="mb-8">
          <p className="text-xs font-medium text-primary uppercase tracking-[0.18em] mb-2">
            Admin · AI citation tracker
          </p>
          <h1 className="text-3xl font-semibold">Are LLMs citing NakshIQ?</h1>
          <p className="mt-2 text-sm text-muted-foreground max-w-2xl">
            100 target queries × 6 engines = 600 weekly checks. Click the prompt to open all 6 engines in browser tabs;
            log each result with the buttons below. Same data backend as <code className="font-mono">scripts/track-ai-citations.mjs</code>.
          </p>
        </div>

        {/* Engine summary cards */}
        <section className="mb-10">
          <h2 className="text-lg font-semibold mb-3">Last 30 days · by engine</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {engineSummary.map((s) => (
              <div key={s.engine} className="rounded-2xl border border-border/60 bg-card/40 p-4">
                <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground/70 mb-2">
                  {s.engine}
                </div>
                <div className="text-2xl font-mono tabular-nums">
                  {s.cited}
                  <span className="text-sm text-muted-foreground/50">/{s.total}</span>
                </div>
                <div className="text-xs text-muted-foreground tabular-nums mt-1">
                  {s.pct.toFixed(0)}% cited
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Daily volume */}
        <section className="mb-10">
          <h2 className="text-lg font-semibold mb-3">Logging volume · last 30 days</h2>
          {dailySorted.length === 0 ? (
            <p className="text-sm text-muted-foreground">No checks logged yet. Run <code className="font-mono">node scripts/track-ai-citations.mjs --list</code> or use the buttons below.</p>
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

        {/* Pivot — interactive */}
        <CitationsLogger
          prompts={prompts}
          engines={ENGINES}
          latestByCell={Array.from(latestByCell.entries()).map(([k, v]) => ({
            key: k,
            cited: v.cited,
            ran_at: v.ran_at,
          }))}
        />
      </main>
    </div>
  );
}
