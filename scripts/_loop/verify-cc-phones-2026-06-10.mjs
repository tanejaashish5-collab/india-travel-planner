export const meta = {
  name: 'verify-cc-phones',
  description: 'Verify the ~53 NEW emergency/helpline phones embedded in confidence_cards free-text against official .gov.in/agency sources (adversarial), then 2nd-pass confirm every keeper',
  phases: [
    { title: 'Verify', detail: 'Haiku research agents, grouped by state, official-source-or-remove bar' },
    { title: 'Confirm', detail: 'independent 2nd-pass on every number we would keep/correct' },
  ],
}

// ── Worklist: every distinct NEW (never-adjudicated) phone in confidence_cards,
//    grouped by region so each agent reuses the same official sources.
//    Pre-adjudicated keeps/drops/corrections are handled OUTSIDE this workflow.
const REGIONS = [
  { region: 'Himachal Pradesh — Shimla/Kinnaur/Kullu/Lahaul/Mandi', items: [
    { num: '0177-2625956', claims: 'HP Tourism helpline (Shimla)', dests: 'kasauli/manali/shimla' },
    { num: '0177-2652561', claims: 'HP Tourism helpline', dests: '12 HP dests (chitkul/kalpa/keylong/kufri…)' },
    { num: '01900-222201', claims: 'DC Lahaul-Spiti office', dests: 'lahaul-valley/sissu' },
    { num: '01900-202509', claims: 'District disaster cell Lahaul–Spiti (rescue)', dests: 'chandratal' },
    { num: '01905-222652', claims: 'DC Mandi office', dests: 'prashar-lake' },
    { num: '01902-265355', claims: 'Tourist helpline (Kullu/Parvati)', dests: 'kasol/parvati-valley' },
  ]},
  { region: 'Himachal Pradesh — Kangra/Chamba (Dharamshala/Dalhousie)', items: [
    { num: '01892-224213', claims: 'Tourist helpline Dharamshala', dests: 'dharamshala/mcleodganj' },
    { num: '01892-224473', claims: 'Zonal Hospital Dharamshala', dests: 'dharamshala' },
    { num: '01892-224400', claims: 'Dharamshala Police Station', dests: 'dharamshala' },
    { num: '01899-224002', claims: 'Tourist helpline Chamba', dests: 'chamba' },
    { num: '01899-222261', claims: 'Civil Hospital Chamba', dests: 'chamba' },
    { num: '01899-222244', claims: 'Chamba Police Station', dests: 'chamba' },
    { num: '01899-242136', claims: 'Tourist helpline Dalhousie', dests: 'dalhousie' },
    { num: '01899-242126', claims: 'Dalhousie Police Station', dests: 'dalhousie' },
  ]},
  { region: 'Jammu & Kashmir + Ladakh', items: [
    { num: '01932-222328', claims: 'DC Anantnag office', dests: 'achabal/kokernag/verinag' },
    { num: '0194-2452690', claims: 'J&K Tourism helpline', dests: '9 J&K dests (gulmarg/patnitop…)' },
    { num: '01955-252032', claims: 'DC Kupwara office', dests: 'bangus-valley/lolab-valley' },
    { num: '01982-252297', claims: 'Ladakh Tourism', dests: 'leh/nubra-valley' },
    { num: '01985-232228', claims: 'DC Kargil office', dests: 'drass/kargil' },
  ]},
  { region: 'Uttarakhand — hospitals/police/SDRF/tourism corps', items: [
    { num: '0135-2632040', claims: 'Mussoorie Government Hospital', dests: 'mussoorie' },
    { num: '0135-2632083', claims: 'Mussoorie Police Station', dests: 'mussoorie' },
    { num: '05942-235424', claims: 'Nainital Kotwali (police)', dests: 'nainital' },
    { num: '05962-230252', claims: 'District Hospital Almora', dests: 'almora' },
    { num: '05962-230100', claims: 'Almora Kotwali (police)', dests: 'almora' },
    { num: '05962-230440', claims: 'KMVN (Kumaon Mandal Vikas Nigam), Binsar', dests: 'binsar' },
    { num: '05947-251489', claims: 'Corbett Tiger Reserve office', dests: 'corbett-national-park' },
    { num: '01372-251437', claims: 'Chamoli district SDRF (rescue)', dests: 'hemkund-sahib' },
    { num: '01374-222094', claims: 'Uttarkashi district SDRF (rescue)', dests: 'har-ki-doon' },
  ]},
  { region: 'Rajasthan + Punjab + Haryana', items: [
    { num: '01472-240253', claims: 'MB Government Hospital Chittorgarh', dests: 'chittorgarh' },
    { num: '01472-240100', claims: 'Chittorgarh Kotwali (police)', dests: 'chittorgarh' },
    { num: '05644-222262', claims: 'RBM Hospital Bharatpur', dests: 'bharatpur' },
    { num: '05644-222200', claims: 'Bharatpur Kotwali (police)', dests: 'bharatpur' },
    { num: '0172-2702164', claims: 'Punjab Tourism helpline', dests: 'anandpur-sahib/patiala' },
    { num: '0172-2740569', claims: 'Punjab Tourism (Amritsar)', dests: 'amritsar' },
    { num: '0164-2211500', claims: 'Punjab Police Control Room (Bathinda region)', dests: 'damdama-sahib' },
  ]},
  { region: 'Uttar Pradesh + Bihar + Jharkhand', items: [
    { num: '0565-2500761', claims: 'District Hospital Mathura', dests: 'mathura' },
    { num: '0565-2500800', claims: 'Mathura Kotwali (police)', dests: 'mathura' },
    { num: '05872-252106', claims: 'Dudhwa Tiger Reserve office', dests: 'dudhwa-national-park' },
    { num: '1800-180-1111', claims: 'UP tourist helpline (toll-free)', dests: 'mathura/vrindavan' },
    { num: '0612-2225295', claims: 'Bihar Tourism helpline', dests: '6 Bihar dests (patna/bodh-gaya…)' },
    { num: '0651-2401693', claims: 'Jharkhand Tourism (JTDC)', dests: 'deoghar/netarhat/ranchi' },
    { num: '0651-2545100', claims: 'RIMS Ranchi (hospital)', dests: 'ranchi' },
  ]},
  { region: 'MP + Chhattisgarh + Maharashtra + Gujarat', items: [
    { num: '0755-2774340', claims: 'MP Tourism helpline (Bhopal)', dests: 'bandhavgarh/kanha/omkareshwar' },
    { num: '0771-4066415', claims: 'Chhattisgarh Tourism Board', dests: 'jagdalpur/sirpur' },
    { num: '1800-599-0019', claims: 'Maharashtra Tourism (MTDC) toll-free', dests: 'mumbai' },
    { num: '1800-200-5252', claims: 'Gujarat Tourism toll-free', dests: '31 Gujarat/Daman dests' },
  ]},
  { region: 'Andaman + Puducherry + Lakshadweep + Daman&Diu', items: [
    { num: '03192-232694', claims: 'A&N Islands Tourist Helpline', dests: 'port-blair' },
    { num: '03192-232012', claims: 'GB Pant Hospital, Port Blair', dests: 'port-blair' },
    { num: '03192-234123', claims: 'Port Blair Police Control Room', dests: 'port-blair' },
    { num: '03192-245530', claims: 'Indian Coast Guard, Port Blair', dests: 'port-blair' },
    { num: '0436-922-2233', claims: 'Karaikal helpline (note: odd format, Karaikal STD is 04368)', dests: 'karaikal' },
    { num: '0413-2336025', claims: 'Puducherry Police HQ', dests: 'puducherry' },
    { num: '0413-2296000', claims: 'JIPMER emergency, Puducherry', dests: 'puducherry' },
    { num: '1800-425-1111', claims: 'Puducherry Tourist Police (toll-free)', dests: 'puducherry' },
    { num: '04896-262258', claims: 'Lakshadweep Police, Kavaratti', dests: 'kavaratti' },
    { num: '0260-264-2222', claims: 'Silvassa helpline (note: odd format, Silvassa STD is 0260)', dests: 'silvassa' },
  ]},
  // Pre-adjudicated WRONG numbers — re-confirm the official replacement found in the SOS recorrect pass
  { region: 'Corrections — re-confirm the official replacement', items: [
    { num: '0370-2290142', claims: 'Nagaland Tourism — SOS audit corrected this to 0370-2243124; confirm the OFFICIAL Nagaland Tourism number', dests: 'khonoma' },
    { num: '0651-2400073', claims: 'Jharkhand Tourism — SOS audit corrected this to 0651-2331828; confirm the OFFICIAL JTDC number', dests: 'shikharji' },
  ]},
]

