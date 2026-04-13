"use client";

import { useLocale } from "next-intl";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const DISMISSED_KEY = "nakshiq-intl-banner-dismissed";

/**
 * Smart banner for international visitors.
 * Shows only when:
 *  1. Browser language is NOT Hindi/Indian regional
 *  2. Timezone is NOT IST (UTC+5:30)
 *  3. User hasn't dismissed it before (localStorage)
 */
function isLikelyInternational(): boolean {
  try {
    // Check timezone — IST is UTC+5:30 = offset -330
    const offset = new Date().getTimezoneOffset();
    if (offset === -330) return false;

    // Check browser language
    const lang = navigator.language?.toLowerCase() ?? "";
    const indianLangs = ["hi", "bn", "ta", "te", "mr", "gu", "kn", "ml", "pa", "or", "as", "ur"];
    if (indianLangs.some((l) => lang.startsWith(l))) return false;
    // en-IN is Indian English
    if (lang === "en-in") return false;

    return true;
  } catch {
    return false;
  }
}

export function InternationalBanner() {
  const locale = useLocale();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Don't show if already dismissed
    if (localStorage.getItem(DISMISSED_KEY)) return;
    // Don't show if likely Indian
    if (!isLikelyInternational()) return;
    // Small delay so it doesn't flash on load
    const timer = setTimeout(() => setVisible(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  function dismiss() {
    setVisible(false);
    localStorage.setItem(DISMISSED_KEY, "1");
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }}
          className="overflow-hidden border-b border-blue-500/20 bg-blue-500/5"
        >
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2.5">
            <div className="flex items-center gap-3 min-w-0">
              <span className="text-blue-400 shrink-0">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                  <path d="M2 12h20" />
                </svg>
              </span>
              <p className="text-sm text-muted-foreground truncate">
                <span className="font-medium text-foreground">First time visiting India?</span>
                {" "}Safety, scams, what to wear, and more — the honest guide by an Indian family.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <a
                href={`/${locale}/india-travel`}
                className="rounded-md bg-blue-500/20 border border-blue-500/30 px-3 py-1 text-xs font-medium text-blue-400 hover:bg-blue-500/30 transition-colors whitespace-nowrap"
              >
                Start here
              </a>
              <button
                onClick={dismiss}
                className="rounded-md p-1 text-muted-foreground/50 hover:text-muted-foreground hover:bg-muted/50 transition-colors"
                aria-label="Dismiss"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6 6 18" /><path d="m6 6 12 12" />
                </svg>
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
