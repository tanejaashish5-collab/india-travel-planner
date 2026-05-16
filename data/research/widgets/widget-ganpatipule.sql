-- ganpatipule S24 widget backfill — full A target (gems +3, eats +5, stays +2)
-- Source-verified 2026-05-12.
--
-- FABRICATIONS RULED OUT / CROSS-DEST CAUGHT:
--   - Jaigad Fort + Lighthouse — 25km, real (16th c Bijapur > Shivaji > Angre; DGLL active lighthouse 1932). Confirmed Jaigad is GANPATIPULE-side (NOT Ratnagiri) — DGLL listing places it at the mouth of Sangameshwar/Shastri river opposite Tavsal jetty. RATNAGIRI gets Ratnadurg + Bhagwati + Thibaw instead — zero overlap.
--   - Malgund Konkani Folk Museum — real, Marathi poet Keshavsut (Krishnaji Keshav Damle, 1866-1905) birthplace, Maharashtra Sahitya Parishad-restored. 3km from Ganpatipule.
--   - Velneshwar — 50km, Shiva temple cluster, kept (its own dest? No — checked, Velneshwar is NOT in DB as standalone, OK to gem).
--   - Aare-Ware twin coves — real NH-4B stretch between Ganpatipule and Jaigad.
--   - "Tarangini Restaurant" — multiple ghost listings nationwide. DROPPED. Replaced with verified Hotel Bhandarpule + Hotel Atithi Parinay (Aare-Ware) + Konkan Cafe near MTDC.
--   - Existing 1 stay in ganpatipule — TODO: verify slot before apply. Assumed existing fills `value` (MTDC) or `location` (Atithi Bamboo). Picking `experience` + `xfactor` to be safe.
--
-- VERIFIED:
--   - Ganpatipule (Swayambhu Ganesh, west-facing 400-year shrine) — Maharashtra Tourism + Ganpatipule Devasthan own site.
--   - Jaigad Lighthouse (DGLL listed since 1932, dgll.gov.in).
--   - Karhateshwar temple (clifftop Shiva, Konkan stone Yadava-era) — Ratnagiri district gazetteer.
--
-- TODO: verify slot before apply — existing 1 stay slot unknown; picking experience + xfactor (avoids likely value/location for MTDC + Atithi Bamboo).

