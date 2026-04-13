"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { MonthlyChart } from "./monthly-chart";
import { WeatherWidget } from "./weather-widget";
import { ShareButton } from "./share-button";
import { WhatsAppShare } from "./whatsapp-share";
import { CompareButton } from "./compare-tray";
import { DistanceBadge } from "./distance-badge";
import { lazy, Suspense } from "react";
import { ConfidenceCardComponent } from "./confidence-card";

const DestinationMap = lazy(() => import("./destination-map").then((mod) => ({ default: mod.DestinationMap })));
import { KidsBadge } from "./kids-badge";
import { TouristTrapIntervention } from "./tourist-trap-intervention";
import { TravelerNotes } from "./traveler-notes";
import { ReviewsList } from "./reviews-list";
import { ReviewForm } from "./review-form";
import { BookingHandoff } from "./booking-handoff";
import { InternationalInfoSection } from "./international-info";
import { EmergencySOSSection, SOSFloatingButton } from "./emergency-sos";
import { DestinationAlerts } from "./destination-alerts";
import { FadeIn, SlideIn, HoverCard, StaggerContainer, StaggerItem, ScrollReveal } from "./animated-hero";
import { Footer } from "./footer";
import { StickyDestinationHeader } from "./sticky-destination-header";
import { POISection } from "./poi-section";
import { SCORE_COLORS, DIFFICULTY_BG, DIFFICULTY_COLORS } from "@/lib/design-tokens";

