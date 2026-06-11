#!/usr/bin/env node
/**
 * strategist-checklist.mjs — the DETERMINISTIC half of the principles layer.
 *
 * The Workflow (strategist-checklist-workflow.js) does the judgment: it distills the
 * strategist transcripts into one checklist and scores every ledger idea against it.
 * This module does the bookkeeping that must be reproducible and testable:
 *   - turn an idea's per-item verdicts into a weighted "checklist-fit" (0-1),
 *   - flag load-bearing deal-breakers (weight-3 items the idea fails),
 *   - blend checklist-fit with the existing 6-factor composite into one "conviction" score,
 *   - persist the canonical checklist + a human report + fold fields back into the ledger.
 *
 * We do NOT let the agent grade its own homework: the agent gives per-item verdicts,
 * the math here turns them into the number that ranks the portfolio.
 *
 * CLI:
 *   node scripts/_loop/strategist-checklist.mjs --apply <workflow-result.json>
 *   node scripts/_loop/strategist-checklist.mjs --self-test
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '../..');

export const LEDGER_FILE = path.join(ROOT, '.loop/biz-opportunities-ledger.json');
export const CHECKLIST_JSON = path.join(ROOT, 'data/research/strategist-checklist.json');
export const CHECKLIST_MD = path.join(ROOT, 'data/research/STRATEGIST-CHECKLIST.md');
export const SCORED_MD = path.join(ROOT, 'data/research/OPPORTUNITIES-SCORED.md');
export const TATA_GATE_JSON = path.join(ROOT, 'data/research/ratan-tata-gate.json');
export const TATA_GATE_MD = path.join(ROOT, 'data/research/RATAN-TATA-GATE.md');

// How much the strategist checklist (the "wisdom layer") counts vs the original
// 6-factor demand/moat/etc. composite. The checklist is the new gate the founder
// asked for, so it carries slightly more than half.
export const BLEND = { checklist: 0.55, composite: 0.45 };

// A checklist item is one of three STAGES:
//   - idea     : assessable from the opportunity itself (demand, moat, distribution-path,
//                unit-economics potential, timing). THIS is what we screen ideas on.
//   - execution: "how you'd run it well IF you pursue it" — a playbook, not a filter.
//                A pre-launch idea hasn't done these yet, so they don't drag its score.
//   - founder  : about the operator, not the idea — constant across ideas, so non-differentiating.
// Headline conviction scores IDEA-stage items only; execution + founder items become guidance.
export const STAGE = {
  'validated-paying-demand': 'idea',
  'large-growing-market': 'idea',
  'latent-unmet-need': 'idea',
  'defensible-moat': 'idea',
  'category-creation': 'idea',
  'distribution-moat': 'idea',
  'unit-economics': 'idea',
  'low-capex-mvp': 'idea',
  'scale-economics': 'idea',
  'value-as-outcome-and-offer': 'idea',
  'multiple-acquisition-pillars': 'idea',
  'trust-infrastructure': 'idea',
  'thematic-timing-tailwind': 'idea',
  'survive-constraint-shifts': 'idea',
  'ltv-driven-acquisition': 'execution',
  'day-one-cash-and-runway': 'execution',
  'decision-maker-access': 'execution',
  'customer-obsession': 'execution',
  'raving-fans-surprise': 'execution',
  'hire-for-attitude-and-ownership': 'execution',
  'complete-team-and-cofounder-trust': 'execution',
  'hire-experts-and-delegate': 'execution',
  'culture-as-asset': 'execution',
  'execution-over-idea': 'execution',
  'study-best-then-beat-by-15': 'execution',
  'outcome-driven-measurement': 'execution',
  'three-growth-levers': 'execution',
  'systems-replace-founder': 'execution',
  'founder-passion-fit': 'founder',
  'emotional-resilience': 'founder',
  'low-entitlement-ownership': 'founder',
  'focus-no-plan-b': 'founder',
  'probabilistic-betting-with-reserve': 'founder',
  'failure-portfolio-mindset': 'founder',
  'regret-threshold-conviction': 'founder',
};
// fallback for checklist items a future run invents that aren't in STAGE
const CATEGORY_STAGE = { demand: 'idea', moat: 'idea', timing: 'idea', gtm: 'idea', economics: 'idea', customer: 'idea', team: 'execution', execution: 'execution', founder: 'founder', risk: 'founder' };
export function stageOf(item) {
  return STAGE[item.id] || CATEGORY_STAGE[item.category] || 'idea';
}
export function annotateStages(checklist) {
  return (checklist || []).map((c) => ({ ...c, stage: c.stage || stageOf(c) }));
}

// verdict -> credit. unknown is excluded from the denominator (no guessing).
export function verdictScore(v) {
  if (v === 'pass') return 1;
  if (v === 'partial') return 0.5;
  if (v === 'fail') return 0;
  return null; // unknown
}

/**
 * Weighted checklist-fit for one idea.
 * @param {Array<{id,verdict}>} verdicts
 * @param {Array<{id,weight}>} checklist
 * @returns {{fit:number, fitLoadBearing:number, dealbreakers:string[], scored:number, total:number, weightMissing:number}}
 */
