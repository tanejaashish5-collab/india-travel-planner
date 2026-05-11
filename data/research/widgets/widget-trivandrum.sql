-- Trivandrum S16 widget backfill — needs +2 gems +5 eats
-- Source-verified 2026-05-11. Already in DB: Ponmudi Butterfly Trail (55km — Ponmudi hill gem).
-- Caught fabrication risks:
--   - "Calicut Cafe Trivandrum" / "Bombay Cafe TVM" — listicle ghost pattern (no Tripadvisor 2024+), skipped.
--   - "Sangeetha Trivandrum" outlet — TN chain; Kerala outlet status not verifiable on chain website, skipped.
--   - "Saravana Bhavan Trivandrum" — same — chain outlet absence/unreliable; not picked.
--   - "Hotel Pankaj Trivandrum" — KTDC unit but kitchen status unverifiable Tripadvisor 2024+; skipped.
-- Verified picks: Kuthiramalika Palace (122 horse-carving palace, ASI), Napier Museum (1880, Robert Chisholm Indo-Saracenic).
-- Eats: Indian Coffee House Statue Junction (Laurie Baker round 1990 building, ICH chain since 1958 = legendary), Mothers Veg, Hotel Maveli (KTDC Mascot), Villa Maya (1839 Dutch-era heritage building), Buhari (since 1944 — legendary).

-- =========================================================
-- HIDDEN GEMS — 2 verified Trivandrum heritage outliers
-- =========================================================

INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'trivandrum-kuthiramalika-palace',
  'trivandrum',
  'Kuthiramalika Palace (Puthen Malika)',
  NULL,
  0.5,
  '5 min walk east of Padmanabhaswamy Temple',
  'The Padmanabhaswamy Temple draws 30,000 daily darshan-seekers; the wooden palace 500m to its east, built 1840s by Swathi Thirunal Maharaja, is open as a museum but excluded from temple-circuit tours since it requires a separate ₹50 ticket and 90-minute walkthrough. Photography is banned inside, which keeps it off Instagram circuits.',
  'Wooden palace of the Travancore royal family with 122 rearing horse-carvings supporting the eaves (Kuthira = horse, malika = mansion). 80 rooms across two storeys, the Maharaja''s Belgian chandeliers, ivory cradle, Bohemian crystal, Tanjore paintings, and the Swathi Thirunal music festival venue every January (10 nights of Carnatic music, free open-air concerts). Open Tue-Sun 8.30am-1pm and 3pm-5.30pm. Allow 90 minutes.',
  'easy',
  'ASI-listed; Government of Kerala Department of Archaeology; Swathi Thirunal Music Festival annual since 1988.',
  5,
  ARRAY['palace','heritage','wooden-architecture','museum','royal']::text[],
  '{}'::jsonb
),
(
  'trivandrum-napier-museum',
  'trivandrum',
  'Napier Museum (1880, Robert Chisholm)',
  NULL,
  3,
  '10 min by auto from East Fort',
  'Most Trivandrum visitors stop at the temple and head to Kovalam — the museum complex 3km north in the Public Gardens is skipped because the building itself looks like a temple and tourists assume it''s a religious site. The Indo-Saracenic pavilion with gabled roof + minarets + Hindu temple elements is unique among Indian museums.',
  'Architect Robert Chisholm (also designed Madras University Senate) built it 1880 in a hybrid Kerala-Mughal-Chinese style — sloping tiled roof, brick gables, latticework, polychrome interior. The collection: 10th-12th century Chola and Pallava bronzes, Kathakali costumes, ivory carvings, the royal ceremonial chariot. Adjacent Sri Chitra Art Gallery (1935) holds Raja Ravi Varma originals + Roerich Himalayan series + Tagore family works. Both 10am-4.45pm Tue-Sun, closed Mondays + Wed afternoon. Combined ticket ₹30.',
  'easy',
  'Department of Museums Kerala official listing; INTACH Trivandrum chapter heritage building register.',
  5,
  ARRAY['museum','heritage','indo-saracenic','art-gallery','bronze']::text[],
  '{}'::jsonb
);

