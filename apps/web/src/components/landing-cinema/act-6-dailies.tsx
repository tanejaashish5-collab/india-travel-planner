"use client";

import { useTranslations } from "next-intl";
import { destinationImage } from "@/lib/image-url";
import { useInView } from "./use-in-view";
import { SectionLabel, formatVerifiedAt } from "./helpers";

/* ============================================================
   ACT VI — The Dailies Reel
   Source: data/research/Landing Page/v7.2-reel/reel2.jsx:251-311 R07_Dailies

   Six film-strip thumbnails of recently-verified destinations. Each card
   shows the score, name, state, and a real `content_reviewed_at`
   timestamp formatted as "VERIFIED 14 MAY · 06:42 IST".

   Locked decision: NO fabricated editor names. Attribution rolls up to
   "VERIFIED BY NAKSH.IQ · {timestamp}" only — keeps the bureau-of-record
   feel without inventing humans.

   The 4-stat trust bar at the bottom uses real platform metrics
   (verified-entries count, content_reviewed_at recency, sponsored=0).
   ============================================================ */

export type DailyEntry = {
  id: string;
  name: string;
  state: string;
  score: number; // already × 2 (display 0-10)
  verifiedAt: string | null;
  action: "VERIFIED" | "UPDATED" | "SKIP-LISTED";
};

export type DailiesStats = {
  totalVerified: number;
  totalSkipListed: number;
  freshDestinationsThisMonth: number;
};

export function Act6Dailies({
  entries,
  stats,
}: {
  entries: DailyEntry[];
  stats: DailiesStats;
}) {
  const t = useTranslations("cinema");
  const [ref, seen] = useInView<HTMLDivElement>({ threshold: 0.25 });

  if (!entries.length) return null;

  return (
    <section
      id="dailies"
      style={{
        position: "relative",
        padding: "160px 48px",
        background: "var(--film)",
        borderBottom: "1px solid var(--hair)",
      }}
    >
      <div ref={ref} style={{ position: "relative", maxWidth: 1500, margin: "0 auto" }}>
        <SectionLabel
          num="VI"
          name={t("dailiesSection")}
          right={t("dailiesMeta")}
        />

        <div
          className={`nq-fadeup ${seen ? "in" : ""}`}
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0,1.4fr) minmax(0,1fr)",
            gap: 80,
            alignItems: "end",
            marginBottom: 60,
          }}
        >
          <h2
            className="nq-display"
            style={{
              fontSize: "clamp(48px, 6vw, 108px)",
              lineHeight: 0.92,
              letterSpacing: "-0.024em",
              margin: 0,
              textWrap: "balance",
            }}
          >
            {t.rich("dailiesHeading", {
              dim: (chunks) => <span style={{ color: "var(--bone-dim)" }}>{chunks}</span>,
              em: (chunks) => <em>{chunks}</em>,
            })}
            <span className="dot">.</span>
          </h2>
          <p
            style={{
              fontFamily: "var(--cinema-display)",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: 20,
              lineHeight: 1.4,
              color: "var(--bone-dim)",
              margin: 0,
              maxWidth: 480,
              textWrap: "balance",
            }}
          >
            {t.rich("dailiesBlurb", {
              em: (chunks) => <span style={{ color: "var(--bone)" }}>{chunks}</span>,
            })}
          </p>
        </div>

        {/* Film strip — 6 thumbnails */}
        <div
          className="nq-dailies-strip"
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${entries.length}, 1fr)`,
            gap: 8,
            marginBottom: 36,
          }}
        >
          {entries.map((row, i) => {
            const actionColor =
              row.action === "VERIFIED"
                ? "var(--green)"
                : row.action === "SKIP-LISTED"
                ? "var(--vermillion)"
                : "var(--amber)";
            const scoreColor =
              row.score >= 6.5 ? "var(--green)" : row.score >= 3.5 ? "var(--amber)" : "var(--vermillion)";
            const kbClass = `nq-kb-${(i % 3) + 1}`;
            return (
              <div
                key={row.id}
                className={`nq-fadeup ${seen ? "in" : ""}`}
                style={{
                  transitionDelay: `${i * 100}ms`,
                  position: "relative",
                  aspectRatio: "3/4",
                  border: "1px solid var(--hair)",
                  overflow: "hidden",
                  background: "#000",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={destinationImage(row.id, 800)}
                  alt={`${row.name} — ${row.state}`}
                  loading="lazy"
                  decoding="async"
                  className={kbClass}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    filter: "saturate(.7) brightness(.7)",
                  }}
                />
                <div
                  aria-hidden
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(180deg, rgba(0,0,0,.3) 0%, transparent 30%, rgba(0,0,0,.85) 100%)",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: 8,
                    left: 8,
                    right: 8,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span
                    className="nq-mono"
                    style={{
                      fontSize: 9,
                      color: actionColor,
                      letterSpacing: "0.18em",
                      fontWeight: 700,
                    }}
                  >
                    {row.action}
                  </span>
                  <span
                    className="nq-mono"
                    style={{
                      fontSize: 9,
                      color: "var(--bone-dim)",
                      letterSpacing: "0.14em",
                    }}
                  >
                    FR {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div
                  style={{
                    position: "absolute",
                    bottom: 10,
                    left: 10,
                    right: 10,
                  }}
                >
                  <div
                    className="nq-mono"
                    style={{
                      fontSize: 32,
                      color: scoreColor,
                      letterSpacing: "-0.02em",
                      lineHeight: 0.9,
                    }}
                  >
                    {row.score.toFixed(1)}
                  </div>
                  <div className="nq-meta" style={{ color: "var(--bone)", marginTop: 4 }}>
                    {row.name}
                  </div>
                  <div className="nq-meta" style={{ color: "var(--bone-faint)", marginTop: 2 }}>
                    {formatVerifiedAt(row.verifiedAt) || row.state}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 4-stat trust bar */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 24,
            marginTop: 36,
          }}
        >
          {[
            { v: stats.totalVerified.toLocaleString(), l: t("statsVerifiedEntries") },
            { v: String(stats.freshDestinationsThisMonth), l: t("statsFreshThisMonth") },
            { v: String(stats.totalSkipListed), l: t("statsSkipListed") },
            { v: "0", l: t("statsSponsored") },
          ].map(({ v, l }) => (
            <div key={l} style={{ padding: "24px 0", borderTop: "1px solid var(--hair)" }}>
              <div
                className="nq-mono"
                style={{
                  fontSize: 48,
                  color: "var(--bone)",
                  letterSpacing: "-0.03em",
                  lineHeight: 1,
                }}
              >
                {v}
              </div>
              <div className="nq-meta" style={{ marginTop: 10 }}>
                {l}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
