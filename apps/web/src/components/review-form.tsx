"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { getAuthClient, getSession } from "@/lib/auth";
import { AuthModal } from "./auth-modal";

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

const YEARS = Array.from({ length: 7 }, (_, i) => 2020 + i);

export function ReviewForm({ destinationId }: { destinationId: string }) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [travelerType, setTravelerType] = useState("");
  const [visitMonth, setVisitMonth] = useState("");
  const [visitYear, setVisitYear] = useState("");
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [checkedAuth, setCheckedAuth] = useState(false);
  const [showAuth, setShowAuth] = useState(false);

  // Check auth on mount-ish (lazy)
  async function checkAuth() {
    if (checkedAuth) return userId;
    const { data } = await getSession();
    const uid = data.session?.user?.id ?? null;
    setUserId(uid);
    setCheckedAuth(true);
    return uid;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const uid = await checkAuth();
    if (!uid) {
      setShowAuth(true);
      return;
    }

    if (rating === 0) { setError("Please select a star rating."); return; }
    if (text.length < 10) { setError("Review must be at least 10 characters."); return; }
    if (!travelerType) { setError("Please select your traveler type."); return; }

    setLoading(true);
    try {
      const supabase = getAuthClient();
      const { error: insertError } = await supabase.from("reviews").insert({
        destination_id: destinationId,
        user_id: uid,
        rating,
        text,
        traveler_type: travelerType,
        visit_month: visitMonth ? parseInt(visitMonth) : null,
        visit_year: visitYear ? parseInt(visitYear) : null,
        status: "pending",
      });

      if (insertError) throw insertError;
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || "Failed to submit review. Please try again.");
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
        <p className="text-emerald-400 font-semibold">Your review has been submitted and is pending approval.</p>
        <p className="text-sm text-muted-foreground mt-1">Thank you for sharing your experience!</p>
      </motion.div>
    );
  }

  const displayRating = hoverRating || rating;

  return (
    <>
      <AuthModal
        open={showAuth}
        onClose={() => setShowAuth(false)}
        onSuccess={async () => {
          const { data } = await getSession();
          setUserId(data.session?.user?.id ?? null);
          setCheckedAuth(true);
        }}
      />

      <form onSubmit={handleSubmit} className="rounded-xl border border-border bg-card p-6 space-y-5">
        <h3 className="text-lg font-bold">Write a Review</h3>

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
                  {star <= displayRating ? "\u2605" : "\u2606"}
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

        {/* Text area */}
        <div>
          <label className="text-sm text-muted-foreground block mb-2">Your experience</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value.slice(0, 2000))}
            placeholder="Share what you loved, what surprised you, and any tips for future travelers..."
            rows={4}
            minLength={10}
            maxLength={2000}
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
          />
          <p className="text-xs text-muted-foreground mt-1 text-right">
            {text.length}/2000
          </p>
        </div>

        {error && <p className="text-sm text-red-400">{error}</p>}

        {!checkedAuth || !userId ? (
          <button
            type="button"
            onClick={() => setShowAuth(true)}
            className="w-full rounded-xl border border-primary/50 py-3 text-sm font-semibold text-primary hover:bg-primary/10 transition-colors"
          >
            Sign in to write a review
          </button>
        ) : (
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Submit Review"}
          </button>
        )}
      </form>
    </>
  );
}
