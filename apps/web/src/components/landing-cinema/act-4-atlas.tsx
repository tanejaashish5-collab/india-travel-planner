"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { destinationImage } from "@/lib/image-url";
import { currentMonthLongIST } from "@itp/shared";
import { useInView } from "./use-in-view";
import { SectionLabel } from "./helpers";

/* ============================================================
   ACT IV — The Atlas
   Source: data/research/Landing Page/v8-final/sections.jsx:198-291 S04_Map

   Real India map (SVG outline at /maps/india-outline.svg) with this month's
   highest-scoring + lowest-scoring pins dropped sequentially when scrolled
   into view. A field-log sidebar mirrors the same set with editorial framing.

   Projection: equirectangular into a 1000x1100 viewBox — matches the
   transform used by scripts that built india-outline.svg, so pins line up
   with state geometry without re-fitting.
   ============================================================ */

type AtlasPin = {
  id: string;
  name: string;
  state: string;
  lat: number;
  lng: number;
  score: number; // already × 2 (display 0-10)
  avoid: boolean;
};

// Match india-outline.svg projection exactly.
const VIEWBOX_W = 1000;
const VIEWBOX_H = 1100;
const PAD = 20;
const LNG_MIN = 68;
const LNG_MAX = 97;
const LAT_MIN = 6;
const LAT_MAX = 37;

function projectLatLng(lat: number, lng: number): { x: number; y: number } {
  const x = PAD + ((lng - LNG_MIN) / (LNG_MAX - LNG_MIN)) * (VIEWBOX_W - 2 * PAD);
  const y = PAD + ((LAT_MAX - lat) / (LAT_MAX - LAT_MIN)) * (VIEWBOX_H - 2 * PAD);
  return { x, y };
}

