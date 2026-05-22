#!/usr/bin/env node
/* eslint-disable no-console */
// Dump the English prose fields of points_of_interest + sub_destinations so a
// translation sub-agent can produce Hindi. Prose only — names, addresses,
// opening hours, entry fees and time_needed are NOT dumped (they stay as-is).
//
// Companion to _dump-translatable.mjs (which covers eateries/stays/picks).
// Both tables are id-keyed text PKs and carry a translations jsonb column.
//
// Usage:
//   node scripts/_dump-poi-subdest-translatable.mjs
//
// Output (data/research/translations/):
//   _poi-en.json      — points_of_interest  { table, id, destination_id, fields:{description} }
//   _subdest-en.json  — sub_destinations    { table, id, parent_id,      fields:{tagline,why_visit,highlights,kids_note} }
//
// Feeds the proven pipeline: _chunk-en.mjs --state poi|subdest →
// agents → _consolidate-translations.mjs → apply-translations.mjs.

import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";
import path from "node:path";
import { writeFileSync, mkdirSync } from "node:fs";
import process from "node:process";

const ROOT = path.resolve(import.meta.dirname, "..");
config({ path: path.join(ROOT, "apps", "web", ".env.local") });

const s = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

const OUT_DIR = path.join(ROOT, "data", "research", "translations");
mkdirSync(OUT_DIR, { recursive: true });

const isStr = (v) => typeof v === "string" && v.trim().length > 0;

// ── points_of_interest — translatable prose: description only.
// time_needed/opening_hours/entry_fee/address are structured/factual → English.
const { data: pois, error: poiErr } = await s
  .from("points_of_interest")
  .select("id, destination_id, description")
  .order("id");
if (poiErr) throw new Error(`points_of_interest: ${poiErr.message}`);

const poiRows = [];
for (const r of pois ?? []) {
  if (!isStr(r.description)) continue;
  poiRows.push({
    table: "points_of_interest",
    id: r.id,
    destination_id: r.destination_id,
    fields: { description: r.description },
  });
}

// ── sub_destinations — translatable prose: tagline, why_visit, highlights[],
// kids_note. name/elevation/distance/time_needed stay as-is.
const { data: subs, error: subErr } = await s
  .from("sub_destinations")
  .select("id, parent_id, tagline, why_visit, highlights, kids_note")
  .order("id");
if (subErr) throw new Error(`sub_destinations: ${subErr.message}`);

const subRows = [];
for (const r of subs ?? []) {
  const fields = {};
  if (isStr(r.tagline)) fields.tagline = r.tagline;
  if (isStr(r.why_visit)) fields.why_visit = r.why_visit;
  if (isStr(r.kids_note)) fields.kids_note = r.kids_note;
  if (Array.isArray(r.highlights)) {
    const h = r.highlights.filter(isStr);
    if (h.length === r.highlights.length && h.length > 0) fields.highlights = h;
  }
  if (Object.keys(fields).length === 0) continue;
  subRows.push({ table: "sub_destinations", id: r.id, parent_id: r.parent_id, fields });
}

writeFileSync(path.join(OUT_DIR, "_poi-en.json"), JSON.stringify(poiRows, null, 2));
writeFileSync(path.join(OUT_DIR, "_subdest-en.json"), JSON.stringify(subRows, null, 2));

const poiStrings = poiRows.reduce((a, r) => a + Object.keys(r.fields).length, 0);
const subStrings = subRows.reduce((a, r) => a + Object.keys(r.fields).length, 0);
console.log(`points_of_interest: ${pois?.length ?? 0} rows → ${poiRows.length} translatable · ${poiStrings} fields`);
console.log(`sub_destinations:   ${subs?.length ?? 0} rows → ${subRows.length} translatable · ${subStrings} fields`);
console.log(`→ ${path.join(OUT_DIR, "_poi-en.json")}`);
console.log(`→ ${path.join(OUT_DIR, "_subdest-en.json")}`);
