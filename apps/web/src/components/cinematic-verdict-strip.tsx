"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useLocale } from "next-intl";
import {
  formatScore,
  verdictFor,
  verdictTier,
  VERDICT_COLOR,
  currentMonthLongIST,
  type VerdictTier,
} from "@itp/shared";

// Mini verdict strip pinned to the bottom edge of the viewport — appears
// after the reader scrolls past the hero, hides on the Coda, and
// auto-fades after 8s of no scroll (re-fades-in on next scroll). Compromise
// against production's permanent floating "MAY AT A GLANCE" card which would
// ruin the cinematic flow.
//
// Single line: WAIT · 3/5 · MAY · MANALI    Build route · Ask AI · vs Sissu
export function CinematicVerdictStrip({
  destinationId,
  destinationName,
  rawScore,
  firstNeighbourId,
  firstNeighbourName,
}: {
  destinationId: string;
  destinationName: string;
  rawScore: number | null;
  firstNeighbourId?: string | null;
  firstNeighbourName?: string | null;
}) {
  const locale = useLocale();
  const [visible, setVisible] = useState(false);
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    function show() {
      setVisible(true);
      if (idleTimer.current) clearTimeout(idleTimer.current);
      idleTimer.current = setTimeout(() => setVisible(false), 8000);
    }
    function check() {
      const cover = document.getElementById("dest-act-1");
      const coda = document.getElementById("dest-act-11");
      const pastHero = cover
        ? cover.getBoundingClientRect().bottom < 60
        : window.scrollY > window.innerHeight * 0.85;
      const inCoda = coda
        ? coda.getBoundingClientRect().top < window.innerHeight * 0.5
        : false;
      if (pastHero && !inCoda) show();
      else setVisible(false);
    }
    check();
    window.addEventListener("scroll", check, { passive: true });
    return () => {
      window.removeEventListener("scroll", check);
      if (idleTimer.current) clearTimeout(idleTimer.current);
    };
  }, []);

  if (rawScore == null) return null;

  const displayScore = rawScore * 2;
  const tier: VerdictTier = verdictTier(displayScore);
  const verdict = verdictFor(displayScore);
  const tint = VERDICT_COLOR[tier];
  const monthName = currentMonthLongIST().toUpperCase();

  return (
    <div
      role="complementary"
      aria-label="Verdict at a glance"
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 28,
        display: "flex",
        justifyContent: "center",
        pointerEvents: "none",
        transform: visible ? "translateY(0)" : "translateY(120%)",
        opacity: visible ? 1 : 0,
        transition: "transform 280ms ease, opacity 240ms ease",
      }}
    >
      <div
        style={{
          pointerEvents: "auto",
          display: "inline-flex",
          alignItems: "center",
          gap: 18,
          padding: "10px 22px",
          marginBottom: 12,
          background: "rgba(10,10,8,0.82)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          border: "1px solid rgba(245,241,232,0.18)",
          borderRadius: 999,
          fontFamily: "var(--cinema-mono, ui-monospace)",
          fontSize: 11,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: "var(--bone)",
          flexWrap: "wrap",
          justifyContent: "center",
          maxWidth: "calc(100% - 24px)",
        }}
      >
        <span style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
          <span style={{ color: tint, fontWeight: 700 }}>{verdict}</span>
          <span style={{ color: "var(--bone-faint)" }}>·</span>
          <span
            style={{
              color: tint,
              fontWeight: 700,
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {formatScore(rawScore)}
          </span>
          <span style={{ color: "var(--bone-faint)" }}>·</span>
          <span>{monthName}</span>
          <span style={{ color: "var(--bone-faint)" }}>·</span>
          <span>{destinationName}</span>
        </span>
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 14,
            paddingLeft: 14,
            borderLeft: "1px solid rgba(245,241,232,0.18)",
          }}
        >
          <Link
            href={`/${locale}/plan?destination=${destinationId}`}
            style={{
              color: "var(--bone-dim)",
              textDecoration: "none",
              transition: "color 160ms ease",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLAnchorElement).style.color =
                "var(--vermillion)")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLAnchorElement).style.color =
                "var(--bone-dim)")
            }
          >
            Build route
          </Link>
          {firstNeighbourId && firstNeighbourName && (
            <Link
              href={`/${locale}/compare?compare=${destinationId},${firstNeighbourId}`}
              style={{
                color: "var(--bone-dim)",
                textDecoration: "none",
                transition: "color 160ms ease",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color =
                  "var(--vermillion)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color =
                  "var(--bone-dim)")
              }
            >
              vs {firstNeighbourName}
            </Link>
          )}
        </span>
      </div>
    </div>
  );
}
