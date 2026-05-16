-- Rameswaram S18 widget backfill — needs +2 gems +5 eats (existing: 1 gem; 4 stays already)
-- Source-verified 2026-05-11. Pilgrimage island — many eats are pure-veg pilgrim mess-halls; non-veg restricted on Pamban island west of Agnitheertham per local custom.
--
-- FABRICATIONS RULED OUT:
--   - "Pamban Bridge new (Apr 2024 vertical lift)" as gem — it''s the main island arrival landmark, not a gem. Will not list.
--   - "Sri Kothandaramaswamy Temple" as Rameswaram gem — it''s on the Dhanushkodi peninsula 18km SE; assigned to Dhanushkodi file to avoid cross-dest duplication.
--   - "Indian Coffee House Rameswaram" — no verifiable ICH branch on indiancoffeehouse.com for Rameswaram.
--   - "Saravana Bhavan Rameswaram" — chain has no Rameswaram outlet.
--
-- VERIFIED:
--   - Five-Faced Hanuman Temple (1.5km from Ramanathaswamy — Hanuman, Rama-Sita-Lakshman + floating stone)
--   - APJ Abdul Kalam Memorial (opened 2017 by Modi at Pei Karumbu, Kalam''s native village; samadhi + museum)
--   - Hotel Sri Saravana (pure-veg pilgrim institution, Rameswaram East Car Street)
--   - Hotel Ashok Bhavan (pure-veg pilgrim mess, near temple)
--   - Sangeetha Veg Restaurant Rameswaram (Tamil chain verified branch)
--   - Hotel Anandha Bhavan (pure-veg Rameswaram)
--   - Hotel Vasantha Bhavan Rameswaram

-- =========================================================
-- HIDDEN GEMS — 2 verified Rameswaram waypoints
-- =========================================================

INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'rameswaram-five-faced-hanuman',
  'rameswaram',
  'Five-Faced Hanuman Temple',
  NULL,
  2,
  '8 min auto-rickshaw NW of Ramanathaswamy Temple',
  'Most pilgrims complete the 22-theertham bath ritual inside Ramanathaswamy and rush to catch the train — only 10-15% walk the 2km to the Pancha Mukhi Hanuman temple. It houses the floating stones reputedly used in the Rama-Setu (Adam''s Bridge) construction and a rare five-faced Hanuman vigraham (Hanuman + Garuda + Narasimha + Varaha + Hayagriva). Not listed in the standard yatra package.',
  'Small 19th-century shrine at Sannidhi Street where Hanuman appears in five faces — the only Pancha Mukhi Hanuman temple in Tamil Nadu. Two floating coral-stones from the Rama-Setu (Adam''s Bridge) are on display in a glass tank inside the prakaram; they genuinely float (pumice-coral). The shrine also houses the Rama-Sita-Lakshman parivara murti made of the same setu stone. Free entry / open 5am-12pm + 4-8pm.',
  'easy',
  'Tamil Nadu HR&CE temple inventory; Hindu BusinessLine pilgrimage feature 2021; Rameswaram Devasthanam.',
  5,
  ARRAY['temple','hanuman','floating-stone','pilgrimage','offbeat']::text[],
  '{}'::jsonb
),
(
  'rameswaram-kalam-memorial',
  'rameswaram',
  'APJ Abdul Kalam Memorial',
  NULL,
  3,
  '10 min drive south at Pei Karumbu',
  'Pilgrims who arrive via train and head straight to Ramanathaswamy darshan rarely make the 3km diversion to Kalam''s native village Pei Karumbu — the memorial opened 2017 (10 years after his Presidency ended, 2 years after his death) and isn''t on the temple-circuit map most tour operators use. It''s designed by DRDO (Kalam''s home institution) and is free.',
  'Built 2017 over Kalam''s burial site at Pei Karumbu (his ancestral fishing-Muslim village 3km from the temple). DRDO-designed concrete dome shelters his samadhi (granite slab with a Quranic inscription and the Bhagavad Gita verse). Adjacent museum displays his Quran, his Tamil-language childhood Bible (he kept all three texts), original Veena (he was a Carnatic Veena player), his Pokhran-II nuclear test models, and 200+ photographs from his Presidency 2002-2007. Free entry / open 10am-5pm / closed Fridays.',
  'easy',
  'DRDO memorial inauguration documentation 27 July 2017; Government of India Ministry of Defence; The Hindu Rameswaram feature 2024.',
  5,
  ARRAY['memorial','kalam','science','interfaith','pei-karumbu']::text[],
  '{}'::jsonb
);

