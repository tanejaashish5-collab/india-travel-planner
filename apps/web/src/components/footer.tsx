import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

export function Footer() {
  const locale = useLocale();

  return (
    <footer className="border-t border-border bg-card/50 mt-20">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
                IT
              </div>
              <span className="font-bold">India Travel Planner</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              The confidence engine for exploring India. Every village, every
              trail, every hidden gem — scored, rated, and honest.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h4 className="font-semibold mb-3 text-sm uppercase tracking-wide text-muted-foreground">
              Explore
            </h4>
            <div className="space-y-2">
              <Link
                href={`/${locale}/explore`}
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                All Destinations
              </Link>
              <Link
                href={`/${locale}/collections`}
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Collections
              </Link>
              <Link
                href={`/${locale}/routes`}
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Curated Routes
              </Link>
              <Link
                href={`/${locale}/treks`}
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Treks
              </Link>
            </div>
          </div>

          {/* Plan */}
          <div>
            <h4 className="font-semibold mb-3 text-sm uppercase tracking-wide text-muted-foreground">
              Plan
            </h4>
            <div className="space-y-2">
              <Link
                href={`/${locale}/plan`}
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Plan My Trip
              </Link>
              <Link
                href={`/${locale}/routes`}
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Weekend Getaways (3-4d)
              </Link>
              <Link
                href={`/${locale}/routes`}
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Week Trips (7d)
              </Link>
              <Link
                href={`/${locale}/routes`}
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Road Trips (10-12d)
              </Link>
            </div>
          </div>

          {/* About */}
          <div>
            <h4 className="font-semibold mb-3 text-sm uppercase tracking-wide text-muted-foreground">
              About
            </h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <Link href={`/${locale}/about`} className="block hover:text-foreground transition-colors">About Us</Link>
              <Link href={`/${locale}/methodology`} className="block hover:text-foreground transition-colors">How We Score</Link>
              <p className="pt-1">Built with obsessive detail for travelers who want to go beyond the tourist trail.</p>
              <p className="pt-2">
                <span className="font-mono text-xs">105</span> destinations ·{" "}
                <span className="font-mono text-xs">10</span> states ·{" "}
                <span className="font-mono text-xs">19</span> routes
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© 2026 India Travel Planner. All rights reserved.</p>
          <p>
            Data is for planning purposes. Always verify conditions locally
            before traveling.
          </p>
        </div>
      </div>
    </footer>
  );
}
