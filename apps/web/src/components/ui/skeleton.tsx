export function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-lg bg-muted/40 ${className}`}
      aria-hidden
    />
  );
}

export function SkeletonCard() {
  return (
    <div className="rounded-2xl border border-border/50 bg-card overflow-hidden">
      {/* Image placeholder */}
      <Skeleton className="h-40 w-full rounded-none" />
      <div className="p-5 space-y-3">
        {/* Score badge */}
        <div className="flex justify-between">
          <Skeleton className="h-6 w-24 rounded-full" />
          <Skeleton className="h-5 w-16" />
        </div>
        {/* Title */}
        <Skeleton className="h-6 w-3/4" />
        {/* Tagline */}
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
        {/* Meta */}
        <div className="flex gap-2 pt-1">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-12" />
        </div>
        {/* Score strip */}
        <div className="flex gap-0.5 pt-1">
          {Array.from({ length: 12 }).map((_, i) => (
            <Skeleton key={i} className="h-1.5 flex-1 rounded-full" />
          ))}
        </div>
      </div>
    </div>
  );
}

export function SkeletonDestinationHero() {
  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <Skeleton className="h-4 w-48" />
      {/* Hero image */}
      <Skeleton className="h-56 sm:h-72 lg:h-96 w-full rounded-2xl" />
      {/* Hero card */}
      <div className="rounded-2xl border border-border/50 p-6 sm:p-8 -mt-20 relative z-10 bg-card space-y-4">
        <div className="flex justify-between">
          <div className="space-y-3">
            <Skeleton className="h-10 w-64" />
            <Skeleton className="h-4 w-48" />
          </div>
          <Skeleton className="h-20 w-20 rounded-2xl" />
        </div>
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-3/4" />
        {/* Quick stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          <Skeleton className="h-16 rounded-xl" />
          <Skeleton className="h-16 rounded-xl" />
          <Skeleton className="h-16 rounded-xl" />
          <Skeleton className="h-16 rounded-xl" />
        </div>
      </div>
      {/* Infra cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <Skeleton className="h-20 rounded-xl" />
        <Skeleton className="h-20 rounded-xl" />
        <Skeleton className="h-20 rounded-xl" />
        <Skeleton className="h-20 rounded-xl" />
      </div>
      {/* Tabs */}
      <div className="flex gap-1 rounded-xl border border-border p-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-10 flex-1 rounded-lg" />
        ))}
      </div>
      {/* Content */}
      <Skeleton className="h-40 rounded-xl" />
      <Skeleton className="h-32 rounded-xl" />
    </div>
  );
}

export function SkeletonList({ count = 6 }: { count?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, i) => (
        <Skeleton key={i} className="h-20 w-full rounded-xl" />
      ))}
    </div>
  );
}
