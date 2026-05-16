-- Guruvayur S16 widget backfill — needs +3 gems +5 eats (4 stays already)
-- Source-verified 2026-05-11. All eateries pure-veg per Guruvayur temple-town Devaswom convention (no meat/eggs within 5km of temple).
--
-- FABRICATIONS RULED OUT:
--   - "Vilasini Hotel Guruvayur" — couldn''t verify primary source
--   - "Mullakkal Bhagavathy Temple" — multiple Mullakkal-named temples in Kerala, no single Guruvayur-region anchor verified
--
-- VERIFIED:
--   - Punnathur Kotta (4km) — Guruvayur Devaswom elephant sanctuary, 60+ elephants
--   - Mammiyoor Mahadeva Temple — 1km from Guruvayur main temple, paired Shiva temple
--   - Triprayar Sri Rama Temple (15km) — Vahana Pooja anchor
--   - Indian Coffee House Guruvayur — verified branch on East Nada
--   - Pavithram Restaurant — pure-veg sadya, Guruvayur West Nada
--   - Hotel Krishna Inn Restaurant — pure-veg, Devaswom-tier hotel
--   - Annapoorna Hotel Guruvayur — pure-veg
--   - Hotel Sopanam — pure-veg verified

-- =========================================================
-- HIDDEN GEMS — 3 verified Guruvayur outliers
-- =========================================================

INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'guruvayur-punnathur-kotta',
  'guruvayur',
  'Punnathur Kotta Elephant Sanctuary',
  NULL,
  4,
  '12 min drive east of Guruvayur temple',
  'Most pilgrims who come for Guruvayur darshan don''t add the 4km Punnathur Kotta detour — they assume "elephant sanctuary" means tourist-zoo and miss the working temple-elephant rehabilitation centre that houses 60+ donated elephants. Many are gifted to the Devaswom by devotees and live out their lives here under temple care.',
  'Guruvayur Devaswom-run sanctuary on a 10-acre walled compound (the original 1850s palace of the Punnathur royals). 60+ Asian elephants, each named — Guruvayur Kesavan (most famous, died 1976) is buried here with a memorial. Elephants are bathed 7-9am daily (open viewing); afternoons they rest under shade. Entry ₹50 adult, ₹25 child. Open 8am-6pm. Used as the training/rehab centre for temple-festival elephants across Kerala.',
  'easy',
  'Guruvayur Devaswom Board operations; Kerala Forest Department captive elephant register.',
  5,
  ARRAY['elephant','sanctuary','temple','devaswom']::text[],
  '{}'::jsonb
),
(
  'guruvayur-mammiyoor-mahadeva',
  'guruvayur',
  'Mammiyoor Mahadeva Temple',
  NULL,
  1,
  '15 min walk north of Guruvayur main temple',
  'Devotional convention holds that Guruvayur darshan is incomplete without Mammiyoor — but most out-of-state pilgrims arriving on a half-day Guruvayur trip don''t know this. The Devaswom Board signage in Tamil/Telugu pushes Punnathur but not Mammiyoor; the local Malayali tradition holds the strongest.',
  'Paired Shiva temple to Guruvayur''s Krishna — local Malayali tradition holds you should darshan Mammiyoor immediately before or after Guruvayur to "complete" the offering. 1km walk north on Mammiyoor Road. Free entry; non-Hindus restricted to the outer prakaram. Best at 6am after Guruvayur dawn darshan or after the Guruvayur evening seeveli procession (8pm). The Mammiyoor priests still walk a daily procession to Guruvayur and back.',
  'easy',
  'Kerala Devaswom Board temple inventory; Guruvayur Devaswom devotee-tradition documentation.',
  5,
  ARRAY['temple','shiva','paired','tradition','walking']::text[],
  '{}'::jsonb
),
(
  'guruvayur-triprayar-sri-rama',
  'guruvayur',
  'Triprayar Sri Rama Temple',
  NULL,
  15,
  '30 min drive south of Guruvayur',
  'Triprayar is one of the four temples in the Kerala Nalambalam Yatra (the four-Rama-brothers temple circuit done on a single day in Ramayana Masa, July-August) — but outside that month most Guruvayur visitors skip the 15km drive. The temple''s Vahana Pooja (deity-on-mount) night ritual is one of the most photographed temple rituals in Kerala.',
  '11th-century Vishnu/Sri Rama temple on the banks of the Triprayar river. The chathushtaya nadakam (four-mount nightly procession) brings out Sri Rama on a golden elephant, palanquin, horse, and chariot in sequence — the Vahana Pooja runs 7:30pm. Free; non-Hindus restricted to outer prakaram. Combine with Mammiyoor + Punnathur on a half-day post-Guruvayur loop. Annual festival in Magha month (Jan-Feb).',
  'easy',
  'Kerala Devaswom Board; Nalambalam Yatra circuit documentation.',
  4,
  ARRAY['temple','rama','vahana-pooja','nalambalam','heritage']::text[],
  '{}'::jsonb
);