export function fitForIdea(verdicts, checklist) {
  const byId = new Map(checklist.map((c) => [c.id, c]));
  const vById = new Map((verdicts || []).map((v) => [v.id, v.verdict]));
  let num = 0, den = 0;               // all items
  let lbNum = 0, lbDen = 0;           // load-bearing (weight >= 3) only
  let weightMissing = 0;             // weight of items the agent left unknown
  const dealbreakers = [];
  for (const item of checklist) {
    const w = Number(item.weight) || 1;
    const verdict = vById.get(item.id);
    const s = verdictScore(verdict);
    if (s === null) { weightMissing += w; }
    else { num += w * s; den += w; }
    if (w >= 3) {
      if (s === null) { /* unknown load-bearing: ignore in denom */ }
      else { lbNum += w * s; lbDen += w; }
      if (verdict === 'fail') dealbreakers.push(item.id);
    } else if (w >= 2 && verdict === 'fail') {
      // weight-2 fails are notable but not hard deal-breakers
    }
  }
  return {
    fit: den ? num / den : 0,
    fitLoadBearing: lbDen ? lbNum / lbDen : 0,
    dealbreakers,
    scored: den,
    total: checklist.length,
    weightMissing,
  };
}

/** Blend checklist-fit (0-1) and 6-factor composite (0-5) into one 0-5 conviction. */
export function conviction(fit, composite, blend = BLEND) {
  const fit5 = fit * 5;
  const comp = Number(composite) || 0;
  return Math.round((blend.checklist * fit5 + blend.composite * comp) * 100) / 100;
}

/** Tier label off conviction + deal-breakers. Deal-breakers cap the tier. */
export function tierFor(convictionScore, dealbreakerCount) {
  if (dealbreakerCount >= 2) return 'PARK'; // fails 2+ load-bearing strategist tests
  if (convictionScore >= 3.5 && dealbreakerCount === 0) return 'PURSUE';
  if (convictionScore >= 2.6) return 'WATCH';
  return 'PARK';
}

// The Ratan Tata gate is the FINAL word and OVERRIDES the strategist tier — even a
// perfect-conviction idea is BLOCKED if it fails his integrity test. ("Even if the
// others are contradictory, follow Ratan Tata. He is the final gate, always.")
export const TIER_RANK = { BLOCKED: 0, PARK: 1, WATCH: 2, PURSUE: 3 };
export function finalTierFor(strategistTier, tata) {
  if (!tata || !tata.verdict) return strategistTier;          // gate not run yet
  if (tata.verdict === 'fail') return 'BLOCKED';              // hard veto, regardless of conviction
  if (tata.verdict === 'conditional') return strategistTier === 'PURSUE' ? 'WATCH' : strategistTier; // cap
  return strategistTier;                                      // 'pass' — strategist tier stands
}

/** Merge workflow result into ranked rows (deterministic). Headline fit = IDEA-stage only. */
export function rankIdeas(result, ledgerOpportunities) {
  const checklist = annotateStages(result.checklist || []);
  const ideaItems = checklist.filter((c) => c.stage === 'idea');
  const execItems = checklist.filter((c) => c.stage === 'execution');
  const founderItems = checklist.filter((c) => c.stage === 'founder');
  const ledgerByKey = new Map((ledgerOpportunities || []).map((o) => [o.key, o]));
  const rows = (result.scored || []).map((s) => {
    const led = ledgerByKey.get(s.key) || {};
    const composite = led.composite != null ? led.composite : (s.composite || 0);
    const f = fitForIdea(s.item_verdicts, ideaItems);       // headline: idea-quality only
    const ex = fitForIdea(s.item_verdicts, execItems);      // execution readiness (guidance)
    const fo = fitForIdea(s.item_verdicts, founderItems);   // founder readiness (guidance)
    const conv = conviction(f.fit, composite);
    return {
      key: s.key,
      name: s.name || led.name || s.key,
      category: led.category || s.category || '',
      composite: Math.round(composite * 100) / 100,
      checklistFit: Math.round(f.fit * 1000) / 1000,
      fitLoadBearing: Math.round(f.fitLoadBearing * 1000) / 1000,
      execReadiness: Math.round(ex.fit * 1000) / 1000,
      founderReadiness: Math.round(fo.fit * 1000) / 1000,
      conviction: conv,
      factStatus: led.fact_status || 'unchecked',           // from the fact-check gate (separate from fit)
      dealbreakers: f.dealbreakers,                         // idea-stage weight-3 fails only
      tier: tierFor(conv, f.dealbreakers.length),           // strategist (quality) tier
      tata: led.tata || null,                               // Ratan Tata gate verdict (if run)
      finalTier: finalTierFor(tierFor(conv, f.dealbreakers.length), led.tata),
      coverage: `${f.scored}/${ideaItems.length * 3}`,      // weighted coverage of idea items
      ideaItemsAssessed: f.scored,
      top_strengths: s.top_strengths || [],
      top_gaps: s.top_gaps || [],
      strategist_verdict: s.strategist_verdict || '',
      item_verdicts: s.item_verdicts || [],
    };
  });
  // Sort by FINAL tier (Tata-gated) first, then conviction within tier.
  rows.sort((a, b) => (TIER_RANK[b.finalTier] - TIER_RANK[a.finalTier]) || (b.conviction - a.conviction));
  return rows;
}

