/**
 * Affiliate URL plumbing — hotel OTAs and experience marketplaces.
 *
 * Outbound booking and experience links currently earn nothing: the
 * Booking.com, Agoda, Travelpayouts (Viator + GetYourGuide) and Thrillophilia
 * affiliate accounts are pending. This module makes activation a zero-code
 * env-var flip — set the ID in Vercel env and every outbound link is tagged on
 * the next deploy. With no env var set, `buildAffiliateUrl` returns the URL
 * byte-identical to the pre-affiliate behaviour: no regression, no fabricated
 * IDs in the meantime.
 *
 * Only documented query-param affiliate mechanisms are modelled here.
 * MakeMyTrip and TripAdvisor use redirect/network tracking and are
 * intentionally not param-tagged.
 *
 * The param names below are the platform / Travelpayouts defaults — confirm
 * each against the partner dashboard before setting its env var. Until an env
 * var is set the partner's links render untagged, so an unconfirmed param name
 * costs nothing.
 */

/** Hotel OTAs with a query-param affiliate mechanism. */
export type TaggablePartner = "booking" | "agoda";

/** Tours-&-activities marketplaces with a query-param affiliate mechanism. */
export type ExperiencePartner = "viator" | "getyourguide" | "thrillophilia";

export type AffiliatePartner = TaggablePartner | ExperiencePartner;

// Each env var is referenced as a string literal so Next.js inlines it at
// build time. `process.env[dynamicKey]` is NOT inlined — keys must stay literal.
const AFFILIATE_ID: Record<AffiliatePartner, string | undefined> = {
  booking: process.env.NEXT_PUBLIC_BOOKING_AID,
  agoda: process.env.NEXT_PUBLIC_AGODA_CID,
  // Viator + GetYourGuide are reached through one Travelpayouts account, so a
  // single marker tags both.
  viator: process.env.NEXT_PUBLIC_TRAVELPAYOUTS_MARKER,
  getyourguide: process.env.NEXT_PUBLIC_TRAVELPAYOUTS_MARKER,
  thrillophilia: process.env.NEXT_PUBLIC_THRILLOPHILIA_REF,
};

const AFFILIATE_PARAM: Record<AffiliatePartner, string> = {
  booking: "aid",
  agoda: "cid",
  viator: "marker",
  getyourguide: "marker",
  thrillophilia: "ref",
};

/**
 * Returns `baseUrl` with the partner's affiliate ID appended as a query param,
 * or the URL unchanged if no ID is configured for that partner. Safe on
 * malformed URLs (returns them untouched).
 */
export function buildAffiliateUrl(partner: AffiliatePartner, baseUrl: string): string {
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
export function isAffiliateActive(partner: AffiliatePartner): boolean {
  return Boolean(AFFILIATE_ID[partner]);
}
