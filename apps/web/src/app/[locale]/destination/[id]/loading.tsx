import { Nav } from "@/components/nav";
import { SkeletonDestinationHero } from "@/components/ui/skeleton";

export default function DestinationLoading() {
  return (
    <div className="min-h-screen">
      <Nav />
      {/* div, not <main>: with streaming SSR the loading fallback's markup
          stays in the raw HTML next to the page's real <main>, so a <main>
          here = two main landmarks on every dest page (2026-07-15 audit). */}
      <div className="mx-auto max-w-4xl px-4 py-8">
        <SkeletonDestinationHero />
      </div>
    </div>
  );
}
