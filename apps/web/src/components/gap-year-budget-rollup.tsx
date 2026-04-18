"use client";

import type { GapYearPlan, Budget } from "@/lib/gap-year/types";

interface Props {
  plan: GapYearPlan;
}

export function GapYearBudgetRollup({ plan }: Props) {
  const tier: Budget = (plan.input.budget as Budget) ?? "mid-range";

  const perMonth = plan.months.map((m) => {
    const dailyFromPicks = m.destinations
      .map((p) => costByTier(p.dailyCostInr, tier))
      .filter((v): v is number => typeof v === "number");
    const avgDaily = dailyFromPicks.length
      ? Math.round(dailyFromPicks.reduce((a, b) => a + b, 0) / dailyFromPicks.length)
      : m.estDailyCostInr || defaultDaily(tier);
    const days = m.destinations.reduce((s, d) => s + d.days, 0);
    return { monthName: m.monthName, days, avgDaily, total: avgDaily * days };
  });

  const grandTotal = perMonth.reduce((s, m) => s + m.total, 0);
  const totalDays = perMonth.reduce((s, m) => s + m.days, 0);
  const avgDailyOverall = totalDays ? Math.round(grandTotal / totalDays) : 0;

  return (
    <section className="rounded-xl border border-border bg-card p-6">
      <h2 className="text-lg font-bold mb-4 text-foreground">Budget roll-up</h2>
      <p className="text-xs text-muted-foreground mb-4">
        Estimated based on {tier} tier. Per-person, excluding flights in. Stays + food + local transport only.
      </p>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <Stat label="Avg daily" value={`₹${avgDailyOverall.toLocaleString("en-IN")}`} />
        <Stat label="Total days" value={String(totalDays)} />
        <Stat label="Trip total" value={`₹${grandTotal.toLocaleString("en-IN")}`} />
      </div>

      <div className="border-t border-border pt-4">
        <h3 className="text-sm font-semibold mb-3 text-foreground">Per month</h3>
        <div className="space-y-2">
          {perMonth.map((m, i) => (
            <div key={i} className="flex items-center justify-between text-sm py-1">
              <span className="text-foreground">{m.monthName}</span>
              <span className="text-muted-foreground">
                {m.days > 0 ? `${m.days}d · ₹${m.avgDaily.toLocaleString("en-IN")}/d · ₹${m.total.toLocaleString("en-IN")}` : "–"}
              </span>
            </div>
          ))}
        </div>
      </div>

      <p className="text-xs text-muted-foreground mt-4">
        These are ranges from destination-level budget data, not quotes. Peak-season stays run 30–50% higher in Oct–Jan for coastal + heritage circuits.
      </p>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="font-bold text-lg mt-0.5 text-foreground">{value}</div>
    </div>
  );
}

function costByTier(
  costs: { budget?: number; midRange?: number; splurge?: number } | null | undefined,
  tier: Budget
): number | null {
  if (!costs) return null;
  if (tier === "budget" && typeof costs.budget === "number") return costs.budget;
  if (tier === "mid-range" && typeof costs.midRange === "number") return costs.midRange;
  if (tier === "splurge" && typeof costs.splurge === "number") return costs.splurge;
  return costs.midRange ?? costs.budget ?? costs.splurge ?? null;
}

function defaultDaily(tier: Budget): number {
  if (tier === "budget") return 1500;
  if (tier === "splurge") return 8000;
  return 3500;
}
