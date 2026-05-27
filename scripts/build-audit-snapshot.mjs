#!/usr/bin/env node
/**
 * Build-time audit-snapshot generator.
 *
 * Parses every `gsc-audits/gsc-audit-*.md` and `ga4-audits/ga4-audit-*.md`
 * into a single static JSON file at `apps/web/data/audit-snapshots.json`.
 *
 * Why: the audit-gsc-alerts + audit-gsc-ga4-correlation cron routes were
 * originally reading the markdown files at runtime via
 *   path.join(process.cwd(), "..", "..", "gsc-audits")
 * which Turbopack's file-tracer in Next 16 cannot statically scope. The
 * tracer pessimistically bundled the entire monorepo root into the
 * serverless function — pushing it past Vercel's 300 MB hard cap (it
 * landed at 302.77 MB on 2026-05-27, blocking the M1-M7 deploy AND the
 * unrelated trek-fill content).
 *
 * Fix: parse once, at build time, into a static JSON that the routes
 * import normally via `@/data/audit-snapshots.json`. Turbopack scopes
 * static imports correctly → function bundle shrinks back to <50 MB.
 *
 * Runs via the `prebuild` npm-script in apps/web — Vercel triggers it
 * automatically before every `next build`. Output is .gitignored.
 */
import { readFile, writeFile, readdir, mkdir, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
// Walk up from scripts/ to monorepo root.
const ROOT = resolve(HERE, "..");
const GSC_DIR = join(ROOT, "gsc-audits");
const GA4_DIR = join(ROOT, "ga4-audits");
// Write into apps/web/src/data/ so the route's "@/data/audit-snapshots.json"
// alias (which resolves to apps/web/src/*) finds it. The existing
// apps/web/data/ directory holds files imported via relative paths;
// we deliberately use src/data/ for build-generated artefacts so the alias
// pattern stays consistent.
const OUT_PATH = join(ROOT, "apps/web/src/data/audit-snapshots.json");

// ─────────────────────────────────────────────────────────────────────
// GSC audit parser — matches the runtime parser the routes had before.
// ─────────────────────────────────────────────────────────────────────

/**
 * Extract indexed-pages count from prose. Audits format inconsistently;
 * try several patterns and take the first credible reading (4K-80K range).
 */
function parseIndexedPages(raw) {
  const candidates = [];
  // Pattern 1: bold pipe-cell — "**15.9K**" or "**14,100**"
  for (const m of raw.matchAll(/(?:^|\|\s*)\*\*([\d,.]+)K?\*\*/g)) {
    const v = parseFloat(m[1].replace(/,/g, ""));
    const final = m[0].includes("K") ? v * 1000 : v;
    if (final >= 4000 && final <= 80000) candidates.push(final);
  }
  // Pattern 2: prose — "indexed pages | **N** |"
  for (const m of raw.matchAll(/indexed[^\n|]*\|\s*\*\*([\d,.]+)K?\*\*/gi)) {
    const v = parseFloat(m[1].replace(/,/g, ""));
    const final = /K\*\*$/.test(m[0]) ? v * 1000 : v;
    if (final >= 4000 && final <= 80000) candidates.push(final);
  }
  return candidates.length > 0 ? candidates[0] : null;
}

/**
 * Extract top-10 page table rows: "| 1 | /url | clicks | impressions | ctr |".
 */
function parseGscTopPages(raw) {
  const out = [];
  for (const m of raw.matchAll(/\|\s*\d+\s*\|\s*(\/[^\s|]+)\s*\|\s*([\d,.]+)\s*\|\s*([\d,.]+)\s*\|/g)) {
    const url = m[1].trim();
    if (!url.startsWith("/")) continue;
    const clicks = parseInt(m[2].replace(/,/g, ""), 10);
    const impressions = parseInt(m[3].replace(/,/g, ""), 10);
    if (!isNaN(clicks) && !isNaN(impressions)) {
      out.push({ url, clicks, impressions });
    }
  }
  return out;
}

// ─────────────────────────────────────────────────────────────────────
// GA4 audit parser — extracts the "Top human pages" engaged-sessions table.
// ─────────────────────────────────────────────────────────────────────

function parseGa4TopPages(raw) {
  const out = [];
  // Locate the "Top human pages" section and parse rows in:
  // "| N | `/url` | engaged | avg-sec |"
  const sectionMatch = raw.match(/Top human pages[\s\S]*?(?=\n## |\n# |$)/);
  const section = sectionMatch ? sectionMatch[0] : raw;
  for (const m of section.matchAll(/\|\s*\d+\s*\|\s*`?(\/[^\s|`]+)`?\s*\|\s*(\d+)\s*\|/g)) {
    const url = m[1].trim();
    const engaged = parseInt(m[2], 10);
    if (!url.startsWith("/") || isNaN(engaged)) continue;
    out.push({ url, engaged });
  }
  return out;
}

// ─────────────────────────────────────────────────────────────────────
// Main
// ─────────────────────────────────────────────────────────────────────

async function readDir(dir, prefix) {
  if (!existsSync(dir)) {
    console.warn(`! ${dir} does not exist — skipping`);
    return [];
  }
  const entries = await readdir(dir);
  const re = new RegExp(`^${prefix}-(\\d{4}-\\d{2}-\\d{2})\\.md$`);
  return entries
    .map((e) => ({ name: e, match: e.match(re) }))
    .filter((x) => x.match)
    .sort((a, b) => a.name.localeCompare(b.name));
}

async function main() {
  const t0 = Date.now();

  const gscFiles = await readDir(GSC_DIR, "gsc-audit");
  const ga4Files = await readDir(GA4_DIR, "ga4-audit");

  const gsc = [];
  for (const f of gscFiles) {
    const date = f.match[1];
    const raw = await readFile(join(GSC_DIR, f.name), "utf8");
    gsc.push({
      date,
      indexed_pages: parseIndexedPages(raw),
      top_pages: parseGscTopPages(raw),
    });
  }

  const ga4 = [];
  for (const f of ga4Files) {
    const date = f.match[1];
    const raw = await readFile(join(GA4_DIR, f.name), "utf8");
    ga4.push({
      date,
      top_pages: parseGa4TopPages(raw),
    });
  }

  const out = {
    generated_at: new Date().toISOString(),
    gsc,
    ga4,
  };

  await mkdir(dirname(OUT_PATH), { recursive: true });
  await writeFile(OUT_PATH, JSON.stringify(out, null, 2) + "\n", "utf8");

  const bytes = (await stat(OUT_PATH)).size;
  const ms = Date.now() - t0;
  console.log(
    `✓ audit-snapshots.json written — gsc:${gsc.length} ga4:${ga4.length} (${(bytes / 1024).toFixed(1)} KB, ${ms}ms)`
  );
}

main().catch((e) => {
  console.error("✗ build-audit-snapshot.mjs failed:", e?.message ?? e);
  process.exit(1);
});
