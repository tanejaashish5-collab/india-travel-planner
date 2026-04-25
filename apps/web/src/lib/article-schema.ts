// Sprint 21 — Article JSON-LD helper for /guide/* pages.
// Mirrors the inline blocks in guide/first-trip-india (Article variant).

import type { AuthorRecord } from "@/components/author-byline";

export type ArticleInput = {
  url: string;
  headline: string;
  description: string;
  inLanguage: "en-IN" | "hi-IN";
  datePublished?: string;
  dateModified?: string;
  author?: AuthorRecord | null;
  imageUrl?: string;
};

export function articleJsonLd({
  url,
  headline,
  description,
  inLanguage,
  datePublished,
  dateModified,
  author,
  imageUrl,
}: ArticleInput) {
  const ld: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#article`,
    headline,
    description,
    inLanguage,
    isPartOf: { "@id": "https://www.nakshiq.com#website" },
    publisher: { "@id": "https://www.nakshiq.com#organization" },
    mainEntityOfPage: url,
  };

  if (datePublished) ld.datePublished = datePublished;
  if (dateModified) ld.dateModified = dateModified;
  if (imageUrl) ld.image = imageUrl;

  if (author) {
    ld.author = {
      "@type": "Person",
      "@id": `https://www.nakshiq.com/about/team#${author.slug}`,
      name: author.name,
      ...(author.same_as && author.same_as.length > 0 && { sameAs: author.same_as }),
    };
  } else {
    ld.author = { "@id": "https://www.nakshiq.com#organization" };
  }

  return ld;
}
