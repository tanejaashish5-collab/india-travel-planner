"use client";

import Link from "next/link";
import Image from "next/image";
import { destinationImage } from "@/lib/image-url";
import { GapYearBudgetRollup } from "./gap-year-budget-rollup";
import type { GapYearPlan } from "@/lib/gap-year/types";

interface Props {
  plan: GapYearPlan;
  locale: string;
}

export function GapYearPublicView({ plan, locale }: Props) {
  const totalDays = plan.months.reduce(
    (sum, m) => sum + m.destinations.reduce((d, p) => d + p.days, 0),
    0
  );
  const totalDests = plan.months.reduce((sum, m) => sum + m.destinations.length, 0);
  const states = new Set(
    plan.months.flatMap((m) => m.destinations.map((p) => p.state).filter(Boolean))
  );

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 space-y-6">
      <header className="rounded-xl border border-border bg-gradient-to-br from-primary/10 to-muted/40 p-6">
        <div className="text-xs uppercase tracking-wider text-muted-foreground">A NakshIQ Gap Year plan</div>
        <h1 className="text-2xl md:text-3xl font-bold mt-1 text-foreground">{plan.title}</h1>
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <Stat label="Duration" value={`${plan.input.durationMonths} months`} />
          <Stat label="Destinations" value={String(totalDests)} />
          <Stat label="States" value={String(states.size)} />
          <Stat label="Days" value={String(totalDays)} />
        </div>

        <div className="mt-4 flex gap-2">
          <Link
            href={`/${locale}/gap-year`}
            className="inline-block px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm hover:bg-primary/90 transition"
          >
            Plan your own gap year →
          </Link>
        </div>
      </header>

      {plan.months.map((m, idx) => (
        <section key={idx} className="rounded-xl border border-border bg-card overflow-hidden">
          <header className="px-5 py-4 border-b border-border bg-muted/30">
            <div className="text-xs uppercase tracking-wider text-muted-foreground">Month {idx + 1}</div>
            <div className="font-semibold text-lg text-foreground">{m.monthName}</div>
            {m.region && m.region !== "any" && (
              <div className="text-xs text-muted-foreground capitalize mt-0.5">{m.region} India</div>
            )}
          </header>

          {m.narrative && <p className="px-5 pt-4 text-foreground/90">{m.narrative}</p>}

          <div className="p-5 space-y-3">
            {m.destinations.map((pick) => (
              <Link
                key={pick.id}
                href={`/${locale}/destination/${pick.id}/${monthSlug(m.monthIndex)}`}
                className="flex gap-4 rounded-lg border border-border bg-background p-3 hover:border-primary/50 transition"
              >
                <Image
                  src={destinationImage(pick.id)}
                  alt={pick.name}
                  width={120}
                  height={80}
                  className="rounded-md object-cover w-[120px] h-[80px]"
                />
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-foreground">{pick.name}</div>
                  <div className="text-xs text-muted-foreground">{pick.state} · {pick.days} days</div>
                  {pick.rationale && (
                    <p className="text-sm text-foreground/80 mt-2 line-clamp-2">{pick.rationale}</p>
                  )}
                </div>
              </Link>
            ))}
            {m.destinations.length === 0 && (
              <p className="text-sm text-muted-foreground italic">No destinations chosen for this month.</p>
            )}
          </div>
        </section>
      ))}

      <GapYearBudgetRollup plan={plan} />

      <div className="rounded-xl border border-border p-6 text-center bg-muted/30">
        <div className="font-semibold mb-2 text-foreground">Make one of your own.</div>
        <p className="text-sm text-muted-foreground mb-4">
          Tell us when you're free. We'll match the right India for you, month by month.
        </p>
        <Link
          href={`/${locale}/gap-year`}
          className="inline-block px-5 py-2.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition"
        >
          Start my gap year
        </Link>
      </div>
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

function monthSlug(n: number): string {
  const SLUGS = [
    "january", "february", "march", "april", "may", "june",
    "july", "august", "september", "october", "november", "december",
  ];
  return SLUGS[n - 1];
}
