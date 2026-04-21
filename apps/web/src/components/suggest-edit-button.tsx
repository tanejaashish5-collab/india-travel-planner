"use client";

import { useState } from "react";

type Props = {
  targetTable: string;
  targetId?: string | null;
  context?: string | null;
  /** Visual variant. `link` matches footer-link aesthetic; `inline` is a small chip. */
  variant?: "link" | "inline";
};

export function SuggestEditButton({ targetTable, targetId, context, variant = "link" }: Props) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [suggested, setSuggested] = useState("");
  const [email, setEmail] = useState("");
  const [hp, setHp] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!message.trim() && !suggested.trim()) {
      setError("Please describe what's wrong or paste the correct version.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/suggestions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          target_table: targetTable,
          target_id: targetId ?? null,
          message: message.trim() || null,
          suggested_value: suggested.trim() || null,
          submitter_email: email.trim() || null,
          hp,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        if (data.error === "too_many") setError("Too many submissions from this network. Try again in an hour.");
        else setError("Couldn't send. Please try again.");
        setLoading(false);
        return;
      }
      setDone(true);
      setLoading(false);
    } catch {
      setError("Network error. Please try again.");
      setLoading(false);
    }
  }

  const triggerClass =
    variant === "inline"
      ? "text-xs text-muted-foreground/60 hover:text-[#E55642] underline underline-offset-2 decoration-dotted transition-colors"
      : "text-sm text-muted-foreground/70 hover:text-foreground hover:translate-x-1 transition-all duration-200 block";

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={triggerClass}>
        Suggest an edit
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={() => !loading && setOpen(false)}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <div
            className="relative w-full max-w-lg rounded-2xl border border-border/60 bg-card shadow-2xl p-6"
            onClick={(e) => e.stopPropagation()}
          >
            {done ? (
              <div className="text-center py-6">
                <div className="text-2xl mb-2">✓</div>
                <h3 className="font-fraunces text-xl mb-2">Thank you</h3>
                <p className="text-sm text-muted-foreground">
                  We read every suggestion. If you left an email, we may follow up.
                </p>
                <button
                  onClick={() => {
                    setOpen(false);
                    setDone(false);
                    setMessage("");
                    setSuggested("");
                    setEmail("");
                  }}
                  className="mt-4 text-sm text-[#E55642] hover:underline"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-4">
                <div>
                  <h3 className="font-fraunces text-xl">Suggest an edit</h3>
                  {context && (
                    <p className="text-xs text-muted-foreground mt-1">Editing: {context}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1">
                    What&apos;s wrong or out of date?
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={3}
                    maxLength={2000}
                    placeholder="e.g. The prepaid taxi fare to city centre is now ₹650, not ₹450."
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1">
                    Correct version (optional)
                  </label>
                  <textarea
                    value={suggested}
                    onChange={(e) => setSuggested(e.target.value)}
                    rows={2}
                    maxLength={2000}
                    placeholder="What it should say."
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1">
                    Your email, if you want a reply (optional)
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none"
                  />
                </div>

                {/* Honeypot — real users never see it */}
                <input
                  type="text"
                  name="website"
                  value={hp}
                  onChange={(e) => setHp(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                  className="absolute -left-[9999px]"
                  aria-hidden="true"
                />

                {error && (
                  <p className="text-sm text-[#E55642]">{error}</p>
                )}

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    disabled={loading}
                    className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="rounded-lg bg-[#E55642] px-4 py-2 text-sm font-medium text-white hover:bg-[#E55642]/90 disabled:opacity-50"
                  >
                    {loading ? "Sending..." : "Send"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