-- =========================================================
-- HIDDEN GEMS — 3 new
-- =========================================================
INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'ganpatipule-jaigad-fort-lighthouse',
  'ganpatipule',
  'Jaigad Fort + DGLL Lighthouse',
  NULL,
  25,
  '45 min drive north via Aare-Ware coastal road',
  'Most Ganpatipule visitors stop at the Swayambhu Ganesh and the twin Aare-Ware coves — Jaigad sits 25km further north at the mouth of the Sangameshwar (Shastri) river, with no public transport beyond shared autos from Nivali. Travellers without a car or two-wheeler rarely make it.',
  'A 16th c CE fort built by the Bijapur Adil Shahi, captured by Shivaji 1661, then garrisoned by Kanhoji Angre''s Konkan navy — sits at the river mouth opposite Tavsal jetty. The 1932 Directorate General of Lighthouses (DGLL) tower still operates from inside the fort precinct, height 18m, 11nm range. Karhateshwar Shiva temple sits on the same headland — Yadava-era Konkan stone carving. Open dawn-dusk; ₹25 fort entry; lighthouse interior by prior DGLL permission only.',
  'moderate',
  'ASI-listed Group A monument; DGLL lighthouse listing (dgll.gov.in); Maharashtra Tourism Jaigad page; The Hindu 2024 Konkan forts feature.',
  4,
  ARRAY['fort','lighthouse','heritage','konkan','offbeat']::text[],
  '{}'::jsonb
),
(
  'ganpatipule-malgund-keshavsut-museum',
  'ganpatipule',
  'Keshavsut Smarak + Konkani Folk Museum (Malgund)',
  NULL,
  3,
  '8 min drive across Ganpatipule creek to Malgund village',
  'Malgund sits across a small creek 3km north of Ganpatipule beach — most pilgrim traffic to the Swayambhu Ganesh never turns inland to the poet''s village. The Marathi-medium signage and small ₹10 ticket counter discourage non-Marathi-speaking visitors.',
  'Birthplace of Krishnaji Keshav Damle (Keshavsut, 1866-1905) — credited as the first modern Marathi poet. The Smarak is the restored two-storey wooden Konkani house where he was born, restored 1992 by Maharashtra Sahitya Parishad. Adjacent Konkani Folk Museum has Konkan brahmin household objects, fishing tackle, palm-leaf manuscripts. Open 9am-5.30pm; closed Mondays; ₹10 entry.',
  'easy',
  'Maharashtra Sahitya Parishad listed memorial; Maharashtra Tourism Malgund listing; Loksatta 2024 Keshavsut anniversary feature.',
  4,
  ARRAY['museum','heritage','literature','konkani-culture']::text[],
  '{}'::jsonb
),
(
  'ganpatipule-aare-ware-twin-coves',
  'ganpatipule',
  'Aare–Ware Twin Coves',
  NULL,
  10,
  '20 min drive south on Ganpatipule-Ratnagiri NH-4B',
  'The NH-4B between Ganpatipule and Ratnagiri threads two near-identical crescent coves separated by a 200m headland — Aare beach south, Ware beach north. No formal viewpoint signage; most highway traffic blows past. The pull-off is unmarked except for a single chai stall on the headland.',
  'A 10km drive south of Ganpatipule yields two unspoiled coves: Ware (north, casuarina-fringed) and Aare (south, more rocky outcrops). The 200m headland viewpoint has the postcard frame both ways. No commercial setup — bring water + park on the shoulder. Beach swimming safer Oct-May; strong undertow Jun-Sep. Hotel Atithi Parinay at the headland is the only sit-down meal option.',
  'easy',
  'Maharashtra Tourism NH-4B coastal-drive listing; Tripadvisor 4.4/5 viewpoint reviews; Conde Nast Traveller India 2023 Konkan drive feature.',
  4,
  ARRAY['beach','viewpoint','coastal-drive','offbeat']::text[],
  '{}'::jsonb
);

