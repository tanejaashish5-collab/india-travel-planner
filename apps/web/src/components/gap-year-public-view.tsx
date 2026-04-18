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
      <header className="rounded-xl border bg-gradient-to-br from-emerald-50 to-amber-50 p-6">
        <div className="text-xs uppercase tracking-wider text-gray-500">A NakshIQ Gap Year plan</div>
        <h1 className="text-2xl md:text-3xl font-bold mt-1">{plan.title}</h1>
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <Stat label="Duration" value={`${plan.input.durationMonths} months`} />
          <Stat label="Destinations" value={String(totalDests)} />
          <Stat label="States" value={String(states.size)} />
          <Stat label="Days" value={String(totalDays)} />
        </div>

        <div className="mt-4 flex gap-2">
          <Link
            href={`/${locale}/gap-year`}
            className="inline-block px-4 py-2 rounded-lg bg-emerald-600 text-white text-sm hover:bg-emerald-700"
          >
            Plan your own gap year →
          </Link>
        </div>
      </header>

      {plan.months.map((m, idx) => (
        <section key={idx} className="rounded-xl border bg-white overflow-hidden">
          <header className="px-5 py-4 border-b bg-gray-50">
            <div className="text-xs uppercase tracking-wider text-gray-500">Month {idx + 1}</div>
            <div className="font-semibold text-lg">{m.monthName}</div>
            {m.region && m.region !== "any" && (
              <div className="text-xs text-gray-600 capitalize mt-0.5">{m.region} India</div>
            )}
          </header>

          {m.narrative && <p className="px-5 pt-4 text-gray-700">{m.narrative}</p>}

          <div className="p-5 space-y-3">
            {m.destinations.map((pick) => (
              <Link
                key={pick.id}
                href={`/${locale}/destination/${pick.id}/${monthSlug(m.monthIndex)}`}
                className="flex gap-4 rounded-lg border p-3 hover:border-emerald-400 transition"
              >
                <Image
                  src={destinationImage(pick.id)}
                  alt={pick.name}
                  width={120}
                  height={80}
                  className="rounded-md object-cover w-[120px] h-[80px]"
                />
                <div className="flex-1 min-w-0">
                  <div className="font-semibold">{pick.name}</div>
                  <div className="text-xs text-gray-600">{pick.state} · {pick.days} days</div>
                  {pick.rationale && (
                    <p className="text-sm text-gray-700 mt-2 line-clamp-2">{pick.rationale}</p>
                  )}
                </div>
              </Link>
            ))}
            {m.destinations.length === 0 && (
              <p className="text-sm text-gray-500 italic">No destinations chosen for this month.</p>
            )}
          </div>
        </section>
      ))}

      <GapYearBudgetRollup plan={plan} />

      <div className="rounded-xl border p-6 text-center bg-gray-50">
        <div className="font-semibold mb-2">Make one of your own.</div>
        <p className="text-sm text-gray-600 mb-4">
          Tell us when you're free. We'll match the right India for you, month by month.
        </p>
        <Link
          href={`/${locale}/gap-year`}
          className="inline-block px-5 py-2.5 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700"
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
      <div className="text-xs uppercase tracking-wider text-gray-500">{label}</div>
      <div className="font-semibold mt-0.5">{value}</div>
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
