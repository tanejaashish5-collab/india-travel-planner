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
import { useLocale } from "next-intl";
import { destinationImage } from "@/lib/image-url";
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

// Existing feature components — preserved verbatim, just re-framed
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

      {/* Persistent SOS button — scrolls to the act-V emergency block. */}
      {dest.emergencySos && (
        <SOSFloatingButton
          onClick={() => {
            document
              .getElementById("dest-act-5")
              ?.scrollIntoView({ behavior: "smooth", block: "start" });
          }}
        />
      )}

      <main
        id="main-content"
        className="nq-grain"
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
          {/* Hero image */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 0,
              backgroundImage: `url("${destinationImage(dest.id, 2400)}")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              animation: "nq-kb-1 22s ease-out forwards",
            }}
          />
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

            <EditorialCaption align="right">
              <span style={{ marginTop: 18, display: "inline-block" }}>
                COLOURS MATCH THE NAKSHIQ VERDICT BANDS · TAP A MONTH FOR THE
                FULL READ
              </span>
            </EditorialCaption>

            {/* Existing MonthlyChart — preserved as detail strip below */}
            <div style={{ maxWidth: 1100, margin: "60px auto 0" }}>
              <MonthlyChart scores={monthlyScores} />
            </div>

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
                <p
                  className="nq-kicker"
                  style={{
                    color: "var(--vermillion)",
                    marginBottom: 16,
                  }}
                >
                  LIVE WEATHER
                </p>
                <WeatherWidget destinationId={dest.id} />
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

            {/* Kids breakdown */}
            {kf && (
              <div style={{ maxWidth: 1100, margin: "60px auto 0" }}>
                <p
                  className="nq-kicker"
                  style={{
                    color: "var(--vermillion)",
                    marginBottom: 16,
                  }}
                >
                  KIDS · FAMILY READ
                </p>
                <KidsBadge {...kf} />
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

            {/* Sub-destinations / POI */}
            {pois.length > 0 && (
              <div style={{ maxWidth: 1100, margin: "32px auto 0" }}>
                <POISection pois={pois} destName={displayName} />
              </div>
            )}

            {/* Sub-destinations as editorial entries */}
            {dest.sub_destinations?.length > 0 && (
              <div style={{ maxWidth: 720, margin: "60px auto 0" }}>
                <p
                  className="nq-kicker"
                  style={{
                    color: "var(--vermillion)",
                    marginBottom: 16,
                  }}
                >
                  PLACES WITHIN {dest.name.toUpperCase()}
                </p>
                {dest.sub_destinations.map((sub: any) => (
                  <EditorialEntry
                    key={sub.name}
                    title={sub.name}
                    body={sub.description ?? sub.note}
                    meta={sub.distance_km ? `${sub.distance_km} KM` : undefined}
                  />
                ))}
              </div>
            )}

            {/* Hidden gems */}
            {dest.hidden_gems?.length > 0 && (
              <div style={{ maxWidth: 720, margin: "60px auto 0" }}>
                <p
                  className="nq-kicker"
                  style={{
                    color: "var(--vermillion)",
                    marginBottom: 16,
                  }}
                >
                  HIDDEN GEMS · NEAR HERE
                </p>
                {dest.hidden_gems.map((gem: any) => (
                  <EditorialEntry
                    key={gem.id ?? gem.name}
                    title={gem.name}
                    body={gem.description}
                    meta={gem.distance_km ? `${gem.distance_km} KM` : undefined}
                  />
                ))}
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

            {/* Cost grid */}
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
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                    gap: 0,
                    border: "1px solid var(--hair)",
                  }}
                >
                  {Object.entries(dest.daily_cost as Record<string, any>).map(
                    ([k, v], i, arr) => (
                      <div
                        key={k}
                        style={{
                          padding: "24px",
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
                            color: "var(--bone-faint)",
                            letterSpacing: "0.18em",
                            marginBottom: 8,
                            textTransform: "uppercase",
                          }}
                        >
                          {k.replace(/_/g, " ")}
                        </div>
                        <div
                          style={{
                            fontFamily: "var(--cinema-mono)",
                            fontSize: 22,
                            color: "var(--bone)",
                            fontWeight: 600,
                          }}
                        >
                          {typeof v === "object" && v !== null
                            ? JSON.stringify(v).slice(0, 60)
                            : String(v)}
                        </div>
                      </div>
                    ),
                  )}
                </div>
              </div>
            )}

            {/* Crowd calendar */}
            {dest.crowd_calendar && (
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
                <Prose>
                  <p>
                    {typeof dest.crowd_calendar === "string"
                      ? dest.crowd_calendar
                      : dest.crowd_calendar.note ?? ""}
                  </p>
                </Prose>
              </div>
            )}

            {/* Infrastructure as editorial entries */}
            {dest.local_logistics && (
              <div style={{ maxWidth: 720, margin: "60px auto 0" }}>
                <p
                  className="nq-kicker"
                  style={{
                    color: "var(--vermillion)",
                    marginBottom: 16,
                  }}
                >
                  INFRASTRUCTURE · ON THE GROUND
                </p>
                {Object.entries(
                  dest.local_logistics as Record<string, any>,
                ).map(([k, v]) => (
                  <EditorialEntry
                    key={k}
                    title={k.replace(/_/g, " ")}
                    body={
                      typeof v === "string" ? v : JSON.stringify(v).slice(0, 200)
                    }
                  />
                ))}
              </div>
            )}

            {/* How to reach */}
            {(dest.nearest_airport || dest.nearest_railhead) && (
              <div style={{ maxWidth: 720, margin: "60px auto 0" }}>
                <p
                  className="nq-kicker"
                  style={{
                    color: "var(--vermillion)",
                    marginBottom: 16,
                  }}
                >
                  HOW TO REACH
                </p>
                {dest.nearest_airport && (
                  <EditorialEntry
                    title="Nearest airport"
                    body={
                      typeof dest.nearest_airport === "string"
                        ? dest.nearest_airport
                        : JSON.stringify(dest.nearest_airport).slice(0, 200)
                    }
                  />
                )}
                {dest.nearest_railhead && (
                  <EditorialEntry
                    title="Nearest railhead"
                    body={
                      typeof dest.nearest_railhead === "string"
                        ? dest.nearest_railhead
                        : JSON.stringify(dest.nearest_railhead).slice(0, 200)
                    }
                  />
                )}
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

            {/* Eateries */}
            {eateries.length > 0 && (
              <div style={{ maxWidth: 1100, margin: "32px auto 0" }}>
                <DestinationEateries
                  eateries={eateries}
                  destinationName={displayName}
                />
              </div>
            )}

            {/* Editor stay picks */}
            {dest.editor_stay_picks?.length > 0 && (
              <div style={{ maxWidth: 1100, margin: "60px auto 0" }}>
                <EditorsPicks
                  destinationName={displayName}
                  stateName={stateName}
                  picks={dest.editor_stay_picks}
                  intelligence={dest.stay_intelligence}
                />
              </div>
            )}

            {/* Local stays — booking-handoff component handles its own data fetch */}
            <div style={{ maxWidth: 1100, margin: "60px auto 0" }}>
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

            {/* Trip reports */}
            {dest.trip_reports?.length > 0 && (
              <div style={{ maxWidth: 1100, margin: "32px auto 0" }}>
                <p
                  className="nq-kicker"
                  style={{
                    color: "var(--vermillion)",
                    marginBottom: 16,
                  }}
                >
                  RECENT TRIP REPORTS
                </p>
                <TravelerReports
                  reports={dest.trip_reports}
                  destinationId={dest.id}
                  destinationName={displayName}
                  locale={locale}
                />
              </div>
            )}

            {/* Reviews */}
            {dest.reviews?.length > 0 && (
              <div style={{ maxWidth: 1100, margin: "60px auto 0" }}>
                <p
                  className="nq-kicker"
                  style={{
                    color: "var(--vermillion)",
                    marginBottom: 16,
                  }}
                >
                  REVIEWS
                </p>
                <ReviewsList reviews={dest.reviews} />
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

            {dest.local_logistics && (
              <div style={{ maxWidth: 1100, margin: "60px auto 0" }}>
                <LogisticsChecklist data={dest.local_logistics} />
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
