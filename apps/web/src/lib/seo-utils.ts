import type { Metadata } from "next";

const BASE = "https://www.nakshiq.com";

/**
 * Generate locale-aware canonical + hreflang alternates for any page.
 * Use in generateMetadata() for pages that need proper SEO.
 */
export function localeAlternates(locale: string, path: string): Pick<Metadata, "alternates"> {
  // Ensure path starts with /
  const p = path.startsWith("/") ? path : `/${path}`;
  return {
    alternates: {
      canonical: `${BASE}/${locale}${p}`,
      languages: {
        en: `${BASE}/en${p}`,
        hi: `${BASE}/hi${p}`,
      },
    },
  };
}
