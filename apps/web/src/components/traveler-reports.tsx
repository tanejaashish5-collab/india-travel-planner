import Link from "next/link";

export type TripReport = {
  id: string;
  destination_id: string;
  visited_month: number;
  visited_year: number;
  rating: number;
  summary: string;
  body: string;
  reporter_name: string | null;
  reporter_location: string | null;
  highlights: string[] | null;
  warnings: string[] | null;
  approved_at: string | null;
};

const MONTH_NAMES = [
  "", "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function ratingChipClass(rating: number): string {
  if (rating >= 5) return "border-emerald-500/30 bg-emerald-500/10 text-emerald-300";
  if (rating >= 4) return "border-emerald-500/20 bg-emerald-500/5 text-emerald-400";
  if (rating === 3) return "border-amber-500/30 bg-amber-500/10 text-amber-300";
  if (rating === 2) return "border-orange-500/30 bg-orange-500/10 text-orange-300";
  return "border-rose-500/30 bg-rose-500/10 text-rose-300";
}

export function TravelerReports({
  reports,
  destinationId,
  destinationName,
  locale,
}: {
  reports: TripReport[];
  destinationId: string;
  destinationName: string;
  locale: string;
}) {
  if (reports.length === 0) {
    // Empty state — invite submissions
    return (
      <section id="section-traveler-reports" className="scroll-mt-40">
        <h2 className="text-2xl font-semibold mb-4">Travelers report</h2>
        <div className="rounded-2xl border border-border bg-card/40 p-6">
          <p className="text-sm text-muted-foreground leading-relaxed mb-3">
            No traveler reports yet for {destinationName}. Have you visited? Your on-the-ground
            notes help every future traveler decide better.
          </p>
          <Link
            href={`/${locale}/destination/${destinationId}/share`}
            className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Share your trip
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section id="section-traveler-reports" className="scroll-mt-40">
      <div className="flex items-baseline justify-between gap-3 mb-4 flex-wrap">
        <h2 className="text-2xl font-semibold">Travelers report</h2>
        <Link
          href={`/${locale}/destination/${destinationId}/share`}
          className="text-sm font-medium text-primary hover:text-primary/80 underline underline-offset-4"
        >
          Share your trip →
        </Link>
      </div>

      <div className="space-y-4">
        {reports.map((r) => (
          <article key={r.id} className="rounded-2xl border border-border bg-card/40 p-5">
            <div className="flex items-baseline justify-between gap-3 flex-wrap mb-2">
              <div className="flex items-baseline gap-2 flex-wrap">
                <span className={`inline-block rounded-full border px-2 py-0.5 font-mono text-[10px] tracking-[0.08em] uppercase ${ratingChipClass(r.rating)}`}>
                  {r.rating}/5
                </span>
                <h3 className="text-base font-semibold">{r.summary}</h3>
              </div>
              <div className="text-xs text-muted-foreground tabular-nums">
                {MONTH_NAMES[r.visited_month]} {r.visited_year}
              </div>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">{r.body}</p>

            {(r.highlights && r.highlights.length > 0) || (r.warnings && r.warnings.length > 0) ? (
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {r.highlights && r.highlights.length > 0 && (
                  <div>
                    <div className="font-mono text-[10px] tracking-[0.08em] uppercase text-emerald-400/80 mb-1.5">Highlights</div>
                    <ul className="text-xs text-muted-foreground space-y-0.5">
                      {r.highlights.map((h, i) => <li key={i}>· {h}</li>)}
                    </ul>
                  </div>
                )}
                {r.warnings && r.warnings.length > 0 && (
                  <div>
                    <div className="font-mono text-[10px] tracking-[0.08em] uppercase text-amber-400/80 mb-1.5">Warnings</div>
                    <ul className="text-xs text-muted-foreground space-y-0.5">
                      {r.warnings.map((w, i) => <li key={i}>· {w}</li>)}
                    </ul>
                  </div>
                )}
              </div>
            ) : null}

            <div className="mt-4 text-xs text-muted-foreground/80">
              — {r.reporter_name || "Anonymous traveler"}
              {r.reporter_location ? `, ${r.reporter_location}` : ""}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
