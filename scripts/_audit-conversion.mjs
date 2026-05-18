#!/usr/bin/env node
/* eslint-disable no-console */
// Conversion audit — queries Supabase + GA4 to report on the new conversion
// suite (peak alerts + savelist gate + existing newsletter). Output is
// a markdown summary suitable for /data/research/.
//
// Run:
//   node scripts/_audit-conversion.mjs
//   node scripts/_audit-conversion.mjs --write   (writes data/research/conversion-report-YYYY-MM-DD.md)
//   node scripts/_audit-conversion.mjs --days 7  (override window, default 14)

import path from "node:path";
import { writeFileSync, mkdirSync } from "node:fs";
import process from "node:process";

const ROOT = path.resolve(import.meta.dirname, "..");
const { config: dotenvConfig } = await import("dotenv");
dotenvConfig({ path: path.join(ROOT, "apps", "web", ".env.local") });

const args = process.argv.slice(2);
const shouldWrite = args.includes("--write");
const daysIdx = args.indexOf("--days");
const WINDOW_DAYS = daysIdx >= 0 ? parseInt(args[daysIdx + 1], 10) : 14;

const PROP = process.env.GA4_PROPERTY_ID;
if (process.env.GOOGLE_APPLICATION_CREDENTIALS && !process.env.GOOGLE_APPLICATION_CREDENTIALS.startsWith("/")) {
  process.env.GOOGLE_APPLICATION_CREDENTIALS = path.resolve(ROOT, process.env.GOOGLE_APPLICATION_CREDENTIALS);
}

const { createClient } = await import("@supabase/supabase-js");
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const windowStart = new Date(Date.now() - WINDOW_DAYS * 86400000).toISOString();
const todayIso = new Date().toISOString().slice(0, 10);

const lines = [];
const log = (s = "") => lines.push(s);

log(`# Conversion audit — ${todayIso} (last ${WINDOW_DAYS}d)\n`);

// ─── Newsletter subscribers ──────────────────────────────────────
const { count: totalSubs } = await supabase
  .from("newsletter_subscribers")
  .select("*", { count: "exact", head: true });
const { count: confirmedSubs } = await supabase
  .from("newsletter_subscribers")
  .select("*", { count: "exact", head: true })
  .not("confirmed_at", "is", null)
  .is("unsubscribed_at", null);
const { count: windowSubs } = await supabase
  .from("newsletter_subscribers")
  .select("*", { count: "exact", head: true })
  .gte("subscribed_at", windowStart);
const { count: windowConfirmed } = await supabase
  .from("newsletter_subscribers")
  .select("*", { count: "exact", head: true })
  .gte("subscribed_at", windowStart)
  .not("confirmed_at", "is", null);
const { count: savelistSubs } = await supabase
  .from("newsletter_subscribers")
  .select("*", { count: "exact", head: true })
  .contains("tags", ["savelist"]);
const { count: peakAlertsTagged } = await supabase
  .from("newsletter_subscribers")
  .select("*", { count: "exact", head: true })
  .contains("tags", ["peak_alerts"]);

log("## Newsletter subscribers\n");
log(`| Metric | Count |`);
log(`|---|---:|`);
log(`| Total rows | ${totalSubs ?? 0} |`);
log(`| Active confirmed | ${confirmedSubs ?? 0} |`);
log(`| New (last ${WINDOW_DAYS}d) | ${windowSubs ?? 0} |`);
log(`| New + confirmed (last ${WINDOW_DAYS}d) | ${windowConfirmed ?? 0} |`);
log(`| Tagged 'savelist' (lifetime) | ${savelistSubs ?? 0} |`);
log(`| Tagged 'peak_alerts' (lifetime) | ${peakAlertsTagged ?? 0} |`);
log();

// ─── Subs by source (last window) ─────────────────────────────────
const { data: sourceRows } = await supabase
  .from("newsletter_subscribers")
  .select("source")
  .gte("subscribed_at", windowStart);
const sourceCounts = new Map();
for (const r of sourceRows ?? []) {
  const s = (r.source ?? "?").toString();
  sourceCounts.set(s, (sourceCounts.get(s) ?? 0) + 1);
}
const sourceSorted = [...sourceCounts.entries()].sort((a, b) => b[1] - a[1]);

log(`## Newsletter subs by source (last ${WINDOW_DAYS}d)\n`);
if (sourceSorted.length === 0) {
  log("*(no new subs in window)*");
} else {
  log(`| Source | Count |`);
  log(`|---|---:|`);
  for (const [src, n] of sourceSorted) log(`| \`${src}\` | ${n} |`);
}
log();

// ─── Destination alerts ──────────────────────────────────────────
const { count: alertTotal } = await supabase
  .from("destination_alerts")
  .select("*", { count: "exact", head: true });
const { count: alertConfirmed } = await supabase
  .from("destination_alerts")
  .select("*", { count: "exact", head: true })
  .not("confirmed_at", "is", null)
  .is("unsubscribed_at", null);
const { count: alertWindow } = await supabase
  .from("destination_alerts")
  .select("*", { count: "exact", head: true })
  .gte("created_at", windowStart);
const { count: alertSentLifetime } = await supabase
  .from("destination_alerts")
  .select("*", { count: "exact", head: true })
  .not("last_sent_at", "is", null);

