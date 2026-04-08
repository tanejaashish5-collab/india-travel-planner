"use client";

import { useState } from "react";

const TYPE_LABELS: Record<string, { label: string; icon: string; color: string }> = {
  parent: { label: "Parents say", icon: "👨‍👩‍👧", color: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10" },
  biker: { label: "Bikers say", icon: "🏍️", color: "text-orange-400 border-orange-500/30 bg-orange-500/10" },
  solo_female: { label: "Solo women say", icon: "👩", color: "text-purple-400 border-purple-500/30 bg-purple-500/10" },
  backpacker: { label: "Backpackers say", icon: "🎒", color: "text-blue-400 border-blue-500/30 bg-blue-500/10" },
  couple: { label: "Couples say", icon: "💑", color: "text-pink-400 border-pink-500/30 bg-pink-500/10" },
  senior: { label: "Seniors say", icon: "👴", color: "text-amber-400 border-amber-500/30 bg-amber-500/10" },
  first_timer: { label: "First-timers say", icon: "🌟", color: "text-yellow-400 border-yellow-500/30 bg-yellow-500/10" },
  photographer: { label: "Photographers say", icon: "📷", color: "text-cyan-400 border-cyan-500/30 bg-cyan-500/10" },
};

const MONTH_SHORT = ["","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

export function TravelerNotes({ notes }: { notes: any[] }) {
  const [selectedType, setSelectedType] = useState<string>("");

  if (!notes || notes.length === 0) return null;

  // Get unique traveler types present
  const types = [...new Set(notes.map((n) => n.traveler_type))];
  const filtered = selectedType ? notes.filter((n) => n.traveler_type === selectedType) : notes;

  return (
    <section>
      <h2 className="text-xl font-semibold mb-2">What Travelers Say</h2>
      <p className="text-sm text-muted-foreground mb-4">Real experiences by traveler type — not generic star ratings</p>

      {/* Type filter chips */}
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={() => setSelectedType("")}
          className={`rounded-full border px-3 py-1 text-xs font-medium transition-all ${
            !selectedType ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:text-foreground"
          }`}
        >
          All ({notes.length})
        </button>
        {types.map((type) => {
          const meta = TYPE_LABELS[type] || { label: type, icon: "💬", color: "border-border" };
          const count = notes.filter((n) => n.traveler_type === type).length;
          return (
            <button
              key={type}
              onClick={() => setSelectedType(selectedType === type ? "" : type)}
              className={`rounded-full border px-3 py-1 text-xs font-medium transition-all ${
                selectedType === type ? meta.color : "border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {meta.icon} {meta.label} ({count})
            </button>
          );
        })}
      </div>

      {/* Notes */}
      <div className="space-y-3">
        {filtered.map((note: any) => {
          const meta = TYPE_LABELS[note.traveler_type] || { label: note.traveler_type, icon: "💬", color: "border-border" };
          return (
            <div key={note.id} className="rounded-xl border border-border p-4 hover:border-border/80 transition-colors">
              <div className="flex items-start justify-between mb-2">
                <span className={`rounded-full border px-2.5 py-1 text-xs font-medium ${meta.color}`}>
                  {meta.icon} {meta.label}
                </span>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  {note.visit_month && note.visit_year && (
                    <span>{MONTH_SHORT[note.visit_month]} {note.visit_year}</span>
                  )}
                  {note.rating && (
                    <span className="font-mono font-bold text-primary">{note.rating}/5</span>
                  )}
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{note.note}</p>
              {note.tip && (
                <p className="mt-2 text-sm text-primary/80 italic">💡 Tip: {note.tip}</p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
