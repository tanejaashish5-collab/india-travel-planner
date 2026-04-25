// Sprint 21 — HowTo JSON-LD helper for procedural /guide/* pages.
// Used by /guide/scams + /guide/transport-overview where content is
// step-by-step rather than narrative. Mirrors the inline block in
// guide/scenarios/[slug] but extracted for reuse.

export type HowToStep = {
  name: string;
  text: string;
};

export type HowToInput = {
  url: string;
  name: string;
  description: string;
  inLanguage: "en-IN" | "hi-IN";
  steps: HowToStep[];
  totalTime?: string;
  dateModified?: string;
};

export function howToJsonLd({
  url,
  name,
  description,
  inLanguage,
  steps,
  totalTime,
  dateModified,
}: HowToInput) {
  if (!steps || steps.length === 0) return null;

  const ld: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "@id": `${url}#howto`,
    name,
    description,
    url,
    inLanguage,
    isPartOf: { "@id": "https://www.nakshiq.com#website" },
    publisher: { "@id": "https://www.nakshiq.com#organization" },
    step: steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  };

  if (totalTime) ld.totalTime = totalTime;
  if (dateModified) ld.dateModified = dateModified;

  return ld;
}
