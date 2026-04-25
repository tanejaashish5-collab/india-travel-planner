// Sprint 21 — reusable FAQPage JSON-LD helper.
// Extracted from inline blocks in destination/[id]/[month]/page.tsx,
// guide/first-trip-india/page.tsx, guide/scenarios/[slug]/page.tsx.
// Used by new Q&A pages and the 8 practical guides.

export type FaqEntry = {
  question: string;
  answer: string;
};

export type FaqPageInput = {
  entries: FaqEntry[];
  // Canonical URL of the page hosting the FAQ. Used to namespace @id.
  url: string;
  // Optional: link FAQPage to parent WebSite/Article via @id.
  isPartOfId?: string;
  aboutId?: string;
};

export function faqPageJsonLd({ entries, url, isPartOfId, aboutId }: FaqPageInput) {
  if (!entries || entries.length === 0) return null;

  const ld: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${url}#faq`,
    mainEntity: entries.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: { "@type": "Answer", text: q.answer },
    })),
  };

  if (isPartOfId) ld.isPartOf = { "@id": isPartOfId };
  if (aboutId) ld.about = { "@id": aboutId };

  return ld;
}
