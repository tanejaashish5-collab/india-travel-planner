#!/usr/bin/env node
/**
 * sweep-pathos-top50.mjs — Identify the highest-stakes destination_months
 * rows that should get a one-line pathos opener prepended to prose_lead.
 *
 * "Pathos" here means the emotional / temporal hook that makes THIS month at
 * THIS destination distinct. Not "Tungnath is beautiful." More like: "this is
 * the month when the rhododendrons start, two weeks before Tungnath opens for
 * the year."
 *
 * SCOPE OF THIS SCRIPT (deliberate):
 *   - Selects candidate rows and prints them with their existing prose_lead.
 *   - Optionally writes the row set to CSV/JSON so an editor can hand-write
 *     pathos lines offline.
 *   - Never calls an LLM API. Never writes to the database.
 *
 * NO ANTHROPIC API: per the global rule (feedback_no_anthropic_api_ever.md),
 * this script does NOT call api.anthropic.com or any paid SDK. Pathos lines
 * are authored by a human editor. The role of the script is row selection
 * and SQL stub emission for manual review + manual apply.
 *
 * Selection: top N dest×month rows by current-month score = 5 (peak). Score=5
 * rows are where readers commit decisions and where prose carries the most
 * weight. A GA4 page-views CSV can override the selection via --csv.
 *
 * Usage:
 *   node scripts/sweep-pathos-top50.mjs                       # preview top 50
 *   node scripts/sweep-pathos-top50.mjs --limit 5             # preview a slice
 *   node scripts/sweep-pathos-top50.mjs --csv ga4-top50.csv   # use GA4 override
 *   node scripts/sweep-pathos-top50.mjs --export rows.json    # dump for offline editing
 *   node scripts/sweep-pathos-top50.mjs --emit-sql stub.sql   # write SQL TEMPLATE with `<PATHOS HERE>` placeholders
 *
 * Voice: when an editor writes the pathos lines, follow
 *   feedback_voice_template_locked.md  (AN pilot voice, not Manali why_go).
 *   apps/web/docs/voice.md             (sentence case, no influencer language).
 *
 * Applying the SQL: per feedback_supabase_guard_blocks_unauthorized_writes.md,
 * review the stub manually, fill in pathos lines, then apply via:
 *   supabase db query --linked -f stub.sql
 */

import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";
import fs from "node:fs";

config({ path: "apps/web/.env.local" });

const args = process.argv.slice(2);
const LIMIT = (() => { const i = args.indexOf("--limit"); return i >= 0 ? Number(args[i + 1]) : 50; })();
const CSV = (() => { const i = args.indexOf("--csv"); return i >= 0 ? args[i + 1] : null; })();
const EXPORT = (() => { const i = args.indexOf("--export"); return i >= 0 ? args[i + 1] : null; })();
const EMIT_SQL = (() => { const i = args.indexOf("--emit-sql"); return i >= 0 ? args[i + 1] : null; })();

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error("missing supabase env. expected apps/web/.env.local");
  process.exit(1);
}

const sb = createClient(SUPABASE_URL, SUPABASE_KEY, { auth: { persistSession: false } });

