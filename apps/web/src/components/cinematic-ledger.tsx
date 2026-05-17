"use client";

/* ============================================================
   <CinematicLedger> — two-column ledger / fact table. Magazine
   data display: label on the left (mono caps, faint), value on
   the right (Fraunces italic OR mono numeric, bone). Hairline
   row separators. Optional brochure-vs-truth comparison columns
   for the tourist-traps "ledger" pattern.

   Variants:
     standard   — single value column. For costs, permits, etc.
     comparison — two value columns ("brochure" vs "real"), the
                  pattern lifted from /tourist-traps page.

   Usage:
     <CinematicLedger
       caption="Permits required"
       rows={[
         { label: "Inner Line Permit", value: "Required for Spiti" },
         { label: "Protected Area Permit", value: "Required for Nubra" },
       ]}
     />

     <CinematicLedger
       variant="comparison"
       columns={["Brochure says", "Reality"]}
       rows={[
         { label: "Crowd", values: ["Serene mountain retreat", "200+ tour buses daily"] },
       ]}
     />
   ============================================================ */

import type { ReactNode } from "react";

export type LedgerRow =
  | { label: string; value: ReactNode; values?: never }
  | { label: string; values: ReactNode[]; value?: never };

export type CinematicLedgerProps = {
  caption?: string;
  rows: LedgerRow[];
  variant?: "standard" | "comparison";
  /** Required when variant="comparison". Length must match `values` length per row. */
  columns?: string[];
};

export function CinematicLedger({
  caption,
  rows,
  variant = "standard",
  columns,
}: CinematicLedgerProps) {
  const isComparison = variant === "comparison";

  return (
    <div style={{ margin: "32px 0" }}>
      {caption && (
        <p
          className="nq-kicker"
          style={{
            color: "var(--vermillion)",
            marginBottom: 18,
            letterSpacing: "0.22em",
          }}
        >
          {caption}
        </p>
      )}

      <div
        role="table"
        aria-label={caption}
        style={{
          borderTop: "1px solid var(--hair)",
        }}
      >
        {/* Comparison header row */}
        {isComparison && columns && (
          <div
            role="row"
            style={{
              display: "grid",
              gridTemplateColumns: `minmax(140px, 1.2fr) ${columns.map(() => "minmax(0, 1fr)").join(" ")}`,
              gap: 24,
              padding: "14px 0",
              borderBottom: "1px solid var(--hair)",
            }}
          >
            <span />
            {columns.map((col, i) => (
              <span
                key={i}
                className="nq-mono"
                role="columnheader"
                style={{
                  fontFamily: "var(--cinema-mono)",
                  fontSize: 10,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: i === columns.length - 1 ? "var(--vermillion)" : "var(--bone-faint)",
                }}
              >
                {col}
              </span>
            ))}
          </div>
        )}

        {/* Body rows */}
        {rows.map((row, ri) => (
          <div
            key={ri}
            role="row"
            style={{
              display: "grid",
              gridTemplateColumns: isComparison
                ? `minmax(140px, 1.2fr) ${(row.values || []).map(() => "minmax(0, 1fr)").join(" ")}`
                : "minmax(140px, 1fr) minmax(0, 2fr)",
              gap: 24,
              padding: "16px 0",
              borderBottom: "1px solid var(--hair)",
              alignItems: "baseline",
            }}
          >
            <span
              className="nq-mono"
              role="rowheader"
              style={{
                fontFamily: "var(--cinema-mono)",
                fontSize: 11,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "var(--bone-faint)",
              }}
            >
              {row.label}
            </span>

            {isComparison && row.values
              ? row.values.map((v, vi) => (
                  <span
                    key={vi}
                    role="cell"
                    style={{
                      fontFamily: "var(--cinema-ui)",
                      fontSize: 14,
                      lineHeight: 1.55,
                      color: vi === (row.values?.length ?? 1) - 1 ? "var(--bone)" : "var(--bone-dim)",
                    }}
                  >
                    {v}
                  </span>
                ))
              : (
                  <span
                    role="cell"
                    style={{
                      fontFamily: "var(--cinema-ui)",
                      fontSize: 14,
                      lineHeight: 1.55,
                      color: "var(--bone)",
                    }}
                  >
                    {row.value}
                  </span>
                )}
          </div>
        ))}
      </div>
    </div>
  );
}
