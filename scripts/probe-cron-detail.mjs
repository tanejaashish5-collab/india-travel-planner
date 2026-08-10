/**
 * probe-cron-detail.mjs — READ-ONLY. Per-job history + latest.summary payload.
 *
 * Fixes a flaw in probe-cron-health.mjs: that script pulled the most recent
 * 4000 rows GLOBALLY, so high-frequency jobs (canary-probe, audit-cache-headers)
 * crowded out the older history of low-frequency ones — making e.g.
 * freshness-drift look like it had only ever run twice. Querying per job removes
 * the truncation.
 *
 * USAGE
 *   node --env-file=apps/web/.env.local scripts/probe-cron-detail.mjs [job ...]
 */
import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.error("✗ run with: node --env-file=apps/web/.env.local scripts/probe-cron-detail.mjs");
  process.exit(1);
}
const supabase = createClient(url, key, { auth: { persistSession: false } });

const jobs = process.argv.slice(2);
if (jobs.length === 0) {
  console.error("✗ pass at least one job name");
  process.exit(1);
}

for (const job of jobs) {
  const { data, error } = await supabase
    .from("ops_reports")
    .select("run_at, ok, alerts_count, summary")
    .eq("job", job)
    .order("run_at", { ascending: false })
    .limit(30);
  if (error) {
    console.error(`✗ ${job}: ${error.message}`);
    continue;
  }
  console.log(`\n${"=".repeat(78)}\n${job} — ${data.length} runs (per-job query, no truncation)\n${"=".repeat(78)}`);
  for (const r of data.slice(0, 14)) {
    const ago = ((Date.now() - new Date(r.run_at).getTime()) / 86400000).toFixed(1);
    console.log(`  ${r.run_at.slice(0, 16).replace("T", " ")}  ${ago.padStart(5)}d ago  ok=${String(r.ok).padEnd(5)} alerts=${r.alerts_count ?? 0}`);
  }
  const latest = data[0];
  if (latest?.summary) {
    const json = JSON.stringify(latest.summary);
    console.log(`\n  latest.summary payload (${json.length} chars):`);
    console.log("  " + json.slice(0, 1400).replace(/\n/g, " "));
    if (json.length > 1400) console.log("  …truncated");
  }
}
