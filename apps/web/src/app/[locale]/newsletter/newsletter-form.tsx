"use client";

import { useState } from "react";

// Resolve the analytics source: a `?src=` query param wins over the prop
// default, so we can attribute which surface drove the visit to /newsletter
// (e.g. the sticky tray links here with ?src=sticky-tray). Sanitised to a
// short slug. Read off window.location — no useSearchParams, so the page
// stays statically rendered.
function resolveSource(fallback: string): string {
  if (typeof window === "undefined") return fallback;
  try {
    const v = new URLSearchParams(window.location.search).get("src");
    if (v) {
      const clean = v.slice(0, 50).replace(/[^a-zA-Z0-9_-]/g, "");
      if (clean) return clean;
    }
  } catch {
    /* ignore */
  }
  return fallback;
}

export function NewsletterForm({ source = "website" }: { source?: string } = {}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [hint, setHint] = useState("");
  const [resolvedSource] = useState(() => resolveSource(source));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setHint("Enter a valid email address.");
      return;
    }

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.toLowerCase().trim(), source: resolvedSource }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setErrorMsg(data?.error || "Something went wrong. Try again.");
        setStatus("error");
        return;
      }

      // Suppress the sticky tray for the rest of the session — this reader
      // has already been asked and answered.
      try {
        window.sessionStorage?.setItem("nq_newsletter_submitted", "1");
      } catch {
        /* ignore */
      }
      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Try again or email us directly.");
    }
  }

  if (status === "success") {
    return (
      <div className="py-4">
        <p className="text-lg font-semibold text-primary">Almost there — check your inbox.</p>
        <p className="text-sm text-muted-foreground mt-1">
          We&apos;ve sent a confirmation link to {email}. Click it to complete your
          subscription — The Window won&apos;t arrive until you do.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 max-w-md mx-auto">
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (hint) setHint("");
            if (status === "error") setStatus("idle");
          }}
          onBlur={() => {
            setHint(email && !email.includes("@") ? "Enter a valid email address." : "");
          }}
          placeholder="your@email.com"
          required
          aria-invalid={hint ? true : undefined}
          className="flex-1 rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="group inline-flex items-center justify-center gap-1.5 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50 whitespace-nowrap"
        >
          {status === "loading" ? "Subscribing…" : "Subscribe"}
          {status !== "loading" && (
            <span
              aria-hidden
              className="transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none"
            >
              →
            </span>
          )}
        </button>
      </div>
      {hint && <p className="text-xs text-amber-400">{hint}</p>}
      {status === "error" && <p className="text-xs text-red-400">{errorMsg}</p>}
    </form>
  );
}
