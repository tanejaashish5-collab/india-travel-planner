#!/usr/bin/env node
/* eslint-disable no-console */
// scripts/ga4-daily-audit.mjs — daily GA4 audit, the GA4 counterpart to the
// daily GSC audit in gsc-audits/.
//
// Self-contained: pulls GA4, computes day-over-day deltas from the previous
// audit, applies interpretation rules (Wins / Concerns / Priority actions),
// and writes ga4-audits/ga4-audit-YYYY-MM-DD.md.
//
// No browser, no LLM in the loop — runs purely off the GA4 service account,
// so unlike the GSC audit it can't fail on a disconnected Chrome extension.
//
// Run:   node scripts/ga4-daily-audit.mjs
// Cron:  scheduled daily (see CronCreate routine "ga4-daily-audit").
//
// Each audit file embeds an <!-- AUDIT_DATA {json} --> block so the next
// run can read exact prior numbers instead of regex-ing prose.

import path from "node:path";
import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync } from "node:fs";
import process from "node:process";

const ROOT = path.resolve(import.meta.dirname, "..");
const { config: dotenvConfig } = await import("dotenv");
dotenvConfig({ path: path.join(ROOT, "apps", "web", ".env.local") });
dotenvConfig({ path: path.join(ROOT, ".env.local") });

const PROP = process.env.GA4_PROPERTY_ID;
if (!PROP) {
  console.error("ERR: GA4_PROPERTY_ID not set");
  process.exit(1);
}
let creds = process.env.GOOGLE_APPLICATION_CREDENTIALS;
if (creds && (creds.startsWith("./") || creds.startsWith("../"))) {
  process.env.GOOGLE_APPLICATION_CREDENTIALS = path.resolve(ROOT, creds);
}

const AUDIT_DIR = path.join(ROOT, "ga4-audits");
const WINDOW_DAYS = 7; // rolling 7-day window, matches the GSC daily audit

// ── GA4 client ───────────────────────────────────────────────────
const { BetaAnalyticsDataClient } = await import("@google-analytics/data");
const ga = new BetaAnalyticsDataClient();

// Dates are computed in IST (UTC+5:30) — the project-wide convention
// (AGENTS.md: "current month must come from @itp/shared"). Using UTC here
// caused the audit filename to lag the GSC audit by a day for ~10h every
// day and silently overwrite the prior file. Shift the clock by +5:30 then
// read the UTC calendar fields → that yields the IST calendar date.
function istNow() {
  return new Date(Date.now() + 5.5 * 60 * 60 * 1000);
}
function daysAgo(n) {
  const d = istNow();
  d.setUTCDate(d.getUTCDate() - n);
  return d.toISOString().slice(0, 10);
}
const today = () => istNow().toISOString().slice(0, 10);

async function runReport(opts) {
  const [resp] = await ga.runReport({ property: `properties/${PROP}`, ...opts });
  return resp.rows ?? [];
}

// ── Pull metrics ─────────────────────────────────────────────────
const dateRange = [{ startDate: daysAgo(WINDOW_DAYS), endDate: today() }];

// 1) Channel breakdown — sessions/engaged/events per channel group
const channelRows = await runReport({
  dimensions: [{ name: "sessionDefaultChannelGroup" }],
  metrics: [
    { name: "sessions" }, { name: "engagedSessions" },
    { name: "keyEvents" }, { name: "averageSessionDuration" },
  ],
  dateRanges: dateRange,
});
const channels = {};
for (const r of channelRows) {
  channels[r.dimensionValues[0].value] = {
    sessions: Number(r.metricValues[0].value),
    engaged: Number(r.metricValues[1].value),
    keyEvents: Number(r.metricValues[2].value),
    avgDuration: Number(r.metricValues[3].value),
  };
}
const organic = channels["Organic Search"] ?? { sessions: 0, engaged: 0, keyEvents: 0, avgDuration: 0 };
const referral = channels["Referral"] ?? { sessions: 0, engaged: 0, keyEvents: 0, avgDuration: 0 };
const direct = channels["Direct"] ?? { sessions: 0, engaged: 0, keyEvents: 0, avgDuration: 0 };
const social = channels["Organic Social"] ?? { sessions: 0, engaged: 0, keyEvents: 0, avgDuration: 0 };
const totalSessions = Object.values(channels).reduce((s, c) => s + c.sessions, 0);
const botPct = totalSessions > 0 ? (direct.sessions / totalSessions) * 100 : 0;
const humanSessions = organic.sessions + referral.sessions;

