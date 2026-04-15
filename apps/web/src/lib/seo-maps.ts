// ─── Single source of truth for state, region, and month maps ───
// Import from here everywhere. DO NOT duplicate these maps.

export const STATE_MAP: Record<string, string> = {
  "himachal-pradesh": "Himachal Pradesh", "uttarakhand": "Uttarakhand",
  "jammu-kashmir": "Jammu & Kashmir", "ladakh": "Ladakh",
  "rajasthan": "Rajasthan", "punjab": "Punjab",
  "uttar-pradesh": "Uttar Pradesh", "sikkim": "Sikkim",
  "west-bengal": "West Bengal", "madhya-pradesh": "Madhya Pradesh",
  "delhi": "Delhi", "chandigarh": "Chandigarh",
  "arunachal-pradesh": "Arunachal Pradesh", "assam": "Assam",
  "bihar": "Bihar", "chhattisgarh": "Chhattisgarh",
  "haryana": "Haryana", "jharkhand": "Jharkhand",
  "manipur": "Manipur", "meghalaya": "Meghalaya",
  "mizoram": "Mizoram", "nagaland": "Nagaland", "tripura": "Tripura",
  "gujarat": "Gujarat",
  "maharashtra": "Maharashtra",
  "goa": "Goa",
  "karnataka": "Karnataka",
  "kerala": "Kerala",
};

export const REGION_GROUPS: Record<string, { name: string; states: string[] }> = {
  "north": {
    name: "North India",
    states: ["himachal-pradesh", "uttarakhand", "jammu-kashmir", "ladakh", "rajasthan", "punjab", "delhi", "uttar-pradesh", "chandigarh", "haryana"],
  },
  "south": {
    name: "South India",
    states: ["karnataka", "kerala"],
  },
  "east": {
    name: "East India",
    states: ["west-bengal", "bihar", "jharkhand"],
  },
  "west": {
    name: "West India",
    states: ["gujarat", "maharashtra", "goa"],
  },
  "central": {
    name: "Central India",
    states: ["madhya-pradesh", "chhattisgarh"],
  },
  "northeast": {
    name: "Northeast India",
    states: ["sikkim", "arunachal-pradesh", "assam", "meghalaya", "nagaland", "manipur", "mizoram", "tripura"],
  },
};

export const ALL_REGION_SLUGS = Object.keys(REGION_GROUPS);

export function getRegionForState(stateSlug: string): string | null {
  for (const [regionSlug, region] of Object.entries(REGION_GROUPS)) {
    if (region.states.includes(stateSlug)) return regionSlug;
  }
  return null;
}

export function getRegionNameForState(stateSlug: string): string | null {
  for (const region of Object.values(REGION_GROUPS)) {
    if (region.states.includes(stateSlug)) return region.name;
  }
  return null;
}

export const MONTH_MAP: Record<string, { num: number; name: string }> = {
  january: { num: 1, name: "January" }, february: { num: 2, name: "February" },
  march: { num: 3, name: "March" }, april: { num: 4, name: "April" },
  may: { num: 5, name: "May" }, june: { num: 6, name: "June" },
  july: { num: 7, name: "July" }, august: { num: 8, name: "August" },
  september: { num: 9, name: "September" }, october: { num: 10, name: "October" },
  november: { num: 11, name: "November" }, december: { num: 12, name: "December" },
};

export const DIFFICULTY_MAP: Record<string, string> = {
  easy: "Easy", moderate: "Moderate", hard: "Hard", extreme: "Extreme",
};

export const ALL_STATE_SLUGS = Object.keys(STATE_MAP);
export const ALL_MONTH_SLUGS = Object.keys(MONTH_MAP);
export const ALL_DIFFICULTY_SLUGS = Object.keys(DIFFICULTY_MAP);

export function getSupabase() {
  const { createClient } = require("@supabase/supabase-js");
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}
