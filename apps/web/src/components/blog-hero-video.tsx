"use client";

import { useEffect, useRef, useState } from "react";
import { videoSrc } from "@/lib/video-url";

type NetworkInfo = { saveData?: boolean; effectiveType?: string };

/**
 * The destination's own clip, faded in over a blog post's cover photo. Same discipline as
 * HeroMedia: the photo paints first, the clip is attached after window "load", and it is
 * skipped on Save-Data, 2G and reduced-motion. A destination with no MP4 simply keeps the
 * photo. Only used for posts about ONE destination, so the clip is always the place the
 * post is about. Decorative: hidden from screen readers.
 */
export function BlogHeroVideo({ id, className, style }: { id: string; className?: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playingId, setPlayingId] = useState<string | null>(null);

  useEffect(() => {
    const url = videoSrc(id);
    const video = ref.current;
    if (!url || !video) return;
    const net = (navigator as Navigator & { connection?: NetworkInfo }).connection;
    if (net?.saveData || /2g$/.test(net?.effectiveType ?? "") || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const attach = () => {
      timer = setTimeout(() => {
        video.muted = true;
        video.src = url;
        video.play().catch(() => {});
      }, 1000);
    };
    if (document.readyState === "complete") attach();
    else window.addEventListener("load", attach, { once: true });
    return () => {
      window.removeEventListener("load", attach);
      if (timer) clearTimeout(timer);
    };
  }, [id]);

  return (
    <video
      key={id}
      ref={ref}
      muted
      loop
      playsInline
      preload="none"
      aria-hidden
      onPlaying={() => setPlayingId(id)}
      className={className}
      style={{ ...style, position: "absolute", inset: 0, opacity: playingId === id ? 1 : 0, transition: "opacity 700ms ease" }}
    />
  );
}
