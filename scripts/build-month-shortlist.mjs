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
 * no model in the loop. And it is genuinely time-bound: it changes every month,
 * which is real urgency rather than a countdown timer.
 *
 * READ PATH — prefers direct Postgres (port 5432); falls back to REST when
 * SUPABASE_DB_URL isn't configured. The fallback is deliberate and compliant:
 * the egress rules ban REST for BULK work (>500 rows), and this query returns
 * only the destinations whose best month is the current one — 63 rows in
 * August, never more than a couple of hundred. The two COUNT aggregates run
 * server-side and return one row each. If this ever needs the full 533-row
 * table, use the direct-PG path (see reference_supabase_egress_rules).
 *
 * Deterministic and $0 — no metered AI, per project_nakshiq_no_metered_ai.
 *
 * USAGE
 *   node --env-file=apps/web/.env.local scripts/build-month-shortlist.mjs
 *   MONTH=9 node --env-file=apps/web/.env.local scripts/build-month-shortlist.mjs
 *
 * Writes apps/web/src/data/month-shortlist.json (committed, so the email and
 * any page render from a build artefact rather than querying at send time).
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

/** Current month in IST — Vercel/CI run UTC, which is the wrong month for ~5.5h
 *  at every rollover. Mirrors currentMonthIST() in @itp/shared. */
function currentMonthIST() {
  const ist = new Date(Date.now() + 5.5 * 60 * 60 * 1000);
  return ist.getUTCMonth() + 1;
}

const LIST_SQL = `
  SELECT d.id, d.name, d.tagline, s.name AS state_name
    FROM destinations d
    LEFT JOIN states s ON s.id = d.state_id
   WHERE d.best_months @> ARRAY[$1::int]
     AND NOT COALESCE(d.avoid_months, '{}') @> ARRAY[$1::int]
   ORDER BY s.name NULLS LAST, d.name`;

const TOTALS_SQL = `
  SELECT COUNT(*)::int AS total,
         COUNT(*) FILTER (WHERE best_months  @> ARRAY[$1::int])::int AS go,
         COUNT(*) FILTER (WHERE avoid_months @> ARRAY[$1::int])::int AS avoid
    FROM destinations`;

async function fetchViaPostgres(dbUrl, month) {
  const client = new pg.Client({ connectionString: dbUrl, ssl: { rejectUnauthorized: false } });
  await client.connect();
  try {
    const { rows } = await client.query(LIST_SQL, [month]);
    const { rows: [totals] } = await client.query(TOTALS_SQL, [month]);
    return { rows, totals };
  } finally {
    await client.end();
  }
}

/** REST fallback — see the read-path note in the header for why this is
 *  compliant for this specific query shape. */
async function fetchViaRest(month) {
  const { createClient } = await import("@supabase/supabase-js");
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    throw new Error(
      "No SUPABASE_DB_URL, and no NEXT_PUBLIC_SUPABASE_URL + key for the REST fallback.\n" +
      "Run with: node --env-file=apps/web/.env.local scripts/build-month-shortlist.mjs",
    );
  }
  const sb = createClient(url, key);

  const { data: all, error } = await sb
    .from("destinations")
    .select("id, name, tagline, state_id, best_months, avoid_months")
    .contains("best_months", [month]);
  if (error) throw new Error(`REST list failed: ${error.message}`);

  const { data: states, error: sErr } = await sb.from("states").select("id, name");
  if (sErr) throw new Error(`REST states failed: ${sErr.message}`);
  const stateName = new Map((states ?? []).map((s) => [s.id, s.name]));

  const rows = (all ?? [])
    .filter((d) => !(d.avoid_months ?? []).includes(month))
    .map((d) => ({ id: d.id, name: d.name, tagline: d.tagline, state_name: stateName.get(d.state_id) ?? null }))
    .sort((a, b) => (a.state_name ?? "￿").localeCompare(b.state_name ?? "￿") || a.name.localeCompare(b.name));

  // Counts only — `head: true` returns no rows, so these cost no row egress.
  const countOf = async (col) => {
    const { count, error: e } = await sb
      .from("destinations")
      .select("id", { count: "exact", head: true })
      .contains(col, [month]);
    if (e) throw new Error(`REST count(${col}) failed: ${e.message}`);
    return count ?? 0;
  };
  const { count: total } = await sb.from("destinations").select("id", { count: "exact", head: true });

  return { rows, totals: { total: total ?? 0, go: await countOf("best_months"), avoid: await countOf("avoid_months") } };
}

async function main() {
  const month = Number(process.env.MONTH) || currentMonthIST();
  if (!(month >= 1 && month <= 12)) throw new Error(`Bad MONTH: ${process.env.MONTH}`);

  const dbUrl = process.env.SUPABASE_DB_URL || process.env.DATABASE_URL;
  const { rows, totals } = dbUrl
    ? await fetchViaPostgres(dbUrl, month)
    : (console.log("• SUPABASE_DB_URL unset — using the REST read path"), await fetchViaRest(month));

  // Group by state so the artefact reads as a document, not a dump.
  const byState = new Map();
  for (const r of rows) {
    const key = r.state_name ?? "Elsewhere";
    if (!byState.has(key)) byState.set(key, []);
    byState.get(key).push({
      id: r.id,
      name: r.name,
      tagline: r.tagline ?? null,
      type: Array.isArray(r.type) ? r.type.slice(0, 2) : [],
    });
  }

  const payload = {
    month,
    monthSlug: MONTH_SLUGS[month - 1],
    monthLong: MONTH_LONG[month - 1],
    generatedAt: new Date().toISOString(),
    totals: {
      destinations: totals.total,
      atTheirBest: totals.go,
      inAMonthToAvoid: totals.avoid,
      // `go` counts every destination whose best_months includes this month;
      // `listed` excludes the handful that are ALSO flagged avoid (data conflict),
      // so the two can differ. Report both rather than silently reconciling.
      listed: rows.length,
    },
    states: [...byState.entries()]
      .map(([state, destinations]) => ({ state, destinations }))
      .sort((a, b) => b.destinations.length - a.destinations.length),
  };

  mkdirSync(dirname(OUT), { recursive: true });
  writeFileSync(OUT, JSON.stringify(payload, null, 2) + "\n");

  // Tiny companion for CLIENT components (the signup copy needs the month and
  // the counts, nothing else). JSON imports don't tree-shake, so importing the
  // full shortlist into a client bundle would ship all 63 records + taglines to
  // every visitor for the sake of two numbers.
  writeFileSync(
    SUMMARY_OUT,
    JSON.stringify(
      { month: payload.month, monthLong: payload.monthLong, totals: payload.totals },
      null,
      2,
    ) + "\n",
  );

  console.log(`✓ ${payload.monthLong}: ${payload.totals.listed} listed of ${payload.totals.destinations} destinations`);
  console.log(`  at their best: ${payload.totals.atTheirBest} · in a month to avoid: ${payload.totals.inAMonthToAvoid}`);
  if (payload.totals.atTheirBest !== payload.totals.listed) {
    console.log(`  note: ${payload.totals.atTheirBest - payload.totals.listed} flagged BOTH best and avoid — excluded from the list`);
  }
  console.log(`  ${payload.states.length} states · → ${OUT}`);
}

main().catch((e) => {
  console.error("✗", e.message);
  process.exit(1);
});
