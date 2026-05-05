"use client";

import { useEffect, useState } from "react";

/* ============================================================
   Kinetic — split-text per-character reveal.
   On `on=true`, each character translates from y:0.5em + skewY:6deg
   into resting position with a per-character stagger delay.
   ============================================================ */
export function Kinetic({
  text,
  on,
  stagger = 36,
  className,
  style,
}: {
  text: string;
  on: boolean;
  stagger?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <span style={{ display: "inline-block", ...style }} className={className}>
      {Array.from(text).map((ch, i) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            opacity: on ? 1 : 0,
            transform: on ? "translateY(0) skewY(0)" : "translateY(0.5em) skewY(6deg)",
            transition:
              "opacity .65s cubic-bezier(.2,.8,.2,1), transform .8s cubic-bezier(.2,.8,.2,1)",
            transitionDelay: `${i * stagger}ms`,
            whiteSpace: ch === " " ? "pre" : "normal",
          }}
        >
          {ch}
        </span>
      ))}
    </span>
  );
}

/* ============================================================
   useClock — IST-locale wall clock.
   Re-renders every second. Used for live timestamps in the masthead bar.
   ============================================================ */
export function useClock() {
  const [now, setNow] = useState<Date | null>(null);
  // Hydration guard: server renders `null`, then the client populates the Date
  // post-mount. This avoids a Date hydration mismatch (server's UTC vs client's
  // IST). The synchronous setState here is intentional and one-shot; the
  // 1Hz interval that follows is bounded and inexpensive.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return now;
}

const IST = "Asia/Kolkata";

export function fmtDate(d: Date | null): string {
  if (!d) return "";
  return d
    .toLocaleString("en-IN", {
      timeZone: IST,
      weekday: "short",
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
    .toUpperCase()
    .replace(/,/g, "");
}

export function fmtClock(d: Date | null): string {
  if (!d) return "";
  return d.toLocaleString("en-IN", {
    timeZone: IST,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

/* ============================================================
   formatVerifiedAt — cinema-format DB verified_at timestamps.
   "2026-05-04T06:42:00Z" → "VERIFIED MAY 04 06:42 IST"
   No fabricated editor names — see plan, locked decision.
   ============================================================ */
export function formatVerifiedAt(iso?: string | null): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  const date = d
    .toLocaleString("en-IN", {
      timeZone: IST,
      day: "2-digit",
      month: "short",
    })
    .toUpperCase()
    .replace(/,/g, "");
  const time = d.toLocaleString("en-IN", {
    timeZone: IST,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  return `VERIFIED ${date} · ${time} IST`;
}

/* ============================================================
   useCountUp — eased count from 0 → target when `on` flips true.
   Used by ScoreNum and stat counters.

   The effect ONLY runs when `on=true`; when `on=false` the hook returns 0
   directly instead of resetting state inside an effect (avoids the
   react-hooks/set-state-in-effect cascade-render warning).
   ============================================================ */
export function useCountUp(target: number, on: boolean, ms = 1400) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!on) return;
    const start = performance.now();
    let raf = 0;
    const ease = (t: number) => 1 - Math.pow(1 - t, 3);
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / ms);
      setV(target * ease(t));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [on, target, ms]);
  return on ? v : 0;
}

export function ScoreNum({
  to,
  on,
  ms = 1500,
  decimals = 1,
}: {
  to: number;
  on: boolean;
  ms?: number;
  decimals?: number;
}) {
  const v = useCountUp(to, on, ms);
  return <span className="nq-mono">{v.toFixed(decimals)}</span>;
}

/* ============================================================
   SectionLabel — the "ACT II · The Skip List" header used at the
   top of every act. Vermillion dot, Geist Mono uppercase, hairline
   stretch, optional right-side meta.
   ============================================================ */
export function SectionLabel({
  num,
  name,
  right,
}: {
  num: string;
  name: string;
  right?: string;
}) {
  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        gap: 14,
        marginBottom: 60,
      }}
    >
      <span
        style={{
          display: "inline-block",
          width: 8,
          height: 8,
          background: "var(--vermillion)",
          borderRadius: "50%",
        }}
      />
      <span className="nq-kicker" style={{ color: "var(--vermillion)" }}>
        {num} · {name}
      </span>
      <span style={{ flex: 1, height: 1, background: "var(--hair)" }} />
      {right && <span className="nq-meta">{right}</span>}
    </header>
  );
}

/* ============================================================
   Issue number — auto-derives from the launch month.
   Issue Nº 47 corresponds to May 2026 (= 47 months after launch
   2022-07-01). Update LAUNCH_DATE only if the editorial counter
   ever needs to reset.
   ============================================================ */
const LAUNCH_DATE = new Date("2022-07-01T00:00:00Z");

export function getIssueNumber(now: Date = new Date()): number {
  const months =
    (now.getUTCFullYear() - LAUNCH_DATE.getUTCFullYear()) * 12 +
    (now.getUTCMonth() - LAUNCH_DATE.getUTCMonth());
  return Math.max(1, months + 1);
}
