"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useLocale } from "next-intl";
import { KEY_EVENTS, track } from "@/lib/analytics";

// Mobile bottom-action bar — three buttons pinned to the bottom edge on
// phones only. Replaces the desktop floating Plan-AI pill on mobile so we
// don't double-stack actions (sticky-cta is hidden under sm via the
// existing media query). Hides on the Coda so the bookend reads final.
//
// Three buttons: ↗ Plan AI · ♥ Save · WhatsApp. Save reads the same
// localStorage key (savedDestinations) the rest of the app uses; Share
// uses native share with WhatsApp fallback (mirrors share-bar logic).
export function CinematicMobileActionBar({
  destinationId,
  destinationName,
  tagline,
}: {
  destinationId: string;
  destinationName: string;
  tagline?: string | null;
}) {
  const locale = useLocale();
  const [saved, setSaved] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const stored = JSON.parse(
      localStorage.getItem("savedDestinations") || "[]",
    );
    setSaved(stored.includes(destinationId));
  }, [destinationId]);

  useEffect(() => {
    function onScroll() {
      const coda = document.getElementById("dest-act-11");
      if (!coda) {
        setHidden(false);
        return;
      }
      const r = coda.getBoundingClientRect();
      setHidden(r.top < window.innerHeight * 0.5);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function toggleSave() {
    const stored = JSON.parse(
      localStorage.getItem("savedDestinations") || "[]",
    );
    if (saved) {
      const next = stored.filter((id: string) => id !== destinationId);
      localStorage.setItem("savedDestinations", JSON.stringify(next));
      setSaved(false);
      track(KEY_EVENTS.SAVE_DESTINATION, {
        destination: destinationId,
        action: "remove",
        surface: "cinematic_mobile_bar",
      });
    } else {
      stored.push(destinationId);
      localStorage.setItem("savedDestinations", JSON.stringify(stored));
      setSaved(true);
      track(KEY_EVENTS.SAVE_DESTINATION, {
        destination: destinationId,
        action: "add",
        surface: "cinematic_mobile_bar",
      });
    }
  }

  function handleWhatsApp() {
    const url =
      typeof window !== "undefined" ? window.location.href : "";
    const text = tagline ?? destinationName;
    const wa = encodeURIComponent(`${destinationName}\n${text}\n${url}`);
    track(KEY_EVENTS.SHARE_CLICK, {
      method: "whatsapp",
      surface: "cinematic_mobile_bar",
      url,
    });
    window.open(`https://wa.me/?text=${wa}`, "_blank");
  }

  const cell: React.CSSProperties = {
    display: "inline-flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    padding: "8px 4px",
    background: "transparent",
    border: "none",
    color: "var(--bone)",
    fontFamily: "var(--cinema-mono, ui-monospace)",
    fontSize: 9,
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    cursor: "pointer",
    textDecoration: "none",
    minHeight: 56,
  };

  return (
    <nav
      className="nq-mobile-action-bar"
      aria-label="Quick actions"
      style={{
        position: "fixed",
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 32,
        background: "rgba(10,10,8,0.92)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        borderTop: "1px solid rgba(245,241,232,0.18)",
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
        opacity: hidden ? 0 : 1,
        transform: hidden ? "translateY(100%)" : "translateY(0)",
        transition: "opacity 240ms ease, transform 240ms ease",
        pointerEvents: hidden ? "none" : "auto",
      }}
    >
      <Link
        href={`/${locale}/plan?destination=${destinationId}`}
        style={cell}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--vermillion)"
          strokeWidth="1.6"
          aria-hidden="true"
        >
          <line x1="5" y1="19" x2="19" y2="5" />
          <polyline points="9,5 19,5 19,15" />
        </svg>
        <span>Plan AI</span>
      </Link>
      <button type="button" onClick={toggleSave} style={cell}>
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill={saved ? "var(--vermillion)" : "none"}
          stroke={saved ? "var(--vermillion)" : "currentColor"}
          strokeWidth="1.6"
          aria-hidden="true"
        >
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
        <span style={{ color: saved ? "var(--vermillion)" : "var(--bone)" }}>
          {saved ? "Saved" : "Save"}
        </span>
      </button>
      <button type="button" onClick={handleWhatsApp} style={cell}>
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884" />
        </svg>
        <span>WhatsApp</span>
      </button>
    </nav>
  );
}
