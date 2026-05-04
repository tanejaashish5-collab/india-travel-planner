-- 050_seed_astavinayak_eight_towns — expand the Astavinayak Yatra collection
-- from a single anchored circuit-dest to the canonical 8 temple-town stops.
--
-- Each town is a small Maharashtra village whose only tourist anchor IS the
-- Ganesha temple (and surrounding pilgrimage infrastructure). Stub-tier seed.
--
-- Naming note: "mahad-raigad" is used (not bare "mahad") to disambiguate from
-- the larger Mahad municipality further south in Konkan, which may be added
-- as its own dest later.

INSERT INTO destinations (
  id, name, state_id, tagline, why_special,
  elevation_m, type, vibe, difficulty,
  best_months, avoid_months, tags,
  budget_tier, ideal_duration_min, ideal_duration_max,
  cell_network, atm_available, medical_facility,
  permit_type, languages_spoken, content_tier, place_type
) VALUES
('morgaon', 'Morgaon', 'maharashtra',
  'Mayureshwar — the first stop of the Astavinayak Yatra',
  'Mayureshwar Ganesha temple on the Karha River, traditionally the first AND last stop of the Astavinayak Yatra (the yatra is considered incomplete without returning here). The temple sits within a tortoise-shaped fort wall — the namesake Mor (peacock) refers to the avatar Ganesha took to slay the demon Sindhu here. 65km from Pune.',
  570, ARRAY['pilgrimage','temple-town','astavinayak'], ARRAY['spiritual','village','rural'], 'easy',
  ARRAY[10,11,12,1,2,3]::int[], ARRAY[5,6,7,8]::int[],
  ARRAY['pilgrimage','ganesha','astavinayak','temple-town','maharashtra','pune-district'],
  'budget', 1, 1, 'good', true, 'baramati 30km',
  'none'::permit_type, ARRAY['marathi','hindi','english']::text[], 'A', 'destination'),

('siddhatek', 'Siddhatek', 'maharashtra',
  'Siddhivinayak — the only east-facing Astavinayak temple',
  'Siddhivinayak Ganesha temple on a Bhima River island in Ahmednagar district — the only one of the eight where the idol''s trunk turns to the right (uttara-vahini, harder to please) and the only east-facing temple. 200km from Pune via Daund. The river crossing was traditionally done by coracle; a road bridge connects today.',
  500, ARRAY['pilgrimage','temple-town','astavinayak','river-island'], ARRAY['spiritual','isolated','rural'], 'easy',
  ARRAY[10,11,12,1,2,3]::int[], ARRAY[6,7,8]::int[],
  ARRAY['pilgrimage','ganesha','astavinayak','temple-town','maharashtra','ahmednagar-district'],
  'budget', 1, 1, 'patchy', false, 'daund 18km',
  'none'::permit_type, ARRAY['marathi','hindi']::text[], 'A', 'destination'),

('pali-raigad', 'Pali (Raigad)', 'maharashtra',
  'Ballaleshwar — the only Astavinayak named after a devotee',
  'Ballaleshwar Ganesha temple in Pali village, Raigad district. The unique Astavinayak: the deity is named after Ballal, the child devotee whose unwavering bhakti is said to have caused Ganesha to manifest here. The temple structure faces east; the original wooden shrine was rebuilt in stone in 1760. 110km from Mumbai, 130km from Pune.',
  100, ARRAY['pilgrimage','temple-town','astavinayak'], ARRAY['spiritual','village','konkan-edge'], 'easy',
  ARRAY[10,11,12,1,2,3]::int[], ARRAY[6,7,8]::int[],
  ARRAY['pilgrimage','ganesha','astavinayak','temple-town','maharashtra','raigad-district'],
  'budget', 1, 1, 'good', true, 'khopoli 24km',
  'none'::permit_type, ARRAY['marathi','hindi']::text[], 'A', 'destination'),

