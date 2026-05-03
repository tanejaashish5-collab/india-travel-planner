"use client";

// SidebarPill — Claude-style sidebar collapse toggle.
// Mirrors design: 26×22px button with an SVG sidebar glyph (rounded rect +
// inner vertical bar on the toggled side). Used in BoardCanvas's top toolbar.

import { useState } from "react";

export function SidebarPill({
  side,
  collapsed,
  onClick,
}: {
  side: "left" | "right";
  collapsed: boolean;
  onClick: () => void;
}) {
  const isLeft = side === "left";
  const [hover, setHover] = useState(false);
  return (
    <button
      type="button"
      onClick={onClick}
      title={`${collapsed ? "Open" : "Close"} ${isLeft ? "library" : "aggregator"}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        all: "unset",
        cursor: "pointer",
        width: 26,
        height: 22,
        borderRadius: 4,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        color: hover ? "var(--ink)" : "var(--ink-3)",
        background: hover ? "var(--paper-3)" : "transparent",
        transition: "background .12s, color .12s",
      }}
    >
      <svg width="16" height="14" viewBox="0 0 16 14" fill="none">
        <rect x="1" y="1" width="14" height="12" rx="2" stroke="currentColor" strokeWidth="1.4" />
        <line
          x1={isLeft ? 5.5 : 10.5}
          y1="1"
          x2={isLeft ? 5.5 : 10.5}
          y2="13"
          stroke="currentColor"
          strokeWidth="1.4"
        />
      </svg>
    </button>
  );
}
