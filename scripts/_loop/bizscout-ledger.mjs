#!/usr/bin/env node
/**
 * bizscout-ledger.mjs — Phase 5 engine: the BUSINESS-OPPORTUNITY SCOUT ledger.
 *
 * Phase 4 (scout-opportunities.mjs) finds opportunities to grow NakshIQ (the site).
 * Phase 5 finds NEW BUSINESS opportunities for Ashish's portfolio, by harvesting
 * live demand signals across many channels. The agent fan-out (harvest → synthesize
 * → validate → score → fact-check) can't run in plain node — it needs Claude — so it
 * lives in the Workflow script (bizscout-workflow.js), driven by /loop-bizscout.
 *
 * THIS file is the deterministic half: everything that must be exact, repeatable, and
 * unit-testable so we are NOT "trusting the agents to grade their own homework":
 *
 *   1. DEDUPE        — a stable key + fuzzy match so the same idea never re-surfaces
 *                      run after run (the founder asked: "don't show me the same idea twice").
 *   2. OBJECTIVE CHANNEL SCORING — ranks channels by avg *validated* composite and
 *                      penalises duplicate-flooding. This is the fix for the bias the
 *                      founder caught: the committee called regulatory the "richest"
 *                      channel only because it produced the MOST ideas (many dupes).
 *                      Volume ≠ richness. (richnessScore = avgComposite × (1 − 0.5·dupRate))
 *   3. FACT-CHECK GATE bookkeeping — each idea carries fact_checks[] from an independent
 *                      verification pass; an idea with an unverified load-bearing claim is
 *                      flagged UNVERIFIED in the digest, never presented as fact.
 *   4. COMPOSITE      — the same weighted 6-factor rubric, computed in code (not by an LLM),
 *                      so scores are comparable across runs. The ledger RANKS + DISPLAYS on
 *                      `effScore` = the rubric after the adversarial verify→judge verdict
 *                      (verified_composite: a "downgrade" cuts it, a "kill" zeroes it), while
 *                      `composite` stays the stable cross-run rubric. So a high-rubric idea whose
 *                      moat the skeptics demolish actually drops in the ranking, not just in a note.
 *
 * Read-only re: the world; writes ONLY .loop/ scratch + data/research/OPPORTUNITIES.md
 * (the human ledger). Applies nothing, sends nothing (the /loop-bizscout skill owns the
 * gated iMessage send).
 *
 *   Seed once  :  node scripts/_loop/bizscout-ledger.mjs --seed <run.json>
 *   Merge a run:  node scripts/_loop/bizscout-ledger.mjs --merge <run.json>
 *   Self-test  :  node scripts/_loop/bizscout-ledger.mjs --self-test
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { ROOT, LOOP_DIR, loadConfig } from "./guard.mjs";

const ARGV = process.argv.slice(2);
const SELF_TEST = ARGV.includes("--self-test");
const flagVal = (name) => { const a = ARGV.find((x) => x.startsWith(`${name}=`)); if (a) return a.split("=")[1]; const i = ARGV.indexOf(name); return i >= 0 ? ARGV[i + 1] : null; };

// 6-factor rubric weights (must mirror bizscout-workflow.js). Sum = 1.0.
export const WEIGHTS = { demand: 0.25, moat: 0.2, competition_shape: 0.15, profit_ceiling: 0.15, speed_to_cash: 0.15, founder_fit: 0.1 };
const STOPWORDS = new Set(["the", "a", "an", "for", "of", "and", "to", "in", "on", "with", "ai", "app", "platform", "tool", "data", "engine", "api", "service", "your", "you"]);

// ===========================================================================
// PURE helpers (unit-tested) — no I/O
// ===========================================================================

export function slugify(s) {
  return String(s || "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 60);
}

export function compositeScore(scores = {}, weights = WEIGHTS) {
  let total = 0;
  for (const [k, w] of Object.entries(weights)) total += (Number(scores[k]) || 0) * w;
  return Math.round(total * 100) / 100;
}

/**
 * EFFECTIVE score — what the ledger ranks and displays on. It is the pure rubric
 * `composite` adjusted by the adversarial-verify→judge verdict (verified_composite:
 * a "downgrade" cuts it, a "kill" zeroes it). `composite` itself stays the stable,
 * cross-run-comparable rubric (per the COMPOSITE invariant above); effScore is the
 * rubric-after-the-verdict's-teeth, so a demolished moat actually drops the rank.
 * Falls back to composite when an idea predates the verify layer (no verified_composite).
 */
