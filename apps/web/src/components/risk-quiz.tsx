"use client";

import { useState } from "react";
import Link from "next/link";

type Group = "solo" | "couple" | "family-kids" | "friends" | "parents";
type Duration = "weekend" | "week" | "two-weeks" | "long";
type Priority = "heritage" | "nature" | "food" | "adventure" | "rest";
type Comfort = "budget" | "mid" | "premium";

type Answers = {
  group: Group | null;
  duration: Duration | null;
  priority: Priority | null;
  comfort: Comfort | null;
  month: number | null;
};

type Result = {
  destination_id: string;
  name: string;
  state_name: string;
  score: number;
  why_go: string;
};

const Q1_OPTIONS: Array<{ id: Group; label: string; desc: string }> = [
  { id: "solo", label: "Solo", desc: "Just me" },
  { id: "couple", label: "Couple", desc: "Two of us" },
  { id: "family-kids", label: "Family with kids", desc: "Including children under 10" },
  { id: "friends", label: "Friends", desc: "3+ adults" },
  { id: "parents", label: "With parents / elderly", desc: "Multi-generational or 65+ travelers" },
];

const Q2_OPTIONS: Array<{ id: Duration; label: string; desc: string }> = [
  { id: "weekend", label: "Weekend", desc: "2–4 days" },
  { id: "week", label: "A week", desc: "5–10 days" },
  { id: "two-weeks", label: "Two weeks", desc: "11–18 days" },
  { id: "long", label: "Three weeks+", desc: "Big trip or gap year" },
];

const Q3_OPTIONS: Array<{ id: Priority; label: string; desc: string }> = [
  { id: "heritage", label: "Heritage + culture", desc: "Forts, monasteries, temples, museums" },
  { id: "nature", label: "Nature + landscape", desc: "Mountains, wildlife, coast, forest" },
  { id: "food", label: "Food + regional cuisine", desc: "Hyderabad biryani, Chettinad spice, Bengal street" },
  { id: "adventure", label: "Adventure + physical", desc: "Trekking, biking, diving, high passes" },
  { id: "rest", label: "Rest + wellness", desc: "Ayurveda, yoga, beaches, slow stays" },
];

