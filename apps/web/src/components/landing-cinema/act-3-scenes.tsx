"use client";

import { useTranslations } from "next-intl";
import { destinationImage } from "@/lib/image-url";
import { useInView } from "./use-in-view";
import { ScoreNum } from "./helpers";
import { currentMonthLongIST, verdictFor } from "@itp/shared";

/* ============================================================
   ACT III — The Scenes (scrollytelling reel)
   Source: data/research/Landing Page/v8-final/scenes-cinema.jsx:236-306

   Five sticky 100vh scenes. As you scroll, each scene pins to the top
   of the viewport while its image dollies, the score counts up, and the
   editorial caption reveals. Score uses the same ×2 display-multiply as
   ACT I — DB 0-5 → 0-10 with one decimal.

   User explicitly asked: "the section with the scenes and the animation
   is perfect — don't touch that". This port preserves the visual logic
   1:1 while feeding it real Supabase data instead of static fixtures.
   ============================================================ */

export type SceneEntry = {
  id: string;
  name: string;
  state: string;
  score: number; // 0-5 from DB
  tagline: string | null;
  why: string | null;
  elevation_m: number | null;
  difficulty: string | null;
  verified_at: string | null;
};

export function Act3Scenes({ scenes }: { scenes: SceneEntry[] }) {
  const t = useTranslations("cinema");
  const monthLong = currentMonthLongIST();
  // Take the first 5 scenes (the design uses 5; if we have fewer, render
  // what's there — the section just gets shorter).
  const items = scenes.slice(0, 5);
  if (!items.length) return null;

  return (
    <section
      style={{
        background: "#000",
        borderBottom: "1px solid var(--hair)",
      }}
    >
      <div className="nq-pin-track">
        {items.map((scene, i) => (
          <Scene key={scene.id} scene={scene} idx={i} total={items.length} monthLong={monthLong} t={t} />
        ))}
      </div>
    </section>
  );
}

