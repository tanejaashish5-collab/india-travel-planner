import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * One overline style for the whole app — replaces 85+ ad-hoc variations
 * that collectively read "SaaS dashboard" (font-mono + text-[10px] +
 * tracking-[0.22em] + uppercase). Softer sans-uppercase is the FT Weekend
 * / Monocle treatment: keeps scan-ability of overlines, drops the noise.
 *
 * Use for small section headers, field labels, category markers. Not a
 * replacement for `<h2>` proper — those should stay serif via the base
 * layer rule in globals.css.
 */
export function SectionLabel({
  children,
  as: Tag = "p",
  tone = "neutral",
  className,
  ...rest
}: {
  children: React.ReactNode;
  as?: "p" | "span" | "div" | "h3" | "h4" | "dt" | "dd" | "li";
  tone?: "neutral" | "muted" | "accent" | "warning" | "danger";
  className?: string;
} & React.HTMLAttributes<HTMLElement>) {
  const toneClass =
    tone === "accent"
      ? "text-primary"
      : tone === "warning"
      ? "text-amber-300/90"
      : tone === "danger"
      ? "text-red-300/90"
      : tone === "muted"
      ? "text-muted-foreground/70"
      : "text-muted-foreground";

  return React.createElement(
    Tag,
    {
      ...rest,
      className: cn(
        "font-sans text-[11px] font-medium uppercase tracking-[0.08em]",
        toneClass,
        className,
      ),
    },
    children,
  );
}
