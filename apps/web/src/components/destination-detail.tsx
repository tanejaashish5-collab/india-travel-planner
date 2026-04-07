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
            <div className="text-sm text-muted-foreground">
              <Link href={`/${locale}/explore`} className="hover:text-foreground transition-colors">Explore</Link>
              {" → "}
              <span>{stateName}</span>
              {" → "}
              <span className="text-foreground">{dest.name}</span>
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

        {/* Hero Image */}
        <FadeIn>
          <div className="mb-6 relative h-48 sm:h-64 lg:h-80 rounded-2xl overflow-hidden bg-muted/30">
            <img
              src={`/images/destinations/${dest.id}.jpg`}
              alt={dest.name}
              className="w-full h-full object-cover"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
          </div>
        </FadeIn>

        {/* Hero */}
        <SlideIn delay={0.1}>
          <div className="mb-6 rounded-2xl border border-border bg-gradient-to-br from-card to-muted/30 p-6 sm:p-8 -mt-20 relative z-10">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-3xl font-bold sm:text-4xl lg:text-5xl">{dest.name}</h1>
                <p className="mt-2 text-muted-foreground">
                  {stateName} · {dest.region}
                  {dest.elevation_m && <span className="font-mono"> · {dest.elevation_m.toLocaleString()}m</span>}
                </p>
              </div>
              {currentScore !== null && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, delay: 0.3 }}
                  className={`rounded-2xl border px-5 py-3 text-center ${SCORE_COLORS[currentScore] ?? SCORE_COLORS[0]}`}
                >
                  <div className="text-3xl font-bold">{currentScore}/5</div>
                  <div className="text-xs mt-0.5">{tm(String(currentMonth))}</div>
                </motion.div>
              )}
            </div>

            {/* Score Explainability */}
            {currentMonthData && (
              <div className="mt-3 text-sm text-muted-foreground">
                <span className="font-medium text-foreground">Why {currentScore}/5?</span>{" "}
                {currentMonthData.note}
              </div>
            )}

            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{dest.tagline}</p>

            {/* Quick stats */}
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <div className="rounded-xl border border-border/50 bg-background/50 backdrop-blur-sm p-3">
                <div className="text-[10px] uppercase tracking-wide text-muted-foreground">{t("difficulty")}</div>
                <div className={`mt-1 text-sm font-semibold capitalize rounded-md inline-block px-2 py-0.5 ${DIFFICULTY_BG[dest.difficulty] ?? ""}`}>
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

        {/* Infrastructure Reality — ALWAYS visible, not hidden in tabs */}
        {(dest.cell_network || dest.medical_facility || dest.permit_required) && (
          <FadeIn delay={0.25}>
            <div className="mb-6 grid gap-2 grid-cols-2 sm:grid-cols-4">
              {dest.cell_network && (
                <div className="rounded-xl border border-border p-2.5 flex items-center gap-2">
                  <span>📶</span>
                  <div className="min-w-0">
                    <div className="text-[10px] text-muted-foreground">Network</div>
                    <div className="text-xs font-medium truncate">{dest.cell_network}</div>
                  </div>
                </div>
              )}
              <div className="rounded-xl border border-border p-2.5 flex items-center gap-2">
                <span>🏧</span>
                <div>
                  <div className="text-[10px] text-muted-foreground">ATM</div>
                  <div className="text-xs font-medium">{dest.atm_available ? "Available" : "None — cash only"}</div>
                </div>
              </div>
              {dest.medical_facility && (
                <div className="rounded-xl border border-border p-2.5 flex items-center gap-2">
                  <span>🏥</span>
                  <div className="min-w-0">
                    <div className="text-[10px] text-muted-foreground">Medical</div>
                    <div className="text-xs font-medium truncate">{dest.medical_facility}</div>
                  </div>
                </div>
              )}
              {dest.permit_required && (
                <div className="rounded-xl border border-orange-500/30 bg-orange-500/5 p-2.5 flex items-center gap-2">
                  <span>📋</span>
                  <div className="min-w-0">
                    <div className="text-[10px] text-orange-400">Permit</div>
                    <div className="text-xs font-medium text-orange-300/80 truncate">{dest.permit_required}</div>
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
                  <p className="text-muted-foreground leading-relaxed">{dest.why_special}</p>
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

                {/* Infrastructure Reality Panel */}
                {(dest.cell_network || dest.atm_available !== undefined || dest.medical_facility || dest.permit_required) && (
                  <section>
                    <h2 className="text-xl font-semibold mb-3">Infrastructure Reality</h2>
                    <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                      {dest.cell_network && (
                        <div className="rounded-xl border border-border p-3 flex items-start gap-2">
                          <span className="text-lg">📶</span>
                          <div>
                            <div className="text-xs font-medium text-muted-foreground">Network</div>
                            <div className="text-sm">{dest.cell_network}</div>
                          </div>
                        </div>
                      )}
                      <div className="rounded-xl border border-border p-3 flex items-start gap-2">
                        <span className="text-lg">🏧</span>
                        <div>
                          <div className="text-xs font-medium text-muted-foreground">ATM</div>
                          <div className="text-sm">{dest.atm_available ? "Available" : "None — carry cash"}</div>
                        </div>
                      </div>
                      {dest.medical_facility && (
                        <div className="rounded-xl border border-border p-3 flex items-start gap-2">
                          <span className="text-lg">🏥</span>
                          <div>
                            <div className="text-xs font-medium text-muted-foreground">Medical</div>
                            <div className="text-sm">{dest.medical_facility}</div>
                          </div>
                        </div>
                      )}
                      {dest.permit_required && (
                        <div className="rounded-xl border border-orange-500/30 bg-orange-500/5 p-3 flex items-start gap-2">
                          <span className="text-lg">📋</span>
                          <div>
                            <div className="text-xs font-medium text-orange-400">Permit Required</div>
                            <div className="text-sm text-orange-300/80">{dest.permit_required}</div>
                          </div>
                        </div>
                      )}
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
                              {sub.why_visit && <p className="mt-1 text-sm text-muted-foreground line-clamp-3">{sub.why_visit}</p>}
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

  // Infrastructure-aware kids assessment
  const infraConcerns = getInfrastructureConcerns(dest);
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

  // Infrastructure-based warnings
  if (!dest.atm_available) notFor.push("Card-only travelers (no ATM)");
  if (dest.elevation_m && dest.elevation_m > 3500) notFor.push("Those with altitude sensitivity");
  if (infraConcerns.length >= 3) notFor.push("Those needing reliable infrastructure");

  return {
    goodFor: goodFor.slice(0, 5),
    notFor: notFor.slice(0, 4),
    infraConcerns,
  };
}

/** Get infrastructure concerns that affect family/kids safety */
function getInfrastructureConcerns(dest: any): string[] {
  const concerns: string[] = [];

  // Medical
  if (!dest.medical_facility) {
    concerns.push("No medical facility data available");
  } else if (dest.medical_facility.toLowerCase().includes("none") ||
             dest.medical_facility.toLowerCase().includes("no hospital")) {
    concerns.push("No hospital — nearest may be hours away");
  } else if (dest.medical_facility.toLowerCase().includes("basic") ||
             dest.medical_facility.toLowerCase().includes("phc")) {
    concerns.push("Only basic medical (PHC) — serious cases need evacuation");
  }

  // ATM
  if (dest.atm_available === false) {
    concerns.push("No ATM — carry sufficient cash");
  }

  // Network
  if (dest.cell_network) {
    const net = dest.cell_network.toLowerCase();
    if (net.includes("bsnl only") || net.includes("zero") || net.includes("no signal")) {
      concerns.push("Limited or no phone signal — can't call for help easily");
    }
  }

  // Altitude
  if (dest.elevation_m) {
    if (dest.elevation_m > 4000) concerns.push(`High altitude (${dest.elevation_m}m) — AMS risk for children and elderly`);
    else if (dest.elevation_m > 3000) concerns.push(`Moderate altitude (${dest.elevation_m}m) — acclimatization needed`);
  }

  // Difficulty
  if (dest.difficulty === "hard") concerns.push("Difficult access — rough roads, long drives");
  if (dest.difficulty === "extreme") concerns.push("Extreme access — multi-day trek or extreme roads");

  return concerns;
}
