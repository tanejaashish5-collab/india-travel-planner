import Link from "next/link";
import { useLocale } from "next-intl";

export function Footer({ stats }: { stats?: { destinations: number; places: number; festivals: number; traps: number; collections: number } }) {
  const locale = useLocale();

  return (
    <footer className="relative mt-24 overflow-hidden">
      {/* Background image with heavy overlay */}
      <div className="absolute inset-0">
        <img
          src="/images/destinations/pangong-lake.jpg"
          alt=""
          className="w-full h-full object-cover opacity-[0.07]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/95 to-background/80" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 pt-12 pb-8">

        {/* Links grid — compact, 3 columns */}
        <div className="grid gap-x-12 gap-y-8 sm:grid-cols-3 mb-12">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground/50 mb-4">
              Discover
            </h4>
            <div className="space-y-2">
              {[
                { href: `/${locale}/explore`, label: "Destinations" },
                { href: `/${locale}/collections`, label: "Collections" },
                { href: `/${locale}/routes`, label: "Road Trips" },
                { href: `/${locale}/treks`, label: "Treks" },
                { href: `/${locale}/superlatives`, label: "Records" },
                { href: `/${locale}/camping`, label: "Camping" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-sm text-muted-foreground/70 hover:text-foreground hover:translate-x-1 transition-all duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground/50 mb-4">
              Plan & Build
            </h4>
            <div className="space-y-2">
              {[
                { href: `/${locale}/plan`, label: "AI Trip Planner" },
                { href: `/${locale}/build-route`, label: "Route Builder" },
                { href: `/${locale}/permits`, label: "Permits" },
                { href: `/${locale}/road-conditions`, label: "Road Status" },
                { href: `/${locale}/saved`, label: "Saved" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-sm text-muted-foreground/70 hover:text-foreground hover:translate-x-1 transition-all duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground/50 mb-4">
              Regions
            </h4>
            <div className="space-y-2">
              {[
                { href: `/${locale}/region/himachal-pradesh`, label: "Himachal Pradesh" },
                { href: `/${locale}/region/uttarakhand`, label: "Uttarakhand" },
                { href: `/${locale}/region/jammu-kashmir`, label: "Jammu & Kashmir" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-sm text-muted-foreground/70 hover:text-foreground hover:translate-x-1 transition-all duration-200"
                >
                  {link.label}
                </Link>
              ))}
              <div className="h-3" />
              {[
                { href: `/${locale}/about`, label: "About" },
                { href: `/${locale}/methodology`, label: "How We Score" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-sm text-muted-foreground/70 hover:text-foreground hover:translate-x-1 transition-all duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Stats strip */}
        <div className="flex flex-wrap justify-center gap-8 mb-12">
          {[
            { num: String(stats?.destinations ?? 105), label: "Destinations" },
            { num: `${stats?.places ?? 370}+`, label: "Places" },
            { num: String(stats?.festivals ?? 126), label: "Festivals" },
            { num: String(stats?.traps ?? 43), label: "Tourist Traps Exposed" },
            { num: String(stats?.collections ?? 20), label: "Collections" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-lg font-mono font-bold text-muted-foreground/30">{stat.num}</div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground/30">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="h-px bg-gradient-to-r from-transparent via-border/20 to-transparent mb-6" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground/60">
          <p>&copy; 2026 India Travel Planner</p>
          <p className="italic font-serif">
            "The best journeys answer questions you didn't even think to ask."
          </p>
        </div>
      </div>
    </footer>
  );
}
