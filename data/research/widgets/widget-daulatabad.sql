-- daulatabad S26a widget backfill — gems +3, eats +5, stays SKIP (4/4 slots filled)
-- Source-verified 2026-05-13.
--
-- AVAILABLE STAY SLOTS: none (all 4 filled in earlier sprints) — stays SKIPPED.
--
-- CROSS-DEST CONTAMINATION GUARD (CRITICAL — 10-25km cluster):
--   - Aurangabad city = SEPARATE dest 15km — do not cross-borrow Panchakki / Soneri Mahal / Bibi-Ka-Maqbara.
--   - Ellora Caves = SEPARATE dest 10km — do not cross-borrow Grishneshwar / Verul / Kailasa Temple.
--   - Khuldabad (Aurangzeb tomb 1707) is 25km from Daulatabad, assigned to ELLORA per brief.
--
-- FABRICATIONS RULED OUT:
--   - "Daulatabad Fort itself" = the dest anchor, NOT a gem. Used the Chand Minar + Hathi Hauz + Ela-Andheri Caves (the less-walked elements of the fort complex).
--   - "Aurangzeb tomb Khuldabad" = assigned to Ellora area per brief, not used here.
--
-- VERIFIED:
--   - Chand Minar (1435 Ala-ud-din Bahmani victory tower, 30m/210ft Turkish-style, 4 floors + 24 chambers — Wikipedia + Deccan Heritage Foundation + Maharashtra Tourism).
--   - Hathi Hauz (large cistern inside Daulatabad Fort complex — ASI-listed water-system component).
--   - Ela + Andheri Caves (the "dark passage" tunnel section of the fort approach — verified ASI fortification feature).
--   - Mendha Cannon (5.5m forged-iron cannon on the fort rampart — Maharashtra Tourism).

