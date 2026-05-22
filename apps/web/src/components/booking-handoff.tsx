"use client";

import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";

import { KEY_EVENTS, track } from "@/lib/analytics";
import { isAffiliateActive } from "@/lib/affiliate";
import { getBookingLinks } from "@/lib/booking-links";
import { getExperienceLinks } from "@/lib/experience-links";

export function BookingHandoff({
  destinationName,
  stateName,
  destinationId,
}: {
  destinationName: string;
  stateName?: string;
  /** Destination id slug — enables per-destination link overrides. */
  destinationId?: string;
}) {
  const t = useTranslations("bookingHandoff");
  const locale = useLocale();

  const dest = { id: destinationId, name: destinationName, state: stateName };
  const bookingLinks = getBookingLinks(dest);
  const experienceLinks = getExperienceLinks(dest);

  return (
    <div className="rounded-2xl border border-border bg-muted/30 p-5 sm:p-6">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-bold sm:text-lg">{t("stayHeading")}</h3>
          <p className="mt-1 text-xs text-muted-foreground sm:text-sm">{t("staySub")}</p>
        </div>
        <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-2.5 py-1 text-[11px] font-semibold tracking-wide text-emerald-300">
          <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75 motion-reduce:hidden" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
          </span>
          {t("notSponsored")}
        </span>
      </div>
      <div className="flex flex-wrap gap-2.5">
        {bookingLinks.map((link) => (
          <a
            key={link.platform}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer sponsored"
            onClick={() =>
              track(KEY_EVENTS.OUTBOUND_BOOKING_CLICK, {
                partner: link.name,
                destination: destinationName,
                state: stateName ?? "",
                affiliate_active: link.affiliate ? isAffiliateActive(link.affiliate) : false,
              })
            }
            className={`rounded-full border px-4 py-2.5 text-sm font-semibold transition-all ${link.color}`}
          >
            {link.name} →
          </a>
        ))}
      </div>

      {/* Tours & experiences — 30-day-cookie affiliates, see experience-links.ts */}
      <div className="mt-6 border-t border-border/60 pt-5">
        <h3 className="text-base font-bold sm:text-lg">{t("expHeading")}</h3>
        <p className="mt-1 text-xs text-muted-foreground sm:text-sm">{t("expSub")}</p>
        <div className="mt-4 flex flex-wrap gap-2.5">
          {experienceLinks.map((link) => (
            <a
              key={link.platform}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer sponsored"
              onClick={() =>
                track(KEY_EVENTS.OUTBOUND_EXPERIENCE_CLICK, {
                  partner: link.name,
                  destination: destinationName,
                  state: stateName ?? "",
                  affiliate_active: isAffiliateActive(link.affiliate),
                })
              }
              className={`rounded-full border px-4 py-2.5 text-sm font-semibold transition-all ${link.color}`}
            >
              {link.name} →
            </a>
          ))}
        </div>
      </div>

      {/* Affiliate disclosure — mandated by Master Playbook §4.5 */}
      <p className="mt-5 text-[11px] leading-relaxed text-muted-foreground/80">
        {t.rich("disclosure", {
          policy: (chunks) => (
            <Link
              href={`/${locale}/editorial-policy`}
              className="underline underline-offset-2 hover:text-foreground"
            >
              {chunks}
            </Link>
          ),
        })}
      </p>
    </div>
  );
}
