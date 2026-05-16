"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useLocale } from "next-intl";
import { usePathname } from "next/navigation";
import { m as motion, AnimatePresence } from "framer-motion";

export function StickyCTA() {
  const locale = useLocale();
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [cinematic, setCinematic] = useState(false);

  // Suppress StickyCTA on the cinematic landing — that page has 4+ inline
  // CTAs already (Coda "Open the May atlas", "Tell us your trip", Director's
  // Cut "Read this brief", Map-led Stories cards), so adding a floating
  // "Plan My Trip" creates clutter. Memory rule: one floating CTA, never two.
  const isLandingRoot = pathname === `/${locale}` || pathname === `/${locale}/`;

  useEffect(() => {
    if (isLandingRoot) {
      setVisible(false);
      return;
    }

    // Cinematic shell adds .nakshiq-cinema to its root wrapper. When present
    // we restyle the pill (small, hairline, all-caps tracked) to match the
    // editorial palette — and hide on the Coda so the "Go with confidence."
    // bookend reads final.
    function check() {
      const isCinema = !!document.querySelector(".nakshiq-cinema");
      setCinematic(isCinema);

      const pastHero =
        window.scrollY > window.innerHeight * (isCinema ? 0.85 : 0.8);

      let inCoda = false;
      if (isCinema) {
        const coda = document.getElementById("dest-act-11");
        if (coda) {
          const r = coda.getBoundingClientRect();
          inCoda = r.top < window.innerHeight * 0.5;
        }
      }

      setVisible(pastHero && !inCoda);
    }
    check();
    window.addEventListener("scroll", check, { passive: true });
    return () => window.removeEventListener("scroll", check);
  }, [isLandingRoot, pathname]);

  if (isLandingRoot) return null;

  if (cinematic) {
    return (
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 16, opacity: 0 }}
            transition={{ type: "tween", duration: 0.24, ease: "easeOut" }}
            // Hidden on mobile — the cinematic mobile action bar takes
            // over there. Visible only at md+ where the editorial pill
            // floats bottom-right and the action bar isn't rendered.
            className="hidden md:block fixed sm:bottom-6 sm:right-6 z-30 md:z-50"
            style={{ fontFamily: "var(--cinema-mono, ui-monospace)" }}
          >
            <Link
              href={`/${locale}/plan`}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "10px 16px",
                background: "rgba(10,10,8,0.78)",
                color: "var(--bone)",
                border: "1px solid var(--vermillion)",
                borderRadius: 999,
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
                fontSize: 11,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                textDecoration: "none",
                transition: "background 200ms ease, color 200ms ease",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = "var(--vermillion)";
                el.style.color = "var(--paper)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = "rgba(10,10,8,0.78)";
                el.style.color = "var(--bone)";
              }}
            >
              <span style={{ color: "var(--vermillion)" }}>↗</span>
              <span>Plan this trip</span>
              <span
                style={{
                  marginLeft: 4,
                  paddingLeft: 8,
                  borderLeft: "1px solid currentColor",
                  opacity: 0.7,
                  fontSize: 10,
                }}
              >
                AI
              </span>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

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
