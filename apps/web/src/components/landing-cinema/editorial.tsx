/* ============================================================
   Shared cinematic editorial helpers — used across the cinematic
   legal pages (about/methodology/etc.) and the cinematic destination
   template. Consolidating here so the visual vocabulary stays in
   sync; previously each page kept its own local copy.
   ============================================================ */

import type { CSSProperties, ReactNode } from "react";

export const sectionStyle: CSSProperties = {
  maxWidth: 1100,
  margin: "0 auto 100px",
};

export function Prose({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        maxWidth: 720,
        margin: "0 auto",
        fontFamily: "var(--cinema-ui)",
        fontSize: 17,
        lineHeight: 1.75,
        color: "var(--bone-dim)",
        display: "flex",
        flexDirection: "column",
        gap: 18,
      }}
    >
      {children}
    </div>
  );
}

export function PullQuote({ children }: { children: ReactNode }) {
  return (
    <blockquote
      style={{
        maxWidth: 820,
        margin: "48px auto",
        padding: "0 32px",
        borderLeft: "3px solid var(--vermillion)",
        fontFamily: "var(--cinema-display)",
        fontStyle: "italic",
        fontWeight: 400,
        fontSize: 28,
        lineHeight: 1.35,
        letterSpacing: "-0.012em",
        color: "var(--bone)",
      }}
    >
      {children}
    </blockquote>
  );
}

export function EditorialEntry({
  title,
  body,
  meta,
}: {
  title: string;
  body?: ReactNode;
  meta?: string;
}) {
  return (
    <div
      style={{
        padding: "28px 0",
        borderTop: "1px solid var(--hair)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          gap: 16,
          marginBottom: body ? 10 : 0,
        }}
      >
        <h3
          style={{
            fontFamily: "var(--cinema-display)",
            fontStyle: "italic",
            fontWeight: 500,
            fontSize: 24,
            lineHeight: 1.25,
            letterSpacing: "-0.012em",
            color: "var(--bone)",
            margin: 0,
          }}
        >
          {title}
        </h3>
        {meta && (
          <span
            className="nq-mono"
            style={{
              fontSize: 12,
              color: "var(--bone-faint)",
              letterSpacing: "0.16em",
              whiteSpace: "nowrap",
            }}
          >
            {meta}
          </span>
        )}
      </div>
      {body && (
        <p
          style={{
            fontFamily: "var(--cinema-ui)",
            fontSize: 16,
            lineHeight: 1.7,
            color: "var(--bone-dim)",
            margin: 0,
          }}
        >
          {body}
        </p>
      )}
    </div>
  );
}

/* Editorial caption — tiny vermillion uppercase mono, used for
   "as of May 2026" / "verified 2 weeks ago" / data-freshness markers. */
export function EditorialCaption({
  children,
  align = "left",
}: {
  children: ReactNode;
  align?: "left" | "right" | "center";
}) {
  return (
    <p
      className="nq-meta"
      style={{
        fontFamily: "var(--cinema-mono)",
        fontSize: 11,
        color: "var(--bone-faint)",
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        margin: 0,
        textAlign: align,
      }}
    >
      {children}
    </p>
  );
}

/* Editorial CTA — primary (filled bone) and secondary (outline). */
export const ctaPrimary: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 14,
  padding: "18px 28px",
  background: "var(--bone)",
  color: "var(--paper)",
  fontFamily: "var(--cinema-ui)",
  fontWeight: 700,
  fontSize: 11,
  lineHeight: 1,
  textTransform: "uppercase",
  letterSpacing: "0.18em",
  textDecoration: "none",
};

export const ctaSecondary: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 14,
  padding: "18px 28px",
  background: "transparent",
  color: "var(--bone)",
  border: "1px solid var(--hair)",
  fontFamily: "var(--cinema-ui)",
  fontWeight: 700,
  fontSize: 11,
  lineHeight: 1,
  textTransform: "uppercase",
  letterSpacing: "0.18em",
  textDecoration: "none",
};
