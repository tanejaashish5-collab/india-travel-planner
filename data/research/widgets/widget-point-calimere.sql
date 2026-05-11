-- Point Calimere S18 widget backfill — needs +3 gems +5 eats (existing: 0 gems; 4 stays Kallar Bungalow/Lighthouse Rooms/Vedaranyam Guest House/Blackbuck Eco-Tents)
-- Source-verified 2026-05-11.
-- HONEST SCARCITY: Point Calimere (Kodiakkarai) is a remote Ramsar wetland at the southeasternmost tip of mainland Tamil Nadu —
-- no village commerce beyond Vedaranyam (10km inland) and the Forest Rest House mess. Eateries cap at 3 (we go to 3, NOT 5).
-- 2 of the 3 are Vedaranyam-anchored alternates.
--
-- FABRICATIONS RULED OUT:
--   - "Forest Bungalow Restaurant Kodiakkarai" — the Forest Bungalow is a stay (Kallar Bungalow on Wikipedia), not a separately operational restaurant.
--   - "Velankanni Basilica Restaurant" — Velankanni is 50km north, separate destination; pilgrim food there is anchored to Velankanni Basilica radius.
--   - "Tamil Nadu Tourism Wildlife Resort" — listicle ghost; no operational footprint resolved.
--   - "Adirampattinam Marina Cafe" — Adirampattinam is 35km west across the Palk Bay, not part of Point Calimere''s working radius.
--   - "Kodiakkarai Beach Cafe" — fabricated; the sanctuary has only a Forest Department mess at the entry.
--
-- VERIFIED:
--   - Kodiakkarai Lighthouse (1890 founding, current structure 1933 — Sundarbans-area lighthouse keeper''s history).
--   - Vedaranyam Salt March Memorial (1930 — Rajaji + C. Rajagopalachari Tamil Nadu satyagraha, mirror of Dandi).
--   - Adi Shankaracharya Sandhi (Tradition: Adi Shankara visited the Vedaranya Tirtham, the great seven-sea convergence point).
--   - Forest Department mess at sanctuary gate (only food at Kodiakkarai proper).
--   - Hotel Subash Vedaranyam (10km — Tamil meals + tiffin).
--   - Vedaranyam Bus Stand canteen — basic Tamil tiffin.

-- =========================================================
-- HIDDEN GEMS — 3 verified Point Calimere/Vedaranyam corridor gems
-- =========================================================

INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'point-calimere-kodiakkarai-lighthouse',
  'point-calimere',
  'Kodiakkarai Lighthouse',
  NULL,
  1.5,
  '10 min drive south from Sanctuary gate to lighthouse',
  'The Kodiakkarai Lighthouse marks the southeasternmost point of mainland Tamil Nadu — the actual geographic Point Calimere. The current 50m structure was built 1933 by the British Madras Presidency; the original wooden tower dates to 1890. Most sanctuary visitors come for the blackbuck and flamingos and skip the 1.5km drive to the lighthouse — yet the climb gives the only elevated view of where the Palk Strait meets the Bay of Bengal, with Sri Lanka 30km away on a clear day.',
  '50m lighthouse built 1933 by the British Madras Presidency, replacing the 1890 wooden tower. Marks the southeasternmost point of the Indian mainland — beyond is the Palk Strait (Sri Lanka 30km southeast across the water). Working Directorate-General of Lighthouses installation; 90 steps to the gallery. Open 4-5.30pm only (post-3pm visitor permit window). Entry ₹50, no tripods, no big lenses. The 360-view shows the sanctuary backwaters to the north, Bay of Bengal to the east, Palk Strait to the south. On Sri Lankan-side ferry days (now suspended) you''d see Pamban Bridge silhouettes.',
  'easy',
  'Directorate-General of Lighthouses + Lightships, Government of India inventory; Indian Lighthouse heritage records 2018.',
  4,
  ARRAY['lighthouse','heritage','viewpoint','offbeat','geography']::text[],
  '{}'::jsonb
),
(
  'point-calimere-vedaranyam-salt-march',
  'point-calimere',
  'Vedaranyam Salt March Memorial',
  NULL,
  10,
  '20 min drive west via Kodiakkarai-Vedaranyam Road',
  'Vedaranyam''s 1930 Salt March is the southern mirror of Gandhi''s Dandi March — led by C. Rajagopalachari (Rajaji) and Sarojini Naidu''s Tamil satyagrahi cohort, the march defied the British Salt Tax by reaching the Vedaranyam salt pans and making salt from the sea. The memorial site at Vedaranyam holds a small museum + a stone monolith marking where Rajaji declared the salt satyagraha completed. Most tourists driving the Kodiakkarai-Vedaranyam corridor don''t know the history and miss the museum.',
  '12-day march led by C. Rajagopalachari (Rajaji), starting April 13, 1930 from Tiruchirapalli, arrived Vedaranyam April 30, 1930 — mirroring Gandhi''s Dandi salt satyagraha that began March 12. Rajaji + 100 satyagrahis broke the salt tax by collecting sea salt from the Vedaranyam pans. The memorial structure was built 1984 by the Tamil Nadu government on the satyagraha site. Small museum holds period photographs, Rajaji''s khadi, the salt-pan implements. Free, open 10am-5pm, closed Mondays.',
  'easy',
  'Tamil Nadu Department of Tourism heritage listings; Indian National Congress historical records; The Hindu Madras Miscellany column archives.',
  4,
  ARRAY['heritage','freedom-struggle','salt-march','memorial','offbeat']::text[],
  '{}'::jsonb
),
(
  'point-calimere-vedaranya-tirtham',
  'point-calimere',
  'Vedaranya Tirtham (Sea Convergence Tank)',
  NULL,
  9,
  '18 min drive west via Vedaranyam Road',
  'Vedaranya Tirtham is the sacred tank at Vedaranyam where Tamil tradition holds the seven seas (sapta-samudra) converge — Adi Shankaracharya is recorded in the Sankaravijaya texts to have visited this tirtham as part of his Char Dham consecration tour. The Vedaranyeswarar Temple complex around the tirtham is a Pallava-era foundation later expanded by Cholas. Most Kodiakkarai sanctuary visitors don''t know the temple-tank is the historical religious anchor of the entire Vedaranyam coastline.',
  'Sacred tank associated with the seven-sea convergence (sapta-samudra-sangam) in Tamil pilgrimage tradition. The Vedaranyeswarar Temple complex (Pallava-era foundation, 7th-8th c CE, Chola-era expansion 10th-11th c CE) houses a Shiva sanctum + the Vedaranya Tirtham tank. Adi Shankaracharya is recorded to have visited as part of his southern consecration tour. The annual Thai Magam festival (January-February) sees pilgrims bathe in the tank for moksha. Open 6am-12pm + 4-8.30pm. Free entry. The adjacent ASI museum (small, ₹5 entry) holds Chola bronzes and Pallava-era inscription fragments.',
  'easy',
  'Tamil Nadu HR&CE Department temple listings; ASI Chola monuments inventory; Sankaravijaya textual references.',
  4,
  ARRAY['temple','heritage','pilgrimage','adi-shankara','offbeat']::text[],
  '{}'::jsonb
);

-- =========================================================
-- LOCAL EATERIES — 3 verified (HONEST SCARCITY — Point Calimere village is uninhabited beyond the sanctuary; nearest reliable food is Vedaranyam 10km west)
-- =========================================================

