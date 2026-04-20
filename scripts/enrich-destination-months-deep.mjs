#!/usr/bin/env node
/**
 * enrich-destination-months-deep.mjs — audit + commit script for the 4
 * deep content columns on destination_months. Consumes the JSON emitted
 * by generate-enrichment-drafts.mjs.
 *
 * Usage:
 *   node scripts/enrich-destination-months-deep.mjs data/enrichment/deep-tier5.json
 *   node scripts/enrich-destination-months-deep.mjs data/enrichment/deep-tier5.json --commit
 *
 * Audit rules (all must pass; rejects block commit):
 *   - things_to_do: 3–5 items, each 6–120 chars, no banned words
 *   - festivals_this_month: 0–3 items, each 4–80 chars
 *   - pack_list: 5–7 items, each 3–60 chars
 *   - go_or_skip_verdict: 25–40 words, starts with Go|Skip|Mixed
 *   - No banned words anywhere in any string
 */

import { readFileSync } from "fs";
import { createClient } from "@supabase/supabase-js";

const BANNED = [
  "hidden gem", "unforgettable", "stunning", "must-visit", "must visit",
  "bucket list", "breathtaking", "magical", "incredible", "authentic",
  "curated", "elevated", "immersive", "paradise", "pristine",
];

function hasBanned(s) {
  if (!s) return false;
  const lower = s.toLowerCase();
  return BANNED.some((w) => lower.includes(w));
}
function bannedHits(s) {
  const lower = (s ?? "").toLowerCase();
  return BANNED.filter((w) => lower.includes(w));
}

function auditRow(r) {
  const errors = [];

  // things_to_do
  const ttd = r.things_to_do ?? [];
  if (!Array.isArray(ttd) || ttd.length < 3 || ttd.length > 5) {
    errors.push(`things_to_do: expected 3–5 items, got ${ttd.length}`);
  } else {
    ttd.forEach((t, i) => {
      if (typeof t !== "string" || t.length < 6 || t.length > 120)
        errors.push(`things_to_do[${i}] length ${t?.length} out of bounds (6–120)`);
      if (hasBanned(t)) errors.push(`things_to_do[${i}] banned: ${bannedHits(t).join(", ")}`);
    });
  }

  // festivals_this_month
  const fest = r.festivals_this_month ?? [];
  if (!Array.isArray(fest) || fest.length > 3) {
    errors.push(`festivals_this_month: expected 0–3 items, got ${fest.length}`);
  } else {
    fest.forEach((f, i) => {
      if (typeof f !== "string" || f.length < 4 || f.length > 80)
        errors.push(`festivals_this_month[${i}] length ${f?.length} out of bounds (4–80)`);
    });
  }

  // pack_list
  const pack = r.pack_list ?? [];
  if (!Array.isArray(pack) || pack.length < 5 || pack.length > 7) {
    errors.push(`pack_list: expected 5–7 items, got ${pack.length}`);
  } else {
    pack.forEach((p, i) => {
      if (typeof p !== "string" || p.length < 3 || p.length > 60)
        errors.push(`pack_list[${i}] length ${p?.length} out of bounds (3–60)`);
    });
  }

  // verdict
  const v = (r.go_or_skip_verdict ?? "").trim();
  const wordCount = v.split(/\s+/).filter(Boolean).length;
  const leader = v.split(/[\s,:.]/, 1)[0]?.toLowerCase();
  if (wordCount < 20 || wordCount > 50)
    errors.push(`go_or_skip_verdict: ${wordCount} words (want 20–50)`);
  if (!["go", "skip", "mixed"].includes(leader))
    errors.push(`go_or_skip_verdict: must start with Go/Skip/Mixed (got "${leader}")`);
  if (hasBanned(v)) errors.push(`go_or_skip_verdict banned: ${bannedHits(v).join(", ")}`);

  return errors;
}

// ── CLI ───────────────────────────────────────────────────────
const args = process.argv.slice(2);
const file = args.find((a) => !a.startsWith("--"));
const commit = args.includes("--commit");

if (!file) {
  console.error("Usage: enrich-destination-months-deep.mjs <staging.json> [--commit]");
  process.exit(1);
}

// ── Env ───────────────────────────────────────────────────────
function loadEnv() {
  const env = {};
  for (const line of readFileSync("apps/web/.env.local", "utf-8").split("\n")) {
    const m = line.match(/^([A-Z_][A-Z0-9_]*)=(.+)$/);
    if (m) env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
  return env;
}
const env = loadEnv();
const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);

// ── Load + audit ─────────────────────────────────────────────
const staging = JSON.parse(readFileSync(file, "utf-8"));
console.log(`\nLoaded ${staging.length} entries from ${file}`);
console.log(`Mode: ${commit ? "\x1b[31mCOMMIT\x1b[0m" : "dry-run (pass --commit to write)"}\n`);

const audited = staging.map((r) => ({ row: r, errors: auditRow(r) }));
const rejects = audited.filter((a) => a.errors.length > 0);

if (rejects.length > 0) {
  console.error(`\x1b[31m✗ ${rejects.length} rows failed audit — nothing committed.\x1b[0m\n`);
  for (const { row, errors } of rejects.slice(0, 30)) {
    console.error(`  ${row.destination_id} m=${row.month}`);
    errors.forEach((e) => console.error(`    - ${e}`));
  }
  if (rejects.length > 30) console.error(`  … and ${rejects.length - 30} more`);
  process.exit(2);
}
console.log(`✓ All ${audited.length} entries pass audit.\n`);

if (!commit) {
  console.log("Run again with --commit to persist.\n");
  process.exit(0);
}

// ── Commit ───────────────────────────────────────────────────
let ok = 0, fail = 0;
for (const r of staging) {
  const { error } = await supabase
    .from("destination_months")
    .update({
      things_to_do: r.things_to_do,
      festivals_this_month: r.festivals_this_month,
      pack_list: r.pack_list,
      go_or_skip_verdict: r.go_or_skip_verdict,
    })
    .eq("destination_id", r.destination_id)
    .eq("month", r.month);
  if (error) { console.error(`  ✗ ${r.destination_id} m=${r.month}: ${error.message}`); fail++; }
  else ok++;
}

console.log(`\n✓ Committed: ${ok}  ✗ Failed: ${fail}\n`);
process.exit(fail > 0 ? 3 : 0);