function bar(x) {
  const n = Math.max(0, Math.min(10, Math.round(x * 10)));
  return '█'.repeat(n) + '░'.repeat(10 - n);
}

export function buildChecklistMd(result) {
  const cl = annotateStages(result.checklist || []);
  const consensus = result.consensus_principles || [];
  const STAGES = [
    ['idea', '🎯 Idea-quality screen', 'These are what we score an opportunity ON — assessable before you build a thing. Failing 2+ weight-3 items here caps an idea at PARK.'],
    ['execution', '⚙️ Execution playbook', "Not a filter — the bar you'd have to clear to WIN whichever idea you pursue. A pre-launch idea hasn't done these yet, so they don't drag its score."],
    ['founder', '🧭 Founder-fit', 'About the operator (you), not the idea. Constant across ideas — use as a personal go/no-go, not a ranking input.'],
  ];
  let md = `# The Strategist Business-Quality Checklist\n\n`;
  md += `> The **principles layer** of the opportunity scout. Distilled from **Masters' Union** founder masterclasses (Screwvala, MobiKwik, Zepto, Hike, Fixderma…) + **Tony Robbins** business frameworks (10X, 7 Forces, strategic innovation) + **Basesh Gala** (18 frameworks) + **Bhavin Shah**. Every idea in the scout ledger is scored against these tests.\n\n`;
  md += `**${cl.length} checklist items** · ${cl.filter((c) => c.weight >= 3).length} cross-strategist load-bearing (weight 3) · split into idea-quality (the screen), execution (the playbook), and founder-fit.\n\n`;
  if (consensus.length) {
    md += `## What nearly all of them agree on\n\n`;
    for (const p of consensus) md += `- ${p}\n`;
    md += `\n`;
  }
  for (const [stage, heading, blurb] of STAGES) {
    const items = cl.filter((c) => c.stage === stage);
    if (!items.length) continue;
    md += `## ${heading} (${items.length})\n\n_${blurb}_\n\n`;
    const byCat = {};
    for (const c of items) (byCat[c.category] = byCat[c.category] || []).push(c);
    for (const cat of Object.keys(byCat).sort()) {
      md += `### ${cat}\n\n`;
      for (const c of byCat[cat].sort((a, b) => b.weight - a.weight)) {
        const stars = '★'.repeat(c.weight) + '☆'.repeat(3 - c.weight);
        md += `- **${c.title}** ${stars}  \n`;
        md += `  _Test:_ ${c.test}  \n`;
        if (c.why_it_matters) md += `  _Why:_ ${c.why_it_matters}  \n`;
        md += `  _Backed by:_ ${(c.strategists || []).join(', ')}\n\n`;
      }
    }
  }
  if (result.synth_notes) md += `---\n\n_Synthesis notes:_ ${result.synth_notes}\n`;
  return md;
}

const TATA_FLAG = (t) => !t || !t.verdict ? '—' : t.verdict === 'pass' ? '🟢 pass' : t.verdict === 'conditional' ? '🟠 cond.' : '⛔ FAIL';
const TATA_RUN = (rows) => rows.some((r) => r.tata && r.tata.verdict);

