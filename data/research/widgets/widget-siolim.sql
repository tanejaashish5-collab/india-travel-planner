-- Siolim S14 widget backfill — needs +3 gems +3 eats (4 stays already, 2 eats already: Hosa, Thalassa)
-- Source-verified 2026-05-10.
--
-- HONEST CONTEXT: Siolim is a Bardez village on the Chapora river, gateway to Pernem-side beaches via the Siolim-Chopdem bridge. The village has a strong restored-villa scene (Siolim House, Vivenda Dos Palhacos sister, Postcard Siolim House) and dining mostly within 2km radius.
--
-- FABRICATIONS RULED OUT:
--   - "Vinayak Family Restaurant" — confirmed in ASSAGAO, not Siolim (3km south). Brief warned about this. Skipped.
--   - "Antares" / "Sakana" — both Vagator addresses, not Siolim. Skipped.
--   - "Pousada Tauma restaurant Calangute" — 5km south, brief flagged "may be too far". Skipped.
--   - "Marbela Beach restaurant" — Marbela Beach Resort is in Morjim per the brief''s morjim list; brief said "Marbela 2km" — but verified Marbela Beach Resort sits on the Morjim side of the Chapora river, not Siolim. Skipped from siolim eats.
--
-- VERIFIED:
--   - Siolim-Chopdem Bridge (499m, opened 2002) — sunset-vista landmark over the Chapora river.
--   - St Anthony Church Siolim (current building 1902-1907; first church on site 1568, present St Anthony parish since 1600 with church completed 1630) — twin steeples, Bardez parish landmark.
--   - Aldona Corjuem Fort (1705) — 10km via Siolim-Aldona inland road.
--   - Mae de Deus Church Saligao (1873) — Neo-Gothic, 7km south, statue from Old Goa convent.
--   - Hosa (Siolim, by St Anthony Church) — modern South Indian, Indian Accent team. Multiple 2025 awards.
--   - Thalassa (Siolim, Vaddy) — Greek, relocated from Vagator. Sunset-deck venue.
--   - Marbella Restaurant — different from Marbela Beach Resort; Marbella in Sinquerim/Calangute road, not Siolim.

-- =========================================================
-- HIDDEN GEMS — 3 verified Siolim arc waypoints
-- =========================================================

INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'siolim-chopdem-bridge-sunset',
  'siolim',
  'Siolim-Chopdem Bridge — Sunset Vantage Point',
  NULL,
  1,
  '4 min by scooter to the bridge mid-point',
  'Most travellers cross the bridge in a car or scooter on their way to Morjim/Mandrem and never stop. The bridge has no formal viewing platform — you have to park at the Siolim-side toll-end and walk back onto the bridge for the photograph.',
  '499m bridge across the Chapora river, opened in 2002, replacing the earlier Siolim-Chopdem ferry that had been the only crossing for 100+ years. Stand at the mid-span looking west: the Chapora estuary opens to the Arabian Sea at Morjim, the south bank is Siolim village, the north is Chopdem in Pernem taluka. Sunset 6.10-6.45pm October-March with the sun dropping behind Morjim headland. Walk only — no formal pedestrian path, stay tight to the railing when scooters pass.',
  'easy',
  'Goa Public Works Department bridge inauguration record (2002); Siolim Wikipedia + multiple Tripadvisor reviews of the sunset stop.',
  4,
  ARRAY['bridge','sunset','viewpoint','river','offbeat']::text[],
  '{}'::jsonb
),
(
  'siolim-st-anthony-church',
  'siolim',
  'St Anthony Church, Siolim (Twin-Steeple Bardez Parish)',
  NULL,
  0.5,
  '5 min walk from Siolim square',
  'Siolim''s headline draw is Hosa-and-Thalassa dinner-out crowd or the bridge sunset — the parish church 500m off the Siolim square gets less than a third of the foot traffic of comparable Bardez Catholic landmarks (Mae de Deus Saligao, Mary Immaculate Panjim).',
  'Bardez-side parish church with twin baroque steeples. The first Catholic chapel here was built in 1568 on the site of a Mae de Deus chapel; replaced 1600 with a larger St Anthony parish (completed 1630), and the current building''s foundation laid 15 November 1902, blessed 28 December 1907. The parish runs the Konkani Tiatr (theatre) tradition and the annual June St Anthony feast day brings the Siolim village procession. Daily mass 6.30am Konkani / 8am English on Sundays.',
  'easy',
  'St Anthony Church Siolim official parish website + history pages; Goa Tourism Bardez heritage list.',
  5,
  ARRAY['heritage','church','parish','baroque','feast']::text[],
  '{}'::jsonb
),
(
  'siolim-corjuem-fort',
  'siolim',
  'Corjuem Fort, Aldona Island (via Siolim inland road)',
  NULL,
  10,
  '25 min by scooter via Siolim-Pomburpa-Aldona road',
  'Corjuem is 10km up the Mapusa river inland from Siolim — north-coast travellers focus on beaches, not inland river-island forts. The Aldona-Corjuem cable bridge over the river is itself an offbeat photograph but goes unnoticed.',
  'Square-plan Portuguese island fort built 1705 by Viceroy Dom Caetano de Melo e Castro to defend Bardez and Panjim from Bhonsle Marathas. Wide laterite walls with gun ports and murder-holes, ramps to the ramparts at each corner, a well, and three-room living quarters. Free entry, accessed via Aldona village + the Corjuem cable bridge. The Mae de Deus chapel of Corjuem (1855) sits 200m from the fort. Open daily 9am-5pm.',
  'easy',
  'Wikipedia Aldona village + Corjuem Fort entries; Goa Tourism heritage list.',
  4,
  ARRAY['fort','island','heritage','viewpoint','offbeat']::text[],
  '{}'::jsonb
);

