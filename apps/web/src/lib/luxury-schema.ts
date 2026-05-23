// JSON-LD builders for /luxury surface.
//
// Trains + curated itineraries → TouristTrip (Google's preferred type for
// multi-day travel packages; supports itinerary as an array of City/Place).
// Iconic stays → LodgingBusiness (parent of Hotel; carries priceRange,
// starRating, containedInPlace). Hub → ItemList.
//
// Mirrors the festival-schema.ts pattern. Pages reference site-level
// Organization + WebSite via @id refs from seo-utils.ts.

import { ORG_ID, WEBSITE_ID } from "./seo-utils";

const BASE = "https://www.nakshiq.com";

export type LuxuryRow = {
  id: string;
  name: string;
  category: "train" | "stay" | "itinerary";
  tier: "luxury" | "ultra_luxury" | "iconic";
  state_id?: string | null;
  primary_destination_id?: string | null;
  secondary_destination_ids?: string[] | null;
  operator?: string | null;
  official_url?: string | null;
  hero_image_url?: string | null;
  tagline?: string | null;
  editorial?: string | null;
  signature_experience?: string | null;
  price_band_inr?: string | null;
  duration?: string | null;
  best_months?: number[] | null;
  route_legs?: Array<{ day?: number; city?: string; highlight?: string }> | null;
  included?: string[] | null;
  booking_links?: Record<string, string> | null;
  sources?: Array<{ label?: string; url?: string }> | null;
  translations?: Record<string, Record<string, string>> | null;
};

type SchemaObject = Record<string, unknown>;

function priceRangeBucket(band?: string | null): string | undefined {
  if (!band) return undefined;
  const lakhs = /\dL/.test(band);
  return lakhs ? "$$$$" : "$$$";
}

/** TouristTrip schema — for trains + itineraries. */
export function singleLuxuryTouristTripJsonLd(row: LuxuryRow, pageUrl: string): SchemaObject {
  const legs = row.route_legs ?? [];
  const itinerary = legs.map((leg, i) => ({
    "@type": "City",
    name: leg.city ?? `Day ${leg.day ?? i + 1}`,
    ...(leg.highlight ? { description: leg.highlight } : {}),
  }));
  const schema: SchemaObject = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    "@id": `${pageUrl}#trip`,
    name: row.name,
    url: pageUrl,
    inLanguage: pageUrl.includes("/hi/") ? "hi-IN" : "en-IN",
    isPartOf: { "@id": WEBSITE_ID },
    provider: row.operator
      ? { "@type": "Organization", name: row.operator, ...(row.official_url ? { url: row.official_url } : {}) }
      : { "@id": ORG_ID },
  };
  if (row.tagline) schema.description = row.tagline;
  else if (row.editorial) schema.description = row.editorial.slice(0, 300);
  if (itinerary.length) schema.itinerary = itinerary;
  if (row.duration) schema.subjectOf = { "@type": "CreativeWork", name: row.duration };
  if (row.price_band_inr) {
    schema.offers = {
      "@type": "Offer",
      priceCurrency: "INR",
      description: row.price_band_inr,
      ...(row.official_url ? { url: row.official_url } : {}),
      availability: "https://schema.org/InStock",
    };
  }
  return schema;
}

/** LodgingBusiness schema — for stays. */
export function singleLuxuryLodgingJsonLd(row: LuxuryRow, pageUrl: string): SchemaObject {
  const schema: SchemaObject = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    "@id": `${pageUrl}#lodging`,
    name: row.name,
    url: pageUrl,
    inLanguage: pageUrl.includes("/hi/") ? "hi-IN" : "en-IN",
    isPartOf: { "@id": WEBSITE_ID },
  };
  if (row.tagline) schema.description = row.tagline;
  else if (row.editorial) schema.description = row.editorial.slice(0, 300);
  if (row.operator) schema.brand = { "@type": "Brand", name: row.operator };
  if (row.official_url) schema.sameAs = [row.official_url];
  const region = row.state_id ? row.state_id.replace(/-/g, " ") : undefined;
  schema.address = {
    "@type": "PostalAddress",
    ...(region ? { addressRegion: region } : {}),
    addressCountry: "IN",
  };
  const priceRange = priceRangeBucket(row.price_band_inr);
  if (priceRange) schema.priceRange = priceRange;
  if (row.tier === "iconic" || row.tier === "ultra_luxury") {
    schema.starRating = { "@type": "Rating", ratingValue: row.tier === "iconic" ? "5" : "5" };
  }
  return schema;
}

/** Dispatcher — returns the right schema for a row's category. */
export function singleLuxuryJsonLd(row: LuxuryRow, pageUrl: string): SchemaObject {
  if (row.category === "stay") return singleLuxuryLodgingJsonLd(row, pageUrl);
  return singleLuxuryTouristTripJsonLd(row, pageUrl);
}

/** ItemList for the /luxury hub. */
export function luxuryItemListJsonLd(rows: LuxuryRow[], pageUrl: string, locale: string): SchemaObject {
  const items = rows.map((r, i) => ({
    "@type": "ListItem",
    position: i + 1,
    url: `${BASE}/${locale}/luxury/${r.id}`,
    name: r.name,
  }));
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${pageUrl}#luxury-list`,
    name: "Ultra-luxury India trips",
    numberOfItems: items.length,
    itemListOrder: "https://schema.org/ItemListUnordered",
    isPartOf: { "@id": WEBSITE_ID },
    itemListElement: items,
  };
}
