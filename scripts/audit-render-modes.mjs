#!/usr/bin/env node
/**
 * M5 — Render-mode regression check.
 *
 * After `next build`, Next.js prints a summary table of every route with
 * its render mode: Static (○), ISR (●), SSG (●), Dynamic (ƒ), etc. The
 * 2026-05-05 → 2026-05-27 ISR regression silently flipped 27 dynamic-
 * segment routes from ISR → fully dynamic; no test caught it because no
 * one checked the build output.
 *
 * This script:
 *   1. Reads the route table from `apps/web/.next/app-paths-manifest.json`
 *      + `apps/web/.next/routes-manifest.json` + `apps/web/.next/server/`
 *      to classify every page route.
 *   2. Compares the classification against `apps/web/data/render-mode-baseline.json`
 *      (committed to git).
 *   3. Fails the build with a non-zero exit code if any route flipped
 *      from static/ISR → dynamic OR if a known-ISR route lost its
 *      revalidate setting.
 *   4. If `--update` is passed, refreshes the baseline file instead of
 *      asserting against it (used after an intentional architectural change).
 *
 * Usage:
 *   node scripts/audit-render-modes.mjs           # assert against baseline (CI mode)
 *   node scripts/audit-render-modes.mjs --update  # refresh baseline (one-shot, commit the diff)
 *
 * Designed to run AFTER `next build` in the CI workflow. Reads only the
 * filesystem; no network, no DB, no API calls. Idempotent.
 */
import { readFile, writeFile, readdir, stat } from "node:fs/promises";
import { join, relative } from "node:path";

const NEXT_DIR = join(process.cwd(), "apps/web/.next");
const BASELINE_PATH = join(process.cwd(), "apps/web/data/render-mode-baseline.json");
const isUpdate = process.argv.includes("--update");

// Mode classification:
//   "static"   — pre-rendered at build time, no revalidate
//   "isr"      — pre-rendered at build time, revalidates on a schedule
//   "dynamic"  — server-rendered on every request (no caching at edge)
//
// The categories map to what Next 16 reports in the build summary.
//
// Detection strategy:
//   - Static: file exists at `.next/server/app/<route>.html` AND no
//     revalidate header in the body OR no entry in prerender-manifest.
//   - ISR: route appears in `.next/prerender-manifest.json` `dynamicRoutes`
//     with `initialRevalidateSeconds > 0`.
//   - Dynamic: route is in `app-paths-manifest.json` but NOT in
//     `prerender-manifest.json` (neither as a static or dynamic route),
//     OR has `initialRevalidateSeconds === false`.

