"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import indiaMapData from "@svg-maps/india";

const mapData = (indiaMapData as any).default || indiaMapData;

// Map SVG state IDs to our state slugs
const SVG_TO_SLUG: Record<string, string> = {
  hp: "himachal-pradesh", ut: "uttarakhand", jk: "jammu-kashmir",
  rj: "rajasthan", pb: "punjab", dl: "delhi", up: "uttar-pradesh",
  ch: "chandigarh", hr: "haryana", mp: "madhya-pradesh",
  sk: "sikkim", wb: "west-bengal", ar: "arunachal-pradesh",
  as: "assam", ml: "meghalaya", nl: "nagaland", mn: "manipur",
  mz: "mizoram", tr: "tripura", br: "bihar", jh: "jharkhand",
  ct: "chhattisgarh",
  // States we don't have yet but show dimmed
  ka: "karnataka", kl: "kerala", tn: "tamil-nadu", ga: "goa",
  mh: "maharashtra", gj: "gujarat", or: "odisha", tg: "telangana",
  ap: "andhra-pradesh",
};

const SLUG_TO_SVG: Record<string, string> = Object.fromEntries(
  Object.entries(SVG_TO_SLUG).map(([k, v]) => [v, k])
);

// States we have data for — keep in sync with seo-maps.ts STATE_MAP
const ACTIVE_STATES = new Set([
  "himachal-pradesh", "uttarakhand", "jammu-kashmir", "ladakh",
  "rajasthan", "punjab", "delhi", "uttar-pradesh", "chandigarh",
  "haryana", "madhya-pradesh", "sikkim", "west-bengal",
  "arunachal-pradesh", "assam", "meghalaya", "nagaland",
  "manipur", "mizoram", "tripura", "bihar", "jharkhand", "chhattisgarh",
  "gujarat", "maharashtra", "goa", "karnataka",
]);

// Score to color mapping
function getScoreColor(avgScore: number | null): string {
  if (avgScore === null || avgScore === 0) return "oklch(0.3 0 0)";
  if (avgScore >= 4) return "oklch(0.65 0.2 160)"; // emerald
  if (avgScore >= 3) return "oklch(0.7 0.15 85)";  // yellow
  if (avgScore >= 2) return "oklch(0.65 0.2 55)";  // orange
  return "oklch(0.6 0.2 25)";                       // red
}

interface StateInfo {
  id: string;
  name: string;
  destCount: number;
  avgScore: number | null;
  region: string;
}

interface IndiaMapProps {
  states: StateInfo[];
  locale: string;
  activeRegion: string;
}

