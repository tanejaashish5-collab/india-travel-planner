"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import type { Locale } from "@itp/shared";

const LOCALE_LABELS: Record<string, string> = {
  en: "EN",
  hi: "हि",
};

export function LanguageToggle() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function switchLocale() {
    const next: Locale = locale === "en" ? "hi" : "en";
    // Replace the locale segment in the pathname
    const segments = pathname.split("/");
    segments[1] = next;
    router.replace(segments.join("/"));
  }

  const otherLocale = locale === "en" ? "hi" : "en";

  return (
    <button
      onClick={switchLocale}
      className="flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-sm font-medium transition-colors hover:bg-accent"
      aria-label={`Switch to ${otherLocale === "hi" ? "Hindi" : "English"}`}
    >
      <span className="text-muted-foreground">{LOCALE_LABELS[locale]}</span>
      <span className="text-muted-foreground">/</span>
      <span>{LOCALE_LABELS[otherLocale]}</span>
    </button>
  );
}
