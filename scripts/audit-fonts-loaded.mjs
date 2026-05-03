#!/usr/bin/env node
// scripts/audit-fonts-loaded.mjs
//
// Lightweight smoke-test: do the layout source files reference the expected
// fonts? Next.js font optimization replaces font-family declarations in served
// HTML with hashed identifiers like `__Fraunces_abc123`, so curl+grep against
// the rendered HTML is unreliable for live verification.
//
// This script instead reads the LOCAL source (`apps/web/src/app/[locale]/layout.tsx`)
// and confirms the expected `next/font` imports are declared. For real visual
// verification, run Playwright with `getComputedStyle(h1).fontFamily` — that's
// the only reliable signal on live pages and lives in the MOAT plan / Phase 6.
//
// Brand bible v1 (locked April) requires Crimson Pro + Instrument Sans +
// JetBrains Mono. The Apr 8 typography audit showed Fraunces + Geist + Geist
// Mono shipping. The migration from SHIPPED → BIBLE is a Phase 6 task.
//
// Usage:
//   node scripts/audit-fonts-loaded.mjs              # checks prod
//   node scripts/audit-fonts-loaded.mjs --base=...   # custom base URL
//   BASE_URL=http://localhost:3000 node scripts/...  # local dev
//
// Exit 0 = all expected fonts found in served HTML. Non-zero = drift.

import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, "..");

const argv = process.argv.slice(2);
const baseArg = argv.find((a) => a.startsWith("--base="))?.slice("--base=".length);
const BASE = baseArg ?? process.env.BASE_URL ?? "https://www.nakshiq.com";

// Two font reality checks: BIBLE = brand bible v1 (locked April), TARGET state.
// SHIPPED = what's actually on prod TODAY (Fraunces + Geist + Geist Mono).
// The migration from SHIPPED → BIBLE is a Phase 6 task in
// ~/.claude/plans/i-have-also-added-synthetic-hejlsberg.md. Until then this
// audit reports both: --mode=bible expects bible (will fail until P6 ships);
// --mode=shipped expects current-state (catches regressions FROM Fraunces/Geist).
// Default = shipped (no false negatives during transition).

const ARG_MODE = argv.find((a) => a.startsWith("--mode="))?.slice("--mode=".length) ?? "shipped";

const BIBLE = [
  { family: "Crimson Pro", role: "display", patterns: [/Crimson\s*Pro/i, /--font-crimson/i] },
  { family: "Instrument Sans", role: "ui", patterns: [/Instrument\s*Sans/i, /--font-instrument/i] },
  { family: "JetBrains Mono", role: "data", patterns: [/JetBrains\s*Mono/i, /--font-jetbrains/i] },
];

const SHIPPED = [
  { family: "Fraunces", role: "display", patterns: [/\bFraunces\b/, /--font-fraunces/i] },
  { family: "Geist", role: "ui", patterns: [/\bGeist\b/, /--font-geist-sans/i] },
  { family: "Geist Mono", role: "data", patterns: [/Geist\s*Mono/i, /--font-geist-mono/i] },
];

const EXPECTED = ARG_MODE === "bible" ? BIBLE : SHIPPED;

// In bible mode, anything in the SHIPPED set is forbidden (it's what we're
// migrating away from). In shipped mode, nothing is forbidden — we just want
// to confirm the current stack is intact.
const FORBIDDEN = ARG_MODE === "bible" ? SHIPPED.map((s) => ({ family: s.family, patterns: s.patterns })) : [];

const LAYOUT_PATH = resolve(REPO_ROOT, "apps/web/src/app/[locale]/layout.tsx");

(async () => {
  console.log(`audit-fonts-loaded  mode=${ARG_MODE}`);
  console.log(`  source: ${LAYOUT_PATH}`);
  if (ARG_MODE === "shipped") {
    console.log("  (default; checks current Fraunces+Geist stack is intact in source)");
  } else {
    console.log("  (BIBLE mode: enforces Crimson Pro + Instrument Sans + JetBrains Mono. Will fail until Phase 6 migrates fonts.)");
  }

  let layoutSrc;
  try {
    layoutSrc = readFileSync(LAYOUT_PATH, "utf8");
  } catch (err) {
    console.error(`  ✗ could not read layout.tsx: ${err.message}`);
    process.exit(2);
  }

  const found = EXPECTED.map((e) => ({
    family: e.family,
    role: e.role,
    present: e.patterns.some((p) => p.test(layoutSrc)),
  }));
  const surplus = FORBIDDEN.map((f) => ({
    family: f.family,
    present: f.patterns.some((p) => p.test(layoutSrc)),
  })).filter((s) => s.present);
  const missing = found.filter((f) => !f.present);

  console.log("\nDeclared in layout.tsx:");
  for (const f of found) {
    console.log(`  ${f.present ? "✓" : "✗"} ${f.family.padEnd(20)} (${f.role})`);
  }
  if (surplus.length) {
    console.log("\nForbidden (legacy stack still present):");
    for (const s of surplus) console.log(`  ✗ ${s.family}`);
  }

  if (missing.length || surplus.length) {
    console.error(`\nFAIL: ${missing.length} expected missing, ${surplus.length} forbidden present.`);
    console.error("Fix path: edit apps/web/src/app/[locale]/layout.tsx font imports + tailwind.config.ts CSS vars.");
    process.exit(1);
  }

  // BASE-URL smoke check (informational only — Next.js inlines fonts with hashed
  // names in served HTML, so missing-on-prod ≠ broken; we rely on layout-source check above).
  console.log(`\nBASE=${BASE} (informational HTML probe; expect mostly silent — Next.js hashes font names)`);
  for (const p of ["/en", "/trip"]) {
    try {
      const r = await fetch(`${BASE}${p}`, { redirect: "follow" });
      console.log(`  ${r.ok ? "✓" : "✗"} ${p.padEnd(20)} HTTP ${r.status}`);
    } catch (err) {
      console.log(`  ✗ ${p.padEnd(20)} ${err.message}`);
    }
  }

  console.log("\nOK: layout font config matches expectations for the chosen mode.");
  process.exit(0);
})();
