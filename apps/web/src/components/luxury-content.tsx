"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import type { LuxuryRow } from "@/lib/luxury-schema";

type Props = { rows: LuxuryRow[]; locale: string };

type CategoryFilter = "all" | "train" | "stay" | "itinerary";

const CATEGORY_LABEL: Record<Exclude<CategoryFilter, "all">, string> = {
  train: "Trains",
  stay: "Stays",
  itinerary: "Itineraries",
};

const MONTH_SHORT = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function localized(row: LuxuryRow, locale: string, field: "name" | "tagline"): string {
  if (locale === "hi") {
    const t = row.translations?.hi?.[field];
    if (t) return t;
  }
  return (row as Record<string, unknown>)[field] as string ?? "";
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
    rows.forEach((r) => { c[r.category] = (c[r.category] ?? 0) + 1; });
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
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 40 }}>
        <FilterPill active={filter === "all"} onClick={() => setFilter("all")} label={`${t("filterAll")} ${rows.length}`} />
        {(Object.keys(CATEGORY_LABEL) as Array<keyof typeof CATEGORY_LABEL>).map((cat) => (
          <FilterPill
            key={cat}
            active={filter === cat}
            onClick={() => setFilter(cat)}
            label={`${t(`filter_${cat}` as "filter_train")} ${counts[cat] ?? 0}`}
          />
        ))}
      </div>
      <ul style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 24, listStyle: "none", padding: 0 }}>
        {filtered.map((r) => (
          <li key={r.id}>
            <Link
              href={`/${locale}/luxury/${r.id}`}
              style={{
                display: "block",
                borderTop: "1px solid var(--hair)",
                padding: "20px 0 24px",
                color: "var(--bone)",
                textDecoration: "none",
              }}
            >
              <div style={{
                display: "flex",
                gap: 12,
                fontFamily: "var(--cinema-mono)",
                fontSize: 11,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "var(--bone-dim)",
                marginBottom: 12,
              }}>
                <span>{t(`category_${r.category}` as "category_train")}</span>
                <span style={{ opacity: 0.5 }}>·</span>
                <span>{t(`tier_${r.tier}` as "tier_iconic")}</span>
              </div>
              <h3 style={{
                fontFamily: "var(--cinema-display)",
                fontStyle: "italic",
                fontSize: 26,
                lineHeight: 1.15,
                fontWeight: 400,
                margin: "0 0 8px",
              }}>
                {localized(r, locale, "name") || r.name}
              </h3>
              {(localized(r, locale, "tagline") || r.tagline) && (
                <p style={{ fontSize: 14, lineHeight: 1.55, color: "var(--bone-dim)", margin: "0 0 14px" }}>
                  {localized(r, locale, "tagline") || r.tagline}
                </p>
              )}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 16, fontSize: 12, color: "var(--bone-dim)" }}>
                {r.operator && <span>{r.operator}</span>}
                {r.price_band_inr && <span>· {r.price_band_inr}</span>}
                {bestMonthsLabel(r.best_months) && <span>· {bestMonthsLabel(r.best_months)}</span>}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function FilterPill({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        background: active ? "var(--bone)" : "transparent",
        color: active ? "var(--paper)" : "var(--bone)",
        border: "1px solid var(--hair)",
        padding: "8px 16px",
        fontSize: 13,
        cursor: "pointer",
        fontFamily: "var(--cinema-sans)",
      }}
    >
      {label}
    </button>
  );
}
