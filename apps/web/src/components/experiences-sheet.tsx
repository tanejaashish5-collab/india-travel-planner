"use client";

import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { m as motion, AnimatePresence } from "framer-motion";

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
  { label: "Ask NakshIQ", count: "AI", icon: "💬", href: "/ask", desc: "AI travel assistant" },
];

export function ExperiencesSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const locale = useLocale();
  const router = useRouter();

  function navigate(href: string) {
    onClose();
    router.push(`/${locale}${href}`);
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[190] bg-black/50 backdrop-blur-sm md:hidden"
          />

          {/* Sheet */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-[195] bg-background rounded-t-2xl border-t border-border/50 md:hidden max-h-[85dvh] overflow-y-auto pb-safe"
          >
            {/* Drag handle */}
            <div className="flex justify-center pt-3 pb-2">
              <div className="h-1 w-10 rounded-full bg-muted-foreground/20" />
            </div>

            <div className="px-4 pb-2">
              <h2 className="text-lg font-bold">Discover</h2>
              <p className="text-xs text-muted-foreground">Experiences, guides & tools</p>
            </div>

            <div className="grid grid-cols-2 gap-2 px-4 pb-6">
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

            {/* Quick actions */}
            <div className="px-4 pb-8 border-t border-border/30 pt-4">
              <div className="flex gap-2">
                <button
                  onClick={() => navigate("/plan")}
                  className="flex-1 rounded-xl bg-primary py-3 text-center text-sm font-semibold text-primary-foreground active:scale-[0.98]"
                >
                  AI Trip Planner
                </button>
                <button
                  onClick={() => navigate("/blog")}
                  className="flex-1 rounded-xl bg-muted/50 border border-border/50 py-3 text-center text-sm font-medium active:scale-[0.98]"
                >
                  Blog & Guides
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
