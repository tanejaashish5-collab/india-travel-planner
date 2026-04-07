import { Nav } from "@/components/nav";
import { SkeletonCard } from "@/components/ui/skeleton";

export default function ExploreLoading() {
  return (
    <div className="min-h-screen">
      <Nav />
      <main className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-6 space-y-2">
          <div className="h-8 w-32 animate-pulse rounded-lg bg-muted/50" />
          <div className="h-4 w-64 animate-pulse rounded-lg bg-muted/50" />
        </div>
        <div className="mb-6 flex gap-2">
          <div className="h-10 w-40 animate-pulse rounded-lg bg-muted/50" />
          <div className="h-10 w-32 animate-pulse rounded-lg bg-muted/50" />
          <div className="h-10 w-32 animate-pulse rounded-lg bg-muted/50" />
          <div className="h-10 w-28 animate-pulse rounded-lg bg-muted/50" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 9 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </main>
    </div>
  );
}
