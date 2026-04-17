"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { MobileSearch } from "./mobile-search";
import { ExperiencesSheet } from "./experiences-sheet";

export function MobileTabBar() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [searchOpen, setSearchOpen] = useState(false);
  const [experiencesOpen, setExperiencesOpen] = useState(false);

  function isActive(paths: string[]) {
    return paths.some((p) => {
      const full = `/${locale}${p}`;
      return pathname === full || pathname.startsWith(full + "/");
    });
  }

  const tabs = [
    {
      id: "explore",
      label: "Explore",
      active: isActive(["/explore", "/destination", "/state", "/region", "/states"]),
      action: () => router.push(`/${locale}/explore`),
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
        </svg>
      ),
    },
    {
      id: "search",
      label: "Search",
      active: false,
      action: () => setSearchOpen(true),
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
      ),
    },
    {
      id: "experiences",
      label: "Discover",
      active: isActive(["/collections", "/routes", "/treks", "/camping", "/festivals", "/stays", "/where-to-go", "/permits", "/tourist-traps", "/superlatives"]),
      action: () => setExperiencesOpen(true),
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
          <rect x="14" y="14" width="7" height="7" rx="1" />
        </svg>
      ),
    },
    {
      id: "trip",
      label: "My Trip",
      active: isActive(["/saved", "/trip", "/compare", "/plan"]),
      action: () => router.push(`/${locale}/saved`),
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      ),
    },
    {
      id: "more",
      label: "More",
      active: isActive(["/about", "/profile", "/terms", "/privacy"]),
      action: () => router.push(`/${locale}`),
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <line x1="4" y1="6" x2="20" y2="6" />
          <line x1="4" y1="12" x2="20" y2="12" />
          <line x1="4" y1="18" x2="20" y2="18" />
        </svg>
      ),
    },
  ];

  return (
    <>
      <nav
        className="fixed bottom-0 left-0 right-0 z-40 border-t border-border/50 bg-background/95 backdrop-blur-lg md:hidden pb-safe"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="mx-auto flex max-w-lg items-center justify-around px-1 py-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={tab.action}
              className={`flex flex-col items-center justify-center gap-0.5 rounded-lg px-2 py-1.5 text-[10px] font-medium transition-all min-w-[48px] min-h-[44px] active:scale-95 ${
                tab.active ? "text-[#E55642]" : "text-muted-foreground"
              }`}
            >
              <span className={tab.active ? "text-[#E55642]" : "text-muted-foreground"}>
                {tab.icon}
              </span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </nav>

      <MobileSearch open={searchOpen} onClose={() => setSearchOpen(false)} />
      <ExperiencesSheet open={experiencesOpen} onClose={() => setExperiencesOpen(false)} />
    </>
  );
}
