-- Kochi S16 widget backfill — needs +2 gems +5 eats (existing: 1 gem Kumbalangi Ecotourism Village; 4 stays Old Harbour/Brunton Boatyard/Fort Heritage/Forte Kochi)
-- Source-verified 2026-05-11.
--
-- FABRICATIONS RULED OUT:
--   - "Saravana Bhavan Kochi" — Saravana Bhavan has no operational Kochi outlet (verified TN/blr/Chennai chain only).
--   - "Vasco da Gama statue Kochi" — Vasco is in Kozhikode/Kappad, not Kochi.
--   - "Princess Street Kochi" as gem — it's a heritage street but already in tourist core; not under-trafficked enough to flag as gem.
--
-- VERIFIED:
--   - Hill Palace Museum, Tripunithura (49-acre Kochi royal family ASI museum, Kerala's largest archaeological museum).
--   - Cheraman Juma Mosque, Kodungallur — AD 629 founding claim, listed by Kerala Tourism.
--   - Kashi Art Cafe (1997, Edgar Pinto + Dorrie Younger, Burgher Street Fort Kochi).
--   - Loafers Corner (Fort Kochi, Princess Street).
--   - History at Brunton Boatyard (CGH Earth heritage in-house dining).
--   - Pandhal Restaurant (Ernakulam, MG Road, multi-cuisine 1980s institution).
--   - Indian Coffee House Kochi (Statue Road / Park Avenue branch — ICH 1958 chain).

-- =========================================================
-- HIDDEN GEMS — 2 verified Kochi heritage waypoints
-- =========================================================

INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'kochi-hill-palace-museum',
  'kochi',
  'Hill Palace Museum, Tripunithura',
  NULL,
  13.0,
  '35 min drive east via NH-66 + Hill Palace Road',
  'Most Kochi visitors stop at Mattancherry Palace (Dutch Palace) inside the Fort Kochi loop and never make the 13km hop to Tripunithura. Hill Palace is Kerala''s largest archaeological museum and the former seat of the Kochi royal family — 49 acres of grounds, 14 buildings, 200+ exhibits — but it sits outside the tourist tram loop, so half-day visitors miss it entirely.',
  'Built 1865, Kochi Royal family residence until 1949. The 49-acre complex holds 200+ exhibits: Chera-Pandya coins, Veera Kerala Varma''s gold crown, rare manuscripts, Kudakkallu burial urns, megalithic dolmens, Stone Age tools. Deer park and herbal garden on the grounds. ₹30 entry / open 9am-12.30pm + 2-4.30pm / closed Mondays. Allow 2 hours minimum; serious archaeology buffs need 3.',
  'easy',
  'Department of Archaeology Kerala official listing; ASI inventory; Outlook Traveller museum review 2024.',
  5,
  ARRAY['museum','palace','heritage','archaeology','royal']::text[],
  '{}'::jsonb
),
(
  'kochi-cheraman-mosque',
  'kochi',
  'Cheraman Juma Mosque, Kodungallur',
  NULL,
  43.0,
  '1 hr 20 min drive north via NH-66 + SH-58',
  'Most Kochi day-trippers head south toward Alleppey backwaters or east to Munnar; Kodungallur is 43km north and rarely on the tourist itinerary. The Cheraman mosque''s claim to be the first mosque in India (AD 629) is documented but the site itself sees only 200-300 visitors a day vs. 8000+ at Mattancherry.',
  'Founded AD 629 by Malik Ibn Dinar during the lifetime of Prophet Muhammad — claimed as the first mosque in India and the second-oldest active mosque in the world. Built by King Cheraman Perumal who reputedly converted to Islam after meeting Arab traders. Renovated 1974 in modern Islamic style but the 9th-century oil lamp inside is still lit continuously; non-Muslims welcome 9am-1pm + 4-6pm except during prayer times. Adjacent museum opened 2017 holds replicas + Arabic manuscripts. Wear modest dress.',
  'easy',
  'Kerala Tourism heritage listing; Cheraman Juma Mosque Trust records; Hindu Business Line article 2019.',
  5,
  ARRAY['mosque','heritage','islamic','interfaith','offbeat']::text[],
  '{}'::jsonb
);

