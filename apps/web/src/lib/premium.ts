// Premium feature gating — foundation for monetisation
// Currently all features are free. This module sets up the infrastructure
// for future subscription gating without changing any user-facing behavior yet.

export function isPremium(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem("premium") === "true";
}

export const PREMIUM_FEATURES = {
  aiItinerary: false,       // currently free — gate later
  advancedCompare: false,   // currently free
  offlinePacks: true,       // gate from start
  routeExport: true,        // gate from start
  weatherAlerts: true,      // gate from start
  stayIntelligence: false,  // currently free — shows value of the platform
  fullGraph: false,         // alternative suggestions currently free
} as const;

export type PremiumFeature = keyof typeof PREMIUM_FEATURES;

export function isFeatureGated(feature: PremiumFeature): boolean {
  return PREMIUM_FEATURES[feature] && !isPremium();
}
