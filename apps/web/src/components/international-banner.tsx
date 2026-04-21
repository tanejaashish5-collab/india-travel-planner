"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { m as motion, AnimatePresence } from "framer-motion";

const SESSION_KEY = "nakshiq-intl-banner-dismissed";

function isLikelyInternational(): boolean {
  try {
    const offset = new Date().getTimezoneOffset();
    if (offset === -330) return false;
    const lang = navigator.language?.toLowerCase() ?? "";
    const indianLangs = ["hi", "bn", "ta", "te", "mr", "gu", "kn", "ml", "pa", "or", "as", "ur"];
    if (indianLangs.some((l) => lang.startsWith(l))) return false;
    if (lang === "en-in") return false;
    return true;
  } catch {
    return false;
  }
}

export function InternationalBanner() {
  const locale = useLocale();
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  // Hide on the india-travel page itself
  const isOnTargetPage = pathname.includes("/india-travel");

  useEffect(() => {
    if (isOnTargetPage) return;
    // Session-based: use sessionStorage so it resets on new tab/session
    if (sessionStorage.getItem(SESSION_KEY)) return;
    if (!isLikelyInternational()) return;
    const timer = setTimeout(() => setVisible(true), 1500);
    return () => clearTimeout(timer);
  }, [isOnTargetPage]);

  function dismiss() {
    setVisible(false);
    sessionStorage.setItem(SESSION_KEY, "1");
  }

  function handleStartHere() {
    // Dismiss for this session before navigating
    sessionStorage.setItem(SESSION_KEY, "1");
  }

  if (isOnTargetPage) return null;

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
                onClick={handleStartHere}
                className="rounded-md bg-blue-500/20 border border-blue-500/30 px-3 py-1 text-xs font-medium text-blue-400 hover:bg-blue-500/30 transition-colors whitespace-nowrap"
              >
                {t("startHere")}
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
