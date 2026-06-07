#!/usr/bin/env node
/**
 * scout-opportunities.mjs — Phase 4 of the guard-railed loop: the OPPORTUNITY SCOUT.
 *
 * The loop until now only finds DEFECTS (things breaking). This finds OPPORTUNITIES
 * (things that could be more valuable even when nothing is broken). The key design
 * difference, and the reason this is a separate stage: a defect has ground truth
 * (it reproduces or it doesn't), but an opportunity is speculative — so every
 * candidate must clear an EVIDENCE gate before it reaches you. That gate is the
 * opportunity-equivalent of verify-findings.mjs's "verify-before-fix".
 *
 *   "validate before recommending · no hype without evidence" — the founder's rule,
 *   applied in code: nothing is surfaced unless real GSC/GA4/DB numbers back it.
 *
 * Four detectors (each maps to a class the founder picked), all READ-ONLY:
 *   data-coverage      DB     — demand-weighted gaps in the moat (zero-POI, no-Hindi).
 *                              Evidence-by-construction. Fix is clear → propose-ready.
 *   striking-distance  GSC    — QUERY-level (page+query): queries at rank 8-20 (one push
 *                              from page 1) + queries at rank ≤5 starved of clicks for that
 *                              rank (a title/snippet problem, not a ranking one). Query-level
 *                              on purpose — page aggregates hide ranking-vs-title (the
 *                              tungnath/may lesson) — and it cross-refs existing title
 *                              overrides so it never re-pitches an already-optimised page.
 *   cro-leak           GA4    — content pages with real traffic but a key-event rate
 *                              below floor. Evidence = sessions + keyEvents. Digest +
 *                              hypothesis (NOT an auto-fix — CRO needs an A/B).
 *   new-surface        GSC    — demand clusters whose search intent maps to NO existing
 *                              route family. Evidence = clustered impressions. The
 *                              competitive-validation half (does a rival already own
 *                              this?) is a GATED, budgeted Claude WebSearch step run via
 *                              the /loop-scout command — NOT a node flag (web research
 *                              can't run inside this script). See .loop/OPPORTUNITIES.md.
 *
 * Writes ONLY .loop/ scratch (noGate): opportunities-inbox.json + opportunities-digest.md.
 * Applies NOTHING. Propose-ready items flow into the existing propose→approve→iMessage.
 *
 * Run live :  node --env-file=apps/web/.env.local scripts/_loop/scout-opportunities.mjs
 * One class :  ... scout-opportunities.mjs --only=striking-distance
 * Self-test :  node scripts/_loop/scout-opportunities.mjs --self-test
 */

import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { LOOP_DIR, loadConfig, assertCanProceed } from "./guard.mjs";

const SELF_TEST = process.argv.includes("--self-test");
const ONLY = (process.argv.find((a) => a.startsWith("--only=")) || "").split("=")[1] || null;

// ===========================================================================
// PURE scorers + classifiers (unit-testable; no I/O) — the evidence gate logic
// ===========================================================================

// Blended organic CTR-by-position curve. Used to judge whether a page that
// already ranks is under-clicked FOR ITS RANK (a title/meta problem, not a
// ranking problem). Conservative, India-skewed; only the SHAPE matters here.
const CTR_CURVE = { 1: 0.27, 2: 0.14, 3: 0.1, 4: 0.07, 5: 0.055, 6: 0.044, 7: 0.035, 8: 0.028, 9: 0.023, 10: 0.02 };
export function expectedCtr(position) {
  const p = Math.max(1, Math.round(position));
  if (p <= 10) return CTR_CURVE[p];
  if (p <= 20) return 0.012;
  return 0.005;
}

// Effort → ranking weight. Cheap+high-value floats to the top.
const EFFORT_WEIGHT = { low: 1, med: 2.5, high: 6 };
export function scoreOpportunity({ value, confidence, effort }) {
  const w = EFFORT_WEIGHT[effort] ?? 3;
  if (!(value > 0) || !(confidence > 0)) return 0;
  // log-compress value so one giant page can't drown a cluster of good ones
  return +((Math.log10(value + 1) * 10 * confidence) / w).toFixed(1);
}

