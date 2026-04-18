#!/usr/bin/env node
/**
 * Commit curate-stays dry-run JSON output → DB.
 *
 * Reads one or more JSON files produced by `curate-stays.mjs --dry-run`,
 * merges by destination_id (later files override earlier), runs voice
 * audit, and upserts to destination_stay_picks + destinations.stay_intelligence.
 *
 * Usage:
 *   node scripts/commit-stays.mjs /tmp/nakshiq-curate/jk-*.json
 *   node scripts/commit-stays.mjs /tmp/nakshiq-curate/rajasthan.json /tmp/nakshiq-curate/rajasthan-retry.json
 *
 * Picks are auto-published when: voice-audit clean + confidence >= 0.6 + sources >= 2.
 * Otherwise held for admin review at /en/admin/stay-picks.
 */
import { readFileSync } from "fs";
import { createClient } from "@supabase/supabase-js";
import { globSync } from "node:fs";

// ===== env =====
const envContent = readFileSync("apps/web/.env.local", "utf-8");
const env = {};
for (const line of envContent.split("\n")) {
  const m = line.match(/^([A-Z_][A-Z0-9_]*)=(.+)$/);
  if (m) env[m[1]] = m[2].replace(/^["']|["']$/g, "");
}
const { NEXT_PUBLIC_SUPABASE_URL: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY: SERVICE_KEY } = env;
if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

// ===== args =====
const args = process.argv.slice(2).filter((a) => !a.startsWith("--"));
if (args.length === 0) {
  console.error("Usage: node scripts/commit-stays.mjs <path-or-glob> [path2 ...]");
  process.exit(1);
}
// Expand globs
const files = [];
for (const a of args) {
  if (a.includes("*")) files.push(...globSync(a));
  else files.push(a);
}
if (files.length === 0) {
  console.error("No files matched");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_KEY);

// ===== banned-word audit =====
const BANNED = [
  "hidden gem", "unforgettable", "stunning", "must-visit", "bucket list",
  "breathtaking", "magical", "incredible", "authentic", "curated",
  "elevated", "immersive", "luxurious", "opulent", "exquisite",
  "pristine", "paradise",
];
function auditCopy(text) {
  if (!text) return [];
  const lo = text.toLowerCase();
  const flags = [];
  for (const term of BANNED) {
    const pat = term.includes(" ")
      ? new RegExp(term.replace(/-/g, "\\-"), "i")
      : new RegExp(`\\b${term}\\b`, "i");
    if (pat.test(lo)) flags.push(term);
  }
  return flags;
}

// ===== merge results by destination_id =====
const byDest = new Map();
for (const f of files) {
  try {
    const j = JSON.parse(readFileSync(f, "utf-8"));
    for (const r of (j.results ?? [])) byDest.set(r.destination_id, r);
    console.log(`  loaded ${(j.results ?? []).length} results from ${f}`);
  } catch (err) {
    console.error(`  ✗ failed to load ${f}: ${err.message}`);
  }
}
if (byDest.size === 0) {
  console.error("No results found in input files");
  process.exit(1);
}

console.log(`\nCommitting ${byDest.size} destinations...\n`);

// ===== commit loop =====
let ok = 0, fail = 0, picksPub = 0, picksHeld = 0, upgradePop = 0;

for (const r of byDest.values()) {
  const { destination_id, voice, as_of_date, mode } = r;
  try {
    // 1) destination-level stay_intelligence
    const stay_intelligence = {
      upgrade_reasoning: voice.upgrade_reasoning ?? null,
      destination_note: voice.destination_note ?? null,
      as_of_date,
      verified_by: "curate-stays",
    };
    const { error: dErr } = await supabase
      .from("destinations")
      .update({ stay_intelligence })
      .eq("id", destination_id);
    if (dErr) throw new Error(`destinations update: ${dErr.message}`);
    if (voice.upgrade_reasoning) upgradePop++;

    // 2) picks
    if (mode === "full") {
      const rows = [];
      for (const slot of ["experience", "value", "location", "xfactor"]) {
        const p = voice.picks?.[slot];
        if (!p || !p.name) continue;
        const flags = auditCopy(p.why_nakshiq);
        const sources = Array.isArray(p.sources) ? p.sources.filter((x) => x?.url) : [];
        const ok2pub = flags.length === 0 && (Number(p.confidence) || 0.7) >= 0.6 && sources.length >= 2;
        rows.push({
          destination_id,
          slot,
          name: String(p.name).slice(0, 200),
          property_type: p.property_type ? String(p.property_type).slice(0, 60) : null,
          price_band: p.price_band ? String(p.price_band).slice(0, 40) : null,
          why_nakshiq: String(p.why_nakshiq || "").slice(0, 500),
          signature_experience: p.signature_experience ? String(p.signature_experience).slice(0, 400) : null,
          sources,
          contact_only: !!p.contact_only,
          contact_info: p.contact_info ?? null,
          voice_flags: flags,
          source: "web_search",
          confidence: Math.max(0, Math.min(1, Number(p.confidence) || 0.7)),
          published: ok2pub,
          refreshed_at: new Date().toISOString(),
        });
        if (ok2pub) picksPub++; else picksHeld++;
      }
      if (rows.length) {
        const { error } = await supabase
          .from("destination_stay_picks")
          .upsert(rows, { onConflict: "destination_id,slot" });
        if (error) throw new Error(`picks upsert: ${error.message}`);
      }
    } else {
      // enrich mode — update sources + voice_flags on existing picks only
      for (const ep of voice.enriched_picks ?? []) {
        if (!ep.slot || !ep.name) continue;
        await supabase
          .from("destination_stay_picks")
          .update({
            sources: ep.sources ?? [],
            voice_flags: ep.voice_flags ?? [],
            refreshed_at: new Date().toISOString(),
          })
          .eq("destination_id", destination_id)
          .eq("slot", ep.slot);
      }
    }

    process.stdout.write(`  ${destination_id.padEnd(24)} ✓ ${mode}\n`);
    ok++;
  } catch (err) {
    console.log(`  ${destination_id.padEnd(24)} ✗ ${err.message.slice(0, 120)}`);
    fail++;
  }
}

console.log(`\n════════════════════════════`);
console.log(`Done. ${ok} ok / ${fail} fail`);
console.log(`upgrade_reasoning populated: ${upgradePop} destinations`);
console.log(`picks published:             ${picksPub}`);
console.log(`picks held for review:       ${picksHeld}`);
console.log(`════════════════════════════`);
console.log(`\nReview held picks at /en/admin/stay-picks.`);
