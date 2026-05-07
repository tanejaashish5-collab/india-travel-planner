"use client";

import { useEffect, useRef, useState } from "react";

// Editorial count-up — eases from 0 to `target` over `duration`ms once the
// node enters the viewport. One-shot: fires once per page load. Honours
// `prefers-reduced-motion` by skipping the animation and rendering the
// final value immediately.
//
// Used by the cinematic hero score badge (0 → 6.0 over 800ms). Server
// renders the final value so SEO/SSR sees the real number; the client
// then resets to 0 and animates up.
export function CinematicCountUp({
  target,
  duration = 800,
  decimals = 1,
  className,
  style,
}: {
  target: number;
  duration?: number;
  decimals?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const [value, setValue] = useState<number>(target);
  const ref = useRef<HTMLSpanElement>(null);
  const fired = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) {
      setValue(target);
      return;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting || fired.current) continue;
          fired.current = true;
          setValue(0);
          const start = performance.now();
          let frame = 0;
          function tick(now: number) {
            const t = Math.min(1, (now - start) / duration);
            // ease-out cubic — settles dramatically, like a film projector
            // pulling focus.
            const eased = 1 - Math.pow(1 - t, 3);
            setValue(target * eased);
            if (t < 1) frame = requestAnimationFrame(tick);
            else setValue(target);
          }
          frame = requestAnimationFrame(tick);
          return () => cancelAnimationFrame(frame);
        }
      },
      { threshold: 0.5 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [target, duration]);

  return (
    <span
      ref={ref}
      className={className}
      style={{ fontVariantNumeric: "tabular-nums", ...style }}
    >
      {value.toFixed(decimals)}
    </span>
  );
}
