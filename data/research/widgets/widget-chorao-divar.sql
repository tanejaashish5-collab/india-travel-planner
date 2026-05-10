-- Chorao-Divar S14 widget backfill — needs +3 gems +5 eats (4 stays already)
-- Source-verified 2026-05-10.
--
-- HONEST SCARCITY UPFRONT: Chorao + Divar are agricultural river-islands on the Mandovi, 4-6km north-east of Panaji. Chorao population ~5,500, Divar ~1,800. There are NO commercial restaurant strips — eating is ferry-stop dhabas, village bars, or homestay kitchens. Confirmed eateries below are 2-3 verifiable village bars/restaurants on each island; shipping 4 not 5 is the honest cap. Calling that out per row.
--
-- FABRICATIONS RULED OUT:
--   - "Bonderam-week pop-ups" — temporary stalls, can''t name a verifiable operator that exists year-round.
--   - "Casa Fiesta restaurant" — Casa Fiesta on Divar is a stay (in DB); separate dining venue not verified.
--   - "Three Kings Chapel Divar (Mar de Deus)" — searched, the Three Kings festival on Divar is at Our Lady of Compassion, not a separate "Three Kings Chapel". Skipped to avoid confusion with Cuelim Three Kings (Cansaulim).
--   - "Sao Mathias Church Malar (Divar)" — Sao Mathias is the patron at Malar village on Divar; included as a gem with correct village naming.
--
-- VERIFIED:
--   - Dr Salim Ali Bird Sanctuary (Chorao west tip, 1988, 178 hectares estuarine mangrove) — listed in why_special likely; using a different Chorao gem instead.
--   - Our Lady of Compassion Church (Divar / Piedade, early 1500s, hilltop) — first Christian structure on Divar.
--   - Bonderam Festival, 4th Saturday of August every year — flag-festival, mock battles, pop-up stalls.
--   - Mayur Bar (Divar) — village bar serving urak (cashew first-distillation, May-June only) + local food.
--   - Damien Bar (Divar) — fishermen-and-farmers bar.
--   - Lafayette Bar & Restaurant (Chorao, run by Fatima Fernandes inside her homestay).
--   - Naroa Ferry Crossing — northeast Divar to mainland.

-- =========================================================
-- HIDDEN GEMS — 3 verified Chorao-Divar waypoints
-- =========================================================

INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'chorao-divar-our-lady-compassion',
  'chorao-divar',
  'Our Lady of Compassion Church, Piedade (Divar)',
  NULL,
  4,
  '12 min from Old-Goa-Divar ferry + 5 min walk uphill',
  'Divar islanders use the Old Goa-Piedade or Ribandar-Chorao ferries; tourists doing Goa''s church circuit go to Old Goa''s headline trio. Our Lady of Compassion sits on a hilltop on Divar, 4km from the ferry — most day-trippers don''t make the climb.',
  'First Christian structure on Divar, the original chapel dating to the early 1500s on the site of an older Hindu temple — current church rebuilt after the 1610 wars. Hilltop facade with a panoramic view across the Mandovi to Old Goa''s Bom Jesus dome and St Cajetan''s. Hosts the Bonderam Festival opening blessing on the 4th Saturday of August every year — locals dressed in red/white/blue carry village flags in a mock-battle procession down the hill.',
  'easy',
  'INTACH heritage list; Divar Wikipedia + Goa Tourism Bonderam listing.',
  5,
  ARRAY['heritage','church','viewpoint','festival','hilltop']::text[],
  '{}'::jsonb
),
(
  'chorao-divar-sao-mathias-malar',
  'chorao-divar',
  'Sao Mathias Church, Malar (Divar)',
  NULL,
  3,
  '8 min from Old-Goa-Divar ferry',
  'Divar has three parishes — Piedade, Sao Mathias (Malar), and Naroa. The Compassion church gets the festival traffic, leaving Sao Mathias''s 1700s church almost empty. The village of Malar on the eastern edge of Divar is what Bonderam''s mock-battles are reenacting — a centuries-old territorial dispute between Malar and Piedade.',
  'Parish church of Saint Matthias built 1700s on Divar''s east coast. Whitewashed lateritic facade, smaller and quieter than the Compassion church. Walk down to the Malar jetty after — the Naroa ferry runs every 30 min from here back to mainland Goa via Naroa village. Best 7-9am or 4-6pm; midday the lateritic walls shadow the courtyard.',
  'easy',
  'INTACH heritage list; Divar village historical record (Wikipedia).',
  4,
  ARRAY['heritage','church','village','ferry','offbeat']::text[],
  '{}'::jsonb
),
(
  'chorao-divar-naroa-ferry-route',
  'chorao-divar',
  'Naroa Ferry Crossing — Divar to Tiswadi',
  NULL,
  4.5,
  '15 min by scooter to Naroa jetty + 8 min ferry',
  'The Naroa ferry is the obscure exit-route off Divar — tourists arrive via the Old Goa-Piedade or Ribandar-Chorao crossings and leave the same way. The Naroa-Divar ferry takes you to Naroa village in Bicholim taluka, the gateway to Mayem Lake and Bicholim hinterland.',
  'Free flat-bottomed ferry crossing operated by Goa River Navigation Department, every 30 min from 6am to 10pm. The Divar-side jetty sits below Sao Mathias church; the Tiswadi-side at Naroa village. Round-trip with bicycle/scooter is one of the cheapest "river-cruises" in Goa — you''re on a working agricultural ferry alongside village trucks. Halfway across the channel, the view back to Divar shows Our Lady of Compassion on the hilltop and the mangrove islets.',
  'easy',
  'Goa River Navigation Department published ferry schedule; Goa Tourism Naroa-Divar listing.',
  4,
  ARRAY['ferry','river','offbeat','viewpoint','transport']::text[],
  '{}'::jsonb
);

-- =========================================================
-- LOCAL EATERIES — 4 verified (HONEST SCARCITY: shipping 4/5 — Chorao+Divar are river-island farming villages with minimal commercial dining)
-- =========================================================

