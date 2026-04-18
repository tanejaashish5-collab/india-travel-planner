#!/usr/bin/env node
/**
 * Cleanup 108 held picks:
 *   1. DELETE picks with 0 sources (likely hallucinated)
 *   2. PUBLISH picks with confidence < 0.6 but 2+ sources (real props, Claude unsure)
 *   3. FIX voice-flagged picks — replace banned words, re-audit, publish if clean
 */
import { readFileSync } from "fs";
import { createClient } from "@supabase/supabase-js";

const envContent = readFileSync("apps/web/.env.local", "utf-8");
const env = {};
for (const line of envContent.split("\n")) {
  const m = line.match(/^([A-Z_][A-Z0-9_]*)=(.+)$/);
  if (m) env[m[1]] = m[2].replace(/^["']|["']$/g, "");
}
const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);

// ===== voice replacements =====
const REPLACEMENTS = [
  [/\bhidden gems?\b/gi, "lesser-known spot"],
  [/\bunforgettable\b/gi, "distinctive"],
  [/\bstunning\b/gi, "striking"],
  [/\bmust-visits?\b/gi, "worth the detour"],
  [/\bmust\s+visits?\b/gi, "worth the detour"],
  [/\bbucket\s+list\b/gi, "trip-defining"],
  [/\bbreathtaking\b/gi, "commanding"],
  [/\bmagical\b/gi, "quiet"],
  [/\bincredible\b/gi, "notable"],
  [/\bauthentic\b/gi, "real"],
  [/\bauthenticity\b/gi, "honesty"],
  [/\bauthentically\b/gi, "genuinely"],
  [/\bcurated\b/gi, "selected"],
  [/\belevated\b/gi, "refined"],
  [/\bimmersive\b/gi, "hands-on"],
  [/\bluxurious\b/gi, "plush"],
  [/\bluxuriously\b/gi, "comfortably"],
  [/\bopulent\b/gi, "grand"],
  [/\bopulently\b/gi, "grandly"],
  [/\bexquisite\b/gi, "finely made"],
  [/\bexquisitely\b/gi, "carefully"],
  [/\bpristine\b/gi, "clean"],
  [/\bparadise\b/gi, "retreat"],
];

const BANNED = [
  "hidden gem", "unforgettable", "stunning", "must-visit", "must visit", "bucket list",
  "breathtaking", "magical", "incredible", "authentic", "curated", "elevated", "immersive",
  "luxurious", "opulent", "exquisite", "pristine", "paradise",
];
function auditCopy(text) {
  if (!text) return [];
  const lo = text.toLowerCase();
  const flags = [];
  for (const term of BANNED) {
    const pat = term.includes(" ") ? new RegExp(term.replace(/-/g, "\\-"), "i") : new RegExp(`\\b${term}\\b`, "i");
    if (pat.test(lo)) flags.push(term);
  }
  return flags;
}

function fixText(t) {
  if (!t) return t;
  let out = t;
  for (const [pat, rep] of REPLACEMENTS) out = out.replace(pat, rep);
  return out;
}

// ===== pull all held =====
const { data: held, error } = await supabase
  .from("destination_stay_picks")
  .select("destination_id, slot, name, why_nakshiq, signature_experience, confidence, sources, voice_flags")
  .eq("published", false);
if (error) { console.error(error); process.exit(1); }

const zeroSources = held.filter((p) => !Array.isArray(p.sources) || p.sources.length === 0);
const lowConfWith2Plus = held.filter((p) => (p.confidence ?? 0) < 0.6 && Array.isArray(p.sources) && p.sources.length >= 2 && (!p.voice_flags || p.voice_flags.length === 0));
const voiceFlagged = held.filter((p) => Array.isArray(p.voice_flags) && p.voice_flags.length > 0);

console.log(`\nCleanup plan:`);
console.log(`  DELETE ${zeroSources.length} zero-source picks`);
console.log(`  PUBLISH ${lowConfWith2Plus.length} low-conf-with-sources picks`);
console.log(`  FIX & PUBLISH ${voiceFlagged.length} voice-flagged picks`);

// ===== 1. DELETE zero-source =====
let deleted = 0;
for (const p of zeroSources) {
  const { error: err } = await supabase.from("destination_stay_picks").delete().eq("destination_id", p.destination_id).eq("slot", p.slot);
  if (err) console.log(`  ✗ delete ${p.destination_id}/${p.slot}: ${err.message}`);
  else deleted++;
}
console.log(`\nDeleted: ${deleted}/${zeroSources.length}`);

// ===== 2. PUBLISH low-conf with 2+ sources =====
let published1 = 0;
for (const p of lowConfWith2Plus) {
  const { error: err } = await supabase.from("destination_stay_picks")
    .update({ published: true, refreshed_at: new Date().toISOString() })
    .eq("destination_id", p.destination_id).eq("slot", p.slot);
  if (err) console.log(`  ✗ publish ${p.destination_id}/${p.slot}: ${err.message}`);
  else published1++;
}
console.log(`Published (low-conf+sources): ${published1}/${lowConfWith2Plus.length}`);

// ===== 3. FIX voice-flagged =====
let fixed = 0, stillFlagged = 0, deletedFlagged = 0;
for (const p of voiceFlagged) {
  const newWhy = fixText(p.why_nakshiq);
  const newSig = fixText(p.signature_experience);
  const newFlags = [...new Set([...auditCopy(newWhy), ...auditCopy(newSig)])];
  const srcOk = Array.isArray(p.sources) && p.sources.length >= 2;
  if (newFlags.length === 0 && srcOk) {
    const { error: err } = await supabase.from("destination_stay_picks")
      .update({
        why_nakshiq: newWhy,
        signature_experience: newSig,
        voice_flags: [],
        published: true,
        refreshed_at: new Date().toISOString(),
      })
      .eq("destination_id", p.destination_id).eq("slot", p.slot);
    if (err) console.log(`  ✗ fix ${p.destination_id}/${p.slot}: ${err.message}`);
    else fixed++;
  } else if (newFlags.length === 0 && !srcOk) {
    // Clean copy, but sources insufficient — delete (would've been caught by 0-source bucket)
    const { error: err } = await supabase.from("destination_stay_picks").delete().eq("destination_id", p.destination_id).eq("slot", p.slot);
    if (!err) deletedFlagged++;
  } else {
    stillFlagged++;
    console.log(`  → still flagged: ${p.destination_id}/${p.slot} — ${newFlags.join(",")}`);
  }
}
console.log(`Fixed & published: ${fixed}/${voiceFlagged.length}`);
if (stillFlagged) console.log(`Still flagged (needs manual): ${stillFlagged}`);
if (deletedFlagged) console.log(`Voice-clean but no sources, deleted: ${deletedFlagged}`);

// ===== final state =====
const { count: remaining } = await supabase.from("destination_stay_picks").select("destination_id", { count: "exact", head: true }).eq("published", false);
console.log(`\nRemaining held: ${remaining}`);
