"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { m as motion, AnimatePresence } from "framer-motion";

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

const SCORE_BG: Record<number, string> = {
  5: "bg-emerald-500/10 border-emerald-500/30",
  4: "bg-blue-500/10 border-blue-500/30",
  3: "bg-yellow-500/10 border-yellow-500/30",
  2: "bg-orange-500/10 border-orange-500/30",
  1: "bg-red-500/10 border-red-500/30",
  0: "bg-zinc-500/10 border-zinc-500/30",
};

const SCORE_BAR_HEIGHTS: Record<number, string> = {
  5: "h-20",
  4: "h-16",
  3: "h-12",
  2: "h-8",
  1: "h-5",
  0: "h-2",
};

const SCORE_LABELS: Record<number, string> = {
  5: "Peak — go now",
  4: "Excellent",
  3: "Doable",
  2: "Marginal",
  1: "Avoid unless specific reason",
  0: "Closed / inaccessible",
};

export function MonthlyChart({
  scores,
  className = "",
}: {
  scores: MonthlyScore[];
  className?: string;
}) {
  const tm = useTranslations("months");
  const currentMonth = new Date().getMonth() + 1;
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);

  const sorted = [...scores].sort((a, b) => a.m - b.m);
  const selected = sorted.find((s) => s.m === selectedMonth);

  return (
    <div className={className}>
      {/* Instruction */}
      <p className="text-xs text-muted-foreground mb-3">
        Click any month to see details
      </p>

      {/* Bar chart — INTERACTIVE */}
      <div className="flex items-end gap-1.5">
        {sorted.map((ms) => (
          <button
            key={ms.m}
            onClick={() => setSelectedMonth(ms.m)}
            className="flex flex-1 flex-col items-center gap-1 group cursor-pointer"
            aria-label={`${tm(String(ms.m))}: ${ms.score}/5`}
          >
            {/* Score number */}
            <span
              className={`text-xs font-mono font-bold transition-colors ${
                ms.m === selectedMonth
                  ? "text-foreground"
                  : "text-muted-foreground group-hover:text-foreground"
              }`}
            >
              {ms.score}
            </span>
            {/* Bar */}
            <motion.div
              className={`w-full rounded-t-sm transition-all ${SCORE_COLORS[ms.score]} ${SCORE_BAR_HEIGHTS[ms.score]} ${
                ms.m === selectedMonth
                  ? "ring-2 ring-primary ring-offset-2 ring-offset-background scale-x-110"
                  : ms.m === currentMonth
                    ? "ring-1 ring-primary/50"
                    : "opacity-70 group-hover:opacity-100"
              }`}
              whileHover={{ scaleY: 1.05 }}
              whileTap={{ scaleY: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            />
            {/* Month label */}
            <span
              className={`text-xs transition-colors ${
                ms.m === selectedMonth
                  ? "font-bold text-primary"
                  : ms.m === currentMonth
                    ? "font-medium text-primary/70"
                    : "text-muted-foreground group-hover:text-foreground"
              }`}
            >
              {tm(String(ms.m)).slice(0, 3)}
            </span>
          </button>
        ))}
      </div>

      {/* Selected month detail — ANIMATED */}
      <AnimatePresence mode="wait">
        {selected && (
          <motion.div
            key={selectedMonth}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className={`mt-4 rounded-xl border p-4 ${SCORE_BG[selected.score]}`}
          >
            {/* Header row */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span
                  className={`inline-flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${SCORE_COLORS[selected.score]}`}
                >
                  {selected.score}
                </span>
                <div>
                  <span className="font-semibold">
                    {tm(String(selectedMonth))}
                  </span>
                  <span className="text-sm text-muted-foreground ml-2">
                    — {SCORE_LABELS[selected.score]}
                  </span>
                </div>
              </div>
              {selectedMonth === currentMonth && (
                <span className="text-xs uppercase tracking-wide text-primary font-medium bg-primary/10 px-2 py-0.5 rounded-full">
                  This month
                </span>
              )}
            </div>

            {/* Note — always show explanation */}
            <p className="mt-3 text-sm leading-relaxed">
              {selected.note}
            </p>

            {/* Why go / Why not */}
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {selected.score >= 3 && (
                <div className="rounded-lg bg-emerald-500/10 p-2.5 text-xs">
                  <span className="font-medium text-emerald-400">Why go: </span>
                  <span className="text-emerald-300/80">
                    {selected.why_go || selected.note}
                  </span>
                </div>
              )}
              {selected.score <= 3 && (
                <div className="rounded-lg bg-red-500/10 p-2.5 text-xs">
                  <span className="font-medium text-red-400">Why not: </span>
                  <span className="text-red-300/80">
                    {selected.why_not || selected.note}
                  </span>
                </div>
              )}
            </div>

            {/* Score methodology */}
            <div className="mt-3 rounded-lg bg-muted/30 p-2.5 text-xs text-muted-foreground/70">
              <span className="font-medium">How we score:</span> Based on weather, road access, crowd levels,
              seasonal activities, and safety conditions. 5 = peak window, go now. 1 = avoid unless you have a specific reason.
              0 = closed or inaccessible.
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
