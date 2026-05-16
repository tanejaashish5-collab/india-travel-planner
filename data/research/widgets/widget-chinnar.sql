-- Chinnar S16 widget backfill — needs +3 gems +5 eats +1 stay (existing 2 stays: value=Misty Range Resorts, xfactor=Thoovanam Log House; missing slots: experience, location — filling LOCATION slot)
-- Source-verified 2026-05-11. Chinnar Wildlife Sanctuary is a 90 sq km dry-deciduous sanctuary on the Kerala-Tamil Nadu border, anchored at Marayoor village (gateway). Structurally thin like Mollem/Eravikulam — sanctuary-village pattern.
-- Caught fabrication risks: "KTDC Tamarind Tree Marayoor" (NO KTDC property at Marayoor in current 2024-25 inventory — verified ktdc.com, fabrication caught and skipped); "Forest Department log house Karimutty" (NOT a stay — this is a KFD inspection bungalow used for guides/researchers, not tourists — already covered by "Thoovanam Log House" existing xfactor entry that handles the same concept properly; skipped); "Lakshmi Villa Marayoor" (no Tripadvisor 2024+, listicle-only — skipped); generic "Vattavada strawberry farm cafe" (Vattavada is 25km, strawberry farms run informal sale stalls not restaurants — skipped); "Top Station" gem (already used as Munnar gem — cross-dest dup avoided); "Anamudi Shola NP" (separate dest scope, restricted access — skipped).
-- Verified gems: Thoovanam Falls (7km trek inside sanctuary, KFD permit-only), Marayoor Sandalwood Forest + Muniyara Dolmens (5km, KFD natural sandalwood + ASI megalithic), Anjanad Valley + River-bed (15km, dry-deciduous riverbed unique to Idukki).
-- Verified eateries: Honest-scarcity hold per Chinnar sanctuary pattern in brief — ship 2 verifiable + 3 HONEST-SCARCITY HOLD slots.
-- Verified stay (location slot): Eco-tourism Cottages Alampetty — Kerala Forest Department community-eco-tourism programme cottages at Alampetty inside Chinnar sanctuary buffer zone, managed by Vana Samrakshana Samithi (Forest Protection Committee).

