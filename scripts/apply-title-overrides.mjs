#!/usr/bin/env node
/* eslint-disable no-console */
// scripts/apply-title-overrides.mjs
//
// Phase 5 of the title-override pipeline. Reads an approved CSV of per-page
// SERP overrides and writes them to destination_months.title_override(_hi) /
// meta_description_override(_hi). Dry-run by default — nothing is written
// without --commit.
//
// CSV columns: destination_id,month,locale,title_override,meta_description_override,status,applied_at
//   - month  : slug (may, june, …) or 1-12
//   - locale : en | hi  → picks the plain or _hi column pair
//   - status : blank = pending. "applied" rows are skipped on re-runs.
//
// Usage:
//   node scripts/apply-title-overrides.mjs                       # dry-run, default CSV
//   node scripts/apply-title-overrides.mjs --file <path>         # dry-run, custom CSV
//   node scripts/apply-title-overrides.mjs --commit              # write to DB
//   node scripts/apply-title-overrides.mjs --commit --revalidate # write + flush ISR
//   node scripts/apply-title-overrides.mjs --commit --allow-clear# empty cells clear overrides
//
// Budgets (visual length — Devanagari matras excluded): title ≤50, meta ≤155.

import { readFileSync, writeFileSync, existsSync, appendFileSync } from "node:fs";
import path from "node:path";
import process from "node:process";

const ROOT = path.resolve(import.meta.dirname, "..");
const { config: dotenvConfig } = await import("dotenv");
dotenvConfig({ path: path.join(ROOT, "apps", "web", ".env.local") });

const args = process.argv.slice(2);
const COMMIT = args.includes("--commit");
const REVALIDATE = args.includes("--revalidate");
const ALLOW_CLEAR = args.includes("--allow-clear");
const fileIdx = args.indexOf("--file");
const CSV_PATH = fileIdx !== -1 && args[fileIdx + 1]
  ? path.resolve(ROOT, args[fileIdx + 1])
  : path.join(ROOT, "data", "cro", "title-overrides.csv");

const MONTH_NUM = {
  january: 1, february: 2, march: 3, april: 4, may: 5, june: 6,
  july: 7, august: 8, september: 9, october: 10, november: 11, december: 12,
};
const TITLE_MAX = 50;
const META_MAX = 155;

// ─── Visual length — Devanagari matras/virama don't add SERP width ────────
function visualLen(s) {
  let n = 0;
  for (const ch of s) {
    const cp = ch.codePointAt(0);
    if ((cp >= 0x0900 && cp <= 0x0903) || (cp >= 0x093a && cp <= 0x094f) ||
        (cp >= 0x0951 && cp <= 0x0957) || (cp >= 0x0962 && cp <= 0x0963)) continue;
    n++;
  }
  return n;
}

// ─── Minimal RFC-4180 CSV parser (quoted fields, "" escape, no embedded \n) ─
function parseCsv(text) {
  const lines = text.split(/\r?\n/).filter((l) => l.length > 0);
  const rows = lines.map((line) => {
    const out = [];
    let cur = "", inQ = false;
    for (let i = 0; i < line.length; i++) {
      const c = line[i];
      if (inQ) {
        if (c === '"') {
          if (line[i + 1] === '"') { cur += '"'; i++; }
          else inQ = false;
        } else cur += c;
      } else {
        if (c === '"') inQ = true;
        else if (c === ",") { out.push(cur); cur = ""; }
        else cur += c;
      }
    }
    out.push(cur);
    return out;
  });
  const header = rows[0].map((h) => h.trim());
  return rows.slice(1).map((r) => Object.fromEntries(header.map((h, i) => [h, r[i] ?? ""])));
}