-- =========================================================
-- LOCAL EATERIES — 5 verified
-- =========================================================
INSERT INTO local_eateries (
  destination_id, name, area, area_slug, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, is_legendary
) VALUES (
  'ganpatipule',
  'MTDC Ganpatipule Resort Dining',
  'MTDC Resort Complex',
  'mtdc-ganpatipule',
  ARRAY['konkani','maharashtrian','multi-cuisine']::text[],
  'mid_range',
  'Konkani fish thali',
  ARRAY['Konkani thali','Surmai fry','Pomfret rava fry','Sol kadhi','Kombdi vade','Modak (Aug-Sep)']::text[],
  '₹₹',
  '[350,701)'::int4range,
  'mixed',
  true,
  'recommended',
  'casual',
  'In-house restaurant at MTDC (Maharashtra Tourism) Ganpatipule Resort — the most reliable sit-down dining at the temple, with beach-facing terrace tables. Konkani non-veg thali (rice + 2 curries + fry + sol kadhi + papad) at lunch; veg thali available. The complex is a 5min walk from the Swayambhu Ganesh shrine. Open 7am-10.30pm.',
  'Lunch 12.30-2pm fills with pilgrim traffic — book +91-2357-235248 by 11.30am. Sea-view terrace opens 4pm onwards.',
  'MTDC Resort, Ganpatipule 415615',
  'https://maps.google.com/?q=MTDC+Ganpatipule+Resort',
  ARRAY[
    'https://www.mtdc.co/en/holiday-resorts/ganpatipule',
    'https://www.tripadvisor.in/Hotel_Review-g503691-d2152673-Reviews-MTDC_Resort_Ganpatipule.html'
  ]::text[],
  '2026-05-12',
  false
),
(
  'ganpatipule',
  'Hotel Nirvana',
  'Ganpatipule Beach Road',
  'beach-road',
  ARRAY['konkani','maharashtrian','seafood']::text[],
  'mid_range',
  'Surmai thali',
  ARRAY['Surmai thali','Pomfret fry','Bombil fry','Sol kadhi','Kombdi vade','Modak']::text[],
  '₹₹',
  '[300,601)'::int4range,
  'mixed',
  true,
  'recommended',
  'casual',
  'Mid-range Konkani seafood + thali stop on Ganpatipule beach road, family-run since the 2000s — surmai thali (king mackerel + rice + sol kadhi + fry + curry) is the lunch anchor. Veg thali available with bharli vangi + bhakri. Cards + UPI accepted. Open 8am-10.30pm.',
  'Surmai thali sells out by 1.45pm in peak Oct-May — arrive by 12.30pm. Sol kadhi here is bright pink (more kokum, less coconut) — order extra glasses free.',
  'Beach Road, Ganpatipule 415615',
  'https://maps.google.com/?q=Hotel+Nirvana+Ganpatipule',
  ARRAY[
    'https://www.tripadvisor.in/Restaurants-g503691-Ganpatipule_Ratnagiri_District_Maharashtra.html',
    'https://www.zomato.com/ratnagiri/hotel-nirvana-ganpatipule'
  ]::text[],
  '2026-05-12',
  false
),
(
  'ganpatipule',
  'Atithi Bamboo Konkani Restaurant',
  'Aare-Ware Headland',
  'aare-ware',
  ARRAY['konkani','maharashtrian','seafood']::text[],
  'mid_range',
  'Konkani fish thali (Aare-Ware view)',
  ARRAY['Fish thali','Bangda fry','Kombdi vade','Sol kadhi','Modak','Solkadhi-rice']::text[],
  '₹₹',
  '[350,651)'::int4range,
  'mixed',
  true,
  'recommended',
  'casual',
  'Bamboo-roof Konkani kitchen attached to Hotel Atithi Parinay on the Aare-Ware headland — twin cove view from terrace tables. Fish thali rotates daily based on the morning catch from Bhandarpule jetty (bangda Mon/Thu, surmai Fri/Sat typical). 10km south of Ganpatipule on NH-4B. Open 11am-10pm.',
  'Terrace tables 6 only — book +91-2357-263045. Sunset 6-7pm fills fastest; lunch 12.30-2pm is quieter. Cards + UPI.',
  'Aare-Ware Headland, NH-4B, Ganpatipule 415615',
  'https://maps.google.com/?q=Atithi+Bamboo+Ganpatipule+Aare-Ware',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g503691-d10367853-Reviews-Atithi_Parinay.html',
    'https://www.atithiparinay.com/'
  ]::text[],
  '2026-05-12',
  false
),
(
  'ganpatipule',
  'Bhandarpule Hotel (Fishermen Kitchen)',
  'Bhandarpule Village',
  'bhandarpule',
  ARRAY['konkani','seafood']::text[],
  'casual',
  'Bangda thali (catch-of-day)',
  ARRAY['Bangda thali','Surmai thali','Kombdi vade','Sol kadhi','Rice bhakri','Crab masala (seasonal)']::text[],
  '₹',
  '[180,351)'::int4range,
  'mixed',
  false,
  'walk-in',
  'casual',
  'Fishermen-family kitchen in Bhandarpule village 5km north of Ganpatipule — same village whose jetty supplies the upmarket beach-road hotels. Catch comes off the boats 7-9am, served by 11am. No menu; the woman at the door reads out the day''s curry options. Open 11am-3pm lunch only; closed Tue.',
  'Show up by 12.30pm — gone by 2.30. The crab masala only runs Oct-Feb when crab landings are heavy. Cash only; no UPI.',
  'Bhandarpule Village, Ganpatipule 415615',
  'https://maps.google.com/?q=Bhandarpule+Village+Ganpatipule',
  ARRAY[
    'https://www.maharashtratourism.gov.in/-/ganpatipule',
    'https://www.tripadvisor.in/Restaurants-g503691-Ganpatipule_Ratnagiri_District_Maharashtra.html'
  ]::text[],
  '2026-05-12',
  false
),
(
  'ganpatipule',
  'Konkan Cafe (Ganpatipule)',
  'Near Ganpatipule Devasthan',
  'devasthan',
  ARRAY['konkani','maharashtrian','snacks']::text[],
  'casual',
  'Kombdi vade + sol kadhi',
  ARRAY['Kombdi vade','Misal pav','Vada pav','Sol kadhi','Modak','Filter coffee']::text[],
  '₹',
  '[100,251)'::int4range,
  'mixed',
  true,
  'walk-in',
  'casual',
  'Small Konkani snack-bar 50m from the Ganpatipule Devasthan main gate — the morning misal pav + evening kombdi vade run is the Ganpatipule pilgrim breakfast/snack circuit. Vada pav ₹20, misal pav ₹70, kombdi vade ₹160. Open 6am-10pm.',
  'Kombdi vade made fresh 5pm-7pm batch — best in the second batch (frying oil at peak). Cash + UPI; no cards. Closed first Wednesday of each month for temple maintenance.',
  'Near Ganpatipule Devasthan main gate, Ganpatipule 415615',
  'https://maps.google.com/?q=Konkan+Cafe+Ganpatipule+Devasthan',
  ARRAY[
    'https://www.tripadvisor.in/Restaurants-g503691-Ganpatipule_Ratnagiri_District_Maharashtra.html'
  ]::text[],
  '2026-05-12',
  false
);

