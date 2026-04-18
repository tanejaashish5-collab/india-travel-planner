"use client";

import { useEffect, useState } from "react";
import { GapYearForm } from "./gap-year-form";
import { GapYearTimeline } from "./gap-year-timeline";
import { GapYearBudgetRollup } from "./gap-year-budget-rollup";
import { saveLocal, loadLocal, saveToSupabase, clearLocal } from "@/lib/gap-year/client";
import { getAuthClient } from "@/lib/auth";
import type { GapYearInput, GapYearPlan } from "@/lib/gap-year/types";

interface Props {
  locale: string;
}

export function GapYearPageClient({ locale }: Props) {
  const [plan, setPlan] = useState<GapYearPlan | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [shareUrl, setShareUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Restore from localStorage on first load
  useEffect(() => {
    const cached = loadLocal();
    if (cached) setPlan(cached);
  }, []);

  // Autosave to localStorage on every plan change
  useEffect(() => {
    if (plan) saveLocal(plan);
  }, [plan]);

  async function generate(input: GapYearInput) {
    setLoading(true);
    setError(null);
    setShareUrl(null);
    try {
      const res = await fetch("/api/gap-year/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || `Request failed (${res.status})`);
      }
      const data = await res.json();
      setPlan(data.plan);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  async function save() {
    if (!plan) return;
    setSaving(true);
    setError(null);
    try {
      const supabase = getAuthClient();
      const { data: session } = await supabase.auth.getSession();
      if (!session.session?.user) {
        setError("Sign in to save your plan and get a shareable link.");
        setSaving(false);
        return;
      }

      const { shareToken } = await saveToSupabase(plan);
      if (shareToken) {
        const url = `${window.location.origin}/${locale}/gap-year/${shareToken}`;
        setShareUrl(url);
      }
    } catch (err: any) {
      setError(err.message || "Failed to save plan");
    } finally {
      setSaving(false);
    }
  }

  function reset() {
    clearLocal();
    setPlan(null);
    setShareUrl(null);
    setError(null);
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      {!plan && (
        <>
          <header className="mb-8 text-center">
            <h1 className="text-4xl font-bold text-foreground">The Gap Year Planner</h1>
            <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
              3–12 months across India, planned month by month. Real scoring, real data —
              you pick the shape.
            </p>
          </header>
          <div className="rounded-2xl border border-border bg-card p-6 md:p-8 shadow-sm">
            <GapYearForm onSubmit={generate} loading={loading} />
          </div>
        </>
      )}

      {loading && !plan && (
        <div className="mt-8 text-center text-muted-foreground">
          <div className="animate-pulse">Thinking about your months…</div>
          <p className="text-xs mt-2">This takes ~10–30 seconds.</p>
        </div>
      )}

      {error && (
        <div className="mt-4 rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
          {error}
        </div>
      )}

      {plan && (
        <div className="space-y-6">
          {(() => {
            const failed = plan.months.filter((m) => m.error).length;
            const total = plan.months.length;
            if (failed === 0) return null;
            if (failed === total) {
              return (
                <div className="rounded-lg border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive">
                  <div className="font-semibold mb-1">Generation failed for every month.</div>
                  <p className="text-foreground/80">
                    The AI service is temporarily unavailable. Try "Start over" in a few minutes,
                    or hit "Regenerate" on individual months once it recovers.
                  </p>
                </div>
              );
            }
            return (
              <div className="rounded-lg border border-amber-500/40 bg-amber-500/10 p-4 text-sm">
                <div className="font-semibold mb-1 text-amber-500">
                  {failed} of {total} months didn't generate.
                </div>
                <p className="text-foreground/80">
                  Hit "Regenerate" on the empty months to fill them in.
                </p>
              </div>
            );
          })()}

          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div>
              <h2 className="text-sm text-muted-foreground">Your gap year</h2>
            </div>
            <div className="flex gap-2">
              <button
                onClick={reset}
                className="px-4 py-2 rounded-lg border border-border text-foreground hover:bg-muted text-sm transition"
              >
                Start over
              </button>
              <button
                onClick={save}
                disabled={saving}
                className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 text-sm disabled:opacity-50 transition"
              >
                {saving ? "Saving…" : "Save & share"}
              </button>
            </div>
          </div>

          {shareUrl && (
            <div className="rounded-lg border border-primary/30 bg-primary/10 p-4 text-sm">
              <div className="font-semibold mb-1 text-foreground">Shareable link</div>
              <div className="flex gap-2">
                <input
                  readOnly
                  value={shareUrl}
                  className="flex-1 rounded border border-border bg-background px-2 py-1 text-xs text-foreground"
                />
                <button
                  onClick={() => navigator.clipboard.writeText(shareUrl)}
                  className="px-3 py-1 rounded bg-primary text-primary-foreground text-xs hover:bg-primary/90"
                >
                  Copy
                </button>
              </div>
            </div>
          )}

          <GapYearTimeline plan={plan} locale={locale} onPlanChange={setPlan} />
          <GapYearBudgetRollup plan={plan} />
        </div>
      )}
    </div>
  );
}
