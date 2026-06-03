// Seed park_safaris from the extracted raw.json (20 parks), applying:
//  - final official_booking_url decisions (anti-fabrication URL audit)
//  - zone-key consolidation (buffer_zones / zones_core / zones_maharashtra_* -> zones)
//  - operator-URL sanitisation in booking_steps / booking_opens_note
//  - column whitelist (drop any non-column keys) + published + last_verified
// Upsert via service-role REST client (20 rows << 500, REST is fine).
// Run: node --env-file=<main>/apps/web/.env.local scripts/_safari-seed/seed.mjs
import fs from "node:fs";
import path from "node:path";
import { createClient } from "@supabase/supabase-js";

const VERIFIED = "2026-06-03";

// Final official URL per park (null = no confirmed govt portal -> honest spot-booking).
const OFFICIAL_URL = {
  ranthambore: "https://fmdss.forest.rajasthan.gov.in/",
  sariska: "https://fmdss.forest.rajasthan.gov.in/",
  "corbett-national-park": "https://corbettonline.uk.gov.in/",
  "dudhwa-national-park": null,
  kanha: "https://forest.mponline.gov.in/",
  bandhavgarh: "https://forest.mponline.gov.in/",
  tadoba: "https://safaribooking.mahaforest.gov.in/",
  "pench-maharashtra": "https://safaribooking.mahaforest.gov.in/",
  thekkady: "https://periyartigerreserve.org/",
  wayanad: null,
  "gir-national-park": "https://girlion.gujarat.gov.in/",
  bandipur: null,
  nagarhole: null,
  kabini: "https://www.jlrexplore.com/",
  dandeli: null,
  mudumalai: null,
  kaziranga: "https://sewasetu.assam.gov.in/",
  "manas-national-park": "https://sewasetu.assam.gov.in/",
  sundarbans: null,
  bhitarkanika: "https://www.ecotourodisha.com/",
};

// Operator/look-alike domains the agents cited that we must NOT surface as official.
const BAD_DOMAINS = [
  "dudhwa-national-park.in", "mudumalaitigerreserve.com", "manasnationalparkonline.in",
  "bandipurtigerreserve.in", "bandipurtr.in", "nagaraholetigerreserve.com",
  "wayanadwildlifesanctuary.com", "kalitigerreserve.org", "sundarbantigerreserve.org",
  "kazirangasafari.in", "corbettgov.org", "maharashtraecotourismonline.com",
  "kabiniriverlodge.com", "kabiniwildlife.com",
];

const SPOT_STEPS = [
  "Arrive at the park's forest reception counter early — 30–60 minutes before the safari shift.",
  "Buy your ticket at the counter; seats are first-come, first-served.",
  "Carry the original photo ID for every traveller (passport for foreign nationals).",
  "Book only at the counter or the state forest department — avoid private sites posing as the official portal.",
];

const COLUMNS = [
  "destination_id", "park_full_name", "booking_authority", "official_booking_url",
  "advance_booking_days", "has_tatkal", "booking_opens_note", "open_months",
  "closed_months", "best_months", "id_required", "safari_types", "zones",
  "booking_steps", "pitfalls", "fees_note", "core_buffer_note", "sources",
  "translations", "last_verified", "published",
];

const decode = (s) =>
  typeof s === "string"
    ? s
        .replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;/g, "'")
        .replace(/&apos;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
    : s;

function deepDecode(v) {
  if (typeof v === "string") return decode(v);
  if (Array.isArray(v)) return v.map(deepDecode);
  if (v && typeof v === "object") {
    const o = {};
    for (const [k, val] of Object.entries(v)) o[k] = deepDecode(val);
    return o;
  }
  return v;
}

// Strip http URLs + known operator domains from prose, replacing with a neutral phrase.
function sanitize(text, hasPortal) {
  if (typeof text !== "string") return text;
  const neutral = hasPortal ? "the official portal (linked above)" : "the forest-department counter";
  let t = text.replace(/https?:\/\/[^\s)]+/g, neutral);
  for (const d of BAD_DOMAINS) t = t.split(d).join(neutral);
  // Tidy "Visit the official portal (linked above) or " style doubles + whitespace.
  return t.replace(/\bVisit\s+(the (official portal[^.]*|forest-department counter))/gi, "Use $1").replace(/\s{2,}/g, " ").trim();
}

