#!/usr/bin/env node
/**
 * sweep-pathos-top50.mjs — Prepend a one-line pathos opener to the highest-stakes
 * destination_months.prose_lead rows.
 *
 * "Pathos" here means the emotional / temporal hook that makes THIS month at THIS
 * destination distinct. Not "Tungnath is beautiful." More like: "this is the month
 * when the rhododendrons start, two weeks before Tungnath opens for the year."
 *
 * Selection: top 50 dest×month rows by current-month score = 5 (peak). Score=5
 * rows are where readers commit decisions and where prose carries the most weight.
 * If you have a GA4 page-views CSV, swap in --csv to override the selection.
 *
 * SAFETY:
 *   - Default mode is preview-only. No DB writes.
 *   - --generate calls the Anthropic API per row. NOT free — budget aware.
 *   - --write-sql produces an .sql file. You apply it MANUALLY after review,
 *     per the Supabase MCP guard rule (feedback_supabase_guard_blocks_unauthorized_writes.md).
 *
 * Usage:
 *   node scripts/sweep-pathos-top50.mjs                    # preview top 50 (no API, no DB write)
 *   node scripts/sweep-pathos-top50.mjs --limit 5          # preview a smaller slice
 *   node scripts/sweep-pathos-top50.mjs --generate         # generate openers via Claude (costs $)
 *   node scripts/sweep-pathos-top50.mjs --generate --write-sql out.sql
 *
 * Voice: follow feedback_voice_template_locked.md — use the AN pilot voice
 * (data/research/eateries/an-pilot-2026-05-08.sql), NOT the Manali why_go format.
 */

import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";
import fs from "node:fs";

config({ path: "apps/web/.env.local" });

const args = process.argv.slice(2);
const LIMIT = (() => { const i = args.indexOf("--limit"); return i >= 0 ? Number(args[i + 1]) : 50; })();
const GENERATE = args.includes("--generate");
const WRITE_SQL = (() => { const i = args.indexOf("--write-sql"); return i >= 0 ? args[i + 1] : null; })();
const CSV = (() => { const i = args.indexOf("--csv"); return i >= 0 ? args[i + 1] : null; })();

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

// ─── 1. Select candidates ─────────────────────────────────────────────

async function selectFromDb() {
  // Peak rows in current month — proxy for high-stakes prose surfaces.
  // Limited to rows that already have a prose_lead (otherwise the pathos
  // line has nothing to prepend to).
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
  // (matches the schema in scripts/log-citation-baseline-*.mjs and the GA4
  // weekly digest export in session_2026_05_04_data_pull_baseline.md)
  const raw = fs.readFileSync(path, "utf8").trim().split("\n");
  const header = raw.shift().split(",").map((h) => h.trim());
  const di = header.indexOf("destination_id");
  const mi = header.indexOf("month");
  if (di < 0 || mi < 0) throw new Error("csv must have destination_id,month columns");
  const rows = raw.slice(0, LIMIT).map((line) => {
    const cols = line.split(",");
    return { destination_id: cols[di], month: Number(cols[mi]) };
  });

  // Hydrate from DB.
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
  // Filter to exact (destination_id, month) pairs from the CSV.
  const wanted = new Set(rows.map((r) => `${r.destination_id}|${r.month}`));
  return (data ?? []).filter((r) => wanted.has(`${r.destination_id}|${r.month}`));
}

const rows = CSV ? await selectFromCsv(CSV) : await selectFromDb();

console.log(`selected ${rows.length} candidate rows (month=${currentMonth}, source=${CSV ? "csv" : "db score=5"})`);
console.log("");

// ─── 2. Preview only by default ───────────────────────────────────────

