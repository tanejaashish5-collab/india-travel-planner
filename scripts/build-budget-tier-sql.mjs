#!/usr/bin/env node
/**
 * hotel-budget rows from the budget rooms the regional cost research already measured (2026-10-10).
 *
 *   node scripts/build-budget-tier-sql.mjs 097     # writes supabase/migrations/097_hotel_budget_tier_from_research.sql
 *
 * Why: blogs and month pages quote budget rooms ("Rooms: ₹400-1,000"), but the ledger had no budget-room category,
 * so the consistency pass compared them with 3-star prices and held 279 sentences as "2.5x off". Every regional
 * batch (data/cost-research/<region>/B*.json) recorded budget_hotel_median_inr next to the 3-star median, priced on
 * the same night, but the loader never stored it.
 *
 * Method: ratio = budget median / 3-star median from the SAME batch entry and the SAME stay night. hotel-budget for
 * every season = that place's loaded hotel-mid row x ratio, so it inherits the 3-star row's season anchoring,
 * Diwali-week deflation and GST treatment instead of re-deriving them. Loaded only when: budget n >= 2 (the brief's floor for tiny places) with a source
 * URL, the 3-star row in the ledger is observed (not a model), both tiers carry the same stay date, the budget tier
 * is not borrowed from another town, and 0.2 <= ratio <= 1.
 */
import fs from "node:fs";
import path from "node:path";

