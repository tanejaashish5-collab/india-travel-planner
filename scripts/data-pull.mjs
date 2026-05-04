#!/usr/bin/env node
/* eslint-disable no-console */
// scripts/data-pull.mjs — single CLI for pulling actionable signal from
// GA4 + Google Search Console.
//
// Designed to surface ONLY decisions, not noise. Every query answers a
// "what should I do next" question, not a vanity metric.
//
// Usage:
//   node scripts/data-pull.mjs ga4 <query>     # one GA4 query
//   node scripts/data-pull.mjs gsc <query>     # one GSC query
//   node scripts/data-pull.mjs baseline        # run all queries + write report
//   node scripts/data-pull.mjs list            # list available queries
//
// Queries (GA4):
//   human-pages       Top 20 pages by engaged sessions (excludes Direct = bot mass)
//   bounces           Pages humans land on then leave — broken first-impression list
//   aio-referrals     Sessions where aio_referral CD is set (ChatGPT/Perplexity-driven)
//   geo-humans        Country split filtered to engaged sessions
//   funnel            Trip-board → ColdStart → AI itinerary → email signup conversion
//
// Queries (GSC):
//   low-ctr           Queries with high impressions, CTR < 2% — title/meta CRO targets
//   almost-page1      Queries ranking 4-15 — highest-leverage SEO targets
//   page1-low-ctr     Queries ranking 1-3 with low CTR — SERP-feature opportunities
//   top-pages         Top 30 pages by clicks
//   lost-ground       Pages that lost positions vs prior 28d
//
// Auth: uses GOOGLE_APPLICATION_CREDENTIALS pointing to a service account JSON
// with Viewer on the GA4 property and Restricted on the GSC property.

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import path from "node:path";
import process from "node:process";

const ROOT = path.resolve(import.meta.dirname, "..");

const { config: dotenvConfig } = await import("dotenv");
dotenvConfig({ path: path.join(ROOT, "apps", "web", ".env.local") });
dotenvConfig({ path: path.join(ROOT, ".env.local") });

const GA4_PROPERTY_ID = process.env.GA4_PROPERTY_ID;
const GSC_SITE_URL = process.env.GSC_SITE_URL;
const CREDS = process.env.GOOGLE_APPLICATION_CREDENTIALS;

if (!CREDS) {
  console.error("ERR: GOOGLE_APPLICATION_CREDENTIALS not set in .env.local");
  process.exit(1);
}

// Resolve relative credential path (env stores ./.secrets/...)
if (CREDS.startsWith("./") || CREDS.startsWith("../")) {
  process.env.GOOGLE_APPLICATION_CREDENTIALS = path.resolve(ROOT, CREDS);
}

const args = process.argv.slice(2);
const cmd = args[0] ?? "list";
const sub = args[1];
const window = args[2] ?? "28d";

// ─── Date helpers ─────────────────────────────────────────────────────────
function daysAgo(n) {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() - n);
  return d.toISOString().slice(0, 10);
}
function today() {
  return new Date().toISOString().slice(0, 10);
}
function parseWindow(w) {
  const m = w.match(/^(\d+)d$/);
  if (!m) throw new Error(`Bad window: ${w} (use 7d, 28d, 90d)`);
  return parseInt(m[1], 10);
}

// ─── Output formatting ────────────────────────────────────────────────────
function pad(s, n) { return String(s).padEnd(n).slice(0, n); }
function lpad(s, n) { return String(s).padStart(n).slice(0, n); }

function table(rows, columns) {
  if (!rows.length) {
    return "  (no rows)";
  }
  const widths = columns.map((c) => Math.max(c.label.length, ...rows.map((r) => String(r[c.key] ?? "").length)));
  const head = "  " + columns.map((c, i) => (c.align === "right" ? lpad : pad)(c.label, widths[i])).join("  ");
  const sep = "  " + widths.map((w) => "─".repeat(w)).join("  ");
  const body = rows.map((r) => "  " + columns.map((c, i) => (c.align === "right" ? lpad : pad)(r[c.key] ?? "", widths[i])).join("  "));
  return [head, sep, ...body].join("\n");
}

function mdTable(rows, columns) {
  if (!rows.length) return "*(no rows)*";
  const head = "| " + columns.map((c) => c.label).join(" | ") + " |";
  const sep = "| " + columns.map((c) => (c.align === "right" ? "---:" : "---")).join(" | ") + " |";
  const body = rows.map((r) => "| " + columns.map((c) => String(r[c.key] ?? "").replace(/\|/g, "\\|")).join(" | ") + " |");
  return [head, sep, ...body].join("\n");
}

