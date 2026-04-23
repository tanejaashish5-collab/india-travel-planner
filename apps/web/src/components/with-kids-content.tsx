"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { FadeIn, SlideIn, ScrollReveal, StaggerContainer, StaggerItem } from "./animated-hero";
import { SCORE_COLORS } from "@/lib/design-tokens";

const MONTH_NAMES = [
  "",
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

interface WithKidsContentProps {
  dest: any;
  locale: string;
  kidsData: any;
  confidenceData: any;
  months: any[];
  stateName: string;
}

export function WithKidsContent({
  dest,
  locale,
  kidsData,
  confidenceData,
  months,
  stateName,
}: WithKidsContentProps) {
  const tp = useTranslations("page");
  const kf = kidsData;
  const cc = confidenceData;

  // Determine family-relevant warnings
  const warnings: string[] = [];
  if (dest.elevation_m && dest.elevation_m > 3000) {
    warnings.push(
      `High altitude (${dest.elevation_m.toLocaleString()}m) — children are more susceptible to altitude sickness. Acclimatize carefully.`
    );
  }
  if (dest.difficulty === "hard" || dest.difficulty === "extreme") {
    warnings.push(
      `${dest.difficulty.charAt(0).toUpperCase() + dest.difficulty.slice(1)} terrain — not suitable for toddlers or children with limited hiking experience.`
    );
  }
  const ccEmergency = typeof cc?.emergency === "object"
    ? [cc.emergency.nearest_hospital, cc.emergency.ambulance, cc.emergency.rescue, cc.emergency.police_station, cc.emergency.helpline].filter(Boolean).join(". ")
    : cc?.emergency ?? "";
  const ccNetwork = typeof cc?.network === "object"
    ? [cc.network.note, cc.network.jio && "Jio available", cc.network.bsnl && "BSNL available", cc.network.vi && "Vi available", cc.network.airtel && "Airtel available", cc.network.wifi_available && "WiFi available"].filter(Boolean).join(". ")
    : cc?.network ?? "";
  const ccReach = typeof cc?.reach === "object"
    ? (cc.reach.road_condition || cc.reach.from_nearest_city || cc.reach.public_transport || "See destination guide")
    : cc?.reach ?? "";
  if (ccEmergency && ccEmergency.toLowerCase().includes("far")) {
    warnings.push(`Medical access is limited: ${ccEmergency}`);
  }
  if (ccNetwork && (ccNetwork.toLowerCase().includes("no signal") || ccNetwork.toLowerCase().includes("patchy"))) {
    warnings.push(`Connectivity is unreliable: ${ccNetwork}`);
  }
  if (ccReach && ccReach.toLowerCase().includes("narrow")) {
    warnings.push(`Road conditions may be stressful for car-sick children: ${ccReach}`);
  }

  // Family-friendly activities from reasons
  const activities: string[] = kf?.reasons ?? [];

  // Best family months (score >= 4)
  const bestFamilyMonths = months.filter((m: any) => m.score >= 4);
  const okMonths = months.filter((m: any) => m.score === 3);
  const avoidMonths = months.filter((m: any) => m.score <= 2 && m.score > 0);

  return (
    <article className="space-y-10">
      {/* Breadcrumb */}
      <FadeIn>
        <nav className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link
            href={`/${locale}/explore`}
            className="hover:text-foreground transition-colors"
          >
            Destinations
          </Link>
          <span>/</span>
          <Link
            href={`/${locale}/destination/${dest.id}`}
            className="hover:text-foreground transition-colors"
          >
            {dest.name}
          </Link>
          <span>/</span>
          <span className="text-foreground">With Kids</span>
        </nav>
      </FadeIn>

      {/* Hero image */}
      <FadeIn>
        <div className="relative h-48 sm:h-64 rounded-2xl overflow-hidden bg-muted/30">
          <Image
            src={`/images/destinations/${dest.id}.jpg`}
            alt={`Family travel guide for ${dest.name} — scenic view of the destination`}
            fill
            sizes="100vw"
            className="object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <h1 className="text-2xl font-semibold sm:text-3xl lg:text-4xl text-white drop-shadow-lg">
              {dest.name} with Kids — Family Travel Guide
            </h1>
            <p className="mt-1 text-white/80 text-sm sm:text-base">
              {stateName}, India
              {dest.elevation_m && (
                <span className="font-mono">
                  {" "}
                  &middot; {dest.elevation_m.toLocaleString()}m
                </span>
              )}
              <span> &middot; {dest.difficulty} difficulty</span>
            </p>
          </div>
        </div>
      </FadeIn>

      {/* Kids Rating Hero */}
      <SlideIn delay={0.1}>
        <div
          className={`rounded-2xl border p-6 sm:p-8 ${
            kf?.suitable
              ? "border-emerald-500/30 bg-emerald-500/5"
              : kf
                ? "border-orange-500/30 bg-orange-500/5"
                : "border-border bg-card"
          }`}
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-4xl">
                  {kf?.suitable ? "\uD83D\uDC76" : "\u26A0\uFE0F"}
                </span>
                <div>
                  <div className="text-3xl font-bold font-mono">
                    {kf?.rating ?? "N/A"}/5
                  </div>
                  <div className="text-sm font-medium text-muted-foreground">
                    Kids Friendliness Rating
                  </div>
                </div>
              </div>
              <p
                className={`text-lg font-semibold ${
                  kf?.suitable ? "text-emerald-400" : "text-orange-400"
                }`}
              >
                {kf?.suitable
                  ? "Suitable for families with children"
                  : "Not recommended for young children"}
              </p>
            </div>
            {/* Dot rating visual */}
            <div className="flex gap-1.5">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className={`h-4 w-4 rounded-full ${
                    i <= (kf?.rating ?? 0)
                      ? kf?.suitable
                        ? "bg-emerald-400"
                        : "bg-orange-400"
                      : "bg-zinc-700"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Family verdict — column-gated editorial pick */}
          {kf?.family_verdict && (
            <div className={`mt-6 rounded-2xl border bg-gradient-to-br p-5 ${
              kf.suitable
                ? "border-emerald-500/40 from-emerald-950/40 to-emerald-900/10"
                : "border-orange-500/40 from-orange-950/40 to-orange-900/10"
            }`}>
              <div className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-70 mb-2">
                Family verdict
              </div>
              <p className="text-base leading-relaxed text-foreground">{kf.family_verdict}</p>
            </div>
          )}

          {/* Reasons */}
          {activities.length > 0 && (
            <div className="mt-6">
              <h2 className="text-lg font-semibold mb-3">
                Why this rating?
              </h2>
              <ul className="space-y-2">
                {activities.map((reason: string, idx: number) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 text-muted-foreground"
                  >
                    <span
                      className={`mt-0.5 ${
                        kf?.suitable ? "text-emerald-400" : "text-orange-400"
                      }`}
                    >
                      {kf?.suitable ? "\u2713" : "\u2717"}
                    </span>
                    {reason}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </SlideIn>

      {/* Month-by-month family suitability */}
      {months.length > 0 && (
        <ScrollReveal>
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">
              Month-by-Month Family Suitability
            </h2>
            <p className="text-muted-foreground">
              Travel scores account for weather, road conditions, and crowd
              levels. Higher scores mean a better experience for families.
            </p>

            {/* Best months */}
            {bestFamilyMonths.length > 0 && (
              <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-5">
                <h3 className="font-bold text-emerald-400 mb-3">
                  Best months for families (score 4-5)
                </h3>
                <div className="grid gap-2 sm:grid-cols-2">
                  {bestFamilyMonths.map((m: any) => (
                    <Link
                      key={m.month}
                      href={`/${locale}/destination/${dest.id}/${MONTH_NAMES[m.month]?.toLowerCase()}`}
                      className="flex items-center justify-between rounded-lg border border-emerald-500/20 bg-background/50 px-4 py-3 hover:border-emerald-500/40 transition-colors"
                    >
                      <span className="font-medium">
                        {MONTH_NAMES[m.month]}
                      </span>
                      <span
                        className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${SCORE_COLORS[m.score] ?? SCORE_COLORS[0]}`}
                      >
                        {m.score}/5
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Okay months */}
            {okMonths.length > 0 && (
              <div className="rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-5">
                <h3 className="font-bold text-yellow-400 mb-3">
                  Doable months (score 3)
                </h3>
                <div className="grid gap-2 sm:grid-cols-2">
                  {okMonths.map((m: any) => (
                    <Link
                      key={m.month}
                      href={`/${locale}/destination/${dest.id}/${MONTH_NAMES[m.month]?.toLowerCase()}`}
                      className="flex items-center justify-between rounded-lg border border-yellow-500/20 bg-background/50 px-4 py-3 hover:border-yellow-500/40 transition-colors"
                    >
                      <span className="font-medium">
                        {MONTH_NAMES[m.month]}
                      </span>
                      <span
                        className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${SCORE_COLORS[3]}`}
                      >
                        {m.score}/5
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Avoid months */}
            {avoidMonths.length > 0 && (
              <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-5">
                <h3 className="font-bold text-red-400 mb-3">
                  Avoid with kids (score 1-2)
                </h3>
                <div className="grid gap-2 sm:grid-cols-2">
                  {avoidMonths.map((m: any) => (
                    <div
                      key={m.month}
                      className="flex items-center justify-between rounded-lg border border-red-500/20 bg-background/50 px-4 py-3"
                    >
                      <span className="font-medium text-muted-foreground">
                        {MONTH_NAMES[m.month]}
                      </span>
                      <span
                        className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${SCORE_COLORS[m.score] ?? SCORE_COLORS[0]}`}
                      >
                        {m.score}/5
                      </span>
                    </div>
                  ))}
                </div>
                {avoidMonths[0]?.note && (
                  <p className="mt-3 text-sm text-muted-foreground italic">
                    {avoidMonths[0].note}
                  </p>
                )}
              </div>
            )}

            {/* Full 12-month strip */}
            <div className="mt-4">
              <div
                className="flex gap-0.5"
                title="Monthly scores: green = best, red = avoid"
              >
                {Array.from({ length: 12 }, (_, i) => {
                  const m = i + 1;
                  const md = months.find((dm: any) => dm.month === m);
                  const s = md?.score ?? 0;
                  const dotColor =
                    s >= 4
                      ? "bg-emerald-400"
                      : s === 3
                        ? "bg-yellow-400"
                        : s >= 1
                          ? "bg-red-400"
                          : "bg-muted-foreground/20";
                  return (
                    <div
                      key={m}
                      className={`h-2 flex-1 rounded-full ${dotColor}`}
                      title={`${MONTH_NAMES[m]}: ${s}/5`}
                    />
                  );
                })}
              </div>
              <div className="flex justify-between mt-1 text-xs text-muted-foreground/60">
                <span>Jan</span>
                <span>Dec</span>
              </div>
            </div>
          </div>
        </ScrollReveal>
      )}

      {/* Infrastructure Reality for Families */}
      <ScrollReveal>
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">
            {tp("infrastructureReality")}
          </h2>
          <p className="text-muted-foreground">
            What you actually need to know before taking kids to {dest.name}.
          </p>

          <StaggerContainer className="grid gap-3 sm:grid-cols-2">
            {cc?.emergency && (
              <StaggerItem>
                <div className="rounded-xl border border-border bg-card p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">{"\uD83C\uDFE5"}</span>
                    <h3 className="font-bold">{tp("hospitalEmergency")}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {typeof cc.emergency === "object"
                      ? [cc.emergency.nearest_hospital, cc.emergency.ambulance, cc.emergency.rescue, cc.emergency.police_station, cc.emergency.helpline].filter(Boolean).join(". ")
                      : cc.emergency}
                  </p>
                  {cc.safety_rating && (
                    <p className="mt-2 text-xs text-muted-foreground">
                      Safety rating: {cc.safety_rating}/5
                    </p>
                  )}
                </div>
              </StaggerItem>
            )}

            {cc?.network && (
              <StaggerItem>
                <div className="rounded-xl border border-border bg-card p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">{"\uD83D\uDCF6"}</span>
                    <h3 className="font-bold">{tp("networkConnectivity")}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {typeof cc.network === "object"
                      ? [cc.network.note, cc.network.jio && "Jio available", cc.network.bsnl && "BSNL available", cc.network.vi && "Vi available", cc.network.airtel && "Airtel available"].filter(Boolean).join(". ")
                      : cc.network}
                  </p>
                </div>
              </StaggerItem>
            )}

            {cc?.reach && (
              <StaggerItem>
                <div className="rounded-xl border border-border bg-card p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">{"\uD83D\uDEE3\uFE0F"}</span>
                    <h3 className="font-bold">{tp("roadConditions")}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {typeof cc.reach === "object"
                      ? cc.reach.from_nearest_city ||
                        cc.reach.public_transport ||
                        "See destination guide"
                      : cc.reach}
                  </p>
                </div>
              </StaggerItem>
            )}

            {dest.elevation_m && (
              <StaggerItem>
                <div className="rounded-xl border border-border bg-card p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">{"\u26F0\uFE0F"}</span>
                    <h3 className="font-bold">{tp("altitude")}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {dest.elevation_m.toLocaleString()}m above sea level.{" "}
                    {dest.elevation_m > 3500
                      ? "High altitude — children are more susceptible to altitude sickness. Acclimatize for at least a day."
                      : dest.elevation_m > 2500
                        ? "Moderate altitude. Monitor children for headaches or fatigue."
                        : "Low altitude, no altitude-related concerns for children."}
                  </p>
                </div>
              </StaggerItem>
            )}
          </StaggerContainer>
        </div>
      </ScrollReveal>

      {/* What to Watch Out For */}
      {warnings.length > 0 && (
        <ScrollReveal>
          <div className="rounded-xl border border-orange-500/20 bg-orange-500/5 p-6">
            <h2 className="text-xl font-semibold text-orange-400 mb-4">
              {tp("whatToWatchOut")}
            </h2>
            <ul className="space-y-3">
              {warnings.map((warning, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3 text-muted-foreground"
                >
                  <span className="mt-0.5 text-orange-400 shrink-0">
                    {"\u26A0\uFE0F"}
                  </span>
                  <span>{warning}</span>
                </li>
              ))}
            </ul>
          </div>
        </ScrollReveal>
      )}

      {/* Back to main destination page */}
      <ScrollReveal>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-t border-border pt-8">
          <Link
            href={`/${locale}/destination/${dest.id}`}
            className="group flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
          >
            <span className="transition-transform group-hover:-translate-x-1">
              &larr;
            </span>
            Full {dest.name} guide
          </Link>
          <Link
            href={`/${locale}/explore?kids=true`}
            className="group flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
          >
            All kid-friendly destinations
            <span className="transition-transform group-hover:translate-x-1">
              &rarr;
            </span>
          </Link>
        </div>
      </ScrollReveal>
    </article>
  );
}
