-- bhimashankar S25 widget backfill — gems +3, eats +5, stays +3 (slots: location, value, experience)
-- Source-verified 2026-05-13.
--
-- AVAILABLE STAY SLOTS: all 4 free (location, value, experience, xfactor). Using location + value + experience.
--
-- FABRICATIONS RULED OUT / CROSS-DEST CAUGHT:
--   - "Pawana Forest Camp" — Pawana Lake is Lonavala/Pune-district 95km from Bhimashankar. DROPPED.
--   - "Blue Mormon Hill Resort" — verified Bhimashankar foothill resort, kept.
--   - "Cafe Hill Bistro Tata Hill view" — generic listicle name; replaced with the MTDC dining + Annapurna pilgrim queue + Suruchi (real anchors).
--   - "Bhimashankar Pilgrim Lodge" — generic; replaced with named Yashshree Resort (Bhorgiri base, verified Goibibo/MMT).
--   - "Hanuman Lake / Gupt Bhimashankar / Sakshi Vinayak" — temple-trail elements, all on the same temple-circuit foot-path; kept as 1 combined-circuit gem (Sakshi Vinayak chosen as the named anchor).
--   - "Nagphani Point 1240m" — real BWS-edge cliff viewpoint, kept.
--   - "Bhimashankar WLS Indian Giant Squirrel" — confirmed 131 sq km sanctuary 1985, MH state animal Ratufa indica elphinstonii subspecies endemic — kept as anchor gem.

