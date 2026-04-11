"use client";

const MONTHS = [
  "", "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function timeAgo(dateStr: string): string {
  const now = Date.now();
  const then = new Date(dateStr).getTime();
  const diffMs = now - then;
  const diffMins = Math.floor(diffMs / 60000);
  if (diffMins < 1) return "just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  const diffHrs = Math.floor(diffMins / 60);
  if (diffHrs < 24) return `${diffHrs}h ago`;
  const diffDays = Math.floor(diffHrs / 24);
  if (diffDays < 30) return `${diffDays}d ago`;
  const diffMonths = Math.floor(diffDays / 30);
  if (diffMonths < 12) return `${diffMonths}mo ago`;
  return `${Math.floor(diffMonths / 12)}y ago`;
}

function Stars({ rating, size = "text-sm" }: { rating: number; size?: string }) {
  return (
    <span className={`${size} inline-flex gap-px`}>
      {[1, 2, 3, 4, 5].map((s) => (
        <span key={s} className={s <= rating ? "text-amber-400" : "text-zinc-600"}>
          {s <= rating ? "\u2605" : "\u2606"}
        </span>
      ))}
    </span>
  );
}

const TYPE_LABELS: Record<string, string> = {
  solo: "Solo",
  couple: "Couple",
  family: "Family",
  biker: "Biker",
  backpacker: "Backpacker",
  photographer: "Photographer",
  "first-timer": "First-timer",
  senior: "Senior",
};

export function ReviewsList({ reviews }: { reviews: any[] }) {
  if (!reviews || reviews.length === 0) {
    return (
      <div className="rounded-xl border border-border bg-card p-8 text-center">
        <p className="text-muted-foreground">No reviews yet. Be the first to share your experience.</p>
      </div>
    );
  }

  const avgRating = reviews.reduce((sum, r) => sum + (r.rating || 0), 0) / reviews.length;

  return (
    <div className="space-y-4">
      {/* Summary */}
      <div className="flex items-center gap-3 mb-2">
        <Stars rating={Math.round(avgRating)} size="text-lg" />
        <span className="text-lg font-bold">{avgRating.toFixed(1)}/5</span>
        <span className="text-sm text-muted-foreground">from {reviews.length} review{reviews.length !== 1 ? "s" : ""}</span>
      </div>

      {/* Review cards */}
      {reviews.map((review) => (
        <div
          key={review.id}
          className="rounded-xl border border-border bg-card p-5 space-y-3"
        >
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-3">
              <Stars rating={review.rating} />
              {review.traveler_type && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 font-medium">
                  {TYPE_LABELS[review.traveler_type] || review.traveler_type}
                </span>
              )}
            </div>
            <span className="text-xs text-muted-foreground">
              {timeAgo(review.created_at)}
            </span>
          </div>

          {(review.visit_month || review.visit_year) && (
            <p className="text-xs text-muted-foreground">
              Visited{review.visit_month ? ` ${MONTHS[review.visit_month]}` : ""}{review.visit_year ? ` ${review.visit_year}` : ""}
            </p>
          )}

          <p className="text-sm leading-relaxed">{review.text}</p>
        </div>
      ))}
    </div>
  );
}
