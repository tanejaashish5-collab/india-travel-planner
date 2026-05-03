"use client";

import { useRouter, usePathname } from "next/navigation";
import { useCallback } from "react";

/**
 * "Start over" / replay link for the Trip Board ColdStart wizard.
 *
 * Mirrors `tour-replay-link.tsx`: same-path navigation in Next.js App Router
 * doesn't remount, so the `?coldstart=1` URL param trick only works when
 * we're elsewhere. When we're already on /{locale}/trip, fire the
 * `nakshiq:coldstart-replay` window event directly instead.
 *
 * Use from a "Start over" CTA in the board chrome, or from the footer if
 * we want a global "Plan a fresh trip" link.
 */
export function ColdStartReplayLink({ locale, label, className }: { locale: string; label: string; className?: string }) {
  const router = useRouter();
  const pathname = usePathname();

  const onClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      const tripPathA = `/${locale}/trip`;
      const tripPathB = `/${locale}/trip/`;
      const isOnTrip = pathname === tripPathA || pathname === tripPathB;
      if (isOnTrip) {
        window.dispatchEvent(new Event("nakshiq:coldstart-replay"));
      } else {
        router.push(`/${locale}/trip?coldstart=1`);
      }
    },
    [locale, pathname, router]
  );

  return (
    <a
      href={`/${locale}/trip?coldstart=1`}
      onClick={onClick}
      className={className ?? "hover:text-foreground transition-colors cursor-pointer"}
    >
      {label}
    </a>
  );
}
