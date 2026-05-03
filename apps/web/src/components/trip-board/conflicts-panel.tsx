"use client";

// ConflictsPanel — design-matched.
// Mirrors nakshiq-design-system/project/trip-board/TripBoard.jsx ConflictsPanel.
// Lives inside the right-rail aside hosted by CostPanel. Click on a conflict
// scrolls to + flashes the offending stop card; permit conflicts also fire
// onPermitClick to launch the in-board PermitDialog.

import { type Conflict, scan } from "@/lib/permit-checker";
import type { LogisticsRow } from "@/lib/cost-aggregator";
import type { TripStop } from "@/lib/trip-storage";

const KIND_COLOR: Record<Conflict["kind"], string> = {
  pass: "var(--score-1)",
  festival: "var(--accent)",
  permit: "var(--score-3)",
};

export function ConflictsPanel({
  stops,
  rowsByDest,
  onPermitClick,
}: {
  stops: TripStop[];
  rowsByDest: Record<string, LogisticsRow>;
  onPermitClick: (destId: string, destName: string) => void;
}) {
  const conflicts = scan(stops, rowsByDest);
  const total = conflicts.length;

  function handleClick(c: Conflict) {
    const card = document.querySelector<HTMLElement>(
      `[data-stop-card][data-stop-id="${CSS.escape(c.destinationId)}"]`,
    );
    if (card) {
      card.scrollIntoView({ behavior: "smooth", block: "center" });
      card.classList.add("nq-flash");
      setTimeout(() => card.classList.remove("nq-flash"), 1600);
    }
    if (c.kind === "permit") {
      onPermitClick(c.destinationId, c.destinationName);
    }
  }

  return (
    <div
      data-conflicts-panel
      data-conflicts-count={total}
      style={{ padding: "16px 22px", borderBottom: "1px solid var(--rule)" }}
    >
      <div className="nq-eyebrow" style={{ marginBottom: 8 }}>
        Conflicts · {total}
      </div>
      {total === 0 ? (
        <div style={{ fontSize: 12, color: "var(--score-5)" }}>
          ✓ No conflicts. Permits clear, passes open, no festival spikes.
        </div>
      ) : (
        conflicts.map((c, i) => (
          <div
            key={`${c.destinationId}-${c.kind}-${i}`}
            onClick={() => handleClick(c)}
            data-conflict-kind={c.kind}
            data-conflict-severity={c.severity}
            style={{
              fontSize: 11.5,
              marginBottom: 5,
              color: "var(--ink-2)",
              lineHeight: 1.4,
              cursor: "pointer",
            }}
          >
            <span
              style={{
                color: KIND_COLOR[c.kind],
                fontWeight: 700,
                fontSize: 10,
                marginRight: 6,
                textTransform: "uppercase",
              }}
            >
              {c.kind}
            </span>
            <span style={{ color: "var(--ink)" }}>{c.destinationName}</span>
            <span style={{ marginLeft: 4 }}>— {c.message}</span>
          </div>
        ))
      )}
    </div>
  );
}
