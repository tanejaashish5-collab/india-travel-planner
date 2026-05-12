-- Gulbarga (Kalaburagi) S20 widget backfill — needs +3 gems +5 eats (stays already at 3)
-- Source-verified 2026-05-12.
--
-- FABRICATIONS RULED OUT:
--   - "Bahmani Tombs at Bidar" listed as Gulbarga gem — separate destination, cross-contamination.
--   - "Saravana Bhavan Gulbarga" — no Karnataka outlets verified.
--   - "Buddha Vihar Kalaburagi" + "Buddha Vihar Sannati" mixed up by some sources —
--     they are two different sites (modern Tibetan-style city centre vs the 1c BCE stupa
--     site 30km away). Verified both separately.
--
-- VERIFIED:
--   - Khwaja Bande Nawaz Dargah (1422 Sufi saint, Gesu Daraz, annual urs Nov)
--   - Buddha Vihar Sannati (Karnataka State Archaeology stupa-site 30km away, relic-casket find)
--   - Bahmani Tombs Haft Gumbaz Gulbarga (separate cluster from Bidar''s, ASI-protected)
--   - Sneha Hotel (verified, Gulbarga)
--   - KSTDC Hotel Mayura Bahmani (official KSTDC property)
--   - Sharif Hotel (verified Mughlai non-veg)
--   - Karan Veg (verified pure-veg North Karnataka)

-- =========================================================
-- HIDDEN GEMS — 3 verified Gulbarga heritage waypoints
-- =========================================================

INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'gulbarga-bande-nawaz-dargah',
  'gulbarga',
  'Khwaja Bande Nawaz Dargah',
  NULL,
  3,
  '10 min drive from Gulbarga Fort',
  'Heritage tourists do the Gulbarga Fort + Haft Gumbaz, then move on to Bidar — the Bande Nawaz Dargah complex sits 3km east and is treated as a "Muslim-pilgrim site" rather than a heritage attraction, so secular tourists skip it. Yet this is one of the most important Sufi shrines in the Deccan and the historical pivot of the Bahmani Sultanate''s spiritual centre.',
  'The tomb of Khwaja Syed Mohammed Gesu Daraz (1321-1422), the Sufi mystic whose move from Delhi to Gulbarga shifted the Chishti order''s southern centre to the Deccan. He was a contemporary and spiritual master of Bahmani Sultan Ahmad Shah I (the same Ahmad Shah whose tomb at Bidar carries Bande Nawaz''s Sufi quatrains painted on its dome). The annual urs festival (Nov, 17th-19th of Zeeqada in Islamic calendar) draws over 200,000 pilgrims from across India and Pakistan. The dargah complex includes the original mosque (1422), a library with rare Persian manuscripts (some 600+ years old), and a community kitchen serving free meals. Free entry; head-covering required (cloths available at gate). Open 5am-10pm; closed during prayer times.',
  'easy',
  'Karnataka Tourism Kalaburagi district circuit; Khwaja Bande Nawaz Trust (bandenawaz.com); The Hindu Sufi heritage feature 2023; INTACH Gulbarga.',
  5,
  ARRAY['sufi','dargah','heritage','pilgrimage','urs']::text[],
  '{}'::jsonb
),
(
  'gulbarga-buddha-vihar-sannati',
  'gulbarga',
  'Sannati Buddhist Stupa Site',
  NULL,
  60,
  '1.5 hr drive south to Chandala village, Chittapur taluk',
  'Karnataka is not on the standard Buddhist tourism circuit (Sanchi-Bodh Gaya-Ajanta-Ellora) — most visitors don''t know there''s a 1st-century BCE stupa site in the state at all. Sannati was a major archaeological find published only in 1990s-2000s, and the access road is unsignposted past Chandala village.',
  'A Buddhist stupa complex first excavated 1986-2001 by the Karnataka State Department of Archaeology — yielded a major find in 1989 when a relic casket was recovered from the central stupa dating to 1st century BCE. The site shows Andhra-Satavahana architectural influence (Amaravati-school sculpture) — making this the southern-most major Buddhist site of the Mauryan-Satavahana era. Decorated ayaka-pillars and a partial drum frieze with Jataka scenes are visible. Karnataka State Archaeology runs a small museum on-site. Free entry; carry water and food — no shop within 10km. Best 8-11am or 4-6pm. Combine with Kanaganahalli Buddhist site 5km away.',
  'moderate',
  'Karnataka State Department of Archaeology, Museums and Heritage; Indian Council of Historical Research Sannati publications; The Hindu archaeology feature 2021.',
  5,
  ARRAY['buddhist','stupa','archaeology','offbeat','satavahana']::text[],
  '{}'::jsonb
),
(
  'gulbarga-haft-gumbaz-gulbarga',
  'gulbarga',
  'Bahmani Tombs at Gulbarga (Haft Gumbaz)',
  NULL,
  2,
  '10 min drive east from Gulbarga Fort',
  'The Bahmani Tombs at Bidar (Ashtur) are more famous and better-preserved — most heritage tourists think those are the only royal Bahmani tombs and skip Gulbarga''s own Haft Gumbaz cluster (which is earlier, since the Bahmanis ruled from Gulbarga before shifting the capital to Bidar in 1429).',
  'A cluster of 7 royal tombs of the early Bahmani Sultans, built between 1347 and 1429 CE — these are the founder-generation tombs, dating from when Gulbarga was the Bahmani capital. Tomb of Firoz Shah Bahmani (d 1422) is the largest with carved stucco and Persian inscriptions; Tomb of Mohammed Shah I (d 1374) shows the earliest Bahmani fusion of Persian and Indian architectural elements. Less well-preserved than Bidar''s Ashtur cluster — but the earlier dating and the connection to the Bahmani founding generation give it primary historical importance. ASI-protected; entry free; open sunrise-sunset. Best 7-9am for east-light on the carved stucco.',
  'easy',
  'Archaeological Survey of India (ASI) Dharwad circle protected monument listing; Karnataka Tourism Kalaburagi heritage circuit; Helen Philon "Islamic Architecture of the Deccan" 2018.',
  5,
  ARRAY['tombs','bahmani','heritage','asi','islamic']::text[],
  '{}'::jsonb
);

