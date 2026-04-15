"use client";

import { useState, useMemo } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import indiaMapData from "@svg-maps/india";
import { ALL_STATE_SLUGS } from "@/lib/seo-maps";

const mapData = (indiaMapData as any).default || indiaMapData;

// Region grouping for staggered fill reveal
const REGION_ORDER: Record<string, number> = {
  // North fills first
  hp: 0, ut: 0, jk: 0, pb: 0, dl: 0, up: 0, hr: 0, ch: 0, rj: 0,
  // West second
  gj: 1, mh: 1, ga: 1,
  // Central third
  mp: 2, ct: 2,
  // East fourth
  wb: 3, br: 3, jh: 3, or: 3,
  // Northeast fifth
  sk: 4, ar: 4, as: 4, ml: 4, nl: 4, mn: 4, mz: 4, tr: 4,
  // South sixth
  ka: 5, kl: 5, tn: 5, tg: 5, ap: 5,
};

// SVG ID → state slug mapping for @svg-maps/india. Active check uses ALL_STATE_SLUGS from seo-maps.ts.
const SVG_TO_SLUG: Record<string, string> = {
  hp: "himachal-pradesh", ut: "uttarakhand", jk: "jammu-kashmir",
  rj: "rajasthan", pb: "punjab", dl: "delhi", up: "uttar-pradesh",
  ch: "chandigarh", hr: "haryana", mp: "madhya-pradesh",
  sk: "sikkim", wb: "west-bengal", ar: "arunachal-pradesh",
  as: "assam", ml: "meghalaya", nl: "nagaland", mn: "manipur",
  mz: "mizoram", tr: "tripura", br: "bihar", jh: "jharkhand",
  ct: "chhattisgarh", gj: "gujarat", mh: "maharashtra",
  ga: "goa", ka: "karnataka", kl: "kerala",
  tn: "tamil-nadu", tg: "telangana", ap: "andhra-pradesh",
  or: "odisha",
};
const ACTIVE_SET = new Set(ALL_STATE_SLUGS);

// Score to color
function scoreColor(score: number | null): string {
  if (score === null || score === 0) return "#71717a";
  if (score >= 5) return "#10b981";
  if (score >= 4) return "#3b82f6";
  if (score >= 3) return "#eab308";
  if (score >= 2) return "#f97316";
  return "#ef4444";
}

// Map lat/lng to SVG coordinates (approximate mercator projection)
// India bounds: lat ~6-38, lng ~68-98 → SVG viewBox 0-612 x 0-696
function geoToSvg(lat: number, lng: number): { x: number; y: number } {
  const minLng = 68, maxLng = 98, minLat = 6, maxLat = 38;
  const x = ((lng - minLng) / (maxLng - minLng)) * 612;
  const y = ((maxLat - lat) / (maxLat - minLat)) * 696;
  return { x, y };
}

interface MapPin {
  id: string;
  name: string;
  lat: number;
  lng: number;
  score: number | null;
}

interface IndiaHeroMapProps {
  pins: MapPin[];
  locale: string;
}