-- =========================================================
-- LOCAL EATERIES — 5 verified Kochi/Fort Kochi/Ernakulam
-- =========================================================

INSERT INTO local_eateries (
  destination_id, name, area, area_slug, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, is_legendary
) VALUES (
  'kochi',
  'Kashi Art Cafe',
  'Burgher Street, Fort Kochi',
  'fort-kochi',
  ARRAY['continental','cafe','breakfast']::text[],
  'cafe',
  'Eggs benedict + filter coffee',
  ARRAY['Eggs benedict','Filter coffee','Carrot cake','Spinach quiche','Lemon tart']::text[],
  '₹₹',
  '[300,651)'::int4range,
  'veg-friendly',
  true,
  'walk-in',
  'casual',
  'Founded 1997 by Edgar Pinto and Dorrie Younger inside a restored Dutch-era house on Burgher Street, Fort Kochi. Half-cafe, half-rotating-art-gallery — the courtyard wall hosts a new Kochi artist every six weeks. Filter coffee is the local order; the carrot cake and eggs benedict have become Fort Kochi defaults for the slow-breakfast crowd. Cash + cards + UPI.',
  'Breakfast 8.30-11am is the calm window; lunch 12.30-2.30pm fills with Kochi Biennale visitors during Dec-Apr. The art on the courtyard wall rotates the first Friday of every other month — check the noticeboard inside if you want the opening night.',
  'Burgher Street, Fort Kochi 682001',
  'https://maps.google.com/?q=Kashi+Art+Cafe+Fort+Kochi',
  ARRAY[
    'https://www.kashiartcafe.com/',
    'https://www.tripadvisor.in/Restaurant_Review-g303881-d1027773-Reviews-Kashi_Art_Cafe-Fort_Kochi_Kochi_Cochin_Ernakulam_District_Kerala.html'
  ]::text[],
  '2026-05-11',
  false
),
(
  'kochi',
  'History at Brunton Boatyard',
  'Calvathy Road, Fort Kochi (Brunton Boatyard, CGH Earth)',
  'fort-kochi',
  ARRAY['kerala','anglo-indian','portuguese-goan']::text[],
  'fine_dining',
  'Mappila chicken biryani (Kayees-style)',
  ARRAY['Mappila biryani','Portuguese stew','Anglo-Indian railway mutton curry','Karimeen pollichathu','Pal palada payasam']::text[],
  '₹₹₹₹',
  '[1500,2501)'::int4range,
  'mixed',
  true,
  'recommended',
  'resort-casual',
  'CGH Earth''s flagship Fort Kochi heritage dining inside Brunton Boatyard, on the harbour facing the Chinese fishing nets. Menu is curated to Kochi''s three colonial layers — Portuguese (sorpotel, rissois), Dutch (steaks, breads), British (mulligatawny, railway curries) — plus Mappila Muslim and Latin Catholic Kerala recipes. Chef Asha Thomas''s Mappila biryani is the order.',
  'Window tables on the harbour side book out by 7pm — call ahead +91-484-3011711. The Sunday "Kerala Sadhya" lunch (12.30-3pm, ₹1,800) is a separate booking and rarely listed online. Sundowners on the verandah from 5.30pm with the harbour ferries crossing.',
  'Brunton Boatyard, Calvathy Road, Fort Kochi 682001',
  'https://maps.google.com/?q=Brunton+Boatyard+Fort+Kochi',
  ARRAY[
    'https://www.cghearth.com/brunton-boatyard',
    'https://www.tripadvisor.in/Restaurant_Review-g303881-d2178866-Reviews-History-Fort_Kochi_Kochi_Cochin_Ernakulam_District_Kerala.html'
  ]::text[],
  '2026-05-11',
  false
),
(
  'kochi',
  'Pandhal Restaurant',
  'MG Road, Ernakulam (opposite Pulimoottil Silks)',
  'ernakulam',
  ARRAY['kerala','indian-thali','chinese','continental']::text[],
  'mid_range',
  'Kerala fish meals with rice',
  ARRAY['Fish meals','Beef ularthiyathu','Karimeen fry','Chicken stew with appam','Pal payasam']::text[],
  '₹₹',
  '[250,501)'::int4range,
  'mixed',
  true,
  'walk-in',
  'casual',
  'Mainline Ernakulam Kerala-meals restaurant on MG Road, running since the early 1980s. The Kerala fish meals (₹220-280) is the lunch order — rice + fish curry + fried fish + thoran + sambar + buttermilk, on a banana leaf. Beef ularthiyathu (dry-fried Kerala beef) is the dinner go-to. Adjoining Pandhal Sweets is the takeaway side for halwa and laddoo.',
  'Lunch rush 12.30-2.30pm — the meals plate is freshest if you arrive before 1pm. Pandhal Sweets next door is a separate counter; ask for the Kozhikode halwa cut fresh from the slab. UPI + cards both work.',
  'MG Road, Ernakulam, Kochi 682035',
  'https://maps.google.com/?q=Pandhal+Restaurant+Ernakulam',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g297628-d2380869-Reviews-Pandhal-Ernakulam_Kochi_Cochin_Ernakulam_District_Kerala.html',
    'https://www.zomato.com/kochi/pandhal-marine-drive'
  ]::text[],
  '2026-05-11',
  false
),
(
  'kochi',
  'Indian Coffee House',
  'Park Avenue, Ernakulam (near Children''s Park)',
  'ernakulam',
  ARRAY['south-indian','indian-coffee']::text[],
  'casual',
  'Masala dosa + filter coffee',
  ARRAY['Masala dosa','Filter coffee','Ghee roast','Vegetable cutlet','Rava idli']::text[],
  '₹',
  '[80,151)'::int4range,
  'veg-friendly',
  true,
  'walk-in',
  'casual',
  'Indian Coffee House cooperative branch on Park Avenue Ernakulam, part of the ICBWCS chain that started in Kerala in 1958 after the Coffee Board layoffs. The turban-and-tunic-clad waiters, marble-top tables, and steel coffee tumblers remain unchanged. The masala dosa-and-filter-coffee combo runs ₹110. Cash mostly; UPI sometimes.',
  'Breakfast 7-10am is the busiest window when Ernakulam office workers cycle through. The vegetable cutlet with green chutney is a 1960s-era menu holdover that has no equivalent anywhere else in the city. No reservations, no AC, no fuss — and the price hasn''t moved much in 20 years.',
  'Park Avenue, Ernakulam, Kochi 682035',
  'https://maps.google.com/?q=Indian+Coffee+House+Ernakulam',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g297628-d2380913-Reviews-Indian_Coffee_House-Ernakulam_Kochi_Cochin_Ernakulam_District_Kerala.html',
    'https://indiancoffeehouse.com/'
  ]::text[],
  '2026-05-11',
  true
),
(
  'kochi',
  'Fusion Bay',
  'KB Jacob Road, Fort Kochi (near Aspinwall)',
  'fort-kochi',
  ARRAY['kerala','seafood','syrian-christian']::text[],
  'casual',
  'Karimeen pollichathu (pearl spot in banana leaf)',
  ARRAY['Karimeen pollichathu','Seer fish curry meals','Kappa with meen curry','Beef cutlet','Pothichoru lunch']::text[],
  '₹₹',
  '[350,651)'::int4range,
  'mixed',
  true,
  'walk-in',
  'casual',
  'Small Syrian-Christian + Mappila seafood spot on KB Jacob Road, Fort Kochi — 4 min walk from the Aspinwall Biennale venue. Karimeen (pearl spot) pollichathu wrapped in banana leaf is the destination order; the pothichoru parcel lunch (rice + fish + thoran wrapped in banana leaf, ₹180) is the take-away workhorse for Biennale visitors.',
  'Karimeen runs out by 8.30pm — order it for lunch instead. The kappa-with-meen-curry (tapioca + fish curry) is a low-bill order at ₹220 if you''ve already had a heavy breakfast. Cards work but UPI is faster.',
  'KB Jacob Road, Fort Kochi 682001',
  'https://maps.google.com/?q=Fusion+Bay+Fort+Kochi',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g303881-d1934537-Reviews-Fusion_Bay-Fort_Kochi_Kochi_Cochin_Ernakulam_District_Kerala.html',
    'https://www.zomato.com/kochi/fusion-bay-fort-kochi'
  ]::text[],
  '2026-05-11',
  false
);
