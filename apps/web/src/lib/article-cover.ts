import knownSlugsData from "../../data/known-destination-slugs.json";

const KNOWN = new Set<string>((knownSlugsData as { slugs: string[] }).slugs);

/**
 * Card image for an article. An explicit /images/ cover wins; otherwise the
 * first linked destination, then the first tag that IS a destination slug.
 * Tags alone were used before and a post tagged ["guide", ...] rendered a
 * broken destinations/guide.webp (Vaishno Devi distance post, 2026-10-04).
 */
export function articleCoverSrc(a: {
  cover_image_url: string | null;
  destinations?: string[] | null;
  tags?: string[] | null;
}): string | null {
  if (a.cover_image_url && a.cover_image_url.startsWith("/images/")) {
    return a.cover_image_url;
  }
  const candidates = [...(a.destinations ?? []), ...(a.tags ?? [])].map((t) =>
    t.toLowerCase().replace(/\s+/g, "-"),
  );
  const slug = candidates.find((s) => KNOWN.has(s));
  return slug ? `/images/destinations/${slug}.jpg` : null;
}