// ─── GA4 client ───────────────────────────────────────────────────────────
let _ga;
async function ga() {
  if (_ga) return _ga;
  if (!GA4_PROPERTY_ID) throw new Error("GA4_PROPERTY_ID not set");
  const { BetaAnalyticsDataClient } = await import("@google-analytics/data");
  _ga = new BetaAnalyticsDataClient();
  return _ga;
}

async function ga4Run({ dimensions, metrics, dateRanges, dimensionFilter, orderBys, limit, name }) {
  const client = await ga();
  const [resp] = await client.runReport({
    property: `properties/${GA4_PROPERTY_ID}`,
    dimensions: dimensions.map((n) => ({ name: n })),
    metrics: metrics.map((n) => ({ name: n })),
    dateRanges,
    ...(dimensionFilter ? { dimensionFilter } : {}),
    ...(orderBys ? { orderBys } : {}),
    ...(limit ? { limit } : {}),
  });
  const rows = (resp.rows ?? []).map((r) => {
    const out = { _name: name };
    dimensions.forEach((d, i) => { out[d] = r.dimensionValues?.[i]?.value ?? ""; });
    metrics.forEach((m, i) => { out[m] = Number(r.metricValues?.[i]?.value ?? 0); });
    return out;
  });
  return rows;
}

// ─── GSC client ───────────────────────────────────────────────────────────
let _gsc;
async function gsc() {
  if (_gsc) return _gsc;
  if (!GSC_SITE_URL) throw new Error("GSC_SITE_URL not set");
  const { google } = await import("googleapis");
  const auth = new google.auth.GoogleAuth({
    scopes: ["https://www.googleapis.com/auth/webmasters.readonly"],
  });
  const authClient = await auth.getClient();
  _gsc = google.searchconsole({ version: "v1", auth: authClient });
  return _gsc;
}

async function gscQuery({ startDate, endDate, dimensions = ["query"], rowLimit = 100, dimensionFilterGroups }) {
  const client = await gsc();
  const { data } = await client.searchanalytics.query({
    siteUrl: GSC_SITE_URL,
    requestBody: {
      startDate, endDate, dimensions, rowLimit,
      ...(dimensionFilterGroups ? { dimensionFilterGroups } : {}),
    },
  });
  return data.rows ?? [];
}

// ═══════════════════════════════════════════════════════════════════════════
// GA4 QUERIES
// ═══════════════════════════════════════════════════════════════════════════

