/**
 * sos-verify.ts — the single source of truth for "does this emergency_sos row
 * still check out?".
 *
 * Two consumers, one implementation:
 *   - /api/cron/sos-auto-reverify   does the work (fetches sources, stamps rows)
 *   - /api/cron/sos-verify-reminder emails ONLY what the work couldn't settle
 *
 * Before this existed the staleness classifier was copy-pasted into both the
 * reminder route and scripts/audit-emergency-numbers.mjs, which is how the two
 * drifted. Add logic here, not in a caller.
 */

/**
 * Numbers that are MHA / Ministry-of-Tourism constants. They don't change, they
 * aren't district-specific, and no district page needs to prove them.
 * 1800-111-363 is the MoT tourist line in its 1800 form; 14464 is the Amarnath
 * Ji Shrine Board line.
 */
export const NATIONAL_CONSTANTS = new Set([
  "100", "101", "102", "103", "108", "112", "139", "181", "1033",
  "1070", "1073", "1077", "1091", "1098", "1363", "1930", "14464",
  "1800111363", "18001111363",
]);

/** Fields that can carry a dialable number. Order is stable for reporting. */
export const PHONE_FIELDS = [
  "police",
  "ambulance",
  "fire",
  "women_helpline",
  "tourist_helpline",
  "road_accident",
  "local_police_station",
  "nearest_hospital",
  "rescue_contact",
  "mountain_rescue",
] as const;

export type PhoneField = (typeof PHONE_FIELDS)[number];

export type SourceMapEntry = { url: string; field: string; last_seen: string };
export type SourceMap = Record<string, SourceMapEntry>;

export type SosRow = {
  destination_id: string;
  verified: boolean | null;
  verified_date: string | null;
  source_url: string | null;
  source_map: SourceMap | null;
  auto_verify_fail_streak?: number | null;
} & Partial<Record<PhoneField, string | null>>;

/** Strip everything but digits, then drop a leading +91 country code. */
export function normalisePhone(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  return digits.replace(/^91(?=\d{10}$)/, "");
}

/**
 * Pull dialable numbers out of free-text field values.
 *
 * Deliberately conservative: an 8–12 digit run is a real line, a 3–5 digit run
 * is a short code. Anything else (a 6-digit PINCODE inside a hospital address,
 * a year, a distance) is ignored — mis-reading a pincode as a desk line is what
 * makes a checker cry wolf.
 */
export function extractPhones(text: string | null | undefined): string[] {
  if (!text) return [];
  const out = new Set<string>();
  for (const match of text.matchAll(/\+?\d[\d\-\s()]{2,}\d/g)) {
    const n = normalisePhone(match[0]);
    if ((n.length >= 8 && n.length <= 12) || (n.length >= 3 && n.length <= 5)) {
      out.add(n);
    }
  }
  return [...out];
}

/** Every number in the row, tagged with the field it came from. */
export function rowPhones(row: SosRow): { digits: string; field: PhoneField }[] {
  const seen = new Set<string>();
  const out: { digits: string; field: PhoneField }[] = [];
  for (const field of PHONE_FIELDS) {
    for (const digits of extractPhones(row[field])) {
      if (seen.has(digits)) continue;
      seen.add(digits);
      out.push({ digits, field });
    }
  }
  return out;
}

/** Numbers that a district page has to prove — i.e. everything not a constant. */
export function localPhones(row: SosRow) {
  return rowPhones(row).filter((p) => !NATIONAL_CONSTANTS.has(p.digits));
}

export const DISTRICT_WINDOW_DAYS = 45;
export const CONSTANTS_WINDOW_DAYS = 180;

/**
 * Re-check cadence (migration 069). A row carrying a real district desk or
 * hospital line can decay → 45 days. A constants-only row → 180.
 */
export function cadenceDays(row: SosRow): number {
  return localPhones(row).length > 0 ? DISTRICT_WINDOW_DAYS : CONSTANTS_WINDOW_DAYS;
}

export type StaleReason = string;

/** Why this row is due (empty array = not due). */
export function stalenessReasons(row: SosRow, now = new Date()): StaleReason[] {
  const reasons: StaleReason[] = [];
  if (!row.verified) reasons.push("not_verified");
  if (!row.source_url) reasons.push("no_source");
  if (!row.verified_date) {
    reasons.push("no_date");
    return reasons;
  }
  const ageDays = Math.floor(
    (now.getTime() - new Date(row.verified_date).getTime()) / 86_400_000,
  );
  if (ageDays > cadenceDays(row)) reasons.push(`stale_${ageDays}d`);
  return reasons;
}

// ---------------------------------------------------------------------------
// Verification
// ---------------------------------------------------------------------------

/** `tokens` = every phone-shaped run on the page, normalised. */
export type PageResult = { ok: boolean; tokens: string[]; status: number };
/** url -> fetched page. Caller owns fetching + caching. */
export type PageCache = Map<string, PageResult>;