log("## Destination peak alerts\n");
log(`| Metric | Count |`);
log(`|---|---:|`);
log(`| Total rows | ${alertTotal ?? 0} |`);
log(`| Active confirmed | ${alertConfirmed ?? 0} |`);
log(`| New (last ${WINDOW_DAYS}d) | ${alertWindow ?? 0} |`);
log(`| Sent at least once (lifetime) | ${alertSentLifetime ?? 0} |`);
log();

// ─── Top destinations by alert subs ──────────────────────────────
const { data: alertDestRows } = await supabase
  .from("destination_alerts")
  .select("destination_id")
  .not("confirmed_at", "is", null)
  .is("unsubscribed_at", null);
const destCounts = new Map();
for (const r of alertDestRows ?? []) {
  destCounts.set(r.destination_id, (destCounts.get(r.destination_id) ?? 0) + 1);
}
const topDests = [...destCounts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 20);

log(`## Top destinations by alert subscribers\n`);
if (topDests.length === 0) {
  log("*(no confirmed alert subscribers yet)*");
} else {
  log(`| Rank | Destination | Confirmed subs |`);
  log(`|---:|---|---:|`);
  topDests.forEach(([id, n], i) => log(`| ${i + 1} | ${id} | ${n} |`));
}
log();

// ─── GA4 events (last window) ────────────────────────────────────
if (PROP) {
  try {
    const { BetaAnalyticsDataClient } = await import("@google-analytics/data");
    const ga = new BetaAnalyticsDataClient();
    const daysAgo = (n) => { const d = new Date(); d.setUTCDate(d.getUTCDate() - n); return d.toISOString().slice(0, 10); };
    const today = () => new Date().toISOString().slice(0, 10);

    const wanted = [
      "destination_alert_view",
      "destination_alert_attempt",
      "destination_alert_success",
      "save_prompt_view",
      "save_prompt_attempt",
      "save_prompt_success",
      "email_signup",
    ];

    const [resp] = await ga.runReport({
      property: `properties/${PROP}`,
      dimensions: [{ name: "eventName" }, { name: "isKeyEvent" }],
      metrics: [{ name: "eventCount" }, { name: "totalUsers" }],
      dateRanges: [{ startDate: daysAgo(WINDOW_DAYS), endDate: today() }],
      orderBys: [{ metric: { metricName: "eventCount" }, desc: true }],
      limit: 200,
    });

    const eventCounts = new Map();
    for (const r of resp.rows ?? []) {
      const name = r.dimensionValues[0].value;
      const isKey = r.dimensionValues[1].value === "true";
      const count = Number(r.metricValues[0].value);
      const users = Number(r.metricValues[1].value);
      const prev = eventCounts.get(name) ?? { count: 0, users: 0, isKey };
      prev.count += count;
      prev.users += users;
      prev.isKey = prev.isKey || isKey;
      eventCounts.set(name, prev);
    }

    log(`## GA4 conversion events (last ${WINDOW_DAYS}d, all users incl. bots)\n`);
    log(`| Event | Key? | Count | Users |`);
    log(`|---|:---:|---:|---:|`);
    for (const name of wanted) {
      const e = eventCounts.get(name);
      if (!e) {
        log(`| \`${name}\` | — | 0 | 0 |`);
      } else {
        log(`| \`${name}\` | ${e.isKey ? "✓" : "—"} | ${e.count.toLocaleString()} | ${e.users.toLocaleString()} |`);
      }
    }
    log();

    // Conversion funnel: view → attempt → success per surface
    const alertView = eventCounts.get("destination_alert_view")?.count ?? 0;
    const alertAttempt = eventCounts.get("destination_alert_attempt")?.count ?? 0;
    const alertSuccess = eventCounts.get("destination_alert_success")?.count ?? 0;
    const promptView = eventCounts.get("save_prompt_view")?.count ?? 0;
    const promptAttempt = eventCounts.get("save_prompt_attempt")?.count ?? 0;
    const promptSuccess = eventCounts.get("save_prompt_success")?.count ?? 0;

    const pct = (a, b) => b > 0 ? `${((a / b) * 100).toFixed(2)}%` : "—";

    log(`## Funnel (view → attempt → success)\n`);
    log(`| Surface | Views | Attempts | Success | View→Attempt | Attempt→Success |`);
    log(`|---|---:|---:|---:|---:|---:|`);
    log(`| Peak alert hook | ${alertView} | ${alertAttempt} | ${alertSuccess} | ${pct(alertAttempt, alertView)} | ${pct(alertSuccess, alertAttempt)} |`);
    log(`| Save-list prompt | ${promptView} | ${promptAttempt} | ${promptSuccess} | ${pct(promptAttempt, promptView)} | ${pct(promptSuccess, promptAttempt)} |`);
    log();
  } catch (err) {
    log(`## GA4 conversion events\n`);
    log(`*GA4 query failed: ${err.message}*\n`);
  }
} else {
  log(`## GA4 conversion events\n`);
  log(`*GA4_PROPERTY_ID not set — skipping GA4 section.*\n`);
}

log(`---\n_Generated ${new Date().toISOString()} by \`node scripts/_audit-conversion.mjs\`._`);

const output = lines.join("\n");

if (shouldWrite) {
  const outDir = path.join(ROOT, "data", "research");
  mkdirSync(outDir, { recursive: true });
  const outPath = path.join(outDir, `conversion-report-${todayIso}.md`);
  writeFileSync(outPath, output);
  console.log(`→ wrote ${outPath}`);
} else {
  console.log(output);
}
