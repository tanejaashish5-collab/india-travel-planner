"use client";

// Trip Board atoms — design-matched.
// ScoreChip, MonthStrip, GlyphRail. Used by StopCard, Library, etc.
// Mirrors nakshiq-design-system/project/trip-board/TripBoard.jsx atoms.

export const MONTH_LABELS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
export const MONTH_DAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
export const MONTH_STARTS = [1, 32, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335, 366];

export function doyToMonth(doy: number): number {
  for (let m = 1; m <= 12; m++) {
    if (doy < MONTH_STARTS[m]) return m;
  }
  return 12;
}

export function doyLabel(doy: number): string {
  const month = doyToMonth(doy);
  const day = doy - MONTH_STARTS[month - 1] + 1;
  return `${MONTH_LABELS[month - 1]} ${day}`;
}

export function dateRangeLabel(startDay: number, days: number): string {
  return `${doyLabel(startDay)} – ${doyLabel(startDay + Math.max(1, days) - 1)}`;
}

export function ScoreChip({ s, label }: { s: number; label?: string }) {
  const clamped = Math.max(0, Math.min(5, s | 0));
  return (
    <span className={`nq-score nq-score-${clamped}`}>
      {clamped}/5
      {label ? <span style={{ opacity: 0.7, marginLeft: 3 }}>{label}</span> : null}
    </span>
  );
}

export function MonthStrip({
  months,
  activeIdx,
}: {
  months: number[];
  activeIdx: number;
}) {
  return (
    <div className="nq-months">
      {months.map((s, i) => (
        <span
          key={i}
          className={`nq-score-${Math.max(0, Math.min(5, s | 0))}`}
          style={{
            outline: i === activeIdx ? "1.5px solid var(--ink)" : "none",
            outlineOffset: -1,
          }}
        >
          {MONTH_LABELS[i][0]}{s}
        </span>
      ))}
    </div>
  );
}

export type GlyphRailFields = {
  network?: string | null;
  hospital?: string | null;
  access?: string | null;
  soloF?: number | null;
  kids?: number | null;
};

export function GlyphRail({ d }: { d: GlyphRailFields }) {
  const items: [string, string, string][] = [
    ["📶", "Network", d.network ?? "—"],
    ["🏥", "Medical", d.hospital ?? "—"],
    ["🚗", "Access", d.access ?? "—"],
    ["🛡", "Solo / Kids", `${d.soloF ?? "—"}/5 · K ${d.kids ?? "—"}/5`],
  ];
  return (
    <div className="nq-glyph-rail">
      {items.map(([icon, label, value]) => (
        <div key={label} className="nq-glyph">
          <div className="nq-glyph-icon">{icon}</div>
          <div className="nq-glyph-label">{label}</div>
          <div className="nq-glyph-value">{value}</div>
        </div>
      ))}
    </div>
  );
}

/** Per-month scores for a destination, padded to 12 entries (0 for unknown). */
export function monthlyScoreArray(
  destination_months: { month: number; score: number }[] | null | undefined,
): number[] {
  const out = new Array(12).fill(0) as number[];
  for (const r of destination_months ?? []) {
    if (r.month >= 1 && r.month <= 12) out[r.month - 1] = r.score ?? 0;
  }
  return out;
}
