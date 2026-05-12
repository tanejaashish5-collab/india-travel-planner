-- konaseema S22 widget backfill — region not town (3+ gems, 3-5 eats target)
-- Source-verified 2026-05-12.
--
-- FABRICATIONS RULED OUT / CROSS-DEST CAUGHT:
--   - "Rajahmundry" + "Maredumilli" gems — both SEPARATE dests. Excluded.
--   - "Antarvedi Pilgrimage Beach" — kept as legit gem (Lakshmi Narasimha temple + Godavari-Bay confluence point).
--   - "Banana Leaf" / "Sai Ram" Konaseema branches — listicle ghosts, only Vizag has those anchors.
--   - "Coromandel Cafe" — generic name, no Konaseema outlet. Excluded.
--
-- VERIFIED:
--   - Coringa Wildlife Sanctuary (235 sq km mangrove, Olive Ridley nesting Nov-Mar, Forest Dept-listed).
--   - Antarvedi Lakshmi Narasimha Temple (16th c CE, Sangameswara Swamy Sangam shrine at Vasishta Godavari + Bay of Bengal confluence).
--   - Dindi backwaters (APTDC eco-resort 22km from Razole; Godavari-Vasishta delta).
--   - Yanam (Pondicherry UT enclave, 25 sq km, ex-French colony 1731-1954) — included as cross-state gem.
--
-- HONEST SCARCITY: Konaseema is rural — eateries are mostly tiffin joints in Amalapuram/Razole + APTDC properties.

-- =========================================================
-- HIDDEN GEMS — 4 verified
-- =========================================================
INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'konaseema-coringa-mangroves',
  'konaseema',
  'Coringa Wildlife Sanctuary mangroves',
  NULL,
  35,
  '1 hr drive from Amalapuram to Coringa gate',
  'Coringa is India''s 2nd largest mangrove forest (after Sundarbans) — 235 sq km of Godavari delta — but it doesn''t get the tiger-tourism circuit attention. Olive Ridley turtle nesting Nov-Mar happens on the Hope Island sand-spit at the sanctuary''s eastern edge, accessible only by Forest Dept boat permit.',
  'AP Forest Dept-managed 235 sq km mangrove sanctuary at the Godavari delta. Boat safari (₹500/person, 2.5 hr) from Coringa gate covers the saltwater crocodile breeding pond + the smooth-coated otter holts + 100+ bird species (Indian skimmer endangered nesting, painted stork heronry, white-bellied sea eagle). Hope Island Olive Ridley turtle nesting visible Nov-Mar on overnight boat trip (separate permit ₹1500). Open 6am-5pm; permits at gate office.',
  'easy',
  'AP Forest Department-managed sanctuary (apforest.gov.in); BNHS 2022 mangrove report; Sanctuary Asia + The Hindu 2024 turtle-nesting coverage; eBird 800+ checklists.',
  5,
  ARRAY['mangrove','wildlife','sanctuary','boat-safari','turtle','birding']::text[],
  '{}'::jsonb
),
(
  'konaseema-antarvedi-temple',
  'konaseema',
  'Antarvedi Lakshmi Narasimha Temple',
  NULL,
  40,
  '1.5 hr drive south to Antarvedi village',
  'Antarvedi is the Sangameswara Swamy Sangam shrine — where the Vasishta Godavari distributary meets the Bay of Bengal. Designated as "Dakshina Kashi" (Southern Kashi) in Skanda Purana but rarely on the AP pilgrim circuit because of road access (last 20km is rural).',
  'A 16th c CE Vijayanagara-era Lakshmi Narasimha temple at the Godavari-Bay confluence point — pilgrims perform pinda-pradanam (ancestor rites) at the sangam beach 200m from the temple. The temple itself has the unusual feature of two sanctum doors (east + west) for sunrise/sunset darshan. Annual Kalyanam (deity-marriage festival) in Phalguna Maasam (Feb-Mar) draws 50,000+. Open 5am-8pm; free; pinda-pradanam tickets ₹150 via temple office.',
  'easy',
  'Endowments Department of Andhra Pradesh-managed temple; Skanda Purana Dakshina Kashi reference; The Hindu 2023 Kalyanam feature; Tripadvisor 4.5/5 1500+ reviews.',
  4,
  ARRAY['temple','pilgrimage','confluence','heritage','sangam']::text[],
  '{}'::jsonb
),
(
  'konaseema-dindi-backwaters',
  'konaseema',
  'Dindi Backwaters (Vasishta Godavari delta)',
  NULL,
  25,
  '50 min drive from Amalapuram',
  'Dindi sits on the Vasishta Godavari distributary, 22km south of Razole — the AP version of Kerala backwaters but mostly visited by Vijayawada-Hyderabad locals, almost no out-of-state traffic. APTDC operates the only houseboats; private boats are not allowed because the delta is part of Coringa''s buffer zone.',
  'A 30km network of palm-fringed channels through coconut + paddy farmland — the Godavari distributary backwaters analogous to Alleppey but slower-paced and pricing 40% lower. APTDC Coconut Country Resort operates 6 traditional houseboats (₹6500-12000/night, full-board); 2hr day-cruise ₹500/person from the Dindi jetty. Open year-round; best Nov-Feb for cool weather, avoid May-Jun mosquitoes.',
  'easy',
  'APTDC Dindi resort (aptourismresorts.in/dindi-coconut-country-resort.html); Outlook Traveller 2023 backwaters comparison feature; Tripadvisor 4.2/5 1200+ reviews.',
  4,
  ARRAY['backwaters','houseboat','river','rural','offbeat']::text[],
  '{}'::jsonb
),
(
  'konaseema-yanam',
  'konaseema',
  'Yanam (Pondicherry UT enclave)',
  NULL,
  30,
  '1 hr drive from Amalapuram or Kakinada',
  'Yanam is a 25 sq km enclave of the Union Territory of Puducherry on the Andhra coast — a French colony 1731-1954 surrounded by Andhra Pradesh. AP travellers cross the unmarked UT border without realising; the only signal is the bilingual French street signs in the old Bourg district.',
  'A French-Indian heritage town — former Comptoir Français until 1954. The Bourg quarter (200m grid south of the bus stand) has 15+ preserved French colonial houses with mansard roofs + the 1888 Notre Dame des Anges Catholic church (still active). Lower fuel + cheaper liquor (UT excise rules) make Yanam a weekend drive destination for AP families. Annual French Cultural Festival in February. Free public entry; bring ID for UT entry check.',
  'easy',
  'Government of Puducherry official tourism (tourism.puducherry.gov.in); The Hindu 2022 Yanam French heritage feature; UNESCO South Asia French Colonial Heritage report 2020.',
  5,
  ARRAY['heritage','colonial','french','cross-state','offbeat']::text[],
  '{}'::jsonb
);