export function IndiaHeroMap({ pins, locale }: IndiaHeroMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [hoveredPin, setHoveredPin] = useState<MapPin | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  // All valid pins — show every destination, pulse only top scorers
  const allPins = useMemo(() => {
    return pins.filter((p) => p.lat && p.lng);
  }, [pins]);

  const topScoreIds = useMemo(() => {
    return new Set(
      [...pins]
        .filter((p) => p.lat && p.lng && (p.score ?? 0) >= 4)
        .map((p) => p.id)
    );
  }, [pins]);

  function handlePinHover(pin: MapPin, e: React.MouseEvent<SVGCircleElement>) {
    const svg = e.currentTarget.closest("svg")?.getBoundingClientRect();
    if (svg) {
      setTooltipPos({ x: e.clientX - svg.left, y: e.clientY - svg.top });
    }
    setHoveredPin(pin);
  }

  return (
    <div ref={containerRef} className="relative w-full max-w-2xl mx-auto">
      <svg
        viewBox="0 0 612 696"
        className="w-full h-auto"
        role="img"
        aria-label="Animated map of India showing top destinations this month"
      >
        {/* State paths — draw outline then fill */}
        {mapData.locations.map((loc: any, i: number) => {
          const regionIdx = REGION_ORDER[loc.id] ?? 5;
          const slug = SVG_TO_SLUG[loc.id];
          const isActive = slug ? ACTIVE_SET.has(slug) : false;
          const fillDelay = 2.5 + regionIdx * 0.3; // After outline draw (2.5s)

          return (
            <motion.path
              key={loc.id}
              d={loc.path}
              stroke="oklch(0.4 0.05 260)"
              strokeWidth={0.5}
              fill={isActive ? "oklch(0.2 0.02 260)" : "oklch(0.15 0 0)"}
              initial={{
                pathLength: 0,
                fillOpacity: 0,
                strokeOpacity: 0,
              }}
              animate={isInView ? {
                pathLength: 1,
                fillOpacity: isActive ? 0.7 : 0.3,
                strokeOpacity: 1,
              } : {}}
              transition={{
                pathLength: { duration: 2.5, ease: "easeInOut", delay: i * 0.03 },
                fillOpacity: { duration: 0.8, delay: fillDelay },
                strokeOpacity: { duration: 0.3, delay: i * 0.02 },
              }}
              style={{
                cursor: isActive ? "pointer" : "default",
              }}
              onClick={() => {
                if (slug && isActive) window.location.href = `/${locale}/state/${slug}`;
              }}
            />
          );
        })}

        {/* ALL destination dots — appear after states fill */}
        {allPins.map((pin, i) => {
          const { x, y } = geoToSvg(pin.lat, pin.lng);
          const color = scoreColor(pin.score);
          const isTopScorer = topScoreIds.has(pin.id);
          const dotDelay = 3.5 + (i * 0.02); // Stagger slightly

          return (
            <g key={pin.id}>
              {/* Glow pulse ring — only for top scorers (4-5/5) */}
              {isTopScorer && (
                <motion.circle
                  cx={x} cy={y} r={10}
                  fill="none"
                  stroke={color}
                  strokeWidth={0.8}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={isInView ? {
                    opacity: [0, 0.3, 0],
                    scale: [0.5, 1.5, 2],
                  } : {}}
                  transition={{
                    delay: dotDelay + 1,
                    duration: 2.5,
                    repeat: Infinity,
                    repeatDelay: 2 + Math.random() * 3,
                    ease: "easeOut",
                  }}
                  style={{ transformOrigin: `${x}px ${y}px` }}
                />
              )}
              {/* Main dot */}
              <motion.circle
                cx={x} cy={y} r={isTopScorer ? 4.5 : 3}
                fill={color}
                stroke="#000"
                strokeWidth={0.5}
                fillOpacity={isTopScorer ? 0.95 : 0.7}
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{
                  delay: dotDelay,
                  duration: 0.3,
                  type: "spring",
                  stiffness: 300,
                }}
                style={{ cursor: "pointer" }}
                onMouseEnter={(e) => handlePinHover(pin, e)}
                onMouseLeave={() => setHoveredPin(null)}
                onClick={() => {
                  window.location.href = `/${locale}/destination/${pin.id}`;
                }}
              />
            </g>
          );
        })}
      </svg>

      {/* Tooltip */}
      {hoveredPin && (
        <div
          className="pointer-events-none absolute z-30 rounded-xl border border-border bg-card/95 backdrop-blur-sm px-4 py-3 shadow-2xl"
          style={{
            left: Math.min(tooltipPos.x + 16, 300),
            top: tooltipPos.y - 10,
          }}
        >
          <div className="text-sm font-semibold text-foreground">{hoveredPin.name}</div>
          <div className="mt-1 flex items-center gap-2 text-xs">
            <span
              className="rounded-full px-2 py-0.5 font-bold"
              style={{
                backgroundColor: scoreColor(hoveredPin.score) + "22",
                color: scoreColor(hoveredPin.score),
              }}
            >
              {hoveredPin.score !== null ? `${hoveredPin.score}/5` : "No score"}
            </span>
            <span className="text-muted-foreground/50">this month</span>
          </div>
          <div className="mt-1 text-[10px] text-primary">Click to explore →</div>
        </div>
      )}

      {/* Legend */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-xs text-muted-foreground">
        <span className="font-medium">This month:</span>
        {[
          { score: 5, label: "5/5" },
          { score: 4, label: "4/5" },
          { score: 3, label: "3/5" },
          { score: 2, label: "2/5" },
          { score: 1, label: "1/5" },
        ].map((s) => (
          <span key={s.score} className="flex items-center gap-1">
            <span
              className="inline-block h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: scoreColor(s.score) }}
            />
            {s.label}
          </span>
        ))}
      </div>
    </div>
  );
}
