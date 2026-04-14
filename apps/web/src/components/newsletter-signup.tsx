"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { FadeIn } from "./animated-hero";

// Singleton Supabase client to avoid multiple GoTrueClient instances
let _supabase: ReturnType<typeof createClient> | null = null;
function getSupabase() {
  if (_supabase) return _supabase;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  _supabase = createClient(url, key);
  return _supabase;
}

/**
 * Newsletter signup component.
 *
 * Saves email to Supabase `newsletter_subscribers` table.
 * If the table doesn't exist, create it with this migration:
 *
 *   CREATE TABLE IF NOT EXISTS newsletter_subscribers (
 *     id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
 *     email text UNIQUE NOT NULL,
 *     subscribed_at timestamptz DEFAULT now()
 *   );
 */
export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setErrorMsg("Please enter a valid email address.");
      setStatus("error");
      return;
    }

    setStatus("loading");
    setErrorMsg("");

    try {
      const supabase = getSupabase();
      if (!supabase) {
        setErrorMsg("Subscription service is temporarily unavailable.");
        setStatus("error");
        return;
      }
      const { error } = await supabase
        .from("newsletter_subscribers")
        .insert({ email: email.trim().toLowerCase() } as never);

      if (error) {
        if (error.code === "23505") {
          // Unique constraint violation — already subscribed
          setStatus("success");
          return;
        }
        setErrorMsg("Something went wrong. Please try again.");
        setStatus("error");
        return;
      }

      setStatus("success");
    } catch {
      setErrorMsg("Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <FadeIn>
        <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-8 text-center">
          <div className="text-3xl mb-3">{"\u2705"}</div>
          <p className="text-lg font-bold text-emerald-400">You are in.</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Best destinations for next month, delivered once. No spam.
          </p>
        </div>
      </FadeIn>
    );
  }

  return (
    <FadeIn>
      <div className="rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/5 via-card to-primary/5 p-8">
        <div className="text-center max-w-md mx-auto">
          <h3 className="text-xl font-bold">Monthly Travel Intelligence</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Best destinations for next month. Delivered once. No spam.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (status === "error") setStatus("idle");
              }}
              placeholder="your@email.com"
              required
              className="flex-1 rounded-lg border border-border bg-background px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              disabled={status === "loading"}
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="shrink-0 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === "loading" ? "..." : "Subscribe"}
            </button>
          </form>

          {status === "error" && errorMsg && (
            <p className="mt-3 text-sm text-red-400">{errorMsg}</p>
          )}

          <p className="mt-4 text-xs text-muted-foreground/60">
            One email per month. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </FadeIn>
  );
}
