"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { videoSrc } from "@/lib/video-url";
import { destinationImage } from "@/lib/image-url";
import type { LuxuryRow } from "@/lib/luxury-schema";

type Props = { rows: LuxuryRow[]; locale: string };

type CategoryFilter = "all" | "train" | "stay" | "itinerary";

const CATEGORY_KEYS: Array<Exclude<CategoryFilter, "all">> = ["train", "stay", "itinerary"];

const MONTH_SHORT = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function localized(row: LuxuryRow, locale: string, field: "name" | "tagline"): string {
  if (locale === "hi") {
    const t = row.translations?.hi?.[field];
    if (t) return t as string;
  }
  return ((row as Record<string, unknown>)[field] as string) ?? "";
}

function bestMonthsLabel(months?: number[] | null): string | null {
  if (!months || months.length === 0) return null;
  const sorted = [...months].sort((a, b) => a - b);
  const first = sorted[0];
  const last = sorted[sorted.length - 1];
  if (sorted.length >= 8) return "Year-round";
  if (sorted.length <= 3) return sorted.map((m) => MONTH_SHORT[m]).join(", ");
  return `${MONTH_SHORT[first]}–${MONTH_SHORT[last]}`;
}

export function LuxuryContent({ rows, locale }: Props) {
  const t = useTranslations("luxury");
  const [filter, setFilter] = useState<CategoryFilter>("all");

  const counts = useMemo(() => {
    const c: Record<string, number> = { train: 0, stay: 0, itinerary: 0 };
    rows.forEach((r) => {
      c[r.category] = (c[r.category] ?? 0) + 1;
    });
    return c;
  }, [rows]);

  const filtered = useMemo(() => {
    if (filter === "all") return rows;
    return rows.filter((r) => r.category === filter);
  }, [rows, filter]);

  if (rows.length === 0) {
    return (
      <div style={{ padding: "60px 0", textAlign: "center", color: "var(--bone-dim)" }}>
        <p>{t("comingSoon")}</p>
      </div>
    );
  }

  return (
    <div>
      {/* Editorial filter chip row — borderTop+borderBottom, no rounded pills */}
      <nav
        aria-label="Filter luxury entries by category"
        style={{
          display: "flex",
          gap: 4,
          flexWrap: "wrap",
          borderTop: "1px solid var(--hair)",
          borderBottom: "1px solid var(--hair)",
          padding: "20px 0",
          marginBottom: 56,
        }}
      >
        <FilterChip
          active={filter === "all"}
          onClick={() => setFilter("all")}
          label={t("filterAll")}
          count={rows.length}
        />
        {CATEGORY_KEYS.map((cat) => (
          <FilterChip
            key={cat}
            active={filter === cat}
            onClick={() => setFilter(cat)}
            label={t(`filter_${cat}` as "filter_train")}
            count={counts[cat] ?? 0}
          />
        ))}
      </nav>

      <ul className="nq-luxury-grid">
        {filtered.map((r) => (
          <li key={r.id} style={{ listStyle: "none" }}>
            <LuxuryCard row={r} locale={locale} t={t} />
          </li>
        ))}
      </ul>

      <style jsx>{`
        :global(.nq-luxury-grid) {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 16px;
          padding: 0;
          margin: 0;
        }
        @media (min-width: 640px) {
          :global(.nq-luxury-grid) {
            grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
            gap: 32px;
          }
        }
        :global(.nq-luxury-card) {
          display: block;
          background: var(--film-2);
          border: 1px solid var(--hair);
          overflow: hidden;
          color: inherit;
          text-decoration: none;
          transition: border-color 280ms ease;
        }
        :global(.nq-luxury-card:hover) {
          border-color: var(--vermillion);
        }
        :global(.nq-luxury-card__media) {
          position: relative;
          aspect-ratio: 4 / 3;
          background: var(--paper-2);
          overflow: hidden;
        }
        :global(.nq-luxury-card__media video),
        :global(.nq-luxury-card__media img) {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: saturate(0.85) brightness(0.78);
          transition: transform 600ms ease, filter 600ms ease;
        }
        :global(.nq-luxury-card:hover .nq-luxury-card__media video),
        :global(.nq-luxury-card:hover .nq-luxury-card__media img) {
          transform: scale(1.04);
          filter: saturate(1) brightness(0.92);
        }
        :global(.nq-luxury-card__body) {
          padding: 14px 14px 18px;
        }
        :global(.nq-luxury-card__title) {
          font-family: var(--cinema-display);
          font-style: italic;
          font-weight: 500;
          font-size: 18px;
          line-height: 1.15;
          letter-spacing: -0.012em;
          color: var(--bone);
          margin: 0 0 10px;
          transition: color 220ms ease;
        }
        :global(.nq-luxury-card:hover .nq-luxury-card__title) {
          color: var(--vermillion);
        }
        @media (min-width: 640px) {
          :global(.nq-luxury-card__body) {
            padding: 24px 24px 28px;
          }
          :global(.nq-luxury-card__title) {
            font-size: 26px;
            margin-bottom: 12px;
          }
        }
        :global(.nq-luxury-card__tagline) {
          font-family: var(--cinema-ui);
          font-size: 14px;
          line-height: 1.55;
          color: var(--bone-dim);
          margin: 0 0 14px;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        :global(.nq-luxury-card__meta) {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          font-family: var(--cinema-mono);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--vermillion);
          line-height: 1.4;
        }
      `}</style>
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  label,
  count,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  count: number;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        background: active ? "var(--vermillion)" : "transparent",
        color: active ? "var(--paper)" : "var(--bone-dim)",
        border: "1px solid",
        borderColor: active ? "var(--vermillion)" : "var(--hair)",
        padding: "10px 18px",
        fontFamily: "var(--cinema-ui)",
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        cursor: "pointer",
        transition: "all 220ms ease",
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
      }}
    >
      <span>{label}</span>
      <span style={{ opacity: 0.7 }}>{String(count).padStart(2, "0")}</span>
    </button>
  );
}