/**
 * Striking-distance classifier — operates on a single QUERY's row for a page
 * (GSC page+query dimension), NOT a page-level aggregate. This matters: a page
 * can aggregate to "rank 7, low CTR" while actually being a mix of (ranks-well +
 * converts) and (ranks-9 + naturally-low-CTR) queries. Aggregating hides that and
 * mislabels ranking problems as title problems (it did, on tungnath/may). Query
 * level keeps the two honest.
 * @param row {clicks, impressions, ctr, position}  (one query on one page)
 * @returns opportunity-fragment | null
 */
export function classifyStrikingDistance(row, { nearMinImpr = 300, ctrGapMinImpr = 100, ctrGapMinLostClicks = 20, ctrGapMaxPos = 5 } = {}) {
  const impr = row.impressions ?? 0;
  const pos = row.position ?? 0;
  const ctr = row.ctr ?? 0;
  if (pos <= 0) return null;
  // near-page-1: this query ranks just off page 1, with enough volume that a push pays off.
  if (pos >= 8 && pos <= 20 && impr >= nearMinImpr) {
    const closeness = (20 - pos) / 12; // 1 at pos 8, ~0 at pos 20
    return {
      kind: "near-page-1",
      value: impr,
      confidence: +(0.5 + 0.4 * closeness).toFixed(2),
      effort: "med",
      detail: `rank ${pos.toFixed(1)}, ${impr} impr — one content + internal-link push from page 1`,
      suggested_action: "Strengthen the page for this query + add 3-5 internal links from high-authority pages.",
    };
  }
  // serp-ctr-gap: this query ranks in the TOP positions (≤5) yet is starved of
  // clicks for that rank → unambiguously a title/snippet problem, not a position
  // one. Positions 6-7 are deliberately a no-surface gap: low CTR there can just
  // be the rank, and page-aggregate data hid exactly that ambiguity on tungnath.
  if (pos >= 1 && pos <= ctrGapMaxPos && impr >= ctrGapMinImpr) {
    const exp = expectedCtr(pos);
    if (ctr < exp * 0.5) {
      const lost = Math.round((exp - ctr) * impr);
      if (lost >= ctrGapMinLostClicks) {
        return {
          kind: "serp-ctr-gap",
          value: lost, // clicks left on the table
          confidence: 0.75,
          effort: "low", // rides the existing title-overrides pipeline
          detail: `rank ${pos.toFixed(1)} but CTR ${(ctr * 100).toFixed(1)}% vs ~${(exp * 100).toFixed(0)}% norm — ~${lost} clicks left on the table`,
          suggested_action: "Title/meta rewrite via scripts/apply-title-overrides.mjs (already-built pipeline).",
        };
      }
    }
  }
  return null;
}

/**
 * CRO conversion-leak classifier (GA4 page row).
 * @param row {path, sessions, keyEvents}
 */
export function classifyCroLeak(row, { minSessions = 80, convFloor = 0.005 } = {}) {
  const sessions = row.sessions ?? 0;
  const keyEvents = row.keyEvents ?? 0;
  if (sessions < minSessions) return null;
  const conv = sessions > 0 ? keyEvents / sessions : 0;
  if (conv >= convFloor) return null;
  const recoverable = Math.max(1, Math.round(sessions * (convFloor - conv)));
  return {
    kind: "conversion-leak",
    value: sessions, // traffic at stake
    confidence: +Math.min(0.8, 0.3 + sessions / 2000).toFixed(2),
    effort: "high",
    detail: `${sessions} sessions, ${(conv * 100).toFixed(2)}% key-event rate (< ${(convFloor * 100).toFixed(1)}% floor) — ~${recoverable} conversions recoverable if lifted to floor`,
    suggested_action: "Form a CRO hypothesis (CTA placement / save prompt / friction) and A/B it — do NOT ship blind.",
  };
}

