"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { SCORE_COLORS, DIFFICULTY_COLORS, SCORE_LABELS } from "@/lib/design-tokens";

interface PlanContentProps {
  destinations: Array<{
    id: string;
    name: string;
    tagline: string;
    difficulty: string;
    elevation_m: number | null;
    budget_tier: string;
    tags: string[];
    best_months: number[];
    state: { name: string } | Array<{ name: string }> | null;
    state_id: string;
    kids_friendly: { suitable: boolean; rating: number } | Array<{ suitable: boolean; rating: number }> | null;
    destination_months: Array<{ month: number; score: number; note: string }> | null;
  }>;
}

type TravelerType = "solo" | "couple" | "family" | "biker" | "backpacker" | "spiritual";

const TRAVELER_TYPES: Array<{ id: TravelerType; label: string; icon: string }> = [
  { id: "solo", label: "Solo", icon: "🎒" },
  { id: "couple", label: "Couple", icon: "💑" },
  { id: "family", label: "Family + Kids", icon: "👨‍👩‍👧" },
  { id: "biker", label: "Biker", icon: "🏍️" },
  { id: "backpacker", label: "Backpacker", icon: "🏕️" },
  { id: "spiritual", label: "Spiritual", icon: "🕉️" },
];

const BUDGET_OPTIONS = [
  { id: "budget", label: "Budget", desc: "₹500-2000/day" },
  { id: "mid-range", label: "Mid-range", desc: "₹2000-5000/day" },
  { id: "splurge", label: "Luxury", desc: "₹5000+/day" },
];

