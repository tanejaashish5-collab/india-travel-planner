// Custom Next.js image loader — routes /images/* paths to the R2 CDN.
//
// Bypasses Vercel's Image Optimization service (which 402'd on free-tier quota).
// Raw JPGs are served directly from R2 through Cloudflare's CDN (free egress).
//
// Paths that already point to an absolute URL (e.g. https://...) pass through
// unchanged so external images (OG images, Supabase avatars, etc) still work.

interface LoaderArgs {
  src: string;
  width: number;
  quality?: number;
}

export default function r2Loader({ src }: LoaderArgs): string {
  // Already absolute → pass through
  if (/^https?:\/\//i.test(src)) return src;

  const base = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;
  if (!base) {
    // Dev fallback: serve locally from public/ so dev works without R2 env set
    return src;
  }

  // Strip leading slash and `images/` prefix — our R2 bucket keys start with
  // `destinations/` or `collections/`, not `images/destinations/...`
  const normalized = src.replace(/^\/+/, "").replace(/^images\//, "");
  return `${base.replace(/\/+$/, "")}/${normalized}`;
}