export function effScore(o) {
  if (!o) return 0;
  return o.verified_composite != null ? o.verified_composite : (o.composite || 0);
}

/** token set of a name+blurb, minus stopwords, for fuzzy dedupe. */
export function tokenSet(...parts) {
  const toks = parts.join(" ").toLowerCase().match(/[a-z0-9]+/g) || [];
  return new Set(toks.filter((t) => t.length > 2 && !STOPWORDS.has(t)));
}

export function jaccard(aSet, bSet) {
  if (!aSet.size && !bSet.size) return 0;
  let inter = 0;
  for (const x of aSet) if (bSet.has(x)) inter++;
  return inter / (aSet.size + bSet.size - inter);
}

/**
 * Is `idea` the same as an already-seen `prior`? Same slug OR high token overlap
 * on (name + one_liner). The fuzzy arm catches renamed dupes (DataLedger vs
 * DisclosureForge), the exact arm catches identical re-runs.
 */
export function isDuplicate(idea, prior, { jaccardThreshold = 0.6, oneLinerThreshold = 0.65 } = {}) {
  if (!idea || !prior) return false;
  if (idea.key && prior.key && idea.key === prior.key) return true;
  // full = name + blurb (catches identical re-runs); one-liner-only = the rename case
  // (DataLedger vs DisclosureForge: different product name, SAME described idea).
  const full = jaccard(tokenSet(idea.name, idea.one_liner), tokenSet(prior.name, prior.one_liner));
  if (full >= jaccardThreshold) return true;
  const blurb = jaccard(tokenSet(idea.one_liner), tokenSet(prior.one_liner));
  return blurb >= oneLinerThreshold;
}

/** fact_checks[] -> a single status. refuted dominates; then unverified; else verified/partial. */
export function factStatus(factChecks) {
  if (!Array.isArray(factChecks) || factChecks.length === 0) return "unchecked";
  const v = factChecks.map((f) => String(f.verified).toLowerCase());
  if (v.some((x) => x === "false" || x === "refuted")) return "refuted";
  const verified = v.filter((x) => x === "true" || x === "verified").length;
  if (verified === 0) return "unverified";
  if (verified === v.length) return "verified";
  return "partial";
}

/**
 * OBJECTIVE channel richness — the fix for the volume bias.
 * Ranks each channel by the avg *validated* composite of the ideas it produced,
 * discounted by how many of those were duplicates of things already in the ledger.
 * A channel that floods near-duplicates is penalised, not rewarded for volume.
 */
export function channelRichness(ideas) {
  const by = new Map();
  for (const i of ideas) {
    const ch = i.source_channel || "unknown";
    if (!by.has(ch)) by.set(ch, { channel: ch, count: 0, dupes: 0, sum: 0, max: 0 });
    const e = by.get(ch);
    e.count++;
    e.sum += effScore(i);
    e.max = Math.max(e.max, effScore(i));
    if (i._dup) e.dupes++;
  }
  const rows = [...by.values()].map((e) => {
    const avg = e.count ? e.sum / e.count : 0;
    const dupRate = e.count ? e.dupes / e.count : 0;
    return {
      channel: e.channel,
      count: e.count,
      dupRate: +dupRate.toFixed(2),
      avgComposite: +avg.toFixed(2),
      maxComposite: +e.max.toFixed(2),
      richnessScore: +(avg * (1 - 0.5 * dupRate)).toFixed(2), // quality, penalised for dupes
    };
  });
  return rows.sort((a, b) => b.richnessScore - a.richnessScore);
}

