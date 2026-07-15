"use client";

import { useEffect, useState } from "react";

/* ============================================================
   Scroll-progress rail — 1px vertical line on the right edge with 9
   ticks (one per ACT). The active tick lights up vermillion as you
   scroll. Pure read-only; clicks scroll to the matching section.
   ============================================================ */

const ACTS = [
  { id: "act-1", label: "I" },
  { id: "act-2", label: "II" },
  { id: "act-3", label: "III" },
  { id: "act-4", label: "IV" },
  { id: "act-5", label: "V" },
  { id: "act-6", label: "VI" },
  { id: "act-7", label: "VII" },
  { id: "act-8", label: "VIII" },
  { id: "act-9", label: "IX" },
] as const;

export function ScrollRail() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const targets = ACTS.map((a) => document.getElementById(a.id)).filter(
      (el): el is HTMLElement => !!el,
    );
    if (!targets.length) return;
    const obs = new IntersectionObserver(
      (entries) => {
        // Pick the section with the most intersection ratio currently in view.
        let bestIdx = active;
        let bestRatio = 0;
        for (const entry of entries) {
          if (entry.isIntersecting && entry.intersectionRatio > bestRatio) {
            bestRatio = entry.intersectionRatio;
            const idx = ACTS.findIndex((a) => a.id === entry.target.id);
            if (idx >= 0) bestIdx = idx;
          }
        }
        setActive(bestIdx);
      },
      // Track which section is closest to the centre of the viewport.
      { threshold: [0.05, 0.25, 0.5, 0.75], rootMargin: "-30% 0px -30% 0px" },
    );
    targets.forEach((t) => obs.observe(t));
    return () => obs.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      aria-hidden
      style={{
        position: "fixed",
        top: "50%",
        right: 18,
        transform: "translateY(-50%)",
        zIndex: 30,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 12,
        pointerEvents: "auto",
      }}
    >
      {ACTS.map((a, i) => {
        const isActive = i === active;
        return (
          <a
            key={a.id}
            href={`#${a.id}`}
            title={`ACT ${a.label}`}
            tabIndex={-1}
            style={{
              display: "block",
              width: 1,
              height: isActive ? 22 : 12,
              background: isActive ? "var(--vermillion)" : "rgba(245,241,232,0.32)",
              transition: "all 0.4s cubic-bezier(.25,.46,.45,.94)",
              textDecoration: "none",
            }}
          />
        );
      })}
    </div>
  );
}