export function DestinationDetail({ dest }: { dest: any }) {
  const locale = useLocale();
  const t = useTranslations("destination");
  const tm = useTranslations("months");

  const TABS = [
    { id: "overview", label: t("overview") },
    { id: "monthly", label: t("monthly") },
    { id: "kids", label: t("kids") },
    { id: "safety", label: t("safety") },
    { id: "places", label: t("places") },
    { id: "food", label: t("foodAndPeople") },
    { id: "reviews", label: "Reviews" },
  ];
  const [activeTab, setActiveTab] = useState("overview");
  const [saved, setSaved] = useState(false);

  // Translation-aware name, tagline, and why_special
  const displayName = (locale !== "en" && dest.translations?.[locale]?.name) || dest.name;
  const displayTagline = (locale !== "en" && dest.translations?.[locale]?.tagline) || dest.tagline;
  const displayWhySpecial = (locale !== "en" && dest.translations?.[locale]?.why_special) || dest.why_special;

  // Check localStorage for saved state
  useEffect(() => {
    const savedDests = JSON.parse(localStorage.getItem("savedDestinations") || "[]");
    setSaved(savedDests.includes(dest.id));
  }, [dest.id]);

  function toggleSave() {
    const savedDests = JSON.parse(localStorage.getItem("savedDestinations") || "[]");
    if (saved) {
      const filtered = savedDests.filter((id: string) => id !== dest.id);
      localStorage.setItem("savedDestinations", JSON.stringify(filtered));
      setSaved(false);
    } else {
      savedDests.push(dest.id);
      localStorage.setItem("savedDestinations", JSON.stringify(savedDests));
      setSaved(true);
    }
  }

  const kf = Array.isArray(dest.kids_friendly) ? dest.kids_friendly[0] : dest.kids_friendly;
  const cc = Array.isArray(dest.confidence_cards) ? dest.confidence_cards[0] : dest.confidence_cards;
  const stateName = Array.isArray(dest.state) ? dest.state[0]?.name : dest.state?.name;
  const months = (dest.destination_months ?? []).sort((a: any, b: any) => a.month - b.month);
  const subs = dest.sub_destinations ?? [];
  const gems = dest.hidden_gems ?? [];
  const legends = dest.local_legends ?? [];
  const eats = dest.viral_eats ?? [];
  const trapAlts = dest.trap_alternatives ?? [];
  const pois = dest.points_of_interest ?? [];

  const currentMonth = new Date().getMonth() + 1;
  const currentScore = months.find((m: any) => m.month === currentMonth)?.score ?? null;
  const currentMonthData = months.find((m: any) => m.month === currentMonth);

  // Traveler fit based on data
  const travelerFit = getTravelerFit(dest, kf);

  // Filter tabs to only show ones with data
  const availableTabs = TABS.filter((tab) => {
    if (tab.id === "monthly" && months.length === 0) return false;
    if (tab.id === "kids" && !kf) return false;
    if (tab.id === "safety" && !cc) return false;
    if (tab.id === "places" && subs.length === 0 && gems.length === 0 && pois.length === 0) return false;
    if (tab.id === "food" && legends.length === 0 && eats.length === 0) return false;
    if (tab.id === "reviews" && (!dest.traveler_notes || dest.traveler_notes.length === 0) && (!dest.reviews || dest.reviews.length === 0)) return false;
    return true;
  });

  return (
    <>
      <div>
        {/* Breadcrumb */}
        <FadeIn>
          <div className="mb-4 flex items-center justify-between">
            <div className="text-[15px] text-muted-foreground">
              <Link href={`/${locale}/explore`} className="hover:text-foreground transition-colors">Explore</Link>
              {" → "}
              <Link href={`/${locale}/region/${dest.state_id}`} className="hover:text-foreground transition-colors">{stateName}</Link>
              {" → "}
              <span className="text-foreground">{displayName}</span>
            </div>
            <div className="flex items-center gap-2">
              {/* Compare */}
              <CompareButton destinationId={dest.id} size="md" />
              {/* Share */}
              <ShareButton
                title={`${displayName} — NakshIQ`}
                text={`${displayTagline} | ${dest.difficulty} · ${dest.elevation_m ? dest.elevation_m + 'm' : ''}`}
              />
              {/* WhatsApp */}
              <WhatsAppShare
                message={`${displayName} — ${displayTagline}. Travel guide: https://nakshiq.com/en/destination/${dest.id}`}
              />
              {/* Save Button */}
              <button
                onClick={toggleSave}
                className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium transition-all ${
                  saved
                    ? "border-red-500/50 bg-red-500/10 text-red-400"
                    : "border-border text-muted-foreground hover:text-foreground hover:border-muted-foreground"
                }`}
                aria-label={saved ? "Remove from saved" : "Save destination"}
              >
                <span>{saved ? "♥" : "♡"}</span>
                <span>{saved ? "Saved" : "Save"}</span>
              </button>
            </div>
          </div>
        </FadeIn>

        {/* Real-time alerts */}
        <DestinationAlerts destinationId={dest.id} />

        {/* Cinematic Hero — video where available */}
        <FadeIn>
          <div className="mb-6 relative h-56 sm:h-72 lg:h-96 rounded-2xl overflow-hidden film-grain" style={{ background: "linear-gradient(135deg, oklch(0.25 0.02 260), oklch(0.18 0.01 280))" }}>
            {/* Video hero for destinations with clips */}
            {["chopta-tungnath","darjeeling","amritsar","jaisalmer","srinagar","kedarnath","leh","manali","pangong-lake","pushkar","jodhpur","rishikesh","spiti-valley","tawang","tirthan-valley","valley-of-flowers","varanasi","kasol-parvati-valley","nubra-valley"].includes(dest.id) ? (
              <video
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
                poster={`/images/destinations/${dest.id}.jpg`}
              >
                <source src={`/videos/${dest.id}.mp4`} type="video/mp4" />
              </video>
            ) : (
              <Image
                src={`/images/destinations/${dest.id}.jpg`}
                alt={dest.name}
                fill
                sizes="100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
            {/* Floating difficulty badge */}
            <div className="absolute top-4 left-4">
              <span className={`inline-block rounded-lg px-3 py-1.5 text-xs font-semibold capitalize backdrop-blur-md ${DIFFICULTY_BG[dest.difficulty] ?? "bg-muted/80"}`}>
                {dest.difficulty}
              </span>
            </div>
          </div>
        </FadeIn>

        {/* Sticky mobile header — appears after scrolling past hero */}
        <StickyDestinationHeader
          name={displayName}
          score={currentScore}
          monthLabel={tm(String(currentMonth))}
          stateId={dest.state_id}
        />

        {/* Hero Card */}
        <SlideIn delay={0.1}>
          <div className="mb-6 rounded-2xl border border-border/50 bg-card p-6 sm:p-8 -mt-24 relative z-10 shadow-2xl shadow-black/20">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-3xl font-bold sm:text-4xl lg:text-5xl">{displayName}</h1>
                {/* Location line */}
                <p className="mt-2 text-sm text-muted-foreground">
                  {stateName}{dest.region ? ` · ${dest.region}` : ""}
                  {dest.elevation_m && <span className="font-mono"> · {dest.elevation_m.toLocaleString()}m</span>}
                </p>
                {/* Badges row */}
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  {dest.vehicle_fit && (
                    <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-medium ${
                      dest.vehicle_fit.includes("hatchback") ? "border-emerald-500/30 text-emerald-400" :
                      dest.vehicle_fit.includes("SUV") ? "border-yellow-500/30 text-yellow-400" :
                      dest.vehicle_fit.includes("4WD") ? "border-red-500/30 text-red-400" :
                      "border-border text-muted-foreground"
                    }`}>
                      {dest.vehicle_fit.includes("bike") ? "🏍️" : "🚗"} {dest.vehicle_fit}
                    </span>
                  )}
                  {dest.family_stress && (
                    <span className="inline-flex items-center gap-1 rounded-full border border-border px-2.5 py-1 text-xs font-medium text-muted-foreground">
                      👨‍👩‍👧 {dest.family_stress}
                    </span>
                  )}
                  <DistanceBadge destLat={dest.coords?.lat} destLng={dest.coords?.lng} elevation={dest.elevation_m} />
                </div>
              </div>
              {currentScore !== null && (
                <motion.div
                  initial={{ scale: 0, rotate: -10 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 300, delay: 0.3 }}
                  className={`rounded-2xl border-2 px-5 py-3 text-center backdrop-blur-sm shadow-lg ${SCORE_COLORS[currentScore] ?? SCORE_COLORS[0]}`}
                >
                  <div className="text-3xl font-bold font-mono">{currentScore}/5</div>
                  <div className="text-xs font-medium uppercase tracking-wider mt-0.5">{tm(String(currentMonth))}</div>
                </motion.div>
              )}
            </div>

            {/* Score Explainability */}
            {currentMonthData && (
              <div className="mt-3 text-[15px] text-muted-foreground">
                <span className="font-medium text-foreground">Why {currentScore}/5?</span>{" "}
                {currentMonthData.note}
              </div>
            )}

            <p className="mt-4 text-lg leading-relaxed text-muted-foreground/90">{displayTagline}</p>

            {/* Quick stats */}
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <div className="rounded-xl border border-border/30 bg-muted/20 p-3">
                <div className="text-xs uppercase tracking-wider text-muted-foreground/70">{t("difficulty")}</div>
                <div className={`mt-1.5 text-sm font-semibold capitalize ${DIFFICULTY_COLORS[dest.difficulty] ?? ""}`}>
                  {dest.difficulty}
                </div>
              </div>
              {(dest.ideal_duration_min || dest.ideal_duration_max) && (
              <div className="rounded-xl border border-border/50 bg-background/50 backdrop-blur-sm p-3">
                <div className="text-xs uppercase tracking-wide text-muted-foreground">{t("duration")}</div>
                <div className="mt-1 text-sm font-semibold">{dest.ideal_duration_min && dest.ideal_duration_max ? `${dest.ideal_duration_min}-${dest.ideal_duration_max} days` : dest.ideal_duration_min ? `${dest.ideal_duration_min}+ days` : `Up to ${dest.ideal_duration_max} days`}</div>
              </div>
              )}
              <div className="rounded-xl border border-border/50 bg-background/50 backdrop-blur-sm p-3">
                <div className="text-xs uppercase tracking-wide text-muted-foreground">{t("budget")}</div>
                <div className="mt-1 text-sm font-semibold capitalize">{dest.budget_tier ?? "mixed"}</div>
              </div>
              <div className="rounded-xl border border-border/50 bg-background/50 backdrop-blur-sm p-3">
                <div className="text-xs uppercase tracking-wide text-muted-foreground">{t("kidsRating")}</div>
                <div className={`mt-1 text-sm font-semibold ${kf?.suitable ? "text-emerald-400" : kf ? "text-red-400" : ""}`}>
                  {kf ? (kf.suitable ? `${kf.rating}/5 ✓` : "Not suitable") : "N/A"}
                </div>
              </div>
            </div>

            {/* Month-by-Month Navigation */}
            <div className="mt-4">
              <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">See by month</div>
              <div className="flex flex-wrap gap-1">
                {["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"].map((m, i) => {
                  const monthData = months.find((md: any) => md.month === i + 1);
                  const score = monthData?.score ?? 0;
                  const slug = ["january","february","march","april","may","june","july","august","september","october","november","december"][i];
                  const scoreColor = score >= 4 ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" : score >= 3 ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" : score >= 2 ? "bg-orange-500/20 text-orange-400 border-orange-500/30" : score >= 1 ? "bg-red-500/20 text-red-400 border-red-500/30" : "bg-zinc-500/20 text-zinc-400 border-zinc-500/30";
                  const isCurrent = i + 1 === currentMonth;
                  return (
                    <Link
                      key={m}
                      href={`/${locale}/destination/${dest.id}/${slug}`}
                      className={`rounded-full border px-2.5 py-1 text-[10px] font-bold transition-all hover:scale-105 ${scoreColor} ${isCurrent ? "ring-1 ring-primary" : ""}`}
                    >
                      {m} {score}/5
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Quick links to related pages */}
            <div className="mt-3 flex flex-wrap gap-2">
              {(() => {
                const monthSlug = ["","january","february","march","april","may","june","july","august","september","october","november","december"][currentMonth];
                const monthName = ["","January","February","March","April","May","June","July","August","September","October","November","December"][currentMonth];
                return (
                  <Link href={`/${locale}/where-to-go/${monthSlug}`} className="rounded-full border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all">
                    All destinations in {monthName} →
                  </Link>
                );
              })()}
              {kf && (
                <Link href={`/${locale}/with-kids/${dest.id}`} className="rounded-full border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all">
                  👶 Family Guide →
                </Link>
              )}
              {dest.nearbyDestinations?.length > 0 && (
                <Link href={`/${locale}/vs/${dest.id}-vs-${dest.nearbyDestinations[0].id}`} className="rounded-full border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all">
                  ⚔ Compare →
                </Link>
              )}
            </div>

            {/* Live Weather */}
            <div className="mt-4">
              <WeatherWidget destinationId={dest.id} />
            </div>

            {/* Related Blog Articles */}
            {dest.relatedArticles?.length > 0 && (
              <div className="mt-4 space-y-2">
                {dest.relatedArticles.map((article: any) => (
                  <Link
                    key={article.slug}
                    href={`/${locale}/blog/${article.slug}`}
                    className="flex items-center gap-3 rounded-xl border border-primary/20 bg-primary/5 p-3 transition-all hover:border-primary/40 hover:bg-primary/10"
                  >
                    <span className="text-lg">📖</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold truncate">{article.title}</div>
                      <div className="text-xs text-muted-foreground">
                        {article.depth === "deep-dive" ? "Deep Dive" : "Brief"} · {article.reading_time} min read
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">→</span>
                  </Link>
                ))}
              </div>
            )}

            {/* Traveler Fit Cards — "Good For / Not Good For" */}
            <div className="mt-4 flex flex-wrap gap-2">
              {travelerFit.goodFor.map((item) => (
                <span key={item} className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 text-xs text-emerald-400">
                  <span>✓</span> {item}
                </span>
              ))}
              {travelerFit.notFor.map((item) => (
                <span key={item} className="inline-flex items-center gap-1 rounded-full bg-red-500/10 border border-red-500/20 px-2.5 py-1 text-xs text-red-400">
                  <span>✗</span> {item}
                </span>
              ))}
            </div>

            {/* Infrastructure Concerns — honest warnings */}
            {travelerFit.infraConcerns.length > 0 && (
              <div className="mt-4 rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-3">
                <div className="text-xs font-medium text-yellow-400 mb-2">⚠ Infrastructure reality check</div>
                <div className="space-y-1">
                  {travelerFit.infraConcerns.map((concern, i) => (
                    <div key={i} className="flex items-start gap-1.5 text-xs text-yellow-300/70">
                      <span className="mt-0.5 shrink-0">•</span>
                      <span>{concern}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Data freshness + methodology */}
            <div className="mt-3 text-xs text-muted-foreground/50">
              Data verified: April 2026 · Scores based on weather, road access, crowd levels, infrastructure, safety conditions ·
              Kids ratings factor in: medical access, ATM availability, phone signal, altitude, road safety
            </div>
          </div>
        </SlideIn>

        {/* Infrastructure Reality — from confidence_cards data */}
        {cc && (
          <FadeIn delay={0.25}>
            <div className="mb-6 grid gap-2 grid-cols-2 sm:grid-cols-4">
              {/* Network */}
              {cc.network && (
                <div className="rounded-xl border border-border p-3 flex items-center gap-2.5">
                  <span className="text-lg">📶</span>
                  <div className="min-w-0">
                    <div className="text-xs text-muted-foreground">Network</div>
                    <div className="text-sm font-medium">
                      {[cc.network.jio && "Jio", cc.network.airtel && "Airtel", cc.network.bsnl && "BSNL", cc.network.vi && "Vi"].filter(Boolean).join(", ") || "Limited"}
                    </div>
                    {cc.network.note && <div className="text-xs text-muted-foreground/70 mt-0.5 line-clamp-1">{cc.network.note}</div>}
                  </div>
                </div>
              )}
              {/* Medical */}
              {cc.emergency?.nearest_hospital && (
                <div className="rounded-xl border border-border p-3 flex items-center gap-2.5">
                  <span className="text-lg">🏥</span>
                  <div className="min-w-0">
                    <div className="text-xs text-muted-foreground">Medical</div>
                    <div className="text-sm font-medium line-clamp-2">{cc.emergency.nearest_hospital}</div>
                  </div>
                </div>
              )}
              {/* Transport */}
              {cc.reach && (
                <div className="rounded-xl border border-border p-3 flex items-center gap-2.5">
                  <span className="text-lg">🚗</span>
                  <div className="min-w-0">
                    <div className="text-xs text-muted-foreground">Road</div>
                    <div className="text-sm font-medium capitalize">{cc.reach.road_condition || cc.reach.last_km_difficulty || "Check locally"}</div>
                  </div>
                </div>
              )}
              {/* Safety */}
              {cc.safety_rating && (
                <div className={`rounded-xl border p-3 flex items-center gap-2.5 ${
                  cc.safety_rating >= 4 ? "border-emerald-500/30 bg-emerald-500/5" :
                  cc.safety_rating >= 3 ? "border-yellow-500/30 bg-yellow-500/5" :
                  "border-red-500/30 bg-red-500/5"
                }`}>
                  <span className="text-lg">🛡️</span>
                  <div className="min-w-0">
                    <div className="text-xs text-muted-foreground">Safety</div>
                    <div className="text-sm font-medium">{cc.safety_rating}/5</div>
                  </div>
                </div>
              )}
            </div>
          </FadeIn>
        )}

        {/* Mini-map — "Where exactly is this?" */}
        {dest.coords?.lat && dest.coords?.lng && (
          <FadeIn delay={0.3}>
            <div className="mb-6 rounded-2xl border border-border overflow-hidden">
              <div className="h-48 sm:h-56">
                <Suspense fallback={<div className="w-full h-full bg-muted/30 flex items-center justify-center text-muted-foreground text-sm">Loading map...</div>}>
                  <DestinationMap lat={dest.coords.lat} lng={dest.coords.lng} name={displayName} elevation={dest.elevation_m} />
                </Suspense>
              </div>
            </div>
          </FadeIn>
        )}

        {/* Tab navigation — no FadeIn wrapper (breaks sticky) */}
        <div className="mb-6 sticky top-[64px] z-40" style={{ isolation: "isolate" }}>
          <div className="flex gap-1 overflow-x-auto rounded-xl border border-border bg-background p-1 shadow-sm">
            {availableTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative rounded-lg px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors ${
                  activeTab === tab.id ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 rounded-lg bg-background border border-border shadow-sm"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === "overview" && (
              <div className="space-y-8">
                {/* Why Special */}
                <section>
                  <h2 className="text-xl font-semibold mb-3">Why Special</h2>
                  <p className="text-[15px] text-muted-foreground leading-relaxed">{displayWhySpecial}</p>
                </section>

                {/* Who Should Skip — anti-brochure honesty */}
                {travelerFit.notFor.length > 0 && (
                  <section className="rounded-xl border border-orange-500/20 bg-orange-500/5 p-5">
                    <h2 className="text-lg font-semibold text-orange-300 mb-3">Who Should Think Twice</h2>
                    <div className="space-y-2">
                      {travelerFit.notFor.map((reason, i) => (
                        <div key={i} className="flex items-start gap-2 text-[15px] text-orange-200/80">
                          <span className="mt-0.5 text-orange-400">⚠</span>
                          <span>{reason}</span>
                        </div>
                      ))}
                    </div>
                    {travelerFit.infraConcerns.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-orange-500/10">
                        <p className="text-xs font-medium text-orange-300/60 uppercase tracking-wider mb-2">Infrastructure concerns</p>
                        <div className="space-y-1.5">
                          {travelerFit.infraConcerns.map((c, i) => (
                            <p key={i} className="text-sm text-orange-200/60">{c}</p>
                          ))}
                        </div>
                      </div>
                    )}
                  </section>
                )}

                {/* Tourist Trap Alternatives — ASSISTIVE, not pre-emptive */}
                {trapAlts.length > 0 && (
                  <TouristTrapIntervention trapName={dest.name} alternatives={trapAlts} />
                )}

                {/* Tags */}
                {dest.tags?.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {dest.tags.map((tag: string) => (
                      <span key={tag} className="rounded-full border border-border px-3 py-1 text-sm text-muted-foreground hover:border-primary/50 transition-colors">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Festivals */}
                {dest.festivals?.length > 0 && (
                  <section>
                    <h2 className="text-xl font-semibold mb-3">Festivals & Events</h2>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {dest.festivals.map((f: any, i: number) => {
                        const MONTH_SHORT = ["","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
                        return (
                          <div key={i} className="rounded-xl border border-border p-4 hover:border-primary/30 transition-colors">
                            <div className="flex items-start justify-between gap-2 mb-1">
                              <h3 className="font-semibold text-sm">{f.name}</h3>
                              <span className="shrink-0 rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                                {MONTH_SHORT[f.month]}
                              </span>
                            </div>
                            <p className="text-xs text-muted-foreground/80 mb-2">{f.approximate_date}</p>
                            <p className="text-sm text-muted-foreground leading-relaxed">{f.description}</p>
                            {f.significance && (
                              <p className="mt-2 text-xs italic text-primary/70">{f.significance}</p>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </section>
                )}

                {/* Infrastructure Reality Panel — from confidence_cards */}
                {cc && (
                  <section>
                    <h2 className="text-xl font-semibold mb-3">Infrastructure Reality</h2>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {/* Network detail */}
                      {cc.network && (
                        <div className="rounded-xl border border-border p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-lg">📶</span>
                            <h3 className="text-sm font-semibold">Network Coverage</h3>
                          </div>
                          <div className="flex flex-wrap gap-2 mb-2">
                            {cc.network.jio && <span className="rounded-full bg-blue-500/10 text-blue-300 px-2.5 py-1 text-xs font-medium">Jio</span>}
                            {cc.network.airtel && <span className="rounded-full bg-red-500/10 text-red-300 px-2.5 py-1 text-xs font-medium">Airtel</span>}
                            {cc.network.bsnl && <span className="rounded-full bg-yellow-500/10 text-yellow-300 px-2.5 py-1 text-xs font-medium">BSNL</span>}
                            {cc.network.vi && <span className="rounded-full bg-purple-500/10 text-purple-300 px-2.5 py-1 text-xs font-medium">Vi</span>}
                            {!cc.network.jio && !cc.network.airtel && !cc.network.bsnl && <span className="text-sm text-red-400">No coverage</span>}
                          </div>
                          {cc.network.note && <p className="text-sm text-muted-foreground">{cc.network.note}</p>}
                          {cc.network.wifi_available && <p className="text-xs text-muted-foreground/70 mt-1">WiFi: {cc.network.wifi_available}</p>}
                        </div>
                      )}

                      {/* Medical */}
                      {cc.emergency && (
                        <div className="rounded-xl border border-border p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-lg">🏥</span>
                            <h3 className="text-sm font-semibold">Medical & Emergency</h3>
                          </div>
                          {cc.emergency.nearest_hospital && <p className="text-sm text-muted-foreground mb-1"><span className="font-medium text-foreground">Hospital:</span> {cc.emergency.nearest_hospital}</p>}
                          {cc.emergency.ambulance && <p className="text-sm text-muted-foreground mb-1"><span className="font-medium text-foreground">Ambulance:</span> {cc.emergency.ambulance}</p>}
                          {cc.emergency.police_station && <p className="text-sm text-muted-foreground"><span className="font-medium text-foreground">Police:</span> {cc.emergency.police_station}</p>}
                        </div>
                      )}

                      {/* How to reach */}
                      {cc.reach && (
                        <div className="rounded-xl border border-border p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-lg">🚗</span>
                            <h3 className="text-sm font-semibold">Getting There</h3>
                          </div>
                          {cc.reach.from_nearest_city && <p className="text-sm text-muted-foreground mb-1">{cc.reach.from_nearest_city}</p>}
                          {cc.reach.road_condition && <p className="text-sm text-muted-foreground mb-1"><span className="font-medium text-foreground">Roads:</span> {cc.reach.road_condition}</p>}
                          {cc.reach.public_transport && <p className="text-sm text-muted-foreground"><span className="font-medium text-foreground">Public transport:</span> {cc.reach.public_transport}</p>}
                        </div>
                      )}

                      {/* Fuel & Stay */}
                      {(cc.fuel || cc.sleep) && (
                        <div className="rounded-xl border border-border p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-lg">⛽</span>
                            <h3 className="text-sm font-semibold">Fuel & Stay</h3>
                          </div>
                          {cc.fuel?.nearest_pump && <p className="text-sm text-muted-foreground mb-1"><span className="font-medium text-foreground">Fuel:</span> {cc.fuel.nearest_pump}</p>}
                          {cc.fuel?.note && <p className="text-sm text-muted-foreground mb-1">{cc.fuel.note}</p>}
                          {cc.sleep?.budget && <p className="text-sm text-muted-foreground mb-1"><span className="font-medium text-foreground">Budget stay:</span> {cc.sleep.budget}</p>}
                          {cc.sleep?.mid && <p className="text-sm text-muted-foreground"><span className="font-medium text-foreground">Mid-range:</span> {cc.sleep.mid}</p>}
                        </div>
                      )}
                    </div>

                    {/* Helpline */}
                    {cc.emergency?.helpline && (
                      <div className="mt-3 rounded-xl border border-primary/20 bg-primary/5 p-3">
                        <p className="text-sm"><span className="font-semibold">Helpline:</span> {cc.emergency.helpline}</p>
                      </div>
                    )}
                  </section>
                )}

                {/* Where to Stay — strategic data */}
                {dest.stay_zones && Object.keys(dest.stay_zones).length > 0 && (
                  <section>
                    <h2 className="text-xl font-semibold mb-3">Where to Stay</h2>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {dest.stay_zones.best_for_families && (
                        <div className="rounded-xl border border-border p-4">
                          <div className="text-xs text-emerald-400 font-medium uppercase tracking-wide mb-1">Best for Families</div>
                          <div className="text-[15px]">{dest.stay_zones.best_for_families}</div>
                        </div>
                      )}
                      {dest.stay_zones.best_for_backpackers && (
                        <div className="rounded-xl border border-border p-4">
                          <div className="text-xs text-blue-400 font-medium uppercase tracking-wide mb-1">Best for Backpackers</div>
                          <div className="text-[15px]">{dest.stay_zones.best_for_backpackers}</div>
                        </div>
                      )}
                      {dest.stay_zones.best_for_quiet && (
                        <div className="rounded-xl border border-border p-4">
                          <div className="text-xs text-purple-400 font-medium uppercase tracking-wide mb-1">Best for Peace & Quiet</div>
                          <div className="text-[15px]">{dest.stay_zones.best_for_quiet}</div>
                        </div>
                      )}
                      {dest.stay_zones.avoid && (
                        <div className="rounded-xl border border-orange-500/20 bg-orange-500/5 p-4">
                          <div className="text-xs text-orange-400 font-medium uppercase tracking-wide mb-1">Avoid</div>
                          <div className="text-[15px] text-orange-200/80">{dest.stay_zones.avoid}</div>
                        </div>
                      )}
                    </div>
                    {/* Budget bands */}
                    {dest.stay_zones.budget_range && (
                      <div className="mt-3 flex gap-4 text-sm">
                        {dest.stay_zones.budget_range.off_season && (
                          <span className="text-muted-foreground">Off-season: <span className="font-mono font-medium text-foreground">{dest.stay_zones.budget_range.off_season}</span>/night</span>
                        )}
                        {dest.stay_zones.budget_range.peak && (
                          <span className="text-muted-foreground">Peak: <span className="font-mono font-medium text-foreground">{dest.stay_zones.budget_range.peak}</span>/night</span>
                        )}
                      </div>
                    )}
                    {/* Stay types */}
                    {dest.stay_zones.stay_types?.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {dest.stay_zones.stay_types.map((type: string) => (
                          <span key={type} className="rounded-full border border-border px-2.5 py-1 text-xs font-medium text-muted-foreground capitalize">
                            {type}
                          </span>
                        ))}
                      </div>
                    )}
                  </section>
                )}

                {/* Trip Cost Estimator */}
                {dest.daily_cost && (
                  <section>
                    <h2 className="text-xl font-semibold mb-3">Daily Budget Reality</h2>
                    <div className="grid gap-3 sm:grid-cols-3">
                      {[
                        { key: "budget", label: "Budget", color: "emerald", icon: "🎒" },
                        { key: "midrange", label: "Mid-range", color: "blue", icon: "🏨" },
                        { key: "luxury", label: "Luxury", color: "purple", icon: "✨" },
                      ].map(({ key, label, color, icon }) => {
                        const tier = dest.daily_cost[key];
                        if (!tier) return null;
                        return (
                          <div key={key} className={`rounded-xl border border-${color}-500/20 bg-${color}-500/5 p-4`}>
                            <div className="flex items-center gap-2 mb-3">
                              <span className="text-lg">{icon}</span>
                              <h3 className="text-sm font-semibold">{label}</h3>
                              <span className={`ml-auto text-lg font-mono font-bold text-${color}-400`}>₹{tier.total?.toLocaleString()}</span>
                            </div>
                            <div className="space-y-1.5 text-xs text-muted-foreground">
                              <div className="flex justify-between"><span>Stay</span><span className="font-mono">₹{tier.stay?.toLocaleString()}</span></div>
                              <div className="flex justify-between"><span>Food</span><span className="font-mono">₹{tier.food?.toLocaleString()}</span></div>
                              <div className="flex justify-between"><span>Transport</span><span className="font-mono">₹{tier.transport?.toLocaleString()}</span></div>
                              <div className="flex justify-between"><span>Activities</span><span className="font-mono">₹{tier.activities?.toLocaleString()}</span></div>
                            </div>
                            <div className="mt-2 pt-2 border-t border-border/30 text-xs text-muted-foreground/50">
                              per person per day
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    {dest.daily_cost.note && (
                      <p className="mt-3 text-sm italic text-muted-foreground/70">💡 {dest.daily_cost.note}</p>
                    )}
                  </section>
                )}

                {/* Crowd Calendar */}
                {dest.crowd_calendar && (
                  <section>
                    <h2 className="text-xl font-semibold mb-3">Crowd Intelligence</h2>
                    <div className="rounded-xl border border-border p-5">
                      {/* Visual month strip */}
                      <div className="flex gap-0.5 mb-3">
                        {Array.from({ length: 12 }, (_, i) => {
                          const m = i + 1;
                          const isPeak = dest.crowd_calendar.peak_months?.includes(m);
                          const isQuiet = dest.crowd_calendar.quiet_months?.includes(m);
                          const MNAMES = ["","J","F","M","A","M","J","J","A","S","O","N","D"];
                          return (
                            <div key={m} className="flex-1 text-center">
                              <div className={`h-2 rounded-full mb-1 ${
                                isPeak ? "bg-red-400" : isQuiet ? "bg-emerald-400" : "bg-yellow-400"
                              }`} />
                              <span className="text-xs text-muted-foreground">{MNAMES[m]}</span>
                            </div>
                          );
                        })}
                      </div>
                      <div className="flex gap-4 text-xs text-muted-foreground mb-3">
                        <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-emerald-400" /> Quiet</span>
                        <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-yellow-400" /> Moderate</span>
                        <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-red-400" /> Peak</span>
                      </div>
                      {dest.crowd_calendar.avoid_weekends && (
                        <p className="text-sm text-orange-300/80 mb-2">⚠ Avoid weekends — crowded with day-trippers</p>
                      )}
                      {dest.crowd_calendar.best_day && (
                        <p className="text-sm text-muted-foreground"><span className="font-medium text-foreground">Best days:</span> {dest.crowd_calendar.best_day}</p>
                      )}
                      {dest.crowd_calendar.note && (
                        <p className="text-sm text-muted-foreground mt-1">{dest.crowd_calendar.note}</p>
                      )}
                    </div>
                  </section>
                )}

                {/* Food & Dining */}
                {dest.food_scene && Object.keys(dest.food_scene).length > 0 && (
                  <section>
                    <h2 className="text-xl font-semibold mb-3">Food & Dining</h2>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {dest.food_scene.vegetarian_ease && (
                        <div className="rounded-xl border border-border p-4 flex items-start gap-3">
                          <span className="text-lg">🥬</span>
                          <div>
                            <div className="text-xs text-muted-foreground uppercase tracking-wide">Vegetarian</div>
                            <div className="text-sm font-medium capitalize mt-0.5">{dest.food_scene.vegetarian_ease}</div>
                          </div>
                        </div>
                      )}
                      {dest.food_scene.family_dining && (
                        <div className="rounded-xl border border-border p-4 flex items-start gap-3">
                          <span className="text-lg">👨‍👩‍👧</span>
                          <div>
                            <div className="text-xs text-muted-foreground uppercase tracking-wide">Family Dining</div>
                            <div className="text-sm font-medium mt-0.5">{dest.food_scene.family_dining}</div>
                          </div>
                        </div>
                      )}
                    </div>
                    {dest.food_scene.cuisine && (
                      <p className="mt-2 text-sm text-muted-foreground"><span className="font-medium text-foreground">Cuisine:</span> {dest.food_scene.cuisine}</p>
                    )}
                    {dest.food_scene.note && (
                      <p className="mt-1 text-sm italic text-muted-foreground/70">{dest.food_scene.note}</p>
                    )}
                  </section>
                )}

                {/* Workability badge — only for remote-work-friendly places */}
                {dest.workability?.remote_work_rating >= 3 && (
                  <section className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-4">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">💻</span>
                      <div>
                        <h3 className="text-sm font-semibold text-blue-300">Remote Work Friendly</h3>
                        <p className="text-sm text-muted-foreground mt-0.5">
                          WiFi: {dest.workability.wifi || "Available"} · Power: {dest.workability.power_cuts || "Stable"}
                          {dest.workability.coworking && dest.workability.coworking !== "none" && ` · Coworking: ${dest.workability.coworking}`}
                        </p>
                      </div>
                      <span className="ml-auto text-lg font-mono font-bold text-blue-400">{dest.workability.remote_work_rating}/5</span>
                    </div>
                  </section>
                )}

                {/* Access */}
                <section>
                  <h2 className="text-xl font-semibold mb-3">{t("howToReach")}</h2>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-xl border border-border p-4">
                      <div className="text-xs text-muted-foreground uppercase tracking-wide">Airport</div>
                      <div className="mt-1 text-sm">{dest.nearest_airport}</div>
                    </div>
                    <div className="rounded-xl border border-border p-4">
                      <div className="text-xs text-muted-foreground uppercase tracking-wide">Rail</div>
                      <div className="mt-1 text-sm">{dest.nearest_railhead}</div>
                    </div>
                  </div>
                </section>

                {/* Emergency SOS */}
                <EmergencySOSSection sos={dest.emergencySos} destinationName={displayName} />

                {/* International Traveler Info */}
                <InternationalInfoSection info={dest.international_info} />

                {/* Meet the Locals Preview */}
                {legends.length > 0 && (
                  <section>
                    <div className="flex items-center justify-between mb-3">
                      <h2 className="text-xl font-semibold">Meet the Locals</h2>
                      <button
                        onClick={() => setActiveTab("food")}
                        className="text-xs text-primary hover:underline"
                      >
                        View all &rarr;
                      </button>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {legends.slice(0, 2).map((legend: any) => (
                        <button
                          key={legend.id}
                          onClick={() => setActiveTab("food")}
                          className="flex items-center gap-3 rounded-xl border border-border p-3 hover:border-primary/30 transition-colors text-left"
                        >
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                            {legend.name.charAt(0)}
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className="font-medium text-sm truncate">{legend.name}</span>
                              {legend.verified && (
                                <svg className="h-3.5 w-3.5 text-emerald-400 shrink-0" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.403 12.652a3 3 0 010-5.304 3 3 0 00-3.75-3.751 3 3 0 00-5.305 0 3 3 0 00-3.751 3.75 3 3 0 000 5.305 3 3 0 003.75 3.751 3 3 0 005.305 0 3 3 0 003.751-3.75zm-2.546-4.46a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>
                              )}
                            </div>
                            {legend.role && <div className="text-[11px] text-muted-foreground truncate">{legend.role}</div>}
                            {legend.known_as && <div className="text-[11px] text-primary truncate">{legend.known_as}</div>}
                          </div>
                        </button>
                      ))}
                    </div>
                  </section>
                )}

                {/* Booking Handoff */}
                <BookingHandoff destinationName={dest.name} stateName={stateName} />
              </div>
            )}

            {activeTab === "monthly" && months.length > 0 && (
              <section>
                <h2 className="text-xl font-semibold mb-4">{t("bestMonths")}</h2>
                <MonthlyChart
                  scores={months.map((m: any) => ({
                    m: m.month, score: m.score, note: m.note,
                    why_go: m.why_go, why_not: m.why_not,
                  }))}
                />
              </section>
            )}

            {activeTab === "kids" && kf && (
              <section>
                <h2 className="text-xl font-semibold mb-4">{t("kidsRating")}</h2>
                <KidsBadge {...kf} />
              </section>
            )}

            {activeTab === "safety" && cc && (
              <section>
                <h2 className="text-xl font-semibold mb-4">{t("confidence")}</h2>
                <ConfidenceCardComponent {...cc} />
              </section>
            )}

            {activeTab === "places" && (
              <div className="space-y-8">
                {subs.length > 0 && (
                  <section>
                    <h2 className="text-xl font-semibold mb-4">Places Within {dest.name}</h2>
                    <StaggerContainer className="grid gap-3 sm:grid-cols-2" staggerDelay={0.05}>
                      {subs.map((sub: any) => (
                        <StaggerItem key={sub.id}>
                          <HoverCard>
                            <Link
                              href={`/${locale}/destination/${dest.id}#places`}
                              className="block rounded-xl border border-border p-4 h-full transition-all hover:border-primary/50"
                            >
                              <div className="flex items-start justify-between">
                                <h3 className="font-semibold">{sub.name}</h3>
                                {sub.elevation_m && <span className="text-xs font-mono text-muted-foreground">{sub.elevation_m}m</span>}
                              </div>
                              {sub.tagline && <p className="mt-1 text-xs text-primary">{sub.tagline}</p>}
                              {sub.why_visit && <p className="mt-1 text-[15px] text-muted-foreground line-clamp-3">{sub.why_visit}</p>}
                              <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                                {sub.distance_from_parent_km != null && <span>{sub.distance_from_parent_km}km</span>}
                                {sub.time_needed && <><span>·</span><span>{sub.time_needed}</span></>}
                                <span>·</span>
                                <span>{sub.kids_ok ? "👶 OK" : "Adults"}</span>
                              </div>
                            </Link>
                          </HoverCard>
                        </StaggerItem>
                      ))}
                    </StaggerContainer>
                  </section>
                )}

                {gems.length > 0 && (
                  <section>
                    <h2 className="text-xl font-semibold mb-4">{t("discoverNearby")}</h2>
                    <div className="space-y-3">
                      {gems.map((gem: any) => (
                        <motion.div key={gem.id} whileHover={{ x: 4 }} className="rounded-xl border border-dashed border-primary/30 bg-primary/5 p-4">
                          <div className="flex items-start justify-between">
                            <h3 className="font-semibold text-primary">{gem.name}</h3>
                            <span className="text-xs text-muted-foreground">{gem.distance_km}km · {gem.drive_time}</span>
                          </div>
                          {gem.why_unknown && <p className="mt-1 text-xs text-yellow-400">Why unknown: {gem.why_unknown}</p>}
                          <p className="mt-1 text-sm text-muted-foreground">{gem.why_go}</p>
                        </motion.div>
                      ))}
                    </div>
                  </section>
                )}

                {/* Points of Interest */}
                {pois.length > 0 && (
                  <POISection pois={pois} destName={displayName} />
                )}
              </div>
            )}

            {activeTab === "food" && (
              <div className="space-y-8">
                {legends.length > 0 && (
                  <section>
                    <h2 className="text-xl font-semibold mb-4">{t("localLegends")}</h2>
                    <div className="space-y-3">
                      {legends.map((legend: any) => (
                        <div key={legend.id} className="flex gap-3 rounded-xl border border-border p-4 hover:border-primary/30 transition-colors">
                          <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                            {legend.name.charAt(0)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-semibold">{legend.name}</span>
                              {legend.verified && (
                                <span className="inline-flex items-center gap-0.5 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-400 border border-emerald-500/20">
                                  <svg className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.403 12.652a3 3 0 010-5.304 3 3 0 00-3.75-3.751 3 3 0 00-5.305 0 3 3 0 00-3.751 3.75 3 3 0 000 5.305 3 3 0 003.75 3.751 3 3 0 005.305 0 3 3 0 003.751-3.75zm-2.546-4.46a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>
                                  Verified
                                </span>
                              )}
                            </div>
                            {legend.role && <div className="text-xs text-muted-foreground/70 mt-0.5">{legend.role}</div>}
                            {legend.known_as && <div className="text-xs text-primary font-medium">{legend.known_as}</div>}
                            {legend.story && <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{legend.story}</p>}
                            {(legend.instagram || legend.youtube) && (
                              <div className="mt-2 flex items-center gap-3">
                                {legend.instagram && (
                                  <a
                                    href={`https://instagram.com/${legend.instagram.replace('@', '')}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 text-xs text-pink-400 hover:text-pink-300 transition-colors"
                                  >
                                    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                                    {legend.instagram}
                                  </a>
                                )}
                                {legend.youtube && (
                                  <a
                                    href={`https://youtube.com/@${legend.youtube}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 text-xs text-red-400 hover:text-red-300 transition-colors"
                                  >
                                    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                                    YouTube
                                  </a>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                )}
                {eats.length > 0 && (
                  <section>
                    <h2 className="text-xl font-semibold mb-4">{t("viralEats")}</h2>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {eats.map((eat: any) => (
                        <div key={eat.id} className="rounded-xl border border-border p-4 hover:border-primary/30 transition-colors">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="font-semibold text-[15px]">{eat.name}</h3>
                            {eat.price_range && <span className="text-xs font-mono text-muted-foreground">{eat.price_range}</span>}
                          </div>
                          {eat.location && <p className="text-xs text-muted-foreground/60 mb-1">📍 {eat.location}</p>}
                          <p className="text-xs text-primary font-medium">{eat.famous_for}</p>
                          {eat.honest_review && <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{eat.honest_review}</p>}
                          {eat.viral_on && <p className="mt-1 text-xs text-muted-foreground/50">Viral on {eat.viral_on}</p>}
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* Local Stays & Operators */}
                {dest.local_stays?.length > 0 && (
                  <section>
                    <h2 className="text-xl font-semibold mb-2">Local Picks</h2>
                    <p className="text-sm text-muted-foreground mb-4">Vetted stays, operators, and local businesses — not a booking site, just honest recommendations.</p>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {dest.local_stays.map((stay: any) => (
                        <div key={stay.id} className="rounded-xl border border-border p-4 hover:border-primary/30 transition-colors">
                          <div className="flex items-start justify-between mb-1">
                            <div>
                              <h3 className="font-semibold text-[15px]">{stay.name}</h3>
                              <span className={`text-xs font-medium capitalize ${
                                stay.type === "homestay" ? "text-emerald-400" :
                                stay.type === "cafe" ? "text-amber-400" :
                                stay.type === "operator" || stay.type === "guide" ? "text-blue-400" :
                                "text-muted-foreground"
                              }`}>{stay.type}</span>
                            </div>
                            {stay.price_range && <span className="text-xs font-mono text-muted-foreground">{stay.price_range}</span>}
                          </div>
                          {stay.location && <p className="text-xs text-muted-foreground/60 mb-1">📍 {stay.location}</p>}
                          {stay.why_special && <p className="text-sm text-muted-foreground leading-relaxed mt-1">{stay.why_special}</p>}
                          <div className="mt-2 flex items-center gap-2">
                            {stay.best_for && <span className="rounded-full border border-border px-2 py-1 text-xs text-muted-foreground">Best for: {stay.best_for}</span>}
                            {stay.verified && <span className="rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-1 text-xs">Verified</span>}
                          </div>
                          {stay.tags?.length > 0 && (
                            <div className="mt-2 flex flex-wrap gap-1">
                              {stay.tags.map((tag: string) => (
                                <span key={tag} className="rounded-full border border-border px-2 py-1 text-xs text-muted-foreground">{tag}</span>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </section>
                )}
              </div>
            )}
          </motion.div>

          {/* Reviews tab */}
          {activeTab === "reviews" && (
            <motion.div
              key="reviews"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-8"
            >
              {dest.traveler_notes?.length > 0 && (
                <TravelerNotes notes={dest.traveler_notes} />
              )}
              <ReviewsList reviews={dest.reviews ?? []} />
              <ReviewForm destinationId={dest.id} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {/* === SEO Internal Linking Modules === */}

      {/* Nearby in same state */}
      {dest.nearbyDestinations?.length > 0 && (
        <ScrollReveal>
          <div className="mt-12 border-t border-border pt-8">
            <h2 className="text-xl font-bold mb-4">Nearby in {stateName}</h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {dest.nearbyDestinations.map((nd: any) => (
                <Link
                  key={nd.id}
                  href={`/${locale}/destination/${nd.id}`}
                  className="group rounded-xl border border-border bg-card overflow-hidden hover:border-primary/40 transition-all"
                >
                  <div className="relative h-24 bg-muted/30 overflow-hidden">
                    <Image
                      src={`/images/destinations/${nd.id}.jpg`}
                      alt={nd.name}
                      fill
                      sizes="(max-width: 640px) 50vw, 25vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
                  </div>
                  <div className="p-3">
                    <div className="font-semibold text-sm">{nd.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {nd.difficulty}{nd.elevation_m ? ` · ${nd.elevation_m.toLocaleString()}m` : ""}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </ScrollReveal>
      )}

      {/* Featured in Collections */}
      {dest.relatedCollections?.length > 0 && (
        <ScrollReveal>
          <div className="mt-8">
            <h2 className="text-lg font-bold mb-3">Featured in Collections</h2>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {dest.relatedCollections.map((c: any) => (
                <Link
                  key={c.id}
                  href={`/${locale}/collections/${c.id}`}
                  className="flex-shrink-0 rounded-xl border border-border bg-card p-4 w-60 hover:border-primary/40 transition-all"
                >
                  <div className="font-semibold text-sm">{c.name}</div>
                  <div className="text-xs text-muted-foreground mt-1 line-clamp-2">{c.description}</div>
                </Link>
              ))}
            </div>
          </div>
        </ScrollReveal>
      )}

      {/* Road Trips Through Here */}
      {dest.relatedRoutes?.length > 0 && (
        <ScrollReveal>
          <div className="mt-8">
            <h2 className="text-lg font-bold mb-3">Road Trips Through Here</h2>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {dest.relatedRoutes.map((r: any) => (
                <Link
                  key={r.id}
                  href={`/${locale}/routes/${r.id}`}
                  className="flex-shrink-0 rounded-xl border border-border bg-card p-4 w-60 hover:border-primary/40 transition-all"
                >
                  <div className="font-semibold text-sm">{r.name}</div>
                  <div className="text-xs text-muted-foreground mt-1">{r.days} days · {r.difficulty}</div>
                </Link>
              ))}
            </div>
          </div>
        </ScrollReveal>
      )}

      {/* Floating SOS button */}
      {dest.emergencySos && (
        <SOSFloatingButton
          onClick={() => {
            const el = document.getElementById("emergency-sos");
            if (el) {
              el.scrollIntoView({ behavior: "smooth", block: "start" });
              // Also switch to overview tab if not already there
            }
          }}
        />
      )}

      <Footer />
    </>
  );
}

/** Derive traveler fit from destination data — INTELLIGENT assessment */
function getTravelerFit(dest: any, kf: any) {
  const goodFor: string[] = [];
  const notFor: string[] = [];

  // Get confidence card for infrastructure assessment
  const cc = Array.isArray(dest.confidence_cards) ? dest.confidence_cards[0] : dest.confidence_cards;
  const infraConcerns = getInfrastructureConcerns(dest, cc);
  const hasSerousInfraConcerns = infraConcerns.length >= 3;

  // Kids — cross-reference with infrastructure
  if (kf?.suitable && kf.rating >= 4 && !hasSerousInfraConcerns) {
    goodFor.push("Families with kids");
  } else if (kf?.suitable && kf.rating >= 3 && hasSerousInfraConcerns) {
    // Rating says OK but infrastructure says risky — flag it
    goodFor.push("Adventurous families (limited infrastructure)");
  } else if (kf && !kf.suitable) {
    notFor.push("Young children");
  }

  // Tags-based
  if (dest.tags?.includes("offbeat")) goodFor.push("Off-the-beaten-path seekers");
  if (dest.tags?.includes("photography")) goodFor.push("Photographers");
  if (dest.tags?.includes("spiritual")) goodFor.push("Spiritual travelers");
  if (dest.tags?.includes("biker")) goodFor.push("Bikers");
  if (dest.tags?.includes("adventure")) goodFor.push("Adventure seekers");
  if (dest.tags?.includes("romantic") || dest.tags?.includes("honeymoon")) goodFor.push("Couples");
  if (dest.tags?.includes("food")) goodFor.push("Food lovers");

  // Difficulty-based
  if (dest.difficulty === "easy") goodFor.push("First-time travelers");
  if (dest.difficulty === "hard" || dest.difficulty === "extreme") notFor.push("Casual tourists");
  if (dest.difficulty === "extreme") notFor.push("Senior travelers");

  // Infrastructure-based warnings from confidence card
  if (cc?.network && !cc.network.jio && !cc.network.airtel) notFor.push("Those needing reliable phone signal");
  if (dest.elevation_m && dest.elevation_m > 3500) notFor.push("Those with altitude sensitivity");
  if (infraConcerns.length >= 3) notFor.push("Those needing reliable infrastructure");

  return {
    goodFor: goodFor.slice(0, 5),
    notFor: notFor.slice(0, 4),
    infraConcerns,
  };
}

/** Get infrastructure concerns from confidence card data */
function getInfrastructureConcerns(dest: any, cc?: any): string[] {
  const concerns: string[] = [];

  // Medical — from confidence card (smarter parsing)
  if (cc?.emergency?.nearest_hospital) {
    const hospital = cc.emergency.nearest_hospital.toLowerCase();
    const hasRealHospital = hospital.includes("hospital") || hospital.includes("aiims") || hospital.includes("fortis") || hospital.includes("max") || hospital.includes("medanta") || hospital.includes("narayana") || hospital.includes("world-class") || hospital.includes("excellent");
    const isOnlyBasic = (hospital.includes("phc") || hospital.includes("basic") || hospital.includes("dispensary")) && !hospital.includes("district hospital") && !hospital.includes("regional hospital") && !hospital.includes("zonal hospital");

    if (hospital.includes("none") || hospital.startsWith("no ")) {
      concerns.push("No hospital — nearest may be hours away");
    } else if (isOnlyBasic && !hasRealHospital) {
      concerns.push("Only basic medical (PHC) — serious cases need referral");
    }
    // Don't flag if there's a real hospital mentioned (even if PHC is also listed)
  } else if (!cc) {
    concerns.push("No infrastructure data available");
  }

  // Network — from confidence card
  if (cc?.network) {
    if (!cc.network.jio && !cc.network.airtel && !cc.network.vi) {
      if (cc.network.bsnl) {
        concerns.push("BSNL only — limited signal, no 4G data");
      } else {
        concerns.push("No phone signal — can't call for help");
      }
    }
    if (cc.network.note?.toLowerCase().includes("zero") || cc.network.note?.toLowerCase().includes("no signal")) {
      concerns.push("Signal drops to zero in many areas");
    }
  }

  // Road condition
  if (cc?.reach?.last_km_difficulty === "hard" || cc?.reach?.last_km_difficulty === "extreme") {
    concerns.push("Difficult last-mile access");
  }

  // Altitude
  if (dest.elevation_m) {
    if (dest.elevation_m > 4000) concerns.push(`High altitude (${dest.elevation_m.toLocaleString()}m) — AMS risk for children and elderly`);
    else if (dest.elevation_m > 3000) concerns.push(`Moderate altitude (${dest.elevation_m.toLocaleString()}m) — acclimatization needed`);
  }

  // Difficulty
  if (dest.difficulty === "hard") concerns.push("Difficult access — rough roads, long drives");
  if (dest.difficulty === "extreme") concerns.push("Extreme access — multi-day trek or extreme roads");

  return concerns;
}
