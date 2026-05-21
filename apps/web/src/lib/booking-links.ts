/**
 * Outbound hotel-booking link construction for <BookingHandoff>.
 *
 * Destination pages hand readers off to OTAs to book a stay. These links must
 * land on the CORRECT destination, so the URL formulas were verified in-browser
 * (2026-05-21):
 *
 *  - Booking.com  searchresults.html?ss=<Name>, <State>, India  — free-text
 *                 location search, resolves the destination reliably.
 *  - Agoda        /city/<slug>-in.html — per-city page, works for offbeat towns
 *                 (verified Manali + Tosh); slug derived from the name.
 *  - Tripadvisor  /Search?q=<Name>, <State>, India — location search.
 *  - MakeMyTrip   has no reliable per-destination deep link — ?city=<name> and
 *                 the /hotels/hotels-in-<slug> SEO pattern both fail for
 *                 non-major towns — so it points at the hotels home page.
 *
 * Per-destination exact URLs (mainly Agoda slug corrections for hand-verified
 * high-traffic destinations) live in data/booking-link-overrides.json and win
 * over the formula.
 *
 * Booking.com and Agoda links are routed through buildAffiliateUrl() so they
 * auto-tag the moment the affiliate IDs land in env — see affiliate.ts.
 */

import { buildAffiliateUrl } from "./affiliate";
import overridesData from "../../data/booking-link-overrides.json";

export type BookingPlatform = "makemytrip" | "booking" | "tripadvisor" | "agoda";

export type BookingLink = {
  platform: BookingPlatform;
  name: string;
  url: string;
  /** Tailwind colour classes for the link pill. */
  color: string;
  /** Set when the platform supports query-param affiliate tagging. */
  affiliate?: "booking" | "agoda";
};

type DestinationArg = {
  /** Destination id slug — used to look up per-destination overrides. */
  id?: string;
  name: string;
  state?: string;
};

const OVERRIDES = overridesData as unknown as Record<
  string,
  Partial<Record<BookingPlatform, string>>
>;

/** Agoda per-city page slug: lowercased name, alt-name parens dropped, hyphenated. */
function agodaSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/\([^)]*\)/g, "")
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Precise free-text location string, e.g. "Chopta, Uttarakhand, India". */
function locationQuery(name: string, state?: string): string {
  return [name.replace(/\([^)]*\)/g, "").trim(), state, "India"]
    .filter(Boolean)
    .join(", ");
}

/**
 * Builds the four outbound booking links for a destination, applying any
 * per-destination override and affiliate tagging.
 */
export function getBookingLinks(dest: DestinationArg): BookingLink[] {
  const override = (dest.id && OVERRIDES[dest.id]) || {};
  const q = encodeURIComponent(locationQuery(dest.name, dest.state));
  const slug = agodaSlug(dest.name);

  const links: BookingLink[] = [
    {
      platform: "makemytrip",
      name: "MakeMyTrip",
      // No reliable per-destination deep link — readers search from the hub.
      url: override.makemytrip ?? "https://www.makemytrip.com/hotels/",
      color: "text-red-400 border-red-500/30 hover:bg-red-500/10",
    },
    {
      platform: "booking",
      name: "Booking.com",
      url: override.booking ?? `https://www.booking.com/searchresults.html?ss=${q}`,
      color: "text-blue-400 border-blue-500/30 hover:bg-blue-500/10",
      affiliate: "booking",
    },
    {
      platform: "tripadvisor",
      name: "Tripadvisor",
      url: override.tripadvisor ?? `https://www.tripadvisor.in/Search?q=${q}`,
      color: "text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/10",
    },
    {
      platform: "agoda",
      name: "Agoda",
      url: override.agoda ?? `https://www.agoda.com/city/${slug}-in.html`,
      color: "text-violet-300 border-violet-500/30 hover:bg-violet-500/10",
      affiliate: "agoda",
    },
  ];

  return links.map((link) =>
    link.affiliate ? { ...link, url: buildAffiliateUrl(link.affiliate, link.url) } : link,
  );
}