export function buildScoredMd(rows, result, today) {
  const cl = annotateStages(result.checklist || []);
  const ideaCount = cl.filter((c) => c.stage === 'idea').length;
  const titleById = new Map(cl.map((c) => [c.id, c.title]));
  const tataRun = TATA_RUN(rows);
  let md = `# Opportunities — scored against the Strategist Checklist\n\n`;
  md += `> Generated ${today}. Each idea graded against the [Strategist Checklist](STRATEGIST-CHECKLIST.md) (${cl.length} items). **Conviction** = ${BLEND.checklist} × idea-quality-fit + ${BLEND.composite} × 6-factor composite. Only the **${ideaCount} idea-quality** items score an idea (execution + founder items are a roadmap, not a filter). An idea that **fails 2+ load-bearing idea-quality tests** is capped at **PARK** regardless of score.\n\n`;
  md += `> ⚠️ **Fit ≠ verified.** Conviction measures how well the idea fits what great operators demand — NOT whether its demand claims are true. The **Fact** column is the separate fact-check gate: \`refuted\` = a load-bearing claim was checked and is false, \`partial\` = mixed, \`unchecked\` = not yet run.\n\n`;
  if (tataRun) md += `> ⛔ **The Ratan Tata gate is the FINAL word.** The [Ratan Tata Gate](RATAN-TATA-GATE.md) is an integrity/ethics veto that OVERRIDES conviction: a \`FAIL\` → **BLOCKED** no matter how high the score; \`conditional\` → capped at WATCH until the concern is resolved. "Even if the others are contradictory, follow Ratan Tata. He is the final gate, always." The **Tier** column below is the FINAL, Tata-gated tier.\n\n`;
  // group by FINAL tier (Tata-gated)
  const order = ['BLOCKED', 'PURSUE', 'WATCH', 'PARK'];
  const tiers = { BLOCKED: [], PURSUE: [], WATCH: [], PARK: [] };
  for (const r of rows) (tiers[r.finalTier] || tiers.PARK).push(r);
  const counts = order.filter((t) => tiers[t].length).map((t) => `${tiers[t].length} ${t}`).join(' · ');
  md += `**${counts}**\n\n`;
  const factFlag = (f) => f === 'refuted' ? '🔴 refuted' : f === 'partial' ? '🟡 partial' : (f && f !== 'unchecked' && f !== 'verified') ? f : (f === 'verified' ? '🟢 verified' : '—');
  md += `| # | Idea | Conviction | Idea-quality fit | Composite | 🛑 | Fact |${tataRun ? ' Tata |' : ''} Tier |\n`;
  md += `|---|------|-----------|------------------|-----------|----|------|${tataRun ? '------|' : ''}------|\n`;
  rows.forEach((r, i) => {
    md += `| ${i + 1} | **${r.name}** | ${r.conviction.toFixed(2)} | ${bar(r.checklistFit)} ${(r.checklistFit * 100).toFixed(0)}% | ${r.composite.toFixed(1)} | ${r.dealbreakers.length || '—'} | ${factFlag(r.factStatus)} |${tataRun ? ` ${TATA_FLAG(r.tata)} |` : ''} ${r.finalTier} |\n`;
  });
  md += `\n---\n\n`;
  const dbNames = (ids) => ids.map((id) => titleById.get(id) || id);
  const tierBlurb = { BLOCKED: '⛔ **Blocked by the Ratan Tata gate** — fails a non-negotiable integrity test. Not to be built as-is, whatever the conviction.', PURSUE: '', WATCH: '', PARK: '' };
  for (const tier of order) {
    if (!tiers[tier].length) continue;
    md += `## ${tier}\n\n`;
    if (tierBlurb[tier]) md += `${tierBlurb[tier]}\n\n`;
    for (const r of tiers[tier]) {
      md += `### ${r.name} — conviction ${r.conviction.toFixed(2)}${tier === 'BLOCKED' ? ' · ⛔ BLOCKED' : ''}\n`;
      md += `_idea-quality fit ${(r.checklistFit * 100).toFixed(0)}% · composite ${r.composite.toFixed(1)} · strategist-tier ${r.tier}_\n\n`;
      if (r.tata && r.tata.verdict && r.tata.verdict !== 'pass') {
        const icon = r.tata.verdict === 'fail' ? '⛔' : '🟠';
        md += `- ${icon} **Ratan Tata gate: ${r.tata.verdict.toUpperCase()}** — ${r.tata.reason || ''}\n`;
        if (r.tata.failed_tests && r.tata.failed_tests.length) md += `  - Fails: ${r.tata.failed_tests.join(', ')}\n`;
        if (r.tata.concerns && r.tata.concerns.length) md += `  - Concerns: ${r.tata.concerns.join('; ')}\n`;
        if (r.tata.fix) md += `  - To clear the gate: ${r.tata.fix}\n`;
      } else if (r.tata && r.tata.verdict === 'pass') {
        md += `- 🟢 **Ratan Tata gate: PASS** — ${r.tata.reason || 'no integrity concerns.'}\n`;
      }
      if (r.strategist_verdict) md += `\n${r.strategist_verdict}\n\n`;
      if (r.top_strengths.length) md += `- ✅ **Passes:** ${r.top_strengths.join('; ')}\n`;
      if (r.top_gaps.length) md += `- ⚠️ **Gaps:** ${r.top_gaps.join('; ')}\n`;
      if (r.dealbreakers.length) md += `- 🛑 **Load-bearing fails:** ${dbNames(r.dealbreakers).join('; ')}\n`;
      if (r.factStatus === 'refuted') md += `- 🔴 **Fact-check: REFUTED** — a load-bearing demand claim was checked and is false. Re-validate before trusting.\n`;
      else if (r.factStatus === 'partial') md += `- 🟡 **Fact-check: partial** — some claims verified, some not.\n`;
      md += `\n`;
    }
  }
  return md;
}