/**
 * Does `digits` appear on a page whose phone tokens are `tokens`?
 *
 * Not a substring test. Flattening a whole page to one digit string makes
 * adjacent numbers run together and invent matches that aren't there, so we
 * compare against extracted tokens instead.
 *
 * District sites very often print the local part only ("Phone : 27280237")
 * while we store STD+local ("020-27280237"), so a tail comparison is required —
 * exact-only matching failed on roughly half the real pages. 8 digits of tail
 * is specific enough that a collision inside one district directory isn't a
 * practical concern; short codes must still match exactly.
 */
export function numberMatchesPage(digits: string, tokens: Iterable<string>): boolean {
  for (const t of tokens) {
    if (t === digits) return true;
  }
  if (digits.length < 10) return false; // short codes: exact or nothing
  for (const t of tokens) {
    if (t.length >= 8 && digits.slice(-8) === t.slice(-8)) return true;
    if (t.length === 7 && digits.endsWith(t)) return true;
  }
  return false;
}

export type NumberVerdict = {
  digits: string;
  field: PhoneField;
  url: string | null;
  /** confirmed: still printed on its source. changed: WAS printed, now gone.
   *  unsourced: no page ever recorded. unreachable: source page did not load. */
  state: "confirmed" | "changed" | "unsourced" | "unreachable";
};

export type RowVerdict = {
  destination_id: string;
  status: "confirmed" | "number_changed" | "source_unreachable" | "needs_source";
  numbers: NumberVerdict[];
  /** source_map with last_seen refreshed for every confirmed number. */
  nextSourceMap: SourceMap;
  note: string;
};

/** Every URL this row needs fetched, so the caller can dedupe across rows. */
export function urlsForRow(row: SosRow): string[] {
  const map = row.source_map ?? {};
  const urls = new Set<string>();
  for (const { digits } of localPhones(row)) {
    const url = map[digits]?.url ?? row.source_url;
    if (url) urls.add(url);
  }
  return [...urls];
}

/**
 * Decide a row against already-fetched pages.
 *
 * Fail-closed on purpose: a row is only stamped when EVERY number it carries is
 * either a national constant or was literally found on its own source page. A
 * page that 403s, a number we can't locate, anything ambiguous — the row keeps
 * its old date and stays visible. Stamping "verified" on a number we could not
 * actually see would be exactly the fabrication this codebase forbids.
 */
export function verifyRow(row: SosRow, pages: PageCache, today: string): RowVerdict {
  const map: SourceMap = { ...(row.source_map ?? {}) };
  const numbers: NumberVerdict[] = [];

  for (const { digits, field } of localPhones(row)) {
    const recorded = map[digits];
    const url = recorded?.url ?? row.source_url ?? null;
    if (!url) {
      numbers.push({ digits, field, url: null, state: "unsourced" });
      continue;
    }
    const page = pages.get(url);
    if (!page || !page.ok) {
      // A recorded source that stopped loading is a real problem. A fallback
      // guess that stopped loading only means we still have no provenance.
      numbers.push({
        digits, field, url,
        state: recorded ? "unreachable" : "unsourced",
      });
      continue;
    }
    if (numberMatchesPage(digits, page.tokens)) {
      numbers.push({ digits, field, url, state: "confirmed" });
      map[digits] = { url, field, last_seen: today };
    } else if (recorded) {
      // We had seen it on this exact page before and now it's gone.
      numbers.push({ digits, field, url, state: "changed" });
    } else {
      numbers.push({ digits, field, url, state: "unsourced" });
    }
  }

  const changed = numbers.filter((n) => n.state === "changed");
  const unreachable = numbers.filter((n) => n.state === "unreachable");
  const unsourced = numbers.filter((n) => n.state === "unsourced");

  let status: RowVerdict["status"] = "confirmed";
  let note = `${numbers.length} local number(s) confirmed`;
  if (changed.length) {
    status = "number_changed";
    note = `no longer on source: ${changed.map((n) => `${n.digits} (${n.field})`).join(", ")}`;
  } else if (unreachable.length) {
    status = "source_unreachable";
    note = `source did not load: ${[...new Set(unreachable.map((n) => n.url))].join(", ")}`;
  } else if (unsourced.length) {
    status = "needs_source";
    note = `no recorded source for: ${unsourced.map((n) => `${n.digits} (${n.field})`).join(", ")}`;
  } else if (numbers.length === 0) {
    note = "national constants only";
  }

  return { destination_id: row.destination_id, status, numbers, nextSourceMap: map, note };
}

/**
 * What actually deserves a human. `needs_source` is deliberately NOT here — a
 * missing provenance record is backlog for the discovery pass, not a Monday
 * alarm, and treating it as one is what produced a 42-row email about rows that
 * were all fine.
 */
export function needsHuman(v: RowVerdict, failStreak: number): boolean {
  if (v.status === "number_changed") return true;
  if (v.status === "source_unreachable" && failStreak >= 3) return true;
  return false;
}
