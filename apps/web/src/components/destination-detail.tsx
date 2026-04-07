"use client";

import Link from "next/link";
import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { MonthlyChart } from "./monthly-chart";
import { ConfidenceCardComponent } from "./confidence-card";
import { KidsBadge } from "./kids-badge";
import { FadeIn, SlideIn, HoverCard, StaggerContainer, StaggerItem } from "./animated-hero";
import { Footer } from "./footer";

const DIFFICULTY_COLORS: Record<string, string> = {
  easy: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  moderate: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
  hard: "text-orange-400 bg-orange-500/10 border-orange-500/20",
  extreme: "text-red-400 bg-red-500/10 border-red-500/20",
};

const SCORE_COLORS: Record<number, string> = {
  5: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  4: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  3: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
  2: "bg-orange-500/20 text-orange-300 border-orange-500/30",
  1: "bg-red-500/20 text-red-300 border-red-500/30",
  0: "bg-zinc-500/20 text-zinc-400 border-zinc-500/30",
};

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

  const kf = Array.isArray(dest.kids_friendly)
    ? dest.kids_friendly[0]
    : dest.kids_friendly;
  const cc = Array.isArray(dest.confidence_cards)
    ? dest.confidence_cards[0]
    : dest.confidence_cards;
  const stateName = Array.isArray(dest.state)
    ? dest.state[0]?.name
    : dest.state?.name;
  const months = (dest.destination_months ?? []).sort(
    (a: any, b: any) => a.month - b.month,
  );
  const subs = dest.sub_destinations ?? [];
  const gems = dest.hidden_gems ?? [];
  const legends = dest.local_legends ?? [];
  const eats = dest.viral_eats ?? [];

  const currentMonth = new Date().getMonth() + 1;
  const currentScore =
    months.find((m: any) => m.month === currentMonth)?.score ?? null;

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
          <div className="mb-4 text-sm text-muted-foreground">
            <Link href={`/${locale}/explore`} className="hover:text-foreground transition-colors">
              Explore
            </Link>
            {" → "}
            <span>{stateName}</span>
            {" → "}
            <span className="text-foreground">{dest.name}</span>
          </div>
        </FadeIn>

        {/* Hero */}
        <SlideIn delay={0.1}>
          <div className="mb-8 rounded-2xl border border-border bg-gradient-to-br from-card to-muted/30 p-6 sm:p-8">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
                  {dest.name}
                </h1>
                <p className="mt-2 text-muted-foreground">
                  {stateName} · {dest.region}
                  {dest.elevation_m && (
                    <span className="font-mono"> · {dest.elevation_m.toLocaleString()}m</span>
                  )}
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
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              {dest.tagline}
            </p>

            {/* Quick stats row */}
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <div className="rounded-xl border border-border/50 bg-background/50 backdrop-blur-sm p-3">
                <div className="text-[10px] uppercase tracking-wide text-muted-foreground">{t("difficulty")}</div>
                <div className={`mt-1 text-sm font-semibold capitalize rounded-md inline-block px-2 py-0.5 ${DIFFICULTY_COLORS[dest.difficulty] ?? ""}`}>
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
          </div>
        </SlideIn>

        {/* Tab navigation */}
        <FadeIn delay={0.3}>
          <div className="mb-6 flex gap-1 overflow-x-auto rounded-xl border border-border bg-muted/30 p-1">
            {availableTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative rounded-lg px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
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
                    {dest.cell_network && (
                      <div className="rounded-xl border border-border p-4">
                        <div className="text-xs text-muted-foreground uppercase tracking-wide">Network</div>
                        <div className="mt-1 text-sm">{dest.cell_network}</div>
                      </div>
                    )}
                    {dest.permit_required && (
                      <div className="rounded-xl border border-orange-500/30 bg-orange-500/5 p-4">
                        <div className="text-xs text-orange-400 uppercase tracking-wide">Permit Required</div>
                        <div className="mt-1 text-sm text-orange-300/80">{dest.permit_required}</div>
                      </div>
                    )}
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
                            <div className="rounded-xl border border-border p-4 h-full">
                              <div className="flex items-start justify-between">
                                <h4 className="font-semibold">{sub.name}</h4>
                                {sub.elevation_m && (
                                  <span className="text-xs font-mono text-muted-foreground">{sub.elevation_m}m</span>
                                )}
                              </div>
                              {sub.tagline && <p className="mt-1 text-xs text-primary">{sub.tagline}</p>}
                              {sub.why_visit && <p className="mt-1 text-sm text-muted-foreground line-clamp-3">{sub.why_visit}</p>}
                              <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                                {sub.distance_from_parent_km != null && <span>{sub.distance_from_parent_km}km</span>}
                                {sub.time_needed && <><span>·</span><span>{sub.time_needed}</span></>}
                                <span>·</span>
                                <span>{sub.kids_ok ? "👶 OK" : "Adults"}</span>
                              </div>
                            </div>
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
                        <motion.div
                          key={gem.id}
                          whileHover={{ x: 4 }}
                          className="rounded-xl border border-dashed border-primary/30 bg-primary/5 p-4"
                        >
                          <div className="flex items-start justify-between">
                            <h4 className="font-semibold text-primary">{gem.name}</h4>
                            <span className="text-xs text-muted-foreground">{gem.distance_km}km · {gem.drive_time}</span>
                          </div>
                          {gem.why_unknown && <p className="mt-1 text-xs text-yellow-400">Why unknown: {gem.why_unknown}</p>}
                          <p className="mt-1 text-sm text-muted-foreground">{gem.why_go}</p>
                          {gem.social_proof && <p className="mt-1 text-xs italic text-muted-foreground">{gem.social_proof}</p>}
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
                            {legend.contact && <p className="mt-1 text-xs text-primary">{legend.contact}</p>}
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
