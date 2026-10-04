"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { preload } from "react-dom";
import { destinationImage } from "@/lib/image-url";
import { videoSrc } from "@/lib/video-url";

// Destination hero: photo first, video later.
//
// Until 2026-10-04 the hero was a bare <video autoPlay poster=w1600>. On a
// phone that meant (a) a ~6 MB MP4 started downloading at once and fought the
// page for bandwidth, and (b) the poster was always the 1600px variant
// (201 KB for manali vs 82 KB at 800px). Real-user CrUX for the origin showed
// image-LCP loads waiting ~2.8 s (p75) before the photo even started.
//
// Now a real <img> with a srcset paints first (phones pick 800/1200, desktop
// 1600) and is preloaded with the same srcset so the browser fetches one file.
// The video is attached only after window "load" + 1 s, fades in once it is
// actually playing, and is skipped on Save-Data, 2G and reduced-motion.
const WIDTHS = [800, 1200, 1600] as const;

function heroSrcSet(id: string): string {
  return WIDTHS.map((w) => `${destinationImage(id, w)} ${w}w`).join(", ");
}

type NetworkInfo = { saveData?: boolean; effectiveType?: string };

export function HeroMedia({
  id,
  className,
  style,
  sizes = "100vw",
}: {
  /** Destination id: the photo and the MP4 share it. */
  id: string;
  /** Applied to both the photo and the video so they cover identically. */
  className?: string;
  style?: CSSProperties;
  sizes?: string;
}) {
  const src = destinationImage(id, 1600);
  const srcSet = heroSrcSet(id);
  preload(src, { as: "image", fetchPriority: "high", imageSrcSet: srcSet, imageSizes: sizes });

  const videoRef = useRef<HTMLVideoElement>(null);
  // Which destination's video is playing; keyed so a reused instance never
  // shows the previous destination's clip over the new photo.
  const [playingId, setPlayingId] = useState<string | null>(null);

  useEffect(() => {
    const url = videoSrc(id);
    const video = videoRef.current;
    if (!url || !video) return;
    const net = (navigator as Navigator & { connection?: NetworkInfo }).connection;
    if (net?.saveData) return;
    if (net?.effectiveType && /2g$/.test(net.effectiveType)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let timer: ReturnType<typeof setTimeout> | undefined;
    const attach = () => {
      timer = setTimeout(() => {
        video.muted = true; // autoplay policy needs the property, not just the attribute
        video.src = url;
        video.play().catch(() => {
          // Missing MP4 (not every destination has one) or autoplay refused:
          // the photo stays, which is the intended fallback.
        });
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
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        srcSet={srcSet}
        sizes={sizes}
        alt=""
        aria-hidden
        fetchPriority="high"
        className={className}
        style={{ display: "block", ...style }}
      />
      <video
        key={id}
        ref={videoRef}
        muted
        loop
        playsInline
        preload="none"
        aria-hidden
        onPlaying={() => setPlayingId(id)}
        className={className}
        style={{
          ...style,
          position: "absolute",
          inset: 0,
          opacity: playingId === id ? 1 : 0,
          transition: "opacity 600ms ease",
        }}
      />
    </>
  );
}