export function buildGateMd(gate, meta = {}) {
  const tests = gate.gate_tests || [];
  let md = `# The Ratan Tata Final Gate\n\n`;
  md += `> The **final word** on every business opportunity. The strategist checklist asks "will it *win*?"; this asks "*should* it exist — would Ratan Tata be proud to put the Tata name on it?" **It overrides everything**: an idea that fails a non-negotiable (weight-3) test here is BLOCKED no matter how high its conviction. Distilled from his documented decisions, the Tata Code of Conduct, and verified quotes — not from viral misattributions.\n\n`;
  md += `**The overarching test:** ${gate.overall_test || 'Would Ratan Tata be proud to put the Tata name on this?'}\n\n`;
  md += `**${tests.length} gate tests** · ${tests.filter((t) => t.weight >= 3).length} non-negotiable veto (weight 3).\n\n`;
  for (const t of tests.sort((a, b) => b.weight - a.weight)) {
    const stars = t.weight >= 3 ? '⛔ VETO' : t.weight === 2 ? '★★' : '★';
    md += `### ${t.title} — ${stars}\n`;
    md += `- **Test:** ${t.test}\n`;
    if (t.why) md += `- **Why:** ${t.why}\n`;
    md += `- **Basis (Ratan Tata):** ${t.basis}\n\n`;
  }
  if ((gate.verified_quotes || []).length) {
    md += `## Verified quotes (sourced — fabricated ones rejected)\n\n`;
    for (const q of gate.verified_quotes) md += `- "${q.quote}"${q.source_url ? ` — [source](${q.source_url})` : ''}\n`;
    md += `\n`;
  }
  if ((gate.honest_caveats || []).length) {
    md += `## Honest caveats (so this is a fair gate, not hagiography)\n\n`;
    for (const c of gate.honest_caveats) md += `- ${c}\n`;
    md += `\n`;
  }
  // Only list GENUINE fabrications — the verifier sometimes marks an authentic
  // institutional (Tata Code) quote "refuted" because it's not a personal Ratan
  // Tata quote; those are not fakes and must not be branded as such.
  const realFab = (meta.refutedQuotes || []).filter((r) => /fabricat|misattribut|no credible|not attribut|invent|fake|unverifi|wrongly/i.test(r.note || ''));
  if (realFab.length) {
    md += `## Rejected as fabricated/misattributed (did NOT pass verification)\n\n`;
    md += `_The internet is full of fake "Ratan Tata quotes". These were checked and rejected — none are used in the gate:_\n\n`;
    for (const r of realFab) md += `- ~~"${r.item}"~~ — ${r.note || 'unverifiable / misattributed'}\n`;
    md += `\n`;
  }
  return md;
}

function applyResult(resultPath) {
  const result = JSON.parse(fs.readFileSync(resultPath, 'utf8'));
  // A scores-only file (from the scoring workflow) carries no checklist — merge in
  // the stored canonical checklist so the repeatable path is a single command.
  if ((!result.checklist || !result.checklist.length) && fs.existsSync(CHECKLIST_JSON)) {
    const stored = JSON.parse(fs.readFileSync(CHECKLIST_JSON, 'utf8'));
    result.checklist = stored.checklist || [];
    if (!result.consensus_principles) result.consensus_principles = stored.consensus_principles || [];
    if (!result.perVideo) result.perVideo = stored.sources || [];
    if (!result.generatedAt) result.generatedAt = stored.generatedAt || null;
  }
  const ledger = JSON.parse(fs.readFileSync(LEDGER_FILE, 'utf8'));
  const opps = ledger.opportunities || [];
  const rows = rankIdeas(result, opps);
  const today = (result.generatedAt || '').slice(0, 10) || 'today';

  // 1) persist canonical checklist (with stages annotated)
  fs.writeFileSync(CHECKLIST_JSON, JSON.stringify({ generatedAt: result.generatedAt || null, checklist: annotateStages(result.checklist || []), consensus_principles: result.consensus_principles || [], sources: result.perVideo || [] }, null, 2));
  fs.writeFileSync(CHECKLIST_MD, buildChecklistMd(result));
  fs.writeFileSync(SCORED_MD, buildScoredMd(rows, result, today));

  // 2) fold strategist fields back into the ledger (durable)
  const rowByKey = new Map(rows.map((r) => [r.key, r]));
  for (const o of opps) {
    const r = rowByKey.get(o.key);
    if (!r) continue;
    o.strategist = {
      checklistFit: r.checklistFit,
      fitLoadBearing: r.fitLoadBearing,
      conviction: r.conviction,
      tier: r.tier,
      dealbreakers: r.dealbreakers,
      coverage: r.coverage,
      verdict: r.strategist_verdict,
      scoredAt: result.generatedAt || null,
    };
  }
  ledger.updatedAt = result.generatedAt || ledger.updatedAt;
  fs.writeFileSync(LEDGER_FILE, JSON.stringify(ledger, null, 2));

  return { rows, checklist: result.checklist || [] };
}

