"use client";

import { useState } from "react";
import Link from "next/link";

type Props = {
  destination_id: string;
  destination_name: string;
  state_name: string | null;
  locale: string;
};

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const YEARS = [2024, 2025, 2026];

export function TripReportForm({ destination_id, destination_name, state_name, locale }: Props) {
  const [month, setMonth] = useState<number>(new Date().getMonth() + 1);
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [rating, setRating] = useState<number>(4);
  const [summary, setSummary] = useState("");
  const [body, setBody] = useState("");
  const [reporterName, setReporterName] = useState("");
  const [reporterEmail, setReporterEmail] = useState("");
  const [reporterLocation, setReporterLocation] = useState("");
  const [hp, setHp] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (summary.length < 10) { setError("Summary needs at least 10 characters."); return; }
    if (summary.length > 200) { setError("Summary max 200 characters."); return; }
    if (body.length < 100) { setError("Report needs at least 100 characters."); return; }
    if (body.length > 5000) { setError("Report max 5000 characters."); return; }

    setLoading(true);
    try {
      const res = await fetch("/api/trip-reports", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          destination_id,
          visited_month: month,
          visited_year: year,
          rating,
          summary,
          body,
          reporter_name: reporterName.trim() || null,
          reporter_email: reporterEmail.trim() || null,
          reporter_location: reporterLocation.trim() || null,
          hp,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        const msg =
          data.error === "too_many"     ? "Too many reports from this network. Try again in an hour." :
          data.error === "summary_length" ? "Summary needs to be between 10 and 200 characters." :
          data.error === "body_length"  ? "Report needs to be between 100 and 5000 characters." :
          data.error === "invalid_email" ? "That email doesn't look valid." :
          "Something went wrong. Please try again.";
        setError(msg);
        setLoading(false);
        return;
      }
      setDone(true);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (done) {
    return (
      <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-6">
        <p className="text-sm font-medium text-emerald-400 mb-1">Report received. Thank you.</p>
        <p className="text-sm text-muted-foreground mb-3">
          A NakshIQ editor will review and publish within 2–5 working days. You'll see it under
          "Travelers report" on the {destination_name} page once it's live.
        </p>
        <Link
          href={`/${locale}/destination/${destination_id}`}
          className="text-sm font-medium text-primary underline underline-offset-4"
        >
          Back to {destination_name} →
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="rounded-2xl border border-border bg-card/40 p-6 space-y-5">
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        value={hp}
        onChange={(e) => setHp(e.target.value)}
        style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
        aria-hidden="true"
      />

      {/* When you went + rating */}
      <div className="grid gap-3 sm:grid-cols-3">
        <div>
          <label htmlFor="tr-month" className="mb-1.5 block text-xs font-medium text-muted-foreground">
            Month you visited
          </label>
          <select id="tr-month" value={month} onChange={(e) => setMonth(Number(e.target.value))} className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm focus:border-primary focus:outline-none">
            {MONTHS.map((m, i) => <option key={m} value={i + 1}>{m}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="tr-year" className="mb-1.5 block text-xs font-medium text-muted-foreground">
            Year
          </label>
          <select id="tr-year" value={year} onChange={(e) => setYear(Number(e.target.value))} className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm focus:border-primary focus:outline-none">
            {YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="tr-rating" className="mb-1.5 block text-xs font-medium text-muted-foreground">
            Your rating (1–5)
          </label>
          <select id="tr-rating" value={rating} onChange={(e) => setRating(Number(e.target.value))} className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm focus:border-primary focus:outline-none">
            {[5, 4, 3, 2, 1].map((r) => <option key={r} value={r}>{r}/5 — {r === 5 ? "Exceeded" : r === 4 ? "Great" : r === 3 ? "Mixed" : r === 2 ? "Disappointing" : "Avoid"}</option>)}
          </select>
        </div>
      </div>

      {/* Summary */}
      <div>
        <label htmlFor="tr-summary" className="mb-1.5 block text-xs font-medium text-muted-foreground">
          One-line summary (10–200 chars)
        </label>
        <input
          id="tr-summary"
          type="text"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          placeholder={`e.g. "${destination_name} in ${MONTHS[month - 1]} was the clearest week I've had."`}
          maxLength={200}
          className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none"
          required
        />
        <p className="mt-1 text-right text-[10px] text-muted-foreground/60">{summary.length}/200</p>
      </div>

      {/* Body */}
      <div>
        <label htmlFor="tr-body" className="mb-1.5 block text-xs font-medium text-muted-foreground">
          Your report (100–5000 chars)
        </label>
        <textarea
          id="tr-body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={8}
          placeholder="What actually happened? What worked, what didn't, what would you tell a friend planning the same trip?"
          maxLength={5000}
          className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none"
          required
        />
        <p className="mt-1 text-right text-[10px] text-muted-foreground/60">{body.length}/5000</p>
      </div>

      {/* Reporter details */}
      <div className="grid gap-3 sm:grid-cols-3">
        <div>
          <label htmlFor="tr-name" className="mb-1.5 block text-xs font-medium text-muted-foreground">
            Your first name (shown)
          </label>
          <input
            id="tr-name"
            type="text"
            value={reporterName}
            onChange={(e) => setReporterName(e.target.value)}
            placeholder="Leave blank for anon"
            maxLength={120}
            className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm focus:border-primary focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="tr-location" className="mb-1.5 block text-xs font-medium text-muted-foreground">
            Where you're from (optional)
          </label>
          <input
            id="tr-location"
            type="text"
            value={reporterLocation}
            onChange={(e) => setReporterLocation(e.target.value)}
            placeholder="Bengaluru, India"
            maxLength={120}
            className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm focus:border-primary focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="tr-email" className="mb-1.5 block text-xs font-medium text-muted-foreground">
            Email (never shown)
          </label>
          <input
            id="tr-email"
            type="email"
            value={reporterEmail}
            onChange={(e) => setReporterEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm focus:border-primary focus:outline-none"
          />
        </div>
      </div>

      {error && <p className="text-xs text-red-400" role="alert">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Submitting…" : `Submit ${state_name ? `(${destination_name}, ${state_name})` : destination_name}`}
      </button>

      <p className="text-xs text-muted-foreground/80">
        By submitting, you grant NakshIQ permission to publish the summary, month, year, rating, and
        body under your provided display name. Corrections happen in the open; see our{" "}
        <Link href={`/${locale}/editorial-policy`} className="underline hover:text-primary">editorial policy</Link>.
      </p>
    </form>
  );
}