/**
 * Normalise one raw idea (from the workflow's scored_ideas, or a re-merge) into a
 * uniform ledger record. Tolerant of nested `validation` (current workflow shape).
 */
export function normalizeIdea(raw, { today } = {}) {
  const v = raw.validation || raw;
  const scores = v.scores || raw.scores || {};
  const name = raw.name || raw.title || "(unnamed)";
  const composite = raw.composite != null ? raw.composite : compositeScore(scores);
  // the adversarial-verify→judge verdict (bizscout/radar workflows). verified_composite is
  // the rubric after the verdict's teeth; verify_flag is the verdict badge. Both optional —
  // ideas that predate the verify layer simply carry null and effScore falls back to composite.
  const verified_composite = raw.verified_composite != null ? raw.verified_composite : composite;
  const verify_flag = raw.verify_flag || null;
  const fc = raw.fact_checks || v.fact_checks || [];
  return {
    key: slugify(name),
    name,
    shape: raw.shape || "other",
    source_channel: raw.source_channel || raw.channel || "unknown",
    one_liner: raw.one_liner || "",
    the_insight: raw.the_insight || raw.insight || "",
    monetization: raw.monetization || "",
    surviving_wedge: v.surviving_wedge || raw.surviving_wedge || "",
    demand_evidence: v.demand_evidence || raw.demand_evidence || "",
    market_size: v.market_size || raw.market_size || "",
    scores,
    composite,
    verified_composite,
    verify_flag,
    verdict: v.verdict || raw.verdict || "YELLOW",
    confidence: v.confidence || raw.confidence || "medium",
    fact_checks: fc,
    fact_status: factStatus(fc),
    first_seen: today || raw.first_seen || "",
    last_seen: today || raw.last_seen || "",
    runs_seen: raw.runs_seen || 1,
    score_history: raw.score_history || (composite ? [{ date: today || "", composite, verified_composite }] : []),
  };
}

/** Collapse near-duplicates WITHIN one batch, keeping the highest-composite of each cluster. */
export function dedupeWithin(ideas, opts = {}) {
  const kept = [];
  for (const idea of [...ideas].sort((a, b) => effScore(b) - effScore(a))) {
    if (!kept.some((k) => isDuplicate(idea, k, opts))) kept.push(idea);
  }
  return kept;
}

/** Split a fresh run's normalized ideas into NEW / RESCORED / SEEN vs the ledger. */
export function classifyAgainstLedger(fresh, ledger, opts = {}) {
  const out = { new: [], rescored: [], seen: [] };
  for (const idea of fresh) {
    const prior = ledger.find((p) => isDuplicate(idea, p, opts));
    if (!prior) { out.new.push(idea); continue; }
    idea._dup = true;
    const delta = +(effScore(idea) - effScore(prior)).toFixed(2);
    if (Math.abs(delta) >= (opts.rescoreDelta ?? 0.3)) out.rescored.push({ idea, prior, delta });
    else out.seen.push({ idea, prior });
  }
  return out;
}

