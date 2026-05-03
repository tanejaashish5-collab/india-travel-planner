"use client";

import { useRouter, usePathname } from "next/navigation";
import { useCallback } from "react";

/**
 * "Take the tour" link.
 *
 * If we're already on the homepage path (/{locale} or /{locale}/), fire the
 * `nakshiq:tour-replay` window event directly — same-page navigation does
 * not re-mount the GuidedTour so the ?tour=1 param trick won't work there.
 *
 * If we're elsewhere, navigate to /{locale}/?tour=1 and let GuidedTour pick
 * up the param on mount.
 */
export function TourReplayLink({ locale, label }: { locale: string; label: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const onClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      const homepathA = `/${locale}`;
      const homepathB = `/${locale}/`;
      const isHome = pathname === homepathA || pathname === homepathB;
      if (isHome) {
        try { localStorage.removeItem("nakshiq_tour_v2"); } catch {}
        window.dispatchEvent(new Event("nakshiq:tour-replay"));
      } else {
        router.push(`/${locale}/?tour=1`);
      }
    },
    [locale, pathname, router]
  );
  return (
    <a
      href={`/${locale}/?tour=1`}
      onClick={onClick}
      className="hover:text-foreground transition-colors cursor-pointer"
    >
      {label}
    </a>
  );
}
