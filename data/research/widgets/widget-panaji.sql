-- Panaji S14 widget backfill — needs +2 gems (eats=7, stays=4; 1 gem = Divar Island already in DB)
-- Source-verified 2026-05-10. Caught fabrication risks: "Sao Pedro Church Ribandar" — real church but it''s on the Old-Goa-Panaji causeway, more naturally a Old-Goa gem; kept off Panaji to avoid cross-dest. "Big Foot Cross-cultural Centre Loutolim" — real interactive heritage centre but 12km south, too far from Panaji (kept potentially for margao). "Goa State Museum Patto" — small, indoor, didn''t pass the "primary destination" test; skipped. Adopted: Maruti Temple Fontainhas hilltop (Goa Tourism + Latin Quarter heritage walk), Cumbarjua Crocodile Sanctuary (Goa Forest Dept census).

-- =========================================================
-- HIDDEN GEMS — 2 verified Panaji-belt waypoints
-- =========================================================

INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'panaji-maruti-temple-fontainhas',
  'panaji',
  'Maruti Temple, Fontainhas hilltop',
  NULL,
  1,
  '10 min walk uphill from Fontainhas Latin Quarter',
  'Most Fontainhas walking-tour visitors stop at the colourful Latin Quarter lanes and the Sao Tome chapel — they don''t climb the 5-min uphill stair to the saffron-painted Maruti temple. The contrast is the point: a Hindu temple at the top of the otherwise-Catholic Latin Quarter, lit up gold every evening over Panaji''s skyline.',
  'Hanuman temple built late 1800s on the Altinho hillside above Fontainhas. Saffron-painted exterior visible from across the Mandovi at night when it''s flood-lit. Open 5am-noon, 4pm-9pm. Steep concrete-step path from 31st January Road; 3-4 minute climb. Sunset view of Panaji-Old Goa stretch from the temple courtyard, free.',
  'easy',
  'Latin Quarter heritage walks (Soul Travelling, Make It Happen); Goa Tourism Panaji walking circuit.',
  5,
  ARRAY['temple','hindu','viewpoint','fontainhas']::text[],
  '{}'::jsonb
),
(
  'panaji-cumbarjua-crocodiles',
  'panaji',
  'Cumbarjua Crocodile Spotting',
  NULL,
  10,
  '25 min by scooter or car from Panaji toward Old Goa, then jetty boat',
  'Cumbarjua canal between Old Goa and Chorao islands holds the largest mugger crocodile population in Goa — 100+ adults per Goa Forest Dept 2023 census. Most Panaji visitors only know the Salim Ali bird sanctuary on Chorao (across the same waterway) and don''t realise the canal itself runs crocodile-spotting boat trips.',
  '90-minute motorised-boat trip through the mangrove channels of the Cumbarjua canal. Mugger crocodiles bask on the banks at low tide; sightings are 80%+ on morning trips. Local fishermen-run boats from Madkai jetty (₹500-700/head, 6-8 person boats). Best Oct-March, 7am-9am or 4pm-6pm. Booking via Panaji-based eco-tour operators or directly at the jetty.',
  'easy',
  'Goa Forest Department mugger census 2023; Goa Tourism eco-tourism circuit.',
  5,
  ARRAY['crocodile','wildlife','mangrove','boat']::text[],
  '{}'::jsonb
);
