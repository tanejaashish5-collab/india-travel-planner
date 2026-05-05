"use client";

// YearBand — design-matched.
// Replaces the bare 365-day SVG with the editorial timeline from
// nakshiq-design-system/project/trip-board/TripBoard.jsx YearBand.
//
// Layout (top → bottom):
//   1. Month grid header — Jan 26 / Feb 26 / … in 9.5px tracked-out caps,
//      column widths weighted by month days (31/28/31/…).
//   2. Pass open band — height 14px, hatched green pattern with green
//      left/right borders per pass.
//   3. Festival pins row — height 22px, terracotta pins with emoji.
//   4. Stop pills track — one row per stop, draggable; label sits beside the
//      bar (flips left if it would overflow the right edge).
//   5. "now" indicator — vertical accent line at current doy.
//
// Drag math: pointer-capture + window-level move/up so drags survive cursor
// leaving the SVG. 1180px design width is the reference; in production we
// compute live bandWidth via getBoundingClientRect so the grid stays
// accurate at any container width.

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { TripStateV2, TripStop } from "@/lib/trip-storage";
import { PASSES_BY_DEST, dayOfYear } from "@/lib/passes";
import { formatScore } from "@itp/shared";

type DestLite = {
  id: string;
  name: string;
  state: { name: string } | null;
  destination_months: { month: number; score: number }[] | null;
  festivals?: { name: string; month: number | null }[] | null;
};

const MONTH_LABELS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const MONTH_DAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const MONTH_STARTS = [1, 32, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335, 366];

// Festival emoji from canonical names — fallback "🎉".
const FEST_EMOJI: Record<string, string> = {
  holi: "🌈", diwali: "🪔", deepavali: "🪔",
  losar: "🏔", hornbill: "🪶", ziro: "🎶", "ziro music": "🎶",
  pushkar: "🐪", kumbh: "🕉", sangai: "🦌",
  onam: "🌺", "rann utsav": "🐫", "magh bihu": "🌾",
  "makar sankranti": "🪁", "ladakh": "🏔",
  losoong: "🏔", saga: "🕉", "buddha purnima": "🪷",
};

function festEmoji(name: string): string {
  const k = name.toLowerCase();
  for (const key of Object.keys(FEST_EMOJI)) {
    if (k.includes(key)) return FEST_EMOJI[key];
  }
  return "🎉";
}

function monthCenterDoy(month: number): number {
  return MONTH_STARTS[month - 1] + Math.round(MONTH_DAYS[month - 1] / 2);
}

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

