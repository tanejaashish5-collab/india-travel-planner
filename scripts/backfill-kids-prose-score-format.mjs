#!/usr/bin/env node
/**
 * backfill-kids-prose-score-format.mjs — one-off DB cleanup for the
 * 0–5 → 0–10 score consistency sweep (2026-05-05).
 *
 * The kidsLine() function in generate-destination-months-prose.mjs used to
 * append "Family-appropriate: 4/5." / "Manageable with older kids: 3/5." /
 * "Not a kids destination: 2/5." to destination_months.why_go and why_not.
 * That source has been fixed to emit X.X/10. This script rewrites the
 * already-stored prose in place — six fixed-string replacements only — so
 * we don't have to re-run the whole prose composer over 5,856 rows.
 *
 *   --dry-run   show counts only
 *   --apply     execute the UPDATE
 */
import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";

config({ path: "apps/web/.env.local" });

const args = process.argv.slice(2);
const APPLY = args.includes("--apply");
const DRY_RUN = !APPLY;

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in apps/web/.env.local");
  process.exit(1);
}

const sb = createClient(url, key, { auth: { persistSession: false } });

const PATTERNS = [
  { from: "Family-appropriate: 5/5.",            to: "Family-appropriate: 10.0/10." },
  { from: "Family-appropriate: 4/5.",            to: "Family-appropriate: 8.0/10."  },
  { from: "Manageable with older kids: 3/5.",    to: "Manageable with older kids: 6.0/10." },
  { from: "Not a kids destination: 2/5.",        to: "Not a kids destination: 4.0/10." },
  { from: "Not a kids destination: 1/5.",        to: "Not a kids destination: 2.0/10." },
  { from: "Not a kids destination: 0/5.",        to: "Not a kids destination: 0.0/10." },
];

async function main() {
  console.log(`Mode: ${DRY_RUN ? "DRY-RUN (counts only)" : "APPLY"}`);
  console.log("Scanning destination_months.why_go + why_not for stale 0-5 kids text...\n");

  // Supabase caps .select() at 1000 rows by default. Paginate via range().
  const rows = [];
  const PAGE = 1000;
  let from = 0;
  while (true) {
    const { data, error } = await sb
      .from("destination_months")
      .select("destination_id, month, why_go, why_not")
      .order("destination_id", { ascending: true })
      .order("month", { ascending: true })
      .range(from, from + PAGE - 1);
    if (error) { console.error("Read failed:", error); process.exit(1); }
    if (!data || data.length === 0) break;
    rows.push(...data);
    if (data.length < PAGE) break;
    from += PAGE;
  }
  console.log(`Read ${rows.length} rows from destination_months.\n`);

  let touched = 0;
  let total_replacements = 0;
  const updates = [];

  for (const row of rows ?? []) {
    let why_go = row.why_go ?? "";
    let why_not = row.why_not ?? "";
    const before_go = why_go;
    const before_not = why_not;
    let row_count = 0;

    for (const { from, to } of PATTERNS) {
      while (why_go.includes(from))  { why_go = why_go.replace(from, to);  row_count++; }
      while (why_not.includes(from)) { why_not = why_not.replace(from, to); row_count++; }
    }

    if (why_go !== before_go || why_not !== before_not) {
      touched++;
      total_replacements += row_count;
      updates.push({
        destination_id: row.destination_id,
        month: row.month,
        why_go: why_go !== before_go ? why_go : undefined,
        why_not: why_not !== before_not ? why_not : undefined,
      });
    }
  }

  console.log(`Rows needing patch: ${touched}`);
  console.log(`Total string replacements: ${total_replacements}\n`);

  if (DRY_RUN) {
    console.log("Sample (first 5):");
    for (const u of updates.slice(0, 5)) {
      console.log(`  ${u.destination_id} m=${u.month}`);
      if (u.why_go)  console.log(`    why_go  → …${u.why_go.slice(-80)}`);
      if (u.why_not) console.log(`    why_not → …${u.why_not.slice(-80)}`);
    }
    console.log("\nRun with --apply to execute.");
    return;
  }

  // Apply — one UPDATE per row. ~hundreds of rows so this is fine without batching.
  let okCount = 0, errCount = 0;
  for (const u of updates) {
    const patch = {};
    if (u.why_go !== undefined)  patch.why_go  = u.why_go;
    if (u.why_not !== undefined) patch.why_not = u.why_not;
    const { error: upErr } = await sb
      .from("destination_months")
      .update(patch)
      .eq("destination_id", u.destination_id)
      .eq("month", u.month);
    if (upErr) { errCount++; console.error(`  ✗ ${u.destination_id} m=${u.month}:`, upErr.message); }
    else okCount++;
  }
  console.log(`\nApplied: ${okCount} ok · ${errCount} errors`);
}

main().catch((e) => { console.error(e); process.exit(1); });