const num = process.argv[2];
if (!num) { console.error("usage: build-budget-tier-sql.mjs <migration-number>"); process.exit(1); }
const REGIONS = ["north", "west", "east", "south", "central-islands", "queue-load"];
const q = (s) => `'${String(s).replace(/'/g, "''")}'`;
const hasUrl = (a) => Array.isArray(a) && a.some((u) => typeof u === "string" && /^https?:\/\//.test(u));
const STAY_PROXY = /[Cc]ity figures used|[Cc]ity medians|[Ff]igures are (the )?[A-Z]{4,}\b|used as the base|nearest town with data|stand-in for/;
const MON = "(jan(?:uary)?|feb(?:ruary)?|mar(?:ch)?|apr(?:il)?|may|june?|july?|aug(?:ust)?|sept?(?:ember)?|oct(?:ober)?|nov(?:ember)?|dec(?:ember)?)";
const DATE = new RegExp(`\\b\\d{1,2}(?:\\s*[-–]\\s*\\d{1,2})?\\s+${MON}\\b|\\b${MON}\\s+\\d{1,2}\\b|\\b${MON}\\s+20\\d\\d\\b`, "i");
const SEG = {
  mid: /\b(?:mid|3-star|three-star)[^:]{0,20}:([\s\S]*?)(?=\b(?:budget|homestay|dorm|hostel)[^:]{0,20}:|$)/i,
  budget: /\bbudget[^:]{0,20}:([\s\S]*?)(?=\b(?:mid|3-star|three-star|homestay|dorm|hostel)[^:]{0,20}:|$)/i,
};
const seg = (b, k) => (b.match(SEG[k]) ?? [])[1] ?? null;
const dateOf = (t) => (t?.match(DATE) ?? [null])[0]?.toLowerCase().replace(/\s+/g, " ") ?? null;
// "10-11 oct" and "11 oct" are the same stay; "11 oct" and "12 nov" are not. Same month, first day within 3 days.
const sameNight = (a, b) => {
  const p = (t) => [t.match(/[a-z]{3}/)?.[0], Number(t.match(/\d{1,2}/)?.[0])];
  const [ma, da] = p(a), [mb, db] = p(b);
  return ma === mb && (Number.isNaN(da) || Number.isNaN(db) || Math.abs(da - db) <= 3);
};
const TAXI = /tax[- ]?incl|incl\.? tax|inclusive|kayak/i;

// One entry per place: REGIONS is ordered oldest to newest, so a later measurement replaces an earlier one.
const byId = new Map(), stats = { loaded: 0, skipped: {} };
const skip = (why) => { stats.skipped[why] = (stats.skipped[why] ?? 0) + 1; };
for (const region of REGIONS) {
  const dir = path.join("data/cost-research", region);
  if (!fs.existsSync(dir)) continue;
  const ex = fs.existsSync(path.join(dir, "_exclude.json")) ? JSON.parse(fs.readFileSync(path.join(dir, "_exclude.json"), "utf8")) : {};
  for (const f of fs.readdirSync(dir).filter((x) => /^B\d+\.json$/.test(x))) {
    const j = JSON.parse(fs.readFileSync(path.join(dir, f), "utf8"));
    for (const [id, d] of Object.entries(j.destinations ?? {})) {
      const s = d.stay;
      if (!s || s.no_lodging || s.budget_hotel_median_inr == null) continue;
      if ((s.budget_n ?? 0) < 2 || !hasUrl(s.budget_sources)) { skip("budget n<2 or no URL"); continue; }
      if (s.mid_median_inr == null || (s.mid_n ?? 0) < 3) { skip("no measured 3-star to pair with"); continue; }
      if (ex.stay?.[id]?.["hotel-mid"]) { skip("3-star excluded for this place"); continue; }
      const basis = s.price_basis ?? "";
      const bSeg = seg(basis, "budget"), mSeg = seg(basis, "mid");
      if (STAY_PROXY.test(`${basis} ${s.notes ?? ""}`) || /proxy|borrowed|nearby town/i.test(bSeg ?? "")) { skip("budget borrowed from another town"); continue; }
      const bd = dateOf(bSeg) ?? dateOf(basis), md = dateOf(mSeg) ?? dateOf(basis);
      if (bSeg && mSeg && dateOf(bSeg) && dateOf(mSeg) && !sameNight(dateOf(bSeg), dateOf(mSeg))) { skip("budget and 3-star priced on different nights"); continue; }
      let ratio = s.budget_hotel_median_inr / s.mid_median_inr;
      // A tax-inclusive budget figure paired with a pre-tax 3-star figure: put both on a pre-tax basis.
      if (bSeg && mSeg && TAXI.test(bSeg) && !TAXI.test(mSeg)) ratio /= 1.12;
      if (ratio < 0.2 || ratio > 1) { skip("ratio outside 0.2-1"); continue; }
      const r = ratio.toFixed(4);
      const note = `Research ${j.batch} (${region}) ${j.researched_on ?? "2026-10"}: budget room median ${s.budget_hotel_median_inr} (n=${s.budget_n}) / 3-star median ${s.mid_median_inr} (n=${s.mid_n}) on the same night (${bd ?? md ?? "undated"}) = ${ratio.toFixed(2)}; applied to this place's observed 3-star row in each season (097).`;
      byId.set(id, `INSERT INTO destination_costs (destination_id, category, season, months, typical_inr, range_low_inr, range_high_inr, unit, source_ref, notes)
  SELECT destination_id, 'hotel-budget', season, months, GREATEST(round(typical_inr*${r}/50)*50, 50)::int,
    GREATEST(round(COALESCE(range_low_inr, typical_inr)*${r}/50)*50, 50)::int,
    GREATEST(round(COALESCE(range_high_inr, typical_inr)*${r}/50)*50, round(typical_inr*${r}/50)*50, 50)::int,
    'per_night', 'observed_research_2026_10', ${q(note)}
  FROM destination_costs WHERE destination_id = ${q(id)} AND category = 'hotel-mid' AND source_ref LIKE 'observed%';`);
    }
  }
}
const out = [...byId.values()]; stats.loaded = out.length;
const sql = `-- ${num}: hotel-budget rows from measured budget rooms (generated by scripts/build-budget-tier-sql.mjs, 2026-10-10).
-- See the script header for the method. Re-runnable: deletes existing hotel-budget rows first.
-- Stats: ${JSON.stringify(stats)}
BEGIN;
ALTER TABLE destination_costs DROP CONSTRAINT dc_category_check;
ALTER TABLE destination_costs ADD CONSTRAINT dc_category_check CHECK (category = ANY (ARRAY['homestay','hostel-dorm','hotel-budget','hotel-mid','hotel-splurge','food-per-day','transport-taxi-day','transport-intercity','permit-fees','activity-sample']));
DELETE FROM destination_costs WHERE category = 'hotel-budget';
${out.join("\n")}
COMMIT;
`;
const file = `supabase/migrations/${num}_hotel_budget_tier_from_research.sql`;
fs.writeFileSync(file, sql);
console.log(file, JSON.stringify(stats));
