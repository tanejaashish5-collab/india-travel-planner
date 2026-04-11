"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { LanguageToggle } from "./language-toggle";
import { UserButton } from "./user-button";
import { SearchCommand } from "./search-command";
import { useState, useEffect } from "react";

export function Nav() {
  const locale = useLocale();
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [searchOpen, setSearchOpen] = useState(false);

  // Cmd+K / Ctrl+K keyboard shortcut
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const primaryLinks = [
    { href: `/${locale}/explore`, label: t("destinations") },
    { href: `/${locale}/collections`, label: t("collections") },
    { href: `/${locale}/routes`, label: t("routes") },
    { href: `/${locale}/treks`, label: t("treks") },
    { href: `/${locale}/trip`, label: t("myTrip") },
    { href: `/${locale}/saved`, label: "♥" },
  ];

  const currentMonthSlug = ["","january","february","march","april","may","june","july","august","september","october","november","december"][new Date().getMonth() + 1];

  const moreLinks = [
    { href: `/${locale}/where-to-go/${currentMonthSlug}`, label: t("whereToGoNow") },
    { href: `/${locale}/india-travel`, label: t("forVisitors") },
    { href: `/${locale}/blog`, label: t("blog") },
    { href: `/${locale}/tourist-traps`, label: t("touristTraps") },
    { href: `/${locale}/guide`, label: t("guides") },
    { href: `/${locale}/stays`, label: t("stays") },
    { href: `/${locale}/festivals`, label: t("festivals") },
    { href: `/${locale}/camping`, label: t("camping") },
    { href: `/${locale}/permits`, label: t("permits") },
    { href: `/${locale}/road-conditions`, label: t("roads") },
    { href: `/${locale}/superlatives`, label: t("records") },
    { href: `/${locale}/build-route`, label: t("buildRoute") },
    { href: `/${locale}/about`, label: t("about") },
  ];

  function isActive(href: string) {
    return pathname.startsWith(href);
  }

  return (
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
          {primaryLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                isActive(link.href)
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {link.label}
            </Link>
          ))}

          {/* More dropdown */}
          <div className="relative group">
            <button className="rounded-lg px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
              {t("more")}
            </button>
            <div className="absolute right-0 top-full mt-1 w-40 rounded-xl border border-border bg-card/95 backdrop-blur-md shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div className="py-1">
                {moreLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`block px-4 py-2 text-sm transition-colors ${
                      isActive(link.href) ? "text-primary bg-primary/5" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <Link
            href={`/${locale}/plan`}
            className="ml-2 rounded-lg bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 flex items-center gap-1.5"
          >
            <span>{t("aiPlan")}</span>
            <span className="rounded bg-white/20 px-1 py-1 text-xs font-bold">NEW</span>
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

      {/* Mobile nav removed — handled by bottom tab bar */}
      <SearchCommand open={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  );
}
