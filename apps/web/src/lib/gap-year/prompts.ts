import type { Persona, Budget, Region } from "./types";
import type { ShortlistItem } from "./shortlist";
import { MONTH_NAMES, REGIONS } from "./types";

const VOICE_RULES = `VOICE RULES (mandatory):
- First-person plural ("We recommend", "We'd skip this")
- NEVER use these words: hidden gem, breathtaking, must-visit, bucket list, curated, elevated, paradise, pristine, magical, stunning
- Be specific: name the exact viewpoint, the road condition, the chai stall
- If a place has bad roads or no ATM, say so plainly
- No filler. No hype. Numbers over adjectives.`;

export function buildSkeletonPrompt(input: {
  months: number[];
  persona: Persona;
  origin?: string;
  interests: string[];
}): string {
  const { months, persona, origin, interests } = input;
  const monthLabels = months.map((m) => MONTH_NAMES[m]).join(", ");

  return `You are NakshIQ's Gap Year chaining engine. Partition a multi-month trip across India into regions that make geographic sense — avoid Kashmir → Kerala → Ladakh zigzags.

${VOICE_RULES}

TRIP:
- Months: ${monthLabels} (${months.length} months in sequence)
- Persona: ${persona === "family_kids" ? "family with children" : "solo or couple, no children"}
- Origin: ${origin || "not specified"}
- Interests: ${interests.length ? interests.join(", ") : "open"}

Valid regions: ${REGIONS.join(", ")}

RULES:
1. Assign exactly ONE region to each month in the sequence.
2. Chain consecutive months in the same region when possible — aim for 2–3 months per region, not 1-month hops.
3. Respect season: Oct-Feb favors south/west/islands; Apr-Jun favors north/northeast; Jul-Sep monsoon favors northeast/islands/high north.
4. Limit to at most 4 region transitions across the whole trip.

Return ONLY valid JSON (no markdown, no code fences):
{
  "chain": [
    { "month": 1, "monthName": "${MONTH_NAMES[months[0]]}", "region": "north" }
  ]
}

The "chain" array MUST have exactly ${months.length} entries, one per month in the input order.`;
}

export function buildMonthPrompt(input: {
  monthIndex: number; // month-of-year 1-12
  persona: Persona;
  budget?: Budget;
  kids: boolean;
  interests: string[];
  regionConstraint: Region | "any";
  alreadyPicked: { id: string; monthName: string }[];
  shortlist: ShortlistItem[];
}): string {
  const { monthIndex, persona, budget, kids, interests, regionConstraint, alreadyPicked, shortlist } = input;
  const monthName = MONTH_NAMES[monthIndex];

  const compactShortlist = shortlist.map((s) => ({
    id: s.id,
    name: s.name,
    state: s.state,
    region: s.region,
    score: s.score,
    note: s.note,
    whyGo: s.whyGo,
    kidsRating: s.kidsRating,
    budgetTier: s.budgetTier,
    tags: s.tags.slice(0, 6),
    elevation: s.elevation,
    difficulty: s.difficulty,
    dailyMidRangeInr: s.dailyCostInr?.midRange ?? null,
  }));

  const alreadyList = alreadyPicked.length
    ? alreadyPicked.map((p) => `${p.id} (${p.monthName})`).join(", ")
    : "none";

  return `You are NakshIQ's Gap Year per-month picker. Choose 1–3 destinations for ${monthName} of a multi-month India trip.

${VOICE_RULES}

CONTEXT:
- Month: ${monthName}
- Persona: ${persona === "family_kids" ? "family with children (kids along)" : "solo or couple"}
- Budget: ${budget || "mid-range"}
- Kids matter: ${kids ? "YES — prioritise kidsRating ≥ 3, avoid extreme difficulty" : "no"}
- Interests: ${interests.length ? interests.join(", ") : "general"}
- Region constraint: ${regionConstraint}
- Already picked elsewhere in this trip (DO NOT REPEAT): ${alreadyList}

SHORTLIST (pre-scored ≥4 for ${monthName}, ordered by score):
${JSON.stringify(compactShortlist, null, 2)}

PICKING RULES:
1. Choose 1–3 destinations from the SHORTLIST ONLY. Never invent an id.
2. Total days for the month must be 22–30 (the traveler spends most of the month here).
3. Balance: one anchor city + one slower retreat works well. Don't pick 3 capital-tier cities.
4. If region constraint is specific (not "any"), all picks must match that region.
5. Write rationale that reads like NakshIQ editorial — specific, not generic.
6. "narrative" is a 2-sentence story of the month as a whole.

Return ONLY valid JSON:
{
  "destinations": [
    { "id": "<id from shortlist>", "days": 12, "rationale": "One specific sentence." }
  ],
  "narrative": "Two short sentences painting the month.",
  "estDailyCostInr": 3500
}`;
}