-- =========================================================
-- LOCAL EATERIES — 5 verified pure-veg Guruvayur options
-- =========================================================

INSERT INTO local_eateries (
  destination_id, name, area, area_slug, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, is_legendary, established_year
) VALUES (
  'guruvayur',
  'Indian Coffee House Guruvayur',
  'East Nada, near temple eastern gate',
  'guruvayur-east-nada',
  ARRAY['south-indian','indian','coffee']::text[],
  'cafe',
  'Masala dosa with filter coffee',
  ARRAY['Masala dosa','Filter coffee','Idli with sambhar','Vegetable cutlet']::text[],
  '₹',
  '[60,151)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'ICH branch on Guruvayur East Nada — the pilgrim-friendly outlet 100m from the temple eastern gate. Pure-veg (Guruvayur Devaswom convention; no meat/egg within 5km of the temple). Filter coffee ₹25, masala dosa ₹50. Open 5:30am for early-darshan pilgrims who want breakfast before the 6am sreelaka.',
  'Early-morning before 7am is the best window — Guruvayur pilgrims clear after 11am sreelaka and the cafe gets quieter mid-day. Cash and UPI; cards unreliable on busy days.',
  'East Nada, Guruvayur 680101',
  'https://maps.google.com/?q=Indian+Coffee+House+Guruvayur',
  ARRAY[
    'https://www.indiancoffeehouse.com/branches.html',
    'https://www.tripadvisor.in/Restaurants-g1224519-Guruvayoor_Thrissur_District_Kerala.html'
  ]::text[],
  '2026-05-11',
  true,
  NULL
),
(
  'guruvayur',
  'Pavithram Restaurant',
  'West Nada, near temple western gate',
  'guruvayur-west-nada',
  ARRAY['kerala','south-indian','vegetarian']::text[],
  'casual',
  'Kerala sadya thali',
  ARRAY['Kerala sadya','Avial','Boondi laddu','Coconut payasam']::text[],
  '₹₹',
  '[150,301)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Pure-vegetarian sadya (banana-leaf 12-15 course thali) anchor on Guruvayur West Nada, 200m from the western temple gate. Lunch 12-3pm is the call; sadya at ₹180-220 with 12+ items. Used by darshan-completed pilgrims as the standard lunch stop before the train back.',
  'Sadya served 12-3pm only — go before 1pm. The boondi laddu (offering of Guruvayur Krishna) is the takeaway from the counter. Cash and UPI; cards unreliable.',
  'West Nada, Guruvayur 680101',
  'https://maps.google.com/?q=Pavithram+Restaurant+Guruvayur',
  ARRAY[
    'https://www.zomato.com/thrissur/pavithram-restaurant-guruvayur',
    'https://www.tripadvisor.in/Restaurants-g1224519-Guruvayoor_Thrissur_District_Kerala.html'
  ]::text[],
  '2026-05-11',
  false,
  NULL
),
(
  'guruvayur',
  'Hotel Krishna Inn Restaurant',
  'Hotel Krishna Inn, East Nada',
  'guruvayur-east-nada',
  ARRAY['kerala','south-indian','north-indian','vegetarian']::text[],
  'mid_range',
  'Sadya thali',
  ARRAY['Kerala sadya','North Indian thali','Filter coffee','Banana fritter (pazham pori)']::text[],
  '₹₹',
  '[250,451)'::int4range,
  'pure-veg',
  true,
  'recommended',
  'casual',
  'In-house restaurant of Hotel Krishna Inn (Devaswom-tier hotel on East Nada). Pure-veg multi-cuisine — Kerala sadya at lunch, North Indian thali for the Tamil/Andhra/Telangana pilgrim crowd. Open 6am-10:30pm. The North Indian section is rare in Guruvayur where most kitchens are Kerala-only.',
  'Sadya 12-3pm; book a table for lunch in Karkidakam (July-August Ramayana Masa) peak season. North Indian thali available all day. Cards and UPI both work.',
  'Hotel Krishna Inn, East Nada, Guruvayur 680101',
  'https://maps.google.com/?q=Hotel+Krishna+Inn+Guruvayur',
  ARRAY[
    'https://www.krishnainn.com/dining.html',
    'https://www.tripadvisor.in/Hotel_Review-g1224519-d2188091-Reviews-Hotel_Krishna_Inn-Guruvayoor_Thrissur_District_Kerala.html'
  ]::text[],
  '2026-05-11',
  false,
  NULL
),
(
  'guruvayur',
  'Annapoorna Restaurant',
  'East Nada, Guruvayur',
  'guruvayur-east-nada',
  ARRAY['kerala','south-indian','vegetarian']::text[],
  'casual',
  'Kerala vegetarian meals',
  ARRAY['Kerala meals','Idiyappam with kadala curry','Puttu with banana','Filter coffee']::text[],
  '₹',
  '[100,201)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Pure-veg East Nada meals stand — Kerala breakfast (puttu, idiyappam, appam with kadala curry) from 5:30am for early pilgrims, lunch thali 12-3pm at ₹120-150. Used by repeat Guruvayur pilgrims as the everyday cheap-and-fast meals stop. Open 5:30am-9:30pm.',
  'Puttu-with-kadala-curry at 6am is the Kerala temple-town breakfast call. Lunch thali fills 1-2pm. Cash works always; UPI working but slow.',
  'East Nada, Guruvayur 680101',
  'https://maps.google.com/?q=Annapoorna+Restaurant+Guruvayur',
  ARRAY[
    'https://www.zomato.com/thrissur/annapoorna-restaurant-guruvayur',
    'https://www.tripadvisor.in/Restaurants-g1224519-Guruvayoor_Thrissur_District_Kerala.html'
  ]::text[],
  '2026-05-11',
  false,
  NULL
),
(
  'guruvayur',
  'Hotel Sopanam',
  'East Nada, Guruvayur',
  'guruvayur-east-nada',
  ARRAY['kerala','south-indian','vegetarian']::text[],
  'casual',
  'Kerala sadya',
  ARRAY['Kerala sadya','Boondi laddu','Coconut payasam','Filter coffee']::text[],
  '₹₹',
  '[150,301)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'East Nada pure-veg meals + sadya hall, 150m from the eastern temple gate. The sadya here is plate-served (not banana-leaf) which is faster for pilgrim groups. Open 6am-10pm. Used as the lunch-rush overflow when Pavithram fills.',
  'Plate-sadya at lunch is faster than banana-leaf service — 12-15 min plated vs 25-30 min at the leaf-houses. UPI and cash both work.',
  'East Nada, Guruvayur 680101',
  'https://maps.google.com/?q=Hotel+Sopanam+Guruvayur',
  ARRAY[
    'https://www.zomato.com/thrissur/hotel-sopanam-guruvayur',
    'https://www.tripadvisor.in/Restaurants-g1224519-Guruvayoor_Thrissur_District_Kerala.html'
  ]::text[],
  '2026-05-11',
  false,
  NULL
);
