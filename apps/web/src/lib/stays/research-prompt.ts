/**
 * Step 1 — Research prompt builder.
 *
 * Claude Haiku + web_search tool gathers a raw dossier of stay candidates
 * for a single destination. No editorial voice applied, no slot assignments
 * yet. Output is structured JSON, consumed by the Step-2 voice prompt (Sonnet).
 *
 * Used by both modes:
 *  - "full" mode:   destination has no existing rows → full 4-pick output
 *  - "enrich" mode: destination already has rows → same dossier is used to
 *                   add sources + upgrade_reasoning only, preserving existing copy
 */

export interface ResearchPromptInput {
  destinationName: string;
  stateName: string;
  destinationContext?: string;       // optional one-liner about the destination
  existingPropertyNames?: string[];  // when enrich mode — tell Claude to prioritise finding sources for these
}

export function buildResearchPrompt(input: ResearchPromptInput): string {
  const { destinationName, stateName, destinationContext, existingPropertyNames } = input;

  const enrichNote = existingPropertyNames && existingPropertyNames.length
    ? `\n\nPRIORITY: We already have editorial picks for this destination. Include these specific properties in your dossier and find 2+ sources for each, even if you'd otherwise skip them:\n${existingPropertyNames.map((n) => `  - ${n}`).join("\n")}\n\nAlso list any OTHER strong candidates you find — we may swap in better picks if sources are strong.`
    : "";

  return `You are a travel researcher. Build a RAW DOSSIER of stay options for ${destinationName}, ${stateName}, India. No editorial voice. No picks. No recommendations. Just structured facts with sources.

${destinationContext ? `Context: ${destinationContext}` : ""}${enrichNote}

Use web_search to find current information. Prioritise these sources in order:
1. Property's own website (most authoritative for name, type, signature experiences)
2. Awards lists — Condé Nast Gold List, Travel+Leisure 500, Tripadvisor Travelers' Choice, National Geographic India
3. Recent reviews (2024–2026) — Tripadvisor, Booking, Agoda
4. Travel editorial — Condé Nast Traveller India, T+L India, NatGeo India
5. YouTube hotel tours, Reddit r/IndiaTravel threads (useful for homestays)

For EACH property found, return:
- name: exact property name as on their website
- property_type: one of — "luxury_chain" | "heritage" | "boutique" | "mid_range_hotel" | "resort" | "homestay" | "guesthouse" | "eco_lodge" | "farmstay" | "villa" | "glamping_camp" | "houseboat"
- chain_affiliation: e.g. "Taj" | "Oberoi" | "Four Seasons" | "IHCL Seleqtion" | "Radisson" | null
- price_band_specific: specific per-night rupee band for entry-level double-occupancy, as granular as sources allow — e.g. "₹3-6k" | "₹8-15k" | "₹18-28k" | "₹40k+". If no data: null.
- signature_experience: ONE specific thing this property is known for (named — e.g. "breakfast on the lake-facing Amber Pavilion", "cave-suite #14 with private plunge pool", "the 5am heritage walk led by owner Ravi Singh"). No adjectives. A concrete thing.
- slot_hint: suggest which of the 4 editorial slots this property best fits: "experience" (iconic/signature/splurge) | "value" (70% experience at 30% cost) | "location" (the location wins) | "xfactor" (weird, memorable, write-home-about). Hint only — Sonnet decides final placement.
- contact_only: true if property is NOT on Booking/Agoda/MMT and must be reached by phone/WhatsApp. false otherwise.
- contact_info: if contact_only=true, the phone/WhatsApp/email. Else null.
- signals: array of 1-4 strings noting awards, distinguishing features, or recent news ("Tripadvisor Travelers' Choice 2025", "Featured in T+L 500 2024", "Recently renovated 2025")
- caveats: array of honest warnings where applicable ("reports of slow service in 2024 reviews", "pool closed in monsoon", "remote — 45 min drive from town")
- sources: array of 2+ source objects — { url, title, source_type: "property" | "review" | "award" | "guide" | "video" | "reddit" }

RULES:
- MINIMUM 4 properties, MAXIMUM 8. If fewer than 4 real verified properties exist with sources, return fewer and set "insufficient_data": true at the top level.
- NEVER invent a property. If you're uncertain a property exists, exclude it.
- If ${destinationName} has NO recognised luxury/branded hotels, say so in "destination_note". Do not manufacture one.
- Spread slot_hint coverage — ideally at least one candidate per slot (experience/value/location/xfactor).
- Every property MUST have at least 2 sources from different domains. One source = exclude the property. No exceptions.

Return ONLY valid JSON (no markdown, no prose, no code fences):
{
  "destination": "${destinationName}",
  "state": "${stateName}",
  "insufficient_data": false,
  "destination_note": "One sentence on the stay landscape — e.g. 'Full luxury stack present — three branded 5-stars plus heritage haveli alternatives' or 'No chain luxury; two heritage guesthouses and a dozen family homestays.'",
  "properties": [
    {
      "name": "string",
      "property_type": "string",
      "chain_affiliation": "string | null",
      "price_band_specific": "string | null",
      "signature_experience": "string",
      "slot_hint": "experience | value | location | xfactor",
      "contact_only": false,
      "contact_info": null,
      "signals": ["string"],
      "caveats": ["string"],
      "sources": [
        { "url": "https://...", "title": "string", "source_type": "string" }
      ]
    }
  ]
}`;
}
