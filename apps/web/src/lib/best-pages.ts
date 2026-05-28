/**
 * Slug allowlist + config for /best/[slug] decision-query pages.
 *
 * Two URL shapes:
 *   1. month × persona — "/best/october-with-kids-in-india", 12 months × 5 personas = 60
 *   2. season-agnostic persona — "/best/places-for-couples-in-india" etc., 5 entries
 *
 * Total: 65 slugs × 2 locales = 130 sitemap entries.
 *
 * Validation gate: data/strategy/decision-query-slot-validation.md (2026-05-28).
 * The persona+month bucket scored YELLOW (winnable); n-days/weekend/state-offbeat
 * were RED and explicitly DROPPED. Anything added here must match a YELLOW/GREEN
 * SERP slot from the validation report.
 *
 * Persona slugs here are SEO-keyword-shaped (e.g. "with-kids"). They map to
 * existing PersonaSlug values from @/lib/personas via PERSONA_MAPPING — we reuse
 * the matching logic and the persona_blocks / best_for_segments tiering rather
 * than maintaining a parallel taxonomy.
 */

import type { PersonaSlug } from "@/lib/personas";

export type BestPersonaKey =
  | "with-kids"
  | "honeymoon"
  | "with-parents"
  | "for-couples"
  | "solo-travel";

export const BEST_PERSONA_ORDER: BestPersonaKey[] = [
  "with-kids",
  "honeymoon",
  "with-parents",
  "for-couples",
  "solo-travel",
];

export const PERSONA_MAPPING: Record<BestPersonaKey, PersonaSlug> = {
  "with-kids": "families",
  "honeymoon": "honeymooners",
  "with-parents": "nri-parents-visit",
  "for-couples": "honeymooners",
  "solo-travel": "solo-female",
};

export const PERSONA_COPY: Record<
  BestPersonaKey,
  {
    label: string;
    labelHindi: string;
    nounPhrase: string;
    nounPhraseHindi: string;
    catchHeadline: string;
    catchHeadlineHindi: string;
  }
> = {
  "with-kids": {
    label: "with kids",
    labelHindi: "बच्चों के साथ",
    nounPhrase: "a trip with kids",
    nounPhraseHindi: "बच्चों के साथ यात्रा",
    catchHeadline: "Where to go in India in {month} with kids",
    catchHeadlineHindi: "{month} में बच्चों के साथ भारत में कहाँ जाएँ",
  },
  honeymoon: {
    label: "honeymoon",
    labelHindi: "हनीमून",
    nounPhrase: "a honeymoon",
    nounPhraseHindi: "हनीमून",
    catchHeadline: "Where to honeymoon in India in {month}",
    catchHeadlineHindi: "{month} में भारत में हनीमून के लिए कहाँ जाएँ",
  },
  "with-parents": {
    label: "with parents",
    labelHindi: "माता-पिता के साथ",
    nounPhrase: "a trip with parents",
    nounPhraseHindi: "माता-पिता के साथ यात्रा",
    catchHeadline: "Where to take parents in India in {month}",
    catchHeadlineHindi: "{month} में माता-पिता को भारत में कहाँ ले जाएँ",
  },
  "for-couples": {
    label: "for couples",
    labelHindi: "जोड़ों के लिए",
    nounPhrase: "a couples trip",
    nounPhraseHindi: "जोड़ों की यात्रा",
    catchHeadline: "Where to go in India in {month} as a couple",
    catchHeadlineHindi: "{month} में जोड़े के रूप में भारत में कहाँ जाएँ",
  },
  "solo-travel": {
    label: "solo travel",
    labelHindi: "एकल यात्रा",
    nounPhrase: "solo travel",
    nounPhraseHindi: "एकल यात्रा",
    catchHeadline: "Where to solo travel in India in {month}",
    catchHeadlineHindi: "{month} में भारत में एकल यात्रा के लिए कहाँ जाएँ",
  },
};

export const MONTH_SLUGS = [
  "january", "february", "march", "april", "may", "june",
  "july", "august", "september", "october", "november", "december",
] as const;

export type MonthSlug = (typeof MONTH_SLUGS)[number];

export const MONTH_DISPLAY: Record<MonthSlug, { en: string; hi: string; num: number }> = {
  january: { en: "January", hi: "जनवरी", num: 1 },
  february: { en: "February", hi: "फ़रवरी", num: 2 },
  march: { en: "March", hi: "मार्च", num: 3 },
  april: { en: "April", hi: "अप्रैल", num: 4 },
  may: { en: "May", hi: "मई", num: 5 },
  june: { en: "June", hi: "जून", num: 6 },
  july: { en: "July", hi: "जुलाई", num: 7 },
  august: { en: "August", hi: "अगस्त", num: 8 },
  september: { en: "September", hi: "सितंबर", num: 9 },
  october: { en: "October", hi: "अक्टूबर", num: 10 },
  november: { en: "November", hi: "नवंबर", num: 11 },
  december: { en: "December", hi: "दिसंबर", num: 12 },
};

// Season-agnostic persona pages. SEO-keyword-shaped slugs targeting the
// season-agnostic decision queries from the validation report.
export type EvergreenSlug =
  | "places-for-couples-in-india"
  | "family-friendly-destinations-india"
  | "honeymoon-destinations-india"
  | "solo-female-friendly-india"
  | "places-to-visit-with-parents-in-india";