export function PlanContent({ destinations }: PlanContentProps) {
  const locale = useLocale();
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [days, setDays] = useState(7);
  const [traveler, setTraveler] = useState<TravelerType>("couple");
  const [budget, setBudget] = useState("mid-range");
  const [showResults, setShowResults] = useState(false);

  // Filter and rank destinations based on inputs
  const recommendations = useMemo(() => {
    return destinations
      .map((dest) => {
        const kf = Array.isArray(dest.kids_friendly) ? dest.kids_friendly[0] : dest.kids_friendly;
        const monthData = dest.destination_months?.find((m) => m.month === month);
        const score = monthData?.score ?? 0;
        const stateName = Array.isArray(dest.state) ? dest.state[0]?.name : dest.state?.name;

        // Scoring algorithm
        let fitScore = score * 20; // Base: month score (0-100)

        // Traveler type fit
        if (traveler === "family" && kf?.suitable) fitScore += kf.rating * 5;
        if (traveler === "family" && !kf?.suitable) fitScore -= 30;
        if (traveler === "biker" && dest.tags?.includes("biker")) fitScore += 20;
        if (traveler === "spiritual" && dest.tags?.includes("spiritual")) fitScore += 20;
        if (traveler === "backpacker" && dest.budget_tier === "budget") fitScore += 15;
        if (traveler === "backpacker" && dest.tags?.includes("offbeat")) fitScore += 10;

        // Budget fit
        if (budget === dest.budget_tier) fitScore += 10;
        if (budget === "budget" && dest.budget_tier === "splurge") fitScore -= 10;

        // Duration fit
        if (days <= 4 && dest.difficulty === "hard") fitScore -= 15;
        if (days >= 10 && dest.difficulty === "easy") fitScore -= 5;

        // Why it matches
        const reasons: string[] = [];
        if (score >= 4) reasons.push(`Scores ${score}/5 in ${getMonthName(month)}`);
        if (traveler === "family" && kf?.suitable) reasons.push(`Kids rating: ${kf.rating}/5`);
        if (traveler === "biker" && dest.tags?.includes("biker")) reasons.push("Biker-friendly route");
        if (traveler === "spiritual" && dest.tags?.includes("spiritual")) reasons.push("Spiritual destination");
        if (budget === dest.budget_tier) reasons.push(`Matches your ${budget} budget`);

        return {
          ...dest,
          fitScore,
          monthScore: score,
          monthNote: monthData?.note ?? "",
          kidsRating: kf?.rating ?? null,
          kidsSuitable: kf?.suitable ?? null,
          stateName: stateName ?? "",
          reasons,
        };
      })
      .filter((d) => d.fitScore > 30) // Only show reasonable matches
      .sort((a, b) => b.fitScore - a.fitScore)
      .slice(0, 12);
  }, [destinations, month, days, traveler, budget]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Plan Your Trip</h1>
        <p className="mt-1 text-muted-foreground">
          Tell us what you want — we'll find the best matches from 66 destinations
        </p>
      </div>

      {/* Input Form */}
      <div className="rounded-2xl border border-border bg-card p-6 space-y-6">
        {/* Month */}
        <div>
          <label className="text-sm font-medium mb-2 block">When are you traveling?</label>
          <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-12 gap-1.5">
            {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
              <button
                key={m}
                onClick={() => { setMonth(m); setShowResults(true); }}
                className={`rounded-lg py-2 text-xs font-medium transition-all ${
                  m === month
                    ? "bg-primary text-primary-foreground ring-2 ring-primary/50"
                    : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                {getMonthName(m).slice(0, 3)}
              </button>
            ))}
          </div>
        </div>

        {/* Days */}
        <div>
          <label className="text-sm font-medium mb-2 block">
            How many days? <span className="font-mono text-primary">{days}d</span>
          </label>
          <input
            type="range"
            min={3}
            max={30}
            value={days}
            onChange={(e) => { setDays(Number(e.target.value)); setShowResults(true); }}
            className="w-full accent-primary"
          />
          <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
            <span>3 days</span>
            <span>7 days</span>
            <span>14 days</span>
            <span>30 days</span>
          </div>
        </div>

        {/* Traveler Type */}
        <div>
          <label className="text-sm font-medium mb-2 block">Who's going?</label>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {TRAVELER_TYPES.map((t) => (
              <button
                key={t.id}
                onClick={() => { setTraveler(t.id); setShowResults(true); }}
                className={`rounded-xl border p-3 text-center transition-all ${
                  traveler === t.id
                    ? "border-primary bg-primary/10 text-foreground"
                    : "border-border text-muted-foreground hover:border-muted-foreground hover:text-foreground"
                }`}
              >
                <div className="text-xl">{t.icon}</div>
                <div className="text-[10px] font-medium mt-1">{t.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Budget */}
        <div>
          <label className="text-sm font-medium mb-2 block">Budget</label>
          <div className="grid grid-cols-3 gap-2">
            {BUDGET_OPTIONS.map((b) => (
              <button
                key={b.id}
                onClick={() => { setBudget(b.id); setShowResults(true); }}
                className={`rounded-xl border p-3 text-center transition-all ${
                  budget === b.id
                    ? "border-primary bg-primary/10"
                    : "border-border hover:border-muted-foreground"
                }`}
              >
                <div className="text-sm font-medium">{b.label}</div>
                <div className="text-[10px] text-muted-foreground">{b.desc}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results */}
      <AnimatePresence>
        {showResults && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">
                {recommendations.length} destinations match
              </h2>
              <span className="text-sm text-muted-foreground">
                {getMonthName(month)} · {days}d · {TRAVELER_TYPES.find((t) => t.id === traveler)?.label} · {budget}
              </span>
            </div>

            {recommendations.length === 0 ? (
              <div className="rounded-xl border border-border p-8 text-center">
                <div className="text-4xl mb-3">🤔</div>
                <p className="text-muted-foreground">
                  No strong matches for these constraints. Try a different month or adjust your preferences.
                </p>
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {recommendations.map((dest, idx) => (
                  <motion.div
                    key={dest.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05, duration: 0.3 }}
                  >
                    <Link
                      href={`/${locale}/destination/${dest.id}`}
                      className="group block rounded-xl border border-border bg-card p-5 h-full transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
                    >
                      {/* Rank + Score */}
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-mono font-bold text-primary">
                          #{idx + 1}
                        </span>
                        <span
                          className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${SCORE_COLORS[dest.monthScore] ?? SCORE_COLORS[0]}`}
                        >
                          {dest.monthScore}/5 in {getMonthName(month).slice(0, 3)}
                        </span>
                      </div>

                      {/* Name */}
                      <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                        {dest.name}
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                        {dest.tagline}
                      </p>

                      {/* Why it matches */}
                      {dest.reasons.length > 0 && (
                        <div className="mt-3 space-y-1">
                          {dest.reasons.map((r, i) => (
                            <div key={i} className="flex items-start gap-1.5 text-xs text-emerald-400">
                              <span className="mt-0.5">✓</span>
                              <span>{r}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Meta */}
                      <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{dest.stateName}</span>
                        <span>·</span>
                        <span className={DIFFICULTY_COLORS[dest.difficulty] ?? ""}>
                          {dest.difficulty}
                        </span>
                        {dest.kidsSuitable !== null && (
                          <>
                            <span>·</span>
                            <span>{dest.kidsSuitable ? `👶 ${dest.kidsRating}/5` : "Adults"}</span>
                          </>
                        )}
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function getMonthName(m: number): string {
  const names = ["", "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
  return names[m] ?? "";
}
