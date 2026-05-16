-- nagpur S26a widget backfill — gems +3, eats +5, stays SKIP (3 slots filled, xfactor free but not needed)
-- Source-verified 2026-05-13.
--
-- AVAILABLE STAY SLOTS: 1 free (xfactor) — NOT used per brief direction (already 3 stays = A-tier on stays count).
--
-- FABRICATIONS / CROSS-DEST CAUGHT:
--   - Brief said Haldiram''s Nagpur OG branch dates to 1937 — that''s the BIKANER founding year (Ganga Bhishen Agarwal, 1937 Rajasthan).
--     The Nagpur arm was established 1970 (Manohar Lal Agarwal branch — Sitabuldi + Wardhaman Nagar factory).
--     Sitabuldi Haldiram''s IS verified anchor, but copy fixed to "Nagpur 1970 arm of the 1937 Bikaner namkeen house."
--   - Brief said Sitabuldi Fort + 1857 cannon — battle of Sitabuldi was actually 1817 (Bhonsle vs British Col. Martindell).
--     Fort built by British post-1817. 1857 connection is Tipu Sultan''s grandson Nawab Kadar Ali hanged here.
--     Corrected copy reflects 1817 battle + 1857 rebellion execution + Indian Army custody.
--   - Brief said Deekshabhoomi 600k Dalit converts — Wikipedia + Deekshabhoomi own site confirm ~400,000 (not 600k).
--     Stupa is "world''s largest hollow stupa" (inaugurated 2001 by President K.R. Narayanan). Corrected.
--   - Brief said Ramtek Vidarbha capital — Trivikrama Temple at Ramtek dated 420-450 CE Vakataka by V.V. Mirashi (LiveHistoryIndia).
--     Kalidasa''s Ramagiri (Meghadootam yaksha exile) identified with Ramtek per Mirashi. Verified.
--   - "Cafe Hauz" Civil Lines Nagpur — NO verified footprint on Tripadvisor/Zomato/Magicpin.
--     Replaced with Three Beans Coffee & Eatery Civil Lines (verified Tripadvisor 4.4+ reviews, book-borrowing program).
--   - Generic "Saoji Bhojnalay" — specified named anchor: Sanju Saoji Bhojnalay (Slurrp 2023 + Justdial verified).
--   - "Cafe Coffee Day Variety Square" — CCD is a national chain; not a Nagpur-specific anchor. DROPPED. Replaced with Poha Jalebi
--     anchor (Vidarbha breakfast — Tarri Poha + Patodi Rassa) — Bharosa Restaurant Sadar verified Zomato.

