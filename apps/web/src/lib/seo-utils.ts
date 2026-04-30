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
        // x-default points search engines at the language-agnostic version
        // when the user's locale doesn't match en or hi. Convention is to
        // point this at the default (English) variant.
        "x-default": `${BASE}/en${p}`,
      },
    },
  };
}
