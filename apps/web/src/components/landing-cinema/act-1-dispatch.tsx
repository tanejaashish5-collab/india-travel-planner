"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { destinationImage } from "@/lib/image-url";
import { currentMonthLongIST } from "@itp/shared";
import { Kinetic, useClock } from "./helpers";

/* ============================================================
   ACT I — The Dispatch
   Source: data/research/Landing Page/v1-editorial/app.jsx:60-109
   Hero slideshow of 3 PEAK destinations for the current month.
   Crossfades auto every 7.5s (manual prev/next + dot pagination).
   Each slide: Ken Burns image, top-left dispatch metadata,
   top-right NakshIQ Score, giant Fraunces italic destination name
   bottom-left, progress strip + prev/next bottom.

   Score scale: DB stores 0-5, display ×2 to render 0-10 with
   one decimal (locked decision — see plan).
   ============================================================ */

export type DispatchHero = {
  id: string;
  name: string;
  state: string;
  score: number;            // 0-5 from DB; we ×2 at render time
  tagline: string | null;
  why_go: string | null;
  verified_at: string | null;
  elevation_m: number | null;
};

function verdictFor(displayScore: number): string {
  // Bands match v3-atlas Legend (0-10 scale):
  if (displayScore >= 8.0) return "PEAK";
  if (displayScore >= 6.5) return "EXCELLENT";
  if (displayScore >= 5.0) return "DOABLE";
  if (displayScore >= 3.5) return "MARGINAL";
  return "AVOID";
}

