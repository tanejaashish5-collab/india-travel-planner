"use client";

// YearBand — Phase 2.
//
// 365-day SVG band that lets the user drag stop pills along the calendar.
// Replaces the order-only stop list; closes PDF Failure #2 (temporal rigidity).
//
// Layout (desktop):
//   ┌─ JAN  FEB  MAR  APR  MAY  JUN  JUL  AUG  SEP  OCT  NOV  DEC ─┐  month header
//   │ ▒▒▒▒▒▒▒▒▒│             │▒▒▒▒▒▒▒▒▒                            │  pass hatched bands
//   │      ●      ●          ●                                     │  festival pins
//   │   ┌──[#01 Mechuka]──┐ ┌──[#02 Tawang]──┐                     │  draggable stop pills
//   └─────────────────────────────────────────────────────────────┘
//
// Drag mechanics:
//   - mousedown on pill → captures pointerOffsetX inside pill + svgRect
//   - mousemove → x = clientX - svgRect.left - pointerOffsetX
//                 startDay = clamp(round(x / dayWidth), 1, 365 - days)
//                 setStopStartDay(idx, startDay)
//   - mouseup / pointercancel → clears drag
//
// Mobile: the SVG is hidden (handled in board-canvas via media query); a
// month picker stands in. Touch-drag would need pointer events + scroll
// suppression — out of scope for Phase 2 web-only round.

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { TripStateV2, TripStop } from "@/lib/trip-storage";
import { PASSES_BY_DEST, dayOfYear } from "@/lib/passes";

type DestLite = {
  id: string;
  name: string;
  state: { name: string } | null;
  festivals?: { name: string; month: number | null }[] | null;
};

const MONTH_LABELS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
// First-of-month day-of-year (non-leap). Index 0 = Jan 1 (doy 1).
// 13 entries so MONTH_STARTS[12] = 366 sentinel for end of December.
const MONTH_STARTS = [1, 32, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335, 366];

function monthCenterDoy(month: number): number {
  // 1-12 → middle day of that month, used for festival pin placement.
  const start = MONTH_STARTS[month - 1];
  const end = MONTH_STARTS[month];
  return Math.round((start + end) / 2);
}

type DragState = {
  stopIdx: number;
  pointerOffsetPx: number;
  daysSpan: number;
};

