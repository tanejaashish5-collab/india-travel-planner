// Absolute image URL helper — for places Next/Image doesn't handle
// (video posters, JSON-LD image fields, OG meta tags, email templates, etc).
//
// <Image src="/images/destinations/konark.jpg"> uses the custom loader
// in image-loader.ts — don't call this for that case.
//
// Variant widths must match scripts/upload-images.mjs (400/800/1200/1600).

const SITE = "https://www.nakshiq.com";
const R2 = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;
const VARIANT_WIDTHS = [400, 800, 1200, 1600] as const;

function pickVariant(width: number): number {
  for (const w of VARIANT_WIDTHS) if (width <= w) return w;
  return VARIANT_WIDTHS[VARIANT_WIDTHS.length - 1];
}

/**
 * Takes `/images/destinations/x.jpg` or `destinations/x.jpg` and returns a
 * fully-qualified URL on the R2 CDN. With `width`, returns the pre-generated
 * WebP variant ≥ width (e.g. `destinations/x-w1200.webp`); without, returns
 * the original JPEG (use this for OG/JSON-LD where WebP support is unsafe).
 */
export function imageUrl(path: string, width?: number): string {
  if (/^https?:\/\//i.test(path)) return path;
  const normalized = path.replace(/^\/+/, "").replace(/^images\//, "");
  const cdn = R2 ? R2.replace(/\/+$/, "") : `${SITE}/images`;

  if (width) {
    const m = normalized.match(/^(.+)\.(jpe?g|png)$/i);
    if (m) {
      const variantW = pickVariant(width);
      return `${cdn}/${m[1]}-w${variantW}.webp`;
    }
  }
  return `${cdn}/${normalized}`;
}

export function destinationImage(id: string, width?: number): string {
  return imageUrl(`destinations/${id}.jpg`, width);
}

export function collectionCover(id: string, width?: number): string {
  return imageUrl(`collections/COLLECTION_${id}.jpg`, width);
}
