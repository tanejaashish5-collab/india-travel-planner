"use client";

import { useEffect, useState } from "react";

type Section = { id: string; label: string };

/**
 * Sticky sidebar table-of-contents for long-form blog articles.
 * Renders a vertical pill rail with scroll-spy. lg+ only (the parent
 * controls visibility via hidden lg:block).
 *
 * Kept separate from DestinationSectionNav because blog ToCs can have
 * 10+ entries (vs 6-7 for destinations), so they may need scrolling,
 * and the labels are typically longer and wrap differently.
 */
export function BlogArticleToC({ sections }: { sections: Section[] }) {
  const [active, setActive] = useState(sections[0]?.id ?? "");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const targets = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => !!el);
    if (targets.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        const intersecting = entries.filter((e) => e.isIntersecting);
        if (intersecting.length === 0) return;
        intersecting.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        setActive(intersecting[0].target.id);
      },
      { rootMargin: "-30% 0% -50% 0%", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, [sections]);

  const onJump = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav
      className="sticky top-28 self-start max-h-[calc(100vh-8rem)] overflow-y-auto"
      role="navigation"
      aria-label="In this article"
    >
      <div className="rounded-xl border border-border bg-background/95 backdrop-blur p-2 shadow-sm">
        <div className="px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
          In this article
        </div>
        <div className="flex flex-col gap-1">
          {sections.map((s) => {
            const isActive = s.id === active;
            return (
              <button
                key={s.id}
                onClick={() => onJump(s.id)}
                className={`flex items-start gap-2 rounded-lg px-3 py-2 text-sm font-medium text-left transition-colors ${
                  isActive
                    ? "bg-primary/10 text-foreground border border-primary/30"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                }`}
                aria-current={isActive ? "true" : undefined}
              >
                <span
                  className={`mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full transition-colors ${
                    isActive ? "bg-primary" : "bg-muted-foreground/30"
                  }`}
                  aria-hidden="true"
                />
                <span className="leading-tight">{s.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
