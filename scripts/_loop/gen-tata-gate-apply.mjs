#!/usr/bin/env node
/**
 * gen-tata-gate-apply.mjs — regenerate the workflow that runs every ledger idea
 * through the Ratan Tata Final Gate. Reads the stored gate + the current ledger,
 * embeds both as constants (workflow scripts can't read files), emits all prompt
 * text via JSON.stringify so quotes/apostrophes can't break the parser.
 *
 *   node scripts/_loop/gen-tata-gate-apply.mjs            # gate ALL ledger ideas
 *   node scripts/_loop/gen-tata-gate-apply.mjs --new-only # only ideas with no tata verdict
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '../..');
const LEDGER = path.join(ROOT, '.loop/biz-opportunities-ledger.json');
const GATE = path.join(ROOT, 'data/research/ratan-tata-gate.json');
const OUT = path.join(ROOT, 'scripts/_loop/tata-gate-apply-workflow.js');

const newOnly = process.argv.includes('--new-only');
const gateDoc = JSON.parse(fs.readFileSync(GATE, 'utf8'));
const gate = gateDoc.gate || gateDoc;
const tests = (gate.gate_tests || []).map((t) => ({ id: t.id, title: t.title, test: t.test, weight: t.weight }));
const overall = gate.overall_test || 'Would Ratan Tata be proud to put the Tata name on this?';

const ledger = JSON.parse(fs.readFileSync(LEDGER, 'utf8'));
let ideas = (ledger.opportunities || []).map((i) => ({ key: i.key, name: i.name, one_liner: i.one_liner, monetization: i.monetization || '', _gated: !!i.tata }));
if (newOnly) ideas = ideas.filter((i) => !i._gated);
ideas = ideas.map(({ _gated, ...rest }) => rest);

const PROMPT_HEAD =
  'Judge ONE business idea against the RATAN TATA FINAL GATE — an integrity/ethics veto. This is NOT about whether the idea makes money; it is about whether Ratan Tata would be proud to put the Tata name on it. Apply his actual standard: trusteeship (business serves society, not just the owner), integrity over profit, never exploit the vulnerable, dignity and fairness to all stakeholders, the long view, doing what is right when no one is watching. Be FAIR, not performatively harsh — most honest B2B/compliance/anti-fraud/help-the-underdog businesses PASS. Reserve FAIL for genuine integrity violations.\n\nIDEA:\n';
const PROMPT_RULES =
  '\n\nThe overarching test: ' + overall + '\n\nVerdict rules:\n' +
  '- "fail" = the idea violates a NON-NEGOTIABLE (weight-3) gate test at its core — it is built on deception, dark patterns, exploiting the vulnerable/desperate, manipulation, harm, or extraction-without-value. Ratan Tata would refuse to put his name on it. List the failed test ids.\n' +
  '- "conditional" = the idea is acceptable ONLY with a specific safeguard (e.g. honest disclosure, refusing certain customers, a fairness guarantee). State the concern AND the fix that would clear the gate.\n' +
  '- "pass" = no integrity concern; it creates genuine value honestly. (This is the common, correct answer for legitimate businesses.)\n' +
  'Do NOT invent ethical problems that are not there, and do NOT pass something that genuinely preys on people. Give: verdict, failed_tests (ids, may be empty), concerns (may be empty), a one-line reason, and for conditional a one-line fix.';

const file = `export const meta = {
  name: 'tata-gate-apply',
  description: 'Run every ledger idea through the Ratan Tata Final Gate (integrity/ethics veto)',
  phases: [{ title: 'Gate', detail: 'one agent per idea vs the Ratan Tata gate' }],
}

const GATE_TESTS = ${JSON.stringify(tests)}
const IDEAS = ${JSON.stringify(ideas)}
const PROMPT_HEAD = ${JSON.stringify(PROMPT_HEAD)}
const PROMPT_RULES = ${JSON.stringify(PROMPT_RULES)}

const GATE_SCORE_SCHEMA = {
  type: 'object',
  properties: {
    key: { type: 'string' },
    verdict: { type: 'string', enum: ['pass', 'conditional', 'fail'] },
    failed_tests: { type: 'array', items: { type: 'string' } },
    concerns: { type: 'array', items: { type: 'string' } },
    reason: { type: 'string' },
    fix: { type: 'string' },
  },
  required: ['key', 'verdict', 'reason'],
}

const gateBlob = JSON.stringify(GATE_TESTS)
phase('Gate')
log('Gating ' + IDEAS.length + ' ideas through the Ratan Tata Final Gate')
const scored = (await parallel(IDEAS.map((idea) => () =>
  agent(
    PROMPT_HEAD + JSON.stringify(idea) +
    '\\n\\nGATE TESTS (id, title, test, weight; weight 3 = non-negotiable veto):\\n' + gateBlob +
    PROMPT_RULES + ' key="' + idea.key + '".',
    { schema: GATE_SCORE_SCHEMA, model: 'sonnet', label: 'tata:' + idea.key, phase: 'Gate' }
  )
))).filter(Boolean)
log('Gated ' + scored.length + '/' + IDEAS.length)
return { scored }
`;

fs.writeFileSync(OUT, file);
console.log(`Regenerated ${path.relative(ROOT, OUT)}`);
console.log(`  gate tests: ${tests.length} (${tests.filter((t) => t.weight >= 3).length} non-negotiable)`);
console.log(`  ideas to gate: ${ideas.length}${newOnly ? ' (new-only)' : ' (all)'}`);
