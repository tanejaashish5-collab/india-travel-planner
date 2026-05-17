"use client";

/* ============================================================
   <CinematicPagination> — magazine-style page indicator with
   prev/next + zero-padded mono counter ("01 / 24"). For any list
   page using ListPageTemplate (blog, routes, treks, festivals).

   Visual: bone-on-paper, hairline border-top, mono numerics. No
   page-number bubbles — too SaaS. Just prev · "01 / 24" · next.
   Page-jump dropdown appears on hover for >5-page sets so power
   users can jump without clicking through.

   Usage:
     <CinematicPagination
       current={3}
       total={24}
       basePath="/en/blog"
     />
   ============================================================ */

import { useState } from "react";

export type CinematicPaginationProps = {
  current: number;
  total: number;
  /** e.g. "/en/blog" — page numbers append as "?page=2". */
  basePath: string;
};

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function href(basePath: string, page: number) {
  if (page === 1) return basePath;
  return `${basePath}?page=${page}`;
}

export function CinematicPagination({ current, total, basePath }: CinematicPaginationProps) {
  const [open, setOpen] = useState(false);

  if (total <= 1) return null;

  const prev = current > 1 ? current - 1 : null;
  const next = current < total ? current + 1 : null;

  return (
    <nav
      aria-label="Pagination"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 24,
        marginTop: 80,
        paddingTop: 32,
        borderTop: "1px solid var(--hair)",
        fontFamily: "var(--cinema-mono)",
      }}
    >
      {/* Prev */}
      {prev ? (
        <a
          href={href(basePath, prev)}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            fontSize: 11,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "var(--bone)",
            textDecoration: "none",
            padding: "10px 0",
            transition: "color 200ms ease",
          }}
        >
          <span aria-hidden style={{ color: "var(--vermillion)" }}>←</span>
          <span>Previous</span>
        </a>
      ) : (
        <span
          style={{
            fontSize: 11,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "var(--bone-faint)",
          }}
        >
          ← Previous
        </span>
      )}

      {/* Counter — with hover jump-to (for >5 page sets) */}
      <div
        style={{ position: "relative" }}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        <span
          className="nq-mono"
          style={{
            fontSize: 14,
            letterSpacing: "0.12em",
            color: "var(--bone)",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          <span style={{ color: "var(--vermillion)" }}>{pad(current)}</span>
          <span style={{ color: "var(--bone-faint)", margin: "0 8px" }}>/</span>
          <span style={{ color: "var(--bone-dim)" }}>{pad(total)}</span>
        </span>

        {open && total > 5 && (
          <div
            role="menu"
            style={{
              position: "absolute",
              top: "calc(100% + 8px)",
              left: "50%",
              transform: "translateX(-50%)",
              background: "var(--paper-2)",
              border: "1px solid var(--hair)",
              padding: 8,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(36px, 1fr))",
              gap: 4,
              minWidth: 200,
              zIndex: 10,
            }}
          >
            {Array.from({ length: total }, (_, i) => i + 1).map((p) => (
              <a
                key={p}
                href={href(basePath, p)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "6px 8px",
                  fontSize: 12,
                  fontFamily: "var(--cinema-mono)",
                  textDecoration: "none",
                  color: p === current ? "var(--vermillion)" : "var(--bone-dim)",
                  background: p === current ? "rgba(229, 86, 66, 0.1)" : "transparent",
                  transition: "background 150ms ease, color 150ms ease",
                }}
              >
                {pad(p)}
              </a>
            ))}
          </div>
        )}
      </div>

      {/* Next */}
      {next ? (
        <a
          href={href(basePath, next)}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            fontSize: 11,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "var(--bone)",
            textDecoration: "none",
            padding: "10px 0",
            transition: "color 200ms ease",
          }}
        >
          <span>Next</span>
          <span aria-hidden style={{ color: "var(--vermillion)" }}>→</span>
        </a>
      ) : (
        <span
          style={{
            fontSize: 11,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "var(--bone-faint)",
          }}
        >
          Next →
        </span>
      )}
    </nav>
  );
}
