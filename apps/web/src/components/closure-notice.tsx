"use client";

import { useSyncExternalStore } from "react";

type NoticeFields = {
  notice_text?: string | null;
  notice_source_url?: string | null;
  notice_posted_at?: string | null;
  notice_expires_at?: string | null;
};

const subscribeNever = () => () => {};

/**
 * A dated, sourced notice that something at this destination is temporarily
 * closed or restricted (destinations.notice_*, migration 113).
 *
 * It is posted through the correction approval queue, never typed into
 * evergreen copy. On 2026-10-12 a Courtallam closure had to be hand-written
 * into the October prose because there was nowhere else to put it, and then
 * somebody had to remember to take it out again.
 *
 * These pages are cached (24h for a destination, 30 days for a month page), so
 * the server cannot be relied on to drop a lapsed notice. The browser does:
 * past its expiry this renders nothing. The daily watchdog then clears the row
 * and revalidates, which is what takes it out of the cached HTML.
 */
export function ClosureNotice({
  dest,
  locale,
  onPhoto = false,
  className = "",
}: {
  dest: NoticeFields | null | undefined;
  locale: string;
  /** Sits over a hero photograph: needs its own dark ground to stay readable. */
  onPhoto?: boolean;
  className?: string;
}) {
  const expiresAt = dest?.notice_expires_at ?? null;
  const lapsed = useSyncExternalStore(
    subscribeNever,
    () => !expiresAt || Date.parse(expiresAt) < Date.now(),
    () => !expiresAt,
  );

  const text = dest?.notice_text?.trim();
  if (!text || lapsed) return null;

  const isHi = locale === "hi";
  const posted = dest?.notice_posted_at
    ? new Date(dest.notice_posted_at).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
        timeZone: "Asia/Kolkata",
      })
    : null;
  const source =
    dest?.notice_source_url && /^https?:\/\//.test(dest.notice_source_url) ? dest.notice_source_url : null;

  return (
    <aside
      role="note"
      aria-label={isHi ? "सूचना" : "Notice"}
      className={`rounded-2xl border p-4 text-left sm:p-5 ${
        onPhoto ? "border-amber-400/70 bg-black/80 text-white backdrop-blur-sm" : "border-amber-500/40 bg-amber-500/10"
      } ${className}`}
    >
      <p
        className={`font-mono text-[11px] uppercase tracking-[0.08em] ${
          onPhoto ? "text-amber-400" : "text-amber-600 dark:text-amber-500"
        }`}
      >
        {isHi ? "सूचना" : "Notice"}
      </p>
      <p className="mt-1.5 text-sm leading-relaxed">{text}</p>
      {(posted || source) && (
        <p className="mt-2 text-xs opacity-70">
          {posted && (isHi ? `${posted} को दर्ज` : `Posted ${posted}`)}
          {posted && source && " · "}
          {source && (
            <a href={source} target="_blank" rel="noopener noreferrer nofollow" className="underline underline-offset-2">
              {isHi ? "स्रोत" : "Source"}
            </a>
          )}
        </p>
      )}
    </aside>
  );
}
