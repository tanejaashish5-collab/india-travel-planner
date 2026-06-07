#!/usr/bin/env node
/**
 * sources.mjs — shared READ-ONLY data layer for the opportunity scout (Phase 4).
 *
 * Three sources, all read-only, all reusing the project's existing credential
 * patterns so there is one place that knows how to reach each:
 *   - Supabase  (service role, REST select)  — the moat data
 *   - GSC       (OAuth, Search Analytics API) — demand + rank (position/impr/CTR)
 *   - GA4       (service account, Data API)   — sessions + key-events per page
 *
 * Nothing here writes anywhere. It is the "read-db-query / web-fetch" layer
 * (noGate in the action allowlist). The scout imports gscQuery/ga4Query/
 * getSupabase from here; detectors never re-implement a client.
 *
 * Credential probe (run this first to confirm the loop can actually pull):
 *   node --env-file=apps/web/.env.local scripts/_loop/sources.mjs --probe
 *
 * GSC pull pattern ported from scripts/_mine-vs-queries.mjs (which ports it
 * from scripts/data-pull.mjs). GA4 pattern ported from scripts/ga4-daily-audit.mjs.
 */

import { readFileSync, existsSync } from "node:fs";
import { join, resolve } from "node:path";
import { ROOT } from "./guard.mjs";

// ─── Supabase (read-only, service role) ─────────────────────────────────────
let _sb;
export async function getSupabase() {
  if (_sb) return _sb;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error(
      "Supabase env missing — run with: node --env-file=apps/web/.env.local scripts/_loop/sources.mjs"
    );
  }
  const { createClient } = await import("@supabase/supabase-js");
  _sb = createClient(url, key, { auth: { persistSession: false } });
  return _sb;
}

/**
 * Page past PostgREST's 1000-row cap for a full table read (read-only).
 * A STABLE ORDER BY is mandatory: without it Postgres does not guarantee a
 * consistent row order across separate .range() requests, so rows can be
 * skipped or duplicated at page boundaries — which is exactly what would
 * resurrect the false "zero-POI" flags this paginator exists to prevent.
 * `order` defaults to the PK "id"; pass an array for a composite key
 * (e.g. destination_months → ["destination_id","month"]).
 */
export async function fetchAll(table, columns = "*", { order = "id" } = {}) {
  const sb = await getSupabase();
  const out = [];
  const pageSize = 1000;
  const orders = Array.isArray(order) ? order : [order];
  for (let from = 0; ; from += pageSize) {
    let q = sb.from(table).select(columns).range(from, from + pageSize - 1);
    for (const o of orders) q = q.order(o, { ascending: true });
    const { data, error } = await q;
    if (error) throw new Error(`[sources] ${table} read failed: ${error.message}`);
    out.push(...(data || []));
    if (!data || data.length < pageSize) break;
  }
  return out;
}

// ─── GSC (OAuth, Search Analytics API) ──────────────────────────────────────
// Ported verbatim in spirit from scripts/_mine-vs-queries.mjs lines 35-58.
let _gsc;
async function gscClient() {
  if (_gsc) return _gsc;
  const siteUrl = process.env.GSC_SITE_URL;
  if (!siteUrl) throw new Error("GSC_SITE_URL not set in .env.local");
  const clientPath = join(ROOT, ".secrets", "gsc-oauth-client.json");
  const tokenPath = join(ROOT, ".secrets", "gsc-refresh-token.txt");
  if (!existsSync(clientPath)) throw new Error(`missing ${clientPath}`);
  const clientJson = JSON.parse(readFileSync(clientPath, "utf8"));
  const cfg = clientJson.web ?? clientJson.installed ?? clientJson.desktop;
  const refreshToken =
    process.env.GSC_OAUTH_REFRESH_TOKEN ||
    (existsSync(tokenPath) ? readFileSync(tokenPath, "utf8").trim() : null);
  if (!refreshToken) throw new Error("no GSC refresh token (.secrets/gsc-refresh-token.txt)");
  const { google } = await import("googleapis");
  const oauth2 = new google.auth.OAuth2(cfg.client_id, cfg.client_secret);
  oauth2.setCredentials({ refresh_token: refreshToken });
  _gsc = { api: google.searchconsole({ version: "v1", auth: oauth2 }), siteUrl };
  return _gsc;
}

/**
 * @param {object} o
 * @param {string} o.startDate  YYYY-MM-DD
 * @param {string} o.endDate    YYYY-MM-DD
 * @param {string[]} [o.dimensions] e.g. ["query"], ["page"], ["page","query"]
 * @param {number} [o.rowLimit]
 * @returns {Promise<Array<{keys:string[],clicks:number,impressions:number,ctr:number,position:number}>>}
 */