export const EVERGREEN_SLUGS: EvergreenSlug[] = [
  "places-for-couples-in-india",
  "family-friendly-destinations-india",
  "honeymoon-destinations-india",
  "solo-female-friendly-india",
  "places-to-visit-with-parents-in-india",
];

export const EVERGREEN_CONFIG: Record<
  EvergreenSlug,
  {
    persona: BestPersonaKey;
    title: string;
    titleHindi: string;
    hookEn: string;
    hookHi: string;
  }
> = {
  "places-for-couples-in-india": {
    persona: "for-couples",
    title: "Where couples actually go in India — verdicts, not listicles",
    titleHindi: "जोड़ों के लिए भारत में सही जगहें — सूची नहीं, सत्यापित विकल्प",
    hookEn: "Quora has the questions; here are the answers built from the same data we score every destination on.",
    hookHi: "कोरा पर सवाल हैं; यहाँ वे जवाब हैं जो हमारे सत्यापित स्कोर पर आधारित हैं।",
  },
  "family-friendly-destinations-india": {
    persona: "with-kids",
    title: "Family-friendly destinations in India — under 2,500m, real medical access",
    titleHindi: "बच्चों वाले परिवारों के लिए भारत — 2500 मीटर से कम ऊँचाई, सही चिकित्सा सुविधा",
    hookEn: "Filtered by altitude, road safety, and the practical reality of travelling with children — not by stock-photo charm.",
    hookHi: "ऊँचाई, सड़क सुरक्षा, और बच्चों के साथ यात्रा की असली ज़रूरतों के आधार पर — ब्रोशर की चमक नहीं।",
  },
  "honeymoon-destinations-india": {
    persona: "honeymoon",
    title: "Honeymoon destinations in India — private, not just photogenic",
    titleHindi: "भारत में हनीमून स्थल — गोपनीयता, सिर्फ़ तस्वीरें नहीं",
    hookEn: "Andaman, Udaipur, Kerala backwaters, Munnar, Pondicherry — the picks where privacy meets a real reason to be there.",
    hookHi: "अंडमान, उदयपुर, केरल, मुन्नार, पुदुच्चेरी — जहाँ गोपनीयता और असली अनुभव दोनों मिलते हैं।",
  },
  "solo-female-friendly-india": {
    persona: "solo-travel",
    title: "Solo female friendly India — destinations with 4/5+ safety scores",
    titleHindi: "एकल महिला यात्रियों के लिए सुरक्षित भारत — 4/5 या उससे ऊपर के स्कोर",
    hookEn: "Sikkim, Kerala, Himachal hubs, Meghalaya, Puducherry lead. Month-by-month overrides apply.",
    hookHi: "सिक्किम, केरल, हिमाचल केंद्र, मेघालय, पुदुच्चेरी अग्रणी। महीने-दर-महीने अद्यतन के साथ।",
  },
  "places-to-visit-with-parents-in-india": {
    persona: "with-parents",
    title: "Where to take parents in India — low altitude, hospital in range",
    titleHindi: "माता-पिता को भारत में कहाँ ले जाएँ — कम ऊँचाई, अस्पताल पास",
    hookEn: "For diaspora and resident families planning the multi-generation trip — verified routes, easy access.",
    hookHi: "डायस्पोरा और भारत में रहने वाले परिवारों के लिए — सत्यापित मार्ग, सरल पहुँच।",
  },
};

export type BestSlugParse =
  | { kind: "month-persona"; month: MonthSlug; persona: BestPersonaKey }
  | { kind: "evergreen"; slug: EvergreenSlug };

const PERSONA_SUFFIXES: ReadonlyArray<{ suffix: string; key: BestPersonaKey }> = [
  { suffix: "-with-kids-in-india", key: "with-kids" },
  { suffix: "-honeymoon-in-india", key: "honeymoon" },
  { suffix: "-with-parents-in-india", key: "with-parents" },
  { suffix: "-for-couples-in-india", key: "for-couples" },
  { suffix: "-solo-travel-in-india", key: "solo-travel" },
];

export function parseBestSlug(slug: string): BestSlugParse | null {
  if ((EVERGREEN_SLUGS as ReadonlyArray<string>).includes(slug)) {
    return { kind: "evergreen", slug: slug as EvergreenSlug };
  }
  for (const { suffix, key } of PERSONA_SUFFIXES) {
    if (slug.endsWith(suffix)) {
      const monthPart = slug.slice(0, -suffix.length);
      if ((MONTH_SLUGS as ReadonlyArray<string>).includes(monthPart)) {
        return { kind: "month-persona", month: monthPart as MonthSlug, persona: key };
      }
    }
  }
  return null;
}

export function buildMonthPersonaSlug(month: MonthSlug, persona: BestPersonaKey): string {
  const suffix = PERSONA_SUFFIXES.find((p) => p.key === persona)?.suffix;
  if (!suffix) throw new Error(`Unknown persona: ${persona}`);
  return `${month}${suffix}`;
}

export function allBestSlugs(): string[] {
  const monthPersona = MONTH_SLUGS.flatMap((m) =>
    BEST_PERSONA_ORDER.map((p) => buildMonthPersonaSlug(m, p)),
  );
  return [...monthPersona, ...EVERGREEN_SLUGS];
}
