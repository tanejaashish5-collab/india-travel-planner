"use client";

/* ============================================================
   Cinematic destination template — parallel to DestinationDetail.

   Currently ROUTED ONLY for one destination (Manali) so we can
   live-test the design language before propagating to the other
   504 places. All data fetched in [id]/page.tsx is passed through
   verbatim — props and field shape match DestinationDetail.

   Eleven acts, each with a SectionLabel + cinematic frame. Existing
   feature components (ConfidenceCardComponent, KidsBadge, MonthlyChart,
   ScenarioStrip, MicroItinerarySection, ReviewsList, etc.) are
   embedded inside the acts, not deleted — so no data is lost and
   no analytics events go silent.
   ============================================================ */

import Link from "next/link";
import { useState, type ReactNode } from "react";
import { useLocale, useTranslations } from "next-intl";
import { destinationImage } from "@/lib/image-url";
import { videoSrc } from "@/lib/video-url";
import {
  currentMonthIST,
  currentMonthLongIST,
  MONTH_LONG_NAMES,
  formatScore,
  verdictFor,
  verdictTier,
  VERDICT_COLOR,
  localizeRow,
  type Locale,
} from "@itp/shared";

// Cinematic chrome
import { CinemaStyles } from "@/components/landing-cinema/cinema-styles";
import { renderDisplayName } from "@/lib/display-name";
import { SectionLabel } from "@/components/landing-cinema/helpers";
import { getIssueNumber } from "@/components/landing-cinema/issue-number";
import { DestinationGuideToc } from "@/components/landing-cinema/destination-guide-toc";
import {
  EditorialEntry,
  EditorialCaption,
  Prose,
  PullQuote,
  Title,
  ctaPrimary,
  ctaSecondary,
  sectionStyle,
} from "@/components/landing-cinema/editorial";

// Existing feature components — preserved verbatim, just re-framed.
// StickyDestinationHeader / DestinationSectionNav / DestinationDecisionRail
// are intentionally NOT used here — they paint shadcn chrome over the
// cinematic palette and the user asked them removed. The cinematic right
// rail in DestinationScrollRail handles act-jumping. Footer is rendered
// inline in cinematic palette below — the production <Footer /> uses
// shadcn tokens which clash with --paper / --bone.
import { Nav } from "./nav";
import { MonthlyChart } from "./monthly-chart";
import { WeatherWidget } from "./weather-widget";
import { ShareButton } from "./share-button";
import { WhatsAppShare } from "./whatsapp-share";
import { CompareButton } from "./compare-tray";
import { ConfidenceCardComponent } from "./confidence-card";
import { CinematicStateMap } from "./cinematic-state-map";
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
import { MicroItinerarySection } from "./micro-itinerary-section";
import { LogisticsChecklist } from "./logistics-checklist";
import { PersonaBlocksSection } from "./persona-blocks-section";
import { BestForSegments } from "./best-for-segments";
import { ScenarioStrip } from "./scenario-strip";
import { ElevationChart } from "./elevation-chart";
import SoloFemaleSafetySection from "./solo-female-safety-section";
import KnowBeforeYouGo from "./know-before-you-go";
import { EditorsPicks } from "./editors-picks";
import { InternationalInfoSection } from "./international-info";
import { EmergencySOSSection, SOSFloatingButton } from "./emergency-sos";
import { DestinationAlerts } from "./destination-alerts";
import { POISection } from "./poi-section";
import { AskNakshIQInlineCTA } from "@/components/ask-nakshiq-inline-cta";
import { SuggestEditButton } from "./suggest-edit-button";
import { CinematicShareBar } from "./cinematic-share-bar";
import { CinematicBreadcrumb } from "./cinematic-breadcrumb";
import { CinematicVerdictStrip } from "./cinematic-verdict-strip";
import { CinematicVsCards } from "./cinematic-vs-cards";
import { CinematicScorecard } from "./cinematic-scorecard";
import { CinematicProgressBar } from "./cinematic-progress-bar";
import { CinematicActIndicator } from "./cinematic-act-indicator";
import { CinematicCountUp } from "./cinematic-count-up";
import { CinematicHeroParallax } from "./cinematic-hero-parallax";
import { CinematicMobileActionBar } from "./cinematic-mobile-action-bar";
import { CinematicNewsletter } from "./cinematic-newsletter";
import { CinematicHiddenGems } from "./cinematic-hidden-gems";
import { CinematicRelatedRail } from "./cinematic-related-rail";
import { HonestScarcityPanel } from "./honest-scarcity-panel";
import { isHonestScarcityConfirmed } from "@/lib/honest-scarcity";
import { hasSafariGuide } from "@/lib/safari-guide";
import { pilgrimageSlugFor } from "@/lib/pilgrimage-guide";
import { hasItineraryPage } from "@/lib/itinerary-page";
import { VS_PAIRS } from "@/lib/vs-pairs";

