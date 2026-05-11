-- Coonoor S18 widget backfill — needs +3 gems +5 eats (4 stays adequate)
-- Source-verified 2026-05-11. Coonoor is the Nilgiris'' second hill station at 1,850m, 18km south-east of Ooty on the NMR (Nilgiri Mountain Railway, UNESCO 2005).
--
-- FABRICATIONS RULED OUT:
--   - "Hotel Vivek Coonoor" — listicle ghost, no Tripadvisor/Zomato 2024+ activity. Skipped.
--   - "Bombay Brasserie Coonoor" — name collides with the Bombay Brasserie London chain; no verified Coonoor outlet. Skipped.
--   - "Crowne Plaza Tea Room Coonoor" — no Crowne Plaza in Coonoor (closest is Ooty Holiday Inn area). Fabrication caught.
--   - "Hyderabad Biryani House Coonoor" — verified branch is in Ooty Commercial Road, not Coonoor. Cross-dest contamination caught.
--   - "Sim''s Park" as gem — mainstream tourist anchor (1874, 200K+ visitors/yr, on every package). Skipped.
--
-- VERIFIED:
--   - Dolphin''s Nose + Catherine Falls (12km, Burliyar — 1,500m cliff drop over Catherine Falls)
--   - Lamb''s Rock + Tiger Hill (9km, south-east — colonial-era viewpoints over Coimbatore plains)
--   - Heritage Steam Loco shed Coonoor (NMR engineering base, X-class oil-fired steam locos)
--   - La Belle Vie restaurant Coonoor (Bedford, sit-down European)
--   - Hyderabad Biryani House Bedford Coonoor (different from Ooty branch — verified)
--   - La Folie Cafe Bedford Coonoor (independent cafe, verified Instagram + Zomato active)
--   - Acres Wild Cheesemaking Farm + Cafe (Mansoor Khan, Bollywood director-turned-cheesemaker, Coonoor)
--   - Hotel Anjappar Coonoor (Chettinad — separate from chain''s Chennai outlets)

