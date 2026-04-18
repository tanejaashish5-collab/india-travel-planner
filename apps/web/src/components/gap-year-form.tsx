"use client";

import { useState } from "react";
import { OriginCombobox } from "./origin-combobox";
import {
  MONTH_NAMES,
  THEMES,
  type Party,
  type Familiarity,
  type ExperienceTier,
  type Theme,
  type GapYearInput,
  type OriginRef,
} from "@/lib/gap-year/types";
import type { OriginCity } from "@/lib/gap-year/origin-cities";

interface Props {
  onSubmit: (input: GapYearInput) => Promise<void>;
  loading: boolean;
}

export function GapYearForm({ onSubmit, loading }: Props) {
  const [durationMonths, setDurationMonths] = useState(6);
  const [startMonth, setStartMonth] = useState(10);
  const [party, setParty] = useState<Party | "">("");
  const [familiarity, setFamiliarity] = useState<Familiarity | "">("");
  const [themes, setThemes] = useState<Theme[]>([]);
  const [experienceTier, setExperienceTier] = useState<ExperienceTier>("comfortable");
  const [origin, setOrigin] = useState<OriginCity | null>(null);

  const canSubmit = !!party && !!familiarity && !!origin && !loading;

  function toggleTheme(tag: Theme) {
    setThemes((prev) => {
      if (prev.includes(tag)) return prev.filter((t) => t !== tag);
      if (prev.length >= 3) return prev; // cap at 3
      return [...prev, tag];
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit || !party || !familiarity || !origin) return;
    const originRef: OriginRef = {
      id: origin.id,
      name: origin.name,
      state: origin.state,
      lat: origin.lat,
      lng: origin.lng,
    };
    await onSubmit({
      durationMonths,
      startMonth,
      party,
      familiarity,
      experienceTier,
      themes,
      origin: originRef,
    });
  }

  const endMonth = ((startMonth - 1 + durationMonths - 1) % 12) + 1;

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* 1. Duration */}
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

      {/* 2. Start month */}
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

      {/* 3. Origin */}
      <div>
        <label className="block text-sm font-medium mb-2 text-foreground">
          Where are you travelling from? <span className="text-primary">*</span>
        </label>
        <OriginCombobox value={origin} onChange={setOrigin} />
        <p className="text-xs text-muted-foreground mt-1">
          Can't find your exact city? Pick the nearest major one.
        </p>
      </div>

      {/* 4. Who */}
      <div>
        <label className="block text-sm font-medium mb-3 text-foreground">
          Who's travelling? <span className="text-primary">*</span>
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <PartyCard
            selected={party === "family_kids"}
            onClick={() => setParty("family_kids")}
            title="Family with kids"
            sub="Kid-safe filters, hospital access, no extreme altitudes"
          />
          <PartyCard
            selected={party === "solo_couple"}
            onClick={() => setParty("solo_couple")}
            title="Solo or couple"
            sub="No kids-specific constraints"
          />
        </div>
      </div>

      {/* 5. Familiarity */}
      <div>
        <label className="block text-sm font-medium mb-3 text-foreground">
          How well do you know India? <span className="text-primary">*</span>
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <PartyCard
            selected={familiarity === "first_timer"}
            onClick={() => setFamiliarity("first_timer")}
            title="First major India trip"
            sub="We'll lead with the recognised names — Jaipur, Udaipur, Munnar — and offer offbeat as 'also try'."
          />
          <PartyCard
            selected={familiarity === "seasoned"}
            onClick={() => setFamiliarity("seasoned")}
            title="Been around, want depth"
            sub="We'll go deeper — Tirthan over Manali, Kollam over Alleppey. Offbeat-first."
          />
        </div>
      </div>

      {/* 6. Themes */}
      <div>
        <label className="block text-sm font-medium mb-2 text-foreground">
          Themes <span className="text-muted-foreground font-normal">(pick up to 3 — optional)</span>
        </label>
        <div className="flex flex-wrap gap-2">
          {THEMES.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => toggleTheme(tag)}
              disabled={!themes.includes(tag) && themes.length >= 3}
              className={`px-3 py-1.5 rounded-full text-sm capitalize border transition ${
                themes.includes(tag)
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-muted/40 text-muted-foreground border-border hover:bg-muted hover:text-foreground"
              } disabled:opacity-40 disabled:cursor-not-allowed`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* 7. Experience tier */}
      <div>
        <label className="block text-sm font-medium mb-3 text-foreground">
          Experience tier
        </label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          <TierCard
            selected={experienceTier === "thrifty"}
            onClick={() => setExperienceTier("thrifty")}
            title="Thrifty"
            sub="Homestays, hostels, streetside. Stay cheap everywhere."
          />
          <TierCard
            selected={experienceTier === "comfortable"}
            onClick={() => setExperienceTier("comfortable")}
            title="Comfortable"
            sub="Good hotels and reliable mid-range stays. Default balance."
          />
          <TierCard
            selected={experienceTier === "splurge"}
            onClick={() => setExperienceTier("splurge")}
            title="Splurge when warranted"
            sub="We'll suggest Taj Udaipur when it's the right answer — not every night."
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={!canSubmit}
        className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed transition"
      >
        {loading ? "Generating your gap year…" : `Plan my ${durationMonths} months`}
      </button>

      {!canSubmit && !loading && (
        <p className="text-xs text-center text-muted-foreground">
          {!origin ? "Pick your origin city to continue." :
           !party ? "Pick who's travelling." :
           !familiarity ? "Tell us how familiar you are with India." : ""}
        </p>
      )}
    </form>
  );
}

function PartyCard({ selected, onClick, title, sub }: { selected: boolean; onClick: () => void; title: string; sub: string; }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`p-4 rounded-lg border-2 text-left transition ${
        selected
          ? "border-primary bg-primary/10"
          : "border-border hover:border-muted-foreground"
      }`}
    >
      <div className="font-medium text-foreground">{title}</div>
      <div className="text-xs text-muted-foreground mt-1">{sub}</div>
    </button>
  );
}

function TierCard({ selected, onClick, title, sub }: { selected: boolean; onClick: () => void; title: string; sub: string; }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`p-3 rounded-lg border-2 text-left transition ${
        selected
          ? "border-primary bg-primary/10"
          : "border-border hover:border-muted-foreground"
      }`}
    >
      <div className="font-medium text-foreground">{title}</div>
      <div className="text-[11px] text-muted-foreground mt-1">{sub}</div>
    </button>
  );
}