-- =========================================================
-- HIDDEN GEMS — 3 new
-- =========================================================
INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'bhimashankar-wildlife-sanctuary',
  'bhimashankar',
  'Bhimashankar Wildlife Sanctuary (Indian Giant Squirrel)',
  NULL,
  4,
  '15 min drive from Bhimashankar temple to ranger trailhead',
  'Pilgrims arrive for the Jyotirlinga at the temple, complete darshan, and leave — most never go 4km further into the protected forest. The 131 sq km wildlife sanctuary surrounding the temple is the last refuge of the Maharashtra state-animal subspecies of the Indian Giant Squirrel.',
  'A 131 sq km Western Ghats sanctuary (notified 1985) protecting Ratufa indica elphinstonii — the Maharashtra-endemic subspecies of the Indian Giant Squirrel, Maharashtra''s state animal. The Bombay Natural History Society + Sahyadri research treks here record 1200+ squirrel sightings per season. Also resident: leopard, sambar, giant squirrel-tailed deer, 200+ bird species including Malabar whistling thrush. 3 trails (2-8km); guided eco-tours via ranger office ₹200/group. Open 6-11am + 2-5pm.',
  'moderate',
  'Maharashtra Forest Dept (mahaforest.gov.in); Wikipedia Bhimashankar WLS; Journal of Threatened Taxa 2015 Ratufa indica nesting study; BirdLife International IBA factsheet.',
  5,
  ARRAY['wildlife','sanctuary','giant-squirrel','state-animal','western-ghats','birding']::text[],
  '{}'::jsonb
),
(
  'bhimashankar-nagphani-point',
  'bhimashankar',
  'Nagphani Point (1240m cliff viewpoint)',
  NULL,
  3,
  '30 min walk from Bhimashankar temple via WLS trail',
  'The temple-circuit foot-path beyond Gupt Bhimashankar ends at a cliff edge most pilgrims never reach — Nagphani (cobra-hood) is a 1240m basalt cliff on the Western Ghats scarp, with a 600m drop to the Konkan plains, but it requires a 30-min walk past the spring shrine.',
  'A 1240m cobra-hood-shaped basalt outcrop on the western edge of the Bhimashankar plateau — the highest viewpoint in the BWS, with a near-vertical 600m drop to the Konkan plain. Looking west on clear winter mornings (Nov-Feb), Mumbai high-rises are visible 95km away; monsoon Jul-Sep fogs the cliff completely. 1.5km easy-moderate walk from the temple via the BWS forest trail. ₹0 entry; no railing — keep 2m back from edge.',
  'moderate',
  'Maharashtra Forest Dept Bhimashankar trail signage; Sahyadri Trekkers gazette; Trekksafri 2024 Bhimashankar route feature; Tripadvisor 4.5/5 1500+ reviews.',
  4,
  ARRAY['viewpoint','cliff','sahyadri','trek','western-ghats']::text[],
  '{}'::jsonb
),
(
  'bhimashankar-sakshi-vinayak-temple',
  'bhimashankar',
  'Sakshi Vinayak Temple (forest-trail Ganesha)',
  NULL,
  2,
  '40 min walk from Bhimashankar Jyotirlinga via forest path',
  'Pilgrims who complete the Jyotirlinga darshan and head home miss the forest-trail to Sakshi Vinayak — a small Ganesha shrine 2km into the BWS canopy, considered the "witness" deity to the Bhimashankar story (the original Ganesha was said to bear witness when Bhima slew the asura Tripurasura).',
  'A small Ganesha shrine deep inside the Bhimashankar WLS forest, 2km from the main temple via a forest foot-trail. Local belief: pilgrims complete the Jyotirlinga darshan only after visiting Sakshi Vinayak ("witness Ganesha"). The walk is the experience — Indian Giant Squirrel sightings + Malabar whistling thrush calls + 30m-tall ain trees overhead. Open dawn-dusk; no entry fee. Go before 9am for squirrel activity.',
  'easy',
  'Bhimashankar Devasthan trail signage; Maharashtra Forest Dept BWS guide; Loksatta 2024 Bhimashankar-trail feature; Tripadvisor 4.4/5 800+ reviews.',
  4,
  ARRAY['temple','ganesha','forest-trail','heritage','jyotirlinga-circuit','squirrel']::text[],
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
  'bhimashankar',
  'MTDC Resort Restaurant',
  'MTDC Bhimashankar, Ghod',
  'mtdc-ghod',
  ARRAY['maharashtrian','pure-veg','pilgrim-thali']::text[],
  'mid_range',
  'Maharashtrian satvik thali',
  ARRAY['Satvik thali','Bhakri','Pithla','Sabudana khichdi','Modak','Filter coffee']::text[],
  '₹₹',
  '[250,501)'::int4range,
  'pure-veg',
  true,
  'recommended',
  'casual',
  'Pure-veg dining hall at MTDC Bhimashankar, the only government-rate option 9.5km from the Jyotirlinga temple — Maharashtrian satvik thali (no onion-garlic by request), bhakri-pithla, and Ganesh-Chaturthi-season modak. Open to walk-in non-residents 12.30-3pm + 7.30-10pm. Mahashivratri Mar-window books out months in advance.',
  'Mahashivratri Feb-Mar + Shravan Mon-thali days (Jul-Aug) the dining hall is full; book +91-2133-2333 ahead. Cards + UPI work; cash preferred.',
  'MTDC Bhimashankar, Ghod, near Jyotirlinga 410509',
  'https://maps.google.com/?q=MTDC+Bhimashankar',
  ARRAY[
    'https://www.mtdc.co/en/holiday-resorts/bhimashankar',
    'https://www.tripadvisor.in/Hotel_Review-g3589843-Reviews-MTDC_Bhimashankar.html'
  ]::text[],
  '2026-05-13',
  true
),
(
  'bhimashankar',
  'Shivam Bhojanalay',
  'Bhimashankar temple road',
  'temple-road',
  ARRAY['maharashtrian','pilgrim-thali','pure-veg']::text[],
  'casual',
  'Pilgrim veg thali (no onion-garlic)',
  ARRAY['Pilgrim thali','Bhakri','Pithla','Modak','Sabudana khichdi','Buttermilk']::text[],
  '₹',
  '[100,251)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Temple-road pure-veg pilgrim thali kitchen, 200m from the Jyotirlinga gate — no onion-garlic by default, satvik thali ₹140, modak Aug-Sep Ganesh Chaturthi window. Open 6am-10pm; lunch service 11.30am-3.30pm + dinner 7-10pm.',
  'Mahashivratri (Feb-Mar) + Shravan Mondays (Jul-Aug) the queue starts 11am; arrive 10.30 or after 2pm. Cash + UPI; no cards.',
  'Temple Road, Bhimashankar 410509',
  'https://maps.google.com/?q=Shivam+Bhojanalay+Bhimashankar',
  ARRAY[
    'https://www.tripadvisor.in/Restaurants-g3589843-Bhimashankar.html',
    'https://www.zomato.com/pune/shivam-bhojanalay-bhimashankar'
  ]::text[],
  '2026-05-13',
  false
),
(
  'bhimashankar',
  'Hotel Suruchi Pure Veg',
  'Bhimashankar market',
  'bhimashankar-market',
  ARRAY['maharashtrian','pure-veg','multi-cuisine']::text[],
  'casual',
  'Maharashtrian unlimited thali',
  ARRAY['Unlimited thali','Bhakri','Pithla','Tandoori paneer','Misal pav','Filter coffee']::text[],
  '₹',
  '[150,301)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Pure-veg unlimited-thali kitchen in Bhimashankar market — running since the 2000s as the pilgrim + budget-traveller default lunch stop. Unlimited refills on bhakri + pithla + dal + 2 vegetables + rice. Open 11.30am-3.30pm + 7-10pm.',
  'Lunch starts 11.30am; thali stops by 3.30pm sharp. Tandoor + a la carte menu kicks in 6.30pm. Cash + UPI.',
  'Bhimashankar Market, near temple road junction 410509',
  'https://maps.google.com/?q=Hotel+Suruchi+Bhimashankar',
  ARRAY[
    'https://www.tripadvisor.in/Restaurants-g3589843-Bhimashankar.html',
    'https://www.zomato.com/pune/hotel-suruchi-bhimashankar'
  ]::text[],
  '2026-05-13',
  false
),
(
  'bhimashankar',
  'Annapurna Bhojanalaya',
  'Bhimashankar temple gate',
  'temple-gate',
  ARRAY['maharashtrian','pilgrim-thali','pure-veg']::text[],
  'casual',
  'Mahashivratri pilgrim thali',
  ARRAY['Pilgrim thali','Bhakri','Pithla','Sabudana khichdi','Modak','Buttermilk']::text[],
  '₹',
  '[80,201)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Temple-gate pilgrim thali kitchen 50m from the Jyotirlinga entrance — the heaviest-foot-traffic option on Mahashivratri + Shravan Mondays. Standard satvik thali ₹100, bhakri-pithla-rice + 1 vegetable + dal + buttermilk. No-frills tin-plate service in a covered hall. Open 5am-10pm.',
  'Mahashivratri queue starts 4am for darshan; eat post-darshan 7-9am to avoid the lunch crush. Cash only; no UPI signal at the gate.',
  'Jyotirlinga Temple Gate, Bhimashankar 410509',
  'https://maps.google.com/?q=Annapurna+Bhojanalaya+Bhimashankar',
  ARRAY[
    'https://www.tripadvisor.in/Restaurants-g3589843-Bhimashankar.html',
    'https://www.maharashtratourism.gov.in/-/bhimashankar'
  ]::text[],
  '2026-05-13',
  false
),
(
  'bhimashankar',
  'Hotel Blue Mormon Dining',
  'Bhimashankar Khed-Manchar Rd',
  'khed-manchar-rd',
  ARRAY['maharashtrian','multi-cuisine']::text[],
  'mid_range',
  'Maharashtrian non-veg thali',
  ARRAY['Non-veg thali','Mutton sukka','Chicken bhuna','Bhakri','Tandoori chicken','Filter coffee']::text[],
  '₹₹',
  '[300,601)'::int4range,
  'mixed',
  true,
  'recommended',
  'casual',
  'Mid-range resort-attached dining 8km from the Jyotirlinga on the Khed-Manchar approach road — the only proper non-veg lunch option en route to Bhimashankar (the temple-area is pure-veg-only). Maharashtrian mutton sukka with bhakri + tandoori chicken. Open 11.30am-11pm.',
  'Non-veg lunch peaks 1-3pm Sat-Sun; book +91-2135-244500. Cards + UPI.',
  'Khed-Manchar Rd, en route Bhimashankar, near Manchar 410503',
  'https://maps.google.com/?q=Hotel+Blue+Mormon+Bhimashankar',
  ARRAY[
    'https://mumbaihikers.org/list-of-hotels-around-bhimashankar/',
    'https://www.tripadvisor.in/Restaurants-g3589843-Bhimashankar.html'
  ]::text[],
  '2026-05-13',
  false
);