export function Act4Atlas({ pins }: { pins: AtlasPin[] }) {
  const t = useTranslations("cinema");
  const locale = useLocale();
  const monthLong = currentMonthLongIST();
  const [ref, seen] = useInView<HTMLDivElement>({ threshold: 0.3 });
  const [shown, setShown] = useState(0);

  // Sequential drop — once the section enters view, reveal one pin every
  // 520ms until all are placed. Ordered as `pins` arrives (ACT V's verdict
  // logic is per-pin, not order-dependent, so caller decides ordering).
  useEffect(() => {
    if (!seen) return;
    setShown(0);
    let i = 0;
    const id = setInterval(() => {
      i++;
      setShown(i);
      if (i >= pins.length) clearInterval(id);
    }, 520);
    return () => clearInterval(id);
  }, [seen, pins.length]);

  if (!pins.length) return null;

  return (
    <section
      ref={ref}
      className="nq-act-atlas"
      style={{
        position: "relative",
        background: "var(--film-2)",
        borderBottom: "1px solid var(--hair)",
      }}
    >
      <style jsx>{`
        :global(.nq-act-atlas) {
          padding: 96px 20px 80px;
        }
        :global(.nq-atlas-grid) {
          grid-template-columns: 1fr;
          gap: 56px;
        }
        :global(.nq-act-atlas .nq-fieldlog-row) {
          grid-template-columns: 48px minmax(0, 1fr) auto 14px;
          gap: 12px;
          padding: 12px 0;
        }
        :global(.nq-act-atlas .nq-fieldlog-thumb) {
          width: 48px;
          height: 48px;
        }
        :global(.nq-act-atlas .nq-fieldlog-row .nq-display) {
          font-size: 16px !important;
        }
        :global(.nq-act-atlas .nq-fieldlog-row .nq-mono) {
          font-size: 18px !important;
        }
        @media (min-width: 768px) {
          :global(.nq-act-atlas) {
            padding: 160px 48px 120px;
          }
          :global(.nq-atlas-grid) {
            grid-template-columns: minmax(0, 1.4fr) minmax(0, 1fr);
            gap: 72px;
          }
          :global(.nq-act-atlas .nq-fieldlog-row) {
            grid-template-columns: 56px minmax(0, 1fr) auto 18px;
            gap: 14px;
            padding: 14px 0;
          }
          :global(.nq-act-atlas .nq-fieldlog-thumb) {
            width: 56px;
            height: 56px;
          }
          :global(.nq-act-atlas .nq-fieldlog-row .nq-display) {
            font-size: 20px !important;
          }
          :global(.nq-act-atlas .nq-fieldlog-row .nq-mono) {
            font-size: 26px !important;
          }
        }
      `}</style>

      <div style={{ position: "relative", maxWidth: 1500, margin: "0 auto" }}>
        <SectionLabel
          num="IV"
          name={t("atlasSection")}
          right={t("atlasMeta", {
            shown: String(shown).padStart(2, "0"),
            total: String(pins.length).padStart(2, "0"),
          })}
        />

        <div className={`nq-fadeup ${seen ? "in" : ""}`}>
          <h2
            className="nq-display"
            style={{
              fontSize: "clamp(48px, 6vw, 108px)",
              lineHeight: 0.92,
              margin: "0 0 60px",
              maxWidth: 1200,
              textWrap: "balance",
              letterSpacing: "-0.024em",
            }}
          >
            {t.rich("atlasHeadline", {
              dim: (chunks) => <span style={{ color: "var(--bone-dim)" }}>{chunks}</span>,
              em: (chunks) => <em>{chunks}</em>,
            })}
            <span className="dot">.</span>
          </h2>
        </div>

        <div
          className="nq-atlas-grid"
          style={{
            display: "grid",
            alignItems: "start",
          }}
        >
          {/* Map column — India outline + animated pins */}
          <div
            style={{
              position: "relative",
              aspectRatio: "10/11",
              border: "1px solid var(--hair)",
              overflow: "hidden",
              background: "radial-gradient(ellipse at 50% 30%, #08080a 0%, #000 80%)",
            }}
          >
            {/* Faint grid */}
            <svg
              viewBox={`0 0 ${VIEWBOX_W} ${VIEWBOX_H}`}
              preserveAspectRatio="none"
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                opacity: 0.18,
              }}
              aria-hidden
            >
              {Array.from({ length: 11 }).map((_, i) => (
                <line
                  key={`v${i}`}
                  x1={i * 100}
                  y1={0}
                  x2={i * 100}
                  y2={VIEWBOX_H}
                  stroke="var(--bone)"
                  strokeWidth="0.8"
                />
              ))}
              {Array.from({ length: 12 }).map((_, i) => (
                <line
                  key={`h${i}`}
                  x1={0}
                  y1={i * 100}
                  x2={VIEWBOX_W}
                  y2={i * 100}
                  stroke="var(--bone)"
                  strokeWidth="0.8"
                />
              ))}
            </svg>

            {/* India outline — loaded as <img> to preserve vector quality
                without bundling a 68KB path string into the JS chunk. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/maps/india-outline.svg"
              alt="Map of India"
              loading="lazy"
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                pointerEvents: "none",
              }}
            />

            {/* Pin overlay — separate SVG with the same viewBox so
                projected lat/lng coordinates align with the India image. */}
            <svg
              viewBox={`0 0 ${VIEWBOX_W} ${VIEWBOX_H}`}
              preserveAspectRatio="xMidYMid meet"
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
            >
              <defs>
                <filter id="nq-pin-blur">
                  <feGaussianBlur stdDeviation="2" />
                </filter>
              </defs>

              {pins.map((pin, i) => {
                const visible = i < shown;
                const isLatest = i === shown - 1;
                const { x, y } = projectLatLng(pin.lat, pin.lng);
                const fill = pin.avoid ? "var(--vermillion)" : "var(--green)";
                return (
                  <g
                    key={pin.id}
                    style={{ opacity: visible ? 1 : 0, transition: "opacity .5s" }}
                  >
                    <line
                      x1={x}
                      y1={y - 50}
                      x2={x}
                      y2={y}
                      stroke={fill}
                      strokeWidth="1.5"
                      opacity="0.5"
                    />
                    {isLatest && (
                      <circle
                        cx={x}
                        cy={y}
                        r="30"
                        fill="none"
                        stroke={fill}
                        strokeWidth="1.5"
                      >
                        <animate
                          attributeName="r"
                          from="10"
                          to="44"
                          dur="1.2s"
                          repeatCount="indefinite"
                        />
                        <animate
                          attributeName="opacity"
                          from=".7"
                          to="0"
                          dur="1.2s"
                          repeatCount="indefinite"
                        />
                      </circle>
                    )}
                    <circle cx={x} cy={y} r="11" fill={fill} filter="url(#nq-pin-blur)" />
                    <circle cx={x} cy={y} r="5.5" fill="var(--bone)" />
                  </g>
                );
              })}
            </svg>

            {/* HTML labels overlaid on top of SVG — easier styling than svg <text>.
                Edge-aware positioning keeps labels clear of the corner readouts
                ("23.5N · 80.5E", "SCALE 1:24M", "NAKSHIQ ATLAS · 2026", "● ROLLING")
                and prevents clipping at the container edges. Without this, southern
                pins like Anamalai Tiger Reserve (~10°N) collide with the bottom-left
                "NAKSHIQ ATLAS" readout and get hidden inside `overflow: hidden`. */}
            {pins.map((pin, i) => {
              const visible = i < shown;
              const { x, y } = projectLatLng(pin.lat, pin.lng);
              const xPct = (x / VIEWBOX_W) * 100;
              const yPct = (y / VIEWBOX_H) * 100;
              const nearBottom = yPct > 78;
              const nearTop = yPct < 8;
              const nearLeft = xPct < 18;
              const nearRight = xPct > 82;
              // Horizontal: default to the side opposite the pin, flip if it would
              // push the label off-edge.
              const left =
                xPct > 40
                  ? nearRight
                    ? `${Math.max(2, xPct - 32)}%`
                    : `${xPct + 3}%`
                  : nearLeft
                  ? `${xPct + 3}%`
                  : `${Math.max(2, xPct - 28)}%`;

              // Estimate label width as % of container so we can detect when the
              // label's right edge horizontally overlaps the pin. 9px monospace +
              // .14em letter-spacing + 16px padding ≈ 0.85% of a 700px container
              // per character. Cap at 42% so very long names don't dominate the
              // math.
              const labelText = `${pin.name.toUpperCase()} · ${pin.score.toFixed(1)}`;
              const labelWidthPct = Math.min(42, labelText.length * 0.85 + 4);
              const labelLeftPct = parseFloat(left);
              const overlapsPinHoriz =
                labelLeftPct < xPct && labelLeftPct + labelWidthPct > xPct;

              // Vertical: just above the pin by default. Push up 8% when near the
              // bottom (clears bottom corner readouts) OR when the label horiz-
              // overlaps the pin — without the push the two sit at the same y and
              // visually collide (the Dudhsagar-Goa case: pin at xPct≈23%, label
              // clamped to 2% so its right edge lands on top of the pin).
              const top = nearBottom || overlapsPinHoriz
                ? `${Math.max(0, yPct - 8)}%`
                : nearTop
                ? `${yPct + 3}%`
                : `${Math.max(0, yPct - 1.5)}%`;
              return (
                <div
                  key={pin.id}
                  style={{
                    position: "absolute",
                    left,
                    top,
                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateY(0)" : "translateY(6px)",
                    transition: "opacity .5s ease, transform .5s ease",
                    transitionDelay: visible ? "0.18s" : "0s",
                    pointerEvents: "none",
                  }}
                >
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      padding: "4px 8px",
                      background: pin.avoid ? "rgba(212,63,42,.92)" : "rgba(8,8,10,.88)",
                      border: pin.avoid
                        ? "1px solid rgba(245,241,232,.5)"
                        : "1px solid rgba(245,241,232,.18)",
                      fontFamily: "var(--cinema-mono)",
                      fontWeight: 700,
                      fontSize: 9,
                      lineHeight: 1,
                      color: "var(--bone)",
                      letterSpacing: "0.14em",
                      whiteSpace: "nowrap",
                    }}
                  >
                    <span>{pin.name.toUpperCase()}</span>
                    <span
                      style={{
                        color: pin.avoid ? "var(--bone)" : "var(--vermillion)",
                      }}
                    >
                      · {pin.score.toFixed(1)}
                    </span>
                  </div>
                </div>
              );
            })}

            {/* Coordinate readouts — corners */}
            <div
              style={{
                position: "absolute",
                top: 14,
                left: 14,
                fontFamily: "var(--cinema-mono)",
                fontWeight: 500,
                fontSize: 9,
                color: "var(--bone-faint)",
                letterSpacing: "0.18em",
              }}
            >
              23.5N · 80.5E
            </div>
            <div
              style={{
                position: "absolute",
                top: 14,
                right: 14,
                fontFamily: "var(--cinema-mono)",
                fontWeight: 500,
                fontSize: 9,
                color: "var(--bone-faint)",
                letterSpacing: "0.18em",
              }}
            >
              SCALE 1:24M
            </div>
            <div
              style={{
                position: "absolute",
                bottom: 14,
                left: 14,
                fontFamily: "var(--cinema-mono)",
                fontWeight: 500,
                fontSize: 9,
                color: "var(--bone-faint)",
                letterSpacing: "0.18em",
              }}
            >
              NAKSHIQ ATLAS · 2026
            </div>
            <div
              style={{
                position: "absolute",
                bottom: 14,
                right: 14,
                fontFamily: "var(--cinema-mono)",
                fontWeight: 500,
                fontSize: 9,
                color: "var(--green)",
                letterSpacing: "0.18em",
              }}
            >
              ● ROLLING
            </div>
          </div>

          {/* Field log sidebar — clickable rows with thumbnails. Each row links
              to the destination page. The status dot (green/vermillion) sits as
              a small overlay on the thumbnail so the avoid signal is preserved
              without a separate column. The "OPEN THE FULL ATLAS →" CTA below
              fills the dead space and gives a deeper navigation route. */}
          <div>
            <div className="nq-kicker" style={{ marginBottom: 24 }}>
              {t("fieldLog")}
            </div>
            <div style={{ borderTop: "1px solid var(--hair)" }}>
              {pins.map((pin, i) => (
                <Link
                  key={pin.id}
                  href={`/${locale}/destination/${pin.id}`}
                  className="nq-fieldlog-row"
                  style={{
                    opacity: i < shown ? 1 : 0.18,
                    transform: i < shown ? "translateX(0)" : "translateX(-8px)",
                    transition: "opacity .5s, transform .5s, background-color .22s",
                  }}
                >
                  <div className="nq-fieldlog-thumb">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={destinationImage(pin.id, 160)}
                      alt={pin.name}
                      loading="lazy"
                      decoding="async"
                    />
                    <span
                      aria-hidden
                      style={{
                        position: "absolute",
                        top: 4,
                        left: 4,
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        background: pin.avoid ? "var(--vermillion)" : "var(--green)",
                        boxShadow:
                          i === shown - 1 ? "0 0 0 3px rgba(229,86,66,.28)" : "none",
                      }}
                    />
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <div
                      className="nq-display"
                      style={{
                        fontSize: 20,
                        lineHeight: 1.1,
                        letterSpacing: "-0.012em",
                        color: "var(--bone)",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {pin.name}
                    </div>
                    <div className="nq-meta" style={{ marginTop: 4 }}>
                      {pin.state}
                    </div>
                  </div>
                  <span
                    className="nq-mono"
                    style={{
                      fontSize: 26,
                      color: pin.avoid ? "var(--vermillion)" : "var(--bone)",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {pin.score.toFixed(1)}
                  </span>
                  <span className="nq-fieldlog-arrow" aria-hidden>
                    →
                  </span>
                </Link>
              ))}
            </div>

            <Link
              href={`/${locale}/explore`}
              className={`nq-fadeup ${seen ? "in" : ""}`}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 12,
                marginTop: 32,
                padding: "14px 22px",
                background: "var(--bone)",
                color: "var(--paper)",
                fontFamily: "var(--cinema-ui)",
                fontWeight: 700,
                fontSize: 11,
                lineHeight: 1,
                textTransform: "uppercase",
                letterSpacing: "0.18em",
                textDecoration: "none",
                transitionDelay: "0.4s",
              }}
            >
              {t("openMonthAtlas", { month: monthLong })} →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export type { AtlasPin };
