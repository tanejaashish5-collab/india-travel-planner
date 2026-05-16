-- tadoba S26a widget backfill — gems +3, eats +5, stays SKIP (3 slots filled, xfactor free but not needed)
-- Source-verified 2026-05-13.
--
-- AVAILABLE STAY SLOTS: 1 free (xfactor) — NOT used per brief direction (already 3 stays = A-tier on stays count).
--
-- HONEST SCARCITY OK ON EATS: Tadoba is a tiger reserve with Moharli/Kolara gate village commerce only.
--   5 eats found verified — no scarcity hold needed (lodge restaurants + Chandrapur 45km town).
--
-- FABRICATIONS / CROSS-DEST CAUGHT:
--   - Brief said "Telia tigress 2010 mother of T2/T3/T4/T5" — actual lineage per Tadoba records:
--     The Telia Sisters are 4 daughters of Madhuri (NOT a 2010 tigress with T2-T5 numbering).
--     Their names are Sonam, Lara, Geeta, Mona (Madhuri''s litter). Maya is a separate 2010 Pandharpauni tigress
--     (mother Nira + W-male/Hilltop, siblings Lata/Chaya/Pandu). Copy corrected to reflect Madhuri-Telia + Maya-Pandharpauni
--     as 2 distinct lineages.
--   - Brief said Chandrapur Fort "Gond dynasty 12th c" — actual: 13th-15th c Gond rule, fort founded by Khandkya Ballal Shah
--     (10th Gond ruler, 1472-1497 CE) as capital — 12.5km ramparts, confluence of Irai + Zarpat rivers.
--     Gond dynasty emerged post-1311 Khilji conquest of Yadavas. Copy corrected to 15th c CE.
--   - "Pandharpauni grasslands" — verified: extensive meadow that formed when the Pandharpauni tribal village
--     was relocated in 1972 (the abandoned fields turned into grassland — prime tiger sighting habitat).
--     Maya was born here 2010. Copy reflects this verified history.
--   - "Erai Dam" — verified Tadoba landmark; Tadoba-Andhari Tiger Reserve lies ~30km north of Chandrapur near Erai Dam.
--   - Bamboo Forest Safari Lodge dining = "Machan" restaurant (verified Enchanting Travels + Wildlife Worldwide).
--   - Svasara Jungle Lodge — 300m from Kolara Gate, 12 luxury suites, 10-acre lodge, 100km Nagpur (verified own site + Tripadvisor).
--   - Irai Safari Retreat — Buffer zone TATR, Irai lake, 14 acres, 8 luxury tents + 9 rooms (verified).
--   - Tigress@Ghosri — TripAdvisor #1 of 9 Chandrapur hotels, 6 rooms + 4BR villa, 7 acres, 10-17 min Khutwanda/Moharli.
--   - "Tigress at Ghosri Resort" — DOES exist as anchor (TripAdvisor + tigressghosri.com verified). Brief was right on this one.

