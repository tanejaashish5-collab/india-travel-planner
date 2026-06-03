// Pure (framework-free) trip-cost math for the /cost/[slug] calculator.
//
// Imported by BOTH the server page (for the SSR default estimate baked into the
// initial HTML — the bit Google + AI engines read) and the client calculator
// (for interactive recompute). Keeping the math in one framework-free module is
// what guarantees the server-rendered numbers and the first client render
// agree, so there's no hydration drift.
//
// Every figure is composed from `destination_costs` rows verbatim — NakshIQ's
// season-tagged, source-tagged cost bands. Nothing is fabricated here; this
// module only multiplies known per-night / per-day / per-unit bands by the
// trip shape the user picks.

export type Season = "low" | "shoulder" | "peak";
export type Tier = "budget" | "mid" | "luxury";

/** One row of the `destination_costs` table (the columns we read). */
export type CostRow = {
  category: string;
  season: string; // "low" | "shoulder" | "peak"
  months: number[]; // 1-12 covered by this season for this destination
  typical_inr: number;
  range_low_inr: number | null;
  range_high_inr: number | null;
  unit: string; // per_night | per_day | per_unit | one_time
};

export type TripInputs = {
  days: number; // total days on the ground
  people: number;
  tier: Tier;
  month: number; // 1-12
};

export type CategoryKey =
  | "stay"
  | "food"
  | "localTransport"
  | "intercity"
  | "activities"
  | "permits";

export type CategoryLine = {
  key: CategoryKey;
  amount: number; // INR for the whole trip, this category
  /** Machine-readable assumption tokens the UI localises (kept locale-free here). */
  qty: Record<string, number>;
};

export type TripEstimate = {
  season: Season;
  tier: Tier;
  lines: CategoryLine[];
  total: number;
  perDay: number;
  perPerson: number;
};

export const TIERS: Tier[] = ["budget", "mid", "luxury"];

const COL: Record<Tier, "range_low_inr" | "typical_inr" | "range_high_inr"> = {
  budget: "range_low_inr",
  mid: "typical_inr",
  luxury: "range_high_inr",
};

export const MONTH_NAMES_EN = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
] as const;

export const MONTH_NAMES_HI = [
  "जनवरी", "फ़रवरी", "मार्च", "अप्रैल", "मई", "जून",
  "जुलाई", "अगस्त", "सितंबर", "अक्टूबर", "नवंबर", "दिसंबर",
] as const;

/** Find the season whose month-set contains `month` for this destination. */
export function seasonForMonth(rows: CostRow[], month: number): Season {
  for (const r of rows) {
    if (Array.isArray(r.months) && r.months.includes(month)) {
      return (r.season as Season) ?? "shoulder";
    }
  }
  return "shoulder";
}

/** Read a single band value; fall back to typical when the tier column is null/zero. */
function band(
  rows: CostRow[],
  category: string,
  season: Season,
  col: "range_low_inr" | "typical_inr" | "range_high_inr",
): number | null {
  const r = rows.find((x) => x.category === category && x.season === season);
  if (!r) return null;
  const v = r[col];
  if (typeof v === "number" && v > 0) return v;
  if (typeof r.typical_inr === "number" && r.typical_inr > 0) return r.typical_inr;
  return null;
}

/**
 * Estimate a single-destination trip cost for one tier.
 *
 * Model (kept deliberately transparent — the UI shows every assumption):
 *   nights        = days − 1 (min 1)
 *   stay          = budget → dorm bed × people; mid/luxury → hotel room × ceil(people/2)
 *   food          = per-day × people × days
 *   localTransport= taxi-day × ceil(people/4) × days   (1 cab per 4)
 *   intercity     = per representative leg × people
 *   activities    = activity-sample × people × ceil(days/2)  (~1 paid thing every 2 days)
 *   permits       = flat entry/permit fee × people (always typical — a fee, not a tier)
 */
export function estimateTrip(rows: CostRow[], inputs: TripInputs): TripEstimate {
  const season = seasonForMonth(rows, inputs.month);
  const tier = inputs.tier;
  const col = COL[tier];
  const D = Math.max(1, Math.round(inputs.days));
  const P = Math.max(1, Math.round(inputs.people));
  const nights = Math.max(1, D - 1);
  const lines: CategoryLine[] = [];

  // Stay. Fall back DOWN one rung at a time so a destination missing its
  // splurge/mid row never collapses straight to a homestay rate (which would
  // understate a luxury trip).
  if (tier === "budget") {
    const dorm = band(rows, "hostel-dorm", season, col) ?? band(rows, "homestay", season, col);
    if (dorm != null) {
      lines.push({ key: "stay", amount: dorm * P * nights, qty: { beds: P, nights } });
    }
  } else {
    const chain =
      tier === "luxury"
        ? ["hotel-splurge", "hotel-mid", "homestay"]
        : ["hotel-mid", "homestay"];
    let perNight: number | null = null;
    for (const cat of chain) {
      perNight = band(rows, cat, season, col);
      if (perNight != null) break;
    }
    if (perNight != null) {
      const rooms = Math.ceil(P / 2);
      lines.push({ key: "stay", amount: perNight * rooms * nights, qty: { rooms, nights } });
    }
  }

  // Food
  const food = band(rows, "food-per-day", season, col);
  if (food != null) lines.push({ key: "food", amount: food * P * D, qty: { people: P, days: D } });

  // Local transport (day taxi, shared across a group of 4)
  const taxi = band(rows, "transport-taxi-day", season, col);
  if (taxi != null) {
    const cabs = Math.ceil(P / 4);
    lines.push({ key: "localTransport", amount: taxi * cabs * D, qty: { cabs, days: D } });
  }

  // Getting there (one representative intercity leg per person)
  const intercity = band(rows, "transport-intercity", season, col);
  if (intercity != null) lines.push({ key: "intercity", amount: intercity * P, qty: { people: P } });

  // Activities & entries (~1 paid activity every 2 days)
  const activity = band(rows, "activity-sample", season, col);
  if (activity != null) {
    const n = Math.max(1, Math.round(D / 2));
    lines.push({ key: "activities", amount: activity * P * n, qty: { count: n, people: P } });
  }

  // Permits & fees (flat — a fee, not a comfort tier, so always typical)
  const permit = band(rows, "permit-fees", season, "typical_inr");
  if (permit != null) lines.push({ key: "permits", amount: permit * P, qty: { people: P } });

  const total = lines.reduce((s, l) => s + l.amount, 0);
  return { season, tier, lines, total, perDay: total / D, perPerson: total / P };
}

/** All three tiers for the same trip shape — powers the comparison strip. */
export function estimateAllTiers(
  rows: CostRow[],
  base: Omit<TripInputs, "tier">,
): Record<Tier, TripEstimate> {
  return {
    budget: estimateTrip(rows, { ...base, tier: "budget" }),
    mid: estimateTrip(rows, { ...base, tier: "mid" }),
    luxury: estimateTrip(rows, { ...base, tier: "luxury" }),
  };
}

/** ₹12,345 — Indian-grouping rupee formatter (no decimals). */
export function inr(n: number): string {
  return "₹" + new Intl.NumberFormat("en-IN").format(Math.round(n));
}

/** Compact band for headlines: "₹8,000–₹18,000". */
export function inrRange(low: number, high: number): string {
  return `${inr(low)}–${inr(high)}`;
}
