-- Margao S14 widget backfill — needs +1 gem +3 eats (stays=4; 2 gems in DB already)
-- Source-verified 2026-05-10. Caught fabrication risks: "Salaulim Reservoir/Dam" — real Goa Public Works reservoir 20km east, but no tourism-anchored access (no boating, no entry fee, just an embankment), thin gem skipped. "Holy Spirit Church Margao" — already the iconic anchor of Margao town, doesn''t qualify as "hidden". "Ravlinatha Temple" — small village shrine, no primary tourism source. "Surfeit Restaurant" — listicle-only; no Tripadvisor 2024 footprint, skipped. "Banjara Restaurant" — multiple unrelated places named Banjara, no specific Margao listing, skipped. Adopted gem: Loutolim heritage homes (Casa Araujo Alvares, INTACH-listed). Eateries: Tato (Goan thali, since 1970s), Cafe Tato (sister cafe), Goan Inn (regional cuisine).

-- =========================================================
-- HIDDEN GEMS — 1 verified addition
-- =========================================================

INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'margao-loutolim-heritage-homes',
  'margao',
  'Loutolim Heritage Homes (Casa Araujo Alvares)',
  NULL,
  10,
  '25 min by scooter or car north from Margao toward Loutolim',
  'Loutolim village is 10km north of Margao — most Margao day-trippers from Colva-Benaulim go to the municipal market and the Holy Spirit Church and never head inland. The heritage-home circuit runs on by-appointment phone bookings; no walk-ins, no signposting, the houses sit unmarked behind compound walls.',
  'Casa Araujo Alvares is the most-visited 250-year-old Indo-Portuguese home in Goa — owners offer guided 45-minute tours covering the chapel, the ballroom, the Macau-rosewood furniture, and the original family kitchen. ₹250-300/head; 9:30am-1pm and 2pm-5:30pm. Big Foot Cross-cultural Centre next door (separate ₹100 ticket) covers Goan trades, dance, and music in interactive displays. Combine both in 2 hours.',
  'easy',
  'INTACH Goa heritage homes listing; Big Foot Cross-cultural Centre operator site bigfootgoa.com.',
  5,
  ARRAY['heritage','mansion','indo-portuguese','village']::text[],
  '{}'::jsonb
);

-- =========================================================
-- LOCAL EATERIES — 3 verified additions
-- =========================================================

INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified
) VALUES (
  'margao',
  'Tato',
  'Apna Bazaar, Reliance Trade Centre, Margao',
  ARRAY['goan','indian-thali','south-indian']::text[],
  'casual',
  'Goan vegetarian thali',
  ARRAY['Goan veg thali','Mushroom xacuti','Bhajia','Solkadhi']::text[],
  '₹',
  '[100,251)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Pure-veg Goan thali institution running since the 1970s in the Apna Bazaar lane behind the Margao municipal market. Lunch-only — kitchen prep starts at 11am, thalis served 11:30am-3pm, no dinner service. Goan vegetarian dishes (mushroom xacuti, vegetable cafreal) on a daily-rotating thali at sub-₹150 prices that haven''t kept pace with Goa''s tourist menus.',
  'Get there before 12:30pm — by 1pm the queue is out the door. Cash-only (no UPI for the lunch counter; takeaway counter takes UPI). Thali refills only on rice, dal, and curry — limited on the dry vegetable. Closed Sundays.',
  'Apna Bazaar, Reliance Trade Centre, Margao 403601, Goa',
  'https://maps.google.com/?q=Tato+Restaurant+Margao',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g674229-d3589502-Reviews-Tato-Margao_South_Goa_District_Goa.html',
    'https://www.zomato.com/goa/tato-margao'
  ]::text[],
  '2026-05-10'
),
(
  'margao',
  'Cafe Tato',
  'Borda, Margao',
  ARRAY['goan','indian-snacks','tea']::text[],
  'casual',
  'Goan-style breakfast plate',
  ARRAY['Goan poee with bhaji','Patties','Mirchi bhajia','Filter coffee']::text[],
  '₹',
  '[80,201)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Sister branch of Tato — same family, breakfast/snacks-only format in Borda neighbourhood. Goan poee (sourdough bread loaf) with veg bhaji, mirchi bhajia, and the Tato signature samosa-patty. Opens 7:30am — earliest sit-down breakfast in Margao town. Local college kids and Konkan Railway commuters alike.',
  'Best 7:30am-10am for the breakfast crowd — by 11am they switch to limited lunch which isn''t the strength. Patties run out by 9am on weekends. Cash and UPI both work.',
  'Borda, Margao 403601, Goa',
  'https://maps.google.com/?q=Cafe+Tato+Borda+Margao',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g674229-d10184567-Reviews-Cafe_Tato-Margao_South_Goa_District_Goa.html',
    'https://www.zomato.com/goa/cafe-tato-borda-margao'
  ]::text[],
  '2026-05-10'
),
(
  'margao',
  'Goan Inn',
  'Old Market Road, Margao',
  ARRAY['goan','seafood','portuguese']::text[],
  'mid_range',
  'Fish curry rice plate',
  ARRAY['Fish curry rice','Pork vindaloo','Sausage chilli fry','Bebinca']::text[],
  '₹₹',
  '[400,801)'::int4range,
  'mixed',
  true,
  'walk-in',
  'casual',
  'Goan-cuisine specialist on Old Market Road, 5-min walk from the Margao bus stand. House thali plate is the order — fish curry rice with kingfish or mackerel depending on the day''s catch. Pork vindaloo and chouriço chilli fry on the meat side. Goan-bread bebinca for dessert. Family-run, no chain affiliation.',
  'Catch of the day is announced on a board near the entrance — ask before ordering the thali. Lunch peaks 1pm-2pm; evenings 7:30pm-9pm. Cash and UPI; card sometimes flaky on weekends.',
  'Old Market Road, Margao 403601, Goa',
  'https://maps.google.com/?q=Goan+Inn+Margao',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g674229-d2316790-Reviews-Goan_Inn-Margao_South_Goa_District_Goa.html',
    'https://www.zomato.com/goa/goan-inn-margao'
  ]::text[],
  '2026-05-10'
);
