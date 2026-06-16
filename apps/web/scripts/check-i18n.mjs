#!/usr/bin/env node
// Pre-build i18n gate. Fails loud (exit 1) when the next-intl message
// catalogs are incomplete in a way that would break rendering or the build.
//
// Born 2026-06-16: apps/web/src/app/[locale]/itinerary/[slug]/page.tsx called
// getTranslations({ namespace: "itinerary" }) with 13 keys, but the "itinerary"
// namespace was NEVER added to messages/en.json + hi.json. Two failures that a
// green build + a 200-status check both MISSED:
//   1. next-intl (no onError in i18n/request.ts) returned the KEY PATH as the
//      live string — every itinerary page rendered "itinerary.title",
//      "itinerary.oneDayHeading" as its headings, both locales, for weeks.
//   2. Server getTranslations() THREW MISSING_MESSAGE during static prerender,
//      failing the Vercel build NON-deterministically (only when the page's
//      generateStaticParams DB fetch returned rows that prerendered).
// See memory: reference_nextintl_missing_namespace_build_break.
//
// This gate enforces two invariants:
//   (A) Every next-intl namespace referenced in src/ exists in en.json.
//   (B) en.json and hi.json are in exact leaf-key parity (Hindi parity is
//       required — apps/web/AGENTS.md). This also catches a namespace present
//       in en but missing in hi.
//
// Wired as part of the `prebuild` script so it runs before every `next build`
// (locally + on Vercel). Emergency bypass: SKIP_I18N_CHECK=1 npm run build
//
// Limitation: validates namespace existence + en/hi parity, not every
// individual t("key") reference against its namespace (that needs per-file
// scope analysis). Parity (B) catches the common "added to en, forgot hi" drift.

import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const RED = "\x1b[31m";
const YELLOW = "\x1b[33m";
const GREEN = "\x1b[32m";
const DIM = "\x1b[2m";
const BOLD = "\x1b[1m";
const RESET = "\x1b[0m";

if (process.env.SKIP_I18N_CHECK === "1") {
  console.log(`${YELLOW}⚠  SKIP_I18N_CHECK=1 — i18n gate bypassed${RESET}`);
  process.exit(0);
}

const HERE = dirname(fileURLToPath(import.meta.url));
const WEB_ROOT = join(HERE, "..");
const SRC = join(WEB_ROOT, "src");
const EN_PATH = join(WEB_ROOT, "src/messages/en.json");
const HI_PATH = join(WEB_ROOT, "src/messages/hi.json");

const en = JSON.parse(readFileSync(EN_PATH, "utf8"));
const hi = JSON.parse(readFileSync(HI_PATH, "utf8"));

// ── Collect every leaf key-path ("ns.sub.key") in a catalog ──────────────
function leafPaths(obj, prefix = "") {
  const out = [];
  for (const [k, v] of Object.entries(obj)) {
    const p = prefix ? `${prefix}.${k}` : k;
    if (v && typeof v === "object" && !Array.isArray(v)) out.push(...leafPaths(v, p));
    else out.push(p);
  }
  return out;
}

// ── Walk src/ and extract referenced top-level namespaces ────────────────
const NS_RE =
  /(?:namespace:\s*|useTranslations\(\s*|getTranslations\(\s*(?:\{[^}]*namespace:\s*)?)["']([A-Za-z][A-Za-z0-9_]*)["']/g;

function walk(dir) {
  const files = [];
  for (const name of readdirSync(dir)) {
    if (name === "node_modules" || name === ".next" || name.startsWith(".")) continue;
    const full = join(dir, name);
    const st = statSync(full);
    if (st.isDirectory()) files.push(...walk(full));
    else if (/\.(ts|tsx)$/.test(name)) files.push(full);
  }
  return files;
}

const referenced = new Map(); // namespace -> first file it's seen in
for (const file of walk(SRC)) {
  const text = readFileSync(file, "utf8");
  let m;
  NS_RE.lastIndex = 0;
  while ((m = NS_RE.exec(text)) !== null) {
    const ns = m[1];
    if (!referenced.has(ns)) referenced.set(ns, file.replace(WEB_ROOT + "/", ""));
  }
}

const enTop = new Set(Object.keys(en));

// ── (A) referenced namespaces must exist in en.json ──────────────────────
const missingNs = [...referenced.entries()].filter(([ns]) => !enTop.has(ns));

// ── (B) en/hi leaf-key parity ────────────────────────────────────────────
const enLeaves = new Set(leafPaths(en));
const hiLeaves = new Set(leafPaths(hi));
const onlyEn = [...enLeaves].filter((p) => !hiLeaves.has(p)).sort();
const onlyHi = [...hiLeaves].filter((p) => !enLeaves.has(p)).sort();

let failed = false;

if (missingNs.length > 0) {
  failed = true;
  console.error("");
  console.error(`${RED}${BOLD}✗ Build blocked — next-intl namespace(s) referenced in code but missing from en.json${RESET}`);
  console.error("");
  for (const [ns, file] of missingNs) {
    console.error(`  ${RED}${BOLD}${ns}${RESET} ${DIM}— referenced in ${file}${RESET}`);
  }
  console.error("");
  console.error(`  ${DIM}getTranslations/useTranslations("${missingNs[0][0]}") will throw MISSING_MESSAGE on prerender${RESET}`);
  console.error(`  ${DIM}and render the key path as the live string. Add the namespace to BOTH${RESET}`);
  console.error(`  ${DIM}src/messages/en.json and src/messages/hi.json.${RESET}`);
}

if (onlyEn.length > 0 || onlyHi.length > 0) {
  failed = true;
  console.error("");
  console.error(`${RED}${BOLD}✗ Build blocked — en.json / hi.json key parity broken (Hindi parity is required)${RESET}`);
  console.error("");
  const show = (label, arr) => {
    if (arr.length === 0) return;
    console.error(`  ${BOLD}${label} (${arr.length}):${RESET}`);
    for (const p of arr.slice(0, 25)) console.error(`    ${RED}${p}${RESET}`);
    if (arr.length > 25) console.error(`    ${DIM}… +${arr.length - 25} more${RESET}`);
  };
  show("In en.json but missing from hi.json", onlyEn);
  show("In hi.json but missing from en.json", onlyHi);
}

if (failed) {
  console.error("");
  console.error(`  ${DIM}Emergency bypass: SKIP_I18N_CHECK=1 npm run build${RESET}`);
  console.error("");
  process.exit(1);
}

console.log(
  `${GREEN}✓ i18n gate passed${RESET} ${DIM}(${referenced.size} namespaces referenced, ${enLeaves.size} keys, en/hi in parity)${RESET}`
);
