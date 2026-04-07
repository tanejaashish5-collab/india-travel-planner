export function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-lg bg-muted/50 ${className}`}
      aria-hidden
    />
  );
}

export function SkeletonCard() {
  return (
    <div className="rounded-xl border border-border bg-card p-5 space-y-3">
      <div className="flex justify-between">
        <Skeleton className="h-5 w-24" />
        <Skeleton className="h-5 w-16" />
      </div>
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-2/3" />
      <div className="flex gap-2 pt-1">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-12" />
      </div>
      <div className="flex gap-1 pt-1">
        <Skeleton className="h-5 w-12 rounded-full" />
        <Skeleton className="h-5 w-14 rounded-full" />
        <Skeleton className="h-5 w-10 rounded-full" />
      </div>
    </div>
  );
}

export function SkeletonDestinationHero() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-4 w-48" />
      <div className="rounded-2xl border border-border p-6 space-y-4">
        <div className="flex justify-between">
          <div className="space-y-2">
            <Skeleton className="h-10 w-64" />
            <Skeleton className="h-4 w-48" />
          </div>
          <Skeleton className="h-16 w-16 rounded-2xl" />
        </div>
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-3/4" />
        <div className="grid grid-cols-4 gap-3">
          <Skeleton className="h-16 rounded-xl" />
          <Skeleton className="h-16 rounded-xl" />
          <Skeleton className="h-16 rounded-xl" />
          <Skeleton className="h-16 rounded-xl" />
        </div>
      </div>
      <div className="flex gap-1 rounded-xl border border-border p-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-10 flex-1 rounded-lg" />
        ))}
      </div>
      <Skeleton className="h-40 rounded-xl" />
    </div>
  );
}
