"use client";

import { useEffect, useRef } from "react";

// Subtle hero parallax — the cover photo drifts down 3% slower than the
// scroll, so the snow line settles as the reader pulls down. NYT/Atlantic
// scroll-driven longform pattern. Keep the value small (3%) — anything
// more reads as "broken sticky", not editorial.
//
// Wraps an existing element; doesn't touch the Ken Burns CSS animation
// running on the inner <video>. We translateY a parent; the video's
// own scale/translate keyframes continue independently.
//
// Honours prefers-reduced-motion (renders as a static wrapper).
export function CinematicHeroParallax({
  strength = 0.03,
  children,
}: {
  strength?: number;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) return;

    let frame = 0;
    function tick() {
      frame = 0;
      // Only apply translation while the cover is in view — once the user
      // scrolls past the hero, freeze so we don't fight ACT II's layout.
      const y = window.scrollY;
      if (y > window.innerHeight * 1.2) return;
      const offset = y * strength;
      el!.style.transform = `translate3d(0, ${offset}px, 0)`;
    }
    function onScroll() {
      if (frame) return;
      frame = requestAnimationFrame(tick);
    }
    tick();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [strength]);

  return (
    <div
      ref={ref}
      className="nq-hero-parallax"
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        overflow: "hidden",
        transform: "translate3d(0, 0, 0)",
      }}
    >
      {children}
    </div>
  );
}
