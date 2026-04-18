export type Persona = "family_kids" | "solo_couple";
export type Budget = "budget" | "mid-range" | "splurge";
export type Region = "north" | "south" | "east" | "west" | "central" | "northeast" | "islands";

export interface GapYearInput {
  durationMonths: number;
  startMonth: number;
  persona: Persona;
  budget?: Budget;
  origin?: string;
  interests: string[];
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