// 2) India engaged + avg duration (non-Direct only)
const countryRows = await runReport({
  dimensions: [{ name: "country" }],
  metrics: [{ name: "engagedSessions" }, { name: "averageSessionDuration" }],
  dateRanges: dateRange,
  dimensionFilter: {
    notExpression: {
      filter: { fieldName: "sessionDefaultChannelGroup", stringFilter: { value: "Direct" } },
    },
  },
  orderBys: [{ metric: { metricName: "engagedSessions" }, desc: true }],
  limit: 5,
});
let indiaEngaged = 0, indiaAvgSec = 0;
for (const r of countryRows) {
  if (r.dimensionValues[0].value === "India") {
    indiaEngaged = Number(r.metricValues[0].value);
    indiaAvgSec = Math.round(Number(r.metricValues[1].value));
  }
}

// 3) AI referrals (chatgpt / perplexity / gemini / copilot)
const aiRows = await runReport({
  dimensions: [{ name: "sessionSource" }],
  metrics: [{ name: "sessions" }, { name: "engagedSessions" }],
  dateRanges: dateRange,
  limit: 100,
});
let aiSessions = 0, aiEngaged = 0;
const aiBreakdown = {};
for (const r of aiRows) {
  const src = (r.dimensionValues[0].value || "").toLowerCase();
  if (/chatgpt|perplexity|gemini|copilot|claude/.test(src)) {
    const s = Number(r.metricValues[0].value);
    aiSessions += s;
    aiEngaged += Number(r.metricValues[1].value);
    aiBreakdown[src] = (aiBreakdown[src] ?? 0) + s;
  }
}

// 4) Top human pages (engaged, excludes Direct)
const pageRows = await runReport({
  dimensions: [{ name: "pagePath" }],
  metrics: [{ name: "engagedSessions" }, { name: "averageSessionDuration" }],
  dateRanges: dateRange,
  dimensionFilter: {
    notExpression: {
      filter: { fieldName: "sessionDefaultChannelGroup", stringFilter: { value: "Direct" } },
    },
  },
  orderBys: [{ metric: { metricName: "engagedSessions" }, desc: true }],
  limit: 10,
});
const topPages = pageRows.map((r) => ({
  page: r.dimensionValues[0].value,
  engaged: Number(r.metricValues[0].value),
  avgSec: Math.round(Number(r.metricValues[1].value)),
}));

// 5) Conversion + key events
const eventRows = await runReport({
  dimensions: [{ name: "eventName" }],
  metrics: [{ name: "eventCount" }],
  dateRanges: dateRange,
  dimensionFilter: {
    filter: {
      fieldName: "eventName",
      inListFilter: {
        values: [
          "destination_alert_view", "save_destination",
          "save_prompt_view", "save_prompt_attempt", "save_prompt_success",
          "email_signup",
        ],
      },
    },
  },
});
const events = {};
for (const r of eventRows) events[r.dimensionValues[0].value] = Number(r.metricValues[0].value);
const ev = (n) => events[n] ?? 0;

// ── Load previous audit for deltas ───────────────────────────────
function loadPrevAudit() {
  if (!existsSync(AUDIT_DIR)) return null;
  const files = readdirSync(AUDIT_DIR)
    .filter((f) => /^ga4-audit-\d{4}-\d{2}-\d{2}\.md$/.test(f))
    .sort()
    .reverse();
  for (const f of files) {
    if (f === `ga4-audit-${today()}.md`) continue; // skip today's own file
    const txt = readFileSync(path.join(AUDIT_DIR, f), "utf8");
    const m = txt.match(/<!-- AUDIT_DATA (\{.*?\}) -->/s);
    if (m) {
      try { return { date: f.slice(10, 20), data: JSON.parse(m[1]) }; }
      catch { /* corrupt block — keep looking */ }
    }
  }
  return null;
}
const prev = loadPrevAudit();

