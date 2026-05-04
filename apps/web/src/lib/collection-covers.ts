// Collections without their own COLLECTION_*.jpg cover — map to a representative
// image (destination OR other collection) instead. Keeps grids resilient when
// cover art hasn't been produced yet. Add entries as new collections ship
// without covers; remove them once a real COLLECTION_<id>.jpg is added.
//
// NOTE: fallback takes precedence over DB cover_image_url, because some DB
// rows reference files that don't exist on disk (e.g. odisha-turtle-trail).
//
// resolveCover() returns a SITE-RELATIVE path (e.g. "/images/collections/x.jpg").
// Pass to <Image src={...}> and the custom loader will rewrite to the WebP
// variant. For raw URL contexts (CSS background, og:image strings, API
// payloads) wrap with imageUrl(path, width) from ./image-url.
export const COVER_FALLBACK: Record<string, string> = {
  "andaman-diving-snorkeling": "/images/destinations/havelock-island.jpg",
  "andaman-island-hopping": "/images/destinations/havelock-island.jpg",
  "andaman-offbeat-islands": "/images/destinations/long-island-andaman.jpg",
  "lakshadweep-coral-paradise": "/images/destinations/bangaram.jpg",
  "french-india-trail": "/images/destinations/puducherry.jpg",
  "portuguese-india-trail": "/images/destinations/old-goa.jpg",
  // Mig 047 + 048 + 049 — 11 new pilgrimage / heritage circuits.
  // Each fallback points to the most representative dest in the collection
  // (or to an existing COLLECTION_*.jpg where one was already produced).
  "dwadasa-jyotirlinga": "/images/collections/COLLECTION_jyotirlinga-pilgrimage.jpg",
  "pancha-bhoota-stalams": "/images/destinations/chidambaram.jpg",
  "sapta-puris": "/images/destinations/varanasi.jpg",
  "original-char-dham": "/images/destinations/badrinath.jpg",
  "mahabharata-trail": "/images/destinations/kurukshetra.jpg",
  "major-shakti-peethas": "/images/destinations/guwahati.jpg",
  "caves-of-india": "/images/destinations/ajanta-caves.jpg",
  "iconic-train-journeys": "/images/destinations/darjeeling.jpg",
  "ramayana-trail": "/images/destinations/ayodhya.jpg",
  "christian-heritage-trail": "/images/destinations/old-goa.jpg",
  "astavinayak-yatra": "/images/destinations/bhimashankar.jpg",
};

export function resolveCover(c: { id: string; cover_image_url?: string | null }): string {
  if (COVER_FALLBACK[c.id]) return COVER_FALLBACK[c.id];
  if (c.cover_image_url && typeof c.cover_image_url === "string" && c.cover_image_url.startsWith("/images/")) {
    return c.cover_image_url;
  }
  return `/images/collections/COLLECTION_${c.id}.jpg`;
}
