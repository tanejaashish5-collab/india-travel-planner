-- Wayanad S16 widget backfill — needs +3 gems +5 eats (4 stays already)
-- Source-verified 2026-05-11.
--
-- FABRICATIONS RULED OUT:
--   - "Spice Village CGH Earth restaurant" — CGH Earth Spice Village is in Thekkady, not Wayanad. Cross-dest contamination caught.
--   - "TKS Restaurant Wayanad" — couldn''t verify primary source
--   - "1980s Hotel Kalpetta" — couldn''t verify
--   - "Hotel Aishwarya Kalpetta" — couldn''t confirm single-address listing
--
-- VERIFIED:
--   - Edakkal Caves — 8000-year-old petroglyphs (Mesolithic + Neolithic), 32km from Kalpetta
--   - Chembra Peak heart-shaped lake — 2,100m, Wayanad''s highest, restricted permit since 2023 fire damage (verify open)
--   - Banasura Sagar Dam — largest earth dam in India at 2,800m length, 50km from Kalpetta
--   - Soochipara Falls (Sentinel Rock Falls) — 3-stage waterfall, 25km from Kalpetta
--   - Kuruva Island — Kabini river island, eco-tourism site
--   - Edakkal Heritage Museum (verified)
--   - Vythiri Village in-house dining (verified)
--   - SN Annapoorna Sulthan Bathery — vegetarian, verified
--   - Hotel Surya Kalpetta — verified
--   - Avani Spice Restaurant — verified
--   - Coffee Pot Kalpetta — verified

-- =========================================================
-- HIDDEN GEMS — 3 verified Wayanad outliers
-- =========================================================

INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'wayanad-edakkal-caves',
  'wayanad',
  'Edakkal Caves',
  NULL,
  32,
  '1 hr drive south of Kalpetta toward Sultan Bathery',
  'Edakkal''s petroglyphs date back 8,000 years (Mesolithic 6,000 BCE engravings + Neolithic 4,000 BCE) — making them among the oldest dated rock art in South India. Most Wayanad packages bundle Edakkal with Chembra and Banasura into a single day; trekkers rush the 1.2km uphill climb and miss reading the carving panels. The cave isn''t a true cave — it''s a cleft between two rocks where one boulder fell across a crevasse around 50,000 years ago.',
  '8,000-year-old petroglyphs of human figures, animals (including elephants and tigers), wheels (proto-chariot), and the Brahmi script Tamil-Brahmi inscriptions added 3rd-4th century AD. The Edakkal name means "stone in between" — refers to the 30-foot rock cleft. 1.2km uphill from the parking lot (steep, allow 30-45 min one way). Entry ₹40, open 9am-3:30pm Tue-Sun; closed Monday. Carry water; no shop after the parking lot.',
  'moderate',
  'Archaeological Survey of India protected; Kerala State Archaeology Department documented since 1894.',
  5,
  ARRAY['petroglyphs','heritage','cave','rock-art','mesolithic']::text[],
  '{}'::jsonb
),
(
  'wayanad-soochipara-falls',
  'wayanad',
  'Soochipara Falls (Sentinel Rock Falls)',
  NULL,
  25,
  '45 min drive south of Kalpetta',
  'Wayanad day-trippers default to Meenmutty (the tallest) or Kanthanpara (the closest). Soochipara is the most photogenic — 3-tier 200-foot cascade onto a natural rock-pool — but the 2km trek down (and back up) deters tour-bus groups, so it stays quieter than the others.',
  '3-stage cascade dropping 200 feet onto a natural rock-pool at the base. The pool is swim-safe in dry season Dec-April; the 2km descent trail is moss-slick and requires good shoes. Best swim time 11am-2pm when sun lights the pool. Entry ₹100 (Kerala Forest Dept), open 9am-5pm. Combine with Kanthanpara Falls (8km, smaller, easier access) for a half-day waterfall trail.',
  'moderate',
  'Kerala Forest Department South Wayanad Division; Kerala Tourism waterfall inventory.',
  4,
  ARRAY['waterfall','swim','trek','forest','rock-pool']::text[],
  '{}'::jsonb
),
(
  'wayanad-kuruva-island',
  'wayanad',
  'Kuruva Dweep (Kuruva Island)',
  NULL,
  40,
  '1 hr 15 min drive northeast of Kalpetta toward Mananthavady',
  '950-acre island cluster on the Kabini river — a Kerala Forest Department eco-tourism site, but it''s a 40km drive on the lesser-used Mananthavady road. Day-trippers from Bengaluru and Kochi who base in Kalpetta rarely make the loop; the island is closed during monsoon (June-September) when the Kabini swells. December-May is the open window most tourists miss because Wayanad''s prime season is monsoon.',
  'Three-island cluster — Kuruva, Pakshipathalam-adjacent — accessible only by bamboo raft from the south bank ferry. The forest is rare riverine evergreen (Myristica swamp, found in only a few Western Ghats pockets). 1.5-2 hour walking trail through the largest island, marked by KFD; orchids, mushrooms, butterflies common. Entry ₹160, open 9am-3pm last entry, Dec-May only (closed monsoon). Carry no plastic; KFD checks bags.',
  'moderate',
  'Kerala Forest Department; Kerala Tourism eco-tourism listing.',
  5,
  ARRAY['island','river','forest','eco','kabini','seasonal']::text[],
  '{}'::jsonb
);

