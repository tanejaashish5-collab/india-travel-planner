"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { SectionLabel } from "@/components/ui/section-label";

type Block = { time: string; text: string };
type OneDay = { title?: string; blocks: Block[]; bad_weather_plan?: string };
type DayPlan = { day: number; headline?: string; blocks: Block[] };

type MicroItineraries = {
  one_day?: OneDay | null;
  three_days?: DayPlan[] | null;
  five_days?: DayPlan[] | null;
};

type Duration = "one" | "three" | "five";

const TIME_ICON: Record<string, string> = {
  morning: "☀️",
  midday: "🌞",
  noon: "🌞",
  afternoon: "🌤",
  evening: "🌇",
  night: "🌙",
  predawn: "🌌",
};

function TimeBlock({ block }: { block: Block }) {
  const key = block.time.toLowerCase().split(/\s+/)[0];
  return (
    <div className="flex gap-3 py-2">
      <SectionLabel as="div" className="w-28 shrink-0 pt-1">
        <span className="mr-1.5" aria-hidden>{TIME_ICON[key] ?? "•"}</span>
        {block.time}
      </SectionLabel>
      <p className="flex-1 text-sm leading-relaxed text-foreground/90">{block.text}</p>
    </div>
  );
}

function DayCard({ day }: { day: DayPlan }) {
  return (
    <div className="rounded-xl border border-border bg-background/40 p-4">
      <div className="flex items-baseline gap-2 mb-2">
        <SectionLabel as="span">Day {day.day}</SectionLabel>
        {day.headline && <span className="text-sm font-semibold">{day.headline}</span>}
      </div>
      <div className="divide-y divide-border/40">
        {day.blocks.map((b, i) => (
          <TimeBlock key={i} block={b} />
        ))}
      </div>
    </div>
  );
}

export function MicroItinerarySection({ data }: { data: MicroItineraries | null | undefined }) {
  const available: Duration[] = [];
  if (data?.one_day) available.push("one");
  if (data?.three_days?.length) available.push("three");
  if (data?.five_days?.length) available.push("five");

  const [active, setActive] = useState<Duration>(available[0] ?? "one");

  if (!data || available.length === 0) return null;

  const LABEL: Record<Duration, string> = { one: "1 day", three: "3 days", five: "5 days" };

  return (
    <section id="section-itinerary" className="scroll-mt-24">
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <h2 className="text-xl font-semibold">On the Ground</h2>
        <span className="text-sm text-muted-foreground">How to spend your time here, block by block.</span>
      </div>

      {/* Duration tabs */}
      <div className="inline-flex items-center gap-0.5 rounded-full border border-border bg-background/60 p-0.5 mb-4">
        {available.map((d) => {
          const isActive = d === active;
          return (
            <button
              key={d}
              type="button"
              onClick={() => setActive(d)}
              className={cn(
                "rounded-full px-4 py-1.5 text-xs font-medium transition-all",
                isActive ? "bg-foreground text-background shadow-sm" : "text-muted-foreground hover:text-foreground",
              )}
            >
              If you have {LABEL[d]}
            </button>
          );
        })}
      </div>

      {/* 1-day */}
      {active === "one" && data.one_day && (
        <div className="rounded-xl border border-border bg-background/40 p-5">
          {data.one_day.title && <h3 className="text-base font-semibold mb-3">{data.one_day.title}</h3>}
          <div className="divide-y divide-border/40">
            {data.one_day.blocks.map((b, i) => (
              <TimeBlock key={i} block={b} />
            ))}
          </div>
          {data.one_day.bad_weather_plan && (
            <div className="mt-4 rounded-lg border border-yellow-500/25 bg-yellow-500/5 p-3">
              <SectionLabel tone="warning" className="mb-1">If weather turns</SectionLabel>
              <p className="text-sm leading-relaxed text-yellow-200/85">{data.one_day.bad_weather_plan}</p>
            </div>
          )}
        </div>
      )}

      {/* 3-day */}
      {active === "three" && data.three_days && (
        <div className="grid gap-3">
          {data.three_days.map((d) => <DayCard key={d.day} day={d} />)}
        </div>
      )}

      {/* 5-day */}
      {active === "five" && data.five_days && (
        <div className="grid gap-3">
          {data.five_days.map((d) => <DayCard key={d.day} day={d} />)}
        </div>
      )}
    </section>
  );
}
