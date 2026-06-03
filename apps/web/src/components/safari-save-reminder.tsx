"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { KEY_EVENTS, track } from "@/lib/analytics";
import { isSaved, toggleSaved } from "@/lib/saved-destinations";

// "Save this park" CTA on the safari guide. Reuses the existing saved-destinations
// localStorage store, which the /saved page turns into real peak-month email
// alerts (sync-saved-alerts → send-destination-alerts cron). The value exchange
// here is timing: safari quotas open 45-120 days ahead and sell out — saving the
// park is the owned-audience hook on a high-intent surface, honest because the
// reminder delivery is already wired.

export function SafariSaveReminder({
  destinationId,
  parkName,
  locale,
}: {
  destinationId: string;
  parkName: string;
  locale: string;
}) {
  const isHi = locale === "hi";
  const [saved, setSaved] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setSaved(isSaved(destinationId));
  }, [destinationId]);

  const onToggle = () => {
    const { isSaved: now } = toggleSaved(destinationId);
    setSaved(now);
    if (now) {
      track(KEY_EVENTS.SAVE_DESTINATION, {
        destination: destinationId,
        surface: "safari_guide",
      });
    }
  };

  const copy = isHi
    ? {
        idle: "इस पार्क को सेव करें",
        savedLabel: "सेव किया गया",
        hint: "बुकिंग 45–120 दिन पहले खुलती है और जल्दी भर जाती है।",
        savedHint: "बुकिंग खुलने से ~3 हफ़्ते पहले याद दिलाने के लिए ईमेल जोड़ें →",
        cta: "मेरी सेव सूची",
      }
    : {
        idle: "Save this park",
        savedLabel: "Saved",
        hint: "Booking opens 45–120 days ahead and sells out — save it so you don't miss the window.",
        savedHint: "Add your email to get a heads-up ~3 weeks before booking opens →",
        cta: "My saved list",
      };

  return (
    <div className="rounded-2xl border border-border bg-muted/30 p-5 sm:p-6">
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={onToggle}
          aria-pressed={saved}
          className={`inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-semibold transition-all ${
            saved
              ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-300"
              : "border-border hover:border-foreground/40 hover:bg-muted/50"
          }`}
        >
          <span aria-hidden="true">{saved ? "✓" : "☆"}</span>
          {saved ? copy.savedLabel : copy.idle}
        </button>
        <p className="min-w-0 flex-1 text-xs leading-relaxed text-muted-foreground sm:text-sm">
          {mounted && saved ? (
            <Link
              href={`/${locale}/saved`}
              className="underline underline-offset-2 hover:text-foreground"
            >
              {copy.savedHint}
            </Link>
          ) : (
            copy.hint
          )}
        </p>
      </div>
    </div>
  );
}
