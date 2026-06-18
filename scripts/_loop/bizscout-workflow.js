// bizscout-workflow.js — Phase 5 agent fan-out for the BUSINESS-OPPORTUNITY SCOUT.
// Run via the Workflow tool (NOT node): Workflow({ scriptPath: "<this file>", args: {...} }).
// Driven by the /loop-bizscout skill. Output (result.scored_ideas) is fed to
// scripts/_loop/bizscout-ledger.mjs --merge, which does the dedupe / objective channel
// scoring / human ledger. This script's job: harvest live demand signals, synthesize
// NEW businesses, validate + score each, and FACT-CHECK the load-bearing claim of the top ones.
//
// Two improvements over the first ad-hoc run (both demanded by the founder):
//   1. source_channel is carried on EVERY idea  -> exact (not keyword-guessed) channel attribution.
//   2. a FACT-CHECK phase verifies each top idea's single most load-bearing claim against a
//      primary source -> verified:'true'|'false'|'unclear' + source. Unverified is flagged downstream.
//
// args:
//   { full: true }            -> deep scan: all 14 channels (heavy ~50 agents; manual only).
//   { channels: ["a","b"] }   -> scout only these channel keys (for weekly rotation).
//   (default)                 -> LIGHT autonomous run: 6 core channels (~18 agents), budget-friendly.

export const meta = {
  name: 'bizscout',
  description: 'Phase 5 business-opportunity scout: harvest demand signals, synthesize NEW businesses, validate + score + fact-check',
  phases: [
    { title: 'Harvest', detail: 'channel agents research live 2026 demand signals' },
    { title: 'Synthesize', detail: 'craft NEW businesses, each tagged with its source_channel' },
    { title: 'Validate+Score', detail: 'competitors + 6-factor rubric per idea' },
    { title: 'Verify', detail: 'N independent refute-mode skeptics attack each top idea’s claim + moat (live web)' },
    { title: 'Judge', detail: 'Sonnet panel adjudicates -> verdict adjusts the rank (stand/flag/downgrade/kill)' },
    { title: 'FactCheck', detail: 'cheap single-pass primary-source check of the next tier of ideas' },
  ],
}

const ASHISH = `Ashish Taneja: AI-fluent non-technical founder in Canberra, Australia; deep India ties (the India<->Australia corridor is his un-clonable edge, INCLUDING physical goods trade). OPEN to ALL verticals and shapes: physical trade/import-export, manufacturing/private-label, franchises/distribution/licensing, owning media properties, services, AI/SaaS, data. Capital is flexible (sized to conviction); India/physical ops via a partner-operator. CRITICAL (founder, 2026-06-11): AI is his EXECUTION advantage, NOT a required product ingredient — do NOT force AI into ideas; an idea whose whole premise is "AI-something for X" scores founder_fit DOWN. He wants good businesses with real-economy demand. Founder-fit is a SCORING factor, not a filter.`
const BAN = `BANNED: do NOT extend his existing projects (NakshIQ, Workflow Automation, ForgeVoice, Demand Radar). Bring genuinely NEW directions. Every claim must be grounded in evidence you actually find — no hype.`

