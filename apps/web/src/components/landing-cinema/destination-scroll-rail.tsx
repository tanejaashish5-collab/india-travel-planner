"use client";

import { useEffect, useState } from "react";

/* ============================================================
   Destination scroll-rail — 11 ticks, one per cinematic act on
   the destination template. Same visual contract as the landing
   ScrollRail (vermillion active tick, fixed right edge) but with
   a destination-specific act list.
   ============================================================ */

const ACTS = [
  { id: "dest-act-1", label: "I" },
  { id: "dest-act-2", label: "II" },
  { id: "dest-act-3", label: "III" },
  { id: "dest-act-4", label: "IV" },
  { id: "dest-act-5", label: "V" },
  { id: "dest-act-6", label: "VI" },
  { id: "dest-act-7", label: "VII" },
  { id: "dest-act-8", label: "VIII" },
  { id: "dest-act-9", label: "IX" },
  { id: "dest-act-10", label: "X" },
  { id: "dest-act-11", label: "XI" },
] as const;

export function DestinationScrollRail() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const targets = ACTS.map((a) => document.getElementById(a.id)).filter(
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
            const idx = ACTS.findIndex((a) => a.id === entry.target.id);
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
