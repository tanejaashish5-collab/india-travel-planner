import { videoSrc } from "./video-url";

/**
 * Registry of landing-hero R2 video stems shipped 2026-05-11/12.
 *
 * Each set lists the slug fragment after the prefix, NOT the full filename.
 * Example: STATE_HEROES contains "goa", which resolves to videoSrc("state-goa").
 *
 * Keep these sets in sync with what's actually uploaded to R2 — adding a
 * slug here without a matching upload would render a broken <video>.
 */

export const STATE_HEROES = new Set<string>([
  "andaman-nicobar", "andhra-pradesh", "arunachal-pradesh", "assam", "bihar",
  "chandigarh", "chhattisgarh", "daman-diu", "delhi", "goa", "gujarat",
  "haryana", "himachal-pradesh", "jammu-kashmir", "jharkhand", "karnataka",
  "kerala", "ladakh", "lakshadweep", "madhya-pradesh", "maharashtra",
  "manipur", "meghalaya", "mizoram", "nagaland", "odisha", "puducherry",
  "punjab", "rajasthan", "sikkim", "tamil-nadu", "telangana", "tripura",
  "uttar-pradesh", "uttarakhand", "west-bengal",
]);

export const MACRO_REGION_HEROES = new Set<string>([
  "north", "south", "east", "west", "northeast",
]);

export const MONTH_HEROES = new Set<string>([
  "january", "february", "march", "april", "may", "june",
  "july", "august", "september", "october", "november", "december",
]);

export const CATEGORY_HEROES = new Set<string>([
  "treks", "camping", "routes", "stays", "festivals",
  "tourist-traps", "road-conditions", "explore",
]);

/**
 * stateHeroSrc(slug, fallbackDestId) — returns the state landing-hero video
 * if uploaded; falls back to the first destination's video for states still
 * pending render. Always returns a usable URL string (empty if VIDEO_BASE
 * isn't configured).
 */
export function stateHeroSrc(slug: string, fallbackDestId: string): string {
  return STATE_HEROES.has(slug) ? videoSrc(`state-${slug}`) : videoSrc(fallbackDestId);
}

export function macroRegionHeroSrc(slug: string, fallbackDestId: string): string {
  return MACRO_REGION_HEROES.has(slug) ? videoSrc(`region-${slug}`) : videoSrc(fallbackDestId);
}

export function monthHeroSrc(slug: string): string {
  return MONTH_HEROES.has(slug) ? videoSrc(`month-${slug}`) : "";
}

export function categoryHeroSrc(slug: string): string {
  return CATEGORY_HEROES.has(slug) ? videoSrc(`lp-${slug}`) : "";
}

/**
 * Boolean checks for callers that want to render a section conditionally
 * (e.g., add a video frame only when the asset exists).
 */
export const hasStateHero = (slug: string) => STATE_HEROES.has(slug);
export const hasMacroRegionHero = (slug: string) => MACRO_REGION_HEROES.has(slug);
export const hasMonthHero = (slug: string) => MONTH_HEROES.has(slug);
export const hasCategoryHero = (slug: string) => CATEGORY_HEROES.has(slug);
