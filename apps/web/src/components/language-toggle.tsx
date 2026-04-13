"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";

type Locale = "en" | "hi";

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
      className="flex items-center gap-0.5 rounded-full border border-border text-sm font-medium transition-colors hover:bg-accent overflow-hidden"
      aria-label={`Switch to ${otherLocale === "hi" ? "Hindi" : "English"}`}
      aria-current={locale === "en" ? "true" : undefined}
    >
      <span className={`px-2.5 py-1.5 transition-colors ${locale === "en" ? "bg-foreground text-background font-semibold" : "text-muted-foreground"}`}>
        {LOCALE_LABELS.en}
      </span>
      <span className={`px-2.5 py-1.5 transition-colors ${locale === "hi" ? "bg-foreground text-background font-semibold" : "text-muted-foreground"}`}>
        {LOCALE_LABELS.hi}
      </span>
    </button>
  );
}
