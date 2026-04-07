import { Nav } from "@/components/nav";
import { SkeletonDestinationHero } from "@/components/ui/skeleton";

export default function DestinationLoading() {
  return (
    <div className="min-h-screen">
      <Nav />
      <main className="mx-auto max-w-4xl px-4 py-8">
        <SkeletonDestinationHero />
      </main>
    </div>
  );
}
