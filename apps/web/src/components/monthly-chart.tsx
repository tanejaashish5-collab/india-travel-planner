"use client";

import { useTranslations } from "next-intl";

interface MonthlyScore {
  m: number;
  score: number;
  note: string;
  why_go?: string | null;
  why_not?: string | null;
}

const SCORE_COLORS: Record<number, string> = {
  5: "bg-emerald-500 text-white",
  4: "bg-blue-500 text-white",
  3: "bg-yellow-500 text-black",
  2: "bg-orange-500 text-white",
  1: "bg-red-500 text-white",
  0: "bg-zinc-700 text-zinc-400",
};

const SCORE_BAR_HEIGHTS: Record<number, string> = {
  5: "h-20",
  4: "h-16",
  3: "h-12",
  2: "h-8",
  1: "h-5",
  0: "h-2",
};

export function MonthlyChart({
  scores,
  className = "",
}: {
  scores: MonthlyScore[];
  className?: string;
}) {
  const tm = useTranslations("months");
  const ts = useTranslations("score");
  const currentMonth = new Date().getMonth() + 1;

  // Sort by month
  const sorted = [...scores].sort((a, b) => a.m - b.m);

  return (
    <div className={className}>
      {/* Bar chart */}
      <div className="flex items-end gap-1.5">
        {sorted.map((ms) => (
          <div
            key={ms.m}
            className="flex flex-1 flex-col items-center gap-1"
          >
            {/* Score number */}
            <span className="text-xs font-mono font-bold text-muted-foreground">
              {ms.score}
            </span>
            {/* Bar */}
            <div
              className={`w-full rounded-t-sm transition-all ${SCORE_COLORS[ms.score]} ${SCORE_BAR_HEIGHTS[ms.score]} ${ms.m === currentMonth ? "ring-2 ring-primary ring-offset-2 ring-offset-background" : ""}`}
              title={ms.note}
            />
            {/* Month label */}
            <span
              className={`text-[10px] ${ms.m === currentMonth ? "font-bold text-primary" : "text-muted-foreground"}`}
            >
              {tm(String(ms.m)).slice(0, 1)}
            </span>
          </div>
        ))}
      </div>

      {/* Current month detail */}
      {sorted.find((s) => s.m === currentMonth) && (
        <div className="mt-4 rounded-lg bg-muted/50 p-3">
          <div className="flex items-center gap-2 text-sm">
            <span
              className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${SCORE_COLORS[sorted.find((s) => s.m === currentMonth)!.score]}`}
            >
              {sorted.find((s) => s.m === currentMonth)!.score}
            </span>
            <span className="font-medium">{tm(String(currentMonth))}</span>
            <span className="text-muted-foreground">—</span>
            <span className="text-muted-foreground">
              {ts(String(sorted.find((s) => s.m === currentMonth)!.score))}
            </span>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            {sorted.find((s) => s.m === currentMonth)!.note}
          </p>
        </div>
      )}
    </div>
  );
}
