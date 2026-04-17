"use client";

/* ── Reusable skeleton screens for mobile-first loading states ── */

function Shimmer({ className }: { className?: string }) {
  return <div className={`animate-pulse rounded-lg bg-muted/60 ${className ?? ""}`} />;
}

export function DestinationCardSkeleton() {
  return (
    <div className="rounded-2xl overflow-hidden border border-border/30">
      <Shimmer className="aspect-[4/3] rounded-none" />
      <div className="p-3 space-y-2">
        <Shimmer className="h-5 w-2/3" />
        <Shimmer className="h-3 w-1/3" />
        <div className="flex gap-2 pt-1">
          <Shimmer className="h-6 w-14 rounded-full" />
          <Shimmer className="h-6 w-10 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export function DestinationGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <DestinationCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function DestinationDetailSkeleton() {
  return (
    <div className="space-y-4">
      {/* Hero */}
      <Shimmer className="h-56 sm:h-72 rounded-2xl" />
      {/* Title card */}
      <div className="space-y-3 -mt-16 relative z-10 bg-background rounded-2xl p-6 border border-border/30">
        <Shimmer className="h-8 w-3/4" />
        <Shimmer className="h-4 w-1/2" />
        <div className="flex gap-2 pt-2">
          <Shimmer className="h-8 w-20 rounded-full" />
          <Shimmer className="h-8 w-16 rounded-full" />
          <Shimmer className="h-8 w-24 rounded-full" />
        </div>
        <Shimmer className="h-16 w-full mt-2" />
      </div>
      {/* Tabs */}
      <div className="flex gap-2">
        {[80, 60, 50, 70].map((w, i) => (
          <Shimmer key={i} className="h-9 rounded-full" style={{ width: w }} />
        ))}
      </div>
      {/* Content sections */}
      <div className="space-y-3">
        <Shimmer className="h-32 rounded-xl" />
        <Shimmer className="h-24 rounded-xl" />
        <Shimmer className="h-40 rounded-xl" />
      </div>
    </div>
  );
}

export function CollectionCardSkeleton() {
  return (
    <div className="rounded-2xl overflow-hidden border border-border/30">
      <Shimmer className="aspect-[3/2] rounded-none" />
      <div className="p-3 space-y-2">
        <Shimmer className="h-5 w-4/5" />
        <Shimmer className="h-3 w-full" />
        <Shimmer className="h-3 w-2/3" />
      </div>
    </div>
  );
}

export function ListItemSkeleton() {
  return (
    <div className="flex items-center gap-3 py-3">
      <Shimmer className="h-12 w-12 rounded-xl shrink-0" />
      <div className="flex-1 space-y-1.5">
        <Shimmer className="h-4 w-3/4" />
        <Shimmer className="h-3 w-1/2" />
      </div>
    </div>
  );
}

export function ListSkeleton({ count = 5 }: { count?: number }) {
  return (
    <div className="divide-y divide-border/20">
      {Array.from({ length: count }).map((_, i) => (
        <ListItemSkeleton key={i} />
      ))}
    </div>
  );
}

export function FilterBarSkeleton() {
  return (
    <div className="flex gap-2 overflow-hidden py-2">
      {[60, 80, 55, 70, 50, 65].map((w, i) => (
        <Shimmer key={i} className="h-8 rounded-full shrink-0" style={{ width: w }} />
      ))}
    </div>
  );
}
