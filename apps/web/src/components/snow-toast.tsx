"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { fmtSnowDay } from "@/lib/snow-outlook-format";

type Quiet = { points: number; run_at: string };
type Toast = { count: number; names: { en: string; hi: string }[]; window_start: string; window_end: string; run_at: string | null };

/**
 * Landing-page toast: appears only while the snow outlook has at least one "likely" call
 * (never for "possible"), links to /snow, and stays dismissed for that same spell. The API
 * returns nothing when the forecast job is stale, and the toast re-checks the window and
 * the run time itself, so it cannot outlive the forecast it quotes.
 */
export function SnowToast({ locale }: { locale: string }) {
  const [toast, setToast] = useState<Toast | null>(null);
  const [quiet, setQuiet] = useState<Quiet | null>(null);
  const hi = locale === "hi";

  useEffect(() => {
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const run = () => {
      timer = setTimeout(async () => {
        try {
          const r = await fetch("/api/snow-toast");
          if (!r.ok) return;
          const body = (await r.json()) as { toast: Toast | null; quiet?: Quiet | null };
          if (cancelled) return;
          const t = body.toast;
          if (!t) {
            // No snow forecast: a quiet pointer to /snow, dismissible for a week.
            const q = body.quiet;
            if (!q || Date.now() - Date.parse(q.run_at) > 36 * 3600_000) return;
            try { const d = Number(localStorage.getItem("nq-snow-toast:quiet") ?? 0); if (Date.now() - d < 7 * 864e5) return; } catch { /* show it */ }
            setQuiet(q);
            return;
          }
          if (Date.parse(`${t.window_end}T23:59:59+05:30`) < Date.now()) return;
          if (!t.run_at || Date.now() - Date.parse(t.run_at) > 36 * 3600_000) return;
          try { if (localStorage.getItem(`nq-snow-toast:${t.window_start}:${t.window_end}`)) return; } catch { /* storage blocked: show it */ }
          setToast(t);
        } catch { /* offline or blocked: no toast */ }
      }, 2500);
    };
    if (document.readyState === "complete") run();
    else window.addEventListener("load", run, { once: true });
    return () => { cancelled = true; if (timer) clearTimeout(timer); window.removeEventListener("load", run); };
  }, []);

  if (!toast && quiet) {
    const dismissQuiet = () => {
      try { localStorage.setItem("nq-snow-toast:quiet", String(Date.now())); } catch { /* ignore */ }
      setQuiet(null);
    };
    return (
      <div role="status" className="fixed bottom-20 left-4 right-4 z-50 rounded-2xl border border-sky-400/30 bg-[#0b1626]/95 p-4 text-white shadow-2xl backdrop-blur sm:right-auto sm:max-w-sm md:bottom-6">
        <button type="button" onClick={dismissQuiet} aria-label={hi ? "बंद करें" : "Dismiss"} className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full text-white/60 hover:bg-white/10 hover:text-white">✕</button>
        <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-sky-300">{hi ? "बर्फ़ का अनुमान" : "Snow watch"}</p>
        <p className="mt-1.5 pr-6 text-sm leading-relaxed">
          {hi
            ? `अगले चार दिन हमारी ${quiet.points} जगहों में से कहीं भी बर्फ़ का अनुमान नहीं।`
            : `No snow forecast at any of the ${quiet.points} places we watch for the next four days.`}
        </p>
        <Link href={`/${locale}/snow`} onClick={dismissQuiet} className="mt-2 inline-block text-sm font-medium text-sky-300 underline underline-offset-2">
          {hi ? "बर्फ़ रडार और हाल की बर्फ़बारी →" : "Snow watch and recent snowfall →"}
        </Link>
      </div>
    );
  }
  if (!toast) return null;
  const rest = toast.count - toast.names.length;
  const names = toast.names.map((n) => (hi ? n.hi : n.en));
  const where = hi
    ? `${names.join(", ")}${rest > 0 ? ` और ${rest} जगहें` : ""}`
    : rest > 0 ? `${names.join(", ")} and ${rest} more` : names.join(" and ");
  const when = toast.window_start === toast.window_end
    ? fmtSnowDay(toast.window_start, locale)
    : `${fmtSnowDay(toast.window_start, locale)} – ${fmtSnowDay(toast.window_end, locale)}`;
  const dismiss = () => {
    try { localStorage.setItem(`nq-snow-toast:${toast.window_start}:${toast.window_end}`, "1"); } catch { /* ignore */ }
    setToast(null);
  };

  return (
    <div
      role="status"
      className="fixed bottom-20 left-4 right-4 z-50 rounded-2xl border border-sky-400/40 bg-[#0b1626]/95 p-4 text-white shadow-2xl backdrop-blur sm:right-auto sm:max-w-sm md:bottom-6"
    >
      <button
        type="button"
        onClick={dismiss}
        aria-label={hi ? "बंद करें" : "Dismiss"}
        className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full text-white/60 hover:bg-white/10 hover:text-white"
      >
        ✕
      </button>
      <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-sky-300">{hi ? "बर्फ़ का अनुमान" : "Snow watch"}</p>
      <p className="mt-1.5 pr-6 text-sm leading-relaxed">
        {hi ? `बर्फ़ संभावित: ${where}, ${when}।` : `Snow likely at ${where}, ${when}.`}
      </p>
      <p className="mt-1 text-xs text-white/60">{hi ? "पूर्वानुमान, ख़बर नहीं।" : "A forecast, not a report."}</p>
      <Link href={`/${locale}/snow`} onClick={dismiss} className="mt-2 inline-block text-sm font-medium text-sky-300 underline underline-offset-2">
        {hi ? "पूरा अनुमान देखें →" : "See the full forecast →"}
      </Link>
    </div>
  );
}
