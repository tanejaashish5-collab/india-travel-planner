/**
 * Outbound tours-&-activities link construction for <BookingHandoff>.
 *
 * Destination pages hand readers off to experience marketplaces for tours,
 * treks, safaris and day activities. Unlike hotel OTAs (Booking.com tracks on
 * a session-only cookie, Agoda direct on 1 day), these partners attribute on a
 * 30-day cookie — they survive the research-to-booking gap, so they are the
 * better-converting affiliate layer for trip-planning content.
 *
 * POI data is not yet seeded, so links are destination-level. URL formulas
 * were verified in-browser 2026-05-22:
 *
 *  - Viator        /search/<name> — resolves a known destination to its tours
 *                  page, an offbeat one to a search-results page; never 404s.
 *  - GetYourGuide  /s/?q=<name> — free-text activity search; never 404s.
 *  - Thrillophilia has no graceful per-destination URL (its ?q= search falls
 *                  back to the homepage; /cities/<slug> 404s for offbeat
 *                  towns), so it renders ONLY where a hand-verified URL is
 *                  pinned in data/experience-link-overrides.json — the same
 *                  honest-degradation approach as MakeMyTrip in booking-links.
 *
 * Links route through buildAffiliateUrl() so they auto-tag the moment the
 * Travelpayouts / Thrillophilia IDs land in env — see affiliate.ts.
 */

import { buildAffiliateUrl, type ExperiencePartner } from "./affiliate";
import overridesData from "../../data/experience-link-overrides.json";

export type ExperiencePlatform = ExperiencePartner;

export type ExperienceLink = {
  platform: ExperiencePlatform;
  name: string;
  url: string;
  /** Tailwind colour classes for the link pill. */
  color: string;
  /** Partner key for query-param affiliate tagging. */
  affiliate: ExperiencePartner;
};

type DestinationArg = {
  /** Destination id slug — used to look up per-destination overrides. */
  id?: string;
  name: string;
  state?: string;
};

const OVERRIDES = overridesData as unknown as Record<
  string,
  Partial<Record<ExperiencePlatform, string>>
>;

/** Destination name with any "(alt name)" parenthetical dropped. */
function cleanName(name: string): string {
  return name.replace(/\([^)]*\)/g, "").trim();
}

/**
 * Builds the outbound tours-&-activities links for a destination, applying any
 * per-destination override and affiliate tagging. Viator + GetYourGuide always
 * render; Thrillophilia renders only when an override URL is pinned.
 */
export function getExperienceLinks(dest: DestinationArg): ExperienceLink[] {
  const override = (dest.id && OVERRIDES[dest.id]) || {};
  const q = encodeURIComponent(cleanName(dest.name));

  const links: ExperienceLink[] = [
    {
      platform: "viator",
      name: "Viator",
      url: override.viator ?? `https://www.viator.com/search/${q}`,
      color: "text-sky-300 border-sky-500/30 hover:bg-sky-500/10",
      affiliate: "viator",
    },
    {
      platform: "getyourguide",
      name: "GetYourGuide",
      url: override.getyourguide ?? `https://www.getyourguide.com/s/?q=${q}`,
      color: "text-amber-300 border-amber-500/30 hover:bg-amber-500/10",
      affiliate: "getyourguide",
    },
  ];

  // Thrillophilia (India-domestic) has no graceful formula — include it only
  // when a hand-verified URL is pinned for this destination.
  if (override.thrillophilia) {
    links.push({
      platform: "thrillophilia",
      name: "Thrillophilia",
      url: override.thrillophilia,
      color: "text-rose-300 border-rose-500/30 hover:bg-rose-500/10",
      affiliate: "thrillophilia",
    });
  }

  return links.map((link) => ({
    ...link,
    url: buildAffiliateUrl(link.affiliate, link.url),
  }));
}
