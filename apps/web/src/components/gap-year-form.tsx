"use client";

import { useState } from "react";
import { MONTH_NAMES, type Persona, type Budget, type GapYearInput } from "@/lib/gap-year/types";

const INTEREST_OPTIONS = [
  "mountains", "beaches", "wildlife", "food", "temples",
  "heritage", "offbeat", "trekking", "backwaters", "festivals",
];

interface Props {
  onSubmit: (input: GapYearInput) => Promise<void>;
  loading: boolean;
}

export function GapYearForm({ onSubmit, loading }: Props) {
  const [durationMonths, setDurationMonths] = useState(6);
  const [startMonth, setStartMonth] = useState(10);
  const [persona, setPersona] = useState<Persona | "">("");
  const [budget, setBudget] = useState<Budget>("mid-range");
  const [origin, setOrigin] = useState("");
  const [interests, setInterests] = useState<string[]>([]);

  const canSubmit = Boolean(persona) && !loading;

  function toggleInterest(tag: string) {
    setInterests((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!persona || loading) return;
    await onSubmit({
      durationMonths,
      startMonth,
      persona,
      budget,
      origin: origin.trim() || undefined,
      interests,
    });
  }

  const endMonth = ((startMonth - 1 + durationMonths - 1) % 12) + 1;

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Persona */}
      <div>
        <label className="block text-sm font-medium mb-3 text-foreground">
          Who's travelling? <span className="text-primary">*</span>
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setPersona("family_kids")}
            className={`p-4 rounded-lg border-2 text-left transition ${
              persona === "family_kids"
                ? "border-primary bg-primary/10 text-foreground"
                : "border-border text-muted-foreground hover:border-muted-foreground hover:text-foreground"
            }`}
          >
            <div className="font-medium text-foreground">Family with kids</div>
            <div className="text-xs text-muted-foreground mt-1">
              Kid-safe picks, hospitals close, low extremes
            </div>
          </button>
          <button
            type="button"
            onClick={() => setPersona("solo_couple")}
            className={`p-4 rounded-lg border-2 text-left transition ${
              persona === "solo_couple"
                ? "border-primary bg-primary/10 text-foreground"
                : "border-border text-muted-foreground hover:border-muted-foreground hover:text-foreground"
            }`}
          >
            <div className="font-medium text-foreground">Solo or couple</div>
            <div className="text-xs text-muted-foreground mt-1">
              Offbeat, longer stays, budget-leaning
            </div>
          </button>
        </div>
      </div>

      {/* Duration */}
      <div>
        <label className="block text-sm font-medium mb-2 text-foreground">
          Duration: <span className="font-bold text-primary">{durationMonths} months</span>
        </label>
        <input
          type="range"
          min={3}
          max={12}
          value={durationMonths}
          onChange={(e) => setDurationMonths(Number(e.target.value))}
          className="w-full accent-primary"
        />
        <div className="flex justify-between text-xs text-muted-foreground mt-1">
          <span>3 mo</span>
          <span>12 mo</span>
        </div>
      </div>

      {/* Start month */}
      <div>
        <label className="block text-sm font-medium mb-2 text-foreground">Start month</label>
        <select
          value={startMonth}
          onChange={(e) => setStartMonth(Number(e.target.value))}
          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
        >
          {MONTH_NAMES.slice(1).map((name, i) => (
            <option key={i + 1} value={i + 1}>{name}</option>
          ))}
        </select>
        <p className="text-xs text-muted-foreground mt-2">
          Trip runs {MONTH_NAMES[startMonth]} → {MONTH_NAMES[endMonth]}
        </p>
      </div>

      {/* Budget */}
      <div>
        <label className="block text-sm font-medium mb-2 text-foreground">Budget</label>
        <div className="grid grid-cols-3 gap-2">
          {(["budget", "mid-range", "splurge"] as Budget[]).map((b) => (
            <button
              key={b}
              type="button"
              onClick={() => setBudget(b)}
              className={`py-2 rounded-lg border-2 capitalize transition ${
                budget === b
                  ? "border-primary bg-primary/10 text-foreground"
                  : "border-border text-muted-foreground hover:border-muted-foreground hover:text-foreground"
              }`}
            >
              {b}
            </button>
          ))}
        </div>
      </div>

      {/* Origin */}
      <div>
        <label className="block text-sm font-medium mb-2 text-foreground">
          Origin city <span className="text-muted-foreground font-normal">(optional)</span>
        </label>
        <input
          type="text"
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
          placeholder="e.g. Delhi, Mumbai, Bengaluru"
          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          maxLength={80}
        />
      </div>

      {/* Interests */}
      <div>
        <label className="block text-sm font-medium mb-2 text-foreground">
          Interests <span className="text-muted-foreground font-normal">(pick any)</span>
        </label>
        <div className="flex flex-wrap gap-2">
          {INTEREST_OPTIONS.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => toggleInterest(tag)}
              className={`px-3 py-1.5 rounded-full text-sm capitalize border transition ${
                interests.includes(tag)
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-muted/40 text-muted-foreground border-border hover:bg-muted hover:text-foreground"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <button
        type="submit"
        disabled={!canSubmit}
        className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed transition"
      >
        {loading ? "Generating your gap year…" : `Plan my ${durationMonths} months`}
      </button>

      {!persona && (
        <p className="text-xs text-center text-muted-foreground">
          Pick a traveller type to continue
        </p>
      )}
    </form>
  );
}
