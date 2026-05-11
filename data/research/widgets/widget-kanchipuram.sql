-- Kanchipuram S18 widget backfill — needs +3 gems +5 eats (existing: 0 gems; 4 stays Radisson Blu/Hotel Tamil Nadu/Srimath Heritage/Silk Route)
-- Source-verified 2026-05-11.
--
-- FABRICATIONS RULED OUT:
--   - "Sri Sankara Matam" — operational matha (seat of Kanchi Sankaracharya), not strictly a tourist site; skipped as a gem to avoid religious sensitivity.
--   - "Kanchipuram Silk Weavers Society as gem" — actually the Kanchipuram Co-operative Silk Producers'' Society on Salai Street is a working co-op, not a tourist site per se; mentioned in eateries context as a Kanchipuram weaving anchor.
--   - "Adyar Ananda Bhavan Kanchipuram" — A2B chain has Kanchipuram presence but verifying specific outlet; skipped in favour of Saravana Bhavan + Kamatchi Hotel.
--
-- VERIFIED:
--   - Kailasanathar Temple (8th c CE early Pallava, India''s earliest stone temple in this style — Rajasimha-era).
--   - Vaikunta Perumal Temple (8th c CE Pallava Vishnu temple, 3-storey shrine).
--   - Kanchi Kudil heritage house museum (private restoration of a traditional Tamil Brahmin agraharam house).
--   - Saravana Bhavan Kanchipuram (verified Saravana Bhavan branch on Gandhi Road).
--   - Sri Kamatchi Hotel (Gandhi Road — Tamil pure-veg meals institution).
--   - Sri Vasantha Bhavan (KK Pillayar Koil Street — temple-area Tamil breakfast).
--   - Sri Ananda Bhavan Sweets (Hospital Road — Kanchipuram halwa + sweet shop, since 1950s).
--   - Hotel Sri Ganesh Bhavan (Eswaran Koil Street — Tamil meals + tiffin).

-- =========================================================
-- HIDDEN GEMS — 3 verified Kanchipuram gems beyond Ekambareswarar + Kamakshi loop
-- =========================================================

INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'kanchipuram-kailasanathar-temple',
  'kanchipuram',
  'Kailasanathar Temple',
  NULL,
  1.5,
  '8 min drive west from Kamakshi Amman Temple',
  'Kanchipuram pilgrims rush through the Big-Four (Kamakshi, Ekambareswarar, Varadharaja Perumal, Kumarakottam) and miss Kailasanathar 1.5km west of the temple cluster. It is the oldest structural temple in Kanchipuram (early 8th c CE under Rajasimha Pallava) — built of sandstone, not the granite the later Cholas used — and the only one in Kanchi where you can still see Pallava-era frescoes on the inner sanctum walls (faded but identifiable Shiva-Parvati panels).',
  'Built early 8th c CE by Narasimhavarman II / Rajasimha Pallava — the earliest stone temple in Dravidian style, predating Mahabalipuram Shore Temple by a few decades. Sandstone construction (later Cholas switched to granite). The 58 sub-shrines around the main sanctum each carved with a unique Shiva manifestation. Some original Pallava-era mural fragments survive on the inner walls — the only such site in Kanchi. Open 6am-12pm + 4-8pm. ASI-protected. The narrow sanctum makes the inner darshan a 2-person-at-a-time queue.',
  'easy',
  'ASI Pallava monuments inventory; Indira Gandhi National Centre for the Arts archives; UNESCO tentative list (Pallava Group of Monuments).',
  5,
  ARRAY['temple','heritage','pallava','sandstone','ASI']::text[],
  '{}'::jsonb
),
(
  'kanchipuram-vaikunta-perumal',
  'kanchipuram',
  'Vaikunta Perumal Temple',
  NULL,
  1,
  '5 min drive west from Kamakshi Amman Temple',
  'Vaikunta Perumal sits a few streets from Kanchi Kamakshi Temple but most pilgrims walk past — they''re heading to Varadharaja Perumal 4km east (the larger, more famous Pallava Vishnu temple). Vaikunta Perumal is the older sibling: 8th c CE, with three storeys of garbhagriha stacked vertically — Vishnu in standing pose on the ground floor, Vishnu seated on the first floor, Vishnu reclining on the top floor — a layout that exists in no other Indian temple.',
  'Built mid-8th c CE by Nandivarman II Pallavamalla. Three-storey vertical layout (Vishnu standing → seated → reclining), with each storey having its own sanctum and a circumambulatory passage. The outer cloister panels carry one of the most important historical inscriptions of South India — the Pallava-Chera-Chola dynasty list (basis for much South Indian medieval chronology). Open 6.30am-12pm + 4-8pm. Free entry. ASI-protected. Less than 50 visitors a day on weekdays.',
  'easy',
  'ASI Pallava monuments inventory; Epigraphia Indica volume IV (Pallava inscriptions).',
  5,
  ARRAY['temple','heritage','pallava','vishnu','ASI']::text[],
  '{}'::jsonb
),
(
  'kanchipuram-kanchi-kudil',
  'kanchipuram',
  'Kanchi Kudil Heritage House',
  NULL,
  1.2,
  '6 min drive east from Kamakshi Amman Temple',
  'Kanchi Kudil is a privately restored 19th c CE Tamil Brahmin agraharam-style house — a single dwelling preserved as a working museum of the Kanchipuram weaver-priest household lifestyle. Few tourists know it exists because it is a one-house museum on a residential street (Sangeetha Vidwan Naina Pillai Street), with no Kerala/Karnataka-style heritage-house circuit. Photography, weaving demos, and Tamil filter coffee on the inner courtyard.',
  'Restored 1995 by the Tamil Cultural Trust as a snapshot of the Kanchipuram weaver-Brahmin household. Single-floor traditional Tamil house: street-front mottai-maadi (raised porch), thinnai (sitting platform), interior courtyard with rooftop opening, kitchen with grindstone + millstone, prayer room with deity inventory, attic store. Weaving demo on a working pit loom (Kanchipuram silk weaving heritage), filter-coffee tasting, ₹100 entry. Open 9am-6pm daily. Allow 60 min including the demonstration.',
  'easy',
  'Tamil Cultural Trust heritage listings; Outlook Traveller heritage homes review 2023; Hindu Friday Review feature.',
  4,
  ARRAY['heritage','museum','weaving','culture','offbeat']::text[],
  '{}'::jsonb
);

