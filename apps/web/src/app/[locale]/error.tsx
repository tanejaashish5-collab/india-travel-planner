"use client";

import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-lg text-center space-y-6">
        <div className="relative">
          <div className="text-[100px] font-mono font-black text-muted-foreground/10 leading-none select-none">
            ERR
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-5xl">⛈️</div>
          </div>
        </div>
        <h2 className="text-3xl font-bold">Hit a roadblock</h2>
        <p className="text-muted-foreground leading-relaxed max-w-md mx-auto">
          Something went wrong loading this page. Mountain roads are unpredictable — so is software sometimes.
        </p>
        {error.message && (
          <p className="text-xs text-muted-foreground/60 font-mono bg-muted/30 rounded-lg px-4 py-2 max-w-md mx-auto">
            {error.message}
          </p>
        )}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={reset}
            className="rounded-full bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 hover:-translate-y-0.5 transition-all duration-200 shadow-lg"
          >
            Try again
          </button>
          <Link
            href="/en"
            className="rounded-full border border-border px-8 py-3 text-sm font-semibold hover:bg-muted transition-all duration-200"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}
