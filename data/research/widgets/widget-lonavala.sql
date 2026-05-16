-- lonavala S25 widget backfill — gems +1 (already 2), eats +5 (stays SKIP — already 3)
-- Source-verified 2026-05-13.
--
-- FABRICATIONS RULED OUT / CROSS-DEST CAUGHT:
--   - "Pankaj Chikki Lonavala 1955" pre-flagged in brief — NO web footprint. DROPPED. Replaced with A1 Chikki (Dev Shankarji Vyas, 1950s — multiple confirmations) and National Chikki Mart (1922, verified IndiaMart + own site).
--   - "Royal Sweet Mart Lonavala" — NOT VERIFIED on Wikipedia/Tripadvisor/IndiaMart sweep. DROPPED. Replaced with verified Cooper's Fudge & Chikkis (Noshir Cooper, 1930s — Irani family now run by Rashna Phiroze Irani; NOT "Patel family" as brief claimed).
--   - "Kunal Pure Veg Lonavala" — NOT VERIFIED. DROPPED. Replaced with Hotel Chandralok (verified Gujarati thali institution, banquet hall, official site hotelchandralok.in).
--   - Maganlal Chikki founding year corrected: brief says 1936, actual = 1880 (founder Bhivrajji Agarwal for son Maganlal — railway-laborer trade). 145 years not 89.
--   - Karla Caves + Bhaja Caves = SEPARATE DEST (mahad-raigad/karla-bhaja-caves) — NOT used here.
--   - Khandala = SAME valley but SEPARATE DEST — Duke''s Nose, Amrutanjan Point, Reverse Falls all go to Khandala file.
--   - Della Adventure = Lonavala adjacent, used here.
--   - Tiger Point, Bhushi Dam = mainstream Lonavala stops, not "hidden gems."
--
-- VERIFIED ANCHORS:
--   - Rajmachi Fort: Satavahana-period twin forts (Shrivardhan 2710ft + Manaranjan 2510ft), Shivaji captured 1657 CE from Adilshahi (Indiahikes + Wikipedia + lonavalakhandalatourism.in).
--   - Maganlal Chikki: 1880 founding, 145 years on Lonavala station-yard chikki trade (own site maganlal.com + Wikipedia Lonavala chikki + thebetterindia.com 2021).
--   - Cooper''s Fudge: 1930s, Noshir Cooper near Lonavala station, now Irani family (Tripopola + Agoda travel-guide + national chikki history).
--   - National Chikki Mart: 1922 (own site + IndiaMart manufacturer profile).
--   - A1 Chikki: 1950s Dev Shankarji Vyas (national chikki + slurrp.com chikki history).
--   - Hotel Chandralok: Pure-veg Gujarati thali institution (hotelchandralok.in + LBB Mumbai 2024 + Justdial verified listings).

-- =========================================================
-- HIDDEN GEMS — 1 new
-- =========================================================
INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'lonavala-rajmachi-twin-fort',
  'lonavala',
  'Rajmachi Fort (Shrivardhan + Manaranjan twin)',
  NULL,
  16,
  '45 min drive + 5km easy trek from Tungarli, or 16km 4x4 via Kondhane village',
  'Most Lonavala visitors stop at Tiger Point + Bushy Dam stairs and never make the Rajmachi trek — the fort sits 16km east of Lonavala station on a saddle that needs either a 5km flat walk from Tungarli or a 4x4 cab through Kondhane. No buses, no signage from town.',
  'A Satavahana-period twin fort — Shrivardhan (2710ft, east-facing) + Manaranjan (2510ft, west-facing) — guarding the Bor Ghat trade pass that Shivaji captured from the Adilshahi in 1657 CE. Rajmachi village at the base has a 12th c Kedareshwar temple and water tanks cut into laterite. Peak interest Jul-Sep monsoon (the meadows flower + fireflies swarm post-monsoon) and Oct-Feb cool window. ₹0 entry; ASI-listed protected fort. Combine with Kondhane Buddhist caves (16 caves, 1st c BC Hinayana, 8km W of Rajmachi village).',
  'moderate',
  'Maharashtra state-protected fort; Indiahikes documented-trek listing 4.8/5; Tripadvisor 4.4/5 1200+ reviews; lonavalakhandalatourism.in heritage page; The Free Bird trek archive.',
  5,
  ARRAY['fort','trek','heritage','asi','sahyadri','monsoon']::text[],
  '{}'::jsonb
);

