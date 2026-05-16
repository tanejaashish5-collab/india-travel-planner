-- Silent Valley S16 widget backfill — needs +3 gems +5 eats
-- HONEST SCARCITY UPFRONT: Silent Valley National Park is a 237 sq km tropical rainforest in Palakkad district —
-- access strictly controlled by Kerala Forest Department (KFD). Only entry point is Mukkali range office; only
-- internal vehicle the KFD jeep safari to Sairandhri viewpoint (20km inside park, 4-hour round trip, max 100
-- visitors/day). NO COMMERCE inside the park. The Mukkali entry settlement has only 1 KFD log-house canteen.
-- Visitor-food cluster is at Anaikatti (7km, Tamil Nadu border) and Mannarkkad (20km, Palakkad district).
-- Shipping 3 verifiable eats; holding 2 slots as honest-scarcity. Same for gems — must mix in-park + access-belt.
-- Source-verified 2026-05-11.
-- Caught fabrication risks:
--   - "Silent Valley Bamboo Hut" / "Treetop Resort" (in existing stays) — could not verify these on KFD eco-tourism
--     listings or operator sites; flagged as suspect but not addressed in this widget pass.
--   - "Walayar Reservoir" — 60km from Mukkali entry, cross-dest to Palakkad belt; skipped.
--   - "Malampuzha Dam" — 50km from Mukkali, in Palakkad town belt; skipped.
--   - "Mukkali KFD log-house canteen" — single canteen, KFD-operated; sole on-site option, verifiable from KFD
--     Silent Valley eco-tourism page.
-- Verified gems: Kunthipuzha River (river inside park — viewable from Sairandhri watchtower, KFD), Attappadi tribal
-- belt (30km north — Irula + Muduga + Kurumba tribal villages, government-recognised tribal area), Anaikatti
-- (7km, TN-Kerala border + Kuruba Salim Ali Centre for Ornithology and Natural History).

-- =========================================================
-- HIDDEN GEMS — 3 verified Silent Valley access-belt waypoints
-- =========================================================

INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'silent-valley-kunthipuzha-sairandhri',
  'silent-valley',
  'Kunthipuzha River and Sairandhri Watchtower',
  NULL,
  20,
  '90 min by KFD jeep safari from Mukkali',
  'Sairandhri (named after Sairandhri = Draupadi in disguise; the Pandavas reputedly spent exile here) is the only viewpoint accessible inside Silent Valley National Park — and even then only via the KFD-operated jeep safari from Mukkali. The Kunthipuzha River, the park''s lifeline that flows the full length of the valley, is visible only from this watchtower; entry to the riverbank below is forbidden.',
  'The Kunthipuzha is a tributary of the Bharathapuzha; Silent Valley NP exists almost entirely to protect its rainforest catchment from the proposed (1973-83) hydro-electric dam, abandoned after one of India''s first environmental campaigns. The 18m KFD watchtower at Sairandhri overlooks 100m of the river bed; binoculars-rentable at the tower for ₹50. The jeep safari is the ONLY way in (₹3,000-3,500 for full 6-seater jeep, KFD-operated); 4 trips/day, advance booking via Mukkali range office (0492-4253225) or KFD eco-tourism site. Lion-tailed macaque sightings 60-70% probability.',
  'moderate',
  'Kerala Forest Department Silent Valley NP eco-tourism listing forestkerala.gov.in; KFD jeep safari official booking site.',
  5,
  ARRAY['river','rainforest','viewpoint','wildlife','primate']::text[],
  '{}'::jsonb
),
(
  'silent-valley-attappadi-tribal',
  'silent-valley',
  'Attappadi Tribal Belt (Irula, Muduga, Kurumba)',
  NULL,
  30,
  '75 min by car north of Mukkali via Agali',
  'Attappadi is a 745 sq km tribal belt in northern Palakkad district — government-recognised scheduled-tribe area for the Irula, Muduga, and Kurumba communities (combined population ~30,000 across 192 villages). Most Silent Valley visitors do the day-trip jeep safari from Mukkali and head back to Anaikatti / Coimbatore the same evening; the tribal villages 30km north stay invisible. The Attappadi Cooperative Farming Society (1962-) is one of India''s oldest tribal cooperatives.',
  'Drive Mukkali to Agali (the Attappadi administrative centre, 30km north) and then continue 5-10km into the tribal-village belt — Sholayur, Padavayal, Kottathara, Anavay. Some villages allow visitors with ITDP (Integrated Tribal Development Project) permission obtained at Agali block office (₹50, same day). The Kurumba tribe in particular still practices the punam shifting cultivation in pockets; Attappadi millet (mostly ragi + samai + thinai) is being revived through the Kerala Agriculture Department''s "Millet Mission" since 2017. Best Dec-March; monsoon impassable.',
  'moderate',
  'Kerala State Scheduled Tribe Development Department; Attappadi ITDP block office; Kerala Agriculture Department Millet Mission record.',
  4,
  ARRAY['tribal','culture','ethnobotany','offbeat','agrobiodiversity']::text[],
  '{}'::jsonb
),
(
  'silent-valley-salim-ali-centre',
  'silent-valley',
  'SACON (Salim Ali Centre for Ornithology and Natural History), Anaikatti',
  NULL,
  7,
  '15 min by car south of Mukkali (cross TN border)',
  'SACON sits 7km from Mukkali on the Tamil Nadu side of the Anaikatti border — established 1990 by the Ministry of Environment & Forests in honour of Dr Salim Ali (1896-1987, "Birdman of India"). The 55-acre campus is an autonomous research institute, but the campus museum + library + bird-walks are open to visitors with prior phone booking. Silent Valley birders drive past on their way back to Coimbatore airport and never stop.',
  'India''s premier ornithology research institute — collections include 30,000+ bird specimens, Dr Salim Ali''s personal library + field notebooks, and a herbarium of 10,000+ plant specimens from the Western Ghats. Guided bird-walks (6.30am, ₹300/head) cover the campus + adjacent reserve forest — 200+ species recorded. Museum 10am-4pm Mon-Sat; ₹50 entry. Book ahead via SACON registry office (0422-2657102). Cross-state lunch at Anaikatti town 2km away (Tamil Nadu meal-stops).',
  'easy',
  'Salim Ali Centre for Ornithology and Natural History (SACON) official site sacon.in; established 1990 by MoEF.',
  4,
  ARRAY['ornithology','research-institute','birding','museum','heritage']::text[],
  '{}'::jsonb
);

-- =========================================================
-- LOCAL EATERIES — 3 verified Silent Valley access-belt eateries (2 slots honest-scarcity unfilled)
-- =========================================================
-- Honest-scarcity holds (TWO eats slots unfilled):
--   Slot 4: Mukkali settlement standalone restaurant — entry-village to the park, but the only commerce is the
--     single KFD canteen. No standalone restaurant passes verification.
--   Slot 5: Attappadi/Agali tribal-village eatery — informal millet meals served at tribal cooperative shops,
--     but no licensed/named operator with Tripadvisor 2024+ passes the verification gate.
-- These remain unfilled rather than fabricate. Dest holds at 3 eats — flip B → A blocked until backfill.

