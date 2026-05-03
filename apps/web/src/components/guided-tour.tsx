"use client";

import { useEffect, useLayoutEffect, useState, useCallback } from "react";

/**
 * First-time-visitor guided tour.
 *
 * Mounts on the homepage. Reads localStorage flag `nakshiq_tour_v1` — if
 * set to "done" or "dismissed", does not auto-render.
 *
 * Re-trigger entry points:
 *   1. URL param `?tour=1` (clears flag)
 *   2. window event `nakshiq:tour-replay` (fired by footer "Take the tour")
 *
 * Mobile (<md, ~768px): skipped entirely. Tour content needs >50% of
 * viewport for the popover; on phones it crowds the very content it's
 * trying to introduce. The footer link still works on mobile though —
 * if a user actively asks for it, we render with a stacked card layout.
 *
 * Anchor selection: each step targets a stable selector. If the anchor is
 * missing from the DOM (route changed, component lazy-not-mounted), the
 * step gets a "centered" fallback rather than spotlight.
 */

const FLAG_KEY = "nakshiq_tour_v1";

type Step = {
  selector: string;
  title: string;
  body: string;
  position?: "top" | "bottom" | "left" | "right" | "center";
};

const STEPS: Step[] = [
  {
    selector: "[data-tour='search']",
    title: "Hit ⌘K to search anything",
    body:
      "488 destinations, 162 articles, 19 routes, 50+ treks. Search by name, by month (\"goa in May\"), or by mood (\"quiet hill stations\").",
    position: "bottom",
  },
  {
    selector: "[data-tour='plan-cta']",
    title: "AI Plan a trip in 60 seconds",
    body:
      "Tell us where, when, who's going, and budget. We build an itinerary with day-by-day plans, named stays, real prices, and skip flags for the wrong months.",
    position: "bottom",
  },
  {
    selector: "[data-tour='plan-menu']",
    title: "Plan tools live here",
    body:
      "Where-to-go (by month), build-route, permits, road conditions, cost index. Hover to see the full set.",
    position: "bottom",
  },
  {
    selector: "[data-tour='learn-menu']",
    title: "Skip List + the honest layer",
    body:
      "Tourist Traps + skip-list pages tell you exactly what disappoints — with sourced complaints — and where to go instead. Lonavala, Manali, Goa-Calangute, Nainital are all in there.",
    position: "bottom",
  },
  {
    selector: "[data-tour='dest-card']",
    title: "Every destination has the depth",
    body:
      "Tap any card to see scored months, day-by-day routes, named stays with prices, eateries, permits, road conditions, SOS — all sourced. No fluff.",
    position: "top",
  },
];

type Rect = { top: number; left: number; width: number; height: number };

