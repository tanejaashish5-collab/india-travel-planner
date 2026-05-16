"use client";

import { useEffect, useState } from "react";

// Slim left-rail current-act indicator — large vertical roman numeral
// pinned to the left edge so the reader always knows which chapter
// they're in. Companion to the existing right-rail DestinationScrollRail
// (which shows ALL acts as ticks). This one shows only the CURRENT.
//
// Hides on the cover (ACT I) and the Coda (ACT XI) so the cinematic
// bookends read clean.

const ACTS = [
  "dest-act-1",
  "dest-act-2",
  "dest-act-3",
  "dest-act-4",
  "dest-act-5",
  "dest-act-6",
  "dest-act-7",
  "dest-act-8",
  "dest-act-9",
  "dest-act-10",
  "dest-act-11",
] as const;

const ROMAN = [
  "I",
  "II",
  "III",
  "IV",
  "V",
  "VI",
  "VII",
  "VIII",
  "IX",
  "X",
  "XI",
] as const;

const HIDDEN_INDICES = new Set([0, 10]); // ACT I cover + ACT XI Coda

export function CinematicActIndicator() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const targets = ACTS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => !!el,
    );
    if (!targets.length) return;
    const obs = new IntersectionObserver(
      (entries) => {
        let bestIdx = active;
        let bestRatio = 0;
        for (const entry of entries) {
          if (entry.isIntersecting && entry.intersectionRatio > bestRatio) {
            bestRatio = entry.intersectionRatio;
            const idx = ACTS.indexOf(
              entry.target.id as (typeof ACTS)[number],
            );
            if (idx >= 0) bestIdx = idx;
          }
        }
        setActive(bestIdx);
      },
      { threshold: [0.05, 0.25, 0.5, 0.75], rootMargin: "-30% 0px -30% 0px" },
    );
    targets.forEach((t) => obs.observe(t));
    return () => obs.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const visible = !HIDDEN_INDICES.has(active);

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        top: "50%",
        left: 24,
        transform: "translateY(-50%)",
        zIndex: 28,
        pointerEvents: "none",
        opacity: visible ? 0.7 : 0,
        transition: "opacity 320ms ease",
        fontFamily: "var(--cinema-display, Georgia), serif",
        fontStyle: "italic",
        fontWeight: 300,
        fontSize: 56,
        lineHeight: 1,
        color: "var(--vermillion)",
        letterSpacing: "-0.02em",
        userSelect: "none",
        // hidden on narrow viewports — the large numeral cramps mobile layouts
        // and the right-rail tick indicator already gives mobile readers
        // ambient progress.
      }}
      className="nq-act-indicator"
    >
      {ROMAN[active]}
    </div>
  );
}