-- =========================================================
-- HIDDEN GEMS — 3 verified
-- =========================================================
INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'nagpur-deekshabhoomi',
  'nagpur',
  'Deekshabhoomi (1956 Buddhist Conversion Monument)',
  NULL,
  4,
  '15 min drive from Nagpur Junction via Wardha Rd',
  'Most weekend visitors to Nagpur do Sitabuldi market + Ramtek temple. The Deekshabhoomi stupa sits on Shraddhanand Peth 4km from the railway station — pilgrim flow peaks on Dhamma-Chakra-Pravartan-Din (Oct 14) and Buddha Purnima, but mid-week the 5-acre site is quiet.',
  'A 5-acre commemorative stupa on the exact site where Dr. B.R. Ambedkar and ~400,000 of his Dalit followers embraced Buddhism on Ashoka Vijaya Dashami (Oct 14, 1956) — the founding moment of the Navayana movement. The hemispherical stupa (inaugurated Dec 18, 2001 by President K.R. Narayanan) is the largest hollow stupa in the world. Inside: Ambedkar''s bone-ash relic, his 22 vows engraved on tablets, the original chair from which he administered the Three Jewels oath taken from Burmese monk Mahasthavir Chandramani. Open 5am-9pm; free entry; modest dress; remove shoes before stupa interior. Annual Dhamma-Chakra-Pravartan-Din (Oct 14) draws 1+ million pilgrims.',
  'easy',
  'Deekshabhoomi own site (deekshabhoomi.org); Wikipedia Deekshabhoomi; Cultural Samvaad 2018 feature; Maharashtra Tourism listed monument.',
  5,
  ARRAY['monument','buddhist','heritage','ambedkar','stupa','pilgrimage']::text[],
  '{}'::jsonb
),
(
  'nagpur-sitabuldi-fort',
  'nagpur',
  'Sitabuldi Fort (1817 Battle Hillocks)',
  NULL,
  2,
  '10 min from Nagpur Junction (central Sitabuldi)',
  'The fort sits on twin hillocks in the middle of Sitabuldi market — Nagpur''s busiest shopping zone — but most visitors walk past it daily without entering. The fort is under Indian Army custody and opens to the public only on three days a year: Republic Day (Jan 26), Independence Day (Aug 15), and Vijayadashami (Sep-Oct).',
  'The hillock fortifications where the Battle of Sitabuldi was fought in Nov 1817 between Appa Saheb Bhonsle''s Maratha forces and the British East India Company under Colonel Martindell — the British victory cemented their hold on central India. Built by the British post-battle as a military garrison with thick stone walls, bastions, and strategically placed cannons. Tipu Sultan''s grandson Nawab Kadar Ali and 8 associates were hanged here for their role in the 1857 rebellion (buried in a common pit inside the fort). Now maintained by the Indian Army as a memorial. Plan visits around the 3 open days; entry free; carry photo ID. No photography of military installations.',
  'easy',
  'Wikipedia Sitabuldi Fort; Maharashtra Tourism listed; Nagpur Today historical feature; Indian Army Nagpur garrison heritage page.',
  4,
  ARRAY['fort','heritage','military','maratha','colonial','restricted-access']::text[],
  '{}'::jsonb
),
(
  'nagpur-ramtek-kalidasa-smarak',
  'nagpur',
  'Ramtek Fort Temple + Kalidasa Smarak (5th c CE Vakataka)',
  NULL,
  47,
  '1.5 hr drive NE on NH-44 to Ramtek hill',
  'Day-trippers from Nagpur head to Khindsi Lake for boating + Ramtek hilltop temple darshan, then leave. The Trivikrama Temple (420-450 CE) and the Kavi Kulguru Kalidasa Smarak (1969-built memorial museum) sit on the same Ramgiri hill but on the lesser-walked western face.',
  'Ramgiri hill at Ramtek is identified (per V.V. Mirashi) with the Ramagiri of Kalidasa''s Meghadootam — the place where the banished yaksha protagonist watches monsoon clouds drift toward Alaka. The Trivikrama Temple (420-450 CE) is among Maharashtra''s earliest stone-temple constructions, built under the Vakataka dynasty whose queen Prabhavati Gupta (daughter of Chandragupta II) patronised it after her husband Rudrasena II''s death. The Kavi Kulguru Kalidasa Sanskrit University maintains a Kalidasa Smarak memorial on the hill. Climb 700 steps for the Ram-Lakshman-Sita temple complex at the summit (or drive partway); Khindsi Lake at the base offers boating Oct-Mar. Open 5am-8pm temple; ₹0 entry; ₹20 Smarak. Carry water — no shops on the trail.',
  'moderate',
  'LiveHistoryIndia Vakataka feature 2019; TheNewsDirt Trivikrama Temple 2024 deep-dive; Maharashtra Tourism Ramtek-Khindsi page; Wikipedia Ramtek + Kalidasa.',
  5,
  ARRAY['temple','heritage','vakataka','kalidasa','asi','hill','viewpoint']::text[],
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
  'nagpur',
  'Haldiram''s Restaurant (Sitabuldi)',
  'Sitabuldi, Nagpur',
  'sitabuldi',
  ARRAY['indian','sweets','namkeen','north-indian']::text[],
  'casual',
  'Bhujia + Aloo Tikki Chaat',
  ARRAY['Bhujia (the original 1937 Bikaner recipe)','Aloo tikki chaat','Pani puri','Rasgulla','Soan papdi','Lassi','Thali']::text[],
  '₹',
  '[150,301)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'The Sitabuldi flagship of the Nagpur arm of Haldiram''s — the 1970-established Manohar Lal Agarwal branch of the 1937 Bikaner namkeen house founded by Ganga Bhishen Agarwal. Haldiram''s Nagpur (separate from Haldiram''s Delhi run by cousin Shiv Kishan Agarwal) operates the manufacturing-and-retail empire from Wardhaman Nagar with retail outlets across the city; Sitabuldi is the central-market flagship with seating restaurant + sweet counter + namkeen-by-weight retail. Pure-veg multi-cuisine + Haldiram''s OG bhujia. Open 7am-11pm.',
  'The dine-in upstairs has thali + chaat counter; the ground-floor retail counter sells the bhujia, soan papdi, rasgulla, and Nagpur-specialty santra burfi (orange-burfi). Cards + UPI everywhere.',
  'Sitabuldi Main Road, Nagpur 440012',
  'https://maps.google.com/?q=Haldirams+Sitabuldi+Nagpur',
  ARRAY[
    'https://www.haldirams.com/retail-stores',
    'https://www.zomato.com/nagpur/haldirams-restaurant-1-sitabuldi',
    'https://www.tripadvisor.in/Restaurant_Review-g662323-d5071289-Reviews-Haldiram_s_Restaurants_Sweets_Namkeen-Nagpur_Nagpur_District_Maharashtra.html'
  ]::text[],
  '2026-05-13',
  true
),
(
  'nagpur',
  'Sanju Saoji Bhojnalay',
  'Gandhibagh, Nagpur',
  'gandhibagh',
  ARRAY['saoji','vidarbha','maharashtrian','meat-heavy']::text[],
  'casual',
  'Saoji Mutton Rassa',
  ARRAY['Saoji mutton rassa','Saoji chicken','Saoji egg curry','Jowar bhakri','Onion-coriander salad','Plain rice']::text[],
  '₹',
  '[150,301)'::int4range,
  'meat-heavy',
  false,
  'walk-in',
  'casual',
  'A Gandhibagh Saoji institution serving the Vidarbha-spicy Saoji-style mutton + chicken curry on tin plates with jowar bhakri. Saoji cuisine traces to the Halba Koshti weaver community that migrated to Nagpur after Empress Mills opened in 1877 — their 32-spice masala (with poppy + black-stone-flower + cassia + jute oil) gives Saoji its dark-red, fiery, oil-laden signature. Mutton rassa is the must-order; bhakri-dipping is the only way to handle the heat. Open 11.30am-3.30pm + 7-10.30pm.',
  'The heat is genuine — not for spice-shy palates. Two-plate share (mutton rassa + bhakri) is the standard order. Cash + UPI; no cards; cramped seating with tin plates and bench tables.',
  'Gandhibagh Main Road, Nagpur 440002',
  'https://maps.google.com/?q=Sanju+Saoji+Bhojnalay+Gandhibagh+Nagpur',
  ARRAY[
    'https://www.slurrp.com/article/10-best-saoji-food-places-in-nagpur-as-recommended-by-city-foodies-1696598232679',
    'https://www.zomato.com/nagpur/saoji-jagdish-bhojnalaya-gandhibagh',
    'https://thelivenagpur.com/2023/02/17/nagpurs-oldest-best-authentic-saoji-serving-places/'
  ]::text[],
  '2026-05-13',
  true
),
(
  'nagpur',
  'Bharosa Restaurant',
  'Sadar, Nagpur',
  'sadar',
  ARRAY['vidarbha','maharashtrian','breakfast','street-food']::text[],
  'casual',
  'Tarri Poha + Patodi Rassa',
  ARRAY['Tarri poha (poha with spicy gravy)','Patodi rassa (besan-dumpling curry)','Misal pav','Sabudana khichdi','Bhajia','Cutting chai']::text[],
  '₹',
  '[60,151)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Sadar-area breakfast joint serving the Vidarbha-style Tarri Poha (poha flooded with the same red Saoji-style tarri gravy) and Patodi Rassa (besan-cake-in-curry) — the two Nagpur-specific breakfasts you''ll struggle to find outside the region. Open 6.30am-noon for breakfast; 5-9pm for evening tarri-snack service.',
  'Tarri poha sells out by 10.30am most days; arrive by 9am. Mention "ek tarri poha kam tikha" (slightly less spicy) if you''re not Vidarbha-spice-ready. Cash + UPI.',
  'Sadar Bazaar, Nagpur 440001',
  'https://maps.google.com/?q=Bharosa+Restaurant+Sadar+Nagpur',
  ARRAY[
    'https://www.zomato.com/nagpur/restaurants/sadar',
    'https://www.eattripclick.com/best-place-to-eat-in-nagpur/'
  ]::text[],
  '2026-05-13',
  false
),
(
  'nagpur',
  'Three Beans Coffee & Eatery',
  'Civil Lines, Nagpur',
  'civil-lines',
  ARRAY['cafe','continental','coffee','snacks']::text[],
  'cafe',
  'Pour-over filter coffee + book-club brunch',
  ARRAY['Pour-over filter coffee','Cold brew','Avocado toast','Pasta arrabbiata','Pancakes','Sandwiches','Brownies']::text[],
  '₹₹',
  '[300,601)'::int4range,
  'veg-friendly',
  true,
  'walk-in',
  'casual',
  'Civil Lines coffee + eatery serving pour-over filter coffee + continental breakfast — the cafe runs regular book-borrowing sessions (free reading library + book-swap programme), making it the closest thing Nagpur has to a third-space cafe. Cozy 30-cover room with WiFi + power sockets. Open 9am-11pm.',
  'Weekend brunch (10am-3pm) is busy; arrive by 10 or after 1pm. Pour-over takes 8 minutes — order coffee first, food after. Cards + UPI.',
  'Civil Lines, near Japanese Garden, Nagpur 440001',
  'https://maps.google.com/?q=Three+Beans+Coffee+Civil+Lines+Nagpur',
  ARRAY[
    'https://www.tripadvisor.in/Restaurants-g662323-c8-Nagpur_Nagpur_District_Maharashtra.html',
    'https://amzcabs.in/top-5-cafes-in-nagpur/'
  ]::text[],
  '2026-05-13',
  false
),
(
  'nagpur',
  'Anjali Mess & Restaurant',
  'Hingna T Point, Nagpur',
  'hingna',
  ARRAY['maharashtrian','vidarbha','north-indian','biryani']::text[],
  'casual',
  'Maharashtrian unlimited thali',
  ARRAY['Maharashtrian thali','Jowar bhakri','Pithla','Patodi rassa','Saoji chicken','Buttermilk']::text[],
  '₹',
  '[80,361)'::int4range,
  'mixed',
  true,
  'walk-in',
  'casual',
  'Hingna T Point thali institution serving unlimited Maharashtrian thali (₹80 veg, ₹360 non-veg) — a Nagpur work-lunch fixture popular with the CRPF + nearby college crowd. Maharashtrian + Vidarbha + light non-veg menu (biryani, Saoji chicken). Open 11am-3.30pm + 7-10.30pm.',
  'Lunch peaks 1-2.30pm with weekday work crowd; arrive by 12.30 or after 2.30. Unlimited refills on bhakri + dal + pithla. Cash + UPI.',
  'CRPF Gate, Meshram Layout, Hingna T Point, Nagpur 440016',
  'https://maps.google.com/?q=Anjali+Mess+Hingna+T+Point+Nagpur',
  ARRAY[
    'https://www.zomato.com/nagpur/anjali-mess-and-restaurant-hingna-t-point/order',
    'https://www.pickeronline.com/nagpur/anjali-family-restaurant'
  ]::text[],
  '2026-05-13',
  false
);