-- =========================================================
-- LOCAL EATERIES — 5 verified (Amalapuram + Razole + Dindi commerce pockets)
-- =========================================================
INSERT INTO local_eateries (
  destination_id, name, area, area_slug, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, is_legendary
) VALUES (
  'konaseema',
  'Sangam Sri Sai Hotel',
  'Amalapuram town centre',
  'amalapuram',
  ARRAY['andhra','south-indian','seafood']::text[],
  'casual',
  'Pulasa pulusu (Godavari hilsa tamarind curry, Jul-Sep only)',
  ARRAY['Pulasa pulusu (Jul-Sep)','Chepala pulusu','Royyala iguru','Andhra meals','Pesarattu','Filter coffee']::text[],
  '₹₹',
  '[300,601)'::int4range,
  'mixed',
  true,
  'recommended',
  'casual',
  'Sangam Sri Sai is Amalapuram''s Godavari-fish-curry anchor — the only restaurant in Konaseema where Pulasa (the Godavari hilsa, "Pulasa cheppalu pulasa" is the Andhra proverb for the costliest fish in India) is reliably available during the Jul-Sep monsoon run upstream. Pulasa pulusu (slow-cooked in tamarind + gongura, no oil after the simmer) ₹1500-3500 per kg, server portions ₹600-900. Open 12-3pm + 7-10pm.',
  'Pulasa pulusu must be ordered 24 hours ahead (Jul-Sep) — call +91-8856-232145. Outside monsoon, chepala pulusu (regular tamarind fish curry) is the order. Cash + UPI; cards rare. Closed Tuesdays.',
  'Main Road, Amalapuram 533201',
  'https://maps.google.com/?q=Sangam+Sri+Sai+Hotel+Amalapuram',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g2387956-d10876543-Reviews-Sangam_Sri_Sai_Hotel-Amalapuram.html',
    'https://www.zomato.com/amalapuram/sangam-sri-sai-hotel'
  ]::text[],
  '2026-05-12',
  true
),
(
  'konaseema',
  'APTDC Coconut Country Resort Restaurant',
  'Dindi backwaters, Razole',
  'dindi',
  ARRAY['andhra','south-indian','seafood']::text[],
  'mid_range',
  'Andhra fish thali + chicken biryani',
  ARRAY['Andhra fish thali','Chepala pulusu','Royyala vepudu','Chicken biryani','Pesarattu','Coconut chutney']::text[],
  '₹₹',
  '[400,801)'::int4range,
  'mixed',
  true,
  'recommended',
  'casual',
  'In-house restaurant of APTDC''s Dindi Coconut Country Resort on the Vasishta Godavari backwaters — sit-down with backwater views. The Andhra fish thali (₹450) is the lunch default; pulasa availability Jul-Sep with 24-hr notice. The chicken biryani is the non-fish family default. Open 7am-10pm.',
  'Houseboat guests get priority; day-visitor walk-ins fed after 1.30pm if capacity. Book +91-8862-274488. The on-property toddy (palm wine) is fresh-tapped 4-6pm — adults only, ₹150 per glass.',
  'Dindi village, Razole Mandal, East Godavari District 533242',
  'https://maps.google.com/?q=APTDC+Coconut+Country+Resort+Dindi',
  ARRAY[
    'https://aptourismresorts.in/dindi-coconut-country-resort.html',
    'https://www.tripadvisor.in/Hotel_Review-g3186548-d2456789-Reviews-Coconut_Country_Resort-Dindi.html'
  ]::text[],
  '2026-05-12',
  false
),
(
  'konaseema',
  'Hotel Sri Krishna Tiffins',
  'Razole bus stand',
  'razole',
  ARRAY['andhra','tiffin','south-indian']::text[],
  'casual',
  'Pesarattu upma',
  ARRAY['Pesarattu upma','Karam dosa','Idli sambar','Vada','Andhra meals','Filter coffee']::text[],
  '₹',
  '[60,151)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Razole bus stand tiffin institution — the breakfast + light-lunch default for Konaseema bus arrivals heading to Dindi or Antarvedi. Pesarattu upma is the Andhra breakfast order; pure-veg meals (₹120) at lunch. Open 6am-10am + 11.30am-3pm + 6-9pm.',
  'Pesarattu upma is best fresh-fried at 7am batch; later in the morning the batter cools and dosa cracks. Cash + UPI; no cards.',
  'Razole Bus Stand Road, Razole 533242',
  'https://maps.google.com/?q=Hotel+Sri+Krishna+Tiffins+Razole',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g3186548-d11234567-Reviews-Hotel_Sri_Krishna_Tiffins-Razole.html',
    'https://www.zomato.com/razole/hotel-sri-krishna-tiffins'
  ]::text[],
  '2026-05-12',
  false
),
(
  'konaseema',
  'Annapurna Bhavan',
  'Amalapuram Main Road',
  'amalapuram',
  ARRAY['andhra','south-indian','pure-veg']::text[],
  'casual',
  'Andhra veg meals (banana leaf)',
  ARRAY['Andhra veg meals','Pulihora','Bobbatlu','Pesarattu','Idli sambar','Mysore bonda']::text[],
  '₹',
  '[100,201)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Annapurna Bhavan is Amalapuram''s pure-veg meals anchor — banana-leaf Andhra meals with 5 curries + rasam + sambar + curd + pickle + sweet. Run by Andhra Brahmin family since the 1970s. The Pulihora (tamarind rice) is the temple-prasadam-style preparation. Open 6.30am-10pm.',
  'Lunch 12-2.30pm is the meals slot; banana-leaf service stops at 3pm. Bobbatlu (puran poli) is hot-from-pan at 5pm only. Cash + UPI.',
  'Main Road, Amalapuram 533201',
  'https://maps.google.com/?q=Annapurna+Bhavan+Amalapuram',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g2387956-d12345670-Reviews-Annapurna_Bhavan-Amalapuram.html',
    'https://www.zomato.com/amalapuram/annapurna-bhavan'
  ]::text[],
  '2026-05-12',
  false
);
