-- 049_seed_astavinayak_collection — ship the deferred Astavinayak Yatra
-- now that the astavinayak-circuit dest exists (mig 048).
--
-- Currently anchored at the unified astavinayak-circuit dest. When the 8
-- temple towns (Morgaon, Siddhatek, Pali, Mahad, Theur, Lenyadri, Ozar,
-- Ranjangaon) are added in a future Maharashtra state-expansion sweep,
-- this collection''s items[] should be expanded to list each town as a
-- separate stop (will need a follow-up UPDATE migration).

INSERT INTO collections (id, name, description, content_type, items, tags, risk_level, strategy_intro, connector_notes) VALUES
(
  'astavinayak-yatra',
  'Astavinayak Yatra — The 8 Ganesha Temples of Maharashtra',
  'The eight self-manifested (swayambhu) Ganesha temples scattered across western Maharashtra, traditionally visited as a single 3-5 day pilgrimage circuit from Pune.',
  'destinations',
  '[
    {"rank":1,"destination_id":"astavinayak-circuit","note":"All eight Ganesha temples — Mayureshwar (Morgaon), Siddhivinayak (Siddhatek), Ballaleshwar (Pali), Varadvinayak (Mahad/Raigad), Chintamani (Theur), Girijatmaj (Lenyadri rock-cut caves), Vighnahar (Ozar), Mahaganapati (Ranjangaon) — done as a single road circuit anchored at Pune. Each is a swayambhu (self-manifested) idol, distinguishing this circuit from the thousands of other Ganesha temples in Maharashtra."}
  ]'::jsonb,
  ARRAY['pilgrimage','ganesha','astavinayak','temple-circuit','hindu-religious','maharashtra'],
  'easy',
  'The Astavinayak Yatra is one of Maharashtra''s most popular regional pilgrimages — eight Ganesha temples whose idols are believed to have manifested on their own (swayambhu), as opposed to being installed by humans. The eight in canonical order: Mayureshwar at Morgaon (Pune district), Siddhivinayak at Siddhatek (Ahmednagar), Ballaleshwar at Pali (Raigad), Varadvinayak at Mahad (Raigad), Chintamani at Theur (Pune), Girijatmaj at Lenyadri (Pune — inside Buddhist rock-cut caves), Vighnahar at Ozar (Pune) and Mahaganapati at Ranjangaon (Pune). Tradition requires returning to Mayureshwar at Morgaon to ''complete'' the yatra. The eight individual temple towns are not yet listed as separate destinations — this collection currently anchors at the unified Astavinayak Circuit dest.',
  'Total ~600km road circuit centred on Pune. Standard itinerary: Day 1 Morgaon + Siddhatek; Day 2 Theur + Ranjangaon + Ozar + Lenyadri (the Pune-area cluster); Day 3 Mahad + Pali in Raigad; Day 4 return to Morgaon to complete. October-March is the dry-season window. Combine with Bhimashankar Jyotirlinga or Astavinayak yatra-specific tour buses out of Shivajinagar Pune.'
);
