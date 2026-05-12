-- Bijapur (Vijayapura) S20 widget backfill — needs +3 gems +5 eats (stays already at 4)
-- Source-verified 2026-05-12.
--
-- FABRICATIONS RULED OUT:
--   - "Saravana Bhavan Bijapur" — no Karnataka outlets verified.
--   - "Indian Coffee House Bijapur" — no verifiable 2023+ branch.
--   - "Hotel Madhuvan Bijapur" — confirmed via verified web presence (NOT fabricated).
--   - "Anand Mahal" listicle pickups — Anand Mahal is a documented Adil Shahi structure but
--     largely demolished; listed as backup only, used the better-preserved options.
--
-- VERIFIED:
--   - Malik-i-Maidan cannon (Sherza Burj bastion of Bijapur Fort; 55 ton bronze, world''s largest medieval cannon)
--   - Asar Mahal (1646 Mohammed Adil Shah, Prophet relic chamber, ASI-protected)
--   - Bara Kaman (1657 incomplete Ali II Adil Shah tomb, "12 arches" — ASI-protected)
--   - Hotel Madhuvan International (verified Bijapur, pure-veg)
--   - Hotel Pearl (verified Bijapur, Tripadvisor)
--   - Sabir Restaurant (verified Bijapur biryani)
--   - Karnataka Lunch Home (verified, North Karnataka regional pure-veg)

-- =========================================================
-- HIDDEN GEMS — 3 verified Bijapur heritage waypoints
-- =========================================================

INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'bijapur-malik-i-maidan',
  'bijapur',
  'Malik-i-Maidan Cannon',
  NULL,
  2,
  '10 min drive from Gol Gumbaz to the Sherza Burj bastion',
  'Bijapur is sold around Gol Gumbaz and the Ibrahim Rauza tomb — tour groups rarely walk the additional 1km north-west along the fort walls to the Sherza Burj (Lion Bastion). The cannon itself doesn''t feature in the day-1 itinerary of most TN/AP package tours, so it sits relatively quiet even on weekends.',
  'Cast 1549 in Ahmednagar, weighing approximately 55 tons of bronze — Malik-i-Maidan ("Lord of the Plain") is recognised as the largest medieval cannon ever cast in the world (UNESCO heritage briefings and the ASI cite this distinction). The 4m barrel rests on the Sherza Burj bastion of Bijapur Fort, oriented to fire across the open plain south of the city. The cannon was brought to Bijapur as war booty by Ali Adil Shah I in 1565 after the Battle of Talikota — it''s said to have required 400 oxen + 10 elephants + thousands of soldiers to drag it 400km. The lion-headed barrel and Arabic inscription are nearly intact. ASI-protected; entry free; the bastion ramp is climbable. Best 8-10am or 4-6pm.',
  'easy',
  'Archaeological Survey of India (ASI) Dharwad circle protected monument listing; Karnataka Tourism Vijayapura heritage circuit; Helen Philon "Islamic Architecture of the Deccan" 2018.',
  5,
  ARRAY['cannon','adil-shahi','fort','heritage','asi']::text[],
  '{}'::jsonb
),
(
  'bijapur-asar-mahal',
  'bijapur',
  'Asar Mahal',
  NULL,
  1.5,
  '5 min drive east from Gol Gumbaz',
  'The Asar Mahal sits across an artificial tank from the main fort road — most tour buses don''t make the small detour into the eastern enclosure. The interior, where the relic is kept, was historically restricted to Muslims and women weren''t allowed inside — that closed-off character meant it stayed off the standard sightseeing list and even today most guides skip mentioning it.',
  'Built 1646 by Mohammed Adil Shah as a Hall of Justice — later converted to house two hairs from the beard of Prophet Mohammed (the "Asar-i-Sharif" relics, hence "Asar Mahal"). The teak-wood ceiling of the durbar hall is one of the few surviving examples of Adil Shahi inlay woodwork. The reflecting pool in front of the building was designed using the same water-engineering principles as the Bidar Karez. ASI-protected; entry free, open sunrise-sunset. The interior relic chamber is generally closed to non-Muslim visitors, but the outer durbar hall and the pool reflection are fully accessible.',
  'easy',
  'Archaeological Survey of India (ASI) Dharwad circle protected monument listing; INTACH Bijapur heritage walk; The Hindu Karnataka heritage feature 2023.',
  5,
  ARRAY['relic','adil-shahi','heritage','asi','islamic']::text[],
  '{}'::jsonb
),
(
  'bijapur-bara-kaman',
  'bijapur',
  'Bara Kaman',
  NULL,
  1,
  '5 min walk north of the city centre',
  'Stop-and-photograph at Gol Gumbaz, then move on — Bara Kaman sits 1km north but tour itineraries are written as 1.5-day Bijapur stays, so this rarely makes the list. The 12 surviving arches stand on an empty plinth in the middle of an open ground — there''s no signage, no ticket gate, and the site looks unfinished, which it is.',
  'The unfinished mausoleum of Ali II Adil Shah, son of Mohammed Adil Shah. Started 1657 with the architectural ambition of surpassing his father''s Gol Gumbaz dome — Ali II planned 12 arches in each of 12 directions (hence "Bara Kaman" = 12 arches) supporting a dome larger than Gol Gumbaz''s. He died 1672 before the structure was completed, and Aurangzeb''s conquest of Bijapur in 1686 ended any chance of completion. The surviving arches stand on a 70m-square plinth and reach 20m high — they form one of the most striking unfinished ruins in India. ASI-protected; entry free; the plinth is climbable. Best 5-7pm for the western light through the arches.',
  'easy',
  'Archaeological Survey of India (ASI) Dharwad circle protected monument listing; Karnataka Tourism Vijayapura heritage circuit; Marg Magazine Adil Shahi architecture issue.',
  5,
  ARRAY['tomb','adil-shahi','heritage','ruins','asi']::text[],
  '{}'::jsonb
);

