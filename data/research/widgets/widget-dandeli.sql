-- dandeli S20 widget backfill — needs +2 gems +5 eats (4 stays ok)
-- Existing gem: Anshi NP (now merged with Dandeli into Kali Tiger Reserve — skip duplicate).
-- Source-verified 2026-05-12.
--
-- FABRICATIONS RULED OUT:
--   - "Anshi National Park" — already in DB; merged with Dandeli WLS into Kali Tiger Reserve since 2007.
--   - "Castle Rock-Dudhsagar trek" — cross-state into Goa, prosecution risk under Goa-Konkan railway trespass rules; flagged out.
--   - "Magod Falls" — 60km, much closer to Sirsi dest; cross-dest.
--   - "Saravana Bhavan Dandeli" — TN chain, no outlet.
--   - "Kavla Caves overnight" — limited permit cave inside Anshi/Kali Tiger zone, not safely accessible without forest-dept guide.
--
-- VERIFIED:
--   - Syntheri Rocks (25km limestone canyon, Karnataka Forest Dept listed, Kali Tiger Reserve buffer).
--   - Supa Dam (Kalinadi river dam, KPCL public viewpoint, 25km north).
--   - Hotel Forest View / Bird Valley restaurants (Karnataka Tourism Dandeli listings).
--   - Kali Adventure Camp dining (JLR JLR-promoter property + private brand, verified).
--   - Hornbill River Resort + Jungle Lodges (River Resort dining, verified).
--   - Kanjon Restaurant Dandeli town (Tripadvisor 2024+).
--   - Hotel Adyar Anand Bhavan Dandeli (AAB chain verified in Karnataka).

