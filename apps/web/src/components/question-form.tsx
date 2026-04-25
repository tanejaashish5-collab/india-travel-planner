"use client";

import { useState } from "react";
import { m as motion } from "framer-motion";

const CATEGORIES = [
  { value: "safety", label: "Safety" },
  { value: "cost", label: "Cost" },
  { value: "permits", label: "Permits" },
  { value: "family", label: "Family / kids" },
  { value: "transport", label: "Transport" },
  { value: "timing", label: "Best time / timing" },
  { value: "weather", label: "Weather" },
  { value: "practical", label: "Practical" },
] as const;

const TRAVELER_TYPES = [
  "solo",
  "couple",
  "family",
  "biker",
  "backpacker",
  "photographer",
  "first-timer",
  "senior",
] as const;

const ERROR_LABELS: Record<string, string> = {
  destination_required: "Destination missing — refresh and try again.",
  question_length: "Question must be 30–300 characters.",
  invalid_category: "Pick a category for your question.",
  invalid_traveler_type: "Pick a traveler type or leave it blank.",
  invalid_email: "Email looks invalid.",
  too_many: "You've asked too many questions recently. Try again in an hour.",
  destination_not_found: "We couldn't find that destination.",
  server_misconfigured: "Server can't process submissions right now. Try again in a minute.",
  invalid_json: "Submission was malformed. Please try again.",
};

export function QuestionForm({ destinationId }: { destinationId: string }) {
  const [question, setQuestion] = useState("");
  const [category, setCategory] = useState("");
  const [travelerType, setTravelerType] = useState("");
  const [submitterName, setSubmitterName] = useState("");
  const [submitterEmail, setSubmitterEmail] = useState("");
  const [hp, setHp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (question.trim().length < 30) {
      setError(ERROR_LABELS.question_length);
      return;
    }
    if (!category) {
      setError(ERROR_LABELS.invalid_category);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          destination_id: destinationId,
          question: question.trim(),
          category,
          traveler_type: travelerType || null,
          submitter_name: submitterName.trim() || null,
          submitter_email: submitterEmail.trim() || null,
          hp,
        }),
      });
      const data = await res.json();
      if (!data.ok) {
        setError(ERROR_LABELS[data.error as string] ?? "Submission failed. Please try again.");
        return;
      }
      setSuccess(true);
    } catch {
      setError("Submission failed. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-6 text-center"
      >
        <div className="text-2xl mb-2">&#10003;</div>
        <p className="text-emerald-400 font-semibold">Thanks — your question is queued for an editor.</p>
        <p className="text-sm text-muted-foreground mt-1">
          We answer questions in the order they come in. Usually a day or two.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-xl border border-border bg-card p-6 space-y-5">
      <div>
        <h3 className="text-lg font-bold">Ask a question</h3>
        <p className="text-xs text-muted-foreground mt-1">
          Anonymous — no login. An editor writes the answer; it goes live as a public Q&amp;A page.
        </p>
      </div>

      <input
        type="text"
        name="hp"
        tabIndex={-1}
        autoComplete="off"
        value={hp}
        onChange={(e) => setHp(e.target.value)}
        aria-hidden="true"
        className="absolute left-[-9999px] opacity-0 pointer-events-none"
      />

      <div>
        <label className="text-sm text-muted-foreground block mb-2">Your question</label>
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value.slice(0, 300))}
          placeholder="Ask anything specific — what month is best for kids, road condition in March, where to refill water bottles..."
          rows={3}
          minLength={30}
          maxLength={300}
          className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
        />
        <p className="text-xs text-muted-foreground mt-1 text-right tabular-nums">
          {question.length}/300
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="text-sm text-muted-foreground block mb-2">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            <option value="">Select category…</option>
            {CATEGORIES.map((c) => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-sm text-muted-foreground block mb-2">Traveler type (optional)</label>
          <select
            value={travelerType}
            onChange={(e) => setTravelerType(e.target.value)}
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            <option value="">Any</option>
            {TRAVELER_TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="text-sm text-muted-foreground block mb-2">Name (optional)</label>
          <input
            type="text"
            value={submitterName}
            onChange={(e) => setSubmitterName(e.target.value.slice(0, 120))}
            placeholder="Shown on the public page if used"
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
        <div>
          <label className="text-sm text-muted-foreground block mb-2">Email (optional)</label>
          <input
            type="email"
            value={submitterEmail}
            onChange={(e) => setSubmitterEmail(e.target.value.slice(0, 320))}
            placeholder="Editors may follow up if anything is unclear"
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
      </div>

      {error && <p className="text-sm text-red-400" role="alert">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50"
      >
        {loading ? "Submitting…" : "Submit question"}
      </button>
    </form>
  );
}
