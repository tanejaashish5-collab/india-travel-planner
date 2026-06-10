#!/usr/bin/env node
// _backfill-confidence-cards-34.mjs — deterministic restructure of verified
// on-row data into confidence_cards for the 34 destinations that have none
// (2026-06-10 audit #8: tirumala, katra, palani, Ashtavinayak, Panch Prayag
// etc. render ZERO confidence cards — the core product missing on the
// highest-intent religious-traffic pages).
//
// METHOD — restructure ONLY, zero LLM, zero web, zero fabrication:
//   reach      ← destinations.nearest_airport / nearest_railhead (verbatim)
//   sleep      ← local_stays rows (types + count) — omitted when none
//   emergency  ← emergency_sos row (the double-verified surface) +
//                destinations.medical_facility
//   network    ← destinations.cell_network as note text (no invented
//                per-carrier booleans)
//   fuel / weather_night ← NULL (no on-row source — honest scarcity; the
//                renderer is defensive: cc?.reach etc.)
//   people_who_help ← emergency_sos.local_helpers (verified) or []
//   safety_rating ← deterministic, documented rule on difficulty/elevation
//
// Writes via REST (34 rows — far under the 500-row direct-PG threshold).
// DRY=1 prints payloads without writing. After writing, run the phone
// assertion: every digit-string in the new rows must exist in the dest's
// emergency_sos row or the national-constants list.

import { createClient } from "@supabase/supabase-js";

const DESTS = [
  "adi-kailash","astavinayak-circuit","betla","bhoramdeo","borra-caves",
  "chitrakote-falls","jampui-hills","kanheri-caves","karla-bhaja-caves",
  "karnaprayag","katra","kinner-kailash","kiphire","lenyadri","mahad-raigad",
  "manimahesh-kailash","mansarovar-kailash","morgaon","nandaprayag","ozar",
  "palani","pali-raigad","pazhamudircholai","ranjangaon","shrikhand-mahadev",
  "siddhatek","swamimalai","theur","tiruchendur","tirumala",
  "tiruparankundram","tiruttani","tiruvannamalai","vishnuprayag",
];

const NATIONAL_CONSTANTS = new Set(["100","101","102","108","112","1091","1073","1363","1077"]);

const clean = (s) => (s ?? "").toString().replace(/\\n/g, "").replace(/\s+/g, " ").trim();
const url = clean(process.env.NEXT_PUBLIC_SUPABASE_URL);
const key = clean(process.env.SUPABASE_SERVICE_ROLE_KEY);
if (!url || !key) {
  console.error("Need NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY (run with --env-file=apps/web/.env.local)");
  process.exit(1);
}
const supabase = createClient(url, key);
const DRY = process.env.DRY === "1";

const cap = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s);

function buildReach(d) {
  const bits = [];
  if (d.nearest_railhead) bits.push(`Nearest railhead: ${cap(clean(d.nearest_railhead))}.`);
  if (d.nearest_airport) bits.push(`Nearest airport: ${cap(clean(d.nearest_airport))}.`);
  if (bits.length === 0) return null;
  return { public_transport: bits.join(" ") };
}

function buildSleep(stays) {
  if (!stays?.length) return null;
  const types = [...new Set(stays.map((s) => clean(s.type)).filter(Boolean))];
  const out = {};
  if (types.length) out.types = types;
  // options_count is a verified FLOOR (our curated rows), not a market count.
  out.options_count = stays.length;
  return Object.keys(out).length ? out : null;
}

function buildEmergency(d, sos) {
  if (!sos) return null;
  const e = {};
  if (sos.ambulance) e.ambulance = clean(sos.ambulance);
  if (sos.police) e.police_station = `Police: ${clean(sos.police)}`;
  if (sos.tourist_helpline) e.helpline = `Tourist helpline: ${clean(sos.tourist_helpline)}`;
  if (sos.rescue_contact) e.rescue = clean(sos.rescue_contact);
  if (sos.nearest_hospital) e.nearest_hospital = clean(sos.nearest_hospital);
  else if (d.medical_facility) e.nearest_hospital = cap(clean(d.medical_facility));
  return Object.keys(e).length ? e : null;
}