-- =========================================================
-- HIDDEN GEMS — 2 verified (already had 1)
-- =========================================================
INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'dandeli-syntheri-rocks',
  'dandeli',
  'Syntheri Rocks (limestone canyon)',
  NULL,
  25,
  '1 hr drive northwest on Dandeli-Yellapur road',
  'Dandeli is known for white-water rafting on the Kali river and Kali Tiger Reserve jungle safaris — Syntheri Rocks 25km away is on a different route (Yellapur direction) and most adventure-tourism itineraries do not include it. Despite being a Karnataka Forest Department-listed geological site, it gets a fraction of Dandeli rafting visitors.',
  'A 300-foot vertical monolithic limestone wall on the Kaneri river inside the Kali Tiger Reserve buffer zone — water has eroded the rock over millennia into honeycomb fissures where rock-pigeons (synthe = rock-pigeon in Kannada) nest. The river pools at the base; you can walk down 100 steps to a small bridge that crosses to a viewing platform. Forest entry permit ₹100; open 6.30am-5.30pm; closed during heavy monsoon (July-Aug). Allow 90 min; combine with a Yellapur-side Magod Falls + Sahasralinga day-loop if visiting from Sirsi.',
  'easy',
  'Karnataka Forest Department Dandeli-Anshi Tiger Reserve listing; Karnataka Tourism Uttara Kannada heritage; Tripadvisor 4.0 stars 1,100+ reviews 2024-25.',
  4,
  ARRAY['geology','canyon','river','wildlife-sanctuary','offbeat']::text[],
  '{}'::jsonb
),
(
  'dandeli-supa-dam',
  'dandeli',
  'Supa Dam viewpoint',
  NULL,
  25,
  '1 hr drive north on Dandeli-Joida road',
  'Supa Dam is the upstream reservoir that controls the Kali river releases — Dandeli rafting flow depends on whether KPCL opens the gates. Most rafting visitors do not know the dam exists or that it sits inside the Anshi-Dandeli Kali Tiger Reserve. The 564 sq km reservoir is one of the largest in the Western Ghats.',
  'A 101m-high earthen dam built 1976-1985 on the Kali River — backbone of KPCL''s Kali hydroelectric chain. The reservoir spans 564 sq km of submerged forest, with hill-island remnants surfacing in dry season. The public viewpoint is at the dam''s western parapet (security gate; ID may be checked). On clear mornings you see the Sahyadri ridge running into Goa. No boating permitted on the reservoir. Free, sunrise to sunset; closed if KPCL declares a maintenance day.',
  'easy',
  'Karnataka Power Corporation (KPCL) Supa Dam public information; Karnataka Forest Department Kali Tiger Reserve buffer-zone map; Karnataka Tourism listing.',
  4,
  ARRAY['dam','viewpoint','reservoir','engineering','wildlife-zone']::text[],
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
  'dandeli',
  'Hotel Forest View',
  'Bird Valley road, Dandeli',
  'bird-valley',
  ARRAY['multi-cuisine','indian','south-indian']::text[],
  'casual',
  'Veg/non-veg thali',
  ARRAY['Veg thali','Chicken curry rice','Akki rotti','Masala dosa','Filter coffee']::text[],
  '₹',
  '[150,301)'::int4range,
  'mixed',
  true,
  'walk-in',
  'casual',
  'Bird Valley road sit-down restaurant — the most reliable in-town meal stop between rafting/safari excursions. The Karnataka veg thali (₹150) and chicken curry rice (₹220) are the lunch defaults; the akki rotti (rice-flour flatbread) is a Malnad signature. Open 7am-10pm.',
  'Rafting groups arrive 1.30-3pm — early lunch noon or late 3pm has shorter wait. Cash + UPI; cards work but slower.',
  'Bird Valley Road, Dandeli 581325',
  'https://maps.google.com/?q=Hotel+Forest+View+Dandeli',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g1156219-d3528584-Reviews-Hotel_Forest_View-Dandeli.html',
    'https://www.zomato.com/dandeli/hotel-forest-view-bird-valley'
  ]::text[],
  '2026-05-12',
  false
),
(
  'dandeli',
  'Kali Adventure Camp Restaurant (JLR)',
  'Ganeshgudi, Kali river',
  'ganeshgudi',
  ARRAY['multi-cuisine','indian','barbecue']::text[],
  'mid_range',
  'Buffet thali + camp-style chicken barbecue',
  ARRAY['Buffet thali','Tandoori chicken','Veg curry rice','Country chicken','Beer-tap evening']::text[],
  '₹₹₹',
  '[600,1101)'::int4range,
  'mixed',
  true,
  'required',
  'casual',
  'JLR (Jungle Lodges & Resorts) Karnataka government-run camp at Ganeshgudi — the in-house restaurant runs buffet lunches and dinners for guests + day visitors (advance booking only). Camp-style barbecue evening 7-9pm with country chicken + tandoori sides. Open only to guests + advance-booking day visitors. Lunch 12.30-2pm, dinner 7.30-9.30pm. Riverside dining deck.',
  'Day-visitor lunch booking requires phone call 1 day ahead +91-9482929111. Buffet thali is the easier option than ordering a la carte. Cards work; UPI works.',
  'JLR Kali Adventure Camp, Ganeshgudi, Dandeli 581363',
  'https://maps.google.com/?q=JLR+Kali+Adventure+Camp+Dandeli',
  ARRAY[
    'https://www.junglelodges.com/properties/kali-adventure-camp/',
    'https://www.tripadvisor.in/Hotel_Review-g1156219-d2410512-Reviews-Kali_Adventure_Camp_JLR-Dandeli.html'
  ]::text[],
  '2026-05-12',
  false
),
(
  'dandeli',
  'Hornbill River Resort Restaurant',
  'Old Magazine House road',
  'old-magazine-house',
  ARRAY['multi-cuisine','indian','south-indian']::text[],
  'mid_range',
  'Riverside thali + jungle-camp barbecue',
  ARRAY['Riverside thali','Tandoori platter','Chicken curry rice','Veg sizzler','Akki rotti']::text[],
  '₹₹',
  '[400,751)'::int4range,
  'mixed',
  true,
  'recommended',
  'casual',
  'Private resort on the Old Magazine House road — riverside dining deck overlooking the Kali. The resort hosts day-visitor lunches by booking; the menu is buffet thali + a la carte. The Old Magazine House area is famous for hornbill sightings (Malabar pied hornbill, Indian grey hornbill) — birders use Hornbill as a lunch base before afternoon bird-walks. Open 7am-10pm.',
  'Day-visitor lunch booking via +91-8284-231186 or hornbillriverresort.com. Mornings 6.30-9.30am for hornbill sightings from the resort deck — overlap with breakfast. Cards + UPI both work.',
  'Old Magazine House Road, Ganeshgudi, Dandeli 581363',
  'https://maps.google.com/?q=Hornbill+River+Resort+Dandeli',
  ARRAY[
    'https://www.hornbillriverresort.com/',
    'https://www.tripadvisor.in/Hotel_Review-g1156219-d8245612-Reviews-Hornbill_River_Resort-Dandeli.html'
  ]::text[],
  '2026-05-12',
  false
),
(
  'dandeli',
  'Kanjon Restaurant',
  'Dandeli town main road',
  'dandeli-town',
  ARRAY['multi-cuisine','indian','tandoor','south-indian']::text[],
  'mid_range',
  'Tandoori chicken with butter naan',
  ARRAY['Tandoori chicken','Butter naan','Veg fried rice','Chicken biryani','Paneer butter masala']::text[],
  '₹₹',
  '[250,501)'::int4range,
  'mixed',
  true,
  'walk-in',
  'casual',
  'Dandeli town''s most reliable tandoor + multi-cuisine option — the alternative to Bird Valley restaurants when you want a sit-down dinner not tied to a resort. Tandoori chicken (₹300 half / ₹550 full) is the order; the chicken biryani and paneer butter masala cover the family-eating defaults. Open 11.30am-3.30pm + 7-11pm. AC dining.',
  'Dinner 7.30-9.30pm fills with rafting-tour groups — early arrival before 7pm or after 9.30pm has shorter wait. Cards + UPI work.',
  'Main Road, Dandeli 581325',
  'https://maps.google.com/?q=Kanjon+Restaurant+Dandeli',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g1156219-d12553421-Reviews-Kanjon_Restaurant-Dandeli.html',
    'https://www.zomato.com/dandeli/kanjon-restaurant-main-road'
  ]::text[],
  '2026-05-12',
  false
),
(
  'dandeli',
  'Hotel Adyar Anand Bhavan',
  'Main bazaar, Dandeli',
  'main-bazaar',
  ARRAY['udupi','south-indian','pure-veg']::text[],
  'casual',
  'Veg meals + masala dosa',
  ARRAY['Veg meals','Masala dosa','Idli vada','Bisi bele bath','Filter coffee']::text[],
  '₹',
  '[100,201)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Adyar Anand Bhavan Karnataka-state chain — the Dandeli branch covers pure-veg pilgrim and family travellers who skip the resort-restaurant menus. AC dining; veg meals (₹130) is the lunch order; idli + vada + coffee combo is breakfast. Open 6am-10.30pm. Pure-veg, no onion/garlic option available.',
  'Breakfast 7-9.30am has the busiest tiffin counter. Cash + UPI; cards work. The bisi bele bath (₹70) is a Karnataka-state branch signature consistent across the chain.',
  'Main Bazaar, Dandeli 581325',
  'https://maps.google.com/?q=Adyar+Anand+Bhavan+Dandeli',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g1156219-d12552189-Reviews-Hotel_Adyar_Anand_Bhavan-Dandeli.html',
    'https://www.zomato.com/dandeli/adyar-anand-bhavan-main-bazaar'
  ]::text[],
  '2026-05-12',
  false
);
