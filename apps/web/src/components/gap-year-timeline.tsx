"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { destinationImage } from "@/lib/image-url";
import type { GapYearPlan, MonthPlan, MonthPick } from "@/lib/gap-year/types";

interface Props {
  plan: GapYearPlan;
  locale: string;
  onPlanChange: (plan: GapYearPlan) => void;
}

export function GapYearTimeline({ plan, locale, onPlanChange }: Props) {
  const [regeneratingIdx, setRegeneratingIdx] = useState<number | null>(null);

  const totalDays = plan.months.reduce(
    (sum, m) => sum + m.destinations.reduce((d, p) => d + p.days, 0),
    0
  );
  const totalDests = plan.months.reduce((sum, m) => sum + m.destinations.length, 0);
  const states = new Set(
    plan.months.flatMap((m) => m.destinations.map((p) => p.state).filter(Boolean))
  );

  async function regenerateMonth(idx: number) {
    setRegeneratingIdx(idx);
    try {
      const target = plan.months[idx];
      const alreadyPickedIds = plan.months
        .filter((_, i) => i !== idx)
        .flatMap((m) => m.destinations.map((d) => d.id));

      const res = await fetch("/api/gap-year/regenerate-month", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          monthIndex: target.monthIndex,
          persona: plan.input.persona,
          budget: plan.input.budget,
          interests: plan.input.interests,
          region: target.region,
          alreadyPickedIds,
        }),
      });
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      const updated = [...plan.months];
      updated[idx] = data.month;
      onPlanChange({ ...plan, months: updated });
    } catch (err) {
      console.error(err);
      alert("Could not regenerate this month. Please try again.");
    } finally {
      setRegeneratingIdx(null);
    }
  }

  function movePick(fromMonthIdx: number, pickId: string, direction: "up" | "down") {
    const targetIdx = direction === "up" ? fromMonthIdx - 1 : fromMonthIdx + 1;
    if (targetIdx < 0 || targetIdx >= plan.months.length) return;

    const updated = plan.months.map((m) => ({ ...m, destinations: [...m.destinations] }));
    const pickIndex = updated[fromMonthIdx].destinations.findIndex((p) => p.id === pickId);
    if (pickIndex === -1) return;
    const [pick] = updated[fromMonthIdx].destinations.splice(pickIndex, 1);
    updated[targetIdx].destinations.push(pick);
    onPlanChange({ ...plan, months: updated });
  }

  function removePick(monthIdx: number, pickId: string) {
    const updated = plan.months.map((m, i) =>
      i === monthIdx
        ? { ...m, destinations: m.destinations.filter((p) => p.id !== pickId) }
        : m
    );
    onPlanChange({ ...plan, months: updated });
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-xl border bg-gradient-to-br from-emerald-50 to-amber-50 p-6">
        <h1 className="text-2xl font-bold">{plan.title}</h1>
        <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <Stat label="Duration" value={`${plan.input.durationMonths} months`} />
          <Stat label="Destinations" value={String(totalDests)} />
          <Stat label="States" value={String(states.size)} />
          <Stat label="Days on road" value={String(totalDays)} />
        </div>
      </div>

      {/* Months */}
      {plan.months.map((month, idx) => (
        <MonthCard
          key={`${month.monthIndex}-${idx}`}
          month={month}
          monthNumber={idx + 1}
          locale={locale}
          isFirst={idx === 0}
          isLast={idx === plan.months.length - 1}
          regenerating={regeneratingIdx === idx}
          onRegenerate={() => regenerateMonth(idx)}
          onMovePick={(pickId, dir) => movePick(idx, pickId, dir)}
          onRemovePick={(pickId) => removePick(idx, pickId)}
        />
      ))}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-xs uppercase tracking-wider text-gray-500">{label}</div>
      <div className="font-semibold mt-0.5">{value}</div>
    </div>
  );
}

interface MonthCardProps {
  month: MonthPlan;
  monthNumber: number;
  locale: string;
  isFirst: boolean;
  isLast: boolean;
  regenerating: boolean;
  onRegenerate: () => void;
  onMovePick: (pickId: string, direction: "up" | "down") => void;
  onRemovePick: (pickId: string) => void;
}

