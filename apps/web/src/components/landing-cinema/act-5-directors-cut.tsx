"use client";

import { useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { destinationImage } from "@/lib/image-url";
import { useInView } from "./use-in-view";
import { SectionLabel } from "./helpers";
import { currentMonthLongIST, MONTH_LONG_NAMES } from "@itp/shared";

/* ============================================================
   ACT V — Director's Cut (Mad-libs intake)
   Source: data/research/Landing Page/v7.1-dossier/scenes3.jsx:9 S06_Intake

   "We're going [May], [solo], for the [mountains]."
   Tokens are clickable; tap any to cycle options. The verdict card on
   the right updates instantly with the top destination for that vibe in
   the current month — pre-fetched server-side, so no client roundtrip.

   PR 3 scope: WHEN is locked to current month (single-month dispatch is
   the brand promise — "this month, scored"), WHO is decorative copy,
   VIBE drives the card. Multi-month lookups are a Phase 2 add.
   ============================================================ */

export type VibeKey = "mountains" | "beaches" | "cities" | "wildlife" | "heritage";

export type VerdictCard = {
  id: string;
  name: string;
  state: string;
  score: number;       // already × 2 (display 0-10)
  tagline: string | null;
  why: string | null;
  verdictLabel: "PEAK" | "EXCELLENT" | "DOABLE" | "MARGINAL" | "AVOID";
};

export type VerdictMap = Partial<Record<VibeKey, VerdictCard>>;

export function Act5DirectorsCut({ verdictMap }: { verdictMap: VerdictMap }) {
  const t = useTranslations("cinema");
  const locale = useLocale();
  const monthLong = currentMonthLongIST();
  const [ref, seen] = useInView<HTMLDivElement>({ threshold: 0.25 });

  const whoOptions = ["solo", "twoOfUs", "withFamily", "withKids"] as const;
  const vibeOptions: VibeKey[] = ["mountains", "beaches", "cities", "wildlife", "heritage"];

  const [who, setWho] = useState<(typeof whoOptions)[number]>("solo");
  // Default vibe: pick the first one that has a verdict in the map.
  const initialVibe = (vibeOptions.find((v) => verdictMap[v]) ?? "mountains") as VibeKey;
  const [vibe, setVibe] = useState<VibeKey>(initialVibe);
  const [month, setMonth] = useState<string>(monthLong);
  const isCurrentMonth = month === monthLong;

  const verdict = useMemo(() => verdictMap[vibe], [verdictMap, vibe]);

  const verdictColor =
    verdict?.verdictLabel === "PEAK" || verdict?.verdictLabel === "EXCELLENT"
      ? "var(--green)"
      : verdict?.verdictLabel === "AVOID" || verdict?.verdictLabel === "MARGINAL"
      ? "var(--vermillion)"
      : "var(--amber)";

  return (
    <section
      ref={ref}
      style={{
        position: "relative",
        padding: "160px 48px 140px",
        background: "var(--film-2)",
        borderBottom: "1px solid var(--hair)",
      }}
    >
      <div style={{ position: "relative", maxWidth: 1500, margin: "0 auto" }}>
        <SectionLabel num="V" name={t("directorsCutSection")} right={t("directorsCutMeta")} />

        <p className="nq-meta" style={{ marginBottom: 16 }}>
          {t("directorsCutPrompt")}
        </p>
        <h2
          className="nq-display"
          style={{
            fontSize: "clamp(48px, 7vw, 128px)",
            lineHeight: 0.94,
            letterSpacing: "-0.028em",
            margin: "0 0 64px",
            textWrap: "balance",
          }}
        >
          {t("directorsCutLeadIn")}{" "}
          <Token value={month} options={[...MONTH_LONG_NAMES]} setValue={setMonth} />
          {", "}
          <Token
            value={t(`who.${who}`)}
            options={whoOptions.map((w) => t(`who.${w}`))}
            setValue={(v) => {
              const idx = whoOptions.findIndex((w) => t(`who.${w}`) === v);
              if (idx >= 0) setWho(whoOptions[idx]);
            }}
          />
          ,
          <br />
          {t("directorsCutForThe")}{" "}
          <Token
            value={t(`vibe.${vibe}`)}
            options={vibeOptions.map((v) => t(`vibe.${v}`))}
            setValue={(v) => {
              const idx = vibeOptions.findIndex((vk) => t(`vibe.${vk}`) === v);
              if (idx >= 0) setVibe(vibeOptions[idx]);
            }}
          />
          .
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0,1.4fr) minmax(0,1fr)",
            gap: 60,
            alignItems: "stretch",
          }}
        >
          {/* Verdict card */}
          {verdict ? (
            <div
              style={{
                position: "relative",
                aspectRatio: "16/10",
                overflow: "hidden",
                border: "1px solid var(--hair)",
                background: "#000",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                key={verdict.id}
                src={destinationImage(verdict.id, 1600)}
                alt={`${verdict.name} — ${verdict.state}`}
                loading="lazy"
                decoding="async"
                className="nq-kb-1"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
              <div
                aria-hidden
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(180deg, rgba(0,0,0,0) 30%, rgba(0,0,0,0.78) 100%)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: 18,
                  left: 18,
                  right: 18,
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <span className="nq-meta" style={{ color: "var(--bone)" }}>
                  {t("verdictLive")}
                </span>
                <span className="nq-meta" style={{ color: "var(--bone)" }}>
                  {verdict.state.toUpperCase()}
                </span>
              </div>
              <div
                style={{
                  position: "absolute",
                  bottom: 24,
                  left: 24,
                  right: 24,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-end",
                  gap: 24,
                }}
              >
                <div>
                  <div
                    className="nq-display"
                    style={{
                      fontSize: "clamp(36px, 4.4vw, 72px)",
                      lineHeight: 0.95,
                      letterSpacing: "-0.022em",
                      color: "var(--bone)",
                      marginBottom: 10,
                    }}
                  >
                    {verdict.name}
                  </div>
                  {verdict.tagline && (
                    <div className="nq-meta" style={{ color: "var(--bone-dim)" }}>
                      {verdict.tagline}
                    </div>
                  )}
                </div>
                <div style={{ textAlign: "right" }}>
                  <div
                    className="nq-mono"
                    style={{
                      fontSize: 88,
                      fontWeight: 700,
                      color: verdictColor,
                      letterSpacing: "-0.04em",
                      lineHeight: 0.85,
                    }}
                  >
                    {verdict.score.toFixed(1)}
                  </div>
                  <div
                    className="nq-mono"
                    style={{
                      fontSize: 11,
                      color: "var(--bone)",
                      letterSpacing: "0.26em",
                      marginTop: 8,
                    }}
                  >
                    {verdict.verdictLabel}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div
              style={{
                aspectRatio: "16/10",
                border: "1px solid var(--hair)",
                background: "#000",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 48,
                textAlign: "center",
              }}
            >
              <div className="nq-meta" style={{ color: "var(--bone-dim)" }}>
                {t("directorsCutNoMatch")}
              </div>
            </div>
          )}

          {/* Editor's note panel */}
          <div
            style={{
              borderLeft: "1px solid var(--hair)",
              paddingLeft: 36,
              display: "flex",
              flexDirection: "column",
              gap: 18,
            }}
          >
            <span className="nq-meta">{t("editorsNote")}</span>
            {!isCurrentMonth && (
              <span
                className="nq-meta"
                style={{
                  color: "var(--vermillion)",
                  letterSpacing: "0.18em",
                }}
              >
                Preview · live verdict drops {month} 1
              </span>
            )}
            {verdict?.why ? (
              <p
                style={{
                  fontFamily: "var(--cinema-display)",
                  fontStyle: "italic",
                  fontWeight: 400,
                  fontSize: 22,
                  lineHeight: 1.4,
                  color: "var(--bone)",
                  margin: 0,
                }}
              >
                &ldquo;{verdict.why}&rdquo;
              </p>
            ) : (
              <p
                style={{
                  fontFamily: "var(--cinema-display)",
                  fontStyle: "italic",
                  color: "var(--bone-dim)",
                  margin: 0,
                }}
              >
                {t("editorsNoteNone")}
              </p>
            )}
            <span className="nq-meta" style={{ color: "var(--bone-faint)" }}>
              {t("editorsAttribution", { month: monthLong })}
            </span>
            <div style={{ flex: 1 }} />
            {verdict && (
              <div style={{ display: "flex", gap: 12 }}>
                <a
                  href={`/${locale}/destination/${verdict.id}`}
                  className="nq-btn-primary"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 14,
                    padding: "18px 28px",
                    background: "var(--bone)",
                    color: "var(--paper)",
                    fontFamily: "var(--cinema-ui)",
                    fontWeight: 700,
                    fontSize: 11,
                    lineHeight: 1,
                    textTransform: "uppercase",
                    letterSpacing: "0.18em",
                    textDecoration: "none",
                  }}
                >
                  {t("readThisBrief")}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   Token — clickable mad-libs word with vermillion underline-dash
   ============================================================ */
function Token({
  value,
  options,
  setValue,
  disabled,
}: {
  value: string;
  options: string[];
  setValue: (v: string) => void;
  disabled?: boolean;
}) {
  const [open, setOpen] = useState(false);
  return (
    <span style={{ position: "relative", display: "inline-block" }}>
      <button
        type="button"
        disabled={disabled}
        onClick={() => !disabled && setOpen((o) => !o)}
        style={{
          display: "inline-flex",
          alignItems: "baseline",
          gap: 8,
          background: "transparent",
          border: 0,
          cursor: disabled ? "default" : "pointer",
          fontFamily: "var(--cinema-display)",
          fontStyle: "italic",
          fontWeight: 500,
          fontSize: "clamp(48px, 7vw, 128px)",
          lineHeight: 0.94,
          color: "var(--vermillion)",
          letterSpacing: "-0.028em",
          padding: "0 4px",
          borderBottom: disabled ? "0" : "3px dashed rgba(229, 86, 66, 0.4)",
        }}
      >
        {value}
        {!disabled && (
          <span
            style={{
              fontFamily: "var(--cinema-ui)",
              fontWeight: 700,
              fontSize: 12,
              lineHeight: 1,
              color: "var(--bone-dim)",
              letterSpacing: "0.22em",
              position: "relative",
              top: -12,
            }}
          >
            ↓
          </span>
        )}
      </button>
      {open && !disabled && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            marginTop: 8,
            background: "var(--film)",
            border: "1px solid var(--hair)",
            zIndex: 20,
            minWidth: 260,
            padding: 8,
            letterSpacing: 0,
          }}
        >
          {options.map((o) => (
            <button
              key={o}
              type="button"
              onClick={() => {
                setValue(o);
                setOpen(false);
              }}
              style={{
                display: "block",
                width: "100%",
                textAlign: "left",
                padding: "12px 18px",
                background: o === value ? "var(--film-3)" : "transparent",
                border: 0,
                color: o === value ? "var(--vermillion)" : "var(--bone)",
                fontFamily: "var(--cinema-display)",
                fontStyle: "italic",
                fontWeight: 500,
                fontSize: 20,
                lineHeight: 1.3,
                letterSpacing: 0,
                cursor: "pointer",
              }}
            >
              {o}
            </button>
          ))}
        </div>
      )}
    </span>
  );
}
