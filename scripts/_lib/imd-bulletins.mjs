/**
 * imd-bulletins.mjs — read IMD's regional forecast bulletins (PDF) and report,
 * VERBATIM, what each one says about snow, judged per watch point. Used by
 * scripts/snow-outlook.mjs as the second, independent opinion next to the six
 * global models, and by its `verify` step for IMD Shimla's measured snowfall.
 *
 * We do not interpret IMD's tables cell by cell (layouts differ per centre and
 * change without notice). We extract IMD's own sentences that pair "snow" with a
 * forecast verb, drop negations, read any dates the sentence names, and quote
 * the sentence word for word. Per point, the status is:
 *   agrees       a fresh bulletin's snow sentence names THIS point's district AND
 *                a date inside the outlook window. The only status a reel may cite.
 *   mentions     a fresh bulletin forecasts snow somewhere relevant (state-wide, or
 *                this district with no date / other dates). Shown, labelled as such.
 *   silent       fresh bulletin, no snow forecast that could apply
 *   stale        bulletin older than 2 days (IMD overwrites a fixed URL)
 *   unavailable  could not fetch or read it
 *   not-covered  no IMD centre bulletin wired for this region
 *
 * Review 2026-10-16 found the first version calling "agrees" on yesterday's date,
 * on "no snowfall is likely", and state-wide for a Lahaul-only line. Each of those
 * is now a test in scripts/snow-outlook-selftest.mjs.
 *
 * Reachability: from this Mac all six centres answered on 2026-10-16. Needs pdftotext.
 */
