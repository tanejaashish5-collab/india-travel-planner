import type { Locale, Translations } from "./types/destination";

/**
 * Resolve a translated field with English fallback.
 * Zero API cost — reads from pre-baked JSONB translations column.
 *
 * Usage:
 *   t(destination.translations, locale, "tagline", destination.tagline)
 *   // Returns Hindi tagline if locale="hi" and translation exists,
 *   // otherwise returns the English original.
 */
export function t<T>(
  translations: Translations<T> | undefined | null,
  locale: Locale,
  field: keyof T,
  fallback: string,
): string {
  if (locale === "en" || !translations) return fallback;
  const localeData = translations[locale];
  if (!localeData) return fallback;
  const translated = localeData[field];
  return typeof translated === "string" && (translated as string).length > 0
    ? (translated as string)
    : fallback;
}

/** All supported locales */
export const LOCALES: Locale[] = ["en", "hi"];

/** Default locale */
export const DEFAULT_LOCALE: Locale = "en";

/** Locale display names (in their own language) */
export const LOCALE_NAMES: Record<Locale, string> = {
  en: "English",
  hi: "हिन्दी",
};
