#!/usr/bin/env node
/* eslint-disable no-console */
// Inspect destination_months rows for the 5 highest-impression / lowest-CTR
// pages flagged in data-baseline-2026-05-17.md. Goal: see what the
// generateMetadata template is actually fed for each.
import path from "node:path";
const ROOT = path.resolve(import.meta.dirname, "..");
const { config: dotenvConfig } = await import("dotenv");
dotenvConfig({ path: path.join(ROOT, "apps", "web", ".env.local") });

const { createClient } = await import("@supabase/supabase-js");
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
);

const targets = [
  { slug: "darjeeling", month: 5, locale: "hi" },
  { slug: "yercaud",    month: 5, locale: "en" },
  { slug: "vrindavan",  month: 5, locale: "en" },
  { slug: "kasol",      month: 5, locale: "en" },
  { slug: "munnar",     month: 6, locale: "en" },
];

const MONTH_NAMES = { 5: "May", 6: "June" };

for (const t of targets) {
  // resolve dest_id from slug
  const { data: dest } = await supabase
    .from("destinations")
    .select("id, name, tagline, state_id, state:states(name), translations")
    .eq("id", t.slug)
    .single();
  if (!dest) {
    console.log(`\n── ${t.slug}/${MONTH_NAMES[t.month]} (${t.locale}) ── NOT FOUND in destinations`);
    continue;
  }
  const { data: monthRow } = await supabase
    .from("destination_months")
    .select("score, note, why_go, why_not, verdict")
    .eq("destination_id", dest.id)
    .eq("month", t.month)
    .single();
  const { data: card } = await supabase
    .from("confidence_cards")
    .select("weather_night")
    .eq("destination_id", dest.id)
    .single();

  console.log(`\n── /${t.locale}/destination/${t.slug}/${MONTH_NAMES[t.month].toLowerCase()} ──`);
  console.log(`  name        : ${dest.name}`);
  console.log(`  state       : ${dest.state?.name ?? "?"}`);
  console.log(`  hi_name     : ${dest.translations?.hi?.name ?? "(none)"}`);
  console.log(`  score       : ${monthRow?.score ?? "?"}`);
  console.log(`  verdict     : ${monthRow?.verdict ?? "?"}`);
  console.log(`  note        : ${monthRow?.note ?? "(empty)"}`);
  console.log(`  why_go      : ${monthRow?.why_go ?? "(empty)"}`);
  console.log(`  why_not     : ${monthRow?.why_not ?? "(empty)"}`);
  const w = card?.weather_night ?? {};
  const isSummer = t.month >= 4 && t.month <= 9;
  const lo = isSummer ? (w.summer_low_c ?? w.min_temp_c) : (w.winter_low_c ?? w.min_temp_c);
  const hi = isSummer ? (w.summer_high_c ?? w.max_temp_c) : (w.winter_high_c ?? w.max_temp_c);
  console.log(`  temp_range  : ${lo != null && hi != null ? `${lo}–${hi}°C` : `lo=${lo} hi=${hi}`}`);
}
