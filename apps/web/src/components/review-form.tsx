"use client";

import { useState } from "react";
import { m as motion } from "framer-motion";

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

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const YEARS = Array.from({ length: 7 }, (_, i) => 2024 + i);

const ERROR_LABELS: Record<string, string> = {
  destination_required: "Destination missing — refresh and try again.",
  invalid_rating: "Please select a star rating.",
  text_length: "Review must be 50–2000 characters.",
  invalid_traveler_type: "Please pick a traveler type.",
  invalid_month: "Visit month is invalid.",
  invalid_year: "Visit year is invalid.",
  invalid_email: "Email looks invalid.",
  too_many: "You've submitted too many reviews recently. Try again in an hour.",
  destination_not_found: "We couldn't find that destination.",
  server_misconfigured: "Server can't process submissions right now. Try again in a minute.",
  invalid_json: "Submission was malformed. Please try again.",
};

export function ReviewForm({ destinationId }: { destinationId: string }) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [travelerType, setTravelerType] = useState("");
  const [visitMonth, setVisitMonth] = useState("");
  const [visitYear, setVisitYear] = useState("");
  const [text, setText] = useState("");
  const [reporterName, setReporterName] = useState("");
  const [reporterEmail, setReporterEmail] = useState("");
  const [hp, setHp] = useState(""); // honeypot
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (rating === 0) { setError(ERROR_LABELS.invalid_rating); return; }
    if (text.length < 50) { setError(ERROR_LABELS.text_length); return; }
    if (!travelerType) { setError(ERROR_LABELS.invalid_traveler_type); return; }

    setLoading(true);
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          destination_id: destinationId,
          rating,
          text,
          traveler_type: travelerType,
          visit_month: visitMonth ? Number(visitMonth) : null,
          visit_year: visitYear ? Number(visitYear) : null,
          reporter_name: reporterName.trim() || null,
          reporter_email: reporterEmail.trim() || null,
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
        <p className="text-emerald-400 font-semibold">Thanks — your review is in moderation.</p>
        <p className="text-sm text-muted-foreground mt-1">It usually takes a day or two for editors to review.</p>
      </motion.div>
    );
  }

  const displayRating = hoverRating || rating;

  return (
    <form onSubmit={handleSubmit} className="rounded-xl border border-border bg-card p-6 space-y-5">
      <h3 className="text-lg font-bold">Share your experience</h3>
      <p className="text-xs text-muted-foreground -mt-2">
        Anonymous submission — no login needed. Reviews are moderated before publication.
      </p>

      {/* Honeypot — bots fill this; humans never see it */}
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

      {/* Star rating */}
      <div>
        <label className="text-sm text-muted-foreground block mb-2">Your rating</label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              className="text-2xl transition-transform hover:scale-110 focus:outline-none"
              aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
            >
              <span className={star <= displayRating ? "text-amber-400" : "text-zinc-600"}>
                {star <= displayRating ? "★" : "☆"}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Traveler type */}
      <div>
        <label className="text-sm text-muted-foreground block mb-2">Traveler type</label>
        <select
          value={travelerType}
          onChange={(e) => setTravelerType(e.target.value)}
          className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
        >
          <option value="">Select type...</option>
          {TRAVELER_TYPES.map((t) => (
            <option key={t} value={t}>
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Visit month + year */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-sm text-muted-foreground block mb-2">Visit month</label>
          <select
            value={visitMonth}
            onChange={(e) => setVisitMonth(e.target.value)}
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            <option value="">Month...</option>
            {MONTHS.map((m, i) => (
              <option key={m} value={i + 1}>{m}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-sm text-muted-foreground block mb-2">Visit year</label>
          <select
            value={visitYear}
            onChange={(e) => setVisitYear(e.target.value)}
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            <option value="">Year...</option>
            {YEARS.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Optional name + email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="text-sm text-muted-foreground block mb-2">Name (optional)</label>
          <input
            type="text"
            value={reporterName}
            onChange={(e) => setReporterName(e.target.value.slice(0, 120))}
            placeholder="How you'd like the byline to read"
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
        <div>
          <label className="text-sm text-muted-foreground block mb-2">Email (optional)</label>
          <input
            type="email"
            value={reporterEmail}
            onChange={(e) => setReporterEmail(e.target.value.slice(0, 320))}
            placeholder="Editors may reply with follow-up questions"
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
      </div>

      {/* Text area */}
      <div>
        <label className="text-sm text-muted-foreground block mb-2">Your experience</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value.slice(0, 2000))}
          placeholder="Share what you loved, what surprised you, and any tips for future travelers... (50-2000 characters)"
          rows={5}
          minLength={50}
          maxLength={2000}
          className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
        />
        <p className="text-xs text-muted-foreground mt-1 text-right tabular-nums">
          {text.length}/2000
        </p>
      </div>

      {error && <p className="text-sm text-red-400" role="alert">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50"
      >
        {loading ? "Submitting..." : "Submit Review"}
      </button>
    </form>
  );
}
