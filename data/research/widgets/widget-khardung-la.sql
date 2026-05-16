-- khardung-la — widget backfill (HONEST SCARCITY: 5359m motorable pass, no overnight infra at top)
-- Reality: Pass top has only the BRO Rinchen Cafeteria. North Pullu and South Pullu are checkpoints with army tea-stalls (no named eateries).
-- Khardung village (15km below pass on Nubra side, ~4000m) has a few homestays but Tripadvisor/holidify don't surface named properties.
-- Existing gems (2): North Pullu, South Pullu. Eats (1): Rinchen Cafeteria. Stays (0).

-- =========================================================
-- gems (+1)
-- =========================================================

INSERT INTO hidden_gems (id, near_destination_id, name, distance_km, drive_time, why_unknown, why_go, difficulty, confidence_score, tags, translations) VALUES
('khardung-la-wari-la', 'khardung-la', 'Wari La pass alternate route',
  85, '4 hr Leh–Sakti–Wari La–Tangtse',
  'Most Leh–Nubra traffic uses Khardung La by default because tour operators and BRO have made it the standard. Wari La (5312m) is the alternate Leh–Nubra crossing via Sakti and the Shyok valley — clears later (late June or early July) and sees a fraction of the convoy traffic.',
  'Wari La is 47m lower than Khardung La and considerably less crowded — when Khardung La is choked with army convoys (common 8-11am), Wari La is empty. The road via Sakti also gives access to the Indus-Shyok confluence and a different Nubra approach via Agham. Check with BRO at the Sakti gate — opens late June after Khardung La, sometimes early July.',
  'moderate', 4,
  ARRAY['mountain-pass','offbeat','high-altitude','road-trip'],
  '{}'::jsonb);

-- =========================================================
-- eats (+0 of needed 4 — HONEST SCARCITY)
-- ===========================================================
-- Rinchen Cafeteria already in DB is the ONLY named structure at the pass.
-- North Pullu and South Pullu are army-run tea stalls without named operators (verified via travellingcamera.com primary source).
-- Khardung village dhabas are unnamed transit stops.
-- Diskit-Hundar transit dhabas belong to Nubra/Diskit destinations, not Khardung-la.
-- Better to ship 0 than fabricate.

-- =========================================================
-- stays (+0 of needed 3 — HONEST SCARCITY)
-- =========================================================
-- Khardung village (15km below pass) has informal homestays but no holidify/booking.com/govt-listed named property surfaced via primary sources.
-- All Nubra Valley properties (Hunder Homestay, Crystal Wind Sumur, etc.) belong to Hunder/Sumur/Diskit destinations not Khardung-la.
-- Pass-top stays are physically impossible (no oxygen, govt-banned overnight stays per altitude rules).
-- Better to ship 0 than borrow from neighbouring destinations.