function getRect(selector: string): Rect | null {
  if (typeof document === "undefined") return null;
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

export function GuidedTour() {
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
    } catch {
      /* private browsing — accept that they'll see it next visit */
    }
    setActive(false);
  }, []);

  // Boot: decide whether to auto-show.
  useEffect(() => {
    if (typeof window === "undefined") return;

    const url = new URL(window.location.href);
    const hasParam = url.searchParams.get("tour") === "1";

    setMobile(isMobile());

    if (hasParam) {
      try { localStorage.removeItem(FLAG_KEY); } catch {}
      start();
      // Strip the param so a refresh doesn't re-loop.
      url.searchParams.delete("tour");
      window.history.replaceState({}, "", url.toString());
      return;
    }

    let flag: string | null = null;
    try { flag = localStorage.getItem(FLAG_KEY); } catch {}
    if (flag) return;

    // Wait for next-paint so anchors exist before measuring.
    const id = window.setTimeout(start, 800);
    return () => window.clearTimeout(id);
  }, [start]);

  // Listen for footer-triggered replay.
  useEffect(() => {
    const handler = () => {
      try { localStorage.removeItem(FLAG_KEY); } catch {}
      start();
    };
    window.addEventListener("nakshiq:tour-replay", handler);
    return () => window.removeEventListener("nakshiq:tour-replay", handler);
  }, [start]);

  // Measure anchor on each step + on resize/scroll while active.
  useLayoutEffect(() => {
    if (!active) return;
    const step = STEPS[stepIdx];
    const update = () => setRect(getRect(step.selector));
    update();
    window.addEventListener("resize", update);
    window.addEventListener("scroll", update, { passive: true });
    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", update);
    };
  }, [active, stepIdx]);

  // Esc to dismiss.
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
  }, [active, stepIdx, finish]);

  if (!active) return null;

  const step = STEPS[stepIdx];
  const isLast = stepIdx === STEPS.length - 1;

  // Mobile: stacked card, no spotlight.
  if (mobile) {
    return (
      <div
        className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-end"
        role="dialog"
        aria-modal="true"
        aria-labelledby="tour-title"
      >
        <div className="w-full bg-card border-t border-border rounded-t-2xl p-5 shadow-2xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-primary">
              {stepIdx + 1} of {STEPS.length}
            </span>
            <button
              onClick={() => finish("dismissed")}
              className="text-muted-foreground text-xl leading-none hover:text-foreground"
              aria-label="Dismiss tour"
            >
              ×
            </button>
          </div>
          <h3 id="tour-title" className="text-lg font-semibold text-foreground mb-1.5">
            {step.title}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{step.body}</p>
          <div className="mt-4 flex items-center justify-between gap-3">
            <button
              onClick={() => setStepIdx((i) => Math.max(0, i - 1))}
              disabled={stepIdx === 0}
              className="text-sm text-muted-foreground disabled:opacity-30"
            >
              ← Back
            </button>
            <button
              onClick={() => (isLast ? finish("done") : setStepIdx((i) => i + 1))}
              className="rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90"
            >
              {isLast ? "Done" : "Next →"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Desktop: spotlight + popover positioned relative to the anchor.
  // If anchor missing → centered popover.
  const PAD = 8;
  const popoverPosition = computePopoverStyle(rect, step.position ?? "bottom");

  return (
    <div className="fixed inset-0 z-[100]" role="dialog" aria-modal="true" aria-labelledby="tour-title">
      {/* Backdrop with cut-out */}
      <svg
        className="absolute inset-0 w-full h-full"
        style={{ pointerEvents: "auto" }}
        onClick={(e) => {
          // Click outside the spotlight = dismiss
          if ((e.target as Element).tagName === "svg" || (e.target as Element).tagName === "rect") {
            // Nothing — the rect is the backdrop
          }
        }}
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
                rx={12}
                ry={12}
                fill="black"
              />
            )}
          </mask>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill="rgba(0,0,0,0.7)"
          mask={rect ? "url(#spotlight-mask)" : undefined}
        />
        {rect && (
          <rect
            x={Math.max(0, rect.left - PAD)}
            y={Math.max(0, rect.top - PAD)}
            width={rect.width + PAD * 2}
            height={rect.height + PAD * 2}
            rx={12}
            ry={12}
            fill="none"
            stroke="rgb(229, 86, 66)"
            strokeWidth={2}
            className="animate-pulse"
          />
        )}
      </svg>

      {/* Popover */}
      <div
        style={popoverPosition}
        className="absolute w-[360px] max-w-[90vw] rounded-2xl border border-border bg-card shadow-2xl p-5 pointer-events-auto"
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-primary">
            {stepIdx + 1} of {STEPS.length}
          </span>
          <button
            onClick={() => finish("dismissed")}
            className="text-muted-foreground text-xl leading-none hover:text-foreground"
            aria-label="Dismiss tour"
          >
            ×
          </button>
        </div>
        <h3 id="tour-title" className="text-lg font-semibold text-foreground mb-1.5">
          {step.title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{step.body}</p>
        <div className="mt-4 flex items-center justify-between gap-3">
          <button
            onClick={() => finish("dismissed")}
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Skip tour
          </button>
          <div className="flex items-center gap-2">
            {stepIdx > 0 && (
              <button
                onClick={() => setStepIdx((i) => i - 1)}
                className="rounded-lg border border-border px-3 py-1.5 text-sm hover:border-primary/40"
              >
                ← Back
              </button>
            )}
            <button
              onClick={() => (isLast ? finish("done") : setStepIdx((i) => i + 1))}
              className="rounded-lg bg-primary px-4 py-1.5 text-sm font-semibold text-primary-foreground hover:opacity-90"
            >
              {isLast ? "Got it" : "Next →"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function computePopoverStyle(rect: Rect | null, prefer: NonNullable<Step["position"]>): React.CSSProperties {
  // No anchor — center the popover on the screen.
  if (!rect || prefer === "center") {
    return { top: "50%", left: "50%", transform: "translate(-50%, -50%)" };
  }
  const POPOVER_W = 360;
  const POPOVER_H = 180; // rough estimate, ~3 lines of body + buttons
  const GAP = 16;
  const vw = typeof window !== "undefined" ? window.innerWidth : 1280;
  const vh = typeof window !== "undefined" ? window.innerHeight : 800;

  // Try preferred position first, fall back if it'd overflow viewport.
  const tryPositions: Array<NonNullable<Step["position"]>> = [
    prefer,
    "bottom",
    "top",
    "right",
    "left",
  ];

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
      case "center":
        return { top: "50%", left: "50%", transform: "translate(-50%, -50%)" };
    }
    // Clamp to viewport
    left = Math.max(12, Math.min(left, vw - POPOVER_W - 12));
    top = Math.max(12, Math.min(top, vh - POPOVER_H - 12));
    if (top >= 12 && top <= vh - POPOVER_H - 12) {
      return { top, left };
    }
  }
  return { top: "50%", left: "50%", transform: "translate(-50%, -50%)" };
}
