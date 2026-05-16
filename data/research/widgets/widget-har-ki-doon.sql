-- har-ki-doon — widget backfill (HONEST SCARCITY: 7-day trek, infra only at Sankri base village)
-- Reality: Har-ki-doon Valley itself has 1 GMVN guesthouse + tents only. Sankri base village (where treks start) has 5-6 named hotels.
-- Eats: only "few dhabas" surface — no named primary-source dhaba in Sankri village. HONEST SCARCITY, ship 0.
-- Existing gems (2): Borasu Pass base, Ruinsara Tal. Eats (0). Stays (0).

-- =========================================================
-- gems (+1)
-- =========================================================

INSERT INTO hidden_gems (id, near_destination_id, name, distance_km, drive_time, why_unknown, why_go, difficulty, confidence_score, tags, translations) VALUES
('har-ki-doon-osla-duryodhana', 'har-ki-doon', 'Osla Duryodhana Temple',
  13, '8-9 km hike from Taluka through deodar forest',
  'On the standard Sankri-Taluka-Osla-Har-ki-doon trek route, most groups halt at Osla for the night and skip the temple visit on the climb up the next morning. Local trek leaders rarely mention it because it does not fit the alpine-meadow narrative.',
  'The Osla temple is dedicated to Duryodhana — the only such temple in India. Built and maintained by the inhabitants of Saur village (10km below Sankri) who worship the Kauravas as their ancestors. Wooden architecture in regional Garhwali style, with intricate carvings. Inside Govind Pashu Vihar National Park, accessed only via the Sankri-Taluka-Osla foot trail.',
  'moderate', 4,
  ARRAY['heritage','temple','mahabharata','national-park','trek-only'],
  '{}'::jsonb);

-- =========================================================
-- eats (+0 of needed 5 — HONEST SCARCITY)
-- =========================================================
-- Sankri village has "small market with few dhabas" per primary sources but no named eatery surfaces.
-- "Mother Lodge Dhaba" and "Tikona Dhaba" (in brief) could not be primary-source verified.
-- "Banjara Camps Sankri" (in brief) IS A FABRICATION — Banjara Camps' official property list does not include Sankri (verified via banjaracamps.com).
-- Hotel restaurants exist but are tied to specific guesthouses (GMVN canteen, Hotel Swargarohini Palace dining) — these belong to the stays, not as standalone eateries.
-- Better to ship 0 than fabricate listicle ghosts.

-- =========================================================
-- stays (+3)
-- =========================================================

INSERT INTO destination_stay_picks (destination_id, slot, name, property_type, price_band, why_nakshiq, source, confidence, published) VALUES
('har-ki-doon', 'experience', 'Hotel Swargarohini Palace',
  'Trekker hotel',
  '₹1,800–₹3,500 per night',
  'A 30-room hotel at Sankri (the trek base village) built by trekkers, for trekkers. Hot water by bucket, heater rentals on cold nights, packed breakfast option for the 5am Taluka jeep. Owners are part of the local trekker network — most Kedarkantha and Har-ki-doon groups overnight here before and after the trail.',
  'web_search', 0.70, true);

INSERT INTO destination_stay_picks (destination_id, slot, name, property_type, price_band, why_nakshiq, source, confidence, published) VALUES
('har-ki-doon', 'value', 'GMVN Sankri Tourist Rest House',
  'Govt rest house',
  '₹800–₹2,200 per night',
  'Garhwal Mandal Vikas Nigam runs the only government guesthouse at the trek base — 5 economy rooms plus a 15-bed dormitory at ₹250 per bed. Attached bath, hot water bucket service, no frills. Book online via gmvnonline.com a week ahead in May-June peak.',
  'web_search', 0.75, true);

INSERT INTO destination_stay_picks (destination_id, slot, name, property_type, price_band, why_nakshiq, source, confidence, published) VALUES
('har-ki-doon', 'xfactor', 'GMVN Har-ki-doon Tourist Rest House',
  'High-altitude govt rest house',
  '₹500–₹1,500 per night',
  'The only built structure at Har-ki-doon valley itself (3566m) — 1 economy room and an 8-bed dormitory at ₹200 per bed. Snow in November-April closes it. Most trekking groups still pitch tents alongside; the rest house is the dry-roof fallback when weather turns.',
  'web_search', 0.65, true);
