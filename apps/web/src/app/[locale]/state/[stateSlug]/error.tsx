"use client";

import Link from "next/link";

export default function StateError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-semibold">Something went wrong</h2>
        <p className="text-muted-foreground">{error.message}</p>
        <div className="flex gap-3 justify-center">
          <button onClick={reset} className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
            Try again
          </button>
          <Link href="/en/states" className="rounded-lg border border-border px-4 py-2 text-sm font-medium">
            Browse all states
          </Link>
        </div>
      </div>
    </div>
  );
}
