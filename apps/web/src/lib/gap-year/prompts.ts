import type { Persona, Budget, Region, Archetype, ExperienceTier, Theme } from "./types";
import type { ShortlistItem } from "./shortlist";
import { MONTH_NAMES, REGIONS } from "./types";
import { archetypeRules } from "./archetype";

const VOICE_RULES = `VOICE RULES (mandatory):
- First-person plural ("We recommend", "We'd skip this")
- NEVER use these words: hidden gem, breathtaking, must-visit, bucket list, curated, elevated, paradise, pristine, magical, stunning
- Be specific: name the exact viewpoint, the road condition, the chai stall
- If a place has bad roads or no ATM, say so plainly
- No filler. No hype. Numbers over adjectives.`;

export function buildSkeletonPrompt(input: {
  months: number[];
  archetype: Archetype;
  origin?: string;
  themes: Theme[];
}): string {
  const { months, archetype, origin, themes } = input;
  const monthLabels = months.map((m) => MONTH_NAMES[m]).join(", ");
  const rules = archetypeRules(archetype);

  return `You are NakshIQ's Gap Year regional-chain engine. Partition a multi-month trip across India into regions that make geographic sense — avoid Kashmir → Kerala → Ladakh zigzags.

${VOICE_RULES}

TRIP:
- Months: ${monthLabels} (${months.length} months in sequence)
- Archetype: ${archetype} — ${rules.description}
- Origin: ${origin || "not specified"}
- Themes: ${themes.length ? themes.join(", ") : "general"}

Valid regions: ${REGIONS.join(", ")}

RULES:
1. Assign exactly ONE region to each month in the sequence.
2. Chain consecutive months in the same region when possible — aim for 2–3 months per region, not 1-month hops.
3. Respect season: Oct–Feb favours south/west/islands; Apr–Jun favours north/northeast; Jul–Sep monsoon favours northeast/islands/high north.
4. Limit to at most 4 region transitions across the whole trip.

Return ONLY valid JSON (no markdown, no code fences):
{
  "chain": [
    { "month": 1, "monthName": "${MONTH_NAMES[months[0]]}", "region": "north" }
  ]
}

The "chain" array MUST have exactly ${months.length} entries, one per month in the input order.`;
}

interface BuildMonthPromptInput {
  monthIndex: number;
  archetype: Archetype;
  experienceTier: ExperienceTier;
  themes: Theme[];
  regionConstraint: Region | "any";
  alreadyPicked: { id: string; monthName: string }[];
  shortlist: ShortlistItem[];
  enforceSplit?: boolean; // true on day-cap violation replay
}

