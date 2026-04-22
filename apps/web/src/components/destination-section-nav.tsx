"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";

type Section = { id: string; label: string };

/**
 * Sticky section-jumper that pops in after the ToC hero leaves viewport.
 * Scroll-spies the currently-visible section (rootMargin trick: "active" is
 * whichever section straddles the vertical middle of the viewport).
 *
 * - Desktop: horizontal pill bar
 * - Mobile (<768px): collapses to a single "Jump to {current} ▾" pill that
 *   opens a bottom-sheet drawer listing all sections
 */
export function DestinationSectionNav({ sections }: { sections: Section[] }) {
  const t = useTranslations("destination");
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(sections[0]?.id ?? "");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  // Show once sentinel (placed at end of ToC hero) scrolls above viewport.
  // Use scroll listener + rAF — more reliable than IntersectionObserver for
  // elements that start off-screen on page load with a deep scroll.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    let raf = 0;
    const check = () => {
      const r = sentinel.getBoundingClientRect();
      setVisible(r.top < 0);
    };
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        check();
        raf = 0;
      });
    };
    check();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // Scroll-spy: track which section is closest to the vertical center.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const targets = sections
      .map((s) => document.getElementById(`section-${s.id}`))
      .filter((el): el is HTMLElement => !!el);
    if (targets.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        // Pick the entry with highest intersectionRatio that is intersecting.
        const intersecting = entries.filter((e) => e.isIntersecting);
        if (intersecting.length === 0) return;
        intersecting.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        const topId = intersecting[0].target.id.replace(/^section-/, "");
        setActive(topId);
      },
      { rootMargin: "-40% 0% -40% 0%", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, [sections]);

  const onJump = (id: string) => {
    setDrawerOpen(false);
    const el = document.getElementById(`section-${id}`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const activeLabel = sections.find((s) => s.id === active)?.label ?? sections[0]?.label ?? "";

  return (
    <>
      {/* Sentinel — placed right after ToC hero via component boundary */}
      <div ref={sentinelRef} aria-hidden="true" className="h-0" />

      {/* Sticky nav — shared desktop + mobile shell. top-28 (112px) clears sticky header + banner */}
      <div
        className={`sticky top-28 z-40 mb-6 transition-all duration-200 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
        style={{ isolation: "isolate" }}
        role="navigation"
        aria-label={t("inThisGuide")}
      >
        {/* Desktop: horizontal pills */}
        <div className="hidden md:flex gap-1 overflow-x-auto rounded-xl border border-border bg-background/95 backdrop-blur p-1 shadow-sm">
          {sections.map((s) => {
            const isActive = s.id === active;
            return (
              <button
                key={s.id}
                onClick={() => onJump(s.id)}
                className={`rounded-lg px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors ${
                  isActive
                    ? "bg-primary/10 text-foreground border border-primary/30"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                aria-current={isActive ? "true" : undefined}
              >
                {s.label}
              </button>
            );
          })}
        </div>

        {/* Mobile: current section pill → opens drawer */}
        <div className="md:hidden">
          <button
            onClick={() => setDrawerOpen(true)}
            className="w-full flex items-center justify-between rounded-xl border border-border bg-background/95 backdrop-blur px-4 py-3 text-sm font-medium shadow-sm"
            aria-haspopup="dialog"
            aria-expanded={drawerOpen}
          >
            <span className="flex items-center gap-2">
              <span className="text-muted-foreground">{t("jumpTo")}</span>
              <span className="font-semibold">{activeLabel}</span>
            </span>
            <span className="text-muted-foreground">▾</span>
          </button>
        </div>
      </div>

      {/* Mobile drawer (bottom sheet) */}
      {drawerOpen && (
        <div
          className="fixed inset-0 z-50 md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label={t("jumpTo")}
          onClick={() => setDrawerOpen(false)}
        >
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
          <div
            className="absolute bottom-0 left-0 right-0 rounded-t-2xl bg-background border-t border-border shadow-2xl p-2 pb-6 safe-area-bottom"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mx-auto mb-3 h-1.5 w-10 rounded-full bg-muted-foreground/30" />
            <div className="flex flex-col gap-1">
              {sections.map((s) => {
                const isActive = s.id === active;
                return (
                  <button
                    key={s.id}
                    onClick={() => onJump(s.id)}
                    className={`w-full text-left rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-primary/10 text-foreground border border-primary/30"
                        : "text-muted-foreground hover:bg-muted/50"
                    }`}
                  >
                    {s.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
