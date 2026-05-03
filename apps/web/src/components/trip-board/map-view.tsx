"use client";

// MapView — Phase 5. Pure-SVG India atlas for the trip board.
//
// Design choice: NOT Leaflet (the destination-map.tsx pattern). Tiles are
// bright/Google-Maps-y and clash with the dark editorial design. An atlas
// SVG (single India outline + numbered pins + hairline connecting line)
// matches the design vocabulary and stays editorial.
//
// India outline source: `@svg-maps/india` v2.0.0 (already in node_modules,
// MIT-licensed). It exports {viewBox, locations[]} where each location is a
// state with {name, id, path}. We collapse all state paths into one filled
// shape with thin hairline strokes for state borders.
//
// Projection: simple equirectangular calibrated against India's bbox
// (lat 6.7→37.1, lng 68.1→97.4). Won't pixel-align with the SVG state borders
// (the package uses a slightly different projection), but for an editorial
// "where am I going?" view that's a deliberate trade — pins should READ
// clearly, not nav-grade.

import { useMemo } from "react";
import indiaMap from "@svg-maps/india";
import type { TripStateV2 } from "@/lib/trip-storage";

type DestLite = {
  id: string;
  name: string;
  state: { name: string } | null;
  lat?: number | null;
  lng?: number | null;
};

type SvgMap = {
  viewBox: string;
  locations: { id: string; name: string; path: string }[];
};

const MAP = indiaMap as SvgMap;
const VB_W = 612;
const VB_H = 696;

// India bounding box for projection. Calibrated visually so common cities
// (Delhi/Mumbai/Bengaluru) land roughly inside their state outline. Off by
// a few px at the extremes (Andamans, Arunachal) — acceptable for an atlas.
const LAT_MIN = 6.5;
const LAT_MAX = 37.5;
const LNG_MIN = 67.5;
const LNG_MAX = 97.5;

function project(lat: number, lng: number): { x: number; y: number } {
  const x = ((lng - LNG_MIN) / (LNG_MAX - LNG_MIN)) * VB_W;
  const y = VB_H - ((lat - LAT_MIN) / (LAT_MAX - LAT_MIN)) * VB_H;
  return { x, y };
}

export function MapView({
  state,
  destinations,
  onPinClick,
}: {
  state: TripStateV2;
  destinations: DestLite[];
  /** Click pin → scroll to corresponding StopCard (host wires this). */
  onPinClick?: (destinationId: string) => void;
}) {
  const destMap = useMemo(() => new Map(destinations.map((d) => [d.id, d])), [destinations]);

  // Project each stop in trip order, dropping any with missing coords.
  const pins = useMemo(() => {
    const out: {
      id: string;
      name: string;
      stateName: string;
      x: number;
      y: number;
      idx: number;
    }[] = [];
    state.stops.forEach((stop, idx) => {
      const dest = destMap.get(stop.destinationId);
      if (!dest || dest.lat == null || dest.lng == null) return;
      const p = project(dest.lat, dest.lng);
      out.push({
        id: dest.id,
        name: dest.name,
        stateName: dest.state?.name ?? "",
        x: p.x,
        y: p.y,
        idx: idx + 1,
      });
    });
    return out;
  }, [state.stops, destMap]);

  // Connecting polyline string. Empty when fewer than 2 pins resolved.
  const lineD = useMemo(() => {
    if (pins.length < 2) return "";
    return pins.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" ");
  }, [pins]);

  const missingCount = state.stops.length - pins.length;

  return (
    <div
      data-trip-map
      style={{
        flex: 1,
        overflow: "auto",
        minHeight: 0,
        padding: "24px 32px",
        background: "var(--paper)",
        display: "flex",
        flexDirection: "column",
        gap: 14,
      }}
    >
      <div className="nq-eyebrow" style={{ color: "var(--ink-3)" }}>
        Atlas · {pins.length} of {state.stops.length} {state.stops.length === 1 ? "stop" : "stops"} mapped
        {missingCount > 0 && ` · ${missingCount} missing coordinates`}
      </div>

      <div
        style={{
          alignSelf: "center",
          width: "100%",
          maxWidth: 720,
          background: "var(--paper-2)",
          border: "1px solid var(--rule-2)",
          padding: 18,
        }}
      >
        <svg
          viewBox={MAP.viewBox || `0 0 ${VB_W} ${VB_H}`}
          role="img"
          aria-label={`Atlas of ${pins.length} trip stops on the map of India`}
          style={{ width: "100%", height: "auto", display: "block" }}
        >
          {/* India fill + state hairlines */}
          <g data-india-outline>
            {MAP.locations.map((loc) => (
              <path
                key={loc.id}
                d={loc.path}
                fill="rgba(243, 236, 225, 0.04)"
                stroke="var(--rule-2)"
                strokeWidth={0.6}
                strokeLinejoin="round"
              />
            ))}
          </g>

          {/* Connecting line — drawn under pins so numerals stay legible */}
          {lineD && (
            <path
              d={lineD}
              fill="none"
              stroke="#d36843"
              strokeWidth={1.25}
              strokeDasharray="3 3"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity={0.85}
            />
          )}

          {/* Pins */}
          <g data-pins>
            {pins.map((p) => (
              <g
                key={`${p.id}-${p.idx}`}
                transform={`translate(${p.x.toFixed(1)} ${p.y.toFixed(1)})`}
                onClick={() => onPinClick?.(p.id)}
                style={{ cursor: onPinClick ? "pointer" : "default" }}
                data-pin-id={p.id}
              >
                <circle
                  r={9}
                  fill="#d36843"
                  stroke="var(--paper)"
                  strokeWidth={1.5}
                />
                <text
                  textAnchor="middle"
                  dominantBaseline="central"
                  fontFamily="var(--serif)"
                  fontSize={10}
                  fontWeight={600}
                  fill="var(--paper)"
                  style={{ pointerEvents: "none" }}
                >
                  {p.idx}
                </text>
                <title>{`${p.idx}. ${p.name}${p.stateName ? ` · ${p.stateName}` : ""}`}</title>
              </g>
            ))}
          </g>
        </svg>
      </div>

      {/* Legend / caption */}
      <div
        style={{
          alignSelf: "center",
          maxWidth: 720,
          width: "100%",
          fontSize: 11.5,
          color: "var(--ink-3)",
          fontFamily: "var(--serif)",
          fontStyle: "italic",
          textAlign: "center",
        }}
      >
        Click a pin to scroll to its stop card · vermillion line = trip order
      </div>

      {missingCount > 0 && (
        <div
          className="nq-alert"
          style={{ alignSelf: "center", maxWidth: 720, width: "100%" }}
        >
          <div className="nq-alert-eyebrow">Missing coordinates</div>
          <p style={{ margin: 0, fontSize: 12 }}>
            {missingCount} {missingCount === 1 ? "stop has" : "stops have"} no PostGIS coords on file
            and can&rsquo;t be plotted. The list view still shows everything.
          </p>
        </div>
      )}
    </div>
  );
}