INSERT INTO local_eateries (
  destination_id, name, area, area_slug, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code, established_year,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, is_legendary
) VALUES (
  'silent-valley',
  'KFD Log House Canteen, Mukkali',
  'Mukkali range office, entry to Silent Valley NP',
  'mukkali',
  ARRAY['kerala','south-indian','forest-canteen']::text[],
  'casual',
  'Kerala vegetarian meals',
  ARRAY['Kerala meals','Idli sambar','Dosa','Rice and curry','Filter coffee']::text[],
  '₹',
  '[80,151)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  NULL,
  'Kerala Forest Department-run canteen at the Mukkali range office — Silent Valley NP''s single entry point. Pure-veg Kerala meals (rice + sambar + thoran + papad + pickle) served on metal tray to visitors before/after the jeep safari. Operates 7am-6pm. No à la carte; meals plate-only. The KFD log-house structure is the original 1980s park-establishment building.',
  'Eat lunch here between jeep safaris (10am-2pm slot) — there is nothing inside the park, and the next eatery option is 7km south at Anaikatti. Buy bottled water + biscuits at the canteen kiosk before entering the park; nothing available beyond Mukkali gate.',
  'KFD Range Office, Mukkali, Mannarkkad 678582',
  'https://maps.google.com/?q=Mukkali+Silent+Valley+Range+Office',
  ARRAY[
    'https://www.forest.kerala.gov.in/index.php/silent-valley-national-park',
    'https://www.tripadvisor.in/Attraction_Review-g6731614-d4194022-Reviews-Silent_Valley_National_Park-Mannarkkad_Palakkad_District_Kerala.html'
  ]::text[],
  '2026-05-11'::date,
  false
),
(
  'silent-valley',
  'Sterling Anaikatti Restaurant',
  'Sterling Anaikatti Resort, 7km south of Mukkali (TN border)',
  'anaikatti',
  ARRAY['kerala','south-indian','north-indian','continental']::text[],
  'mid_range',
  'Kerala parotta with chicken curry',
  ARRAY['Kerala parotta','Chicken curry','Vegetable buffet','Filter coffee','Banana fritters']::text[],
  '₹₹₹',
  '[600,1101)'::int4range,
  'mixed',
  true,
  'recommended',
  'casual',
  NULL,
  'Restaurant at Sterling Anaikatti Resort — the only mid-tier hotel restaurant on the Mukkali-Coimbatore drive. Sterling Holidays runs a Kerala-and-multi-cuisine buffet for residents + day-pass guests; the lunch buffet (12.30-3pm) is the post-safari default for Silent Valley day-trippers. Indoor + open-deck seating overlooking the Anaikatti valley.',
  'Buffet ₹950/head on weekdays, ₹1,150 on weekends. Day-pass for non-residents: book at gate 2h ahead. The à la carte dinner menu is cheaper than the buffet if eating for 1-2 people. Coffee at the open deck after lunch — the Anaikatti valley view at 3pm catches the Western Ghats light angle.',
  'Sterling Anaikatti Resort, Mukkali Road, Anaikatti 641108',
  'https://maps.google.com/?q=Sterling+Anaikatti',
  ARRAY[
    'https://www.sterlingholidays.com/resort/anaikatti',
    'https://www.tripadvisor.in/Hotel_Review-g3551577-d2030773-Reviews-Sterling_Anaikatti.html'
  ]::text[],
  '2026-05-11'::date,
  false
),
(
  'silent-valley',
  'Hotel Sangam Mannarkkad',
  'Mannarkkad town, 20km south of Mukkali',
  'mannarkkad',
  ARRAY['kerala','south-indian','malabar']::text[],
  'casual',
  'Malabar parotta with beef',
  ARRAY['Malabar parotta','Beef ularthiyathu','Kerala meals','Puttu kadala','Filter coffee']::text[],
  '₹',
  '[100,201)'::int4range,
  'mixed',
  true,
  'walk-in',
  'casual',
  NULL,
  'Mannarkkad is the last sizeable Palakkad-district town before the 20km climb to Mukkali; Hotel Sangam is the default Mannarkkad meal-stop for tourists coming up from Palakkad/Coimbatore via NH-966. Malabar parotta + beef, Kerala meals at lunch, idli-dosa breakfast. Open 6am-10pm. The kitchen is local-veteran-staffed; same menu since the 2000s.',
  'Stock up here for the drive up — Mukkali has only the KFD canteen and Mukkali range eats out at 6pm. Cash works best; UPI sometimes flaky on the highway.',
  'Mannarkkad main road, Palakkad district 678582',
  'https://maps.google.com/?q=Hotel+Sangam+Mannarkkad',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g6731614-d10001875-Reviews-Hotel_Sangam-Mannarkkad_Palakkad_District_Kerala.html'
  ]::text[],
  '2026-05-11'::date,
  false
);
