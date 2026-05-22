"use client";

import { useState } from "react";
import { KEY_EVENTS, track } from "@/lib/analytics";

// Subtle cinematic newsletter slot — single-line editorial form.
// Posts to the same /api/newsletter/subscribe endpoint that the production
// NewsletterSignup uses. Mono caps + hairline border + vermillion accents.
// No shadcn cards / no chunky buttons / no headlines — just one line.
export function CinematicNewsletter({
  source = "cinematic-coda",
}: {
  source?: string;
}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [hint, setHint] = useState("");
  const [btnHover, setBtnHover] = useState(false);
  // Hover arrow-nudge is gated on the reduced-motion preference.
  const [reduceMotion] = useState(
    () =>
      typeof window !== "undefined" &&
      !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches,
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setErrorMsg("Enter a valid email.");
      setStatus("error");
      return;
    }
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          source,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error || "Something went wrong. Try again.");
        setStatus("error");
        return;
      }
      track(KEY_EVENTS.EMAIL_SIGNUP, { source });
      // Suppress the sticky tray for the rest of the session — this reader
      // has already been asked and answered.
      try {
        window.sessionStorage?.setItem("nq_newsletter_submitted", "1");
      } catch {
        /* ignore */
      }
      setStatus("success");
      setEmail("");
    } catch {
      setErrorMsg("Network error. Try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <p
        className="nq-mono"
        style={{
          textAlign: "center",
          fontSize: 11,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: "var(--vermillion)",
          marginTop: 40,
          marginBottom: 32,
          maxWidth: 520,
          marginInline: "auto",
          background: "rgba(10, 10, 8, 0.78)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          border: "1px solid var(--hair)",
          borderRadius: 4,
          padding: "22px 30px",
        }}
      >
        ✓ Almost there — open the email we just sent and tap confirm. The
        Window won&apos;t arrive until you do.
      </p>
    );
  }

  return (
    <div
      style={{
        marginTop: 40,
        marginBottom: 32,
        maxWidth: 520,
        marginInline: "auto",
        // Local dark scrim — the Coda is a full-bleed photo with only a
        // light radial veil, so the faint editorial form is invisible over
        // bright frames. This panel guarantees contrast regardless of the
        // image behind, without reading as a chunky shadcn card.
        background: "rgba(10, 10, 8, 0.78)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        border: "1px solid var(--hair)",
        borderRadius: 4,
        padding: "26px 30px",
      }}
    >
      <p
        className="nq-mono"
        style={{
          textAlign: "center",
          fontSize: 10,
          letterSpacing: "0.26em",
          textTransform: "uppercase",
          color: "var(--bone-dim)",
          marginBottom: 14,
        }}
      >
        The Window · the only travel newsletter we send
      </p>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 0,
          borderBottom: "1px solid var(--bone-faint)",
          transition: "border-color 200ms ease",
        }}
        onFocus={(e) => {
          (e.currentTarget as HTMLFormElement).style.borderBottomColor =
            "var(--vermillion)";
        }}
        onBlur={(e) => {
          (e.currentTarget as HTMLFormElement).style.borderBottomColor =
            "var(--bone-faint)";
        }}
      >
        <input
          type="email"
          required
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === "error") {
              setStatus("idle");
              setErrorMsg("");
            }
          }}
          placeholder="your.email@example.com"
          aria-label="Email address"
          style={{
            flex: 1,
            background: "transparent",
            border: "none",
            outline: "none",
            color: "var(--bone)",
            fontFamily: "var(--cinema-mono, ui-monospace)",
            fontSize: 13,
            letterSpacing: "0.04em",
            padding: "12px 0",
            minWidth: 0,
          }}
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="nq-mono"
          style={{
            background: "transparent",
            border: "none",
            color: "var(--vermillion)",
            fontSize: 11,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            padding: "12px 4px 12px 14px",
            cursor: status === "loading" ? "wait" : "pointer",
            opacity: status === "loading" ? 0.6 : 1,
          }}
        >
          {status === "loading" ? "Sending…" : "Subscribe →"}
        </button>
      </form>
      {status === "error" && errorMsg && (
        <p
          className="nq-mono"
          style={{
            marginTop: 8,
            fontSize: 10,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--vermillion)",
            textAlign: "center",
          }}
        >
          {errorMsg}
        </p>
      )}
    </div>
  );
}
