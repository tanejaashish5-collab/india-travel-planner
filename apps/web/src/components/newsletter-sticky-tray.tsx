"use client";

import { useState, useEffect } from "react";
import { useLocale } from "next-intl";
import Link from "next/link";

const DISMISS_KEY = "window-tray-dismissed";
const DISMISS_DAYS = 14;

// SSR-safe initial-dismissed compute. Returns true (= hidden) when:
//   - localStorage DISMISS_KEY timestamp is still within DISMISS_DAYS
//   - sessionStorage nq_alert_submitted set (peak-alert hook succeeded this session)
//   - sessionStorage nq_newsletter_submitted set (an inline newsletter form
//     succeeded this session — never ask the same reader twice)
//   - nakshiq_savelist_subscribed cookie set (save-list prompt already converted)
function computeInitialDismissed(): boolean {
  if (typeof window === "undefined") return true;
  try {
    const raw = localStorage.getItem(DISMISS_KEY);
    if (raw) {
      const ts = parseInt(raw, 10);
      if (Date.now() - ts < DISMISS_DAYS * 24 * 60 * 60 * 1000) return true;
    }
  } catch { /* localStorage unavailable */ }
  try {
    const ss = window.sessionStorage;
    if (ss?.getItem("nq_alert_submitted")) return true;
    if (ss?.getItem("nq_newsletter_submitted")) return true;
  } catch { /* ignore */ }
  try {
    if (typeof document !== "undefined" && /(?:^|; )nakshiq_savelist_subscribed=1(?:;|$)/.test(document.cookie)) return true;
  } catch { /* ignore */ }
  return false;
}

export function NewsletterStickyTray() {
  const [visible, setVisible] = useState(false);
  // Lazy init — reads localStorage/cookie ONCE on first render. SSR-safe.
  // Default is computed (not `true`) so we don't trigger setState-in-effect.
  const [dismissed, setDismissed] = useState<boolean>(() => computeInitialDismissed());
  const locale = useLocale();

  useEffect(() => {
    if (dismissed) return;

    let ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const scrolled = window.scrollY;
        const height = document.documentElement.scrollHeight - window.innerHeight;
        const ratio = height > 0 ? scrolled / height : 0;
        setVisible(ratio > 0.4);
        ticking = false;
      });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [dismissed]);

  function dismiss() {
    try {
      localStorage.setItem(DISMISS_KEY, String(Date.now()));
    } catch {
      // ignore
    }
    setDismissed(true);
  }

  if (dismissed || !visible) return null;

  return (
    <div
      // Mobile: full-width card pinned above the floating Ask NakshIQ bubble
      // (bottom-20 clears it). Desktop: bottom-right card, also clearing the
      // bubble at bottom-6/right-6 (BUG-020). Slides in once the reader is
      // ~40% down the page — the evidence-led "while reading" prompt.
      className={
        "fixed z-40 rounded-2xl border border-primary/30 bg-card/95 backdrop-blur-xl " +
        "shadow-2xl shadow-black/40 p-4 pr-10 " +
        "bottom-20 left-4 right-4 md:bottom-24 md:left-auto md:right-6 md:max-w-sm " +
        "animate-in fade-in slide-in-from-bottom-3 duration-500 ease-out motion-reduce:animate-none"
      }
      role="complementary"
      aria-label="Newsletter signup"
    >
      <button
        type="button"
        aria-label="Dismiss"
        onClick={dismiss}
        className="absolute top-2 right-2 p-1.5 text-muted-foreground hover:text-foreground transition-colors rounded-md"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 6 6 18M6 6l12 12" />
        </svg>
      </button>
      <p className="text-[11px] font-semibold tracking-[0.08em] uppercase text-primary">
        The Window · Sundays
      </p>
      <h3 className="mt-1 text-sm font-bold leading-tight">
        One score. One skip. Four minutes.
      </h3>
      <p className="mt-1 text-xs text-muted-foreground leading-snug">
        One short email, every Sunday. Free.
      </p>
      <Link
        href={`/${locale}/newsletter?src=sticky-tray`}
        onClick={dismiss}
        className="group mt-3 inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
      >
        Subscribe
        <span
          aria-hidden
          className="transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none"
        >
          →
        </span>
      </Link>
    </div>
  );
}
