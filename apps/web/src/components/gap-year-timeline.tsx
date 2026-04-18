"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { destinationImage } from "@/lib/image-url";
import { GapYearStayPicks } from "./gap-year-stay-picks";
import type { GapYearPlan, MonthPlan, MonthPick, StayPick } from "@/lib/gap-year/types";

interface Props {
  plan: GapYearPlan;
  locale: string;
  onPlanChange: (plan: GapYearPlan) => void;
}

export function GapYearTimeline({ plan, locale, onPlanChange }: Props) {
  const [regeneratingIdx, setRegeneratingIdx] = useState<number | null>(null);
  const [staysByDest, setStaysByDest] = useState<Record<string, StayPick[]>>({});
  const [staysLoading, setStaysLoading] = useState(true);

  // Lazy-fetch stays for all picks after plan renders
  useEffect(() => {
    const allIds = Array.from(
      new Set(plan.months.flatMap((m) => m.destinations.map((d) => d.id)))
    );
    if (allIds.length === 0) {
      setStaysLoading(false);
      return;
    }
    setStaysLoading(true);
    fetch("/api/gap-year/stays", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids: allIds }),
    })
      .then((r) => r.json())
      .then((data) => setStaysByDest(data?.stays ?? {}))
      .catch(() => setStaysByDest({}))
      .finally(() => setStaysLoading(false));
  }, [plan]);

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
          party: plan.input.party ?? plan.input.persona,
          familiarity: plan.input.familiarity,
          experienceTier: plan.input.experienceTier,
          themes: plan.input.themes,
          region: target.region,
          alreadyPickedIds,
          // v1 compat
          persona: plan.input.party ?? plan.input.persona,
          budget: plan.input.budget,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        const msg = typeof data?.error === "string" ? data.error : "Could not regenerate this month.";
        throw new Error(msg);
      }
      const updated = [...plan.months];
      updated[idx] = data.month;
      onPlanChange({ ...plan, months: updated });
    } catch (err: any) {
      console.error(err);
      alert(err?.message || "Could not regenerate this month. Please try again.");
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
      <div className="rounded-xl border border-border bg-gradient-to-br from-primary/10 to-muted/40 p-6">
        <h1 className="text-2xl font-bold text-foreground">{plan.title}</h1>
        <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <Stat label="Duration" value={`${plan.input.durationMonths} months`} />
          <Stat label="Destinations" value={String(totalDests)} />
          <Stat label="States" value={String(states.size)} />
          <Stat label="Days" value={String(totalDays)} />
        </div>
      </div>

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
          staysByDest={staysByDest}
          staysLoading={staysLoading}
        />
      ))}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="font-semibold mt-0.5 text-foreground">{value}</div>
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
  staysByDest: Record<string, StayPick[]>;
  staysLoading: boolean;
}

function MonthCard({
  month, monthNumber, locale, isFirst, isLast, regenerating,
  onRegenerate, onMovePick, onRemovePick, staysByDest, staysLoading,
}: MonthCardProps) {
  const totalDays = month.destinations.reduce((sum, d) => sum + d.days, 0);

  return (
    <section className="rounded-xl border border-border bg-card overflow-hidden">
      <header className="flex items-center justify-between px-5 py-4 border-b border-border bg-muted/30">
        <div>
          <div className="text-xs uppercase tracking-wider text-muted-foreground">
            Month {monthNumber}
          </div>
          <div className="font-semibold text-lg text-foreground">{month.monthName}</div>
          {month.region && month.region !== "any" && (
            <div className="text-xs text-muted-foreground capitalize mt-0.5">{month.region} India</div>
          )}
        </div>
        <div className="flex items-center gap-3">
          {totalDays > 0 && (
            <span className="text-xs text-muted-foreground">{totalDays} days</span>
          )}
          <button
            onClick={onRegenerate}
            disabled={regenerating}
            className="text-xs px-3 py-1.5 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 transition"
          >
            {regenerating ? "…" : "Regenerate"}
          </button>
        </div>
      </header>

      {month.error && (
        <div className="p-5 text-sm text-amber-500 bg-amber-500/10 border-b border-amber-500/20">
          Couldn't fill this month: {month.error}. Try regenerate or relax filters.
        </div>
      )}

      {month.narrative && (
        <p className="px-5 pt-4 text-foreground/90">{month.narrative}</p>
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
            stays={staysByDest[pick.id]}
            staysLoading={staysLoading}
          />
        ))}
        {month.destinations.length === 0 && !month.error && (
          <p className="text-sm text-muted-foreground italic">No destinations yet. Regenerate to fill.</p>
        )}
      </div>
    </section>
  );
}

function DestCard({
  pick, locale, monthIndex, canMoveUp, canMoveDown, onMove, onRemove, stays, staysLoading,
}: {
  pick: MonthPick;
  locale: string;
  monthIndex: number;
  canMoveUp: boolean;
  canMoveDown: boolean;
  onMove: (dir: "up" | "down") => void;
  onRemove: () => void;
  stays: StayPick[] | undefined;
  staysLoading: boolean;
}) {
  const monthSlug = monthToSlug(monthIndex);
  const detailHref = `/${locale}/destination/${pick.id}/${monthSlug}`;

  return (
    <div className="rounded-lg border border-border bg-background p-3 hover:border-primary/50 transition">
      <div className="flex gap-4">
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
              <Link href={detailHref} className="font-semibold hover:underline block truncate text-foreground">
                {pick.name}
                {pick.isIconic && (
                  <span className="ml-2 text-[10px] uppercase tracking-wider text-primary">iconic</span>
                )}
              </Link>
              <div className="text-xs text-muted-foreground truncate">{pick.state} · {pick.days} days</div>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <button onClick={() => onMove("up")} disabled={!canMoveUp}
                className="w-7 h-7 rounded-md border border-border text-xs text-foreground hover:bg-muted disabled:opacity-30"
                title="Move to previous month">↑</button>
              <button onClick={() => onMove("down")} disabled={!canMoveDown}
                className="w-7 h-7 rounded-md border border-border text-xs text-foreground hover:bg-muted disabled:opacity-30"
                title="Move to next month">↓</button>
              <button onClick={onRemove}
                className="w-7 h-7 rounded-md border border-border text-xs text-foreground hover:bg-destructive/10 hover:border-destructive/50 hover:text-destructive"
                title="Remove">×</button>
            </div>
          </div>
          {pick.rationale && (
            <p className="text-sm text-foreground/80 mt-2 line-clamp-3">{pick.rationale}</p>
          )}
        </div>
      </div>

      {/* Alt-pair "also try" card */}
      {pick.alsoTry && (
        <div className="mt-3 rounded-md border border-dashed border-border/60 bg-muted/20 p-3">
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Also try</div>
          <div className="flex items-start gap-3">
            <Link
              href={`/${locale}/destination/${pick.alsoTry.altId}`}
              className="text-sm font-medium text-foreground hover:underline"
            >
              {pick.alsoTry.altName}
              {pick.alsoTry.altState && (
                <span className="text-xs text-muted-foreground font-normal ml-1.5">· {pick.alsoTry.altState}</span>
              )}
            </Link>
            {pick.alsoTry.driveTime && (
              <span className="text-[10px] text-muted-foreground">{pick.alsoTry.driveTime}</span>
            )}
          </div>
          <p className="text-xs text-foreground/80 mt-1">{pick.alsoTry.whyBetter}</p>
        </div>
      )}

      <GapYearStayPicks stays={stays} loading={staysLoading && !stays} />
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
