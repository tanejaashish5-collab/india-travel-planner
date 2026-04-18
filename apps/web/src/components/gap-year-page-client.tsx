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
            <h1 className="text-4xl font-bold">The Gap Year Planner</h1>
            <p className="mt-3 text-gray-600 max-w-xl mx-auto">
              3–12 months across India, planned month by month. Real scoring, real data —
              you pick the shape.
            </p>
          </header>
          <div className="rounded-2xl border bg-white p-6 md:p-8 shadow-sm">
            <GapYearForm onSubmit={generate} loading={loading} />
          </div>
        </>
      )}

      {loading && !plan && (
        <div className="mt-8 text-center text-gray-600">
          <div className="animate-pulse">Thinking about your {/* filled */} months…</div>
          <p className="text-xs mt-2">This takes ~10–30 seconds.</p>
        </div>
      )}

      {error && (
        <div className="mt-4 rounded-lg bg-red-50 border border-red-200 p-4 text-sm text-red-800">
          {error}
        </div>
      )}

      {plan && (
        <div className="space-y-6">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div>
              <h2 className="text-sm text-gray-600">Your gap year</h2>
            </div>
            <div className="flex gap-2">
              <button
                onClick={reset}
                className="px-4 py-2 rounded-lg border hover:bg-gray-50 text-sm"
              >
                Start over
              </button>
              <button
                onClick={save}
                disabled={saving}
                className="px-4 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 text-sm disabled:bg-gray-400"
              >
                {saving ? "Saving…" : "Save & share"}
              </button>
            </div>
          </div>

          {shareUrl && (
            <div className="rounded-lg border border-emerald-300 bg-emerald-50 p-4 text-sm">
              <div className="font-semibold mb-1">Shareable link</div>
              <div className="flex gap-2">
                <input
                  readOnly
                  value={shareUrl}
                  className="flex-1 border rounded px-2 py-1 bg-white text-xs"
                />
                <button
                  onClick={() => navigator.clipboard.writeText(shareUrl)}
                  className="px-3 py-1 rounded bg-emerald-600 text-white text-xs"
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