function buildNetwork(d) {
  if (!d.cell_network) return null;
  return { note: `Cell coverage: ${clean(d.cell_network)}.${d.atm_available === false ? " No ATM — carry cash." : ""}` };
}

// Deterministic safety rating, matching the scale in existing rows
// (devprayag easy town = 5, kedarnath extreme trek = 3):
//   extreme difficulty OR elevation >= 3500m → 3
//   hard difficulty OR elevation >= 3000m   → 4
//   else                                     → 5
function safetyRating(d) {
  const el = d.elevation_m ?? 0;
  if (d.difficulty === "extreme" || el >= 3500) return 3;
  if (d.difficulty === "hard" || el >= 3000) return 4;
  return 5;
}

function safetyNotes(d) {
  const bits = [];
  const types = Array.isArray(d.type) ? d.type : [];
  if (types.includes("pilgrimage") || types.includes("temple-town") || types.includes("temple"))
    bits.push("Pilgrimage destination.");
  else if (types.includes("national-park") || types.includes("wildlife"))
    bits.push("Protected-forest destination.");
  else if (types.includes("heritage") || types.includes("caves"))
    bits.push("Heritage site.");
  bits.push(`Difficulty: ${d.difficulty ?? "unrated"}.`);
  if (d.elevation_m) bits.push(`Elevation ${d.elevation_m}m${d.elevation_m >= 3000 ? " — altitude awareness needed" : ""}.`);
  if (d.permit_required) bits.push("Permit required — check before travel.");
  return bits.join(" ");
}

const digitStrings = (obj) => (JSON.stringify(obj).match(/\d[\d\-() ]{4,}\d/g) ?? []).map((x) => x.replace(/[^\d]/g, ""));

async function main() {
  const { data: dests, error: e1 } = await supabase
    .from("destinations")
    .select("id, type, difficulty, elevation_m, cell_network, nearest_airport, nearest_railhead, medical_facility, atm_available, permit_required")
    .in("id", DESTS);
  if (e1) throw new Error(e1.message);

  const { data: sosRows, error: e2 } = await supabase
    .from("emergency_sos").select("destination_id, police, ambulance, tourist_helpline, rescue_contact, nearest_hospital, local_helpers").in("destination_id", DESTS);
  if (e2) throw new Error(e2.message);
  const sosBy = Object.fromEntries((sosRows ?? []).map((r) => [r.destination_id, r]));

  const { data: stayRows, error: e3 } = await supabase
    .from("local_stays").select("destination_id, type").in("destination_id", DESTS);
  if (e3) throw new Error(e3.message);
  const staysBy = {};
  for (const s of stayRows ?? []) (staysBy[s.destination_id] ??= []).push(s);

  const payloads = [];
  for (const d of dests ?? []) {
    const sos = sosBy[d.id];
    const row = {
      destination_id: d.id,
      safety_rating: safetyRating(d),
      safety_notes: safetyNotes(d),
      reach: buildReach(d),
      sleep: buildSleep(staysBy[d.id]),
      fuel: null,
      weather_night: null,
      emergency: buildEmergency(d, sos),
      network: buildNetwork(d),
      people_who_help: sos?.local_helpers ?? [],
    };

    // PHONE GUARD (pre-write): every digit string must come from the dest's
    // own emergency_sos row or be a national constant.
    const allowed = new Set([...NATIONAL_CONSTANTS, ...digitStrings(sos ?? {})]);
    // elevation/counts inside notes are digits too — only guard the fields
    // where a phone could live:
    const phoneBearing = { emergency: row.emergency, people_who_help: row.people_who_help };
    for (const num of digitStrings(phoneBearing)) {
      if (!allowed.has(num)) throw new Error(`${d.id}: digit-string ${num} not traceable to emergency_sos — refusing to write`);
    }
    payloads.push(row);
  }

  console.log(`built ${payloads.length}/${DESTS.length} payloads`);
  if (DRY) {
    console.log(JSON.stringify(payloads.slice(0, 3), null, 1));
    return;
  }
  const { error: e4 } = await supabase.from("confidence_cards").insert(payloads);
  if (e4) throw new Error(`insert failed: ${e4.message}`);
  console.log(`INSERTED ${payloads.length} confidence_cards rows`);
}

main().catch((e) => { console.error(e.message); process.exit(1); });