/** Merge a classified run into the ledger (returns a NEW ledger array). */
export function mergeLedger(ledger, classified, today) {
  const next = ledger.map((x) => ({ ...x }));
  const byKey = new Map(next.map((x) => [x.key, x]));
  const findPrior = (idea) => byKey.get(idea.key) || next.find((p) => isDuplicate(idea, p));
  for (const idea of classified.new) { next.push(idea); byKey.set(idea.key, idea); }
  for (const { idea, prior, delta } of classified.rescored) {
    const tgt = findPrior(prior);
    if (!tgt) continue;
    tgt.composite = idea.composite; tgt.scores = idea.scores; tgt.verdict = idea.verdict;
    tgt.verified_composite = idea.verified_composite != null ? idea.verified_composite : idea.composite;
    tgt.verify_flag = idea.verify_flag || tgt.verify_flag || null;
    tgt.fact_checks = idea.fact_checks?.length ? idea.fact_checks : tgt.fact_checks;
    tgt.fact_status = factStatus(tgt.fact_checks);
    tgt.last_seen = today; tgt.runs_seen = (tgt.runs_seen || 1) + 1;
    tgt.score_history = [...(tgt.score_history || []), { date: today, composite: idea.composite, verified_composite: tgt.verified_composite, delta }];
  }
  for (const { prior } of classified.seen) {
    const tgt = findPrior(prior);
    if (tgt) { tgt.last_seen = today; tgt.runs_seen = (tgt.runs_seen || 1) + 1; }
  }
  next.sort((a, b) => effScore(b) - effScore(a));
  return next;
}

// ===========================================================================
// Digest + human ledger writers
// ===========================================================================

const SHAPE_ICON = { "ai-saas": "🤖", "data-api": "🔌", "content-audience": "📣", "productized-service": "🛠", marketplace: "🏪", other: "•" };
const factBadge = (s) => ({ verified: "✅ verified", partial: "🟡 partly verified", unverified: "⚠️ UNVERIFIED", refuted: "❌ refuted", unchecked: "· unchecked" }[s] || s);
// the adversarial-verify→judge verdict badge (verify_flag). Only the teeth cases are loud.
const verifyBadge = (f) => ({ kill: "☠️ KILLED by verify", downgrade: "⬇️ downgraded by verify", flag_unverified: "🔬 verify: unverified", stand: "🛡️ verify: stands", "fact-checked": "", unverified: "" }[f] || "");

export function buildDigest(classified, richness, today) {
  const n = classified.new.length, r = classified.rescored.length, s = classified.seen.length;
  let md = `# Business-opportunity digest — ${today}\n\n`;
  md += `_${n} NEW · ${r} re-scored · ${s} already-seen (deduped). Ranked by VERIFIED composite — the 6-factor rubric after the adversarial verify→judge verdict cuts it (a broken moat or refuted claim downgrades; the raw rubric is shown in parentheses). `;
  md += `Every load-bearing claim is independently checked before it reaches you; ⚠️ = unverified, ⬇️ = the skeptic+judge panel downgraded it, ☠️ = killed._\n\n`;

  md += `## 🆕 New opportunities (${n})\n\n`;
  if (!n) md += `_None this run — every candidate was a duplicate of something already in the ledger. Honest scarcity beats repeating yourself._\n\n`;
  for (const o of [...classified.new].sort((a, b) => effScore(b) - effScore(a))) {
    const eff = effScore(o);
    const vb = verifyBadge(o.verify_flag);
    const wasNote = eff !== o.composite ? ` _(rubric ${o.composite})_` : "";
    md += `### [${eff}]${wasNote} ${SHAPE_ICON[o.shape] || "•"} ${o.name}  _(${o.shape} · ${o.verdict} · ${factBadge(o.fact_status)}${vb ? ` · ${vb}` : ""})_\n`;
    if (o.verify_flag === "downgrade" || o.verify_flag === "kill") md += `- _verify verdict: ${o.verify_flag} — the adversarial skeptic+judge panel cut this from the rubric ${o.composite}. See the ledger's \`verification\` for the skeptics' findings._\n`;
    md += `- ${o.one_liner}\n`;
    if (o.the_insight) md += `- **Wedge:** ${o.surviving_wedge || o.the_insight}\n`;
    if (o.demand_evidence) md += `- **Demand:** ${o.demand_evidence}\n`;
    md += `- _channel: ${o.source_channel}_\n\n`;
  }

  if (r) {
    md += `## 🔁 Re-scored (evidence moved ≥0.3)\n\n`;
    for (const { idea, delta } of classified.rescored.sort((a, b) => Math.abs(b.delta) - Math.abs(a.delta)))
      md += `- **${idea.name}** ${delta > 0 ? "▲" : "▼"} ${delta > 0 ? "+" : ""}${delta} → ${effScore(idea)} (${idea.verdict}${idea.verify_flag && verifyBadge(idea.verify_flag) ? ` · ${verifyBadge(idea.verify_flag)}` : ""})\n`;
    md += `\n`;
  }

  md += `## 📊 Channel richness this run (objective — avg validated score, dup-penalised)\n\n`;
  md += `_This replaces the old "which channel felt richest" guess. A channel that floods near-duplicates is penalised, not rewarded for volume._\n\n`;
  md += `| channel | ideas | avg | max | dup-rate | richness |\n|---|--:|--:|--:|--:|--:|\n`;
  for (const c of richness) md += `| ${c.channel} | ${c.count} | ${c.avgComposite} | ${c.maxComposite} | ${(c.dupRate * 100).toFixed(0)}% | **${c.richnessScore}** |\n`;
  md += `\n`;
  return md;
}

