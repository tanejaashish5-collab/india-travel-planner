import { Nav } from "@/components/nav";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

export default function PlanTripPage() {
  return (
    <div className="min-h-screen">
      <Nav />
      <main className="mx-auto max-w-4xl px-4 py-8">
        <PlanContent />
      </main>
    </div>
  );
}

function PlanContent() {
  const locale = useLocale();
  const tn = useTranslations("nav");

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">{tn("planTrip")}</h1>
        <p className="mt-1 text-muted-foreground">
          Tell us where you're coming from, how many days you have, and what you
          love — we'll plan the perfect trip
        </p>
      </div>

      {/* Coming soon with concept preview */}
      <div className="rounded-xl border border-dashed border-primary/30 bg-primary/5 p-8 mb-8">
        <h2 className="text-xl font-semibold text-primary mb-4">
          AI-Powered Trip Planning — Coming Soon
        </h2>
        <div className="space-y-4 text-sm text-muted-foreground">
          <p>Our AI trip planner will ask you:</p>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg border border-border bg-background p-4">
              <div className="font-medium text-foreground">Where from?</div>
              <div className="text-xs mt-1">Delhi, Mumbai, Bangalore...</div>
            </div>
            <div className="rounded-lg border border-border bg-background p-4">
              <div className="font-medium text-foreground">How many days?</div>
              <div className="text-xs mt-1">3 days to 180 days</div>
            </div>
            <div className="rounded-lg border border-border bg-background p-4">
              <div className="font-medium text-foreground">Budget?</div>
              <div className="text-xs mt-1">Backpacker / Mid / Luxury</div>
            </div>
            <div className="rounded-lg border border-border bg-background p-4">
              <div className="font-medium text-foreground">Kids with you?</div>
              <div className="text-xs mt-1">Yes / No + ages</div>
            </div>
            <div className="rounded-lg border border-border bg-background p-4">
              <div className="font-medium text-foreground">Travel style?</div>
              <div className="text-xs mt-1">
                Biker / Family / Adventure / Spiritual / Photography...
              </div>
            </div>
            <div className="rounded-lg border border-border bg-background p-4">
              <div className="font-medium text-foreground">What month?</div>
              <div className="text-xs mt-1">
                We'll match weather-optimized destinations
              </div>
            </div>
          </div>
          <p className="pt-2">
            → And generate a day-by-day itinerary with stays, costs, safety
            data, and packing lists.
          </p>
        </div>
      </div>

      {/* In the meantime */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">
          In the meantime, explore our curated routes
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <Link
            href={`/${locale}/routes`}
            className="rounded-xl border border-border p-5 hover:border-primary/50 transition-colors"
          >
            <div className="font-mono text-2xl font-bold text-primary">14</div>
            <div className="font-semibold mt-1">Curated Routes</div>
            <div className="text-sm text-muted-foreground mt-1">
              3-day weekends to 12-day road trips, with day-by-day plans
            </div>
          </Link>
          <Link
            href={`/${locale}/explore`}
            className="rounded-xl border border-border p-5 hover:border-primary/50 transition-colors"
          >
            <div className="font-mono text-2xl font-bold text-primary">66</div>
            <div className="font-semibold mt-1">Destinations</div>
            <div className="text-sm text-muted-foreground mt-1">
              Filter by month, state, difficulty, and kids suitability
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}
