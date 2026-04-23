"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useLocale } from "next-intl";
import { SCORE_COLORS } from "@/lib/design-tokens";

interface StickyDestinationHeaderProps {
  name: string;
  score: number | null;
  monthLabel: string;
  stateId: string;
}

export function StickyDestinationHeader({ name, score, monthLabel, stateId }: StickyDestinationHeaderProps) {
  const locale = useLocale();
  const [visible, setVisible] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Show sticky header when sentinel (placed at end of hero) goes out of view
        setVisible(!entry.isIntersecting);
      },
      { threshold: 0, rootMargin: "-64px 0px 0px 0px" }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Sentinel element — place this right after the hero section */}
      <div ref={sentinelRef} className="h-0 w-0" aria-hidden="true" />

      {/* Sticky header bar */}
      <div
        className={`fixed top-0 left-0 right-0 z-40 border-b border-border/50 bg-background/90 backdrop-blur-xl transition-all duration-300 md:hidden ${
          visible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex items-center justify-between px-4 py-2.5 max-w-7xl mx-auto">
          {/* Back arrow */}
          <Link
            href={`/${locale}/explore`}
            className="flex items-center justify-center rounded-lg p-1.5 text-muted-foreground hover:text-foreground transition-colors touch-target"
            aria-label="Back to explore"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5" />
              <path d="m12 19-7-7 7-7" />
            </svg>
          </Link>

          {/* Destination name (truncated) */}
          <span className="flex-1 truncate text-sm font-semibold text-foreground px-3 text-center">
            {name}
          </span>

          {/* Score badge */}
          {score !== null && (
            <div className={`rounded-lg px-2.5 py-1 text-center backdrop-blur-sm text-xs font-bold font-mono border ${SCORE_COLORS[score] ?? SCORE_COLORS[0]}`}>
              {score}/5 <span className="text-[10px] font-medium uppercase tracking-[0.08em] opacity-80">{monthLabel}</span>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
