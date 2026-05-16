"use client";

import { useTranslations } from "next-intl";
import { useInView } from "./use-in-view";
import { SectionLabel } from "./helpers";

/* ============================================================
   ACT VII — How We Score
   Source: data/research/Landing Page/v3-atlas/app.jsx:169-195 Legend

   The 5-band horizontal score table:
     8.0–10.0  PEAK       — green
     6.5–7.9   EXCELLENT  — blue
     5.0–6.4   DOABLE     — yellow
     3.5–4.9   MARGINAL   — orange
     0–3.4     AVOID      — vermillion

   Pure presentation — no DB lookups. Surfaces the methodology so the
   scores in ACTs I/III/V/VI all read against a known scale.
   ============================================================ */

const BANDS = [
  { range: "8.0–10.0", label: "peak",      color: "#4ade9f" },
  { range: "6.5–7.9",  label: "excellent", color: "#7bacff" },
  { range: "5.0–6.4",  label: "doable",    color: "#f4cf4a" },
  { range: "3.5–4.9",  label: "marginal",  color: "#ffa063" },
  { range: "0–3.4",    label: "avoid",     color: "var(--vermillion)" },
] as const;

export function Act7HowWeScore() {
  const t = useTranslations("cinema");
  const [ref, seen] = useInView<HTMLDivElement>({ threshold: 0.18 });

  return (
    <section
      id="how-we-score"
      style={{
        position: "relative",
        padding: "120px 48px",
        background: "var(--paper)",
        borderBottom: "1px solid var(--hair)",
      }}
    >
      <div ref={ref} style={{ maxWidth: 1500, margin: "0 auto" }}>
        <SectionLabel num="VII" name={t("howWeScoreSection")} />

        <h2
          className={`nq-display nq-fadeup ${seen ? "in" : ""}`}
          style={{
            fontSize: "clamp(40px, 5vw, 88px)",
            lineHeight: 1.0,
            letterSpacing: "-0.018em",
            margin: "0 0 56px",
            maxWidth: 1100,
            textWrap: "balance",
          }}
        >
          {t("howWeScoreHeadline")}
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: 0,
            borderTop: "1px solid var(--hair)",
          }}
        >
          {BANDS.map(({ range, label, color }, i) => (
            <div
              key={label}
              className={`nq-fadeup ${seen ? "in" : ""}`}
              style={{
                transitionDelay: `${i * 80}ms`,
                padding: "28px 24px 32px",
                borderRight: i < BANDS.length - 1 ? "1px solid var(--hair)" : "none",
                borderBottom: "1px solid var(--hair)",
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  width: 14,
                  height: 14,
                  background: color,
                  marginBottom: 14,
                }}
              />
              <div
                className="nq-mono"
                style={{
                  fontWeight: 700,
                  fontSize: 22,
                  lineHeight: 1,
                  color: "var(--bone)",
                  letterSpacing: "-0.02em",
                }}
              >
                {range}
              </div>
              <div
                className="nq-kicker"
                style={{
                  color,
                  marginTop: 10,
                  marginBottom: 12,
                }}
              >
                {t(`howWeScoreBands.${label}.label`)}
              </div>
              <p
                style={{
                  fontFamily: "var(--cinema-ui)",
                  fontWeight: 400,
                  fontSize: 13,
                  lineHeight: 1.5,
                  color: "var(--bone-dim)",
                  margin: 0,
                }}
              >
                {t(`howWeScoreBands.${label}.copy`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