function LuxuryCard({
  row,
  locale,
  t,
}: {
  row: LuxuryRow;
  locale: string;
  t: ReturnType<typeof useTranslations>;
}) {
  const name = localized(row, locale, "name") || row.name;
  const tagline = localized(row, locale, "tagline") || row.tagline || "";
  const categoryLabel = t(`category_${row.category}` as "category_train");
  const tierLabel = t(`tier_${row.tier}` as "tier_iconic");
  const months = bestMonthsLabel(row.best_months);
  const posterImg = row.primary_destination_id
    ? destinationImage(row.primary_destination_id, 1200)
    : null;

  return (
    <Link href={`/${locale}/luxury/${row.id}`} className="nq-luxury-card">
      <div className="nq-luxury-card__media">
        {row.hero_video_slug ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            disablePictureInPicture
            aria-hidden="true"
          >
            <source src={videoSrc(row.hero_video_slug)} type="video/mp4" />
          </video>
        ) : posterImg ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img src={posterImg} alt="" loading="lazy" decoding="async" />
        ) : (
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 24,
              fontFamily: "var(--cinema-display)",
              fontStyle: "italic",
              fontSize: 20,
              color: "var(--bone-dim)",
              textAlign: "center",
            }}
          >
            {name}
          </div>
        )}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, transparent 50%, rgba(10,10,8,0.6) 100%)",
            pointerEvents: "none",
          }}
        />
        <span
          style={{
            position: "absolute",
            top: 16,
            left: 16,
            fontFamily: "var(--cinema-mono)",
            fontSize: 10,
            fontWeight: 700,
            color: "var(--vermillion)",
            letterSpacing: "0.22em",
            background: "rgba(10, 10, 8, 0.7)",
            padding: "4px 8px",
            textTransform: "uppercase",
          }}
        >
          {categoryLabel} · {tierLabel}
        </span>
      </div>
      <div className="nq-luxury-card__body">
        <h3 className="nq-luxury-card__title">{name}</h3>
        {tagline && <p className="nq-luxury-card__tagline">{tagline}</p>}
        <div className="nq-luxury-card__meta">
          {row.operator && <span>{row.operator}</span>}
          {row.price_band_inr && (
            <>
              <span style={{ opacity: 0.4 }}>·</span>
              <span>{row.price_band_inr}</span>
            </>
          )}
          {months && (
            <>
              <span style={{ opacity: 0.4 }}>·</span>
              <span>{months}</span>
            </>
          )}
        </div>
      </div>
    </Link>
  );
}
