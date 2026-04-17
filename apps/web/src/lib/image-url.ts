// Absolute image URL helper — for places Next/Image doesn't handle
// (video posters, JSON-LD image fields, OG meta tags, email templates, etc).
//
// <Image src="/images/destinations/konark.jpg"> uses the custom loader
// in image-loader.ts — don't call this for that case.

const SITE = "https://www.nakshiq.com";
const R2 = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;

/**
 * Takes `/images/destinations/x.jpg` or `destinations/x.jpg` and returns a
 * fully-qualified URL on the R2 CDN. Falls back to the site origin for dev.
 */
export function imageUrl(path: string): string {
  if (/^https?:\/\//i.test(path)) return path;
  const normalized = path.replace(/^\/+/, "").replace(/^images\//, "");
  if (R2) return `${R2.replace(/\/+$/, "")}/${normalized}`;
  // Dev / missing env → fall back to site-hosted path
  return `${SITE}/images/${normalized}`;
}

export function destinationImage(id: string): string {
  return imageUrl(`destinations/${id}.jpg`);
}

export function collectionCover(id: string): string {
  return imageUrl(`collections/COLLECTION_${id}.jpg`);
}