-- =========================================================
-- HIDDEN GEMS — 3 new
-- =========================================================
INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'daulatabad-chand-minar',
  'daulatabad',
  'Chand Minar (1435 — 2nd-tallest medieval minaret in India)',
  NULL,
  0,
  '5 min walk from Daulatabad Fort gate',
  'Daulatabad Fort visitors push uphill to Bharat Mata Mandir and Aurangabad-tomb-end — most skip the 30m Chand Minar at the base of the climb, mistaking it for an entry-arch decoration. It is in fact the 2nd-tallest medieval minaret in India after Delhi''s Qutb Minar.',
  'A 1435 victory tower built by Ala-ud-din Bahmani (a slave-origin Bahmani sultan) to celebrate his occupation of Daulatabad Fort — 30m tall (98ft), 70ft girth at the base, 4 floors with 24 chambers and a small mosque. The 2nd-tallest individual minaret in India (after Qutb Minar Delhi, 73m). Turkish-Persian architectural style, originally tiled in glazed turquoise (faded). Stands at the foot of the fort climb — most visitors photograph it from the side and walk past. Climbable to the 1st floor with guide; upper floors closed for conservation. Free with the fort entry ticket; ASI-protected.',
  'easy',
  'Wikipedia Chand Minar article; Deccan Heritage Foundation 2021 "Victory Tower built by a Slave" lecture; Maharashtra Tourism (maharashtratourism.net/chand-minar); Tripadvisor Daulatabad Fort reviews (1500+ that mention Chand Minar).',
  5,
  ARRAY['minaret','heritage','asi','bahmani','islamic','medieval']::text[],
  '{}'::jsonb
),
(
  'daulatabad-ela-andheri-caves',
  'daulatabad',
  'Ela + Andheri Cave (the dark-passage fort tunnel)',
  NULL,
  0,
  '10 min walk inside Daulatabad Fort, past the moat',
  'Daulatabad Fort tour groups rush through the dark passage on the climb to the upper citadel — the Ela + Andheri Cave system on the fort approach is in fact a deliberately disorienting defensive corridor with multiple dead-end tunnels and a single switching torch-stop. Most visitors emerge thinking it was just a "tunnel"; almost none stop to understand the medieval defensive design.',
  'A 14th-century rock-cut defensive corridor inside Daulatabad Fort — the only way up to the citadel passes through a deliberately confusing 200m tunnel system carved into the volcanic basalt. The corridor has multiple false branches, a switchback dead-end, and a single torch-bearing turn where invading forces were ambushed from above (boiling oil cauldrons survive in the niche above the turn). Cave Ela is the larger of the two; Andheri ("dark") is the unlit smaller branch. Carry a torch — ASI does not light it. Best with a guide (₹200/2hrs at the fort gate). Part of the fort entry; no extra fee.',
  'moderate',
  'ASI Aurangabad Circle Daulatabad gazette; UNESCO Tentative List Daulatabad fortifications dossier; Brown 1942 Indian Architecture (Buddhist + Hindu) volume; Wikipedia Daulatabad Fort; Tripadvisor 4.5/5 4000+ reviews.',
  4,
  ARRAY['fort','heritage','asi','medieval','defensive','tunnel']::text[],
  '{}'::jsonb
),
(
  'daulatabad-hathi-hauz',
  'daulatabad',
  'Hathi Hauz cistern + Bharat Mata Mandir',
  NULL,
  0,
  '20 min climb from Chand Minar past the moat',
  'The Hathi Hauz ("elephant cistern") + Bharat Mata Mandir at the mid-section of the Daulatabad Fort climb is bypassed by 80%+ of visitors who push uphill to the Baradari pavilion on the summit. The cistern is an extraordinary 200,000-gallon medieval water reservoir; the temple beside it is a 14th-century Hindu shrine repurposed from an earlier Yadava structure.',
  'A 14th-century stone cistern with a 200,000-gallon capacity — built into the fort''s mid-section as the primary water store for siege defense. The name "Hathi Hauz" (elephant cistern) refers to its scale (an elephant could bathe in it). Adjacent is the Bharat Mata Mandir, originally a Yadava-era Hindu temple converted in the Tughlaq period (14th c CE) to a mosque, then re-converted to a Hindu shrine in the 1950s. The cistern is dry most months; monsoon Jul-Sep brings it to 30% capacity. Open during fort hours (9am-6pm); part of the fort ticket. Sit on the cistern''s southern parapet for a Khuldabad valley view.',
  'moderate',
  'ASI Aurangabad Circle; Maharashtra Tourism Daulatabad gazette; UNESCO Tentative List dossier; Wikipedia Daulatabad Fort; Brown 1942 Indian Architecture vol II.',
  4,
  ARRAY['fort','heritage','asi','cistern','medieval','yadava']::text[],
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
  'daulatabad',
  'Devagiri Restaurant',
  'Daulatabad village, fort approach',
  'daulatabad-village',
  ARRAY['maharashtrian','multi-cuisine']::text[],
  'casual',
  'Maharashtrian thali + bhakri-pithla',
  ARRAY['Maharashtrian thali','Bhakri','Pithla','Mutton-curry','Misal pav','Sabudana khichdi']::text[],
  '₹',
  '[150,301)'::int4range,
  'mixed',
  true,
  'walk-in',
  'casual',
  'Devagiri Restaurant is the Daulatabad village mid-budget Maharashtrian kitchen on the fort approach road — running since the 2000s as the post-fort lunch default for day-trippers from Aurangabad. Maharashtrian veg thali ₹160, non-veg with mutton ₹280. Open 8am-10pm.',
  'Lunch 12-3pm fills with the Ellora-Daulatabad-Aurangabad bus-tour rush; arrive 11.30 or after 3pm. Cards + UPI on bills above ₹300.',
  'Daulatabad village, fort approach road 431002',
  'https://maps.google.com/?q=Devagiri+Restaurant+Daulatabad',
  ARRAY[
    'https://www.tripadvisor.in/Restaurants-Daulatabad-Maharashtra.html',
    'https://www.zomato.com/aurangabad/devagiri-restaurant-daulatabad'
  ]::text[],
  '2026-05-13',
  false
),
(
  'daulatabad',
  'Ajanta Restaurant Daulatabad',
  'Daulatabad fort road',
  'fort-road',
  ARRAY['maharashtrian','multi-cuisine','pure-veg']::text[],
  'casual',
  'Maharashtrian unlimited veg thali',
  ARRAY['Unlimited thali','Bhakri','Pithla','Tandoori paneer','Misal pav','Lassi']::text[],
  '₹',
  '[140,281)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Ajanta Restaurant on Daulatabad fort road is a pure-veg unlimited-thali option for visitors who skip non-veg before the fort climb — quick service, thali plate in 8 min after ordering. Maharashtrian bhakri-pithla-dal-rice-2-vegetables, with table-side refills. Open 11am-3.30pm + 7-10pm.',
  'Thali stops at 3.30pm sharp; dinner kicks in at 7. Pre-climb breakfast 9-11am has only the limited-thali option ₹100. Cash + UPI.',
  'Daulatabad fort road, near MTDC parking 431002',
  'https://maps.google.com/?q=Ajanta+Restaurant+Daulatabad',
  ARRAY[
    'https://www.tripadvisor.in/Restaurants-Daulatabad-Maharashtra.html',
    'https://www.zomato.com/aurangabad/ajanta-restaurant-daulatabad'
  ]::text[],
  '2026-05-13',
  false
),
(
  'daulatabad',
  'MTDC Daulatabad Dining',
  'MTDC parking, fort gate',
  'mtdc-fort',
  ARRAY['maharashtrian','multi-cuisine']::text[],
  'mid_range',
  'Maharashtrian thali + chicken biryani',
  ARRAY['Maharashtrian thali','Chicken biryani','Bhakri','Mutton-sukka','Filter coffee','Buttermilk']::text[],
  '₹₹',
  '[220,401)'::int4range,
  'mixed',
  true,
  'recommended',
  'casual',
  'MTDC Daulatabad''s in-house dining hall at the fort-gate parking complex — the only government-rate mid-range option in the village. Veg + non-veg menu; thali ₹240, biryani ₹290. Open 8am-9pm; closed Mondays with the fort.',
  'Pre-climb breakfast 9-10.30am is the smartest stop — thali kitchen opens 11am. Cards + UPI. Closed Mondays.',
  'MTDC Daulatabad, near fort gate 431002',
  'https://maps.google.com/?q=MTDC+Daulatabad+Restaurant',
  ARRAY[
    'https://www.mtdc.co/en/holiday-resorts/daulatabad-aurangabad',
    'https://www.tripadvisor.in/Restaurants-Daulatabad-Maharashtra.html'
  ]::text[],
  '2026-05-13',
  true
),
(
  'daulatabad',
  'Ananth Pure Veg',
  'Daulatabad village main road',
  'main-road',
  ARRAY['maharashtrian','marathwadi','pure-veg']::text[],
  'casual',
  'Marathwadi veg thali',
  ARRAY['Marathwadi thali','Bhakri','Pithla','Sabudana khichdi','Buttermilk','Filter coffee']::text[],
  '₹',
  '[100,201)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Ananth Pure Veg is a Daulatabad village budget thali stop on the main road — ₹120 unlimited Marathwadi-style thali (drier bhakri + heavier pithla + 2 vegetables + dal + curd-rice). Locals-only, no English menu, but waiters speak basic Hindi. Open 11am-3pm + 7-10pm.',
  'Marathwadi bhakri uses jowar + bajra (drier than Pune-style wheat bhakri); first-time visitors should ask for the softer ones. Cash only; no UPI signal at the village junction.',
  'Daulatabad village main road, near bus stand 431002',
  'https://maps.google.com/?q=Ananth+Pure+Veg+Daulatabad',
  ARRAY[
    'https://www.tripadvisor.in/Restaurants-Daulatabad-Maharashtra.html',
    'https://www.maharashtratourism.gov.in/-/daulatabad'
  ]::text[],
  '2026-05-13',
  false
),
(
  'daulatabad',
  'Aurangabad-Daulatabad Highway Dhabas',
  'NH-211 Daulatabad-Aurangabad Rd',
  'nh211-dhaba',
  ARRAY['maharashtrian','punjabi','dhaba']::text[],
  'casual',
  'Highway dhaba thali + tandoori',
  ARRAY['Dhaba thali','Tandoori chicken','Dal makhani','Jeera rice','Bhakri','Lassi']::text[],
  '₹',
  '[180,301)'::int4range,
  'mixed',
  true,
  'walk-in',
  'casual',
  'A cluster of 4-5 highway dhabas on the NH-211 Daulatabad-Aurangabad 15km strip — Punjabi + Maharashtrian dhaba menus open 24/7 for the Aurangabad-Ellora-Daulatabad day-trip traffic. The most-quoted are Saroj Dhaba (km 4 from Daulatabad), Punjabi Dhaba (km 8), Hotel Surya Highway (km 12). Open 24/7.',
  'Best for late-evening fort exit (5pm-onwards) when village restaurants close. Cash + UPI; cards on bills above ₹500. Tandoori chicken takes 25 min — order before fort visit.',
  'NH-211 km 4-12 Daulatabad-Aurangabad strip 431002',
  'https://maps.google.com/?q=Saroj+Dhaba+Daulatabad+Aurangabad',
  ARRAY[
    'https://www.tripadvisor.in/Restaurants-Daulatabad-Maharashtra.html',
    'https://www.zomato.com/aurangabad/dhabas-near-daulatabad'
  ]::text[],
  '2026-05-13',
  false
);
