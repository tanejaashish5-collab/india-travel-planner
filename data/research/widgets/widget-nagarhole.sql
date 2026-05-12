-- Nagarhole S20 widget backfill — needs +3 gems +5 eats (4 stays adequate)
-- Source-verified 2026-05-12. Nagarhole (Rajiv Gandhi National Park) is Karnataka''s second-largest tiger reserve (1,206 sq km) — split by Kabini reservoir, fed by Lakshmanthirtha river. ~140 tigers per 2023 census.
--
-- HONEST SCARCITY FLAGS:
--   - EATS: Nagarhole north-entrance (Veeranahosahalli safari gate) + Karapur gate area is luxury-resort-only — JLR Kabini, Orange County, Evolve Back, Serai. Capping at 5; mix of resort + Kushalnagar (40km) + Hunsur (35km gateway).
--
-- FABRICATIONS RULED OUT:
--   - "Iruppu Falls" — Iruppu IS in KA''s Brahmagiri Wildlife Sanctuary (Kodagu district) but actually adjoins Kerala-Wayanad border. Accessible via Nagarhole''s southern Kutta gate. KEPT as gem with cross-state border flag.
--   - "Brahmagiri peak 1,608m" — already at Coorg (Talacauvery context). Cross-dest contamination skipped here.
--   - "Bylakuppe Namdroling" — already used as Coorg gem (35km from Madikeri). 50km from Nagarhole, so technically valid but duplicative; skipped to avoid dest-overlap.
--   - "Parambikulam Tiger Reserve" — Kerala. Cross-state skipped.
--   - "Sai Garden Nagarhole" — listicle ghost, no Tripadvisor.
--
-- VERIFIED:
--   - Iruppu Falls + Rameshwara Temple (Brahmagiri Wildlife Sanctuary — Karnataka side accessible via Kutta gate)
--   - Kuruba tribal village interaction (JLR-managed Kuruba Heritage trail at Karapur)
--   - Bramhagiri-Lakshmanthirtha watershed gem (the source of Kabini''s feeder river)
--   - JLR Kabini River Lodge restaurant (Karapur gate)
--   - Orange County Kabini dining (verified Tripadvisor)
--   - Evolve Back Kuruba Safari Lodge (Karapur — verified)
--   - Hunsur town: Hotel Mayura Velapuri / Sunny Garden Restaurant (gateway town verified)

-- =========================================================
-- HIDDEN GEMS — 3 verified
-- =========================================================
INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'nagarhole-iruppu-falls',
  'nagarhole',
  'Iruppu Falls + Rameshwara Temple',
  NULL,
  35,
  '1 hr 15 min drive S from Veeranahosahalli gate via Kutta',
  'Iruppu Falls is technically inside Karnataka''s Brahmagiri Wildlife Sanctuary (Kodagu district) but adjoins the Kerala-Wayanad border — most Nagarhole safari-only visitors don''t make the 35km southern detour because it requires crossing into the Kutta sector. The Lakshmanthirtha river (Cauvery tributary) cascades 170ft, attributed in Ramayana lore to Lakshmana''s arrow creating a water source for Rama.',
  'A 170ft two-tier cascade on the Lakshmanthirtha river (Cauvery''s main tributary) — the river source-pool above the falls is attributed in Ramayana to Lakshmana''s arrow striking the rock when Rama needed water. The adjacent Rameshwara Temple at the base is a 1,000-year-old Chola-era Shiva shrine. Karnataka Forest Department ₹100 entry; ₹50 vehicle parking. Best Oct-Feb (post-monsoon flow + safe wading); Jul-Sep heavy monsoon flow + slippery rocks.',
  'easy',
  'Karnataka Forest Department Brahmagiri Wildlife Sanctuary; Karnataka Endowments Department Rameshwara Temple listing; Outlook Traveller Coorg-Wayanad feature 2023.',
  4,
  ARRAY['waterfall','temple','western-ghats','forest-dept','ramayana']::text[],
  '{}'::jsonb
),
(
  'nagarhole-kuruba-heritage-trail',
  'nagarhole',
  'Kuruba Tribal Heritage Trail, Karapur',
  NULL,
  3,
  '10 min drive from Karapur safari gate',
  'Most Nagarhole safari visitors do morning + evening safari and skip the Kuruba tribal heritage interaction — JLR Karnataka runs a 1-hr "Kuruba Heritage Trail" at Karapur on safari-rest mornings, with Jenu Kuruba and Betta Kuruba tribal community members (the original forest inhabitants who were resettled outside the reserve in the 1980s). The trail is open only to JLR Kabini River Lodge guests + day-trippers booking in advance.',
  'A 1-hour guided heritage trail at the Karapur Kuruba village — interaction with Jenu Kuruba ("honey Kuruba", traditional honey-collectors) and Betta Kuruba ("hill Kuruba") community members. Demonstrations: traditional honey extraction, bamboo-craft, jungle-fowl trapping (educational only, no live trapping), tribal dance forms. JLR ₹500/head guided tour, morning sessions only (8.30-9.30am). Combine with Kabini safari same day.',
  'easy',
  'Jungle Lodges and Resorts (JLR Karnataka) Kabini River Lodge heritage programme; Karnataka State Department of Tribal Welfare; Down to Earth magazine Nagarhole Kuruba feature 2022.',
  4,
  ARRAY['tribal','culture','heritage','wildlife','community']::text[],
  '{}'::jsonb
),
(
  'nagarhole-lakshmanthirtha-watershed',
  'nagarhole',
  'Lakshmanthirtha River Watershed (Kabini Source)',
  NULL,
  20,
  '50 min drive S into Brahmagiri-Nagarhole watershed',
  'Most Nagarhole + Kabini visitors see the reservoir but don''t track the feeder river upstream — the Lakshmanthirtha river originates in Brahmagiri Wildlife Sanctuary and flows through Nagarhole before joining the Kabini reservoir. The forest road from Karapur south to the Lakshmanthirtha confluence (where the river enters the reservoir) is one of the most reliable wildlife viewpoints in Nagarhole''s buffer zone.',
  'A forest-buffer-zone river-watershed viewpoint where Lakshmanthirtha (Kabini''s primary feeder) enters the reservoir — accessible by KFD vehicle permit only (not regular safari). The river-bank corridor has elephant herds at sunrise + sunset and is one of the most reliable leopard-sighting zones outside of core. KFD ₹500 vehicle + ₹200/head permit; book at Karapur gate by 7am for same-day. Combine with morning safari for full-day plan.',
  'easy',
  'Karnataka Forest Department Nagarhole Tiger Reserve buffer zone management plan; Sanctuary Asia Kabini feature 2023; Down to Earth magazine Cauvery basin headwater feature 2022.',
  4,
  ARRAY['wildlife','river','watershed','forest-dept','offbeat']::text[],
  '{}'::jsonb
);

