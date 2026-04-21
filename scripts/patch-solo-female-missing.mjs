#!/usr/bin/env node
/**
 * Patches the 43 destinations that ended up null-scored in the first pass due
 * to accidental duplicate-key overwrites in fill-solo-female-drafts.mjs. All
 * drafts Claude-authored in-conversation (zero API).
 *
 * Usage:
 *   node scripts/patch-solo-female-missing.mjs          # dry
 *   node scripts/patch-solo-female-missing.mjs --commit
 */
import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";

config({ path: "apps/web/.env.local" });

const BANNED = [
  "hidden gem", "unforgettable", "stunning", "must-visit", "must visit",
  "bucket list", "breathtaking", "magical", "incredible", "authentic",
  "curated", "elevated", "immersive", "paradise", "pristine",
  "charming", "nestled",
];

const COMMIT = process.argv.includes("--commit");

const patches = {
  // ═══════════ MAJOR WELL-KNOWN DESTINATIONS (accidentally nulled) ═══════════
  manali: { score: 3, note: "New Manali is tourist-safe daytime; Old Manali strip has party + drug scene after 10pm. Use HPTDC hotels not Mall Road roadside. June peak-stag fortnight flips to 2/5." },
  hampi: { score: 4, note: "Backpacker village + UNESCO ruins = international solo women year-round. Hampi Bazaar side is safer than Hippie Island stretch. Cross the river before sunset." },
  khajuraho: { score: 3, note: "Tourist-bubble safe around the temples; town outside has no solo-female infrastructure. Stay at MPTDC Payal or ITDC Ashok, don't wander the town alone." },
  kochi: { score: 4, note: "Fort Kochi homestays are female-run; Ernakulam side has infrastructure but more hustle. Chinese fishing nets at sunset are tourist-dense and safe." },
  lucknow: { score: 4, note: "Nawabi capital — Hazratganj + Gomti Nagar are night-safe; Old Lucknow (Chowk, Aminabad) feels crowd-vigilant. Lucknow Metro is reliable." },
  coorg: { score: 4, note: "Madikeri base — Kodava-family homestays are welcoming; Abbey Falls + Raja's Seat daytime. Stays away from KSRTC stand area." },
  nashik: { score: 3, note: "Trimbakeshwar + Panchavati combine safe daytime; Simhastha Kumbh years (next 2027) flip the score. Winemaker visits are a solid solo alternative." },
  ranthambore: { score: 4, note: "Sawai Madhopur tiger reserve — RTDC + luxury (Oberoi Vanyavilas, Sujan Sher Bagh) safe. Safari via vetted operator; don't book walk-in." },
  sariska: { score: 3, note: "Alwar tiger reserve — ITDC Sariska Palace + RTDC Hotel Tiger Den are the safe bets. Safari via FD; Siliserh Lake day-trip fine." },
  badrinath: { score: 4, note: "Yatra town with BKTC-managed stays + taxis. Tapt Kund hot-springs have separate women's section. Overnight at registered dharamshalas only. Closed Dec-Apr." },
  gangotri: { score: 3, note: "Roadhead town during yatra — infrastructure exists May-Oct. Solo women trekking to Gaumukh need a permit + registered guide. Closed Dec-Apr." },
  yamunotri: { score: 2, note: "Roughest of the Char Dham — 5km steep trek from Janki Chatti, patchy stays. Go as part of a group yatra, not solo. Closed Dec-Apr." },
  sarnath: { score: 4, note: "Buddhist pilgrimage near Varanasi — archaeological park + Dhamek Stupa are safe + quiet. International Buddhist guesthouses have women's floors. Day-trip from Varanasi." },
  mandrem: { score: 5, note: "Quiet North Goa, yoga-retreat hub, overwhelmingly female-friendly. Long-stay European and Russian travellers live here in season. Ashwem stretch is the safest in Goa." },
  morjim: { score: 4, note: "North Goa turtle-nesting beach — long-stay European women + Russians. Shacks are safer than Arambol/Anjuna nightlife strip." },
  kasol: { score: 3, note: "Parvati Valley backpacker town — Israeli + long-stay expat scene; hippie-trail has drug + dodgy-guide risks. Stay in The Parvati Kuteer/hotel, not riverside shacks." },
  "parvati-valley": { score: 2, note: "Wider valley around Kasol-Tosh-Malana — trek-operator-only for anything beyond Kasol. Malana has documented hostility to outsiders; solo-women specifically discouraged." },
  guruvayur: { score: 4, note: "Kerala's busiest Krishna temple has women-only queues + trust-run stays. Strict dress code (pre-announced) keeps harassment near-zero." },
  udupi: { score: 4, note: "Krishna matha serves free meals daily; women pilgrims form the majority during Paryaya. Clean, well-lit, Mangalore infrastructure nearby." },
  mangalore: { score: 4, note: "Karnataka coastal city — Hampankatta + Bejai are night-safe. Tulunadu culture normalises solo-women travel. St Aloysius + Panambur Beach daytime." },
  puducherry: { score: 4, note: "French-quarter guesthouses (Maison Perumal, Palais de Mahé) are female-run. White Town + Auroville are backpacker hubs. Black Town quieter but daytime safe." },
  trivandrum: { score: 4, note: "Kerala capital — Technopark + Kazhakootam areas night-safe; East Fort thinner. KTDC Chaithram + Vivanta Trivandrum reliable. Metro expands reach." },
  bhubaneswar: { score: 3, note: "Odisha capital + temple-circuit base — Unit-9/Saheed Nagar are night-safe; Old Town (Lingaraj area) daytime-only. Mayfair Lagoon + OTDC Panthaniwas safe." },
  sivasagar: { score: 3, note: "Ahom capital — Rang Ghar + Talatal Ghar are tourist-safe daytime. Guwahati–Sivasagar overnight train; use AC ladies coach." },
  chorao: null,
  "chorao-divar": { score: 3, note: "Goa's quiet-island side — Salim Ali bird sanctuary + Portuguese villages. Day-trip, ferry across from Ribandar. Safe but thin transport back after 6pm." },
  daulatabad: { score: 3, note: "Fort near Aurangabad — ASI site, tourist-regular. Day-trip combine with Ellora. Don't attempt the top climb alone after 3pm." },
  alampur: { score: 3, note: "Shakti-peetha on Tungabhadra river — pilgrim flow Mon/Fri, otherwise deserted. Day-trip from Kurnool or Hyderabad." },
  gulbarga: { score: 3, note: "Bahmani sultanate capital (Kalaburagi) — Sharana Basaveshwara temple + fort. Thin tourist flow; KSTDC Mayura is the safe stay." },
  junagadh: { score: 3, note: "Girnar pilgrim trek + Uparkot fort — good daytime, sparse evening. Stay in cantonment-area hotels, not old town." },
  kumbakonam: { score: 4, note: "Navagraha circuit keeps tourist flow steady. Stays near Mahamaham tank are bustling; avoid the stretch past the bus stand after dark." },
  srirangapatna: { score: 4, note: "Tipu Sultan heritage near Mysore — ASI-managed, family-tourist heavy. Day-trip from Mysore only; town outside the fort is sparse." },
  sasangir: { score: 4, note: "Gir lion reserve (Sasan Gir) — organised safari via Gir Sinh Sadan/Wildlife Division + fixed permits. Stay in Gir Sasan at GujTour resort. Safe, female-routine." },
  bhitarkanika: { score: 3, note: "Odisha's mangrove + crocodile + olive-ridley — OTDC Dangmal + Sand Pebbles lodge. Organised boat safari only; thin for solo overnight." },
  shikharji: { score: 3, note: "Jain pilgrim trek in Jharkhand (Parasnath Hill) — male-dominated pilgrim flow, sparse female-friendly stays. Organised yatra groups only." },
  dhanaulti: { score: 3, note: "Mussoorie-adjacent alpine zone — GMVN Eco Park is the pick; private camps mixed. Organised camping operator only." },
  hanle: { score: 2, note: "Ladakh's dark-sky + astronomical observatory town — remote, permit-restricted, astronomer-tourist flow. Organised group (Dhanyal Hanle) only." },
  nagpur: { score: 3, note: "Maharashtra tier-2 hub + tadoba gateway — Civil Lines + Dharampeth are night-safe; station-area thin. Radisson + Pride Hotel reliable. Day-stop, not a destination." },

  // ═══════════ NICHE DESTINATIONS — acceptable score or honest null ═══════════
  "great-himalayan-np": { score: 2, note: "GHNP wilderness zone beyond Tirthan — multi-day registered-guide trek only. Day-visits to Banjar/Sainj are fine via Tirthan Valley homestays." },
  "phawngpui-peak": { score: 1, note: "Mizoram's Blue Mountain summit — remote Lawngtlai district + thin tourist flow + limited stays. Organised Mizoram Tourism operator only, not a solo destination." },
  "sinthan-top": { score: 2, note: "Kishtwar-Anantnag road pass — drive-through viewpoint, no overnight infrastructure. Day-visit via Anantnag taxi or organised Kashmir tour only." },
  "ziro-valley": { score: 3, note: "Apatani plateau — Ziro Music Festival (Sep) draws female solo travellers. Apatani homestays (Pine Grove) are vetted. Off-festival, thinner flow." },
  minicoy: null, // genuine honest-gap: permit restrictions make solo-female impossible to assess
  "diamond-triangle": { score: 4, note: "Odisha Buddhist trio (Udayagiri, Ratnagiri, Lalitgiri) — ASI day-trip circuit via OTDC. Family-tourist + archaeological visitors. Stay in Bhubaneswar only." },
};

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