// Overlay the Ratan Tata gate verdicts onto the ledger, write the gate doc, and
// re-render the scored report so the FINAL (Tata-gated) tier shows. Needs the
// strategist scores file too (to rebuild the per-idea strengths/gaps in the report).
function applyTata(tataScoresPath, strategistScoresPath) {
  const tata = JSON.parse(fs.readFileSync(tataScoresPath, 'utf8'));
  const ledger = JSON.parse(fs.readFileSync(LEDGER_FILE, 'utf8'));
  const opps = ledger.opportunities || [];
  const byKey = new Map((tata.scored || []).map((s) => [s.key, s]));
  let blocked = 0, cond = 0, passed = 0;
  for (const o of opps) {
    const s = byKey.get(o.key);
    if (!s) continue;
    o.tata = {
      verdict: s.verdict, failed_tests: s.failed_tests || [], concerns: s.concerns || [],
      reason: s.reason || '', fix: s.fix || '', scoredAt: tata.generatedAt || null,
    };
    if (s.verdict === 'fail') blocked++; else if (s.verdict === 'conditional') cond++; else passed++;
  }
  fs.writeFileSync(LEDGER_FILE, JSON.stringify(ledger, null, 2));
  // write the human gate doc from the stored gate json
  if (fs.existsSync(TATA_GATE_JSON)) {
    const g = JSON.parse(fs.readFileSync(TATA_GATE_JSON, 'utf8'));
    fs.writeFileSync(TATA_GATE_MD, buildGateMd(g.gate || g, { refutedQuotes: g.refutedQuotes || g.refuted || [] }));
  }
  const out = applyResult(strategistScoresPath); // re-render with finalTier
  return { ...out, blocked, cond, passed };
}