const CHANNELS_ALL = [
  { key: 'regulatory-forced-buyers', brief: 'dated compliance deadlines that create forced buyers with director liability (EU AI Act, AB 2013, e-invoicing, EUDR, ESG, licensing).' },
  { key: 'australia-local-gaps', brief: 'underserved Australia-local SMB/trades/healthcare/gov niches + AU regs/grants/deadlines a Canberra founder can exploit.' },
  { key: 'ai-frontier-gaps', brief: 'things newly POSSIBLE in 2026 (agentic workflows, MCP, real-time voice, cheap video) with no strong product yet.' },
  { key: 'yc-rfs-themes', brief: 'YC Request-for-Startups + recent batch themes + a16z/SaaStr theses — where the smartest demand-filter says whitespace exists.' },
  { key: 'boring-profitable', brief: 'unsexy B2B niches + micro-SaaS that quietly mint cash; fragmented markets where a focused AI operator wins.' },
  { key: 'creator-economy-tools', brief: 'creator/SMB/agency workflow gaps with AI wedges and proven willingness-to-pay.' },
  { key: 'reddit-forum-pains', brief: 'recurring "I would pay for X" complaints across Reddit/forums/IndieHackers.' },
  { key: 'review-complaint-gaps', brief: 'G2/Capterra/app-store 1-3 star patterns + "I wish it did Y" feature gaps on popular tools.' },
  { key: 'job-postings-demand', brief: 'repeated automatable roles/tasks companies pay for = demand proxy for an AI product/service.' },
  { key: 'producthunt-indiehackers', brief: 'recent traction + the adjacent gap still open next to the winners.' },
  { key: 'funding-flows', brief: '2026 funding flows -> the picks-and-shovels/enabler play behind the hyped trend.' },
  { key: 'too-early-now-viable', brief: 'ideas that failed pre-AI but are newly viable in 2026.' },
  { key: 'india-bharat-demand', brief: 'tier 2-3 India digital/SMB demand (UPI/ONDC/vernacular/fintech) with a defensible moat, not generic TAM.' },
  { key: 'cross-border-digital', brief: 'cross-border DIGITAL services/products (no physical ops): global talent, compliance, payments, localization.' },
  { key: 'physical-trade-import-export', brief: 'PHYSICAL goods trade: import/export + distribution arbitrage on the India<->Australia corridor and beyond — underserved import niches, exclusive distribution/agency rights, commodity + B2B trade flows (ONDC/IndiaMART gaps), customs wedges. The business is the TRADE, not software.' },
  { key: 'manufacturing-msme', brief: 'manufacturing + private-label: India Make-in-India / PLI scheme opportunities (sector incentives, export windows), contract manufacturing, white-label products with owned-brand distribution, AU sovereign-manufacturing grants, niche hardware. The business is the PRODUCT, not software.' },
  { key: 'markets-trading-fintech', brief: 'financial markets: systematic/rules-based trading where licensing permits, tools/data/education for traders, prop/funded-trader ecosystems, commodity/FX niches. Flag SEBI/ASIC/AFSL licensing reality honestly — price it in, never auto-kill.' },
  { key: 'franchise-distribution-licensing', brief: 'proven models to acquire/license rather than invent: franchises, master-franchise arbitrage (proven Indian brand -> AU or vice versa, the corridor edge), distribution rights, brand licensing. Buying proven demand.' },
  { key: 'content-media-brands', brief: 'OWNING media properties (not tools for creators): niche newsletters, YouTube/faceless channels, regional-language content, B2B trade media, acquiring small content assets — ads/affiliate/sponsorship/product monetization.' },
]
const CORE6 = ['regulatory-forced-buyers', 'australia-local-gaps', 'ai-frontier-gaps', 'yc-rfs-themes', 'boring-profitable', 'creator-economy-tools']

const selKeys = args?.full ? CHANNELS_ALL.map((c) => c.key) : (args?.channels?.length ? args.channels : CORE6)
const CHANNELS = CHANNELS_ALL.filter((c) => selKeys.includes(c.key))
const CHANNEL_ENUM = CHANNELS_ALL.map((c) => c.key).concat('cross-channel')
const PER_CHANNEL = args?.full ? 3 : 3
log(`bizscout: ${args?.full ? 'DEEP' : 'light'} run over ${CHANNELS.length} channels [${selKeys.join(', ')}]`)

const HARVEST_SCHEMA = { type: 'object', required: ['channel', 'signals'], properties: {
  channel: { type: 'string' },
  signals: { type: 'array', items: { type: 'object', required: ['signal', 'evidence'], properties: {
    signal: { type: 'string' }, evidence: { type: 'string', description: 'concrete evidence + where it came from' } } }, description: '4-6 evidence-backed signals' },
} }

