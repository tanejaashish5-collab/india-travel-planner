/* ============================================================
   Shared cinematic editorial helpers — used across the cinematic
   legal pages (about/methodology/etc.) and the cinematic destination
   template. Consolidating here so the visual vocabulary stays in
   sync; previously each page kept its own local copy.
   ============================================================ */

import type { CSSProperties, ReactNode, HTMLAttributes } from "react";

/* ============================================================
   Title — display heading helper that auto-vermillion-colors any
   trailing punctuation (. ? !). Single design-system primitive so
   "Manali." renders the period in vermillion and any future cinematic
   headline that ends in punctuation picks up the rule for free.

   Usage:  <Title as="h1" className="nq-display" style={{...}}>Manali.</Title>
   No trailing punctuation? It renders as a plain <Tag> — safe to apply
   broadly even on headlines that don't end in a mark.
   ============================================================ */
type TitleProps = {
  as?: "h1" | "h2" | "h3" | "h4";
  children: ReactNode;
} & Omit<HTMLAttributes<HTMLElement>, "children">;

// When children is a plain string, split off the trailing mark and
// vermillion-tint it. When children includes JSX (e.g. a smaller
// parenthetical from renderDisplayName) we still try to vermillion
// a literal trailing "." string node — that covers the standard
// `<Title>{renderDisplayName(name)}.</Title>` shape used on the
// destination hero.
export function Title({ as: Tag = "h1", children, ...rest }: TitleProps) {
  if (typeof children === "string") {
    const m = children.match(/^([\s\S]*?)([.?!]+)$/);
    if (!m) return <Tag {...rest}>{children}</Tag>;
    const [, body, mark] = m;
    return (
      <Tag {...rest}>
        {body}
        <span style={{ color: "var(--vermillion)" }}>{mark}</span>
      </Tag>
    );
  }
  if (Array.isArray(children)) {
    const last = children[children.length - 1];
    if (typeof last === "string" && /[.?!]+$/.test(last)) {
      const m = last.match(/^([\s\S]*?)([.?!]+)$/);
      if (m) {
        const [, body, mark] = m;
        return (
          <Tag {...rest}>
            {children.slice(0, -1)}
            {body}
            <span style={{ color: "var(--vermillion)" }}>{mark}</span>
          </Tag>
        );
      }
    }
  }
  return <Tag {...rest}>{children}</Tag>;
}

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
  href,
}: {
  title: string;
  body?: ReactNode;
  meta?: string;
  href?: string;
}) {
  const headRow = (
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
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: 14,
          whiteSpace: "nowrap",
        }}
      >
        {meta && (
          <span
            className="nq-mono"
            style={{
              fontSize: 12,
              color: "var(--bone-faint)",
              letterSpacing: "0.16em",
            }}
          >
            {meta}
          </span>
        )}
        {href && (
          <span
            aria-hidden
            className="nq-entry-arrow"
            style={{
              fontFamily: "var(--cinema-mono)",
              fontSize: 16,
              color: "var(--vermillion)",
              transition: "transform 220ms ease, color 220ms ease",
            }}
          >
            →
          </span>
        )}
      </div>
    </div>
  );

  const bodyEl = body ? (
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
  ) : null;

  if (href) {
    return (
      <a
        href={href}
        className="nq-entry-link"
        style={{
          display: "block",
          padding: "28px 0",
          borderTop: "1px solid var(--hair)",
          textDecoration: "none",
          color: "inherit",
          transition: "background 220ms ease",
        }}
      >
        {headRow}
        {bodyEl}
      </a>
    );
  }

  return (
    <div
      style={{
        padding: "28px 0",
        borderTop: "1px solid var(--hair)",
      }}
    >
      {headRow}
      {bodyEl}
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
