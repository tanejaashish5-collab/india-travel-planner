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
    { title: 'FactCheck', detail: 'independently verify each top idea’s load-bearing claim' },
  ],
}

const ASHISH = `Ashish Taneja: AI-fluent non-technical founder in Canberra, Australia; runs ~7 small AI businesses ($0-cheap infra; strong at AI automation, content, SEO/AEO, data products). OPEN to all business shapes (AI/SaaS, data/API, content/audience, productized-service), India on-ground ops via a partner, NO geography constraint. Founder-fit is a SCORING factor, not a filter.`
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
    name: { type: 'string' }, shape: { type: 'string', enum: ['ai-saas', 'data-api', 'content-audience', 'productized-service', 'marketplace', 'other'] },
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

const FC_SCHEMA = { type: 'object', required: ['name', 'fact_checks'], properties: {
  name: { type: 'string' },
  fact_checks: { type: 'array', items: { type: 'object', required: ['claim', 'verified'], properties: {
    claim: { type: 'string', description: 'the load-bearing claim checked' },
    verified: { type: 'string', enum: ['true', 'false', 'unclear'], description: "true only if a primary/authoritative source confirms it" },
    source: { type: 'string', description: 'the source consulted (URL/name)' },
  } } },
} }
phase('FactCheck')
const facts = await parallel(validated.slice(0, topN).map((i) => () => agent(
  `Independent fact-checker. Verify the single most load-bearing demand claim behind a business idea against a PRIMARY or authoritative source (gov site, regulator, official filing, the company itself, a named study). Do NOT trust marketing blogs or the idea's own pitch.\nIDEA: ${i.name}\nCLAIM TO CHECK: ${i.validation?.demand_evidence || i.the_insight}\n\nSearch for the original source. Return 1-2 fact_checks with verified = 'true' ONLY if a primary source confirms it; 'false' if contradicted; 'unclear' if you cannot confirm. Set name to exactly "${i.name}".`,
  { label: `fact:${(i.name || '').slice(0, 24)}`, phase: 'FactCheck', model: 'haiku', schema: FC_SCHEMA }
)))
const factByName = new Map(facts.filter(Boolean).map((f) => [f.name, f.fact_checks]))
for (const i of validated) if (factByName.has(i.name)) i.fact_checks = factByName.get(i.name)

// shape the output for bizscout-ledger.mjs (scored_ideas[] with source_channel + validation + fact_checks)
const scored_ideas = validated.map((i) => ({
  name: i.name, shape: i.shape, source_channel: i.source_channel, one_liner: i.one_liner,
  the_insight: i.the_insight, monetization: i.monetization, composite: i.composite,
  validation: i.validation, fact_checks: i.fact_checks || [],
}))
log(`done: ${scored_ideas.length} scored, top ${topN} fact-checked`)
return { scored_ideas, signal_count: allSignals.length, idea_count: ideas.length, channels: selKeys, deep: !!args?.full }