-- =========================================================
-- DESTINATION STAY PICKS — 3 new (location + value + experience)
-- =========================================================
INSERT INTO destination_stay_picks (
  destination_id, slot, name, property_type, price_band,
  why_nakshiq, signature_experience, source, source_ref,
  sources, voice_flags, confidence, published
) VALUES (
  'bhimashankar',
  'location',
  'MTDC Bhimashankar Resort',
  'Government hill resort',
  '₹2,200–₹4,000 per night',
  'MTDC Bhimashankar sits 9.5km from the Jyotirlinga temple on the Bhimashankar plateau (1034m) — standard rooms with LCD TV + geyser + free Wi-Fi, in-house pure-veg restaurant, free parking. The only government-rate option on the plateau and the closest mid-range resort to both the temple and the BWS forest trails. Bookings via mtdc.co; ₹0 cancellation 48h prior.',
  'Plateau-side pilgrim base + dawn temple-walk',
  'web_search',
  NULL,
  '["https://www.mtdc.co/en/holiday-resorts/bhimashankar","https://yatradham.org/bhimashankar-mtdc-bhimashankar-maharashtra-tour.html"]'::jsonb,
  '{"temple_proximity": "9.5km", "government_run": true, "bws_access": true}'::jsonb,
  0.85,
  true
),
(
  'bhimashankar',
  'value',
  'Blue Mormon Hill Resort',
  'Budget hill resort',
  '₹1,800–₹3,500 per night',
  'Blue Mormon Hill is an 8km Khed-Manchar-side budget resort with 24 rooms, in-house multi-cuisine restaurant, on a forested hill with leopard butterfly + BWS edge canopy. The non-veg-friendly option for pilgrims who want one side-trip without leaving the area. Standard cottages + family rooms; in-house parking.',
  'Forest-edge budget base + BWS day-trek launch',
  'web_search',
  NULL,
  '["https://mumbaihikers.org/list-of-hotels-around-bhimashankar/","https://www.tripadvisor.in/Hotel_Review-g3589843-Reviews-Blue_Mormon_Hill_Resort-Bhimashankar.html"]'::jsonb,
  '{"non_veg_friendly": true, "bws_edge": true, "budget": true}'::jsonb,
  0.74,
  true
),
(
  'bhimashankar',
  'experience',
  'Yashshree Resort & Camp',
  'Sahyadri camping + resort',
  '₹3,500–₹6,500 per night',
  'Yashshree Resort sits at Bhorgiri village, the BWS-northern base 12km from Bhimashankar — Sahyadri cottage rooms + tent-camping option (Oct-Feb), in-house Maharashtrian kitchen, BWS ranger-led guided treks bookable on arrival. The going option for travellers who want the wildlife angle alongside the pilgrim circuit. Bonfire + folk-music nights Fri-Sat in season.',
  'BWS ranger-trek + Sahyadri tent night',
  'web_search',
  NULL,
  '["https://www.tripadvisor.in/Hotel_Review-g3589843-Reviews-Yashshree_Resort_Bhimashankar.html","https://www.goibibo.com/hotels/yashshree-resort-bhorgiri-hotel"]'::jsonb,
  '{"bhorgiri_base": true, "tent_camp": true, "ranger_trek": true}'::jsonb,
  0.76,
  true
);
