"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";

const MONTH_NAMES = ["","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const MONTH_FULL = ["","January","February","March","April","May","June","July","August","September","October","November","December"];

export function RouteBuilder({ destinations }: { destinations: any[] }) {
  const locale = useLocale();
  const [selected, setSelected] = useState<string[]>([]);
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [search, setSearch] = useState("");

  const selectedDests = useMemo(() => {
    return selected.map((id) => destinations.find((d) => d.id === id)).filter(Boolean);
  }, [selected, destinations]);

  const filteredDests = useMemo(() => {
    if (!search) return destinations.slice(0, 20);
    const q = search.toLowerCase();
    return destinations.filter((d) =>
      d.name.toLowerCase().includes(q) ||
      (Array.isArray(d.state) ? d.state[0]?.name : d.state?.name)?.toLowerCase().includes(q)
    ).slice(0, 15);
  }, [destinations, search]);

  function addDest(id: string) {
    if (!selected.includes(id) && selected.length < 8) {
      setSelected([...selected, id]);
    }
  }

  function removeDest(id: string) {
    setSelected(selected.filter((s) => s !== id));
  }

  function moveUp(idx: number) {
    if (idx === 0) return;
    const updated = [...selected];
    [updated[idx - 1], updated[idx]] = [updated[idx], updated[idx - 1]];
    setSelected(updated);
  }

  function moveDown(idx: number) {
    if (idx === selected.length - 1) return;
    const updated = [...selected];
    [updated[idx], updated[idx + 1]] = [updated[idx + 1], updated[idx]];
    setSelected(updated);
  }

  // Calculate route stats
  const routeStats = useMemo(() => {
    if (selectedDests.length < 2) return null;
    const avgScore = selectedDests.reduce((sum, d) => {
      const ms = d.destination_months?.find((m: any) => m.month === month)?.score ?? 0;
      return sum + ms;
    }, 0) / selectedDests.length;

    const difficulties = selectedDests.map((d: any) => d.difficulty);
    const hardest = difficulties.includes("extreme") ? "extreme" :
      difficulties.includes("hard") ? "hard" :
      difficulties.includes("moderate") ? "moderate" : "easy";

    const maxElevation = Math.max(...selectedDests.map((d: any) => d.elevation_m ?? 0));

    return { avgScore: avgScore.toFixed(1), hardest, maxElevation, stops: selectedDests.length };
  }, [selectedDests, month]);

  // Generate share text
  function shareRoute() {
    const names = selectedDests.map((d: any) => d.name).join(" → ");
    const text = `My ${MONTH_FULL[month]} road trip: ${names}\n\nPlanned on India Travel Planner`;
    const waText = encodeURIComponent(text);
    window.open(`https://wa.me/?text=${waText}`, "_blank");
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Build Your Route</h1>
        <p className="mt-1 text-muted-foreground">
          Pick up to 8 destinations. We'll show you the scores and stats.
        </p>
      </div>

      {/* Month selector */}
      <div>
        <p className="text-sm font-medium mb-2">Travel month</p>
        <div className="grid grid-cols-6 sm:grid-cols-12 gap-1">
          {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
            <button
              key={m}
              onClick={() => setMonth(m)}
              className={`rounded-lg py-2 text-xs font-medium transition-all ${
                m === month ? "bg-primary text-primary-foreground" : "bg-muted/50 text-muted-foreground hover:bg-muted"
              }`}
            >
              {MONTH_NAMES[m]}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Left: Search + add */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Add destinations</h2>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search destinations..."
            className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 mb-3"
          />

          <div className="space-y-1.5 max-h-[400px] overflow-y-auto">
            {filteredDests.map((dest: any) => {
              const isSelected = selected.includes(dest.id);
              const stateName = Array.isArray(dest.state) ? dest.state[0]?.name : dest.state?.name;
              const monthScore = dest.destination_months?.find((m: any) => m.month === month)?.score;

              return (
                <button
                  key={dest.id}
                  onClick={() => isSelected ? removeDest(dest.id) : addDest(dest.id)}
                  disabled={!isSelected && selected.length >= 8}
                  className={`w-full text-left rounded-lg border p-3 transition-all ${
                    isSelected
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-border/80 hover:bg-muted/20 disabled:opacity-40"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-medium text-sm">{dest.name}</span>
                      <span className="text-xs text-muted-foreground ml-2">{stateName}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {monthScore !== undefined && (
                        <span className={`text-xs font-mono font-bold ${
                          monthScore >= 4 ? "text-emerald-400" : monthScore >= 3 ? "text-yellow-400" : "text-red-400"
                        }`}>
                          {monthScore}/5
                        </span>
                      )}
                      <span className="text-xs">{isSelected ? "✓" : "+"}</span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Route */}
        <div>
          <h2 className="text-lg font-semibold mb-3">
            Your route {selected.length > 0 && <span className="text-muted-foreground font-normal text-sm">({selected.length}/8)</span>}
          </h2>

          {selected.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border p-8 text-center text-muted-foreground">
              <div className="text-3xl mb-2">🗺️</div>
              <p className="text-sm">Search and pick destinations to build your route</p>
            </div>
          ) : (
            <div className="space-y-2">
              <AnimatePresence>
                {selectedDests.map((dest: any, idx: number) => {
                  const monthScore = dest.destination_months?.find((m: any) => m.month === month)?.score;
                  const stateName = Array.isArray(dest.state) ? dest.state[0]?.name : dest.state?.name;

                  return (
                    <motion.div
                      key={dest.id}
                      layout
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="rounded-xl border border-border bg-card p-3 flex items-center gap-3"
                    >
                      {/* Order controls */}
                      <div className="flex flex-col gap-0.5">
                        <button onClick={() => moveUp(idx)} className="text-muted-foreground hover:text-foreground text-xs disabled:opacity-20" disabled={idx === 0}>▲</button>
                        <span className="text-xs font-mono font-bold text-primary text-center">{idx + 1}</span>
                        <button onClick={() => moveDown(idx)} className="text-muted-foreground hover:text-foreground text-xs disabled:opacity-20" disabled={idx === selected.length - 1}>▼</button>
                      </div>

                      {/* Destination info */}
                      <div className="flex-1 min-w-0">
                        <Link href={`/${locale}/destination/${dest.id}`} className="font-medium text-sm hover:text-primary transition-colors">
                          {dest.name}
                        </Link>
                        <div className="text-xs text-muted-foreground">
                          {stateName} · {dest.difficulty}
                          {dest.elevation_m && <span className="font-mono"> · {dest.elevation_m}m</span>}
                        </div>
                      </div>

                      {/* Score */}
                      {monthScore !== undefined && (
                        <span className={`text-sm font-mono font-bold ${
                          monthScore >= 4 ? "text-emerald-400" : monthScore >= 3 ? "text-yellow-400" : "text-red-400"
                        }`}>
                          {monthScore}/5
                        </span>
                      )}

                      {/* Remove */}
                      <button onClick={() => removeDest(dest.id)} className="text-muted-foreground hover:text-red-400 transition-colors text-sm">✕</button>
                    </motion.div>
                  );
                })}
              </AnimatePresence>

            </div>
          )}

          {/* Route stats */}
          {routeStats && (
            <div className="mt-6 rounded-xl border border-border p-4">
              <h3 className="text-sm font-semibold mb-3">Route Overview — {MONTH_FULL[month]}</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg bg-muted/30 p-2.5 text-center">
                  <div className="text-lg font-mono font-bold text-primary">{routeStats.stops}</div>
                  <div className="text-xs text-muted-foreground">Stops</div>
                </div>
                <div className="rounded-lg bg-muted/30 p-2.5 text-center">
                  <div className={`text-lg font-mono font-bold ${
                    parseFloat(routeStats.avgScore) >= 4 ? "text-emerald-400" : parseFloat(routeStats.avgScore) >= 3 ? "text-yellow-400" : "text-red-400"
                  }`}>{routeStats.avgScore}/5</div>
                  <div className="text-xs text-muted-foreground">Avg Score</div>
                </div>
                <div className="rounded-lg bg-muted/30 p-2.5 text-center">
                  <div className="text-lg font-mono font-bold capitalize">{routeStats.hardest}</div>
                  <div className="text-xs text-muted-foreground">Hardest</div>
                </div>
                <div className="rounded-lg bg-muted/30 p-2.5 text-center">
                  <div className="text-lg font-mono font-bold">{routeStats.maxElevation.toLocaleString()}m</div>
                  <div className="text-xs text-muted-foreground">Max Altitude</div>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-4 flex gap-3">
                <button
                  onClick={shareRoute}
                  className="flex-1 rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  Share on WhatsApp
                </button>
                <Link
                  href={`/${locale}/plan?destinations=${selected.join(",")}&month=${month}`}
                  className="flex-1 rounded-full border border-border px-4 py-2.5 text-sm font-semibold text-center hover:bg-muted transition-colors"
                >
                  Generate AI Itinerary
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