// Search-intent → existing route family. served: true | "partial" | false.
// Mirrors the live route map (apps/web/src/app/[locale]/*). Conservative on
// purpose: a cluster is only a "new surface" when NOTHING serves it.
export const INTENT_RULES = [
  { intent: "comparison", re: /\b(vs\.?|versus|v\/s)\b|\s+or\s+/, served: true, family: "/vs/[pair]" },
  { intent: "cost-budget", re: /\b(cost|budget|price|cheap|expense|how much)\b/, served: true, family: "/cost/[slug]" },
  { intent: "best-time", re: /\bbest (time|month|season)\b|\bweather\b|\btemperature\b/, served: true, family: "/destination/[id]/[month] + /where-to-go" },
  { intent: "with-kids", re: /\bwith (kids|family|children|parents)\b|\bfamily (trip|tour|holiday)\b/, served: true, family: "/with-kids/[id] + /family" },
  { intent: "honeymoon", re: /\b(honeymoon|couples?|romantic)\b/, served: true, family: "/best/[slug]" },
  { intent: "weekend", re: /\bweekend\b/, served: true, family: "/weekend-from-*" },
  { intent: "safari-wildlife", re: /\b(safari|tiger|national park|wildlife|sanctuary)\b/, served: true, family: "/safari/[slug]" },
  { intent: "trek", re: /\btrek|\btrekking|\bhike\b|\btrail\b/, served: true, family: "/treks/[id]" },
  { intent: "festival", re: /\bfestival|\bfair\b|\bmela\b/, served: true, family: "/festivals/[slug]" },
  { intent: "things-to-do", re: /\bthings to do|places to (visit|see)|sightseeing|tourist (place|spot)/, served: true, family: "/destination/[id]" },
  { intent: "itinerary", re: /\bitinerary\b|\b\d+\s*days?\b|\bday trip\b|\bplan\b/, served: "partial", family: "/build-route + dest micro-itineraries" },
  { intent: "stay-hotel", re: /\b(hotels?|stays?|resort|where to stay|homestay|hostel)\b/, served: "partial", family: "/stays" },
  { intent: "how-to-reach", re: /\bhow to reach|\bdistance\b|\bfrom .+ to .+\b|by (road|train|bus|air)\b|nearest (airport|station)/, served: "partial", family: "/arrival/[iata]" },
];
export function classifyIntent(query) {
  const q = String(query || "").toLowerCase();
  for (const r of INTENT_RULES) if (r.re.test(q)) return r;
  return { intent: "other", served: "unknown", family: null };
}

/** Aggregate GSC query rows into intent clusters; flag under/un-served demand. */
export function clusterIntents(queryRows, { minClusterImpr = 200 } = {}) {
  const agg = new Map();
  for (const r of queryRows) {
    const q = r.keys?.[0] ?? "";
    const c = classifyIntent(q);
    let e = agg.get(c.intent);
    if (!e) { e = { intent: c.intent, served: c.served, family: c.family, impressions: 0, clicks: 0, n: 0, examples: [] }; agg.set(c.intent, e); }
    e.impressions += r.impressions ?? 0;
    e.clicks += r.clicks ?? 0;
    e.n++;
    if (e.examples.length < 5 && (r.impressions ?? 0) > 0) e.examples.push({ q, impr: r.impressions });
  }
  // Surface only under/un-served clusters that clear the demand floor.
  return [...agg.values()]
    .filter((e) => (e.served === false || e.served === "partial") && e.impressions >= minClusterImpr)
    .sort((a, b) => b.impressions - a.impressions);
}

// ===========================================================================
// LIVE detectors (I/O) — each returns a list of uniform opportunity records
// ===========================================================================

