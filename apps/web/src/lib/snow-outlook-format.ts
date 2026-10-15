/**
 * snow-outlook-format.ts — types and pure formatting for the snow outlook.
 * No Supabase import, so the client-side destination notice can use it
 * without pulling the database client into the browser bundle.
 */

export type SnowModelDetail = { id: string; label: string; snow_mm: number; precip_mm: number; min_temp_c: number; vote: boolean };
export type SnowImd = {
  centre: string | null;
  url: string | null;
  issued: string | null;
  status: "agrees" | "mentions" | "silent" | "stale" | "unavailable" | "not-covered";
  quote: string | null;
  district_named?: boolean;
  scope?: "heavy-warnings-only" | "full-forecast";
};
export type SnowOutlook = {
  id: number;
  run_date: string;
  run_at: string;
  point_id: string;
  point_kind: "destination" | "pass";
  region_id: string;
  window_start: string;
  window_end: string;
  peak_date: string;
  confidence: "likely" | "possible";
  models_agree: number;
  models_total: number;
  snow_cm_low: number | null;
  snow_cm_high: number | null;
  model_detail: SnowModelDetail[];
  imd: SnowImd;
  outcome: "pending" | "confirmed" | "unconfirmed";
  outcome_note: string | null;
  outcome_source_url: string | null;
};
export type SnowPoint = { id: string; name: string; name_hi: string | null; kind: "destination" | "pass"; region_id: string; elevation_m: number; road: string | null };
export type SnowOutlookView = {
  lastRun: { run_date: string; run_at: string; points: number } | null;
  stale: boolean;
  outlooks: (SnowOutlook & { point: SnowPoint | null })[];
};
export type SnowTrackRecord = { since: string | null; events: number; confirmed: number; unconfirmed: number; pending: number };

// Dates are formatted by hand, not with toLocaleString: Node's ICU and the browser's
// disagree on small details, and the destination notice is a client component, so any
// difference is a hydration error (seen on Hemkund's page, 2026-10-16).
const EN_DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const HI_DAYS = ["रवि", "सोम", "मंगल", "बुध", "गुरु", "शुक्र", "शनि"];
const EN_MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const HI_MONTHS = ["जन॰", "फ़र॰", "मार्च", "अप्रैल", "मई", "जून", "जुल॰", "अग॰", "सित॰", "अक्टू॰", "नव॰", "दिस॰"];

/** "Fri, 16 Oct" / "शुक्र, 16 अक्टू॰" for an IST calendar date. */
export function fmtSnowDay(iso: string, locale: string) {
  const [y, m, d] = iso.split("-").map(Number);
  const dow = new Date(Date.UTC(y, m - 1, d)).getUTCDay();
  return locale === "hi" ? `${HI_DAYS[dow]}, ${d} ${HI_MONTHS[m - 1]}` : `${EN_DAYS[dow]}, ${d} ${EN_MONTHS[m - 1]}`;
}

/** "16 Oct, 04:42" in IST for a timestamp. */
export function fmtSnowTime(isoTs: string, locale: string) {
  const t = new Date(Date.parse(isoTs) + 5.5 * 3600_000);
  const hh = String(t.getUTCHours()).padStart(2, "0"), mm = String(t.getUTCMinutes()).padStart(2, "0");
  const mon = (locale === "hi" ? HI_MONTHS : EN_MONTHS)[t.getUTCMonth()];
  return `${t.getUTCDate()} ${mon}, ${hh}:${mm}`;
}

export function snowWindowText(o: Pick<SnowOutlook, "window_start" | "window_end">, locale: string) {
  return o.window_start === o.window_end
    ? fmtSnowDay(o.window_start, locale)
    : `${fmtSnowDay(o.window_start, locale)} – ${fmtSnowDay(o.window_end, locale)}`;
}

export function snowAmountText(o: Pick<SnowOutlook, "snow_cm_low" | "snow_cm_high">, locale: string) {
  const hi = locale === "hi";
  if (o.snow_cm_low == null || o.snow_cm_high == null) return null;
  if (o.snow_cm_high < 1) return hi ? "हल्की बर्फ़" : "a dusting";
  const range = o.snow_cm_low === o.snow_cm_high ? `${o.snow_cm_low}` : `${o.snow_cm_low}–${o.snow_cm_high}`;
  return hi ? `लगभग ${range} सेमी (मॉडल अनुमान)` : `roughly ${range} cm (model estimate)`;
}

/** What IMD said, stated only as far as the bulletin states it. */
export function imdLine(o: Pick<SnowOutlook, "imd">, locale: string): { text: string; quote: string | null; url: string | null } | null {
  const hi = locale === "hi";
  const i = o.imd;
  if (!i || i.status === "not-covered" || !i.centre) return null;
  const when = i.issued ? fmtSnowDay(i.issued, locale) : "";
  switch (i.status) {
    case "agrees":
      // Only when IMD names this district AND a date inside the window (scripts/_lib/imd-bulletins.mjs).
      return { text: hi ? `${i.centre} भी यही कहता है (${when} का बुलेटिन):` : `${i.centre} agrees (bulletin of ${when}):`, quote: i.quote, url: i.url };
    case "mentions":
      // IMD forecasts snow, but not for this district on these dates: shown as context, never as agreement.
      return {
        // Say exactly what is missing: the dates (district named) or the district itself.
        text: i.district_named
          ? hi
            ? `${i.centre} का ${when} का बुलेटिन इस ज़िले में बर्फ़ की बात करता है, पर इन तारीख़ों का नाम नहीं लेता:`
            : `${i.centre}'s bulletin of ${when} forecasts snow in this district but does not name these dates:`
          : hi
            ? `${i.centre} का ${when} का बुलेटिन बर्फ़ की बात करता है, पर इस ज़िले के लिए अलग से नहीं:`
            : `${i.centre}'s bulletin of ${when} forecasts snow, but not specifically for this district:`,
        quote: i.quote, url: i.url,
      };
    case "silent":
      return {
        text: i.scope === "heavy-warnings-only"
          ? hi ? `${i.centre} के ${when} के बुलेटिन में भारी बर्फ़ की कोई चेतावनी नहीं है (यह बुलेटिन सिर्फ़ भारी बर्फ़ की चेतावनी देता है)।` : `${i.centre}'s bulletin of ${when} carries no heavy-snow warning (it lists heavy snow only).`
          : hi ? `${i.centre} के ${when} के बुलेटिन में यहाँ के लिए बर्फ़ का पूर्वानुमान नहीं है।` : `${i.centre}'s bulletin of ${when} does not forecast snow that applies here.`,
        quote: null, url: i.url,
      };
    case "stale":
      return { text: hi ? `${i.centre} का ताज़ा बुलेटिन दो दिन से पुराना है, इसलिए हमने उसे नहीं गिना।` : `${i.centre}'s latest bulletin is more than two days old, so we have not counted it.`, quote: null, url: i.url };
    case "unavailable":
      return { text: hi ? `इस बार ${i.centre} का बुलेटिन पढ़ा नहीं जा सका।` : `${i.centre}'s bulletin could not be read on this run.`, quote: null, url: i.url };
    default:
      return null;
  }
}

