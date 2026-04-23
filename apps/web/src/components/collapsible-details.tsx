"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Inline disclosure for dense/operational blocks that casual visitors
 * don't want in their face but serious planners do. Each dense section
 * opts in on demand, so the default surface is clean but no data is
 * hidden forever.
 *
 * Trigger has a slow breathing ring while closed so it's hard to miss
 * on first scroll; the pulse stops once the user opens the block.
 */
export function CollapsibleDetails({
  label,
  count,
  children,
  defaultOpen = false,
  className,
  tone = "neutral",
}: {
  label: string;
  count?: number;
  children: React.ReactNode;
  defaultOpen?: boolean;
  className?: string;
  /** "warning" tints the trigger amber for infra-concern blocks. */
  tone?: "neutral" | "warning";
}) {
  const [open, setOpen] = useState(defaultOpen);
  const toneClasses =
    tone === "warning"
      ? "border-yellow-500/40 text-yellow-200 bg-yellow-500/5 hover:border-yellow-500/70 hover:bg-yellow-500/10"
      : "border-primary/40 text-foreground bg-primary/5 hover:border-primary/70 hover:bg-primary/10";
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
          50%      { box-shadow: 0 0 0 5px rgba(52, 211, 153, 0.18); }
        }
        @keyframes collapsible-breathe-warning {
          0%, 100% { box-shadow: 0 0 0 0 rgba(245, 158, 11, 0); }
          50%      { box-shadow: 0 0 0 5px rgba(245, 158, 11, 0.22); }
        }
        .collapsible-pulse-neutral {
          animation: collapsible-breathe-neutral 2.4s ease-in-out infinite;
        }
        .collapsible-pulse-warning {
          animation: collapsible-breathe-warning 2.4s ease-in-out infinite;
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
          "inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[11px] font-mono tracking-[0.14em] uppercase transition-colors backdrop-blur-sm",
          toneClasses,
          pulseClass,
        )}
        aria-expanded={open}
      >
        <span
          aria-hidden
          className={cn("inline-block text-sm leading-none transition-transform duration-200", open && "rotate-45")}
        >
          +
        </span>
        <span>{open ? "Hide" : "Show"} {label}</span>
        {count != null && <span className="opacity-70">· {count}</span>}
      </button>
      {open && <div className="mt-3">{children}</div>}
    </div>
  );
}