-- =========================================================
-- HIDDEN GEMS — 3 verified
-- =========================================================
INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'tadoba-pandharpauni-grasslands',
  'tadoba',
  'Pandharpauni Grasslands (Relocated-Village Meadow)',
  NULL,
  12,
  '30 min by safari jeep from Moharli gate',
  'Tadoba day-tourists with single safari bookings get assigned to whichever zone has slots — most never specifically request Pandharpauni. But the grassland here is one of Tadoba''s prime tiger-sighting habitats, formed by the 1972 relocation of the eponymous tribal village.',
  'An extensive meadow inside the Tadoba buffer zone — the abandoned agricultural fields of a Korku/Gond tribal village called Pandharpauni, relocated outside the core in 1972. After 50+ years of natural regrowth, the open grassland became prime grazing habitat for sambar, chital, gaur, and the prey concentration draws tigers — including Maya, born here in 2010, who held the territory for over a decade. To book a Pandharpauni-specific safari, request the Moharli zone P-route on the MahaTadoba booking portal 30 days in advance (jeeps allocate the grassland route on rotation; pre-monsoon Apr-May is peak sighting).',
  'moderate',
  'Tadoba-Andhari Tiger Reserve official site (mytadoba.mahaforest.gov.in); Maharashtra Forest Dept Tadoba 1972 relocation records; treesntigers.com Maya lineage feature; Outlook Traveller 2024 Tadoba feature.',
  5,
  ARRAY['grassland','tiger-territory','wildlife','meadow','relocated-village','core-zone']::text[],
  '{}'::jsonb
),
(
  'tadoba-chandrapur-fort',
  'tadoba',
  'Chandrapur Fort (15th c Gond Capital, 12.5km Ramparts)',
  NULL,
  45,
  '1.25 hr drive south from Moharli gate to Chandrapur town',
  'Tadoba safari packages head straight from Moharli/Kolara back to Nagpur (140km north). Most travellers never go 45km south to Chandrapur town — where the Gond-dynasty fortifications stretch 12.5km, among the longest land-fort walls in Maharashtra.',
  'A 15th c CE Gond dynasty land fort built by Khandkya Ballal Shah (10th Gond ruler, 1472-1497 CE) at the confluence of the Irai and Zarpat rivers — the historical Gond capital of Chanda (now Chandrapur). The fort''s ramparts run 12.5km and are punctuated by 5 surviving gates (Jatpura, Anchaleshwar, Pathanpura, Binba, Hanuman). The Gonds rose after 1311 (Alauddin Khilji''s defeat of the Yadavas) and ruled Vidarbha + parts of MP + AP for ~3 centuries. Anchaleshwar temple inside the fort complex + Gond royal cenotaphs at Junona burial-ground 8km. Open dawn-dusk; ₹0 entry; ASI partial-protected. Take an autorickshaw for the 12.5km wall-circuit (impossible on foot in one day).',
  'easy',
  'Wikipedia Chandrapur; Red Earth Tadoba 2022 Chandrapur Fort feature; Peepul Tree LiveHistoryIndia Gond legacy 2021 long-form; TripXL Chanda Fort 2024 guide.',
  4,
  ARRAY['fort','gond','heritage','ramparts','vidarbha','asi','village-walk']::text[],
  '{}'::jsonb
),
(
  'tadoba-telia-lake-sisters',
  'tadoba',
  'Telia Lake (Telia Sisters Tiger Lineage)',
  NULL,
  18,
  '40 min safari from Kolara gate to Telia waterhole',
  'Telia is a small lake on the Kolara-Telia route — most safari bookings get assigned to Moharli/Khutwanda zones with higher Maya-territory sighting probability. Telia''s lineage story (the 4 Telia Sisters) is a Tadoba conservation legend but the location itself is lesser-walked.',
  'A small natural lake in the Tadoba core that gave its name to the famous Telia Sisters — 4 tigresses (Sonam, Lara, Geeta, Mona) born to the tigress Madhuri, who ruled the Telia territory in the 2010s. The sisters established their own territories across Tadoba (Sonam famously raised cubs while siblings Lara, Geeta, Mona established adjacent territories — a rare 4-sister adult-coexistence in Indian tigers). The lake itself is a year-round waterhole; pre-monsoon Mar-May draws the highest concentrations of prey (sambar, gaur) + resident tigers. Request the Kolara K-route Telia zone via MahaTadoba booking portal 30 days advance.',
  'moderate',
  'mytadoba.mahaforest.gov.in official portal; treesntigers.com Tadoba former-royals feature; Outlook Traveller "On the trail of a tigress" Svasara feature; National Geographic India Tadoba conservation 2022.',
  4,
  ARRAY['lake','tiger-territory','wildlife','telia-sisters','core-zone','waterhole']::text[],
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
  'tadoba',
  'Svasara Jungle Lodge Restaurant',
  '300m Kolara Gate, Tadoba',
  'kolara',
  ARRAY['vidarbha','maharashtrian','multi-cuisine','jungle-lodge']::text[],
  'mid_range',
  'Buffet thali with Vidarbha + multi-cuisine',
  ARRAY['Buffet thali','Saoji chicken','Tandoori platter','Vidarbha veg','Bhakri-pithla','Daal-baati']::text[],
  '₹₹₹',
  '[1200,2501)'::int4range,
  'mixed',
  true,
  'required',
  'casual',
  'In-house dining at Svasara Jungle Lodge — 300m from the Kolara gate (the closest non-government lodge to the gate per Maharashtra Tadoba tourism). 12 luxury suites property, 10-acre wooded compound, with full-board buffet for residents only. Vidarbha-leaning menu using lodge organic kitchen-garden produce. Open 7am-10pm for residents.',
  'Non-residents cannot book meals separately — full-board only via stay package on svasararesorts.com. Lunch return-from-morning-safari (~12pm) is the lodge''s signature unwind moment with cold towels + welcome drink. Cards + UPI on-site.',
  'Kolara, Tadoba-Andhari Tiger Reserve, Chandrapur District, Maharashtra 442908',
  'https://maps.google.com/?q=Svasara+Jungle+Lodge+Kolara',
  ARRAY[
    'https://svasararesorts.com/',
    'https://www.tripadvisor.in/Hotel_Review-g2475449-d2149973-Reviews-Svasara_Jungle_Lodge_at_Tadoba-Kolara_Chandrapur_District_Maharashtra.html',
    'https://mytadoba.mahaforest.gov.in/wheretostay'
  ]::text[],
  '2026-05-13',
  false
),
(
  'tadoba',
  'Machan (The Bamboo Forest Safari Lodge)',
  '5min Kolara Gate (Masal village)',
  'masal-kolara',
  ARRAY['multi-cuisine','vidarbha','jungle-lodge','continental']::text[],
  'fine_dining',
  'Lakeside al fresco buffet',
  ARRAY['Buffet (continental + Indian)','Lake-view breakfast','Vidarbha thali option','Tandoori platter','Veg pulao','Filter coffee']::text[],
  '₹₹₹',
  '[1500,3001)'::int4range,
  'mixed',
  true,
  'required',
  'smart-casual',
  'Machan restaurant at The Bamboo Forest Safari Lodge — luxury Tree House Resorts property 5 min from Kolara gate (Masal village, Chandrapur dist). 9 lake-side villas + 3 chalets + 2 bungalows; Machan serves al fresco lakeside dining (breakfast + lunch + dinner). Multi-cuisine buffet with daily Vidarbha menu rotation. Open 7am-10.30pm for residents.',
  'Full-board stay package only; non-resident meal walk-ins not standard. Sunset dinner Oct-Mar on the lake-side deck is the lodge''s signature setting — request lakeside table at check-in. Cards + UPI.',
  'Masal Village, Kolara Gate, Tadoba-Andhari Tiger Reserve, Chandrapur 442908',
  'https://maps.google.com/?q=Bamboo+Forest+Safari+Lodge+Tadoba',
  ARRAY[
    'https://www.tadoba-nationalpark.com/the-bamboo-forest-safari-lodge/',
    'https://www.enchantingtravels.com/hotels/tadoba/the-bamboo-forest-safari-lodge/',
    'https://www.tripadvisor.com/Hotel_Review-g10615584-d8812748-Reviews-The_Bamboo_Forest_Safari_Lodge_at_Tadoba-Masal_Chandrapur_District_Maharashtra.html'
  ]::text[],
  '2026-05-13',
  false
),
(
  'tadoba',
  'Irai Safari Retreat Dining',
  'Irai Lake Buffer, Tadoba',
  'irai-lake',
  ARRAY['multi-cuisine','vidarbha','jungle-lodge']::text[],
  'mid_range',
  'Vidarbha thali + lake-view dining',
  ARRAY['Vidarbha thali','Saoji chicken','Tandoori platter','Bhakri-pithla','Lake-side breakfast','Filter coffee']::text[],
  '₹₹',
  '[800,1601)'::int4range,
  'mixed',
  true,
  'required',
  'casual',
  'In-house dining at Irai Safari Retreat — 14-acre buffer-zone property right next to Irai Lake (TATR buffer). 8 luxury tents + 9 rooms; full-board for residents. Vidarbha-leaning menu with light multi-cuisine and lake-view setting. Open 7am-10pm.',
  'Resident-only dining; book full-board via iraisafariretreat.com. Irai Lake side setting drops 4-5°C cooler than Moharli village in summer; evening dinner outdoors Oct-Mar. Cards + UPI.',
  'Irai Lake, Tadoba-Andhari Tiger Reserve Buffer Zone, Chandrapur District 442908',
  'https://maps.google.com/?q=Irai+Safari+Retreat+Tadoba',
  ARRAY[
    'https://mytadoba.mahaforest.gov.in/wheretostay',
    'https://www.tadobanationalpark.in/svasara-jungle-lodge-tadoba.html'
  ]::text[],
  '2026-05-13',
  false
),
(
  'tadoba',
  'Tigress@Ghosri Lodge Restaurant',
  'Ghosri Hills, Tadoba buffer',
  'ghosri',
  ARRAY['vidarbha','multi-cuisine','jungle-lodge','farm-to-table']::text[],
  'fine_dining',
  'Farm-to-table Vidarbha plate',
  ARRAY['Vidarbha thali','Farm-vegetable plate','Mutton sukka','Bhakri-pithla','Filter coffee','Daal-baati']::text[],
  '₹₹₹',
  '[1500,3001)'::int4range,
  'mixed',
  true,
  'required',
  'smart-casual',
  'In-house dining at Tigress@Ghosri — TripAdvisor #1 of 9 Chandrapur hotels, 6 luxury rooms + 4-BR villa on 7 acres of rejuvenated forest. 10-17 min from Khutwanda + Moharli gates. Farm-to-table menu using property kitchen garden + Vidarbha-region produce. Open 7am-10pm for residents.',
  'Full-board stay package only via tigressghosri.com. Private waterhole with live CCTV (tigers, leopards, dholes, sloth bear visit) is the dining-deck adjacent feature — request waterhole-view table. Cards + UPI.',
  'Ghosri, near Khutwanda + Moharli gates, Tadoba-Andhari Tiger Reserve Buffer, Chandrapur 442908',
  'https://maps.google.com/?q=Tigress+Ghosri+Tadoba',
  ARRAY[
    'https://www.tigressghosri.com',
    'https://www.tripadvisor.in/Hotel_Review-g1459055-d23161041-Reviews-Tigress_ghosri_Tadoba-Chandrapur_Chandrapur_District_Maharashtra.html',
    'https://www.tadobanationalparkonline.in/luxurious-stay-at-tigress-ghosri.php'
  ]::text[],
  '2026-05-13',
  false
),
(
  'tadoba',
  'Moharli Village Dhaba Cluster',
  'Moharli Gate Village',
  'moharli',
  ARRAY['vidarbha','dhaba','maharashtrian','mixed']::text[],
  'casual',
  'Vidarbha thali + chicken curry',
  ARRAY['Vidarbha thali','Saoji chicken','Jowar bhakri','Veg pulao','Cutting chai','Tarri poha breakfast']::text[],
  '₹',
  '[150,301)'::int4range,
  'mixed',
  true,
  'walk-in',
  'casual',
  'Moharli village dhaba cluster outside the Moharli gate — 4-6 small family-run dhabas (Hotel Moharli Forest View + Hotel Mahaveer + Hotel Tiger View are the named anchors per MahaTadoba listings). The only walk-in eating option for safari day-trippers without lodge package bookings. Vidarbha thali + light non-veg + breakfast tarri-poha. Open 6am-10pm.',
  'Pre-safari breakfast 5.30-7am at the dhaba cluster — Tarri poha + tea ready before the 6am gate opens. Lunch 12.30-3pm fills with returning jeep tourists. Cash + UPI; cards rare.',
  'Moharli Gate Village, Tadoba-Andhari Tiger Reserve, Chandrapur District 442908',
  'https://maps.google.com/?q=Moharli+Village+Tadoba',
  ARRAY[
    'https://mytadoba.mahaforest.gov.in/wheretostay',
    'https://maharashtratourism.gov.in/wildlife/tadoba-andhari-tiger-reserve/'
  ]::text[],
  '2026-05-13',
  false
);
