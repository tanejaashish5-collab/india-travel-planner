"use client";

import { useEffect, useLayoutEffect, useState, useCallback, useRef } from "react";
import type { TourStats } from "@/lib/tour-stats";

/**
 * Guided tour v2 — MOAT-led narrative + animated spotlight system.
 *
 * Story arc (6 steps, ~75s reading):
 *   0. Welcome — "India travel content is broken; here's what we built"
 *   1. Honesty — Skip List with sourced pain + 'don't go in [month]' verdicts
 *   2. Scoring — 5,892 month-by-month verdicts, scored 0–5
 *   3. AI Plan — risk-mode picker (budget/comfort/safety) + iCal export
 *   4. Depth — every dest has receipts (named stays, prices, SOS, sourced)
 *   5. Commitment — free, no sponsored picks, CC BY 4.0 dataset, /corrections
 *
 * Real numbers come from <GuidedTour stats={...} /> — never hardcoded.
 *
 * Trigger paths:
 *   - First homepage visit (localStorage flag nakshiq_tour_v2 unset)
 *   - URL param ?tour=1 (clears flag, strips itself)
 *   - Window event 'nakshiq:tour-replay' (footer "Take the tour" link)
 *
 * Mobile (<md): stacked card from bottom, no spotlight (popover-beside-anchor
 * crowds a phone viewport). Mobile users still get the message via the card,
 * the step-progress dots, the counter-animated stat chips, and the color
 * accents. The honest tradeoff: mobile gets the substance, desktop gets the
 * spectacle.
 *
 * Keyboard: Esc dismisses · arrow-right/space/enter advances · arrow-left back.
 *
 * Versioned flag (v2 supersedes v1) so users who saw v1 see v2 once.
 */

const FLAG_KEY = "nakshiq_tour_v2";

type StepColor = "primary" | "red" | "amber" | "emerald";

type Step = {
  id: string;
  selector: string | null; // null → centered (no anchor)
  kicker: string;
  title: string;
  body: string;
  stats: { label: string; value: number; suffix?: string }[];
  color: StepColor;
  icon: string; // single glyph
};