// ---------------- self-test ----------------
function selfTest() {
  let pass = 0, fail = 0;
  const eq = (name, got, want) => {
    const ok = JSON.stringify(got) === JSON.stringify(want);
    if (ok) pass++; else { fail++; console.error(`FAIL ${name}: got ${JSON.stringify(got)} want ${JSON.stringify(want)}`); }
  };
  const near = (name, got, want, tol = 1e-6) => {
    const ok = Math.abs(got - want) <= tol;
    if (ok) pass++; else { fail++; console.error(`FAIL ${name}: got ${got} want ${want}`); }
  };

  eq('verdict pass', verdictScore('pass'), 1);
  eq('verdict partial', verdictScore('partial'), 0.5);
  eq('verdict fail', verdictScore('fail'), 0);
  eq('verdict unknown', verdictScore('xyz'), null);

  const checklist = [
    { id: 'demand', weight: 3 },
    { id: 'moat', weight: 3 },
    { id: 'eco', weight: 2 },
    { id: 'gtm', weight: 1 },
  ];
  // all pass -> fit 1
  let f = fitForIdea([{ id: 'demand', verdict: 'pass' }, { id: 'moat', verdict: 'pass' }, { id: 'eco', verdict: 'pass' }, { id: 'gtm', verdict: 'pass' }], checklist);
  near('all pass fit', f.fit, 1);
  eq('all pass no dealbreakers', f.dealbreakers, []);

  // demand fail (w3) + rest pass -> num = 0*3 + 3 + 2 + 1 = 6 ; den = 9 ; fit = 0.6667
  f = fitForIdea([{ id: 'demand', verdict: 'fail' }, { id: 'moat', verdict: 'pass' }, { id: 'eco', verdict: 'pass' }, { id: 'gtm', verdict: 'pass' }], checklist);
  near('one w3 fail fit', f.fit, 6 / 9);
  eq('one w3 fail dealbreaker', f.dealbreakers, ['demand']);

  // unknown excluded from denom: moat unknown -> num = 3(demand pass) + 2 + 1 = 6 ; den = 3+2+1 = 6 ; fit = 1
  f = fitForIdea([{ id: 'demand', verdict: 'pass' }, { id: 'moat', verdict: 'unknownish' }, { id: 'eco', verdict: 'pass' }, { id: 'gtm', verdict: 'pass' }], checklist);
  near('unknown excluded fit', f.fit, 1);
  near('unknown weight tracked', f.weightMissing, 3);
  eq('unknown coverage', f.scored, 6);

  // partial credit: demand partial -> num = 1.5 + 3 + 2 + 1 = 7.5 ; den 9 ; fit 0.8333
  f = fitForIdea([{ id: 'demand', verdict: 'partial' }, { id: 'moat', verdict: 'pass' }, { id: 'eco', verdict: 'pass' }, { id: 'gtm', verdict: 'pass' }], checklist);
  near('partial fit', f.fit, 7.5 / 9);

  // load-bearing fit ignores w<3 items: demand pass, moat fail -> lbNum=3, lbDen=6 -> 0.5
  f = fitForIdea([{ id: 'demand', verdict: 'pass' }, { id: 'moat', verdict: 'fail' }, { id: 'eco', verdict: 'fail' }, { id: 'gtm', verdict: 'fail' }], checklist);
  near('load-bearing fit', f.fitLoadBearing, 0.5);
  eq('two... actually one w3 fail here', f.dealbreakers, ['moat']);

  // conviction blend: fit 0.8 -> fit5 4.0; composite 3.0 -> 0.55*4 + 0.45*3 = 2.2 + 1.35 = 3.55
  near('conviction blend', conviction(0.8, 3.0), 3.55);

  // tiers
  eq('tier pursue', tierFor(3.6, 0), 'PURSUE');
  eq('tier pursue blocked by dealbreaker', tierFor(3.6, 1), 'WATCH');
  eq('tier park on 2 dealbreakers', tierFor(4.9, 2), 'PARK');
  eq('tier watch', tierFor(2.8, 0), 'WATCH');
  eq('tier park low', tierFor(2.0, 0), 'PARK');

  // rankIdeas end-to-end with a tiny result
  const result = {
    generatedAt: '2026-06-08',
    checklist,
    scored: [
      { key: 'a', name: 'A', item_verdicts: [{ id: 'demand', verdict: 'pass' }, { id: 'moat', verdict: 'pass' }, { id: 'eco', verdict: 'pass' }, { id: 'gtm', verdict: 'pass' }], top_strengths: ['x'], top_gaps: [] },
      { key: 'b', name: 'B', item_verdicts: [{ id: 'demand', verdict: 'fail' }, { id: 'moat', verdict: 'fail' }, { id: 'eco', verdict: 'pass' }, { id: 'gtm', verdict: 'pass' }], top_strengths: [], top_gaps: ['demand', 'moat'] },
    ],
  };
  const opps = [{ key: 'a', name: 'A', category: 'x', composite: 3.0 }, { key: 'b', name: 'B', category: 'y', composite: 4.0 }];
  const rows = rankIdeas(result, opps);
  eq('rank order A before B (A passes all)', rows.map((r) => r.key), ['a', 'b']);
  eq('B parked on 2 dealbreakers despite high composite', rows.find((r) => r.key === 'b').tier, 'PARK');
  eq('A pursue', rows.find((r) => r.key === 'a').tier, 'PURSUE');

  // stage mapping
  eq('stageOf known idea item', stageOf({ id: 'defensible-moat' }), 'idea');
  eq('stageOf known execution item', stageOf({ id: 'systems-replace-founder' }), 'execution');
  eq('stageOf known founder item', stageOf({ id: 'founder-passion-fit' }), 'founder');
  eq('stageOf fallback by category', stageOf({ id: 'novel-2027', category: 'team' }), 'execution');
  eq('stageOf default idea', stageOf({ id: 'mystery' }), 'idea');

  // stage-partitioned ranking: an execution-stage fail must NOT create an idea deal-breaker
  const mixed = {
    generatedAt: '2026-06-08',
    checklist: [
      { id: 'defensible-moat', category: 'moat', title: 'Moat', test: '?', weight: 3 },        // idea
      { id: 'large-growing-market', category: 'demand', title: 'Market', test: '?', weight: 3 },// idea
      { id: 'systems-replace-founder', category: 'execution', title: 'Systems', test: '?', weight: 3 }, // execution
      { id: 'culture-as-asset', category: 'team', title: 'Culture', test: '?', weight: 3 },     // execution
    ],
    scored: [
      // passes both idea items, fails both execution items -> should NOT be parked (0 idea dealbreakers)
      { key: 'c', name: 'C', item_verdicts: [{ id: 'defensible-moat', verdict: 'pass' }, { id: 'large-growing-market', verdict: 'pass' }, { id: 'systems-replace-founder', verdict: 'fail' }, { id: 'culture-as-asset', verdict: 'fail' }] },
    ],
  };
  const rrows = rankIdeas(mixed, [{ key: 'c', name: 'C', composite: 3.0 }]);
  const c = rrows[0];
  near('idea-fit ignores execution items (both idea pass -> 1.0)', c.checklistFit, 1.0);
  eq('no idea dealbreakers from execution fails', c.dealbreakers, []);
  near('execReadiness reflects execution fails (0)', c.execReadiness, 0);
  eq('C not parked despite execution fails', c.tier, 'PURSUE');

  // --- Ratan Tata final gate overrides ---
  eq('finalTier no gate = strategist tier', finalTierFor('PURSUE', null), 'PURSUE');
  eq('finalTier pass keeps tier', finalTierFor('PURSUE', { verdict: 'pass' }), 'PURSUE');
  eq('finalTier FAIL blocks PURSUE', finalTierFor('PURSUE', { verdict: 'fail' }), 'BLOCKED');
  eq('finalTier FAIL blocks even PARK', finalTierFor('PARK', { verdict: 'fail' }), 'BLOCKED');
  eq('finalTier conditional caps PURSUE->WATCH', finalTierFor('PURSUE', { verdict: 'conditional' }), 'WATCH');
  eq('finalTier conditional leaves WATCH', finalTierFor('WATCH', { verdict: 'conditional' }), 'WATCH');
  eq('finalTier conditional leaves PARK', finalTierFor('PARK', { verdict: 'conditional' }), 'PARK');
  eq('tier rank ordering', [TIER_RANK.BLOCKED, TIER_RANK.PARK, TIER_RANK.WATCH, TIER_RANK.PURSUE], [0, 1, 2, 3]);

  // rankIdeas honors the gate from the ledger opportunity + sorts blocked last
  const gresult = {
    generatedAt: '2026-06-08', checklist,
    scored: [
      { key: 'good', name: 'Good', item_verdicts: [{ id: 'demand', verdict: 'pass' }, { id: 'moat', verdict: 'pass' }, { id: 'eco', verdict: 'pass' }, { id: 'gtm', verdict: 'pass' }] },
      { key: 'evil', name: 'Evil', item_verdicts: [{ id: 'demand', verdict: 'pass' }, { id: 'moat', verdict: 'pass' }, { id: 'eco', verdict: 'pass' }, { id: 'gtm', verdict: 'pass' }] },
    ],
  };
  const gopps = [
    { key: 'good', name: 'Good', composite: 3.0, tata: { verdict: 'pass' } },
    { key: 'evil', name: 'Evil', composite: 5.0, tata: { verdict: 'fail', reason: 'exploitative' } }, // higher conviction but blocked
  ];
  const grows = rankIdeas(gresult, gopps);
  eq('Tata FAIL blocks the higher-conviction idea', grows.find((r) => r.key === 'evil').finalTier, 'BLOCKED');
  eq('Tata PASS idea keeps PURSUE', grows.find((r) => r.key === 'good').finalTier, 'PURSUE');
  eq('blocked sorts below pursue despite higher conviction', grows.map((r) => r.key), ['good', 'evil']);

  // markdown builders don't throw
  try { buildChecklistMd({ checklist: [{ id: 'defensible-moat', category: 'moat', title: 'Real moat', test: 'Is there a moat?', why_it_matters: 'x', strategists: ['Tony'], weight: 3 }, { id: 'systems-replace-founder', category: 'execution', title: 'Systems', test: 'Runs without you?', strategists: ['Basesh'], weight: 3 }], consensus_principles: ['p'] }); pass++; } catch (e) { fail++; console.error('FAIL buildChecklistMd', e.message); }
  try { buildScoredMd(grows, gresult, '2026-06-08'); pass++; } catch (e) { fail++; console.error('FAIL buildScoredMd(gated)', e.message); }
  try { buildGateMd({ gate_tests: [{ id: 'trusteeship', title: 'Serves society', test: 'Does it serve society?', why: 'x', basis: 'Tata trusts own 66%', weight: 3 }], overall_test: 'Proud to put the Tata name on it?', verified_quotes: [{ quote: 'q', source_url: 'http://x' }], honest_caveats: ['Mistry ouster'] }, { refutedQuotes: [{ item: 'fake quote', note: 'misattributed' }] }); pass++; } catch (e) { fail++; console.error('FAIL buildGateMd', e.message); }

  console.log(`\nstrategist-checklist self-test: ${pass} passed, ${fail} failed`);
  process.exit(fail ? 1 : 0);
}