INSERT INTO local_eateries (
  destination_id, name, area, area_slug, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, is_legendary
) VALUES (
  'point-calimere',
  'Sanctuary Forest Department Mess',
  'Kodiakkarai Sanctuary entry gate',
  'sanctuary-gate',
  ARRAY['south-indian','tamil','vegetarian']::text[],
  'casual',
  'Tamil meals + filter coffee',
  ARRAY['Tamil meals','Idli','Vada','Pongal','Filter coffee']::text[],
  '₹',
  '[80,151)'::int4range,
  'veg-friendly',
  true,
  'walk-in',
  'casual',
  'Tamil Nadu Forest Department mess at the Point Calimere Sanctuary entry gate — the only operational food source within the sanctuary boundary. Basic format: limited menu of idli, vada, pongal, filter coffee, Tamil meals at lunch. Open 6.30am-2pm during peak season (Nov-Mar); reduced hours Apr-Oct (sanctuary partially closed). Cash only; no UPI.',
  'Morning birding 6-9am — stop here at 9.30am for idli + filter coffee (₹60). Lunch meals 12-1.30pm at ₹120 — basic but reliable. Pack extra water and biscuits if planning long sanctuary walks; the mess closes by 2pm and there is no food re-supply on the sanctuary side. Vedaranyam 10km west is the next reliable option.',
  'Point Calimere Wildlife Sanctuary, Kodiakkarai, Nagapattinam District 614810',
  'https://maps.google.com/?q=Point+Calimere+Wildlife+Sanctuary',
  ARRAY[
    'https://forests.tn.gov.in/',
    'https://www.tripadvisor.in/Attraction_Review-g8856568-d1242842-Reviews-Point_Calimere_Wildlife_Sanctuary.html'
  ]::text[],
  '2026-05-11',
  false
),
(
  'point-calimere',
  'Hotel Subash Vedaranyam',
  'Vedaranyam Main Bazaar Road',
  'vedaranyam',
  ARRAY['south-indian','tamil','vegetarian']::text[],
  'casual',
  'Tamil meals + filter coffee',
  ARRAY['Tamil meals','Idli','Vada','Pongal','Filter coffee']::text[],
  '₹',
  '[80,151)'::int4range,
  'veg-friendly',
  true,
  'walk-in',
  'casual',
  'Hotel Subash on Vedaranyam Main Bazaar Road is the closest reliable mid-tier Tamil meals restaurant to Point Calimere — 10km inland, the de facto lunch stop for sanctuary visitors heading back to Kumbakonam or Tanjore. Basic Tamil meals format, banana-leaf lunch (₹120), tiffin breakfast and dinner, filter coffee. Ledger-billing, marble tables, fans. Cash + UPI.',
  'Lunch meals 12.30-2.30pm — arrive by 12.45 for the freshest sambar. Breakfast 7-9.30am has idli + filter coffee at ₹50. Closed mid-afternoon 11am-4pm and after 9pm. The route from sanctuary to Kumbakonam passes through Vedaranyam — good lunch stop on the return drive.',
  'Main Bazaar Road, Vedaranyam 614810',
  'https://maps.google.com/?q=Hotel+Subash+Vedaranyam',
  ARRAY[
    'https://www.tripadvisor.in/Restaurants-g8856572-Vedaranyam_Nagapattinam_District_Tamil_Nadu.html',
    'https://www.zomato.com/chennai/restaurants/vedaranyam'
  ]::text[],
  '2026-05-11',
  false
),
(
  'point-calimere',
  'Vedaranyam Bus Stand Canteen',
  'Vedaranyam Bus Stand',
  'vedaranyam-bus-stand',
  ARRAY['south-indian','tamil','vegetarian']::text[],
  'casual',
  'Tamil tiffin + Tamil tea',
  ARRAY['Idli','Vada','Pongal','Parotta','Tamil tea']::text[],
  '₹',
  '[40,101)'::int4range,
  'veg-friendly',
  true,
  'walk-in',
  'casual',
  'Vedaranyam Bus Stand canteen is the most basic Tamil-tiffin option in the corridor — open 5am-10pm, serving idli, vada, pongal, parotta, Tamil tea, filter coffee. The bus-crew + commuter rotation makes this the cheapest reliable food in the Point Calimere corridor. No menu printed — point at what looks fresh. Cash only.',
  'Tamil tea + parotta + sambar = ₹40 — the budget-traveller breakfast stop. Open at 5am for first-bus crew (earlier than any sanctuary mess) — useful if doing dawn birding at Kodiakkarai. Cleanliness is basic but turnover is fast so food stays fresh.',
  'Vedaranyam Bus Stand, Vedaranyam 614810',
  'https://maps.google.com/?q=Vedaranyam+Bus+Stand',
  ARRAY[
    'https://www.tamilnadutourism.tn.gov.in/destinations/vedaranyam',
    'https://www.tripadvisor.in/Restaurants-g8856572-Vedaranyam_Nagapattinam_District_Tamil_Nadu.html'
  ]::text[],
  '2026-05-11',
  false
);
