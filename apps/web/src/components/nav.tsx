"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { LanguageToggle } from "./language-toggle";
import { UserButton } from "./user-button";
import { SearchCommand } from "./search-command";
import { NavMegaMenu, type PanelType } from "./nav-mega-menu";
import { InternationalBanner } from "./international-banner";
import { CinematicMoreOverlay } from "./cinematic-more-overlay";
import { m as motion } from "framer-motion";
import { useState, useEffect, useRef, useCallback } from "react";
import { CINEMATIC_DESTINATIONS } from "@/lib/cinematic-destinations";

export function Nav() {
  const locale = useLocale();
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [searchOpen, setSearchOpen] = useState(false);
  const [activePanel, setActivePanel] = useState<PanelType>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const closeTimer = useRef<NodeJS.Timeout | null>(null);

  // Cinematic-redesigned routes use the magazine-style nav (vs. the legacy
  // mega-menu). The landing /[locale] is always cinematic; other pages opt in
  // as their bodies are redesigned. This list grows as Path C propagation
  // ships each tier — keep nav-style and body-style flips in lockstep so we
  // never get cinematic-nav-over-old-body or vice versa. Match against
  // pathname WITHOUT trailing slash; middleware strips it.
  const isLandingRoot = pathname === `/${locale}` || pathname === `/${locale}/`;
  const CINEMATIC_PAGE_PATHS = [
    `/${locale}/about`,
    `/${locale}/methodology`,
    `/${locale}/privacy`,
    `/${locale}/terms`,
    `/${locale}/cookies`,
    `/${locale}/contact`,
    `/${locale}/tourist-traps`,
    `/${locale}/explore`,
    `/${locale}/collections`,
    `/${locale}/plan`,
    `/${locale}/the-window`,
    // Phase 3 Tier 1 (S54) — content hub pages
    `/${locale}/blog`,
    `/${locale}/india-travel`,
    `/${locale}/nakshiq-100`,
    `/${locale}/guide/visa`,
    `/${locale}/guide/permits`,
    `/${locale}/guide/scams`,
    `/${locale}/guide/etiquette`,
    `/${locale}/guide/food-safety`,
    `/${locale}/guide/packing`,
    `/${locale}/guide/sim-card`,
    `/${locale}/guide/transport-overview`,
    `/${locale}/guide/currency`,
    `/${locale}/guide/book-indian-trains`,
    `/${locale}/guide/first-trip-india`,
    // Phase 3 Tier 2 (S54) — discovery hubs
    `/${locale}/routes`,
    `/${locale}/treks`,
    `/${locale}/camping`,
    `/${locale}/festivals`,
    `/${locale}/stays`,
    // Phase 3 Tier 3 (S54) — geography
    `/${locale}/states`,
    `/${locale}/superlatives`,
    // Phase 3 Tier 4 (S54) — weekend-from cluster
    `/${locale}/weekend-from`,
    // Phase 3 Tier 5 (S54) — planning tools
    `/${locale}/build-route`,
    `/${locale}/compare`,
    `/${locale}/cost-index`,
    `/${locale}/explore-by-persona`,
    `/${locale}/gap-year`,
    `/${locale}/permits`,
    `/${locale}/risk-quiz`,
    `/${locale}/road-conditions`,
    `/${locale}/where-to-go`,
    `/${locale}/arrival`,
    // Phase 3 Tier 6 (S54) — comparison hubs
    `/${locale}/vs`,
    `/${locale}/india-vs`,
    // Phase 3 Tier 7 (S54) — editorial + brand surfaces
    `/${locale}/newsletter`,
    `/${locale}/press`,
    `/${locale}/editorial-policy`,
    `/${locale}/corrections`,
    `/${locale}/transparency`,
    `/${locale}/sos`,
    `/${locale}/social`,
    `/${locale}/more`,
    // Phase 3 Tier 8 (S54) — account surfaces (app shell)
    `/${locale}/ask`,
    `/${locale}/saved`,
    `/${locale}/trip`,
    `/${locale}/membership`,
  ];
  // Dynamic segments — body is cinematic on any matching descendant route.
  const CINEMATIC_PAGE_PREFIXES = [
    `/${locale}/skip-list/`,
    `/${locale}/blog/`,
    `/${locale}/guide/scenarios/`,
    `/${locale}/routes/`,
    // Tier 2 children (S54) — filter pages now cinematic
    `/${locale}/treks/`,
    `/${locale}/festivals/`,
    `/${locale}/stays/`,
    `/${locale}/camping/`,
    // Tier 3 children (S54) — geography
    `/${locale}/state/`,
    `/${locale}/region/`,
    `/${locale}/india/`,
    `/${locale}/family/`,
    `/${locale}/with-kids/`,
    // Tier 4 (S54) — weekend-from-<city> (19 metros)
    `/${locale}/weekend-from-`,
    // Tier 5 (S54) — planning tools children
    `/${locale}/cost-index/`,
    `/${locale}/gap-year/`,
    `/${locale}/arrival/`,
    `/${locale}/where-to-go/`,
    `/${locale}/for/`,
    // Tier 6 (S54) — comparison detail pages
    `/${locale}/vs/`,
    `/${locale}/india-vs/`,
    // Tier 8 (S54) — shared trip board
    `/${locale}/trip/`,
  ];
  const isCinematicPage =
    CINEMATIC_PAGE_PATHS.includes(pathname) ||
    CINEMATIC_PAGE_PREFIXES.some((p) => pathname.startsWith(p));
  // Destinations that have opted into the cinematic body template ALSO get
  // the magazine-style full-bleed nav, so the chrome matches the body.
  // Without this, the destination page rendered the production mega-menu
  // which clashes with the editorial dispatch feel.
  const isCinematicDestination = Array.from(CINEMATIC_DESTINATIONS).some(
    (slug) =>
      pathname === `/${locale}/destination/${slug}` ||
      pathname.startsWith(`/${locale}/destination/${slug}/`),
  );
  const isCinematic = isLandingRoot || isCinematicPage || isCinematicDestination;

  // Hero-scroll transparency applies to any cinematic page with a full-bleed
  // 100vh hero (landing + cinematic destination). Legal pages render solid
  // from scroll position 0 since they have no hero.
  const hasHero = isLandingRoot || isCinematicDestination;
  const [overHero, setOverHero] = useState(hasHero);
  useEffect(() => {
    if (!hasHero) return;
    function onScroll() {
      // 100vh hero — flip to solid bg once you scroll past 80% of it so the
      // transition completes before the Nav crosses into the lighter content
      // below the fold.
      setOverHero(window.scrollY < window.innerHeight * 0.8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [hasHero]);

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
    setMobileMenuOpen(false);
    setMoreOpen(false);
  }, [pathname]);

  // Lock body scroll while the cinematic mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [mobileMenuOpen]);

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

  // Which panel should be "active" based on current path.
  // Sprint 11 nav-simplification: merged Destinations + Experiences + Browse
  // into one Explore panel. Three triggers now (Explore / Plan / Discover)
  // instead of five.
  function panelActiveForPath(panel: PanelType) {
    if (panel === "explore") {
      return ["/explore", "/collections", "/routes", "/treks", "/camping", "/festivals", "/stays", "/state/", "/states", "/region/", "/for/"].some(
        (p) => pathname.includes(p)
      );
    }
    if (panel === "plan") {
      return ["/where-to-go", "/build-route", "/permits", "/road-conditions", "/plan", "/cost-index", "/explore-by-persona"].some(
        (p) => pathname.includes(p)
      );
    }
    if (panel === "learn") {
      return ["/india-travel", "/blog", "/tourist-traps", "/guide", "/superlatives", "/nakshiq-100", "/arrival", "/gap-year"].some(
        (p) => pathname.includes(p)
      );
    }
    return false;
  }

  const triggers: { panel: PanelType; label: string }[] = [
    { panel: "explore", label: t("explore") },
    { panel: "plan", label: t("planLabel") },
    { panel: "learn", label: t("learn") },
  ];

  // ── Cinematic landing nav ────────────────────────────────────
  // On `/[locale]` exactly, render a minimal magazine-style nav that
  // mirrors the v1-editorial design: Naksh.iq italic logo (left), 6
  // all-caps magazine links (center), ISSUE badge (right). No mega-menu
  // panels, no auth/AI buttons — those add visual weight that breaks the
  // editorial dispatch feel. Search stays available via Cmd+K (handled by
  // the global keyboard listener at the top of this component).
  if (isCinematic) {
    const cinemaItems: { label: string; href: string }[] = [
      { label: t("destinations"), href: `/${locale}/explore` },
      { label: t("collections"), href: `/${locale}/collections` },
      { label: t("planLabel"), href: `/${locale}/plan` },
      // SKIP LIST points at /tourist-traps (the existing analog).
      // THE WINDOW points at /the-window (the newsletter archive index).
      { label: "SKIP LIST", href: `/${locale}/tourist-traps` },
      { label: "THE WINDOW", href: `/${locale}/the-window` },
      { label: t("about"), href: `/${locale}/about` },
    ];
    const issueNum = (() => {
      // Same derivation as helpers.ts getIssueNumber — May 2026 = Issue Nº 47.
      const launch = new Date("2022-07-01T00:00:00Z");
      const now = new Date();
      const months =
        (now.getUTCFullYear() - launch.getUTCFullYear()) * 12 +
        (now.getUTCMonth() - launch.getUTCMonth());
      return Math.max(1, months + 1);
    })();
    const monthLabel = new Date()
      .toLocaleString("en-IN", { timeZone: "Asia/Kolkata", month: "long", year: "numeric" })
      .toUpperCase();

    return (
      <>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[60] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground focus:text-sm focus:font-medium"
        >
          Skip to content
        </a>
        <header
          className={
            overHero
              ? "fixed top-0 left-0 right-0 z-50 bg-transparent transition-[background-color,backdrop-filter] duration-500"
              : "fixed top-0 left-0 right-0 z-50 bg-[#0a0a08]/85 backdrop-blur-xl border-b border-white/10 transition-[background-color,backdrop-filter] duration-500"
          }
        >
          <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-4 px-5 md:px-8 py-4 md:py-5">
            {/* Logo — Fraunces italic, vermillion period, no "N." chip */}
            <Link
              href={`/${locale}`}
              className="font-[var(--font-fraunces)] italic font-medium text-[22px] md:text-[24px] tracking-[-0.015em] text-[#F5F1E8] leading-none"
              style={{ fontStyle: "italic" }}
            >
              Naksh<span className="text-[#E55642]">.</span>iq
            </Link>

            {/* Center — 6 all-caps magazine links (desktop only) */}
            <nav className="hidden md:flex items-center gap-8">
              {cinemaItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="font-[var(--font-geist-sans)] font-medium text-[12px] uppercase tracking-[0.18em] text-[#F5F1E8]/85 hover:text-[#F5F1E8] transition-colors whitespace-nowrap"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Right cluster (desktop) — utility controls + MORE + ISSUE badge.
                Restored after the cinematic flip stripped these. Cream-on-dark
                so the editorial chrome stays visually quiet. */}
            <div className="hidden md:flex items-center gap-1">
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                aria-label="Search (⌘K)"
                title="Search (⌘K)"
                className="p-2 text-[#F5F1E8]/75 hover:text-[#F5F1E8] transition-colors"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => window.dispatchEvent(new Event("asknakshiq:open"))}
                aria-label="Ask NakshIQ"
                title="Ask NakshIQ"
                className="p-2 text-[#F5F1E8]/75 hover:text-[#F5F1E8] transition-colors"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  <path d="M9.5 9h.01" />
                  <path d="M14.5 9h.01" />
                  <path d="M9 13a3 3 0 0 0 6 0" />
                </svg>
              </button>
              {/* Language toggle — minimal cream-on-dark variant. Mobile menu
                  still uses the default LanguageToggle component. */}
              <button
                type="button"
                onClick={() => {
                  const next = locale === "en" ? "hi" : "en";
                  const segments = pathname.split("/");
                  segments[1] = next;
                  window.location.href = segments.join("/");
                }}
                aria-label={`Switch to ${locale === "en" ? "Hindi" : "English"}`}
                className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#F5F1E8]/75 hover:text-[#F5F1E8] transition-colors px-2 py-2"
              >
                {locale === "en" ? "हि" : "EN"}
              </button>
              <button
                type="button"
                onClick={() => setMoreOpen(true)}
                aria-label="More"
                className="font-[var(--font-geist-sans)] font-medium text-[12px] uppercase tracking-[0.18em] text-[#F5F1E8]/85 hover:text-[#F5F1E8] transition-colors whitespace-nowrap px-3 py-2"
              >
                {t("more")}
              </button>
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#F5F1E8]/60 whitespace-nowrap ml-2">
                ISSUE Nº {issueNum} · {monthLabel}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={mobileMenuOpen}
              className="md:hidden flex flex-col items-end gap-[5px] p-2 -mr-2"
            >
              <span className="block h-[2px] w-6 bg-[#F5F1E8]" />
              <span className="block h-[2px] w-4 bg-[#F5F1E8]" />
            </button>
          </div>
        </header>

        {/* Mobile menu — full-screen overlay */}
        {mobileMenuOpen && (
          <div
            className="md:hidden fixed inset-0 z-[60] flex flex-col bg-[#0a0a08] text-[#F5F1E8]"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
          >
            <div className="flex items-center justify-between gap-4 px-5 py-4 border-b border-white/10">
              <Link
                href={`/${locale}`}
                onClick={() => setMobileMenuOpen(false)}
                className="font-[var(--font-fraunces)] italic font-medium text-[22px] tracking-[-0.015em] text-[#F5F1E8] leading-none"
                style={{ fontStyle: "italic" }}
              >
                Naksh<span className="text-[#E55642]">.</span>iq
              </Link>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
                className="p-2 -mr-2 text-[22px] leading-none"
              >
                ×
              </button>
            </div>
            <nav className="flex flex-col flex-1 px-5 pt-8 pb-12 overflow-y-auto">
              {cinemaItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-[var(--font-fraunces)] italic text-[34px] leading-[1.1] tracking-[-0.012em] text-[#F5F1E8] py-4 border-b border-white/10"
                >
                  {item.label}
                </Link>
              ))}
              {/* Utility row — mobile users can also tap to open Search,
                  AskNakshIQ, and the MORE sitemap from this overlay. */}
              <div className="mt-6 flex items-center gap-2 flex-wrap">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setSearchOpen(true);
                  }}
                  className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#F5F1E8]/85 hover:text-[#F5F1E8] border border-white/15 rounded-full px-4 py-2 transition-colors"
                >
                  Search
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    window.dispatchEvent(new Event("asknakshiq:open"));
                  }}
                  className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#F5F1E8]/85 hover:text-[#F5F1E8] border border-white/15 rounded-full px-4 py-2 transition-colors"
                >
                  Ask
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setMoreOpen(true);
                  }}
                  className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#F5F1E8]/85 hover:text-[#F5F1E8] border border-white/15 rounded-full px-4 py-2 transition-colors"
                >
                  More
                </button>
              </div>
              <div className="mt-8 flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#F5F1E8]/60">
                  ISSUE Nº {issueNum} · {monthLabel}
                </span>
                <LanguageToggle />
              </div>
            </nav>
          </div>
        )}

        <SearchCommand open={searchOpen} onClose={() => setSearchOpen(false)} />
        <CinematicMoreOverlay open={moreOpen} onClose={() => setMoreOpen(false)} />
      </>
    );
  }

  return (
    <>
    {/* Skip to content — accessibility */}
    <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[60] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground focus:text-sm focus:font-medium">
      Skip to content
    </a>
    <header
      className="sticky top-0 z-50 border-b border-border/50 bg-background/90 backdrop-blur-xl shadow-sm"
    >
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

        {/* Desktop nav — Sprint 11: 3 mega-menu triggers (Explore/Plan/Discover)
           replace the old 5-trigger + Destinations direct link setup. */}
        <nav className="hidden items-center gap-1 md:flex">
          {/* Mega-menu triggers */}
          {triggers.map(({ panel, label }) => (
            <div
              key={panel}
              className="relative"
              onMouseEnter={() => openPanel(panel)}
              onMouseLeave={startClose}
            >
              <button
                data-tour={panel === "plan" ? "plan-menu" : panel === "learn" ? "learn-menu" : undefined}
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
            data-tour="plan-cta"
            className="ml-2 rounded-lg bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 flex items-center gap-1.5"
          >
            <span>{t("aiPlan")}</span>
            <span className="rounded bg-white/20 px-1 py-0.5 text-[10px] font-bold leading-none">{t("new")}</span>
          </Link>
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSearchOpen(true)}
            className="rounded-lg p-2 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            aria-label="Search (Cmd+K)"
            data-tour="search"
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
          <button
            type="button"
            onClick={() => window.dispatchEvent(new Event("asknakshiq:open"))}
            className="rounded-lg p-2 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            aria-label="Ask NakshIQ — AI assistant"
            title="Ask NakshIQ"
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
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              <path d="M9.5 9h.01" />
              <path d="M14.5 9h.01" />
              <path d="M9 13a3 3 0 0 0 6 0" />
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
      {/* Banner is suppressed on cinematic-redesigned pages — the
          InternationalBanner adds ~40px of layout space at the top which would
          push the hero down and break full-bleed on the landing, and clashes
          with the editorial dark palette on legal pages. Old-design pages
          still render it. */}
      {!isCinematic && <InternationalBanner />}
    </header>
    </>
  );
}