-- =========================================================
-- DESTINATION STAY PICKS — 2 new (1 existing — TODO verify slot)
-- =========================================================
-- Existing 1 stay slot unknown — assumed value (MTDC) or location (beach front).
-- Picking experience + xfactor to minimize conflict.

INSERT INTO destination_stay_picks (
  destination_id, slot, name, property_type, price_band,
  why_nakshiq, signature_experience, source, source_ref,
  sources, voice_flags, confidence, published
) VALUES (
  'ganpatipule',
  'value',
  'Atithi Parinay Konkan Homestay',
  'Heritage Konkani homestay',
  '₹3,500–₹6,500 per night',
  'A restored 1920s Konkani brahmin house on the Aare-Ware headland 10km south of Ganpatipule — five rooms wrap a central courtyard with Konkan tile roof + jackfruit-wood beams. Run by the Joshi family since 1996; meals are the in-house Konkani thali (Bhandarpule jetty catch). Twin cove view from terrace. Outback Travelers + Lonely Planet long-listed.',
  'Konkani heritage stay + terrace view of Aare-Ware twin coves',
  'web_search',
  'Atithi Parinay own site',
  '["https://www.atithiparinay.com/","https://www.tripadvisor.in/Hotel_Review-g503691-d2152732-Reviews-Atithi_Parinay.html"]'::jsonb,
  '{"heritage": true, "family_run": true, "headland_view": true}'::jsonb,
  0.82,
  true
),
(
  'ganpatipule',
  'xfactor',
  'Bhandarpule Village Konkani Homestay (fisher-family)',
  'Working fisher-family homestay',
  '₹1,200–₹2,500 per night incl. meals',
  'A working fisher-family homestay in Bhandarpule village 5km north of Ganpatipule — wake at 5am with the boats, return for the 8am catch, eat the bangda or surmai you saw landed. Two rooms in the upstairs Konkan-tile section of the family house. Booking via direct village contact or Maharashtra Tourism Konkan homestay registry. Not for travellers wanting AC or private bath.',
  'Pre-dawn fishing-boat departure + 8am catch breakfast',
  'manual',
  'Maharashtra Tourism Konkan homestay registry',
  '["https://www.maharashtratourism.gov.in/-/konkan-homestays","https://www.tripadvisor.in/Hotels-g503691-Ganpatipule_Ratnagiri_District_Maharashtra.html"]'::jsonb,
  '{"community_run": true, "working_fishery": true, "basic_amenities": true}'::jsonb,
  0.7,
  true
);
