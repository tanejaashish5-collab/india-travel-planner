"use client";

import { useEffect } from "react";
import { KEY_EVENTS, track } from "@/lib/analytics";

/**
 * Fires once per page-view when the user scrolls past 75% of the page.
 * Use on long-form pages (destination, destination/[month]) to measure how
 * many sessions actually consume the content vs bounce after the hero.
 *
 * Throttled via passive listener; auto-detaches after firing.
 */
export function ScrollDepthTracker({
  page,
  destinationId,
  month,
}: {
  page: "destination" | "destination_month" | "where_to_go" | "blog" | "guide";
  destinationId?: string;
  month?: string;
}) {
  useEffect(() => {
    let fired = false;
    function onScroll() {
      if (fired) return;
      const doc = document.documentElement;
      const total = doc.scrollHeight - doc.clientHeight;
      if (total <= 0) return;
      const pct = (window.scrollY / total) * 100;
      if (pct >= 75) {
        fired = true;
        track(KEY_EVENTS.SCROLL_75_DESTINATION, {
          page,
          destination: destinationId ?? "",
          month: month ?? "",
        });
        window.removeEventListener("scroll", onScroll);
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [page, destinationId, month]);

  return null;
}