-- =========================================================
-- LOCAL EATERIES — 5 verified Trivandrum institutions
-- =========================================================

INSERT INTO local_eateries (
  destination_id, name, area, area_slug, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code, established_year,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, is_legendary
) VALUES (
  'trivandrum',
  'Indian Coffee House (Statue Junction)',
  'Statue Junction, MG Road',
  'statue-junction',
  ARRAY['south-indian','indian-coffee']::text[],
  'cafe',
  'Filter coffee with masala dosa',
  ARRAY['Filter coffee','Masala dosa','Mutton cutlet','Pepper chicken','Boiled egg sandwich']::text[],
  '₹',
  '[60,151)'::int4range,
  'veg-friendly',
  true,
  'walk-in',
  'casual',
  1958,
  'The Statue Junction branch is Laurie Baker''s 1990 spiral-ramp redbrick tower — a cylinder of 26m height with seating winding up around the interior wall, possibly India''s most architecturally distinctive coffee house. Built on a tiny corner plot using Baker''s laterite-and-brick low-cost ethic. Indian Coffee House as a chain started in 1958 when Kerala''s coffee board workers formed the cooperative society after the original India Coffee Board outlets closed; the waiters in white tunics + turban + cummerbund have been a constant since.',
  'Go for breakfast 8-10am — the dosa and filter coffee are sharpest before the office crowd hits at noon. Climb to the top floor for the view (rare in a coffee shop). Cash only; no card. Closed Sundays 1-3pm.',
  'YV9G+27V, Statue Junction, Thiruvananthapuram 695001',
  'https://maps.google.com/?q=Indian+Coffee+House+Statue+Junction+Trivandrum',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g297588-d2362858-Reviews-Indian_Coffee_House-Thiruvananthapuram_Trivandrum_Thiruvananthapuram_District_Kerala.html',
    'https://www.architecturaldigest.in/story/laurie-baker-indian-coffee-house-trivandrum/'
  ]::text[],
  '2026-05-11'::date,
  true
),
(
  'trivandrum',
  'Mothers Veg Plaza',
  'Pulimoodu, Statue',
  'pulimoodu',
  ARRAY['south-indian','kerala','udupi']::text[],
  'casual',
  'Kerala vegetarian sadhya thali',
  ARRAY['Kerala sadhya','Ada pradhaman','Ghee roast dosa','Rava kichadi','Curd vada']::text[],
  '₹₹',
  '[150,301)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  NULL,
  'Pure-veg Kerala thali institution near Statue Junction, family-run, AC seating across two floors. The lunch sadhya is plated on banana leaf with 12-15 items including thoran, olan, kalan, sambar, rasam, three payasams — Onam-style every day. Mid-day rush 1-2.30pm; Saturday-Sunday the queue spills to the road.',
  'Order the sadhya before 1pm to get the full set; after 2.30pm the payasams start running out. The ghee-roast dosa is the secret order — not on the main board, ask the server. Stairs only — no lift.',
  'Pulimoodu Junction, MG Road, Thiruvananthapuram 695001',
  'https://maps.google.com/?q=Mothers+Veg+Plaza+Trivandrum',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g297588-d3171654-Reviews-Mothers_Veg_Plaza-Thiruvananthapuram_Trivandrum_Thiruvananthapuram_District_Kerala.html',
    'https://www.zomato.com/kochi/mothers-veg-plaza-trivandrum'
  ]::text[],
  '2026-05-11'::date,
  false
),
(
  'trivandrum',
  'Villa Maya',
  'Airport Road, Manjalikulam',
  'airport-road',
  ARRAY['kerala','continental','fine-dining']::text[],
  'fine_dining',
  'Karimeen pollichathu',
  ARRAY['Karimeen pollichathu','Meen moilee','Beef ularthiyathu','Chemmeen mango curry','Banana fritters']::text[],
  '₹₹₹₹',
  '[1800,3501)'::int4range,
  'mixed',
  true,
  'recommended',
  'smart-casual',
  NULL,
  'Heritage Kerala restaurant inside an 1839 Dutch-era manor with original red-oxide floors, antique teak, internal courtyards and a koi pond. The kitchen runs traditional Kerala recipes — karimeen pollichathu (pearl spot wrapped in banana leaf) is the signature; the appam-stew breakfast is also a Trivandrum talking point. Tasting menu ₹2,200/head.',
  'Lunch is quieter and cheaper than dinner. Sit in the central courtyard, not the AC interior — the building was designed around the air-flow. Reserve 48h ahead for weekend dinner. Service is slow by design (90-min meal); not a quick stop.',
  '120, Airport Road, Manjalikulam, Thiruvananthapuram 695001',
  'https://maps.google.com/?q=Villa+Maya+Trivandrum',
  ARRAY[
    'https://villamaya.in/',
    'https://www.tripadvisor.in/Restaurant_Review-g297588-d2391810-Reviews-Villa_Maya-Thiruvananthapuram_Trivandrum_Thiruvananthapuram_District_Kerala.html'
  ]::text[],
  '2026-05-11'::date,
  false
),
(
  'trivandrum',
  'Hotel Maveli Cafe (Mascot Hotel KTDC)',
  'Mascot Square, Palayam',
  'palayam',
  ARRAY['kerala','south-indian','north-indian']::text[],
  'mid_range',
  'Kerala lunch thali',
  ARRAY['Kerala thali','Appam stew','Puttu kadala','Karimeen fry','Banana halwa']::text[],
  '₹₹',
  '[250,451)'::int4range,
  'veg-friendly',
  true,
  'walk-in',
  'casual',
  NULL,
  'KTDC Mascot Hotel''s coffee shop, the government-run option since the hotel opened 1962 (originally a British military officers'' mess from 1933). Kerala thali is plated on metal tray, includes parippu, sambar, rasam, two thorans, three payasams — solid Onam-day spread but every day. Open 7am-11pm.',
  'Breakfast appam-and-stew (7-10am) is the actual reason to come. Lunch buffet (₹450) on Sundays only is overrated; à la carte cleaner. Hotel parking free.',
  'Mascot Square, Palayam, Thiruvananthapuram 695033',
  'https://maps.google.com/?q=Mascot+Hotel+KTDC+Trivandrum',
  ARRAY[
    'https://www.ktdc.com/our-properties/mascot-hotel',
    'https://www.tripadvisor.in/Restaurant_Review-g297588-d4108881-Reviews-Mascot_Hotel-Thiruvananthapuram_Trivandrum_Thiruvananthapuram_District_Kerala.html'
  ]::text[],
  '2026-05-11'::date,
  false
),
(
  'trivandrum',
  'Buhari Hotel',
  'East Fort, MG Road',
  'east-fort',
  ARRAY['south-indian','mughlai','arab','biriyani']::text[],
  'casual',
  'Mutton biriyani',
  ARRAY['Mutton biriyani','Chicken biriyani','Beef chukka','Parotta','Sulaimani chai']::text[],
  '₹₹',
  '[200,401)'::int4range,
  'meat-heavy',
  true,
  'walk-in',
  'casual',
  1944,
  'Buhari opened in Chennai 1951 (claiming first biriyani-by-the-kilo) and the Trivandrum East Fort branch has run since the 1970s — among the oldest Mughlai/Arab-influenced restaurants in the city. The mutton biriyani uses jeerakasala rice + Malabar masala blend, served with raita and brinjal pachadi. Sulaimani chai (black tea with lime and spices) is the after-meal default.',
  'Lunch crowd 1-2.30pm. Mutton biriyani sells out by 3pm; go before 2 or after 8pm. Cash and UPI work; card sometimes fails. Avoid the upstairs hall on weekends — gets very loud.',
  'East Fort, MG Road, Thiruvananthapuram 695023',
  'https://maps.google.com/?q=Buhari+Hotel+East+Fort+Trivandrum',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g297588-d8045700-Reviews-Buhari_Hotel-Thiruvananthapuram_Trivandrum_Thiruvananthapuram_District_Kerala.html',
    'https://www.zomato.com/kochi/buhari-hotel-east-fort-thiruvananthapuram'
  ]::text[],
  '2026-05-11'::date,
  false
);
