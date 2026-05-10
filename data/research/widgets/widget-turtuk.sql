-- Turtuk widget backfill — needs +1 gem (already has Changmar, Thang)
-- Source-verified 2026-05-10. Yabgo Palace Museum is the strongest verified gem (royal residence of 1000-year Yabgo dynasty, current head Raja Mohammad Khan Kacho).

INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'turtuk-yabgo-palace-museum',
  'turtuk',
  'Yabgo Palace and Balti Heritage Museum',
  NULL,
  0.5,
  '5 min walk from Turtuk village centre',
  'Most Turtuk daytrippers from Diskit/Hunder turn around at the apricot orchards and the Pakistan-view ridge. The palace museum is a 5-minute walk above the Yabgo family home — easy to miss without a local pointing the way. Reviewed on a few Ladakh blogs, no Tripadvisor listing.',
  'Working residence-museum of the Yabgo dynasty that ruled Baltistan for nearly a thousand years (the family traces back to 8th-century Central Asia). The current head, Raja Mohammad Khan Kacho, often hosts visitors himself. Inside: Lapis-encrusted swords, 400-year-old family records, leopard traps, silver ink containers, headgear and clothing of past rajas. The Heritage House at upper Farol hamlet (Ghulam Haider Ashoorpa''s ancestral home) holds the original 400-year artefact collection.',
  'easy',
  'Outlook Traveller feature 2024; Sahapedia long-form documentation; LIFE on the Planet Ladakh photo essay.',
  4,
  ARRAY['heritage','museum','royal-history','balti-culture']::text[],
  '{}'::jsonb
);
