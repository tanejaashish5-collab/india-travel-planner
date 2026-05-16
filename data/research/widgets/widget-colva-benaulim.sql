-- Colva-Benaulim S14 widget backfill — needs +3 gems (eats=5, stays=4 already)
-- Source-verified 2026-05-10. Caught fabrication risks: "Casa Araujo Alvares Loutolim" — Loutolim is 12km inland and the Casa Araujo Alvares heritage home is a verifiable Indo-Portuguese mansion, but it sits closer to Margao than Colva (kept for margao instead). "Galgibaga turtle beach" — 25km south of Colva, that distance is too far (kept for palolem which is closer). "Three Kings Chapel Cuelim" — already in DB for margao at 5km, would create cross-dest duplicate at 8km from Colva (skipped). Adopted: Betalbatim sunset beach (3km, Goa Tourism), Cavelossim/Mobor beach (8km south, undeveloped), Chandor village heritage homes (Casa Menezes Braganza, INTACH-listed, 12km).

-- =========================================================
-- HIDDEN GEMS — 3 verified Salcette-belt waypoints
-- =========================================================

INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'colva-benaulim-betalbatim-beach',
  'colva-benaulim',
  'Betalbatim Beach (Sunset Beach)',
  NULL,
  3,
  '8 min by scooter north from Colva beach',
  'Betalbatim is the next beach north of Colva but most package tourists land at Colva and never walk/ride 3km up the coast. Local Goans call it Sunset Beach because the headline view is the sun dropping behind Bogmalo-Mormugao to the north — a sight Colva itself doesn''t get because the coastline angle blocks it.',
  'Quiet 1.5km beach with 8-10 family-run shacks, wider sand than Colva and far less weekend crowd. Named after the Betal idol that the village raised before the Portuguese era. Calm sea (May/June riptides aside) — safe for swimming with kids. Sunset point at the northern dunes faces directly west toward Mormugao port. Free entry; scooter parking ₹30.',
  'easy',
  'Goa Tourism Salcette beaches circuit; Tripadvisor 4.0 stars across 1,200+ reviews.',
  5,
  ARRAY['beach','sunset','quiet','family']::text[],
  '{}'::jsonb
),
(
  'colva-benaulim-cavelossim-mobor',
  'colva-benaulim',
  'Cavelossim and Mobor Beach',
  NULL,
  8,
  '20 min by scooter south from Benaulim',
  'Cavelossim and Mobor are 8km south of Benaulim — the last two beaches before the Sal river-mouth. Most Colva-Benaulim package crowds don''t go that far south because the Holiday Inn / Leela / Radisson are all on the Cavelossim strip and gate the access. The river-mouth at Mobor (where Sal meets the Arabian Sea) is open to anyone who walks the public-access path.',
  'Two contiguous 4km beaches running south to the Sal river-mouth. Cavelossim has the resorts; Mobor at the southern tip is the wild river-mouth where dolphin-spotting boats embark. Walk to the southernmost point at low tide — the river-mouth sandbank is a nesting site for migratory waders Oct-March. Calm shallow lagoon side for swimming. Public access via Mobor village road.',
  'easy',
  'Goa Tourism Salcette beach circuit; Goa Forest Department migratory bird census 2024.',
  4,
  ARRAY['beach','river-mouth','dolphin','quiet']::text[],
  '{}'::jsonb
),
(
  'colva-benaulim-chandor-heritage-homes',
  'colva-benaulim',
  'Chandor Heritage Homes (Casa Menezes Braganza)',
  NULL,
  12,
  '25 min by scooter or car from Benaulim toward Chandor village',
  'Chandor village is 12km inland and most Colva-Benaulim beach tourists never make it there — the heritage circuit is run on by-appointment phone bookings only, no walk-ins, and the houses sit unmarked on village lanes. Casa Menezes Braganza is the largest Indo-Portuguese mansion in Goa but you have to phone the owner to enter.',
  'Built 1730s by the Braganza family — a single mansion that runs the length of one full village street, divided into east and west wings (two branches of the family). 1km of frontage; rosewood furniture from Macau, Belgian crystal chandeliers, original Portuguese tiles, family library with 5,000+ books from 1800s. East wing visits by Aida Menezes Braganza phone appointment; west wing by Sara Fernandes. ₹100-200 donation. 9am-12:30pm and 3pm-6pm.',
  'easy',
  'INTACH Goa heritage listing; Goa Tourism heritage homes circuit; Lonely Planet Goa 2024 edition.',
  5,
  ARRAY['heritage','mansion','indo-portuguese','village']::text[],
  '{}'::jsonb
);
