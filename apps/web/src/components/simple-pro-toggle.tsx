"use client";

import { cn } from "@/lib/utils";

export type ViewMode = "simple" | "pro";

export function SimpleProToggle({
  value,
  onChange,
  className,
}: {
  value: ViewMode;
  onChange: (next: ViewMode) => void;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-0.5 rounded-full border border-border bg-background/60 p-0.5 text-xs backdrop-blur-sm",
        className,
      )}
      role="radiogroup"
      aria-label="View mode"
    >
      {(["simple", "pro"] as ViewMode[]).map((mode) => {
        const active = value === mode;
        return (
          <button
            key={mode}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(mode)}
            className={cn(
              "rounded-full px-3 py-1 font-medium capitalize transition-all",
              active
                ? "bg-foreground text-background shadow-sm"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {mode}
          </button>
        );
      })}
    </div>
  );
}
