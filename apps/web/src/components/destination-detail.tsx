"use client";

// Using <a> tags instead of next/link to avoid RSC streaming crashes with Framer Motion
import Image from "next/image";
import { useState, useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import { m as motion } from "framer-motion";
import { renderDisplayName } from "@/lib/display-name";
import { DestinationSectionNav } from "./destination-section-nav";
import { DestinationGuideToC } from "./destination-guide-toc";
import { MonthlyChart } from "./monthly-chart";
import { WeatherWidget } from "./weather-widget";
import { ShareButton } from "./share-button";
import { KEY_EVENTS, track } from "@/lib/analytics";
import { WhatsAppShare } from "./whatsapp-share";
import { CompareButton } from "./compare-tray";
import { formatScoreInline } from "@itp/shared";
import { DistanceBadge } from "./distance-badge";
import { lazy, Suspense } from "react";
import { ConfidenceCardComponent } from "./confidence-card";
import { destinationImage } from "@/lib/image-url";
import { videoSrc } from "@/lib/video-url";
import { getRegionNameForState, getStateName } from "@/lib/seo-maps";

const DestinationMap = lazy(() => import("./destination-map").then((mod) => ({ default: mod.DestinationMap })));
import { KidsBadge } from "./kids-badge";
import { TouristTrapIntervention } from "./tourist-trap-intervention";
import { TravelerNotes } from "./traveler-notes";
import { ReviewsList } from "./reviews-list";
import { TravelerReports } from "./traveler-reports";
import { ReviewForm } from "./review-form";
import { QuestionsList } from "./questions-list";
import { QuestionForm } from "./question-form";
import { DestinationEateries } from "./destination-eateries";
import { BookingHandoff } from "./booking-handoff";
import VerdictCard from "./verdict-card";
import DestinationTldrCard from "./destination-tldr-card";
import { DestinationDecisionRail } from "./destination-decision-rail";
import { CollapsibleDetails } from "./collapsible-details";
import { DataSignalBadge } from "./data-signal-badge";
import { SectionFreshness } from "./section-freshness";
import { SectionLabel } from "./ui/section-label";
import { MicroItinerarySection } from "./micro-itinerary-section";
import { LogisticsChecklist } from "./logistics-checklist";
import { PersonaBlocksSection } from "./persona-blocks-section";
import { BestForSegments } from "./best-for-segments";
import { ScenarioStrip } from "./scenario-strip";
import { ElevationChart } from "./elevation-chart";
import SoloFemaleSafetySection from "./solo-female-safety-section";
import { SuggestEditButton } from "./suggest-edit-button";
import MethodologyStrip from "./methodology-strip";
import KnowBeforeYouGo from "./know-before-you-go";
import { EditorsPicks } from "./editors-picks";
import { currentMonthIST } from "@itp/shared";
import { InternationalInfoSection } from "./international-info";
import { EmergencySOSSection, SOSFloatingButton } from "./emergency-sos";
import { DestinationAlerts } from "./destination-alerts";
import { FadeIn, SlideIn, HoverCard, StaggerContainer, StaggerItem, ScrollReveal } from "./animated-hero";
import { Footer } from "./footer";
import { StickyDestinationHeader } from "./sticky-destination-header";
import { POISection } from "./poi-section";
import { DIFFICULTY_BG } from "@/lib/design-tokens";

export function DestinationDetail({ dest }: { dest: any }) {
  const locale = useLocale();
  const t = useTranslations("destination");
  const tm = useTranslations("months");

  const [saved, setSaved] = useState(false);

  // Hash-link smooth-scroll (search results + deep links arrive via #sub-xyz, #safety, etc).
  // With long-scroll all targets are already in DOM, so native anchor scroll does the rest —
  // we just upgrade it to smooth scroll with sticky-header offset.
  useEffect(() => {
    if (typeof window === "undefined") return;
    function smoothScrollToHash() {
      const raw = window.location.hash.replace(/^#/, "");
      if (!raw) return;
      requestAnimationFrame(() => {
        const el = document.getElementById(raw);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
    smoothScrollToHash();
    window.addEventListener("hashchange", smoothScrollToHash);
    return () => window.removeEventListener("hashchange", smoothScrollToHash);
  }, []);

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
      track(KEY_EVENTS.SAVE_DESTINATION, { destination: dest.id, action: "remove", surface: "detail" });
    } else {
      savedDests.push(dest.id);
      localStorage.setItem("savedDestinations", JSON.stringify(savedDests));
      setSaved(true);
      track(KEY_EVENTS.SAVE_DESTINATION, { destination: dest.id, action: "add", surface: "detail" });
    }
  }

  const kf = Array.isArray(dest.kids_friendly) ? dest.kids_friendly[0] : dest.kids_friendly;
  const cc = Array.isArray(dest.confidence_cards) ? dest.confidence_cards[0] : dest.confidence_cards;
  const enStateName = Array.isArray(dest.state) ? dest.state[0]?.name : dest.state?.name;
  // Hindi state name from seo-maps when locale=hi (states table has no
  // translations column). Falls back to English when slug missing from map.
  const stateName = (locale === "hi" && dest.state_id ? getStateName(dest.state_id, "hi") : enStateName) ?? enStateName;
  const months = (dest.destination_months ?? []).sort((a: any, b: any) => a.month - b.month);
  const subs = dest.sub_destinations ?? [];
  const gems = dest.hidden_gems ?? [];
  const legends = dest.local_legends ?? [];
  const eats = dest.viral_eats ?? [];
  const trapAlts = dest.trap_alternatives ?? [];
  const pois = dest.points_of_interest ?? [];

  const currentMonth = currentMonthIST();
  const currentScore = months.find((m: any) => m.month === currentMonth)?.score ?? null;
  const currentMonthData = months.find((m: any) => m.month === currentMonth);

  const crowdLevel: "quiet" | "moderate" | "peak" | null = (() => {
    const cal = dest.crowd_calendar;
    if (!cal) return null;
    if (cal.peak_months?.includes(currentMonth)) return "peak";
    if (cal.quiet_months?.includes(currentMonth)) return "quiet";
    return "moderate";
  })();

  // Traveler fit based on data
  const travelerFit = getTravelerFit(dest, kf);

  // Section availability — drives which long-scroll sections render AND which tiles
  // appear in the ToC hero + sticky mini-nav. Keeping same gates as the old availableTabs.
  const hasMonthly = months.length > 0;
  const hasKids = !!kf;
  const hasSafety = !!cc || dest.solo_female_score != null;
  const hasPlaces = subs.length > 0 || gems.length > 0 || pois.length > 0;
  const hasFood = legends.length > 0 || eats.length > 0 || (dest.local_stays?.length ?? 0) > 0;
  const hasReviews = (dest.traveler_notes?.length ?? 0) > 0 || (dest.reviews?.length ?? 0) > 0;
  // Sprint 21 — Q&A section always shows (so visitors can submit even before
  // first question is answered). The list portion empty-states gracefully.
  const answeredQuestions = dest.questions ?? [];
  const hasQuestions = true;

  // Sprint 22 — local eateries (verified restaurant-level data, joined on the
  // server query). Section only renders when there's at least one row, so
  // pre-seed destinations don't show an empty heading.
  const eateries = dest.eateries ?? [];
  const hasEateries = eateries.length > 0;

  // Sprint 2 depth layers — gated on per-row content so pre-backfill dests
  // don't show empty headings.
  const hasItinerary = !!dest.micro_itineraries && (
    !!dest.micro_itineraries.one_day ||
    (Array.isArray(dest.micro_itineraries.three_days) && dest.micro_itineraries.three_days.length > 0) ||
    (Array.isArray(dest.micro_itineraries.five_days) && dest.micro_itineraries.five_days.length > 0)
  );
  const hasLogistics = !!dest.local_logistics && Object.values(dest.local_logistics).some((v: any) => !!v?.toString().trim());
  const hasPersonas = !!dest.persona_blocks && Object.values(dest.persona_blocks).some((v: any) => !!v?.toString().trim());
  const hasBestFor = Array.isArray(dest.best_for_segments) && dest.best_for_segments.length > 0;
  const hasScenarios = Array.isArray(dest.scenarios) && dest.scenarios.length > 0;
  const hasElevation = (dest.elevation_m ?? 0) >= 1500;

  // Ordered list of sections that will actually render — consumed by the mini-nav and ToC.
  // Every entry here is frontstage content. Two dense reference blocks
  // (infrastructure reality grid + full safety ConfidenceCard) live inside
  // section containers and are collapsed behind inline "+ Show" disclosures
  // — so nothing is hidden forever, but the default scroll stays digestible.
  const availableSections = [
    { id: "overview", label: t("overview"), show: true },
    { id: "monthly", label: t("monthly"), show: hasMonthly },
    { id: "itinerary", label: "On the Ground", show: hasItinerary },
    { id: "kids", label: t("kids"), show: hasKids },
    { id: "safety", label: t("safety"), show: hasSafety },
    { id: "scenarios", label: "If Things Go Wrong", show: hasScenarios },
    { id: "personas", label: "If You're…", show: hasPersonas },
    { id: "logistics", label: "How It Works", show: hasLogistics },
    { id: "places", label: t("places"), show: hasPlaces },
    { id: "food", label: t("foodAndPeople"), show: hasFood },
    { id: "eateries", label: "Where to eat", show: hasEateries },
    { id: "bestfor", label: "Best For", show: hasBestFor },
    { id: "elevation", label: "Altitude", show: hasElevation },
    { id: "questions", label: t("questions"), show: hasQuestions },
    { id: "reviews", label: "Reviews", show: hasReviews },
  ].filter((s) => s.show);

  return (
    <>
      <div>
        {/* Breadcrumb + actions row — stacks below sm so the 4-button row
            (~460px wide) no longer forces horizontal overflow on 375px
            phones. flex-wrap on the inner row lets buttons break if still
            too wide on tiny screens. */}
        <FadeIn>
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-[15px] text-muted-foreground min-w-0 truncate">
              <a href={`/${locale}/explore`} className="hover:text-foreground transition-colors">Explore</a>
              {" → "}
              <a href={`/${locale}/state/${dest.state_id}`} className="hover:text-foreground transition-colors">{stateName}</a>
              {" → "}
              <span className="text-foreground">{displayName}</span>
            </div>
            <div className="flex flex-wrap items-center gap-2 gap-y-2">
              {/* Compare */}
              <CompareButton destinationId={dest.id} size="md" />
              {/* Share */}
              <ShareButton
                title={`${displayName} — NakshIQ`}
                text={`${displayTagline} | ${dest.difficulty} · ${dest.elevation_m ? dest.elevation_m + 'm' : ''}`}
              />
              {/* WhatsApp */}
              <WhatsAppShare
                message={`${displayName} — ${displayTagline}. Travel guide: https://www.nakshiq.com/en/destination/${dest.id}`}
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

        {/* Cinematic Hero — video where available. Full-bleed at lg+ (Ferrari / Aman /
            Four Seasons pattern). Mobile + tablet stay within the container padding for
            rounded-corner warmth; lg+ breaks out to 100vw for the theatrical hero moment. */}
        <FadeIn>
          <div
            className="mb-6 relative h-56 sm:h-72 lg:h-[32rem] rounded-2xl lg:rounded-none overflow-hidden film-grain lg:relative lg:left-1/2 lg:right-1/2 lg:-ml-[50vw] lg:-mr-[50vw] lg:w-screen"
            style={{ background: "linear-gradient(135deg, oklch(0.25 0.02 260), oklch(0.18 0.01 280))" }}
          >
            {/* Video hero — attempts video, falls back to poster image */}
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
              poster={destinationImage(dest.id, 1600)}
            >
              <source src={videoSrc(dest.id)} type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent pointer-events-none" />
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

        {/* Desktop decision rail — pinned right side at lg+ after hero scrolls out */}
        <DestinationDecisionRail
          destinationId={dest.id}
          name={displayName}
          score={currentScore}
          monthLabel={tm(String(currentMonth))}
          monthSlug={["","january","february","march","april","may","june","july","august","september","october","november","december"][currentMonth]}
          verdict={currentMonthData?.verdict}
          kidsRating={kf?.rating ?? null}
          soloFemaleScore={dest.solo_female_score ?? null}
          crowdLevel={crowdLevel}
          compareWithId={dest.nearbyDestinations?.[0]?.id ?? null}
          compareWithName={dest.nearbyDestinations?.[0]?.name ?? null}
        />

        {/* Hero Card */}
        <SlideIn delay={0.1}>
          <div className="mb-6 rounded-2xl border border-border/50 bg-card p-6 sm:p-8 -mt-24 relative z-10 shadow-2xl shadow-black/20">
            {/* H1 + location + meta chips */}
            <h1 className="text-3xl font-semibold sm:text-4xl lg:text-6xl lg:tracking-tight">{renderDisplayName(displayName)}</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              {stateName}{dest.region ? ` · ${dest.region}` : ""}
              {dest.elevation_m && <span className="font-mono"> · {dest.elevation_m.toLocaleString()}m</span>}
            </p>
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
              {(dest.ideal_duration_min || dest.ideal_duration_max) && (
                <span className="inline-flex items-center gap-1 rounded-full border border-border px-2.5 py-1 text-xs font-medium text-muted-foreground">
                  ⏱ {dest.ideal_duration_min && dest.ideal_duration_max ? `${dest.ideal_duration_min}–${dest.ideal_duration_max}d` : dest.ideal_duration_min ? `${dest.ideal_duration_min}+d` : `≤${dest.ideal_duration_max}d`}
                </span>
              )}
            </div>

            {/* Tagline — editorial hook, above the verdict */}
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground/90">{displayTagline}</p>

            {/* TL;DR DECISION CARD — the "should I go this month?" answer
                in one unified panel. Absorbs the old score badge + "Why X/5?"
                prose + verdict pill + 4 quick-stat tiles. One decision surface
                instead of four scattered ones. */}
            <div className="mt-5 flex items-center gap-2">
              <DataSignalBadge
                kind="scored"
                tooltip="Backed by NakshIQ's 6-dimension methodology — not editorial opinion"
              />
              <span className="text-[11px] text-muted-foreground/60">
                Our take for {tm(String(currentMonth))} in detail
              </span>
            </div>
            <a
              href={currentMonthData?.verdict
                ? `/${locale}/destination/${dest.id}/${["","january","february","march","april","may","june","july","august","september","october","november","december"][currentMonth]}`
                : undefined}
              className={`mt-2 block ${currentMonthData?.verdict ? "hover:opacity-95 transition-opacity" : ""}`}
            >
              <DestinationTldrCard
                verdict={currentMonthData?.verdict}
                score={currentScore}
                monthLabel={tm(String(currentMonth))}
                prose={currentMonthData?.go_or_skip_verdict}
                skipReason={currentMonthData?.skip_reason}
                scoreNote={currentMonthData?.note}
                kidsRating={kf?.rating ?? null}
                kidsSuitable={kf?.suitable ?? null}
                soloFemaleScore={dest.solo_female_score ?? null}
                crowdLevel={crowdLevel}
                costTier={dest.budget_tier}
                difficulty={dest.difficulty}
              />
            </a>

            <MethodologyStrip
              locale={locale}
              sourceCount={Array.isArray(cc?.sources) ? cc.sources.length : undefined}
              contentReviewedAt={dest.content_reviewed_at}
            />

            <KnowBeforeYouGo
              locale={locale}
              budgetTier={dest.budget_tier}
              priceRange={cc?.sleep?.price_range_inr}
              months={months}
              reach={cc?.reach}
              emergency={cc?.emergency}
              stateId={dest.state_id}
            />

            {/* Month-by-Month Navigation */}
            <div className="mt-4">
              <SectionLabel className="mb-2">Month by month</SectionLabel>
              <div className="flex flex-wrap gap-1">
                {["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"].map((m, i) => {
                  const monthData = months.find((md: any) => md.month === i + 1);
                  const score = monthData?.score ?? 0;
                  const slug = ["january","february","march","april","may","june","july","august","september","october","november","december"][i];
                  const scoreColor = score >= 4 ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" : score >= 3 ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" : score >= 2 ? "bg-orange-500/20 text-orange-400 border-orange-500/30" : score >= 1 ? "bg-red-500/20 text-red-400 border-red-500/30" : "bg-zinc-500/20 text-zinc-400 border-zinc-500/30";
                  const isCurrent = i + 1 === currentMonth;
                  return (
                    <a
                      key={m}
                      href={`/${locale}/destination/${dest.id}/${slug}`}
                      className={`rounded-full border px-2.5 py-1 text-[10px] font-bold transition-all hover:scale-105 ${scoreColor} ${isCurrent ? "ring-1 ring-primary" : ""}`}
                    >
                      {m} {formatScoreInline(score)}
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Quick links to related pages */}
            <div className="mt-3 flex flex-wrap gap-2">
              {(() => {
                const monthSlug = ["","january","february","march","april","may","june","july","august","september","october","november","december"][currentMonth];
                const monthName = ["","January","February","March","April","May","June","July","August","September","October","November","December"][currentMonth];
                const hubSlug = dest.state_id ? `${dest.state_id}-in-${monthSlug}` : monthSlug;
                const hubLabel = dest.state_id && stateName
                  ? `Where to go in ${stateName}, ${monthName}`
                  : `All destinations in ${monthName}`;
                return (
                  <a href={`/${locale}/where-to-go/${hubSlug}`} className="rounded-full border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all">
                    {hubLabel} →
                  </a>
                );
              })()}
              {kf && (
                <a href={`/${locale}/with-kids/${dest.id}`} className="rounded-full border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all">
                  👶 Family Guide →
                </a>
              )}
              {dest.nearbyDestinations?.length > 0 && (
                <a href={`/${locale}/vs/${dest.id}-vs-${dest.nearbyDestinations[0].id}`} className="rounded-full border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all">
                  ⚔ Compare →
                </a>
              )}
            </div>

            {/* Live Weather */}
            <div className="mt-4">
              <div className="flex items-center gap-2 mb-2">
                <SectionLabel as="span">Weather</SectionLabel>
                <DataSignalBadge kind="live" tooltip="Refetched on each page view from OpenWeatherMap" />
              </div>
              <WeatherWidget destinationId={dest.id} />
            </div>

            {/* Related Blog Articles */}
            {dest.relatedArticles?.length > 0 && (
              <div className="mt-4 space-y-2">
                {dest.relatedArticles.map((article: any) => (
                  <a
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
                  </a>
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

            {/* Infrastructure Concerns — collapsed by default. Reveals on
                click for the planners who care about BSNL coverage, fuel
                gaps, ambulance reliability; stays out of the way for
                casual decision-stage visitors. */}
            {travelerFit.infraConcerns.length > 0 && (
              <CollapsibleDetails
                label="infrastructure reality check"
                count={travelerFit.infraConcerns.length}
                tone="warning"
                hint="What might bite you on the ground — network gaps, fuel, ambulance, altitude."
                className="mt-4"
              >
                <div className="rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-3">
                  <div className="space-y-1">
                    {travelerFit.infraConcerns.map((concern, i) => (
                      <div key={i} className="flex items-start gap-1.5 text-xs text-yellow-300/70">
                        <span className="mt-0.5 shrink-0">•</span>
                        <span>{concern}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CollapsibleDetails>
            )}

            {/* Data freshness + methodology */}
            <div className="mt-3 text-xs text-muted-foreground/50">
              {dest.content_reviewed_at
                ? `Last reviewed: ${new Date(dest.content_reviewed_at).toLocaleDateString("en-IN", { month: "long", year: "numeric" })}`
                : "Review pending"}
              {" · Scores based on weather, road access, crowd levels, infrastructure, safety conditions · "}
              Kids ratings factor in: medical access, ATM availability, phone signal, altitude, road safety
            </div>
            <div className="mt-2 text-xs">
              <SuggestEditButton
                targetTable="destinations"
                targetId={dest.id}
                context={dest.name}
                variant="inline"
              />
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
                    <div className="text-sm font-medium tabular-nums">{formatScoreInline(cc.safety_rating)}</div>
                  </div>
                </div>
              )}
            </div>
          </FadeIn>
        )}

        {/* Mini-map — "Where exactly is this?". Full-bleed at lg+ (immersive geography
            moment, Aman / Four Seasons resort-page pattern). */}
        {dest.coords?.lat && dest.coords?.lng && (
          <FadeIn delay={0.3}>
            <div className="mb-6 rounded-2xl lg:rounded-none border border-border lg:border-y lg:border-x-0 overflow-hidden lg:relative lg:left-1/2 lg:right-1/2 lg:-ml-[50vw] lg:-mr-[50vw] lg:w-screen">
              <div className="h-48 sm:h-56 lg:h-96">
                <Suspense fallback={<div className="w-full h-full bg-muted/30 flex items-center justify-center text-muted-foreground text-sm">Loading map...</div>}>
                  <DestinationMap
                    lat={dest.coords.lat}
                    lng={dest.coords.lng}
                    name={displayName}
                    elevation={dest.elevation_m}
                    nearby={dest.nearbyDestinations}
                    stateName={stateName}
                    region={getRegionNameForState(dest.state_id) ?? undefined}
                    nearestCity={cc?.reach?.from_nearest_city ?? undefined}
                    nearestAirport={cc?.reach?.nearest_airport ?? undefined}
                  />
                </Suspense>
              </div>
            </div>
          </FadeIn>
        )}

        {/* Visual ToC hero — the "In this guide" grid that surfaces every section's content */}
        <DestinationGuideToC
          dest={dest}
          months={months}
          kf={kf}
          cc={cc}
          subs={subs}
          gems={gems}
          pois={pois}
          eats={eats}
          legends={legends}
          has={{
            monthly: hasMonthly,
            kids: hasKids,
            safety: hasSafety,
            places: hasPlaces,
            food: hasFood,
            reviews: hasReviews,
          }}
        />

        {/* Sticky mini-nav — pops in after ToC scrolls away, scroll-spies visible section.
            Hidden at lg+ where the sidebar variant takes over. */}
        <DestinationSectionNav sections={availableSections} variant="top" />

        {/* === LONG-SCROLL CONTENT === at lg+, 2-col grid with sidebar ToC on the right === */}
        <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_260px] lg:gap-10">
          <div className="space-y-10 min-w-0">
          {/* Overview — wraps entire overview block so scroll-spy tracks correctly */}
          <section id="section-overview" className="scroll-mt-40 space-y-8">
                {/* Why Special */}
                <div>
                  <h2 className="text-xl font-semibold mb-3">Why Special</h2>
                  <p className="text-[15px] text-muted-foreground leading-[1.75] max-w-prose">{displayWhySpecial}</p>
                </div>

                {/* Who Should Skip — anti-brochure honesty */}
                {travelerFit.notFor.length > 0 && (
                  <section className="rounded-xl border border-orange-500/20 bg-orange-500/5 p-5">
                    <h2 className="text-lg font-semibold text-orange-300 mb-3">Who should think twice</h2>
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
                        <SectionLabel tone="warning" className="mb-2">Infrastructure reality</SectionLabel>
                        <div className="space-y-1.5">
                          {travelerFit.infraConcerns.map((c, i) => (
                            <p key={i} className="text-sm text-orange-200/60">{c}</p>
                          ))}
                        </div>
                      </div>
                    )}
                  </section>
                )}

                {/* Tourist Trap Alternatives — always shown when populated.
                    Editorial-opinion block; users who disagree just scroll. */}
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
                  <section id="festivals">
                    <h2 className="text-xl font-semibold mb-3">Festivals & Events</h2>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {dest.festivals.map((f: any, i: number) => {
                        const MONTH_SHORT = ["","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
                        return (
                          <div key={i} id={f.id ? `festival-${f.id}` : undefined} className="rounded-xl border border-border p-4 hover:border-primary/30 transition-colors">
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

                {/* Infrastructure Reality Panel — heading visible, dense
                    grid collapsed by default. Click-to-reveal covers network
                    operator detail, ambulance ETAs, police stations — the
                    data planners need without forcing it on casual visitors. */}
                {cc && (
                  <section>
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <h2 id="section-infrastructure" className="text-xl font-semibold">Infrastructure data</h2>
                      <SectionFreshness
                        sectionKey="infrastructure"
                        sectionReviews={dest.section_reviews}
                        fallback={dest.content_reviewed_at}
                      />
                    </div>
                    <CollapsibleDetails
                      label="the full infrastructure breakdown"
                      hint="Network carriers, fuel reliability, AQI history, elevation details — the full scorecard."
                    >
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

                      {/* Medical — from confidence_cards.emergency OR emergency_sos */}
                      {(cc.emergency || dest.emergencySos) && (
                        <div className="rounded-xl border border-border p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-lg">🏥</span>
                            <h3 className="text-sm font-semibold">Medical & Emergency</h3>
                          </div>
                          {(cc.emergency?.nearest_hospital || dest.emergencySos?.nearest_hospital) && <p className="text-sm text-muted-foreground mb-1"><span className="font-medium text-foreground">Hospital:</span> {cc.emergency?.nearest_hospital || dest.emergencySos?.nearest_hospital}{dest.emergencySos?.nearest_hospital_km ? ` (${dest.emergencySos.nearest_hospital_km} km)` : ""}</p>}
                          {(cc.emergency?.ambulance || dest.emergencySos?.ambulance) && <p className="text-sm text-muted-foreground mb-1"><span className="font-medium text-foreground">Ambulance:</span> {cc.emergency?.ambulance || dest.emergencySos?.ambulance}</p>}
                          {(cc.emergency?.police_station || dest.emergencySos?.local_police_station || dest.emergencySos?.police) && <p className="text-sm text-muted-foreground"><span className="font-medium text-foreground">Police:</span> {cc.emergency?.police_station || dest.emergencySos?.local_police_station || dest.emergencySos?.police}</p>}
                          {dest.emergencySos?.rescue_contact && <p className="text-sm text-muted-foreground"><span className="font-medium text-foreground">Rescue:</span> {dest.emergencySos.rescue_contact}</p>}
                          {(dest.emergencySos?.verified && dest.emergencySos?.source_url) && (
                            <p className="text-[10px] text-emerald-400/70 mt-2 pt-2 border-t border-border/50">
                              ✓ Verified · <a href={dest.emergencySos.source_url} target="_blank" rel="noopener noreferrer" className="underline hover:text-emerald-300">{dest.emergencySos.source_label ?? "source"}</a>
                            </p>
                          )}
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
                      {(cc.fuel && Object.keys(cc.fuel).length > 0 || cc.sleep && Object.keys(cc.sleep).length > 0) && (
                        <div className="rounded-xl border border-border p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-lg">⛽</span>
                            <h3 className="text-sm font-semibold">Fuel & Stay</h3>
                          </div>
                          {cc.fuel?.nearest_petrol_pump ? <p className="text-sm text-muted-foreground mb-1"><span className="font-medium text-foreground">Fuel:</span> {cc.fuel.nearest_petrol_pump}</p> : cc.fuel?.note ? <p className="text-sm text-muted-foreground mb-1"><span className="font-medium text-foreground">Fuel:</span> {cc.fuel.note}</p> : null}
                          {cc.fuel?.carry_extra && <p className="text-sm text-yellow-400 mb-1">⚠ Carry extra fuel</p>}
                          {cc.fuel?.ev_charging && <p className="text-sm text-emerald-400 mb-1">EV charging available</p>}
                          {cc.sleep?.price_range_inr ? <p className="text-sm text-muted-foreground mb-1"><span className="font-medium text-foreground">Stay:</span> ₹{cc.sleep.price_range_inr}/night</p> : cc.sleep?.note ? <p className="text-sm text-muted-foreground mb-1"><span className="font-medium text-foreground">Stay:</span> {cc.sleep.note}</p> : null}
                          {cc.sleep?.options_count && <p className="text-sm text-muted-foreground mb-1">{cc.sleep.options_count}+ options ({(cc.sleep.types || []).join(", ")})</p>}
                          {cc.sleep?.emergency_stay && <p className="text-sm text-muted-foreground"><span className="font-medium text-foreground">Emergency:</span> {cc.sleep.emergency_stay}</p>}
                        </div>
                      )}
                    </div>

                    {/* Helpline */}
                    {cc.emergency?.helpline && (
                      <div className="mt-3 rounded-xl border border-primary/20 bg-primary/5 p-3">
                        <p className="text-sm"><span className="font-semibold">Helpline:</span> {cc.emergency.helpline}</p>
                      </div>
                    )}
                    </CollapsibleDetails>
                  </section>
                )}

                {/* Editor's Picks — top layer: 4 curated stay slots with sources + upgrade_reasoning */}
                {dest.editor_stay_picks?.length > 0 && (
                  <section id="section-stays">
                    <EditorsPicks
                      destinationName={dest.name}
                      stateName={stateName}
                      picks={dest.editor_stay_picks}
                      intelligence={dest.stay_intelligence}
                    />
                  </section>
                )}

                {/* Neighborhood Guide — where to stay by vibe (existing stay_zones data) */}
                {dest.stay_zones && Object.keys(dest.stay_zones).length > 0 && (
                  <section {...(dest.editor_stay_picks?.length ? {} : { id: "section-stays" })}>
                    <h2 className="text-xl font-semibold mb-3">Neighborhood guide</h2>
                    <p className="text-sm text-muted-foreground mb-3">Where to base yourself, by vibe.</p>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {dest.stay_zones.best_for_families && (
                        <div className="rounded-xl border border-border p-4">
                          <SectionLabel tone="accent" className="mb-1 text-emerald-400">Best for families</SectionLabel>
                          <div className="text-[15px]">{dest.stay_zones.best_for_families}</div>
                        </div>
                      )}
                      {dest.stay_zones.best_for_backpackers && (
                        <div className="rounded-xl border border-border p-4">
                          <SectionLabel className="mb-1 text-blue-400">Best for backpackers</SectionLabel>
                          <div className="text-[15px]">{dest.stay_zones.best_for_backpackers}</div>
                        </div>
                      )}
                      {dest.stay_zones.best_for_quiet && (
                        <div className="rounded-xl border border-border p-4">
                          <SectionLabel className="mb-1 text-purple-400">Best for peace &amp; quiet</SectionLabel>
                          <div className="text-[15px]">{dest.stay_zones.best_for_quiet}</div>
                        </div>
                      )}
                      {dest.stay_zones.avoid && (
                        <div className="rounded-xl border border-orange-500/20 bg-orange-500/5 p-4">
                          <SectionLabel tone="warning" className="mb-1 text-orange-400">Think twice</SectionLabel>
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

                {/* Trip Cost Estimator — handles both rich shape (per-tier
                    stay/food/transport/activities breakdown) and thin shape
                    ({budget: 800, mid: 2000} flat numbers, common on Tier-3
                    dests). Renders whatever exists; ranges, dates, and a
                    booking-confirm reminder follow current-spend rules. */}
                {dest.daily_cost && (() => {
                  const dc = dest.daily_cost as Record<string, unknown>;
                  const tiers = [
                    { key: "budget", altKeys: [] as string[], label: "Budget", color: "emerald", icon: "🎒" },
                    { key: "midrange", altKeys: ["mid"], label: "Mid-range", color: "blue", icon: "🏨" },
                    { key: "luxury", altKeys: ["lux", "premium"], label: "Luxury", color: "purple", icon: "✨" },
                  ];
                  const resolved = tiers.map((t) => {
                    const raw = dc[t.key] ?? t.altKeys.map((k) => dc[k]).find((v) => v != null);
                    return { ...t, raw };
                  }).filter((t) => t.raw != null);
                  if (resolved.length === 0) return null;
                  return (
                    <section>
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <h2 className="text-xl font-semibold">What a day actually costs</h2>
                        <SectionFreshness
                          sectionKey="cost"
                          sectionReviews={dest.section_reviews}
                          fallback={dest.content_reviewed_at}
                        />
                      </div>
                      <div className="grid gap-3 sm:grid-cols-3">
                        {resolved.map(({ key, label, color, icon, raw }) => {
                          const isObj = raw && typeof raw === "object";
                          const tier = isObj ? raw as Record<string, number | undefined> : null;
                          const flatNumber = !isObj && typeof raw === "number" ? raw : null;
                          const total = tier?.total ?? (
                            tier ? (tier.stay ?? 0) + (tier.food ?? 0) + (tier.transport ?? 0) + (tier.activities ?? 0) : flatNumber
                          );
                          return (
                            <div key={key} className={`rounded-xl border border-${color}-500/20 bg-${color}-500/5 p-4`}>
                              <div className="flex items-center gap-2 mb-3">
                                <span className="text-lg">{icon}</span>
                                <h3 className="text-sm font-semibold">{label}</h3>
                                {total != null && (
                                  <span className={`ml-auto text-lg font-mono font-bold text-${color}-400`}>₹{total.toLocaleString()}</span>
                                )}
                              </div>
                              {tier ? (
                                <div className="space-y-1.5 text-xs text-muted-foreground">
                                  {tier.stay != null && <div className="flex justify-between"><span>Stay</span><span className="font-mono">₹{tier.stay.toLocaleString()}</span></div>}
                                  {tier.food != null && <div className="flex justify-between"><span>Food</span><span className="font-mono">₹{tier.food.toLocaleString()}</span></div>}
                                  {tier.transport != null && <div className="flex justify-between"><span>Transport</span><span className="font-mono">₹{tier.transport.toLocaleString()}</span></div>}
                                  {tier.activities != null && <div className="flex justify-between"><span>Activities</span><span className="font-mono">₹{tier.activities.toLocaleString()}</span></div>}
                                </div>
                              ) : (
                                <p className="text-xs text-muted-foreground/70">All-in estimate. Breakdown coming soon.</p>
                              )}
                              <div className="mt-2 pt-2 border-t border-border/30 text-xs text-muted-foreground/50">
                                per person per day
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      {typeof dc.note === "string" && (
                        <p className="mt-3 text-sm italic text-muted-foreground/70">💡 {dc.note}</p>
                      )}
                      <p className="mt-2 text-xs text-muted-foreground/50">
                        Estimates based on recent traveler reports + verified listings. Confirm at booking.
                      </p>
                    </section>
                  );
                })()}

                {/* Crowd Calendar — handles both rich shape (peak_months /
                    quiet_months int[]) and thin shape ({peak, off, shoulder}
                    string month ranges like "Oct-Feb"). Falls back to a
                    text summary when no month data can be derived (so we
                    don't paint everything moderate-yellow misleadingly). */}
                {dest.crowd_calendar && (() => {
                  const cc = dest.crowd_calendar as Record<string, unknown>;
                  const MN = ["jan","feb","mar","apr","may","jun","jul","aug","sep","oct","nov","dec"];
                  const expandRange = (s: unknown): number[] => {
                    if (typeof s !== "string") return [];
                    const m = s.toLowerCase().match(/(\w{3,9})\s*[-–]\s*(\w{3,9})/);
                    if (!m) return [];
                    const a = MN.findIndex((n) => m[1].startsWith(n));
                    const b = MN.findIndex((n) => m[2].startsWith(n));
                    if (a < 0 || b < 0) return [];
                    const out: number[] = [];
                    let i = a;
                    while (true) {
                      out.push(i + 1);
                      if (i === b) break;
                      i = (i + 1) % 12;
                      if (out.length > 12) break;
                    }
                    return out;
                  };
                  const peakRich: number[] | undefined = Array.isArray(cc.peak_months) ? cc.peak_months as number[] : undefined;
                  const quietRich: number[] | undefined = Array.isArray(cc.quiet_months) ? cc.quiet_months as number[] : undefined;
                  const peakMonths = peakRich ?? expandRange(cc.peak);
                  const quietMonths = quietRich ?? expandRange(cc.off ?? cc.quiet);
                  const moderateMonths = expandRange(cc.shoulder);
                  const hasMonthData = peakMonths.length > 0 || quietMonths.length > 0 || moderateMonths.length > 0;
                  return (
                    <section>
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <h2 className="text-xl font-semibold">What crowds look like</h2>
                        <SectionFreshness
                          sectionKey="crowd"
                          sectionReviews={dest.section_reviews}
                          fallback={dest.content_reviewed_at}
                        />
                      </div>
                      <div className="rounded-xl border border-border p-5">
                        {hasMonthData ? (
                          <>
                            <div className="flex gap-0.5 mb-3">
                              {Array.from({ length: 12 }, (_, i) => {
                                const m = i + 1;
                                const isPeak = peakMonths.includes(m);
                                const isQuiet = quietMonths.includes(m);
                                const isModerate = moderateMonths.includes(m);
                                const MNAMES = ["","J","F","M","A","M","J","J","A","S","O","N","D"];
                                const tone = isPeak
                                  ? "bg-red-400"
                                  : isQuiet
                                  ? "bg-emerald-400"
                                  : isModerate
                                  ? "bg-yellow-400"
                                  : "bg-muted";
                                return (
                                  <div key={m} className="flex-1 text-center">
                                    <div className={`h-2 rounded-full mb-1 ${tone}`} />
                                    <span className="text-xs text-muted-foreground">{MNAMES[m]}</span>
                                  </div>
                                );
                              })}
                            </div>
                            <div className="flex flex-wrap gap-4 text-xs text-muted-foreground mb-3">
                              <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-emerald-400" /> Quiet</span>
                              <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-yellow-400" /> Moderate</span>
                              <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-red-400" /> Peak</span>
                            </div>
                          </>
                        ) : (
                          <div className="space-y-1 text-sm text-muted-foreground mb-3">
                            {typeof cc.peak === "string" && <p><span className="text-red-400 font-medium">Peak</span>: {cc.peak as string}</p>}
                            {typeof cc.shoulder === "string" && <p><span className="text-yellow-400 font-medium">Shoulder</span>: {cc.shoulder as string}</p>}
                            {typeof cc.off === "string" && <p><span className="text-emerald-400 font-medium">Off / quiet</span>: {cc.off as string}</p>}
                          </div>
                        )}
                        {Boolean(cc.avoid_weekends) && (
                          <p className="text-sm text-orange-300/80 mb-2">⚠ Avoid weekends — crowded with day-trippers</p>
                        )}
                        {typeof cc.best_day === "string" && (
                          <p className="text-sm text-muted-foreground"><span className="font-medium text-foreground">Best days:</span> {cc.best_day as string}</p>
                        )}
                        {typeof cc.note === "string" && (
                          <p className="text-sm text-muted-foreground mt-1">{cc.note as string}</p>
                        )}
                      </div>
                    </section>
                  );
                })()}

                {/* Food & Dining — handles BOTH rich shape
                    (vegetarian_ease + family_dining + cuisine + note) and
                    thin shape ({type, highlights[], vegetarian_friendly})
                    used on Tier-3 dests like Kotagiri. Whatever fields
                    exist render. Section is hidden only when there's
                    truly nothing to say. */}
                {dest.food_scene && (() => {
                  const fs = dest.food_scene as Record<string, unknown>;
                  const hasContent =
                    Boolean(fs.vegetarian_ease) ||
                    Boolean(fs.family_dining) ||
                    Boolean(fs.cuisine) ||
                    Boolean(fs.note) ||
                    Boolean(fs.type) ||
                    fs.vegetarian_friendly != null ||
                    (Array.isArray(fs.highlights) && fs.highlights.length > 0);
                  if (!hasContent) return null;
                  const highlights = Array.isArray(fs.highlights) ? fs.highlights as string[] : [];
                  const vegLabel: string | null =
                    typeof fs.vegetarian_ease === "string"
                      ? fs.vegetarian_ease as string
                      : fs.vegetarian_friendly === true
                      ? "Vegetarian-friendly"
                      : fs.vegetarian_friendly === false
                      ? "Limited vegetarian options"
                      : null;
                  return (
                    <section>
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <h2 className="text-xl font-semibold">Food & Dining</h2>
                        <SectionFreshness
                          sectionKey="food"
                          sectionReviews={dest.section_reviews}
                          fallback={dest.content_reviewed_at}
                        />
                      </div>
                      <div className="grid gap-3 sm:grid-cols-2">
                        {typeof fs.type === "string" && (
                          <div className="rounded-xl border border-border p-4 flex items-start gap-3">
                            <span className="text-lg">🍽️</span>
                            <div>
                              <SectionLabel>Cuisine type</SectionLabel>
                              <div className="text-sm font-medium mt-0.5">{fs.type as string}</div>
                            </div>
                          </div>
                        )}
                        {vegLabel && (
                          <div className="rounded-xl border border-border p-4 flex items-start gap-3">
                            <span className="text-lg">🥬</span>
                            <div>
                              <SectionLabel>Vegetarian</SectionLabel>
                              <div className="text-sm font-medium capitalize mt-0.5">{vegLabel}</div>
                            </div>
                          </div>
                        )}
                        {typeof fs.family_dining === "string" && (
                          <div className="rounded-xl border border-border p-4 flex items-start gap-3">
                            <span className="text-lg">👨‍👩‍👧</span>
                            <div>
                              <SectionLabel>Family dining</SectionLabel>
                              <div className="text-sm font-medium mt-0.5">{fs.family_dining as string}</div>
                            </div>
                          </div>
                        )}
                      </div>
                      {highlights.length > 0 && (
                        <div className="mt-3">
                          <SectionLabel>Local highlights</SectionLabel>
                          <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
                            {highlights.map((h, i) => (
                              <li key={i} className="flex gap-2">
                                <span className="text-amber-400/70">•</span>
                                <span>{h}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {typeof fs.cuisine === "string" && (
                        <p className="mt-2 text-sm text-muted-foreground"><span className="font-medium text-foreground">Cuisine:</span> {fs.cuisine as string}</p>
                      )}
                      {typeof fs.note === "string" && (
                        <p className="mt-1 text-sm italic text-muted-foreground/70">{fs.note as string}</p>
                      )}
                    </section>
                  );
                })()}

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
                      <span className="ml-auto text-lg font-mono font-bold text-blue-400 tabular-nums">{formatScoreInline(dest.workability.remote_work_rating)}</span>
                    </div>
                  </section>
                )}

                {/* Access */}
                <section>
                  <h2 className="text-xl font-semibold mb-3">{t("howToReach")}</h2>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-xl border border-border p-4">
                      <SectionLabel>Airport</SectionLabel>
                      <div className="mt-1 text-sm">{dest.nearest_airport}</div>
                    </div>
                    <div className="rounded-xl border border-border p-4">
                      <SectionLabel>Rail</SectionLabel>
                      <div className="mt-1 text-sm">{dest.nearest_railhead}</div>
                    </div>
                  </div>
                </section>

                {/* Emergency SOS */}
                <EmergencySOSSection sos={dest.emergencySos} destinationName={displayName} />

                {/* International Traveler Info — always shown when populated.
                    Self-labeled; Indian visitors will scroll past. */}
                <InternationalInfoSection info={dest.international_info} />

                {/* Meet the Locals Preview */}
                {legends.length > 0 && (
                  <section>
                    <div className="flex items-center justify-between mb-3">
                      <h2 className="text-xl font-semibold">Meet the Locals</h2>
                      <a
                        href="#section-food"
                        className="text-xs text-primary hover:underline"
                      >
                        View all &rarr;
                      </a>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {legends.slice(0, 2).map((legend: any) => (
                        <a
                          key={legend.id}
                          href="#section-food"
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
                        </a>
                      ))}
                    </div>
                  </section>
                )}

              </section>

          {/* Monthly — 12-month breakdown chart */}
          {hasMonthly && (
            <section id="section-monthly" className="scroll-mt-40">
              <h2 className="text-xl font-semibold mb-4">{t("bestMonths")}</h2>
              <MonthlyChart
                scores={months.map((m: any) => ({
                  m: m.month, score: m.score, note: m.note,
                  why_go: m.why_go, why_not: m.why_not,
                }))}
              />
            </section>
          )}

          {/* Sprint 2 — On the Ground (micro-itineraries 1/3/5 day). Reveals
              for Simple + Pro both. This is the answer to "what do I actually
              DO here?" — the gap every destination page had until now. */}
          {hasItinerary && (
            <section id="section-itinerary" className="scroll-mt-40">
              <MicroItinerarySection data={dest.micro_itineraries} />
            </section>
          )}

          {/* Kids — rating badge */}
          {hasKids && (
            <section id="section-kids" className="scroll-mt-40">
              <h2 className="text-xl font-semibold mb-4">{t("kidsRating")}</h2>
              <KidsBadge {...kf} />
            </section>
          )}

          {/* Safety — solo-female section + confidence card */}
          {hasSafety && (
            <section id="section-safety" className="scroll-mt-40 space-y-6">
              <h2 className="text-xl font-semibold mb-4">{t("confidence")}</h2>
              <SoloFemaleSafetySection
                score={dest.solo_female_score ?? null}
                note={dest.solo_female_note ?? null}
                monthRows={months.map((m: any) => ({
                  month: m.month,
                  solo_female_override: m.solo_female_override ?? null,
                  solo_female_override_note: m.solo_female_override_note ?? null,
                }))}
                hubHref={`/${locale}/blog/solo-female-india-month-by-month`}
              />
              {cc && (
                <CollapsibleDetails
                  label="full safety reference"
                  hint="Emergency contacts, health notes, altitude advice, crime snapshot — every field."
                >
                  <ConfidenceCardComponent {...cc} />
                </CollapsibleDetails>
              )}
            </section>
          )}

          {/* Sprint 2 — Scenario playbooks. If-Then protocols matched to this
              dest by explicit slug OR region OR altitude band. Pre-trip
              briefing, not warnings in a vacuum. */}
          {hasScenarios && (
            <section id="section-scenarios" className="scroll-mt-40">
              <ScenarioStrip scenarios={dest.scenarios} locale={locale} />
            </section>
          )}

          {/* Sprint 2 — Persona-specific prose ("if you're a family / biker /
              photographer / nomad / solo-f / elderly, here's how this place
              works for YOU"). Shows in both Simple and Pro. */}
          {hasPersonas && (
            <section id="section-personas" className="scroll-mt-40">
              <PersonaBlocksSection data={dest.persona_blocks} />
            </section>
          )}

          {/* Sprint 2 — Local logistics checklist. Shown in Simple + Pro:
              this is practical "how to use this place" info (taxi norms, UPI
              reality, shop hours) — mainstream, not intimidating. */}
          {hasLogistics && (
            <section id="section-logistics" className="scroll-mt-40">
              <LogisticsChecklist data={dest.local_logistics} />
            </section>
          )}

          {/* Places — sub-destinations, hidden gems, POIs */}
          {hasPlaces && (
            <section
              id="section-places"
              className="scroll-mt-40 space-y-8"
              
            >
              {subs.length > 0 && (
                <div id="places">
                  <h2 className="text-xl font-semibold mb-4">Places Within {dest.name}</h2>
                  <StaggerContainer className="grid gap-3 sm:grid-cols-2" staggerDelay={0.05}>
                    {subs.map((sub: any) => (
                      <StaggerItem key={sub.id}>
                        <HoverCard>
                          <a
                            id={`sub-${sub.id}`}
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
                          </a>
                        </HoverCard>
                      </StaggerItem>
                    ))}
                  </StaggerContainer>
                </div>
              )}

              {gems.length > 0 && (
                <div id="hidden-gems">
                  <h2 className="text-xl font-semibold mb-4">{t("discoverNearby")}</h2>
                  <div className="space-y-3">
                    {gems.map((gem: any) => (
                      <motion.div key={gem.id} id={`gem-${gem.id}`} whileHover={{ x: 4 }} className="rounded-xl border border-dashed border-primary/30 bg-primary/5 p-4">
                        <div className="flex items-start justify-between">
                          <h3 className="font-semibold text-primary">{gem.name}</h3>
                          <span className="text-xs text-muted-foreground">{gem.distance_km}km · {gem.drive_time}</span>
                        </div>
                        {gem.why_unknown && <p className="mt-1 text-xs text-yellow-400">Why unknown: {gem.why_unknown}</p>}
                        <p className="mt-1 text-sm text-muted-foreground">{gem.why_go}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {pois.length > 0 && (
                <POISection pois={pois} destName={displayName} />
              )}
            </section>
          )}

          {/* Food & People — local legends, viral eats, local picks */}
          {hasFood && (
            <section
              id="section-food"
              className="scroll-mt-40 space-y-8"
              
            >
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

              {dest.local_stays?.length > 0 && (
                <div id="stays">
                  <h2 className="text-xl font-semibold mb-2">Local Picks</h2>
                  <p className="text-sm text-muted-foreground mb-4">Vetted stays, operators, and local businesses — not a booking site, just honest recommendations.</p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {dest.local_stays.map((stay: any) => (
                      <div key={stay.id} id={`stay-${stay.id}`} className="rounded-xl border border-border p-4 hover:border-primary/30 transition-colors overflow-hidden">
                        <div className="flex items-start justify-between gap-3 mb-1">
                          <div className="min-w-0">
                            <h3 className="font-semibold text-[15px] break-words">{stay.name}</h3>
                            <span className={`text-xs font-medium capitalize ${
                              stay.type === "homestay" ? "text-emerald-400" :
                              stay.type === "cafe" ? "text-amber-400" :
                              stay.type === "operator" || stay.type === "guide" ? "text-blue-400" :
                              "text-muted-foreground"
                            }`}>{stay.type}</span>
                          </div>
                          {stay.price_range && <span className="text-xs font-mono text-muted-foreground text-right shrink-0 max-w-[55%] break-words whitespace-normal leading-snug">{stay.price_range}</span>}
                        </div>
                        {stay.location && <p className="text-xs text-muted-foreground/60 mb-1 break-words">📍 {stay.location}</p>}
                        {stay.why_special && <p className="text-sm text-muted-foreground leading-relaxed mt-1 break-words">{stay.why_special}</p>}
                        <div className="mt-2 flex flex-wrap items-center gap-2">
                          {stay.best_for && <span className="rounded-full border border-border px-2 py-1 text-xs text-muted-foreground max-w-full break-words whitespace-normal">Best for: {stay.best_for}</span>}
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
                </div>
              )}
            </section>
          )}

          {/* Sprint 2 — Best For segments. Pitch language: "who we'd send
              here and why". Anchors the end of the editorial flow before
              reviews. */}
          {hasBestFor && (
            <section id="section-bestfor" className="scroll-mt-40">
              <BestForSegments data={dest.best_for_segments} />
            </section>
          )}

          {/* Sprint 2 — Altitude context. Only for 1500m+ dests where
              altitude is traveler-relevant. Shows AMS tone per band. */}
          {hasElevation && (
            <section id="section-elevation" className="scroll-mt-40">
              <ElevationChart elevationM={dest.elevation_m} destinationName={displayName} />
            </section>
          )}

          {/* Sprint 22 — Where to eat. Verified restaurant-level data
              keyed by destination_id. Renders cards with area chips,
              category filter, signature dish, must-try, address,
              insider tips. Replaces fuzzy area-level guidance the
              chatbot used to give for food questions. */}
          {hasEateries && (
            <section id="section-eateries" className="scroll-mt-40 space-y-4">
              <DestinationEateries eateries={eateries} destinationName={displayName} />
            </section>
          )}

          {/* Sprint 21 — Q&A board. Always rendered so visitors can submit
              even before the first answered question. Renders top 5 most-
              recent answered questions with a "Read full answer" deep-link
              into /destination/[id]/q/[slug] (FAQPage JSON-LD per page). */}
          {hasQuestions && (
            <section id="section-questions" className="scroll-mt-40 space-y-6">
              <div className="flex items-baseline justify-between gap-3 flex-wrap">
                <h2 className="text-xl font-semibold">Questions &amp; answers</h2>
                {answeredQuestions.length > 0 && (
                  <span className="text-xs text-muted-foreground tabular-nums">
                    {answeredQuestions.length} answered
                  </span>
                )}
              </div>
              <QuestionsList
                questions={answeredQuestions}
                destinationId={dest.id}
                locale={locale}
              />
              <QuestionForm destinationId={dest.id} />
            </section>
          )}

          {/* Reviews — traveler notes + reviews list + review form */}
          {hasReviews && (
            <section
              id="section-reviews"
              className="scroll-mt-40 space-y-8"

            >
              <h2 className="text-xl font-semibold mb-4">Reviews</h2>
              {dest.traveler_notes?.length > 0 && (
                <TravelerNotes notes={dest.traveler_notes} />
              )}
              <ReviewsList reviews={dest.reviews ?? []} />
              <ReviewForm destinationId={dest.id} />
            </section>
          )}

          {/* Sprint 12 — structured traveler trip reports. Approved UGC with
              month + year + rating context. AggregateRating JSON-LD wraps
              these on the page-level TouristDestination schema. */}
          <TravelerReports
            reports={dest.trip_reports ?? []}
            destinationId={dest.id}
            destinationName={displayName}
            locale={locale}
          />
          </div>

          {/* Sidebar ToC — sticky vertical rail, lg+ only */}
          <aside className="hidden lg:block">
            <DestinationSectionNav sections={availableSections} variant="sidebar" />
          </aside>
        </div>
      </div>
      {/* === SEO Internal Linking Modules === */}

      {/* Booking Handoff — pushed to the tail just above Nearby because we
          don't take paid placement; it's a conversion card, not editorial.
          Previously sat mid-page inside the People section which made it
          compete with the content instead of capping the page. */}
      <div className="mt-12">
        <BookingHandoff destinationName={dest.name} stateName={stateName} />
      </div>

      {/* Nearby Places — PostGIS distance-sorted, with same-state fallback */}
      {dest.nearbyDestinations?.length > 0 && (() => {
        const hasDistance = dest.nearbyDestinations.some((nd: any) => nd.distance_km != null);
        const heading = hasDistance ? "Nearby Places" : `Nearby in ${stateName}`;
        return (
          <ScrollReveal>
            <div className="mt-12 border-t border-border pt-8">
              <h2 className="text-xl font-semibold mb-4">{heading}</h2>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {dest.nearbyDestinations.map((nd: any) => {
                  const ndState = Array.isArray(nd.state) ? nd.state[0]?.name : nd.state?.name;
                  return (
                    <a
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
                          {nd.distance_km != null
                            ? `${nd.distance_km} km${ndState ? ` · ${ndState}` : ""}${nd.difficulty ? ` · ${nd.difficulty}` : ""}`
                            : `${nd.difficulty}${nd.elevation_m ? ` · ${nd.elevation_m.toLocaleString()}m` : ""}`}
                        </div>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          </ScrollReveal>
        );
      })()}

      {/* Featured in Collections */}
      {dest.relatedCollections?.length > 0 && (
        <ScrollReveal>
          <div className="mt-8">
            <h2 className="text-lg font-semibold mb-3">Featured in Collections</h2>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {dest.relatedCollections.map((c: any) => (
                <a
                  key={c.id}
                  href={`/${locale}/collections/${c.id}`}
                  className="flex-shrink-0 rounded-xl border border-border bg-card p-4 w-60 hover:border-primary/40 transition-all"
                >
                  <div className="font-semibold text-sm">{c.name}</div>
                  <div className="text-xs text-muted-foreground mt-1 line-clamp-2">{c.description}</div>
                </a>
              ))}
            </div>
          </div>
        </ScrollReveal>
      )}

      {/* Road Trips Through Here */}
      {dest.relatedRoutes?.length > 0 && (
        <ScrollReveal>
          <div className="mt-8">
            <h2 className="text-lg font-semibold mb-3">Road Trips Through Here</h2>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {dest.relatedRoutes.map((r: any) => (
                <a
                  key={r.id}
                  href={`/${locale}/routes/${r.id}`}
                  className="flex-shrink-0 rounded-xl border border-border bg-card p-4 w-60 hover:border-primary/40 transition-all"
                >
                  <div className="font-semibold text-sm">{r.name}</div>
                  <div className="text-xs text-muted-foreground mt-1">{r.days} days · {r.difficulty}</div>
                </a>
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
