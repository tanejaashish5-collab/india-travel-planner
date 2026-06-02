"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { KEY_EVENTS, track } from "@/lib/analytics";
import { isSaved, toggleSaved } from "@/lib/saved-destinations";
import { useCompare } from "./compare-tray";

type Position = "hero" | "sticky";

export function CinematicShareBar({
  destinationId,
  destinationName,
  tagline,
  position = "hero",
}: {
  destinationId: string;
  destinationName: string;
  tagline?: string | null;
  position?: Position;
}) {
  const locale = useLocale();
  const tUi = useTranslations("ui");
  const tDest = useTranslations("destination");
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);
  const [visible, setVisible] = useState(position === "hero");
  const { addToCompare, removeFromCompare, isInCompare } = useCompare();
  const comparing = isInCompare(destinationId);

  useEffect(() => {
    setSaved(isSaved(destinationId));
  }, [destinationId]);

  useEffect(() => {
    if (position !== "sticky") return;
    function onScroll() {
      const cover = document.getElementById("dest-act-1");
      if (!cover) return;
      const rect = cover.getBoundingClientRect();
      // Show once cover is mostly out of view; hide on Coda.
      const coda = document.getElementById("dest-act-11");
      const codaRect = coda?.getBoundingClientRect();
      const inCoda = codaRect ? codaRect.top < window.innerHeight * 0.4 : false;
      setVisible(rect.bottom < 80 && !inCoda);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [position]);

  function toggleSave() {
    // Shared util dispatches the change-event → SaveListEmailPrompt reacts.
    const { isSaved: nowSaved } = toggleSaved(destinationId);
    setSaved(nowSaved);
    track(KEY_EVENTS.SAVE_DESTINATION, {
      destination: destinationId,
      action: nowSaved ? "add" : "remove",
      surface: "cinematic",
    });
  }

  async function handleShare() {
    const url =
      typeof window !== "undefined" ? window.location.href : "";
    const text = tagline ?? destinationName;
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title: destinationName, text, url });
        track(KEY_EVENTS.SHARE_CLICK, {
          method: "native",
          surface: "cinematic",
          url,
        });
        return;
      } catch {
        // user cancelled — fall through to WhatsApp
      }
    }
    const wa = encodeURIComponent(`${destinationName}\n${text}\n${url}`);
    track(KEY_EVENTS.SHARE_CLICK, {
      method: "whatsapp_fallback",
      surface: "cinematic",
      url,
    });
    window.open(`https://wa.me/?text=${wa}`, "_blank");
  }

  function handleWhatsApp() {
    const url =
      typeof window !== "undefined" ? window.location.href : "";
    const text = tagline ?? destinationName;
    const wa = encodeURIComponent(`${destinationName}\n${text}\n${url}`);
    track(KEY_EVENTS.SHARE_CLICK, {
      method: "whatsapp",
      surface: "cinematic",
      url,
    });
    window.open(`https://wa.me/?text=${wa}`, "_blank");
  }

  function handleCopy() {
    const url =
      typeof window !== "undefined" ? window.location.href : "";
    navigator.clipboard.writeText(url);
    track(KEY_EVENTS.SHARE_CLICK, {
      method: "copy_link",
      surface: "cinematic",
      url,
    });
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  function handleCompare(e: React.MouseEvent) {
    e.preventDefault();
    if (comparing) removeFromCompare(destinationId);
    else addToCompare(destinationId);
  }

  const containerStyle: React.CSSProperties =
    position === "hero"
      ? {
          position: "absolute",
          bottom: 120,
          right: 48,
          zIndex: 4,
          display: "flex",
          alignItems: "center",
          gap: 4,
          opacity: 1,
        }
      : {
          position: "fixed",
          top: 16,
          right: 16,
          zIndex: 35,
          display: "flex",
          alignItems: "center",
          gap: 4,
          padding: "6px 10px",
          background: "rgba(10,10,8,0.72)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          border: "1px solid rgba(245,241,232,0.18)",
          borderRadius: 999,
          opacity: visible ? 1 : 0,
          pointerEvents: visible ? "auto" : "none",
          transform: visible ? "translateY(0)" : "translateY(-12px)",
          transition: "opacity 280ms ease, transform 280ms ease",
        };

  const btnBase: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    height: 32,
    minWidth: 32,
    padding: "0 8px",
    background: "transparent",
    border: "none",
    color: "var(--bone)",
    fontFamily: "var(--cinema-mono, ui-monospace)",
    fontSize: 11,
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    cursor: "pointer",
    transition: "color 160ms ease, opacity 160ms ease",
  };

  return (
    <div style={containerStyle} aria-label="Share and save">
      <button
        type="button"
        onClick={toggleSave}
        aria-pressed={saved}
        aria-label={saved ? tUi("saved") : tUi("save")}
        title={saved ? tUi("saved") : tUi("save")}
        style={{
          ...btnBase,
          color: saved ? "var(--vermillion)" : "var(--bone)",
        }}
        onMouseEnter={(e) =>
          ((e.currentTarget as HTMLButtonElement).style.color =
            "var(--vermillion)")
        }
        onMouseLeave={(e) =>
          ((e.currentTarget as HTMLButtonElement).style.color = saved
            ? "var(--vermillion)"
            : "var(--bone)")
        }
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill={saved ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="1.6"
          aria-hidden="true"
        >
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      </button>
      <button
        type="button"
        onClick={handleShare}
        aria-label={tUi("share")}
        title={tUi("share")}
        style={btnBase}
        onMouseEnter={(e) =>
          ((e.currentTarget as HTMLButtonElement).style.color =
            "var(--vermillion)")
        }
        onMouseLeave={(e) =>
          ((e.currentTarget as HTMLButtonElement).style.color = "var(--bone)")
        }
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          aria-hidden="true"
        >
          <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
          <polyline points="16,6 12,2 8,6" />
          <line x1="12" y1="2" x2="12" y2="15" />
        </svg>
      </button>
      <button
        type="button"
        onClick={handleWhatsApp}
        aria-label={tUi("shareOnWhatsApp")}
        title={tUi("shareOnWhatsApp")}
        style={btnBase}
        onMouseEnter={(e) =>
          ((e.currentTarget as HTMLButtonElement).style.color =
            "var(--vermillion)")
        }
        onMouseLeave={(e) =>
          ((e.currentTarget as HTMLButtonElement).style.color = "var(--bone)")
        }
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884" />
        </svg>
      </button>
      <button
        type="button"
        onClick={handleCopy}
        aria-label={copied ? tUi("copied") : tUi("copyLink")}
        title={copied ? tUi("copied") : tUi("copyLink")}
        style={{
          ...btnBase,
          color: copied ? "var(--vermillion)" : "var(--bone)",
        }}
        onMouseEnter={(e) =>
          ((e.currentTarget as HTMLButtonElement).style.color =
            "var(--vermillion)")
        }
        onMouseLeave={(e) =>
          ((e.currentTarget as HTMLButtonElement).style.color = copied
            ? "var(--vermillion)"
            : "var(--bone)")
        }
      >
        {copied ? (
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            aria-hidden="true"
          >
            <polyline points="20,6 9,17 4,12" />
          </svg>
        ) : (
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            aria-hidden="true"
          >
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
          </svg>
        )}
      </button>
      <Link
        href={`/${locale}/compare?compare=${destinationId}`}
        onClick={handleCompare}
        aria-label={comparing ? tDest("comparing") : tDest("compare")}
        title={comparing ? tDest("comparing") : tDest("compare")}
        style={{
          ...btnBase,
          textDecoration: "none",
          color: comparing ? "var(--vermillion)" : "var(--bone)",
        }}
        onMouseEnter={(e) =>
          ((e.currentTarget as HTMLAnchorElement).style.color =
            "var(--vermillion)")
        }
        onMouseLeave={(e) =>
          ((e.currentTarget as HTMLAnchorElement).style.color = comparing
            ? "var(--vermillion)"
            : "var(--bone)")
        }
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          aria-hidden="true"
        >
          <path d="M3 6h18" />
          <path d="M3 12h18" />
          <path d="M3 18h18" />
          <circle cx="6" cy="6" r="1.5" fill="currentColor" />
          <circle cx="12" cy="12" r="1.5" fill="currentColor" />
          <circle cx="18" cy="18" r="1.5" fill="currentColor" />
        </svg>
      </Link>
    </div>
  );
}
