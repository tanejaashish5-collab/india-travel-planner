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
  const [startMonth, setStartMonth] = useState(10); // October default (good weather start)
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
      {/* Persona (required) */}
      <div>
        <label className="block text-sm font-medium mb-3">
          Who's travelling? <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setPersona("family_kids")}
            className={`p-4 rounded-lg border-2 text-left transition ${
              persona === "family_kids"
                ? "border-emerald-600 bg-emerald-50"
                : "border-gray-200 hover:border-gray-400"
            }`}
          >
            <div className="font-medium">Family with kids</div>
            <div className="text-xs text-gray-600 mt-1">Kid-safe picks, hospitals close, low extremes</div>
          </button>
          <button
            type="button"
            onClick={() => setPersona("solo_couple")}
            className={`p-4 rounded-lg border-2 text-left transition ${
              persona === "solo_couple"
                ? "border-emerald-600 bg-emerald-50"
                : "border-gray-200 hover:border-gray-400"
            }`}
          >
            <div className="font-medium">Solo or couple</div>
            <div className="text-xs text-gray-600 mt-1">Offbeat, longer stays, budget-leaning</div>
          </button>
        </div>
      </div>

      {/* Duration slider */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Duration: <span className="font-bold">{durationMonths} months</span>
        </label>
        <input
          type="range"
          min={3}
          max={12}
          value={durationMonths}
          onChange={(e) => setDurationMonths(Number(e.target.value))}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>3 mo</span>
          <span>12 mo</span>
        </div>
      </div>

      {/* Start month */}
      <div>
        <label className="block text-sm font-medium mb-2">Start month</label>
        <select
          value={startMonth}
          onChange={(e) => setStartMonth(Number(e.target.value))}
          className="w-full border rounded-lg px-3 py-2"
        >
          {MONTH_NAMES.slice(1).map((name, i) => (
            <option key={i + 1} value={i + 1}>{name}</option>
          ))}
        </select>
        <p className="text-xs text-gray-600 mt-1">
          Trip runs {MONTH_NAMES[startMonth]} → {MONTH_NAMES[endMonth]}
        </p>
      </div>

      {/* Budget */}
      <div>
        <label className="block text-sm font-medium mb-2">Budget</label>
        <div className="grid grid-cols-3 gap-2">
          {(["budget", "mid-range", "splurge"] as Budget[]).map((b) => (
            <button
              key={b}
              type="button"
              onClick={() => setBudget(b)}
              className={`py-2 rounded-lg border-2 capitalize transition ${
                budget === b
                  ? "border-emerald-600 bg-emerald-50"
                  : "border-gray-200 hover:border-gray-400"
              }`}
            >
              {b}
            </button>
          ))}
        </div>
      </div>

      {/* Origin */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Origin city <span className="text-gray-400 font-normal">(optional)</span>
        </label>
        <input
          type="text"
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
          placeholder="e.g. Delhi, Mumbai, Bengaluru"
          className="w-full border rounded-lg px-3 py-2"
          maxLength={80}
        />
      </div>

      {/* Interests */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Interests <span className="text-gray-400 font-normal">(pick any)</span>
        </label>
        <div className="flex flex-wrap gap-2">
          {INTEREST_OPTIONS.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => toggleInterest(tag)}
              className={`px-3 py-1.5 rounded-full text-sm capitalize border transition ${
                interests.includes(tag)
                  ? "bg-emerald-600 text-white border-emerald-600"
                  : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={!canSubmit}
        className="w-full py-3 rounded-lg bg-emerald-600 text-white font-medium hover:bg-emerald-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
      >
        {loading ? "Generating your gap year…" : `Plan my ${durationMonths} months`}
      </button>

      {!persona && (
        <p className="text-xs text-center text-gray-500">Pick a traveller type to continue</p>
      )}
    </form>
  );
}
