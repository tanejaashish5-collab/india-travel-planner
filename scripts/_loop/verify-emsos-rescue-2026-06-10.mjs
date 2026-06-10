export const meta = {
  name: 'verify-emsos-rescue',
  description: 'Adversarially verify every landline/mobile in emergency_sos rescue_contact + mountain_rescue + nearest_hospital against official district/state sources, by state — classify confirmed/wrong/fabricated/unverifiable',
  phases: [{ title: 'Verify', detail: 'one Haiku agent per state/region; queries its rows via MCP; verifies vs official .gov.in' }],
}

const PROJECT = 'dudzsdzfvikjjhurxrgc'

// State groups — big states solo, tiny ones combined, to keep ~22 agents.
const GROUPS = [
  ['uttarakhand'], ['himachal-pradesh'], ['maharashtra'], ['goa'], ['odisha'], ['gujarat'],
  ['jammu-kashmir'], ['ladakh'], ['tamil-nadu'], ['karnataka'], ['kerala'], ['sikkim'],
  ['arunachal-pradesh'], ['telangana'], ['andaman-nicobar'],
  ['assam', 'nagaland', 'meghalaya', 'mizoram', 'manipur', 'tripura'],
  ['andhra-pradesh'],
  ['uttar-pradesh', 'bihar'],
  ['west-bengal', 'jharkhand', 'chhattisgarh'],
  ['madhya-pradesh', 'rajasthan'],
  ['punjab', 'haryana', 'chandigarh'],
  ['lakshadweep', 'puducherry', 'daman-diu'],
]

const SCHEMA = {
  type: 'object', additionalProperties: false, required: ['verdicts'],
  properties: { verdicts: { type: 'array', items: {
    type: 'object', additionalProperties: false,
    required: ['destination_id', 'column', 'number', 'claims', 'verdict', 'official_number', 'source_url', 'notes'],
    properties: {
      destination_id: { type: 'string' },
      column: { type: 'string', enum: ['rescue_contact', 'mountain_rescue', 'nearest_hospital'] },
      number: { type: 'string', description: 'the landline/mobile as stored (NOT a short code)' },
      claims: { type: 'string', description: 'what the prose says this number is (institution/role)' },
      verdict: { type: 'string', enum: ['confirmed', 'wrong', 'fabricated', 'unverifiable'] },
      official_number: { type: ['string', 'null'], description: 'correct official number if verdict=wrong; else null' },
      source_url: { type: ['string', 'null'] },
      notes: { type: 'string' },
    },
  } } },
}

const prompt = (states) => `You are auditing INDIAN EMERGENCY rescue/disaster/hospital phone numbers for a travel-safety site. Bar is strict but FAIR: this data looks like genuine district research, so your job is to CATCH FABRICATIONS without destroying real numbers.

STEP 1 — Pull the data. Call the Supabase MCP tool \`execute_sql\` (search tools for "supabase execute sql" if needed) with project_id="${PROJECT}" and this exact query:
SELECT es.destination_id, d.state_id, es.rescue_contact, es.mountain_rescue, es.nearest_hospital
FROM emergency_sos es JOIN destinations d ON d.id=es.destination_id
WHERE d.state_id IN (${states.map((s) => `'${s}'`).join(',')})
  AND (es.rescue_contact ~ '[0-9]{6,}' OR es.mountain_rescue ~ '[0-9]{6,}' OR es.nearest_hospital ~ '[0-9]{6,}');

STEP 2 — For EACH row, extract every LANDLINE (0XXXX-XXXXXX / 0XXX-XXXXXXX) and MOBILE (10-digit starting 6-9) embedded in the three columns.
- IGNORE national short codes entirely (100,101,102,108,112,1070,1077,1091,1090,1100,1554,139,1098,181,1095,1930,15500,1907,1363,1364,1100) — never output them.
- For each landline/mobile, note what the prose CLAIMS it is (e.g. "Tawang DC Control Room", "District Hospital X", "SDRF", "Collectorate Control Room").

STEP 3 — Verify each against an OFFICIAL source (district .nic.in / state SDMA / state police / the institution's official site). Web-search "[district] collectorate control room" / "[district] disaster management helpline" / "[town] district hospital phone" / "[district] SP office".
Classify:
- "confirmed": an official source shows THIS number for THIS institution.
- "wrong": an official source shows a DIFFERENT current number for this institution → put it in official_number with source_url.
- "fabricated": clear tell-tale of a made-up number — the STD code does NOT match the district/town, OR a sequential/round pattern (…222200/…222262/…220000), OR the institution+number combination is implausible. (official_number=null)
- "unverifiable": you could not confirm or refute; the number is PLAUSIBLE (its STD code matches the district) but no official page shows it. (official_number=null)

Be honest and precise. Prefer "unverifiable" over "fabricated" unless you have a concrete reason (wrong STD code, sequential pattern, contradicting official source). Prefer "confirmed" only with a real official source. Output one verdict per distinct landline/mobile per (destination_id, column). States in scope: ${states.join(', ')}.`

phase('Verify')
const results = await parallel(GROUPS.map((g) => () =>
  agent(prompt(g), { label: `verify:${g[0]}${g.length > 1 ? '+' : ''}`, phase: 'Verify', model: 'haiku', schema: SCHEMA })
    .then((r) => ({ states: g, verdicts: r?.verdicts || [] }))
    .catch(() => ({ states: g, verdicts: [] }))
))

const all = results.flatMap((r) => r.verdicts)
const tally = all.reduce((m, v) => ((m[v.verdict] = (m[v.verdict] || 0) + 1), m), {})
log(`rescue/mtn/hosp verdicts: ${JSON.stringify(tally)} across ${all.length} numbers`)
return { tally, verdicts: all }
