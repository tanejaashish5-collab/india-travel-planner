// pilgrimage-guide.ts — types + localisation helpers for the /pilgrimage/[slug]
// surface (backed by the pilgrimage_routes table, migration 068). Mirrors the
// shape of safari-guide.ts. Every numeric (leg distance, step count, parikrama
// km) is source-verified upstream; the UI just renders what's present and hides
// what's null — honest scarcity, never a guessed figure.

import { MONTH_NAMES_EN, MONTH_NAMES_HI, formatMonths } from "./safari-guide";

export { MONTH_NAMES_EN, MONTH_NAMES_HI, formatMonths };

export type PilgrimageLeg = {
  seq: number;
  from: string;
  to: string;
  distance_km: number | null;
  mode: string; // road | rail | trek | pony | palki | heli | foot | ropeway | boat
  elevation_m?: number | null;
  notes?: string;
};
export type PilgrimageAccessMode = { mode: string; detail: string };
export type PilgrimageStage = { name: string; detail: string };
export type PilgrimagePitfall = { title: string; detail: string };
export type PilgrimageSource = { label: string; url: string };

export type PilgrimageRow = {
  slug: string;
  name: string;
  destination_id: string | null;
  kind: "circuit" | "shrine" | "parikrama" | string;
  region: string | null;
  summary: string | null;
  base_town: string | null;
  total_distance_km: number | null;
  parikrama_km: number | null;
  step_count: number | null;
  duration_days_min: number | null;
  duration_days_max: number | null;
  open_months: number[];
  best_months: number[];
  legs: PilgrimageLeg[];
  access_modes: PilgrimageAccessMode[];
  stages: PilgrimageStage[];
  crowd_note: string | null;
  cost_note: string | null;
  pitfalls: PilgrimagePitfall[];
  sources: PilgrimageSource[];
  translations?: { hi?: Partial<PilgrimageRow> } | null;
  last_verified: string | null;
  published?: boolean;
};

// Merge the Hindi overlay over the base row. Numbers (distances, steps, months)
// are locale-independent, so only prose/array-text fields get overlaid; anything
// the hi overlay omits falls back to English (parity is filled incrementally).
export function localizePilgrimage(row: PilgrimageRow, locale: string): PilgrimageRow {
  if (locale !== "hi" || !row.translations?.hi) return row;
  const hi = row.translations.hi;
  return {
    ...row,
    name: hi.name ?? row.name,
    summary: hi.summary ?? row.summary,
    base_town: hi.base_town ?? row.base_town,
    region: hi.region ?? row.region,
    crowd_note: hi.crowd_note ?? row.crowd_note,
    cost_note: hi.cost_note ?? row.cost_note,
    legs: Array.isArray(hi.legs) && hi.legs.length ? (hi.legs as PilgrimageLeg[]) : row.legs,
    access_modes: Array.isArray(hi.access_modes) && hi.access_modes.length ? (hi.access_modes as PilgrimageAccessMode[]) : row.access_modes,
    stages: Array.isArray(hi.stages) && hi.stages.length ? (hi.stages as PilgrimageStage[]) : row.stages,
    pitfalls: Array.isArray(hi.pitfalls) && hi.pitfalls.length ? (hi.pitfalls as PilgrimagePitfall[]) : row.pitfalls,
  };
}

const MODE_LABELS: Record<string, { en: string; hi: string }> = {
  road: { en: "by road", hi: "सड़क" },
  rail: { en: "by rail", hi: "रेल" },
  trek: { en: "trek", hi: "ट्रेक" },
  pony: { en: "pony", hi: "घोड़ा/खच्चर" },
  palki: { en: "palki", hi: "पालकी" },
  heli: { en: "helicopter", hi: "हेलिकॉप्टर" },
  foot: { en: "on foot", hi: "पैदल" },
  ropeway: { en: "ropeway", hi: "रोपवे" },
  boat: { en: "boat", hi: "नाव" },
};
export function modeLabel(mode: string, locale: string): string {
  const m = MODE_LABELS[mode];
  if (!m) return mode;
  return locale === "hi" ? m.hi : m.en;
}

export function formatKm(km: number | null | undefined, locale: string): string {
  if (km == null || !(km > 0)) return "—";
  // keep one decimal only for sub-10km legs (parikramas/treks)
  const v = km < 10 ? Math.round(km * 10) / 10 : Math.round(km);
  return locale === "hi" ? `${v} किमी` : `${v} km`;
}