// Audit
const issues = [];
for (const [id, p] of Object.entries(patches)) {
  if (p === null) continue;
  if (!Number.isInteger(p.score) || p.score < 1 || p.score > 5) issues.push(`${id}: score ${p.score}`);
  if (!p.note || p.note.length < 20 || p.note.length > 200) issues.push(`${id}: note len ${p.note?.length}`);
  const lower = p.note.toLowerCase();
  const banned = BANNED.filter((b) => lower.includes(b));
  if (banned.length) issues.push(`${id}: banned ${banned.join(",")}`);
}

const writable = Object.entries(patches).filter(([_, p]) => p !== null);
console.log(`Patches: ${writable.length} writable, ${issues.length} audit fails`);
if (issues.length) {
  for (const i of issues) console.log(`  ✗ ${i}`);
  process.exit(1);
}

if (!COMMIT) {
  for (const [id, p] of writable) {
    console.log(`  ${id}: ${p.score}/5 — ${p.note.slice(0, 60)}...`);
  }
  console.log(`\nDRY. Re-run with --commit.`);
  process.exit(0);
}

const reviewedAt = new Date().toISOString();
let ok = 0, err = 0;
for (const [id, p] of writable) {
  const { error } = await supabase
    .from("destinations")
    .update({ solo_female_score: p.score, solo_female_note: p.note, content_reviewed_at: reviewedAt })
    .eq("id", id);
  if (error) { console.error(`  ✗ ${id}: ${error.message}`); err++; }
  else { console.log(`  ✓ ${id}`); ok++; }
}
console.log(`\n${ok} patched, ${err} failed. content_reviewed_at stamped ${reviewedAt}`);