phase('Harvest')
const harvests = (await parallel(CHANNELS.map((c) => () => agent(
  `Opportunity scout mining ONE channel for real current (2026) demand signals. Do LIVE web research.\nCHANNEL: ${c.key}\n${c.brief}\n\n${ASHISH}\n\n${BAN}\n\nReturn 4-6 specific evidence-backed signals (real pains/trends/gaps with concrete evidence + source). Set channel to "${c.key}".`,
  { label: `harvest:${c.key}`, phase: 'Harvest', model: 'haiku', schema: HARVEST_SCHEMA }
)))).filter(Boolean)
const allSignals = harvests.flatMap((h) => (h.signals || []).map((s) => ({ ...s, channel: h.channel })))
log(`harvested ${allSignals.length} signals across ${harvests.length} channels`)

const IDEA_SCHEMA = { type: 'object', required: ['ideas'], properties: { ideas: { type: 'array', items: {
  type: 'object',
  required: ['name', 'shape', 'source_channel', 'one_liner', 'the_insight', 'moat_type', 'target_customer', 'monetization', 'why_now', 'search_queries'],
  properties: {
    name: { type: 'string' }, shape: { type: 'string', enum: ['ai-saas', 'data-api', 'content-audience', 'productized-service', 'marketplace', 'physical-trade', 'manufacturing', 'media-property', 'franchise-license', 'trading-systematic', 'other'] },
    source_channel: { type: 'string', enum: CHANNEL_ENUM, description: 'the channel of the signal this idea is grounded in (exact, not guessed)' },
    one_liner: { type: 'string' }, the_insight: { type: 'string' }, moat_type: { type: 'string' },
    target_customer: { type: 'string' }, monetization: { type: 'string' }, why_now: { type: 'string' },
    search_queries: { type: 'array', items: { type: 'string' } },
  },
} } } }
const SIG = JSON.stringify(allSignals)
const lenses = args?.full
  ? [['AI software / SaaS', 'ai-saas'], ['Data / API / proprietary-intelligence', 'data-api'], ['Content / audience engines', 'content-audience'], ['Productized services / marketplaces / boring-profitable', 'service'], ['Non-consensus / picks-and-shovels wildcards', 'wildcard']]
  : [['AI/SaaS + data/API products', 'product'], ['Content/audience + productized-service + picks-and-shovels', 'service']]

phase('Synthesize')
const synth = (await parallel(lenses.map(([lens, focus]) => () => agent(
  `World-class venture builder. ${allSignals.length} evidence-backed 2026 market signals (each tagged with its channel):\n${SIG}\n\n${ASHISH}\n\n${BAN}\n\nLens: ${lens}. Generate ${PER_CHANNEL * 2} DISTINCT, specific, profitable NEW businesses, each grounded in a specific signal — and set source_channel to that signal's channel exactly. Prefer defensible moats (proprietary-data/regulatory/audience/network/automation) and real evidenced demand. Give 3-4 web search_queries to validate each.`,
  { label: `synth:${focus}`, phase: 'Synthesize', schema: IDEA_SCHEMA }
)))).filter(Boolean)
let ideas = synth.flatMap((s) => s.ideas || [])
log(`synthesized ${ideas.length} candidate ideas`)

