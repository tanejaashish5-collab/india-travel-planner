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
} from "@itp/shared";

// Cinematic chrome
import { CinemaStyles } from "@/components/landing-cinema/cinema-styles";
import { SectionLabel } from "@/components/landing-cinema/helpers";
import { getIssueNumber } from "@/components/landing-cinema/issue-number";
import { DestinationScrollRail } from "@/components/landing-cinema/destination-scroll-rail";
import {
  EditorialEntry,
  EditorialCaption,
  Prose,
  PullQuote,
  ctaPrimary,
  ctaSecondary,
  sectionStyle,
} from "@/components/landing-cinema/editorial";

// Existing feature components — preserved verbatim, just re-framed.
// StickyDestinationHeader / DestinationSectionNav / DestinationDecisionRail
// are intentionally NOT used here — they paint shadcn chrome over the
// cinematic palette and the user asked them removed. The cinematic right
// rail in DestinationScrollRail handles act-jumping.
import { Nav } from "./nav";
import { Footer } from "./footer";
import { MonthlyChart } from "./monthly-chart";
import { WeatherWidget } from "./weather-widget";
import { ShareButton } from "./share-button";
import { WhatsAppShare } from "./whatsapp-share";
import { CompareButton } from "./compare-tray";
import { ConfidenceCardComponent } from "./confidence-card";
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