export function buildMonthPrompt(input: BuildMonthPromptInput): string {
  const {
    monthIndex, archetype, experienceTier, themes,
    regionConstraint, alreadyPicked, shortlist, enforceSplit,
  } = input;
  const monthName = MONTH_NAMES[monthIndex];
  const rules = archetypeRules(archetype);

  // Compact shortlist for prompt — include cluster_id, iconic flag, alternative pair
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
    iconic: s.isIconic,
    cluster: s.clusterId,
    alsoTry: s.alsoTry
      ? { altId: s.alsoTry.altId, altName: s.alsoTry.altName, whyBetter: s.alsoTry.whyBetter }
      : null,
  }));

  // Cluster stats — used by day-cap enforcement
  const clusterCounts: Record<string, number> = {};
  for (const s of shortlist) {
    if (s.clusterId) clusterCounts[s.clusterId] = (clusterCounts[s.clusterId] ?? 0) + 1;
  }
  const largestCluster = Math.max(0, ...Object.values(clusterCounts));

  const alreadyList = alreadyPicked.length
    ? alreadyPicked.map((p) => `${p.id} (${p.monthName})`).join(", ")
    : "none";

  // Archetype-specific picking instructions
  const archetypeBlock = (() => {
    switch (archetype) {
      case "marquee_family":
        return `ARCHETYPE RULES (Marquee Family — first India trip, with kids):
- Lead with RECOGNISABLE names (iconic=true in shortlist).
- Prefer 2 anchors per month. Both should be iconic unless only one iconic exists.
- When an iconic pick has alsoTry (a known offbeat alternative), KEEP the iconic as the anchor AND include the alsoTry destination as a 3-5 day "slower alternative" second pick where space permits. Never replace the iconic.
- Kid suitability is paramount — avoid difficult/high-elevation picks.`;
      case "confident_family":
        return `ARCHETYPE RULES (Confident Family — returning, with kids):
- Mix ONE iconic anchor with ONE or TWO offbeat picks.
- When an iconic has alsoTry, you MAY surface both (anchor + alternative) so the family can compare.
- Kid suitability still matters; avoid extremes.`;
      case "first_timer_couple":
        return `ARCHETYPE RULES (First-timer Couple):
- Lead with iconic recognisable picks.
- Reserve ONE slot per month for an offbeat gem (preferably an alsoTry of a month's iconic).
- No kid constraints — you can include tougher / higher-elevation picks.`;
      case "offbeat_seeker":
        return `ARCHETYPE RULES (Offbeat Seeker — seasoned, no kids):
- Prefer offbeat picks (iconic=false in shortlist).
- When an iconic candidate appears with an alsoTry, SUBSTITUTE with the alsoTry (pick the alternative, not the trap). Do not mention the trap by name.
- Willing to trade comfort for specificity.`;
    }
  })();

  const experienceTierBlock = (() => {
    switch (experienceTier) {
      case "thrifty":
        return `EXPERIENCE TIER: thrifty
- Prefer destinations with budget or mixed budget_tier.
- Never pick a destination whose only realistic stay option is splurge-only.`;
      case "splurge":
        return `EXPERIENCE TIER: splurge-when-warranted
- When a destination is defined by a specific iconic property (Udaipur → Lake Palace, Agra → Oberoi Amarvilas), lean into it.
- Do NOT recommend splurge every night — balance with comfortable picks in the same region.`;
      default:
        return `EXPERIENCE TIER: comfortable — default balance, no strong tier preference.`;
    }
  })();

  const daySplitBlock = `DAY CAPS (hard):
- No single destination gets more than 10 days.
- Total days for the month: 22–30.
${largestCluster >= 3 ? "- Your shortlist has a cluster of ≥3 nearby destinations — you MUST split across at least 3 stops rather than stuffing one destination." : ""}
${enforceSplit ? "- REPLAY: your previous response violated day caps. Split across more stops; no single pick > 10 days." : ""}`;

  return `You are NakshIQ's Gap Year per-month picker. Choose 1–3 destinations for ${monthName} of a multi-month India trip.

${VOICE_RULES}

CONTEXT:
- Month: ${monthName}
- Region constraint: ${regionConstraint}
- Already picked elsewhere in this trip (DO NOT REPEAT): ${alreadyList}

${archetypeBlock}

${experienceTierBlock}

${daySplitBlock}

THEMES (optional flavour, not hard filter): ${themes.length ? themes.join(", ") : "none"}

TRANSIT:
- Assume 1 travel day between non-adjacent destinations (>200km apart). Account for it by subtracting from the 22–30 day budget.

SHORTLIST (pre-scored ≥${rules.minScore} for ${monthName}, with iconic flag, cluster, and alsoTry pair where known):
${JSON.stringify(compactShortlist, null, 2)}

PICKING RULES:
1. Choose destinations ONLY from the SHORTLIST ids. Never invent.
2. Ideal stops: ${rules.defaultStopsPerMonth}.
3. "rationale" is one specific NakshIQ-voice sentence — no generic prose.
4. "narrative" is a 2-sentence story framing the month.

Return ONLY valid JSON (no markdown, no code fences):
{
  "destinations": [
    {
      "id": "<id from shortlist>",
      "days": 8,
      "rationale": "One specific sentence in NakshIQ voice.",
      "alsoTryId": "<alsoTry.altId if you're pairing the iconic with its alternative, else null>"
    }
  ],
  "narrative": "Two sentences painting the month.",
  "estDailyCostInr": 3500
}`;
}