export function buildHumanLedger(ledger, today) {
  let md = `# OPPORTUNITIES — living ledger\n\n`;
  md += `> Auto-maintained by the Phase 5 business-opportunity scout (\`/loop-bizscout\`). ${ledger.length} ideas, deduped across runs. `;
  md += `Updated ${today}. Ranked by VERIFIED composite — the rubric (demand·moat·fit·speed·ceiling·competition) after the adversarial verify→judge verdict; the raw rubric is in (parens) when the verdict moved it. ⚠️ = a load-bearing claim is unverified.\n\n`;
  md += `| # | idea | shape | score | verdict | facts | channel | seen | first |\n|--:|---|---|--:|---|---|---|--:|---|\n`;
  ledger.forEach((o, i) => {
    const eff = effScore(o);
    const scoreCell = eff !== o.composite ? `${eff} _(${o.composite})_` : `${eff}`;
    md += `| ${i + 1} | **${o.name}** | ${o.shape} | ${scoreCell} | ${o.verdict} | ${factBadge(o.fact_status).replace(/^[^ ]+ /, "")} | ${o.source_channel} | ${o.runs_seen}× | ${o.first_seen} |\n`;
  });
  md += `\n_Full per-idea detail (wedge, demand proof, competitors, fact-checks) in \`.loop/biz-opportunities-ledger.json\`._\n`;
  return md;
}

// ===========================================================================
// I/O
// ===========================================================================