// ── Delta helper ─────────────────────────────────────────────────
function delta(now, then) {
  if (then == null || then === undefined) return { txt: "—", pct: null };
  const diff = now - then;
  if (then === 0) return { txt: diff === 0 ? "flat" : `+${diff} (new)`, pct: null };
  const pct = (diff / then) * 100;
  const sign = diff > 0 ? "+" : "";
  return { txt: `${sign}${diff} (${sign}${pct.toFixed(0)}%)`, pct };
}

const cur = {
  organicSessions: organic.sessions,
  organicEngaged: organic.engaged,
  organicEngRate: organic.sessions > 0 ? (organic.engaged / organic.sessions) * 100 : 0,
  humanSessions,
  indiaEngaged,
  indiaAvgSec,
  aiSessions,
  botPct,
  directSessions: direct.sessions,
  alertView: ev("destination_alert_view"),
  saveDestination: ev("save_destination"),
  savePromptView: ev("save_prompt_view"),
  savePromptAttempt: ev("save_prompt_attempt"),
  savePromptSuccess: ev("save_prompt_success"),
  emailSignup: ev("email_signup"),
};
const p = prev?.data ?? {};

// ── Interpretation rules ─────────────────────────────────────────
const wins = [];
const concerns = [];
const actions = [];

const dOrgSess = delta(cur.organicSessions, p.organicSessions);
if (dOrgSess.pct != null && dOrgSess.pct >= 5) wins.push(`Organic Search sessions up ${dOrgSess.txt} — real discovery growing.`);
if (dOrgSess.pct != null && dOrgSess.pct <= -10) concerns.push(`Organic Search sessions down ${dOrgSess.txt}. Investigate — ranking slip or seasonality?`);

const dIndiaSec = delta(cur.indiaAvgSec, p.indiaAvgSec);
if (dIndiaSec.pct != null && dIndiaSec.pct >= 10) wins.push(`India avg engagement up ${dIndiaSec.txt} (${cur.indiaAvgSec}s) — deeper reads.`);
if (dIndiaSec.pct != null && dIndiaSec.pct <= -15) concerns.push(`India avg engagement down ${dIndiaSec.txt} (${cur.indiaAvgSec}s). Content or speed regression?`);
if (cur.indiaAvgSec >= 120) wins.push(`India avg engagement ${cur.indiaAvgSec}s — well above the 60s healthy bar.`);

const dAi = delta(cur.aiSessions, p.aiSessions);
if (dAi.pct != null && dAi.pct >= 10) wins.push(`AI-search referrals up ${dAi.txt} (${cur.aiSessions} sessions) — citation pipeline compounding.`);
if (dAi.pct != null && dAi.pct <= -20) concerns.push(`AI-search referrals down ${dAi.txt}. Check ChatGPT/Perplexity citation coverage.`);

if (cur.botPct >= 90) concerns.push(`Bot mass at ${cur.botPct.toFixed(0)}% of sessions (Direct channel). Reporting needs the "Real Humans" GA4 audience filter.`);

// Owned-audience funnel health. The peak-alert hook was converted from an email
// form to a one-tap Save CTA on 2026-05-28 (commit 87f5118e) — it now fires
// `save_destination`, NOT `destination_alert_attempt`. So measure view→save, then
// the downstream save→email prompt. (alert_attempt/alert_success are dead events,
// no longer pulled — measuring them produced a daily false "0% conversion" alarm.)
const saveRate = cur.alertView > 0 ? (cur.saveDestination / cur.alertView) * 100 : 0;
if (cur.saveDestination > 0) {
  wins.push(`Save CTA converting — ${cur.saveDestination} destination saves in window${cur.alertView > 0 ? ` (${saveRate.toFixed(0)}% of ${cur.alertView} peak-alert views)` : ""}.`);
} else if (cur.alertView >= 50 && cur.saveDestination === 0) {
  concerns.push(`Peak-alert Save CTA: ${cur.alertView} views, 0 saves. The one-tap save isn't converting — verify the button renders on the money pages if this holds 3+ days.`);
  actions.push(`Peak-alert Save CTA at 0 saves on ${cur.alertView} views. Confirm the save button + contextual headline render; if still 0 after 3 days, iterate the save pitch — not another email A/B.`);
}
if (cur.savePromptSuccess > 0) {
  wins.push(`Owned-audience capture live — ${cur.savePromptSuccess} email(s) from the save-list prompt.`);
} else if (cur.saveDestination >= 10 && cur.savePromptView === 0) {
  concerns.push(`${cur.saveDestination} saves but 0 save-list prompts shown — the save→email prompt (fires at 2 saves) may not be triggering. Verify SaveListEmailPrompt.`);
}
if (cur.emailSignup > 1000) {
  concerns.push(`email_signup at ${cur.emailSignup.toLocaleString()} events — still bot-inflated (UA bot-guard doesn't stop real-Chrome bots). Needs a scroll/interaction gate or a GA4 data filter.`);
  actions.push(`email_signup bot inflation persists (${cur.emailSignup.toLocaleString()}). Add an IntersectionObserver/interaction gate like the alert hook has, OR configure the GA4 Admin "Real Humans" filter.`);
}

