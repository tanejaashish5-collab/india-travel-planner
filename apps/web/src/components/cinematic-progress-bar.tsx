"use client";

import { useEffect, useState } from "react";

// Magazine longform reading-progress bar — 1.5px coral line glued to the
// top edge of the viewport, fills L→R as the reader scrolls. Uses a
// throttled requestAnimationFrame loop instead of a scroll-driven CSS
// animation because Safari + iOS still don't support `animation-timeline:
// scroll()` outside Tech Preview (2026-05).
//
// Renders nothing for the first 100vh — a coral line under the cover
// looks like a dashboard bar, not an editorial signal.
export function CinematicProgressBar({ tint = "var(--vermillion)" }: { tint?: string }) {
  const [pct, setPct] = useState(0);
  const [show, setShow] = useState(false);

  useEffect(() => {
    let frame = 0;
    function tick() {
      frame = 0;
      const max =
        document.documentElement.scrollHeight - window.innerHeight;
      const ratio = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      setPct(ratio * 100);
      // Suppress on cover (first viewport) — bar appears once the reader
      // commits to the article. Hide on the absolute bottom so it doesn't
      // sit at 100% on the Coda.
      setShow(window.scrollY > window.innerHeight * 0.5 && ratio < 0.985);
    }
    function onScroll() {
      if (frame) return;
      frame = requestAnimationFrame(tick);
    }
    tick();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 1.5,
        zIndex: 50,
        background: "transparent",
        opacity: show ? 1 : 0,
        transition: "opacity 240ms ease",
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          height: "100%",
          width: `${pct}%`,
          background: tint,
          transformOrigin: "left",
          transition: "width 80ms linear",
        }}
      />
    </div>
  );
}
