"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { videoSrc } from "@/lib/video-url";
import { destinationImage } from "@/lib/image-url";
import type { LuxuryRow } from "@/lib/luxury-schema";

// Editorial features section — iconic-tier rows in alternating image-left
// / image-right zigzag. Each row: 16:9 video well + caption stack. Sits
// between the cinematic hero carousel and the magazine grid.

type Props = {
  rows: LuxuryRow[];
  locale: string;
};

function localized(row: LuxuryRow, locale: string, field: "name" | "tagline" | "editorial"): string | null {
  if (locale === "hi") {
    const t = row.translations?.hi?.[field];
    if (t) return t as string;
  }
  return ((row as Record<string, unknown>)[field] as string) ?? null;
}

export function LuxuryFeatures({ rows, locale }: Props) {
  const t = useTranslations("luxury");
  if (rows.length === 0) return null;

  return (
    <section
      aria-label="Iconic luxury features"
      style={{
        maxWidth: 1200,
        margin: "96px auto 32px",
        padding: "0 24px",
      }}
    >
      <header style={{ marginBottom: 56, maxWidth: 720 }}>
        <p
          className="nq-kicker"
          style={{
            color: "var(--vermillion)",
            marginBottom: 20,
            letterSpacing: "0.22em",
          }}
        >
          {t("featuresKicker")} · {String(rows.length).padStart(2, "0")}
        </p>
        <h2
          className="nq-display"
          style={{
            fontFamily: "var(--cinema-display)",
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: "clamp(32px, 4.4vw, 56px)",
            lineHeight: 1.05,
            letterSpacing: "-0.01em",
            color: "var(--bone)",
            margin: 0,
          }}
        >
          {t("featuresTitle")}
        </h2>
      </header>

      <div className="nq-luxury-features__list">
        {rows.map((row, i) => {
          const name = localized(row, locale, "name") || row.name;
          const editorial =
            localized(row, locale, "editorial") || localized(row, locale, "tagline");
          const categoryLabel = t(`category_${row.category}` as "category_train");
          const reverse = i % 2 === 1;
          const hasVideo = Boolean(row.hero_video_slug);
          const posterImg = row.primary_destination_id
            ? destinationImage(row.primary_destination_id, 1600)
            : null;

          return (
            <article
              key={row.id}
              className="nq-luxury-feature"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr",
                gap: 28,
                alignItems: "center",
                padding: "48px 0",
                borderTop: i === 0 ? "1px solid var(--hair)" : "none",
                borderBottom: "1px solid var(--hair)",
              }}
            >
              <div
                className="nq-luxury-feature__media"
                style={{
                  position: "relative",
                  aspectRatio: "16 / 9",
                  overflow: "hidden",
                  background: "var(--paper-2)",
                  border: "1px solid var(--hair)",
                  order: reverse ? 2 : 1,
                }}
              >
                {hasVideo && row.hero_video_slug ? (
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    disablePictureInPicture
                    style={{
                      position: "absolute",
                      inset: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      filter: "saturate(0.92) brightness(0.86)",
                    }}
                  >
                    <source src={videoSrc(row.hero_video_slug)} type="video/mp4" />
                  </video>
                ) : posterImg ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={posterImg}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    style={{
                      position: "absolute",
                      inset: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      filter: "saturate(0.92) brightness(0.86)",
                    }}
                  />
                ) : null}
                <div
                  aria-hidden
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(180deg, transparent 50%, rgba(10,10,8,0.55) 100%)",
                    pointerEvents: "none",
                  }}
                />
                <span
                  className="nq-mono"
                  style={{
                    position: "absolute",
                    top: 16,
                    left: 16,
                    fontFamily: "var(--cinema-mono)",
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: "0.22em",
                    color: "var(--vermillion)",
                    background: "rgba(10,10,8,0.7)",
                    padding: "5px 10px",
                    textTransform: "uppercase",
                  }}
                >
                  Nº {String(i + 1).padStart(2, "0")} · {t("tier_iconic")}
                </span>
              </div>

              <div
                className="nq-luxury-feature__body"
                style={{
                  order: reverse ? 1 : 2,
                  padding: "0 4px",
                }}
              >
                <p
                  className="nq-kicker"
                  style={{
                    color: "var(--vermillion)",
                    marginBottom: 16,
                    letterSpacing: "0.22em",
                    fontFamily: "var(--cinema-mono)",
                    fontSize: 11,
                    fontWeight: 700,
                    textTransform: "uppercase",
                  }}
                >
                  {categoryLabel}
                  {row.operator ? ` · ${row.operator}` : null}
                </p>
                <h3
                  style={{
                    fontFamily: "var(--cinema-display)",
                    fontStyle: "italic",
                    fontWeight: 400,
                    fontSize: "clamp(28px, 3.4vw, 44px)",
                    lineHeight: 1.05,
                    letterSpacing: "-0.01em",
                    color: "var(--bone)",
                    margin: "0 0 20px",
                  }}
                >
                  {name}
                </h3>
                {editorial && (
                  <p
                    style={{
                      fontFamily: "var(--cinema-ui)",
                      fontSize: 16,
                      lineHeight: 1.65,
                      color: "var(--bone-dim)",
                      margin: "0 0 24px",
                      maxWidth: 560,
                    }}
                  >
                    {editorial}
                  </p>
                )}
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 12,
                    fontFamily: "var(--cinema-mono)",
                    fontSize: 11,
                    color: "var(--bone-dim)",
                    textTransform: "uppercase",
                    letterSpacing: "0.16em",
                    marginBottom: 28,
                  }}
                >
                  {row.price_band_inr && <span>{row.price_band_inr}</span>}
                  {row.duration && (
                    <>
                      <span style={{ opacity: 0.4 }}>·</span>
                      <span>{row.duration}</span>
                    </>
                  )}
                </div>
                <Link
                  href={`/${locale}/luxury/${row.id}`}
                  style={{
                    fontFamily: "var(--cinema-mono)",
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: "var(--bone)",
                    borderBottom: "1px solid var(--bone)",
                    paddingBottom: 6,
                    textDecoration: "none",
                  }}
                >
                  {t("heroCta")} →
                </Link>
              </div>
            </article>
          );
        })}
      </div>

      <style jsx>{`
        @media (min-width: 768px) {
          :global(.nq-luxury-feature) {
            grid-template-columns: 1.4fr 1fr !important;
            gap: 56px !important;
            padding: 72px 0 !important;
          }
          :global(.nq-luxury-feature__body) {
            padding: 0 8px !important;
          }
        }
      `}</style>
    </section>
  );
}