if (wins.length === 0) wins.push("No threshold-crossing wins this run — metrics steady.");
if (concerns.length === 0) concerns.push("No threshold-crossing concerns this run.");
if (actions.length === 0) actions.push("No new priority action — keep monitoring the conversion funnel.");

// ── Build markdown ───────────────────────────────────────────────
const prevLabel = prev ? `${prev.date} prev` : "—";
const fmtPct = (n) => `${n.toFixed(1)}%`;
const out = [];
const L = (s = "") => out.push(s);

L(`# GA4 Audit — ${today()}`);
L("");
L(`Property: GA4 \`${PROP}\` · Window: rolling ${WINDOW_DAYS} days (${daysAgo(WINDOW_DAYS)} – ${today()})`);
L(`Generated by \`node scripts/ga4-daily-audit.mjs\` — the GA4 counterpart to the daily GSC audit.`);
L("");
L(`> All figures EXCLUDE the Direct channel (95%+ bots) unless explicitly labelled. "Human" = Organic Search + Referral.`);
L("");

L(`## Real humans — ${WINDOW_DAYS}-day totals`);
L("");
L(`| Metric | Today | ${prevLabel} | Δ |`);
L(`|---|---:|---:|---|`);
L(`| Organic Search sessions | ${cur.organicSessions} | ${p.organicSessions ?? "—"} | ${delta(cur.organicSessions, p.organicSessions).txt} |`);
L(`| Organic Search engagement rate | ${fmtPct(cur.organicEngRate)} | ${p.organicEngRate != null ? fmtPct(p.organicEngRate) : "—"} | ${delta(Math.round(cur.organicEngRate), p.organicEngRate != null ? Math.round(p.organicEngRate) : null).txt} |`);
L(`| Human sessions (Organic + Referral) | ${cur.humanSessions} | ${p.humanSessions ?? "—"} | ${delta(cur.humanSessions, p.humanSessions).txt} |`);
L(`| India engaged sessions | ${cur.indiaEngaged} | ${p.indiaEngaged ?? "—"} | ${delta(cur.indiaEngaged, p.indiaEngaged).txt} |`);
L(`| India avg engagement (sec) | ${cur.indiaAvgSec} | ${p.indiaAvgSec ?? "—"} | ${delta(cur.indiaAvgSec, p.indiaAvgSec).txt} |`);
L(`| AI-search referrals (sessions) | ${cur.aiSessions} | ${p.aiSessions ?? "—"} | ${delta(cur.aiSessions, p.aiSessions).txt} |`);
L(`| Bot share of all sessions | ${fmtPct(cur.botPct)} | ${p.botPct != null ? fmtPct(p.botPct) : "—"} | ${delta(Math.round(cur.botPct), p.botPct != null ? Math.round(p.botPct) : null).txt} |`);
L("");

L(`## AI-search referral breakdown`);
L("");
if (Object.keys(aiBreakdown).length === 0) {
  L(`*(no AI-search referrals in window)*`);
} else {
  L(`| Source | Sessions |`);
  L(`|---|---:|`);
  for (const [src, n] of Object.entries(aiBreakdown).sort((a, b) => b[1] - a[1])) {
    L(`| ${src} | ${n} |`);
  }
  L("");
  L(`Total AI-referred: ${aiSessions} sessions, ${aiEngaged} engaged.`);
}
L("");

