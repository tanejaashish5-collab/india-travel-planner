"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { LanguageToggle } from "./language-toggle";
import {
  FadeIn,
  SlideIn,
  StaggerContainer,
  StaggerItem,
  HoverCard,
  FloatingParticles,
} from "./animated-hero";

const DIFFICULTY_COLORS: Record<string, string> = {
  easy: "text-emerald-400",
  moderate: "text-yellow-400",
  hard: "text-orange-400",
  extreme: "text-red-400",
};

export function LandingHero({
  featuredDestinations,
  collections,
  routes,
  stats,
  festivals,
}: {
  featuredDestinations: any[];
  collections: any[];
  routes: any[];
  stats?: { places: number; destinations: number; states: number; routes: number };
  festivals?: any[];
}) {
  const locale = useLocale();
  const t = useTranslations("home");
  const tn = useTranslations("nav");
  const tm = useTranslations("months");
  const currentMonth = new Date().getMonth() + 1;

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
        {/* Background image with overlay */}
        <div className="absolute inset-0">
          <img
            src="/images/destinations/spiti-valley.jpg"
            alt=""
            className="w-full h-full object-cover opacity-15"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/90 to-background" />
        </div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full bg-primary/8 blur-[150px] opacity-40" />

        {/* Top bar */}
        <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-6 py-4 z-10">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-sm font-bold text-primary-foreground">
              IT
            </div>
            <span className="hidden sm:inline font-bold text-lg">
              India Travel Planner
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href={`/${locale}/explore`}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors hidden sm:block"
            >
              {tn("explore")}
            </Link>
            <Link
              href={`/${locale}/routes`}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors hidden sm:block"
            >
              {tn("routes")}
            </Link>
            <Link
              href={`/${locale}/collections`}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors hidden sm:block"
            >
              {tn("collections")}
            </Link>
            <span className="text-border hidden sm:block">|</span>
            <Link
              href={`/${locale}/region/himachal-pradesh`}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors hidden lg:block"
            >
              HP
            </Link>
            <Link
              href={`/${locale}/region/uttarakhand`}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors hidden lg:block"
            >
              UK
            </Link>
            <Link
              href={`/${locale}/region/jammu-kashmir`}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors hidden lg:block"
            >
              J&K
            </Link>
            <LanguageToggle />
          </div>
        </div>

        {/* Hero content */}
        <div className="relative z-10 max-w-4xl text-center space-y-8">
          <FadeIn delay={0.1}>
            <p className="text-sm font-medium text-primary uppercase tracking-widest">
              The Confidence Engine for Exploring India
            </p>
          </FadeIn>

          <SlideIn delay={0.2}>
            <h1 className="text-5xl font-bold tracking-tight sm:text-7xl lg:text-8xl leading-[0.9]">
              {t("heroTitle")}
              <span className="block bg-gradient-to-r from-muted-foreground to-muted-foreground/50 bg-clip-text text-transparent mt-2">
                {t("heroSubtitle")}
              </span>
            </h1>
          </SlideIn>

          <FadeIn delay={0.5}>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {t("heroDescription")}
            </p>
          </FadeIn>

          <FadeIn delay={0.7}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Link
                href={`/${locale}/explore`}
                className="group relative rounded-full bg-primary px-8 py-3.5 text-sm font-medium text-primary-foreground overflow-hidden transition-all hover:shadow-lg hover:shadow-primary/25"
              >
                <span className="relative z-10">{tn("explore")} →</span>
                <motion.div
                  className="absolute inset-0 bg-white/10"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.5 }}
                />
              </Link>
              <Link
                href={`/${locale}/plan`}
                className="rounded-full border border-border px-8 py-3.5 text-sm font-medium text-foreground hover:bg-muted hover:border-muted-foreground/30 transition-all"
              >
                {tn("planTrip")}
              </Link>
            </div>
          </FadeIn>

          {/* Stats */}
          <StaggerContainer className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8" staggerDelay={0.15}>
            {[
              { value: `${stats?.places ?? 370}+`, label: t("stats.places"), href: `/${locale}/explore` },
              { value: `${stats?.destinations ?? 105}`, label: "Destinations", href: `/${locale}/explore` },
              { value: `${stats?.routes ?? 19}`, label: t("stats.routes"), href: `/${locale}/routes` },
              { value: "SOS", label: "Emergency (Coming)", href: null },
            ].map((stat) => (
              <StaggerItem key={stat.label}>
                <HoverCard>
                  {stat.href ? (
                    <Link
                      href={stat.href}
                      className="block rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm p-4 hover:border-primary/30 transition-colors"
                    >
                      <div className="text-2xl font-mono font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                        {stat.value}
                      </div>
                      <div className="text-muted-foreground text-sm mt-1">
                        {stat.label}
                      </div>
                    </Link>
                  ) : (
                    <div className="rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm p-4">
                      <div className="text-2xl font-mono font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                        {stat.value}
                      </div>
                      <div className="text-muted-foreground text-sm mt-1">
                        {stat.label}
                      </div>
                    </div>
                  )}
                </HoverCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-5 h-8 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-1">
            <motion.div
              className="w-1 h-2 rounded-full bg-muted-foreground/50"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* Featured This Month */}
      {featuredDestinations.length > 0 && (
        <section className="px-4 py-20">
          <div className="mx-auto max-w-7xl">
            <FadeIn>
              <div className="text-center mb-12">
                <p className="text-sm font-medium text-primary uppercase tracking-widest mb-2">
                  Best for {tm(String(currentMonth))}
                </p>
                <h2 className="text-3xl font-bold sm:text-4xl">
                  Where to go right now
                </h2>
                <p className="mt-2 text-muted-foreground">
                  Top-scored destinations this month
                </p>
              </div>
            </FadeIn>

            <StaggerContainer className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" staggerDelay={0.1}>
              {featuredDestinations.map((item: any) => {
                const dest = item.destinations;
                if (!dest) return null;
                const stateName = Array.isArray(dest.state)
                  ? dest.state[0]?.name
                  : dest.state?.name;

                return (
                  <StaggerItem key={dest.id}>
                    <HoverCard>
                      <Link
                        href={`/${locale}/destination/${dest.id}`}
                        className="group block rounded-xl border border-border overflow-hidden transition-all hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10"
                      >
                        {/* Editorial image card — DIFFERENT from explore grid */}
                        <div className="relative h-48 bg-muted/30 overflow-hidden">
                          <img
                            src={`/images/destinations/${dest.id}.jpg`}
                            alt={dest.name}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            loading="lazy"
                            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                          {/* Score badge floating on image */}
                          <div className="absolute top-3 right-3">
                            <span className="inline-flex items-center rounded-full bg-emerald-500/90 px-2.5 py-1 text-xs font-bold text-white shadow-lg">
                              {item.score}/5
                            </span>
                          </div>
                          {/* Content over image */}
                          <div className="absolute bottom-0 left-0 right-0 p-5">
                            <h3 className="text-xl font-bold text-white drop-shadow-lg">{dest.name}</h3>
                            <p className="mt-1 text-sm text-white/80 line-clamp-1 drop-shadow">
                              {dest.tagline}
                            </p>
                            <div className="mt-2 flex items-center gap-2 text-xs text-white/60">
                              {stateName && <span>{stateName}</span>}
                              <span>·</span>
                              <span className="capitalize">{dest.difficulty}</span>
                              {dest.elevation_m && (
                                <><span>·</span><span className="font-mono">{dest.elevation_m}m</span></>
                              )}
                            </div>
                          </div>
                        </div>
                      </Link>
                    </HoverCard>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>

            <div className="text-center mt-8">
              <Link
                href={`/${locale}/explore`}
                className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
              >
                View all {stats?.destinations ?? 105} destinations →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Collections */}
      {collections.length > 0 && (
        <section className="px-4 py-20 bg-muted/30">
          <div className="mx-auto max-w-7xl">
            <FadeIn>
              <div className="text-center mb-12">
                <p className="text-sm font-medium text-primary uppercase tracking-widest mb-2">
                  Curated Lists
                </p>
                <h2 className="text-3xl font-bold sm:text-4xl">
                  Collections
                </h2>
                <p className="mt-2 text-muted-foreground">
                  India's most beautiful, most dangerous, most remote — browsable
                </p>
              </div>
            </FadeIn>

            <StaggerContainer className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" staggerDelay={0.08}>
              {collections.map((c: any) => (
                <StaggerItem key={c.id}>
                  <HoverCard>
                    <Link
                      href={`/${locale}/collections/${c.id}`}
                      className="group block rounded-xl border border-border overflow-hidden h-full transition-all hover:border-primary/50"
                    >
                      {/* Collection cover image */}
                      <div className="relative h-32 bg-muted/30 overflow-hidden">
                        <img
                          src={`/images/collections/COLLECTION_${c.id}.jpg`}
                          alt={c.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
                      </div>
                      <div className="p-4 pt-2">
                        <h3 className="font-semibold">{c.name}</h3>
                        <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{c.description}</p>
                        <div className="mt-2 flex gap-1">
                          {(c.tags ?? []).slice(0, 3).map((tag: string) => (
                            <span key={tag} className="rounded-full border border-border px-2 py-0.5 text-[10px] text-muted-foreground">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </Link>
                  </HoverCard>
                </StaggerItem>
              ))}
            </StaggerContainer>

            <div className="text-center mt-8">
              <Link
                href={`/${locale}/collections`}
                className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
              >
                View all collections →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Routes preview */}
      {routes.length > 0 && (
        <section className="px-4 py-20">
          <div className="mx-auto max-w-7xl">
            <FadeIn>
              <div className="text-center mb-12">
                <p className="text-sm font-medium text-primary uppercase tracking-widest mb-2">
                  Ready-Made Itineraries
                </p>
                <h2 className="text-3xl font-bold sm:text-4xl">
                  Curated Routes
                </h2>
                <p className="mt-2 text-muted-foreground">
                  3-day weekends to 12-day road trips, with day-by-day plans
                </p>
              </div>
            </FadeIn>

            <StaggerContainer className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3" staggerDelay={0.08}>
              {routes.map((r: any) => (
                <StaggerItem key={r.id}>
                  <HoverCard>
                    <Link
                      href={`/${locale}/routes/${r.id}`}
                      className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/50"
                    >
                      <div className="font-mono text-2xl font-bold text-primary">
                        {r.days}d
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-sm truncate">
                          {r.name}
                        </h3>
                        <div className="flex items-center gap-2 mt-0.5 text-xs text-muted-foreground">
                          <span className={`capitalize ${DIFFICULTY_COLORS[r.difficulty] ?? ""}`}>
                            {r.difficulty}
                          </span>
                          {r.kids_suitable && <span>👶</span>}
                        </div>
                      </div>
                    </Link>
                  </HoverCard>
                </StaggerItem>
              ))}
            </StaggerContainer>

            <div className="text-center mt-8">
              <Link
                href={`/${locale}/routes`}
                className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
              >
                View all {stats?.routes ?? 19} routes →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      {/* Upcoming Festivals */}
      {festivals && festivals.length > 0 && (
        <section className="px-4 py-20">
          <div className="mx-auto max-w-6xl">
            <FadeIn>
              <h2 className="text-3xl font-bold sm:text-4xl mb-2">Upcoming Festivals</h2>
              <p className="text-muted-foreground mb-8">Time your trip around these events</p>
            </FadeIn>
            <StaggerContainer className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" staggerDelay={0.05}>
              {festivals.slice(0, 8).map((f: any) => {
                const MONTH_NAMES = ["","January","February","March","April","May","June","July","August","September","October","November","December"];
                const destName = Array.isArray(f.destinations) ? f.destinations[0]?.name : f.destinations?.name;
                return (
                  <StaggerItem key={f.id}>
                    <HoverCard>
                      <Link
                        href={`/${locale}/destination/${f.destination_id}`}
                        className="block rounded-xl border border-border p-4 h-full transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] font-medium text-primary">
                            {MONTH_NAMES[f.month]}
                          </span>
                        </div>
                        <h3 className="font-semibold text-sm mb-1">{f.name}</h3>
                        <p className="text-[11px] text-muted-foreground/80 mb-2">{f.approximate_date}</p>
                        <p className="text-xs text-muted-foreground line-clamp-2">{f.significance}</p>
                        {destName && (
                          <p className="mt-2 text-[10px] text-primary/70">📍 {destName}</p>
                        )}
                      </Link>
                    </HoverCard>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          </div>
        </section>
      )}

      <section className="px-4 py-20 bg-muted/30">
        <div className="mx-auto max-w-3xl text-center">
          <FadeIn>
            <h2 className="text-3xl font-bold sm:text-4xl">
              Stop scrolling. Start exploring.
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Every destination has monthly suitability scores, kids ratings,
              safety data, fuel stops, emergency contacts, and honest opinions.
              The information you need to go beyond the tourist trail — with
              confidence.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
              <Link
                href={`/${locale}/explore`}
                className="rounded-full bg-primary px-8 py-3.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Explore All Destinations →
              </Link>
              <Link
                href={`/${locale}/routes`}
                className="rounded-full border border-border px-8 py-3.5 text-sm font-medium hover:bg-muted transition-colors"
              >
                Browse Routes
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
