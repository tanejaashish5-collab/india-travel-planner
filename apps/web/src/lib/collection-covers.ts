// Collections without their own COLLECTION_*.jpg cover — map to a representative
// image (destination OR other collection) instead. Keeps grids resilient when
// cover art hasn't been produced yet. Add entries as new collections ship
// without covers; remove them once a real COLLECTION_<id>.jpg is added.
//
// NOTE: fallback takes precedence over DB cover_image_url, because some DB
// rows reference files that don't exist on disk (e.g. odisha-turtle-trail).
export const COVER_FALLBACK: Record<string, string> = {
  "andaman-diving-snorkeling": "/images/destinations/havelock-island.jpg",
  "andaman-island-hopping": "/images/destinations/havelock-island.jpg",
  "andaman-offbeat-islands": "/images/destinations/long-island-andaman.jpg",
  "lakshadweep-coral-paradise": "/images/destinations/bangaram.jpg",
  "french-india-trail": "/images/destinations/puducherry.jpg",
  "portuguese-india-trail": "/images/destinations/old-goa.jpg",
};

export function resolveCover(c: { id: string; cover_image_url?: string | null }): string {
  // Hardcoded fallback wins over DB — DB may point to a file that doesn't exist on disk.
  if (COVER_FALLBACK[c.id]) return COVER_FALLBACK[c.id];
  if (c.cover_image_url && typeof c.cover_image_url === "string" && c.cover_image_url.startsWith("/images/")) {
    return c.cover_image_url;
  }
  return `/images/collections/COLLECTION_${c.id}.jpg`;
}
