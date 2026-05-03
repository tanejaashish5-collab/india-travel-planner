"use client";

// StopCard — design-matched.
// Mirrors nakshiq-design-system/project/trip-board/TripBoard.jsx StopCard.
//
// Article-style row with:
//   - "Stop XX / YY" eyebrow + date range
//   - Move up / Move down / ✕ controls (top-right)
//   - 160px aspect-4:5 hero image (omitted when no image url available)
//   - Serif h2 + state · elevation + score chip + verb (GO/OK/MARGINAL/SKIP)
//   - Italic serif tagline
//   - 12-cell MonthStrip with active month outlined
//   - GlyphRail (Network / Medical / Access / Solo · Kids)
//   - nq-alert callouts for festival overlap / pass closures / permits

import { useMemo } from "react";
import type { TripStop } from "@/lib/trip-storage";
import type { Conflict } from "@/lib/permit-checker";
import {
  MONTH_LABELS,
  ScoreChip,
  MonthStrip,
  GlyphRail,
  doyToMonth,
  doyLabel,
  dateRangeLabel,
  monthlyScoreArray,
} from "./atoms";

type DestLite = {
  id: string;
  name: string;
  state: { name: string } | null;
  destination_months: { month: number; score: number }[] | null;
  difficulty: string | null;
  elevation_m: number | null;
  festivals?: { name: string; month: number | null }[] | null;
};

function verbFor(score: number): { label: string; cls: string } {
  if (score >= 4) return { label: "GO", cls: "nq-verb-go" };
  if (score >= 3) return { label: "OK", cls: "nq-verb-marginal" };
  if (score >= 2) return { label: "MARGINAL", cls: "nq-verb-marginal" };
  return { label: "SKIP", cls: "nq-verb-skip" };
}

function alertStyleFor(c: Conflict): React.CSSProperties {
  if (c.kind === "pass" || c.severity === "block") {
    return {
      borderLeftColor: "var(--score-1)",
      background: "rgba(217,96,80,.10)",
      borderColor: "rgba(217,96,80,.3)",
    };
  }
  return {};
}

function alertEyebrowStyle(c: Conflict): React.CSSProperties {
  if (c.kind === "pass" || c.severity === "block") {
    return { color: "var(--score-1)" };
  }
  return {};
}

