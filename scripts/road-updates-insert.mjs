#!/usr/bin/env node
/**
 * road-updates-insert.mjs — the ONLY write path into road_updates.
 *
 *   node --env-file=apps/web/.env.local scripts/road-updates-insert.mjs <rows.json> [--dry]
 *
 * rows.json = { "rows": [ {update_date, region_id, segment, status, headline,
 *   body?, source_url, source_label, source_published_at}, ... ],
 *   "run": { candidates, dropped_date_check, dropped_unsourced, note? } }
 *
 * Validates every row before touching the DB (region id, status enum, URL,
 * source date within 3 days of update_date and not in the future, headline
 * length), inserts with duplicates ignored, mirrors the newest status onto the
 * matching road_reports.segment, and logs the run to ops_reports as
 * 'road-updates-daily'. Exits 1 on any invalid row so a headless run can never
 * half-write. The headless Claude job produces rows.json; this script owns
 * the writes, so the rules live in code rather than in a prompt.
 */
import { readFileSync } from "node:fs";
import { createClient } from "@supabase/supabase-js";

const REGIONS = new Set(["himachal-pradesh", "ladakh", "jammu-kashmir", "uttarakhand", "sikkim", "arunachal-pradesh", "meghalaya", "rajasthan"]);
const STATUS = new Set(["open", "slow", "risky", "restricted", "blocked", "closed"]);
const [file, ...flags] = process.argv.slice(2);
const DRY = flags.includes("--dry");
if (!file) { console.error("usage: road-updates-insert.mjs <rows.json> [--dry]"); process.exit(2); }

const input = JSON.parse(readFileSync(file, "utf8"));
const rows = Array.isArray(input.rows) ? input.rows : [];
const run = input.run ?? {};
const today = new Date(Date.now() + 5.5 * 3600_000).toISOString().slice(0, 10); // IST date
const errors = [];
const clean = rows.map((r, i) => {
  const e = (m) => errors.push(`row ${i} (${r.segment ?? "?"}): ${m}`);
  if (!REGIONS.has(r.region_id)) e(`bad region_id ${r.region_id}`);
  if (!STATUS.has(r.status)) e(`bad status ${r.status}`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(r.update_date ?? "")) e("update_date not YYYY-MM-DD");
  else if (r.update_date > today) e("update_date in the future");
  if (!r.segment || r.segment.length < 5) e("segment missing");
  if (!r.headline || r.headline.length > 140) e("headline missing or >140 chars");
  if (!/^https?:\/\/\S+$/.test(r.source_url ?? "")) e("source_url not a URL");
  if (!r.source_label) e("source_label missing");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(r.source_published_at ?? "")) e("source_published_at missing (date-check failed)");
  else {
    const gap = (new Date(r.update_date) - new Date(r.source_published_at)) / 86400_000;
    if (gap < -1 || gap > 3) e(`source date ${r.source_published_at} is ${gap.toFixed(0)}d from update_date; must be within 3 days`);
    if (r.source_published_at > today) e("source date in the future");
  }
  return {
    update_date: r.update_date, region_id: r.region_id, segment: String(r.segment).trim(), status: r.status,
    headline: String(r.headline).trim(), body: r.body ? String(r.body).trim() : null,
    source_url: r.source_url, source_label: String(r.source_label).trim(), source_published_at: r.source_published_at,
  };
});
if (errors.length) { console.error("REFUSED — invalid rows:\n" + errors.join("\n")); process.exit(1); }
console.log(`${clean.length} valid rows${DRY ? " (dry run)" : ""}`);
if (DRY) { console.log(JSON.stringify(clean, null, 1)); process.exit(0); }

const s = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
let inserted = 0;
for (const r of clean) {
  // Resolve the snapshot row by segment (case-insensitive contains either way).
  const { data: reps } = await s.from("road_reports").select("id, segment").ilike("segment", `%${r.segment.split(" via ")[0].split(" to ")[0]}%`);
  const rep = (reps ?? []).find((x) => x.segment.toLowerCase() === r.segment.toLowerCase()) ?? ((reps ?? []).length === 1 ? reps[0] : null);
  const { error, data } = await s.from("road_updates").upsert({ ...r, road_report_id: rep?.id ?? null }, { onConflict: "update_date,region_id,segment,status", ignoreDuplicates: true }).select("id");
  if (error) { console.error("insert failed:", r.segment, error.message); process.exit(1); }
  if (data?.length) inserted += data.length;
  if (rep && data?.length) {
    await s.from("road_reports").update({
      status: r.status === "closed" ? "blocked" : r.status === "restricted" ? "risky" : r.status, // road_reports CHECK: open|blocked|risky|slow
      report: `${r.headline}${r.body ? " " + r.body : ""} (${r.source_label}, ${r.source_published_at})`,
      source_url: r.source_url, source_label: r.source_label, reported_at: new Date().toISOString(), last_reviewed_at: new Date().toISOString(), verified: true,
    }).eq("id", rep.id);
  }
}
const regions = [...new Set(clean.map((r) => r.region_id))];
const summary = { candidates: run.candidates ?? clean.length, inserted, duplicates: clean.length - inserted, dropped_date_check: run.dropped_date_check ?? 0, dropped_unsourced: run.dropped_unsourced ?? 0, regions_with_rows: regions, note: run.note ?? null, runner: "local-launchagent" };
await s.from("ops_reports").insert({ job: "road-updates-daily", summary, alerts_count: 0, ok: true });
console.log("inserted", inserted, "duplicates", clean.length - inserted, "regions", regions.join(","));
