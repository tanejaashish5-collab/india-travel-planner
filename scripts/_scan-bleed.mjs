#!/usr/bin/env node
/* eslint-disable no-console */
// Scan a merged enrichment file for cross-destination name bleed (one dest's
// landmark/name appearing in another dest's prose). Fetches real names from DB.
// Usage: node scripts/_scan-bleed.mjs <merged.json>

import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";
import path from "node:path";
import { readFileSync } from "node:fs";
import process from "node:process";

config({ path: path.join(path.resolve(import.meta.dirname, ".."), "apps", "web", ".env.local") });
const FILE = process.argv[2];
const all = JSON.parse(readFileSync(FILE, "utf-8"));
const ids = [...new Set(all.map((e) => e.destination_id))];

const s = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } });
const token = {};
for (let i = 0; i < ids.length; i += 60) {
  const { data } = await s.from("destinations").select("id,name").in("id", ids.slice(i, i + 60));
  for (const r of data) {
    // distinctive token: first NON-generic word ≥4 chars, stripped of parens
    const STOP = new Set(["fort", "lake", "mount", "great", "national", "park", "beach", "falls", "hill", "hills", "valley", "island", "river", "cave", "caves", "temple", "old", "north", "south", "east", "west", "port", "point", "little", "long", "high", "sahib", "national"]);
    const words = (r.name || "").replace(/\(.*?\)/g, "").trim().split(/[\s,&]+/).map((w) => w.toLowerCase());
    const t = words.find((w) => w.length >= 4 && !STOP.has(w));
    if (t) token[r.id] = t;
  }
}
// tokens shared by multiple dests (e.g. region words) are not distinctive — drop
const counts = {};
for (const t of Object.values(token)) counts[t] = (counts[t] || 0) + 1;
const distinctive = Object.fromEntries(Object.entries(token).filter(([, t]) => counts[t] === 1));
const tokenById = distinctive;

let hits = 0;
for (const e of all) {
  const txt = ((e.why_go || "") + " " + (e.why_not || "") + " " + (e.things_to_do || []).join(" ")).toLowerCase();
  for (const [oid, t] of Object.entries(tokenById)) {
    if (oid === e.destination_id) continue;
    if (new RegExp(`\\b${t}\\b`).test(txt)) { console.log(`🚩 ${e.destination_id}/${e.month} mentions "${t}" (→ ${oid}): ${(e.why_go || e.why_not || (e.things_to_do || []).join("; ")).slice(0, 100)}`); hits++; }
  }
}
console.log(`\n${hits} possible bleed hit(s) across ${all.length} entries. (Review — some may be legit nearby references.)`);
