// Custom Next.js image loader — routes /images/* paths to the R2 CDN and
// rewrites the request to the smallest pre-generated WebP variant ≥ width.
//
// Variants are produced by scripts/upload-images.mjs at upload time at widths
// [400, 800, 1200, 1600] and stored as `<subdir>/<stem>-w<width>.webp`.
// Vercel's Image Optimization service is bypassed (free-tier quota was blown
// 2026-04-17), so cutting JPEG → resized WebP at the source is what we have.
//
// Paths that already point to an absolute URL pass through unchanged so
// external images (OG, Supabase avatars, etc) still work.

interface LoaderArgs {
  src: string;
  width: number;
  quality?: number;
}

const VARIANT_WIDTHS = [400, 800, 1200, 1600] as const;

function pickVariantWidth(requested: number): number {
  for (const w of VARIANT_WIDTHS) {
    if (requested <= w) return w;
  }
  return VARIANT_WIDTHS[VARIANT_WIDTHS.length - 1];
}

export default function r2Loader({ src, width }: LoaderArgs): string {
  if (/^https?:\/\//i.test(src)) return src;

  const base = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;
  if (!base) return src;

  const normalized = src.replace(/^\/+/, "").replace(/^images\//, "");
  const cdn = base.replace(/\/+$/, "");

  // Match raster files we generate variants for; everything else (svg, gif,
  // weird paths) falls through to the original key on R2.
  const m = normalized.match(/^(.+)\.(jpe?g|png)$/i);
  if (!m) return `${cdn}/${normalized}`;

  // Only assets under known variant-generating subdirectories (destinations/,
  // collections/, treks/, blog/, etc) have the -w400/-w800/-w1200/-w1600 webp
  // family on R2. Root-level files (icon-192.png, icon-512.png, og-image.jpg,
  // apple-touch-icon.png) have no width variants AND are not on R2 at all —
  // they ship in apps/web/public and are served from our own origin.
  //
  // This previously returned `${cdn}/${normalized}`, sending them to R2 where
  // all four 404 (verified 2026-08-13: R2 404 / local 200 for every one). The
  // visible casualty was the PWA install prompt, which renders
  // <Image src="/icon-192.png"> and so showed a broken icon on every phone.
  // Return the local path untouched — do not route root assets to the CDN.
  if (!/\//.test(normalized)) return src;

  const stem = m[1];
  const variantW = pickVariantWidth(width);
  return `${cdn}/${stem}-w${variantW}.webp`;
}
