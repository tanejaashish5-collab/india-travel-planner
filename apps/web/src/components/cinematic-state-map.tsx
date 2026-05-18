"use client";

import { useEffect, useState } from "react";
import { useInView } from "./landing-cinema/use-in-view";

/**
 * Cinematic destination-page atlas.
 *
 * Mirrors the landing-page Act IV Atlas aesthetic — hand-drawn India
 * silhouette + faint grid + corner readouts + a single dropping/pulsing
 * vermillion pin at the destination's coordinates.
 *
 * Replaces the prior state-choropleth (which highlighted the parent
 * state on an @svg-maps/india outline). Information loss is small —
 * the surrounding section already names the state, and the pin's HTML
 * label carries it. Visual continuity with the landing wins.
 *
 * Projection: equirectangular into a 1000×1100 viewBox — matches the
 * transform used by scripts that built india-outline.svg so the pin
 * lines up with state geometry.
 */

const VIEWBOX_W = 1000;
const VIEWBOX_H = 1100;
const PAD = 20;
const LNG_MIN = 68;
const LNG_MAX = 97;
const LAT_MIN = 6;
const LAT_MAX = 37;

function projectLatLng(lat: number, lng: number): { x: number; y: number } {
  const x = PAD + ((lng - LNG_MIN) / (LNG_MAX - LNG_MIN)) * (VIEWBOX_W - 2 * PAD);
  const y = PAD + ((LAT_MAX - lat) / (LAT_MAX - LAT_MIN)) * (VIEWBOX_H - 2 * PAD);
  return { x, y };
}

export function CinematicStateMap({
  coords,
  destinationName,
  stateName,
}: {
  coords: { lat: number; lng: number } | null;
  destinationName: string;
  stateName: string | null | undefined;
}) {
  const [ref, seen] = useInView<HTMLDivElement>({ threshold: 0.3 });
  const [dropped, setDropped] = useState(false);

  useEffect(() => {
    if (!seen) return;
    const id = setTimeout(() => setDropped(true), 200);
    return () => clearTimeout(id);
  }, [seen]);

  const projected = coords ? projectLatLng(coords.lat, coords.lng) : null;

  return (
    <div ref={ref}>
      <div
        style={{
          position: "relative",
          aspectRatio: "10/11",
          border: "1px solid var(--hair)",
          overflow: "hidden",
          background: "radial-gradient(ellipse at 50% 30%, #08080a 0%, #000 80%)",
        }}
      >
      <svg
        viewBox={`0 0 ${VIEWBOX_W} ${VIEWBOX_H}`}
        preserveAspectRatio="none"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          opacity: 0.18,
        }}
        aria-hidden
      >
        {Array.from({ length: 11 }).map((_, i) => (
          <line
            key={`v${i}`}
            x1={i * 100}
            y1={0}
            x2={i * 100}
            y2={VIEWBOX_H}
            stroke="var(--bone)"
            strokeWidth="0.8"
          />
        ))}
        {Array.from({ length: 12 }).map((_, i) => (
          <line
            key={`h${i}`}
            x1={0}
            y1={i * 100}
            x2={VIEWBOX_W}
            y2={i * 100}
            stroke="var(--bone)"
            strokeWidth="0.8"
          />
        ))}
      </svg>

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/maps/india-outline.svg"
        alt={`Map of India highlighting ${destinationName}`}
        loading="lazy"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
      />

      {projected && (
        <svg
          viewBox={`0 0 ${VIEWBOX_W} ${VIEWBOX_H}`}
          preserveAspectRatio="xMidYMid meet"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        >
          <defs>
            <filter id="nq-pin-blur">
              <feGaussianBlur stdDeviation="2" />
            </filter>
          </defs>
          <g style={{ opacity: dropped ? 1 : 0, transition: "opacity .5s" }}>
            <line
              x1={projected.x}
              y1={projected.y - 50}
              x2={projected.x}
              y2={projected.y}
              stroke="var(--vermillion)"
              strokeWidth="1.5"
              opacity="0.5"
            />
            <circle
              cx={projected.x}
              cy={projected.y}
              r="30"
              fill="none"
              stroke="var(--vermillion)"
              strokeWidth="1.5"
            >
              <animate
                attributeName="r"
                from="10"
                to="44"
                dur="1.2s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                from=".7"
                to="0"
                dur="1.2s"
                repeatCount="indefinite"
              />
            </circle>
            <circle
              cx={projected.x}
              cy={projected.y}
              r="11"
              fill="var(--vermillion)"
              filter="url(#nq-pin-blur)"
            />
            <circle cx={projected.x} cy={projected.y} r="5.5" fill="var(--bone)" />
          </g>
        </svg>
      )}

      <div
        style={{
          position: "absolute",
          top: 14,
          left: 14,
          fontFamily: "var(--cinema-mono)",
          fontWeight: 500,
          fontSize: 9,
          color: "var(--bone-faint)",
          letterSpacing: "0.18em",
        }}
      >
        23.5N · 80.5E
      </div>
      <div
        style={{
          position: "absolute",
          top: 14,
          right: 14,
          fontFamily: "var(--cinema-mono)",
          fontWeight: 500,
          fontSize: 9,
          color: "var(--bone-faint)",
          letterSpacing: "0.18em",
        }}
      >
        SCALE 1:24M
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 14,
          left: 14,
          fontFamily: "var(--cinema-mono)",
          fontWeight: 500,
          fontSize: 9,
          color: "var(--bone-faint)",
          letterSpacing: "0.18em",
        }}
      >
        NAKSHIQ ATLAS · 2026
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 14,
          right: 14,
          fontFamily: "var(--cinema-mono)",
          fontWeight: 500,
          fontSize: 9,
          color: "var(--green)",
          letterSpacing: "0.18em",
        }}
      >
        ● ROLLING
      </div>
      </div>

      {/* Caption below the map — keeps the destination name + state out
          of the pin's path so the dropping/pulsing dot stays visible.
          Landing-page Atlas keeps labels on the map because it has
          multiple pins; here we only have one, so an external placard
          reads cleaner and matches a museum/atlas caption style. */}
      <div
        style={{
          marginTop: 14,
          display: "flex",
          alignItems: "center",
          gap: 10,
          fontFamily: "var(--cinema-mono)",
          fontWeight: 700,
          fontSize: 10,
          lineHeight: 1,
          color: "var(--bone)",
          letterSpacing: "0.18em",
          opacity: dropped ? 1 : 0,
          transform: dropped ? "translateY(0)" : "translateY(4px)",
          transition: "opacity .5s ease, transform .5s ease",
          transitionDelay: dropped ? "0.18s" : "0s",
        }}
      >
        <span
          aria-hidden
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: "var(--vermillion)",
            flexShrink: 0,
          }}
        />
        <span>{destinationName.toUpperCase()}</span>
        {stateName && (
          <span style={{ color: "var(--vermillion)" }}>· {stateName.toUpperCase()}</span>
        )}
      </div>
    </div>
  );
}