const GA4_QUERIES = {
  "human-pages": {
    title: "Top 20 pages by engaged-session humans",
    why: "What's actually working. Pages real humans engaged with — not bot-driven Direct traffic. Invest in similar content; copy what wins.",
    days: 28,
    async run(days) {
      // Engaged sessions filtered to channels where humans dominate.
      // Direct = 94% bots based on smoke test, so we EXCLUDE it.
      const rows = await ga4Run({
        dimensions: ["pagePath", "sessionDefaultChannelGroup"],
        metrics: ["engagedSessions", "totalUsers", "averageSessionDuration"],
        dateRanges: [{ startDate: daysAgo(days), endDate: today() }],
        dimensionFilter: {
          notExpression: {
            filter: { fieldName: "sessionDefaultChannelGroup", stringFilter: { value: "Direct" } },
          },
        },
        orderBys: [{ metric: { metricName: "engagedSessions" }, desc: true }],
        limit: 50,
      });
      // Aggregate across channels per page
      const byPage = new Map();
      for (const r of rows) {
        const k = r.pagePath;
        const prev = byPage.get(k) ?? { page: k, engaged: 0, users: 0, avg_duration_s: 0 };
        prev.engaged += r.engagedSessions;
        prev.users += r.totalUsers;
        prev.avg_duration_s = Math.max(prev.avg_duration_s, r.averageSessionDuration);
        byPage.set(k, prev);
      }
      return Array.from(byPage.values())
        .sort((a, b) => b.engaged - a.engaged)
        .slice(0, 20)
        .map((r) => ({
          page: r.page.length > 60 ? r.page.slice(0, 57) + "..." : r.page,
          engaged: r.engaged,
          users: r.users,
          avg_s: Math.round(r.avg_duration_s),
        }));
    },
    cols: [
      { key: "page", label: "Page", align: "left" },
      { key: "engaged", label: "Engaged", align: "right" },
      { key: "users", label: "Users", align: "right" },
      { key: "avg_s", label: "Avg sec", align: "right" },
    ],
  },

  bounces: {
    title: "Pages humans land on then bounce (broken first-impression list)",
    why: "Landing pages where engaged-session rate is below 30%. These are the highest-ROI pages to fix — humans wanted to be there, the page failed them.",
    days: 28,
    async run(days) {
      const rows = await ga4Run({
        dimensions: ["landingPagePlusQueryString", "sessionDefaultChannelGroup"],
        metrics: ["sessions", "engagedSessions"],
        dateRanges: [{ startDate: daysAgo(days), endDate: today() }],
        dimensionFilter: {
          notExpression: {
            filter: { fieldName: "sessionDefaultChannelGroup", stringFilter: { value: "Direct" } },
          },
        },
        limit: 200,
      });
      const byPage = new Map();
      for (const r of rows) {
        const k = r.landingPagePlusQueryString;
        const prev = byPage.get(k) ?? { page: k, sessions: 0, engaged: 0 };
        prev.sessions += r.sessions;
        prev.engaged += r.engagedSessions;
        byPage.set(k, prev);
      }
      return Array.from(byPage.values())
        .filter((r) => r.sessions >= 5)
        .map((r) => ({
          page: r.page.length > 60 ? r.page.slice(0, 57) + "..." : r.page,
          sessions: r.sessions,
          engaged: r.engaged,
          engaged_pct: Math.round(100 * r.engaged / r.sessions) + "%",
          _engaged_pct_num: 100 * r.engaged / r.sessions,
        }))
        .filter((r) => r._engaged_pct_num < 30)
        .sort((a, b) => b.sessions - a.sessions)
        .slice(0, 20)
        .map(({ _engaged_pct_num, ...rest }) => rest);
    },
    cols: [
      { key: "page", label: "Landing page", align: "left" },
      { key: "sessions", label: "Sessions", align: "right" },
      { key: "engaged", label: "Engaged", align: "right" },
      { key: "engaged_pct", label: "Engaged%", align: "right" },
    ],
  },

  "aio-referrals": {
    title: "Sessions referred from AI search (ChatGPT, Perplexity, Gemini)",
    why: "Real humans who came via AI citation. Strategic gold — the AIO pipeline working. Track week-over-week.",
    days: 28,
    async run(days) {
      // Look for sessions whose source matches AI search providers.
      // We use sessionSource because aio_referral CD may not be set on every session.
      const rows = await ga4Run({
        dimensions: ["sessionSource", "sessionMedium"],
        metrics: ["sessions", "engagedSessions", "totalUsers"],
        dateRanges: [{ startDate: daysAgo(days), endDate: today() }],
        limit: 200,
      });
      const aiPatterns = /^(chatgpt|chat\.openai|openai|perplexity|gemini\.google|bard|copilot|claude|you\.com|phind|brave\.search)/i;
      return rows
        .filter((r) => aiPatterns.test(r.sessionSource))
        .sort((a, b) => b.sessions - a.sessions)
        .slice(0, 20)
        .map((r) => ({
          source: r.sessionSource,
          medium: r.sessionMedium,
          sessions: r.sessions,
          engaged: r.engagedSessions,
          users: r.totalUsers,
        }));
    },
    cols: [
      { key: "source", label: "Source", align: "left" },
      { key: "medium", label: "Medium", align: "left" },
      { key: "sessions", label: "Sessions", align: "right" },
      { key: "engaged", label: "Engaged", align: "right" },
      { key: "users", label: "Users", align: "right" },
    ],
  },

  "geo-humans": {
    title: "Country split — engaged-session humans only",
    why: "Are we getting Indian humans (target audience for an India travel site) or just non-Indian curiosity? Acquisition gating decision.",
    days: 28,
    async run(days) {
      const rows = await ga4Run({
        dimensions: ["country"],
        metrics: ["engagedSessions", "totalUsers", "averageSessionDuration"],
        dateRanges: [{ startDate: daysAgo(days), endDate: today() }],
        dimensionFilter: {
          notExpression: {
            filter: { fieldName: "sessionDefaultChannelGroup", stringFilter: { value: "Direct" } },
          },
        },
        orderBys: [{ metric: { metricName: "engagedSessions" }, desc: true }],
        limit: 15,
      });
      return rows.map((r) => ({
        country: r.country,
        engaged: r.engagedSessions,
        users: r.totalUsers,
        avg_s: Math.round(r.averageSessionDuration),
      }));
    },
    cols: [
      { key: "country", label: "Country", align: "left" },
      { key: "engaged", label: "Engaged", align: "right" },
      { key: "users", label: "Users", align: "right" },
      { key: "avg_s", label: "Avg sec", align: "right" },
    ],
  },

  funnel: {
    title: "Conversion funnel — landing → engaged → key event",
    why: "Where humans drop off. Each step is a CRO target.",
    days: 28,
    async run(days) {
      const dim = ["sessionDefaultChannelGroup"];
      const metrics = ["sessions", "engagedSessions", "keyEvents"];
      const rows = await ga4Run({
        dimensions: dim,
        metrics,
        dateRanges: [{ startDate: daysAgo(days), endDate: today() }],
        orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
      });
      return rows.map((r) => ({
        channel: r.sessionDefaultChannelGroup,
        sessions: r.sessions,
        engaged: r.engagedSessions,
        engaged_pct: r.sessions ? Math.round(100 * r.engagedSessions / r.sessions) + "%" : "0%",
        key_events: r.keyEvents,
        events_per_session: r.sessions ? (r.keyEvents / r.sessions).toFixed(2) : "0",
      }));
    },
    cols: [
      { key: "channel", label: "Channel", align: "left" },
      { key: "sessions", label: "Sessions", align: "right" },
      { key: "engaged", label: "Engaged", align: "right" },
      { key: "engaged_pct", label: "Eng%", align: "right" },
      { key: "key_events", label: "Key evts", align: "right" },
      { key: "events_per_session", label: "Evts/sess", align: "right" },
    ],
  },
};