('mahad-raigad', 'Mahad (Raigad — Ashtavinayak)', 'maharashtra',
  'Varadvinayak — the lit-since-1892 oil lamp at the fourth Astavinayak',
  'Varadvinayak Ganesha temple in Mahad village (Khopoli area, Raigad district — distinct from the larger Mahad town further south). The Nandadeep oil lamp inside has burned continuously since 1892. The idol was discovered in an adjoining lake in 1690 by a Brahmin who heard a divine voice. Easy to combine with Pali into a single day.',
  100, ARRAY['pilgrimage','temple-town','astavinayak'], ARRAY['spiritual','village','konkan-edge'], 'easy',
  ARRAY[10,11,12,1,2,3]::int[], ARRAY[6,7,8]::int[],
  ARRAY['pilgrimage','ganesha','astavinayak','temple-town','maharashtra','raigad-district','khopoli-area'],
  'budget', 1, 1, 'good', true, 'khopoli 7km',
  'none'::permit_type, ARRAY['marathi','hindi']::text[], 'A', 'destination'),

('theur', 'Theur', 'maharashtra',
  'Chintamani — where Krishna recovered the Syamantaka jewel',
  'Chintamani Ganesha temple at the confluence of Bhima, Mula and Mutha rivers, 25km east of Pune. Linked to the Krishna-Syamantaka legend: the jewel that Krishna lost-and-recovered was returned at this spot, removing his "chinta" (worry). Madhavrao Peshwa expanded the temple in the 1700s; he and his wife Ramabai performed sati at this spot.',
  570, ARRAY['pilgrimage','temple-town','astavinayak','river-confluence'], ARRAY['spiritual','peshwa-history','accessible'], 'easy',
  ARRAY[10,11,12,1,2,3]::int[], ARRAY[5,6,7,8]::int[],
  ARRAY['pilgrimage','ganesha','astavinayak','temple-town','maharashtra','pune-district','peshwa-heritage'],
  'budget', 1, 1, 'good', true, 'pune 25km',
  'none'::permit_type, ARRAY['marathi','hindi','english']::text[], 'A', 'destination'),

('lenyadri', 'Lenyadri', 'maharashtra',
  'Girijatmaj — the only Astavinayak inside Buddhist rock-cut caves',
  'Girijatmaj Ganesha temple inside Cave 7 of the 30 Lenyadri rock-cut Buddhist caves on a hill above Junnar town (~95km north of Pune). The Buddhist viharas here date to the 1st-3rd century CE; the Ganesha idol was carved into one chamber centuries later. 283 stone steps to climb. The only Astavinayak temple where the deity faces north.',
  670, ARRAY['pilgrimage','temple-town','astavinayak','rock-cut-caves','buddhist-heritage'], ARRAY['spiritual','climb-required','offbeat'], 'moderate',
  ARRAY[10,11,12,1,2,3]::int[], ARRAY[5,6,7,8]::int[],
  ARRAY['pilgrimage','ganesha','astavinayak','temple-town','maharashtra','pune-district','rock-cut-caves','junnar'],
  'budget', 1, 1, 'patchy', false, 'junnar 5km',
  'none'::permit_type, ARRAY['marathi','hindi']::text[], 'A', 'destination'),

('ozar', 'Ozar', 'maharashtra',
  'Vighnahar — the gold-plated dome on the Kukadi River',
  'Vighnahar (or Vighneshwar) Ganesha temple on the bank of the Kukadi River in Junnar taluka, 85km from Pune. The shikhara of this temple is gold-plated — visible from a distance — donated by Bajirao Peshwa''s patronage. The eyes of the idol are inlaid with rubies, and the forehead carries a real diamond. Vighnahar literally means "remover of obstacles".',
  670, ARRAY['pilgrimage','temple-town','astavinayak'], ARRAY['spiritual','peshwa-history','river-side'], 'easy',
  ARRAY[10,11,12,1,2,3]::int[], ARRAY[5,6,7,8]::int[],
  ARRAY['pilgrimage','ganesha','astavinayak','temple-town','maharashtra','pune-district','junnar-taluka'],
  'budget', 1, 1, 'patchy', true, 'junnar 12km',
  'none'::permit_type, ARRAY['marathi','hindi']::text[], 'A', 'destination'),