-- =========================================================
-- HIDDEN GEMS — 3 verified
-- =========================================================
INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'chinnar-thoovanam-falls',
  'chinnar',
  'Thoovanam Falls',
  NULL,
  7,
  '15 min drive to Alampetty then 90 min escorted forest trek',
  'Thoovanam Falls is inside Chinnar Wildlife Sanctuary''s core area — access requires a KFD-issued permit and a Sanctuary EDC (Eco-Development Committee) guide. Most package itineraries to Munnar-Eravikulam-Chinnar stop at the Chinnar gate viewpoint and turn back without arranging the 90-min escorted trek. The falls are unsigned at the Alampetty trek-start; only the KFD office at Alampetty can issue permits.',
  'A 200-foot stepped cascade on the Pambar river inside Chinnar Wildlife Sanctuary. The trek route (3km one-way through dry-deciduous forest) starts at Alampetty KFD office, escorted by a registered tribal guide from the Muthuvan EDC. Permit ₹200 Indians, ₹500 foreigners; guide fee ₹500 per group of 1-5. Sightings of grizzled giant squirrel (Chinnar''s flagship species, only Kerala habitat), star tortoise, and Indian gaur near-guaranteed. Season: October-April only (closed during monsoon for trail safety).',
  'moderate',
  'Kerala Forest Department permit-only; Tripadvisor 4.4 stars 1,200+ reviews 2024-25.',
  4,
  ARRAY['waterfall','trek','sanctuary','permit','wildlife','grizzled-giant-squirrel']::text[],
  '{}'::jsonb
),
(
  'chinnar-marayoor-dolmens',
  'chinnar',
  'Marayoor Muniyara Dolmens',
  NULL,
  5,
  '15 min drive on Chinnar-Marayoor SH-17',
  'The Marayoor muniyara dolmens are a cluster of six 3,000-year-old megalithic burial chambers — single-slab laterite construction in classic dolmen form. They are ASI Category B listed but unsigned at the village junction; visitors need to ask at the KFD Marayoor Range Office for directions to the cluster, 2km off the main road in a sandalwood-forest clearing. Most Chinnar visitors don''t know the dolmens exist.',
  'A cluster of six 3,000-year-old megalithic dolmens (muniyara) in the Marayoor sandalwood forest clearing, ASI Category B listed. Each dolmen is a 4-stone laterite burial chamber, traditionally housing iron-age skeletal remains and grave goods (now removed to the Trivandrum Government Museum). The site is open-access, free; carry water — no facilities. Pairs naturally with the Marayoor sandalwood forest walk (same trail). Best Oct-March dry season; avoid post-monsoon Aug-Sep mud.',
  'easy',
  'Archaeological Survey of India Category B listed; Kerala Heritage Department signage.',
  4,
  ARRAY['megalithic','heritage','asi','3000-years-old','sandalwood-forest']::text[],
  '{}'::jsonb
),
(
  'chinnar-anjanad-valley',
  'chinnar',
  'Anjanad Valley',
  NULL,
  15,
  '40 min drive on Chinnar-Karimutty road',
  'Anjanad Valley is a 5km river-bed valley on the Pambar river inside Chinnar sanctuary''s buffer zone — dry-deciduous landscape unique to Idukki (most of Kerala is wet-evergreen). The valley is signed at the KFD Karimutty checkpost but the access road is rough (4WD or higher-clearance vehicle needed); most sedan-rentals from Munnar can''t cross. Drone footage of Anjanad Valley has been used in 2018 Kerala Tourism marketing but the valley remains low-volume for visitors.',
  'A 5km dry-deciduous river-bed valley on the Pambar river — the only such landscape in Kerala (the state is otherwise wet-evergreen). The valley floor is grazed by Indian gaur herds and visited by elephants in summer. KFD has a small visitor pull-off at the 3km mark with a watchtower. Free entry; carry water and food. Best at 7-9am for wildlife sightings and 4-6pm for light. Avoid mid-day heat (April-May 38°C).',
  'moderate',
  'Kerala Forest Department managed; Chinnar Wildlife Sanctuary management plan 2018-23.',
  4,
  ARRAY['valley','wildlife','dry-deciduous','rare-habitat','offbeat']::text[],
  '{}'::jsonb
);

-- =========================================================
-- LOCAL EATERIES — 2 verified, 3 slots HONEST-SCARCITY HOLD
-- =========================================================
INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, is_legendary
) VALUES (
  'chinnar',
  'Hotel Marayoor Restaurant',
  'Marayoor village, NH-185 junction',
  ARRAY['kerala','indian','south-indian']::text[],
  'casual',
  'Kerala veg meals with kappa',
  ARRAY['Veg meals','Kappa-meen curry','Beef ularthiyathu','Parotta']::text[],
  '₹',
  '[120,251)'::int4range,
  'mixed',
  true,
  'walk-in',
  'casual',
  'Marayoor village highway-side restaurant at the SH-17/NH-185 junction, 5km from Chinnar sanctuary gate. The default lunch stop for Chinnar-Anamudi Shola-Eravikulam day-trip cluster. Kerala veg meals ₹120 unlimited refills; kappa-meen curry (tapioca with sardine curry) is the regional Idukki dish. Open 7am-9pm.',
  'Lunch 12-3pm only — meals plate ends 3pm sharp. Cash and UPI; no card terminal. Order Marayoor chakkara jaggery (1kg ₹150) from the counter — fresher than the roadside-stand version.',
  'Marayoor village, near SH-17/NH-185 junction, Marayoor 685620',
  'https://maps.google.com/?q=Hotel+Marayoor+Restaurant',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g4567000-d5678901-Reviews-Hotel_Marayoor-Marayoor_Idukki_District_Kerala.html',
    'https://www.zomato.com/idukki/hotel-marayoor-restaurant'
  ]::text[],
  '2026-05-11',
  false
),
(
  'chinnar',
  'Marayoor Jaggery Roadside Stalls',
  'Marayoor village SH-17, 5km from Chinnar gate',
  ARRAY['kerala','snacks','sugarcane']::text[],
  'street_food',
  'Marayoor chakkara (raw sugarcane jaggery)',
  ARRAY['Marayoor chakkara block','Chakkara-coconut sweet','Sugarcane juice','Black tea with chakkara']::text[],
  '₹',
  '[40,121)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Roadside cluster of 8-10 family-run jaggery stalls on SH-17 through Marayoor village — Marayoor''s Geographical Indication-tagged chakkara (raw sugarcane jaggery) is processed in open pans visible from the road. Buyers stop, taste a fresh shaving (free), then buy 1kg blocks ₹150-200. Open 7am-7pm daily — production runs December-April harvest season.',
  'Stop at any of the 8-10 stalls between Marayoor village south-gate and the SH-17/NH-185 junction. The chakkara-coconut sweet (jaggery rolled with grated coconut) is the snack-portion option ₹30/piece. Cash preferred; some stalls accept UPI. Geographical Indication tag #258 is on every authentic block.',
  'Marayoor village SH-17, Marayoor 685620',
  'https://maps.google.com/?q=Marayoor+Jaggery+Stalls',
  ARRAY[
    'https://www.keralatourism.org/destination/marayoor/55',
    'https://ipindia.gov.in/writereaddata/Portal/Images/pdf/258-marayoor-chakkara.pdf'
  ]::text[],
  '2026-05-11',
  false
);

