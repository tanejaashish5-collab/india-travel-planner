#!/usr/bin/env node
/**
 * Guard rail. Fails the build if any UI/route file under apps/web/src/
 * uses raw new Date().getMonth() / .toLocaleString({month: ...}) instead
 * of the IST-aware helpers from @itp/shared.
 *
 * Why: Vercel servers run in UTC. Without an IST helper, "best in {month}"
 * surfaces flip 5.5h late on the 1st of the month vs Indian phones — users
 * see April content on May 1 morning. We ate that exact bug on the homepage
 * 2026-04-30; this guard prevents it returning.
 *
 * Allowed call sites (single source of truth):
 *   import { currentMonthIST, currentMonthSlugIST, currentMonthLongIST } from "@itp/shared";
 *
 * Run via:
 *   node scripts/check-month-helper.mjs
 *
 * Wired into npm run prebuild so every Vercel deploy enforces it.
 */
import { readFileSync, readdirSync, statSync } from "fs";
import { join, relative } from "path";

const ROOT = "apps/web/src";
const FORBIDDEN = [
  /new Date\(\)\.getMonth\(\)/,
  /new Date\(\)\.toLocaleString\([^)]*month/,
];
// The shared helper at packages/shared/src/utils/current-month.ts is the
// canonical implementation; it lives outside apps/web/src/ so we don't scan it.

function walk(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    const s = statSync(p);
    if (s.isDirectory()) walk(p, out);
    else if (/\.(tsx?|jsx?)$/.test(entry) && !entry.endsWith(".d.ts")) out.push(p);
  }
  return out;
}

const files = walk(ROOT);
const offenders = [];
for (const f of files) {
  const text = readFileSync(f, "utf-8");
  for (const pat of FORBIDDEN) {
    if (pat.test(text)) {
      // Find line number for friendlier output
      const lines = text.split("\n");
      const lineNum = lines.findIndex((l) => pat.test(l)) + 1;
      offenders.push({ file: relative(".", f), line: lineNum, pattern: pat.source });
      break;
    }
  }
}

if (offenders.length === 0) {
  console.log("✓ check-month-helper: no raw new Date().getMonth() / toLocaleString({month}) usages in apps/web/src/");
  process.exit(0);
}

console.error("\n✗ check-month-helper FAILED — raw UTC month patterns found:\n");
for (const o of offenders) {
  console.error(`  ${o.file}:${o.line}    /${o.pattern}/`);
}
console.error(`
Fix: import the IST-aware helper from @itp/shared instead.

  import { currentMonthIST, currentMonthSlugIST, currentMonthLongIST } from "@itp/shared";

  const month = currentMonthIST();          // 1-12
  const slug  = currentMonthSlugIST();      // "may"
  const name  = currentMonthLongIST();      // "May"

Why this matters: Vercel servers run UTC. Without IST, "best in {month}"
surfaces flip 5.5h late on the 1st (Indian users see last month's content
on May 1 morning). The shared helper handles the timezone correctly.
`);
process.exit(1);