export async function gscQuery({ startDate, endDate, dimensions = ["query"], rowLimit = 5000 }) {
  const { api, siteUrl } = await gscClient();
  const { data } = await api.searchanalytics.query({
    siteUrl,
    requestBody: { startDate, endDate, dimensions, rowLimit },
  });
  return data.rows ?? [];
}

// ─── GA4 (service account, Data API) ────────────────────────────────────────
// Ported from scripts/ga4-daily-audit.mjs.
let _ga;
async function ga4Client() {
  if (_ga) return _ga;
  const prop = process.env.GA4_PROPERTY_ID;
  if (!prop) throw new Error("GA4_PROPERTY_ID not set in .env.local");
  const creds = process.env.GOOGLE_APPLICATION_CREDENTIALS;
  if (creds && (creds.startsWith("./") || creds.startsWith("../"))) {
    // mirror scripts/ga4-daily-audit.mjs: resolve relative to repo root (handles ../ correctly).
    process.env.GOOGLE_APPLICATION_CREDENTIALS = resolve(ROOT, creds);
  }
  const { BetaAnalyticsDataClient } = await import("@google-analytics/data");
  _ga = { client: new BetaAnalyticsDataClient(), prop };
  return _ga;
}

/**
 * Thin wrapper over runReport. Pass GA4 Data API shapes (dimensions/metrics).
 * @returns {Promise<Array<{dimensionValues:Array<{value:string}>, metricValues:Array<{value:string}>}>>}
 */
export async function ga4Query(opts) {
  const { client, prop } = await ga4Client();
  const [resp] = await client.runReport({ property: `properties/${prop}`, ...opts });
  return resp.rows ?? [];
}

// ─── date helpers (UTC; GSC/GA4 both accept YYYY-MM-DD) ──────────────────────
export function daysAgo(n) {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() - n);
  return d.toISOString().slice(0, 10);
}
export const today = () => new Date().toISOString().slice(0, 10);

// ─── credential probe ───────────────────────────────────────────────────────
async function probe() {
  const results = [];
  const stamp = (name, status, detail) => {
    results.push({ name, status, detail });
    const icon = status === "PASS" ? "✓" : status === "SKIP" ? "·" : "✗";
    console.log(`  ${icon} ${name.padEnd(10)} ${status.padEnd(5)} ${detail}`);
  };

  console.log("sources.mjs credential probe (read-only, tiny pulls)\n");

  // Supabase
  try {
    const sb = await getSupabase();
    const { count, error } = await sb.from("destinations").select("id", { count: "exact", head: true });
    if (error) throw new Error(error.message);
    stamp("Supabase", "PASS", `destinations rows = ${count}`);
  } catch (e) {
    stamp("Supabase", "FAIL", e.message);
  }

  // GSC
  try {
    const rows = await gscQuery({ startDate: daysAgo(28), endDate: today(), dimensions: ["query"], rowLimit: 5 });
    const top = rows[0];
    stamp(
      "GSC",
      "PASS",
      `pulled ${rows.length} query rows (28d)` +
        (top ? ` — top "${top.keys?.[0]}" pos=${top.position?.toFixed(1)} impr=${top.impressions}` : "")
    );
  } catch (e) {
    stamp("GSC", e.message.includes("not set") ? "SKIP" : "FAIL", e.message);
  }

  // GA4
  try {
    const rows = await ga4Query({
      dimensions: [{ name: "pagePath" }],
      metrics: [{ name: "sessions" }, { name: "keyEvents" }],
      dateRanges: [{ startDate: daysAgo(28), endDate: "today" }],
      limit: 5,
    });
    const top = rows[0];
    stamp(
      "GA4",
      "PASS",
      `pulled ${rows.length} page rows (28d)` +
        (top ? ` — top "${top?.dimensionValues?.[0]?.value}" sessions=${top?.metricValues?.[0]?.value}` : "")
    );
  } catch (e) {
    stamp("GA4", e.message.includes("not set") ? "SKIP" : "FAIL", e.message);
  }

  const failed = results.filter((r) => r.status === "FAIL");
  const skipped = results.filter((r) => r.status === "SKIP");
  console.log(
    `\n${failed.length === 0 ? "OK" : "DEGRADED"} — ${results.length - failed.length - skipped.length} reachable, ${skipped.length} skipped, ${failed.length} failed`
  );
  if (failed.length) console.log("  (a failed source degrades the detectors that depend on it; the scout still runs the rest.)");
  process.exit(failed.length === 0 ? 0 : 1);
}

if (process.argv.includes("--probe")) {
  probe().catch((e) => {
    console.error(e);
    process.exit(1);
  });
}
