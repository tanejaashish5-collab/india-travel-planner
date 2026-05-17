"use client";

/* ============================================================
   Cinematic MORE overlay — full-screen takeover opened from the
   cinematic nav's MORE button. Mirrors the footer sitemap (4
   columns: Plan · Discover · Read · About) and adds a 5th Tools
   column for active-discovery surfaces (Ask, Compare, quizzes).

   Source of truth: apps/web/src/lib/site-directory.ts — add a
   route there and it shows up here AND in the footer.

   A11y: aria-modal, focus trap (first link auto-focuses, ESC
   closes, click on backdrop closes), body-scroll lock (mirrors
   the pattern in nav.tsx mobile menu).
   ============================================================ */

import { useEffect, useRef } from "react";
import { useLocale, useTranslations } from "next-intl";
import {
  FOOTER_GROUPS,
  OVERLAY_TOOLS_GROUP,
  type DirectoryGroup,
} from "@/lib/site-directory";

interface Props {
  open: boolean;
  onClose: () => void;
}

export function CinematicMoreOverlay({ open, onClose }: Props) {
  const locale = useLocale();
  const t = useTranslations("footer");
  const firstLinkRef = useRef<HTMLAnchorElement | null>(null);

  /* ESC to close + body-scroll lock + focus the first link on open.
     Pattern lifted from the cinematic mobile menu in nav.tsx so the
     two overlays behave identically. */
  useEffect(() => {
    if (!open) return;

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);

    // Focus first link after the mount animation kicks in.
    const t = setTimeout(() => firstLinkRef.current?.focus(), 80);

    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      clearTimeout(t);
    };
  }, [open, onClose]);

  if (!open) return null;

  const groups: DirectoryGroup[] = [...FOOTER_GROUPS, OVERLAY_TOOLS_GROUP];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={t("moreTitle")}
      className="nakshiq-cinema fixed inset-0 z-[80] overflow-y-auto"
      style={{
        background: "var(--paper)",
        color: "var(--bone)",
      }}
      onClick={(e) => {
        // Click on the dialog backdrop (the outer div itself) closes
        // the overlay. Inner clicks bubble through the columns and
        // stop here.
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Header strip — title + close */}
      <div
        className="mx-auto flex max-w-[1500px] items-center justify-between gap-4 px-5 md:px-8"
        style={{ paddingTop: "28px", paddingBottom: "28px" }}
      >
        <p
          className="nq-kicker"
          style={{ color: "var(--vermillion)", letterSpacing: "0.22em" }}
        >
          {t("moreTitle")}
        </p>
        <button
          type="button"
          onClick={onClose}
          aria-label={t("moreClose")}
          className="nq-mono"
          style={{
            fontFamily: "var(--cinema-mono)",
            fontSize: 22,
            lineHeight: 1,
            color: "var(--bone)",
            background: "transparent",
            border: 0,
            cursor: "pointer",
            padding: "8px 12px",
            marginRight: -12,
          }}
        >
          ×
        </button>
      </div>

      <hr className="nq-hr" />

      {/* 5-column grid on desktop, stacked on mobile */}
      <div
        className="mx-auto max-w-[1500px] px-5 md:px-8"
        style={{ paddingTop: "56px", paddingBottom: "96px" }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: 48,
          }}
        >
          {groups.map((group, gi) => (
            <div key={group.titleKey}>
              <p
                className="nq-kicker"
                style={{
                  color: "var(--vermillion)",
                  marginBottom: 20,
                  letterSpacing: "0.18em",
                }}
              >
                {t(`section.${group.titleKey}`)}
              </p>
              <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                {group.links.map((link, li) => (
                  <li key={link.labelKey} style={{ marginBottom: 14 }}>
                    <a
                      ref={gi === 0 && li === 0 ? firstLinkRef : undefined}
                      href={link.href(locale)}
                      onClick={onClose}
                      style={{
                        fontFamily: "var(--cinema-display)",
                        fontStyle: "italic",
                        fontWeight: 400,
                        fontSize: 22,
                        lineHeight: 1.25,
                        letterSpacing: "-0.012em",
                        color: "var(--bone)",
                        textDecoration: "none",
                        transition: "color 200ms ease",
                        display: "inline-block",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = "var(--vermillion)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = "var(--bone)";
                      }}
                    >
                      {t(`link.${link.labelKey}`)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