const VS_SCHEMA = { type: 'object', required: ['name', 'competitors', 'demand_evidence', 'market_size', 'scores', 'verdict', 'surviving_wedge', 'confidence'], properties: {
  name: { type: 'string' },
  competitors: { type: 'array', items: { type: 'object', required: ['name', 'what_they_do'], properties: { name: { type: 'string' }, what_they_do: { type: 'string' }, pricing: { type: 'string' }, traction: { type: 'string' } } } },
  demand_evidence: { type: 'string', description: 'the single most load-bearing piece of demand evidence, stated as a checkable claim with its source' },
  market_size: { type: 'string' },
  scores: { type: 'object', required: ['demand', 'moat', 'founder_fit', 'speed_to_cash', 'profit_ceiling', 'competition_shape'], properties: {
    demand: { type: 'integer' }, moat: { type: 'integer' }, founder_fit: { type: 'integer' }, speed_to_cash: { type: 'integer' }, profit_ceiling: { type: 'integer' }, competition_shape: { type: 'integer' } } },
  verdict: { type: 'string', enum: ['GREEN', 'YELLOW', 'RED'] }, surviving_wedge: { type: 'string' }, confidence: { type: 'string', enum: ['high', 'medium', 'low'] },
} }
phase('Validate+Score')
const validated = await pipeline(ideas, (idea) => agent(
  `Rigorous but FAIR analyst. Real demand + a defensible wedge OR a fragmented-profitable market = good (crowded is fine). RED only if winner-take-all-and-lost or no real demand. Do LIVE web research.\nIDEA: ${idea.name} [${idea.shape}, channel ${idea.source_channel}]\n${idea.one_liner}\nINSIGHT: ${idea.the_insight}\n\nRun: ${JSON.stringify(idea.search_queries || [])}\nFind competitors (global+India+Australia), pricing, traction, market size. Score all 6 rubric factors 1-5 (honest). In demand_evidence, state the ONE most load-bearing, checkable claim + its source. Set name to exactly "${idea.name}".`,
  { label: `val:${(idea.name || '').slice(0, 24)}`, phase: 'Validate+Score', model: 'haiku', schema: VS_SCHEMA }
).then((v) => ({ ...idea, validation: v }))).then((a) => a.filter(Boolean))

// composite (mirror bizscout-ledger.mjs WEIGHTS) + rank, so we fact-check the REAL top ideas
const W = { demand: 0.25, moat: 0.2, competition_shape: 0.15, profit_ceiling: 0.15, speed_to_cash: 0.15, founder_fit: 0.1 }
for (const i of validated) { const s = i.validation?.scores || {}; i.composite = Math.round(100 * Object.entries(W).reduce((t, [k, w]) => t + (s[k] || 0) * w, 0)) / 100 }
validated.sort((a, b) => (b.composite || 0) - (a.composite || 0))
const topN = Math.min(args?.full ? 12 : 6, validated.length)

// ---- adversarial verify -> judge (2026-06-17, the Fable-class lift) -------------------
// The very top ideas are attacked by independent refute-mode skeptics + adjudicated by a
// judge whose verdict has teeth (re-ranks by verified_composite). The next tier still gets
// the cheap single-pass fact-check so coverage isn't lost. <=3 agents in flight throughout.
const VCFG = { skepticsPerIdea: 2, refuteThreshold: 2, downgradeFactor: 0.7, deepVerifyTopN: args?.full ? 4 : 2 }
const deepN = Math.min(VCFG.deepVerifyTopN, validated.length)
async function chunked(thunks, n) { const out = []; for (let i = 0; i < thunks.length; i += n) { out.push(...await parallel(thunks.slice(i, i + n))) } return out }

const SKEPTIC_SCHEMA = { type: 'object', required: ['name', 'claim_verdict', 'moat_verdict'], properties: {
  name: { type: 'string' },
  claim_verdict: { type: 'string', enum: ['confirmed', 'unsupported', 'refuted'] },
  claim_reason: { type: 'string' }, claim_source: { type: 'string', description: 'the live URL you actually fetched' },
  moat_verdict: { type: 'string', enum: ['holds', 'weak', 'broken'] },
  moat_reason: { type: 'string' }, competitors_found: { type: 'array', items: { type: 'string' } },
} }
const JUDGE_SCHEMA = { type: 'object', required: ['name', 'claim_status', 'score_action', 'summary'], properties: {
  name: { type: 'string' },
  claim_status: { type: 'string', enum: ['confirmed', 'unsupported', 'refuted'] },
  confidence: { type: 'string', enum: ['high', 'medium', 'low'] },
  moat_assessment: { type: 'string' },
  score_action: { type: 'string', enum: ['stand', 'flag_unverified', 'downgrade', 'kill'] },
  summary: { type: 'string' },
} }
const FC_SCHEMA = { type: 'object', required: ['name', 'fact_checks'], properties: {
  name: { type: 'string' },
  fact_checks: { type: 'array', items: { type: 'object', required: ['claim', 'verified'], properties: {
    claim: { type: 'string', description: 'the load-bearing claim checked' },
    verified: { type: 'string', enum: ['true', 'false', 'unclear'], description: "true only if a primary/authoritative source confirms it" },
    source: { type: 'string', description: 'the source consulted (URL/name)' },
  } } },
} }

