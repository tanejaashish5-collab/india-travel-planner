#!/usr/bin/env node
// apply-sos-research.mjs
// Pure DB writer (NO Anthropic API). Reads every per-state research JSON
// in data/research/sos/<state>.json and upserts to public.emergency_sos.
//
// Schema produced by sub-agent sweep (see /Users/ashishtaneja/.claude/plans/just-got-this-email-jiggly-mountain.md):
//   {
//     destination_id: string,
//     name: string,
//     verify: boolean,
//     source_url: string | null,
//     source_label: string | null,
//     fields: { local_police_station, police_address, nearest_hospital, ... },
//     notes: string,
//   }
//
// Behaviour:
//   verify: true  → set verified=true, verified_date=today, last_verified_attempt_at=now()
//                   + write source_url + source_label + all non-null `fields`
//                   + null out fields the agent explicitly nulled (honest scarcity)
//   verify: false → set last_verified_attempt_at=now() only
//                   + still write source_url/source_label/fields if present
//                   (records the attempt without flipping verified)
//
// Usage:
//   node --env-file=apps/web/.env.local scripts/apply-sos-research.mjs
//   node --env-file=apps/web/.env.local scripts/apply-sos-research.mjs --dry
//   node --env-file=apps/web/.env.local scripts/apply-sos-research.mjs --state bihar

import { createClient } from "@supabase/supabase-js";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REPO_ROOT = path.resolve(__dirname, "..");
const RESEARCH_DIR = path.join(REPO_ROOT, "data/research/sos");

const args = process.argv.slice(2);
const isDry = args.includes("--dry");
const stateArg = (() => {
  const i = args.indexOf("--state");
  return i >= 0 ? args[i + 1] : null;
})();

const ALLOWED_FIELDS = new Set([
  "local_police_station",
  "police_address",
  "nearest_hospital",
  "nearest_hospital_km",
  "hospital_has_er",
  "nearest_pharmacy",
  "pharmacy_24hr",
  "mechanic_contact",
  "tow_service",
  "rescue_contact",
  "mountain_rescue",
  "nearest_guesthouse_emergency",
  "english_speaking_doctor",
]);

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
    process.exit(1);
  }
  return createClient(url, key);
}

function listStateFiles() {
  if (!fs.existsSync(RESEARCH_DIR)) {
    console.error(`Research dir missing: ${RESEARCH_DIR}`);
    process.exit(1);
  }
  return fs
    .readdirSync(RESEARCH_DIR)
    .filter((f) => f.endsWith(".json") && !f.startsWith("_"))
    .map((f) => ({ state: f.replace(/\.json$/, ""), path: path.join(RESEARCH_DIR, f) }))
    .filter((f) => !stateArg || f.state === stateArg);
}

function buildUpdate(row) {
  const update = { last_verified_attempt_at: new Date().toISOString() };
  if (row.verify === true) {
    update.verified = true;
    update.verified_date = new Date().toISOString().slice(0, 10);
    update.verified_by = "sos-research-sweep-2026-05-04";
  }
  if (row.source_url !== undefined) update.source_url = row.source_url ?? null;
  if (row.source_label !== undefined) update.source_label = row.source_label ?? null;
  if (row.fields && typeof row.fields === "object") {
    for (const [k, v] of Object.entries(row.fields)) {
      if (!ALLOWED_FIELDS.has(k)) continue;
      update[k] = v === undefined ? null : v;
    }
  }
  return update;
}

async function main() {
  const supabase = getSupabase();
  const files = listStateFiles();
  if (files.length === 0) {
    console.error("No state research files found.");
    process.exit(1);
  }

  console.log(`${isDry ? "[DRY] " : ""}Applying ${files.length} state file(s) from ${RESEARCH_DIR}\n`);

  const totals = { verified: 0, attempted: 0, skipped: 0, errors: 0 };
  const perState = [];

  for (const { state, path: filePath } of files) {
    let rows;
    try {
      rows = JSON.parse(fs.readFileSync(filePath, "utf8"));
    } catch (err) {
      console.error(`✗ ${state}: failed to parse JSON — ${err.message}`);
      totals.errors++;
      continue;
    }
    if (!Array.isArray(rows)) {
      console.error(`✗ ${state}: top-level must be an array`);
      totals.errors++;
      continue;
    }

    const counts = { verified: 0, attempted: 0, skipped: 0, errors: 0 };

    for (const row of rows) {
      if (!row || !row.destination_id) {
        console.error(`  ! ${state}: row missing destination_id`);
        counts.errors++;
        continue;
      }
      const update = buildUpdate(row);
      if (Object.keys(update).length === 1) {
        // only last_verified_attempt_at = no real data
        counts.skipped++;
        continue;
      }

      if (isDry) {
        const fieldsCount = Object.keys(update).length;
        console.log(`  [DRY] ${state}/${row.destination_id} verify=${row.verify} fields=${fieldsCount}`);
      } else {
        const { error } = await supabase
          .from("emergency_sos")
          .update(update)
          .eq("destination_id", row.destination_id);
        if (error) {
          console.error(`  ✗ ${state}/${row.destination_id}: ${error.message}`);
          counts.errors++;
          continue;
        }
      }

      if (row.verify === true) counts.verified++;
      else counts.attempted++;
    }

    const summary = `${counts.verified} verified · ${counts.attempted} attempted · ${counts.skipped} skipped · ${counts.errors} errors`;
    console.log(`  ${state}: ${summary}`);
    perState.push({ state, ...counts });
    totals.verified += counts.verified;
    totals.attempted += counts.attempted;
    totals.skipped += counts.skipped;
    totals.errors += counts.errors;
  }

  console.log(`\n${"=".repeat(60)}`);
  console.log(`TOTAL across ${files.length} state(s):`);
  console.log(`  ${totals.verified} verified`);
  console.log(`  ${totals.attempted} attempted (verify:false but fields written)`);
  console.log(`  ${totals.skipped} skipped (empty rows)`);
  console.log(`  ${totals.errors} errors`);
  if (isDry) console.log(`\n[DRY RUN — no DB writes performed]`);
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