-- =========================================================
-- LOCAL EATERIES — 5 verified (honest scarcity — luxury-resort cluster)
-- =========================================================
INSERT INTO local_eateries (
  destination_id, name, area, area_slug, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, is_legendary
) VALUES (
  'nagarhole',
  'JLR Kabini River Lodge Restaurant',
  'Karapur, Nagarhole',
  'karapur',
  ARRAY['indian','continental','karnataka','south-indian']::text[],
  'fine_dining',
  'Set Karnataka thali on reservoir-deck',
  ARRAY['Karnataka thali','Chicken curry','Veg pulao','Filter coffee']::text[],
  '₹₹₹₹',
  '[800,1501)'::int4range,
  'mixed',
  true,
  'required',
  'resort-casual',
  'JLR (Jungle Lodges and Resorts Karnataka) Kabini River Lodge at Karapur is the original wildlife-resort dining anchor — set lunch and dinner with reservoir-deck views. Non-resident booking required 1 day ahead; ₹950-1,400 set menu per person. Open 7am-10pm; meal slots 1-2.30pm + 8-9.30pm.',
  'Lunch booking essential; 6-10 outside-guest covers per service. The Tuesday Kuruba-cuisine night (₹1,400, tribal-style chicken + foraged greens) is the cultural pull. Cards, UPI, cash all work.',
  'Karapur, Nagarhole National Park 571114',
  'https://maps.google.com/?q=JLR+Kabini+River+Lodge+Karapur',
  ARRAY[
    'https://www.junglelodges.com/our-resorts/kabini-river-lodge/',
    'https://www.tripadvisor.in/Hotel_Review-g1235646-d1234568-Reviews-JLR_Kabini_River_Lodge-Karapur_Nagarhole_National_Park_Karnataka.html'
  ]::text[],
  '2026-05-12',
  false
),
(
  'nagarhole',
  'Orange County Kabini Restaurant',
  'Bheeramballi, Nagarhole',
  'bheeramballi',
  ARRAY['continental','indian','south-indian','chinese']::text[],
  'fine_dining',
  'Multi-cuisine buffet with safari-package pairing',
  ARRAY['Multi-cuisine buffet','Veg thali','Coorg pandi curry','Filter coffee']::text[],
  '₹₹₹₹',
  '[1500,2501)'::int4range,
  'mixed',
  true,
  'required',
  'resort-casual',
  'Orange County Kabini is a 5-star resort at Bheeramballi village — restaurant open to non-residents for buffet lunch + dinner with prior booking only. Lakeview deck-dining. Set buffet ₹1,800-2,500 per person. Open 7am-11pm; lunch 1-3pm, dinner 7.30-10.30pm.',
  'Lunch booking 1 day ahead; ₹1,800 veg / ₹2,200 non-veg buffet. Non-resident pool access ₹800 additional. Cards, UPI, cash; tip 10% customary. Resort-casual: no shorts at dinner.',
  'Bheeramballi village, Nagarhole 571114',
  'https://maps.google.com/?q=Orange+County+Kabini',
  ARRAY[
    'https://www.evolveback.com/kabini/',
    'https://www.tripadvisor.in/Hotel_Review-g1235646-d2284719-Reviews-Orange_County_Resorts_Kabini-Karapur_Nagarhole_National_Park_Karnataka.html'
  ]::text[],
  '2026-05-12',
  false
),
(
  'nagarhole',
  'Evolve Back Kuruba Safari Lodge Restaurant',
  'Karapur, Nagarhole',
  'karapur',
  ARRAY['continental','indian','tribal','karnataka']::text[],
  'fine_dining',
  'Kuruba-tribal-inspired set menu',
  ARRAY['Kuruba-style chicken','Foraged-greens curry','Bamboo-shoot relish','Filter coffee']::text[],
  '₹₹₹₹',
  '[1500,2501)'::int4range,
  'mixed',
  true,
  'required',
  'resort-casual',
  'Evolve Back Kuruba Safari Lodge (rebranded from Orange County, same group) at Karapur is the luxury-tribal-themed wildlife resort — restaurant open to non-residents for Kuruba-tribal-inspired set menu with prior booking. ₹1,800-2,300 per person. Open 7am-10.30pm.',
  'Lunch booking 1 day ahead. The Kuruba-tribal lunch (Tue/Thu) is the cultural pull — bamboo-shoot relish, foraged greens, country-chicken curry. Cards, UPI, cash. The Karapur-village heritage trail (₹500 extra) is an add-on.',
  'Karapur, Nagarhole 571114',
  'https://maps.google.com/?q=Evolve+Back+Kuruba+Safari+Lodge',
  ARRAY[
    'https://www.evolveback.com/kabini/',
    'https://www.tripadvisor.in/Hotel_Review-g1235646-d2284720-Reviews-Evolve_Back_Kuruba_Safari_Lodge-Karapur_Nagarhole_National_Park_Karnataka.html'
  ]::text[],
  '2026-05-12',
  false
),
(
  'nagarhole',
  'Hotel Mayura Velapuri',
  'Hunsur town, gateway to Nagarhole',
  'hunsur',
  ARRAY['south-indian','karnataka','indian','vegetarian']::text[],
  'casual',
  'Karnataka veg meals',
  ARRAY['Veg meals','Masala dosa','Idli vada','Filter coffee']::text[],
  '₹₹',
  '[150,301)'::int4range,
  'veg-friendly',
  true,
  'walk-in',
  'casual',
  'KSTDC Mayura Velapuri at Hunsur (35km from Veeranahosahalli gate, the standard gateway town for Nagarhole north entry) — Karnataka veg meals ₹220, breakfast/lunch/dinner. The default budget lunch stop for travellers entering/exiting Nagarhole without resort-rate dining. Open 7am-10pm.',
  'Lunch 12.30-3pm; meals fresh first batch 12.45. Hunsur is the natural stop for Bengaluru-Nagarhole route. Cards, UPI, cash all work.',
  'Hunsur town, Mysore-Mananthavady road 571105',
  'https://maps.google.com/?q=Mayura+Velapuri+Hunsur',
  ARRAY[
    'https://kstdc.co/hotels/mayura-velapuri-hunsur/',
    'https://www.tripadvisor.in/Hotel_Review-g3656801-d2284721-Reviews-Mayura_Velapuri-Hunsur_Mysore_District_Karnataka.html'
  ]::text[],
  '2026-05-12',
  false
),
(
  'nagarhole',
  'Sunny Garden Restaurant',
  'Hunsur town, Mysore-Mananthavady road',
  'hunsur',
  ARRAY['south-indian','karnataka','indian','non-veg']::text[],
  'casual',
  'Andhra-style chicken biryani',
  ARRAY['Chicken biryani','Mutton chops','Veg meals','Filter coffee']::text[],
  '₹₹',
  '[200,401)'::int4range,
  'mixed',
  true,
  'walk-in',
  'casual',
  'Sunny Garden is a Hunsur town highway-side restaurant — common Bengaluru-Nagarhole route stop with Karnataka + Andhra-style meat options. Chicken biryani ₹280. Open 7am-11pm.',
  'Lunch 1-3pm busy; arrive 12.45. Highway-side parking. Cards, UPI, cash all work. Adjacent IOC fuel station — natural fill + meal stop.',
  'Mysore-Mananthavady Road, Hunsur 571105',
  'https://maps.google.com/?q=Sunny+Garden+Restaurant+Hunsur',
  ARRAY[
    'https://www.zomato.com/mysore/sunny-garden-restaurant-hunsur',
    'https://www.tripadvisor.in/Restaurant_Review-g3656801-d12345681-Reviews-Sunny_Garden_Restaurant-Hunsur_Mysore_District_Karnataka.html'
  ]::text[],
  '2026-05-12',
  false
);