('ranjangaon', 'Ranjangaon', 'maharashtra',
  'Mahaganapati — the sun-aligned Astavinayak',
  'Mahaganapati Ganesha temple at Ranjangaon on the Pune-Ahmednagar highway, 50km from Pune. Engineered so that on Surya-Sankranti days the sun''s rays at sunrise enter the inner sanctum and fall directly on the deity. Largest of the eight Ashtavinayak idols, with 10 trunks and 20 hands in his hidden form (the visible idol is the simpler form). Believed to be where Shiva worshipped Ganesha before slaying the demon Tripurasura.',
  580, ARRAY['pilgrimage','temple-town','astavinayak','solar-alignment'], ARRAY['spiritual','ancient','engineering'], 'easy',
  ARRAY[10,11,12,1,2,3]::int[], ARRAY[5,6,7,8]::int[],
  ARRAY['pilgrimage','ganesha','astavinayak','temple-town','maharashtra','pune-district','solar-aligned'],
  'budget', 1, 1, 'good', true, 'shikrapur 15km',
  'none'::permit_type, ARRAY['marathi','hindi']::text[], 'A', 'destination');

-- Expand astavinayak-yatra collection: 1 anchor stop → 8 canonical stops.
-- The astavinayak-circuit unified dest stays in the destinations table as
-- the planning anchor; this collection no longer references it directly.
UPDATE collections
SET items = '[
  {"rank":1,"destination_id":"morgaon","note":"Mayureshwar — first AND last stop. Tortoise-shaped fort walls; Ganesha as Mor (peacock) slew the demon Sindhu here. 65km from Pune. Tradition requires returning here at the end to ''complete'' the yatra."},
  {"rank":2,"destination_id":"siddhatek","note":"Siddhivinayak — the only east-facing Astavinayak. Idol''s trunk turns right (uttara-vahini, harder to please). On a Bhima River island, 200km from Pune via Daund."},
  {"rank":3,"destination_id":"pali-raigad","note":"Ballaleshwar — the only Astavinayak named after a devotee, child Ballal whose bhakti caused the manifestation. East-facing stone temple (rebuilt 1760). 110km from Mumbai, 130km from Pune."},
  {"rank":4,"destination_id":"mahad-raigad","note":"Varadvinayak — Khopoli-area Mahad (distinct from the southern Mahad). The Nandadeep oil lamp has burned continuously since 1892. Idol discovered in an adjoining lake in 1690."},
  {"rank":5,"destination_id":"theur","note":"Chintamani — at the Bhima-Mula-Mutha river confluence, 25km east of Pune. Linked to Krishna recovering the Syamantaka jewel and to Peshwa-era patronage. Madhavrao Peshwa''s sati spot is here."},
  {"rank":6,"destination_id":"lenyadri","note":"Girijatmaj — the only Astavinayak inside a Buddhist rock-cut cave (Cave 7 of the 30 Lenyadri caves above Junnar, ~95km from Pune). 283 steps to climb. The only one where the deity faces north."},
  {"rank":7,"destination_id":"ozar","note":"Vighnahar — gold-plated shikhara funded by Bajirao Peshwa, on the Kukadi River bank in Junnar taluka. The deity''s eyes carry rubies; the forehead carries a real diamond."},
  {"rank":8,"destination_id":"ranjangaon","note":"Mahaganapati — sun-aligned: on Surya-Sankranti days the sunrise rays fall directly on the deity through engineered alignment. Largest idol of the eight. Where Shiva worshipped Ganesha before slaying Tripurasura. Pune-Ahmednagar highway, 50km from Pune."}
]'::jsonb,
strategy_intro = 'The Astavinayak Yatra is one of Maharashtra''s most popular regional pilgrimages — eight Ganesha temples whose idols are believed to have manifested on their own (swayambhu), as opposed to being installed by humans. The eight in canonical order: Mayureshwar at Morgaon (Pune district), Siddhivinayak at Siddhatek (Ahmednagar), Ballaleshwar at Pali (Raigad), Varadvinayak at Mahad (Raigad — Khopoli area), Chintamani at Theur (Pune), Girijatmaj at Lenyadri (Pune — inside Buddhist rock-cut caves), Vighnahar at Ozar (Pune) and Mahaganapati at Ranjangaon (Pune). Tradition requires returning to Mayureshwar at Morgaon to ''complete'' the yatra — making it a 9-stop loop in practice.'
WHERE id = 'astavinayak-yatra';
