"use client";

import Link from "next/link";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useEffect, useRef, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { getBrowserSupabase } from "@/lib/supabase-browser";
// LanguageToggle now in main Nav component
import {
  FadeIn,
  SlideIn,
  StaggerContainer,
  StaggerItem,
  HoverCard,
  FloatingParticles,
  ScrollReveal,
} from "./animated-hero";
import { AnimatedCounter } from "./animated-counter";
import { IndiaHeroMap } from "./india-hero-map";
import { REGION_GROUPS, STATE_MAP } from "@/lib/seo-maps";
import { resolveCover } from "@/lib/collection-covers";
import { destinationImage } from "@/lib/image-url";

const DIFFICULTY_COLORS: Record<string, string> = {
  easy: "text-emerald-400",
  moderate: "text-yellow-400",
  hard: "text-orange-400",
  extreme: "text-red-400",
};

interface MapPin {
  id: string;
  name: string;
  lat: number;
  lng: number;
  score: number | null;
}

export function LandingHero({
  featuredDestinations,
  collections,
  routes,
  stats,
  festivals,
  mapPins,
}: {
  featuredDestinations: any[];
  collections: any[];
  routes: any[];
  stats?: { places: number; destinations: number; states: number; routes: number; festivals: number; collections: number; treks: number; traps: number; permits: number; campingSpots: number };
  festivals?: any[];
  mapPins?: MapPin[];
}) {
  const locale = useLocale();
  const t = useTranslations("home");
  const tn = useTranslations("nav");
  const tm = useTranslations("months");
  const currentMonth = new Date().getMonth() + 1;

  // Day/night gradient based on user's local time
  const hour = new Date().getHours();
  const isDawn = hour >= 5 && hour < 8;
  const isDay = hour >= 8 && hour < 17;
  const isDusk = hour >= 17 && hour < 20;
  // else night
  const timeGradient = isDawn
    ? "from-orange-950/30 via-background/80 to-background"
    : isDay
    ? "from-blue-950/20 via-background/80 to-background"
    : isDusk
    ? "from-amber-950/30 via-background/80 to-background"
    : "from-indigo-950/40 via-background/90 to-background";
  const glowColor = isDawn ? "bg-orange-500/10" : isDay ? "bg-blue-500/8" : isDusk ? "bg-amber-500/10" : "bg-indigo-500/10";

  return (
    <>
      {/* Hero Section — day/night gradient */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
        {/* Background video with time-aware overlay */}
        <div className="absolute inset-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover opacity-[0.18]"
            poster={destinationImage("spiti-valley")}
          >
            <source src={`${process.env.NEXT_PUBLIC_VIDEO_BASE_URL}/hero.mp4`} type="video/mp4" />
          </video>
          <div className={`absolute inset-0 bg-gradient-to-b ${timeGradient}`} />
        </div>
        <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[400px] sm:w-[600px] lg:w-[800px] h-[300px] sm:h-[400px] lg:h-[600px] rounded-full ${glowColor} blur-[150px] opacity-40`} />

        {/* Hero content — Nav is now provided by the page layout */}
        <div className="relative z-10 max-w-4xl text-center space-y-8">
          <FadeIn delay={0.1}>
            <p className="text-sm font-medium text-primary uppercase tracking-widest">
              The Confidence Engine for Exploring India
            </p>
          </FadeIn>

          <SlideIn delay={0.2}>
            <h1 className="text-3xl font-bold tracking-tight sm:text-5xl md:text-7xl lg:text-8xl leading-[0.9]">
              {t("heroTitle")}
              <span className="block bg-gradient-to-r from-muted-foreground to-muted-foreground/50 bg-clip-text text-transparent mt-2">
                {t("heroSubtitle")}
              </span>
            </h1>
          </SlideIn>

          <FadeIn delay={0.5}>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {t("heroDescription")}
            </p>
          </FadeIn>

          {/* Search bar */}
          <FadeIn delay={0.6}>
            <div className="max-w-xl mx-auto pt-2">
              <HeroSearch locale={locale} />
              {/* Quick region shortcuts */}
              <div className="flex flex-wrap items-center justify-center gap-2 mt-3">
                <span className="text-xs text-muted-foreground/50">{locale === "hi" ? "तुरंत:" : "Quick:"}</span>
                {[
                  { href: `/${locale}/region/himachal-pradesh`, label: locale === "hi" ? "हिमाचल" : "Himachal" },
                  { href: `/${locale}/region/uttarakhand`, label: locale === "hi" ? "उत्तराखंड" : "Uttarakhand" },
                  { href: `/${locale}/region/jammu-kashmir`, label: locale === "hi" ? "कश्मीर" : "Kashmir" },
                  { href: `/${locale}/region/ladakh`, label: locale === "hi" ? "लद्दाख" : "Ladakh" },
                  { href: `/${locale}/region/rajasthan`, label: locale === "hi" ? "राजस्थान" : "Rajasthan" },
                  // `/region/[id]` only resolves to a specific state_id; "northeast" is
                  // an 8-state grouping (REGION_GROUPS in seo-maps.ts), so it 404s as a
                  // single region (BUG-103). Redirect to /states pre-filtered to the NE
                  // grouping instead — that view already exists and groups all 8 states.
                  { href: `/${locale}/states?region=northeast`, label: locale === "hi" ? "पूर्वोत्तर" : "Northeast" },
                  { href: `/${locale}/states?region=islands`, label: locale === "hi" ? "द्वीप" : "Islands" },
                  { href: `/${locale}/explore?difficulty=easy&kids=true`, label: locale === "hi" ? "परिवार" : "Family" },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="rounded-full border border-border/30 px-3 py-1 text-sm text-muted-foreground/60 hover:text-foreground hover:border-border transition-all"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.7}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Link
                href={`/${locale}/explore`}
                className="group relative rounded-full bg-primary px-8 py-4 text-sm font-semibold text-primary-foreground overflow-hidden transition-all duration-200 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 active:translate-y-0"
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
                className="rounded-full border border-border px-8 py-4 text-sm font-semibold text-foreground hover:bg-muted hover:border-muted-foreground/30 hover:-translate-y-0.5 transition-all duration-200"
              >
                {tn("planTrip")}
              </Link>
            </div>
            <div className="flex justify-center pt-3">
              <a
                href={`/${locale}/india-travel`}
                className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-blue-400 transition-colors group"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400/60 group-hover:text-blue-400 transition-colors">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                  <path d="M2 12h20" />
                </svg>
                First time in India? Start here
              </a>
            </div>
          </FadeIn>

          {/* Stats — animated counters */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8">
            {[
              { num: stats?.destinations || 260, suffix: "", label: "Destinations", href: `/${locale}/explore` },
              { num: stats?.places || 700, suffix: "+", label: t("stats.places"), href: `/${locale}/explore` },
              { num: stats?.festivals || 183, suffix: "", label: "Festivals", href: `/${locale}/festivals` },
              { num: stats?.routes || 39, suffix: "", label: t("stats.routes"), href: `/${locale}/routes` },
            ].map((stat) => (
              <Link
                key={stat.label}
                href={stat.href}
                className="block rounded-2xl border border-border/30 bg-card/70 backdrop-blur-md shadow-lg p-5 hover:border-primary/30 hover:shadow-xl transition-all duration-200 group"
              >
                <div className="text-3xl font-mono font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent group-hover:from-primary group-hover:to-primary transition-all">
                  <AnimatedCounter end={stat.num} suffix={stat.suffix} />
                </div>
                <div className="text-muted-foreground text-sm mt-1">
                  {stat.label}
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Scroll indicator — positioned below stats with relative flow, not absolute */}
        <motion.div
          className="flex justify-center pt-8 pb-4"
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

      {/* Animated India Map + Region Cards */}
      {mapPins && mapPins.length > 0 && (
        <section className="px-4 py-20">
          <div className="mx-auto max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="text-center mb-10">
                <p className="text-sm font-medium text-primary uppercase tracking-widest mb-2">
                  Discover India
                </p>
                <h2 className="text-3xl font-bold sm:text-4xl">
                  {stats?.destinations || 285} Destinations Across {stats?.states || 25} States
                </h2>
                <p className="mt-2 text-muted-foreground">
                  Watch India light up — hover a dot for this month&apos;s score, click to explore
                </p>
              </div>
              <IndiaHeroMap pins={mapPins} locale={locale} />
            </motion.div>

            {/* Region Cards */}
            <div className="mt-16">
              <FadeIn>
                <h3 className="text-center text-sm font-bold uppercase tracking-[0.15em] text-muted-foreground/50 mb-6">Explore by region</h3>
              </FadeIn>
              <StaggerContainer className="grid gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-6" staggerDelay={0.08}>
                {([
                  { slug: "north", icon: "🏔️", desc: "Himalayas, deserts, holy cities", hero: "spiti-valley" },
                  { slug: "south", icon: "🛕", desc: "Temples, backwaters, biryani", hero: "hyderabad" },
                  { slug: "west", icon: "🏖️", desc: "Beaches, caves, Bollywood", hero: "mumbai" },
                  { slug: "east", icon: "🎭", desc: "Temples, tigers, Durga Puja", hero: "darjeeling" },
                  { slug: "northeast", icon: "🌿", desc: "Living root bridges, tea gardens", hero: "cherrapunji" },
                  { slug: "central", icon: "🐅", desc: "Tiger reserves, tribal art", hero: "kanha" },
                  { slug: "islands", icon: "🏝️", desc: "Beaches, diving, coral reefs", hero: "havelock-island" },
                ] as const).map((r) => {
                  const region = REGION_GROUPS[r.slug];
                  if (!region || region.states.length === 0) return null;
                  const count = region.states.length;
                  return (
                    <StaggerItem key={r.slug}>
                      <HoverCard>
                        <Link
                          href={`/${locale}/states?region=${r.slug}`}
                          className="group block rounded-xl border border-border/40 bg-card/50 overflow-hidden transition-all hover:border-primary/40 hover:shadow-lg cursor-pointer"
                        >
                          <div className="relative h-20 overflow-hidden bg-gradient-to-br from-primary/20 via-card to-amber-500/10">
                            <Image
                              src={`/images/destinations/${r.hero}.jpg`}
                              alt={region.name}
                              fill
                              sizes="(max-width: 768px) 50vw, 200px"
                              className="object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
                            <span className="absolute bottom-2 left-3 text-lg">{r.icon}</span>
                          </div>
                          <div className="p-3 pt-2">
                            <h4 className="text-sm font-semibold group-hover:text-primary transition-colors">{region.name}</h4>
                            <p className="text-[10px] text-muted-foreground/60 mt-0.5">{r.desc}</p>
                            <p className="text-[10px] text-muted-foreground/40 mt-1 font-mono">{count} states →</p>
                          </div>
                        </Link>
                      </HoverCard>
                    </StaggerItem>
                  );
                })}
              </StaggerContainer>
            </div>
          </div>
        </section>
      )}

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
              {featuredDestinations.map((item: any, idx: number) => {
                const dest = item.destinations;
                if (!dest) return null;
                const stateName = Array.isArray(dest.state)
                  ? dest.state[0]?.name
                  : dest.state?.name;
                // First card is hero-sized
                const isHero = idx === 0;

                return (
                  <StaggerItem key={dest.id} className={isHero ? "sm:col-span-2 lg:col-span-2 lg:row-span-2" : ""}>
                    <HoverCard>
                      <Link
                        href={`/${locale}/destination/${dest.id}`}
                        className="group block rounded-2xl border border-border/50 overflow-hidden transition-all hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 h-full"
                      >
                        <div className={`relative ${isHero ? "h-64 sm:h-80 lg:h-full min-h-[320px]" : "h-52"} bg-muted/30 overflow-hidden`}>
                          <Image
                            src={`/images/destinations/${dest.id}.jpg`}
                            alt={dest.name}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover ken-burns"
                            priority={isHero}
                            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                          {/* Score badge */}
                          <div className="absolute top-3 right-3">
                            <span className="inline-flex items-center rounded-full bg-emerald-500/90 px-3 py-1 text-xs font-bold text-white shadow-lg backdrop-blur-sm">
                              {item.score}/5
                            </span>
                          </div>
                          {/* Content over image */}
                          <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
                            <h3 className={`${isHero ? "text-2xl sm:text-3xl" : "text-xl"} font-bold text-white drop-shadow-lg`}>{dest.name}</h3>
                            <p className={`mt-1 ${isHero ? "text-base line-clamp-2" : "text-sm line-clamp-1"} text-white/80 drop-shadow`}>
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
                View all {stats?.destinations || 260} destinations →
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
                  Collections
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
                      <div className="relative h-32 bg-gradient-to-br from-primary/10 via-card to-amber-500/5 overflow-hidden">
                        <Image
                          src={resolveCover(c)}
                          alt={c.name}
                          fill
                          sizes="(max-width: 768px) 100vw, 300px"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
                      </div>
                      <div className="p-4 pt-2">
                        <h3 className="font-semibold">{c.name}</h3>
                        <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{c.description}</p>
                        <div className="mt-2 flex gap-1">
                          {(c.tags ?? []).slice(0, 3).map((tag: string) => (
                            <span key={tag} className="rounded-full border border-border px-2 py-1 text-xs text-muted-foreground">
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
                  Road Trip Routes
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
                View all {stats?.routes ?? 39} routes →
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
              <ScrollReveal>
                <h2 className="text-3xl font-bold sm:text-4xl mb-2">Upcoming Festivals</h2>
                <p className="text-muted-foreground mb-8">Time your trip around these events</p>
              </ScrollReveal>
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
                          <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                            {MONTH_NAMES[f.month]}
                          </span>
                        </div>
                        <h3 className="font-semibold text-sm mb-1">{f.name}</h3>
                        <p className="text-sm text-muted-foreground/80 mb-2">{f.approximate_date}</p>
                        <p className="text-xs text-muted-foreground line-clamp-2">{f.significance}</p>
                        {destName && (
                          <p className="mt-2 text-xs text-primary/70">📍 {destName}</p>
                        )}
                      </Link>
                    </HoverCard>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>

            <div className="text-center mt-8">
              <Link
                href={`/${locale}/festivals`}
                className="inline-flex items-center gap-2 text-sm text-primary hover:underline font-medium"
              >
                See all {stats?.festivals ?? 183} festivals →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Newsletter — The Window */}
      <section className="px-4 py-20">
        <div className="mx-auto max-w-3xl">
          <ScrollReveal>
            <div className="rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/10 via-card to-amber-500/5 p-8 sm:p-12 text-center">
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-3">
                The Window · Every Sunday
              </p>
              <h2 className="text-3xl font-bold sm:text-4xl">
                One score. One skip. Four minutes.
              </h2>
              <p className="mt-3 text-muted-foreground leading-relaxed max-w-xl mx-auto">
                The best-scored destination this week, one place you should avoid, a road update, and what
                changed in our data. Delivered Sunday morning. Free, no spam, unsubscribe anytime.
              </p>
              <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  href={`/${locale}/newsletter`}
                  className="rounded-full bg-primary px-8 py-3.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  Subscribe to The Window →
                </Link>
                <Link
                  href={`/${locale}/the-window`}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  See past issues
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

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

/* ─── Live search bar for hero section ────────────────────────────── */

const getSb = getBrowserSupabase;

interface HeroResult {
  id: string;
  name: string;
  state_name?: string;
  type: "destination" | "collection" | "state";
}

function HeroSearch({ locale }: { locale: string }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<HeroResult[]>([]);
  const [active, setActive] = useState(-1);
  const [focused, setFocused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const search = useCallback(async (q: string) => {
    if (q.length < 2) { setResults([]); return; }
    const sb = getSb();
    if (!sb) return;

    const pattern = `%${q}%`;
    const [dests, colls, states] = await Promise.all([
      sb.from("destinations").select("id, name, state:states(name)").ilike("name", pattern).limit(6),
      sb.from("collections").select("id, name").ilike("name", pattern).limit(3),
      sb.from("states").select("id, name").ilike("name", pattern).limit(3),
    ]);

    const items: HeroResult[] = [
      ...((dests.data ?? []) as any[]).map((d: any) => ({
        id: d.id, name: d.name,
        state_name: Array.isArray(d.state) ? d.state[0]?.name : d.state?.name,
        type: "destination" as const,
      })),
      ...((states.data ?? []) as any[]).map((s: any) => ({
        id: s.id, name: s.name, type: "state" as const,
      })),
      ...((colls.data ?? []) as any[]).map((c: any) => ({
        id: c.id, name: c.name, type: "collection" as const,
      })),
    ];
    setResults(items);
    setActive(-1);
  }, []);

  useEffect(() => {
    clearTimeout(timerRef.current);
    if (query.length < 2) { setResults([]); return; }
    timerRef.current = setTimeout(() => search(query), 200);
    return () => clearTimeout(timerRef.current);
  }, [query, search]);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) setFocused(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  function navigate(item: HeroResult) {
    setFocused(false);
    setQuery("");
    setResults([]);
    const path = item.type === "destination" ? `/${locale}/destination/${item.id}`
      : item.type === "state" ? `/${locale}/state/${item.id}`
      : `/${locale}/collections/${item.id}`;
    router.push(path);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") { e.preventDefault(); setActive((a) => Math.min(a + 1, results.length - 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)); }
    else if (e.key === "Enter") {
      if (active >= 0 && results[active]) navigate(results[active]);
      else if (query) router.push(`/${locale}/explore?q=${encodeURIComponent(query)}`);
    }
    else if (e.key === "Escape") { setFocused(false); }
  }

  const showDropdown = focused && results.length > 0;
  const typeLabel: Record<string, string> = { destination: "📍", state: "🗺️", collection: "📦" };

  return (
    <div ref={wrapperRef} className="relative">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setFocused(true)}
        onKeyDown={handleKeyDown}
        placeholder={locale === "hi" ? "जगह खोजें — स्पिति, मनाली, ऋषिकेश..." : "Search destinations — Spiti, Manali, Rishikesh..."}
        className="w-full rounded-full border border-border/50 bg-card/60 backdrop-blur-md px-6 py-4 text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 shadow-lg"
      />
      <button
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
        onClick={() => { if (query) router.push(`/${locale}/explore?q=${encodeURIComponent(query)}`); }}
      >
        {locale === "hi" ? "खोजें" : "Search"}
      </button>

      {showDropdown && (
        <div className="absolute top-full left-0 right-0 mt-2 rounded-2xl border border-border bg-card/95 backdrop-blur-xl shadow-2xl overflow-hidden z-50 max-h-[320px] overflow-y-auto">
          {results.map((item, i) => (
            <button
              key={`${item.type}-${item.id}`}
              onClick={() => navigate(item)}
              className={`w-full text-left px-5 py-3 flex items-center gap-3 transition-colors ${
                i === active ? "bg-primary/10 text-foreground" : "hover:bg-muted/50 text-foreground"
              } ${i > 0 ? "border-t border-border/30" : ""}`}
            >
              <span className="text-base shrink-0">{typeLabel[item.type]}</span>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-medium truncate">{item.name}</div>
                {item.state_name && <div className="text-[11px] text-muted-foreground">{item.state_name}</div>}
                {item.type === "collection" && <div className="text-[11px] text-muted-foreground">Collection</div>}
                {item.type === "state" && <div className="text-[11px] text-muted-foreground">State</div>}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
