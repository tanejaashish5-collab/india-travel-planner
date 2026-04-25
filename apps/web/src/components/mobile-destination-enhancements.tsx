"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useLocale } from "next-intl";
import Link from "next/link";
import { m as motion, AnimatePresence } from "framer-motion";

/* ── Sticky Section Tabs ──
   Floats above content on mobile, tracks scroll position to highlight active section.
   Attach section IDs to your <h2> elements: id="section-overview", id="section-monthly", etc.
*/

const SECTION_TABS = [
  { id: "section-overview", label: "Overview" },
  { id: "section-monthly", label: "Monthly" },
  { id: "section-infrastructure", label: "Getting There" },
  { id: "section-stays", label: "Stays" },
  { id: "section-food", label: "Food" },
  { id: "section-kids", label: "Kids" },
  { id: "section-safety", label: "Safety" },
  { id: "section-places", label: "Places" },
  { id: "section-questions", label: "Q&A" },
  { id: "section-reviews", label: "Reviews" },
];

export function StickyDestinationTabs() {
  const [activeSection, setActiveSection] = useState("section-overview");
  const [visible, setVisible] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);

  // Track which sections exist in the DOM
  const [existingSections, setExistingSections] = useState<string[]>([]);

  useEffect(() => {
    // Find which sections actually exist
    const found = SECTION_TABS.filter((tab) => document.getElementById(tab.id)).map((t) => t.id);
    setExistingSections(found);
  }, []);

  useEffect(() => {
    function onScroll() {
      const y = window.scrollY;
      // Show tabs after scrolling past hero (~300px)
      setVisible(y > 300);
      lastScrollY.current = y;

      // Find active section
      for (let i = existingSections.length - 1; i >= 0; i--) {
        const el = document.getElementById(existingSections[i]);
        if (el && el.getBoundingClientRect().top < 120) {
          setActiveSection(existingSections[i]);
          break;
        }
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [existingSections]);

  function scrollToSection(id: string) {
    const el = document.getElementById(id);
    if (el) {
      const offset = 100; // Account for sticky nav height
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  }

  // Auto-scroll active tab into view
  useEffect(() => {
    if (!scrollRef.current) return;
    const activeEl = scrollRef.current.querySelector(`[data-section="${activeSection}"]`);
    if (activeEl) {
      (activeEl as HTMLElement).scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }
  }, [activeSection]);

  if (existingSections.length < 2) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          className="fixed top-0 left-0 right-0 z-30 bg-background/90 backdrop-blur-lg border-b border-border/30 md:hidden"
          style={{ paddingTop: "env(safe-area-inset-top)" }}
        >
          <div
            ref={scrollRef}
            className="flex gap-1 overflow-x-auto scrollbar-hide px-3 py-2"
          >
            {SECTION_TABS.filter((t) => existingSections.includes(t.id)).map((tab) => (
              <button
                key={tab.id}
                data-section={tab.id}
                onClick={() => scrollToSection(tab.id)}
                className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-medium transition-all whitespace-nowrap active:scale-95 ${
                  activeSection === tab.id
                    ? "bg-foreground text-background"
                    : "bg-muted/50 text-muted-foreground"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ── Bottom CTA Bar ──
   Fixed at bottom on mobile, replaces floating buttons. Shows Plan + Save + Share.
*/

export function BottomCTABar({ destId, destName }: { destId: string; destName: string }) {
  const locale = useLocale();
  const [visible, setVisible] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    // Check if saved
    const savedItems = JSON.parse(localStorage.getItem("nakshiq_saved") || "[]");
    setSaved(savedItems.includes(destId));

    function onScroll() {
      setVisible(window.scrollY > 200);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [destId]);

  function toggleSave() {
    const savedItems: string[] = JSON.parse(localStorage.getItem("nakshiq_saved") || "[]");
    let updated: string[];
    if (savedItems.includes(destId)) {
      updated = savedItems.filter((id) => id !== destId);
      setSaved(false);
    } else {
      updated = [...savedItems, destId];
      setSaved(true);
      // Haptic feedback
      if (navigator.vibrate) navigator.vibrate(10);
    }
    localStorage.setItem("nakshiq_saved", JSON.stringify(updated));
  }

  async function handleShare() {
    try {
      await navigator.share({
        title: destName,
        url: `https://www.nakshiq.com/${locale}/destination/${destId}`,
      });
    } catch {
      // Fallback: copy to clipboard
      await navigator.clipboard?.writeText(`https://www.nakshiq.com/${locale}/destination/${destId}`);
    }
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-lg border-t border-border/30 md:hidden"
          style={{ paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom))" }}
        >
          <div className="flex items-center gap-2.5 px-4 pt-3">
            <Link
              href={`/${locale}/plan?dest=${destId}`}
              className="flex-1 rounded-xl bg-[#E55642] py-3 text-center text-sm font-bold text-white shadow-lg shadow-[#E55642]/20 active:scale-[0.98] transition-transform"
            >
              Plan This Trip
            </Link>
            <button
              onClick={toggleSave}
              className={`rounded-xl px-4 py-3 border transition-all active:scale-95 ${
                saved
                  ? "bg-red-500/10 border-red-500/30 text-red-400"
                  : "bg-muted/50 border-border/50 text-muted-foreground"
              }`}
              aria-label={saved ? "Remove from saved" : "Save destination"}
            >
              {saved ? "♥" : "♡"}
            </button>
            <button
              onClick={handleShare}
              className="rounded-xl bg-muted/50 border border-border/50 px-4 py-3 text-muted-foreground active:scale-95 transition-transform"
              aria-label="Share"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                <polyline points="16 6 12 2 8 6" />
                <line x1="12" y1="2" x2="12" y2="15" />
              </svg>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