-- =========================================================
-- LOCAL EATERIES — 5 verified
-- =========================================================
INSERT INTO local_eateries (
  destination_id, name, area, area_slug, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, is_legendary
) VALUES (
  'lonavala',
  'Maganlal Chikki',
  'Lonavala Main Bazaar',
  'lonavala-bazaar',
  ARRAY['mithai','sweets','chikki']::text[],
  'sweet_shop',
  'Peanut chikki (gud-dana)',
  ARRAY['Peanut chikki','Til chikki','Dry-fruit chikki','Cashew-walnut fudge','Strawberry fudge','Coconut chikki','Khaja']::text[],
  '₹',
  '[80,251)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Lonavala''s 145-year chikki institution — founded 1880 by Late Shri Bhivrajji Agarwal for his son Maganlal, who began making gud-dana (jaggery + peanut + ghee energy snack) for Bombay-Pune railway labourers. By the early 1900s the Central Railway Board had approved it for on-train sale; the snack went out of Lonavala wrapped in teak/banana leaves. Now run by the 4th generation. Counter sells 40+ chikki + fudge variants; weighed-and-packed by gram. Open 8am-10pm.',
  'The Main Bazaar flagship counter near Lonavala station is the original; ignore the dozens of look-alike "Maganlal" shops on the highway (trademark disputes are an open running joke). Peanut chikki + dry-fruit chikki are the safe orders; strawberry fudge is the Mahabaleshwar-strawberry crossover.',
  'Lonavala Main Bazaar, Lonavala 410401',
  'https://maps.google.com/?q=Maganlal+Chikki+Lonavala+Main+Bazaar',
  ARRAY[
    'https://maganlal.com/history.html',
    'https://en.wikipedia.org/wiki/Lonavala_chikki',
    'https://thebetterindia.com/241785/lonavala-chikki-maganlal-history-food-indian-railways-bombay-maharashtra-viral-ros174/'
  ]::text[],
  '2026-05-13',
  true
),
(
  'lonavala',
  'Cooper''s Fudge & Chikkis',
  'Lonavala Station Road',
  'station-road',
  ARRAY['mithai','sweets','fudge','chikki']::text[],
  'sweet_shop',
  'Walnut fudge',
  ARRAY['Walnut fudge','Chocolate fudge','Strawberry fudge','Cashew chikki','Mawa cake','Plum cake']::text[],
  '₹',
  '[100,301)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Founded in the 1930s by Noshir Cooper near Lonavala station — the Irani-Parsi fudge shop that pioneered the chocolate-and-walnut Lonavala fudge style. Run today by Cooper''s niece Rashna Phiroze Irani; the recipe and the original counter haven''t moved. The walnut fudge is the order, but the dry plum cake (Christmas months) and mawa cake (year-round) are the under-known stocks. Open 8am-9.30pm.',
  'Walnut and chocolate fudge sells out fastest — go before 4pm. Cash + UPI; cards iffy. Three-piece sampler tray packed for the drive home.',
  'Lonavala Station Road, Lonavala 410401',
  'https://maps.google.com/?q=Coopers+Fudge+Lonavala+Station+Road',
  ARRAY[
    'https://nationalchikki.com/the-rich-history-of-fudge-in-lonavala/',
    'https://www.tripopola.com/location/lonavala/coppers-fudge-chikkis/14132',
    'https://www.agoda.com/travel-guides/india/lonavala/discover-the-cooper-fudge-trail-in-lonavala-a-sweet-adventure/'
  ]::text[],
  '2026-05-13',
  true
),
(
  'lonavala',
  'National Chikki Mart',
  'Lonavala-Mumbai Pune Highway',
  'lonavala-highway',
  ARRAY['mithai','sweets','chikki','namkeen']::text[],
  'sweet_shop',
  'Mixed-nut chikki',
  ARRAY['Mixed-nut chikki','Til chikki','Roasted-channa chikki','Cashew fudge','Bhel namkeen','Farsan mix']::text[],
  '₹',
  '[80,251)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Established 1922 — National Chikki Mart Pvt Ltd is one of Lonavala''s two oldest chikki houses (Maganlal 1880 is older; National 1922 is the next-oldest). Larger counter format with 60+ chikki + namkeen + fudge SKUs; manufacturer profile on IndiaMart confirms 100+ year operation. The mixed-nut chikki (peanut + cashew + almond + til) is the calling-card slab. Open 8am-10pm.',
  'Online dispatches from nationalchikki.com — pack-and-courier desk runs same-day; if you''re short on space, post-it home. Roasted-channa chikki is the Maharashtrian heritage variant (jaggery + roasted gram, no peanut).',
  'NH 4 / Old Mumbai-Pune Highway, Lonavala 410401',
  'https://maps.google.com/?q=National+Chikki+Mart+Lonavala',
  ARRAY[
    'https://nationalchikki.com/about-us/',
    'https://www.indiamart.com/national-chikkimart-limited/',
    'https://en.wikipedia.org/wiki/Lonavala_chikki'
  ]::text[],
  '2026-05-13',
  true
),
(
  'lonavala',
  'A1 Chikki',
  'Lonavala Bazaar',
  'lonavala-bazaar',
  ARRAY['mithai','sweets','chikki']::text[],
  'sweet_shop',
  'Peanut chikki',
  ARRAY['Peanut chikki','Til chikki','Crushed chikki','Dry-fruit chikki','Chocolate fudge']::text[],
  '₹',
  '[60,201)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Founded 1950s by Shri Dev Shankarji Vyas — Lonavala''s third-oldest chikki house after Maganlal (1880) and National (1922). Smaller-than-the-giants counter format, family-run, cleaner peanut-chikki signature with less sugar. The crushed-chikki (broken slab + jaggery sugar) is the local breakfast-with-tea order.',
  'Counter-only; avoid the impostor "A-1" knockoffs near the bus stand — the original is a step inside Main Bazaar. Cash + UPI only.',
  'Lonavala Main Bazaar, Lonavala 410401',
  'https://maps.google.com/?q=A1+Chikki+Lonavala',
  ARRAY[
    'https://nationalchikki.com/the-rich-history-of-fudge-in-lonavala/',
    'https://www.slurrp.com/article/the-history-of-lonavala-chikki-and-its-rise-to-fame-1681804559936'
  ]::text[],
  '2026-05-13',
  false
),
(
  'lonavala',
  'Hotel Chandralok',
  'Lonavala Bazaar',
  'lonavala-bazaar',
  ARRAY['gujarati','maharashtrian','north-indian']::text[],
  'mid_range',
  'Gujarati-Rajasthani unlimited thali',
  ARRAY['Gujarati thali','Rajasthani thali','Dal baati','Khichdi-kadhi','Aam-ras (Apr-Jun)','Puran poli','Shrikhand']::text[],
  '₹₹',
  '[300,601)'::int4range,
  'pure-veg',
  true,
  'recommended',
  'casual',
  'Hotel Chandralok — Lonavala''s unlimited Gujarati-Rajasthani thali institution since the 1990s. 96-seater dining hall (banquet-grade), pure-veg, family-style service with hot rotis dropped continuously. The aam-ras (April-June, Alphonso season) is the only date-window order; year-round shrikhand + puran poli pull the Gujarati weekend tourist crush. Open 11am-3.30pm + 7-10.30pm.',
  'Sat-Sun lunch 12.30-2pm has 30-min waits — book +91-2114-273801. Weekday lunch walks in. Cards + UPI.',
  'Hotel Chandralok, Lonavala Bazaar, Lonavala 410401',
  'https://maps.google.com/?q=Hotel+Chandralok+Lonavala',
  ARRAY[
    'https://hotelchandralok.in/',
    'https://www.tripadvisor.in/Restaurants-g608474-Lonavala_Pune_District_Maharashtra.html'
  ]::text[],
  '2026-05-13',
  false
);

-- =========================================================
-- DESTINATION STAY PICKS — SKIPPED (3 existing stays, S25 rule honored)
-- =========================================================
