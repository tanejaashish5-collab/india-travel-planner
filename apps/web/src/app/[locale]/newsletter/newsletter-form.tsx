"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !email.includes("@")) return;

    setStatus("loading");
    setErrorMsg("");

    try {
      const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
      if (!url || !key) throw new Error("Not configured");

      const supabase = createClient(url, key);
      const { error } = await supabase
        .from("newsletter_subscribers")
        .insert({ email: email.toLowerCase().trim(), source: "website" });

      if (error) {
        if (error.code === "23505") {
          // Duplicate — already subscribed
          setStatus("success");
          return;
        }
        throw error;
      }

      setStatus("success");
    } catch (err: any) {
      setStatus("error");
      setErrorMsg("Something went wrong. Try again or email us directly.");
    }
  }

  if (status === "success") {
    return (
      <div className="py-4">
        <p className="text-lg font-semibold text-primary">You're in.</p>
        <p className="text-sm text-muted-foreground mt-1">
          First edition arrives Sunday morning. Welcome to The Window.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        required
        className="flex-1 rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50 whitespace-nowrap"
      >
        {status === "loading" ? "Subscribing..." : "Subscribe"}
      </button>
      {status === "error" && (
        <p className="text-xs text-red-400 mt-1 sm:mt-0">{errorMsg}</p>
      )}
    </form>
  );
}
