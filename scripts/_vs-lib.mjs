/* eslint-disable no-console */
// scripts/_vs-lib.mjs — shared helpers for the /vs/ comparison-page expansion
// pipeline. Used by _mine-vs-queries.mjs, _gen-vs-clusters.mjs,
// _validate-vs-pairs.mjs and _emit-vs-pairs-block.mjs.
//
// Zero LLM. Pure data + string ops.

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import path from "node:path";
import process from "node:process";

export const ROOT = path.resolve(import.meta.dirname, "..");
export const VS_PAIRS_TS = path.join(ROOT, "apps", "web", "src", "lib", "vs-pairs.ts");
export const VS_PAIRS_GEN_TS = path.join(ROOT, "apps", "web", "src", "lib", "vs-pairs.generated.ts");

let _envLoaded = false;
export async function loadEnv() {
  if (_envLoaded) return;
  const { config } = await import("dotenv");
  config({ path: path.join(ROOT, "apps", "web", ".env.local") });
  config({ path: path.join(ROOT, ".env.local") });
  _envLoaded = true;
}

export function today() {
  return new Date().toISOString().slice(0, 10);
}

// ─── Supabase ──────────────────────────────────────────────────────────────
export async function getSupabase() {
  await loadEnv();
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) throw new Error("Supabase env not set (NEXT_PUBLIC_SUPABASE_URL + a key)");
  const { createClient } = await import("@supabase/supabase-js");
  return createClient(url, key, { auth: { persistSession: false } });
}

// Paginated select — PostgREST caps a single response at 1000 rows, so any
// table over that (destination_months ≈ 6060) must be walked in pages.
export async function fetchAll(supabase, table, columns) {
  const PAGE = 1000;
  const out = [];
  for (let from = 0; ; from += PAGE) {
    const { data, error } = await supabase.from(table).select(columns).range(from, from + PAGE - 1);
    if (error) throw new Error(`${table} fetch: ${error.message}`);
    out.push(...(data ?? []));
    if (!data || data.length < PAGE) break;
  }
  return out;
}

export async function fetchTrapPairs(supabase) {
  const rows = await fetchAll(supabase, "tourist_trap_alternatives",
    "trap_destination_id, alternative_destination_id");
  return rows.map((t) => [t.trap_destination_id, t.alternative_destination_id]);
}

// ─── String helpers ────────────────────────────────────────────────────────
export function slugify(s) {
  return String(s)
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Normalise a destinations.type token: the column carries mixed casing and
// both "hill station" / "hill-station" forms.
export function normType(t) {
  return String(t).toLowerCase().trim().replace(/[\s_]+/g, "-");
}

// Order-independent pair key — a pair maps to the same key regardless of
// argument order, so reversed pairs (a-vs-b vs b-vs-a) dedupe to one.
export function canonKey(a, b) {
  return [a, b].sort().join("-vs-");
}

export function levenshtein(a, b) {
  const m = a.length, n = b.length;
  if (!m) return n;
  if (!n) return m;
  let prev = Array.from({ length: n + 1 }, (_, i) => i);
  let cur = new Array(n + 1);
  for (let i = 1; i <= m; i++) {
    cur[0] = i;
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + cost);
    }
    [prev, cur] = [cur, prev];
  }
  return prev[n];
}

// ─── Region map ────────────────────────────────────────────────────────────
// Frozen mirror of REGION_GROUPS in apps/web/src/lib/seo-maps.ts. India's
// state→region grouping does not change; kept inline so the .mjs pipeline
// needn't import a .ts module. Update both together if a state is ever added.
export const STATE_REGION = {
  "himachal-pradesh": "north", "uttarakhand": "north", "jammu-kashmir": "north",
  "ladakh": "north", "rajasthan": "north", "punjab": "north", "delhi": "north",
  "uttar-pradesh": "north", "chandigarh": "north", "haryana": "north",
  "karnataka": "south", "kerala": "south", "tamil-nadu": "south",
  "andhra-pradesh": "south", "telangana": "south", "puducherry": "south",
  "west-bengal": "east", "bihar": "east", "jharkhand": "east", "odisha": "east",
  "gujarat": "west", "maharashtra": "west", "goa": "west", "daman-diu": "west",
  "madhya-pradesh": "central", "chhattisgarh": "central",
  "sikkim": "northeast", "arunachal-pradesh": "northeast", "assam": "northeast",
  "meghalaya": "northeast", "nagaland": "northeast", "manipur": "northeast",
  "mizoram": "northeast", "tripura": "northeast",
  "andaman-nicobar": "islands", "lakshadweep": "islands",
};

// Destinations excluded from generated /vs/ pairs: duplicate rows where a
// canonical twin already exists. `puducherry` (state puducherry) and
// `pondicherry` (state tamil-nadu) carry identical coordinates — the same
// city — and `pondicherry` is the canonical row the curated pairs use.
export const DENY_DESTS = new Set(["puducherry"]);

// ─── Existing-pair extraction (regex over the .ts pair lists) ───────────────
// Both vs-pairs.ts and vs-pairs.generated.ts hold object literals of the exact
// shape `{ id1: "x", id2: "y", theme: "z" }`.
export function extractPairObjects(file) {
  if (!existsSync(file)) return [];
  const src = readFileSync(file, "utf8");
  const re = /id1:\s*"([^"]+)"\s*,\s*id2:\s*"([^"]+)"\s*,\s*theme:\s*"([^"]+)"/g;
  const out = [];
  let m;
  while ((m = re.exec(src))) out.push({ id1: m[1], id2: m[2], theme: m[3] });
  return out;
}

// Bidirectional Set of every pair already shipped (curated + generated).
export function loadExistingPairKeys() {
  const set = new Set();
  for (const p of [...extractPairObjects(VS_PAIRS_TS), ...extractPairObjects(VS_PAIRS_GEN_TS)]) {
    set.add(`${p.id1}-vs-${p.id2}`);
    set.add(`${p.id2}-vs-${p.id1}`);
  }
  return set;
}

// ─── JSON I/O ──────────────────────────────────────────────────────────────
export function writeJson(relPath, obj) {
  const full = path.join(ROOT, relPath);
  mkdirSync(path.dirname(full), { recursive: true });
  writeFileSync(full, JSON.stringify(obj, null, 2) + "\n");
  return full;
}

export function readJson(relPath) {
  const full = path.join(ROOT, relPath);
  if (!existsSync(full)) return null;
  return JSON.parse(readFileSync(full, "utf8"));
}
