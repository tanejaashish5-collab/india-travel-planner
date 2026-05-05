"use client";

import { useTranslations } from "next-intl";
import { useInView } from "./use-in-view";
import { SectionLabel } from "./helpers";

/* ============================================================
   ACT II — The Skip List
   Source: data/research/Landing Page/v7.2-reel/reel2.jsx:108-155 R05_Skip
         + data/research/Landing Page/v8-final/sections.jsx:111-158 S02_Skip

   The "places we tell you to skip" section. Renders current-month
   destinations with DB score 0-1 (= 0.0-2.0 on the displayed 0-10 scale,
   AVOID band) as a line-through editorial list with red AVOID stamp.

   No fabricated alternatives — if `compare_against` from the destinations
   table is empty, we drop the "Try instead" line rather than guess.
   ============================================================ */

export type SkipEntry = {
  id: string;
  name: string;
  state: string;
  score: number; // 0-5 from DB
  why_not: string | null;
  skip_reason: string | null;
  compare_against: string[] | null;
};

// Strip the leading "May at {place} —" preamble that most why_not strings
// open with, since the section header already establishes "this is for May".
// Falls back to the original string if the pattern doesn't match.
function trimPreamble(why: string): string {
  return why.replace(/^[A-Z][a-z]+ at [^—]+—\s*/, "").trim();
}

export function Act2Skip({ entries }: { entries: SkipEntry[] }) {
  const t = useTranslations("cinema");
  const [ref, seen] = useInView<HTMLDivElement>({ threshold: 0.18 });

  if (!entries.length) {
    // Fail quietly — empty skip list means no AVOID candidates this month,
    // which is rare but possible. Section just doesn't render.
    return null;
  }

  return (
    <section
      id="skip"
      style={{
        position: "relative",
        padding: "160px 48px",
        background: "var(--film)",
        borderBottom: "1px solid var(--hair)",
      }}
    >
      {/* Soft top + bottom vermillion glow — bookend wash */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(212,63,42,.06) 0%, transparent 30%, transparent 70%, rgba(212,63,42,.06) 100%)",
          pointerEvents: "none",
        }}
      />

      <div ref={ref} style={{ position: "relative", maxWidth: 1500, margin: "0 auto" }}>
        <SectionLabel
          num="II"
          name={t("skipSection")}
          right={t("skipMeta", { count: entries.length })}
        />

        <div
          className={`nq-fadeup ${seen ? "in" : ""}`}
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0,1.4fr) minmax(0,1fr)",
            gap: 80,
            alignItems: "end",
            marginBottom: 80,
          }}
        >
          <h2
            className="nq-display"
            style={{
              fontSize: "clamp(44px, 7vw, 116px)",
              lineHeight: 0.85,
              letterSpacing: "-0.034em",
              margin: 0,
              textWrap: "balance",
            }}
          >
            {t.rich("skipHeading", {
              strike: (chunks) => <em style={{ color: "var(--vermillion)" }}>{chunks}</em>,
            })}
          </h2>
          <p
            style={{
              fontFamily: "var(--cinema-display)",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: 18,
              lineHeight: 1.4,
              color: "var(--bone-dim)",
              margin: 0,
              maxWidth: 480,
              textWrap: "balance",
            }}
          >
            {t.rich("skipBlurb", {
              em: (chunks) => <span style={{ color: "var(--bone)" }}>{chunks}</span>,
            })}
          </p>
        </div>

        <div style={{ borderTop: "2px solid var(--bone)" }}>
          {entries.map((entry, i) => {
            const displayScore = Math.min(10, entry.score * 2);
            const subhead = entry.skip_reason ?? trimPreamble(entry.why_not ?? "");
            const altDest = entry.compare_against?.[0];
            return (
              <div
                key={entry.id}
                className={`nq-fadeup ${seen ? "in" : ""}`}
                style={{
                  transitionDelay: `${i * 120}ms`,
                  display: "grid",
                  gridTemplateColumns: "96px minmax(0,1.4fr) minmax(0,1.2fr) 100px 110px",
                  gap: 32,
                  padding: "36px 0",
                  borderBottom: "1px solid var(--hair)",
                  alignItems: "baseline",
                }}
              >
                <span
                  className="nq-meta"
                  style={{ color: "var(--bone-faint)", letterSpacing: "0.22em", alignSelf: "center" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3
                    className="nq-display"
                    style={{
                      fontSize: "clamp(26px, 2.6vw, 42px)",
                      lineHeight: 1,
                      letterSpacing: "-0.018em",
                      margin: "0 0 8px",
                      textDecoration: "line-through",
                      textDecorationColor: "var(--vermillion)",
                      textDecorationThickness: "2px",
                    }}
                  >
                    {entry.name}
                  </h3>
                  <span className="nq-meta">
                    {entry.state}
                  </span>
                </div>
                <p
                  style={{
                    fontFamily: "var(--cinema-ui)",
                    fontWeight: 400,
                    fontSize: 14,
                    lineHeight: 1.55,
                    color: "var(--bone-dim)",
                    margin: 0,
                  }}
                >
                  {subhead}
                  {altDest && (
                    <>
                      {" "}
                      <span style={{ color: "var(--bone)" }}>
                        {t("tryInstead")}{" "}
                        <em
                          style={{
                            color: "var(--vermillion)",
                            fontFamily: "var(--cinema-display)",
                          }}
                        >
                          {altDest}
                        </em>
                        .
                      </span>
                    </>
                  )}
                </p>
                <div style={{ textAlign: "right" }}>
                  <div
                    className="nq-score"
                    style={{ fontSize: 28, color: "var(--vermillion)" }}
                  >
                    {displayScore.toFixed(1)}
                  </div>
                  <div className="nq-meta" style={{ marginTop: 6 }}>
                    {t("scoreOutOf10")}
                  </div>
                </div>
                <div style={{ textAlign: "right", alignSelf: "center" }}>
                  <span className="nq-stamp">{t("avoidStamp")}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
