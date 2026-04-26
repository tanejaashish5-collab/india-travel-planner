#!/usr/bin/env node
/* eslint-disable no-console */
// Sprint 22 — seed eateries from data/research/eateries/*.json into Supabase.
//
// What this does (in order):
//   1. Reads every JSON array under data/research/eateries/
//   2. Validates each row against the local_eateries schema (light client-side
//      checks — Postgres CHECK constraints are the real gate)
//   3. HEAD-checks every google_maps_url and zomato_url. If google_maps_url
//      404s (the agents sometimes fabricate maps.app.goo.gl shortlinks that
//      look real), it's REPLACED with a pattern-based Google Maps search URL
//      that always resolves to a useful map page.
//   4. Drops 404 source_urls. If a row falls below 2 verified sources, it's
//      flagged but still inserted (with last_verified left as the JSON value
//      so the audit script can revisit).
//   5. Upserts via service-role client on (destination_id, name, area).
//
// Usage:
//   SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... node scripts/seed-eateries.mjs
//   Add --dry-run to validate + URL-check without writing.
//   Add --skip-url-check for fast iteration when network is flaky.

import { readFileSync, readdirSync, existsSync } from "node:fs";
import path from "node:path";
import process from "node:process";
import { createClient } from "@supabase/supabase-js";

const ROOT = path.resolve(import.meta.dirname, "..");
const DATA_DIR = path.join(ROOT, "data", "research", "eateries");

// Auto-load env from apps/web/.env.local so the script can be run from
// repo root without needing a wrapper.
function loadEnvFile(filePath) {
  if (!existsSync(filePath)) return;
  for (const line of readFileSync(filePath, "utf8").split("\n")) {
    const m = line.match(/^([A-Z_][A-Z0-9_]*)=(.*)$/);
    if (!m) continue;
    const [, key, rawVal] = m;
    if (process.env[key]) continue; // don't overwrite caller-provided env
    let val = rawVal.trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    process.env[key] = val;
  }
}
loadEnvFile(path.join(ROOT, "apps", "web", ".env.local"));
loadEnvFile(path.join(ROOT, ".env.local"));

const args = new Set(process.argv.slice(2));
const DRY_RUN = args.has("--dry-run");
const SKIP_URL_CHECK = args.has("--skip-url-check");
const SQL_OUT_IDX = process.argv.findIndex((a) => a === "--sql-out");
const SQL_OUT = SQL_OUT_IDX >= 0 ? process.argv[SQL_OUT_IDX + 1] : null;

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!SUPABASE_URL || !SUPABASE_KEY) {
  if (!SQL_OUT && !DRY_RUN) {
    console.error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY env. Aborting (or use --sql-out <file> / --dry-run).");
    process.exit(1);
  }
}

function sqlEscape(v) {
  if (v === null || v === undefined) return "NULL";
  if (typeof v === "boolean") return v ? "TRUE" : "FALSE";
  if (typeof v === "number") return String(v);
  if (Array.isArray(v)) {
    if (v.length === 0) return "ARRAY[]::text[]";
    return "ARRAY[" + v.map((s) => `'${String(s).replace(/'/g, "''")}'`).join(",") + "]";
  }
  return `'${String(v).replace(/'/g, "''")}'`;
}

function rowToInsertSql(r) {
  const cols = [
    "destination_id","name","area","area_slug","cuisine","category","signature_dish","must_try",
    "price_range","price_per_head_inr","vegetarian","kid_friendly","reservation","dress_code",
    "established_year","why_it_matters","insider_tip","signature_address","google_maps_url",
    "zomato_url","source_urls","last_verified","is_legendary","is_active",
  ];
  const vals = cols.map((c) => {
    const v = r[c];
    if (c === "price_per_head_inr" && typeof v === "string") {
      return `'${v}'::int4range`;
    }
    if (c === "last_verified" && typeof v === "string") {
      return `'${v}'::date`;
    }
    return sqlEscape(v);
  });
  return `INSERT INTO local_eateries (${cols.join(", ")}) VALUES (${vals.join(", ")}) ` +
         `ON CONFLICT (destination_id, name, area) DO UPDATE SET ` +
         cols.filter((c) => c !== "destination_id" && c !== "name" && c !== "area")
             .map((c) => `${c} = EXCLUDED.${c}`).join(", ") + ";";
}

const ALLOWED_CATEGORIES = new Set(["fine_dining","mid_range","casual","street_food","cafe","bar","sweet_shop"]);
const ALLOWED_PRICE = new Set(["₹","₹₹","₹₹₹","₹₹₹₹"]);
const ALLOWED_VEG = new Set(["pure-veg","veg-friendly","meat-heavy","mixed"]);
const ALLOWED_RES = new Set(["walk-in","recommended","required"]);
const REQUIRED = ["destination_id","name","category","price_range","vegetarian"];

function fallbackMapsUrl(row) {
  const q = encodeURIComponent(`${row.name} ${row.area ?? ""}`.trim());
  return `https://www.google.com/maps/search/?api=1&query=${q}`;
}

async function headCheck(url, timeoutMs = 8000) {
  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      method: "HEAD",
      redirect: "follow",
      headers: {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept: "text/html",
      },
      signal: controller.signal,
    });
    return res.status;
  } catch {
    return 0;
  } finally {
    clearTimeout(t);
  }
}

