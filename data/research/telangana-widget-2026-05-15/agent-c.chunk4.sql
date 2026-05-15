
INSERT INTO destination_stay_picks (
  destination_id, slot, name, property_type, price_band,
  signature_experience, why_nakshiq,
  sources, voice_flags, source, confidence
) VALUES (
  'ananthagiri-hills', 'value', 'Hotel Prabha',
  'Budget hotel',
  '₹1,500–₹2,800 per night',
  'Long-standing value-tier accommodation option in the Ananthagiri Hills area — small property with in-house restaurant serving multi-cuisine, popular with Hyderabad weekend bikers and day-trippers.',
  'Replaces fabricated "Srisailam Nature Homestay (Ananthagiri branch)" (Srisailam is in AP 400 km away — pure ghost listing). Hotel Prabha is the actual budget alternative when Haritha Valley View is full.',
  to_jsonb(ARRAY['https://onlinehyderabad.in/best-restaurants-in-anantagiri-hills/','https://www.tripadvisor.in/Restaurants-g6550658-Vikarabad_Vikarabad_District_Telangana.html']),
  to_jsonb(ARRAY['budget-tier','weekend-bikers','multi-cuisine-dining']),
  'web_search', 0.72
) ON CONFLICT (destination_id, slot) DO UPDATE SET
  name = EXCLUDED.name,
  property_type = EXCLUDED.property_type,
  price_band = EXCLUDED.price_band,
  signature_experience = EXCLUDED.signature_experience,
  why_nakshiq = EXCLUDED.why_nakshiq,
  sources = EXCLUDED.sources,
  voice_flags = EXCLUDED.voice_flags,
  source = EXCLUDED.source,
  confidence = EXCLUDED.confidence,
  refreshed_at = NOW();

INSERT INTO destination_stay_picks (
  destination_id, slot, name, property_type, price_band,
  signature_experience, why_nakshiq,
  sources, voice_flags, source, confidence
) VALUES (
  'ananthagiri-hills', 'xfactor', 'Infinite Adventure Club Ananthagiri Camps',
  'Adventure camp / glamping',
  '₹2,500–₹5,000 per night',
  'Tented/camping accommodation on the Ananthagiri Hills approach run by Infinite Adventure Club — the only camping/glamping experience in the area, with trekking, bonfire and bike-trail packages.',
  'Replaces fabricated "Spice Garden Treehouses (Ananthagiri)" (no Booking/Tripadvisor footprint — generic listicle ghost; the protected coffee-plantation belt has no built tree-houses). IAC is the real "outdoor xfactor" alternative.',
  to_jsonb(ARRAY['https://ananthagirihills.infiniteadventureclub.com/','https://www.google.co.in/travel/hotels/entity/ChkIo7bSl63W97xIGg0vZy8xMW13OGsyNThzEAE']),
  to_jsonb(ARRAY['glamping','adventure-club','bonfire','trekking']),
  'web_search', 0.70
) ON CONFLICT (destination_id, slot) DO UPDATE SET
  name = EXCLUDED.name,
  property_type = EXCLUDED.property_type,
  price_band = EXCLUDED.price_band,
  signature_experience = EXCLUDED.signature_experience,
  why_nakshiq = EXCLUDED.why_nakshiq,
  sources = EXCLUDED.sources,
  voice_flags = EXCLUDED.voice_flags,
  source = EXCLUDED.source,
  confidence = EXCLUDED.confidence,
  refreshed_at = NOW();

-- =====================================================
-- (5) SUMMARY
-- =====================================================
-- Per-dest count totals:
--   nagarjuna-konda    +3g +5e +2s-replace (location+xfactor upserts)
--   bhadrachalam       +3g +5e +0s   (3 existing stays Srinidhi+Kodali+V Homestays all VERIFIED real, no need to add)
--   alampur            +3g +3e +3s   (clean slate — Alampur is a small temple town; only 3 verifiable eateries: Haritha-Alampur in-house, temple annadanam, Haritha-Gadwal 26km fallback)
--   adilabad           +3g +3e +1s-replace (xfactor upsert; town has thin commerce — only 3 verifiable eateries)
--   ananthagiri-hills  +3g +5e +3s-replace (experience+value+xfactor all upserts)
--
-- Totals: 15 gems · 21 eats · 9 stays (6 upserts + 3 new) = 45 rows
--
-- HONEST-SCARCITY skips:
--   alampur eats 3/5 — Jogulamba Gadwal district HQ thin commerce. Beyond Haritha Alampur (often-shut), Jogulamba annadanam, and Haritha Gadwal (26 km), no other distinct verifiable Alampur-town eateries exist on Tripadvisor/Zomato. HS-confirmed.
--   adilabad eats 3/5 — Adilabad town is a transit point; only 3 distinct verifiable eateries (Hotel Surabhi Grand at Netaji Chowk, Hotel Panchavathi on Cinema Road, KAKAKU near Kuntala Falls). Beyond town the eateries cluster in Mancherial/Nirmal (other districts). HS-confirmed.
--   bhadrachalam stays 3/3 — existing Srinidhi Residency (Tripadvisor #1 B&B, 4.0/5), Kodali Homestays (Booking 9.2/10), V Homestays (first homestay in town, Booking + Agoda listed) ALL verified real, no replacements needed. Threshold already met.
--
-- Fabricated stays caught + replaced:
--   nagarjuna-konda/location  "Manakonda Resort"                    → Haritha Vijay Vihar (Manakonda is 130km Hyderabad suburb)
--   nagarjuna-konda/xfactor   "Srisailam Houseboats"                → Hotel Siddartha (Srisailam is 200km AP dam, NS has no houseboats)
--   adilabad/xfactor          "Nagarjunasagar Homestay (Hajipur)"   → Sterling Tipeshwar (Hajipur is Bihar 1500km; cross-state ghost)
--   ananthagiri-hills/exp     "Ananthagiri Hills Resort"            → Haritha Valley View (generic listicle name no footprint)
--   ananthagiri-hills/value   "Srisailam Nature Homestay (Ananthagiri branch)" → Hotel Prabha (Srisailam is 400km AP)
--   ananthagiri-hills/xfactor "Spice Garden Treehouses"             → Infinite Adventure Club Camps (no treehouses in coffee belt)
--
-- Verified factual catches:
--   - Buddhavanam opened Oct 8, 2022 (not pre-existing; many old guides say "under construction")
--   - Nelakondapalli stupa 54-ft H, 84-ft inner Ø (not 60ft)
--   - Sangameshwara Temple relocation 1979–1990 (11-year ASI project), original site Kudavelly 20km
--   - Papanasi cluster 23 temples spanning 6th c (Papanaseswara) to 9th–11th c (rest), salvaged post-1980
--   - Jogulamba is 5th of 18 Maha Shakti Peethas (NOT 18th), current shrine 2005-renovated, original destroyed 1390 by Bahmanis
--   - Kuntala Falls = 50m (state's tallest) ON Kadem river in Neredigonda mandal
--   - Pochera Falls = 20m plunge (state's deepest plunge, not tallest); 47km from Adilabad town
--   - Kawal declared Tiger Reserve Apr 2012 (not 1987 — that's Sivaram WLS)
--   - Ananthagiri Anantha-Padmanabha temple = 400+ years old per Skanda Purana / Rishi Markandeya tradition (NOT 8th c)
--   - PULASA FISH DROPPED from Alampur — Pulasa is exclusively Godavari (East Godavari AP); NOT Krishna river. Brief had it wrong; verification caught it.
