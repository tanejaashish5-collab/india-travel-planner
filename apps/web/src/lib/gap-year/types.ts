// Persona axes
export type Party = "family_kids" | "solo_couple";
export type Familiarity = "first_timer" | "seasoned";

// Derived archetype — never in the form, computed from (party, familiarity).
export type Archetype =
  | "marquee_family"      // first_timer × family_kids
  | "confident_family"    // seasoned    × family_kids
  | "first_timer_couple"  // first_timer × solo_couple
  | "offbeat_seeker";     // seasoned    × solo_couple

// v1 compatibility — saved plans carry `persona` = Party; keep alias.
export type Persona = Party;

export type ExperienceTier = "thrifty" | "comfortable" | "splurge";

export type Theme =
  | "snow" | "biker" | "dive" | "trek"
  | "pilgrimage" | "beach" | "heritage" | "wildlife";

export const THEMES: Theme[] = [
  "snow", "biker", "dive", "trek", "pilgrimage", "beach", "heritage", "wildlife",
];

// Budget carried through for storage compatibility with v1 saved plans.
// New form fields superset this.
export type Budget = "budget" | "mid-range" | "splurge";

export type Region = "north" | "south" | "east" | "west" | "central" | "northeast" | "islands";

export interface OriginRef {
  id: string;         // e.g. "delhi", "intl-london"
  name: string;       // display name
  state: string;      // admin region
  lat: number;
  lng: number;
}

export interface GapYearInput {
  durationMonths: number;
  startMonth: number;
  party: Party;
  familiarity: Familiarity;
  experienceTier: ExperienceTier;
  themes: Theme[];
  origin: OriginRef | null;

  // back-compat alias accepted by API for v1 callers
  persona?: Party;
  budget?: Budget;
}

// ========= Stay picks =========

export type StaySlot = "experience" | "value" | "location" | "xfactor";

export interface StayPick {
  slot: StaySlot;
  name: string;
  propertyType?: string | null;
  priceBand?: string | null;
  whyNakshiq: string;
  source: "local_stays" | "web_search" | "manual";
  sourceRef?: string | null;
  confidence?: number;
}

// ========= Month / plan =========

export interface AlternativePair {
  altId: string;
  altName: string;
  altState?: string;
  whyBetter: string;
  driveTime?: string;
  vibeDifference?: string;
}

export interface MonthPick {
  id: string;
  name: string;
  state: string;
  days: number;
  rationale: string;
  budgetTier?: string | null;
  dailyCostInr?: { budget?: number; midRange?: number; splurge?: number } | null;
  image?: string | null;
  // New in v2: optional alt pair surfaced alongside the iconic
  alsoTry?: AlternativePair | null;
  // New in v2: 3-4 curated stay picks (fetched client-side on render, optional)
  stays?: StayPick[];
  // Whether we consider this an iconic pick (affects UI surfacing)
  isIconic?: boolean;
  // Cluster id (internal — used for day-cap validation)
  clusterId?: string;
}

export interface MonthPlan {
  monthIndex: number;
  monthName: string;
  region: Region | "any";
  destinations: MonthPick[];
  narrative: string;
  estDailyCostInr: number;
  error?: string;
}

export interface GapYearPlan {
  title: string;
  input: GapYearInput;
  months: MonthPlan[];
  version?: "v1" | "v2";
}

export const REGIONS: Region[] = ["north", "south", "east", "west", "central", "northeast", "islands"];

export const MONTH_NAMES = [
  "",
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export function normalizeRegion(raw: string | null | undefined): Region | null {
  if (!raw) return null;
  const s = raw.toLowerCase().trim();
  if (s.includes("northeast")) return "northeast";
  if (s.includes("island")) return "islands";
  if (s.includes("north")) return "north";
  if (s.includes("south")) return "south";
  if (s.includes("east")) return "east";
  if (s.includes("west")) return "west";
  if (s.includes("central")) return "central";
  return null;
}