// Step definitions are pure layout — actual numbers injected from props at
// render time so the tour stays current without code changes.
function buildSteps(s: TourStats): Step[] {
  return [
    {
      id: "welcome",
      selector: null,
      kicker: "WELCOME",
      title: "India travel content is broken. Here's what we built instead.",
      body:
        "Sponsored top-10 lists. Photos that lie about crowds. Phone numbers that don't connect. We took twelve months to fix it. 60-second tour?",
      stats: [
        { label: "destinations", value: s.destinations },
        { label: "states", value: 36 },
        { label: "places", value: s.places, suffix: "+" },
      ],
      color: "primary",
      icon: "✦",
    },
    {
      id: "honesty",
      selector: "[data-tour='learn-menu']",
      kicker: "THE HONEST LAYER",
      title: "We tell you what to skip — with receipts.",
      body:
        "Lonavala, Manali, Goa-Calangute, Nainital. Sourced pain points and verbatim complaints. Plus 'don't go to Kashmir in January' verdicts with specific reasons — frozen lakes, monsoon landslides, 45°C summers.",
      stats: [
        { label: "traps with depth", value: s.traps },
        { label: "sourced pain points", value: s.painPoints },
        { label: "skip-month verdicts", value: s.skipMonthVerdicts },
      ],
      color: "red",
      icon: "✕",
    },
    {
      id: "scoring",
      selector: "[data-tour='plan-menu']",
      kicker: "SCALE OF SCORING",
      title: "Every destination, every month — scored.",
      body:
        "Weather, crowds, road accessibility, festivals, altitude. Pick a month, see only the 4+ picks. Solo-female safety scored separately, family verdicts on top of that.",
      stats: [
        { label: "month verdicts", value: s.monthVerdicts },
        { label: "solo-female scored", value: s.soloFemaleScored },
        { label: "family verdicts", value: s.familyVerdicts },
      ],
      color: "amber",
      icon: "◐",
    },
    {
      id: "ai-plan",
      selector: "[data-tour='plan-cta']",
      kicker: "AI PLAN — IN 60 SECONDS",
      title: "Built for how people actually plan.",
      body:
        "Tell us where, when, who's going, your budget. We build day-by-day with named stays at real prices, hazard notes, and three risk modes — Budget, Comfort, Safety. Export the lot to iCal.",
      stats: [
        { label: "risk modes", value: 3 },
        { label: "routes", value: s.routes },
        { label: "treks", value: s.treks },
      ],
      color: "primary",
      icon: "⚡",
    },
    {
      id: "depth",
      selector: "[data-tour='dest-card']",
      kicker: "EVERY PAGE HAS THE RECEIPTS",
      title: "No fluff. Every claim has a date and a source.",
      body:
        "Day-by-day plans, named stays with prices, eateries, permits, road conditions, SOS contacts. Every number stamped 'verified {date}' — and we email the editor weekly when something drifts.",
      stats: [
        { label: "places", value: s.places, suffix: "+" },
        { label: "stays", value: s.stays },
        { label: "articles", value: s.articles },
      ],
      color: "emerald",
      icon: "◆",
    },
    {
      id: "commitment",
      selector: "[data-tour='search']",
      kicker: "THE COMMITMENT",
      title: "Free. No sponsored picks. Forever.",
      body:
        "We don't take affiliate kickbacks from hotels or tour operators. We publish the data as a CC BY 4.0 open dataset at /press. Spotted a wrong number? Every correction is logged at /corrections. ⌘K to find anything.",
      stats: [
        { label: "destinations bilingual (en + hi)", value: s.destinations },
      ],
      color: "primary",
      icon: "✓",
    },
  ];
}

const COLOR_TOKENS: Record<StepColor, { ring: string; bar: string; chipBg: string; chipText: string; iconBg: string; iconText: string }> = {
  primary: {
    ring: "rgb(229, 86, 66)",
    bar: "bg-primary",
    chipBg: "bg-primary/10",
    chipText: "text-primary",
    iconBg: "bg-primary/15",
    iconText: "text-primary",
  },
  red: {
    ring: "rgb(248, 113, 113)",
    bar: "bg-red-400",
    chipBg: "bg-red-500/10",
    chipText: "text-red-300",
    iconBg: "bg-red-500/15",
    iconText: "text-red-300",
  },
  amber: {
    ring: "rgb(251, 191, 36)",
    bar: "bg-amber-400",
    chipBg: "bg-amber-500/10",
    chipText: "text-amber-300",
    iconBg: "bg-amber-500/15",
    iconText: "text-amber-300",
  },
  emerald: {
    ring: "rgb(52, 211, 153)",
    bar: "bg-emerald-400",
    chipBg: "bg-emerald-500/10",
    chipText: "text-emerald-300",
    iconBg: "bg-emerald-500/15",
    iconText: "text-emerald-300",
  },
};

type Rect = { top: number; left: number; width: number; height: number };

function getRect(selector: string | null): Rect | null {
  if (!selector || typeof document === "undefined") return null;
  const el = document.querySelector(selector) as HTMLElement | null;
  if (!el) return null;
  const r = el.getBoundingClientRect();
  if (r.width === 0 && r.height === 0) return null;
  return { top: r.top, left: r.left, width: r.width, height: r.height };
}

function isMobile(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(max-width: 767px)").matches;
}

function isPWA(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(display-mode: standalone)").matches;
}

// Spotlight + 520px popover doesn't fit small screens or PWA standalone
// (which has no browser chrome to absorb overflow). Suppress entirely
// without burning the first-visit flag, so the user still sees the tour
// the first time they open NakshIQ on a wider browser.
function shouldSuppressTour(): boolean {
  return isMobile() || isPWA();
}