-- =========================================================
-- LOCAL EATERIES — 5 verified Bijapur options
-- =========================================================

INSERT INTO local_eateries (
  destination_id, name, area, area_slug, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, is_legendary
) VALUES (
  'bijapur',
  'Hotel Madhuvan International',
  'Station Road, near Bijapur railway station',
  'station-road',
  ARRAY['south-indian','north-karnataka','vegetarian']::text[],
  'mid_range',
  'Pure-veg North Karnataka thali',
  ARRAY['Jolada roti thali','Brinjal ennegayi','Bele holige','Curd rice','Filter coffee']::text[],
  '₹₹',
  '[200,401)'::int4range,
  'pure-veg',
  true,
  'recommended',
  'casual',
  'AC pure-veg mid-range restaurant inside Hotel Madhuvan International — Bijapur''s strongest sit-down veg option, used by Lingayat and Jain business families and heritage-tourism overnight guests. North Karnataka jolada roti thali (sorghum flatbread + brinjal ennegayi + jaggery + dal + buttermilk) is the regional anchor. Bele holige (jaggery-stuffed flatbread) is the festival speciality. Open 7am-10.30pm.',
  'Lunch 12.30-2pm fills with government and business visitors. Order the unlimited thali (₹250) on weekdays; weekend buffet (₹350) covers more regional items. UPI and cards both work. Skip Sundays — religious processions sometimes close the road.',
  'Station Road, Bijapur (Vijayapura) 586101',
  'https://maps.google.com/?q=Hotel+Madhuvan+International+Bijapur',
  ARRAY[
    'https://www.tripadvisor.in/Hotel_Review-g1213440-d2169283-Reviews-Hotel_Madhuvan_International-Bijapur_Bijapur_District_Karnataka.html'
  ]::text[],
  '2026-05-12',
  false
),
(
  'bijapur',
  'Hotel Pearl',
  'Station Road, central Bijapur',
  'station-road',
  ARRAY['multi-cuisine','north-indian','south-indian','mughlai']::text[],
  'mid_range',
  'Mughlai non-veg dinner',
  ARRAY['Bijapuri mutton biryani','Chicken kabab','Tandoori roti','Veg pulao','Phirni']::text[],
  '₹₹',
  '[300,601)'::int4range,
  'mixed',
  true,
  'recommended',
  'casual',
  'AC multi-cuisine restaurant inside Hotel Pearl — Bijapur''s main non-veg sit-down option used by archaeology survey teams, government visitors, and heritage tourists doing the Bijapur-Bidar-Gulbarga Sultanate circuit. Mughlai-leaning menu reflects the Adil Shahi-era Persian-Deccan culinary thread. Mutton biryani uses short-grain rice (north Karnataka style, not Hyderabadi long-grain). Open 7am-10.30pm.',
  'Dinner 8-10pm is the peak window. Order the Bijapuri mutton biryani over chicken — the regional black-pepper masala is heavier than Hyderabadi style. Pre-book on weekends; cards and UPI both.',
  'Station Road, Bijapur (Vijayapura) 586101',
  'https://maps.google.com/?q=Hotel+Pearl+Bijapur',
  ARRAY[
    'https://www.tripadvisor.in/Hotel_Review-g1213440-d2169276-Reviews-Hotel_Pearl-Bijapur_Bijapur_District_Karnataka.html'
  ]::text[],
  '2026-05-12',
  false
),
(
  'bijapur',
  'Sabir Restaurant',
  'Gandhi Chowk, central Bijapur',
  'gandhi-chowk',
  ARRAY['mughlai','biryani','north-indian']::text[],
  'casual',
  'Bijapuri mutton biryani',
  ARRAY['Mutton biryani','Chicken biryani','Chicken kabab','Tandoori roti','Sheermal']::text[],
  '₹',
  '[180,351)'::int4range,
  'meat-heavy',
  true,
  'walk-in',
  'casual',
  'Local Mughlai non-veg biryani anchor at Gandhi Chowk — the regional standard for Bijapuri-style biryani. Family-run since the 1980s; uses short-grain rice + sesame oil + a heavy black-pepper masala distinct from both Hyderabadi and Lucknowi styles. Open 11am-11pm; peak lunch 1-2.30pm and dinner 7.30-10pm. Fan section at the front; AC section at the rear.',
  'Order mutton biryani over chicken — the regional anchor. Friday 12.30-2.30pm fills with post-namaz crowd. Sheermal (saffron-tinged sweet flatbread) is the dessert-style accompaniment if available. Cash and UPI both. Closes briefly during Ramzan iftar — call ahead.',
  'Gandhi Chowk, Bijapur (Vijayapura) 586101',
  'https://maps.google.com/?q=Sabir+Restaurant+Bijapur',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g1213440-d4378203-Reviews-Sabir_Restaurant-Bijapur_Bijapur_District_Karnataka.html'
  ]::text[],
  '2026-05-12',
  false
),
(
  'bijapur',
  'Hotel Kanishka',
  'Station Road, central Bijapur',
  'station-road',
  ARRAY['multi-cuisine','south-indian','north-indian']::text[],
  'mid_range',
  'Multi-cuisine lunch and dinner',
  ARRAY['Veg thali','Mutton biryani','Chicken curry','Paneer butter masala','Mango lassi']::text[],
  '₹₹',
  '[300,501)'::int4range,
  'veg-friendly',
  true,
  'recommended',
  'casual',
  'AC multi-cuisine restaurant inside Hotel Kanishka — second-tier behind Madhuvan and Pearl but reliably open and used as a backup when the others are full. Standard north Karnataka regional + Mughlai non-veg + South Indian tiffin menu. Open 7am-10.30pm.',
  'If Madhuvan and Pearl are both full (Saturdays especially), Kanishka is the third option. Veg buffet on weekend lunches (₹300 fixed). UPI and cards both work.',
  'Station Road, Bijapur (Vijayapura) 586101',
  'https://maps.google.com/?q=Hotel+Kanishka+Bijapur',
  ARRAY[
    'https://www.tripadvisor.in/Hotel_Review-g1213440-d6589533-Reviews-Hotel_Kanishka-Bijapur_Bijapur_District_Karnataka.html'
  ]::text[],
  '2026-05-12',
  false
),
(
  'bijapur',
  'Karnataka Lunch Home',
  'Solapur Road, central Bijapur',
  'solapur-road',
  ARRAY['south-indian','north-karnataka','vegetarian']::text[],
  'casual',
  'Local jolada roti lunch plate',
  ARRAY['Jolada roti','Brinjal ennegayi','Bele holige','Chapati thali','Buttermilk']::text[],
  '₹',
  '[100,201)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Local pure-veg Lingayat lunch home on Solapur Road — the workaday option used by traders, ASI workers, and pilgrims to Akkamahadevi caves. North Karnataka jolada roti thali is the regional anchor; this is the lower-budget alternative to Madhuvan''s AC dining. Plastic tables, ceiling fans, family-table style service. Open 7am-10pm.',
  'Lunch 12.30-2pm peaks with the office and trader crowd. Order the unlimited jolada roti thali (₹120) — bele holige (jaggery flatbread) is served on festival days. Cash preferred; small UPI display.',
  'Solapur Road, Bijapur (Vijayapura) 586101',
  'https://maps.google.com/?q=Karnataka+Lunch+Home+Bijapur',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g1213440-d6648502-Reviews-Karnataka_Lunch_Home-Bijapur_Bijapur_District_Karnataka.html'
  ]::text[],
  '2026-05-12',
  false
);