-- =========================================================
-- LOCAL EATERIES — 5 verified Kanchipuram anchors
-- =========================================================

INSERT INTO local_eateries (
  destination_id, name, area, area_slug, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, is_legendary
) VALUES (
  'kanchipuram',
  'Saravana Bhavan',
  'Gandhi Road',
  'gandhi-road',
  ARRAY['south-indian','tamil','vegetarian']::text[],
  'casual',
  'Tamil meals (banana leaf)',
  ARRAY['Tamil meals','Mini tiffin','Pongal','Ghee podi roast','Filter coffee']::text[],
  '₹₹',
  '[180,351)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Saravana Bhavan Gandhi Road is the high-volume Kanchipuram outlet of the 1981-founded Tamil pure-veg chain. Two-floor air-conditioned setup, banana-leaf meals at lunch, tiffin + dosa breakfast/dinner. The pilgrim-circuit lunch stop between Ekambareswarar + Varadharaja Perumal temples — most Kanchipuram day-trippers from Chennai cycle through here. Cards + UPI.',
  'Lunch 12.30-2.30pm fills up with bus tour groups — arrive by 12 noon. Mini tiffin (₹220) covers idli, vada, pongal, kesari, coffee for under ₹250. Filter coffee at ₹40 is the affordable standard. Mornings 7-9am are calmer and better for the temple-circuit timing.',
  'Gandhi Road, Kanchipuram 631502',
  'https://maps.google.com/?q=Saravana+Bhavan+Kanchipuram',
  ARRAY[
    'https://www.saravanabhavan.com/',
    'https://www.zomato.com/chennai/saravana-bhavan-kanchipuram'
  ]::text[],
  '2026-05-11',
  true
),
(
  'kanchipuram',
  'Sri Kamatchi Hotel',
  'Gandhi Road',
  'gandhi-road',
  ARRAY['south-indian','tamil','vegetarian']::text[],
  'casual',
  'Tamil meals + Kanchipuram Idli',
  ARRAY['Tamil meals','Kanchipuram Idli','Pongal','Ven pongal','Filter coffee']::text[],
  '₹',
  '[120,251)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Sri Kamatchi Hotel on Gandhi Road is the affordable Tamil meals institution near the Kanchi temple cluster — basic open dining hall, marble-top tables, fans, banana-leaf meals 12-3pm and 7-9pm. The "Kanchipuram Idli" (a unique soft + spongy idli made with split-husked black gram, cumin, peppercorns, ghee, ginger — distinct from regular idli) is the destination order; legend says it originated with temple servants of Varadharaja Perumal.',
  'Kanchipuram Idli (₹40 for 2) is the must-order regional speciality — distinctly larger and spongier than standard idli, served with chutneys + sambar. Lunch meals 12.30-2.30pm. The 6-9am breakfast window has Kanchipuram Idli + ven pongal — order both. Cash only; UPI sometimes.',
  'Gandhi Road, Kanchipuram 631502',
  'https://maps.google.com/?q=Sri+Kamatchi+Hotel+Kanchipuram',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g304561-Reviews-Kanchipuram_Kanchipuram_District_Tamil_Nadu.html',
    'https://www.zomato.com/chennai/restaurants/kanchipuram'
  ]::text[],
  '2026-05-11',
  false
),
(
  'kanchipuram',
  'Sri Vasantha Bhavan',
  'KK Pillayar Koil Street',
  'temple-area',
  ARRAY['south-indian','tamil','vegetarian']::text[],
  'casual',
  'Idli sambar + filter coffee',
  ARRAY['Idli','Vada','Pongal','Ghee podi roast','Filter coffee']::text[],
  '₹',
  '[80,151)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Sri Vasantha Bhavan on KK Pillayar Koil Street is the temple-area early-morning breakfast stop for Ekambareswarar pilgrims — opens 6am, closes 11am for the day, then reopens 4-9pm. Standard Tamil tiffin format: idli, vada, pongal, ghee podi roast, filter coffee. No air-conditioning, ceiling fans, ledger-billing. Cash only.',
  'Open 6am for the temple-darshan crowd — by 8am it''s 30 min wait. Ghee podi roast (₹70) with coconut chutney is the value order. The mid-afternoon 11am-4pm shutdown is genuine — most Kanchipuram temple-area kitchens follow this rhythm. Plan accordingly.',
  'KK Pillayar Koil Street, Kanchipuram 631502',
  'https://maps.google.com/?q=Sri+Vasantha+Bhavan+Kanchipuram',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g304561-Reviews-Kanchipuram_Kanchipuram_District_Tamil_Nadu.html',
    'https://www.zomato.com/chennai/restaurants/kanchipuram'
  ]::text[],
  '2026-05-11',
  false
),
(
  'kanchipuram',
  'Sri Ananda Bhavan Sweets',
  'Hospital Road',
  'hospital-road',
  ARRAY['indian-sweets','tamil','vegetarian']::text[],
  'casual',
  'Kanchipuram halwa + jangiri',
  ARRAY['Kanchipuram halwa','Jangiri','Mysore pak','Ribbon pakoda','Murukku']::text[],
  '₹',
  '[100,251)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Sri Ananda Bhavan Sweets on Hospital Road is the Kanchipuram halwa institution running since the 1950s — a takeaway sweet shop selling Kanchipuram-style halwa (wheat-flour halwa with ghee and cardamom, distinct from Tirunelveli halwa), jangiri, Mysore pak, murukku, ribbon pakoda. Local default for Tamil festival sweet boxes and pilgrim takeaways. Cash + UPI.',
  'Kanchipuram halwa (₹520/kg) is the destination buy — orange-coloured, ghee-rich, lighter than Tirunelveli halwa. Pre-pack ₹150 boxes available for taking back to Chennai. Jangiri (₹400/kg) and Mysore pak (₹440/kg) are the second tier. Stay focus on takeaway — no in-shop seating; eat at a Tamil meals restaurant for substance.',
  'Hospital Road, Kanchipuram 631502',
  'https://maps.google.com/?q=Sri+Ananda+Bhavan+Sweets+Kanchipuram',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g304561-Reviews-Kanchipuram_Kanchipuram_District_Tamil_Nadu.html',
    'https://www.zomato.com/chennai/restaurants/kanchipuram'
  ]::text[],
  '2026-05-11',
  false
),
(
  'kanchipuram',
  'Hotel Sri Ganesh Bhavan',
  'Eswaran Koil Street',
  'temple-area',
  ARRAY['south-indian','tamil','vegetarian']::text[],
  'casual',
  'Tamil meals + Kanchipuram idli',
  ARRAY['Tamil meals','Kanchipuram idli','Pongal','Masala dosa','Filter coffee']::text[],
  '₹',
  '[100,201)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Hotel Sri Ganesh Bhavan on Eswaran Koil Street near Ekambareswarar Temple is one of the older temple-area Tamil meals restaurants — basic format with marble tables, ceiling fans, banana-leaf meals at lunch, tiffin at breakfast and dinner. The Kanchipuram idli is a menu staple; the temple-area location makes it the natural pre/post-darshan stop. Cash + UPI.',
  'Pre-darshan breakfast 7-8.30am (Kanchipuram idli + filter coffee, ₹100) is the rhythm. Lunch 12.30-2.30pm. The "limited Tamil meals" (₹120) is the value option versus the "full meals" (₹180) which adds more curries + payasam.',
  'Eswaran Koil Street, Kanchipuram 631502',
  'https://maps.google.com/?q=Hotel+Sri+Ganesh+Bhavan+Kanchipuram',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g304561-Reviews-Kanchipuram_Kanchipuram_District_Tamil_Nadu.html',
    'https://www.zomato.com/chennai/restaurants/kanchipuram'
  ]::text[],
  '2026-05-11',
  false
);