const DEST_URL_RE = /\/(?:(?:en|hi)\/)?destination\/([^/?#]+)/i;
const CONTENT_PATH_RE = /^\/(en|hi)\/(destination|cost|vs|best|for|where-to-go|treks|festivals|with-kids|family|safari|collections|state|stays|weekend-from)/i;
const MONTH_SLUGS = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];

// Pages that ALREADY carry a title override, so the scout never pitches a "fresh
// title rewrite" on a page the founder already optimised (caught on tungnath/may,
// which had an applied override yet still showed low CTR — a ranking/recrawl case).
// Returns Map<pathname, "YYYY-MM-DD"|"applied">.
async function loadTitleOverrideMap(src) {
  const map = new Map();
  try {
    // composite PK order — destination_months has no single "id" column.
    const rows = await src.fetchAll("destination_months", "destination_id, month, title_override, title_override_hi, content_reviewed_at", { order: ["destination_id", "month"] });
    for (const r of rows) {
      const slug = MONTH_SLUGS[(r.month | 0) - 1];
      if (!slug) continue;
      const rev = (r.content_reviewed_at || "").slice(0, 10) || "applied";
      if (r.title_override) map.set(`/en/destination/${r.destination_id}/${slug}`, rev);
      if (r.title_override_hi) map.set(`/hi/destination/${r.destination_id}/${slug}`, rev);
    }
  } catch (e) {
    console.error(`  [striking-distance] title-override cross-ref unavailable (${e.message}) — proceeding without it.`);
  }
  return map;
}

function mkOpp(cls, id, title, frag, extra = {}) {
  return {
    class: cls,
    id,
    title,
    kind: frag.kind,
    evidence: { value: frag.value, ...extra.evidence },
    confidence: frag.confidence,
    effort: frag.effort,
    detail: frag.detail,
    suggested_action: frag.suggested_action,
    propose_ready: extra.propose_ready ?? false,
    needs_competitive_validation: extra.needs_competitive_validation ?? false,
    score: scoreOpportunity(frag),
  };
}

async function detectDataCoverage(src) {
  const { gscQuery, daysAgo, today } = src;
  // Real gaps confirmed against live schema (hero_image_url + last_verified are
  // unmaintained columns → NOT used; they'd be 525 false positives).
  const dests = await src.fetchAll("destinations", "id, name, content_tier, translations");
  // MUST paginate — there are ~1,600 POIs and a bare REST select caps at 1,000
  // rows, which would falsely flag ~200 dests as zero-POI (the CLAUDE.md gotcha).
  const poiRows = await src.fetchAll("points_of_interest", "destination_id");
  const poiCount = new Map();
  for (const r of poiRows || []) poiCount.set(r.destination_id, (poiCount.get(r.destination_id) || 0) + 1);

  // demand weight per dest from GSC (page-dim, 90d)
  const demand = new Map();
  try {
    const pages = await gscQuery({ startDate: daysAgo(90), endDate: today(), dimensions: ["page"], rowLimit: 25000 });
    for (const r of pages) {
      const m = String(r.keys?.[0] ?? "").match(DEST_URL_RE);
      if (m) demand.set(m[1].toLowerCase(), (demand.get(m[1].toLowerCase()) || 0) + (r.impressions ?? 0));
    }
  } catch (e) {
    console.error(`  [data-coverage] GSC demand unavailable (${e.message}) — falling back to content_tier weight.`);
  }

  const opps = [];
  for (const d of dests) {
    const dem = demand.get(d.id) || 0;
    const tierBoost = d.content_tier === "A" ? 50 : d.content_tier === "B" ? 20 : 5;
    const weight = dem + tierBoost; // demand-first, tier as floor
    const gaps = [];
    if ((poiCount.get(d.id) || 0) === 0) gaps.push("no points-of-interest (empty 'things to do')");
    if (!d.translations || d.translations?.hi == null) gaps.push("no Hindi translation (hi locale renders English)");
    if (!gaps.length) continue;
    const frag = {
      kind: "moat-gap",
      value: weight,
      confidence: 0.9, // evidence-by-construction
      effort: "low",
      detail: `${d.name}: ${gaps.join("; ")}. ${dem} GSC impr/90d (tier ${d.content_tier || "?"}).`,
      suggested_action: `Backfill ${gaps.length} field(s) for ${d.id} via the standard data pipeline (research agent → verify → pg-bulk).`,
    };
    opps.push(mkOpp("data-coverage", d.id, `${d.name} — ${gaps.length} moat gap(s)`, frag, {
      evidence: { gaps, gsc_impr_90d: dem, content_tier: d.content_tier },
      propose_ready: true,
    }));
  }
  return opps;
}

async function detectStrikingDistance(src, cfg) {
  const { gscQuery, daysAgo, today } = src;
  const th = cfg.opportunities?.strikingDistance || {};
  const overrides = await loadTitleOverrideMap(src);
  // page+query (NOT page-aggregate): the only way to tell "ranks well but under-clicked"
  // (a title fix) from "ranks at pos 9 so low CTR is just the rank" (a ranking push).
  const rows = await gscQuery({ startDate: daysAgo(90), endDate: today(), dimensions: ["page", "query"], rowLimit: 25000 });
  const opps = [];
  for (const r of rows) {
    const url = r.keys?.[0] ?? "";
    const query = r.keys?.[1] ?? "";
    let pathname;
    try { pathname = new URL(url).pathname; } catch { continue; }
    if (!CONTENT_PATH_RE.test(pathname)) continue; // skip /explore, /api, home, etc.
    const frag = classifyStrikingDistance({ clicks: r.clicks, impressions: r.impressions, ctr: r.ctr, position: r.position }, th);
    if (!frag) continue;
    const extraEvidence = {};
    let proposeReady = frag.kind === "serp-ctr-gap"; // a fresh title rewrite is a known, safe fix
    if (frag.kind === "serp-ctr-gap" && overrides.has(pathname)) {
      frag.detail += ` — NOTE: title override already applied (${overrides.get(pathname)}); refine or wait for recrawl, NOT a fresh write.`;
      frag.confidence = +(frag.confidence * 0.6).toFixed(2);
      extraEvidence.existing_override = overrides.get(pathname);
      proposeReady = false;
    }
    opps.push(mkOpp("striking-distance", `${pathname}::${query}`, `${pathname} — "${query}" — ${frag.kind}`, frag, {
      evidence: { url, query, position: +((r.position ?? 0).toFixed(1)), impressions: r.impressions ?? 0, clicks: r.clicks ?? 0, ctr: +(((r.ctr ?? 0) * 100).toFixed(2)), ...extraEvidence },
      propose_ready: proposeReady,
    }));
  }
  return opps;
}

// CRO is the data-gated class. The blanket `keyEvents` metric is unusable here
// (GA4 marks page_view/scroll as key events → 400% "conversion"), and the site's
// all-traffic events are bot-saturated (68% save/pageview median). So this detector
// works ONLY on ORGANIC-SEARCH sessions (strips Direct/bot) and measures a page's
// save-rate RELATIVE to the organic site median — never an absolute claim. When too
// few pages clear the organic-volume floor (the current reality: organic traffic is
// thinner than the floor per page), it returns nothing and SAYS WHY — honest scarcity,
// not a false "zero leaks". Re-enable in config once organic traffic per page grows.
async function detectCroLeak(src, cfg) {
  const { ga4Query, daysAgo } = src;
  const minOrgPv = cfg.opportunities?.croLeak?.minOrganicPageviews ?? 40;
  const minPages = cfg.opportunities?.croLeak?.minPagesToMeasure ?? 8;
  const pull = (ev) =>
    ga4Query({
      dimensions: [{ name: "pagePath" }],
      metrics: [{ name: "eventCount" }],
      dateRanges: [{ startDate: daysAgo(28), endDate: "today" }],
      dimensionFilter: {
        andGroup: {
          expressions: [
            { filter: { fieldName: "eventName", stringFilter: { value: ev } } },
            { filter: { fieldName: "sessionDefaultChannelGroup", stringFilter: { value: "Organic Search" } } },
          ],
        },
      },
      limit: 1000,
    });
  const [pvRows, svRows] = await Promise.all([pull("page_view"), pull("save_destination")]);
  const pv = {}, sv = {};
  for (const r of pvRows) { const p = r.dimensionValues?.[0]?.value ?? ""; if (CONTENT_PATH_RE.test(p)) pv[p] = Number(r.metricValues?.[0]?.value ?? 0); }
  for (const r of svRows) { const p = r.dimensionValues?.[0]?.value ?? ""; if (CONTENT_PATH_RE.test(p)) sv[p] = Number(r.metricValues?.[0]?.value ?? 0); }
  const recs = Object.keys(pv).filter((p) => pv[p] >= minOrgPv).map((p) => ({ path: p, pv: pv[p], sv: sv[p] || 0, ratio: (sv[p] || 0) / pv[p] }));
  if (recs.length < minPages) {
    console.error(`  [cro-leak] only ${recs.length} content page(s) clear ${minOrgPv} ORGANIC pageviews/28d (need ${minPages}). Per-page conversion is not measurable yet — skipping honestly (NOT "zero leaks"). The unlock is more organic traffic per page + bot-filtered attribution, not a detector tweak.`);
    return [];
  }
  const ratios = recs.map((r) => r.ratio).sort((a, b) => a - b);
  const median = ratios[Math.floor(ratios.length / 2)] || 0;
  if (median <= 0) {
    console.error(`  [cro-leak] no page records a single organic save — conversion not measurable (honest scarcity, NOT "zero leaks"). Skipping.`);
    return [];
  }
  const opps = [];
  for (const r of recs) {
    const frag = classifyCroLeak({ sessions: r.pv, keyEvents: r.sv }, { minSessions: minOrgPv, convFloor: median * 0.4 });
    if (!frag) continue;
    frag.confidence = 0.4; // GA4 still partly bot-noisy even within organic
    frag.detail = `${r.pv} organic pv, save-rate ${(r.ratio * 100).toFixed(1)}% vs organic site median ${(median * 100).toFixed(1)}% — relative underperformer (LOW confidence: GA4 bot-noise; verify before acting)`;
    opps.push(mkOpp("cro-leak", r.path, `${r.path} — below-median save rate`, frag, {
      evidence: { path: r.path, organic_pv: r.pv, saves: r.sv, save_rate_pct: +(r.ratio * 100).toFixed(1), organic_site_median_pct: +(median * 100).toFixed(1) },
      propose_ready: false, // CRO is digest + hypothesis, never auto-fix
    }));
  }
  return opps;
}

async function detectNewSurface(src, cfg) {
  const { gscQuery, daysAgo, today } = src;
  const minClusterImpr = cfg.opportunities?.newSurface?.minClusterImpr ?? 200;
  const rows = await gscQuery({ startDate: daysAgo(90), endDate: today(), dimensions: ["query"], rowLimit: 25000 });
  const clusters = clusterIntents(rows, { minClusterImpr });
  return clusters.map((c) => {
    const frag = {
      kind: c.served === false ? "unserved-intent" : "under-served-intent",
      value: c.impressions,
      confidence: 0.5, // demand proven; WINNABILITY not yet (needs competitive research)
      effort: "high",
      detail: `intent "${c.intent}" — ${c.impressions} impr across ${c.n} queries, currently ${c.served === false ? "NO route family" : `only partially served (${c.family})`}. e.g. ${c.examples.map((e) => `"${e.q}"`).slice(0, 3).join(", ")}`,
      suggested_action: "GATED: needs a competitive-validation pass (does a rival already own this? is it winnable?) before pitching a build — a Claude WebSearch step, budgeted, run via /loop-scout (see .loop/OPPORTUNITIES.md). Never auto-build.",
    };
    return mkOpp("new-surface", `intent:${c.intent}`, `${c.intent} — ${frag.kind}`, frag, {
      evidence: { intent: c.intent, impressions: c.impressions, queries: c.n, served: c.served, current_family: c.family, examples: c.examples },
      propose_ready: false, // never auto-build a surface
      needs_competitive_validation: true, // demand proven; winnability is a gated Claude WebSearch step (see .loop/OPPORTUNITIES.md)
    });
  });
}

// ===========================================================================
// Output writers (write-scratch = noGate)
// ===========================================================================

function writeInbox(opps, cfg) {
  const rel = (cfg?.opportunities?.inboxFile || ".loop/opportunities-inbox.json").replace(/^\.loop\//, "");
  const p = join(LOOP_DIR, rel);
  writeFileSync(p, JSON.stringify({ generatedAt: new Date().toISOString(), count: opps.length, opportunities: opps }, null, 2) + "\n");
  return p;
}

function writeDigest(byClass, totals, cfg) {
  const rel = (cfg?.opportunities?.digestFile || ".loop/opportunities-digest.md").replace(/^\.loop\//, "");
  const p = join(LOOP_DIR, rel);
  const date = new Date().toISOString().slice(0, 16).replace("T", " ");
  let md = `# Opportunity digest — ${date} UTC\n\n`;
  md += `_Scout found ${totals.total} evidence-backed opportunities. Ranked by (value × confidence ÷ effort). `;
  md += `Propose-ready = objective + clear fix (can ride approve→fix). Digest-only = needs your judgment._\n\n`;
  const CLASS_TITLE = {
    "data-coverage": "🗂  Data-coverage gaps (DB · propose-ready)",
    "striking-distance": "📈  SEO striking-distance (GSC)",
    "cro-leak": "🎯  CRO conversion leaks (GA4 · hypothesis only)",
    "new-surface": "🧭  New surfaces / intent gaps (GSC · needs competitive validation)",
  };
  for (const cls of ["striking-distance", "cro-leak", "data-coverage", "new-surface"]) {
    const list = (byClass[cls] || []).sort((a, b) => b.score - a.score);
    if (!list.length) continue;
    md += `## ${CLASS_TITLE[cls] || cls} — ${list.length}\n\n`;
    for (const o of list.slice(0, 12)) {
      md += `- **[${o.score}]** ${o.title}${o.propose_ready ? " · _propose-ready_" : ""}\n  - ${o.detail}\n  - → ${o.suggested_action}\n`;
    }
    if (list.length > 12) md += `- _…${list.length - 12} more in opportunities-inbox.json_\n`;
    md += `\n`;
  }
  writeFileSync(p, md);
  return p;
}

// ===========================================================================
// Main
// ===========================================================================

async function main() {
  assertCanProceed();
  const cfg = loadConfig();
  const oc = cfg.opportunities || {};
  const enabled = oc.scouts || { "data-coverage": true, "striking-distance": true, "cro-leak": true, "new-surface": true };

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    console.error("Run: node --env-file=apps/web/.env.local scripts/_loop/scout-opportunities.mjs");
    process.exit(1);
  }
  const src = await import("./sources.mjs");

  const DETECTORS = {
    "data-coverage": () => detectDataCoverage(src),
    "striking-distance": () => detectStrikingDistance(src, cfg),
    "cro-leak": () => detectCroLeak(src, cfg),
    "new-surface": () => detectNewSurface(src, cfg),
  };

  if (ONLY && !DETECTORS[ONLY]) {
    console.error(`unknown --only=${ONLY}; valid: ${Object.keys(DETECTORS).join(", ")}`);
    process.exit(1);
  }

  const all = [];
  const byClass = {};
  for (const [cls, fn] of Object.entries(DETECTORS)) {
    if (ONLY && cls !== ONLY) continue;
    if (!ONLY && enabled[cls] === false) { console.log(`  [${cls}] disabled in config — skipped.`); continue; }
    try {
      console.log(`  [${cls}] scouting …`);
      const opps = await fn();
      byClass[cls] = opps;
      all.push(...opps);
      console.log(`  [${cls}] ${opps.length} opportunit${opps.length === 1 ? "y" : "ies"}.`);
    } catch (e) {
      console.error(`  [${cls}] FAILED: ${e.message} — this class is skipped, others continue.`);
    }
  }

  all.sort((a, b) => b.score - a.score);
  const inboxPath = writeInbox(all, cfg);
  const digestPath = writeDigest(byClass, { total: all.length }, cfg);

  console.log(`\nSCOUT SUMMARY — ${all.length} opportunities`);
  for (const cls of Object.keys(byClass)) console.log(`  ${cls.padEnd(18)} ${byClass[cls].length}`);
  console.log(`  inbox  : ${inboxPath}`);
  console.log(`  digest : ${digestPath}`);
  if (all.length) {
    console.log(`\n  Top 8 by score:`);
    for (const o of all.slice(0, 8)) console.log(`    [${String(o.score).padStart(5)}] ${o.class.padEnd(18)} ${o.title}`);
  }
  process.exit(0);
}

// ===========================================================================
// Self-test — pure scorers/classifiers against fixtures
// ===========================================================================

function selfTest() {
  let pass = 0, fail = 0;
  const ok = (n, c) => (c ? (pass++, console.log(`  ✓ ${n}`)) : (fail++, console.error(`  ✗ ${n}`)));
  console.log("scout-opportunities.mjs self-test (pure logic)\n");

  // expectedCtr shape
  ok("expectedCtr: rank 1 > rank 10 > rank 30", expectedCtr(1) > expectedCtr(10) && expectedCtr(10) > expectedCtr(30));

  // scoreOpportunity: cheap+confident beats expensive+confident at equal value
  ok("score: low effort outranks high effort", scoreOpportunity({ value: 1000, confidence: 0.8, effort: "low" }) > scoreOpportunity({ value: 1000, confidence: 0.8, effort: "high" }));
  ok("score: zero value -> 0", scoreOpportunity({ value: 0, confidence: 0.9, effort: "low" }) === 0);

  // striking-distance: near-page-1 true positive
  ok("striking: rank 11, 300 impr -> near-page-1", classifyStrikingDistance({ impressions: 300, position: 11, ctr: 0.01 })?.kind === "near-page-1");
  // striking: rank 4 with healthy CTR -> nothing
  ok("striking: rank 4 healthy CTR -> null", classifyStrikingDistance({ impressions: 300, position: 4, ctr: 0.08 }) === null);
  // striking: rank 3 with terrible CTR -> serp-ctr-gap
  ok("striking: rank 3 starved CTR -> serp-ctr-gap", classifyStrikingDistance({ impressions: 500, position: 3, ctr: 0.01 })?.kind === "serp-ctr-gap");
  // striking: below impression floor -> null
  ok("striking: 10 impr -> null (below floor)", classifyStrikingDistance({ impressions: 10, position: 11, ctr: 0.01 }) === null);
  // striking: rank 25 (off page 2) -> null
  ok("striking: rank 25 -> null", classifyStrikingDistance({ impressions: 300, position: 25, ctr: 0.005 }) === null);
  // striking: near page 1 but below the near-impression floor -> null
  ok("striking: rank 9, 120 impr -> null (below near floor)", classifyStrikingDistance({ impressions: 120, position: 9, ctr: 0.01 }) === null);
  // striking: positions 6-7 are the ambiguous no-surface zone — low CTR there can just be the
  // rank, not the title. THE TUNGNATH/MAY LESSON: under the old pos<8 rule this was a false
  // "serp-ctr-gap"; query-level + a ≤5 cutoff correctly leaves it for near-page-1/ranking work.
  ok("striking: rank 7, 4000 impr starved CTR -> null (ambiguous 6-7 zone)", classifyStrikingDistance({ impressions: 4000, position: 7, ctr: 0.004 }) === null);
  // striking: top rank, starved CTR, but recoverable clicks below the floor -> null (not worth surfacing)
  ok("striking: rank 5, 120 impr tiny loss -> null (below lost-clicks floor)", classifyStrikingDistance({ impressions: 120, position: 5, ctr: 0.025 }) === null);

  // cro-leak: high traffic, no conversions -> leak
  ok("cro: 500 sessions, 0 key-events -> leak", classifyCroLeak({ sessions: 500, keyEvents: 0 })?.kind === "conversion-leak");
  // cro: healthy conversion -> null
  ok("cro: 500 sessions, 10 key-events -> null", classifyCroLeak({ sessions: 500, keyEvents: 10 }) === null);
  // cro: below session floor -> null
  ok("cro: 20 sessions -> null (below floor)", classifyCroLeak({ sessions: 20, keyEvents: 0 }) === null);

  // intent classifier
  ok("intent: 'manali vs shimla' -> comparison(served)", classifyIntent("manali vs shimla").intent === "comparison");
  ok("intent: 'coorg 3 day itinerary' -> itinerary(partial)", classifyIntent("coorg 3 day itinerary").served === "partial");
  ok("intent: 'goa nightlife' -> other(unknown)", classifyIntent("goa nightlife").served === "unknown");

  // clusterIntents: only under/un-served clusters above floor surface
  const clustered = clusterIntents([
    { keys: ["manali vs shimla"], impressions: 5000, clicks: 50 }, // served -> excluded
    { keys: ["coorg 3 day itinerary"], impressions: 150, clicks: 1 }, // partial but below 200 floor -> excluded
    { keys: ["ladakh 7 day itinerary"], impressions: 300, clicks: 2 }, // partial, above floor -> included
  ]);
  ok("cluster: surfaces only above-floor under-served intents", clustered.length === 1 && clustered[0].intent === "itinerary");

  console.log(`\n${fail === 0 ? "ALL GREEN" : "FAILURES"} — ${pass} passed, ${fail} failed`);
  process.exit(fail === 0 ? 0 : 1);
}

if (SELF_TEST) selfTest();
else main().catch((e) => {
  if (e.code === "LOOP_HALTED" || e.code === "LOOP_PAUSED") { console.log(e.message); process.exit(0); }
  console.error(e);
  process.exit(1);
});