// Current month, IST-aware. Server may run UTC; this matches the @itp/shared rule.
function currentMonthIST() {
  const now = new Date();
  const istMs = now.getTime() + 5.5 * 60 * 60 * 1000;
  return new Date(istMs).getUTCMonth() + 1;
}
const currentMonth = currentMonthIST();
const MONTH_NAMES = ["", "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];

// ─── 1. Select candidates ─────────────────────────────────────────────

async function selectFromDb() {
  const { data, error } = await sb
    .from("destination_months")
    .select(`
      destination_id,
      month,
      score,
      prose_lead,
      go_or_skip_verdict,
      destination:destinations(name, state_id, elevation_m, best_for_segments, tagline)
    `)
    .eq("month", currentMonth)
    .eq("score", 5)
    .not("prose_lead", "is", null)
    .limit(LIMIT);

  if (error) {
    console.error("query failed:", error.message);
    process.exit(1);
  }
  return data ?? [];
}

async function selectFromCsv(path) {
  // Expected CSV columns: destination_id, month, pageviews
  // (matches the schema in scripts/log-citation-baseline-*.mjs)
  const raw = fs.readFileSync(path, "utf8").trim().split("\n");
  const header = raw.shift().split(",").map((h) => h.trim());
  const di = header.indexOf("destination_id");
  const mi = header.indexOf("month");
  if (di < 0 || mi < 0) throw new Error("csv must have destination_id,month columns");
  const rows = raw.slice(0, LIMIT).map((line) => {
    const cols = line.split(",");
    return { destination_id: cols[di], month: Number(cols[mi]) };
  });
  const ids = rows.map((r) => r.destination_id);
  const months = [...new Set(rows.map((r) => r.month))];
  const { data, error } = await sb
    .from("destination_months")
    .select(`
      destination_id, month, score, prose_lead, go_or_skip_verdict,
      destination:destinations(name, state_id, elevation_m, best_for_segments, tagline)
    `)
    .in("destination_id", ids)
    .in("month", months);
  if (error) throw error;
  const wanted = new Set(rows.map((r) => `${r.destination_id}|${r.month}`));
  return (data ?? []).filter((r) => wanted.has(`${r.destination_id}|${r.month}`));
}

const rows = CSV ? await selectFromCsv(CSV) : await selectFromDb();

console.log(`selected ${rows.length} candidate rows (month=${currentMonth} / ${MONTH_NAMES[currentMonth]}, source=${CSV ? "csv" : "db score=5"})`);
console.log("");

// ─── 2. Preview ────────────────────────────────────────────────────────

for (const r of rows.slice(0, 10)) {
  const d = Array.isArray(r.destination) ? r.destination[0] : r.destination;
  console.log(`  ${d?.name ?? r.destination_id} (m=${r.month}, score=${r.score})`);
  console.log(`    existing lead: ${(r.prose_lead || "").slice(0, 120)}...`);
  console.log("");
}
if (rows.length > 10) console.log(`  ... and ${rows.length - 10} more`);
console.log("");
console.log(`total candidates: ${rows.length}`);

// ─── 3. Optional exports ──────────────────────────────────────────────

function shapeRow(r) {
  const d = Array.isArray(r.destination) ? r.destination[0] : r.destination;
  return {
    destination_id: r.destination_id,
    destination_name: d?.name ?? null,
    state_id: d?.state_id ?? null,
    elevation_m: d?.elevation_m ?? null,
    best_for: (d?.best_for_segments ?? []).map((s) => s.segment).filter(Boolean),
    month: r.month,
    month_name: MONTH_NAMES[r.month],
    score: r.score,
    verdict: r.go_or_skip_verdict,
    existing_prose_lead: r.prose_lead,
    new_pathos: "",
  };
}

if (EXPORT) {
  const payload = rows.map(shapeRow);
  fs.writeFileSync(EXPORT, JSON.stringify(payload, null, 2));
  console.log(`\nwrote ${payload.length} rows to ${EXPORT}`);
  console.log("editor workflow:");
  console.log("  1. open the file, fill in `new_pathos` per row (1 sentence, voice locked)");
  console.log("  2. re-run with --emit-sql + the edited file to generate UPDATEs");
}

if (EMIT_SQL) {
  let source = rows.map(shapeRow);
  if (EXPORT && fs.existsSync(EXPORT)) {
    // If the editor has already filled in pathos in the exported file, prefer those.
    try {
      const edited = JSON.parse(fs.readFileSync(EXPORT, "utf8"));
      const byKey = new Map(edited.map((e) => [`${e.destination_id}|${e.month}`, e]));
      source = source.map((s) => {
        const e = byKey.get(`${s.destination_id}|${s.month}`);
        return e ? { ...s, new_pathos: e.new_pathos } : s;
      });
    } catch {}
  }

  const lines = [
    "-- pathos sweep — review every UPDATE before applying",
    "-- generated by scripts/sweep-pathos-top50.mjs",
    "-- voice: feedback_voice_template_locked.md + apps/web/docs/voice.md",
    "-- apply via: supabase db query --linked -f " + EMIT_SQL,
    "BEGIN;",
  ];
  for (const s of source) {
    const pathos = s.new_pathos?.trim() || "<PATHOS HERE>";
    const stub = `${pathos} ${s.existing_prose_lead}`.replace(/'/g, "''");
    lines.push(
      `-- ${s.destination_name} · ${s.month_name} · score ${s.score}`,
      `UPDATE destination_months SET prose_lead = '${stub}' ` +
        `WHERE destination_id = '${s.destination_id}' AND month = ${s.month};`,
      "",
    );
  }
  lines.push("COMMIT;");
  fs.writeFileSync(EMIT_SQL, lines.join("\n"));
  console.log(`\nwrote ${source.length} UPDATE stubs to ${EMIT_SQL}`);
  console.log("review every line (especially any with `<PATHOS HERE>`), then apply via:");
  console.log("  supabase db query --linked -f " + EMIT_SQL);
}

if (!EXPORT && !EMIT_SQL) {
  console.log("");
  console.log("editor workflow:");
  console.log("  1. node scripts/sweep-pathos-top50.mjs --export pathos-rows.json");
  console.log("  2. edit pathos-rows.json — fill `new_pathos` per row (voice rules apply)");
  console.log("  3. node scripts/sweep-pathos-top50.mjs --export pathos-rows.json --emit-sql pathos.sql");
  console.log("  4. review pathos.sql, then: supabase db query --linked -f pathos.sql");
}