function Scene({
  scene,
  idx,
  total,
  monthLong,
  t,
}: {
  scene: SceneEntry;
  idx: number;
  total: number;
  monthLong: string;
  t: ReturnType<typeof useTranslations>;
}) {
  const [ref, seen] = useInView<HTMLDivElement>({ threshold: 0.45 });
  const displayScore = Math.min(10, scene.score * 2);
  const verdict = verdictFor(displayScore);
  const verdictColor =
    verdict === "PEAK" || verdict === "EXCELLENT"
      ? "var(--green)"
      : verdict === "AVOID" || verdict === "MARGINAL"
      ? "var(--vermillion)"
      : "var(--amber)";
  // Two Ken-Burns variants alternated for visual variety as you scroll.
  const kbClass = idx % 2 === 0 ? "nq-kb-1" : "nq-kb-2";
  // Verified label — 12 MAY format (no year — current dispatch is implicit).
  const verifiedLabel = scene.verified_at
    ? new Date(scene.verified_at)
        .toLocaleString("en-IN", {
          timeZone: "Asia/Kolkata",
          day: "2-digit",
          month: "short",
        })
        .toUpperCase()
        .replace(/,/g, "")
    : "";

  return (
    <div className="nq-pin-scene" ref={ref}>
      {/* Image with slow Ken Burns dolly */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={destinationImage(scene.id, 2400)}
          alt={`${scene.name} — ${scene.state}`}
          loading="lazy"
          decoding="async"
          className={kbClass}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "saturate(.86) brightness(.78)",
          }}
        />
      </div>
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(0,0,0,.55) 0%, rgba(0,0,0,.05) 30%, rgba(0,0,0,.05) 55%, rgba(0,0,0,.92) 100%)",
        }}
      />

      {/* Top metadata strip — scene index + state + elevation/difficulty */}
      <div
        style={{
          position: "absolute",
          top: 84,
          left: 32,
          right: 32,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span className="nq-meta" style={{ color: "var(--bone-dim)" }}>
          {t("sceneCounter", { idx: String(idx + 2).padStart(2, "0"), total: String(total + 1).padStart(2, "0") })} ·{" "}
          {scene.state.toUpperCase()}
        </span>
        <span className="nq-meta" style={{ color: "var(--bone-dim)" }}>
          {scene.elevation_m ? `${scene.elevation_m.toLocaleString()}M` : ""}
          {scene.elevation_m && scene.difficulty ? " · " : ""}
          {scene.difficulty ? scene.difficulty.toUpperCase() : ""}
        </span>
      </div>

      {/* Center title — verdict label, italic name, italic tagline */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: "50%",
          transform: "translateY(-50%)",
          padding: "0 32px",
          textAlign: "center",
        }}
      >
        <div
          className={`nq-fadeup ${seen ? "in" : ""}`}
          style={{ transitionDelay: "0.05s" }}
        >
          <div
            style={{
              fontFamily: "var(--cinema-ui)",
              fontWeight: 700,
              fontSize: 10,
              lineHeight: 1,
              textTransform: "uppercase",
              letterSpacing: "0.4em",
              color: verdictColor,
              marginBottom: 24,
              animation: seen ? "nq-verdict-pulse 2.4s ease-in-out infinite" : "none",
            }}
          >
            ● {verdict} · {monthLong.toUpperCase()}
          </div>
          <h3
            className="nq-display"
            style={{
              fontSize: "clamp(48px, 7vw, 124px)",
              lineHeight: 0.86,
              letterSpacing: "-0.028em",
              margin: "0 0 22px",
              color: "var(--bone)",
            }}
          >
            {scene.name}
            <span className="dot">.</span>
          </h3>
          {scene.tagline && (
            <p
              style={{
                fontFamily: "var(--cinema-display)",
                fontStyle: "italic",
                fontWeight: 400,
                fontSize: 19,
                lineHeight: 1.4,
                color: "rgba(245,241,232,0.85)",
                margin: "0 auto",
                maxWidth: 760,
                textWrap: "balance",
              }}
            >
              {scene.tagline}
            </p>
          )}
        </div>
      </div>

      {/* Big score — lower right */}
      <div
        style={{
          position: "absolute",
          right: 32,
          bottom: 80,
          textAlign: "right",
        }}
      >
        <div
          className={`nq-fadeup ${seen ? "in" : ""}`}
          style={{ transitionDelay: "0.25s" }}
        >
          <div className="nq-kicker" style={{ marginBottom: 10 }}>
            {t("theScore")}
          </div>
          <div
            className="nq-mono"
            style={{
              fontWeight: 700,
              fontSize: "clamp(64px, 8vw, 116px)",
              lineHeight: 0.86,
              color: "var(--bone)",
              letterSpacing: "-0.05em",
            }}
          >
            <ScoreNum to={displayScore} on={seen} ms={1800} decimals={1} />
          </div>
        </div>
      </div>

      {/* Lower-left dossier — why_go + verified label */}
      <div
        style={{
          position: "absolute",
          left: 32,
          bottom: 32,
          maxWidth: 520,
        }}
      >
        <div
          className={`nq-fadeup ${seen ? "in" : ""}`}
          style={{ transitionDelay: "0.15s" }}
        >
          {scene.why && (
            <p
              style={{
                fontFamily: "var(--cinema-ui)",
                fontWeight: 400,
                fontSize: 14,
                lineHeight: 1.55,
                color: "rgba(245,241,232,0.78)",
                margin: "0 0 14px",
              }}
            >
              {scene.why}
            </p>
          )}
          {verifiedLabel && (
            <div
              className="nq-meta"
              style={{
                color: "var(--bone-dim)",
                letterSpacing: "0.14em",
              }}
            >
              ● {t("verifiedShort")} {verifiedLabel}
            </div>
          )}
        </div>
      </div>

      {/* Scene counter — lower-right corner */}
      <div
        style={{
          position: "absolute",
          bottom: 32,
          right: 32,
          fontFamily: "var(--cinema-mono)",
          fontWeight: 500,
          fontSize: 11,
          lineHeight: 1,
          color: "var(--bone-faint)",
          letterSpacing: "0.22em",
        }}
      >
        {String(idx + 2).padStart(2, "0")} / {String(total + 1).padStart(2, "0")}
      </div>
    </div>
  );
}