function ledgerPath(cfg) {
  const rel = (cfg?.bizOpportunities?.ledgerFile || ".loop/biz-opportunities-ledger.json").replace(/^\.loop\//, "");
  return join(LOOP_DIR, rel);
}
function digestPath(cfg) {
  const rel = (cfg?.bizOpportunities?.digestFile || ".loop/biz-opportunities-digest.md").replace(/^\.loop\//, "");
  return join(LOOP_DIR, rel);
}
function humanLedgerPath(cfg) {
  return join(ROOT, cfg?.bizOpportunities?.humanLedgerFile || "data/research/OPPORTUNITIES.md");
}
function loadLedger(cfg) {
  const p = ledgerPath(cfg);
  if (!existsSync(p)) return [];
  try { return JSON.parse(readFileSync(p, "utf8")).opportunities || []; } catch { return []; }
}
function ensureDir(p) { const d = dirname(p); if (!existsSync(d)) mkdirSync(d, { recursive: true }); }

/** Pull a uniform idea array out of whatever run-JSON shape we are handed. */
function extractIdeas(json) {
  const r = json.result || json;
  const arr = r.scored_ideas || r.opportunities || r.ideas || (Array.isArray(json) ? json : []);
  return Array.isArray(arr) ? arr : [];
}

function todayUTC() { return new Date().toISOString().slice(0, 10); }

function run() {
  const cfg = loadConfig();
  const today = todayUTC();
  const mode = ARGV.includes("--seed") ? "seed" : ARGV.includes("--merge") ? "merge" : null;
  const runFile = flagVal("--seed") || flagVal("--merge");
  if (!mode || !runFile) { console.error("usage: bizscout-ledger.mjs (--seed|--merge) <run.json>"); process.exit(1); }
  if (!existsSync(runFile)) { console.error(`run file not found: ${runFile}`); process.exit(1); }

  const raw = extractIdeas(JSON.parse(readFileSync(runFile, "utf8")));
  if (!raw.length) { console.error(`no ideas found in ${runFile} (looked for result.scored_ideas / opportunities / ideas)`); process.exit(1); }
  const ddOpts = cfg.bizOpportunities?.dedupe || {};
  const freshAll = raw.map((x) => normalizeIdea(x, { today }));
  const fresh = dedupeWithin(freshAll, ddOpts); // never show the same idea twice in one digest
  if (freshAll.length !== fresh.length) console.log(`  collapsed ${freshAll.length - fresh.length} within-batch duplicate(s)`);

  const ledger = mode === "seed" ? [] : loadLedger(cfg);
  const classified = classifyAgainstLedger(fresh, ledger, ddOpts);
  // for channel richness, mark which fresh ideas were dupes
  const dupKeys = new Set([...classified.rescored, ...classified.seen].map((x) => x.idea.key));
  for (const f of fresh) if (dupKeys.has(f.key)) f._dup = true;
  const richness = channelRichness(fresh);

  const nextLedger = mergeLedger(ledger, classified, today);

  // write machine ledger
  const lp = ledgerPath(cfg); ensureDir(lp);
  writeFileSync(lp, JSON.stringify({ updatedAt: new Date().toISOString(), count: nextLedger.length, opportunities: nextLedger }, null, 2) + "\n");
  // write run digest
  const dp = digestPath(cfg); ensureDir(dp);
  writeFileSync(dp, buildDigest(classified, richness, today));
  // write human ledger
  const hp = humanLedgerPath(cfg); ensureDir(hp);
  writeFileSync(hp, buildHumanLedger(nextLedger, today));

  console.log(`bizscout-ledger ${mode}: ${classified.new.length} new · ${classified.rescored.length} re-scored · ${classified.seen.length} seen → ledger now ${nextLedger.length}`);
  console.log(`  machine ledger : ${lp}`);
  console.log(`  run digest     : ${dp}`);
  console.log(`  human ledger   : ${hp}`);
  if (richness.length) {
    console.log(`  channel richness (objective, dup-penalised):`);
    for (const c of richness.slice(0, 6)) console.log(`    ${c.channel.padEnd(26)} avg ${String(c.avgComposite).padStart(4)}  dup ${(c.dupRate * 100).toFixed(0).padStart(3)}%  richness ${c.richnessScore}`);
  }
  const newUnverified = classified.new.filter((o) => o.fact_status === "unverified" || o.fact_status === "refuted");
  if (newUnverified.length) console.log(`  ⚠️  ${newUnverified.length} new idea(s) have an UNVERIFIED/refuted load-bearing claim — flagged in digest.`);
  process.exit(0);
}

// ===========================================================================
// Self-test (pure logic, no I/O)
// ===========================================================================

function selfTest() {
  let pass = 0, fail = 0;
  const ok = (n, c) => (c ? (pass++, console.log(`  ✓ ${n}`)) : (fail++, console.error(`  ✗ ${n}`)));
  console.log("bizscout-ledger.mjs self-test (pure logic)\n");

  // slugify
  ok("slugify normalises", slugify("Heir-Less (Succession!)") === "heir-less-succession");

  // composite
  const sc = { demand: 5, moat: 2, competition_shape: 4, profit_ceiling: 4, speed_to_cash: 5, founder_fit: 4 };
  ok("composite weighted correctly", compositeScore(sc) === +(5 * .25 + 2 * .2 + 4 * .15 + 4 * .15 + 5 * .15 + 4 * .1).toFixed(2));
  ok("composite empty -> 0", compositeScore({}) === 0);

  // jaccard + dedupe
  ok("jaccard identical -> 1", jaccard(tokenSet("contact decay api"), tokenSet("contact decay api")) === 1);
  ok("dedupe exact key", isDuplicate({ key: "x" }, { key: "x" }));
  ok("dedupe fuzzy rename", isDuplicate(
    { name: "DataLedger", one_liner: "generate the California AB 2013 training-data disclosure artifact" },
    { name: "DisclosureForge", one_liner: "generate the California AB 2013 training data disclosure document" }));
  ok("dedupe rejects unrelated", !isDuplicate(
    { name: "DiffData", one_liner: "verify a contact record freshness via MCP" },
    { name: "ParvaCast", one_liner: "festival demand forecasts for temple-town vendors" }));

  // factStatus
  ok("factStatus refuted dominates", factStatus([{ verified: true }, { verified: "false" }]) === "refuted");
  ok("factStatus all true -> verified", factStatus([{ verified: true }, { verified: "verified" }]) === "verified");
  ok("factStatus none true -> unverified", factStatus([{ verified: "unclear" }]) === "unverified");
  ok("factStatus empty -> unchecked", factStatus([]) === "unchecked");

  // channel richness penalises dupe-flooding
  const rich = channelRichness([
    { source_channel: "regulatory", composite: 3.8 },
    { source_channel: "regulatory", composite: 2.0, _dup: true },
    { source_channel: "regulatory", composite: 2.0, _dup: true },
    { source_channel: "regulatory", composite: 2.0, _dup: true },
    { source_channel: "ai-frontier", composite: 3.4 },
    { source_channel: "ai-frontier", composite: 3.2 },
  ]);
  const reg = rich.find((r) => r.channel === "regulatory");
  const fro = rich.find((r) => r.channel === "ai-frontier");
  ok("richness: dup-flooded channel ranks below the clean higher-avg one", fro.richnessScore > reg.richnessScore);
  ok("richness: volume alone does not win (regulatory had more ideas)", rich[0].channel === "ai-frontier");

  // classify + merge end-to-end
  const ledger = [normalizeIdea({ name: "DiffData", one_liner: "contact delta verification MCP api", scores: sc }, { today: "2026-06-08" })];
  const fresh = [
    normalizeIdea({ name: "DiffData", one_liner: "contact delta verification MCP api", scores: { ...sc, demand: 5 } }, { today: "2026-06-09" }), // seen (same)
    normalizeIdea({ name: "BrandNewThing", one_liner: "a totally different widget for dentists", scores: sc }, { today: "2026-06-09" }), // new
  ];
  const cl = classifyAgainstLedger(fresh, ledger);
  ok("classify: 1 new, 1 seen", cl.new.length === 1 && cl.seen.length === 1 && cl.new[0].name === "BrandNewThing");
  const merged = mergeLedger(ledger, cl, "2026-06-09");
  ok("merge: ledger grows to 2", merged.length === 2);
  ok("merge: seen idea bumped runs_seen", merged.find((x) => x.key === "diffdata").runs_seen === 2);

  // rescore path
  const fresh2 = [normalizeIdea({ name: "DiffData", one_liner: "contact delta verification MCP api", scores: { ...sc, demand: 1, moat: 1 } }, { today: "2026-06-10" })];
  const cl2 = classifyAgainstLedger(fresh2, merged);
  ok("classify: large score drop -> rescored", cl2.rescored.length === 1 && cl2.rescored[0].delta < 0);

  // dedupeWithin collapses a near-dup pair in one batch, keeping the higher composite
  const within = dedupeWithin([
    normalizeIdea({ name: "DisclosureForge", one_liner: "generate the California AB 2013 training data disclosure", composite: 3.45 }),
    normalizeIdea({ name: "DataLedger", one_liner: "generate the California AB 2013 training-data disclosure artifact", composite: 3.1 }),
    normalizeIdea({ name: "DiffData", one_liner: "verify a contact record freshness via MCP", composite: 3.3 }),
  ]);
  ok("dedupeWithin: collapses near-dup, keeps 2", within.length === 2);
  ok("dedupeWithin: keeps the higher-composite of the pair", within.some((x) => x.name === "DisclosureForge") && !within.some((x) => x.name === "DataLedger"));

  // ---- adversarial-verify→judge teeth: the ledger ranks/displays on effScore ----
  ok("effScore falls back to composite when no verdict", effScore({ composite: 3.4 }) === 3.4);
  ok("effScore uses verified_composite when present", effScore({ composite: 3.75, verified_composite: 2.63 }) === 2.63);
  ok("effScore: a kill (verified 0) is honoured, not read as missing", effScore({ composite: 4.0, verified_composite: 0 }) === 0);

  const vHi = normalizeIdea({ name: "BrokenMoat", one_liner: "high rubric but the moat was demolished by skeptics", scores: sc, composite: 3.75, verified_composite: 2.63, verify_flag: "downgrade" }, { today: "2026-06-17" });
  ok("normalizeIdea carries verified_composite + verify_flag", vHi.verified_composite === 2.63 && vHi.verify_flag === "downgrade");
  const cLo = normalizeIdea({ name: "CleanLower", one_liner: "lower rubric but survives verification intact", scores: sc, composite: 3.0, verified_composite: 3.0, verify_flag: "stand" }, { today: "2026-06-17" });
  const rankMerged = mergeLedger([], { new: [vHi, cLo], rescored: [], seen: [] }, "2026-06-17");
  ok("ledger ranks by effScore: downgraded 3.75→2.63 sits BELOW clean 3.0", rankMerged[0].name === "CleanLower" && rankMerged[1].name === "BrokenMoat");

  const richV = channelRichness([
    { source_channel: "alpha", composite: 3.8, verified_composite: 2.0 },
    { source_channel: "beta", composite: 3.0, verified_composite: 3.0 },
  ]);
  ok("richness uses effScore (downgraded alpha ranks below clean beta)", richV[0].channel === "beta");

  const baseL = [normalizeIdea({ name: "FlipFlop", one_liner: "a claim later refuted on re-verify", scores: sc, composite: 3.6, verified_composite: 3.6 }, { today: "2026-06-16" })];
  const reVer = [normalizeIdea({ name: "FlipFlop", one_liner: "a claim later refuted on re-verify", scores: sc, composite: 3.6, verified_composite: 2.5, verify_flag: "downgrade" }, { today: "2026-06-17" })];
  const clV = classifyAgainstLedger(reVer, baseL);
  ok("classify: a verify downgrade on re-merge -> rescored ▼", clV.rescored.length === 1 && clV.rescored[0].delta < 0);

  // the digest + human-ledger render the verdict without throwing (no-I/O render check)
  const digestMd = buildDigest({ new: [vHi, cLo], rescored: [], seen: [] }, channelRichness([vHi, cLo]), "2026-06-17");
  ok("buildDigest: effScore headline + rubric note for the downgraded idea", digestMd.includes("[2.63]") && digestMd.includes("rubric 3.75"));
  ok("buildDigest: tags the downgrade verdict", digestMd.includes("downgraded by verify"));
  const humanMd = buildHumanLedger(rankMerged, "2026-06-17");
  ok("buildHumanLedger: score cell shows effScore + raw rubric", humanMd.includes("2.63 _(3.75)_"));

  console.log(`\n${fail === 0 ? "ALL GREEN" : "FAILURES"} — ${pass} passed, ${fail} failed`);
  process.exit(fail === 0 ? 0 : 1);
}

if (SELF_TEST) selfTest();
else run();