function csvCell(v) {
  const s = v == null ? "" : String(v);
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

// ─── Load + normalise CSV ─────────────────────────────────────────────────
if (!existsSync(CSV_PATH)) {
  console.error(`ERR: CSV not found — ${CSV_PATH}`);
  process.exit(1);
}
const rawRows = parseCsv(readFileSync(CSV_PATH, "utf8"));
console.log(`CSV: ${path.relative(ROOT, CSV_PATH)} — ${rawRows.length} rows`);
console.log(`Mode: ${COMMIT ? "COMMIT" : "DRY-RUN"}${REVALIDATE ? " +revalidate" : ""}${ALLOW_CLEAR ? " +allow-clear" : ""}\n`);

const rows = [];
const errors = [];
rawRows.forEach((r, i) => {
  const ln = i + 2; // 1-based + header
  const locale = (r.locale || "").trim().toLowerCase();
  const monthRaw = (r.month || "").trim().toLowerCase();
  const monthNum = /^\d+$/.test(monthRaw) ? Number(monthRaw) : MONTH_NUM[monthRaw];
  const title = (r.title_override ?? "").trim();
  const meta = (r.meta_description_override ?? "").trim();
  const status = (r.status || "").trim().toLowerCase();
  if (!r.destination_id) { errors.push(`L${ln}: missing destination_id`); return; }
  if (locale !== "en" && locale !== "hi") { errors.push(`L${ln} ${r.destination_id}: bad locale "${r.locale}"`); return; }
  if (!monthNum || monthNum < 1 || monthNum > 12) { errors.push(`L${ln} ${r.destination_id}: bad month "${r.month}"`); return; }
  if (title && visualLen(title) > TITLE_MAX) errors.push(`L${ln} ${r.destination_id}/${monthRaw}: title ${visualLen(title)} > ${TITLE_MAX} — "${title}"`);
  if (meta && visualLen(meta) > META_MAX) errors.push(`L${ln} ${r.destination_id}/${monthRaw}: meta ${visualLen(meta)} > ${META_MAX}`);
  rows.push({ _line: i, destination_id: r.destination_id.trim(), locale, monthRaw, monthNum, title, meta, status, raw: r });
});

// ─── Supabase client ──────────────────────────────────────────────────────
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error("ERR: NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY not set");
  process.exit(1);
}
const { createClient } = await import("@supabase/supabase-js");
const supabase = createClient(SUPABASE_URL, SERVICE_KEY, { auth: { persistSession: false } });

// ─── Existence check + current values (one batched read) ──────────────────
const destIds = [...new Set(rows.map((r) => r.destination_id))];
const existing = new Map();
for (let i = 0; i < destIds.length; i += 100) {
  const { data, error } = await supabase
    .from("destination_months")
    .select("destination_id, month, title_override, title_override_hi, meta_description_override, meta_description_override_hi")
    .in("destination_id", destIds.slice(i, i + 100));
  if (error) { console.error(`ERR reading destination_months: ${error.message}`); process.exit(1); }
  for (const d of data ?? []) existing.set(`${d.destination_id}/${d.month}`, d);
}
for (const r of rows) {
  if (!existing.has(`${r.destination_id}/${r.monthNum}`)) {
    errors.push(`${r.destination_id}/${r.monthRaw}: no destination_months row (destination_id+month)`);
  }
}

// ─── Validation gate — no writes if anything failed ───────────────────────
if (errors.length) {
  console.error(`✗ ${errors.length} validation error(s) — nothing written:\n`);
  for (const e of errors) console.error(`  • ${e}`);
  process.exit(1);
}

// ─── Plan the writes ──────────────────────────────────────────────────────
const planned = [];
let skipped = 0;
for (const r of rows) {
  if (r.status === "applied") { skipped++; continue; }
  const cur = existing.get(`${r.destination_id}/${r.monthNum}`);
  const titleCol = r.locale === "hi" ? "title_override_hi" : "title_override";
  const metaCol = r.locale === "hi" ? "meta_description_override_hi" : "meta_description_override";
  const patch = {};
  if (r.title) patch[titleCol] = r.title;
  else if (ALLOW_CLEAR) patch[titleCol] = null;
  if (r.meta) patch[metaCol] = r.meta;
  else if (ALLOW_CLEAR) patch[metaCol] = null;
  if (Object.keys(patch).length === 0) { skipped++; continue; }
  planned.push({ ...r, titleCol, metaCol, patch, curTitle: cur[titleCol], curMeta: cur[metaCol] });
}