const SKEPTIC_HEAD = `CRITICAL: return ONLY the JSON for the schema. Do NOT invoke any Skill, run apply/merge scripts, write or edit ledger/report files, or spawn sub-agents. You are an INDEPENDENT SKEPTIC on an adversarial verification panel. REFUTE — assume the idea is wrong until a LIVE primary/authoritative source proves otherwise. You MUST run live WebSearch/WebFetch; NEVER answer from memory. Attack BOTH:\n1) THE CLAIM. Find the primary source. claim_verdict="refuted" ONLY if a live source ACTIVELY CONTRADICTS it; "unsupported" if you simply cannot find support (absence of evidence is NOT refutation); "confirmed" ONLY if a live primary source directly supports it. Put the live URL in claim_source.\n2) THE MOAT / COMPETITION. Actively HUNT for competitors in the EXACT market/geography named. A "zero competitors / first-mover / nobody does this" claim is REFUTED the moment you find one real player. moat_verdict="broken" if >=1 direct competitor the claim ignored; "weak" if only adjacent players; "holds" only if a real wedge survives. List who you found in competitors_found.\n`
const JUDGE_HEAD = `CRITICAL: return ONLY the JSON for the schema. Do NOT invoke any Skill or write any file. You are the JUDGE of an adversarial verification panel — the honest adjudicator, not an advocate. Given K skeptics who each tried to refute an idea's load-bearing claim and moat, render ONE calibrated verdict. Rules:\n- claim_status="refuted" when >= refuteThreshold skeptics found a LIVE source that ACTIVELY CONTRADICTS the claim -> score_action="downgrade" (or "kill" if that claim was the idea's whole reason to exist).\n- claim_status="unsupported" when skeptics found no support but nothing contradicts -> score_action="flag_unverified" (do NOT kill; absence isn't disproof).\n- claim_status="confirmed" when >=1 skeptic confirmed via a primary source AND none refuted -> score_action="stand".\n- MOAT TEETH: when a MAJORITY of skeptics return moat_verdict="broken" (direct competitors the no-competition/first-mover assumption ignored), set score_action to AT LEAST "downgrade" even if the claim is confirmed or unsupported — the rubric's moat/competition scores were inflated by a moat that does not exist. Reserve "stand" for ideas whose claim holds AND whose moat survives. Always describe what was found in moat_assessment; never let an unverified absence inflate the moat.\n`

phase('Verify')
for (const idea of validated.slice(0, deepN)) {
  const ctx = `IDEA: ${idea.name} [${idea.shape}]\n${idea.one_liner}\nLOAD-BEARING CLAIM: ${idea.validation?.demand_evidence || idea.the_insight}\nMOAT / NO-COMPETITION ASSUMPTION: ${idea.moat_type || ''} / ${idea.validation?.surviving_wedge || '(no stated wedge)'}\nWHY-NOW: ${idea.why_now || ''}`
  idea._skeptics = (await chunked(Array.from({ length: VCFG.skepticsPerIdea }, (_, k) => () => agent(
    `${SKEPTIC_HEAD}${ctx}\n\nYou are skeptic #${k + 1} of ${VCFG.skepticsPerIdea}. Search independently; find what the others might miss. Be specific and cite live URLs. Set name to exactly "${idea.name}".`,
    { label: `skeptic${k + 1}:${(idea.name || '').slice(0, 16)}`, phase: 'Verify', model: 'haiku', schema: SKEPTIC_SCHEMA }
  )), 3)).filter(Boolean)
}