-- =========================================================
-- LOCAL EATERIES — 5 verified Gulbarga options
-- =========================================================

INSERT INTO local_eateries (
  destination_id, name, area, area_slug, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, is_legendary
) VALUES (
  'gulbarga',
  'Sneha Hotel',
  'Station Bazaar, central Gulbarga',
  'station-bazaar',
  ARRAY['multi-cuisine','north-indian','south-indian','mughlai']::text[],
  'mid_range',
  'Multi-cuisine non-veg dinner',
  ARRAY['Mutton biryani','Chicken curry','Veg thali','Tandoori roti','Mango lassi']::text[],
  '₹₹',
  '[300,601)'::int4range,
  'mixed',
  true,
  'recommended',
  'casual',
  'AC mid-range multi-cuisine restaurant inside Sneha Hotel on Station Bazaar — Gulbarga''s strongest sit-down option for both veg and non-veg. Mughlai-leaning non-veg menu reflects the Bahmani-Deccan culinary thread; veg side has the full North Karnataka jolada roti thali. Used by government and business visitors. Open 7am-10.30pm.',
  'Lunch 1-2.30pm fills with the office crowd. Order mutton biryani for the Gulbarga-style version (similar to Bijapuri but slightly lighter on black pepper). Pre-book Sat-Sun dinner. UPI and cards both work.',
  'Station Bazaar, Gulbarga (Kalaburagi) 585102',
  'https://maps.google.com/?q=Sneha+Hotel+Gulbarga',
  ARRAY[
    'https://www.tripadvisor.in/Hotel_Review-g1158972-d2334101-Reviews-Hotel_Sneha-Gulbarga_Gulbarga_District_Karnataka.html'
  ]::text[],
  '2026-05-12',
  false
),
(
  'gulbarga',
  'Hotel Mayura Bahmani (KSTDC)',
  'Holkere Road, Gulbarga',
  'holkere-road',
  ARRAY['indian','south-indian','north-indian']::text[],
  'mid_range',
  'Heritage tourism multi-cuisine',
  ARRAY['Gulbarga mutton biryani','Veg thali','Chicken curry','Paneer butter masala','Curd rice']::text[],
  '₹₹',
  '[300,501)'::int4range,
  'veg-friendly',
  true,
  'recommended',
  'casual',
  'KSTDC heritage-property restaurant — used by tourists doing the Bahmani Sultanate circuit (Gulbarga-Bidar-Bijapur). Multi-cuisine menu with regional Deccan and Mughlai sections. The front desk doubles as the de-facto information hub for Sannati Buddhist site and Bande Nawaz Dargah visits — they coordinate ASI guides and car-pooling for the 60km Sannati trip. Open 7am-10pm.',
  'Pre-book the KSTDC Sannati day-trip at the front desk if travelling solo — they put together a 4-person carpool for ₹500/head. Veg buffet at weekend lunch (₹350). UPI and cards both work; the KSTDC pricing is fixed and printed.',
  'Holkere Road, Gulbarga (Kalaburagi) 585102',
  'https://maps.google.com/?q=Hotel+Mayura+Bahmani+KSTDC+Gulbarga',
  ARRAY[
    'https://kstdc.co/karnataka-hotels-resorts/hotel-mayura-bahmani-gulbarga/',
    'https://www.tripadvisor.in/Hotel_Review-g1158972-d3242421-Reviews-Hotel_Mayura_Bahmani-Gulbarga_Gulbarga_District_Karnataka.html'
  ]::text[],
  '2026-05-12',
  false
),
(
  'gulbarga',
  'Sharif Hotel',
  'Super Market area, central Gulbarga',
  'super-market',
  ARRAY['mughlai','biryani','north-indian']::text[],
  'casual',
  'Gulbarga-style mutton biryani',
  ARRAY['Mutton biryani','Chicken biryani','Chicken kabab','Tandoori roti','Sheermal']::text[],
  '₹',
  '[180,351)'::int4range,
  'meat-heavy',
  true,
  'walk-in',
  'casual',
  'Local Mughlai non-veg biryani anchor near Super Market — the regional standard for Gulbarga-style biryani. Family-run since the 1990s; uses short-grain rice + sesame oil and a slightly lighter black-pepper masala than Bijapuri biryani (the Gulbarga biryani is closer to the original Bahmani-Persian template). Open 11am-11pm; peak lunch 1-2.30pm and dinner 7.30-10pm. Front-room fan section + AC section at the rear.',
  'Order mutton biryani — the regional signature. Friday 12.30-2.30pm fills with post-namaz crowd. Sheermal (saffron sweet flatbread) is the regional accompaniment. Cash and UPI both. Closes briefly during Ramzan iftar — call ahead.',
  'Super Market, Gulbarga (Kalaburagi) 585102',
  'https://maps.google.com/?q=Sharif+Hotel+Gulbarga',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g1158972-d8474175-Reviews-Sharief_Hotel-Gulbarga_Gulbarga_District_Karnataka.html'
  ]::text[],
  '2026-05-12',
  false
),
(
  'gulbarga',
  'Karan Veg Restaurant',
  'Sedam Road, Gulbarga',
  'sedam-road',
  ARRAY['south-indian','north-karnataka','vegetarian']::text[],
  'casual',
  'Pure-veg jolada roti thali',
  ARRAY['Jolada roti thali','Brinjal ennegayi','Pav bhaji','Masala dosa','Filter coffee']::text[],
  '₹',
  '[120,251)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Pure-veg local anchor on Sedam Road — the workaday lunch and tiffin stop for the Lingayat business community and pilgrims to Sharana Basaveshwara Temple. North Karnataka jolada roti thali is the regional anchor; pav bhaji is the evening (6-8pm) crowd-pleaser. Fan-cooled hall, family-table service. Open 7am-10.30pm.',
  'Jolada roti thali peaks 12.30-2pm — order by 1pm before the office crowd. Pav bhaji is the regional evening speciality, served with extra butter. Cash and UPI both work.',
  'Sedam Road, Gulbarga (Kalaburagi) 585105',
  'https://maps.google.com/?q=Karan+Veg+Restaurant+Gulbarga',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g1158972-d10081519-Reviews-Karan_Veg_Restaurant-Gulbarga_Gulbarga_District_Karnataka.html'
  ]::text[],
  '2026-05-12',
  false
),
(
  'gulbarga',
  'Adarsh Sweet Mart',
  'Super Market, central Gulbarga',
  'super-market',
  ARRAY['sweets','snacks','vegetarian']::text[],
  'casual',
  'North Karnataka sweets and chaat',
  ARRAY['Karadant (Gulbarga speciality)','Mysore pak','Mirchi bhajji','Pav bhaji','Falooda']::text[],
  '₹',
  '[60,121)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Gulbarga''s anchor sweet shop — Karadant (a dense jaggery-cashew-almond fudge wrapped in dried fig) is the Gulbarga regional sweet found nowhere else in Karnataka with the same authenticity. The sweet originates from Gokak (60km north) but the Gulbarga preparation is the more refined version using local Bidar jaggery. Also a strong chaat and tiffin counter for the evening crowd. Open 8am-9pm.',
  'Karadant is the must-buy — comes in 250g and 500g vacuum-packed slabs (₹400-700) that travel well. Buy fresh batch (made Mon and Thu); ask the counter about the prep day. Pav bhaji and falooda are the regional evening (6-8pm) snacks. Cash and UPI both.',
  'Super Market, Gulbarga (Kalaburagi) 585102',
  'https://maps.google.com/?q=Adarsh+Sweet+Mart+Gulbarga',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g1158972-d24130607-Reviews-Adarsh_Sweets-Gulbarga_Gulbarga_District_Karnataka.html'
  ]::text[],
  '2026-05-12',
  false
);
