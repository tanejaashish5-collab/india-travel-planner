// Collections without their own COLLECTION_*.jpg cover — map to a representative
// destination image instead. Keeps grids resilient when cover art hasn't been
// produced yet. Add entries as new collections ship without covers.
export const COVER_FALLBACK: Record<string, string> = {
  "andaman-diving-snorkeling": "/images/destinations/havelock-island.jpg",
  "andaman-island-hopping": "/images/destinations/havelock-island.jpg",
  "andaman-offbeat-islands": "/images/destinations/long-island-andaman.jpg",
  "lakshadweep-coral-paradise": "/images/destinations/bangaram.jpg",
  "french-india-trail": "/images/destinations/puducherry.jpg",
};

export function resolveCover(c: { id: string; cover_image_url?: string | null }): string {
  if (c.cover_image_url && typeof c.cover_image_url === "string" && c.cover_image_url.startsWith("/images/")) {
    return c.cover_image_url;
  }
  if (COVER_FALLBACK[c.id]) return COVER_FALLBACK[c.id];
  return `/images/collections/COLLECTION_${c.id}.jpg`;
}