/**
 * Counts up from 0 → target over `duration`. Reset on target change.
 * Uses requestAnimationFrame and an ease-out curve.
 */
function useCounter(target: number, duration = 800): number {
  const [value, setValue] = useState(0);
  const startRef = useRef<number | null>(null);
  useEffect(() => {
    startRef.current = null;
    let raf = 0;
    const tick = (now: number) => {
      if (startRef.current === null) startRef.current = now;
      const elapsed = now - startRef.current;
      const t = Math.min(1, elapsed / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(target * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return value;
}

/**
 * Big-number stat tile. The headline number is the hero of each step;
 * the label sits below in muted small caps. Three-up grid on the popover.
 */
function StatTile({ value, label, suffix, color }: { value: number; label: string; suffix?: string; color: StepColor }) {
  const counted = useCounter(value, 1100);
  const tokens = COLOR_TOKENS[color];
  return (
    <div className={`flex flex-col gap-1 rounded-xl border border-white/[0.04] ${tokens.chipBg} px-3 py-3`}>
      <span className={`font-mono text-2xl font-bold tabular-nums leading-none ${tokens.chipText}`}>
        {counted.toLocaleString()}{suffix}
      </span>
      <span className="text-[10.5px] uppercase tracking-[0.06em] text-muted-foreground/75 leading-tight">
        {label}
      </span>
    </div>
  );
}

/**
 * Inline pill version for steps with only one stat (e.g. closing step).
 * Keeps the smaller chip for that case where a tile would feel oversized.
 */
function StatPill({ value, label, suffix, color }: { value: number; label: string; suffix?: string; color: StepColor }) {
  const counted = useCounter(value, 1100);
  const tokens = COLOR_TOKENS[color];
  return (
    <div className={`inline-flex items-baseline gap-2 rounded-full ${tokens.chipBg} px-4 py-2`}>
      <span className={`font-mono text-lg font-bold tabular-nums ${tokens.chipText}`}>
        {counted.toLocaleString()}{suffix}
      </span>
      <span className="text-xs text-muted-foreground/80">{label}</span>
    </div>
  );
}

export function GuidedTour({ stats }: { stats: TourStats }) {
  const STEPS = buildSteps(stats);
  const [active, setActive] = useState(false);
  const [stepIdx, setStepIdx] = useState(0);
  const [rect, setRect] = useState<Rect | null>(null);
  const [mobile, setMobile] = useState(false);

  const start = useCallback(() => {
    setStepIdx(0);
    setActive(true);
  }, []);

  const finish = useCallback((reason: "done" | "dismissed") => {
    try {
      localStorage.setItem(FLAG_KEY, reason);
    } catch {}
    setActive(false);
  }, []);

  // Boot
  useEffect(() => {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    const hasParam = url.searchParams.get("tour") === "1";
    setMobile(isMobile());

    // Suppress on mobile + PWA. Strip ?tour=1 if present so the URL doesn't
    // stay polluted, but don't open the tour and don't write the flag.
    if (shouldSuppressTour()) {
      if (hasParam) {
        url.searchParams.delete("tour");
        window.history.replaceState({}, "", url.toString());
      }
      return;
    }

    if (hasParam) {
      try { localStorage.removeItem(FLAG_KEY); } catch {}
      start();
      url.searchParams.delete("tour");
      window.history.replaceState({}, "", url.toString());
      return;
    }

    let flag: string | null = null;
    try { flag = localStorage.getItem(FLAG_KEY); } catch {}
    if (flag) return;

    const id = window.setTimeout(start, 800);
    return () => window.clearTimeout(id);
  }, [start]);

  // Replay event
  useEffect(() => {
    const handler = () => {
      // Honour the same gate — a desktop layout that resized to mobile after
      // first paint shouldn't be able to open the tour via the footer link.
      if (shouldSuppressTour()) return;
      try { localStorage.removeItem(FLAG_KEY); } catch {}
      start();
    };
    window.addEventListener("nakshiq:tour-replay", handler);
    return () => window.removeEventListener("nakshiq:tour-replay", handler);
  }, [start]);

  // Auto-scroll anchor into view on step change. Without this, late-tour
  // anchors (dest-card, search icon) stay below the fold and the spotlight
  // glows on a region the user can't see — popover sits in the centre but
  // points at nothing. Scroll first, re-measure after the scroll settles.
  useEffect(() => {
    if (!active) return;
    const step = STEPS[stepIdx];
    if (!step.selector) {
      // Centered step — scroll to top so the page background is consistent
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.querySelector(step.selector) as HTMLElement | null;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const inViewport = r.top >= 80 && r.bottom <= (window.innerHeight - 80);
    if (!inViewport) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, stepIdx]);

  // Measure anchor — re-run on step change + window changes
  useLayoutEffect(() => {
    if (!active) return;
    const step = STEPS[stepIdx];
    const update = () => setRect(getRect(step.selector));
    update();
    // After a smooth scroll there's no scrollend event in all browsers, so
    // re-measure a few times during the typical scroll window (~600ms).
    const t1 = window.setTimeout(update, 200);
    const t2 = window.setTimeout(update, 500);
    const t3 = window.setTimeout(update, 800);
    window.addEventListener("resize", update);
    window.addEventListener("scroll", update, { passive: true });
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", update);
    };
  // STEPS is rebuilt every render but step content is stable across renders
  // so referencing stepIdx is enough.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, stepIdx]);

  // Keyboard
  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") finish("dismissed");
      if (e.key === "ArrowRight" || e.key === " " || e.key === "Enter") {
        e.preventDefault();
        if (stepIdx < STEPS.length - 1) setStepIdx((i) => i + 1);
        else finish("done");
      }
      if (e.key === "ArrowLeft" && stepIdx > 0) setStepIdx((i) => i - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, stepIdx, finish]);

  if (!active) return null;

  const step = STEPS[stepIdx];
  const isLast = stepIdx === STEPS.length - 1;
  const tokens = COLOR_TOKENS[step.color];

  // ─── Mobile (stacked card, no spotlight) ───
  if (mobile) {
    return (
      <div
        className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-md flex items-end animate-tour-fade"
        role="dialog"
        aria-modal="true"
        aria-labelledby="tour-title"
      >
        <div
          className="w-full bg-card border-t border-white/[0.06] rounded-t-3xl p-6 relative overflow-hidden"
          style={{
            background: "linear-gradient(155deg, rgba(255,255,255,0.025) 0%, transparent 60%), color-mix(in oklab, var(--card) 92%, black)",
            boxShadow: "0 -20px 60px -10px rgba(0,0,0,0.55)",
          }}
        >
          <div className={`absolute left-0 top-0 bottom-0 w-[3px] ${tokens.bar}`} style={{ boxShadow: `0 0 20px ${tokens.ring}80` }} />
          <ProgressDots active={stepIdx} total={STEPS.length} color={step.color} />
          <div className="mt-4 flex items-start gap-3">
            <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${tokens.iconBg} text-xl ${tokens.iconText}`}>
              {step.icon}
            </div>
            <div className="min-w-0 flex-1">
              <p className={`text-[10.5px] font-bold uppercase tracking-[0.18em] ${tokens.chipText}`}>
                {step.kicker}
              </p>
              <h3 id="tour-title" className="mt-1 font-serif text-[20px] font-semibold text-foreground leading-[1.2] tracking-[-0.01em]">
                {step.title}
              </h3>
            </div>
            <button
              onClick={() => finish("dismissed")}
              className="text-muted-foreground/60 text-2xl leading-none hover:text-foreground"
              aria-label="Dismiss tour"
            >
              ×
            </button>
          </div>
          <p className="mt-4 text-[14px] text-muted-foreground leading-[1.6]">{step.body}</p>
          {step.stats.length > 1 && (
            <div className="mt-5 grid grid-cols-3 gap-2">
              {step.stats.map((s) => (
                <StatTile key={s.label} value={s.value} label={s.label} suffix={s.suffix} color={step.color} />
              ))}
            </div>
          )}
          {step.stats.length === 1 && (
            <div className="mt-5">
              <StatPill {...step.stats[0]} color={step.color} />
            </div>
          )}
          <div className="mt-6 flex items-center justify-between gap-3">
            <button
              onClick={() => (stepIdx === 0 ? finish("dismissed") : setStepIdx((i) => i - 1))}
              className="text-[13px] text-muted-foreground/70 hover:text-foreground"
            >
              {stepIdx === 0 ? "Skip" : "← Back"}
            </button>
            <button
              onClick={() => (isLast ? finish("done") : setStepIdx((i) => i + 1))}
              className="rounded-xl bg-foreground px-5 py-2.5 text-[13px] font-semibold text-background hover:opacity-90 transition-opacity"
              style={{ boxShadow: `0 8px 24px -6px ${tokens.ring}80` }}
            >
              {isLast ? "Got it" : "Next →"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ─── Desktop (spotlight + popover) ───
  const PAD = 10;
  const popoverPosition = computePopoverStyle(rect, step.selector ? "bottom" : "center");

  return (
    <div
      className="fixed inset-0 z-[100] animate-tour-fade"
      role="dialog"
      aria-modal="true"
      aria-labelledby="tour-title"
    >
      {/* Backdrop with cut-out spotlight */}
      <svg
        className="absolute inset-0 w-full h-full"
        style={{ filter: rect ? `drop-shadow(0 0 24px ${tokens.ring}33)` : undefined }}
      >
        <defs>
          <mask id="spotlight-mask">
            <rect width="100%" height="100%" fill="white" />
            {rect && (
              <rect
                x={Math.max(0, rect.left - PAD)}
                y={Math.max(0, rect.top - PAD)}
                width={rect.width + PAD * 2}
                height={rect.height + PAD * 2}
                rx={14}
                ry={14}
                fill="black"
                style={{ transition: "all 360ms cubic-bezier(0.22, 1, 0.36, 1)" }}
              />
            )}
          </mask>
          <radialGradient id="backdrop-gradient" cx="50%" cy="50%" r="80%">
            <stop offset="0%" stopColor="rgba(0,0,0,0.55)" />
            <stop offset="60%" stopColor="rgba(0,0,0,0.78)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0.92)" />
          </radialGradient>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill={rect ? "url(#backdrop-gradient)" : "rgba(0,0,0,0.85)"}
          mask={rect ? "url(#spotlight-mask)" : undefined}
        />
        {/* Glow ring around the spotlight */}
        {rect && (
          <>
            <rect
              x={Math.max(0, rect.left - PAD)}
              y={Math.max(0, rect.top - PAD)}
              width={rect.width + PAD * 2}
              height={rect.height + PAD * 2}
              rx={14}
              ry={14}
              fill="none"
              stroke={tokens.ring}
              strokeWidth={2}
              opacity={0.9}
              style={{ transition: "all 360ms cubic-bezier(0.22, 1, 0.36, 1)" }}
            />
            {/* Outer breath ring */}
            <rect
              x={Math.max(0, rect.left - PAD - 6)}
              y={Math.max(0, rect.top - PAD - 6)}
              width={rect.width + PAD * 2 + 12}
              height={rect.height + PAD * 2 + 12}
              rx={18}
              ry={18}
              fill="none"
              stroke={tokens.ring}
              strokeWidth={1}
              opacity={0.4}
              style={{
                transition: "all 360ms cubic-bezier(0.22, 1, 0.36, 1)",
                animation: "tour-breath 2s ease-in-out infinite",
                transformOrigin: "center",
              }}
            />
            {/* Step badge above spotlight */}
            <foreignObject
              x={rect.left + rect.width / 2 - 30}
              y={Math.max(0, rect.top - PAD - 30)}
              width={60}
              height={22}
            >
              <div
                className={`text-[10px] font-bold uppercase tracking-[0.14em] text-center rounded-full px-2 py-0.5 ${tokens.chipBg} ${tokens.chipText} border border-current/30`}
                style={{ width: "fit-content", margin: "0 auto" }}
              >
                {stepIdx + 1} / {STEPS.length}
              </div>
            </foreignObject>
          </>
        )}
      </svg>

      {/* Popover — premium card */}
      <div
        style={popoverPosition}
        className="absolute w-[520px] max-w-[92vw] pointer-events-auto animate-tour-pop"
      >
        {/* Outer halo — subtle gradient bloom in the step's accent colour */}
        <div
          aria-hidden
          className="absolute -inset-12 rounded-[40px] blur-2xl pointer-events-none"
          style={{
            background: `radial-gradient(closest-side, ${tokens.ring}26, transparent 70%)`,
          }}
        />

        <div
          className="relative rounded-[24px] border border-white/[0.06] bg-card/[0.92] backdrop-blur-2xl overflow-hidden"
          style={{
            background:
              "linear-gradient(155deg, rgba(255,255,255,0.025) 0%, rgba(255,255,255,0.008) 38%, transparent 75%), color-mix(in oklab, var(--card) 92%, black)",
            boxShadow:
              "0 30px 80px -10px rgba(0,0,0,0.55), 0 8px 24px -4px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.04)",
          }}
        >
          {/* Color bar */}
          <div className={`absolute left-0 top-0 bottom-0 w-[3px] ${tokens.bar}`} style={{ boxShadow: `0 0 24px ${tokens.ring}80` }} />

          {/* Shimmer overlay */}
          <div className="pointer-events-none absolute inset-0 opacity-25 mix-blend-overlay">
            <div
              className="absolute inset-y-0 -left-1/4 w-1/2"
              style={{
                background: `linear-gradient(90deg, transparent 0%, ${tokens.ring}50 50%, transparent 100%)`,
                animation: "tour-shimmer 3.2s ease-in-out infinite",
              }}
            />
          </div>

          <div className="relative pl-9 pr-7 py-7">
            {/* Header row */}
            <div className="flex items-start gap-4 mb-5">
              <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${tokens.iconBg} text-2xl ${tokens.iconText}`}
                style={{ boxShadow: `inset 0 0 0 1px ${tokens.ring}24` }}
              >
                {step.icon}
              </div>
              <div className="min-w-0 flex-1">
                <ProgressDots active={stepIdx} total={STEPS.length} color={step.color} />
                <p className={`mt-2.5 text-[10.5px] font-bold uppercase tracking-[0.18em] ${tokens.chipText}`}>
                  {step.kicker}
                </p>
              </div>
              <button
                onClick={() => finish("dismissed")}
                className="text-muted-foreground/60 text-2xl leading-none hover:text-foreground transition-colors -mt-1 -mr-1"
                aria-label="Dismiss tour"
              >
                ×
              </button>
            </div>

            {/* Headline — serif for the brand-display feel; tracks the hero's typography */}
            <h3
              id="tour-title"
              className="font-serif text-[24px] font-semibold text-foreground leading-[1.18] mb-3.5 tracking-[-0.01em]"
            >
              {step.title}
            </h3>
            <p className="text-[14.5px] text-muted-foreground leading-[1.65] mb-6">
              {step.body}
            </p>

            {/* Stats — 3-up grid for ≥2 stats, single pill for 1 */}
            {step.stats.length > 1 && (
              <div className="grid grid-cols-3 gap-2.5 mb-7">
                {step.stats.map((s) => (
                  <StatTile key={s.label} value={s.value} label={s.label} suffix={s.suffix} color={step.color} />
                ))}
              </div>
            )}
            {step.stats.length === 1 && (
              <div className="mb-7">
                <StatPill {...step.stats[0]} color={step.color} />
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-between gap-3">
              <button
                onClick={() => finish("dismissed")}
                className="text-[13px] text-muted-foreground/70 hover:text-foreground transition-colors"
              >
                Skip tour
              </button>
              <div className="flex items-center gap-2">
                {stepIdx > 0 && (
                  <button
                    onClick={() => setStepIdx((i) => i - 1)}
                    className="rounded-xl border border-white/[0.08] bg-white/[0.02] px-4 py-2.5 text-[13px] font-medium text-muted-foreground hover:text-foreground hover:border-white/15 hover:bg-white/[0.04] transition-all"
                  >
                    ← Back
                  </button>
                )}
                <button
                  onClick={() => (isLast ? finish("done") : setStepIdx((i) => i + 1))}
                  className="rounded-xl bg-foreground px-5 py-2.5 text-[13px] font-semibold text-background hover:opacity-90 transition-opacity"
                  style={{ boxShadow: `0 8px 24px -6px ${tokens.ring}80, 0 2px 6px -1px rgba(0,0,0,0.4)` }}
                >
                  {isLast ? "Got it" : "Next  →"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

function ProgressDots({ active, total, color }: { active: number; total: number; color: StepColor }) {
  const tokens = COLOR_TOKENS[color];
  return (
    <div className="flex items-center gap-1.5">
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          className={`h-1.5 rounded-full transition-all duration-300 ${
            i === active
              ? `${tokens.bar} w-6`
              : i < active
              ? `${tokens.bar} opacity-50 w-1.5`
              : "bg-muted-foreground/25 w-1.5"
          }`}
        />
      ))}
    </div>
  );
}

function computePopoverStyle(rect: Rect | null, prefer: "top" | "bottom" | "left" | "right" | "center"): React.CSSProperties {
  if (!rect || prefer === "center") {
    return { top: "50%", left: "50%", transform: "translate(-50%, -50%)" };
  }
  const POPOVER_W = 520;
  const POPOVER_H = 360;
  const GAP = 22;
  const vw = typeof window !== "undefined" ? window.innerWidth : 1280;
  const vh = typeof window !== "undefined" ? window.innerHeight : 800;

  const tryPositions: Array<"top" | "bottom" | "left" | "right"> = [prefer as any, "bottom", "top", "right", "left"];

  for (const pos of tryPositions) {
    let top = 0;
    let left = 0;
    switch (pos) {
      case "bottom":
        top = rect.top + rect.height + GAP;
        left = rect.left + rect.width / 2 - POPOVER_W / 2;
        break;
      case "top":
        top = rect.top - POPOVER_H - GAP;
        left = rect.left + rect.width / 2 - POPOVER_W / 2;
        break;
      case "right":
        top = rect.top + rect.height / 2 - POPOVER_H / 2;
        left = rect.left + rect.width + GAP;
        break;
      case "left":
        top = rect.top + rect.height / 2 - POPOVER_H / 2;
        left = rect.left - POPOVER_W - GAP;
        break;
    }
    left = Math.max(12, Math.min(left, vw - POPOVER_W - 12));
    top = Math.max(12, Math.min(top, vh - POPOVER_H - 12));
    if (top >= 12 && top <= vh - POPOVER_H - 12) {
      return { top, left, transition: "top 360ms cubic-bezier(0.22, 1, 0.36, 1), left 360ms cubic-bezier(0.22, 1, 0.36, 1)" };
    }
  }
  return { top: "50%", left: "50%", transform: "translate(-50%, -50%)" };
}

// Keyframes live in apps/web/src/app/globals.css
// (tour-breath, tour-shimmer, tour-fade-in, tour-pop-in)
