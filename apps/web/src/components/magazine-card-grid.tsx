/**
 * Conditional card layout — when there's exactly one item, render an
 * asymmetric magazine anchor (large card + vermillion-rule gutter chrome).
 * Otherwise render the standard auto-fit grid.
 *
 * Solves the "lone card sitting in a 2-col grid leaves a grey hole" problem
 * with two complementary fixes:
 *   - N=0 → renders nothing
 *   - N=1 → 1.5fr/1fr split: card on the left, editorial gutter on the right
 *           (vermillion left-rule + optional kicker/note/CTA passed via
 *           renderGutter prop). Eliminates the "padded lone card" feel that
 *           a 100%-width auto-fit grid creates when N=1.
 *   - N≥2 → auto-fit minmax grid (matches the site-wide pattern), with
 *           optional hair-rule gap mode for sections that want 1px dividers
 *           between cards.
 *
 * Server component — no client interactivity, ships zero JS.
 *
 * The gutter render slot deliberately accepts arbitrary JSX rather than a
 * structured shape — each section has its own editorial weight to fill the
 * gutter with (state name, monthly score, distance, one-line "why this
 * one"), and a structured prop would either over-fit one section or
 * under-fit all of them.
 */

import type { CSSProperties, ReactNode } from "react";

interface MagazineCardOrGridProps<T> {
  items: T[];
  renderCard: (item: T, idx: number) => ReactNode;
  /** When N=1 only — content for the right gutter (~40% width). */
  renderGutter?: (item: T) => ReactNode;
  /** Min card width for the auto-fit grid when N≥2. Default 240. */
  minCardWidth?: number;
  /** Gap between cards in the grid. Default 16. Set to 1 for hair-rule mode. */
  gap?: number;
  /**
   * Hair-rule mode — when gap=1, the parent background bleeds through as a
   * 1px divider. Pass the hair-bg colour here (default var(--hair)).
   */
  hairBackground?: string;
}

export function MagazineCardOrGrid<T>({
  items,
  renderCard,
  renderGutter,
  minCardWidth = 240,
  gap = 16,
  hairBackground = "var(--hair)",
}: MagazineCardOrGridProps<T>) {
  if (!items || items.length === 0) return null;

  // N=1 → asymmetric magazine anchor
  if (items.length === 1) {
    const item = items[0];
    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1.5fr) minmax(0, 1fr)",
          gap: 0,
          border: "1px solid var(--hair)",
          background: "var(--paper)",
        }}
      >
        <div style={{ borderRight: "1px solid var(--hair)" }}>
          {renderCard(item, 0)}
        </div>
        <div
          style={{
            padding: "24px 28px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            borderLeft: "3px solid var(--vermillion)",
            background: "rgba(229, 86, 66, 0.025)",
            minHeight: 120,
          }}
        >
          {renderGutter ? (
            renderGutter(item)
          ) : (
            <DefaultGutter />
          )}
        </div>
      </div>
    );
  }

  // N≥2 → auto-fit grid
  const gridStyle: CSSProperties = {
    display: "grid",
    gridTemplateColumns: `repeat(auto-fit, minmax(${minCardWidth}px, 1fr))`,
    gap,
    ...(gap <= 1
      ? {
          background: hairBackground,
          border: `1px solid ${hairBackground}`,
        }
      : {}),
  };

  return (
    <div style={gridStyle}>
      {items.map((item, i) => (
        <div key={i}>{renderCard(item, i)}</div>
      ))}
    </div>
  );
}

/** Quiet default gutter — used when the call-site doesn't pass renderGutter. */
function DefaultGutter() {
  return (
    <p
      className="nq-mono"
      style={{
        fontSize: 10,
        letterSpacing: "0.22em",
        textTransform: "uppercase",
        color: "var(--bone-faint)",
        margin: 0,
      }}
    >
      Just this one. Make it count.
    </p>
  );
}
