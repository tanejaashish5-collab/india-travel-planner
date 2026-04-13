"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
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

const SCORE_MARKER_COLORS: Record<number, string> = {
  5: "#10b981",
  4: "#3b82f6",
  3: "#eab308",
  2: "#f97316",
  1: "#ef4444",
  0: "#71717a",
};

function HomeMiniMap({ pins, locale }: { pins: MapPin[]; locale: string }) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    import("leaflet").then((L) => {
      const map = L.map(mapRef.current!, {
        center: [28.5, 78.0],
        zoom: 6,
        zoomControl: true,
        scrollWheelZoom: false,
        attributionControl: false,
      });

      // dark_nolabels avoids Chinese/local-script labels near borders
      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png",
        { maxZoom: 19 }
      ).addTo(map);

      const validPins = pins.filter((p) => p.lat && p.lng);

      validPins.forEach((pin) => {
        const color =
          SCORE_MARKER_COLORS[pin.score ?? 0] ?? SCORE_MARKER_COLORS[0];

        const marker = L.circleMarker([pin.lat, pin.lng], {
          radius: 6,
          fillColor: color,
          color: "#000",
          weight: 1,
          opacity: 0.8,
          fillOpacity: 0.9,
        }).addTo(map);

        const scoreText =
          pin.score !== null ? `${pin.score}/5` : "No score";

        marker.bindPopup(
          `<div style="min-width:160px;font-family:system-ui;color:#e5e5e5;">
            <h3 style="margin:0 0 4px;font-size:14px;font-weight:600;color:#fff;">${pin.name}</h3>
            <div style="display:flex;gap:8px;margin-bottom:6px;">
              <span style="background:${color}22;color:${color};padding:2px 8px;border-radius:10px;font-size:11px;font-weight:600;">${scoreText}</span>
            </div>
            <a href="/${locale}/destination/${pin.id}" style="color:#3b82f6;font-size:12px;text-decoration:none;font-weight:500;">View details &rarr;</a>
          </div>`,
          { className: "dark-popup" }
        );
      });

      if (validPins.length > 0) {
        const bounds = L.latLngBounds(
          validPins.map((p) => [p.lat, p.lng] as [number, number])
        );
        map.fitBounds(bounds, { padding: [30, 30] });
      }

      mapInstanceRef.current = map;
    });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [pins, locale]);

  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css"
      />
      <style>{`
        .dark-popup .leaflet-popup-content-wrapper {
          background: #1a1a2e;
          border: 1px solid #333;
          border-radius: 12px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.5);
        }
        .dark-popup .leaflet-popup-tip {
          background: #1a1a2e;
          border: 1px solid #333;
        }
        .dark-popup .leaflet-popup-close-button {
          color: #888 !important;
        }
      `}</style>
      <div
        ref={mapRef}
        className="w-full h-[300px] sm:h-[400px] rounded-xl border border-border overflow-hidden"
        style={{ background: "#1a1a2e" }}
      />
      {/* Legend */}
      <div className="mt-3 flex flex-wrap items-center justify-center gap-3 text-xs text-muted-foreground">
        <span className="font-medium">This month:</span>
        {[5, 4, 3, 2, 1].map((s) => (
          <span key={s} className="flex items-center gap-1">
            <span
              className="inline-block h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: SCORE_MARKER_COLORS[s] }}
            />
            {s}/5
          </span>
        ))}
        <span className="flex items-center gap-1">
          <span
            className="inline-block h-2.5 w-2.5 rounded-full"
            style={{ backgroundColor: SCORE_MARKER_COLORS[0] }}
          />
          No data
        </span>
      </div>
    </>
  );
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
            poster="/images/destinations/spiti-valley.jpg"
          >
            <source src="/videos/hero.mp4" type="video/mp4" />
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
              <div className="relative">
                <input
                  type="text"
                  placeholder={locale === "hi" ? "जगह खोजें — स्पिति, मनाली, ऋषिकेश..." : "Search destinations — Spiti, Manali, Rishikesh..."}
                  className="w-full rounded-full border border-border/50 bg-card/60 backdrop-blur-md px-6 py-4 text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 shadow-lg"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      const q = (e.target as HTMLInputElement).value;
                      if (q) window.location.href = `/${locale}/explore?q=${encodeURIComponent(q)}`;
                    }
                  }}
                />
                <button
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
                  onClick={(e) => {
                    const input = (e.currentTarget.previousElementSibling as HTMLInputElement);
                    if (input?.value) window.location.href = `/${locale}/explore?q=${encodeURIComponent(input.value)}`;
                  }}
                >
                  {locale === "hi" ? "खोजें" : "Search"}
                </button>
              </div>
              {/* Quick region shortcuts */}
              <div className="flex flex-wrap items-center justify-center gap-2 mt-3">
                <span className="text-xs text-muted-foreground/50">{locale === "hi" ? "तुरंत:" : "Quick:"}</span>
                {[
                  { href: `/${locale}/region/himachal-pradesh`, label: locale === "hi" ? "हिमाचल" : "Himachal" },
                  { href: `/${locale}/region/uttarakhand`, label: locale === "hi" ? "उत्तराखंड" : "Uttarakhand" },
                  { href: `/${locale}/region/jammu-kashmir`, label: locale === "hi" ? "कश्मीर" : "Kashmir" },
                  { href: `/${locale}/region/ladakh`, label: locale === "hi" ? "लद्दाख" : "Ladakh" },
                  { href: `/${locale}/region/rajasthan`, label: locale === "hi" ? "राजस्थान" : "Rajasthan" },
                  { href: `/${locale}/region/northeast`, label: locale === "hi" ? "पूर्वोत्तर" : "Northeast" },
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
              { num: stats?.destinations ?? 229, suffix: "", label: "Destinations", href: `/${locale}/explore` },
              { num: stats?.places ?? 590, suffix: "+", label: t("stats.places"), href: `/${locale}/explore` },
              { num: stats?.festivals ?? 183, suffix: "", label: "Festivals", href: `/${locale}/festivals` },
              { num: stats?.routes ?? 39, suffix: "", label: t("stats.routes"), href: `/${locale}/routes` },
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

      {/* Interactive Map */}
      {mapPins && mapPins.length > 0 && (
        <section className="px-4 py-20">
          <div className="mx-auto max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="text-center mb-8">
                <p className="text-sm font-medium text-primary uppercase tracking-widest mb-2">
                  Explore the Map
                </p>
                <h2 className="text-3xl font-bold sm:text-4xl">
                  {mapPins.length} Destinations Across North India
                </h2>
                <p className="mt-2 text-muted-foreground">
                  Click any pin to see this month's score and jump to details
                </p>
              </div>
              <HomeMiniMap pins={mapPins} locale={locale} />
            </motion.div>
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
                          <img
                            src={`/images/destinations/${dest.id}.jpg`}
                            alt={dest.name}
                            className="w-full h-full object-cover ken-burns"
                            loading="lazy"
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
                View all {stats?.destinations ?? 229} destinations →
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