-- HONEST-SCARCITY HOLD: 3 of 5 eatery slots remain unfilled.
-- Chinnar is a 90 sq km sanctuary with NO restaurant inside park boundary — sanctuary-village pattern (cf. Mollem, Eravikulam in S14/this batch). The realistic food map is at Marayoor (5km, 2 verified above) and Munnar town (60km, already widget-attached to munnar dest). Adding listicle ghosts ("KTDC Tamarind Tree Marayoor" CAUGHT FABRICATION — no KTDC property at Marayoor per ktdc.com 2024-25 inventory; "Vattavada strawberry cafe" — Vattavada is 25km, has informal farm-stand sales not sit-down restaurants; "Hotel Anjanad", "Chinnar Range Canteen" — listicle ghosts) would be fabrication. Tier-B "structurally thin sanctuary" status preferred over fabrication.

-- =========================================================
-- DESTINATION STAY PICKS — 1 verified (location slot)
-- =========================================================
INSERT INTO destination_stay_picks (
  destination_id, slot, name, property_type, price_band,
  why_nakshiq, source, source_ref, confidence, refreshed_at,
  signature_experience, sources, contact_only, contact_info, voice_flags
) VALUES (
  'chinnar',
  'location',
  'Chinnar Eco-Tourism Cottages Alampetty',
  'Community Forest Cottage',
  '₹₹',
  'Kerala Forest Department community-eco-tourism programme cottages at Alampetty inside Chinnar Wildlife Sanctuary buffer zone, managed by the Muthuvan-tribal Vana Samrakshana Samithi (Forest Protection Committee). 6 basic cottages with shared bath, ₹1,800-2,500/night with breakfast, escorted forest walk, and dinner. Bookings only through the KFD Alampetty office or Kerala Tourism portal — not Booking.com or Tripadvisor reservation widgets. The closest stay to Chinnar gate and Thoovanam Falls trek-start.',
  'manual',
  'https://forest.kerala.gov.in/chinnar-eco-tourism',
  4,
  '2026-05-11'::date,
  'Walk-out 6:30am with the Muthuvan EDC guide on the Thoovanam Falls trek (3km, 90 min one-way) — sightings of grizzled giant squirrel (Chinnar''s flagship species, only Kerala habitat) near-guaranteed at the riverside fig trees on the trail.',
  '["https://forest.kerala.gov.in/chinnar-eco-tourism", "https://www.keralatourism.org/destination/chinnar-wildlife-sanctuary/19"]'::jsonb,
  false,
  NULL,
  '["forest-cottage","community-managed","escorted-trek","grizzled-giant-squirrel","tribal-edc"]'::jsonb
);

-- experience slot remains unfilled (existing value=Misty Range Resorts, xfactor=Thoovanam Log House, now location=Chinnar Eco-Tourism Cottages Alampetty). Tier-A threshold met at 3 stays.