async function readJson(p) {
  try {
    const raw = await readFile(p, "utf8");
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

async function classifyRoutes() {
  const appPaths = await readJson(join(NEXT_DIR, "app-paths-manifest.json"));
  const prerender = await readJson(join(NEXT_DIR, "prerender-manifest.json"));
  if (!appPaths) {
    console.error(`✗ Could not read ${NEXT_DIR}/app-paths-manifest.json — run \`next build\` first.`);
    process.exit(2);
  }
  if (!prerender) {
    console.error(`✗ Could not read ${NEXT_DIR}/prerender-manifest.json — run \`next build\` first.`);
    process.exit(2);
  }

  // app-paths-manifest.json shape: { "/path/route": "app/path/page.js", ... }
  // prerender-manifest.json shape: { routes: {...}, dynamicRoutes: {...} }
  const out = {};
  const allRoutes = Object.keys(appPaths)
    .filter((r) => r.endsWith("/page") || r === "/" || !r.includes("(api)"))
    .map((r) => r.replace(/\/page$/, "").replace(/^\(.*?\)/, "") || "/");

  // Static routes (resolved, not dynamic-param) are in prerender.routes.
  for (const route of Object.keys(prerender.routes ?? {})) {
    const meta = prerender.routes[route];
    const rev = meta?.initialRevalidateSeconds;
    let mode;
    if (rev === false || rev === undefined) mode = "static";
    else if (typeof rev === "number" && rev > 0) mode = "isr";
    else mode = "dynamic";
    out[route] = { mode, revalidate: typeof rev === "number" ? rev : null };
  }

  // Dynamic-param routes are in prerender.dynamicRoutes — they declare
  // their ISR behaviour even before any param is actually built.
  for (const route of Object.keys(prerender.dynamicRoutes ?? {})) {
    const meta = prerender.dynamicRoutes[route];
    // fallback property differs in Next 16; respect both old and new shapes
    const rev = meta?.initialRevalidateSeconds;
    let mode;
    if (rev === false) mode = "dynamic";
    else if (typeof rev === "number" && rev > 0) mode = "isr";
    else mode = "dynamic"; // no revalidate declared = treated as dynamic
    out[route] = { mode, revalidate: typeof rev === "number" ? rev : null };
  }

  // Anything in app-paths-manifest but NOT in either prerender bucket is
  // fully dynamic (no static optimization at all).
  for (const route of allRoutes) {
    if (!(route in out)) {
      // Normalize "/<route>" — strip trailing slash, special-case "/"
      const normalized = route === "/" ? route : route.replace(/\/$/, "");
      if (!(normalized in out)) {
        out[normalized] = { mode: "dynamic", revalidate: null };
      }
    }
  }

  return out;
}

function diffClassifications(baseline, current) {
  const regressions = [];
  const additions = [];
  const removals = [];

  for (const route of Object.keys(baseline)) {
    const b = baseline[route];
    const c = current[route];
    if (!c) {
      removals.push({ route, was: b.mode });
      continue;
    }
    // A flip from static/isr → dynamic is a regression. A flip from
    // dynamic → static/isr is fine (intentional improvement).
    if ((b.mode === "static" || b.mode === "isr") && c.mode === "dynamic") {
      regressions.push({ route, was: b.mode, now: c.mode, baseline_revalidate: b.revalidate });
    }
    // An ISR route losing its revalidate (or its number dropping to 0/false)
    // is also a regression — the route becomes effectively dynamic.
    if (b.mode === "isr" && c.mode === "isr" && b.revalidate && !c.revalidate) {
      regressions.push({ route, was: `isr(${b.revalidate})`, now: "isr(no-revalidate)", baseline_revalidate: b.revalidate });
    }
  }
  for (const route of Object.keys(current)) {
    if (!(route in baseline)) {
      additions.push({ route, mode: current[route].mode });
    }
  }

  return { regressions, additions, removals };
}

async function main() {
  const current = await classifyRoutes();

  if (isUpdate) {
    await writeFile(BASELINE_PATH, JSON.stringify(current, null, 2) + "\n", "utf8");
    console.log(`✓ Baseline refreshed at ${relative(process.cwd(), BASELINE_PATH)} — ${Object.keys(current).length} routes`);
    return;
  }

  const baseline = await readJson(BASELINE_PATH);
  if (!baseline) {
    console.warn(`! No baseline at ${relative(process.cwd(), BASELINE_PATH)} — creating one from this build.`);
    console.warn(`  Run again with --update after reviewing, or commit the new baseline as-is.`);
    await writeFile(BASELINE_PATH, JSON.stringify(current, null, 2) + "\n", "utf8");
    return;
  }

  const { regressions, additions, removals } = diffClassifications(baseline, current);

  if (regressions.length > 0) {
    console.error(`✗ ${regressions.length} route(s) regressed (static/ISR → dynamic):\n`);
    regressions.forEach((r) =>
      console.error(`  • ${r.route}    was=${r.was}   now=${r.now}   baseline_revalidate=${r.baseline_revalidate}`)
    );
    console.error(`\nThis is the same regression class as the 2026-05-05 ISR bug (commit c1f126d6).`);
    console.error(`If intentional, run \`node scripts/audit-render-modes.mjs --update\` to refresh the baseline.`);
    process.exit(1);
  }

  console.log(`✓ Render-mode check passed — ${Object.keys(current).length} routes, 0 regressions.`);
  if (additions.length > 0) console.log(`  · ${additions.length} new route(s) added; baseline auto-updated.`);
  if (removals.length > 0) console.log(`  · ${removals.length} route(s) removed; baseline auto-updated.`);

  // Auto-update baseline on additions/removals only (never on regressions —
  // those must be explicit).
  if (additions.length > 0 || removals.length > 0) {
    await writeFile(BASELINE_PATH, JSON.stringify(current, null, 2) + "\n", "utf8");
  }
}

main().catch((e) => {
  console.error(`✗ audit-render-modes.mjs failed:`, e?.message ?? e);
  process.exit(2);
});
