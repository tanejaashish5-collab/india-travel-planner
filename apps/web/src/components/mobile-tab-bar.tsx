"use client";

import { useLocale } from "next-intl";
import { usePathname } from "next/navigation";

const tabs = [
  {
    id: "explore",
    label: "Explore",
    href: "/explore",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
      </svg>
    ),
  },
  {
    id: "states",
    label: "States",
    href: "/states",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
  {
    id: "collections",
    label: "Collections",
    href: "/collections",
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
    id: "saved",
    label: "Saved",
    href: "/saved",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
  },
  {
    id: "menu",
    label: "More",
    href: "/plan",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <line x1="3" y1="6" x2="21" y2="6" />
        <line x1="3" y1="12" x2="21" y2="12" />
        <line x1="3" y1="18" x2="21" y2="18" />
      </svg>
    ),
  },
];

export function MobileTabBar() {
  const locale = useLocale();
  const pathname = usePathname();

  function isActive(tabHref: string) {
    const fullHref = `/${locale}${tabHref}`;
    return pathname === fullHref || pathname.startsWith(fullHref + "/");
  }

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 border-t border-border/50 bg-background md:hidden pb-safe"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="mx-auto flex max-w-lg items-center justify-around px-2 py-1.5">
        {tabs.map((tab) => {
          const active = isActive(tab.href);
          return (
            <a
              key={tab.id}
              href={`/${locale}${tab.href}`}
              className={`flex flex-col items-center justify-center gap-0.5 rounded-lg px-2.5 py-1.5 text-[10px] font-medium transition-colors min-w-[48px] min-h-[44px] ${
                active
                  ? "text-[#E55642]"
                  : "text-muted-foreground"
              }`}
            >
              <span className={active ? "text-[#E55642]" : "text-muted-foreground"}>
                {tab.icon}
              </span>
              <span>{tab.label}</span>
            </a>
          );
        })}
      </div>
    </nav>
  );
}