// ─── Dry-run diff ─────────────────────────────────────────────────────────
for (const p of planned) {
  const tag = p.curTitle ? "REPLACE" : "NEW    ";
  console.log(`${tag} /${p.locale}/destination/${p.destination_id}/${p.monthRaw}`);
  console.log(`  title ${visualLen(p.title)}/${TITLE_MAX}  ${p.curTitle ? `was: ${p.curTitle}` : "(was: template)"}`);
  console.log(`            now: ${p.title}`);
  console.log(`  meta  ${visualLen(p.meta)}/${META_MAX}`);
  console.log(`            now: ${p.meta}`);
}
console.log(`\n${planned.length} to write · ${skipped} skipped (already applied / empty).`);

if (!COMMIT) {
  console.log(`\nDRY-RUN — re-run with --commit to write.\n`);
  process.exit(0);
}

// ─── Commit ───────────────────────────────────────────────────────────────
const applied = [];
let failed = 0;
for (const p of planned) {
  const { error, count } = await supabase
    .from("destination_months")
    .update(p.patch, { count: "exact" })
    .eq("destination_id", p.destination_id)
    .eq("month", p.monthNum);
  if (error || !count) {
    failed++;
    console.error(`  ✗ ${p.destination_id}/${p.monthRaw}: ${error?.message ?? "0 rows updated"}`);
  } else {
    applied.push(p);
    console.log(`  ✓ ${p.destination_id}/${p.monthRaw} [${p.locale}]`);
  }
}
console.log(`\n${applied.length} written · ${failed} failed.`);

// ─── Optional ISR revalidation ────────────────────────────────────────────
if (REVALIDATE && applied.length) {
  const secret = process.env.NEWSLETTER_SEND_SECRET;
  if (!secret) {
    console.warn(`\n⚠ --revalidate skipped: NEWSLETTER_SEND_SECRET not set. ISR refreshes within 24h regardless.`);
  } else {
    console.log(`\nRevalidating ${applied.length} paths…`);
    for (const p of applied) {
      const pagePath = `/${p.locale}/destination/${p.destination_id}/${p.monthRaw}`;
      try {
        const res = await fetch(
          `https://www.nakshiq.com/api/admin/revalidate?path=${encodeURIComponent(pagePath)}`,
          { method: "POST", headers: { Authorization: `Bearer ${secret}` } },
        );
        console.log(`  ${res.ok ? "✓" : "✗"} ${pagePath} (${res.status})`);
      } catch (err) {
        console.log(`  ✗ ${pagePath} — ${err.message}`);
      }
    }
  }
}

// ─── Audit log + CSV status stamp ─────────────────────────────────────────
const stamp = new Date().toISOString();
const logPath = path.join(ROOT, "data", "cro", "apply-log.md");
const logLine = `- ${stamp} — applied ${applied.length} override(s): ${applied.map((p) => `${p.destination_id}/${p.monthRaw}[${p.locale}]`).join(", ")}\n`;
appendFileSync(logPath, existsSync(logPath) ? logLine : `# Title-override apply log\n\n${logLine}`);
console.log(`\n→ logged to ${path.relative(ROOT, logPath)}`);

// Stamp status=applied / applied_at on the committed rows, rewrite the CSV.
const appliedDate = stamp.slice(0, 10);
const appliedLines = new Set(applied.map((p) => p._line));
const header = Object.keys(rawRows[0]);
const csvOut = [header.join(",")];
rawRows.forEach((r, i) => {
  if (appliedLines.has(i)) { r.status = "applied"; r.applied_at = appliedDate; }
  csvOut.push(header.map((h) => csvCell(r[h])).join(","));
});
writeFileSync(CSV_PATH, csvOut.join("\n") + "\n");
console.log(`→ stamped status=applied on ${applied.length} CSV row(s)\n`);
