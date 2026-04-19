"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useLocale } from "next-intl";
import { m as motion, AnimatePresence } from "framer-motion";

export function StickyCTA() {
  const locale = useLocale();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      // Show after scrolling past the hero (roughly 100vh)
      setVisible(window.scrollY > window.innerHeight * 0.8);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-30 md:z-50"
        >
          <Link
            href={`/${locale}/plan`}
            className="flex items-center gap-2 rounded-full bg-primary px-4 py-3 sm:px-6 sm:py-3.5 text-sm font-semibold text-primary-foreground shadow-2xl shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all duration-200"
          >
            <span>Plan My Trip</span>
            <span className="rounded bg-white/20 px-1.5 py-1 text-xs font-bold">AI</span>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
