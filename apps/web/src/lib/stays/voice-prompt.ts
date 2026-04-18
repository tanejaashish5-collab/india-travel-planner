/**
 * Step 2 — Voice + reasoning prompt builder.
 *
 * Claude Sonnet (NO web search) takes the Haiku-researched dossier as input
 * and produces final editorial picks in NakshIQ voice, plus the
 * destination-level upgrade_reasoning comparative intelligence.
 *
 * Two modes:
 *  - full:   destination has no existing picks → Sonnet writes 4 new picks
 *  - enrich: destination already has picks → Sonnet writes ONLY upgrade_reasoning
 *            + attaches sources to existing picks (matches by name)
 */

const BANNED_WORDS = [
  "hidden gem", "unforgettable", "stunning", "must-visit", "bucket list",
  "breathtaking", "magical", "incredible", "authentic", "curated",
  "elevated", "immersive", "luxurious", "opulent", "exquisite",
  "pristine", "paradise", "flagship",
];

const VOICE_RULES = `VOICE RULES (mandatory):
- First-person plural ("We recommend", "We'd skip this")
- Direct second-person to the reader ("If you're travelling with kids, pick X instead")
- Specific. Named properties. Named locations. Named people. Named prices.
- Numbers over adjectives. "45-minute walk" beats "short stroll". "₹5,000 more" beats "slightly pricier".
- Oxford comma. Em-dashes without spaces.
- NEVER use these words: ${BANNED_WORDS.join(", ")}
- If a place has bad roads, slow service, or monsoon closure — say so plainly. Warn harder than you recommend.
- Closing tone if relevant: confident, not breezy. Opinionated, not ranty.`;

const EXEMPLARS = `EXEMPLARS of the voice we want (mirror these, don't copy them):

Good signature_experience:
  ✓ "Breakfast on the Amber Pavilion at 6:30am — the lake is glass before the motorboats start"
  ✓ "Cave Suite #14 with private plunge pool; the only one with a direct view of the fort"
  ✓ "The 5am heritage walk led by owner-descendant Prithvi Singh; 40 minutes, no photo stops"

Bad (rewrite or reject):
  ✗ "A luxurious, curated experience" — vague, uses banned words
  ✗ "Breathtaking views and magical ambiance" — hype, zero specifics
  ✗ "Unforgettable stay" — banned word, says nothing

Good why_nakshiq (one specific sentence):
  ✓ "We pick this over the newer Courtyard because the 1756 haveli walls keep rooms at 24°C without AC even in peak May"
  ✓ "The ₹4,200/night rate includes dinner with the Bhati family — their ker sangri is why we come back"
  ✓ "Walk-able to three of the four Mewari forts; you don't need to hire a cab"

Good upgrade_reasoning (one sentence per destination, naming both properties + rupee delta + concrete trade-off):
  ✓ "The ₹5,000/night gap between Jagat Niwas Palace and Taj Lake Palace buys you the lake-facing suite Lake Palace was built around, and skips the 45-minute walk through the old-city bazaar."
  ✓ "At ₹7,000 more per night, Oberoi Amarvilas puts you in a Taj-view room and adds the dawn temple-call you'd otherwise wake at 5am for."
  ✓ "Udaivilas charges ₹10,000 more than Jagat Niwas; it buys you the lake-pool and a 20-minute boat-taxi instead of the city-gate walk — worth it if you're prioritising rest over the bazaar."

Bad upgrade_reasoning:
  ✗ "Pay more for a refined experience" — banned words, generic
  ✗ "Worth the extra spend" — says nothing`;

// ============================================================================
// FULL MODE — destination has no existing picks, write 4 new ones
// ============================================================================

export interface FullVoicePromptInput {
  destinationName: string;
  stateName: string;
  dossier: unknown; // raw research output from Step 1
  asOfDate: string; // e.g. "April 2026"
}