L(`## Top human pages (engaged sessions, excludes Direct)`);
L("");
L(`| # | Page | Engaged | Avg sec |`);
L(`|---:|---|---:|---:|`);
topPages.forEach((pg, i) => {
  const disp = pg.page.length > 52 ? pg.page.slice(0, 49) + "..." : pg.page;
  L(`| ${i + 1} | \`${disp}\` | ${pg.engaged} | ${pg.avgSec} |`);
});
L("");

L(`## Conversion suite (key events, ${WINDOW_DAYS}-day)`);
L("");
L(`> Peak-alert hook is a one-tap **Save** CTA since 2026-05-28 — it fires \`save_destination\`, not \`_attempt\`. Funnel: alert_view → save_destination → (at 2 saves) save_prompt → email.`);
L("");
L(`| Event | Today | ${prevLabel} | Δ |`);
L(`|---|---:|---:|---|`);
L(`| destination_alert_view (hook impressions) | ${cur.alertView} | ${p.alertView ?? "—"} | ${delta(cur.alertView, p.alertView).txt} |`);
L(`| save_destination (hook conversion) | ${cur.saveDestination} | ${p.saveDestination ?? "—"} | ${delta(cur.saveDestination, p.saveDestination).txt} |`);
L(`| save_prompt_view | ${cur.savePromptView} | ${p.savePromptView ?? "—"} | ${delta(cur.savePromptView, p.savePromptView).txt} |`);
L(`| save_prompt_success (email captured) | ${cur.savePromptSuccess} | ${p.savePromptSuccess ?? "—"} | ${delta(cur.savePromptSuccess, p.savePromptSuccess).txt} |`);
L(`| email_signup (legacy, bot-prone) | ${cur.emailSignup.toLocaleString()} | ${p.emailSignup != null ? p.emailSignup.toLocaleString() : "—"} | ${delta(cur.emailSignup, p.emailSignup).txt} |`);
L("");

L(`## Wins`);
L("");
for (const w of wins) L(`- ${w}`);
L("");

L(`## Concerns`);
L("");
for (const c of concerns) L(`- ${c}`);
L("");

L(`## Priority actions`);
L("");
actions.forEach((a, i) => L(`${i + 1}. ${a}`));
L("");

L(`## Channel funnel (incl. bots, for reference)`);
L("");
L(`| Channel | Sessions | Engaged | Eng% | Key events |`);
L(`|---|---:|---:|---:|---:|`);
for (const [name, c] of Object.entries(channels).sort((a, b) => b[1].sessions - a[1].sessions)) {
  const er = c.sessions > 0 ? fmtPct((c.engaged / c.sessions) * 100) : "—";
  L(`| ${name} | ${c.sessions.toLocaleString()} | ${c.engaged.toLocaleString()} | ${er} | ${c.keyEvents.toLocaleString()} |`);
}
L("");

L(`---`);
L(`_Generated ${new Date().toISOString()}. Next run compares to today's numbers._`);
L("");

// Machine-readable block for the next run's deltas
const auditData = {
  date: today(),
  organicSessions: cur.organicSessions,
  organicEngaged: cur.organicEngaged,
  organicEngRate: Number(cur.organicEngRate.toFixed(1)),
  humanSessions: cur.humanSessions,
  indiaEngaged: cur.indiaEngaged,
  indiaAvgSec: cur.indiaAvgSec,
  aiSessions: cur.aiSessions,
  botPct: Number(cur.botPct.toFixed(1)),
  directSessions: cur.directSessions,
  alertView: cur.alertView,
  saveDestination: cur.saveDestination,
  savePromptView: cur.savePromptView,
  savePromptSuccess: cur.savePromptSuccess,
  emailSignup: cur.emailSignup,
};
L(`<!-- AUDIT_DATA ${JSON.stringify(auditData)} -->`);

// ── Write ────────────────────────────────────────────────────────
mkdirSync(AUDIT_DIR, { recursive: true });
const outPath = path.join(AUDIT_DIR, `ga4-audit-${today()}.md`);
writeFileSync(outPath, out.join("\n"));
console.log(`✓ wrote ${path.relative(ROOT, outPath)}`);
console.log(`  ${cur.organicSessions} organic sessions · India ${cur.indiaEngaged} engaged @ ${cur.indiaAvgSec}s · ${cur.aiSessions} AI referrals · bot share ${cur.botPct.toFixed(0)}%`);
console.log(`  wins: ${wins.length} · concerns: ${concerns.length} · actions: ${actions.length}`);
