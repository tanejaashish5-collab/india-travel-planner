"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { SCORE_COLORS, DIFFICULTY_COLORS } from "@/lib/design-tokens";

export function SavedContent({ destinations }: { destinations: any[] }) {
  const locale = useLocale();
  const td = useTranslations("destination");
  const searchParams = useSearchParams();
  const urlCompare = searchParams.get("compare")?.split(",").filter(Boolean) ?? [];

  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [compareMode, setCompareMode] = useState(urlCompare.length > 0);
  const [compareIds, setCompareIds] = useState<string[]>(urlCompare);
  const currentMonth = new Date().getMonth() + 1;

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("savedDestinations") || "[]");
    setSavedIds(saved);
    // Auto-scroll to compare table if URL params present
    if (urlCompare.length >= 2) {
      setTimeout(() => {
        document.getElementById("compare-table")?.scrollIntoView({ behavior: "smooth" });
      }, 500);
    }
  }, []);

  const savedDestinations = useMemo(() => {
    return destinations.filter((d) => savedIds.includes(d.id));
  }, [destinations, savedIds]);

  function removeSaved(id: string) {
    const updated = savedIds.filter((s) => s !== id);
    localStorage.setItem("savedDestinations", JSON.stringify(updated));
    setSavedIds(updated);
  }

  function toggleCompare(id: string) {
    if (compareIds.includes(id)) {
      setCompareIds(compareIds.filter((c) => c !== id));
    } else if (compareIds.length < 3) {
      setCompareIds([...compareIds, id]);
    }
  }

  const comparedDestinations = useMemo(() => {
    return destinations.filter((d) => compareIds.includes(d.id));
  }, [destinations, compareIds]);

  const MONTH_NAMES = ["","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">{td("savedDestinations")}</h1>
        <p className="mt-1 text-muted-foreground">
          {savedDestinations.length} saved · {compareMode ? "Select up to 3 to compare" : td("yourTravelShortlist")}
        </p>
      </div>

      {/* Compare toggle */}
      <div className="mb-6 flex items-center gap-3">
        <button
          onClick={() => { setCompareMode(!compareMode); setCompareIds([]); }}
          className={`rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
            compareMode ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:text-foreground"
          }`}
        >
          {compareMode ? "Exit Compare" : td("compareDestinations")}
        </button>
        {compareMode && compareIds.length >= 2 && (
          <span className="text-sm text-primary font-medium">
            {compareIds.length} selected — see comparison below ↓
          </span>
        )}
      </div>

      {/* Saved grid */}
      {savedDestinations.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border p-12 text-center">
          <div className="text-4xl mb-3">♡</div>
          <h3 className="text-lg font-semibold">No saved destinations yet</h3>
          <p className="text-sm text-muted-foreground mt-1 max-w-md mx-auto">
            Browse destinations and click the ♡ Save button to build your shortlist.
          </p>
          <Link href={`/${locale}/explore`} className="inline-block mt-4 rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground">
            Explore destinations →
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {savedDestinations.map((dest: any) => {
            const kf = Array.isArray(dest.kids_friendly) ? dest.kids_friendly[0] : dest.kids_friendly;
            const stateName = Array.isArray(dest.state) ? dest.state[0]?.name : dest.state?.name;
            const monthScore = dest.destination_months?.find((m: any) => m.month === currentMonth)?.score;
            const isComparing = compareIds.includes(dest.id);

            return (
              <div key={dest.id} className={`relative rounded-xl border bg-card overflow-hidden transition-all ${
                isComparing ? "border-primary ring-2 ring-primary/30" : "border-border"
              }`}>
                {/* Hero image */}
                <div className="relative h-32 bg-muted/30 overflow-hidden">
                  <Image
                    src={`/images/destinations/${dest.id}.jpg`}
                    alt={dest.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />

                  {/* Compare checkbox */}
                  {compareMode && (
                    <button
                      onClick={() => toggleCompare(dest.id)}
                      className={`absolute top-2 right-2 h-7 w-7 rounded-md border-2 flex items-center justify-center backdrop-blur-sm transition-colors ${
                        isComparing ? "border-primary bg-primary text-primary-foreground" : "border-white/40 bg-black/40"
                      }`}
                    >
                      {isComparing && <span className="text-xs">✓</span>}
                    </button>
                  )}
                </div>

                <div className="p-4">
                  {/* Score */}
                  <div className="flex items-center justify-between mb-2">
                    {monthScore !== undefined && (
                      <span className={`rounded-full border px-2.5 py-1 text-xs font-medium ${SCORE_COLORS[monthScore] ?? SCORE_COLORS[0]}`}>
                        {monthScore}/5 {MONTH_NAMES[currentMonth]}
                      </span>
                    )}
                    {kf && <span className="text-xs">{kf.suitable ? `👶 ${kf.rating}/5` : "Adults"}</span>}
                  </div>

                  <Link href={`/${locale}/destination/${dest.id}`}>
                    <h3 className="font-semibold hover:text-primary transition-colors">{dest.name}</h3>
                  </Link>
                  <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{dest.tagline}</p>

                  <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                    {stateName && <span>{stateName}</span>}
                    <span>·</span>
                    <span className={DIFFICULTY_COLORS[dest.difficulty] ?? ""}>{dest.difficulty}</span>
                    {dest.elevation_m && (
                      <>
                        <span>·</span>
                        <span className="font-mono">{dest.elevation_m.toLocaleString()}m</span>
                      </>
                    )}
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() => removeSaved(dest.id)}
                    className="mt-3 text-xs text-red-400 hover:text-red-300 transition-colors"
                  >
                    Remove from saved
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Compare Table */}
      <AnimatePresence>
        {compareMode && comparedDestinations.length >= 2 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="mt-10"
          >
            <h2 id="compare-table" className="text-2xl font-bold mb-4">Side-by-Side Comparison</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 pr-4 text-muted-foreground font-medium w-36">Attribute</th>
                    {comparedDestinations.map((d: any) => (
                      <th key={d.id} className="text-left py-3 px-3 font-semibold">
                        <Link href={`/${locale}/destination/${d.id}`} className="hover:text-primary">
                          {d.name}
                        </Link>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { label: `Score (${MONTH_NAMES[currentMonth]})`, key: "score" },
                    { label: "Difficulty", key: "difficulty" },
                    { label: "Elevation", key: "elevation" },
                    { label: "Budget", key: "budget" },
                    { label: "Kids Rating", key: "kids" },
                    { label: "Safety", key: "safety" },
                    { label: "Network", key: "network" },
                    { label: "Best Months", key: "best_months" },
                    { label: "State", key: "state" },
                  ].map((row) => (
                    <tr key={row.key} className="border-b border-border/50">
                      <td className="py-3 pr-4 text-muted-foreground">{row.label}</td>
                      {comparedDestinations.map((d: any) => {
                        const kf = Array.isArray(d.kids_friendly) ? d.kids_friendly[0] : d.kids_friendly;
                        const stateName = Array.isArray(d.state) ? d.state[0]?.name : d.state?.name;
                        const monthScore = d.destination_months?.find((m: any) => m.month === currentMonth)?.score;

                        let value = "";
                        let className = "";

                        switch (row.key) {
                          case "score":
                            value = monthScore !== undefined ? `${monthScore}/5` : "N/A";
                            className = monthScore >= 4 ? "text-emerald-400 font-bold" : monthScore >= 3 ? "text-yellow-400" : "text-red-400";
                            break;
                          case "difficulty":
                            value = d.difficulty;
                            className = `capitalize ${DIFFICULTY_COLORS[d.difficulty] ?? ""}`;
                            break;
                          case "elevation":
                            value = d.elevation_m ? `${d.elevation_m.toLocaleString()}m` : "N/A";
                            break;
                          case "budget":
                            value = d.budget_tier ?? "mixed";
                            className = "capitalize";
                            break;
                          case "kids":
                            value = kf ? (kf.suitable ? `${kf.rating}/5 ✓` : "Not suitable") : "N/A";
                            className = kf?.suitable ? "text-emerald-400" : kf ? "text-red-400" : "";
                            break;
                          case "safety": {
                            const cc = Array.isArray(d.confidence_cards) ? d.confidence_cards?.[0] : d.confidence_cards;
                            value = cc?.safety_rating ? `${cc.safety_rating}/5` : "N/A";
                            className = cc?.safety_rating >= 4 ? "text-emerald-400 font-bold" : cc?.safety_rating >= 3 ? "text-yellow-400" : cc?.safety_rating ? "text-red-400" : "";
                            break;
                          }
                          case "network": {
                            const cc2 = Array.isArray(d.confidence_cards) ? d.confidence_cards?.[0] : d.confidence_cards;
                            if (cc2?.network) {
                              const ops = [cc2.network.jio && "Jio", cc2.network.airtel && "Airtel", cc2.network.bsnl && "BSNL"].filter(Boolean);
                              value = ops.length > 0 ? ops.join(", ") : "No signal";
                              className = ops.length >= 2 ? "text-emerald-400" : ops.length === 1 ? "text-yellow-400" : "text-red-400";
                            } else { value = "N/A"; }
                            break;
                          }
                          case "best_months":
                            value = d.best_months?.map((m: number) => MONTH_NAMES[m]).join(", ") ?? "N/A";
                            break;
                          case "state":
                            value = stateName ?? "N/A";
                            break;
                        }

                        return <td key={d.id} className={`py-3 px-3 ${className}`}>{value}</td>;
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