const Q4_OPTIONS: Array<{ id: Comfort; label: string; desc: string }> = [
  { id: "budget", label: "Budget", desc: "Homestays, hostels, basic hotels" },
  { id: "mid", label: "Mid-range", desc: "3-star hotels, curated homestays" },
  { id: "premium", label: "Premium", desc: "4–5 star, heritage properties, luxury" },
];

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export function RiskQuiz({ locale }: { locale: string }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({
    group: null, duration: null, priority: null, comfort: null, month: null,
  });
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Result[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  function advance(update: Partial<Answers>) {
    const next = { ...answers, ...update };
    setAnswers(next);
    setStep(step + 1);
    if (step === 4) {
      void submit(next);
    }
  }

  function restart() {
    setAnswers({ group: null, duration: null, priority: null, comfort: null, month: null });
    setStep(0);
    setResults(null);
    setError(null);
  }

  async function submit(a: Answers) {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/quiz-match", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(a),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
        setLoading(false);
        return;
      }
      setResults(data.results ?? []);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  // Result view
  if (results) {
    const groupLabel = Q1_OPTIONS.find((o) => o.id === answers.group)?.label ?? "";
    const monthLabel = answers.month ? MONTHS[answers.month - 1] : "";
    return (
      <div>
        <div className="mb-6 rounded-2xl border border-primary/30 bg-primary/5 p-5">
          <div className="text-xs font-mono tracking-[0.08em] uppercase text-muted-foreground/70 mb-1">Your match</div>
          <p className="text-sm leading-relaxed">
            <strong className="text-foreground">{groupLabel} · {monthLabel}</strong> · prioritising{" "}
            {Q3_OPTIONS.find((o) => o.id === answers.priority)?.label.toLowerCase()} ·{" "}
            {Q4_OPTIONS.find((o) => o.id === answers.comfort)?.label.toLowerCase()} comfort.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mb-4">
          Top {results.length} for you
        </h2>

        {results.length === 0 ? (
          <div className="rounded-2xl border border-border bg-card/40 p-6 mb-6">
            <p className="text-sm text-muted-foreground">
              No destinations matched this combination cleanly. Try broadening your month or priority —
              or <Link href={`/${locale}/explore`} className="underline hover:text-primary">browse all 488 destinations</Link>.
            </p>
          </div>
        ) : (
          <div className="space-y-3 mb-8">
            {results.map((r, i) => (
              <Link
                key={r.destination_id}
                href={`/${locale}/destination/${r.destination_id}`}
                className="block rounded-2xl border border-border bg-card/40 p-5 hover:border-primary/50 transition-colors"
              >
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="font-mono text-xl font-bold tabular-nums text-primary/80 w-8">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex-1">
                    <div className="flex items-baseline justify-between gap-2 flex-wrap">
                      <h3 className="text-lg font-semibold">{r.name}</h3>
                      <span className="text-xs font-mono tracking-[0.08em] uppercase text-muted-foreground">
                        {r.state_name} · {r.score}/10
                      </span>
                    </div>
                    {r.why_go && (
                      <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-3">
                        {r.why_go}
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className="flex gap-3">
          <button
            onClick={restart}
            className="rounded-full border border-border px-5 py-2.5 text-sm font-medium hover:bg-muted transition-colors"
          >
            Take again
          </button>
          <Link
            href={`/${locale}/plan`}
            className="rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Full AI planner
          </Link>
        </div>
      </div>
    );
  }

  // Loading state
  if (loading) {
    return (
      <div className="rounded-2xl border border-border bg-card/40 p-8 text-center">
        <div className="inline-block w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin mb-3" />
        <p className="text-sm text-muted-foreground">Matching against 5,856 destination-month scores…</p>
      </div>
    );
  }

  // Question views
  return (
    <div>
      {/* Progress */}
      <div className="flex gap-2 mb-6">
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full ${i < step ? "bg-primary" : i === step ? "bg-primary/50" : "bg-border"}`}
          />
        ))}
      </div>

      {/* Q1 */}
      {step === 0 && (
        <div>
          <h2 className="text-2xl font-semibold mb-1">Who's travelling?</h2>
          <p className="text-sm text-muted-foreground mb-6">1 of 5</p>
          <div className="grid gap-3 sm:grid-cols-2">
            {Q1_OPTIONS.map((o) => (
              <button
                key={o.id}
                onClick={() => advance({ group: o.id })}
                className="text-left rounded-2xl border border-border bg-card/40 p-5 hover:border-primary/50 hover:bg-card/60 transition-colors"
              >
                <div className="font-semibold">{o.label}</div>
                <p className="text-xs text-muted-foreground mt-1">{o.desc}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Q2 */}
      {step === 1 && (
        <div>
          <h2 className="text-2xl font-semibold mb-1">How long?</h2>
          <p className="text-sm text-muted-foreground mb-6">2 of 5</p>
          <div className="grid gap-3 sm:grid-cols-2">
            {Q2_OPTIONS.map((o) => (
              <button
                key={o.id}
                onClick={() => advance({ duration: o.id })}
                className="text-left rounded-2xl border border-border bg-card/40 p-5 hover:border-primary/50 hover:bg-card/60 transition-colors"
              >
                <div className="font-semibold">{o.label}</div>
                <p className="text-xs text-muted-foreground mt-1">{o.desc}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Q3 */}
      {step === 2 && (
        <div>
          <h2 className="text-2xl font-semibold mb-1">What's the priority?</h2>
          <p className="text-sm text-muted-foreground mb-6">3 of 5</p>
          <div className="grid gap-3 sm:grid-cols-2">
            {Q3_OPTIONS.map((o) => (
              <button
                key={o.id}
                onClick={() => advance({ priority: o.id })}
                className="text-left rounded-2xl border border-border bg-card/40 p-5 hover:border-primary/50 hover:bg-card/60 transition-colors"
              >
                <div className="font-semibold">{o.label}</div>
                <p className="text-xs text-muted-foreground mt-1">{o.desc}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Q4 */}
      {step === 3 && (
        <div>
          <h2 className="text-2xl font-semibold mb-1">Comfort tolerance?</h2>
          <p className="text-sm text-muted-foreground mb-6">4 of 5</p>
          <div className="grid gap-3 sm:grid-cols-2">
            {Q4_OPTIONS.map((o) => (
              <button
                key={o.id}
                onClick={() => advance({ comfort: o.id })}
                className="text-left rounded-2xl border border-border bg-card/40 p-5 hover:border-primary/50 hover:bg-card/60 transition-colors"
              >
                <div className="font-semibold">{o.label}</div>
                <p className="text-xs text-muted-foreground mt-1">{o.desc}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Q5 — month selector */}
      {step === 4 && (
        <div>
          <h2 className="text-2xl font-semibold mb-1">Which month?</h2>
          <p className="text-sm text-muted-foreground mb-6">5 of 5</p>
          <div className="grid gap-2 grid-cols-3 sm:grid-cols-4">
            {MONTHS.map((m, i) => (
              <button
                key={m}
                onClick={() => advance({ month: i + 1 })}
                className="rounded-xl border border-border bg-card/40 p-3 text-sm font-medium hover:border-primary/50 hover:bg-card/60 transition-colors"
              >
                {m}
              </button>
            ))}
          </div>
        </div>
      )}

      {error && <p className="mt-4 text-xs text-red-400">{error}</p>}
    </div>
  );
}