function validateShape(row, ctx) {
  const errs = [];
  for (const k of REQUIRED) if (!row[k]) errs.push(`missing ${k}`);
  if (row.category && !ALLOWED_CATEGORIES.has(row.category)) errs.push(`bad category=${row.category}`);
  if (row.price_range && !ALLOWED_PRICE.has(row.price_range)) errs.push(`bad price_range=${row.price_range}`);
  if (row.vegetarian && !ALLOWED_VEG.has(row.vegetarian)) errs.push(`bad vegetarian=${row.vegetarian}`);
  if (row.reservation && !ALLOWED_RES.has(row.reservation)) errs.push(`bad reservation=${row.reservation}`);
  if (errs.length) console.error(`[INVALID] ${ctx} ${row.name ?? "<no-name>"} — ${errs.join("; ")}`);
  return errs.length === 0;
}

async function repairUrls(row, ctx) {
  if (SKIP_URL_CHECK) return row;

  // Google Maps URL — replace if 404 (fabricated shortlink) or absent.
  // We treat ALL maps.app.goo.gl shortlinks as untrusted by default since the
  // research agents tend to fabricate plausible-looking ones. Pattern-based
  // search URLs always resolve and let users find the place by name.
  const safeMaps = fallbackMapsUrl(row);
  if (!row.google_maps_url) {
    row.google_maps_url = safeMaps;
  } else if (row.google_maps_url.includes("maps.app.goo.gl")) {
    // maps.app.goo.gl shortlinks return 200 even when expired (Google shows
    // a "link no longer active" page with HTTP 200), so HTTP status isn't a
    // reliable signal. Agent-generated shortlinks are routinely fabricated.
    // Replace unconditionally with a pattern-based search URL — these always
    // resolve to a useful map of the named place.
    console.warn(`  ↳ ${ctx} ${row.name}: replacing untrusted shortlink with name-search URL`);
    row.google_maps_url = safeMaps;
  }

  // Zomato URL — null it if 404 (broken)
  if (row.zomato_url) {
    const code = await headCheck(row.zomato_url);
    if (code === 404) {
      console.warn(`  ↳ ${ctx} ${row.name}: zomato URL 404 — nulling`);
      row.zomato_url = null;
    }
  }

  // source_urls — drop 404s; keep 200/403 (403 usually = bot block, not fake)
  if (Array.isArray(row.source_urls)) {
    const verified = [];
    for (const u of row.source_urls) {
      const code = await headCheck(u);
      if (code === 0 || code === 404) {
        // skip — broken or unreachable
      } else {
        verified.push(u);
      }
    }
    if (verified.length < row.source_urls.length) {
      console.warn(`  ↳ ${ctx} ${row.name}: dropped ${row.source_urls.length - verified.length}/${row.source_urls.length} unreachable source URLs`);
    }
    if (verified.length < 2) {
      console.warn(`  ⚠ ${ctx} ${row.name}: only ${verified.length} verified source URL(s) — flagged for re-research`);
    }
    row.source_urls = verified;
  }

  return row;
}

async function loadAll() {
  const files = readdirSync(DATA_DIR).filter((f) => f.endsWith(".json"));
  const rows = [];
  for (const f of files) {
    const arr = JSON.parse(readFileSync(path.join(DATA_DIR, f), "utf8"));
    for (const r of arr) rows.push({ ...r, _source: f });
  }
  return rows;
}

function dedupe(rows) {
  const seen = new Map();
  for (const r of rows) {
    const key = `${r.destination_id}|${r.name?.toLowerCase()}|${r.area?.toLowerCase() ?? ""}`;
    if (seen.has(key)) {
      console.warn(`[DUP] ${r._source}: ${r.name} (${r.area}) — already seen in ${seen.get(key)._source}`);
      continue;
    }
    seen.set(key, r);
  }
  return Array.from(seen.values());
}

async function main() {
  console.log(`Reading ${DATA_DIR}…`);
  const raw = await loadAll();
  console.log(`Loaded ${raw.length} rows from ${new Set(raw.map((r) => r._source)).size} files`);

  const valid = raw.filter((r) => validateShape(r, r._source));
  const deduped = dedupe(valid);
  console.log(`${deduped.length} unique valid rows after dedupe (rejected ${raw.length - deduped.length})`);

  console.log(`\nURL repair pass${SKIP_URL_CHECK ? " (skipped via --skip-url-check)" : ""}…`);
  for (const r of deduped) {
    await repairUrls(r, r._source);
  }

  if (DRY_RUN) {
    console.log("\n--dry-run: skipping INSERT");
    return;
  }

  // Strip the audit-only _source field
  const payload = deduped.map(({ _source, ...rest }) => rest);

  if (SQL_OUT) {
    const { writeFileSync } = await import("node:fs");
    const sql = payload.map(rowToInsertSql).join("\n\n") + "\n";
    writeFileSync(SQL_OUT, sql);
    console.log(`\n✓ Wrote ${payload.length} INSERT statements to ${SQL_OUT}`);
    return;
  }

  console.log(`\nUpserting ${payload.length} rows…`);
  const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, { auth: { persistSession: false } });
  const { error } = await supabase
    .from("local_eateries")
    .upsert(payload, { onConflict: "destination_id,name,area" });

  if (error) {
    console.error("Upsert failed:", error);
    process.exit(1);
  }
  console.log(`✓ Upserted ${payload.length} eateries`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
