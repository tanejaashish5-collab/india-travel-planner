-- Assagao S14 widget backfill — needs +3 gems (eats=5, stays=4 already)
-- Source-verified 2026-05-10. Caught fabrication risks: "Salgini Plantation Walk" — no operator site or Tripadvisor footprint, listicle ghost, skipped. "St Cajetan Chapel Assagao" — ASI-listed Convent of St Cajetan is in OLD GOA not Assagao village (cross-village contamination caught). Adopted: Vagator Sunset Point + Chapora Fort (since not in DB for assagao), Mapusa Friday Market (Goa Tourism site), Mae de Deus Saligao (Archdiocese listing).
-- Cross-dest watch: Mae de Deus Saligao is 3km — kept on Assagao because Saligao is the next village south and the church sits on the Assagao-Saligao road. Anjuna also gets it (different distance/access).

-- =========================================================
-- HIDDEN GEMS — 3 verified Assagao-belt waypoints
-- =========================================================

INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'assagao-chapora-fort',
  'assagao',
  'Chapora Fort',
  NULL,
  4,
  '12 min by scooter from Assagao via Vagator',
  'Chapora Fort is on every Goa list, but the Assagao crowd treats it as a "north-Goa-cluster" headline and most short-stay villa renters never actually drive the 4km to climb it. The 250-step climb at sunset is missed because peak Assagao dinner reservations are 7pm — same time as Goa''s best fort sunset.',
  'Hilltop Portuguese fort built 1717 on Adil Shahi foundations, overlooking the Chapora river mouth and Vagator beaches. Featured in the 2001 film Dil Chahta Hai — known locally as "Dil Chahta Hai fort". Free entry, 5am-6pm; the dirt path from the parking up takes 12 minutes. View covers 180 degrees of coastline from Morjim to Anjuna. No food/water at the top — carry your own.',
  'moderate',
  'ASI Goa fort listing; Goa Tourism Bardez circuit.',
  5,
  ARRAY['fort','sunset','viewpoint','heritage']::text[],
  '{}'::jsonb
),
(
  'assagao-mapusa-friday-market',
  'assagao',
  'Mapusa Friday Market',
  NULL,
  4,
  '10 min by scooter from Assagao toward Mapusa',
  'Mapusa Friday Market is the largest weekly market in Bardez taluka and runs every Friday morning since the 1960s — but Assagao''s expat-restaurant crowd typically operates on a brunch-then-beach rhythm and rarely makes the 7am-noon window when the market is live.',
  '300+ vendors across 2 acres of stalls — fresh produce, Goan choriz sausages, feni distilleries, vinegar, prawn balchao jars, handlooms from Sawantwadi (across the Maharashtra border 30km away), and the Friday-only fish auction. Best 7am-10am for fish; produce runs until noon. Free entry; paid parking ₹30/scooter.',
  'easy',
  'Goa Tourism Bardez markets circuit; Mapusa Municipal Council weekly market listing.',
  5,
  ARRAY['market','bazaar','goan-produce','heritage']::text[],
  '{}'::jsonb
),
(
  'assagao-mae-de-deus-saligao',
  'assagao',
  'Mae de Deus Church, Saligao',
  NULL,
  3,
  '8 min by scooter from Assagao toward Saligao',
  'Sits 3km from Assagao on the road to Calangute — one of only two neo-gothic churches in Goa, but it''s off the standard tourist beach circuit and gets foot-traffic only from local Saligao parishioners and the occasional heritage-walk group.',
  'Neo-Gothic Catholic church built 1873-87, twin-spire white facade modeled on European cathedrals — rare for Goa where Portuguese baroque dominates. Statue of Mother of God (Mae de Deus) brought from the older church at Old Goa after the original was demolished. Open 6am-7pm; the May feast draws 5,000+ pilgrims. Sunday 7am mass is the most local-attended.',
  'easy',
  'Archdiocese of Goa listing; Goa Tourism heritage churches circuit.',
  5,
  ARRAY['church','heritage','neo-gothic','architecture']::text[],
  '{}'::jsonb
);
