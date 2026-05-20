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

/**
 * Resolve every translatable field on a DB row, returning a localized
 * shallow copy. For locale "en" or rows without translations, returns the
 * row unchanged. Handles string fields and equal-length string[] fields;
 * any field missing/empty in the target locale keeps its English value.
 *
 * Zero API cost — reads from the pre-baked `translations` JSONB column.
 *
 * Usage:
 *   localizeRow(eatery, locale, ["signature_dish", "why_it_matters", "insider_tip"])
 */
export function localizeRow<T extends { translations?: Translations<unknown> | null }>(
  row: T,
  locale: Locale,
  fields: readonly string[],
): T {
  if (locale === "en" || !row?.translations) return row;
  const localeData = row.translations[locale] as Record<string, unknown> | undefined;
  if (!localeData) return row;
  const out = { ...row } as Record<string, unknown>;
  for (const f of fields) {
    const tr = localeData[f];
    const en = (row as Record<string, unknown>)[f];
    if (Array.isArray(en)) {
      if (
        Array.isArray(tr) &&
        tr.length === en.length &&
        tr.every((x) => typeof x === "string" && (x as string).length > 0)
      ) {
        out[f] = tr;
      }
    } else if (typeof tr === "string" && tr.length > 0) {
      out[f] = tr;
    }
  }
  return out as T;
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
