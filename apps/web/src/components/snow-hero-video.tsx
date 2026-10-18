"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type NetworkInfo = { saveData?: boolean; effectiveType?: string };
export type SnowClip = { src: string; label: string };

/**
 * Winter footage behind the /snow header: the clips play one after another with a
 * crossfade. The poster paints first (it is a frame of clips[0], so the first fade is
 * seamless), the first clip is attached only after window "load", and the next clip is
 * fetched only once the current one is playing. Skipped on Save-Data, 2G and
 * reduced-motion. Decorative, so hidden from screen readers.
 */
export function SnowHeroVideo({ clips, poster }: { clips: SnowClip[]; poster: string }) {
  const refs = [useRef<HTMLVideoElement>(null), useRef<HTMLVideoElement>(null)];
  const [order, setOrder] = useState<SnowClip[] | null>(null);
  const [active, setActive] = useState(0); // which of the two <video> slots is showing
  const [idx, setIdx] = useState<[number, number]>([0, 1]); // clip index loaded in each slot
  const [shown, setShown] = useState(false); // first clip actually playing
  const clipAt = useCallback((i: number) => (order ? order[i % order.length] : null), [order]);

  useEffect(() => {
    const conn = (navigator as Navigator & { connection?: NetworkInfo }).connection;
    if (clips.length === 0 || conn?.saveData || /(^|-)2g$/.test(conn?.effectiveType ?? "") || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let t: ReturnType<typeof setTimeout>;
    const go = () => {
      t = setTimeout(() => {
        // First clip stays first (matches the poster); the rest are shuffled per visit.
        const rest = clips.slice(1).map((c) => ({ c, k: Math.random() })).sort((a, b) => a.k - b.k).map((x) => x.c);
        setOrder([clips[0], ...rest]);
      }, 800);
    };
    if (document.readyState === "complete") go();
    else window.addEventListener("load", go, { once: true });
    return () => { clearTimeout(t); window.removeEventListener("load", go); };
  }, [clips]);

  useEffect(() => {
    if (order) refs[0].current?.play().catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order]);

  const onEnded = (slot: number) => {
    if (!order || slot !== active || order.length < 2) return;
    const next = 1 - slot;
    refs[next].current?.play().catch(() => {});
    setActive(next);
    // Once the new clip is on screen, the idle slot loads the one after it.
    setIdx((cur) => { const n: [number, number] = [...cur]; n[slot] = cur[next] + 1; return n; });
  };

  const fill = { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", transformOrigin: "top left", transform: "scale(1.1)" } as const;
  const current = order ? clipAt(idx[active]) : null;
  return (
    <div aria-hidden="true" style={{ position: "absolute", inset: 0, overflow: "hidden", background: "#0a1220" }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={poster} alt="" style={fill} fetchPriority="high" />
      {order && [0, 1].map((slot) => {
        const clip = clipAt(idx[slot]);
        return clip ? (
          <video
            key={slot}
            ref={refs[slot]}
            src={clip.src}
            muted
            playsInline
            preload="auto"
            onPlaying={() => { if (slot === 0) setShown(true); }}
            onEnded={() => onEnded(slot)}
            style={{ ...fill, opacity: shown && slot === active ? 1 : 0, transition: "opacity 1100ms ease" }}
          />
        ) : null;
      })}
      {shown && current && (
        <p style={{ position: "absolute", top: 128, right: 24, margin: 0, fontFamily: "var(--cinema-mono, monospace)", fontSize: 11, letterSpacing: "0.12em", color: "rgba(245,240,230,0.7)", textTransform: "uppercase" }}>
          {current.label}
        </p>
      )}
    </div>
  );
}