export function YearBand({
  state,
  setState,
  destinations,
  selectedStopIdx,
  onSelectStop,
}: {
  state: TripStateV2;
  setState: (updater: (prev: TripStateV2) => TripStateV2) => void;
  destinations: DestLite[];
  selectedStopIdx: number | null;
  onSelectStop: (idx: number | null) => void;
}) {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [dragState, setDragState] = useState<DragState | null>(null);
  // Tracks the current band width in CSS pixels; recomputed on resize so the
  // doy → x mapping stays accurate. The viewBox is doy-space (0..365) which
  // means SVG handles the scaling — we only need px width for drag math.
  const [bandWidthPx, setBandWidthPx] = useState<number>(0);

  const destMap = useMemo(() => new Map(destinations.map((d) => [d.id, d])), [destinations]);

  // Resize observer keeps drag math in sync when the rail collapses or
  // viewport changes. ResizeObserver beats window resize because it fires
  // when CSS grid columns change too.
  useEffect(() => {
    const el = svgRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const w = entries[0]?.contentRect.width ?? 0;
      setBandWidthPx(w);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Build pass overlays for the destinations currently in the trip. Each pass
  // is shown once even if multiple stops touch it — the alert text identifies
  // which stop.
  const passOverlays = useMemo(() => {
    const seen = new Set<string>();
    const out: { slug: string; name: string; openDoy: number; closeDoy: number }[] = [];
    for (const stop of state.stops) {
      const passes = PASSES_BY_DEST[stop.destinationId] ?? [];
      for (const p of passes) {
        if (seen.has(p.slug)) continue;
        seen.add(p.slug);
        out.push({ slug: p.slug, name: p.name, openDoy: p.season_open_doy, closeDoy: p.season_close_doy });
      }
    }
    return out;
  }, [state.stops]);

  // Festival pins: collapse to one pin per (destination, month) so a dest
  // with 4 festivals in March doesn't crowd the band.
  const festivalPins = useMemo(() => {
    const pins: { doy: number; destName: string; festivals: string[] }[] = [];
    const byMonth = new Map<string, { destName: string; festivals: string[] }>();
    for (const stop of state.stops) {
      const dest = destMap.get(stop.destinationId);
      const festivals = dest?.festivals ?? [];
      for (const f of festivals) {
        if (f.month == null) continue;
        const key = `${stop.destinationId}-${f.month}`;
        const existing = byMonth.get(key);
        if (existing) {
          if (!existing.festivals.includes(f.name)) existing.festivals.push(f.name);
        } else {
          byMonth.set(key, { destName: dest?.name ?? stop.destinationId, festivals: [f.name] });
        }
      }
    }
    for (const [key, val] of byMonth) {
      const monthStr = key.split("-").pop() ?? "1";
      const month = parseInt(monthStr, 10);
      pins.push({ doy: monthCenterDoy(month), destName: val.destName, festivals: val.festivals });
    }
    return pins;
  }, [state.stops, destMap]);

  // ---- Drag handlers --------------------------------------------------------
  // Math: 365 day-units span bandWidthPx pixels. So 1 day = bandWidthPx / 365.
  // Stop pill width in days = stop.days; in px = stop.days * dayWidth.
  // Pointer offset is the delta between pointer mousedown x and the pill's
  // left edge, captured at drag start so the pill doesn't jump-snap.

  const handlePointerDown = useCallback(
    (e: React.PointerEvent<SVGRectElement>, stopIdx: number) => {
      e.preventDefault();
      const rect = svgRef.current?.getBoundingClientRect();
      if (!rect || !state.stops[stopIdx]) return;
      const dayWidth = rect.width / 365;
      const stopXLeft = (state.stops[stopIdx].startDay - 1) * dayWidth;
      const pointerXInBand = e.clientX - rect.left;
      const offsetPx = pointerXInBand - stopXLeft;
      setDragState({
        stopIdx,
        pointerOffsetPx: offsetPx,
        daysSpan: state.stops[stopIdx].days,
      });
      onSelectStop(stopIdx);
      // Capture so we keep getting moves even if pointer leaves the rect.
      (e.currentTarget as Element).setPointerCapture(e.pointerId);
    },
    [state.stops, onSelectStop]
  );

  // Window-level pointermove + pointerup so drags survive cursor leaving the
  // SVG. The pointer-capture in handlePointerDown is belt-and-braces — most
  // browsers honour it but window listeners are the safety net.
  useEffect(() => {
    if (!dragState) return;
    const handleMove = (e: PointerEvent) => {
      const rect = svgRef.current?.getBoundingClientRect();
      if (!rect) return;
      const dayWidth = rect.width / 365;
      const pointerXInBand = e.clientX - rect.left;
      const newLeftPx = pointerXInBand - dragState.pointerOffsetPx;
      const rawStartDay = Math.round(newLeftPx / dayWidth) + 1;
      const maxStart = Math.max(1, 365 - dragState.daysSpan + 1);
      const clamped = Math.max(1, Math.min(maxStart, rawStartDay));
      setState((prev) => {
        const stops = prev.stops.slice();
        const cur = stops[dragState.stopIdx];
        if (!cur || cur.startDay === clamped) return prev;
        stops[dragState.stopIdx] = { ...cur, startDay: clamped };
        // Keep month derived from earliest stop so legacy filters still work.
        const earliest = stops.reduce((min, s) => Math.min(min, s.startDay), Infinity);
        const newMonth = doyToMonth(earliest);
        return { ...prev, stops, month: newMonth };
      });
    };
    const handleUp = () => setDragState(null);
    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerup", handleUp);
    window.addEventListener("pointercancel", handleUp);
    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerup", handleUp);
      window.removeEventListener("pointercancel", handleUp);
    };
  }, [dragState, setState]);

  // ---- Render ---------------------------------------------------------------
  // viewBox uses 365 day-units wide × 100 unit tall. SVG scales freely.

  const ROW_TOP = 38;
  const ROW_HEIGHT = 28;

  return (
    <div className="select-none" data-yearband>
      <svg
        ref={svgRef}
        viewBox="0 0 365 100"
        preserveAspectRatio="none"
        className="block h-[100px] w-full touch-none"
        role="img"
        aria-label="Trip year band — drag stops to reschedule"
      >
        <defs>
          <pattern
            id="pass-hatch"
            width={2}
            height={4}
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(45)"
          >
            <rect width={2} height={4} fill="rgba(16, 185, 129, 0.18)" />
            <line x1={0} y1={0} x2={0} y2={4} stroke="rgba(16, 185, 129, 0.5)" strokeWidth={0.5} />
          </pattern>
        </defs>

        {/* Month grid header — alternating fill so months read at a glance. */}
        {MONTH_LABELS.map((label, i) => {
          const x = MONTH_STARTS[i] - 1;
          const w = MONTH_STARTS[i + 1] - MONTH_STARTS[i];
          const isAlt = i % 2 === 0;
          return (
            <g key={label}>
              <rect
                x={x}
                y={0}
                width={w}
                height={20}
                fill={isAlt ? "rgba(0,0,0,0.04)" : "transparent"}
              />
              <text
                x={x + w / 2}
                y={13}
                fontSize={6}
                textAnchor="middle"
                fill="currentColor"
                style={{ fontFamily: "var(--font-geist-mono, monospace)", letterSpacing: "0.16em" }}
                className="text-muted-foreground"
              >
                {label}
              </text>
              <line
                x1={x}
                y1={20}
                x2={x}
                y2={100}
                stroke="currentColor"
                strokeOpacity={0.08}
                strokeWidth={0.4}
              />
            </g>
          );
        })}
        {/* Right edge */}
        <line x1={365} y1={20} x2={365} y2={100} stroke="currentColor" strokeOpacity={0.08} strokeWidth={0.4} />

        {/* Pass open windows — green hatched bands above the stop row. */}
        {passOverlays.map((p) => {
          const x = p.openDoy - 1;
          const w = Math.max(1, p.closeDoy - p.openDoy + 1);
          return (
            <g key={p.slug}>
              <rect
                x={x}
                y={22}
                width={w}
                height={12}
                fill="url(#pass-hatch)"
                opacity={0.9}
              >
                <title>{`${p.name} — open ${doyLabel(p.openDoy)} → ${doyLabel(p.closeDoy)}`}</title>
              </rect>
            </g>
          );
        })}

        {/* Festival pins — small terracotta diamonds on month centers. */}
        {festivalPins.map((pin, i) => (
          <g key={`${pin.destName}-${pin.doy}-${i}`}>
            <polygon
              points={`${pin.doy - 1},${ROW_TOP - 4} ${pin.doy + 1},${ROW_TOP - 4} ${pin.doy},${ROW_TOP - 1}`}
              fill="rgb(180, 83, 9)"
            >
              <title>{`${pin.destName}: ${pin.festivals.join(", ")}`}</title>
            </polygon>
          </g>
        ))}

        {/* Stop pills — draggable. Layered after overlays so pills are on top. */}
        {state.stops.map((stop, idx) => {
          const dest = destMap.get(stop.destinationId);
          const x = stop.startDay - 1;
          const w = Math.max(1, stop.days);
          const isSelected = selectedStopIdx === idx;
          const fill = isSelected ? "rgb(15, 23, 42)" : "rgb(30, 41, 59)";
          return (
            <g key={`${stop.destinationId}-${idx}`} style={{ cursor: dragState?.stopIdx === idx ? "grabbing" : "grab" }}>
              <rect
                x={x}
                y={ROW_TOP}
                width={w}
                height={ROW_HEIGHT}
                fill={fill}
                stroke={isSelected ? "rgb(245, 158, 11)" : "rgba(255,255,255,0.12)"}
                strokeWidth={isSelected ? 1.2 : 0.4}
                rx={1.5}
                onPointerDown={(e) => handlePointerDown(e, idx)}
              >
                <title>{`#${idx + 1} ${dest?.name ?? stop.destinationId} · ${stop.days} day${stop.days === 1 ? "" : "s"} · starts ${doyLabel(stop.startDay)}`}</title>
              </rect>
              {/* Pill label — only render if there's room (≥ 8 days wide). */}
              {w >= 8 && (
                <text
                  x={x + 1.5}
                  y={ROW_TOP + ROW_HEIGHT / 2 + 1.8}
                  fontSize={5}
                  fill="white"
                  style={{ fontFamily: "var(--font-geist-mono, monospace)", pointerEvents: "none" }}
                >
                  #{String(idx + 1).padStart(2, "0")}
                </text>
              )}
            </g>
          );
        })}

        {/* Today marker — dashed vertical line at current doy. Helps the user
            see "this is now" vs. their planned dates. */}
        {(() => {
          const todayDoy = dayOfYear(new Date());
          return (
            <line
              x1={todayDoy}
              y1={20}
              x2={todayDoy}
              y2={100}
              stroke="rgb(220, 38, 38)"
              strokeWidth={0.5}
              strokeDasharray="1.5,1.5"
              opacity={0.6}
            >
              <title>{`Today · ${doyLabel(todayDoy)}`}</title>
            </line>
          );
        })()}
      </svg>

      {/* Legend — explains the three overlay types. Tracked-out caps to match
          Tour v2.1 / brand bible mono treatment. */}
      <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 px-1 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-2 w-2 bg-slate-700" />
          Stops
        </span>
        <span className="flex items-center gap-1.5">
          <span
            className="inline-block h-2 w-3"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg, rgba(16,185,129,0.5) 0 1px, rgba(16,185,129,0.18) 1px 3px)",
            }}
          />
          Pass open
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-2 w-2 rotate-45 bg-amber-700" />
          Festival
        </span>
        {bandWidthPx > 0 && (
          <span className="ml-auto text-[10px] normal-case text-muted-foreground/70">
            Drag pills to reschedule · scale 1d ≈ {(bandWidthPx / 365).toFixed(1)}px
          </span>
        )}
      </div>
    </div>
  );
}

// ---- Helpers ----------------------------------------------------------------

function doyToMonth(doy: number): number {
  for (let m = 1; m <= 12; m++) {
    if (doy < MONTH_STARTS[m]) return m;
  }
  return 12;
}

function doyLabel(doy: number): string {
  const month = doyToMonth(doy);
  const day = doy - MONTH_STARTS[month - 1] + 1;
  return `${MONTH_LABELS[month - 1]} ${day}`;
}

export type { TripStop };
