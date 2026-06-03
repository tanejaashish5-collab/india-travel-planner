"use client";

// Interactive trip-cost calculator for /cost/[slug].
//
// SSR-safe: the server renders this with the exact same props the client
// initialises useState from (initialDays/People/Tier/Month), so the first
// client render reproduces the server HTML byte-for-byte — no hydration drift.
// All math lives in @/lib/trip-cost (framework-free, shared with the page).

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";

import {
  type CostRow,
  type Tier,
  type CategoryKey,
  TIERS,
  estimateTrip,
  estimateAllTiers,
  seasonForMonth,
  inr,
  MONTH_NAMES_EN,
  MONTH_NAMES_HI,
} from "@/lib/trip-cost";

const CAT_KEY: Record<CategoryKey, string> = {
  stay: "catStay",
  food: "catFood",
  localTransport: "catLocalTransport",
  intercity: "catIntercity",
  activities: "catActivities",
  permits: "catPermits",
};

const TIER_KEY: Record<Tier, string> = {
  budget: "tierBudget",
  mid: "tierMid",
  luxury: "tierLuxury",
};

export function CostCalculator({
  rows,
  name,
  locale,
  initialDays,
  initialPeople,
  initialTier,
  initialMonth,
}: {
  rows: CostRow[];
  name: string;
  locale: string;
  initialDays: number;
  initialPeople: number;
  initialTier: Tier;
  initialMonth: number; // 1-12
}) {
  const t = useTranslations("costCalculator");
  const isHindi = locale === "hi";
  const monthNames = isHindi ? MONTH_NAMES_HI : MONTH_NAMES_EN;

  const [days, setDays] = useState(initialDays);
  const [people, setPeople] = useState(initialPeople);
  const [tier, setTier] = useState<Tier>(initialTier);
  const [month, setMonth] = useState(initialMonth);

  const estimate = useMemo(
    () => estimateTrip(rows, { days, people, tier, month }),
    [rows, days, people, tier, month],
  );
  const allTiers = useMemo(
    () => estimateAllTiers(rows, { days, people, month }),
    [rows, days, people, month],
  );
  const season = useMemo(() => seasonForMonth(rows, month), [rows, month]);

  const seasonLabel = t(`season${season[0].toUpperCase()}${season.slice(1)}`);

  return (
    <div className="rounded-2xl border border-border bg-card p-4 sm:p-6">
      {/* Controls */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Stepper
          label={t("days")}
          dec={t("decrease")}
          inc={t("increase")}
          value={days}
          min={1}
          max={30}
          onChange={setDays}
        />
        <Stepper
          label={t("travellers")}
          dec={t("decrease")}
          inc={t("increase")}
          value={people}
          min={1}
          max={12}
          onChange={setPeople}
        />
        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            {t("month")}
          </span>
          <select
            value={month}
            onChange={(e) => setMonth(Number(e.target.value))}
            className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
            aria-label={t("month")}
          >
            {monthNames.map((m, i) => (
              <option key={i} value={i + 1}>
                {m}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            {t("tier")}
          </span>
          <select
            value={tier}
            onChange={(e) => setTier(e.target.value as Tier)}
            className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
            aria-label={t("tier")}
          >
            {TIERS.map((tr) => (
              <option key={tr} value={tr}>
                {t(TIER_KEY[tr])}
              </option>
            ))}
          </select>
        </label>
      </div>

      {/* Headline total */}
      <div className="mt-6 rounded-xl border border-border bg-muted/30 p-4 sm:p-5">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              {t("estTotal")}
            </p>
            <p className="font-mono text-3xl font-bold tabular-nums sm:text-4xl">
              {inr(estimate.total)}
            </p>
          </div>
          <p className="font-mono text-sm tabular-nums text-muted-foreground">
            {inr(estimate.perDay)}
            {t("perDay")} · {inr(estimate.perPerson)}/{t("perPersonShort")}
          </p>
        </div>
        <p className="mt-1 text-xs text-muted-foreground">
          {t("forPeople", {
            people,
            days,
            month: monthNames[month - 1],
          })}{" "}
          · <span className="font-medium">{t("seasonLabel", { season: seasonLabel })}</span>
        </p>
        {season === "peak" && (
          <p className="mt-2 text-xs font-medium text-amber-600 dark:text-amber-400">
            {t("peakNote")}
          </p>
        )}
        {season === "low" && (
          <p className="mt-2 text-xs font-medium text-emerald-600 dark:text-emerald-400">
            {t("lowNote")}
          </p>
        )}
      </div>

      {/* Itemised breakdown */}
      <ul className="mt-4 divide-y divide-border">
        {estimate.lines.map((line) => (
          <li
            key={line.key}
            className="flex items-center justify-between gap-3 py-2.5"
          >
            <span className="text-sm">{t(CAT_KEY[line.key])}</span>
            <span className="font-mono text-sm tabular-nums">{inr(line.amount)}</span>
          </li>
        ))}
      </ul>

      {/* Three-style comparison */}
      <div className="mt-6">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          {t("compareTiers")}
        </p>
        <div className="grid grid-cols-3 gap-2">
          {TIERS.map((tr) => {
            const active = tr === tier;
            return (
              <button
                key={tr}
                type="button"
                onClick={() => setTier(tr)}
                aria-pressed={active}
                className={`rounded-xl border p-3 text-left transition-colors ${
                  active
                    ? "border-foreground bg-foreground/5"
                    : "border-border hover:border-foreground/40"
                }`}
              >
                <span className="block text-xs font-semibold text-muted-foreground">
                  {t(TIER_KEY[tr])}
                </span>
                <span className="mt-0.5 block font-mono text-sm font-bold leading-tight tabular-nums sm:text-base">
                  {inr(allTiers[tr].total)}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Assumptions + disclaimer */}
      <details className="mt-5 text-xs text-muted-foreground">
        <summary className="cursor-pointer font-semibold text-foreground">
          {t("assumptionsTitle")}
        </summary>
        <p className="mt-2 leading-relaxed">{t("assumptions", { name })}</p>
      </details>
      <p className="mt-3 text-[11px] leading-relaxed text-muted-foreground/80">
        {t("disclaimer")}
      </p>
    </div>
  );
}

function Stepper({
  label,
  dec,
  inc,
  value,
  min,
  max,
  onChange,
}: {
  label: string;
  dec: string;
  inc: string;
  value: number;
  min: number;
  max: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {label}
      </span>
      <div className="flex items-center rounded-lg border border-border bg-background">
        <button
          type="button"
          onClick={() => onChange(Math.max(min, value - 1))}
          disabled={value <= min}
          className="px-3 py-2 text-lg leading-none text-muted-foreground disabled:opacity-30"
          aria-label={`${dec} ${label}`}
        >
          −
        </button>
        <span className="flex-1 text-center font-mono text-sm tabular-nums" aria-live="polite">
          {value}
        </span>
        <button
          type="button"
          onClick={() => onChange(Math.min(max, value + 1))}
          disabled={value >= max}
          className="px-3 py-2 text-lg leading-none text-muted-foreground disabled:opacity-30"
          aria-label={`${inc} ${label}`}
        >
          +
        </button>
      </div>
    </div>
  );
}