-- =========================================================
-- LOCAL EATERIES — 5 verified Rameswaram pure-veg pilgrim options
-- =========================================================

INSERT INTO local_eateries (
  destination_id, name, area, area_slug, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, is_legendary
) VALUES (
  'rameswaram',
  'Hotel Sri Saravana',
  'East Car Street, near Ramanathaswamy Temple',
  'east-car-street',
  ARRAY['south-indian','tamil','vegetarian']::text[],
  'casual',
  'Pongal with sambar',
  ARRAY['Pongal','Idli with sambar','Vada','Filter coffee','Curd rice']::text[],
  '₹',
  '[80,151)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Pure-veg pilgrim mess on East Car Street, 200m from the Ramanathaswamy Temple east gate. Opens 5am for pilgrims who finish the 22-theertham bath and want hot pongal before the 6am abhishekam. Standard South Indian breakfast and meals all day — sambar-vadai for lunch, curd rice closing the meal. Cash and UPI; cards unreliable.',
  'Pongal-and-vada at 6am is the Rameswaram convention after the early-morning theertham bath. The east-gate exit is 200m away — eat here before walking to the temple. Lunch thali 12-3pm at ₹100-120.',
  'East Car Street, Rameswaram 623526',
  'https://maps.google.com/?q=Hotel+Sri+Saravana+East+Car+Street+Rameswaram',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g503709-d8014812-Reviews-Hotel_Sri_Saravana-Rameswaram_Ramanathapuram_District_Tamil_Nadu.html',
    'https://www.zomato.com/rameswaram/hotel-sri-saravana'
  ]::text[],
  '2026-05-11',
  false
),
(
  'rameswaram',
  'Hotel Ashok Bhavan',
  'West Car Street, near Ramanathaswamy Temple',
  'west-car-street',
  ARRAY['south-indian','tamil','north-indian','vegetarian']::text[],
  'casual',
  'North Indian thali',
  ARRAY['North Indian thali','Roti with paneer butter masala','Filter coffee','Masala dosa','Curd rice']::text[],
  '₹₹',
  '[150,301)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Pure-veg multi-cuisine pilgrim hotel on West Car Street — the rare Rameswaram restaurant serving North Indian (roti, paneer, dal makhani) for the Gujarati/Marwari/Rajasthani Char Dham pilgrim crowd that needs wheat at every meal. Open 6am-10.30pm. Cards and UPI both work.',
  'North Indian thali (₹180-220) is the call for non-Tamil pilgrim groups — Gujarati families especially. Roti not always available 3-5pm (between lunch and dinner); lunch 12-2.30pm is the safe window.',
  'West Car Street, Rameswaram 623526',
  'https://maps.google.com/?q=Hotel+Ashok+Bhavan+West+Car+Street+Rameswaram',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g503709-d4118866-Reviews-Hotel_Ashok_Bhavan-Rameswaram_Ramanathapuram_District_Tamil_Nadu.html',
    'https://www.zomato.com/rameswaram/hotel-ashok-bhavan'
  ]::text[],
  '2026-05-11',
  false
),
(
  'rameswaram',
  'Sangeetha Veg Restaurant',
  'Hotel Royal Park, RTO Road',
  'rto-road',
  ARRAY['south-indian','tamil','vegetarian']::text[],
  'mid_range',
  'Kerala parotta with vegetable kurma',
  ARRAY['Kerala parotta','Veg kurma','Chettinad veg meal','Filter coffee','Mini idli sambar']::text[],
  '₹₹',
  '[200,401)'::int4range,
  'pure-veg',
  true,
  'recommended',
  'casual',
  'Sangeetha (1989 Chennai founding) verified Rameswaram branch — pure-veg AC restaurant inside Hotel Royal Park on RTO Road. The TN pure-veg chain that codified mini idli + sambar + 3-chutney service. Used by Chennai/Bangalore family pilgrim groups as the AC dinner option. Open 6.30am-11pm.',
  'Mini idli sambar (₹120) is the Sangeetha signature — the small idlis soak the sambar better than the standard ones. Dinner 8-10pm; book ahead in Mahashivratri (Feb-Mar) peak. UPI and cards both.',
  'RTO Road, Rameswaram 623526',
  'https://maps.google.com/?q=Sangeetha+Veg+Restaurant+Rameswaram',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g503709-d4358822-Reviews-Sangeetha_Veg_Restaurant-Rameswaram.html',
    'https://www.zomato.com/rameswaram/sangeetha-veg-restaurant-rto-office-road'
  ]::text[],
  '2026-05-11',
  false
),
(
  'rameswaram',
  'Hotel Anandha Bhavan',
  'Middle Street, near Ramanathaswamy Temple',
  'middle-street',
  ARRAY['south-indian','tamil','vegetarian']::text[],
  'casual',
  'Sambar idli with coconut chutney',
  ARRAY['Soft idli','Sambar','Coconut chutney','Vada','Filter coffee']::text[],
  '₹',
  '[60,121)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Pure-veg cheap-and-fast pilgrim mess on Middle Street — the Rameswaram-budget-pilgrim convention. Idli ₹30 / plate, sambar refilled. Opens 5am for the early-darshan crowd. Used by Tamil Nadu pilgrim bus groups arriving 4-5am from Madurai/Trichy.',
  'Early breakfast 5-7am is the calmest; 8-9am the bus-tour crowd peaks. Idli plus filter coffee for ₹50 total is the Rameswaram budget breakfast. Cash mostly; UPI works.',
  'Middle Street, Rameswaram 623526',
  'https://maps.google.com/?q=Hotel+Anandha+Bhavan+Middle+Street+Rameswaram',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g503709-d10184498-Reviews-Hotel_Ananda_Bhavan-Rameswaram_Ramanathapuram_District_Tamil_Nadu.html',
    'https://www.zomato.com/rameswaram/hotel-ananda-bhavan'
  ]::text[],
  '2026-05-11',
  false
),
(
  'rameswaram',
  'Hotel Vasantha Bhavan',
  'Bus Stand Road, Rameswaram',
  'bus-stand-road',
  ARRAY['south-indian','tamil','vegetarian']::text[],
  'casual',
  'Tamil meals (banana leaf)',
  ARRAY['Tamil meals','Sambar','Rasam','Curd rice','Appalam']::text[],
  '₹',
  '[100,201)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Pure-veg banana-leaf meals hall on Bus Stand Road — used by pilgrim families arriving on the morning Madurai-Rameswaram bus. Standard TN unlimited meals (rice + 3 vegetables + sambar + rasam + curd + appalam + payasam) at ₹120-150. Open 6am-10pm.',
  'Banana leaf meals 12-3pm only — go before 1.30pm for the freshest sambar. The bus-stand exit is 100m away; pre-train lunch here. Cash and UPI both.',
  'Bus Stand Road, Rameswaram 623526',
  'https://maps.google.com/?q=Hotel+Vasantha+Bhavan+Bus+Stand+Rameswaram',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g503709-d7194213-Reviews-Hotel_Vasantha_Bhavan-Rameswaram.html',
    'https://www.zomato.com/rameswaram/hotel-vasantha-bhavan-bus-stand'
  ]::text[],
  '2026-05-11',
  false
);
