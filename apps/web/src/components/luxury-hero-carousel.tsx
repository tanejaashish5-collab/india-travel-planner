"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { currentMonthLongIST } from "@itp/shared";
import { videoSrc } from "@/lib/video-url";
import type { LuxuryRow } from "@/lib/luxury-schema";

// Cinematic hero for /luxury — adapts the Act 1 Dispatch pattern (landing
// page) to video instead of image. Cross-fades 4 hero entries every 7.5s,
// hover pauses, prev/next + dot pagination. Each slide plays its
// hero_video_slug muted/looped. Skips rows with no video slug.

type Props = {
  heroes: LuxuryRow[];
  locale: string;
};

function pickHeroFields(row: LuxuryRow, locale: string) {
  const t = locale === "hi" ? row.translations?.hi : undefined;
  return {
    name: (t?.name as string) || row.name,
    tagline: (t?.tagline as string) || row.tagline || null,
  };
}

export function LuxuryHeroCarousel({ heroes, locale }: Props) {
  const t = useTranslations("luxury");
  const monthLong = currentMonthLongIST();
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || heroes.length < 2) return;
    const id = setInterval(() => setIdx((i) => (i + 1) % heroes.length), 7500);
    return () => clearInterval(id);
  }, [paused, heroes.length]);

  if (!heroes.length) return null;

  const hero = heroes[idx];
  const heroFields = pickHeroFields(hero, locale);
  const categoryLabel = t(`category_${hero.category}` as "category_train");
  const tierLabel = t(`tier_${hero.tier}` as "tier_iconic");

  return (
    <section
      className="nq-luxury-hero"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        minHeight: 640,
        overflow: "hidden",
        background: "var(--paper)",
        marginTop: 88,
      }}
    >
      {/* Crossfading video stack */}
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
          {d.hero_video_slug && (
            <video
              autoPlay
              muted
              loop
              playsInline
              preload={i === 0 ? "auto" : "metadata"}
              disablePictureInPicture
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
                filter: "saturate(0.92) contrast(1.04)",
              }}
            >
              <source src={videoSrc(d.hero_video_slug)} type="video/mp4" />
            </video>
          )}
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

      {/* Hairline frame */}
      <div
        aria-hidden
        className="nq-luxury-hero__frame"
        style={{
          position: "absolute",
          border: "1px solid rgba(245,241,232,.16)",
          pointerEvents: "none",
          zIndex: 2,
        }}
      />

      {/* Top-left dispatch metadata */}
      <div
        className="nq-fadeup-auto nq-luxury-hero__meta-tl"
        style={{
          position: "absolute",
          display: "flex",
          flexDirection: "column",
          gap: 8,
          maxWidth: "45%",
          zIndex: 5,
        }}
      >
        <div className="nq-kicker">
          {t("dispatchKicker", { month: monthLong })}
        </div>
        <div className="nq-meta" style={{ color: "var(--bone-dim)" }}>
          {hero.operator?.toUpperCase()}
          {hero.duration ? (
            <>
              <br />
              {hero.duration.toUpperCase()}
            </>
          ) : null}
        </div>
      </div>

      {/* Top-right tier badge */}
      <div
        className="nq-fadeup-auto nq-luxury-hero__tier-tr"
        style={{
          position: "absolute",
          textAlign: "right",
          transitionDelay: "0.18s",
          zIndex: 5,
        }}
      >
        <div className="nq-kicker" style={{ color: "var(--vermillion)" }}>
          {tierLabel} · {categoryLabel}
        </div>
        {hero.price_band_inr && (
          <div
            className="nq-meta"
            style={{ color: "var(--bone-dim)", marginTop: 8 }}
          >
            {hero.price_band_inr}
          </div>
        )}
      </div>

      {/* Bottom-left main title */}
      <div
        className="nq-fadeup-auto nq-luxury-hero__title"
        style={{
          position: "absolute",
          maxWidth: 980,
          transitionDelay: "0.36s",
          zIndex: 5,
        }}
      >
        <h2
          className="nq-display"
          style={{
            fontSize: "clamp(40px, 7vw, 104px)",
            fontStyle: "italic",
            fontWeight: 400,
            lineHeight: 1.0,
            letterSpacing: "-0.01em",
            margin: 0,
            color: "var(--bone)",
          }}
        >
          {heroFields.name}
        </h2>
        {heroFields.tagline && (
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
            {heroFields.tagline}
          </p>
        )}
        <Link
          href={`/${locale}/luxury/${hero.id}`}
          className="nq-kicker"
          style={{
            display: "inline-block",
            marginTop: 28,
            color: "var(--bone)",
            borderBottom: "1px solid var(--bone)",
            paddingBottom: 6,
            textDecoration: "none",
          }}
        >
          {t("heroCta")} →
        </Link>
      </div>

      {/* Bottom strip: progress + prev/next */}
      <div
        className="nq-luxury-hero__strip"
        style={{
          position: "absolute",
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
          aria-label="Previous slide"
          className="nq-kicker"
          style={{
            background: "transparent",
            border: 0,
            color: "var(--bone)",
            cursor: "pointer",
            padding: "4px 8px",
          }}
        >
          ←
        </button>
        <button
          type="button"
          onClick={() => setIdx((i) => (i + 1) % heroes.length)}
          aria-label="Next slide"
          className="nq-kicker"
          style={{
            background: "transparent",
            border: 0,
            color: "var(--bone)",
            cursor: "pointer",
            padding: "4px 8px",
          }}
        >
          →
        </button>
      </div>

      <style jsx>{`
        :global(.nq-luxury-hero__frame) {
          top: 80px;
          left: 16px;
          right: 16px;
          bottom: 48px;
        }
        :global(.nq-luxury-hero__meta-tl) {
          top: 96px;
          left: 24px;
        }
        :global(.nq-luxury-hero__tier-tr) {
          top: 96px;
          right: 24px;
        }
        :global(.nq-luxury-hero__title) {
          left: 24px;
          right: 24px;
          bottom: 96px;
        }
        :global(.nq-luxury-hero__strip) {
          left: 24px;
          right: 24px;
          bottom: 36px;
        }
        @media (min-width: 768px) {
          :global(.nq-luxury-hero__frame) {
            top: 80px;
            left: 40px;
            right: 40px;
            bottom: 60px;
          }
          :global(.nq-luxury-hero__meta-tl) {
            top: 108px;
            left: 64px;
          }
          :global(.nq-luxury-hero__tier-tr) {
            top: 108px;
            right: 64px;
          }
          :global(.nq-luxury-hero__title) {
            left: 64px;
            right: 64px;
            bottom: 120px;
          }
          :global(.nq-luxury-hero__strip) {
            left: 64px;
            right: 64px;
            bottom: 64px;
          }
        }
      `}</style>
    </section>
  );
}