if (!GENERATE) {
  console.log("PREVIEW MODE — no API calls, no DB writes.");
  console.log("Pass --generate to call Claude for each row (costs Anthropic credits).");
  console.log("");
  for (const r of rows.slice(0, 10)) {
    const d = Array.isArray(r.destination) ? r.destination[0] : r.destination;
    console.log(`  ${d?.name ?? r.destination_id} (m=${r.month}, score=${r.score})`);
    console.log(`    existing lead: ${(r.prose_lead || "").slice(0, 100)}...`);
    console.log("");
  }
  if (rows.length > 10) console.log(`  ... and ${rows.length - 10} more`);
  console.log("");
  console.log(`total candidates: ${rows.length}`);
  console.log("next: review voice template at feedback_voice_template_locked.md");
  console.log("then: re-run with --generate --write-sql data/research/pathos-sweep.sql");
  process.exit(0);
}

// ─── 3. Generate via Claude (gated behind --generate) ─────────────────

const ANTHROPIC_KEY = process.env.ANTHROPIC_API_KEY;
if (!ANTHROPIC_KEY) {
  console.error("--generate requires ANTHROPIC_API_KEY in apps/web/.env.local");
  process.exit(1);
}

const VOICE_BRIEF = `
You are a NakshIQ editor. NakshIQ's voice: confident, honest, FT-Weekend tone,
sentence case, no travel-influencer language, no dashboard jargon.

Task: write ONE pathos opener (1 sentence, max 25 words) that names what makes
THIS month at THIS destination emotionally or temporally distinct.

Rules:
- Surface a real, time-locked detail (a bloom, a permit window, a festival, a
  thaw, a closure timeline). Never generic adjectives.
- No "hidden gem", "must-visit", "paradise", "ultimate", "breathtaking".
- Lower-case sentence except proper nouns.
- End with a period.

Reply with ONLY the sentence. No quotes, no preamble.
`.trim();

async function generatePathos(row) {
  const d = Array.isArray(row.destination) ? row.destination[0] : row.destination;
  const monthName = ["", "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"][row.month];
  const userPrompt = `Destination: ${d?.name}
Month: ${monthName}
Elevation: ${d?.elevation_m ?? "—"} m
Best for: ${(d?.best_for_segments ?? []).map((s) => s.segment).join(", ") || "—"}
Existing lead: ${row.prose_lead}

Write the pathos opener.`;

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": ANTHROPIC_KEY,
      "anthropic-version": "2023-06-01",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 80,
      system: VOICE_BRIEF,
      messages: [{ role: "user", content: userPrompt }],
    }),
  });
  if (!res.ok) {
    console.error(`anthropic ${res.status}: ${await res.text()}`);
    return null;
  }
  const json = await res.json();
  return json.content?.[0]?.text?.trim() || null;
}

const updates = [];
for (let i = 0; i < rows.length; i++) {
  const r = rows[i];
  const d = Array.isArray(r.destination) ? r.destination[0] : r.destination;
  process.stdout.write(`[${i + 1}/${rows.length}] ${d?.name}... `);
  const pathos = await generatePathos(r);
  if (!pathos) { console.log("skip"); continue; }
  console.log(pathos);
  updates.push({
    destination_id: r.destination_id,
    month: r.month,
    pathos,
    new_lead: `${pathos} ${r.prose_lead}`,
  });
}

// ─── 4. Emit SQL — do NOT auto-apply ──────────────────────────────────

if (WRITE_SQL) {
  const lines = ["-- pathos sweep — review before apply", "BEGIN;"];
  for (const u of updates) {
    const esc = u.new_lead.replace(/'/g, "''");
    lines.push(
      `UPDATE destination_months SET prose_lead = '${esc}' ` +
      `WHERE destination_id = '${u.destination_id}' AND month = ${u.month};`,
    );
  }
  lines.push("COMMIT;", "");
  fs.writeFileSync(WRITE_SQL, lines.join("\n"));
  console.log(`\nwrote ${updates.length} UPDATEs to ${WRITE_SQL}`);
  console.log("review the file, then apply via:  supabase db query --linked -f " + WRITE_SQL);
} else {
  console.log(`\ngenerated ${updates.length} updates (in-memory only — pass --write-sql <path> to persist)`);
}