phase('Judge')
const judged = (await chunked(validated.slice(0, deepN).map((idea) => () => agent(
  `${JUDGE_HEAD}refuteThreshold = ${VCFG.refuteThreshold}.\nIDEA: ${idea.name}\nLOAD-BEARING CLAIM: ${idea.validation?.demand_evidence || idea.the_insight}\n\nSKEPTIC VERDICTS (JSON):\n${JSON.stringify(idea._skeptics || [])}\nReturn the final verdict (claim_status, confidence, moat_assessment, score_action, one-line summary). Set name to exactly "${idea.name}".`,
  { label: `judge:${(idea.name || '').slice(0, 20)}`, phase: 'Judge', schema: JUDGE_SCHEMA }
)), 3)).filter(Boolean)
const judgeByName = new Map(judged.map((j) => [j.name, j]))
for (const i of validated.slice(0, deepN)) {
  const sk = i._skeptics || []
  const j = judgeByName.get(i.name) || { claim_status: 'unsupported', score_action: 'flag_unverified', confidence: 'low', moat_assessment: '', summary: 'judge unavailable — treat as unverified' }
  i.verification = { skeptics: sk, judge: j }
  i.fact_checks = [{ claim: (i.validation?.demand_evidence || i.the_insight), verified: j.claim_status === 'refuted' ? 'false' : j.claim_status === 'confirmed' ? 'true' : 'unclear', source: (sk.find((s) => s.claim_source) || {}).claim_source || '' }]
  i.verified_composite = j.score_action === 'kill' ? 0 : j.score_action === 'downgrade' ? Math.round((i.composite || 0) * VCFG.downgradeFactor * 100) / 100 : (i.composite || 0)
  i.verify_flag = j.score_action
}

// cheap single-pass fact-check for the next tier (the weekly run can afford the coverage)
phase('FactCheck')
const cheap = validated.slice(deepN, topN)
const facts = (await chunked(cheap.map((i) => () => agent(
  `Independent fact-checker. Verify the single most load-bearing demand claim behind a business idea against a PRIMARY or authoritative source (gov site, regulator, official filing, the company itself, a named study). Do NOT trust marketing blogs or the idea's own pitch.\nIDEA: ${i.name}\nCLAIM TO CHECK: ${i.validation?.demand_evidence || i.the_insight}\n\nSearch for the original source. Return 1-2 fact_checks with verified = 'true' ONLY if a primary source confirms it; 'false' if contradicted; 'unclear' if you cannot confirm. Set name to exactly "${i.name}".`,
  { label: `fact:${(i.name || '').slice(0, 24)}`, phase: 'FactCheck', model: 'haiku', schema: FC_SCHEMA }
)), 3)).filter(Boolean)
const factByName = new Map(facts.map((f) => [f.name, f.fact_checks]))
for (const i of validated) {
  if (i.verify_flag) continue // already deep-verified above
  if (factByName.has(i.name)) { i.fact_checks = factByName.get(i.name); i.verify_flag = 'fact-checked' }
  i.verified_composite = i.composite
}
for (const i of validated) if (i.verified_composite == null) { i.verified_composite = i.composite; i.verify_flag = i.verify_flag || 'unverified' }
validated.sort((a, b) => ((b.verified_composite ?? b.composite ?? 0) - (a.verified_composite ?? a.composite ?? 0)))

// shape the output for bizscout-ledger.mjs (scored_ideas[] with source_channel + validation + fact_checks)
const scored_ideas = validated.map((i) => ({
  name: i.name, shape: i.shape, source_channel: i.source_channel, one_liner: i.one_liner,
  the_insight: i.the_insight, monetization: i.monetization,
  composite: i.composite, verified_composite: i.verified_composite ?? i.composite, verify_flag: i.verify_flag || 'unverified',
  validation: i.validation, verification: i.verification || null, fact_checks: i.fact_checks || [],
}))
log(`done: ${scored_ideas.length} scored, top ${deepN} adversarially verified + ${Math.max(0, topN - deepN)} fact-checked`)
return { scored_ideas, signal_count: allSignals.length, idea_count: ideas.length, channels: selKeys, deep: !!args?.full }
