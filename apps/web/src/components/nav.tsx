"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { LanguageToggle } from "./language-toggle";
import { UserButton } from "./user-button";
import { SearchCommand } from "./search-command";
import { NavMegaMenu, type PanelType } from "./nav-mega-menu";
import { InternationalBanner } from "./international-banner";
import { motion } from "framer-motion";
import { useState, useEffect, useRef, useCallback } from "react";

export function Nav() {
  const locale = useLocale();
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [searchOpen, setSearchOpen] = useState(false);
  const [activePanel, setActivePanel] = useState<PanelType>(null);
  const closeTimer = useRef<NodeJS.Timeout | null>(null);

  // Cmd+K / Ctrl+K keyboard shortcut
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setActivePanel(null);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Close panel on route change
  useEffect(() => {
    setActivePanel(null);
  }, [pathname]);

  // Close panel on scroll
  useEffect(() => {
    function handleScroll() {
      if (activePanel) setActivePanel(null);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activePanel]);

  const openPanel = useCallback((panel: PanelType) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActivePanel(panel);
  }, []);

  const startClose = useCallback(() => {
    closeTimer.current = setTimeout(() => setActivePanel(null), 150);
  }, []);

  const cancelClose = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }, []);

  const closePanel = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActivePanel(null);
  }, []);

  function isActive(href: string) {
    return pathname.startsWith(href);
  }

  // Which panel should be "active" based on current path
  function panelActiveForPath(panel: PanelType) {
    if (panel === "experiences") {
      return ["/collections", "/routes", "/treks", "/camping", "/festivals", "/stays"].some(
        (p) => pathname.includes(p)
      );
    }
    if (panel === "plan") {
      return ["/where-to-go", "/build-route", "/permits", "/road-conditions", "/plan"].some(
        (p) => pathname.includes(p)
      );
    }
    if (panel === "browse") {
      return ["/state/", "/states", "/region/"].some(
        (p) => pathname.includes(p)
      );
    }
    if (panel === "learn") {
      return ["/india-travel", "/blog", "/tourist-traps", "/guide", "/superlatives"].some(
        (p) => pathname.includes(p)
      );
    }
    return false;
  }

  const triggers: { panel: PanelType; label: string }[] = [
    { panel: "experiences", label: t("experiences") },
    { panel: "browse", label: t("browse") },
    { panel: "plan", label: t("planLabel") },
    { panel: "learn", label: t("learn") },
  ];

  return (
    <>
    {/* Skip to content — accessibility */}
    <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[60] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground focus:text-sm focus:font-medium">
      Skip to content
    </a>
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/90 backdrop-blur-xl shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 md:py-3">
        {/* Logo */}
        <Link href={`/${locale}`} className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#161614] border border-[#F5F1E8]/20 text-sm font-bold text-[#F5F1E8]">
            N<span className="text-[#E55642]">.</span>
          </div>
          <span className="hidden text-lg font-bold sm:inline">
            NakshIQ
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {/* Direct link: Destinations */}
          <Link
            href={`/${locale}/explore`}
            className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
              isActive(`/${locale}/explore`)
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            {t("destinations")}
          </Link>

          {/* Mega-menu triggers */}
          {triggers.map(({ panel, label }) => (
            <div
              key={panel}
              className="relative"
              onMouseEnter={() => openPanel(panel)}
              onMouseLeave={startClose}
            >
              <button
                className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors flex items-center gap-1 ${
                  activePanel === panel || panelActiveForPath(panel)
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {label}
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  className={`transition-transform duration-200 ${activePanel === panel ? "rotate-180" : ""}`}
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>
              {/* Sliding underline */}
              {(activePanel === panel || panelActiveForPath(panel)) && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute bottom-0 left-3 right-3 h-0.5 bg-primary rounded-full"
                  transition={{ type: "spring", stiffness: 500, damping: 35 }}
                />
              )}
            </div>
          ))}

          {/* Direct link: My Trip */}
          <Link
            href={`/${locale}/trip`}
            className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
              isActive(`/${locale}/trip`)
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            {t("myTrip")}
          </Link>

          {/* Direct link: Saved */}
          <Link
            href={`/${locale}/saved`}
            className={`rounded-lg px-2.5 py-1.5 text-sm transition-colors ${
              isActive(`/${locale}/saved`)
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            ♥
          </Link>

          {/* AI Plan CTA */}
          <Link
            href={`/${locale}/plan`}
            className="ml-2 rounded-lg bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 flex items-center gap-1.5"
          >
            <span>{t("aiPlan")}</span>
            <span className="rounded bg-white/20 px-1 py-0.5 text-[10px] font-bold leading-none">NEW</span>
          </Link>
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSearchOpen(true)}
            className="rounded-lg p-2 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            aria-label="Search (Cmd+K)"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </button>
          <LanguageToggle />
          <span className="hidden md:inline-flex"><UserButton /></span>
        </div>
      </div>

      {/* Mega-menu panels (desktop only) */}
      <div className="hidden md:block">
        <NavMegaMenu
          activePanel={activePanel}
          onClose={closePanel}
          onMouseEnter={cancelClose}
          onMouseLeave={startClose}
        />
      </div>

      {/* Mobile nav removed — handled by bottom tab bar */}
      <SearchCommand open={searchOpen} onClose={() => setSearchOpen(false)} />
      <InternationalBanner />
    </header>
    </>
  );
}
