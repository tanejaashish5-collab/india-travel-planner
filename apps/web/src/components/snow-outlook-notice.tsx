"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { fmtSnowTime, imdLine, snowAmountText, snowWindowText, type SnowOutlook } from "@/lib/snow-outlook-format";

const subscribeNever = () => () => {};


/**
 * Snow outlook on a destination page (migration 114). Same expiry discipline as
 * ClosureNotice: the page is cached for 24h, so the browser hides the notice
 * once its window has passed; scripts/snow-outlook.mjs also revalidates the
 * page whenever this destination's outlook appears or drops.
 */
export function SnowOutlookNotice({
  outlook,
  locale,
  onPhoto = false,
  className = "",
}: {
  outlook: SnowOutlook | null | undefined;
  locale: string;
  onPhoto?: boolean;
  className?: string;
}) {
  const windowEnd = outlook?.window_end ?? null;
  const runAt = outlook?.run_at ?? null;
  // Hide past the window's last IST day, OR when the forecast itself is over 36 h old:
  // the page is cached for 24 h, so if the job stops, an old forecast must not sit
  // here looking current (review 2026-10-16).
  const lapsed = useSyncExternalStore(
    subscribeNever,
    () => !windowEnd || Date.parse(`${windowEnd}T23:59:59+05:30`) < Date.now() || !runAt || Date.now() - Date.parse(runAt) > 36 * 3600_000,
    () => !windowEnd,
  );
  if (!outlook || lapsed) return null;

  const hi = locale === "hi";
  const likely = outlook.confidence === "likely";
  const amount = snowAmountText(outlook, locale);
  const imd = imdLine(outlook, locale);

  return (
    <aside
      role="note"
      aria-label={hi ? "बर्फ़ का अनुमान" : "Snow outlook"}
      className={`rounded-2xl border p-4 text-left sm:p-5 ${
        onPhoto ? "border-sky-300/70 bg-black/80 text-white backdrop-blur-sm" : "border-sky-500/40 bg-sky-500/10"
      } ${className}`}
    >
      <p className={`font-mono text-[11px] uppercase tracking-[0.08em] ${onPhoto ? "text-sky-300" : "text-sky-700 dark:text-sky-400"}`}>
        {hi ? "बर्फ़ का अनुमान" : "Snow outlook"}
      </p>
      <p className="mt-1.5 text-sm leading-relaxed">
        {hi
          ? `${snowWindowText(outlook, locale)}: बर्फ़ ${likely ? "संभावित" : "मुमकिन"}। ${outlook.models_total} में से ${outlook.models_agree} मौसम मॉडल यहाँ बर्फ़ दिखा रहे हैं${amount ? `, ${amount}` : ""}।`
          : `Snow ${likely ? "likely" : "possible"} ${snowWindowText(outlook, locale)}. ${outlook.models_agree} of ${outlook.models_total} weather models show it at this altitude${amount ? `, ${amount}` : ""}.`}
      </p>
      {imd && (
        <p className="mt-1.5 text-xs leading-relaxed opacity-80">
          {imd.text}
          {imd.quote && <> “{imd.quote}”</>}
        </p>
      )}
      <p className="mt-2 text-xs opacity-70">
        {hi ? "पूर्वानुमान, ख़बर नहीं। " : "A forecast, not a report. "}
        {runAt && (
          <>
            {hi ? `अपडेट ${fmtSnowTime(runAt, locale)}। ` : `Updated ${fmtSnowTime(runAt, locale)} IST. `}
          </>
        )}
        <Link href={`/${locale}/snow`} className="underline underline-offset-2">
          {hi ? "बर्फ़ का पूरा अनुमान और तरीका" : "Snow forecast and method"}
        </Link>
        {imd?.url && (
          <>
            {" · "}
            <a href={imd.url} target="_blank" rel="noopener noreferrer nofollow" className="underline underline-offset-2">
              {hi ? "IMD बुलेटिन" : "IMD bulletin"}
            </a>
          </>
        )}
      </p>
    </aside>
  );
}