// ---------------- CLI ----------------
const argv = process.argv.slice(2);
if (argv.includes('--self-test')) {
  selfTest();
} else if (argv.includes('--apply')) {
  const p = argv[argv.indexOf('--apply') + 1];
  if (!p) { console.error('usage: --apply <workflow-result.json>'); process.exit(1); }
  const { rows } = applyResult(p);
  console.log(`Applied. ${rows.length} ideas scored.`);
  console.log(`Wrote: ${path.relative(ROOT, CHECKLIST_JSON)}, ${path.relative(ROOT, CHECKLIST_MD)}, ${path.relative(ROOT, SCORED_MD)}`);
  console.log(`\nTop 8 by FINAL tier / conviction:`);
  rows.slice(0, 8).forEach((r, i) => console.log(`  ${i + 1}. ${r.name.padEnd(16)} conv ${r.conviction.toFixed(2)}  fit ${(r.checklistFit * 100).toFixed(0)}%  ${r.finalTier}${r.tata && r.tata.verdict && r.tata.verdict !== 'pass' ? '  ⛔Tata:' + r.tata.verdict : ''}`));
} else if (argv.includes('--apply-tata')) {
  const tp = argv[argv.indexOf('--apply-tata') + 1];
  const sp = argv[argv.indexOf('--strategist') + 1];
  if (!tp || !sp) { console.error('usage: --apply-tata <tata-scores.json> --strategist <strategist-scores.json>'); process.exit(1); }
  const { rows, blocked, cond, passed } = applyTata(tp, sp);
  console.log(`Ratan Tata gate applied. ${passed} pass · ${cond} conditional · ${blocked} BLOCKED.`);
  console.log(`Wrote: ${path.relative(ROOT, TATA_GATE_MD)}, ${path.relative(ROOT, SCORED_MD)} (final tiers)`);
  console.log(`\nFinal disposition:`);
  rows.slice(0, 12).forEach((r, i) => console.log(`  ${i + 1}. ${r.name.padEnd(16)} ${r.finalTier.padEnd(7)} conv ${r.conviction.toFixed(2)}  Tata:${(r.tata && r.tata.verdict) || '—'}`));
}
