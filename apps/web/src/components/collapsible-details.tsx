"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Inline disclosure for dense/operational blocks that casual visitors
 * don't want in their face but serious planners do. Each dense section
 * opts in on demand, so the default surface is clean but no data is
 * hidden forever.
 *
 * The trigger is a full-width actionable bar (not a tiny pill) — the pill
 * version was easy to miss when scanning. Now it reads as a proper button
 * row with a chevron icon, label, count, and a hint arrow on the right.
 * Slow breathing ring reinforces it while closed.
 */
export function CollapsibleDetails({
  label,
  count,
  children,
  defaultOpen = false,
  className,
  tone = "neutral",
  hint,
}: {
  label: string;
  count?: number;
  children: React.ReactNode;
  defaultOpen?: boolean;
  className?: string;
  /** "warning" tints the trigger amber for infra-concern blocks. */
  tone?: "neutral" | "warning";
  /** Optional one-line subtitle under the label, e.g. "network + roads + ATMs". */
  hint?: string;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const toneClasses =
    tone === "warning"
      ? "border-yellow-500/50 bg-yellow-500/10 hover:border-yellow-500/80 hover:bg-yellow-500/20 text-yellow-100"
      : "border-primary/55 bg-primary/10 hover:border-primary/85 hover:bg-primary/20 text-foreground";
  const iconBgClasses =
    tone === "warning"
      ? "bg-yellow-500/25 text-yellow-200"
      : "bg-primary/25 text-primary";
  const pulseClass =
    !open
      ? tone === "warning"
        ? "collapsible-pulse-warning"
        : "collapsible-pulse-neutral"
      : "";
  return (
    <div className={className}>
      <style>{`
        @keyframes collapsible-breathe-neutral {
          0%, 100% { box-shadow: 0 0 0 0 rgba(52, 211, 153, 0); }
          50%      { box-shadow: 0 0 0 8px rgba(52, 211, 153, 0.32); }
        }
        @keyframes collapsible-breathe-warning {
          0%, 100% { box-shadow: 0 0 0 0 rgba(245, 158, 11, 0); }
          50%      { box-shadow: 0 0 0 8px rgba(245, 158, 11, 0.36); }
        }
        .collapsible-pulse-neutral {
          animation: collapsible-breathe-neutral 2.2s ease-in-out infinite;
        }
        .collapsible-pulse-warning {
          animation: collapsible-breathe-warning 2.2s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .collapsible-pulse-neutral,
          .collapsible-pulse-warning { animation: none; }
        }
      `}</style>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "group flex w-full items-center gap-3 rounded-xl border-2 px-4 py-3 text-left transition-all",
          toneClasses,
          pulseClass,
        )}
        aria-expanded={open}
      >
        <span
          aria-hidden
          className={cn(
            "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-base font-semibold transition-transform duration-200",
            iconBgClasses,
            open && "rotate-45",
          )}
        >
          +
        </span>
        <span className="flex-1 min-w-0">
          <span className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
            <span className="text-sm font-semibold tracking-tight">
              {open ? "Hide" : "Show"} {label}
            </span>
            {count != null && (
              <span
                className={cn(
                  "inline-flex items-center rounded-full px-2 py-0.5 font-mono text-[10px] tracking-[0.14em] uppercase",
                  tone === "warning" ? "bg-yellow-500/25 text-yellow-100" : "bg-primary/25 text-foreground",
                )}
              >
                {count} {count === 1 ? "item" : "items"}
              </span>
            )}
          </span>
          {hint && (
            <span className="mt-0.5 block text-xs text-muted-foreground group-hover:text-foreground/80 transition-colors">
              {hint}
            </span>
          )}
        </span>
        <span
          aria-hidden
          className={cn(
            "shrink-0 font-mono text-[10px] tracking-[0.22em] uppercase transition-all",
            open ? "opacity-0 -translate-x-1" : "opacity-80 group-hover:translate-x-0.5",
          )}
        >
          Click to open &rarr;
        </span>
      </button>
      {open && <div className="mt-3">{children}</div>}
    </div>
  );
}