export function DestinationDetailCinematic({ dest }: { dest: any }) {
  const locale = useLocale() as Locale;
  const tm = useTranslations("months");
  const issueNum = getIssueNumber();
  const months = (dest.destination_months ?? []).sort(
    (a: any, b: any) => a.month - b.month,
  );
  const currentMonth = currentMonthIST();
  const currentMonthName = currentMonthLongIST();
  const currentScore: number | null =
    months.find((m: any) => m.month === currentMonth)?.score ?? null;
  const displayScore = currentScore != null ? currentScore * 2 : null;
  const verdictLabel = displayScore != null ? verdictFor(displayScore) : null;
  const tier = displayScore != null ? verdictTier(displayScore) : null;
  const tint = tier ? VERDICT_COLOR[tier] : "var(--bone)";

  // Mirrors the singletons used by the production DestinationDetail so we
  // pass identical prop shapes to every shared component.
  const displayName: string =
    (locale !== "en" && dest.translations?.[locale]?.name) || dest.name;
  const stateName: string =
    (Array.isArray(dest.state) ? dest.state[0]?.name : dest.state?.name) ?? "";
  const region: string | null = dest.region ?? null;
  const cc = Array.isArray(dest.confidence_cards)
    ? dest.confidence_cards[0]
    : dest.confidence_cards;
  const kf = Array.isArray(dest.kids_friendly)
    ? dest.kids_friendly[0]
    : dest.kids_friendly;
  const trapAlts = dest.trap_alternatives ?? [];
  const pois = dest.points_of_interest ?? [];
  const eateries = (dest.eateries ?? []).map((e: any) =>
    localizeRow(e, locale, ["signature_dish", "why_it_matters", "insider_tip"]),
  );
  const answeredQuestions = dest.questions ?? [];
  const monthlyScores = months.map((m: any) => ({
    m: m.month,
    score: m.score,
    note: m.note,
    why_go: m.why_go,
    why_not: m.why_not,
  }));

  // Editorial read-time estimate — counts characters across the major prose
  // fields the page actually renders, divides by ~1100 chars/min (≈220wpm
  // accounting for skim-friendly editorial pacing). Server-computed so
  // there's no post-mount flash.
  const readMinutes = (() => {
    const buckets: string[] = [
      dest.why_special ?? "",
      dest.why_not ?? "",
      dest.tagline ?? "",
      dest.daily_cost?.note ?? "",
      dest.crowd_calendar?.note ?? "",
      ...months.flatMap((m: any) => [
        m.note ?? "",
        m.why_go ?? "",
        m.why_not ?? "",
      ]),
      ...(dest.scenarios ?? []).map(
        (s: any) => `${s.title ?? ""} ${s.body ?? ""}`,
      ),
      ...(dest.trip_reports ?? []).map(
        (r: any) => `${r.summary ?? ""} ${r.body ?? ""}`,
      ),
    ];
    const chars = buckets.join(" ").length;
    return Math.max(3, Math.round(chars / 1100));
  })();

  const currentMonthData = months.find((m: any) => m.month === currentMonth);
  const monthSlugs = ["", "january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
  const crowdLevel: "quiet" | "moderate" | "peak" | null = (() => {
    const cal = dest.crowd_calendar;
    if (!cal || typeof cal !== "object") return null;
    if (cal.peak_months?.includes(currentMonth)) return "peak";
    if (cal.quiet_months?.includes(currentMonth)) return "quiet";
    return "moderate";
  })();

  // Section TOC — same gates as production. Drives the in-guide jump nav so
  // readers can skip straight to The Window / The Risks / The Stay etc.
  const subs = (dest.sub_destinations ?? []).map((s: any) =>
    localizeRow(s, locale, ["tagline", "why_visit", "kids_note", "highlights"]),
  );
  const gems = dest.hidden_gems ?? [];
  const sections = [
    { id: "dest-act-2", label: "Verdict", show: true },
    { id: "dest-act-3", label: "12 months", show: months.length > 0 },
    { id: "dest-act-4", label: "Field brief", show: !!dest.why_special },
    { id: "dest-act-5", label: "Risks", show: !!cc || dest.solo_female_score != null || !!kf },
    { id: "dest-act-6", label: "Atlas", show: pois.length > 0 || subs.length > 0 || gems.length > 0 },
    { id: "dest-act-7", label: "Cost & ground", show: !!dest.daily_cost || !!dest.local_logistics },
    { id: "dest-act-8", label: "Stay & eat", show: eateries.length > 0 || (dest.editor_stay_picks?.length ?? 0) > 0 || isHonestScarcityConfirmed(dest.honest_scarcity, "eateries") || isHonestScarcityConfirmed(dest.honest_scarcity, "stays") },
    { id: "dest-act-9", label: "Field notes", show: (dest.trip_reports?.length ?? 0) > 0 || (dest.traveler_notes?.length ?? 0) > 0 },
    { id: "dest-act-10", label: "Itinerary", show: !!dest.micro_itineraries },
    { id: "dest-act-11", label: "Coda", show: true },
    // Tail "Travellers' voice" section — moved out of Act IX at user
    // request so it sits last, just before the footer. Kept in the TOC
    // so deliberate readers can jump to it.
    { id: "dest-tail-voice", label: "Voice", show: (dest.reviews?.length ?? 0) > 0 || answeredQuestions.length > 0 },
  ].filter((s) => s.show);

  // Pre-compute every month's score → tier for the Window strip.
  const windowMonths = MONTH_LONG_NAMES.map((mName, i) => {
    const m = months.find((row: any) => row.month === i + 1);
    const score = m?.score ?? null;
    const ds = score != null ? score * 2 : null;
    const t = ds != null ? verdictTier(ds) : null;
    return {
      monthIdx: i + 1,
      name: mName,
      shortName: mName.slice(0, 3),
      score,
      displayScore: ds,
      tier: t,
      color: t ? VERDICT_COLOR[t] : "rgba(245,241,232,0.10)",
      verdict: ds != null ? verdictFor(ds) : null,
      note: m?.note ?? null,
      whyGo: m?.why_go ?? null,
      whyNot: m?.why_not ?? null,
      isCurrent: i + 1 === currentMonth,
    };
  });

  return (
    <div
      className="nakshiq-cinema"
      style={{ minHeight: "100vh" }}
    >
      <CinemaStyles />
      <Nav />

      {/* Magazine longform reading-progress line — top edge, fills as the
          reader scrolls. Suppressed on the cover so it doesn't read like a
          dashboard bar; auto-hides at the absolute bottom (Coda). */}
      <CinematicProgressBar />

      {/* Slim left-rail current-act indicator — large vertical roman numeral
          (II, III, IV…) so the reader always knows which chapter they're in.
          Companion to DestinationScrollRail (right edge ticks). Auto-hides
          on cover + Coda + below md viewport. */}
      <CinematicActIndicator />

      {/* Floating SOS button — scrolls to the act-V emergency block. */}
      {dest.emergencySos && (
        <SOSFloatingButton
          onClick={() => {
            document
              .getElementById("emergency-sos")
              ?.scrollIntoView({ behavior: "smooth", block: "start" });
          }}
        />
      )}

      {/* Sticky share/save bar — fades in once the cover scrolls past, hides
          on the Coda so the bookend reads final. Mirrors the hero overlay
          version inside ACT I. */}
      <CinematicShareBar
        position="sticky"
        destinationId={dest.id}
        destinationName={displayName}
        tagline={dest.tagline ?? null}
      />

      {/* Mini verdict strip — bottom edge, single line with the current
          verdict + score + month and three quick links. Compromise version
          of production's permanent floating MAY-AT-A-GLANCE card; thin and
          auto-hides after 8s of no scroll so it doesn't break the cinematic
          flow. Reads firstNeighbour for the inline 'vs' link. */}
      <CinematicVerdictStrip
        destinationId={dest.id}
        destinationName={dest.name}
        rawScore={currentScore}
        firstNeighbourId={dest.nearbyDestinations?.[0]?.id ?? null}
        firstNeighbourName={dest.nearbyDestinations?.[0]?.name ?? null}
      />

      {/* Mobile bottom action bar — three buttons (Plan AI · Save ·
          WhatsApp) pinned to the bottom edge on phones only. Hides under
          md via CSS. Replaces the editorial Plan-AI pill on mobile (also
          hidden under md now) so we don't double-stack actions. */}
      <CinematicMobileActionBar
        destinationId={dest.id}
        destinationName={displayName}
        tagline={dest.tagline ?? null}
      />

      <main
        id="main-content"
        className="nq-grain nq-glow-bookend"
        style={{ position: "relative" }}
      >
        {/* ───────────────────────────────────────────────
           ACT I — The Cover
           Full-bleed Ken Burns hero, dispatch metadata top-left,
           score top-right, giant Fraunces italic name bottom-left.
           ─────────────────────────────────────────────── */}
        <section
          id="dest-act-1"
          className="nq-glow-bookend"
          style={{
            position: "relative",
            minHeight: "100vh",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "120px 48px 72px",
            color: "var(--bone)",
          }}
        >
          {/* Hero — video where R2 has it, poster image always rendered as
              fallback. Same source-of-truth as the production hero so the
              same destinations show motion (videoSrc resolves to the R2
              CDN URL or null). Wrapped in CinematicHeroParallax so the
              cover drifts ~3% slower than scroll while still in view —
              NYT longform pattern. Inner Ken Burns animation continues
              independently on the <video> element. */}
          <CinematicHeroParallax strength={0.03}>
            <div
              aria-hidden
              style={{
                position: "absolute",
                inset: 0,
                overflow: "hidden",
              }}
            >
              <video
                autoPlay
                muted
                loop
                playsInline
                poster={destinationImage(dest.id, 2400)}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  animation: "nq-kb-1 22s ease-out forwards",
                }}
              >
                <source src={videoSrc(dest.id)} type="video/mp4" />
              </video>
            </div>
          </CinematicHeroParallax>
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 1,
              background:
                "linear-gradient(180deg, rgba(10,10,8,0.55) 0%, rgba(10,10,8,0.15) 35%, rgba(10,10,8,0.45) 75%, rgba(10,10,8,0.92) 100%)",
            }}
          />

          {/* Hero share/save row — sits above the dispatch/score row. The
              sticky variant rendered at root takes over once this scrolls
              past; together they replace the share bar that used to be
              buried at Y≈21,000px in the Coda. */}
          <CinematicShareBar
            position="hero"
            destinationId={dest.id}
            destinationName={displayName}
            tagline={dest.tagline ?? null}
          />

          {/* Top row: dispatch metadata · score */}
          <div
            style={{
              position: "relative",
              zIndex: 2,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              gap: 24,
            }}
          >
            <div>
              <p
                className="nq-kicker"
                style={{
                  color: "var(--vermillion)",
                  letterSpacing: "0.22em",
                  marginBottom: 12,
                }}
              >
                DISPATCH · ISSUE Nº {issueNum}
              </p>
              <p
                className="nq-meta"
                style={{ color: "var(--bone)", letterSpacing: "0.18em" }}
              >
                {[stateName, region].filter(Boolean).join(" · ").toUpperCase() ||
                  "INDIA"}
              </p>
            </div>
            {displayScore != null && (
              <div style={{ textAlign: "right" }}>
                <div
                  className="nq-mono"
                  style={{
                    fontSize: 84,
                    fontWeight: 700,
                    lineHeight: 0.85,
                    color: tint,
                    letterSpacing: "-0.04em",
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  <CinematicCountUp
                    target={Number(formatScore(currentScore))}
                    duration={900}
                    decimals={1}
                  />
                </div>
                <div
                  className="nq-mono"
                  style={{
                    fontSize: 11,
                    color: "var(--bone)",
                    letterSpacing: "0.26em",
                    marginTop: 8,
                  }}
                >
                  {verdictLabel} · {currentMonthName.toUpperCase()}
                </div>
              </div>
            )}
          </div>

          {/* Bottom row: name · tagline */}
          <div style={{ position: "relative", zIndex: 2 }}>
            {/* Breadcrumb sits directly above the destination name so it
                anchors the hero composition without competing with the
                centred Naksh.iq logo in the magazine nav at the very
                top of the viewport. */}
            <div style={{ marginBottom: 18 }}>
              <CinematicBreadcrumb
                stateName={stateName}
                stateId={dest.state_id}
                destinationName={dest.name}
              />
            </div>
            <Title
              as="h1"
              className="nq-display"
              style={{
                fontFamily: "var(--cinema-display)",
                fontStyle: "italic",
                fontWeight: 400,
                fontSize: "clamp(56px, 9vw, 144px)",
                lineHeight: 0.94,
                letterSpacing: "-0.028em",
                margin: "0 0 24px",
                color: "var(--bone)",
                textWrap: "balance",
              }}
            >
              {renderDisplayName(dest.name)}.
            </Title>
            {dest.tagline && (
              <p
                style={{
                  maxWidth: 720,
                  fontFamily: "var(--cinema-display)",
                  fontStyle: "italic",
                  fontSize: 22,
                  lineHeight: 1.45,
                  color: "var(--bone)",
                  margin: 0,
                  letterSpacing: "-0.005em",
                }}
              >
                {dest.tagline}
              </p>
            )}
            {dest.elevation_m != null && (
              <p
                className="nq-meta"
                style={{
                  marginTop: 28,
                  color: "var(--bone-faint)",
                  letterSpacing: "0.22em",
                  fontSize: 11,
                }}
              >
                {dest.elevation_m.toLocaleString()} M ·{" "}
                {(dest.difficulty ?? "moderate").toUpperCase()}
                {dest.ideal_duration_min && dest.ideal_duration_max
                  ? ` · ${dest.ideal_duration_min}–${dest.ideal_duration_max} DAYS`
                  : ""}
              </p>
            )}
            {/* Trust kicker — VERIFIED date + Issue Nº. Quiet line under
                the dispatch metadata that gives early readers the proof
                signal production exposes near the verdict (was buried
                in the Coda before this round). */}
            <p
              className="nq-mono"
              style={{
                marginTop: 14,
                color: "var(--vermillion)",
                letterSpacing: "0.26em",
                fontSize: 10,
                textTransform: "uppercase",
              }}
            >
              {dest.content_reviewed_at
                ? `VERIFIED ${new Date(dest.content_reviewed_at)
                    .toLocaleString("en-US", {
                      month: "short",
                      year: "numeric",
                    })
                    .toUpperCase()} · ISSUE Nº ${issueNum}`
                : `ISSUE Nº ${issueNum}`}
            </p>
            {/* Read-time + skim-to-verdict — busy readers get a quiet
                "skip to the verdict" anchor; commit readers see the
                length up front. Plain anchor link → smooth-scroll
                handled by the global CSS scroll-behavior rule. */}
            <p
              className="nq-mono"
              style={{
                marginTop: 10,
                color: "var(--bone-faint)",
                letterSpacing: "0.22em",
                fontSize: 10,
                textTransform: "uppercase",
              }}
            >
              {readMinutes} MIN READ
              <span style={{ margin: "0 10px", opacity: 0.6 }}>·</span>
              <a
                href="#dest-act-2"
                style={{
                  color: "var(--bone-dim)",
                  textDecoration: "none",
                  borderBottom: "1px solid var(--bone-faint)",
                  paddingBottom: 1,
                }}
              >
                Or skip to the verdict ↓
              </a>
            </p>
          </div>
        </section>

        {/* In-guide jumping is handled exclusively by the cinematic
            <DestinationScrollRail /> on the right edge (rendered at the
            end of <main>). It auto-hides on cover thanks to its
            IntersectionObserver. The production DestinationSectionNav was
            removed because its dot+chip styling clashes with the
            cinematic palette (white dots on dark background). */}

        {/* Live alerts band — thin horizontal strip immediately under
            the cover. Renders nothing when there are no active alerts
            for the destination (most days). Variant="cinematic" gives
            it the editorial mono+serif treatment instead of the
            shadcn-tinted card style production uses. */}
        <DestinationAlerts
          destinationId={dest.id}
          variant="cinematic"
          maxVisible={2}
        />

        {/* ───────────────────────────────────────────────
           ACT II — The Verdict (TL;DR + decision rail)
           ─────────────────────────────────────────────── */}
        <section
          id="dest-act-2"
          style={{
            ...sectionStyle,
            padding: "120px 24px 100px",
            margin: 0,
            maxWidth: "none",
          }}
        >
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <SectionLabel num="II" name="THE VERDICT" />

            {dest.tagline && (
              <PullQuote>&ldquo;{dest.tagline}&rdquo;</PullQuote>
            )}

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)",
                gap: 60,
                maxWidth: 1100,
                margin: "0 auto",
                padding: "0 16px",
              }}
            >
              {dest.why_special && (
                <div>
                  <p
                    className="nq-kicker"
                    style={{ color: "var(--green)", marginBottom: 14 }}
                  >
                    WHY SPECIAL
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--cinema-ui)",
                      fontSize: 17,
                      lineHeight: 1.7,
                      color: "var(--bone-dim)",
                      margin: 0,
                    }}
                  >
                    {dest.why_special}
                  </p>
                </div>
              )}
              {(() => {
                const note =
                  typeof dest.workability === "string"
                    ? dest.workability
                    : dest.workability?.note ?? null;
                if (!note) return null;
                return (
                  <div>
                    <p
                      className="nq-kicker"
                      style={{
                        color: "var(--vermillion)",
                        marginBottom: 14,
                      }}
                    >
                      THINK TWICE
                    </p>
                    <p
                      style={{
                        fontFamily: "var(--cinema-ui)",
                        fontSize: 17,
                        lineHeight: 1.7,
                        color: "var(--bone-dim)",
                        margin: 0,
                      }}
                    >
                      {note}
                    </p>
                  </div>
                );
              })()}
            </div>

            {/* Decision rail — Go / Wait / Skip for current month */}
            {displayScore != null && (
              <div
                style={{
                  maxWidth: 720,
                  margin: "60px auto 0",
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr",
                  border: "1px solid var(--hair)",
                }}
              >
                {(
                  [
                    { label: "GO", min: 6.5, color: "var(--green)" },
                    { label: "WAIT", min: 4.0, color: "var(--amber)" },
                    { label: "SKIP", min: 0, color: "var(--vermillion)" },
                  ] as const
                ).map((opt, i) => {
                  const verdict =
                    displayScore >= 6.5
                      ? "GO"
                      : displayScore >= 4.0
                      ? "WAIT"
                      : "SKIP";
                  const isActive = opt.label === verdict;
                  return (
                    <div
                      key={opt.label}
                      style={{
                        padding: "28px 16px",
                        textAlign: "center",
                        background: isActive ? opt.color : "transparent",
                        color: isActive ? "var(--paper)" : "var(--bone-dim)",
                        borderLeft: i > 0 ? "1px solid var(--hair)" : "0",
                        fontFamily: "var(--cinema-ui)",
                        fontWeight: 700,
                        fontSize: 13,
                        letterSpacing: "0.24em",
                        transition: "all 0.3s ease",
                      }}
                    >
                      {opt.label}
                    </div>
                  );
                })}
              </div>
            )}

            {/* Peak-crowd caveat — the score rates conditions (weather, access,
                value), NOT how many people share them. When the current month is
                in the destination's verified peak_months, say so out loud right
                at the verdict so a high score never reads as "empty and perfect".
                Only fires when we actually hold crowd data — honest scarcity over
                fabrication. */}
            {crowdLevel === "peak" && (
              <div
                style={{
                  maxWidth: 720,
                  margin: "20px auto 0",
                  border: "1px solid var(--vermillion)",
                  borderLeft: "3px solid var(--vermillion)",
                  padding: "16px 20px",
                  background: "rgba(229,86,66,0.06)",
                }}
              >
                <p
                  className="nq-kicker"
                  style={{ color: "var(--vermillion)", marginBottom: 8 }}
                >
                  PEAK CROWDS
                </p>
                <p
                  style={{
                    fontFamily: "var(--cinema-ui)",
                    fontSize: 15,
                    lineHeight: 1.6,
                    color: "var(--bone-dim)",
                    margin: 0,
                  }}
                >
                  {currentMonthName} is {displayName}&apos;s busiest window. The
                  score rates conditions — weather, access, value — not how many
                  people you&apos;ll share them with.
                  {dest.crowd_calendar?.note ? ` ${dest.crowd_calendar.note}` : ""}
                </p>
              </div>
            )}

            {/* 5-cell scorecard — quiet roll-up of the dimensions production
                scatters across confidence-card / kids-badge / solo-female.
                Sits flush under the GO/WAIT/SKIP rail so the reader sees
                the verdict and the supporting numbers in one beat. */}
            {displayScore != null && (
              <CinematicScorecard
                kidsRating={kf?.rating ?? null}
                soloFemaleScore={dest.solo_female_score ?? null}
                crowdLevel={crowdLevel}
                budgetTier={dest.budget_tier ?? null}
                difficulty={dest.difficulty ?? null}
              />
            )}

            {/* Inline alerts removed — the cinematic-variant alerts strip
                now sits between the cover and ACT II (Phase 1.4), so
                rendering them again here would double-display the same
                advisories. */}

            {/* Know-before-you-go (preserved component) */}
            <div style={{ maxWidth: 720, margin: "60px auto 0" }}>
              <KnowBeforeYouGo
                locale={locale}
                budgetTier={dest.budget_tier}
                priceRange={cc?.sleep?.price_range_inr}
                months={months}
                reach={cc?.reach}
                emergency={cc?.emergency}
                stateId={dest.state_id}
              />
            </div>
          </div>
        </section>

        {/* ───────────────────────────────────────────────
           ACT III — The Window (12-month strip)
           ─────────────────────────────────────────────── */}
        <section
          id="dest-act-3"
          className="nq-act-warm"
          style={{
            borderTop: "1px solid var(--hair)",
            borderBottom: "1px solid var(--hair)",
            padding: "120px 24px 100px",
          }}
        >
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <SectionLabel num="III" name="THE WINDOW · 12 MONTHS, SCORED" />
            <Prose>
              <p>
                Every month rated on the 0–10 editorial scale. Click any cell
                to read the month-specific verdict — what to do, what to skip,
                what crowds you&apos;ll meet.
              </p>
            </Prose>

            {/* 12-month strip */}
            <div
              style={{
                maxWidth: 1100,
                margin: "48px auto 0",
                display: "grid",
                gridTemplateColumns: "repeat(12, 1fr)",
                gap: 6,
              }}
            >
              {/* Pill accessible name starts with the VISIBLE text (short month
                  + score) per WCAG 2.5.3 label-in-name — the previous
                  "April — 10.0/10 peak" form failed label-content-name-match on
                  every dest page because the cell shows "APR 10.0". */}
              {windowMonths.map((m) => (
                <Link
                  key={m.monthIdx}
                  href={`/${locale}/destination/${dest.id}/${m.name.toLowerCase()}`}
                  aria-label={`${m.shortName.toUpperCase()}${
                    m.displayScore != null
                      ? ` ${m.displayScore.toFixed(1)} — ${m.name}, ${m.displayScore.toFixed(1)}/10 ${m.verdict ?? ""}`
                      : ` — ${m.name}, no data`
                  }`}
                  style={{
                    display: "block",
                    border: m.isCurrent
                      ? "2px solid var(--bone)"
                      : "1px solid var(--hair)",
                    padding: "20px 8px",
                    textAlign: "center",
                    textDecoration: "none",
                    background:
                      m.tier == null
                        ? "transparent"
                        : `${m.color}22`,
                    transition: "all 0.2s ease",
                  }}
                >
                  <div
                    className="nq-mono"
                    style={{
                      fontSize: 11,
                      letterSpacing: "0.22em",
                      color: "var(--bone-dim)",
                      marginBottom: 8,
                    }}
                  >
                    {m.shortName.toUpperCase()}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--cinema-mono)",
                      fontSize: 22,
                      fontWeight: 600,
                      color: m.color,
                      lineHeight: 1,
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    {m.displayScore != null
                      ? m.displayScore.toFixed(1)
                      : "—"}
                  </div>
                </Link>
              ))}
            </div>

            <p
              className="nq-mono"
              style={{
                marginTop: 18,
                fontSize: 12,
                color: "var(--amber)",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                textAlign: "center",
              }}
            >
              ↑ Tap any month for the full read · colours match verdict bands
            </p>

            {/* Methodology link — quiet trust signal directly under the grid.
                Production exposes "HOW WE SCORE →" near the verdict; we mirror
                it here in editorial form so readers can verify the math
                behind the colours they just saw. */}
            <p
              style={{
                textAlign: "center",
                marginTop: 18,
                fontFamily: "var(--cinema-mono, ui-monospace)",
                fontSize: 11,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
              }}
            >
              <Link
                href={`/${locale}/methodology`}
                style={{
                  color: "var(--vermillion)",
                  textDecoration: "none",
                  borderBottom: "1px solid var(--vermillion)",
                  paddingBottom: 2,
                }}
              >
                Read our scoring methodology →
              </Link>
            </p>

            {/* The Window strip above already covers the 12 months in
                cinematic form, so MonthlyChart is hidden here for Manali —
                kept available in the import surface for other dests. */}

            {/* Weather + elevation chart — keep both */}
            <div
              style={{
                maxWidth: 1100,
                margin: "60px auto 0",
                display: "grid",
                gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)",
                gap: 48,
              }}
            >
              <div>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "6px 14px",
                    border: "1px solid var(--hair)",
                    borderRadius: 999,
                    fontFamily: "var(--cinema-ui)",
                    fontSize: 11,
                    color: "var(--bone)",
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    marginBottom: 16,
                  }}
                >
                  <span
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: "var(--green)",
                      animation: "nq-pulse 1.6s ease-in-out infinite",
                      boxShadow: "0 0 0 0 rgba(74,222,159,0.6)",
                    }}
                  />
                  Live weather
                </div>
                <WeatherWidget destinationId={dest.id} />

                {/* Related articles — long-form deep-dives below the live
                    weather signal, same editorial pattern as production. */}
                {dest.relatedArticles?.length > 0 && (
                  <div style={{ marginTop: 24 }}>
                    <p
                      className="nq-kicker"
                      style={{
                        color: "var(--vermillion)",
                        marginBottom: 12,
                        fontSize: 11,
                      }}
                    >
                      DEEP-DIVE READS
                    </p>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 0,
                      }}
                    >
                      {dest.relatedArticles.map((a: any, i: number) => (
                        <Link
                          key={a.slug}
                          href={`/${locale}/blog/${a.slug}`}
                          className="nq-entry-link"
                          style={{
                            display: "flex",
                            alignItems: "baseline",
                            justifyContent: "space-between",
                            gap: 16,
                            padding: "14px 0",
                            borderTop: "1px solid var(--hair)",
                            borderBottom:
                              i === dest.relatedArticles.length - 1
                                ? "1px solid var(--hair)"
                                : "0",
                            textDecoration: "none",
                            color: "var(--bone)",
                          }}
                        >
                          <span
                            style={{
                              fontFamily: "var(--cinema-display)",
                              fontStyle: "italic",
                              fontSize: 17,
                              lineHeight: 1.3,
                            }}
                          >
                            {a.title}
                          </span>
                          <span
                            style={{
                              display: "flex",
                              alignItems: "baseline",
                              gap: 14,
                              whiteSpace: "nowrap",
                            }}
                          >
                            <span
                              className="nq-mono"
                              style={{
                                fontSize: 11,
                                color: "var(--bone-faint)",
                                letterSpacing: "0.16em",
                              }}
                            >
                              {a.depth === "deep-dive" ? "DEEP DIVE" : "BRIEF"}
                              {a.reading_time
                                ? ` · ${a.reading_time} MIN`
                                : ""}
                            </span>
                            <span
                              aria-hidden
                              className="nq-entry-arrow"
                              style={{
                                fontFamily: "var(--cinema-mono)",
                                fontSize: 16,
                                color: "var(--vermillion)",
                                transition:
                                  "transform 220ms ease, color 220ms ease",
                              }}
                            >
                              →
                            </span>
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              {dest.elevation_m != null && (
                <div>
                  <p
                    className="nq-kicker"
                    style={{
                      color: "var(--vermillion)",
                      marginBottom: 16,
                    }}
                  >
                    ELEVATION
                  </p>
                  <ElevationChart
                    elevationM={dest.elevation_m}
                    destinationName={displayName}
                  />
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ───────────────────────────────────────────────
           ACT IV — Why Special / Think Twice (full editorial)
           ─────────────────────────────────────────────── */}
        <section
          id="dest-act-4"
          style={{
            ...sectionStyle,
            padding: "120px 24px 100px",
            margin: 0,
            maxWidth: "none",
          }}
        >
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <SectionLabel num="IV" name="THE FIELD BRIEF" />

            {dest.why_special && (
              <Prose>
                <p className="nq-prose">{dest.why_special}</p>
              </Prose>
            )}

            {/* Tourist-trap intervention if applicable */}
            {trapAlts.length > 0 && (
              <div style={{ maxWidth: 720, margin: "60px auto 0" }}>
                <TouristTrapIntervention
                  trapName={dest.name}
                  alternatives={trapAlts}
                />
              </div>
            )}

            {/* Scenarios — preserved */}
            {dest.scenarios?.length > 0 && (
              <div style={{ marginTop: 72 }}>
                <ScenarioStrip
                  scenarios={dest.scenarios}
                  locale={locale}
                />
              </div>
            )}
          </div>
        </section>

        {/* ───────────────────────────────────────────────
           ACT V — The Risks (Confidence + Kids + Solo F + SOS)
           ─────────────────────────────────────────────── */}
        <section
          id="dest-act-5"
          className="nq-act-warm"
          style={{
            borderTop: "1px solid var(--hair)",
            borderBottom: "1px solid var(--hair)",
            padding: "120px 24px 100px",
          }}
        >
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <SectionLabel num="V" name="THE RISKS · WHAT TO KNOW" />
            <Prose>
              <p>
                Every destination carries trade-offs. The cards below score
                the practical ones: confidence in the data, kids-suitability,
                solo-female read, and the emergency floor.
              </p>
            </Prose>

            {/* Confidence card */}
            {cc && (
              <div
                style={{
                  maxWidth: 720,
                  margin: "48px auto 0",
                }}
              >
                <ConfidenceCardComponent {...cc} />
              </div>
            )}

            {/* Kids breakdown — inline cinematic; replaces production
                KidsBadge card with editorial layout. Score on left, full
                editorial breakdown (reasons / concerns / highlights) on
                the right as no-bullet typography. */}
            {kf && (
              <div style={{ maxWidth: 1100, margin: "60px auto 0" }}>
                <p
                  className="nq-kicker"
                  style={{
                    color: "var(--vermillion)",
                    marginBottom: 24,
                  }}
                >
                  KIDS · FAMILY READ
                </p>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "minmax(200px, 240px) 1fr",
                    gap: 48,
                    alignItems: "start",
                    paddingTop: 32,
                    borderTop: "1px solid var(--hair)",
                  }}
                >
                  <div>
                    <div
                      className="nq-mono"
                      style={{
                        fontSize: 64,
                        fontWeight: 700,
                        color:
                          (kf.rating ?? 0) >= 4
                            ? VERDICT_COLOR.peak
                            : (kf.rating ?? 0) >= 3
                            ? VERDICT_COLOR.doable
                            : VERDICT_COLOR.avoid,
                        lineHeight: 0.85,
                        letterSpacing: "-0.04em",
                        fontVariantNumeric: "tabular-nums",
                      }}
                    >
                      {((kf.rating ?? 0) * 2).toFixed(1)}
                    </div>
                    <div
                      className="nq-mono"
                      style={{
                        marginTop: 8,
                        fontSize: 11,
                        color: "var(--bone)",
                        letterSpacing: "0.22em",
                      }}
                    >
                      {kf.suitable ? "FAMILY-APPROPRIATE" : "ADULTS"}
                    </div>
                    <div
                      style={{
                        marginTop: 24,
                        fontFamily: "var(--cinema-ui)",
                        fontSize: 14,
                        color: "var(--bone-dim)",
                        lineHeight: 1.7,
                      }}
                    >
                      {kf.min_recommended_age != null && (
                        <div>
                          Minimum age:{" "}
                          <span className="nq-mono" style={{ color: "var(--bone)" }}>
                            {kf.min_recommended_age}+ yrs
                          </span>
                        </div>
                      )}
                      {kf.best_age_group && (
                        <div>
                          Best for:{" "}
                          <span style={{ color: "var(--bone)" }}>{kf.best_age_group}</span>
                        </div>
                      )}
                      <div>
                        Stroller:{" "}
                        <span style={{ color: "var(--bone)" }}>
                          {kf.stroller_accessible ? "Possible" : "Not possible"}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div>
                    {kf.kid_highlights?.length > 0 && (
                      <div style={{ marginBottom: 28 }}>
                        <p
                          className="nq-mono"
                          style={{
                            fontSize: 11,
                            color: "var(--green)",
                            letterSpacing: "0.22em",
                            marginBottom: 12,
                          }}
                        >
                          HIGHLIGHTS FOR KIDS
                        </p>
                        {kf.kid_highlights.map((h: string) => (
                          <div
                            key={h}
                            style={{
                              padding: "12px 0",
                              borderTop: "1px solid var(--hair)",
                              fontFamily: "var(--cinema-ui)",
                              fontSize: 15,
                              lineHeight: 1.6,
                              color: "var(--bone-dim)",
                            }}
                          >
                            {h}
                          </div>
                        ))}
                      </div>
                    )}
                    {kf.reasons?.length > 0 && (
                      <div style={{ marginBottom: 28 }}>
                        <p
                          className="nq-mono"
                          style={{
                            fontSize: 11,
                            color: "var(--bone-faint)",
                            letterSpacing: "0.22em",
                            marginBottom: 12,
                          }}
                        >
                          REASONS
                        </p>
                        {kf.reasons.map((r: string) => (
                          <div
                            key={r}
                            style={{
                              padding: "12px 0",
                              borderTop: "1px solid var(--hair)",
                              fontFamily: "var(--cinema-ui)",
                              fontSize: 15,
                              lineHeight: 1.6,
                              color: "var(--bone-dim)",
                            }}
                          >
                            {r}
                          </div>
                        ))}
                      </div>
                    )}
                    {kf.concerns?.length > 0 && (
                      <div>
                        <p
                          className="nq-mono"
                          style={{
                            fontSize: 11,
                            color: "var(--vermillion)",
                            letterSpacing: "0.22em",
                            marginBottom: 12,
                          }}
                        >
                          CONCERNS
                        </p>
                        {kf.concerns.map((c: string) => (
                          <div
                            key={c}
                            style={{
                              padding: "12px 0",
                              borderTop: "1px solid var(--hair)",
                              fontFamily: "var(--cinema-ui)",
                              fontSize: 15,
                              lineHeight: 1.6,
                              color: "var(--bone-dim)",
                            }}
                          >
                            {c}
                          </div>
                        ))}
                      </div>
                    )}
                    {!kf.suitable && kf.not_suitable_reason && (
                      <PullQuote>{kf.not_suitable_reason}</PullQuote>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Solo female safety */}
            {(dest.solo_female_score != null || dest.solo_female_note) && (
              <div style={{ maxWidth: 1100, margin: "60px auto 0" }}>
                <SoloFemaleSafetySection
                  score={dest.solo_female_score ?? null}
                  note={dest.solo_female_note ?? null}
                  monthRows={months.map((m: any) => ({
                    m: m.month,
                    score: m.score,
                  }))}
                />
              </div>
            )}

            {/* International info if applicable */}
            {dest.international_info && (
              <div style={{ maxWidth: 1100, margin: "60px auto 0" }}>
                <InternationalInfoSection info={dest.international_info} />
              </div>
            )}

            {/* Emergency SOS — vermillion accent */}
            {dest.emergencySos && (
              <div
                id="emergency-sos"
                style={{
                  maxWidth: 1100,
                  margin: "60px auto 0",
                  borderLeft: "3px solid var(--vermillion)",
                  paddingLeft: 24,
                }}
              >
                <p
                  className="nq-kicker"
                  style={{
                    color: "var(--vermillion)",
                    marginBottom: 16,
                  }}
                >
                  EMERGENCY · SOURCE-VERIFIED
                </p>
                <EmergencySOSSection
                  sos={dest.emergencySos}
                  destinationName={displayName}
                />
              </div>
            )}
          </div>
        </section>

        {/* ───────────────────────────────────────────────
           ACT VI — The Atlas (POI + nearby + hidden gems)
           ─────────────────────────────────────────────── */}
        <section
          id="dest-act-6"
          style={{
            ...sectionStyle,
            padding: "120px 24px 100px",
            margin: 0,
            maxWidth: "none",
          }}
        >
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <SectionLabel num="VI" name="THE ATLAS · WHERE TO POINT" />

            {/* Cinematic destination atlas — mirrors the landing-page
                Act IV Atlas (hand-drawn India silhouette + faint grid
                + dropping/pulsing vermillion pin at this destination's
                coords + corner readouts). Visual continuity with the
                landing wins over the prior state choropleth — the
                section header already names the state, and the pin
                label carries it too. */}
            <div style={{ maxWidth: 720, margin: "32px auto 0" }}>
              <CinematicStateMap
                coords={dest.coords}
                stateName={stateName}
                destinationName={displayName}
              />
            </div>

            {/* POI section. Subs are rendered below ONLY when they're a
                different content set (sub-destinations are usually
                neighbourhoods/sub-towns, POIs are specific stops; some
                destinations only have one or the other). */}
            {pois.length > 0 && (
              <div style={{ maxWidth: 1100, margin: "60px auto 0" }}>
                <POISection pois={pois} destName={displayName} locale={locale} />
              </div>
            )}

            {/* Sub-destinations as full cards (neighbourhoods, sub-towns) —
                only when there are SUBS that aren't already covered by POIs. */}
            {subs.length > 0 && (
              <div style={{ maxWidth: 1100, margin: "60px auto 0" }}>
                <p
                  className="nq-kicker"
                  style={{
                    color: "var(--vermillion)",
                    marginBottom: 16,
                  }}
                >
                  NEIGHBOURHOODS · WITHIN {dest.name.toUpperCase()}
                </p>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fit, minmax(280px, 1fr))",
                    gap: 16,
                  }}
                >
                  {subs.map((sub: any) => (
                    <div
                      key={sub.id ?? sub.name}
                      style={{
                        border: "1px solid var(--hair)",
                        padding: "20px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "baseline",
                          justifyContent: "space-between",
                          gap: 12,
                          marginBottom: 6,
                        }}
                      >
                        <Title
                          as="h3"
                          style={{
                            fontFamily: "var(--cinema-display)",
                            fontStyle: "italic",
                            fontWeight: 500,
                            fontSize: 22,
                            color: "var(--bone)",
                            margin: 0,
                            lineHeight: 1.2,
                          }}
                        >
                          {sub.name}
                        </Title>
                        {sub.elevation_m && (
                          <span
                            className="nq-mono"
                            style={{
                              fontSize: 11,
                              color: "var(--bone-faint)",
                              letterSpacing: "0.16em",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {sub.elevation_m}M
                          </span>
                        )}
                      </div>
                      {sub.tagline && (
                        <p
                          style={{
                            color: "var(--vermillion)",
                            fontSize: 13,
                            margin: "0 0 10px",
                            fontFamily: "var(--cinema-ui)",
                          }}
                        >
                          {sub.tagline}
                        </p>
                      )}
                      {sub.why_visit && (
                        <p
                          style={{
                            fontFamily: "var(--cinema-ui)",
                            fontSize: 14,
                            lineHeight: 1.6,
                            color: "var(--bone-dim)",
                            margin: 0,
                          }}
                        >
                          {sub.why_visit}
                        </p>
                      )}
                      <div
                        style={{
                          marginTop: 12,
                          display: "flex",
                          gap: 12,
                          fontFamily: "var(--cinema-mono)",
                          fontSize: 11,
                          color: "var(--bone-faint)",
                          letterSpacing: "0.14em",
                        }}
                      >
                        {sub.distance_from_parent_km != null && (
                          <span>{sub.distance_from_parent_km} KM</span>
                        )}
                        {sub.time_needed && <span>· {sub.time_needed}</span>}
                        {sub.kids_ok != null && (
                          <span>
                            · {sub.kids_ok ? "KIDS OK" : "ADULTS"}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Hidden gems — Lead + Stack rhythm. The first gem is a
                magazine-cover lead with a serif pull-quote built from the
                why-unknown line; the rest become a numbered editorial list
                below. Surfaces confidence_score (★) + social_proof (italic
                tease) which were unused in the previous grid. */}
            <CinematicHiddenGems gems={gems} destinationName={dest.name} />

            {/* vs neighbour cards — closes ACT VI Atlas with three quick
                comparison cards lifted from the PostGIS-sorted
                dest.nearbyDestinations array (no new query). Each links
                into the existing /compare?compare=A,B page. */}
            <CinematicVsCards
              destinationId={dest.id}
              destinationName={dest.name}
              neighbours={dest.nearbyDestinations ?? []}
              limit={3}
            />
          </div>
        </section>

        {/* ───────────────────────────────────────────────
           ACT VII — Cost & Crowds & Infrastructure
           ─────────────────────────────────────────────── */}
        <section
          id="dest-act-7"
          className="nq-act-warm"
          style={{
            borderTop: "1px solid var(--hair)",
            borderBottom: "1px solid var(--hair)",
            padding: "120px 24px 100px",
          }}
        >
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <SectionLabel num="VII" name="THE COST · THE CROWDS · THE GROUND" />

            {/* Inbound link to the full per-trip cost calculator (/cost/[slug]).
                Gated on destination_costs rows existing (destination_costs(count)
                in the hub page query) — /cost/[slug] 404s for dests without cost
                rows (the 2026-06-14 Sikkim cohort), and GSC flagged those links. */}
            {(dest.destination_costs?.[0]?.count ?? 0) > 0 && (
            <a
              href={`/${locale}/cost/${dest.id}`}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 16,
                marginTop: 40,
                padding: "20px 24px",
                border: "1px solid var(--hair)",
                background: "rgba(245, 241, 232, 0.02)",
                textDecoration: "none",
              }}
            >
              <span>
                <span
                  style={{
                    display: "block",
                    fontFamily: "var(--cinema-display)",
                    fontStyle: "italic",
                    fontSize: 22,
                    color: "var(--bone)",
                  }}
                >
                  {locale === "hi" ? `${displayName} की यात्रा का खर्च जोड़ें` : `Plan your ${displayName} budget`}
                </span>
                <span
                  style={{
                    display: "block",
                    marginTop: 6,
                    fontFamily: "var(--cinema-ui)",
                    fontSize: 13,
                    color: "var(--bone-dim)",
                  }}
                >
                  {locale === "hi"
                    ? "दिन, यात्री, महीना और शैली के हिसाब से — मौसम-अनुसार अनुमान।"
                    : "Trip cost by days, travellers, month & style — a season-adjusted estimate."}
                </span>
              </span>
              <span aria-hidden style={{ color: "var(--vermillion)", fontSize: 20 }}>
                &rarr;
              </span>
            </a>
            )}

            {/* Inbound link to the safari-booking guide (/safari/[slug]) — only
                for the ~20 tiger reserves / national parks that carry a published
                park_safaris row. Feeds hub authority to the safari surface. */}
            {hasSafariGuide(dest.id) && (
              <a
                href={`/${locale}/safari/${dest.id}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 16,
                  marginTop: 16,
                  padding: "20px 24px",
                  border: "1px solid var(--hair)",
                  background: "rgba(245, 241, 232, 0.02)",
                  textDecoration: "none",
                }}
              >
                <span>
                  <span
                    style={{
                      display: "block",
                      fontFamily: "var(--cinema-display)",
                      fontStyle: "italic",
                      fontSize: 22,
                      color: "var(--bone)",
                    }}
                  >
                    {locale === "hi" ? `${displayName} सफ़ारी कैसे बुक करें` : `Book a ${displayName} safari`}
                  </span>
                  <span
                    style={{
                      display: "block",
                      marginTop: 6,
                      fontFamily: "var(--cinema-ui)",
                      fontSize: 13,
                      color: "var(--bone-dim)",
                    }}
                  >
                    {locale === "hi"
                      ? "परमिट, ज़ोन, जीप शुल्क और बुकिंग की दिक्कतें — स्रोत-सहित।"
                      : "Permits, zones, jeep fees & the real booking pitfalls — source-cited."}
                  </span>
                </span>
                <span aria-hidden style={{ color: "var(--vermillion)", fontSize: 20 }}>
                  &rarr;
                </span>
              </a>
            )}

            {/* Inbound link to the verified yatra guide (/pilgrimage/[slug]) —
                only for dests with a published pilgrimage_routes row (map in
                pilgrimage-guide.ts, same advertise-only gate as safari). */}
            {pilgrimageSlugFor(dest.id) && (
              <a
                href={`/${locale}/pilgrimage/${pilgrimageSlugFor(dest.id)}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 16,
                  marginTop: 16,
                  padding: "20px 24px",
                  border: "1px solid var(--hair)",
                  background: "rgba(245, 241, 232, 0.02)",
                  textDecoration: "none",
                }}
              >
                <span>
                  <span
                    style={{
                      display: "block",
                      fontFamily: "var(--cinema-display)",
                      fontStyle: "italic",
                      fontSize: 22,
                      color: "var(--bone)",
                    }}
                  >
                    {locale === "hi" ? `${displayName} यात्रा मार्ग — पूरी गाइड` : `The ${displayName} yatra route, verified`}
                  </span>
                  <span
                    style={{
                      display: "block",
                      marginTop: 6,
                      fontFamily: "var(--cinema-ui)",
                      fontSize: 13,
                      color: "var(--bone-dim)",
                    }}
                  >
                    {locale === "hi"
                      ? "चरण, दूरियाँ, खुलने के महीने और भीड़ — स्रोत-सहित।"
                      : "Stages, distances, open months & crowd windows — source-cited."}
                  </span>
                </span>
                <span aria-hidden style={{ color: "var(--vermillion)", fontSize: 20 }}>
                  &rarr;
                </span>
              </a>
            )}

            {/* Cross-family pills — compare pages + with-kids. These surfaces
                lost their only hub inbound links in the cinematic flip
                (2026-06-10 audit: 1,050 /with-kids + 3,334 /vs URLs near-
                orphaned). Pair list derives from the same VS_PAIRS source of
                truth the /vs route builds from, so a pill can never 404. */}
            {(() => {
              const pairs = VS_PAIRS.filter((p) => p.id1 === dest.id || p.id2 === dest.id).slice(0, 4);
              const pretty = (id: string) =>
                id.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
              if (pairs.length === 0 && !kf) return null;
              return (
                <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 20 }}>
                  {pairs.map((p) => {
                    const other = p.id1 === dest.id ? p.id2 : p.id1;
                    return (
                      <a
                        key={`${p.id1}-${p.id2}`}
                        href={`/${locale}/vs/${p.id1}-vs-${p.id2}`}
                        style={{
                          fontFamily: "var(--cinema-ui)",
                          fontSize: 13,
                          color: "var(--bone-dim)",
                          border: "1px solid var(--hair)",
                          padding: "8px 16px",
                          textDecoration: "none",
                        }}
                      >
                        {locale === "hi" ? `बनाम ${pretty(other)}` : `vs ${pretty(other)}`} &rarr;
                      </a>
                    );
                  })}
                  {kf && (
                    <a
                      href={`/${locale}/with-kids/${dest.id}`}
                      style={{
                        fontFamily: "var(--cinema-ui)",
                        fontSize: 13,
                        color: "var(--bone-dim)",
                        border: "1px solid var(--hair)",
                        padding: "8px 16px",
                        textDecoration: "none",
                      }}
                    >
                      {locale === "hi" ? `बच्चों के साथ ${displayName}` : `${displayName} with kids`} &rarr;
                    </a>
                  )}
                </div>
              );
            })()}

            {/* Cost grid — three tiers (budget / midrange / luxury), each a
                line-item breakdown of the daily spend. Note rendered above
                as a caption; non-tier keys (e.g. `note`) skipped from the
                grid so they don't read as a tier. */}
            {dest.daily_cost && (
              <div style={{ maxWidth: 1100, margin: "48px auto 0" }}>
                <p
                  className="nq-kicker"
                  style={{
                    color: "var(--vermillion)",
                    marginBottom: 24,
                  }}
                >
                  WHAT A DAY ACTUALLY COSTS
                </p>
                {dest.daily_cost.note && (
                  <p
                    style={{
                      fontFamily: "var(--cinema-display)",
                      fontStyle: "italic",
                      fontSize: 18,
                      lineHeight: 1.5,
                      color: "var(--bone-dim)",
                      maxWidth: 720,
                      marginBottom: 24,
                    }}
                  >
                    {dest.daily_cost.note}
                  </p>
                )}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fit, minmax(220px, 1fr))",
                    border: "1px solid var(--hair)",
                  }}
                >
                  {(["budget", "midrange", "luxury"] as const).map(
                    (tierKey, i, arr) => {
                      const tier = dest.daily_cost?.[tierKey] as
                        | Record<string, number | undefined>
                        | undefined;
                      if (!tier) return null;
                      const total =
                        tier.total ??
                        (tier.stay ?? 0) +
                          (tier.food ?? 0) +
                          (tier.transport ?? 0) +
                          (tier.activities ?? 0);
                      const tierTint =
                        tierKey === "budget"
                          ? "var(--green)"
                          : tierKey === "midrange"
                          ? "var(--amber)"
                          : "#E9876B";
                      return (
                        <div
                          key={tierKey}
                          style={{
                            padding: "28px 24px",
                            borderRight:
                              i < arr.length - 1
                                ? "1px solid var(--hair)"
                                : "0",
                          }}
                        >
                          <div
                            className="nq-mono"
                            style={{
                              fontSize: 11,
                              color: tierTint,
                              letterSpacing: "0.22em",
                              marginBottom: 12,
                              textTransform: "uppercase",
                            }}
                          >
                            {tierKey}
                          </div>
                          <div
                            style={{
                              fontFamily: "var(--cinema-mono)",
                              fontSize: 26,
                              color: "var(--bone)",
                              fontWeight: 600,
                              marginBottom: 18,
                              fontVariantNumeric: "tabular-nums",
                            }}
                          >
                            ₹{(total ?? 0).toLocaleString("en-IN")}
                            <span
                              style={{
                                fontSize: 13,
                                color: "var(--bone-faint)",
                                fontWeight: 400,
                                marginLeft: 6,
                              }}
                            >
                              / day
                            </span>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              gap: 8,
                              fontFamily: "var(--cinema-ui)",
                              fontSize: 14,
                              color: "var(--bone-dim)",
                            }}
                          >
                            {[
                              ["stay", "Stay"],
                              ["food", "Food"],
                              ["transport", "Transport"],
                              ["activities", "Activities"],
                            ].map(([k, label]) =>
                              tier[k as string] != null ? (
                                <div
                                  key={k}
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                  }}
                                >
                                  <span>{label}</span>
                                  <span
                                    className="nq-mono"
                                    style={{
                                      fontVariantNumeric: "tabular-nums",
                                    }}
                                  >
                                    ₹{(
                                      tier[k as string] as number
                                    ).toLocaleString("en-IN")}
                                  </span>
                                </div>
                              ) : null,
                            )}
                          </div>
                        </div>
                      );
                    },
                  )}
                </div>
              </div>
            )}

            {/* Crowd calendar — 12-month strip colour-coded peak / shoulder /
                quiet. Note rendered as italic body below. */}
            {dest.crowd_calendar && typeof dest.crowd_calendar === "object" && (
              <div style={{ maxWidth: 1100, margin: "60px auto 0" }}>
                <p
                  className="nq-kicker"
                  style={{
                    color: "var(--vermillion)",
                    marginBottom: 16,
                  }}
                >
                  WHAT CROWDS LOOK LIKE
                </p>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(12, 1fr)",
                    gap: 4,
                    marginBottom: 18,
                  }}
                >
                  {MONTH_LONG_NAMES.map((mName, i) => {
                    const monthIdx = i + 1;
                    const isPeak =
                      dest.crowd_calendar.peak_months?.includes(monthIdx);
                    const isQuiet =
                      dest.crowd_calendar.quiet_months?.includes(monthIdx);
                    const tint = isPeak
                      ? "var(--vermillion)"
                      : isQuiet
                      ? "var(--green)"
                      : "var(--amber)";
                    const label = isPeak ? "PEAK" : isQuiet ? "QUIET" : "MOD";
                    return (
                      <div
                        key={monthIdx}
                        style={{
                          padding: "16px 4px",
                          textAlign: "center",
                          background: `${tint}1A`,
                          borderTop: `2px solid ${tint}`,
                        }}
                      >
                        <div
                          className="nq-mono"
                          style={{
                            fontSize: 10,
                            color: "var(--bone-faint)",
                            letterSpacing: "0.18em",
                            marginBottom: 4,
                          }}
                        >
                          {mName.slice(0, 3).toUpperCase()}
                        </div>
                        <div
                          className="nq-mono"
                          style={{
                            fontSize: 9,
                            color: tint,
                            letterSpacing: "0.16em",
                            fontWeight: 600,
                          }}
                        >
                          {label}
                        </div>
                      </div>
                    );
                  })}
                </div>
                {dest.crowd_calendar.note && (
                  <p
                    style={{
                      fontFamily: "var(--cinema-display)",
                      fontStyle: "italic",
                      fontSize: 18,
                      lineHeight: 1.55,
                      color: "var(--bone-dim)",
                      maxWidth: 720,
                      margin: 0,
                    }}
                  >
                    {dest.crowd_calendar.note}
                  </p>
                )}
              </div>
            )}

            {/* Infrastructure — use the production LogisticsChecklist component
                so the network / ATM / medical / fuel / permits / night-weather
                breakdown is identical in shape + completeness. */}
            {dest.local_logistics && (
              <div style={{ maxWidth: 1100, margin: "60px auto 0" }}>
                <p
                  className="nq-kicker"
                  style={{
                    color: "var(--vermillion)",
                    marginBottom: 16,
                  }}
                >
                  INFRASTRUCTURE · ON THE GROUND
                </p>
                <LogisticsChecklist data={dest.local_logistics} />
              </div>
            )}

            {/* How to reach — strings, render directly. */}
            {(dest.nearest_airport || dest.nearest_railhead) && (
              <div style={{ maxWidth: 1100, margin: "60px auto 0" }}>
                <p
                  className="nq-kicker"
                  style={{
                    color: "var(--vermillion)",
                    marginBottom: 16,
                  }}
                >
                  HOW TO REACH
                </p>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fit, minmax(280px, 1fr))",
                    gap: 16,
                  }}
                >
                  {dest.nearest_airport && (
                    <div
                      style={{
                        border: "1px solid var(--hair)",
                        padding: "20px",
                      }}
                    >
                      <p
                        className="nq-mono"
                        style={{
                          fontSize: 11,
                          color: "var(--bone-faint)",
                          letterSpacing: "0.22em",
                          marginBottom: 8,
                        }}
                      >
                        AIRPORT
                      </p>
                      <p
                        style={{
                          fontFamily: "var(--cinema-ui)",
                          fontSize: 15,
                          lineHeight: 1.6,
                          color: "var(--bone-dim)",
                          margin: 0,
                        }}
                      >
                        {dest.nearest_airport}
                      </p>
                    </div>
                  )}
                  {dest.nearest_railhead && (
                    <div
                      style={{
                        border: "1px solid var(--hair)",
                        padding: "20px",
                      }}
                    >
                      <p
                        className="nq-mono"
                        style={{
                          fontSize: 11,
                          color: "var(--bone-faint)",
                          letterSpacing: "0.22em",
                          marginBottom: 8,
                        }}
                      >
                        RAIL
                      </p>
                      <p
                        style={{
                          fontFamily: "var(--cinema-ui)",
                          fontSize: 15,
                          lineHeight: 1.6,
                          color: "var(--bone-dim)",
                          margin: 0,
                        }}
                      >
                        {dest.nearest_railhead}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ───────────────────────────────────────────────
           ACT VIII — The Stay & Eat
           ─────────────────────────────────────────────── */}
        <section
          id="dest-act-8"
          style={{
            ...sectionStyle,
            padding: "120px 24px 100px",
            margin: 0,
            maxWidth: "none",
          }}
        >
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <SectionLabel num="VIII" name="THE STAY · THE EAT" />

            {/* Eateries — inline Field Log style. Legendary anchors get a
                vermillion FOUNDED tag; everything else is editorial entry
                with category meta and signature dish callout. */}
            {eateries.length > 0 && (
              <div style={{ maxWidth: 1100, margin: "32px auto 0" }}>
                <p
                  className="nq-kicker"
                  style={{
                    color: "var(--vermillion)",
                    marginBottom: 24,
                  }}
                >
                  WHERE TO EAT · {eateries.length} VERIFIED PICKS
                </p>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 0,
                    alignItems: "stretch",
                  }}
                >
                  <ExpandableList
                    items={eateries}
                    initial={6}
                    totalLabel="eateries"
                    renderItem={(e: any, i: number, total: number) => (
                    <div
                      key={e.id ?? e.name}
                      style={{
                        display: "grid",
                        gridTemplateColumns: "120px 1fr auto",
                        gap: 24,
                        padding: "28px 0",
                        borderTop: "1px solid var(--hair)",
                        borderBottom:
                          i === total - 1
                            ? "1px solid var(--hair)"
                            : "0",
                        alignItems: "baseline",
                      }}
                    >
                      <div
                        className="nq-mono"
                        style={{
                          fontSize: 11,
                          color: e.is_legendary ? "var(--vermillion)" : "var(--bone-faint)",
                          letterSpacing: "0.22em",
                          textTransform: "uppercase",
                        }}
                      >
                        {e.is_legendary ? "★ LEGENDARY" : (e.category ?? "").replace(/_/g, " ").toUpperCase()}
                        {e.established_year && (
                          <div
                            style={{
                              marginTop: 4,
                              color: "var(--bone-faint)",
                              fontSize: 10,
                            }}
                          >
                            EST. {e.established_year}
                          </div>
                        )}
                      </div>
                      <div>
                        <Title
                          as="h3"
                          style={{
                            fontFamily: "var(--cinema-display)",
                            fontStyle: "italic",
                            fontWeight: 500,
                            fontSize: 26,
                            lineHeight: 1.2,
                            color: "var(--bone)",
                            margin: 0,
                          }}
                        >
                          {e.name}
                        </Title>
                        {e.signature_dish && (
                          <p
                            style={{
                              marginTop: 8,
                              fontFamily: "var(--cinema-display)",
                              fontStyle: "italic",
                              fontSize: 16,
                              color: "var(--vermillion)",
                              margin: "8px 0 0",
                            }}
                          >
                            Signature: {e.signature_dish}
                          </p>
                        )}
                        {e.why_it_matters && (
                          <p
                            style={{
                              marginTop: 10,
                              fontFamily: "var(--cinema-ui)",
                              fontSize: 15,
                              lineHeight: 1.65,
                              color: "var(--bone-dim)",
                              margin: "10px 0 0",
                            }}
                          >
                            {e.why_it_matters}
                          </p>
                        )}
                        {e.insider_tip && (
                          <p
                            style={{
                              marginTop: 8,
                              fontFamily: "var(--cinema-ui)",
                              fontSize: 13,
                              lineHeight: 1.6,
                              color: "var(--amber)",
                              margin: "8px 0 0",
                            }}
                          >
                            Tip: {e.insider_tip}
                          </p>
                        )}
                        <div
                          className="nq-mono"
                          style={{
                            marginTop: 12,
                            fontSize: 11,
                            color: "var(--bone-faint)",
                            letterSpacing: "0.16em",
                            display: "flex",
                            gap: 14,
                            flexWrap: "wrap",
                          }}
                        >
                          {e.area && <span>{e.area.toUpperCase()}</span>}
                          {e.price_range && <span>· {e.price_range}</span>}
                          {e.vegetarian === "fully" && <span>· VEG</span>}
                          {e.kid_friendly && <span>· KIDS OK</span>}
                        </div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        {e.google_maps_url ? (
                          <a
                            href={e.google_maps_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="nq-mono"
                            style={{
                              fontSize: 11,
                              color: "var(--vermillion)",
                              letterSpacing: "0.22em",
                              textDecoration: "none",
                              borderBottom: "1px solid var(--vermillion)",
                              paddingBottom: 2,
                            }}
                          >
                            FIND IT ↗
                          </a>
                        ) : null}
                      </div>
                    </div>
                    )}
                  />
                </div>
              </div>
            )}

            {eateries.length === 0 && isHonestScarcityConfirmed(dest.honest_scarcity, "eateries") && (
              <div style={{ maxWidth: 1100, margin: "32px auto 0" }}>
                <HonestScarcityPanel
                  slot="eateries"
                  destinationName={displayName}
                  honestScarcity={dest.honest_scarcity}
                />
              </div>
            )}

            {/* Editor stay picks — inline cinematic. Each pick is its own
                editorial card with the slot label as kicker. */}
            {dest.editor_stay_picks?.length > 0 && (
              <div style={{ maxWidth: 1100, margin: "60px auto 0" }}>
                <p
                  className="nq-kicker"
                  style={{
                    color: "var(--vermillion)",
                    marginBottom: 24,
                  }}
                >
                  WHERE TO SLEEP · EDITOR&apos;S PICKS
                </p>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                    gap: 24,
                  }}
                >
                  {dest.editor_stay_picks.map((raw: any) => localizeRow(raw, locale, ["why_nakshiq", "signature_experience"])).map((p: any) => (
                    <div
                      key={p.slot ?? p.name}
                      style={{
                        border: "1px solid var(--hair)",
                        padding: "28px 24px",
                        background: "var(--film)",
                      }}
                    >
                      <div
                        className="nq-mono"
                        style={{
                          fontSize: 11,
                          color: "var(--vermillion)",
                          letterSpacing: "0.22em",
                          marginBottom: 12,
                          textTransform: "uppercase",
                        }}
                      >
                        {(p.slot ?? "PICK").replace(/_/g, " ")}
                        {p.price_band ? ` · ${p.price_band.toUpperCase()}` : ""}
                      </div>
                      <Title
                        as="h3"
                        style={{
                          fontFamily: "var(--cinema-display)",
                          fontStyle: "italic",
                          fontWeight: 500,
                          fontSize: 24,
                          lineHeight: 1.2,
                          color: "var(--bone)",
                          margin: "0 0 12px",
                        }}
                      >
                        {p.name}
                      </Title>
                      {p.property_type && (
                        <p
                          className="nq-mono"
                          style={{
                            fontSize: 11,
                            color: "var(--bone-faint)",
                            letterSpacing: "0.18em",
                            margin: "0 0 12px",
                            textTransform: "uppercase",
                          }}
                        >
                          {p.property_type}
                        </p>
                      )}
                      {p.why_nakshiq && (
                        <p
                          style={{
                            fontFamily: "var(--cinema-ui)",
                            fontSize: 15,
                            lineHeight: 1.65,
                            color: "var(--bone-dim)",
                            margin: "0 0 14px",
                          }}
                        >
                          {p.why_nakshiq}
                        </p>
                      )}
                      {p.signature_experience && (
                        <p
                          style={{
                            fontFamily: "var(--cinema-display)",
                            fontStyle: "italic",
                            fontSize: 15,
                            lineHeight: 1.5,
                            color: "var(--amber)",
                            margin: 0,
                            paddingTop: 14,
                            borderTop: "1px solid var(--hair)",
                          }}
                        >
                          &ldquo;{p.signature_experience}&rdquo;
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {(dest.editor_stay_picks?.length ?? 0) === 0 && isHonestScarcityConfirmed(dest.honest_scarcity, "stays") && (
              <div style={{ maxWidth: 1100, margin: "60px auto 0" }}>
                <HonestScarcityPanel
                  slot="stays"
                  destinationName={displayName}
                  honestScarcity={dest.honest_scarcity}
                />
              </div>
            )}

            {/* Local stays — preserved BookingHandoff component for its
                affiliate logic, just framed in cinematic kicker. */}
            <div style={{ maxWidth: 1100, margin: "60px auto 0" }}>
              <p
                className="nq-kicker"
                style={{
                  color: "var(--vermillion)",
                  marginBottom: 16,
                }}
              >
                BOOK A STAY · CURATED PROPERTIES
              </p>
              <BookingHandoff
                destinationName={displayName}
                stateName={stateName}
                destinationId={dest.id}
              />
            </div>

            {/* Local Legends — the people behind the place. Restored to
                close the production-vs-cinematic parity gap. Editorial
                voice: italic display name + role-mono kicker + Prose-style
                body. Vermillion accent on the verified-byline. */}
            {dest.local_legends?.length > 0 && (
              <div style={{ maxWidth: 820, margin: "80px auto 0" }}>
                <p
                  className="nq-kicker"
                  style={{
                    color: "var(--vermillion)",
                    marginBottom: 24,
                  }}
                >
                  LOCAL LEGENDS · WHO MAKES THIS PLACE
                </p>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 0,
                  }}
                >
                  {dest.local_legends.map((legend: any, i: number) => (
                    <div
                      key={legend.id ?? legend.name}
                      style={{
                        padding: "28px 0",
                        borderTop:
                          i === 0
                            ? "1px solid var(--hair)"
                            : "1px solid var(--hair)",
                        borderBottom:
                          i === dest.local_legends.length - 1
                            ? "1px solid var(--hair)"
                            : "0",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "baseline",
                          justifyContent: "space-between",
                          gap: 16,
                          marginBottom: legend.story ? 12 : 0,
                          flexWrap: "wrap",
                        }}
                      >
                        <Title
                          as="h3"
                          style={{
                            fontFamily: "var(--cinema-display)",
                            fontStyle: "italic",
                            fontWeight: 500,
                            fontSize: 26,
                            lineHeight: 1.2,
                            letterSpacing: "-0.012em",
                            color: "var(--bone)",
                            margin: 0,
                          }}
                        >
                          {legend.name}
                        </Title>
                        <span
                          className="nq-mono"
                          style={{
                            fontSize: 11,
                            letterSpacing: "0.18em",
                            textTransform: "uppercase",
                            whiteSpace: "nowrap",
                            color: "var(--bone-dim)",
                          }}
                        >
                          {[legend.role, legend.known_as]
                            .filter(Boolean)
                            .join(" · ")}
                          {legend.verified && (
                            <>
                              {(legend.role || legend.known_as) && (
                                <span style={{ color: "var(--bone-faint)" }}>
                                  {" · "}
                                </span>
                              )}
                              <span style={{ color: "var(--green)" }}>
                                VERIFIED
                              </span>
                            </>
                          )}
                        </span>
                      </div>
                      {legend.story && (
                        <p
                          style={{
                            fontFamily: "var(--cinema-ui)",
                            fontSize: 16,
                            lineHeight: 1.7,
                            color: "var(--bone-dim)",
                            margin: 0,
                          }}
                        >
                          {legend.story}
                        </p>
                      )}
                      {(legend.instagram || legend.youtube) && (
                        <div
                          style={{
                            marginTop: 12,
                            display: "flex",
                            gap: 18,
                            fontFamily: "var(--cinema-mono)",
                            fontSize: 11,
                            letterSpacing: "0.18em",
                            textTransform: "uppercase",
                          }}
                        >
                          {legend.instagram && (
                            <a
                              href={`https://instagram.com/${legend.instagram.replace("@", "")}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                color: "var(--vermillion)",
                                textDecoration: "none",
                              }}
                            >
                              IG · {legend.instagram} →
                            </a>
                          )}
                          {legend.youtube && (
                            <a
                              href={legend.youtube}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                color: "var(--vermillion)",
                                textDecoration: "none",
                              }}
                            >
                              YOUTUBE →
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Festivals */}
            {dest.festivals?.length > 0 && (
              <div style={{ maxWidth: 720, margin: "60px auto 0" }}>
                <p
                  className="nq-kicker"
                  style={{
                    color: "var(--vermillion)",
                    marginBottom: 16,
                  }}
                >
                  FESTIVALS · BY THE MONTH
                </p>
                {dest.festivals.map((f: any) => (
                  <EditorialEntry
                    key={f.id ?? f.name}
                    title={f.name}
                    body={f.description}
                    meta={
                      f.month
                        ? MONTH_LONG_NAMES[f.month - 1]?.toUpperCase()
                        : undefined
                    }
                  />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ───────────────────────────────────────────────
           ACT IX — The Field (Trip reports + Traveler notes)
           ─────────────────────────────────────────────── */}
        {/* Gate the entire section on the same predicate the ToC uses
            (see "dest-act-9" entry in actNav above). Without this, 464 of
            505 destinations (92%) render the heading + empty wrapper —
            users see "IX · THE FIELD · TRAVELER NOTES" with nothing below.
            Caught on Bandipur National Park on 2026-05-17 via user screenshot. */}
        {((dest.trip_reports?.length ?? 0) > 0 ||
          (dest.traveler_notes?.length ?? 0) > 0) && (
        <section
          id="dest-act-9"
          className="nq-act-warm"
          style={{
            borderTop: "1px solid var(--hair)",
            borderBottom: "1px solid var(--hair)",
            padding: "120px 24px 100px",
          }}
        >
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <SectionLabel num="IX" name="THE FIELD · TRAVELER NOTES" />

            {/* Trip reports — inline cinematic. Italic display title +
                serif italic body + mono attribution + highlights/warnings
                as no-bullet kicker rows. */}
            {dest.trip_reports?.length > 0 && (
              <div style={{ maxWidth: 1100, margin: "32px auto 0" }}>
                <p
                  className="nq-kicker"
                  style={{
                    color: "var(--vermillion)",
                    marginBottom: 24,
                  }}
                >
                  RECENT TRIP REPORTS · {dest.trip_reports.length}
                </p>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 0,
                    alignItems: "stretch",
                  }}
                >
                  <ExpandableList
                    items={dest.trip_reports}
                    initial={3}
                    totalLabel="trip reports"
                    renderItem={(r: any, i: number, total: number) => (
                    <div
                      key={r.id ?? i}
                      style={{
                        padding: "40px 0",
                        borderTop: "1px solid var(--hair)",
                        borderBottom:
                          i === total - 1
                            ? "1px solid var(--hair)"
                            : "0",
                      }}
                    >
                      <div
                        className="nq-mono"
                        style={{
                          fontSize: 11,
                          color: "var(--bone-faint)",
                          letterSpacing: "0.22em",
                          marginBottom: 14,
                        }}
                      >
                        {[
                          MONTH_LONG_NAMES[(r.visited_month ?? 1) - 1]?.toUpperCase(),
                          r.visited_year,
                          r.reporter_location?.toUpperCase(),
                        ]
                          .filter(Boolean)
                          .join(" · ")}
                        {r.rating != null && (
                          <span
                            style={{
                              marginLeft: 12,
                              color:
                                r.rating >= 5
                                  ? VERDICT_COLOR.peak
                                  : r.rating >= 3
                                  ? VERDICT_COLOR.doable
                                  : VERDICT_COLOR.avoid,
                            }}
                          >
                            {r.rating}/5
                          </span>
                        )}
                      </div>
                      {r.summary && (
                        <Title
                          as="h3"
                          style={{
                            fontFamily: "var(--cinema-display)",
                            fontStyle: "italic",
                            fontWeight: 500,
                            fontSize: 28,
                            lineHeight: 1.25,
                            color: "var(--bone)",
                            margin: "0 0 16px",
                            letterSpacing: "-0.012em",
                          }}
                        >
                          {r.summary}
                        </Title>
                      )}
                      {r.body && (
                        <p
                          style={{
                            fontFamily: "var(--cinema-ui)",
                            fontSize: 16,
                            lineHeight: 1.75,
                            color: "var(--bone-dim)",
                            margin: "0 0 18px",
                          }}
                        >
                          {r.body}
                        </p>
                      )}
                      {r.highlights?.length > 0 && (
                        <div style={{ marginTop: 12 }}>
                          <p
                            className="nq-mono"
                            style={{
                              fontSize: 10,
                              color: "var(--green)",
                              letterSpacing: "0.22em",
                              marginBottom: 6,
                            }}
                          >
                            HIGHLIGHTS
                          </p>
                          {r.highlights.map((h: string) => (
                            <div
                              key={h}
                              style={{
                                fontFamily: "var(--cinema-ui)",
                                fontSize: 14,
                                lineHeight: 1.6,
                                color: "var(--bone-dim)",
                                paddingLeft: 0,
                              }}
                            >
                              — {h}
                            </div>
                          ))}
                        </div>
                      )}
                      {r.warnings?.length > 0 && (
                        <div style={{ marginTop: 12 }}>
                          <p
                            className="nq-mono"
                            style={{
                              fontSize: 10,
                              color: "var(--vermillion)",
                              letterSpacing: "0.22em",
                              marginBottom: 6,
                            }}
                          >
                            WARNINGS
                          </p>
                          {r.warnings.map((w: string) => (
                            <div
                              key={w}
                              style={{
                                fontFamily: "var(--cinema-ui)",
                                fontSize: 14,
                                lineHeight: 1.6,
                                color: "var(--bone-dim)",
                              }}
                            >
                              — {w}
                            </div>
                          ))}
                        </div>
                      )}
                      {r.reporter_name && (
                        <p
                          className="nq-mono"
                          style={{
                            marginTop: 16,
                            fontSize: 12,
                            color: "var(--bone-faint)",
                            letterSpacing: "0.18em",
                            textTransform: "uppercase",
                          }}
                        >
                          — {r.reporter_name}
                        </p>
                      )}
                    </div>
                    )}
                  />
                </div>
              </div>
            )}

            {/* Traveler notes — kept in Act IX as editorial field log.
                Reviews + Q&A + submission forms moved out per user
                instruction (they should sit at the absolute tail of the
                page, just before the footer, as the last "user voice"
                section). See the new <section id="dest-tail-voice">
                rendered after the outro below. */}
            {dest.traveler_notes?.length > 0 && (
              <div style={{ maxWidth: 1100, margin: "60px auto 0" }}>
                <TravelerNotes notes={dest.traveler_notes} />
              </div>
            )}
          </div>
        </section>
        )}

        {/* ───────────────────────────────────────────────
           ACT X — The Itinerary
           ─────────────────────────────────────────────── */}
        <section
          id="dest-act-10"
          style={{
            ...sectionStyle,
            padding: "120px 24px 100px",
            margin: 0,
            maxWidth: "none",
          }}
        >
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <SectionLabel num="X" name="THE ITINERARY · DAY BY DAY" />

            {dest.micro_itineraries && (
              <div style={{ maxWidth: 1100, margin: "32px auto 0" }}>
                <MicroItinerarySection data={dest.micro_itineraries} />
              </div>
            )}

            {/* Deep link to the standalone /itinerary/[slug] page — same
                min-content gate the page itself uses, so this never links a
                notFound(). */}
            {hasItineraryPage(dest.micro_itineraries) && (
              <div style={{ maxWidth: 1100, margin: "24px auto 0" }}>
                <a
                  href={`/${locale}/itinerary/${dest.id}`}
                  style={{
                    fontFamily: "var(--cinema-ui)",
                    fontSize: 14,
                    color: "var(--vermillion)",
                    textDecoration: "none",
                  }}
                >
                  {locale === "hi"
                    ? `${displayName} का पूरा दिन-प्रतिदिन प्लान — शेयर करने लायक पेज →`
                    : `The full ${displayName} itinerary — a shareable day-by-day page →`}
                </a>
              </div>
            )}

            {dest.persona_blocks && (
              <div style={{ maxWidth: 1100, margin: "60px auto 0" }}>
                <PersonaBlocksSection data={dest.persona_blocks} />
              </div>
            )}

            {dest.best_for_segments && (
              <div style={{ maxWidth: 1100, margin: "60px auto 0" }}>
                <BestForSegments data={dest.best_for_segments} />
              </div>
            )}

          </div>
        </section>

        {/* ───────────────────────────────────────────────
           Cross-category rail — bridges destination → blog/guide/
           routes/etc. so every destination gains 8 outbound links
           to legacy content hubs. Phase 1 stabilize (S54).
           Static curated cards for now; upgrade to per-destination
           dynamic queries in Phase 4 SEO hardening.
           ─────────────────────────────────────────────── */}
        <CinematicRelatedRail />

        {/* ───────────────────────────────────────────────
           ACT XI — The Coda (Collections, Routes, Ask, Share)
           ─────────────────────────────────────────────── */}
        <section
          id="dest-act-11"
          className="nq-act-warm"
          style={{
            borderTop: "1px solid var(--hair)",
            padding: "120px 24px 140px",
          }}
        >
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <SectionLabel num="XI" name="THE CODA" />

            {/* Featured in collections */}
            {dest.relatedCollections?.length > 0 && (
              <div style={{ maxWidth: 1100, margin: "32px auto 0" }}>
                <p
                  className="nq-kicker"
                  style={{
                    color: "var(--vermillion)",
                    marginBottom: 16,
                  }}
                >
                  FEATURED IN COLLECTIONS
                </p>
                {dest.relatedCollections.map((c: any) => (
                  <EditorialEntry
                    key={c.id}
                    title={c.name}
                    body={c.description}
                    href={`/${locale}/collections/${c.id}`}
                  />
                ))}
              </div>
            )}

            {/* Road trips through here */}
            {dest.relatedRoutes?.length > 0 && (
              <div style={{ maxWidth: 1100, margin: "60px auto 0" }}>
                <p
                  className="nq-kicker"
                  style={{
                    color: "var(--vermillion)",
                    marginBottom: 16,
                  }}
                >
                  ROAD TRIPS THROUGH HERE
                </p>
                {dest.relatedRoutes.map((r: any) => (
                  <EditorialEntry
                    key={r.id}
                    title={r.name}
                    meta={`${r.days} DAYS · ${(r.difficulty ?? "").toUpperCase()}`}
                    href={`/${locale}/routes/${r.id}`}
                  />
                ))}
              </div>
            )}

            {/* Ask NakshIQ inline CTA */}
            <div style={{ maxWidth: 720, margin: "80px auto 0" }}>
              <AskNakshIQInlineCTA subject={displayName} />
            </div>

            {/* Editor signature */}
            <div
              style={{
                maxWidth: 720,
                margin: "80px auto 0",
                paddingTop: 32,
                borderTop: "1px solid var(--hair)",
                textAlign: "right",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--cinema-display)",
                  fontStyle: "italic",
                  fontSize: 22,
                  color: "var(--bone)",
                  margin: 0,
                }}
              >
                — The NakshIQ editors
              </p>
              <EditorialCaption align="right">
                <span style={{ display: "inline-block", marginTop: 6 }}>
                  ISSUE Nº {issueNum} ·{" "}
                  {dest.content_reviewed_at
                    ? `REVIEWED ${new Date(
                        dest.content_reviewed_at,
                      )
                        .toLocaleDateString("en-IN", {
                          month: "short",
                          year: "numeric",
                        })
                        .toUpperCase()}`
                    : "EDITORIAL · CITATION-FIRST"}
                </span>
              </EditorialCaption>
            </div>

            {/* Action rows — three stacked tiers with breathing room.
                Tier 1: share affordances (lightest weight)
                Tier 2: suggest-edit ghost button
                Tier 3: primary destination-level CTAs (heaviest weight) */}
            <div
              style={{
                maxWidth: 720,
                margin: "80px auto 0",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 40,
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 14,
                }}
              >
                <ShareButton
                  title={displayName}
                  text={dest.tagline ?? `${displayName} — NakshIQ verdict`}
                />
                <WhatsAppShare
                  message={`${displayName} on NakshIQ — ${
                    dest.tagline ?? "the editorial verdict"
                  }`}
                />
                <CompareButton destinationId={dest.id} />
              </div>
              <SuggestEditButton
                variant="cinematic"
                targetTable="destinations"
                targetId={dest.id}
                context={`destination · ${displayName}`}
              />
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 16,
                }}
              >
                <Link href={`/${locale}/explore`} style={ctaSecondary}>
                  BACK TO ATLAS
                </Link>
                <Link href={`/${locale}/methodology`} style={ctaPrimary}>
                  HOW WE SCORE →
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ───────────────────────────────────────────────
         Travellers' voice — sits ABOVE the closing outro+footer per
         user instruction (the outro is the page's actual footer, with
         the legal links absorbed into the bottom of the full-bleed
         image, matching landing Act 9 Coda). So the order is:
            main content → Travellers' voice → Outro-as-footer
         Reviews + Q&A + submission forms.
         ─────────────────────────────────────────────── */}
      <section
        id="dest-tail-voice"
        aria-label="Travellers' voice"
        style={{
          padding: "120px 24px 100px",
          background: "var(--paper)",
          color: "var(--bone)",
          borderTop: "1px solid var(--hair)",
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p
            className="nq-kicker"
            style={{
              color: "var(--vermillion)",
              marginBottom: 24,
              textAlign: "center",
            }}
          >
            TRAVELLERS&apos; VOICE
          </p>
          <Title
            as="h2"
            style={{
              fontFamily: "var(--cinema-display)",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "clamp(36px, 5vw, 64px)",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              color: "var(--bone)",
              margin: "0 0 56px",
              textAlign: "center",
            }}
          >
            What travellers say.
          </Title>

          {dest.reviews?.length > 0 && (
            <div style={{ maxWidth: 1100, margin: "0 auto" }}>
              <p
                className="nq-kicker"
                style={{ color: "var(--vermillion)", marginBottom: 12 }}
              >
                REVIEWS · {dest.reviews.length}
              </p>
              {(() => {
                const ratings = dest.reviews
                  .map((r: any) => Number(r.rating))
                  .filter((n: number) => n >= 1 && n <= 5);
                if (ratings.length === 0) return null;
                const avg =
                  ratings.reduce((a: number, b: number) => a + b, 0) /
                  ratings.length;
                const buckets = [0, 0, 0, 0, 0];
                ratings.forEach((r: number) => (buckets[r - 1] += 1));
                const max = Math.max(...buckets, 1);
                return (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 28,
                      flexWrap: "wrap",
                      marginBottom: 36,
                      paddingBottom: 28,
                      borderBottom: "1px solid var(--hair)",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "baseline",
                        gap: 10,
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--cinema-mono)",
                          fontSize: 36,
                          fontWeight: 700,
                          color: "var(--amber)",
                          fontVariantNumeric: "tabular-nums",
                          letterSpacing: "-0.02em",
                        }}
                      >
                        {avg.toFixed(1)}
                      </span>
                      <span
                        className="nq-mono"
                        style={{
                          fontSize: 11,
                          color: "var(--bone-faint)",
                          letterSpacing: "0.22em",
                          textTransform: "uppercase",
                        }}
                      >
                        / 5 · {ratings.length} traveller
                        {ratings.length === 1 ? "" : "s"}
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 4,
                        flex: 1,
                        minWidth: 200,
                        maxWidth: 320,
                      }}
                      aria-label="Rating distribution"
                    >
                      {[5, 4, 3, 2, 1].map((s) => {
                        const count = buckets[s - 1];
                        const pct = (count / max) * 100;
                        return (
                          <div
                            key={s}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 8,
                              fontFamily: "var(--cinema-mono)",
                              fontSize: 10,
                              color: "var(--bone-faint)",
                              letterSpacing: "0.10em",
                            }}
                          >
                            <span style={{ width: 14, color: "var(--amber)" }}>
                              {s}★
                            </span>
                            <span
                              aria-hidden="true"
                              style={{
                                flex: 1,
                                height: 4,
                                background: "var(--hair-2)",
                                position: "relative",
                                overflow: "hidden",
                              }}
                            >
                              <span
                                style={{
                                  position: "absolute",
                                  inset: 0,
                                  width: `${pct}%`,
                                  background:
                                    s >= 4
                                      ? "var(--amber)"
                                      : "var(--bone-faint)",
                                }}
                              />
                            </span>
                            <span
                              style={{
                                width: 24,
                                textAlign: "right",
                                color: "var(--bone-dim)",
                                fontVariantNumeric: "tabular-nums",
                              }}
                            >
                              {count}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })()}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))",
                  gap: 0,
                  borderTop: "1px solid var(--hair)",
                }}
              >
                <ExpandableList
                  items={dest.reviews}
                  initial={4}
                  totalLabel="reviews"
                  renderItem={(rev: any) => (
                    <div
                      key={rev.id}
                      style={{
                        padding: "32px 24px",
                        borderRight: "1px solid var(--hair)",
                        borderBottom: "1px solid var(--hair)",
                      }}
                    >
                      <div
                        className="nq-mono"
                        style={{
                          fontSize: 11,
                          color: "var(--amber)",
                          letterSpacing: "0.22em",
                          marginBottom: 12,
                        }}
                      >
                        {"★".repeat(rev.rating)}
                        {"☆".repeat(5 - (rev.rating ?? 0))}
                        {rev.traveler_type && (
                          <span
                            style={{
                              marginLeft: 12,
                              color: "var(--bone-faint)",
                            }}
                          >
                            · {rev.traveler_type.toUpperCase()}
                          </span>
                        )}
                      </div>
                      {rev.text && (
                        <p
                          style={{
                            fontFamily: "var(--cinema-display)",
                            fontStyle: "italic",
                            fontSize: 18,
                            lineHeight: 1.55,
                            color: "var(--bone)",
                            margin: 0,
                          }}
                        >
                          &ldquo;{rev.text}&rdquo;
                        </p>
                      )}
                      <p
                        className="nq-mono"
                        style={{
                          marginTop: 14,
                          fontSize: 11,
                          color: "var(--bone-faint)",
                          letterSpacing: "0.18em",
                          textTransform: "uppercase",
                        }}
                      >
                        {rev.visit_month && rev.visit_year
                          ? `VISITED ${MONTH_LONG_NAMES[rev.visit_month - 1]?.toUpperCase()} ${rev.visit_year}`
                          : rev.created_at
                            ? new Date(rev.created_at)
                                .toLocaleDateString("en-IN", {
                                  month: "short",
                                  year: "numeric",
                                })
                                .toUpperCase()
                            : ""}
                      </p>
                    </div>
                  )}
                />
              </div>
            </div>
          )}

          {answeredQuestions.length > 0 && (
            <div style={{ maxWidth: 1100, margin: "80px auto 0" }}>
              <p
                className="nq-kicker"
                style={{ color: "var(--vermillion)", marginBottom: 16 }}
              >
                QUESTIONS &amp; ANSWERS
              </p>
              <QuestionsList
                questions={answeredQuestions}
                destinationId={dest.id}
                locale={locale}
              />
            </div>
          )}

          <div
            style={{
              maxWidth: 1100,
              margin: "80px auto 0",
              display: "grid",
              gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)",
              gap: 48,
            }}
          >
            <div>
              <p
                className="nq-kicker"
                style={{ color: "var(--vermillion)", marginBottom: 16 }}
              >
                SHARE YOUR EXPERIENCE
              </p>
              <ReviewForm destinationId={dest.id} />
            </div>
            <div>
              <p
                className="nq-kicker"
                style={{ color: "var(--vermillion)", marginBottom: 16 }}
              >
                ASK A QUESTION
              </p>
              <QuestionForm destinationId={dest.id} />
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────
         Outro = footer. Full-bleed Ken Burns image with the closing
         tagline floating mid-frame and the legal/nav line absorbed at
         the bottom edge — matches the landing page Act 9 Coda pattern
         (no separate <Footer/> rendered). User decided this is the
         actual footer; Travellers' voice sits above it.
         ─────────────────────────────────────────────── */}
      <section
        className="nq-outro nq-grain"
        aria-label={`${displayName} — closing frame`}
        style={{
          position: "relative",
          width: "100vw",
          marginLeft: "calc(50% - 50vw)",
          minHeight: "100vh",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          color: "var(--bone)",
        }}
      >
        <img
          className="nq-outro-img"
          src={destinationImage(dest.id, 2400)}
          alt=""
          aria-hidden
        />
        <div
          className="nq-outro-veil"
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 1,
            background:
              "radial-gradient(ellipse at 50% 55%, rgba(10,10,8,0.35) 0%, rgba(10,10,8,0.7) 65%, rgba(10,10,8,0.96) 100%)",
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 2,
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "calc(8vh + 80px) 48px calc(4vh + 24px)",
            maxWidth: 1500,
            width: "100%",
            margin: "0 auto",
            boxSizing: "border-box",
          }}
        >
          {/* spacer top — keeps the headline mid-frame */}
          <div />

          {/* Closing tagline — center-aligned over the image. */}
          <div style={{ textAlign: "center", maxWidth: 880, margin: "0 auto" }}>
            <Title
              as="h2"
              style={{
                fontFamily: "var(--cinema-display)",
                fontStyle: "italic",
                fontWeight: 400,
                fontSize: "clamp(48px, 8vw, 112px)",
                lineHeight: 0.94,
                letterSpacing: "-0.024em",
                color: "var(--bone)",
                margin: 0,
              }}
            >
              {renderDisplayName(dest.name)}.
            </Title>
            <p
              className="nq-mono"
              style={{
                marginTop: 24,
                fontSize: 11,
                letterSpacing: "0.26em",
                textTransform: "uppercase",
                color: "var(--vermillion)",
              }}
            >
              ISSUE Nº {issueNum} ·{" "}
              {dest.content_reviewed_at
                ? `VERIFIED ${new Date(dest.content_reviewed_at)
                    .toLocaleDateString("en-IN", {
                      month: "short",
                      year: "numeric",
                    })
                    .toUpperCase()}`
                : `${currentMonthName.toUpperCase()} 2026`}
            </p>
            <p
              style={{
                marginTop: 18,
                fontFamily: "var(--cinema-display)",
                fontStyle: "italic",
                fontSize: 22,
                color: "var(--bone)",
                opacity: 0.78,
                letterSpacing: "-0.01em",
              }}
            >
              Go with confidence<span style={{ color: "var(--vermillion)" }}>.</span>
            </p>

            {/* Editor signature — italic serif, small, sits a beat under
                the bookend tagline. No fabricated bylines (per memory rule
                — "no fabricated stats, contacts, or people"); the
                attribution is the editorial collective. */}
            <p
              style={{
                marginTop: 28,
                fontFamily: "var(--cinema-display)",
                fontStyle: "italic",
                fontSize: 14,
                color: "var(--bone-faint)",
                letterSpacing: "0.01em",
              }}
            >
              — The NakshIQ editors ·{" "}
              {currentMonthName} 2026
            </p>

            {/* Next-read teaser — uses the closest PostGIS neighbour so the
                "what to read next" actually makes geographic sense. Editorial
                pill in mono caps. */}
            {dest.nearbyDestinations?.[0] && (
              <Link
                href={`/${locale}/destination/${dest.nearbyDestinations[0].id}`}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 12,
                  marginTop: 36,
                  padding: "10px 20px",
                  background: "transparent",
                  color: "var(--bone)",
                  border: "1px solid var(--vermillion)",
                  borderRadius: 999,
                  fontFamily: "var(--cinema-mono)",
                  fontSize: 11,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  transition: "background 200ms ease, color 200ms ease",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.background = "var(--vermillion)";
                  el.style.color = "var(--paper)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.background = "transparent";
                  el.style.color = "var(--bone)";
                }}
              >
                <span style={{ color: "var(--vermillion)" }}>READ NEXT</span>
                <span style={{ opacity: 0.5 }}>·</span>
                <span>{dest.nearbyDestinations[0].name}</span>
                <span aria-hidden="true">→</span>
              </Link>
            )}

            {/* "What changed in this issue" — quiet native <details>
                disclosure. Three honest update categories computed from
                the data the page actually has: verification date, count
                of curated stays/eateries, count of approved reviews. No
                hardcoded changelog entries (would rot the moment they're
                added). */}
            <details
              style={{
                marginTop: 32,
                color: "var(--bone-faint)",
                fontFamily: "var(--cinema-mono)",
                fontSize: 10,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                maxWidth: 520,
                marginInline: "auto",
              }}
            >
              <summary
                style={{
                  cursor: "pointer",
                  textAlign: "center",
                  paddingBottom: 8,
                  borderBottom: "1px solid var(--hair-2)",
                }}
              >
                What changed in this issue +
              </summary>
              <ul
                style={{
                  marginTop: 16,
                  padding: 0,
                  listStyle: "none",
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                  textAlign: "left",
                }}
              >
                {dest.content_reviewed_at && (
                  <li>
                    <span style={{ color: "var(--vermillion)" }}>+ </span>
                    Editorial review{" "}
                    {new Date(dest.content_reviewed_at)
                      .toLocaleDateString("en-IN", {
                        month: "short",
                        day: "numeric",
                      })
                      .toUpperCase()}
                  </li>
                )}
                {(dest.editor_stay_picks?.length ?? 0) > 0 && (
                  <li>
                    <span style={{ color: "var(--vermillion)" }}>+ </span>
                    {dest.editor_stay_picks.length} stay pick
                    {dest.editor_stay_picks.length === 1 ? "" : "s"}{" "}
                    audited &amp; sourced
                  </li>
                )}
                {(dest.eateries?.length ?? 0) > 0 && (
                  <li>
                    <span style={{ color: "var(--vermillion)" }}>+ </span>
                    {dest.eateries.length} eater
                    {dest.eateries.length === 1 ? "y" : "ies"} verified
                  </li>
                )}
                {(dest.reviews?.length ?? 0) > 0 && (
                  <li>
                    <span style={{ color: "var(--vermillion)" }}>+ </span>
                    {dest.reviews.length} traveller review
                    {dest.reviews.length === 1 ? "" : "s"} approved
                  </li>
                )}
              </ul>
            </details>

            {/* Newsletter slot — single-line editorial form, hairline-bordered
                input + vermillion subscribe action. Subtle by design; sits
                between the changelog and the absorbed footer so the closing
                rhythm reads: bookend → updates → join us → footer. */}
            <CinematicNewsletter source="cinematic-coda" />
          </div>

          {/* Absorbed footer line — sits at the very bottom edge of the
              image. Same link set as the production footer; cinema-styled
              so the legal/nav transition no longer reads as shadcn chrome. */}
          <div
            style={{
              marginTop: 64,
              paddingTop: 24,
              borderTop: "1px solid var(--hair-2)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 16,
              fontFamily: "var(--cinema-mono)",
              fontWeight: 500,
              fontSize: 11,
              color: "var(--bone-faint)",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: 18,
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--cinema-display)",
                  fontStyle: "italic",
                  fontWeight: 500,
                  fontSize: 18,
                  color: "var(--bone)",
                  letterSpacing: "-0.015em",
                  textTransform: "none",
                }}
              >
                Naksh<span style={{ color: "var(--vermillion)" }}>.</span>iq
              </span>
              <Link
                href={`/${locale}/about`}
                style={{ color: "var(--bone-dim)", textDecoration: "none" }}
              >
                About
              </Link>
              <Link
                href={`/${locale}/methodology`}
                style={{ color: "var(--bone-dim)", textDecoration: "none" }}
              >
                Methodology
              </Link>
              <Link
                href={`/${locale}/contact`}
                style={{ color: "var(--bone-dim)", textDecoration: "none" }}
              >
                Contact
              </Link>
            </div>
            <div
              style={{
                display: "flex",
                gap: 18,
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <span>
                © {new Date().getFullYear()} NakshIQ · Issue Nº {issueNum}
              </span>
              <Link
                href={`/${locale}/privacy`}
                style={{ color: "var(--bone-faint)", textDecoration: "none" }}
              >
                Privacy
              </Link>
              <Link
                href={`/${locale}/terms`}
                style={{ color: "var(--bone-faint)", textDecoration: "none" }}
              >
                Terms
              </Link>
              <Link
                href={`/${locale}/cookies`}
                style={{ color: "var(--bone-faint)", textDecoration: "none" }}
              >
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* In-guide labelled TOC — appears after the cover scrolls out.
          Sister to the dots-only DestinationScrollRail; this one shows
          the section names so readers can jump deliberately. The user
          asked for this three times. */}
      <DestinationGuideToc
        items={sections.map((s) => ({
          id: s.id,
          label: s.label.toUpperCase(),
        }))}
      />
    </div>
  );
}

/* ============================================================
   ExpandableList — show first N items, "+ Show all" reveals the rest.
   Keeps long lists (eateries, reviews, trip reports) from blowing up
   the page height while preserving every item.
   ============================================================ */
function ExpandableList<T>({
  items,
  initial,
  totalLabel,
  renderItem,
}: {
  items: T[];
  initial: number;
  totalLabel: string;
  renderItem: (item: T, index: number, total: number) => ReactNode;
}) {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? items : items.slice(0, initial);
  const remaining = items.length - initial;

  return (
    <>
      {visible.map((item, i) => renderItem(item, i, visible.length))}
      {remaining > 0 && !expanded && (
        <button
          type="button"
          onClick={() => setExpanded(true)}
          style={{
            marginTop: 24,
            padding: "16px 24px",
            background: "transparent",
            color: "var(--vermillion)",
            border: "1px solid var(--vermillion)",
            fontFamily: "var(--cinema-ui)",
            fontWeight: 700,
            fontSize: 11,
            lineHeight: 1,
            textTransform: "uppercase",
            letterSpacing: "0.22em",
            cursor: "pointer",
            alignSelf: "center",
            display: "inline-block",
          }}
        >
          + Show all {remaining} more {totalLabel}
        </button>
      )}
      {expanded && items.length > initial && (
        <button
          type="button"
          onClick={() => setExpanded(false)}
          style={{
            marginTop: 24,
            padding: "16px 24px",
            background: "transparent",
            color: "var(--bone-faint)",
            border: "1px solid var(--hair)",
            fontFamily: "var(--cinema-ui)",
            fontWeight: 700,
            fontSize: 11,
            lineHeight: 1,
            textTransform: "uppercase",
            letterSpacing: "0.22em",
            cursor: "pointer",
            alignSelf: "center",
            display: "inline-block",
          }}
        >
          Collapse
        </button>
      )}
    </>
  );
}