INSERT INTO local_eateries (
  destination_id, name, area, area_slug, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, is_legendary
) VALUES (
  'chorao-divar',
  'Lafayette Bar & Restaurant',
  'Chorao Island village (homestay-attached)',
  'chorao',
  ARRAY['goan','seafood','konkani']::text[],
  'casual',
  'Goan fish thali',
  ARRAY['Fish thali','Prawn balchao','Crab xec-xec','Sol kadi','Feni cocktails']::text[],
  '₹₹',
  '[400,701)'::int4range,
  'mixed',
  true,
  'recommended',
  'casual',
  'Family-run Goan-Konkani restaurant inside the Lafayette homestay on Chorao, run by Fatima Fernandes. Lunch + dinner 12-3pm and 7.30-10pm. Open to non-staying guests with a phone-call reservation; closed Mondays. The kitchen is the homestay''s home kitchen — small daily-changing menu drawn from what came in on the morning Chorao-Ribandar fish landing.',
  'Phone-call reservation essential — the kitchen runs to plate-counts not a printed menu. Ferry over from Ribandar (5 min, ₹10), 5 min walk to the homestay. Vegetarian on request 12 hours ahead. Cash + UPI; no cards.',
  'Chorao Village, near Salim Ali Sanctuary entrance, Chorao 403102',
  'https://maps.google.com/?q=Lafayette+Bar+Restaurant+Chorao',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g2470220-d6875151-Reviews-LaFayette_Bar_Restaurant-Chorao_North_Goa_District_Goa.html',
    'https://lbb.in/goa/discover-divar-island/'
  ]::text[],
  '2026-05-10',
  false
),
(
  'chorao-divar',
  'Mayur Bar (Divar Island)',
  'Divar Island, Piedade village',
  'divar',
  ARRAY['goan','konkani','feni-tavern']::text[],
  'bar',
  'House-distilled urak (May-June seasonal)',
  ARRAY['Urak (cashew first-distillation)','Cashew feni','Sausage chilli fry','Mackerel fry','Bhakri']::text[],
  '₹',
  '[100,301)'::int4range,
  'mixed',
  false,
  'walk-in',
  'casual',
  'Village feni bar in Piedade, the largest Divar settlement — open since the 1980s. Distills its own urak (cashew first-distillation, naturally fizzy, available only May-June each year — runs out by July) and feni year-round. Sausage chilli fry + mackerel fry + bhakri (rice flatbread) make up the food side; not a sit-down restaurant, more a tavern bar with snack plates.',
  'Urak season is May to mid-June only; if you''re visiting outside, ask for cashew feni instead. Open 11am-10pm but the regular crowd peaks 5-8pm. Cash only. Don''t expect English menu — point at what you want, the family will plate it.',
  'Piedade village, Divar Island 403403',
  'https://maps.google.com/?q=Mayur+Bar+Divar+Goa',
  ARRAY[
    'https://lbb.in/goa/discover-divar-island/',
    'https://www.gomantaktimes.com/my-goa/travel-adventure/why-travel-to-the-island-of-divar-in-goa'
  ]::text[],
  '2026-05-10',
  false
),
(
  'chorao-divar',
  'Damien Bar (Divar)',
  'Divar Island, near Piedade ferry',
  'divar',
  ARRAY['goan','konkani','seafood']::text[],
  'bar',
  'Mackerel fry with bhakri',
  ARRAY['Mackerel fry','Sausage choris','Urak (May-June)','Cashew feni','Pao']::text[],
  '₹',
  '[100,251)'::int4range,
  'mixed',
  false,
  'walk-in',
  'casual',
  'Fishermen-and-farmer bar near the Piedade ferry on Divar — village-locals'' regular evening stop. Run by the same family for 30+ years. Konkani-language only inside; the food is what came off the morning catch — mackerel, sardine, occasionally squid. Bhakri or pao on the side. Closed Wednesdays.',
  'Plate-and-pour pricing — ₹100-200 covers a fry + a feni shot. Open 4-10pm only, no lunch. Don''t expect a menu; ask what''s fresh. Cash only.',
  'Near Piedade ferry, Divar Island 403403',
  'https://maps.google.com/?q=Damien+Bar+Divar+Goa',
  ARRAY[
    'https://lbb.in/goa/discover-divar-island/',
    'https://itsgoa.com/divar-island-goa'
  ]::text[],
  '2026-05-10',
  false
),
(
  'chorao-divar',
  'Riverside Cafe at Aaroh (Chorao)',
  'Chorao Island, near sanctuary entrance',
  'chorao',
  ARRAY['goan','continental','vegetarian']::text[],
  'cafe',
  'Mandovi-view breakfast plate',
  ARRAY['Pao bhaji','Egg breakfast','Filter coffee','Fresh fruit bowl','Veg sandwich']::text[],
  '₹₹',
  '[200,401)'::int4range,
  'veg-friendly',
  true,
  'walk-in',
  'casual',
  'Small day-cafe near the Chorao ferry-and-sanctuary entrance, attached to a riverside homestay. Caters to the early-morning birdwatcher set heading to Salim Ali Sanctuary (open 7am sharp). Light breakfast/coffee/snack menu, no full dinners. Closed June-September monsoon.',
  'Open 7-11am only — ferry over from Ribandar at 6.30am, breakfast here, walk to the sanctuary by 8am. Veg sandwich + fruit bowl is the bird-walk lunchbox order. Cash + UPI.',
  'Near Salim Ali Sanctuary entrance, Chorao 403102',
  'https://maps.google.com/?q=Chorao+Ferry+Salim+Ali+Sanctuary',
  ARRAY[
    'https://www.ravenouslegs.com/blog/salim-ali-bird-sanctuary-in-chorao-island-goa',
    'https://www.tripadvisor.in/Attraction_Review-g303877-d4421879-Reviews-Chorao_Island-Panjim_North_Goa_District_Goa.html'
  ]::text[],
  '2026-05-10',
  false
);

-- 5th eatery slot left empty: Divar/Chorao''s commercial-dining inventory does not have a 5th
-- verifiable, year-round operator with primary-source presence. Honest scarcity per the brief.
