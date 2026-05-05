"use client";

import { useEffect, useRef, useState } from "react";

/**
 * One-shot in-view trigger.
 *
 * Fires `seen=true` the first time the element enters the viewport, then
 * disconnects the observer. Used by all cinema ACTs to gate fade-up animations
 * and scroll-driven sequences (Atlas pin drops, Dailies stagger reveal, etc.)
 * so they only run once and don't re-animate on every scroll.
 *
 * Mirrors the pattern in data/research/Landing Page/v8-final/core.jsx so behaviour
 * matches the design mocks 1:1.
 */
export function useInView<T extends HTMLElement>(opts: { threshold?: number; rootMargin?: string } = {}) {
  const ref = useRef<T | null>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true);
          obs.disconnect();
        }
      },
      { threshold: opts.threshold ?? 0.18, rootMargin: opts.rootMargin ?? "0px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [opts.threshold, opts.rootMargin]);

  return [ref, seen] as const;
}
