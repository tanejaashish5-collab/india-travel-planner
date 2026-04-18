#!/usr/bin/env node
/**
 * List stay picks held for admin review (published=false).
 * Groups by reason: voice flags, low confidence, insufficient sources.
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

const { data, error } = await supabase
  .from("destination_stay_picks")
  .select("destination_id, slot, name, property_type, price_band, why_nakshiq, confidence, sources, voice_flags")
  .eq("published", false)
  .order("destination_id")
  .order("slot");

if (error) { console.error(error); process.exit(1); }

console.log(`\nHeld picks: ${data.length}\n${"=".repeat(80)}`);
for (const p of data) {
  const srcCount = Array.isArray(p.sources) ? p.sources.length : 0;
  const flags = Array.isArray(p.voice_flags) ? p.voice_flags : [];
  const reasons = [];
  if (flags.length) reasons.push(`voice_flags=[${flags.join(",")}]`);
  if ((p.confidence ?? 0) < 0.6) reasons.push(`confidence=${p.confidence}`);
  if (srcCount < 2) reasons.push(`sources=${srcCount}`);
  console.log(`\n[${p.destination_id}] ${p.slot.toUpperCase()} — ${p.name}`);
  console.log(`  ${p.property_type || ""} · ${p.price_band || ""} · conf ${p.confidence}`);
  console.log(`  Why: ${(p.why_nakshiq || "").slice(0, 160)}${(p.why_nakshiq || "").length > 160 ? "…" : ""}`);
  if (reasons.length) console.log(`  HELD BECAUSE: ${reasons.join(" | ")}`);
}
console.log();