const VERDICT_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['verdicts'],
  properties: {
    verdicts: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['num', 'verdict', 'official_number', 'source_url', 'source_authority', 'notes'],
        properties: {
          num: { type: 'string', description: 'the number AS GIVEN in the worklist (stored format)' },
          verdict: { type: 'string', enum: ['confirmed', 'wrong', 'unverifiable'] },
          official_number: { type: ['string', 'null'], description: 'the correct official number from the official source (== num if confirmed; the corrected number if wrong; null if unverifiable)' },
          source_url: { type: ['string', 'null'], description: 'the exact official URL that shows the number' },
          source_authority: { type: 'string', enum: ['official-govt', 'agency-official', 'aggregator', 'none'] },
          notes: { type: 'string', description: 'one line: what the official source says (or why unverifiable)' },
        },
      },
    },
  },
}

const verifyPrompt = (r) => `You are auditing Indian EMERGENCY / tourism-helpline phone numbers for a travel-safety website. A WRONG emergency number is dangerous, so the bar is strict and adversarial.

REGION: ${r.region}

Verify EACH number below. Treat every number as fabricated until an OFFICIAL source proves it. Many of these were machine-generated — tell-tale signs: sequential/round endings (…222200 / …222262 / …224400), or one generic state-tourism number copy-pasted across many districts, or an STD code that doesn't match the town.

WHAT COUNTS AS CONFIRMATION (official-source bar):
- official-govt: a .gov.in / .nic.in page, the district's official site, the state police/tourism official site, or the institution's own official domain that DISPLAYS this exact number for this exact institution.
- agency-official: the named institution's own official website (e.g. a hospital/park/PSU site) on its own domain.
- aggregator / none: JustDial, Tripadvisor, MagicPin, Sulekha, random blogs, Practo, generic "helpline list" PDFs from non-official sites → these DO NOT confirm. Mark source_authority accordingly and DO NOT treat as confirmed.

For each number return a verdict:
- "confirmed" — an official/agency source shows THIS exact number for THIS institution (set official_number = the same number).
- "wrong" — an official/agency source shows a DIFFERENT current number for this institution (put the correct one in official_number, with its source_url).
- "unverifiable" — you could not find this institution's number on any official/agency source. (official_number = null.) Default here when uncertain — unverifiable numbers will be REMOVED, not kept.

Numbers to verify (use num verbatim in your output):
${r.items.map((i, n) => `${n + 1}. num="${i.num}" — claims: ${i.claims} — appears on: ${i.dests}`).join('\n')}

Search the web (institution name + town + "official" / .gov.in). Prefer the official source over your prior knowledge. Return one verdict object per number. Be honest: it is far better to mark a real number "unverifiable" than to confirm a fabricated one.`

