"use client";

import { useEffect } from "react";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { m as motion, AnimatePresence, useDragControls, type PanInfo } from "framer-motion";
import { FEATURES } from "@/lib/features";

// 12 tiles = an even 2-column grid. Blog & Guides moved in from the old
// quick-actions row when the AI planner button was hidden (2026-10-06).
const EXPERIENCE_ITEMS = [
  { label: "Collections", count: "91", icon: "📚", href: "/collections", desc: "Curated destination lists" },
  { label: "Routes", count: "74", icon: "🛣️", href: "/routes", desc: "Multi-day road trips" },
  { label: "Treks", count: "130", icon: "🥾", href: "/treks", desc: "Hikes and trails" },
  { label: "Camping", count: "110", icon: "⛺", href: "/camping", desc: "Camp spots across India" },
  { label: "Festivals", count: "325", icon: "🎪", href: "/festivals", desc: "Festivals by month & state" },
  { label: "Where to Stay", count: "", icon: "🏡", href: "/stays", desc: "Lodging by destination" },
  { label: "Where to Go", count: "", icon: "📅", href: "/where-to-go", desc: "Best destinations by month" },
  { label: "Tourist Traps", count: "", icon: "⚠️", href: "/tourist-traps", desc: "Skip these, go here instead" },
  { label: "Permits", count: "32", icon: "📋", href: "/permits", desc: "Required travel permits" },
  { label: "Road Conditions", count: "", icon: "🚗", href: "/road-conditions", desc: "Live road reports" },
  { label: "Records", count: "", icon: "🏆", href: "/superlatives", desc: "Highest, deepest, most remote" },
  { label: "Blog & Guides", count: "", icon: "📰", href: "/blog", desc: "Guides and trip planning reads" },
];

export function ExperiencesSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const locale = useLocale();
  const router = useRouter();
  const dragControls = useDragControls();

  function navigate(href: string) {
    onClose();
    router.push(`/${locale}${href}`);
  }

  // Escape closes; the page behind must not scroll while the sheet is up.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  // Swipe down on the sheet (past 100px, or a quick flick) closes it.
  function onDragEnd(_: unknown, info: PanInfo) {
    if (info.offset.y > 100 || info.velocity.y > 500) onClose();
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop: tap anywhere above the sheet to close */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-hidden="true"
            className="fixed inset-0 z-[190] bg-black/50 backdrop-blur-sm md:hidden"
          />

          {/* Sheet */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="experiences-sheet-title"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            drag="y"
            dragControls={dragControls}
            dragListener={false}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.6 }}
            onDragEnd={onDragEnd}
            className="fixed bottom-0 left-0 right-0 z-[195] bg-background rounded-t-2xl border-t border-border/50 md:hidden max-h-[85dvh] overflow-y-auto pb-safe"
          >
            {/* Top strip: swipe down here to close (the tile grid scrolls normally) */}
            <div onPointerDown={(e) => dragControls.start(e)} style={{ touchAction: "none" }}>
            <div className="flex justify-center pt-3 pb-1">
              <div className="h-1 w-10 rounded-full bg-muted-foreground/30" />
            </div>

            <div className="flex items-start justify-between gap-3 px-4 pb-3">
              <div>
                <h2 id="experiences-sheet-title" className="text-lg font-semibold">Discover</h2>
                <p className="text-xs text-muted-foreground">Experiences, guides & tools</p>
              </div>
              <button
                type="button"
                onClick={onClose}
                onPointerDown={(e) => e.stopPropagation()}
                aria-label="Close"
                className="-mr-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted/50 border border-border/50 text-muted-foreground active:scale-95 active:bg-muted"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                  <line x1="6" y1="6" x2="18" y2="18" />
                  <line x1="18" y1="6" x2="6" y2="18" />
                </svg>
              </button>
            </div>
            </div>

            <div className="grid grid-cols-2 gap-2 px-4 pb-8">
              {EXPERIENCE_ITEMS.map((item) => (
                <button
                  key={item.href}
                  onClick={() => navigate(item.href)}
                  className="flex items-start gap-3 rounded-xl bg-muted/30 border border-border/30 p-3 text-left transition-all active:scale-[0.97] active:bg-muted/60"
                >
                  <span className="text-xl mt-0.5">{item.icon}</span>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-semibold truncate">{item.label}</span>
                      {item.count && (
                        <span className="shrink-0 text-[10px] font-bold text-muted-foreground bg-muted rounded-full px-1.5 py-0.5">{item.count}</span>
                      )}
                    </div>
                    <p className="text-[11px] text-muted-foreground leading-tight mt-0.5 line-clamp-1">{item.desc}</p>
                  </div>
                </button>
              ))}
            </div>

            {FEATURES.aiPlanner && (
              <div className="px-4 pb-8 border-t border-border/30 pt-4">
                <button
                  onClick={() => navigate("/plan")}
                  className="w-full rounded-xl bg-primary py-3 text-center text-sm font-semibold text-primary-foreground active:scale-[0.98]"
                >
                  AI Trip Planner
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
