"use client";

import { useState, useEffect, createContext, useContext } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { m as motion, AnimatePresence } from "framer-motion";

// Global compare state
interface CompareContextType {
  compareIds: string[];
  addToCompare: (id: string) => void;
  removeFromCompare: (id: string) => void;
  isInCompare: (id: string) => boolean;
  clearCompare: () => void;
}

const CompareContext = createContext<CompareContextType>({
  compareIds: [],
  addToCompare: () => {},
  removeFromCompare: () => {},
  isInCompare: () => false,
  clearCompare: () => {},
});

export function useCompare() {
  return useContext(CompareContext);
}

export function CompareProvider({ children }: { children: React.ReactNode }) {
  const [compareIds, setCompareIds] = useState<string[]>([]);

  // Persist to localStorage
  useEffect(() => {
    const saved = localStorage.getItem("compareDestinations");
    if (saved) setCompareIds(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("compareDestinations", JSON.stringify(compareIds));
  }, [compareIds]);

  function addToCompare(id: string) {
    if (compareIds.length < 3 && !compareIds.includes(id)) {
      setCompareIds([...compareIds, id]);
    }
  }

  function removeFromCompare(id: string) {
    setCompareIds(compareIds.filter((c) => c !== id));
  }

  function isInCompare(id: string) {
    return compareIds.includes(id);
  }

  function clearCompare() {
    setCompareIds([]);
  }

  return (
    <CompareContext.Provider value={{ compareIds, addToCompare, removeFromCompare, isInCompare, clearCompare }}>
      {children}
      <CompareTray />
    </CompareContext.Provider>
  );
}

function CompareTray() {
  const locale = useLocale();
  const pathname = usePathname();
  const { compareIds, removeFromCompare, clearCompare } = useCompare();
  const [names, setNames] = useState<Record<string, string>>({});

  // Only show tray on relevant pages
  const relevantPages = ["/explore", "/destination/", "/collections", "/saved", "/compare", "/region/"];
  const isRelevantPage = relevantPages.some((p) => pathname.includes(p));

  // Fetch names for compare IDs
  useEffect(() => {
    if (compareIds.length === 0) return;
    const missing = compareIds.filter((id) => !names[id]);
    if (missing.length === 0) return;

    // Simple name resolution from DOM or API
    // For now, just capitalize the ID
    const newNames: Record<string, string> = {};
    missing.forEach((id) => {
      newNames[id] = id.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
    });
    setNames((prev) => ({ ...prev, ...newNames }));
  }, [compareIds, names]);

  if (compareIds.length === 0 || !isRelevantPage) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed bottom-16 md:bottom-0 left-0 right-0 z-40 border-t border-border bg-card shadow-2xl shadow-black/30"
      >
        <div className="mx-auto max-w-5xl px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <span className="text-xs font-medium text-muted-foreground shrink-0">
                Compare ({compareIds.length}/3):
              </span>
              <div className="flex gap-2 overflow-x-auto">
                {compareIds.map((id) => (
                  <div
                    key={id}
                    className="flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/5 px-3 py-1 shrink-0"
                  >
                    <span className="text-xs font-medium">{names[id] || id}</span>
                    <button
                      onClick={() => removeFromCompare(id)}
                      className="text-muted-foreground hover:text-red-400 text-xs"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {compareIds.length >= 2 && (
                <Link
                  href={`/${locale}/compare?compare=${compareIds.join(",")}`}
                  className="rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  Compare Now
                </Link>
              )}
              <button
                onClick={clearCompare}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

// Compare button for cards
export function CompareButton({ destinationId, size = "sm" }: { destinationId: string; size?: "sm" | "md" }) {
  const { addToCompare, removeFromCompare, isInCompare, compareIds } = useCompare();
  const t = useTranslations("destination");
  const comparing = isInCompare(destinationId);

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        comparing ? removeFromCompare(destinationId) : addToCompare(destinationId);
      }}
      disabled={!comparing && compareIds.length >= 3}
      // min-h ensures WCAG 2.5.8 AA tap-target minimum (24×24) on mobile —
      // BUG-110 flagged compare/heart icons below threshold. 32px passes AA
      // comfortably without bloating the card layout.
      className={`flex items-center gap-1 rounded-full border transition-all min-h-[32px] ${
        size === "sm" ? "px-2.5 py-1.5 text-xs" : "px-3 py-1.5 text-xs"
      } ${
        comparing
          ? "border-primary bg-primary/10 text-primary"
          : "border-border text-muted-foreground hover:text-foreground hover:border-muted-foreground disabled:opacity-30"
      }`}
    >
      {comparing ? `✓ ${t("comparing")}` : `⚖ ${t("compare")}`}
    </button>
  );
}