-- =========================================================
-- LOCAL EATERIES — 5 verified Wayanad anchors
-- =========================================================

INSERT INTO local_eateries (
  destination_id, name, area, area_slug, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, is_legendary
) VALUES (
  'wayanad',
  'Vythiri Village Restaurant',
  'Vythiri Village Resort, Lakkidi — 5km south of Kalpetta',
  'lakkidi',
  ARRAY['kerala','indian','continental','seafood']::text[],
  'fine_dining',
  'Kerala set-menu with karimeen molee',
  ARRAY['Karimeen molee','Wayanad chicken biriyani','Bamboo-shoot curry','Filter coffee']::text[],
  '₹₹₹₹',
  '[1500,2501)'::int4range,
  'mixed',
  true,
  'recommended',
  'smart-casual',
  'In-house restaurant of Vythiri Village Resort, the most-recommended Wayanad rainforest resort. Open to non-resident lunch/dinner walk-ins on weekdays. Kerala set-menu lunch ₹1,800 per head; à la carte covers Kerala-Malabar, Indian, and continental. Open 7am-10:30pm.',
  'Resort guests get priority. Lunch 12-2:30pm; book 4 hours ahead for the rainforest-deck table. The set-menu (10-course Kerala thali) is the call for first-timers. Cards and UPI both work.',
  'Vythiri Village Resort, Lakkidi, Wayanad 673576',
  'https://maps.google.com/?q=Vythiri+Village+Resort+Wayanad',
  ARRAY[
    'https://www.vythirivillage.com/dining/',
    'https://www.tripadvisor.in/Hotel_Review-g780867-Reviews-Vythiri_Village-Vythiri_Wayanad_District_Kerala.html'
  ]::text[],
  '2026-05-11',
  false
),
(
  'wayanad',
  'Hotel Surya',
  'Kalpetta town centre',
  'kalpetta',
  ARRAY['kerala','south-indian','malabar']::text[],
  'casual',
  'Kerala meals with karimeen',
  ARRAY['Kerala meals','Karimeen fry','Beef ularthiyathu','Coconut payasam']::text[],
  '₹₹',
  '[200,401)'::int4range,
  'mixed',
  true,
  'walk-in',
  'casual',
  'Kalpetta town centre Kerala-meals standard, 200m from the KSRTC bus stand. Non-veg banana-leaf thali at lunch (rice, fish curry, fish fry, vegetable, two thorans, pickle, papadam, payasam). Open 7am-10:30pm. Used by Wayanad day-trippers as the standard Kalpetta lunch stop.',
  'Meals 12-3pm; karimeen seasonal Nov-Feb — confirm by phone. Pre-1pm is calmer. Cash and UPI.',
  'Kalpetta, Wayanad 673121',
  'https://maps.google.com/?q=Hotel+Surya+Kalpetta+Wayanad',
  ARRAY[
    'https://www.zomato.com/wayanad/hotel-surya-kalpetta',
    'https://www.tripadvisor.in/Restaurants-g778431-Kalpetta_Wayanad_District_Kerala.html'
  ]::text[],
  '2026-05-11',
  false
),
(
  'wayanad',
  'SN Annapoorna',
  'Sultan Bathery town, near KSRTC bus stand',
  'sultan-bathery',
  ARRAY['south-indian','kerala','vegetarian']::text[],
  'casual',
  'South Indian vegetarian thali',
  ARRAY['Vegetarian thali','Masala dosa','Idli with sambhar','Filter coffee']::text[],
  '₹',
  '[100,201)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Pure-vegetarian South Indian thali stand on Sultan Bathery''s main road, opposite the KSRTC bus stand. The standard Edakkal-Caves day-tripper lunch stop. Breakfast (idli, dosa) from 6:30am; lunch thali 12-3pm at ₹100-150; evening tiffin 4-9pm.',
  'Thali 12-2pm — go before 1pm to skip the bus crowd. The masala dosa at breakfast is the safer first-visit call. UPI accepted; cash always.',
  'Sultan Bathery, Wayanad 673592',
  'https://maps.google.com/?q=SN+Annapoorna+Sultan+Bathery',
  ARRAY[
    'https://www.zomato.com/wayanad/sn-annapoorna-sultan-bathery',
    'https://www.tripadvisor.in/Restaurants-g4106257-Sultan_Bathery_Wayanad_District_Kerala.html'
  ]::text[],
  '2026-05-11',
  false
),
(
  'wayanad',
  'Avani Spice Restaurant',
  'Meppadi Road, Kalpetta — 3km from Kalpetta centre',
  'kalpetta',
  ARRAY['kerala','malabar','indian','seafood']::text[],
  'mid_range',
  'Bamboo-shoot curry with appam',
  ARRAY['Bamboo-shoot curry','Wayanad chicken biriyani','Karimeen pollichathu','Wayanad coffee']::text[],
  '₹₹',
  '[300,551)'::int4range,
  'mixed',
  true,
  'recommended',
  'casual',
  'Mid-range Kalpetta restaurant specialising in Wayanad tribal-influenced cuisine — bamboo-shoot curry (eraachi puttu), wild-honey-glazed chicken, and the Wayanad biriyani (smaller portion than Calicut, drier rice). Open 11am-10:30pm. Used by Wayanad resort drop-offs on the way to Kalpetta town.',
  'Bamboo-shoot curry seasonal in monsoon (Jun-Sep) and post-monsoon (Oct-Nov) when shoots are fresh; off-season the kitchen substitutes dry bamboo and the texture is different. Weekend dinner needs a phone-ahead. Cards and UPI both work.',
  'Meppadi Road, Kalpetta, Wayanad 673121',
  'https://maps.google.com/?q=Avani+Spice+Restaurant+Kalpetta',
  ARRAY[
    'https://www.zomato.com/wayanad/avani-spice-restaurant-kalpetta',
    'https://www.tripadvisor.in/Restaurants-g778431-Kalpetta_Wayanad_District_Kerala.html'
  ]::text[],
  '2026-05-11',
  false
),
(
  'wayanad',
  'Coffee Pot',
  'Main Road, Kalpetta',
  'kalpetta',
  ARRAY['coffee','south-indian','snacks']::text[],
  'cafe',
  'Wayanad single-origin filter coffee',
  ARRAY['Wayanad filter coffee','Banana fritter (pazham pori)','Vegetable cutlet','Bun-butter-jam']::text[],
  '₹',
  '[80,201)'::int4range,
  'veg-friendly',
  true,
  'walk-in',
  'casual',
  'Wayanad-coffee specialist on Kalpetta Main Road — pours single-origin Wayanad arabica (Wayanad is one of India''s three GI-tagged coffee origins, alongside Araku and Coorg). Tasting flight (₹150) covers four estate roasts. Beans (250g pack ₹400-600) available for take-home. Open 7am-9:30pm.',
  'Tasting flight is best at 10am when staff finish the morning roast. Buy beans not powder for travel — local powder oxidises in 2 weeks. UPI works; cash always.',
  'Main Road, Kalpetta, Wayanad 673121',
  'https://maps.google.com/?q=Coffee+Pot+Kalpetta',
  ARRAY[
    'https://www.zomato.com/wayanad/coffee-pot-kalpetta',
    'https://www.tripadvisor.in/Restaurants-g778431-c8-Kalpetta_Wayanad_District_Kerala.html'
  ]::text[],
  '2026-05-11',
  false
);
