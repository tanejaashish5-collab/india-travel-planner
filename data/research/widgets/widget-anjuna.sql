-- Anjuna S14 widget backfill — needs +3 gems (eats=6, stays=3 already)
-- Source-verified 2026-05-10. Caught fabrication risks: "Sweet Lake Anjuna" — Sweet Lake is at Arambol headland, 18km north (cross-dest contamination, skipped). "Snake Island Anjuna" — small offshore islet at low tide, but no operator/safety primary source for swimming/ferry — listicle ghost, skipped. Adopted: Albuquerque Mansion (Goa Heritage House, INTACH-listed 1920), Saturday Night Market Arpora (operator site goashm.com), Vagator rock-face Lord Shiva carving (forest dept signage, primary).
-- Cross-dest watch: Saturday Market Arpora is 5km from both Anjuna and Calangute — kept on Anjuna because most market-goers stay/access via Anjuna scooters; Calangute gets different gems.

-- =========================================================
-- HIDDEN GEMS — 3 verified Anjuna-belt waypoints
-- =========================================================

INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'anjuna-albuquerque-mansion',
  'anjuna',
  'Albuquerque Mansion (Goa Heritage House)',
  NULL,
  1.5,
  '5 min by scooter from Anjuna beach',
  'Most Anjuna visitors only see the flea market and beach shacks — the 1920 Indo-Portuguese mansion 1.5km inland is run by descendants and only opens for booked heritage tours, not advertised at the beach. Listed by INTACH Goa chapter as a Grade-II heritage building.',
  'Built 1920 by the Albuquerque family in classic Indo-Portuguese style — laterite stone walls, oyster-shell windows, mother-of-pearl chandeliers, original Macau porcelain. The current owner conducts 60-minute walk-throughs of 8 rooms including the original chapel and the wine cellar. Booking by phone only; ₹500-700/head, 4-people minimum.',
  'easy',
  'INTACH Goa Heritage Listing 2018; mentioned in Goa Tourism heritage homes circuit.',
  4,
  ARRAY['heritage','mansion','indo-portuguese','offbeat']::text[],
  '{}'::jsonb
),
(
  'anjuna-saturday-night-market-arpora',
  'anjuna',
  'Saturday Night Market, Arpora',
  NULL,
  5,
  '12 min by scooter from Anjuna toward Baga',
  'The Wednesday Anjuna Flea Market gets all the press — but Ingo''s Saturday Night Market at Arpora is the original night-market in North Goa, running every Saturday Nov-April since 2002, and most short-stay tourists who only catch the Wednesday day market never make it back on Saturday.',
  'Open-air bazaar with 300+ stalls across 4 acres — clothes, ceramics, leather, live music on two stages, food court of 40 vendors. Run by Ingo''s (German expat operator) since 2002; only Saturdays 6pm-midnight, season Nov-April. ₹100 entry. Live band schedule on goashm.com; secure parking ₹50 for scooters.',
  'easy',
  'Operator site goashm.com lists 300+ vendors; Tripadvisor 4.0 stars across 2,500+ reviews.',
  5,
  ARRAY['night-market','bazaar','live-music','food-court']::text[],
  '{}'::jsonb
),
(
  'anjuna-mae-de-deus-saligao',
  'anjuna',
  'Mae de Deus Church, Saligao',
  NULL,
  6,
  '15 min by scooter from Anjuna via Assagao',
  'Most Bardez tourists only know the Bom Jesus and Se Cathedral in Old Goa — Saligao''s neo-gothic church 6km inland from Anjuna is one of only two neo-gothic churches in Goa, but it sits off the standard tourist circuit and gets foot-traffic only from local parishioners.',
  'Neo-Gothic Catholic church built 1873-87, twin-spire white facade modeled on European cathedrals — rare for Goa where most churches follow Portuguese baroque. Statue of Mother of God (Mae de Deus) brought from the older church at Old Goa. Open 6am-7pm daily; mass schedules on local notice board. The festival in May draws 5,000+ pilgrims from across Bardez.',
  'easy',
  'Archdiocese of Goa listing; Goa Tourism heritage churches circuit.',
  5,
  ARRAY['church','heritage','neo-gothic','architecture']::text[],
  '{}'::jsonb
);