import { execFileSync } from "node:child_process";
import { mkdtempSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { districtNamesFor, namesPlace } from "./snow-districts.mjs";

const BASE = "https://mausam.imd.gov.in";
export const BULLETINS = {
  "himachal-pradesh": { centre: "IMD Shimla", url: `${BASE}/shimla/mcdata/Weather_Forecast_Bulletin.pdf` },
  "jammu-kashmir": { centre: "IMD Srinagar", url: `${BASE}/srinagar/mcdata/impact_fc.pdf` },
  "ladakh": { centre: "IMD Srinagar", url: `${BASE}/srinagar/mcdata/impact_fc.pdf` },
  "uttarakhand": { centre: "IMD Dehradun", url: `${BASE}/dehradun/mcdata/DISTRICT_FORECAST.pdf` },
  "sikkim": { centre: "IMD Gangtok", url: `${BASE}/gangtok/mcdata/district_fc_tabular.pdf` },
  "arunachal-pradesh": { centre: "IMD Itanagar", url: `${BASE}/itanagar/mcdata/AP_forecast.pdf` },
};

const MONTHS = { jan: 1, feb: 2, mar: 3, apr: 4, may: 5, jun: 6, jul: 7, aug: 8, sep: 9, oct: 10, nov: 11, dec: 12 };
const MONTH_RE = "(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*";
const pad = (n) => String(n).padStart(2, "0");
const iso = (y, m, d) => `${y}-${pad(m)}-${pad(d)}`;
const stripScript = (t) => t.replace(/[\u0900-\u097F]+/g, " ").replace(/[\uE000-\uF8FF\u2022\u25AA\u25CF\u25E6\u2023\u2043]/g, " "); // Devanagari runs; PDF font bullets (U+F0B7 showed as a box in a quote)

function parseDateAt(str) {
  let m = str.match(/^(\d{1,2})[-./](\d{1,2})[-./](20\d{2})/);
  if (m) return iso(m[3], m[2], m[1]);
  m = str.match(new RegExp(`^(\\d{1,2})(?:st|nd|rd|th)?[-\\s,]+${MONTH_RE}[-,\\s]+(20\\d{2})`, "i"));
  if (m) return iso(m[3], MONTHS[m[2].slice(0, 3).toLowerCase()], m[1]);
  return null;
}

/**
 * Issue date (YYYY-MM-DD). Order of trust:
 *   1. explicit labels ("Date:", "Dated:", "Date & Time of issue", "Issued") -> the most
 *      recent not after today (Srinagar's letterhead also says "Dated 29.10.2024")
 *   2. a full weekday name ("Thursday, 15th October 2026") -> the EARLIEST such date;
 *      a forecast table lists later weekdays, never earlier ones
 *   3. nothing -> null (treated as stale)
 */
export function issueDate(text, today = new Date().toISOString().slice(0, 10)) {
  const head = stripScript(text.slice(0, 3000)).replace(/\s+/g, " ");
  const after = (re) => {
    const out = [];
    for (const m of head.matchAll(re)) {
      const start = m.index + m[0].length;
      let d = parseDateAt(head.slice(start, start + 30));
      // Dehradun prints the label, then other cells, then the date ("16th October, 2026 at 18:30"):
      // look a little further for a date WRITTEN IN WORDS (numeric table cells stay out).
      if (!d) {
        const w = head.slice(start, start + 300).match(new RegExp(`\\b\\d{1,2}(?:st|nd|rd|th)?[-\\s,]+${MONTH_RE}[-,\\s]+20\\d{2}`, "i"));
        if (w) d = parseDateAt(w[0]);
      }
      if (d && d <= today) out.push(d);
    }
    return out.sort();
  };
  const explicit = after(/(?:\bDated?\b|Date\s*(?:&|and)\s*Time\s*of\s*issue|\bIssued\s*(?:on)?)\s*[:/,]?\s*[:/]?\s*/gi);
  if (explicit.length) return explicit[explicit.length - 1];
  const weekday = after(/\b(?:Mon|Tues|Wednes|Thurs|Fri|Satur|Sun)day\b\s*,?\s*/gi);
  return weekday.length ? weekday[0] : null;
}

/** Dates a sentence names: "15th October 2026", "16th and 17th October 2026", "15.10.2026", "October 16". */
export function sentenceDates(s, year) {
  // Dates written in WORDS only. Numeric "15.10.2026" inside a sentence is usually a
  // neighbouring table cell that pdftotext merged in (Dehradun layout), so it could
  // pin a sentence to the wrong day (review 2026-10-16, second pass).
  const out = new Set();
  const re = new RegExp(`((?:\\d{1,2}(?:st|nd|rd|th)?\\s*(?:,|and|&|to|-|–|/)?\\s*)+)${MONTH_RE}(?:,?\\s*(20\\d{2}))?`, "gi");
  for (const m of s.matchAll(re)) {
    const mon = MONTHS[m[2].slice(0, 3).toLowerCase()];
    const y = m[3] ?? year;
    const nums = [...m[1].matchAll(/\d{1,2}/g)].map((x) => Number(x[0]));
    const isRange = /(to|-|–)\s*\d/.test(m[1]) && nums.length === 2;
    if (isRange) for (let d = nums[0]; d <= nums[1]; d++) out.add(iso(y, mon, d));
    else for (const d of nums) if (d >= 1 && d <= 31) out.add(iso(y, mon, d));
  }
  for (const m of s.matchAll(new RegExp(`${MONTH_RE}\\s+(\\d{1,2})(?:st|nd|rd|th)?\\b`, "gi"))) out.add(iso(year, MONTHS[m[1].slice(0, 3).toLowerCase()], m[2]));
  return [...out].sort();
}

// Negation checked where it changes the meaning: "no/nil" just before "snow", "not likely"
  // or a decrease anywhere. "...on 17th October with no large change in temperatures" stays.
function negated(s) {
  const i = s.search(/snow/i);
  if (/\b(no|nil)\b/i.test(s.slice(Math.max(0, i - 40), i))) return true;
  return /\b(not|unlikely)\b|\b(decrease|decreases|decreasing|abate|abating|reduce|reducing|cease)\b/i.test(s);
}

/** IMD's own forecast sentences about snow: [{text, dates[]}], negations removed. */
export function snowSentences(text, year = new Date().getFullYear()) {
  const out = new Map();
  for (const para of stripScript(text).split(/\n\s*\n/)) {
    for (const raw of para.replace(/\s+/g, " ").split(/(?<=\.)\s+/)) {
      const s = raw.trim().replace(/^Forecast\s+/i, "").replace(/\s+([,.])/g, "$1");
      if (s.length < 25 || s.length > 400) continue;
      if (!/snow/i.test(s) || !/\b(likely|expected)\b/i.test(s)) continue;     // forecast verbs only
      if (/past\s+24|observed|was recorded|realised|Impact Based|Warnings? over/i.test(s)) continue; // observations, titles
      if (negated(s)) continue;                                                   // "no snowfall is likely", "likely to decrease"
      out.set(s, { text: s, dates: sentenceDates(s, year) });
    }
  }
  return [...out.values()].sort((a, b) => b.text.length - a.text.length).slice(0, 12);
}

/** IMD Shimla "Snowfall(cm)" observations: [{station, district, cm}] for the 24 h ending 08:30 IST. */
export function observedSnow(text) {
  const flat = text.replace(/\s+/g, " ");
  const m = flat.match(/Snowfall\s*\(cm\)\s*(.+?)(?:Thunderstorm|Gusty|Fog|Hail|Synoptic|$)/i);
  if (!m || /^\s*NIL/i.test(m[1])) return [];
  const rows = [];
  for (const seg of m[1].split(/,(?![^()]*\))/)) {
    const r = seg.match(/(?:St\.\s*)?([A-Za-z .'-]+?)\s*\((?:dist\.?\s*)?([^)]+)\)\s*([\d.]+)/i);
    if (r) rows.push({ station: r[1].trim(), district: r[2].replace(/&amp;/g, "&").trim(), cm: Number(r[3]) });
  }
  return rows;
}

async function pdfText(url) {
  const r = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0 (NakshIQ snow outlook)" }, signal: AbortSignal.timeout(60_000) });
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  const buf = Buffer.from(await r.arrayBuffer());
  if (buf.subarray(0, 4).toString() !== "%PDF") throw new Error("not a PDF");
  const dir = mkdtempSync(join(tmpdir(), "imd-"));
  try {
    const f = join(dir, "b.pdf");
    writeFileSync(f, buf);
    for (const b of ["/opt/homebrew/bin/pdftotext", "/usr/local/bin/pdftotext", "pdftotext"]) {
      try { return execFileSync(b, [f, "-"], { encoding: "utf8", maxBuffer: 32 << 20 }); } catch (e) { if (e.code !== "ENOENT") throw e; }
    }
    throw new Error("pdftotext not installed");
  } finally { rmSync(dir, { recursive: true, force: true }); }
}

/** Fetch every distinct bulletin once. Returns { [regionId]: bulletin } */
export async function readBulletins(today) {
  const byUrl = new Map();
  const out = {};
  for (const [region, b] of Object.entries(BULLETINS)) {
    if (!byUrl.has(b.url)) {
      byUrl.set(b.url, (async () => {
        try {
          const text = await pdfText(b.url);
          const issued = issueDate(text, today);
          const ageDays = issued ? Math.round((Date.parse(today) - Date.parse(issued)) / 86400_000) : null;
          const fresh = ageDays != null && ageDays <= 2;
          return { centre: b.centre, url: b.url, issued, fresh, sentences: fresh ? snowSentences(text, Number(today.slice(0, 4))) : [], observed: observedSnow(text) };
        } catch (e) {
          return { centre: b.centre, url: b.url, issued: null, fresh: false, error: String(e.message ?? e).slice(0, 160), sentences: [], observed: [] };
        }
      })());
    }
    out[region] = await byUrl.get(b.url);
  }
  return out;
}

/**
 * The altitude IMD's sentence limits itself to. "(at places with the elevation of 3800
 * meter and above)" -> 3800; "higher reaches"/"higher altitude" -> Infinity (we cannot
 * tell how high, so it never counts as agreement); none -> 0.
 */
export function altitudeFloor(s) {
  const m = s.match(/(\d{3,4})\s*(?:m|meters?|metres?|mtrs?)\b\s*(?:asl\s*)?(?:and|&)?\s*above/i);
  if (m) return Number(m[1]);
  if (/higher\s+(reaches|altitudes?|elevations?|hills)/i.test(s)) return Infinity;
  return 0;
}

/**
 * IMD's verdict for one point and one outlook window. Never upgrades a weak match:
 * "agrees" needs this district named AND a named date inside the window.
 */
export function imdForPoint(point, window, bulletins) {
  const b = bulletins[point.region_id];
  if (!b) return { centre: null, url: null, issued: null, status: "not-covered", quote: null };
  const base = { centre: b.centre, url: b.url, issued: b.issued, scope: b.url.includes("impact_fc") ? "heavy-warnings-only" : "full-forecast" };
  if (b.error) return { ...base, status: "unavailable", quote: null };
  if (!b.fresh) return { ...base, status: "stale", quote: null };
  const names = districtNamesFor(point.id);
  const inWindow = (s) => s.dates.some((d) => d >= window.window_start && d <= window.window_end);
  const names_it = (s) => names.some((n) => namesPlace(s.text, n));
  // Review 2026-10-16: "snow at 3800 m and above, Chamoli" must not count for Joshimath (1,875 m).
  const highEnough = (s) => (point.elevation_m ?? 0) >= altitudeFloor(s.text);
  const future = (s) => !s.dates.length || s.dates.some((d) => d >= window.window_start); // a sentence only about past days says nothing
  const agrees = b.sentences.find((s) => names_it(s) && inWindow(s) && highEnough(s));
  if (agrees) return { ...base, status: "agrees", quote: agrees.text, district_named: true };
  const mention = b.sentences.find((s) => names_it(s) && future(s)) ?? b.sentences.find((s) => inWindow(s)) ?? b.sentences.find((s) => !s.dates.length);
  if (mention) return { ...base, status: "mentions", quote: mention.text, district_named: names_it(mention) };
  return { ...base, status: "silent", quote: null };
}