// ═══════════════════════════════════════════════════════════════════════════
// GSC QUERIES
// ═══════════════════════════════════════════════════════════════════════════

const GSC_QUERIES = {
  "low-ctr": {
    title: "High-impression queries with low CTR — title/meta CRO targets",
    why: "We're showing up but they're not clicking. Each row = a title or meta description rewrite that directly compounds to clicks. Sorted by impression volume.",
    days: 28,
    async run(days) {
      const rows = await gscQuery({
        startDate: daysAgo(days), endDate: today(),
        dimensions: ["query"], rowLimit: 200,
      });
      return rows
        .filter((r) => r.impressions >= 50 && r.ctr < 0.02)
        .sort((a, b) => b.impressions - a.impressions)
        .slice(0, 25)
        .map((r) => ({
          query: r.keys[0].length > 50 ? r.keys[0].slice(0, 47) + "..." : r.keys[0],
          impressions: r.impressions,
          clicks: r.clicks,
          ctr: (r.ctr * 100).toFixed(2) + "%",
          position: r.position.toFixed(1),
        }));
    },
    cols: [
      { key: "query", label: "Query", align: "left" },
      { key: "impressions", label: "Impr.", align: "right" },
      { key: "clicks", label: "Clicks", align: "right" },
      { key: "ctr", label: "CTR", align: "right" },
      { key: "position", label: "Avg pos", align: "right" },
    ],
  },

  "almost-page1": {
    title: "Queries ranking 4-15 — almost-on-page-1, highest-leverage SEO",
    why: "One position move from 11→9 doubles clicks. From 6→3 quadruples them. These queries are the closest revenue from existing content.",
    days: 28,
    async run(days) {
      const rows = await gscQuery({
        startDate: daysAgo(days), endDate: today(),
        dimensions: ["query", "page"], rowLimit: 500,
      });
      return rows
        .filter((r) => r.position >= 4 && r.position <= 15 && r.impressions >= 30)
        .sort((a, b) => b.impressions - a.impressions)
        .slice(0, 25)
        .map((r) => ({
          query: r.keys[0].length > 40 ? r.keys[0].slice(0, 37) + "..." : r.keys[0],
          page: r.keys[1].replace("https://www.nakshiq.com", "").slice(0, 45),
          impressions: r.impressions,
          clicks: r.clicks,
          position: r.position.toFixed(1),
        }));
    },
    cols: [
      { key: "query", label: "Query", align: "left" },
      { key: "page", label: "Page", align: "left" },
      { key: "impressions", label: "Impr.", align: "right" },
      { key: "clicks", label: "Clicks", align: "right" },
      { key: "position", label: "Avg pos", align: "right" },
    ],
  },

  "page1-low-ctr": {
    title: "Top-3 ranked queries with low CTR — SERP-feature opportunities",
    why: "We're ranking high but losing clicks to AIO/Featured Snippets/People-Also-Ask. Add structured data, FAQ schema, or HowTo to reclaim.",
    days: 28,
    async run(days) {
      const rows = await gscQuery({
        startDate: daysAgo(days), endDate: today(),
        dimensions: ["query", "page"], rowLimit: 500,
      });
      return rows
        .filter((r) => r.position <= 3 && r.ctr < 0.05 && r.impressions >= 30)
        .sort((a, b) => b.impressions - a.impressions)
        .slice(0, 20)
        .map((r) => ({
          query: r.keys[0].length > 40 ? r.keys[0].slice(0, 37) + "..." : r.keys[0],
          page: r.keys[1].replace("https://www.nakshiq.com", "").slice(0, 45),
          impressions: r.impressions,
          clicks: r.clicks,
          ctr: (r.ctr * 100).toFixed(2) + "%",
          position: r.position.toFixed(1),
        }));
    },
    cols: [
      { key: "query", label: "Query", align: "left" },
      { key: "page", label: "Page", align: "left" },
      { key: "impressions", label: "Impr.", align: "right" },
      { key: "clicks", label: "Clicks", align: "right" },
      { key: "ctr", label: "CTR", align: "right" },
      { key: "position", label: "Pos", align: "right" },
    ],
  },

  "top-pages": {
    title: "Top 30 pages by clicks (28d)",
    why: "Your actual SEO winners. These pages compound — improving them returns more than ranking new ones.",
    days: 28,
    async run(days) {
      const rows = await gscQuery({
        startDate: daysAgo(days), endDate: today(),
        dimensions: ["page"], rowLimit: 30,
      });
      return rows.map((r) => ({
        page: r.keys[0].replace("https://www.nakshiq.com", "").slice(0, 60),
        clicks: r.clicks,
        impressions: r.impressions,
        ctr: (r.ctr * 100).toFixed(2) + "%",
        position: r.position.toFixed(1),
      }));
    },
    cols: [
      { key: "page", label: "Page", align: "left" },
      { key: "clicks", label: "Clicks", align: "right" },
      { key: "impressions", label: "Impr.", align: "right" },
      { key: "ctr", label: "CTR", align: "right" },
      { key: "position", label: "Pos", align: "right" },
    ],
  },

  "lost-ground": {
    title: "Pages losing position — last 28d vs prior 28d",
    why: "Regressions. Investigate before they bleed clicks. Often = competitor outranking, content stale, or a deploy broke something.",
    days: 28,
    async run(days) {
      const recent = await gscQuery({
        startDate: daysAgo(days), endDate: today(),
        dimensions: ["page"], rowLimit: 500,
      });
      const prior = await gscQuery({
        startDate: daysAgo(days * 2), endDate: daysAgo(days + 1),
        dimensions: ["page"], rowLimit: 500,
      });
      const priorMap = new Map(prior.map((r) => [r.keys[0], r]));
      const out = [];
      for (const r of recent) {
        const p = priorMap.get(r.keys[0]);
        if (!p || p.impressions < 30) continue;
        const drop = r.position - p.position;
        if (drop >= 1.5) {
          out.push({
            page: r.keys[0].replace("https://www.nakshiq.com", "").slice(0, 50),
            prior_pos: p.position.toFixed(1),
            now_pos: r.position.toFixed(1),
            drop: "+" + drop.toFixed(1),
            prior_clicks: p.clicks,
            now_clicks: r.clicks,
          });
        }
      }
      return out.sort((a, b) => parseFloat(b.drop) - parseFloat(a.drop)).slice(0, 20);
    },
    cols: [
      { key: "page", label: "Page", align: "left" },
      { key: "prior_pos", label: "Was", align: "right" },
      { key: "now_pos", label: "Now", align: "right" },
      { key: "drop", label: "Drop", align: "right" },
      { key: "prior_clicks", label: "Was clk", align: "right" },
      { key: "now_clicks", label: "Now clk", align: "right" },
    ],
  },
};

