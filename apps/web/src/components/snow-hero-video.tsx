"use client";

import { useEffect, useRef, useState } from "react";

type NetworkInfo = { saveData?: boolean; effectiveType?: string };

/**
 * Looping snow footage behind the /snow header. Same discipline as HeroMedia: the poster
 * paints first, the 8 MB clip is attached only after window "load", and it is skipped on
 * Save-Data, 2G and reduced-motion. Decorative, so hidden from screen readers.
 */
export function SnowHeroVideo({ src, poster }: { src: string; poster: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [on, setOn] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const conn = (navigator as Navigator & { connection?: NetworkInfo }).connection;
    if (!src || conn?.saveData || /(^|-)2g$/.test(conn?.effectiveType ?? "") || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let t: ReturnType<typeof setTimeout>;
    const go = () => { t = setTimeout(() => setOn(true), 800); };
    if (document.readyState === "complete") go();
    else window.addEventListener("load", go, { once: true });
    return () => { clearTimeout(t); window.removeEventListener("load", go); };
  }, [src]);

  useEffect(() => {
    if (on) ref.current?.play().catch(() => {});
  }, [on]);

  const fill = { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", transformOrigin: "top left", transform: "scale(1.1)" } as const;
  return (
    <div aria-hidden="true" style={{ position: "absolute", inset: 0, overflow: "hidden", background: "#0a1220" }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={poster} alt="" style={fill} fetchPriority="high" />
      {on && (
        <video
          ref={ref}
          src={src}
          muted
          loop
          playsInline
          preload="auto"
          onPlaying={() => setPlaying(true)}
          style={{ ...fill, opacity: playing ? 1 : 0, transition: "opacity 900ms ease" }}
        />
      )}
    </div>
  );
}
