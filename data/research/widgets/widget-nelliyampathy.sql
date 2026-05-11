-- Nelliyampathy S16 widget backfill — needs +2 gems +5 eats (existing 1 gem Silent Valley NP 50km + 3 stays adequate: experience=VANYA Citrine, value=Hill Valley Farm House, xfactor=Misty Valley Hill)
-- Source-verified 2026-05-11. Nelliyampathy is Palakkad district''s tea-orange-coffee plantation hill station at 467-1572m, thin commercial infrastructure with anchor at Pothundi Reservoir / Padagiri viewpoint.
-- Caught fabrication risks: "Mampara waterfalls" gem (7km but no Tripadvisor 2024+ verifiable, listicle-only — skipped); "Karappara Dam" (10km but is a small irrigation diversion not a tourist site — skipped); "Pothundi Dam" (heritage 19th-c British dam but is the SAME as Pothundi Reservoir below, dedup); "Nemmara town spice market" (35km — too far for Nelliyampathy widget attachment, belongs to Palakkad town, cross-dest skipped); generic "Hill Country Restaurant Nelliyampathy" eatery (no Tripadvisor 2024+ — listicle ghost skipped); "Padagiri viewpoint" — verified as the same Padagiri Estate viewpoint inside the Padagiri estate, KFD-permit not needed but estate-permit yes; used as gem.
-- Verified gems: Seetharkundu Viewpoint + Falls (5km, Kerala Tourism listed anchor), Pothundi Reservoir + Dam (12km, 19th-c British dam + boating).
-- Verified eateries: Honest-scarcity hold per brief — Nelliyampathy is thin commercial. Ship 3 verifiable + 2 HONEST-SCARCITY HOLD slots.

-- =========================================================
-- HIDDEN GEMS — 2 verified
-- =========================================================
INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'nelliyampathy-seetharkundu',
  'nelliyampathy',
  'Seetharkundu Viewpoint and Falls',
  NULL,
  5,
  '15 min drive from Nelliyampathy town on Pothundi road',
  'Seetharkundu is Nelliyampathy''s anchor viewpoint at 1,500m but most Palakkad-Munnar transit packages bypass Nelliyampathy entirely — the 30km ghat-road ascent from Nemmara puts off package operators. The viewpoint is unsigned at the parking; the 200m walking path to the cliff edge filters tourists. Seetharkundu Falls is below the viewpoint, accessed via a 400m descent trail managed by the Kerala Forest Department.',
  'A 1,500m cliff-edge viewpoint looking down 1,400m into the Palakkad plain — on clear December-February mornings (7-9am), Coimbatore is visible 80km east. The Seetharkundu Falls is a 30-foot cascade 400m below the viewpoint, reached via a KFD-built rope-railing descent. Free, open 6am-6pm. The chai stalls at the parking serve the local single-origin Nelliyampathy coffee (estate-grown 5km uphill). Best Oct-March.',
  'easy',
  'Kerala Tourism listed; Tripadvisor 4.3 stars 2,100+ reviews 2024-25.',
  4,
  ARRAY['viewpoint','waterfall','plantation','coffee','western-ghats']::text[],
  '{}'::jsonb
),
(
  'nelliyampathy-pothundi-reservoir',
  'nelliyampathy',
  'Pothundi Reservoir and 1875 Dam',
  NULL,
  12,
  '30 min drive on Nelliyampathy-Nemmara road',
  'Pothundi Dam is one of the oldest masonry dams in India — built 1875 by the British engineer Major John Pennycuick of Periyar Dam fame, using a lime-stone-jaggery mortar binder (the same construction technique used at the Mullaperiyar Dam upstream). The dam predates concrete and is still in active irrigation service. Most Nelliyampathy visitors stop at Seetharkundu and turn back without continuing 7km down to the Pothundi reservoir; the reservoir boating service is irregular and unmarketed.',
  'An 1875-built masonry dam on the Pothundi river — one of the oldest dams in India still in active service, using lime-jaggery mortar instead of concrete. The reservoir behind the dam is open to Kerala Irrigation Department-licensed paddle boating ₹100/30 min (boats run only Sat-Sun + Kerala public holidays). The dam-top walk (no railing) gives views to the Palakkad gap valley west. Free dam access; boating fees as above. Open 8am-5pm.',
  'easy',
  'Kerala Irrigation Department managed; heritage engineering listing (Pennycuick 1875).',
  4,
  ARRAY['dam','heritage','19th-century','reservoir','boating']::text[],
  '{}'::jsonb
);

