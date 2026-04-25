"use client";

import { useEffect, useState, useCallback } from "react";

type Review = {
  id: string;
  destination_id: string;
  rating: number;
  text: string;
  traveler_type: string;
  visit_month: number | null;
  visit_year: number | null;
  reporter_name: string | null;
  reporter_email: string | null;
  status: "pending" | "approved" | "rejected";
  moderator_note: string | null;
  submitted_at: string;
  destination: { name: string; state: { name: string } | { name: string }[] | null } | null;
};

const MONTHS = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function AdminReviewsClient() {
  const [keyInput, setKeyInput] = useState("");
  const [adminKey, setAdminKey] = useState<string | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<"pending" | "approved" | "rejected" | "all">("pending");

  useEffect(() => {
    const stored = typeof window !== "undefined" ? sessionStorage.getItem("adminKey") : null;
    if (stored) setAdminKey(stored);
  }, []);

  const fetchReviews = useCallback(async () => {
    if (!adminKey) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/reviews?status=${filter}`, {
        headers: { authorization: `Bearer ${adminKey}` },
      });
      if (res.status === 401) {
        setError("Wrong key.");
        sessionStorage.removeItem("adminKey");
        setAdminKey(null);
        return;
      }
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Fetch failed");
        return;
      }
      setReviews(data.reviews ?? []);
    } catch {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  }, [adminKey, filter]);

  useEffect(() => {
    if (adminKey) void fetchReviews();
  }, [adminKey, filter, fetchReviews]);

  async function moderate(id: string, action: "approve" | "reject") {
    if (!adminKey) return;
    const res = await fetch("/api/admin/reviews", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${adminKey}`,
      },
      body: JSON.stringify({ id, action }),
    });
    if (res.ok) await fetchReviews();
    else setError(`Moderation failed: ${res.status}`);
  }

  if (!adminKey) {
    return (
      <div className="mx-auto max-w-md px-4 py-20">
        <h1 className="text-2xl font-semibold mb-4">Reviews — moderation</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (keyInput.trim()) {
              sessionStorage.setItem("adminKey", keyInput.trim());
              setAdminKey(keyInput.trim());
            }
          }}
          className="space-y-3"
        >
          <input
            type="password"
            value={keyInput}
            onChange={(e) => setKeyInput(e.target.value)}
            placeholder="Admin key"
            className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm focus:border-primary focus:outline-none"
            autoFocus
          />
          <button
            type="submit"
            className="rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Unlock
          </button>
          {error && <p className="text-xs text-red-400">{error}</p>}
        </form>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="flex items-baseline justify-between gap-3 mb-6 flex-wrap">
        <h1 className="text-3xl font-semibold">Reviews</h1>
        <div className="flex gap-2">
          {(["pending", "approved", "rejected", "all"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`rounded-full border px-3 py-1 text-xs font-medium ${filter === s ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:text-foreground"}`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {loading && <p className="text-sm text-muted-foreground">Loading…</p>}
      {error && <p className="text-sm text-red-400 mb-4">{error}</p>}

      {reviews.length === 0 && !loading && (
        <p className="text-sm text-muted-foreground">No {filter === "all" ? "" : filter} reviews.</p>
      )}

      <div className="space-y-4">
        {reviews.map((r) => {
          const dest = r.destination;
          const stateName = Array.isArray(dest?.state) ? dest?.state[0]?.name : dest?.state?.name;
          return (
            <article key={r.id} className="rounded-2xl border border-border bg-card/40 p-5">
              <div className="flex items-baseline justify-between gap-3 flex-wrap mb-2">
                <div className="flex items-baseline gap-2 flex-wrap">
                  <span className="rounded-full border border-border bg-background/40 px-2 py-0.5 font-mono text-[10px] tracking-[0.08em] uppercase">
                    {r.rating}/5
                  </span>
                  <h2 className="font-semibold">{dest?.name ?? r.destination_id}</h2>
                  <span className="text-xs text-muted-foreground">{stateName}</span>
                  <span className="rounded-full border border-border bg-background/40 px-2 py-0.5 text-[10px] uppercase tracking-[0.08em] text-muted-foreground">
                    {r.traveler_type}
                  </span>
                </div>
                {r.visit_month && r.visit_year && (
                  <span className="text-xs text-muted-foreground tabular-nums">
                    visited {MONTHS[r.visit_month]} {r.visit_year}
                  </span>
                )}
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap mb-3">{r.text}</p>

              <div className="text-xs text-muted-foreground mb-3">
                — {r.reporter_name || "Anonymous"}
                {r.reporter_email && (
                  <>
                    {" · "}
                    <a href={`mailto:${r.reporter_email}`} className="underline">{r.reporter_email}</a>
                  </>
                )}
                {" · submitted "}
                {new Date(r.submitted_at).toLocaleDateString()}
              </div>

              {r.status === "pending" ? (
                <div className="flex gap-2">
                  <button
                    onClick={() => moderate(r.id, "approve")}
                    className="rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 px-4 py-1.5 text-xs font-medium hover:bg-emerald-500/30 transition-colors"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => moderate(r.id, "reject")}
                    className="rounded-full bg-rose-500/20 border border-rose-500/30 text-rose-300 px-4 py-1.5 text-xs font-medium hover:bg-rose-500/30 transition-colors"
                  >
                    Reject
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className={`rounded-full border px-2 py-0.5 font-mono text-[10px] tracking-[0.08em] uppercase ${r.status === "approved" ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300" : "border-rose-500/30 bg-rose-500/10 text-rose-300"}`}>
                    {r.status}
                  </span>
                  {r.status === "approved" && (
                    <button
                      onClick={() => moderate(r.id, "reject")}
                      className="underline hover:text-foreground"
                    >
                      un-approve (reject)
                    </button>
                  )}
                  {r.status === "rejected" && (
                    <button
                      onClick={() => moderate(r.id, "approve")}
                      className="underline hover:text-foreground"
                    >
                      un-reject (approve)
                    </button>
                  )}
                </div>
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
}