// Fold any non-standard zone arrays into the canonical `zones` shape.
function consolidateZones(p) {
  const zones = Array.isArray(p.zones) ? [...p.zones] : [];
  for (const [k, val] of Object.entries(p)) {
    if (k === "zones" || !Array.isArray(val)) continue;
    if (!/^(buffer_zones?|zones_)/i.test(k)) continue;
    for (const z of val) {
      if (typeof z === "string") {
        zones.push({ name: z, best_for: "buffer zone", premium: false, notes: "" });
      } else if (z && typeof z === "object" && z.name) {
        zones.push({
          name: z.name, gate: z.gate, best_for: z.best_for ?? "", premium: !!z.premium, notes: z.notes ?? "",
        });
      }
    }
  }
  return zones;
}

const raw = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), "scripts/_safari-seed/raw.json"), "utf8"),
);

const rows = raw.map((p0) => {
  const p = deepDecode(p0);
  const url = OFFICIAL_URL[p.destination_id] ?? null;
  const hasPortal = Boolean(url);
  const zones = consolidateZones(p);

  const bookingSteps = hasPortal
    ? (Array.isArray(p.booking_steps) ? p.booking_steps.map((s) => sanitize(s, true)) : [])
    : SPOT_STEPS;

  const row = {
    destination_id: p.destination_id,
    park_full_name: p.park_full_name,
    booking_authority: p.booking_authority ?? null,
    official_booking_url: url,
    advance_booking_days:
      typeof p.advance_booking_days === "number" ? p.advance_booking_days : null,
    has_tatkal: Boolean(p.has_tatkal),
    booking_opens_note: sanitize(p.booking_opens_note ?? null, hasPortal),
    open_months: Array.isArray(p.open_months) ? p.open_months : [],
    closed_months: Array.isArray(p.closed_months) ? p.closed_months : [],
    best_months: Array.isArray(p.best_months) ? p.best_months : [],
    id_required: Array.isArray(p.id_required) ? p.id_required : [],
    safari_types: Array.isArray(p.safari_types) ? p.safari_types : [],
    zones,
    booking_steps: bookingSteps,
    pitfalls: Array.isArray(p.pitfalls) ? p.pitfalls : [],
    fees_note: p.fees_note ?? null,
    core_buffer_note: p.core_buffer_note ?? null,
    sources: Array.isArray(p.sources) ? p.sources : [],
    translations: {},
    last_verified: VERIFIED,
    published: true,
  };
  // whitelist (defensive)
  const clean = {};
  for (const c of COLUMNS) clean[c] = row[c];
  return clean;
});

// Dry-run summary
console.log(`Prepared ${rows.length} rows.`);
for (const r of rows) {
  console.log(
    `  ${r.destination_id.padEnd(24)} portal=${r.official_booking_url ? "Y" : "—"} ` +
    `types=${r.safari_types.length} zones=${r.zones.length} pitfalls=${r.pitfalls.length} ` +
    `sources=${r.sources.length} steps=${r.booking_steps.length}`,
  );
}

if (process.argv.includes("--dry")) {
  fs.writeFileSync(
    path.join(process.cwd(), "scripts/_safari-seed/seed-preview.json"),
    JSON.stringify(rows, null, 2),
  );
  console.log("\nDRY RUN — wrote seed-preview.json, no DB write.");
  process.exit(0);
}

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in env.");
  process.exit(1);
}
const supabase = createClient(SUPABASE_URL, SERVICE_KEY, { auth: { persistSession: false } });

const { data, error } = await supabase
  .from("park_safaris")
  .upsert(rows, { onConflict: "destination_id" })
  .select("destination_id");

if (error) {
  console.error("UPSERT FAILED:", error);
  process.exit(1);
}
console.log(`\n✓ Upserted ${data.length} park_safaris rows.`);