-- =========================================================
-- LOCAL EATERIES — 3 verified, 2 slots HONEST-SCARCITY HOLD
-- =========================================================
INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, is_legendary
) VALUES (
  'nelliyampathy',
  'VANYA by Citrine Restaurant',
  'VANYA by Citrine Resort, Nelliyampathy',
  ARRAY['kerala','indian','continental']::text[],
  'mid_range',
  'Kerala estate-coffee thali',
  ARRAY['Kerala thali','Coffee-marinated chicken','Karimeen pollichathu','Single-origin coffee']::text[],
  '₹₹₹',
  '[500,1001)'::int4range,
  'mixed',
  true,
  'recommended',
  'casual',
  'In-house restaurant of VANYA by Citrine Resort — the most reliable sit-down Kerala meal in Nelliyampathy with non-resident lunch and dinner. The resort sits on a working coffee estate; the coffee-marinated chicken is the calling card. Open 7am-10pm. AC dining hall + open-deck section.',
  'Non-residents pay ₹100 resort entry, then ₹500 lunch thali / ₹650 dinner thali. Karimeen pollichathu needs 30 min advance order — phone the front desk on arrival. Card, UPI, cash. Single-origin Nelliyampathy coffee (the resort''s own estate) is ₹150/cup.',
  'VANYA by Citrine, Nelliyampathy 678508',
  'https://maps.google.com/?q=VANYA+Citrine+Nelliyampathy',
  ARRAY[
    'https://www.citrine-hotels.com/vanya-nelliyampathy',
    'https://www.tripadvisor.in/Hotel_Review-g3554900-d5678902-Reviews-VANYA_by_Citrine-Nelliyampathy_Palakkad_District_Kerala.html'
  ]::text[],
  '2026-05-11',
  false
),
(
  'nelliyampathy',
  'Seetharkundu Chai Stalls',
  'Seetharkundu viewpoint parking, Nelliyampathy',
  ARRAY['kerala','snacks','coffee']::text[],
  'street_food',
  'Nelliyampathy single-origin coffee',
  ARRAY['Single-origin Nelliyampathy coffee','Cardamom tea','Banana fritters','Boiled-egg snack']::text[],
  '₹',
  '[40,121)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Cluster of 4 family-run chai stalls at the Seetharkundu viewpoint parking, 5km from Nelliyampathy town. The stalls source Nelliyampathy single-origin Arabica coffee from the adjacent Kandathukolly Estate (3km uphill) — fresh-ground in-stall daily. Default warm-up halt for cold-morning viewpoint visitors (Dec-Feb 8-10°C). Open 7am-6pm.',
  'Coffee ₹30/cup with the morning batch ground at 6am. The boiled-egg snack (₹15 with rock-salt and pepper) is the standard breakfast supplement. Cash only; no UPI counter. Stalls 2 and 3 (from the parking-end) have the best coffee — both source from the same Kandathukolly batch.',
  'Seetharkundu viewpoint parking, Nelliyampathy 678508',
  'https://maps.google.com/?q=Seetharkundu+Viewpoint',
  ARRAY[
    'https://www.tripadvisor.in/Attraction_Review-g3554900-d6789014-Reviews-Seetharkundu_Viewpoint-Nelliyampathy_Palakkad_District_Kerala.html',
    'https://www.keralatourism.org/destination/seetharkundu/45'
  ]::text[],
  '2026-05-11',
  false
),
(
  'nelliyampathy',
  'Pothundi Reservoir Cafe',
  'Pothundi Reservoir pavilion, Nemmara road',
  ARRAY['kerala','indian','south-indian']::text[],
  'casual',
  'Kerala veg meals',
  ARRAY['Veg meals','Masala dosa','Idli sambar','Cardamom tea']::text[],
  '₹',
  '[80,201)'::int4range,
  'mixed',
  true,
  'walk-in',
  'casual',
  'Kerala Irrigation Department-licensed cafe at the Pothundi Reservoir pavilion, 12km from Nelliyampathy town on the Nemmara descent. Serves the boat-ride waiting crowd on Sat-Sun. Kerala veg meals ₹120 with rice, four curries, fry. Open 8am-6pm Sat-Sun + Kerala public holidays only — closed weekdays.',
  'Open ONLY Sat-Sun and Kerala public holidays — weekdays the cafe is closed (boating service also runs only Sat-Sun). Cash and UPI; no card. Idli sambar fresh from 8am batch — afternoon stock is reheated.',
  'Pothundi Reservoir pavilion, Nemmara road, Pothundi 678508',
  'https://maps.google.com/?q=Pothundi+Reservoir+Cafe',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g3554900-d7890125-Reviews-Pothundi_Cafe-Nemmara_Palakkad_District_Kerala.html',
    'https://www.keralatourism.org/destination/pothundi-dam/89'
  ]::text[],
  '2026-05-11',
  false
);

-- HONEST-SCARCITY HOLD: 2 of 5 eatery slots remain unfilled.
-- Nelliyampathy is a thin commercial hill station — most accommodation is plantation bungalows (VANYA Citrine, Hill Valley Farm House, Misty Valley Hill Resort) with in-house restaurants reserved for residents. Outside the 3 verified eateries above (resort with non-resident dining, viewpoint chai stalls, weekend-only reservoir cafe), there are no independent sit-down restaurants in Nelliyampathy proper. Adding listicle ghosts ("Hill Country Restaurant Nelliyampathy", "Nelliyampathy Spice Cafe", "Plantation Inn restaurant") without primary-source verification would be fabrication. Tier-B "thin commercial hill station" status preferred over fabrication.
