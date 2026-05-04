"use client";

import { useEffect, useRef, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";

/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

/**
 * GA4 Route Change Tracker
 *
 * Next.js App Router does client-side navigation via React transitions,
 * which GA4's automatic history-based page_view detection doesn't catch.
 * This component listens for pathname changes and manually fires page_view
 * events so every navigation is tracked — not just the initial page load.
 *
 * Without this, GA4 reports 1.00 views/user and 0s engagement time because
 * it only sees the first page load.
 */
function RouteTrackerInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isFirstRender = useRef(true);

  useEffect(() => {
    // Skip the first render — the gtag('config', ...) call in the layout
    // already fires the initial page_view on full page load.
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    // Wait a tick for the document title to update after navigation
    const timer = setTimeout(() => {
      // Defensive: usePathname can briefly return null/empty during route
      // transitions. Fall back to "/" so we never fire page_view with an
      // empty page_path (the source of the F3 empty-landing bug).
      const safePath = pathname || "/";
      const url =
        safePath + (searchParams?.toString() ? `?${searchParams.toString()}` : "");

      if (typeof window.gtag === "function") {
        window.gtag("event", "page_view", {
          page_path: url,
          page_title: document.title,
          page_location: window.location.href,
        });
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [pathname, searchParams]);

  return null;
}

/** Wrap in Suspense — useSearchParams() requires it in App Router. */
export function GA4RouteTracker() {
  return (
    <Suspense fallback={null}>
      <RouteTrackerInner />
    </Suspense>
  );
}