// ═══════════════════════════════════════════════════════════════════════════
// CLI
// ═══════════════════════════════════════════════════════════════════════════

function listAll() {
  console.log("\nGA4 queries:");
  for (const [k, v] of Object.entries(GA4_QUERIES)) {
    console.log(`  ${k.padEnd(20)} ${v.title}`);
  }
  console.log("\nGSC queries:");
  for (const [k, v] of Object.entries(GSC_QUERIES)) {
    console.log(`  ${k.padEnd(20)} ${v.title}`);
  }
  console.log("\nUsage:");
  console.log("  node scripts/data-pull.mjs ga4 <query> [window]    e.g. ga4 human-pages 28d");
  console.log("  node scripts/data-pull.mjs gsc <query> [window]    e.g. gsc low-ctr 28d");
  console.log("  node scripts/data-pull.mjs baseline                run all + write report\n");
}

async function runOne(kind, name, win) {
  const queries = kind === "ga4" ? GA4_QUERIES : GSC_QUERIES;
  const q = queries[name];
  if (!q) {
    console.error(`Unknown ${kind} query: ${name}`);
    listAll();
    process.exit(1);
  }
  const days = parseWindow(win);
  console.log(`\n━━━ ${q.title} ━━━`);
  console.log(`why: ${q.why}`);
  console.log(`window: last ${days}d\n`);
  try {
    const rows = await q.run(days);
    console.log(table(rows, q.cols));
    console.log(`\n  ${rows.length} rows`);
    return rows;
  } catch (err) {
    console.error(`  ERR: ${err.message}`);
    if (kind === "gsc") {
      console.error(`  (GSC propagation lag is normal for new service accounts — retry in 30 min)`);
    }
    return [];
  }
}

