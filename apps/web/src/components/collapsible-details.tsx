"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Inline disclosure for dense/operational blocks that casual visitors
 * don't want in their face but serious planners do. Replaces the old
 * Simple/Pro global toggle — each dense section now opts in on demand,
 * so the default surface is clean but no data is hidden forever.
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
      ? "border-yellow-500/30 text-yellow-300/80 hover:border-yellow-500/50 hover:text-yellow-200"
      : "border-border text-muted-foreground hover:text-foreground hover:border-muted-foreground";
  return (
    <div className={className}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "inline-flex items-center gap-2 rounded-full border bg-background/60 px-3 py-1.5 text-[11px] font-mono tracking-[0.14em] uppercase transition-colors",
          toneClasses,
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
        {count != null && <span className="opacity-60">· {count}</span>}
      </button>
      {open && <div className="mt-3">{children}</div>}
    </div>
  );
}