export function Act1Dispatch({ heroes }: { heroes: DispatchHero[] }) {
  const t = useTranslations("cinema");
  const monthLong = currentMonthLongIST();
  const [idx, setIdx] = useState(0);
  const now = useClock();

  // Auto-advance every 7.5s, paused on hover via React state
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused || heroes.length < 2) return;
    const id = setInterval(() => {
      setIdx((i) => (i + 1) % heroes.length);
    }, 7500);
    return () => clearInterval(id);
  }, [paused, heroes.length]);

  // Empty/edge case: no PEAK destinations this month — fail gracefully.
  // The page should still render; just collapse the slideshow into a
  // brand placeholder instead of a broken section.
  if (!heroes.length) {
    return (
      <section
        className="nq-grain nq-glow-radial"
        style={{
          position: "relative",
          minHeight: "60vh",
          padding: "120px 32px",
          borderBottom: "1px solid var(--hair)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <div>
          <div className="nq-kicker" style={{ marginBottom: 18 }}>
            {t("dispatchKicker", { month: monthLong, year: (now ?? new Date()).getFullYear() })}
          </div>
          <h1
            className="nq-display"
            style={{
              fontSize: "clamp(40px, 6vw, 96px)",
              margin: 0,
            }}
          >
            {t("dispatchEmpty")}
            <span className="dot">.</span>
          </h1>
        </div>
      </section>
    );
  }

  const hero = heroes[idx];
  const displayScore = Math.min(10, hero.score * 2);
  const verdict = verdictFor(displayScore);

  return (
    <section
      className="nq-grain"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={{
        position: "relative",
        height: "100vh",
        minHeight: 720,
        overflow: "hidden",
        borderBottom: "1px solid var(--hair)",
        background: "var(--paper)",
      }}
    >
      {/* ── Crossfading image stack ────────────────────────────── */}
      {heroes.map((d, i) => (
        <div
          key={d.id}
          aria-hidden={i === idx ? undefined : true}
          style={{
            position: "absolute",
            inset: 0,
            opacity: i === idx ? 1 : 0,
            transition: "opacity 1100ms cubic-bezier(.25,.46,.45,.94)",
          }}
        >
          {/* Plain <img> intentional: project has next/image optimization
              disabled (next.config images.unoptimized=true per
              feedback_image_optimizer.md), so next/image adds no perf win
              while bloating the React tree. We manage LCP manually with
              loading=eager on slide 0 + lazy on the rest. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={destinationImage(d.id, 2400)}
            alt={i === idx ? `${d.name} — ${d.state}` : ""}
            loading={i === 0 ? "eager" : "lazy"}
            decoding="async"
            className={i === idx ? "nq-kb-1" : ""}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
              filter: "saturate(0.92) contrast(1.04)",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(180deg, rgba(10,10,8,0.55) 0%, rgba(10,10,8,0.10) 30%, rgba(10,10,8,0.30) 65%, rgba(10,10,8,0.92) 100%)",
            }}
          />
        </div>
      ))}

      {/* ── Hairline frame ─────────────────────────────────────── */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: 80,
          left: 40,
          right: 40,
          bottom: 60,
          border: "1px solid rgba(245,241,232,.16)",
          pointerEvents: "none",
          zIndex: 2,
        }}
      />

      {/* Top masthead bar removed — duplicated info already lives in the
          cinematic Nav (Naksh.iq logo left, ISSUE Nº · {month} right). The
          dispatch state/verified/elev metadata stays as a top-left block
          below the nav so each slide still gets its own dispatch identity. */}

      {/* ── Top-left dispatch metadata ─────────────────────────── */}
      <div
        className="nq-fadeup-auto"
        style={{
          position: "absolute",
          top: 108,
          left: 64,
          display: "flex",
          flexDirection: "column",
          gap: 8,
          zIndex: 5,
        }}
      >
        <div className="nq-kicker">
          {t("dispatchKicker", { month: monthLong, year: (now ?? new Date()).getFullYear() })}
        </div>
        <div className="nq-meta" style={{ color: "var(--bone-dim)" }}>
          {hero.state.toUpperCase()}
          <br />
          {hero.verified_at
            ? `VERIFIED ${new Date(hero.verified_at)
                .toLocaleString("en-IN", {
                  timeZone: "Asia/Kolkata",
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })
                .toUpperCase()
                .replace(/,/g, "")}`
            : t("verifiedThisMonth")}
          {hero.elevation_m ? (
            <>
              <br />
              ELEV {hero.elevation_m.toLocaleString()} M
            </>
          ) : null}
        </div>
      </div>

      {/* ── Top-right NakshIQ Score ────────────────────────────── */}
      <div
        className="nq-fadeup-auto"
        style={{
          position: "absolute",
          top: 108,
          right: 64,
          textAlign: "right",
          transitionDelay: "0.18s",
          zIndex: 5,
        }}
      >
        <div className="nq-kicker" style={{ color: "var(--bone-dim)", marginBottom: 8 }}>
          {t("nakshiqScore")}
        </div>
        <div
          className="nq-score"
          style={{
            fontSize: 64,
            lineHeight: 0.85,
          }}
        >
          {displayScore.toFixed(1)}
        </div>
        <div
          className="nq-meta"
          style={{ color: "var(--bone-dim)", marginTop: 6 }}
        >
          · {verdict} ·
        </div>
      </div>

      {/* ── Bottom-left main title ─────────────────────────────── */}
      <div
        className="nq-fadeup-auto"
        style={{
          position: "absolute",
          left: 64,
          right: 64,
          bottom: 120,
          maxWidth: 980,
          transitionDelay: "0.36s",
          zIndex: 5,
        }}
      >
        <h1
          className="nq-display"
          style={{
            fontSize: "clamp(48px, 8vw, 128px)",
            margin: 0,
          }}
        >
          {/* Kinetic remounts on slide change via the key prop, so on=true
              always retriggers the per-character stagger animation. */}
          <Kinetic key={hero.id} text={hero.name} on={true} stagger={28} />
          <span className="dot">.</span>
        </h1>
        {hero.tagline && (
          <p
            style={{
              fontFamily: "var(--cinema-display)",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "clamp(16px, 1.3vw, 19px)",
              lineHeight: 1.45,
              color: "rgba(245,241,232,.85)",
              margin: "22px 0 0",
              maxWidth: 560,
            }}
          >
            {hero.tagline}
          </p>
        )}
        {hero.why_go && (
          <p
            style={{
              fontFamily: "var(--cinema-ui)",
              fontWeight: 400,
              fontSize: 14,
              lineHeight: 1.6,
              color: "rgba(245,241,232,.65)",
              margin: "14px 0 0",
              maxWidth: 540,
            }}
          >
            {hero.why_go}
          </p>
        )}
      </div>

      {/* ── Bottom strip: progress + prev/next ─────────────────── */}
      <div
        style={{
          position: "absolute",
          left: 64,
          right: 64,
          bottom: 64,
          display: "flex",
          alignItems: "center",
          gap: 20,
          zIndex: 5,
        }}
      >
        <div className="nq-meta" style={{ color: "var(--bone-dim)" }}>
          {String(idx + 1).padStart(2, "0")} / {String(heroes.length).padStart(2, "0")}
        </div>
        <div style={{ flex: 1, display: "flex", gap: 8 }}>
          {heroes.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIdx(i)}
              aria-label={`Go to slide ${i + 1}`}
              style={{
                flex: 1,
                height: 1,
                border: 0,
                padding: 0,
                background: i === idx ? "var(--bone)" : "rgba(245,241,232,.22)",
                cursor: "pointer",
                transition: "background 300ms",
              }}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => setIdx((i) => (i - 1 + heroes.length) % heroes.length)}
          className="nq-kicker"
          style={{
            background: "transparent",
            border: 0,
            color: "var(--bone)",
            cursor: "pointer",
          }}
        >
          ← {t("prev")}
        </button>
        <button
          type="button"
          onClick={() => setIdx((i) => (i + 1) % heroes.length)}
          className="nq-kicker"
          style={{
            background: "transparent",
            border: 0,
            color: "var(--bone)",
            cursor: "pointer",
          }}
        >
          {t("next")} →
        </button>
      </div>
    </section>
  );
}
