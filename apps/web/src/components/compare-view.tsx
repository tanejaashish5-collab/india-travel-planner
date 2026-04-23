"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLocale } from "next-intl";
import { useSearchParams } from "next/navigation";
import { m as motion } from "framer-motion";
import { useCompare } from "./compare-tray";

const MONTH_SHORT = ["","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

interface CompareRow {
  label: string;
  icon: string;
  getValue: (d: any) => { text: string; color?: string; badge?: boolean };
}

export function CompareView({ destinations }: { destinations: any[] }) {
  const locale = useLocale();
  const searchParams = useSearchParams();
  const { compareIds, removeFromCompare } = useCompare();
  const currentMonth = new Date().getMonth() + 1;

  // Use URL params or compare context
  const urlIds = searchParams.get("compare")?.split(",").filter(Boolean) ?? [];
  const ids = urlIds.length > 0 ? urlIds : compareIds;

  const compared = useMemo(() => {
    return ids.map((id) => destinations.find((d) => d.id === id)).filter(Boolean);
  }, [ids, destinations]);

  const rows: CompareRow[] = [
    {
      label: `${MONTH_SHORT[currentMonth]} Score`,
      icon: "📊",
      getValue: (d) => {
        const s = d.destination_months?.find((m: any) => m.month === currentMonth)?.score;
        return { text: s ? `${s}/5` : "N/A", color: s >= 4 ? "text-emerald-400" : s >= 3 ? "text-yellow-400" : s ? "text-red-400" : "" };
      },
    },
    {
      label: "Difficulty",
      icon: "⛰️",
      getValue: (d) => ({
        text: d.difficulty,
        color: d.difficulty === "easy" ? "text-emerald-400" : d.difficulty === "moderate" ? "text-yellow-400" : d.difficulty === "hard" ? "text-orange-400" : "text-red-400",
      }),
    },
    {
      label: "Elevation",
      icon: "📐",
      getValue: (d) => ({ text: d.elevation_m ? `${d.elevation_m.toLocaleString()}m` : "Plains" }),
    },
    {
      label: "Budget / Day",
      icon: "💰",
      getValue: (d) => {
        const c = d.daily_cost?.midrange?.total;
        return { text: c ? `₹${c.toLocaleString()}` : d.budget_tier || "N/A" };
      },
    },
    {
      label: "Kids Rating",
      icon: "👶",
      getValue: (d) => {
        const kf = Array.isArray(d.kids_friendly) ? d.kids_friendly[0] : d.kids_friendly;
        if (!kf) return { text: "N/A" };
        return {
          text: kf.suitable ? `${kf.rating}/5` : "Not suitable",
          color: kf.suitable ? "text-emerald-400" : "text-red-400",
        };
      },
    },
    {
      label: "Safety",
      icon: "🛡️",
      getValue: (d) => {
        const cc = Array.isArray(d.confidence_cards) ? d.confidence_cards[0] : d.confidence_cards;
        const s = cc?.safety_rating;
        return { text: s ? `${s}/5` : "N/A", color: s >= 4 ? "text-emerald-400" : s >= 3 ? "text-yellow-400" : s ? "text-red-400" : "" };
      },
    },
    {
      label: "Solo-female",
      icon: "♀",
      getValue: (d) => {
        const s = d.solo_female_score;
        if (typeof s !== "number") return { text: "N/A" };
        const color = s >= 4 ? "text-emerald-300" : s === 3 ? "text-amber-300" : s === 2 ? "text-orange-300" : "text-red-300";
        return { text: `${s}/5`, color };
      },
    },
    {
      label: "Network",
      icon: "📶",
      getValue: (d) => {
        const cc = Array.isArray(d.confidence_cards) ? d.confidence_cards[0] : d.confidence_cards;
        if (!cc?.network) return { text: "N/A" };
        const ops = [cc.network.jio && "Jio", cc.network.airtel && "Airtel", cc.network.bsnl && "BSNL"].filter(Boolean);
        return {
          text: ops.length > 0 ? ops.join(", ") : "No signal",
          color: ops.length >= 2 ? "text-emerald-400" : ops.length === 1 ? "text-yellow-400" : "text-red-400",
        };
      },
    },
    {
      label: "Vehicle",
      icon: "🚗",
      getValue: (d) => ({
        text: d.vehicle_fit || "N/A",
        color: d.vehicle_fit?.includes("hatchback") ? "text-emerald-400" : d.vehicle_fit?.includes("SUV") ? "text-yellow-400" : d.vehicle_fit?.includes("4WD") ? "text-red-400" : "",
      }),
    },
    {
      label: "Family",
      icon: "👨‍👩‍👧",
      getValue: (d) => ({
        text: d.family_stress || "N/A",
        color: d.family_stress?.includes("easy") ? "text-emerald-400" : d.family_stress?.includes("not recommended") ? "text-red-400" : "text-yellow-400",
      }),
    },
    {
      label: "Best Months",
      icon: "📅",
      getValue: (d) => ({ text: d.best_months?.map((m: number) => MONTH_SHORT[m]).join(", ") || "N/A" }),
    },
    {
      label: "State",
      icon: "📍",
      getValue: (d) => {
        const s = Array.isArray(d.state) ? d.state[0]?.name : d.state?.name;
        return { text: s || "N/A" };
      },
    },
  ];

  if (compared.length < 2) {
    return (
      <div className="py-20 text-center">
        <div className="text-5xl mb-4">⚖️</div>
        <h1 className="text-3xl font-semibold mb-2">Compare Destinations</h1>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
          Select 2-3 destinations to compare. Use the ⚖ Compare button on any destination card or detail page.
        </p>
        <Link
          href={`/${locale}/explore`}
          className="rounded-full bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          Browse Destinations
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-semibold mb-2">Destination Comparison</h1>
      <p className="text-muted-foreground mb-8">{compared.length} destinations · {MONTH_SHORT[currentMonth]} scores</p>

      {/* Hero cards */}
      <div className={`grid gap-4 mb-8 ${compared.length === 2 ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1 sm:grid-cols-3"}`}>
        {compared.map((d: any) => (
          <Link key={d.id} href={`/${locale}/destination/${d.id}`} className="group block">
            <div className="relative h-40 rounded-2xl overflow-hidden bg-muted/30">
              <Image
                src={`/images/destinations/${d.id}.jpg`}
                alt={d.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover ken-burns"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-lg font-bold text-white group-hover:text-primary transition-colors">{d.name}</h3>
                <p className="text-xs text-white/70 line-clamp-1">{d.tagline}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Comparison table — premium design */}
      <div className="rounded-2xl border border-border overflow-hidden overflow-x-auto">
        {rows.map((row, idx) => {
          const values = compared.map((d: any) => row.getValue(d));
          // Find best value for highlighting
          const scores = values.map((v) => {
            const num = parseFloat(v.text);
            return isNaN(num) ? 0 : num;
          });
          const maxScore = Math.max(...scores);

          return (
            <motion.div
              key={row.label}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: idx * 0.03 }}
              className={`flex items-stretch ${idx % 2 === 0 ? "bg-muted/10" : "bg-transparent"} ${idx < rows.length - 1 ? "border-b border-border/30" : ""}`}
            >
              {/* Label */}
              <div className="w-36 sm:w-44 shrink-0 flex items-center gap-2 px-5 py-4 border-r border-border/20">
                <span className="text-base">{row.icon}</span>
                <span className="text-sm font-medium text-muted-foreground">{row.label}</span>
              </div>

              {/* Values */}
              {values.map((val, i) => (
                <div
                  key={i}
                  className={`flex-1 flex items-center px-5 py-4 ${i < values.length - 1 ? "border-r border-border/10" : ""}`}
                >
                  <span className={`text-sm font-medium ${val.color || ""} ${scores[i] === maxScore && maxScore > 0 ? "font-bold" : ""}`}>
                    {val.text}
                    {scores[i] === maxScore && maxScore > 0 && scores.filter((s) => s === maxScore).length === 1 && (
                      <span className="ml-1 text-xs text-emerald-400">★</span>
                    )}
                  </span>
                </div>
              ))}
            </motion.div>
          );
        })}
      </div>

      {/* Verdict */}
      <div className="mt-8 rounded-2xl border border-primary/20 bg-primary/5 p-6 text-center">
        <h3 className="text-lg font-semibold mb-2">Quick Verdict</h3>
        <p className="text-sm text-muted-foreground max-w-lg mx-auto">
          {compared.map((d: any) => {
            const score = d.destination_months?.find((m: any) => m.month === currentMonth)?.score ?? 0;
            return `${d.name} scores ${score}/5 in ${MONTH_SHORT[currentMonth]}`;
          }).join(" · ")}
        </p>
        <div className="flex justify-center gap-3 mt-4">
          {compared.map((d: any) => (
            <Link
              key={d.id}
              href={`/${locale}/destination/${d.id}`}
              className="rounded-full border border-border px-4 py-2 text-sm font-medium hover:bg-muted transition-colors"
            >
              View {d.name} →
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
