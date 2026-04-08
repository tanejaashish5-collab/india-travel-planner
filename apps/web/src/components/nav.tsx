"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { LanguageToggle } from "./language-toggle";
import { UserButton } from "./user-button";
import { useState } from "react";

export function Nav() {
  const locale = useLocale();
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const primaryLinks = [
    { href: `/${locale}/explore`, label: t("explore") },
    { href: `/${locale}/collections`, label: t("collections") },
    { href: `/${locale}/routes`, label: t("routes") },
    { href: `/${locale}/treks`, label: t("treks") },
    { href: `/${locale}/trip`, label: "My Trip" },
    { href: `/${locale}/saved`, label: "♥" },
  ];

  const moreLinks = [
    { href: `/${locale}/stays`, label: "Where to Stay" },
    { href: `/${locale}/build-route`, label: "Build Route" },
    { href: `/${locale}/camping`, label: "Camping" },
    { href: `/${locale}/permits`, label: "Permits" },
    { href: `/${locale}/road-conditions`, label: "Roads" },
    { href: `/${locale}/superlatives`, label: "Records" },
    { href: `/${locale}/region/himachal-pradesh`, label: "HP" },
    { href: `/${locale}/region/uttarakhand`, label: "UK" },
    { href: `/${locale}/region/jammu-kashmir`, label: "J&K" },
    { href: `/${locale}/region/ladakh`, label: "Ladakh" },
    { href: `/${locale}/region/rajasthan`, label: "Rajasthan" },
    { href: `/${locale}/region/northeast`, label: "Northeast" },
    { href: `/${locale}/region/uttar-pradesh`, label: "UP" },
  ];

  // All links for mobile menu
  const links = [...primaryLinks, ...moreLinks];

  function isActive(href: string) {
    return pathname.startsWith(href);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/90 backdrop-blur-xl shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link href={`/${locale}`} className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
            IT
          </div>
          <span className="hidden text-lg font-bold sm:inline">
            India Travel Planner
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
              More
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
            <span>AI Plan</span>
            <span className="rounded bg-white/20 px-1 py-1 text-xs font-bold">NEW</span>
          </Link>
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <LanguageToggle />
          <UserButton />
          {/* Mobile menu button */}
          <button
            className="rounded-lg p-2 text-muted-foreground hover:text-foreground md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              {mobileOpen ? (
                <path d="M5 5l10 10M15 5L5 15" />
              ) : (
                <path d="M3 5h14M3 10h14M3 15h14" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <nav className="border-t border-border px-4 py-3 md:hidden">
          <div className="flex flex-col gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  isActive(link.href)
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href={`/${locale}/plan`}
              onClick={() => setMobileOpen(false)}
              className="mt-1 rounded-lg bg-primary px-3 py-2 text-center text-sm font-medium text-primary-foreground"
            >
              {t("planTrip")}
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
