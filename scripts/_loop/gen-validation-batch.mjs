#!/usr/bin/env node
// Generate a lean demand-validation TRIAGE workflow for a batch of ledger ideas.
// The reusable "🧪 Tested" harness (born 2026-06-16): point it at a tier (or explicit
// keys) and it emits a workflow that runs ONE Haiku research agent per idea — gap +
// demand + will-they-pay — returning a structured verdict for the board's 🧪 column.
//
// usage:
//   node scripts/_loop/gen-validation-batch.mjs --tier WATCH        # all WATCH ideas not yet tested
//   node scripts/_loop/gen-validation-batch.mjs --keys a,b,c        # explicit keys
//   node scripts/_loop/gen-validation-batch.mjs --tier WATCH --revalidate   # include already-tested
//
// then: Workflow({ scriptPath: "scripts/_loop/_validation-batch.workflow.js" })
// then merge {validations} into the ledger + re-render (see apply step printed at the end).

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { rankIdeas, CHECKLIST_JSON, LEDGER_FILE } from './strategist-checklist.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '../..');
const RUNS = path.join(ROOT, '.loop/bizscout-runs');
const OUT = path.join(__dirname, '_validation-batch.workflow.js');

const argv = process.argv.slice(2);
const arg = (k) => { const i = argv.indexOf(k); return i >= 0 ? argv[i + 1] : null; };
const tier = (arg('--tier') || '').toUpperCase();
const explicitKeys = (arg('--keys') || '').split(',').map((s) => s.trim()).filter(Boolean);
const revalidate = argv.includes('--revalidate');

// latest full scores + the stored checklist → reconstruct rows (for the FINAL tier + flags)
const latestFull = (suffix) => fs.readdirSync(RUNS).filter((f) => f.endsWith(suffix)).sort().reverse()[0];
const scoresFile = latestFull('-strategist-scores-full.json');
if (!scoresFile) { console.error('no *-strategist-scores-full.json in .loop/bizscout-runs'); process.exit(1); }
const result = JSON.parse(fs.readFileSync(path.join(RUNS, scoresFile), 'utf8'));
if ((!result.checklist || !result.checklist.length) && fs.existsSync(CHECKLIST_JSON)) {
  result.checklist = JSON.parse(fs.readFileSync(CHECKLIST_JSON, 'utf8')).checklist || [];
}
const ledger = JSON.parse(fs.readFileSync(LEDGER_FILE, 'utf8'));
const opps = ledger.opportunities || [];
const rows = rankIdeas(result, opps);
const byKey = new Map(opps.map((o) => [o.key, o]));

let selected = rows.filter((r) => !r.founderRejected);
if (explicitKeys.length) selected = selected.filter((r) => explicitKeys.includes(r.key));
else if (tier) selected = selected.filter((r) => r.finalTier === tier);
if (!revalidate) selected = selected.filter((r) => !(byKey.get(r.key) && byKey.get(r.key).validation));

const clip = (s, n) => (s || '').replace(/\s+/g, ' ').trim().slice(0, n);
const specs = selected.map((r) => {
  const o = byKey.get(r.key) || {};
  return {
    key: r.key,
    name: r.name,
    shape: o.shape || r.shape || '',
    fact: o.fact_status || 'unchecked',
    brief: [
      clip(o.one_liner, 400),
      `MONETIZATION: ${clip(o.monetization, 300)}`,
      `CLAIMED WEDGE: ${clip(o.surviving_wedge, 350)}`,
      `CLAIMED DEMAND: ${clip(o.demand_evidence, 300)}`,
    ].join('\n'),
  };
});

if (!specs.length) { console.error('no ideas selected (already all tested? pass --revalidate).'); process.exit(1); }

const script = `export const meta = {
  name: 'validation-batch',
  description: ${JSON.stringify(`Lean demand-validation triage of ${specs.length} ${tier || 'selected'} ideas → structured gap/demand/WTP verdict each for the 🧪 Tested column`)},
  phases: [{ title: 'Triage', detail: '1 Haiku research agent per idea (gap + demand + will-they-pay), max 3 parallel' }],
}

async function chunked(thunks, size) {
  const out = []
  for (let i = 0; i < thunks.length; i += size) out.push(...await parallel(thunks.slice(i, i + size)))
  return out
}

const RULES = ${JSON.stringify('HARD RULES: every market/competitor/price/CPL number needs a source URL or is marked ESTIMATED — no fabrication. Default assumption: someone is already doing this; prove the gap with cited evidence or call it CROWDED. No hype. Honest scarcity ("could not find X") is a valid, valuable result. You are testing the ONE load-bearing gate: not "is it clever" but "is there real, cited evidence of demand AND that someone will PAY." Faceless/automatable + non-technical Australia-based founder with India fluency (India on-ground only via partner); the India<->Australia corridor is his edge.')}

const SCHEMA = ${JSON.stringify({
  type: 'object',
  required: ['key', 'verdict', 'gap', 'demand', 'wtp', 'headline', 'cheapest_test', 'kill_on', 'flags', 'sources'],
  properties: {
    key: { type: 'string' },
    verdict: { type: 'string', enum: ['PROCEED', 'NARROW', 'KILL'] },
    gap: { type: 'string', enum: ['PROVEN', 'THIN', 'CROWDED', 'INSUFFICIENT'] },
    demand: { type: 'string', enum: ['STRONG', 'MIXED', 'WEAK'] },
    wtp: { type: 'string', enum: ['PROVEN', 'WEAK', 'UNPROVEN'] },
    headline: { type: 'string' },
    cheapest_test: { type: 'string' },
    kill_on: { type: 'string' },
    flags: { type: 'array', items: { type: 'string' } },
    sources: { type: 'array', items: { type: 'string' } },
  },
})}

const SPECS = ${JSON.stringify(specs)}

phase('Triage')
const thunks = SPECS.map((s) => () => agent(
  \`Demand-validation triage of ONE business idea. Use WebSearch + WebFetch; do the work yourself, no sub-agents. \${RULES}

IDEA "\${s.name}" (key: \${s.key}, shape: \${s.shape}, prior fact-check: \${s.fact}):
\${s.brief}

THE GATE: validate the gap (who is ALREADY doing this — name them, with subs/traction), the demand (real cited pull, not assumed), and the willingness-to-pay (cited evidence someone pays, or a close comparable). Then return the structured verdict. Set key="\${s.key}". Be honest — UNPROVEN/CROWDED/KILL are valuable; do not pad to PROCEED.\`,
  { label: \`triage:\${s.key}\`, phase: 'Triage', model: 'haiku', schema: SCHEMA }
))
const validations = (await chunked(thunks, 3)).filter(Boolean)
return { validations }
`;

fs.writeFileSync(OUT, script);
console.log(`wrote ${path.relative(ROOT, OUT)} — ${specs.length} ideas: ${specs.map((s) => s.key).join(', ')}`);
console.log(`\nnext: Workflow({ scriptPath: "${path.relative(ROOT, OUT)}" })`);
