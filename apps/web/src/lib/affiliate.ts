/**
 * Affiliate URL plumbing.
 *
 * Booking links currently earn nothing — the Booking.com and Agoda affiliate
 * applications (submitted ~Apr 2026) are still pending approval. This module
 * makes activation a zero-code env-var flip: once an account is approved, set
 * the affiliate ID in Vercel env and every outbound booking link is tagged on
 * the next deploy. With no env var set, `buildAffiliateUrl` returns the URL
 * byte-identical to the pre-affiliate behaviour — no regression, no fabricated
 * IDs in the meantime.
 *
 * Only Booking.com (`aid`) and Agoda (`cid`) expose a documented query-param
 * affiliate mechanism. MakeMyTrip and TripAdvisor affiliate tracking is
 * redirect/network-based and would need its own integration if those
 * programmes are joined later — they are intentionally not param-tagged here.
 */

export type TaggablePartner = "booking" | "agoda";

// Each env var is referenced as a string literal so Next.js inlines it at
// build time. `process.env[dynamicKey]` is NOT inlined — keys must stay literal.
const AFFILIATE_ID: Record<TaggablePartner, string | undefined> = {
  booking: process.env.NEXT_PUBLIC_BOOKING_AID,
  agoda: process.env.NEXT_PUBLIC_AGODA_CID,
};

const AFFILIATE_PARAM: Record<TaggablePartner, string> = {
  booking: "aid",
  agoda: "cid",
};

/**
 * Returns `baseUrl` with the partner's affiliate ID appended as a query param,
 * or the URL unchanged if no ID is configured for that partner. Safe on
 * malformed URLs (returns them untouched).
 */
export function buildAffiliateUrl(partner: TaggablePartner, baseUrl: string): string {
  const id = AFFILIATE_ID[partner];
  if (!id) return baseUrl;
  try {
    const url = new URL(baseUrl);
    url.searchParams.set(AFFILIATE_PARAM[partner], id);
    return url.toString();
  } catch {
    return baseUrl;
  }
}

/** True once a partner's affiliate ID is configured — useful for analytics. */
export function isAffiliateActive(partner: TaggablePartner): boolean {
  return Boolean(AFFILIATE_ID[partner]);
}