export function IndiaMap({ states, locale, activeRegion }: IndiaMapProps) {
  const [hoveredState, setHoveredState] = useState<string | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  // Build lookup from slug to state info
  const stateMap = useMemo(() => {
    const m: Record<string, StateInfo> = {};
    states.forEach((s) => { m[s.id] = s; });
    // J&K path also covers Ladakh
    if (m["jammu-kashmir"] && m["ladakh"]) {
      m["jammu-kashmir"] = {
        ...m["jammu-kashmir"],
        name: "J&K & Ladakh",
        destCount: m["jammu-kashmir"].destCount + m["ladakh"].destCount,
      };
    }
    return m;
  }, [states]);

  // Region filter
  const regionStates = useMemo(() => {
    if (activeRegion === "all") return null;
    const REGION_MAP: Record<string, string[]> = {
      north: ["himachal-pradesh", "uttarakhand", "jammu-kashmir", "ladakh", "rajasthan", "punjab", "delhi", "uttar-pradesh", "chandigarh", "haryana"],
      west: ["gujarat", "maharashtra", "goa"],
      south: ["karnataka"],
      northeast: ["sikkim", "arunachal-pradesh", "assam", "meghalaya", "nagaland", "manipur", "mizoram", "tripura"],
      east: ["west-bengal", "bihar", "jharkhand"],
      central: ["madhya-pradesh", "chhattisgarh"],
    };
    return new Set(REGION_MAP[activeRegion] ?? []);
  }, [activeRegion]);

  function handleMouseMove(e: React.MouseEvent<SVGElement>) {
    const svg = e.currentTarget.getBoundingClientRect();
    setTooltipPos({
      x: e.clientX - svg.left,
      y: e.clientY - svg.top,
    });
  }

  const hoveredInfo = hoveredState ? stateMap[hoveredState] : null;

  return (
    <div className="relative w-full">
      {/* Map */}
      <svg
        viewBox={mapData.viewBox}
        className="w-full h-auto max-h-[70vh]"
        onMouseMove={handleMouseMove}
        role="img"
        aria-label="Interactive map of India showing states with destination scores"
      >
        {mapData.locations.map((loc: any) => {
          const slug = SVG_TO_SLUG[loc.id];
          const isActive = slug ? ACTIVE_STATES.has(slug) : false;
          const info = slug ? stateMap[slug] : null;
          const isHovered = hoveredState === slug;
          const isInRegion = !regionStates || (slug && regionStates.has(slug));
          const avgScore = info?.avgScore ?? null;

          // Determine fill
          let fill: string;
          if (!isInRegion) {
            fill = "oklch(0.2 0 0 / 30%)"; // dimmed when not in selected region
          } else if (isActive && info) {
            fill = getScoreColor(avgScore);
          } else {
            fill = "oklch(0.25 0 0)"; // no data
          }

          return (
            <path
              key={loc.id}
              d={loc.path}
              fill={isHovered ? "oklch(0.85 0.15 85)" : fill}
              stroke={isHovered ? "oklch(0.95 0 0)" : "oklch(0.15 0 0)"}
              strokeWidth={isHovered ? 1.5 : 0.5}
              className="transition-colors duration-200"
              style={{
                cursor: isActive ? "pointer" : "default",
                opacity: isInRegion ? 1 : 0.3,
                filter: isHovered ? "brightness(1.3)" : "none",
              }}
              onMouseEnter={() => slug && isActive && setHoveredState(slug)}
              onMouseLeave={() => setHoveredState(null)}
              onClick={() => {
                if (slug && isActive) {
                  window.location.href = `/${locale}/state/${slug}`;
                }
              }}
            >
              <title>{loc.name}</title>
            </path>
          );
        })}
      </svg>

      {/* Tooltip */}
      <AnimatePresence>
        {hoveredInfo && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.12 }}
            className="pointer-events-none absolute z-30 rounded-xl border border-border bg-card/95 backdrop-blur-sm px-4 py-3 shadow-2xl"
            style={{
              left: Math.min(tooltipPos.x + 16, (typeof window !== "undefined" ? window.innerWidth * 0.6 : 400)),
              top: tooltipPos.y - 10,
            }}
          >
            <div className="text-sm font-semibold text-foreground">{hoveredInfo.name}</div>
            <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
              <span className="font-mono font-bold">{hoveredInfo.destCount} destinations</span>
              {hoveredInfo.avgScore !== null && (
                <span
                  className="rounded-full px-2 py-0.5 text-[10px] font-bold"
                  style={{
                    backgroundColor: getScoreColor(hoveredInfo.avgScore) + "33",
                    color: getScoreColor(hoveredInfo.avgScore),
                  }}
                >
                  {hoveredInfo.avgScore.toFixed(1)}/5 avg
                </span>
              )}
            </div>
            <div className="mt-1 text-[10px] text-muted-foreground/50">Click to explore →</div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Legend */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground">
        <span className="font-medium">Score this month:</span>
        {[
          { label: "4-5 Great", color: "oklch(0.65 0.2 160)" },
          { label: "3 Good", color: "oklch(0.7 0.15 85)" },
          { label: "2 Fair", color: "oklch(0.65 0.2 55)" },
          { label: "1 Poor", color: "oklch(0.6 0.2 25)" },
          { label: "No data", color: "oklch(0.25 0 0)" },
        ].map((item) => (
          <span key={item.label} className="flex items-center gap-1.5">
            <span className="inline-block h-3 w-3 rounded-sm" style={{ backgroundColor: item.color }} />
            {item.label}
          </span>
        ))}
      </div>
    </div>
  );
}
