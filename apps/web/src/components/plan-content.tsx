"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLocale } from "next-intl";
import { useSearchParams } from "next/navigation";
import { m as motion, AnimatePresence } from "framer-motion";
import { SCORE_COLORS, DIFFICULTY_COLORS, SCORE_LABELS } from "@/lib/design-tokens";
import { AIItinerary } from "./ai-itinerary";

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
  states?: Array<{ id: string; name: string; region: string | null }>;
}

// Normalise the inconsistent region values in the states table ("South" / "south" / "South India" → one label).
function normalizeRegion(raw: string | null | undefined): string {
  if (!raw) return "Other";
  const s = raw.toLowerCase().trim();
  if (s.includes("northeast")) return "Northeast India";
  if (s.includes("island")) return "Islands";
  if (s.includes("north")) return "North India";
  if (s.includes("south")) return "South India";
  if (s.includes("east")) return "East India";
  if (s.includes("west")) return "West India";
  if (s.includes("central")) return "Central India";
  return "Other";
}

const REGION_ORDER = ["North India", "South India", "East India", "West India", "Northeast India", "Central India", "Islands", "Other"];

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

export function PlanContent({ destinations, states = [] }: PlanContentProps) {
  // Group states by normalised region for the Region focus select.
  const statesByRegion = useMemo(() => {
    const byReg = new Map<string, Array<{ id: string; name: string }>>();
    for (const s of states) {
      const reg = normalizeRegion(s.region);
      if (!byReg.has(reg)) byReg.set(reg, []);
      byReg.get(reg)!.push({ id: s.id, name: s.name });
    }
    for (const arr of byReg.values()) arr.sort((a, b) => a.name.localeCompare(b.name));
    return REGION_ORDER
      .filter((r) => byReg.has(r))
      .map((r) => ({ region: r, states: byReg.get(r)! }));
  }, [states]);

  const stateCount = states.length;
  const destinationCount = destinations.length;
  const locale = useLocale();
  const searchParams = useSearchParams();
  const urlMonth = Number(searchParams.get("month")) || new Date().getMonth() + 1;
  const urlDests = searchParams.get("destinations")?.split(",").filter(Boolean) ?? [];

  const [month, setMonth] = useState(urlMonth);
  const [days, setDays] = useState(7);
  const [traveler, setTraveler] = useState<TravelerType>("couple");
  const [budget, setBudget] = useState("mid-range");
  const [origin, setOrigin] = useState("Delhi");
  const [showResults, setShowResults] = useState(urlDests.length > 0);
  const [preSelectedIds] = useState<string[]>(urlDests);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [crowdTolerance, setCrowdTolerance] = useState<"any" | "quiet" | "very-quiet">("any");
  const [infraNeed, setInfraNeed] = useState<"any" | "good" | "basic-ok">("any");
  const [regionFocus, setRegionFocus] = useState("");

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

        // Origin proximity — states reachable in shorter time get a boost for short trips
        const nearDelhi = ["himachal-pradesh", "uttarakhand", "rajasthan", "uttar-pradesh", "punjab", "haryana", "delhi"];
        const nearMumbai = ["rajasthan"];
        const nearChandigarh = ["himachal-pradesh", "uttarakhand", "punjab", "haryana"];
        if (days <= 5) {
          if (origin === "Delhi" && nearDelhi.includes(dest.state_id)) fitScore += 8;
          if (origin === "Mumbai" && nearMumbai.includes(dest.state_id)) fitScore += 8;
          if (origin === "Chandigarh" && nearChandigarh.includes(dest.state_id)) fitScore += 12;
          if (origin === "Delhi" && ["jammu-kashmir", "ladakh"].includes(dest.state_id)) fitScore -= 5;
        }

        // Crowd tolerance
        if (crowdTolerance === "quiet" && dest.tags?.includes("offbeat")) fitScore += 10;
        if (crowdTolerance === "very-quiet" && dest.tags?.includes("offbeat")) fitScore += 15;
        if (crowdTolerance === "very-quiet" && dest.tags?.includes("popular")) fitScore -= 15;
        if (crowdTolerance === "quiet" && dest.tags?.includes("popular")) fitScore -= 5;

        // Infrastructure need
        if (infraNeed === "good" && dest.difficulty === "extreme") fitScore -= 20;
        if (infraNeed === "good" && dest.difficulty === "hard") fitScore -= 10;
        if (infraNeed === "basic-ok" && dest.difficulty === "extreme") fitScore += 5;

        // Region focus
        if (regionFocus && dest.state_id !== regionFocus) fitScore -= 30;

        // Why it matches
        const reasons: string[] = [];
        if (score >= 4) reasons.push(`Scores ${score}/5 in ${getMonthName(month)}`);
        if (traveler === "family" && kf?.suitable) reasons.push(`Kids rating: ${kf.rating}/5`);
        if (traveler === "biker" && dest.tags?.includes("biker")) reasons.push("Biker-friendly route");
        if (traveler === "spiritual" && dest.tags?.includes("spiritual")) reasons.push("Spiritual destination");
        if (budget === dest.budget_tier) reasons.push(`Matches your ${budget} budget`);
        if (crowdTolerance !== "any" && dest.tags?.includes("offbeat")) reasons.push("Off the beaten path");
        if (regionFocus && dest.state_id === regionFocus) reasons.push(`In your chosen region`);

        // Honest warnings
        const warnings: string[] = [];
        if (score <= 2 && score > 0) warnings.push(`Low season score (${score}/5)`);
        if (traveler === "family" && !kf?.suitable) warnings.push("Not ideal for kids");
        if (dest.difficulty === "hard" && traveler === "family") warnings.push("Difficult terrain for families");
        if (dest.difficulty === "extreme") warnings.push("Extreme conditions — experienced only");
        if (dest.elevation_m && dest.elevation_m > 4000) warnings.push(`High altitude (${dest.elevation_m.toLocaleString()}m) — AMS risk`);
        if (budget === "budget" && dest.budget_tier === "splurge") warnings.push("Above your budget tier");

        return {
          ...dest,
          fitScore,
          monthScore: score,
          monthNote: monthData?.note ?? "",
          kidsRating: kf?.rating ?? null,
          kidsSuitable: kf?.suitable ?? null,
          stateName: stateName ?? "",
          reasons,
          warnings,
        };
      })
      .filter((d) => d.fitScore > 30) // Only show reasonable matches
      .sort((a, b) => b.fitScore - a.fitScore)
      .slice(0, 12);
  }, [destinations, month, days, traveler, budget, origin, crowdTolerance, infraNeed, regionFocus]);

  // Build suggested itineraries — group top destinations by state/proximity
  const itineraries = useMemo(() => {
    if (recommendations.length < 3) return [];

    // Only include destinations with good month scores in itineraries
    const goodRecs = recommendations.filter((d) => d.monthScore >= 3);
    if (goodRecs.length < 2) return [];

    const byState: Record<string, typeof recommendations> = {};
    goodRecs.forEach((d) => {
      const key = d.state_id || "other";
      if (!byState[key]) byState[key] = [];
      byState[key].push(d);
    });

    const combos: Array<{ title: string; destinations: typeof recommendations; totalDays: string }> = [];

    // For each state with 2+ destinations, suggest a combo
    Object.entries(byState).forEach(([_, dests]) => {
      if (dests.length >= 2) {
        const top = dests.slice(0, Math.min(3, Math.floor(days / 2)));
        if (top.length >= 2) {
          const stateName = top[0].stateName;
          const suggestedDays = top.length <= 2 ? `${top.length * 3}-${top.length * 4}` : `${top.length * 2}-${top.length * 3}`;
          combos.push({
            title: `${stateName} Circuit`,
            destinations: top,
            totalDays: suggestedDays,
          });
        }
      }
    });

    // Cross-state combos for longer trips — only adjacent states
    if (days >= 10 && combos.length === 0 && goodRecs.length >= 3) {
      // Group adjacent states
      const adjacentGroups: Record<string, string[]> = {
        "Himachal + Uttarakhand": ["himachal-pradesh", "uttarakhand"],
        "HP + J&K + Ladakh": ["himachal-pradesh", "jammu-kashmir", "ladakh"],
        "Rajasthan Circuit": ["rajasthan"],
        "UP Spiritual": ["uttar-pradesh"],
        "Punjab + HP": ["punjab", "haryana", "himachal-pradesh"],
      };
      for (const [title, stateIds] of Object.entries(adjacentGroups)) {
        const matching = goodRecs.filter((d) => stateIds.includes(d.state_id));
        if (matching.length >= 3) {
          combos.push({
            title,
            destinations: matching.slice(0, 4),
            totalDays: `${Math.max(10, days - 2)}-${days}`,
          });
          break;
        }
      }
    }

    return combos.slice(0, 3);
  }, [recommendations, days]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <Link
          href={`/${locale}`}
          className="mb-3 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <span aria-hidden>←</span> Back to home
        </Link>
        <h1 className="text-3xl font-semibold">Plan Your Trip</h1>
        <p className="mt-1 text-muted-foreground">
          Tell us what you want — we'll find the best matches.
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-mono text-muted-foreground">
          <span><span className="font-semibold text-foreground">{destinationCount}</span> destinations</span>
          <span className="text-muted-foreground/40">·</span>
          <span><span className="font-semibold text-foreground">{stateCount || 36}</span> states &amp; UTs</span>
          <span className="text-muted-foreground/40">·</span>
          <span>scored every month</span>
        </div>
      </div>

      {/* Input Form */}
      <div className="rounded-2xl border border-border bg-card p-6 space-y-6">
        {/* Origin City */}
        <div>
          <label className="text-sm font-medium mb-2 block">Where are you traveling from?</label>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {["Delhi", "Mumbai", "Bangalore", "Kolkata", "Chandigarh", "Other"].map((city) => (
              <button
                key={city}
                onClick={() => { setOrigin(city); setShowResults(true); }}
                className={`rounded-lg border px-3 py-2 text-sm transition-all ${
                  origin === city
                    ? "border-primary bg-primary/10 text-foreground"
                    : "border-border text-muted-foreground hover:text-foreground hover:border-muted-foreground"
                }`}
              >
                {city}
              </button>
            ))}
          </div>
        </div>

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
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
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
                <div className="text-xs font-medium mt-1">{t.label}</div>
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
                <div className="text-xs text-muted-foreground">{b.desc}</div>
              </button>
            ))}
          </div>
        {/* Advanced preferences toggle */}
        <div className="border-t border-border/50 pt-4">
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
          >
            <span>{showAdvanced ? "−" : "+"}</span>
            <span>Advanced preferences</span>
          </button>

          {showAdvanced && (
            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              {/* Crowd tolerance */}
              <div>
                <label className="text-sm font-medium mb-2 block">Crowd tolerance</label>
                <div className="flex gap-2">
                  {[
                    { id: "any" as const, label: "Don't mind" },
                    { id: "quiet" as const, label: "Prefer quiet" },
                    { id: "very-quiet" as const, label: "Off-grid" },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => { setCrowdTolerance(opt.id); setShowResults(true); }}
                      className={`flex-1 rounded-lg border py-2 text-xs font-medium transition-all ${
                        crowdTolerance === opt.id ? "border-primary bg-primary/10" : "border-border text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Infrastructure need */}
              <div>
                <label className="text-sm font-medium mb-2 block">Infrastructure need</label>
                <div className="flex gap-2">
                  {[
                    { id: "any" as const, label: "Any" },
                    { id: "good" as const, label: "Good infra" },
                    { id: "basic-ok" as const, label: "Basic OK" },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => { setInfraNeed(opt.id); setShowResults(true); }}
                      className={`flex-1 rounded-lg border py-2 text-xs font-medium transition-all ${
                        infraNeed === opt.id ? "border-primary bg-primary/10" : "border-border text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Region focus — pulls from states table, grouped by region */}
              <div>
                <label className="text-sm font-medium mb-2 block">Region focus</label>
                <select
                  value={regionFocus}
                  onChange={(e) => { setRegionFocus(e.target.value); setShowResults(true); }}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
                >
                  <option value="">All of India — no preference</option>
                  {statesByRegion.map((group) => (
                    <optgroup key={group.region} label={group.region}>
                      {group.states.map((st) => (
                        <option key={st.id} value={st.id}>{st.name}</option>
                      ))}
                    </optgroup>
                  ))}
                </select>
                {stateCount > 0 && (
                  <p className="text-[11px] text-muted-foreground mt-1.5">
                    {destinationCount}+ destinations across {stateCount} states — pick one to focus, or leave blank to let us roam.
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
        </div>
      </div>

      {/* Submit button */}
      {!showResults && (
        <button
          onClick={() => setShowResults(true)}
          className="w-full rounded-2xl bg-primary py-4 text-sm font-semibold text-primary-foreground hover:bg-primary/90 hover:-translate-y-0.5 transition-all duration-200 shadow-lg"
        >
          Find My Perfect Destinations →
        </button>
      )}

      {/* Results */}
      <AnimatePresence>
        {showResults && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">
                {recommendations.length} destinations match
              </h2>
              <span className="text-sm text-muted-foreground">
                From {origin} · {getMonthName(month)} · {days}d · {TRAVELER_TYPES.find((t) => t.id === traveler)?.label} · {budget}
              </span>
            </div>

            {/* Suggested Itineraries */}
            {itineraries.length > 0 && (
              <div className="mb-6 space-y-3">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-[0.08em]">Suggested Itineraries</h3>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {itineraries.map((itin, i) => (
                    <div key={i} className="rounded-xl border border-primary/30 bg-primary/5 p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold">{itin.title}</span>
                        <span className="text-xs font-mono text-primary">{itin.totalDays}d</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {itin.destinations.map((d, j) => (
                          <span key={d.id} className="text-xs text-muted-foreground">
                            {j > 0 && <span className="mx-1">→</span>}
                            {d.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

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
                      className="group block rounded-xl border border-border bg-card overflow-hidden h-full transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
                    >
                      {/* Hero image */}
                      <div className="relative h-28 bg-muted/30 overflow-hidden">
                        <Image
                          src={`/images/destinations/${dest.id}.jpg`}
                          alt={dest.name}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                        />
                        {/* Rank badge */}
                        <span className="absolute top-2 left-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/60 text-xs font-mono font-bold text-primary backdrop-blur-sm">
                          #{idx + 1}
                        </span>
                        <span
                          className={`absolute top-2 right-2 inline-flex items-center rounded-full border px-2 py-1 text-xs font-medium backdrop-blur-sm ${SCORE_COLORS[dest.monthScore] ?? SCORE_COLORS[0]}`}
                        >
                          {dest.monthScore}/5
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
                      </div>

                      <div className="p-4">
                        {/* Name */}
                        <h3 className="text-base font-semibold group-hover:text-primary transition-colors">
                          {dest.name}
                        </h3>
                        <p className="mt-0.5 text-xs text-muted-foreground line-clamp-2">
                          {dest.tagline}
                        </p>

                        {/* Why it matches */}
                        {dest.reasons.length > 0 && (
                          <div className="mt-2 space-y-0.5">
                            {dest.reasons.map((r, i) => (
                              <div key={i} className="flex items-start gap-1.5 text-xs text-emerald-400">
                                <span className="mt-0.5">✓</span>
                                <span>{r}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Warnings */}
                        {dest.warnings.length > 0 && (
                          <div className="mt-2 space-y-0.5">
                            {dest.warnings.slice(0, 2).map((w, i) => (
                              <div key={i} className="flex items-start gap-1.5 text-xs text-amber-400/80">
                                <span className="mt-0.5">⚠</span>
                                <span>{w}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Meta */}
                        <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                          <span>{dest.stateName}</span>
                          <span>·</span>
                          <span className={DIFFICULTY_COLORS[dest.difficulty] ?? ""}>
                            {dest.difficulty}
                          </span>
                          {dest.elevation_m && (
                            <>
                              <span>·</span>
                              <span className="font-mono">{dest.elevation_m.toLocaleString()}m</span>
                            </>
                          )}
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* AI Itinerary Generator */}
      {showResults && (recommendations.length > 0 || preSelectedIds.length > 0) && (
        <AIItinerary
          month={month}
          days={days}
          travelerType={traveler}
          budget={budget}
          origin={origin}
          recommendedIds={preSelectedIds.length > 0 ? preSelectedIds : recommendations.map((r) => r.id)}
        />
      )}
    </div>
  );
}

function getMonthName(m: number): string {
  const names = ["", "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
  return names[m] ?? "";
}