export function DestinationDetailCinematic({ dest }: { dest: any }) {
  const locale = useLocale();
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
  const eateries = dest.eateries ?? [];
  const answeredQuestions = dest.questions ?? [];
  const monthlyScores = months.map((m: any) => ({
    m: m.month,
    score: m.score,
    note: m.note,
    why_go: m.why_go,
    why_not: m.why_not,
  }));

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
  const subs = dest.sub_destinations ?? [];
  const gems = dest.hidden_gems ?? [];
  const sections = [
    { id: "dest-act-2", label: "Verdict", show: true },
    { id: "dest-act-3", label: "12 months", show: months.length > 0 },
    { id: "dest-act-4", label: "Field brief", show: !!dest.why_special },
    { id: "dest-act-5", label: "Risks", show: !!cc || dest.solo_female_score != null || !!kf },
    { id: "dest-act-6", label: "Atlas", show: pois.length > 0 || subs.length > 0 || gems.length > 0 },
    { id: "dest-act-7", label: "Cost & ground", show: !!dest.daily_cost || !!dest.local_logistics },
    { id: "dest-act-8", label: "Stay & eat", show: eateries.length > 0 || (dest.editor_stay_picks?.length ?? 0) > 0 },
    { id: "dest-act-9", label: "Field notes", show: (dest.trip_reports?.length ?? 0) > 0 || (dest.reviews?.length ?? 0) > 0 || answeredQuestions.length > 0 },
    { id: "dest-act-10", label: "Itinerary", show: !!dest.micro_itineraries },
    { id: "dest-act-11", label: "Coda", show: true },
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
              CDN URL or null). */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 0,
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
                  {formatScore(currentScore)}
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
            <h1
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
              {dest.name}.
            </h1>
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
          </div>
        </section>

        {/* In-guide jumping is handled exclusively by the cinematic
            <DestinationScrollRail /> on the right edge (rendered at the
            end of <main>). It auto-hides on cover thanks to its
            IntersectionObserver. The production DestinationSectionNav was
            removed because its dot+chip styling clashes with the
            cinematic palette (white dots on dark background). */}

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

            {/* Alerts inline — current advisories ride here */}
            <div style={{ maxWidth: 720, margin: "32px auto 0" }}>
              <DestinationAlerts destinationId={dest.id} />
            </div>

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
          style={{
            background: "var(--film-2)",
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
              {windowMonths.map((m) => (
                <Link
                  key={m.monthIdx}
                  href={`/${locale}/destination/${dest.id}/${m.name.toLowerCase()}`}
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
                color: "var(--vermillion)",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                textAlign: "center",
              }}
            >
              ↑ Tap any month for the full read · colours match verdict bands
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
                          style={{
                            display: "flex",
                            alignItems: "baseline",
                            justifyContent: "space-between",
                            gap: 16,
                            padding: "14px 0",
                            borderTop:
                              i === 0
                                ? "1px solid var(--hair)"
                                : "1px solid var(--hair)",
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
                            className="nq-mono"
                            style={{
                              fontSize: 11,
                              color: "var(--bone-faint)",
                              letterSpacing: "0.16em",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {a.depth === "deep-dive" ? "DEEP DIVE" : "BRIEF"}
                            {a.reading_time
                              ? ` · ${a.reading_time} MIN`
                              : ""}
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
                <p>{dest.why_special}</p>
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
          style={{
            background: "var(--film-2)",
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

            {/* POI section first — has the map. Use it as the primary "where
                to point" surface. Subs are rendered below ONLY when they're
                a different content set (sub-destinations are usually
                neighbourhoods/sub-towns, POIs are specific stops; some
                destinations only have one or the other). */}
            {pois.length > 0 && (
              <div style={{ maxWidth: 1100, margin: "32px auto 0" }}>
                <POISection pois={pois} destName={displayName} />
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
                        <h3
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
                        </h3>
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

            {/* Hidden gems — separate column; same editorial-entry layout
                but with a "why unknown" line that's specific to this set. */}
            {gems.length > 0 && (
              <div style={{ maxWidth: 1100, margin: "60px auto 0" }}>
                <p
                  className="nq-kicker"
                  style={{
                    color: "var(--vermillion)",
                    marginBottom: 16,
                  }}
                >
                  HIDDEN GEMS · NEAR HERE
                </p>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fit, minmax(280px, 1fr))",
                    gap: 16,
                  }}
                >
                  {gems.map((gem: any) => (
                    <div
                      key={gem.id ?? gem.name}
                      style={{
                        borderLeft: "2px solid var(--vermillion)",
                        padding: "16px 20px",
                        background: "rgba(229,86,66,0.04)",
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
                        <h3
                          style={{
                            fontFamily: "var(--cinema-display)",
                            fontStyle: "italic",
                            fontWeight: 500,
                            fontSize: 20,
                            color: "var(--vermillion)",
                            margin: 0,
                          }}
                        >
                          {gem.name}
                        </h3>
                        <span
                          className="nq-mono"
                          style={{
                            fontSize: 11,
                            color: "var(--bone-faint)",
                            letterSpacing: "0.16em",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {gem.distance_km}KM ·{" "}
                          {gem.drive_time?.toUpperCase()}
                        </span>
                      </div>
                      {gem.why_unknown && (
                        <p
                          style={{
                            color: "var(--amber)",
                            fontSize: 12,
                            margin: "0 0 8px",
                            fontFamily: "var(--cinema-ui)",
                          }}
                        >
                          Why unknown: {gem.why_unknown}
                        </p>
                      )}
                      {gem.why_go && (
                        <p
                          style={{
                            fontFamily: "var(--cinema-ui)",
                            fontSize: 14,
                            lineHeight: 1.6,
                            color: "var(--bone-dim)",
                            margin: 0,
                          }}
                        >
                          {gem.why_go}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ───────────────────────────────────────────────
           ACT VII — Cost & Crowds & Infrastructure
           ─────────────────────────────────────────────── */}
        <section
          id="dest-act-7"
          style={{
            background: "var(--film-2)",
            borderTop: "1px solid var(--hair)",
            borderBottom: "1px solid var(--hair)",
            padding: "120px 24px 100px",
          }}
        >
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <SectionLabel num="VII" name="THE COST · THE CROWDS · THE GROUND" />

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
                        <h3
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
                        </h3>
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
                  {dest.editor_stay_picks.map((p: any) => (
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
                      <h3
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
                      </h3>
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
                            color: "var(--vermillion)",
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
              />
            </div>

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
           ACT IX — The Field (Reviews + Q&A + Notes)
           ─────────────────────────────────────────────── */}
        <section
          id="dest-act-9"
          style={{
            background: "var(--film-2)",
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
                        <h3
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
                        </h3>
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

            {/* Reviews — inline cinematic. Italic serif quote with mono
                star/date metadata; replaces production rounded review
                cards with editorial typography. */}
            {dest.reviews?.length > 0 && (
              <div style={{ maxWidth: 1100, margin: "60px auto 0" }}>
                <p
                  className="nq-kicker"
                  style={{
                    color: "var(--vermillion)",
                    marginBottom: 24,
                  }}
                >
                  REVIEWS · {dest.reviews.length}
                </p>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fit, minmax(360px, 1fr))",
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

            {/* Traveler notes */}
            {dest.traveler_notes?.length > 0 && (
              <div style={{ maxWidth: 1100, margin: "60px auto 0" }}>
                <TravelerNotes notes={dest.traveler_notes} />
              </div>
            )}

            {/* Questions */}
            {answeredQuestions.length > 0 && (
              <div style={{ maxWidth: 1100, margin: "60px auto 0" }}>
                <p
                  className="nq-kicker"
                  style={{
                    color: "var(--vermillion)",
                    marginBottom: 16,
                  }}
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

            {/* Submission forms */}
            <div
              style={{
                maxWidth: 1100,
                margin: "60px auto 0",
                display: "grid",
                gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)",
                gap: 48,
              }}
            >
              <ReviewForm destinationId={dest.id} />
              <QuestionForm destinationId={dest.id} />
            </div>
          </div>
        </section>

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
           ACT XI — The Coda (Collections, Routes, Ask, Share)
           ─────────────────────────────────────────────── */}
        <section
          id="dest-act-11"
          style={{
            background: "var(--film-2)",
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

            {/* Action row — share / WhatsApp / compare / suggest edit */}
            <div
              style={{
                maxWidth: 720,
                margin: "60px auto 0",
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
              <SuggestEditButton
                targetTable="destinations"
                targetId={dest.id}
                context={`destination · ${displayName}`}
              />
              <Link href={`/${locale}/explore`} style={ctaSecondary}>
                BACK TO ATLAS
              </Link>
              <Link href={`/${locale}/methodology`} style={ctaPrimary}>
                HOW WE SCORE →
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <DestinationScrollRail />
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