function MonthCard({
  month,
  monthNumber,
  locale,
  isFirst,
  isLast,
  regenerating,
  onRegenerate,
  onMovePick,
  onRemovePick,
}: MonthCardProps) {
  const totalDays = month.destinations.reduce((sum, d) => sum + d.days, 0);

  return (
    <section className="rounded-xl border bg-white overflow-hidden">
      <header className="flex items-center justify-between px-5 py-4 border-b bg-gray-50">
        <div>
          <div className="text-xs uppercase tracking-wider text-gray-500">
            Month {monthNumber}
          </div>
          <div className="font-semibold text-lg">{month.monthName}</div>
          {month.region && month.region !== "any" && (
            <div className="text-xs text-gray-600 capitalize mt-0.5">{month.region} India</div>
          )}
        </div>
        <div className="flex items-center gap-3">
          {totalDays > 0 && (
            <span className="text-xs text-gray-600">{totalDays} days</span>
          )}
          <button
            onClick={onRegenerate}
            disabled={regenerating}
            className="text-xs px-3 py-1.5 rounded-md bg-emerald-600 text-white hover:bg-emerald-700 disabled:bg-gray-400"
          >
            {regenerating ? "…" : "Regenerate"}
          </button>
        </div>
      </header>

      {month.error && (
        <div className="p-5 text-sm text-amber-700 bg-amber-50">
          Couldn't fill this month: {month.error}. Try regenerate or relax filters.
        </div>
      )}

      {month.narrative && (
        <p className="px-5 pt-4 text-gray-700">{month.narrative}</p>
      )}

      <div className="p-5 space-y-3">
        {month.destinations.map((pick) => (
          <DestCard
            key={pick.id}
            pick={pick}
            locale={locale}
            monthIndex={month.monthIndex}
            canMoveUp={!isFirst}
            canMoveDown={!isLast}
            onMove={(dir) => onMovePick(pick.id, dir)}
            onRemove={() => onRemovePick(pick.id)}
          />
        ))}
        {month.destinations.length === 0 && !month.error && (
          <p className="text-sm text-gray-500 italic">No destinations yet. Regenerate to fill.</p>
        )}
      </div>
    </section>
  );
}

function DestCard({
  pick,
  locale,
  monthIndex,
  canMoveUp,
  canMoveDown,
  onMove,
  onRemove,
}: {
  pick: MonthPick;
  locale: string;
  monthIndex: number;
  canMoveUp: boolean;
  canMoveDown: boolean;
  onMove: (dir: "up" | "down") => void;
  onRemove: () => void;
}) {
  const monthSlug = monthToSlug(monthIndex);
  const detailHref = `/${locale}/destination/${pick.id}/${monthSlug}`;

  return (
    <div className="flex gap-4 rounded-lg border p-3 hover:border-emerald-400 transition">
      <Link href={detailHref} className="shrink-0">
        <Image
          src={destinationImage(pick.id)}
          alt={pick.name}
          width={120}
          height={80}
          className="rounded-md object-cover w-[120px] h-[80px]"
        />
      </Link>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <Link href={detailHref} className="font-semibold hover:underline block truncate">
              {pick.name}
            </Link>
            <div className="text-xs text-gray-600 truncate">{pick.state} · {pick.days} days</div>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={() => onMove("up")}
              disabled={!canMoveUp}
              className="w-7 h-7 rounded-md border text-xs hover:bg-gray-100 disabled:opacity-30"
              title="Move to previous month"
            >↑</button>
            <button
              onClick={() => onMove("down")}
              disabled={!canMoveDown}
              className="w-7 h-7 rounded-md border text-xs hover:bg-gray-100 disabled:opacity-30"
              title="Move to next month"
            >↓</button>
            <button
              onClick={onRemove}
              className="w-7 h-7 rounded-md border text-xs hover:bg-red-50 hover:border-red-300"
              title="Remove"
            >×</button>
          </div>
        </div>
        {pick.rationale && (
          <p className="text-sm text-gray-700 mt-2 line-clamp-2">{pick.rationale}</p>
        )}
      </div>
    </div>
  );
}

function monthToSlug(n: number): string {
  const SLUGS = [
    "january", "february", "march", "april", "may", "june",
    "july", "august", "september", "october", "november", "december",
  ];
  return SLUGS[n - 1];
}
