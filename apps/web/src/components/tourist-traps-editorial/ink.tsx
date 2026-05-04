"use client";
// Ink primitives — hand-drawn-feeling SVG marks for the Tourist Traps editorial.
// Ported from nakshiq-design-system/project/tourist-traps/ink.jsx.
// Every mark uses a slight wobble (jitter on path points) so it doesn't look
// CSS-generated. All accept ?seed for deterministic-but-varied output.

import * as React from "react";

const RED_PEN = "#e4593f";
const PEN_WIDTH = 2.2;

// Simple seeded PRNG so each instance jitters predictably (no hydration drift).
function rng(seed: number) {
  let s = seed * 9301 + 49297;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

// ─── Squiggle strikethrough ────────────────────────────────────────────────
function SquiggleStrike({
  width = 200,
  height = 28,
  seed = 1,
  color = RED_PEN,
  passes = 2,
}: {
  width?: number;
  height?: number;
  seed?: number;
  color?: string;
  passes?: number;
}) {
  const r = rng(seed);
  const paths: React.ReactNode[] = [];
  for (let p = 0; p < passes; p++) {
    const startY = height * (0.4 + r() * 0.2);
    const endY = height * (0.4 + r() * 0.2);
    const segs = 8;
    let d = `M ${r() * 4} ${startY}`;
    for (let i = 1; i <= segs; i++) {
      const x = (width * i) / segs + (r() - 0.5) * 6;
      const y = startY + (endY - startY) * (i / segs) + (r() - 0.5) * 5;
      const cx = (width * (i - 0.5)) / segs + (r() - 0.5) * 8;
      const cy = startY + (endY - startY) * ((i - 0.5) / segs) + (r() - 0.5) * 8;
      d += ` Q ${cx} ${cy}, ${x} ${y}`;
    }
    paths.push(
      <path
        key={p}
        d={d}
        stroke={color}
        strokeWidth={PEN_WIDTH - p * 0.4}
        fill="none"
        strokeLinecap="round"
        opacity={0.85 - p * 0.15}
      />,
    );
  }
  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      style={{ display: "block", overflow: "visible" }}
      aria-hidden="true"
    >
      {paths}
    </svg>
  );
}

// ─── Wavy underline ────────────────────────────────────────────────────────
function WavyUnderline({
  width = 200,
  height = 12,
  seed = 2,
  color = RED_PEN,
}: {
  width?: number;
  height?: number;
  seed?: number;
  color?: string;
}) {
  const r = rng(seed);
  const segs = Math.max(6, Math.floor(width / 18));
  const baseY = height * 0.55;
  let d = `M 0 ${baseY}`;
  for (let i = 1; i <= segs; i++) {
    const x = (width * i) / segs;
    const y = baseY + (i % 2 === 0 ? -1 : 1) * (2.5 + r() * 1.5);
    const cx = (width * (i - 0.5)) / segs;
    const cy = baseY + (i % 2 === 0 ? 2 : -2) * (2 + r() * 1.5);
    d += ` Q ${cx} ${cy}, ${x} ${y}`;
  }
  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      style={{ display: "block", overflow: "visible" }}
      aria-hidden="true"
    >
      <path
        d={d}
        stroke={color}
        strokeWidth={PEN_WIDTH - 0.4}
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

// ─── Stamp box (margin annotation) ─────────────────────────────────────────
// Hand-drawn rectangular stamp with content inside, slightly tilted.
export function StampBox({
  children,
  seed = 5,
  color = RED_PEN,
  tilt,
  width,
  padding = "12px 16px",
}: {
  children: React.ReactNode;
  seed?: number;
  color?: string;
  tilt?: number;
  width?: number | string;
  padding?: string;
}) {
  const r = rng(seed);
  const actualTilt = tilt !== undefined ? tilt : (r() - 0.5) * 4;
  const w = 100,
    h = 100;
  const j = () => (r() - 0.5) * 1.8;
  const d = [
    `M ${j()} ${j()}`,
    `L ${w + j()} ${j()}`,
    `L ${w + j()} ${h + j()}`,
    `L ${j()} ${h + j()}`,
    `Z`,
  ].join(" ");
  return (
    <div
      style={{
        position: "relative",
        display: "inline-block",
        transform: `rotate(${actualTilt}deg)`,
        padding,
        width,
      }}
    >
      <svg
        viewBox={`-3 -3 ${w + 6} ${h + 6}`}
        preserveAspectRatio="none"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
        aria-hidden="true"
      >
        <path
          d={d}
          stroke={color}
          strokeWidth="1.4"
          fill="none"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
    </div>
  );
}

// ─── Strikethrough wrapper ─────────────────────────────────────────────────
// Wraps inline text with an absolutely-positioned squiggle. Auto-sizes to
// the wrapped text via measurement on mount + ResizeObserver.
export function Struck({
  children,
  seed = 1,
  color,
}: {
  children: React.ReactNode;
  seed?: number;
  color?: string;
}) {
  const ref = React.useRef<HTMLSpanElement | null>(null);
  const [dims, setDims] = React.useState<{ w: number; h: number }>({ w: 0, h: 0 });

  React.useEffect(() => {
    if (!ref.current) return;
    const measure = () => {
      const rect = ref.current?.getBoundingClientRect();
      if (rect) setDims({ w: rect.width, h: rect.height });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, [children]);

  return (
    <span style={{ position: "relative", display: "inline-block" }}>
      <span ref={ref}>{children}</span>
      {dims.w > 0 && (
        <span
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            pointerEvents: "none",
          }}
        >
          <SquiggleStrike
            width={dims.w}
            height={dims.h}
            seed={seed}
            color={color}
          />
        </span>
      )}
    </span>
  );
}

// ─── Underlined wrapper ────────────────────────────────────────────────────
export function Underlined({
  children,
  seed = 2,
  color,
}: {
  children: React.ReactNode;
  seed?: number;
  color?: string;
}) {
  const ref = React.useRef<HTMLSpanElement | null>(null);
  const [w, setW] = React.useState(0);

  React.useEffect(() => {
    if (!ref.current) return;
    const measure = () => {
      const rect = ref.current?.getBoundingClientRect();
      if (rect) setW(rect.width);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, [children]);

  return (
    <span style={{ position: "relative", display: "inline-block" }}>
      <span ref={ref}>{children}</span>
      {w > 0 && (
        <span
          style={{
            position: "absolute",
            left: 0,
            top: "100%",
            marginTop: -2,
            pointerEvents: "none",
          }}
        >
          <WavyUnderline width={w} height={10} seed={seed} color={color} />
        </span>
      )}
    </span>
  );
}
