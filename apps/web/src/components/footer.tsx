import Link from "next/link";
import { useLocale } from "next-intl";

export function Footer() {
  const locale = useLocale();

  return (
    <footer className="border-t border-border/20 bg-gradient-to-t from-muted/40 to-transparent mt-20">
      <div className="mx-auto max-w-7xl px-4 py-16">
        {/* Brand statement */}
        <div className="mb-12 max-w-2xl">
          <h2 className="text-2xl font-bold mb-3">
            Where the road ends and the real India begins.
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            No sponsored content. No paid rankings. Every score is explainable, every rating is
            infrastructure-aware, every recommendation comes with honest warnings. We built this
            for the traveler who wants confidence, not brochures.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Explore */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-muted-foreground/70">
              Discover
            </h4>
            <div className="space-y-2.5">
              <Link href={`/${locale}/explore`} className="block text-[15px] text-muted-foreground hover:text-foreground transition-colors">
                All Destinations
              </Link>
              <Link href={`/${locale}/collections`} className="block text-[15px] text-muted-foreground hover:text-foreground transition-colors">
                Curated Collections
              </Link>
              <Link href={`/${locale}/routes`} className="block text-[15px] text-muted-foreground hover:text-foreground transition-colors">
                Road Trip Routes
              </Link>
              <Link href={`/${locale}/treks`} className="block text-[15px] text-muted-foreground hover:text-foreground transition-colors">
                Treks & Gear
              </Link>
              <Link href={`/${locale}/superlatives`} className="block text-[15px] text-muted-foreground hover:text-foreground transition-colors">
                Records & Firsts
              </Link>
            </div>
          </div>

          {/* Plan */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-muted-foreground/70">
              Plan
            </h4>
            <div className="space-y-2.5">
              <Link href={`/${locale}/plan`} className="block text-[15px] text-muted-foreground hover:text-foreground transition-colors">
                AI Trip Planner
              </Link>
              <Link href={`/${locale}/camping`} className="block text-[15px] text-muted-foreground hover:text-foreground transition-colors">
                Camping Spots
              </Link>
              <Link href={`/${locale}/permits`} className="block text-[15px] text-muted-foreground hover:text-foreground transition-colors">
                Permits & Passes
              </Link>
              <Link href={`/${locale}/road-conditions`} className="block text-[15px] text-muted-foreground hover:text-foreground transition-colors">
                Road Conditions
              </Link>
              <Link href={`/${locale}/saved`} className="block text-[15px] text-muted-foreground hover:text-foreground transition-colors">
                Saved & Compare
              </Link>
            </div>
          </div>

          {/* Regions */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-muted-foreground/70">
              Regions
            </h4>
            <div className="space-y-2.5">
              <Link href={`/${locale}/region/himachal-pradesh`} className="block text-[15px] text-muted-foreground hover:text-foreground transition-colors">
                Himachal Pradesh
              </Link>
              <Link href={`/${locale}/region/uttarakhand`} className="block text-[15px] text-muted-foreground hover:text-foreground transition-colors">
                Uttarakhand
              </Link>
              <Link href={`/${locale}/region/jammu-kashmir`} className="block text-[15px] text-muted-foreground hover:text-foreground transition-colors">
                Jammu & Kashmir
              </Link>
            </div>
          </div>

          {/* Trust */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-muted-foreground/70">
              Trust
            </h4>
            <div className="space-y-2.5">
              <Link href={`/${locale}/about`} className="block text-[15px] text-muted-foreground hover:text-foreground transition-colors">
                About Us
              </Link>
              <Link href={`/${locale}/methodology`} className="block text-[15px] text-muted-foreground hover:text-foreground transition-colors">
                How We Score
              </Link>
            </div>
            <div className="mt-6 flex gap-4 text-xs font-mono text-muted-foreground/50">
              <span>105 destinations</span>
              <span>370+ places</span>
              <span>126 festivals</span>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground/60">
          <p>&copy; 2026 India Travel Planner. Made with obsessive detail.</p>
          <p className="italic">
            "The best journeys answer questions that in the beginning you didn't even think to ask."
          </p>
        </div>
      </div>
    </footer>
  );
}
