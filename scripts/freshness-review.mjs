#!/usr/bin/env node
/**
 * freshness-review.mjs — pick + apply halves of the weekly destination review
 * (driven by scripts/freshness-review-weekly.sh, procedure in
 * .claude/commands/freshness-review.md).
 *
 * WHY THIS EXISTS
 * Every "VERIFIED <month>" label on a destination page comes from
 * destinations.content_reviewed_at. Until 2026-09-21 nothing re-checked pages
 * after the Apr–Jun backfills, so the share reviewed in the last 90 days fell
 * 100% → 5% while the Monday freshness-drift cron reported 0 alerts. This job
 * re-checks the stalest ~41 destinations a week (533 / 13 weeks), so every page
 * is re-verified at least once a quarter.
 *
 * THE ONLY WRITE is content_reviewed_at, through the stamp_destinations_reviewed
 * RPC (migration 076). A review that finds something wrong does NOT stamp the
 * row and does NOT edit content — it lands in the run note as a proposed
 * correction, so the page keeps showing its honest (older) date until a human
 * session applies the fix with sources.
 *
 * Usage:
 *   node --env-file=apps/web/.env.local scripts/freshness-review.mjs pick --n 41 --out <batch.json>
 *   node --env-file=apps/web/.env.local scripts/freshness-review.mjs apply --batch <batch.json> --entries <entries.json>            # validate only
 *   node --env-file=apps/web/.env.local scripts/freshness-review.mjs apply --batch <batch.json> --entries <entries.json> --commit   # stamp
 *
 * entries.json:
 *   { "reviews": [ { "id": "spiti-valley", "verdict": "confirmed" | "needs_correction",
 *                    "sources": ["https://…", "https://…"], "notes": "…",
 *                    "corrections": [ { "field", "current", "proposed", "source" } ] } ] }
 */
import { createClient } from "@supabase/supabase-js";
import { readFileSync, writeFileSync } from "node:fs";

const [cmd, ...rest] = process.argv.slice(2);
const arg = (name) => {
  const i = rest.indexOf(`--${name}`);
  return i < 0 ? null : rest[i + 1];
};
const COMMIT = rest.includes("--commit");

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.error("FATAL: run with --env-file=apps/web/.env.local");
  process.exit(1);
}
const supabase = createClient(url, key, { auth: { persistSession: false } });

// Facts on a destination page that can go stale between reviews.
const TIME_SENSITIVE = [
  "id", "name", "state_id", "content_reviewed_at",
  "permit_required", "permit_type", "permit_lead_days",
  "nearest_airport", "nearest_railhead",
  "atm_available", "cell_network", "medical_facility",
  "best_months", "avoid_months", "daily_cost", "local_logistics",
].join(", ");

if (cmd === "pick") {
  const n = Number(arg("n") ?? 41);
  const out = arg("out");
  if (!out) { console.error("pick needs --out"); process.exit(1); }
  const { data, error } = await supabase
    .from("destinations")
    .select(TIME_SENSITIVE)
    .order("content_reviewed_at", { ascending: true, nullsFirst: true })
    .limit(n);
  if (error) { console.error(`FATAL: ${error.message}`); process.exit(1); }
  writeFileSync(out, JSON.stringify({ picked_at: new Date().toISOString(), destinations: data }, null, 2));
  console.log(`picked ${data.length} → ${out} (oldest ${data[0]?.content_reviewed_at ?? "never"})`);
  process.exit(0);
}

if (cmd !== "apply") {
  console.error("usage: freshness-review.mjs pick|apply …");
  process.exit(1);
}

const batch = JSON.parse(readFileSync(arg("batch"), "utf8"));
const allowed = new Set(batch.destinations.map((d) => d.id));
const { reviews = [] } = JSON.parse(readFileSync(arg("entries"), "utf8"));

async function reachable(u) {
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const res = await fetch(u, {
        redirect: "follow",
        signal: AbortSignal.timeout(20000),
        headers: { "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126 Safari/537.36" },
      });
      if (res.status < 400) return true;
    } catch { /* retry — .gov.in hosts are slow */ }
  }
  return false;
}

const stamp = [];
const corrections = [];
const dropped = [];

for (const r of reviews) {
  if (!allowed.has(r.id)) { dropped.push({ id: r.id, why: "not in this week's batch" }); continue; }
  if (r.verdict === "needs_correction") { corrections.push(r); continue; }
  if (r.verdict !== "confirmed") { dropped.push({ id: r.id, why: `unknown verdict ${r.verdict}` }); continue; }

  const sources = [...new Set((r.sources ?? []).filter((s) => /^https?:\/\//.test(s)))];
  const hosts = new Set(sources.map((s) => new URL(s).hostname.replace(/^www\./, "")));
  hosts.delete("nakshiq.com");
  if (hosts.size < 2) { dropped.push({ id: r.id, why: "needs 2+ independent source hosts (nakshiq.com does not count)" }); continue; }

  let ok = false;
  for (const s of sources) if (await reachable(s)) { ok = true; break; }
  if (!ok) { dropped.push({ id: r.id, why: "no source URL could be opened" }); continue; }
  stamp.push(r.id);
}

let stamped = 0;
if (COMMIT && stamp.length) {
  const { data, error } = await supabase.rpc("stamp_destinations_reviewed", { p_ids: stamp });
  if (error) { console.error(`FATAL: stamp failed: ${error.message}`); process.exit(1); }
  stamped = data ?? 0;
}

if (COMMIT) {
  // Run log for the watchdog + /methodology/freshness. {total, fail} feeds the
  // watchdog's silent-failure detector: a week where half the batch went
  // unreviewed alerts even though the run itself "succeeded".
  // alerts_count = proposed corrections (live facts that are now wrong).
  const total = batch.destinations.length;
  const { error } = await supabase.from("ops_reports").insert({
    job: "freshness-review",
    summary: {
      total,
      ok: stamped,
      fail: Math.max(0, total - stamped - corrections.length),
      corrections: corrections.map((c) => ({ id: c.id, fields: (c.corrections ?? []).map((x) => x.field) })),
      dropped,
    },
    alerts_count: corrections.length,
    ok: true,
  });
  if (error) console.error(`warn: ops_reports insert failed: ${error.message}`);
}

for (const d of dropped) console.log(`dropped ${d.id}: ${d.why}`);
for (const c of corrections) console.log(`correction ${c.id}: ${(c.corrections ?? []).map((x) => x.field).join(", ") || c.notes}`);
console.log(`${COMMIT ? "stamped" : "would stamp"} ${COMMIT ? stamped : stamp.length}: ${stamp.join(", ")}`);
console.log(`RESULT stamped=${COMMIT ? stamped : 0} valid=${stamp.length} corrections=${corrections.length} dropped=${dropped.length} unreviewed=${batch.destinations.length - reviews.filter((r) => allowed.has(r.id)).length}`);