async function runBaseline() {
  const days = parseWindow(window);
  const stamp = today();
  const out = [
    `# Data baseline — nakshiq.com (${stamp})`,
    "",
    `**Window:** last ${days} days`,
    `**Source:** GA4 property \`${GA4_PROPERTY_ID}\` + GSC \`${GSC_SITE_URL}\``,
    `**Generator:** \`node scripts/data-pull.mjs baseline\` — re-run any time`,
    "",
    `## How to read this`,
    "",
    `- **Direct channel = bot mass** (95%+ of Direct sessions are AI crawlers per the bot-blitz investigation 2026-05-04). Every query in this report **excludes Direct** so you see real humans only.`,
    `- **Each section answers one question.** If a section is empty, that's signal too — it means there's no actionable target in that category right now.`,
    `- **Every recommendation is anchored to a row in this report.** No vanity metrics, no fluff.`,
    "",
    "---",
    "",
  ];
  let totalRows = 0;

  out.push("# GA4 — real humans only\n");
  for (const [name, q] of Object.entries(GA4_QUERIES)) {
    process.stdout.write(`  GA4 ${name} ... `);
    let rows;
    try {
      rows = await q.run(days);
      console.log(`${rows.length} rows`);
    } catch (err) {
      console.log(`ERR: ${err.message}`);
      out.push(`## ${q.title}\n\n*Error: ${err.message}*\n\n---\n`);
      continue;
    }
    totalRows += rows.length;
    out.push(`## ${q.title}\n`);
    out.push(`*${q.why}*\n`);
    out.push(mdTable(rows, q.cols));
    out.push("\n---\n");
  }

  out.push("# GSC — what people search to find us\n");
  for (const [name, q] of Object.entries(GSC_QUERIES)) {
    process.stdout.write(`  GSC ${name} ... `);
    let rows;
    try {
      rows = await q.run(days);
      console.log(`${rows.length} rows`);
    } catch (err) {
      console.log(`ERR: ${err.message}`);
      out.push(`## ${q.title}\n\n*Skipped: ${err.message}*\n*If GSC just got access, retry in 30 min — Google's directory takes time to recognise new service accounts.*\n\n---\n`);
      continue;
    }
    totalRows += rows.length;
    out.push(`## ${q.title}\n`);
    out.push(`*${q.why}*\n`);
    out.push(mdTable(rows, q.cols));
    out.push("\n---\n");
  }

  out.push(`\n_Generated ${new Date().toISOString()} — ${totalRows} actionable rows total._\n`);

  const outPath = path.join(ROOT, "data", "research", `data-baseline-${stamp}.md`);
  mkdirSync(path.dirname(outPath), { recursive: true });
  writeFileSync(outPath, out.join("\n"));
  console.log(`\n→ wrote ${outPath}`);
  console.log(`  ${totalRows} rows of actionable signal\n`);
}

// ─── Dispatch ────────────────────────────────────────────────────────────
try {
  if (cmd === "list" || cmd === "--help" || cmd === "-h") {
    listAll();
  } else if (cmd === "ga4" || cmd === "gsc") {
    if (!sub) { listAll(); process.exit(1); }
    await runOne(cmd, sub, window);
  } else if (cmd === "baseline") {
    await runBaseline();
  } else {
    console.error(`Unknown command: ${cmd}`);
    listAll();
    process.exit(1);
  }
} catch (err) {
  console.error(`FATAL: ${err.message}`);
  if (err.stack) console.error(err.stack);
  process.exit(1);
}
