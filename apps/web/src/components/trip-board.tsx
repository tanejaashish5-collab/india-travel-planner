"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { m as motion, AnimatePresence } from "framer-motion";

const MONTH_SHORT = ["","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

interface TripItem {
  destinationId: string;
  days: number;
  notes: string;
  order: number;
}

interface TripState {
  name: string;
  month: number;
  travelers: number;
  budget: string;
  items: TripItem[];
  createdAt: string;
}

const DEFAULT_TRIP: TripState = {
  name: "My North India Trip",
  month: new Date().getMonth() + 1,
  travelers: 2,
  budget: "midrange",
  items: [],
  createdAt: new Date().toISOString(),
};

export function TripBoard({ destinations }: { destinations: any[] }) {
  const locale = useLocale();
  const tt = useTranslations("trip");
  const tu = useTranslations("ui");
  const [trip, setTrip] = useState<TripState>(DEFAULT_TRIP);
  const [search, setSearch] = useState("");
  const [editingName, setEditingName] = useState(false);

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("tripBoard");
    if (saved) {
      try { setTrip(JSON.parse(saved)); } catch {}
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("tripBoard", JSON.stringify(trip));
  }, [trip]);

  function addDestination(destId: string) {
    if (trip.items.some((i) => i.destinationId === destId)) return;
    setTrip({
      ...trip,
      items: [...trip.items, { destinationId: destId, days: 2, notes: "", order: trip.items.length }],
    });
  }

  function removeItem(destId: string) {
    setTrip({ ...trip, items: trip.items.filter((i) => i.destinationId !== destId) });
  }

  function updateItem(destId: string, updates: Partial<TripItem>) {
    setTrip({
      ...trip,
      items: trip.items.map((i) => i.destinationId === destId ? { ...i, ...updates } : i),
    });
  }

  function moveItem(idx: number, dir: -1 | 1) {
    const items = [...trip.items];
    const newIdx = idx + dir;
    if (newIdx < 0 || newIdx >= items.length) return;
    [items[idx], items[newIdx]] = [items[newIdx], items[idx]];
    setTrip({ ...trip, items });
  }

  // Calculate trip stats
  const stats = useMemo(() => {
    const totalDays = trip.items.reduce((s, i) => s + i.days, 0);
    let totalBudget = 0;
    trip.items.forEach((item) => {
      const dest = destinations.find((d) => d.id === item.destinationId);
      const cost = dest?.daily_cost?.[trip.budget];
      if (cost?.total) totalBudget += cost.total * item.days * trip.travelers;
    });
    const avgScore = trip.items.length > 0
      ? trip.items.reduce((s, item) => {
          const dest = destinations.find((d) => d.id === item.destinationId);
          const ms = dest?.destination_months?.find((m: any) => m.month === trip.month);
          return s + (ms?.score ?? 0);
        }, 0) / trip.items.length
      : 0;

    return { totalDays, totalBudget, avgScore: avgScore.toFixed(1), stops: trip.items.length };
  }, [trip, destinations]);

  // Share trip
  function shareTrip() {
    const names = trip.items.map((i) => {
      const d = destinations.find((d) => d.id === i.destinationId);
      return d?.name || i.destinationId;
    });
    const text = `${trip.name}\n${MONTH_SHORT[trip.month]} · ${stats.totalDays} days · ${trip.travelers} travelers\n\n${names.map((n, i) => `${i + 1}. ${n} (${trip.items[i].days}d)`).join("\n")}\n\nEst. budget: ₹${stats.totalBudget.toLocaleString()} total\n\nPlanned on NakshIQ`;
    const waText = encodeURIComponent(text);
    window.open(`https://wa.me/?text=${waText}`, "_blank");
  }

  function clearTrip() {
    if (confirm(tt("clearTrip"))) {
      setTrip(DEFAULT_TRIP);
    }
  }

  const filteredDests = useMemo(() => {
    if (!search) return [];
    const q = search.toLowerCase();
    return destinations
      .filter((d) => d.name.toLowerCase().includes(q) || (Array.isArray(d.state) ? d.state[0]?.name : d.state?.name)?.toLowerCase().includes(q))
      .slice(0, 8);
  }, [destinations, search]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          {editingName ? (
            <input
              autoFocus
              value={trip.name}
              onChange={(e) => setTrip({ ...trip, name: e.target.value })}
              onBlur={() => setEditingName(false)}
              onKeyDown={(e) => e.key === "Enter" && setEditingName(false)}
              className="text-3xl font-bold bg-transparent border-b-2 border-primary outline-none"
            />
          ) : (
            <h1 className="text-3xl font-bold cursor-pointer hover:text-primary transition-colors" onClick={() => setEditingName(true)}>
              {trip.name} <span className="text-sm text-muted-foreground font-normal ml-2">{tt("clickToRename")}</span>
            </h1>
          )}
          <p className="mt-1 text-muted-foreground">
            {tt("buildTrip")}
          </p>
        </div>
        <div className="flex gap-2">
          {trip.items.length > 0 && (
            <>
              <button onClick={shareTrip} className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors">
                {tu("shareOnWhatsApp")}
              </button>
              <button onClick={clearTrip} className="rounded-full border border-border px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                {tu("clear")}
              </button>
            </>
          )}
        </div>
      </div>

      {/* Trip settings */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div>
          <label className="text-xs text-muted-foreground mb-1 block">{tt("month")}</label>
          <select
            value={trip.month}
            onChange={(e) => setTrip({ ...trip, month: Number(e.target.value) })}
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
          >
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i + 1} value={i + 1}>{MONTH_SHORT[i + 1]}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-xs text-muted-foreground mb-1 block">{tt("travelers")}</label>
          <input
            type="number"
            min={1}
            max={20}
            value={trip.travelers}
            onChange={(e) => setTrip({ ...trip, travelers: Number(e.target.value) })}
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="text-xs text-muted-foreground mb-1 block">{tt("budgetTier")}</label>
          <select
            value={trip.budget}
            onChange={(e) => setTrip({ ...trip, budget: e.target.value })}
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
          >
            <option value="budget">{tt("budget")}</option>
            <option value="midrange">{tt("midRange")}</option>
            <option value="luxury">{tt("luxury")}</option>
          </select>
        </div>
        <div className="flex items-end">
          <Link
            href={`/${locale}/plan?month=${trip.month}&destinations=${trip.items.map((i) => i.destinationId).join(",")}`}
            className="w-full rounded-lg bg-primary/10 border border-primary/30 px-3 py-2 text-sm font-medium text-primary text-center hover:bg-primary/20 transition-colors"
          >
            Generate AI Itinerary
          </Link>
        </div>
      </div>

      {/* Add destination search */}
      <div className="relative">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search destinations to add..."
          className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
        {filteredDests.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-1 rounded-xl border border-border bg-card shadow-xl z-30 max-h-64 overflow-y-auto">
            {filteredDests.map((d) => {
              const stateName = Array.isArray(d.state) ? d.state[0]?.name : d.state?.name;
              const ms = d.destination_months?.find((m: any) => m.month === trip.month);
              const already = trip.items.some((i) => i.destinationId === d.id);
              return (
                <button
                  key={d.id}
                  onClick={() => { addDestination(d.id); setSearch(""); }}
                  disabled={already}
                  className="w-full text-left px-4 py-3 hover:bg-muted/30 transition-colors flex items-center justify-between disabled:opacity-40"
                >
                  <div>
                    <span className="font-medium text-sm">{d.name}</span>
                    <span className="text-xs text-muted-foreground ml-2">{stateName}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {ms?.score && (
                      <span className={`text-xs font-mono font-bold ${ms.score >= 4 ? "text-emerald-400" : ms.score >= 3 ? "text-yellow-400" : "text-red-400"}`}>
                        {ms.score}/5
                      </span>
                    )}
                    <span className="text-xs">{already ? "Added" : "+"}</span>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Trip items */}
      {trip.items.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border p-12 text-center">
          <div className="text-4xl mb-3">🗺️</div>
          <h3 className="text-lg font-semibold">Your trip board is empty</h3>
          <p className="text-sm text-muted-foreground mt-1 max-w-md mx-auto">
            Search for destinations above, or add them from the Explore page using the ♥ Save button.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          <AnimatePresence>
            {trip.items.map((item, idx) => {
              const dest = destinations.find((d) => d.id === item.destinationId);
              if (!dest) return null;
              const stateName = Array.isArray(dest.state) ? dest.state[0]?.name : dest.state?.name;
              const ms = dest.destination_months?.find((m: any) => m.month === trip.month);
              const dayCost = dest.daily_cost?.[trip.budget]?.total ?? 0;

              return (
                <motion.div
                  key={item.destinationId}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="rounded-xl border border-border bg-card overflow-hidden"
                >
                  <div className="flex items-stretch">
                    {/* Image */}
                    <div className="relative w-24 sm:w-32 shrink-0 bg-muted/30">
                      <Image
                        src={`/images/destinations/${item.destinationId}.jpg`}
                        alt={dest.name}
                        fill
                        sizes="(max-width: 640px) 96px, 128px"
                        className="object-cover"
                        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono font-bold text-primary">#{idx + 1}</span>
                            <Link href={`/${locale}/destination/${item.destinationId}`} className="font-semibold hover:text-primary transition-colors">
                              {dest.name}
                            </Link>
                            {ms?.score && (
                              <span className={`text-xs font-mono font-bold ${ms.score >= 4 ? "text-emerald-400" : ms.score >= 3 ? "text-yellow-400" : "text-red-400"}`}>
                                {ms.score}/5 in {MONTH_SHORT[trip.month]}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {stateName} · {dest.difficulty} {dest.elevation_m ? `· ${dest.elevation_m}m` : ""}
                            {dest.vehicle_fit ? ` · ${dest.vehicle_fit}` : ""}
                          </p>
                        </div>

                        {/* Controls */}
                        <div className="flex items-center gap-1">
                          <button onClick={() => moveItem(idx, -1)} className="text-xs text-muted-foreground hover:text-foreground px-1 disabled:opacity-20" disabled={idx === 0} aria-label="Move up">▲</button>
                          <button onClick={() => moveItem(idx, 1)} className="text-xs text-muted-foreground hover:text-foreground px-1 disabled:opacity-20" disabled={idx === trip.items.length - 1} aria-label="Move down">▼</button>
                          <button onClick={() => removeItem(item.destinationId)} className="text-xs text-muted-foreground hover:text-red-400 px-1 ml-1" aria-label="Remove from trip">✕</button>
                        </div>
                      </div>

                      {/* Days + cost + notes */}
                      <div className="mt-2 flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <label className="text-xs text-muted-foreground">Days:</label>
                          <input
                            type="number"
                            min={1}
                            max={30}
                            value={item.days}
                            onChange={(e) => updateItem(item.destinationId, { days: Number(e.target.value) })}
                            className="w-14 rounded border border-border bg-background px-2 py-1 text-xs text-center"
                          />
                        </div>
                        {dayCost > 0 && (
                          <span className="text-xs font-mono text-muted-foreground">
                            ₹{(dayCost * item.days * trip.travelers).toLocaleString()} ({trip.budget})
                          </span>
                        )}
                        <input
                          type="text"
                          value={item.notes}
                          onChange={(e) => updateItem(item.destinationId, { notes: e.target.value })}
                          placeholder="Add notes..."
                          className="flex-1 rounded border border-border bg-background px-2 py-1 text-xs placeholder:text-muted-foreground/50"
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}

      {/* Trip summary */}
      {trip.items.length > 0 && (
        <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6">
          <h3 className="text-lg font-semibold mb-4">Trip Summary</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
            <div className="text-center">
              <div className="text-2xl font-mono font-bold text-primary">{stats.stops}</div>
              <div className="text-xs text-muted-foreground">Stops</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-mono font-bold text-primary">{stats.totalDays}</div>
              <div className="text-xs text-muted-foreground">Days</div>
            </div>
            <div className="text-center">
              <div className={`text-2xl font-mono font-bold ${parseFloat(stats.avgScore) >= 4 ? "text-emerald-400" : parseFloat(stats.avgScore) >= 3 ? "text-yellow-400" : "text-red-400"}`}>
                {stats.avgScore}/5
              </div>
              <div className="text-xs text-muted-foreground">Avg {MONTH_SHORT[trip.month]} Score</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-mono font-bold text-primary">₹{stats.totalBudget.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">Est. Total ({trip.travelers} people)</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button onClick={shareTrip} className="flex-1 rounded-full bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors">
              {tu("shareOnWhatsApp")}
            </button>
            <button
              onClick={async () => {
                const res = await fetch("/api/export-trip", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ items: trip.items, month: trip.month, travelers: trip.travelers, budget: trip.budget, tripName: trip.name }),
                });
                if (res.ok) {
                  const blob = await res.blob();
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement("a");
                  a.href = url;
                  a.download = `${trip.name.replace(/\s+/g, "-").toLowerCase()}.txt`;
                  a.click();
                  URL.revokeObjectURL(url);
                }
              }}
              className="flex-1 rounded-full border border-border px-4 py-3 text-sm font-semibold hover:bg-muted transition-colors"
            >
              Export Trip Pack
            </button>
            <Link
              href={`/${locale}/plan?month=${trip.month}&destinations=${trip.items.map((i) => i.destinationId).join(",")}`}
              className="flex-1 rounded-full border border-primary/30 bg-primary/5 px-4 py-3 text-sm font-semibold text-primary text-center hover:bg-primary/10 transition-colors"
            >
              AI Itinerary →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
