/**
 * build-month-shortlist.mjs — generate the month shortlist, the one artefact
 * that is worth an email address.
 *
 * WHY THIS EXISTS
 * ---------------
 * Every newsletter ask on the site used to pitch the same thing: "subscribe to
 * The Window, every Sunday." That is a *commitment* with a vague benefit, asked
 * of someone mid-decision. Measured 2026-08-06: 918 human sessions/wk, 3
 * `save_prompt_view`, **0** emails captured, 13 subscribers in four months.
 * Neither the threshold (already 1) nor the placement (already on every
 * high-traffic page) was the problem — the OFFER was.
 *
 * So this builds a concrete, immediate, data-native artefact instead:
 *   "In August, 63 of 533 places in India are in their best month.
 *    324 are in a month to avoid. Here is the list."
 *
 * Nobody can self-serve that. You would have to open 533 pages. It is honest —
 * it is our own verified `best_months` / `avoid_months` data, no fabrication,
 * no model in the loop. And it is genuinely time-bound: it changes every month.
 *
 * ALL TWELVE MONTHS (2026-10-10). The first version wrote only the month it was
 * run in, and "regenerated monthly" was never scheduled, so the landing page and
 * every signup email still said "The August shortlist" in October. The file now
 * carries every month and the site picks the current IST month at render time
 * (apps/web/src/lib/month-shortlist.ts), so a month boundary can never strand
 * it again. Rerun only when best_months / avoid_months change.
 *
 * READ PATH — direct Postgres (SUPABASE_DB_URL) when set, else the Supabase
 * Management API SQL endpoint (SUPABASE_ACCESS_TOKEN). Both run the aggregation
 * server-side; no PostgREST bulk read (reference_supabase_egress_rules).
 *
 * Deterministic and $0 — no metered AI, per project_nakshiq_no_metered_ai.
 *
 * USAGE
 *   node --env-file=apps/web/.env.local scripts/build-month-shortlist.mjs
 *
 * Writes apps/web/src/data/month-shortlist.json (server-side: email) and
 * apps/web/src/data/month-shortlist-summary.json (client-safe: counts only).
 */
import pg from "pg";
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(ROOT, "apps/web/src/data/month-shortlist.json");
const SUMMARY_OUT = join(ROOT, "apps/web/src/data/month-shortlist-summary.json");

const MONTH_SLUGS = [
  "january", "february", "march", "april", "may", "june",
  "july", "august", "september", "october", "november", "december",
];
const MONTH_LONG = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

// One row per destination with its month arrays; grouping happens here.
const SQL = `
  SELECT d.id, d.name, d.tagline, s.name AS state_name,
         COALESCE(d.best_months, '{}') AS best_months,
         COALESCE(d.avoid_months, '{}') AS avoid_months
    FROM destinations d
    LEFT JOIN states s ON s.id = d.state_id
   ORDER BY s.name NULLS LAST, d.name`;

async function fetchRows() {
  const dbUrl = process.env.SUPABASE_DB_URL || process.env.DATABASE_URL;
  if (dbUrl) {
    const client = new pg.Client({ connectionString: dbUrl, ssl: { rejectUnauthorized: false } });
    await client.connect();
    try {
      return (await client.query(SQL)).rows;
    } finally {
      await client.end();
    }
  }
  const token = process.env.SUPABASE_ACCESS_TOKEN;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!token || !url) {
    throw new Error(
      "Need SUPABASE_DB_URL, or SUPABASE_ACCESS_TOKEN + NEXT_PUBLIC_SUPABASE_URL.\n" +
      "Run with: node --env-file=apps/web/.env.local scripts/build-month-shortlist.mjs",
    );
  }
  console.log("• SUPABASE_DB_URL unset — using the Management API SQL endpoint");
  const ref = new URL(url).hostname.split(".")[0];
  const res = await fetch(`https://api.supabase.com/v1/projects/${ref}/database/query`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ query: SQL }),
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`Management API query failed: ${res.status} ${text.slice(0, 300)}`);
  return JSON.parse(text);
}

async function main() {
  const rows = await fetchRows();
  if (rows.length < 100) throw new Error(`Only ${rows.length} destinations returned — refusing to write`);

  const destinations = {};
  for (const r of rows) {
    destinations[r.id] = { name: r.name, tagline: r.tagline ?? null, state: r.state_name ?? "Elsewhere" };
  }

  const months = {};
  for (let m = 1; m <= 12; m++) {
    const best = rows.filter((r) => r.best_months.includes(m));
    const avoid = rows.filter((r) => r.avoid_months.includes(m));
    // `listed` excludes destinations flagged BOTH best and avoid (data conflict),
    // so it can differ from atTheirBest. Report both rather than silently reconciling.
    const listed = best.filter((r) => !r.avoid_months.includes(m));
    const byState = new Map();
    for (const r of listed) {
      const key = r.state_name ?? "Elsewhere";
      if (!byState.has(key)) byState.set(key, []);
      byState.get(key).push(r.id);
    }
    months[m] = {
      month: m,
      monthSlug: MONTH_SLUGS[m - 1],
      monthLong: MONTH_LONG[m - 1],
      totals: {
        destinations: rows.length,
        atTheirBest: best.length,
        inAMonthToAvoid: avoid.length,
        listed: listed.length,
      },
      states: [...byState.entries()]
        .map(([state, ids]) => ({ state, ids }))
        .sort((a, b) => b.ids.length - a.ids.length),
    };
  }

  const generatedAt = new Date().toISOString();
  mkdirSync(dirname(OUT), { recursive: true });
  writeFileSync(OUT, JSON.stringify({ generatedAt, destinations, months }, null, 1) + "\n");

  // Tiny companion for CLIENT components (the signup copy needs the month and
  // the counts, nothing else). JSON imports don't tree-shake, so importing the
  // full shortlist into a client bundle would ship every record + tagline to
  // every visitor for the sake of two numbers.
  const summary = { generatedAt, months: {} };
  for (const [m, v] of Object.entries(months)) summary.months[m] = { monthLong: v.monthLong, totals: v.totals };
  writeFileSync(SUMMARY_OUT, JSON.stringify(summary, null, 2) + "\n");

  for (const v of Object.values(months)) {
    const t = v.totals;
    const conflict = t.atTheirBest !== t.listed ? ` (${t.atTheirBest - t.listed} flagged best AND avoid, excluded)` : "";
    console.log(`✓ ${v.monthLong.padEnd(9)} listed ${String(t.listed).padStart(3)} · avoid ${String(t.inAMonthToAvoid).padStart(3)} of ${t.destinations}${conflict}`);
  }
  console.log(`  → ${OUT}\n  → ${SUMMARY_OUT}`);
}

main().catch((e) => {
  console.error("✗", e.message);
  process.exit(1);
});
