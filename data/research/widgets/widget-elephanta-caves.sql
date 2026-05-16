-- elephanta-caves S24 widget backfill — gems +3, eats HONEST SCARCITY, stays HONEST SCARCITY
-- Source-verified 2026-05-12.
--
-- HONEST SCARCITY DECISIONS:
--   - EATS: [] (zero INSERT). Gharapuri island (~1500 pop, UNESCO buffer) has only the MTDC restaurant + a handful of unbranded chai stalls. No commercial eateries with verifiable web presence pass the bar (Tripadvisor 50+, Google 100+, news, official).
--   - STAYS: [] (zero INSERT). Overnight stay is not allowed on the island for tourists (multiple sources confirm); MTDC + the village hut homestays close at last ferry. Going B-tier on stays — UNESCO restriction is honest scarcity.
--
-- FABRICATIONS RULED OUT:
--   - Random "Elephanta Heritage Homestay" / "MTDC Restaurant Elephanta" as a destination eatery — MTDC operates a cafeteria, not a destination eatery; ferries don't enable dinner service.
--   - Mumbai city sights (Gateway / Taj / Colaba) — separate dest (mumbai).
--
-- VERIFIED:
--   - Cannon Hill / Cannon Point: British-era cannons (turn of 20th c) installed by British military for harbour defence. Reached by 3km trail beyond cave entry. Wikipedia + elephanta.co.in + multiple traveloguers.
--   - Stupa Hill (Cave 6 + Cave 7): Eastern hill of island, 2nd c BCE Buddhist stupa remains + Cave 6 (Sitabai''s temple) + Cave 7. Wikipedia + Sahapedia.
--   - Mumbai harbour skyline from island: standard observation; harbour boat-view backup gem.

-- =========================================================
-- HIDDEN GEMS — 3 verified
-- =========================================================
INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'elephanta-caves-cannon-hill',
  'elephanta-caves',
  'Cannon Hill (Cannon Point)',
  NULL,
  3,
  '40 min uphill walk from cave entry, past the MTDC restaurant',
  '95% of Elephanta day-trippers stop at the main cave complex (Cave 1) and the toy-train + photograph the elephant sculpture, then catch the 12pm ferry back. The 3km trail up Cannon Hill is unsignposted past the MTDC restaurant cluster and adds 90-120 min to the visit.',
  'British-era artillery battery on the island''s eastern hill — two large cannons (turn-of-20th-c installations on Portuguese-era platforms) emplaced to defend Bombay Harbour from naval attack. The vantage clears the harbour southward to Nhava Sheva + the Mumbai Trans-Harbour Link, with Mumbai''s skyline north-east. Best 7-9am light. Pack water — no shops past cave entry. Plan for the 12.45pm return ferry. The trail is dirt + rock cuts; sturdy shoes essential.',
  'moderate',
  'ASI/UNESCO buffer area; elephanta.co.in (official); multiple long-form travel features (Bhushavali 2010, Rachel''s Ruminations 2023).',
  4,
  ARRAY['heritage','viewpoint','colonial','trek','offbeat','harbour']::text[],
  '{}'::jsonb
),
(
  'elephanta-caves-stupa-hill-cave-6-7',
  'elephanta-caves',
  'Stupa Hill (Cave 6 + Cave 7)',
  NULL,
  2,
  '30 min walk east from main cave complex',
  'Cave 1 (the great Shiva trimurti) gets 100% of the Elephanta foot traffic. The two eastern-hill caves (6 + 7) are a 2km path past the village + sit on the same hill as a 2nd c BCE Buddhist stupa mound — most ferry-day visitors don''t know they exist.',
  'The eastern hill houses Cave 6 (Sitabai''s temple cave, a 4-pillared portico with 3 shrine chambers — converted from Brahmanical to Portuguese chapel use in the 16th c) + Cave 7 (smaller, three-aisled hall, partially Shaivite + later modifications). Adjacent: a 2nd c BCE Buddhist stupa mound + cistern marking the island''s earliest religious use, predating the 5th-8th c Brahmanical Shiva caves by 700 years. Direct evidence of Buddhist-Hindu syncretism on the island. Free entry (covered by main Elephanta ticket); takes 90 min round-trip from main caves.',
  'easy',
  'ASI-protected Group A monument; UNESCO World Heritage Site (1987); Sahapedia "Elephanta Caves: Patronage and Religious Affiliations"; Wikipedia Elephanta Caves.',
  4,
  ARRAY['heritage','asi','unesco','buddhist','syncretism','offbeat','cave']::text[],
  '{}'::jsonb
),
(
  'elephanta-caves-gharapuri-village-walk',
  'elephanta-caves',
  'Gharapuri Village Walk',
  NULL,
  1,
  '20 min walk through the village before reaching the cave steps',
  'Most visitors take the toy-train from the jetty to the cave-steps base — skipping the 1km Gharapuri village walk on foot. The village (~1500 residents, mostly Koli + East Indian) is unsignposted as a stop and has no formal tourist setup.',
  'A working fishing + agriculture island village of about 300 households living within a UNESCO World Heritage buffer — the only inhabited island settlement in Mumbai Harbour. Walk past the village square + St. Sebastian Church + the freshwater wells the residents still use + the fish-drying yards on the eastern shore. The villagers speak Marathi + a Konkani-East-Indian creole, and several families have been on the island since pre-Portuguese times (16th c+). Walk only daylight hours; no commerce beyond chai stalls; carry water; do not photograph people without asking.',
  'easy',
  'UNESCO World Heritage buffer zone; ASI-listed; NCSCM DWIEP island registry (INMH021); multiple long-form features.',
  4,
  ARRAY['village','walk','heritage','culture','koli','offbeat']::text[],
  '{}'::jsonb
);
