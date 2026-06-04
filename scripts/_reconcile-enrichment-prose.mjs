#!/usr/bin/env node
/* eslint-disable no-console */
// Reconcile enrichment prose against the dm_prose_floor DB constraint.
// Merges verdict + the LONGEST clean why_go/why_not from a base merged file and
// any number of prose-correction files, then NULLS any prose still under the
// floor (NULL is always allowed by the constraint). Lists are untouched.
//
// Floor: go→why_go≥150, skip→why_not≥150, wait→why_go≥120 & why_not≥120 (or null).
//
// Usage: node scripts/_reconcile-enrichment-prose.mjs --base <merged.json> --prose <a.json> [<b.json> ...] [--out <merged.json>]

import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";
import path from "node:path";
import { readFileSync, writeFileSync } from "node:fs";
import process from "node:process";

config({ path: path.join(path.resolve(import.meta.dirname, ".."), "apps", "web", ".env.local") });

const args = process.argv.slice(2);
const val = (f) => { const i = args.indexOf(f); return i === -1 ? null : args[i + 1]; };
const BASE = val("--base");
const OUT = val("--out") ?? BASE;
const pi = args.indexOf("--prose");
const proseFiles = pi === -1 ? [] : args.slice(pi + 1).filter((a) => a.endsWith(".json") && a !== OUT);

const BANNED = ["hidden gem", "must-visit", "must visit", "paradise", "ultimate", "unforgettable", "breathtaking", "amazing", "stunning", "nestled", "bucket list", "magical", "majestic", "jaw-dropping"];
const hasBanned = (s) => s && BANNED.some((b) => s.toLowerCase().includes(b));
const clean = (s) => (s && !hasBanned(s) ? s : null);
const longest = (...xs) => xs.map(clean).filter(Boolean).sort((a, b) => b.length - a.length)[0] ?? null;

const key = (e) => `${e.destination_id}|${e.month}`;
const prose = new Map();
for (const f of proseFiles) for (const e of JSON.parse(readFileSync(f, "utf-8"))) prose.set(key(e), e);

const base = JSON.parse(readFileSync(BASE, "utf-8"));

// Ground-truth verdicts from the DB (never trust agent-supplied verdict for the floor).
const s = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } });
const destIds = [...new Set(base.map((e) => e.destination_id))];
const trueVerdict = new Map();
for (let i = 0; i < destIds.length; i += 60) {
  const { data, error } = await s.from("destination_months").select("destination_id,month,verdict").in("destination_id", destIds.slice(i, i + 60));
  if (error) { console.error(`✗ verdict fetch failed: ${error.message}`); process.exit(1); }
  for (const r of data) trueVerdict.set(`${r.destination_id}|${r.month}`, r.verdict);
}

let keptGo = 0, keptNot = 0, nulledGo = 0, nulledNot = 0, verdictFixed = 0;
for (const e of base) {
  const p = prose.get(key(e)) ?? {};
  const dbV = trueVerdict.get(key(e)) ?? p.verdict ?? e.verdict;
  if (e.verdict && e.verdict !== dbV) verdictFixed++;
  e.verdict = dbV;
  const v = e.verdict;
  let wg = longest(e.why_go, p.why_go);
  let wn = longest(e.why_not, p.why_not);
  // enforce floor → null what's too short
  if (v === "go") { if (wg && wg.length < 150) { wg = null; nulledGo++; } else if (wg) keptGo++; }
  else if (v === "skip") { if (wn && wn.length < 150) { wn = null; nulledNot++; } else if (wn) keptNot++; }
  else if (v === "wait") {
    if (wg && wg.length < 120) { wg = null; nulledGo++; } else if (wg) keptGo++;
    if (wn && wn.length < 120) { wn = null; nulledNot++; } else if (wn) keptNot++;
  }
  e.why_go = wg; e.why_not = wn;
}
writeFileSync(OUT, JSON.stringify(base, null, 0));
console.log(`Reconciled ${base.length} entries → ${OUT}`);
console.log(`  verdict corrected to DB truth: ${verdictFixed}`);
console.log(`  why_go kept ${keptGo} · nulled (under floor) ${nulledGo}`);
console.log(`  why_not kept ${keptNot} · nulled (under floor) ${nulledNot}`);
