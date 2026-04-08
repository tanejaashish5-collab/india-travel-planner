"use client";

import { useState } from "react";
import Link from "next/link";
import { useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";

interface ItineraryDay {
  day: number;
  title: string;
  destination: string;
  destinationName: string;
  activities: string[];
  stayAt: string;
  travelTime: string;
  tips: string;
  meals: string;
}

interface Itinerary {
  title: string;
  summary: string;
  totalDistance: string;
  bestFor: string[];
  days: ItineraryDay[];
  packingTips: string[];
  warnings: string[];
  estimatedBudget: {
    budget: string;
    midRange: string;
    luxury: string;
  };
}

export function AIItinerary({
  month,
  days,
  travelerType,
  budget,
  origin,
  recommendedIds,
}: {
  month: number;
  days: number;
  travelerType: string;
  budget: string;
  origin: string;
  recommendedIds: string[];
}) {
  const locale = useLocale();
  const [itinerary, setItinerary] = useState<Itinerary | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function generate() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/itinerary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          month,
          days,
          travelerType,
          budget,
          origin,
          destinationIds: recommendedIds.slice(0, 10),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to generate itinerary");
        return;
      }
      setItinerary(data.itinerary);
    } catch (err: any) {
      setError(err.message || "Network error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-8">
      {/* Generate button */}
      {!itinerary && (
        <motion.button
          onClick={generate}
          disabled={loading}
          whileHover={{ scale: loading ? 1 : 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full rounded-2xl border-2 border-dashed border-primary/30 bg-primary/5 p-6 text-center transition-all hover:border-primary/50 hover:bg-primary/10 disabled:opacity-50"
        >
          {loading ? (
            <div className="flex items-center justify-center gap-3">
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
              <span className="text-sm font-medium">Generating your personalized itinerary...</span>
            </div>
          ) : (
            <>
              <div className="text-2xl mb-2">🤖</div>
              <h3 className="text-lg font-semibold">Generate AI Itinerary</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Get a personalized day-by-day plan based on your preferences
              </p>
            </>
          )}
        </motion.button>
      )}

      {/* Error */}
      {error && (
        <div className="mt-4 rounded-xl border border-red-500/30 bg-red-500/5 p-4 text-sm text-red-400">
          {error}
        </div>
      )}

      {/* Itinerary result */}
      <AnimatePresence>
        {itinerary && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Header */}
            <div className="rounded-2xl border border-primary/30 bg-primary/5 p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-bold">{itinerary.title}</h2>
                  <p className="mt-1 text-muted-foreground">{itinerary.summary}</p>
                </div>
                <button
                  onClick={() => setItinerary(null)}
                  className="shrink-0 rounded-lg border border-border px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  Regenerate
                </button>
              </div>
              <div className="mt-4 flex flex-wrap gap-3 text-xs">
                <span className="rounded-full bg-muted px-3 py-1">📏 {itinerary.totalDistance}</span>
                {itinerary.bestFor?.map((b) => (
                  <span key={b} className="rounded-full bg-primary/10 text-primary px-3 py-1">{b}</span>
                ))}
              </div>
            </div>

            {/* Day-by-day */}
            <div className="space-y-4">
              {itinerary.days?.map((day, idx) => (
                <motion.div
                  key={day.day}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.08 }}
                  className="rounded-xl border border-border bg-card overflow-hidden"
                >
                  {/* Day header */}
                  <div className="flex items-center gap-3 border-b border-border p-4 bg-muted/20">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-mono font-bold text-primary">
                      D{day.day}
                    </span>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm">{day.title}</h3>
                      {day.travelTime && (
                        <p className="text-xs text-muted-foreground">{day.travelTime}</p>
                      )}
                    </div>
                    {day.destination && (
                      <Link
                        href={`/${locale}/destination/${day.destination}`}
                        className="shrink-0 rounded-lg bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary hover:bg-primary/20 transition-colors"
                      >
                        {day.destinationName} →
                      </Link>
                    )}
                  </div>

                  {/* Day content */}
                  <div className="p-4 space-y-3">
                    {/* Activities */}
                    {day.activities?.length > 0 && (
                      <div>
                        <h4 className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-1.5">Activities</h4>
                        <ul className="space-y-1">
                          {day.activities.map((a, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm">
                              <span className="mt-1 text-primary text-xs">●</span>
                              <span>{a}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Stay + Meals + Tips */}
                    <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                      {day.stayAt && (
                        <span>🏨 {day.stayAt}</span>
                      )}
                      {day.meals && (
                        <span>🍽️ {day.meals}</span>
                      )}
                    </div>
                    {day.tips && (
                      <p className="text-xs text-primary/70 italic">💡 {day.tips}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Budget estimate */}
            {itinerary.estimatedBudget && (
              <div className="rounded-xl border border-border p-4">
                <h3 className="font-semibold text-sm mb-3">Estimated Budget (per person)</h3>
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="rounded-lg bg-emerald-500/10 p-3">
                    <div className="text-xs text-muted-foreground mb-1">Budget</div>
                    <div className="text-sm font-mono font-bold text-emerald-400">{itinerary.estimatedBudget.budget}</div>
                  </div>
                  <div className="rounded-lg bg-blue-500/10 p-3">
                    <div className="text-xs text-muted-foreground mb-1">Mid-range</div>
                    <div className="text-sm font-mono font-bold text-blue-400">{itinerary.estimatedBudget.midRange}</div>
                  </div>
                  <div className="rounded-lg bg-purple-500/10 p-3">
                    <div className="text-xs text-muted-foreground mb-1">Luxury</div>
                    <div className="text-sm font-mono font-bold text-purple-400">{itinerary.estimatedBudget.luxury}</div>
                  </div>
                </div>
              </div>
            )}

            {/* Warnings + Packing */}
            <div className="grid gap-4 sm:grid-cols-2">
              {itinerary.warnings?.length > 0 && (
                <div className="rounded-xl border border-orange-500/30 bg-orange-500/5 p-4">
                  <h3 className="font-semibold text-sm text-orange-400 mb-2">Warnings</h3>
                  <ul className="space-y-1">
                    {itinerary.warnings.map((w, i) => (
                      <li key={i} className="text-xs text-orange-300/80 flex items-start gap-1.5">
                        <span className="mt-0.5">⚠</span> {w}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {itinerary.packingTips?.length > 0 && (
                <div className="rounded-xl border border-border p-4">
                  <h3 className="font-semibold text-sm mb-2">Packing Tips</h3>
                  <ul className="space-y-1">
                    {itinerary.packingTips.map((t, i) => (
                      <li key={i} className="text-xs text-muted-foreground flex items-start gap-1.5">
                        <span className="mt-0.5">🎒</span> {t}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