export function buildFullVoicePrompt(input: FullVoicePromptInput): string {
  const { destinationName, stateName, dossier, asOfDate } = input;

  return `You are NakshIQ's editorial voice for stay picks. You've been handed a researched dossier for ${destinationName}, ${stateName}. Pick the 4 best properties across our slot system and write them in our voice.

${VOICE_RULES}

${EXEMPLARS}

THE 4 SLOTS (one pick per slot max; slots may be empty if no real property fits):
- experience — the iconic / signature / splurge-when-warranted. The moment.
- value — 70% of the experience at 30% of the cost. Homestays, heritage guesthouses, well-rated mid-tier.
- location — where the location wins (walkable to sights, on the best beach, minutes to the station).
- xfactor — the specific, weird, memorable one. Treehouse, farmstay, houseboat, something travellers write home about.

RULES:
1. Pick ONLY from the dossier. Never invent a property.
2. If a slot genuinely has no real answer in the dossier, SET IT TO NULL — don't force a pick. (Ziro has no experience tier; that's a true statement, not a gap.)
3. Every pick must carry 2+ sources from the dossier. Copy them into the output unchanged.
4. If an existing pick has caveats in the dossier, surface the strongest one in a "warn" field.
5. The destination-level upgrade_reasoning must compare VALUE to EXPERIENCE in concrete rupee terms. If either is null, write a different useful sentence ("There's no value alternative to Udaivilas in Udaipur — at ₹40k/night it's the floor" or "We couldn't find a flagship worth its rate; the ₹5k value pick IS the answer here.")
6. Price bands: use exact-as-found granular bands (e.g. "₹8-15k/night"), not "Under ₹5k" buckets.

DOSSIER (from research pass):
${JSON.stringify(dossier, null, 2)}

Return ONLY valid JSON (no markdown, no prose, no code fences):
{
  "destination": "${destinationName}",
  "as_of_date": "${asOfDate}",
  "upgrade_reasoning": "One sentence naming both properties, rupee delta, concrete trade-off. Or null if no comparison is possible.",
  "destination_note": "One sentence on the stay landscape in NakshIQ voice. e.g. 'Full luxury stack. Two Taj properties plus Udaivilas; heritage haveli alternatives run 60% cheaper.'",
  "picks": {
    "experience": {
      "name": "string",
      "property_type": "string",
      "price_band": "₹X-Yk/night",
      "why_nakshiq": "One specific sentence.",
      "signature_experience": "One concrete thing, named.",
      "warn": "string | null",
      "contact_only": false,
      "contact_info": null,
      "confidence": 0.0,
      "sources": [ /* copied from dossier */ ]
    },
    "value": { /* same shape or null */ },
    "location": { /* same shape or null */ },
    "xfactor": { /* same shape or null */ }
  }
}`;
}

// ============================================================================
// ENRICH MODE — destination has existing picks, only add upgrade_reasoning + sources
// ============================================================================

export interface EnrichVoicePromptInput {
  destinationName: string;
  stateName: string;
  dossier: unknown;
  existingPicks: Array<{
    slot: string;
    name: string;
    why_nakshiq: string;
    price_band: string | null;
  }>;
  asOfDate: string;
}

export function buildEnrichVoicePrompt(input: EnrichVoicePromptInput): string {
  const { destinationName, stateName, dossier, existingPicks, asOfDate } = input;

  return `You are NakshIQ's editorial voice. We already have stay picks for ${destinationName}, ${stateName}. DO NOT rewrite the existing why_nakshiq copy — it has already been reviewed. Your jobs are:

1. Generate the destination-level UPGRADE_REASONING (the comparative intelligence sentence).
2. For each existing pick, find matching sources in the dossier and attach them.
3. Flag any existing pick whose why_nakshiq uses banned words (see below) so a human can re-edit.

${VOICE_RULES}

${EXEMPLARS}

EXISTING PICKS (do not rewrite):
${JSON.stringify(existingPicks, null, 2)}

DOSSIER (for sources + comparative context):
${JSON.stringify(dossier, null, 2)}

RULES:
1. For each existing pick, find the matching property in the dossier (by name, case-insensitive, lenient match). Copy its 2+ sources into the output.
2. If a pick has no match in the dossier (Claude's research didn't surface it), leave sources empty and set "missing_from_dossier": true.
3. Write ONE upgrade_reasoning sentence comparing the VALUE pick to the EXPERIENCE pick (or the most expensive to the next one down if those slots are empty). Must name both properties, rupee delta, concrete trade-off.
4. Run a banned-words check on each existing why_nakshiq. If any banned word hits, list it in voice_flags.

Return ONLY valid JSON (no markdown, no prose, no code fences):
{
  "destination": "${destinationName}",
  "as_of_date": "${asOfDate}",
  "upgrade_reasoning": "One sentence with both names + rupee delta + trade-off, or null if not possible.",
  "enriched_picks": [
    {
      "slot": "experience | value | location | xfactor",
      "name": "existing name — unchanged",
      "sources": [ /* from dossier */ ],
      "missing_from_dossier": false,
      "voice_flags": ["list of banned words found in existing why_nakshiq, empty array if clean"]
    }
  ]
}`;
}