const confirmPrompt = (r, keepers) => `INDEPENDENT SECOND-PASS confirmation of Indian emergency/helpline numbers a first reviewer proposed to KEEP for a travel-safety site. You have NOT seen the first review. Re-verify from scratch against an OFFICIAL government (.gov.in/.nic.in/district/state-police/state-tourism) or the institution's OWN official website. Aggregators (JustDial/Tripadvisor/etc.) do NOT count.

REGION: ${r.region}

For each: confirm whether the proposed number is the CURRENT official number for that institution.
- verdict "confirmed" → official source shows this exact number (official_number = same).
- verdict "wrong" → official source shows a different number (put it in official_number).
- verdict "unverifiable" → no official source found (official_number = null). Default here when uncertain — we will then REMOVE it.

Proposed keepers to re-confirm (use num verbatim):
${keepers.map((k, n) => `${n + 1}. num="${k.num}" → proposed official: ${k.official_number} — claims: ${k.claims}`).join('\n')}

Return one verdict object per number. Independent judgement only.`

// ── Run ──────────────────────────────────────────────────────────────────────
phase('Verify')
const results = await pipeline(
  REGIONS,
  (r) => agent(verifyPrompt(r), { label: `verify:${r.region.slice(0, 28)}`, phase: 'Verify', model: 'haiku', schema: VERDICT_SCHEMA })
            .then((res) => ({ region: r, verdicts: res?.verdicts || [] })),
  (res, r, idx) => {
    // Keepers = anything an official/agency source supports (confirmed, or wrong-with-official-replacement).
    const official = (v) => v.source_authority === 'official-govt' || v.source_authority === 'agency-official'
    const keepers = res.verdicts
      .filter((v) => (v.verdict === 'confirmed' || v.verdict === 'wrong') && v.official_number && official(v))
      .map((v) => ({ num: v.num, official_number: v.official_number, claims: (r.items.find((i) => i.num === v.num) || {}).claims || '' }))
    if (keepers.length === 0) return { region: r.region, pass1: res.verdicts, confirm: [] }
    return agent(confirmPrompt(r, keepers), { label: `confirm:${r.region.slice(0, 26)}`, phase: 'Confirm', model: 'haiku', schema: VERDICT_SCHEMA })
      .then((c) => ({ region: r.region, pass1: res.verdicts, confirm: c?.verdicts || [] }))
  },
)

log(`Verified ${REGIONS.length} regions`)
return results
