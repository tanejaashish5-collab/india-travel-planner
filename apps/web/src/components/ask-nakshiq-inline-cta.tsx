"use client";

import { ASK_NAKSHIQ_OPEN_EVENT } from "./ask-nakshiq";

// Contextual entry point for Ask NakshIQ. Lives on detail pages (destinations,
// states, blogs) where a reader has just absorbed content and may have a
// follow-up question. Replaces the previous always-on float button so the
// chat is opened from intent rather than ambient noise.
export function AskNakshIQInlineCTA({ subject }: { subject?: string }) {
  return (
    <section className="mt-12 border-t border-border/50 pt-8">
      <button
        type="button"
        onClick={() => window.dispatchEvent(new Event(ASK_NAKSHIQ_OPEN_EVENT))}
        className="group w-full flex items-center gap-4 rounded-2xl border border-border bg-card px-5 py-4 text-left hover:border-primary/40 hover:bg-muted/40 transition-all"
        aria-label={subject ? `Ask NakshIQ about ${subject}` : "Ask NakshIQ"}
      >
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        </span>
        <span className="flex-1 min-w-0">
          <span className="block text-sm font-semibold text-foreground">
            {subject ? `Have questions about ${subject}?` : "Have a question?"}
          </span>
          <span className="block text-xs text-muted-foreground mt-0.5">
            Ask NakshIQ — answers cited from real destination data, not training-data guesses.
          </span>
        </span>
        <span className="hidden sm:inline-flex items-center gap-1 text-xs font-medium text-primary group-hover:translate-x-0.5 transition-transform">
          Ask <span aria-hidden>→</span>
        </span>
      </button>
    </section>
  );
}