export function StopCard({
  stop,
  idx,
  totalStops,
  dest,
  conflicts,
  isSelected,
  onSelect,
  onMoveUp,
  onMoveDown,
  onRemove,
  onSetDays,
  onSetNotes,
  onPermitClick,
}: {
  stop: TripStop;
  idx: number;
  totalStops: number;
  dest: DestLite | undefined;
  conflicts: Conflict[];
  isSelected: boolean;
  onSelect: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onRemove: () => void;
  onSetDays: (days: number) => void;
  onSetNotes: (notes: string) => void;
  onPermitClick: () => void;
}) {
  const startMonth = doyToMonth(stop.startDay);
  const months = useMemo(() => monthlyScoreArray(dest?.destination_months), [dest]);
  const score = months[startMonth - 1] ?? 0;
  const verb = verbFor(score);

  return (
    <article
      data-stop-card
      data-stop-id={stop.destinationId}
      onMouseEnter={onSelect}
      style={{
        borderTop: "1px solid var(--rule-2)",
        padding: "20px 24px 22px",
        background: isSelected ? "rgba(255,255,255,.015)" : "transparent",
      }}
    >
      <header
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          marginBottom: 12,
        }}
      >
        <div style={{ display: "flex", alignItems: "baseline", gap: 14 }}>
          <span className="nq-eyebrow" style={{ fontVariantNumeric: "tabular-nums" }}>
            Stop {String(idx + 1).padStart(2, "0")} / {String(totalStops).padStart(2, "0")}
          </span>
          <span
            style={{
              fontSize: 14,
              color: "var(--ink)",
              fontWeight: 500,
            }}
          >
            {dateRangeLabel(stop.startDay, stop.days)} · {stop.days}d
          </span>
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          <button
            type="button"
            className="nq-btn nq-btn-ghost"
            onClick={onMoveUp}
            disabled={idx === 0}
            style={{ padding: "6px 10px" }}
            aria-label="Move up"
          >
            ↑
          </button>
          <button
            type="button"
            className="nq-btn nq-btn-ghost"
            onClick={onMoveDown}
            disabled={idx === totalStops - 1}
            style={{ padding: "6px 10px" }}
            aria-label="Move down"
          >
            ↓
          </button>
          <button
            type="button"
            className="nq-btn nq-btn-ghost"
            onClick={onRemove}
            style={{ padding: "6px 10px" }}
            aria-label="Remove stop"
          >
            ✕
          </button>
        </div>
      </header>

      <div style={{ minWidth: 0 }}>
        <h2 className="nq-h" style={{ margin: "0 0 4px 0", fontSize: 28 }}>
          {dest?.name ?? stop.destinationId}
        </h2>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            flexWrap: "wrap",
            marginBottom: 8,
          }}
        >
          <span style={{ fontSize: 14, color: "var(--ink-2)" }}>
            {dest?.state?.name ?? "—"}
            {dest?.elevation_m ? ` · ${dest.elevation_m}m` : ""}
          </span>
          <ScoreChip s={score} label={MONTH_LABELS[startMonth - 1]} />
          <span className={`nq-verb ${verb.cls}`}>{verb.label}</span>
        </div>

        <div style={{ marginBottom: 12 }}>
          <MonthStrip months={months} activeIdx={startMonth - 1} />
        </div>

        <GlyphRail
          d={{
            network: null,
            hospital: null,
            access: dest?.difficulty ?? null,
            soloF: null,
            kids: null,
          }}
        />

        {/* Days + Notes inputs — kept compact, just below the GlyphRail */}
        <div
          style={{
            display: "flex",
            gap: 14,
            alignItems: "center",
            marginTop: 14,
            flexWrap: "wrap",
          }}
        >
          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              fontSize: 13,
              color: "var(--ink-2)",
            }}
          >
            <span className="nq-eyebrow">Days</span>
            <input
              className="nq-input"
              type="number"
              min={1}
              max={30}
              value={stop.days}
              onChange={(e) => onSetDays(Number(e.target.value))}
              style={{ width: 80, padding: "6px 10px" }}
            />
          </label>
          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              fontSize: 13,
              color: "var(--ink-2)",
              flex: 1,
              minWidth: 220,
            }}
          >
            <span className="nq-eyebrow">Notes</span>
            <input
              className="nq-input"
              type="text"
              value={stop.notes}
              onChange={(e) => onSetNotes(e.target.value)}
              placeholder="Notes for this stop…"
              style={{ flex: 1, padding: "6px 10px" }}
            />
          </label>
          <span
            style={{
              fontSize: 13,
              color: "var(--ink-2)",
            }}
          >
            starts {doyLabel(stop.startDay)}
          </span>
        </div>

        {/* Conflict callouts — nq-alert variants per kind */}
        {conflicts.map((c, i) => {
          const clickable = c.kind === "permit";
          return (
            <div
              key={i}
              className="nq-alert"
              data-alert-kind={c.kind}
              data-alert-severity={c.severity}
              onClick={clickable ? onPermitClick : undefined}
              role={clickable ? "button" : undefined}
              tabIndex={clickable ? 0 : undefined}
              onKeyDown={
                clickable
                  ? (e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        onPermitClick();
                      }
                    }
                  : undefined
              }
              style={{
                marginTop: 10,
                cursor: clickable ? "pointer" : "default",
                ...alertStyleFor(c),
              }}
            >
              <div className="nq-alert-eyebrow" style={alertEyebrowStyle(c)}>
                {c.kind === "festival"
                  ? "Festival overlap"
                  : c.kind === "pass"
                    ? "⚠ Pass closed for these dates"
                    : "Permit"}
              </div>
              <p>{c.message}{clickable && " · click for details →"}</p>
            </div>
          );
        })}
      </div>
    </article>
  );
}