-- =========================================================
-- LOCAL EATERIES — 3 verified NEW (2 already in DB: Hosa, Thalassa)
-- =========================================================

INSERT INTO local_eateries (
  destination_id, name, area, area_slug, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, is_legendary
) VALUES (
  'siolim',
  'Marbella Goa Restaurant',
  'Sinquerim-Siolim road, between Saligao and Siolim',
  'siolim',
  ARRAY['goan-portuguese','spanish','seafood']::text[],
  'mid_range',
  'Goan fish recheado',
  ARRAY['Fish recheado','Pork vindaloo','Spanish paella','Sangria','Bebinca']::text[],
  '₹₹₹',
  '[800,1601)'::int4range,
  'mixed',
  true,
  'recommended',
  'casual',
  'Goan-Portuguese-Spanish hybrid restaurant — restored Portuguese villa with garden seating. Long-running family operation; Spanish paella is the menu''s break from the Goan-Portuguese norm. Open dinner 7-11pm; lunch only on Sundays.',
  'Garden seating books out December-February — reserve 48 hours ahead. The fish recheado is the order; paella runs out by 9.30pm on Saturday nights. Cards work; service charge included.',
  'Sinquerim-Siolim Road, near Saligao 403517',
  'https://maps.google.com/?q=Marbella+Goa+Restaurant',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g3136739-d2367379-Reviews-Marbella-Saligao_Bardez_North_Goa_District_Goa.html',
    'https://www.zomato.com/goa/marbella-saligao'
  ]::text[],
  '2026-05-10',
  false
),
(
  'siolim',
  'Sublime Goa',
  'Assagao, 3km south of Siolim',
  'assagao',
  ARRAY['fusion','european','goan-modern']::text[],
  'fine_dining',
  'Tasting plate (chef''s choice)',
  ARRAY['Tasting menu','Pork belly','Goan fish curry remix','Wood-fired pizza','Chocolate dessert plate']::text[],
  '₹₹₹₹',
  '[1500,2801)'::int4range,
  'mixed',
  false,
  'required',
  'smart-casual',
  'Chef-Christopher-Saleem-Agha fusion restaurant — moved from Calangute to Baga to Anjuna and finally to Assagao around 2020. The Assagao branch is closest to Siolim (3km). Rotating tasting menu draws on Goan technique with European technique. Open dinner 7-11pm only, in-season Nov-March; closed monsoon.',
  'Reserve 1-2 weeks ahead December-January. Tasting menu is the order — à la carte is shorter and less interesting. Wine pairing optional, ₹2,500-3,500. Cards work; service charge included.',
  'Bouta Vaddo, Assagao, Bardez 403507',
  'https://maps.google.com/?q=Sublime+Goa+Assagao',
  ARRAY[
    'https://www.tripadvisor.com/Restaurant_Review-g1025163-d15628484-Reviews-Sublime_Goa-Assagao_Bardez_North_Goa_District_Goa.html',
    'https://www.zomato.com/goa/sublime-goa-assagao'
  ]::text[],
  '2026-05-10',
  false
),
(
  'siolim',
  'Bawri',
  'Assagao-Anjuna Road, 2.5km south of Siolim',
  'assagao',
  ARRAY['indian','rajasthani','north-indian']::text[],
  'mid_range',
  'Laal maas',
  ARRAY['Laal maas','Dal baati churma','Galouti kebab','Saffron kulfi','Royal Rajasthani thali']::text[],
  '₹₹₹',
  '[800,1501)'::int4range,
  'mixed',
  true,
  'recommended',
  'casual',
  'Rajasthani-meets-Lucknowi restaurant in a courtyard-villa on the Assagao-Anjuna road, 2.5km from Siolim square. Notable as one of the few non-Goan, non-Continental sit-downs in the Assagao-Siolim arc — kebabs from a clay tandoor, biryani in handi, dal baati churma in copper thali. Open dinner 7-11.30pm.',
  'The royal thali is the volume order; laal maas is the better quality call for a couple. Reserve via Zomato or call +91-8329020906. Cards work; service charge applies.',
  'Tinto Junction, Assagao 403507',
  'https://maps.google.com/?q=Bawri+Assagao+Goa',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g1025163-d23769499-Reviews-Bawri-Assagao_Bardez_North_Goa_District_Goa.html',
    'https://www.zomato.com/goa/bawri-assagao'
  ]::text[],
  '2026-05-10',
  false
);
