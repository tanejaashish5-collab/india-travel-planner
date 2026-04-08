"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { MonthlyChart } from "./monthly-chart";
import { ConfidenceCardComponent } from "./confidence-card";
import { KidsBadge } from "./kids-badge";
import { TouristTrapIntervention } from "./tourist-trap-intervention";
import { FadeIn, SlideIn, HoverCard, StaggerContainer, StaggerItem } from "./animated-hero";
import { Footer } from "./footer";
import { SCORE_COLORS, DIFFICULTY_BG, DIFFICULTY_COLORS } from "@/lib/design-tokens";

const TABS = [
  { id: "overview", label: "Overview" },
  { id: "monthly", label: "Monthly" },
  { id: "kids", label: "Kids" },
  { id: "safety", label: "Safety" },
  { id: "places", label: "Places" },
  { id: "food", label: "Food & People" },
];

export function DestinationDetail({ dest }: { dest: any }) {
  const locale = useLocale();
  const t = useTranslations("destination");
  const tm = useTranslations("months");
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
    if (tab.id === "places" && subs.length === 0 && gems.length === 0) return false;
    if (tab.id === "food" && legends.length === 0 && eats.length === 0) return false;
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
              <span>{stateName}</span>
              {" → "}
              <span className="text-foreground">{displayName}</span>
            </div>
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
        </FadeIn>

        {/* Cinematic Hero */}
        <FadeIn>
          <div className="mb-6 relative h-56 sm:h-72 lg:h-96 rounded-2xl overflow-hidden bg-muted/30">
            <img
              src={`/images/destinations/${dest.id}.jpg`}
              alt={dest.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
            {/* Floating difficulty badge */}
            <div className="absolute top-4 left-4">
              <span className={`inline-block rounded-lg px-3 py-1.5 text-xs font-semibold capitalize backdrop-blur-md ${DIFFICULTY_BG[dest.difficulty] ?? "bg-muted/80"}`}>
                {dest.difficulty}
              </span>
            </div>
          </div>
        </FadeIn>

        {/* Hero Card */}
        <SlideIn delay={0.1}>
          <div className="mb-6 rounded-2xl border border-border/50 bg-card/80 backdrop-blur-xl p-6 sm:p-8 -mt-24 relative z-10 shadow-2xl shadow-black/20">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-3xl font-bold sm:text-4xl lg:text-5xl">{displayName}</h1>
                <p className="mt-2 text-muted-foreground">
                  {stateName} · {dest.region}
                  {dest.elevation_m && <span className="font-mono"> · {dest.elevation_m.toLocaleString()}m</span>}
                </p>
              </div>
              {currentScore !== null && (
                <motion.div
                  initial={{ scale: 0, rotate: -10 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 300, delay: 0.3 }}
                  className={`rounded-2xl border-2 px-5 py-3 text-center backdrop-blur-sm shadow-lg ${SCORE_COLORS[currentScore] ?? SCORE_COLORS[0]}`}
                >
                  <div className="text-3xl font-bold font-mono">{currentScore}/5</div>
                  <div className="text-[10px] font-medium uppercase tracking-wider mt-0.5">{tm(String(currentMonth))}</div>
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
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground/70">{t("difficulty")}</div>
                <div className={`mt-1.5 text-sm font-semibold capitalize ${DIFFICULTY_COLORS[dest.difficulty] ?? ""}`}>
                  {dest.difficulty}
                </div>
              </div>
              <div className="rounded-xl border border-border/50 bg-background/50 backdrop-blur-sm p-3">
                <div className="text-[10px] uppercase tracking-wide text-muted-foreground">{t("duration")}</div>
                <div className="mt-1 text-sm font-semibold">{dest.ideal_duration_min}-{dest.ideal_duration_max} days</div>
              </div>
              <div className="rounded-xl border border-border/50 bg-background/50 backdrop-blur-sm p-3">
                <div className="text-[10px] uppercase tracking-wide text-muted-foreground">{t("budget")}</div>
                <div className="mt-1 text-sm font-semibold capitalize">{dest.budget_tier ?? "mixed"}</div>
              </div>
              <div className="rounded-xl border border-border/50 bg-background/50 backdrop-blur-sm p-3">
                <div className="text-[10px] uppercase tracking-wide text-muted-foreground">{t("kidsRating")}</div>
                <div className={`mt-1 text-sm font-semibold ${kf?.suitable ? "text-emerald-400" : kf ? "text-red-400" : ""}`}>
                  {kf ? (kf.suitable ? `${kf.rating}/5 ✓` : "Not suitable") : "N/A"}
                </div>
              </div>
            </div>

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
            <div className="mt-3 text-[10px] text-muted-foreground/50">
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

        {/* Tab navigation */}
        <FadeIn delay={0.3}>
          <div className="mb-6 flex gap-1 overflow-x-auto rounded-xl border border-border bg-background/95 p-1 sticky top-[64px] z-40 backdrop-blur-md shadow-sm">
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
        </FadeIn>

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
                              <span className="shrink-0 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
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
                            {cc.network.jio && <span className="rounded-full bg-blue-500/10 text-blue-300 px-2.5 py-0.5 text-xs font-medium">Jio</span>}
                            {cc.network.airtel && <span className="rounded-full bg-red-500/10 text-red-300 px-2.5 py-0.5 text-xs font-medium">Airtel</span>}
                            {cc.network.bsnl && <span className="rounded-full bg-yellow-500/10 text-yellow-300 px-2.5 py-0.5 text-xs font-medium">BSNL</span>}
                            {cc.network.vi && <span className="rounded-full bg-purple-500/10 text-purple-300 px-2.5 py-0.5 text-xs font-medium">Vi</span>}
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
                                <h4 className="font-semibold">{sub.name}</h4>
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
                            <h4 className="font-semibold text-primary">{gem.name}</h4>
                            <span className="text-xs text-muted-foreground">{gem.distance_km}km · {gem.drive_time}</span>
                          </div>
                          {gem.why_unknown && <p className="mt-1 text-xs text-yellow-400">Why unknown: {gem.why_unknown}</p>}
                          <p className="mt-1 text-sm text-muted-foreground">{gem.why_go}</p>
                        </motion.div>
                      ))}
                    </div>
                  </section>
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
                        <div key={legend.id} className="flex gap-3 rounded-xl border border-border p-4">
                          <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                            {legend.name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-semibold">{legend.name}</div>
                            {legend.known_as && <div className="text-xs text-primary">{legend.known_as}</div>}
                            {legend.story && <p className="mt-1 text-sm text-muted-foreground">{legend.story}</p>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                )}
                {eats.length > 0 && (
                  <section>
                    <h2 className="text-xl font-semibold mb-4">{t("viralEats")}</h2>
                    <div className="space-y-3">
                      {eats.map((eat: any) => (
                        <div key={eat.id} className="rounded-xl border border-border p-4">
                          <div className="flex items-center justify-between">
                            <h4 className="font-semibold">{eat.name}</h4>
                            <span className="text-xs text-muted-foreground">{eat.price_range}</span>
                          </div>
                          <p className="mt-1 text-xs text-primary">{eat.famous_for}</p>
                          {eat.honest_review && <p className="mt-1 text-sm text-muted-foreground">{eat.honest_review}</p>}
                        </div>
                      ))}
                    </div>
                  </section>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
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