type DragState = {
  stopIdx: number;
  pointerOffsetDays: number;
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
  const bandRef = useRef<HTMLDivElement | null>(null);
  const [drag, setDrag] = useState<DragState | null>(null);
  const [bandWidth, setBandWidth] = useState<number>(1180);

  // ResizeObserver keeps drag math in sync as the rail collapses / viewport changes.
  useEffect(() => {
    const el = bandRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const w = entries[0]?.contentRect.width ?? 1180;
      setBandWidth(w);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const dayW = bandWidth / 365;
  const destMap = useMemo(() => new Map(destinations.map((d) => [d.id, d])), [destinations]);

  // Pass overlays — collapsed to one bar per pass.
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

  // Festival pins — one per (dest, month).
  const festivalPins = useMemo(() => {
    const pins: { doy: number; destName: string; festivalNames: string; emoji: string; firstName: string }[] = [];
    const byKey = new Map<string, { destName: string; festivals: string[] }>();
    for (const stop of state.stops) {
      const dest = destMap.get(stop.destinationId);
      const festivals = dest?.festivals ?? [];
      for (const f of festivals) {
        if (f.month == null) continue;
        const key = `${stop.destinationId}-${f.month}`;
        const existing = byKey.get(key);
        if (existing) {
          if (!existing.festivals.includes(f.name)) existing.festivals.push(f.name);
        } else {
          byKey.set(key, { destName: dest?.name ?? stop.destinationId, festivals: [f.name] });
        }
      }
    }
    for (const [key, val] of byKey) {
      const monthStr = key.split("-").pop() ?? "1";
      const month = parseInt(monthStr, 10);
      pins.push({
        doy: monthCenterDoy(month),
        destName: val.destName,
        festivalNames: val.festivals.join(", "),
        emoji: festEmoji(val.festivals[0]),
        firstName: val.festivals[0],
      });
    }
    return pins;
  }, [state.stops, destMap]);

  // ---- Drag handlers --------------------------------------------------------

  const onPillDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>, stopIdx: number) => {
      e.preventDefault();
      const rect = bandRef.current?.getBoundingClientRect();
      if (!rect || !state.stops[stopIdx]) return;
      const mouseDay = (e.clientX - rect.left) / dayW;
      const offsetDays = mouseDay - (state.stops[stopIdx].startDay - 1);
      setDrag({ stopIdx, pointerOffsetDays: offsetDays });
      onSelectStop(stopIdx);
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    },
    [dayW, state.stops, onSelectStop],
  );

  useEffect(() => {
    if (!drag) return;
    const onMove = (e: PointerEvent) => {
      const rect = bandRef.current?.getBoundingClientRect();
      if (!rect) return;
      const mouseDay = (e.clientX - rect.left) / rect.width * 365;
      setState((prev) => {
        const stops = prev.stops.slice();
        const cur = stops[drag.stopIdx];
        if (!cur) return prev;
        const newStart = Math.max(
          1,
          Math.min(365 - cur.days + 1, Math.round(mouseDay - drag.pointerOffsetDays) + 1),
        );
        if (cur.startDay === newStart) return prev;
        stops[drag.stopIdx] = { ...cur, startDay: newStart };
        const earliest = stops.reduce((min, s) => Math.min(min, s.startDay), Infinity);
        return { ...prev, stops, month: doyToMonth(earliest) };
      });
    };
    const onUp = () => setDrag(null);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
  }, [drag, setState]);

  const ROW_H = 28;
  const STOP_TRACK_H = state.stops.length * (ROW_H + 4) + 8;
  const todayDoy = dayOfYear(new Date());

  return (
    <div ref={bandRef} style={{ position: "relative", userSelect: "none", width: "100%" }} data-yearband>
      {/* Month grid header — column widths weighted by month days */}
      <div style={{ display: "grid", gridTemplateColumns: MONTH_DAYS.map((d) => `${d}fr`).join(" ") }}>
        {MONTH_LABELS.map((m, i) => (
          <div
            key={m}
            style={{
              borderLeft: i === 0 ? "none" : "1px solid var(--rule)",
              padding: "6px 8px",
            }}
          >
            <div className="nq-eyebrow" style={{ fontSize: 9.5 }}>{m} 26</div>
          </div>
        ))}
      </div>

      {/* Pass open bands */}
      <div
        style={{
          position: "relative",
          height: 14,
          borderTop: "1px solid var(--rule)",
          borderBottom: "1px solid var(--rule)",
          background: "rgba(121, 184, 122, 0.04)",
        }}
      >
        {passOverlays.map((p) => {
          const x = (p.openDoy - 1) * dayW;
          const w = Math.max(2, (p.closeDoy - p.openDoy) * dayW);
          return (
            <div
              key={p.slug}
              title={`${p.name} open ${doyLabel(p.openDoy)} → ${doyLabel(p.closeDoy)}`}
              style={{
                position: "absolute",
                left: x,
                width: w,
                top: 1,
                height: 12,
                background:
                  "repeating-linear-gradient(45deg, rgba(121,184,122,.18), rgba(121,184,122,.18) 3px, transparent 3px, transparent 6px)",
                borderLeft: "1.5px solid var(--score-5)",
                borderRight: "1.5px solid var(--score-5)",
                fontSize: 8.5,
                fontFamily: "var(--mono)",
                color: "var(--score-5)",
                paddingLeft: 4,
                lineHeight: "12px",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {p.name}
            </div>
          );
        })}
      </div>

      {/* Festival pins row */}
      <div style={{ position: "relative", height: 22, borderBottom: "1px solid var(--rule)" }}>
        {festivalPins.map((pin, i) => {
          const x = (pin.doy - 1) * dayW;
          const w = Math.max(8, dayW * 4);
          return (
            <div
              key={`${pin.destName}-${pin.doy}-${i}`}
              title={`${pin.destName}: ${pin.festivalNames}`}
              style={{
                position: "absolute",
                left: x,
                width: w,
                top: 4,
                height: 14,
                background: "var(--accent)",
                borderRadius: 2,
                fontSize: 9,
                color: "var(--paper)",
                fontWeight: 700,
                paddingLeft: 4,
                lineHeight: "14px",
                whiteSpace: "nowrap",
                overflow: "hidden",
                cursor: "help",
              }}
            >
              {pin.emoji} {pin.firstName}
            </div>
          );
        })}
      </div>

      {/* Stop pills track */}
      <div style={{ position: "relative", height: STOP_TRACK_H, paddingTop: 6 }}>
        {state.stops.map((stop, i) => {
          const dest = destMap.get(stop.destinationId);
          const x = (stop.startDay - 1) * dayW;
          const w = Math.max(8, stop.days * dayW);
          const monthIdx = doyToMonth(stop.startDay);
          const score =
            (dest?.destination_months ?? []).find((m) => m.month === monthIdx)?.score ?? 0;
          const color =
            score >= 4 ? "var(--score-5)" : score >= 3 ? "var(--score-3)" : "var(--score-1)";
          const bg =
            score >= 4
              ? "rgba(121,184,122,.22)"
              : score >= 3
                ? "rgba(216,182,96,.22)"
                : "rgba(217,96,80,.22)";
          // Flip label to the left of the pill if it would overflow the right edge.
          const flipLeft = x + w + 140 > bandWidth;
          const isDragging = drag?.stopIdx === i;
          const isSelected = selectedStopIdx === i;
          return (
            <div
              key={`${stop.destinationId}-${i}`}
              onPointerDown={(e) => onPillDown(e, i)}
              onClick={() => onSelectStop(i)}
              style={{
                position: "absolute",
                left: x,
                width: w,
                top: i * (ROW_H + 4) + 6,
                height: ROW_H,
                background: bg,
                border: `1.5px solid ${color}`,
                borderRadius: 3,
                cursor: isDragging ? "grabbing" : "grab",
                boxShadow: isDragging
                  ? "0 4px 12px rgba(0,0,0,.5)"
                  : isSelected
                    ? "0 0 0 1px var(--accent)"
                    : "none",
                zIndex: isDragging ? 10 : 1,
                touchAction: "none",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  [flipLeft ? "right" : "left"]: w + 6,
                  top: 1,
                  height: ROW_H - 2,
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  fontSize: 13,
                  color: "var(--ink)",
                  fontWeight: 600,
                  whiteSpace: "nowrap",
                  pointerEvents: "none",
                }}
              >
                <span style={{ fontSize: 12, color: "var(--ink-2)", fontWeight: 500 }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>{dest?.name ?? stop.destinationId}</span>
                <span
                  className={`nq-score nq-score-${Math.max(0, Math.min(5, score))}`}
                  style={{ padding: "2px 6px", fontSize: 11 }}
                >
                  {formatScore(score)}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* "now" indicator */}
      <div
        style={{
          position: "absolute",
          left: (todayDoy - 1) * dayW,
          top: 22,
          bottom: 0,
          width: 1,
          background: "var(--accent)",
          opacity: 0.35,
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -2,
            left: -22,
            fontSize: 8.5,
            color: "var(--accent)",
            fontFamily: "var(--mono)",
          }}
        >
          now
        </div>
      </div>
    </div>
  );
}

export type { TripStop };