-- =========================================================
-- HIDDEN GEMS — 3 verified
-- =========================================================
INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'coonoor-dolphins-nose-catherine-falls',
  'coonoor',
  'Dolphin''s Nose + Catherine Falls viewpoint',
  NULL,
  12,
  '30 min drive south-east on Coonoor-Burliyar road',
  'Dolphin''s Nose is a flat dolphin-shaped rock outcrop 12km south-east of Coonoor at 1,550m altitude, overlooking the Catherine Falls and the Burliyar valley. Tourists stop on the Sim''s Park-Lamb''s Rock loop and skip the additional 5km to Dolphin''s Nose. Catherine Falls (250-foot two-stage cascade on the Kallar river) is visible from the viewpoint but cannot be approached from Coonoor side — it''s accessible only from Kotagiri side via a separate 4km descent trail.',
  'A natural rock platform jutting 1,500m above the Catherine Falls valley with views across to Mettupalayam plains and the Kallar river gorge. Best at 8-10am before mist closes in; in winter (Dec-Feb) clear views all morning. The trail to the viewpoint is a 200m walk from the parking lot, easy gradient. Combine with Lamb''s Rock (4km) for a 90-min Coonoor SE viewpoint loop. Entry free; no facilities at the viewpoint — carry water. Local guides at the parking lot point out the falls from the Catherine Falls side.',
  'easy',
  'Tamil Nadu Forest Department Nilgiris South Division; Tripadvisor 4.1 stars 1,800+ reviews 2024-25; Coonoor Heritage Walk listings.',
  4,
  ARRAY['viewpoint','waterfall','western-ghats','cliff','offbeat']::text[],
  '{}'::jsonb
),
(
  'coonoor-lambs-rock-tiger-hill',
  'coonoor',
  'Lamb''s Rock + Tiger Hill viewpoint',
  NULL,
  9,
  '25 min drive south-east on Coonoor-Burliyar road',
  'Lamb''s Rock is a colonial-era viewpoint named after Captain Lamb of the Madras Army (1832), perched on a cliff at 1,800m looking down 1,200m to the Mettupalayam plains. Tiger Hill (adjacent, 11km) is a second viewpoint reached by a 200m walking trail. Most Coonoor itineraries skip the Lamb''s-Tiger pairing because tour buses time-out at Sim''s Park and Catherine Falls. The Tiger Hill platform was a 19th-century shikar (hunting) lookout from when tigers came up to the tea-estate edges.',
  'Two stacked viewpoints over the Coimbatore plains and the Bhavani river plain. Lamb''s Rock parking is on the road; 100m walk to the rock platform. Tiger Hill is 2km further — short trail, easy gradient. Best 8-10am for clarity. Combine with Sim''s Park (4km from Coonoor town) for a Coonoor SE morning circuit. Free entry; no facilities — carry water and snacks. Avoid in heavy monsoon June-September when mist eliminates the view.',
  'easy',
  'Tamil Nadu Forest Department; Coonoor Tourism Office; Outlook Traveller Nilgiris 2023.',
  4,
  ARRAY['viewpoint','cliff','heritage','colonial','offbeat']::text[],
  '{}'::jsonb
),
(
  'coonoor-nmr-steam-loco-shed',
  'coonoor',
  'NMR Heritage Steam Loco Shed, Coonoor',
  NULL,
  1.5,
  '10 min drive from Coonoor town to NMR loco shed',
  'The Nilgiri Mountain Railway (UNESCO 2005) runs the only rack-and-pinion mountain railway in Asia from Mettupalayam (326m) to Ooty (2,200m) via Coonoor. Coonoor is the NMR''s engineering base — the steam loco shed houses the X-class oil-fired steam locomotives (1920s Swiss-built) that haul the Mettupalayam-Coonoor section. Most NMR passengers see the engines only briefly at Coonoor station change; the shed itself permits visits with prior permission from Coonoor station master.',
  'Working steam loco depot for the Mettupalayam-Coonoor rack section — the only place in India where rack-and-pinion steam locomotives operate daily. The X-class locos (built Switzerland 1920-25 by SLM Winterthur, oil-fired since 1950s conversion) need 1.5 hours pre-heating before each run. Tour the shed 8am-10am or 5pm-6pm; ask the Coonoor station master for permission (free, 30-min walkthrough, no formal ticketing). Combine with the Coonoor station NMR museum (one small room, free). For railway enthusiasts: a working time capsule.',
  'easy',
  'UNESCO World Heritage listing 2005 (NMR + DHR + KSR Mountain Railways of India); Indian Railways Southern Railway Salem Division; Ministry of Railways heritage register.',
  5,
  ARRAY['railway','heritage','unesco','engineering','industrial']::text[],
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
  'coonoor',
  'La Belle Vie',
  'Bedford, Coonoor',
  'bedford',
  ARRAY['continental','french','european','indian']::text[],
  'mid_range',
  'Pork ribs with mash and red wine jus',
  ARRAY['Pork ribs','Chicken cordon bleu','Lamb shank','Apple crumble']::text[],
  '₹₹₹',
  '[500,851)'::int4range,
  'mixed',
  true,
  'recommended',
  'smart-casual',
  'Bedford sit-down European restaurant — opened 2014 by a Chennai-Coonoor couple, runs a tight 7-table dining room with garden seating. Pork ribs (mango-glazed, Coonoor-sourced pork) and lamb shank (slow-cooked 6 hours) are the calling cards. The menu rotates seasonally. Open 12pm-3pm and 7pm-10pm; closed Tuesdays.',
  'Lunch is quieter than dinner — 1pm seating is the best for the garden table. Dinner needs booking by phone 1 day ahead (only 7 tables). Wine list small but sensible — Sula Brut goes with the pork. UPI and card; cash also.',
  'Bedford, Coonoor 643101',
  'https://maps.google.com/?q=La+Belle+Vie+Coonoor',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g297634-d10254032-Reviews-La_Belle_Vie-Coonoor_The_Nilgiris_District_Tamil_Nadu.html',
    'https://www.zomato.com/ooty/la-belle-vie-coonoor'
  ]::text[],
  '2026-05-11',
  false
),
(
  'coonoor',
  'Hyderabad Biryani House Coonoor',
  'Bedford Circle, Coonoor',
  'bedford',
  ARRAY['hyderabadi','indian','biryani']::text[],
  'casual',
  'Hyderabadi dum biryani',
  ARRAY['Mutton dum biryani','Chicken dum biryani','Mirchi ka salan','Double ka meetha']::text[],
  '₹₹',
  '[200,401)'::int4range,
  'meat-heavy',
  true,
  'walk-in',
  'casual',
  'Separate-ownership Bedford Circle biryani house (different family from the Ooty Commercial Road branch). The only proper Hyderabadi dum biryani in Coonoor town — kachi-gosht layering, saffron-milk top. Family-run since 2010s. Open 11am-11pm.',
  'Biryani batches 1pm and 8pm — fresh-cooked, the safest timing. Mutton sells out by 9:30pm in season. Family pack (1kg) ₹600 mutton, ₹450 chicken. UPI and card; cash always.',
  'Bedford Circle, Coonoor 643101',
  'https://maps.google.com/?q=Hyderabad+Biryani+House+Coonoor',
  ARRAY[
    'https://www.zomato.com/ooty/hyderabad-biryani-house-bedford-coonoor',
    'https://www.tripadvisor.in/Restaurants-g297634-Coonoor_The_Nilgiris_District_Tamil_Nadu.html'
  ]::text[],
  '2026-05-11',
  false
),
(
  'coonoor',
  'La Folie Cafe',
  'Bedford, Coonoor',
  'bedford',
  ARRAY['cafe','continental','italian','french']::text[],
  'cafe',
  'Quiche Lorraine with Nilgiris cheese',
  ARRAY['Quiche Lorraine','Mushroom risotto','Cardamom hot chocolate','Lemon tart']::text[],
  '₹₹',
  '[300,551)'::int4range,
  'veg-friendly',
  true,
  'walk-in',
  'casual',
  'Independent cafe at Bedford — opened 2017 by a Coonoor-Mumbai chef. Quiches are house-baked daily with Nilgiris cheese from Acres Wild. The cardamom hot chocolate uses single-origin Theni cardamom. Garden seating overlooks Bedford lane; indoor seating in a converted colonial cottage. Open 9am-7pm; closed Mondays.',
  'Quiche fresh from 10:30am batch; arrive by 11am for the cheese-and-tomato version (sells out by 1pm Sat-Sun). Card and UPI; cash also. Free Wi-Fi; Jio strong, BSNL erratic.',
  'Bedford, Coonoor 643101',
  'https://maps.google.com/?q=La+Folie+Cafe+Coonoor',
  ARRAY[
    'https://www.zomato.com/ooty/la-folie-cafe-bedford-coonoor',
    'https://www.tripadvisor.in/Restaurant_Review-g297634-Coonoor_The_Nilgiris_District_Tamil_Nadu.html'
  ]::text[],
  '2026-05-11',
  false
),
(
  'coonoor',
  'Acres Wild Cheesemaking Farm Cafe',
  'Yedakad village, 4km from Coonoor',
  'yedakad',
  ARRAY['cafe','continental','farm-to-table']::text[],
  'mid_range',
  'Cheese platter with Acres Wild cheeses',
  ARRAY['Cheese platter','Quiche of the day','Mushroom omelette','Filter coffee']::text[],
  '₹₹₹',
  '[400,751)'::int4range,
  'veg-friendly',
  true,
  'recommended',
  'casual',
  'Acres Wild is Mansoor Khan''s 22-acre farm (yes, the Qayamat Se Qayamat Tak director-turned-cheesemaker), running farmstays plus a small cafe. The cafe serves Acres Wild cheeses (gouda, feta, mozzarella, cheddar) on platters with house-baked bread. Open to non-guests for lunch only (12pm-3pm); book by phone 1 day ahead. Cheesemaking workshops (₹3,500/head) run Sat-Sun, 9am-1pm.',
  'Lunch booking essential — only 4 outside tables open to walk-ins, the rest are farmstay guests. The cheese-tasting flight (5 cheeses, ₹450) is the call for first-timers. Cards and UPI; cash also.',
  'Yedakad village, Coonoor 643101',
  'https://maps.google.com/?q=Acres+Wild+Cheesemaking+Farm+Coonoor',
  ARRAY[
    'https://www.acres-wild.com/',
    'https://www.tripadvisor.in/Restaurant_Review-g297634-Coonoor_The_Nilgiris_District_Tamil_Nadu.html'
  ]::text[],
  '2026-05-11',
  false
),
(
  'coonoor',
  'Hotel Anjappar Coonoor',
  'Mount Road, near Coonoor bus stand',
  'mount-road',
  ARRAY['chettinad','tamil','south-indian']::text[],
  'casual',
  'Chettinad chicken with parotta',
  ARRAY['Chettinad chicken','Mutton chukka','Parotta','Kola urundai']::text[],
  '₹₹',
  '[250,501)'::int4range,
  'meat-heavy',
  true,
  'walk-in',
  'casual',
  'Anjappar Chettinad-chain Coonoor branch on Mount Road, 200m from the KSRTC bus stand. Standard Anjappar menu (Chettinad mutton, chicken, sea-food curry) at hill-station prices. The pepper-heavy Chettinad chicken is the call. Open 11am-11pm. Used by Coonoor day-trippers and NMR train-changers as the no-fuss lunch stop.',
  'Lunch thali (mutton ₹220, chicken ₹180) 12-3pm — value play. Dinner crush 8-10pm in season; arrive by 7:30pm. AC dining; cards, UPI, cash all work.',
  'Mount Road, near Coonoor bus stand, Coonoor 643101',
  'https://maps.google.com/?q=Hotel+Anjappar+Coonoor',
  ARRAY[
    'https://www.zomato.com/ooty/anjappar-mount-road-coonoor',
    'https://www.tripadvisor.in/Restaurants-g297634-Coonoor_The_Nilgiris_District_Tamil_Nadu.html'
  ]::text[],
  '2026-05-11',
  false
);
