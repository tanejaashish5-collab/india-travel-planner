#!/usr/bin/env node
/**
 * refresh-ig-verdict-pack.mjs — rebuild the comment-draft data for the IG brief
 *
 *   node --env-file=apps/web/.env.local scripts/refresh-ig-verdict-pack.mjs
 *
 * Writes ~/Automation/nakshiq-ig/data/verdicts.json: every destination-month
 * verdict for the months the brief can currently draft from, for every state
 * named in the brief's account pool.
 *
 * Why a script and not a one-off query pasted into the pack: the pack has to be
 * refreshed as months roll over and as new states enter the pool, and
 * hand-transcribing rows is how a wrong state id or a stale verdict gets in.
 * It already caught one: the pool said "jammu-and-kashmir" while the database
 * says "jammu-kashmir", so every Kashmir account would have silently produced
 * no comment draft at all.
 *
 * The daily brief itself needs NO secrets — that is the point of the pack. This
 * refresh does, so it runs from a session in the repo, never from launchd
 * (which is TCC-blocked under ~/Desktop anyway).
 */
import { createClient } from "@supabase/supabase-js";
import fs from "node:fs";
import path from "node:path";
import os from "node:os";

const ROOT = path.join(os.homedir(), "Automation", "nakshiq-ig");
const POOL = path.join(ROOT, "pool.json");
const OUT = path.join(ROOT, "data", "verdicts.json");

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
if (!url || !key) {
  console.error("Missing Supabase env. Run with: node --env-file=apps/web/.env.local scripts/refresh-ig-verdict-pack.mjs");
  process.exit(1);
}

// Current month plus the next two: the brief drafts for "now", and a pack that
// runs out mid-month is how the drafts go silently empty.
const now = new Date().getMonth() + 1;
const MONTHS = [0, 1, 2].map((d) => ((now - 1 + d) % 12) + 1);

const pool = JSON.parse(fs.readFileSync(POOL, "utf8")).accounts;
const states = [...new Set(pool.flatMap((a) => a.states || []))].sort();
if (!states.length) { console.error("pool has no states"); process.exit(1); }

const supabase = createClient(url, key);

// Validate the pool's state ids against the DB before trusting them, so a
// typo shows up here instead of as silently missing comment drafts.
const { data: known, error: kerr } = await supabase.from("destinations").select("state_id");
if (kerr) { console.error("state lookup failed:", kerr.message); process.exit(1); }
const knownStates = new Set(known.map((r) => r.state_id));
const bogus = states.filter((s) => !knownStates.has(s));
if (bogus.length) {
  console.error(`\n✗ pool.json names ${bogus.length} state id(s) that do not exist in the database:`);
  for (const b of bogus) console.error(`    "${b}"`);
  console.error("  Fix pool.json — these accounts would silently get no comment drafts.\n");
  process.exit(1);
}

const rows = [];
for (const state of states) {
  const { data: dests, error: derr } = await supabase
    .from("destinations").select("id, name, state_id").eq("state_id", state);
  if (derr) { console.error(`  ${state}: ${derr.message}`); continue; }
  if (!dests.length) continue;
  const { data: months, error: merr } = await supabase
    .from("destination_months")
    .select("destination_id, month, score, verdict, go_or_skip_verdict")
    .in("destination_id", dests.map((d) => d.id))
    .in("month", MONTHS)
    .not("go_or_skip_verdict", "is", null);
  if (merr) { console.error(`  ${state}: ${merr.message}`); continue; }
  const byId = new Map(dests.map((d) => [d.id, d]));
  let n = 0;
  for (const m of months) {
    const s = String(m.go_or_skip_verdict || "");
    if (s.length <= 40) continue;
    const d = byId.get(m.destination_id);
    rows.push({ id: d.id, name: d.name, state_id: d.state_id, month: m.month,
                score: m.score, label: m.verdict, sentence: s });
    n++;
  }
  console.log(`  ${state.padEnd(20)} ${String(n).padStart(4)} verdicts`);
}

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, JSON.stringify(rows));
console.log(`\nwrote ${rows.length} verdicts for ${states.length} states, months ${MONTHS.join(", ")} → ${OUT}`);

const covered = new Set(rows.map((r) => r.state_id));
const empty = states.filter((s) => !covered.has(s));
if (empty.length) console.log(`note: no verdict data for ${empty.join(", ")} — those accounts get follows only`);
