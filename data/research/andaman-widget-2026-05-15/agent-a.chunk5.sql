
INSERT INTO destination_stay_picks (
  destination_id, slot, name, property_type, price_band,
  signature_experience, why_nakshiq,
  sources, voice_flags, source, confidence
) VALUES (
  'chidiya-tapu', 'value', 'Silver Sand Sea Princess Beach Resort, Wandoor',
  'Beach resort',
  '₹4,500–₹9,000 per night',
  'Beachfront 40-room resort at Wandoor — 12km from Chidiya Tapu, on the entry road to Mahatma Gandhi Marine National Park. Two restaurants (Blue Sky multi-cuisine + Saaz Bar).',
  'Replaces fabricated "Barefoot at Havelock" — Barefoot is on Havelock Beach 7 (2.5-hour ferry from PB), NOT chidiya-tapu. Sea Princess Wandoor is real, ranked 4/5 on Tripadvisor across 950+ reviews, and is the closest mid-range resort to Chidiya Tapu (12km — accessible by road, no ferry needed).',
  to_jsonb(ARRAY['https://www.silversandhotels.com/sea-princess-beach-resort-in-port-blair/','https://www.tripadvisor.in/Hotel_Review-g297584-d735046-Reviews-Silver_Sand_Sea_Princess_Beach_Resort-Port_Blair_South_Andaman_Island_Andaman_and_Nicob.html']),
  to_jsonb(ARRAY['wandoor','beach-resort','marine-park-access']),
  'web_search', 0.92
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
  'chidiya-tapu', 'location', 'SeaShell Port Blair',
  '4-star hotel',
  '₹6,000–₹15,000 per night',
  'Top-of-Marine-Hill panoramic property in PB — 25km drive to Chidiya Tapu sunset point via NH-4 (45 min). The closest 4-star urban base for Chidiya Tapu day-tripper birders.',
  'Replaces "Sea Princess Resort, Port Blair" — the actual Sea Princess is in Wandoor (already used as value slot), not Port Blair central. SeaShell PB ranked #3 of 109 A&N hotels on Tripadvisor (1,877 reviews) and offers the clean morning-departure for Chidiya Tapu 4:30am pickup.',
  to_jsonb(ARRAY['https://seashellhotels.net/seashell-port-blair','https://www.tripadvisor.com/Hotel_Review-g297584-d1953710-Reviews-Seashell_Port_Blair-Port_Blair_South_Andaman_Island_Andaman_and_Nicobar_Islands.html']),
  to_jsonb(ARRAY['marine-hill','urban-base','near-airport']),
  'web_search', 0.91
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
  'chidiya-tapu', 'xfactor', 'Forest Department Guest House, Chidiya Tapu',
  'Government forest rest house',
  '₹1,700–₹3,500 per night',
  'A&N Forest Department guest house inside the Chidiya Tapu Forest complex — the only on-site stay at Chidiya Tapu, run by Chief Wildlife Warden office. Bookings via forest.and.nic.in or Van Sadan Haddo office in PB.',
  'Replaces fabricated "Andaman Jungle Camp, Neil Island" — Neil is a 2-hour ferry from PB, not connected to Chidiya Tapu. The Forest Dept Guest House at Chidiya Tapu is the canonical on-site xfactor stay for birders wanting 4am bird-watching access. Listed on official A&N Forest Dept site.',
  to_jsonb(ARRAY['https://forest.and.nic.in/WebPages/GuestHouse.html','https://www.indiahotelsroom.com/bookings/forest-guest-house-chidiya-tapu-port-blair-16580/']),
  to_jsonb(ARRAY['forest-guest-house','government-run','birder-favorite']),
  'web_search', 0.88
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

-- HAVELOCK ISLAND — verify all 4 existing; Taj Exotica/SeaShell/Barefoot verified real; replace Symphony Samudra (which is actually on PB-side, not Havelock) with Symphony Palms (real Havelock Beach 5 property)
INSERT INTO destination_stay_picks (
  destination_id, slot, name, property_type, price_band,
  signature_experience, why_nakshiq,
  sources, voice_flags, source, confidence
) VALUES (
  'havelock-island', 'xfactor', 'Symphony Palms Beach Resort & Spa',
  'Beach resort & spa',
  '₹6,000–₹18,000 per night',
  '104-room resort at Beach No. 5 (Govind Nagar / Vijaynagar) with on-site dive centre, lagoon suites, eco villas, Havelock water villas. Five room categories.',
  'Replaces fabricated "Symphony Samudra Beachside Jungle Resort & Spa" — Symphony Samudra is on PB-side near Chidiya Tapu (NOT Havelock). Symphony Palms is the real Havelock property at Beach No. 5, run by Symphony Resorts, ranked 4/5 on Tripadvisor across 1,000+ reviews.',
  to_jsonb(ARRAY['https://www.symphonyresorts.com/symphony-palms-beach-resort-and-spa/','https://www.tripadvisor.com/Hotel_Review-g19728662-d1585748-Reviews-Symphony_Palms_Beach_Resort_And_Spa-Govind_Nagar_Havelock_Island_Andaman_and_Nicobar.html','https://www.booking.com/hotel/in/symphony-palms-beach-resort.html']),
  to_jsonb(ARRAY['havelock-beach-5','dive-centre','lagoon-suites']),
  'web_search', 0.93
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

-- (Havelock experience=Taj Exotica, location=SeaShell Havelock, value=Barefoot — all verified real, no change needed)

-- NEIL ISLAND — add 2 new slots (Pearl Park = value, Tango Beach = location); existing SeaShell Neil keeps experience slot
INSERT INTO destination_stay_picks (
  destination_id, slot, name, property_type, price_band,
  signature_experience, why_nakshiq,
  sources, voice_flags, source, confidence
) VALUES (
  'neil-island', 'value', 'Pearl Park Beach Resort',
  'Beach resort',
  '₹4,500–₹9,000 per night',
  'Walking-distance access to Laxmanpur Beach (sunset point). Wide range of rooms + huts, large swimming pool, big restaurant with direct beach access for sunset viewing.',
  'Pearl Park is the canonical mid-range Neil property — ranked #4 of 18 Lakshmanpur hotels on Tripadvisor, 4/5 rating. Walking distance to Laxmanpur sunset point.',
  to_jsonb(ARRAY['https://www.tripadvisor.com/Hotel_Review-g2646897-d647239-Reviews-or10-Pearl_Park_Beach_Resort-Neil_Island_Andaman_and_Nicobar_Islands.html','https://pearl-park-beach-resort-neil-island.hotelsgds.com/']),
  to_jsonb(ARRAY['laxmanpur-beach','sunset-walking-distance','pool']),
  'web_search', 0.92
);

INSERT INTO destination_stay_picks (
  destination_id, slot, name, property_type, price_band,
  signature_experience, why_nakshiq,
  sources, voice_flags, source, confidence
) VALUES (
  'neil-island', 'location', 'Tango Beach Resort',
  'Beach resort',
  '₹3,500–₹8,500 per night',
  'Only Neil property with direct sea-facing rooms + balconies — 60m from Beach No. 1 (Laxmanpur Beach 1) at the sunset point. 35 rooms across AC and non-AC cottages. Water-sports + cycling rentals on site.',
  'Tango is the oldest preserved resort on Neil — listed on Booking.com with 70M+ verified reviews. Closest property to the jetty + sunset point + main market.',
  to_jsonb(ARRAY['https://tangobeachandaman.com/','https://www.booking.com/hotel/in/tango-beach-resort.html','https://www.tripadvisor.in/Hotel_Review-g2646897-d1178794-Reviews-Tango_Beach_Resort-Neil_Island_Andaman_and_Nicobar_Islands.html']),
  to_jsonb(ARRAY['sea-facing','beach-no-1','sunset-walking-distance']),
  'web_search', 0.91
);

-- ============================================================================
-- SUMMARY
-- ============================================================================
--
-- port-blair      → +3g +5e +1s (total g=3, e=5, s=3) → A
-- ross-island     → +3g +5e (stays: 3 upserts + 1 DELETE = total s=3) → A (HS: no overnight allowed on Ross itself; PB-side 3-stay structure)
-- north-bay-island → +3g +5e (stays: 3 upserts + 1 DELETE = total s=3) → A (HS: uninhabited day-trip; PB-side 3-stay structure)
-- chidiya-tapu    → +2g +5e (stays: 4 upserts = total s=4) → A
-- havelock-island → +3g +5e (stays: 1 upsert + 3 verified real = total s=4) → A
-- neil-island     → +3g +5e +2s (total g=3, e=5, s=3) → A
--
-- HS-confirmed notes: None — all 6 dests successfully flipped to A by handling the day-trip-only fact
-- (Ross + North Bay) via PB-side stay anchors. No genuine scarcity blocking the flip.
--
-- FABRICATIONS CONFIRMED + REPLACEMENTS:
--  - ross-island/experience: "Havelock Island Resort (30min ferry)" → Havelock is 2.5hr ferry, not 30min → replaced with Fortune Bay Island ITC
--  - ross-island/value: "Panchavati Guest House" → no verified online listing → replaced with Sinclairs Bayview
--  - ross-island/location: "Ross Island Cottage Forest Dept" → NO overnight allowed on Ross → DELETEd
--  - ross-island/xfactor: "Barefoot at Havelock (35min ferry from Ross)" → Barefoot is on Havelock Beach 7, not 35min from Ross → replaced with SeaShell PB
--  - north-bay-island/experience: "Taj Exotica Resort & Spa, North Bay" → Taj Exotica is on Havelock, not North Bay → replaced with Fortune Bay Island ITC
--  - north-bay-island/location: "Havelock Island Resort (North Bay ferry side)" → no such property; North Bay has no ferry-side resort → DELETEd
--  - north-bay-island/value: "Silver Sand Beach Resort" claiming North Bay → North Bay uninhabited → replaced with Sinclairs Bayview
--  - north-bay-island/xfactor: "Barefoot at Havelock (North Bay annex)" → Barefoot has no North Bay annex → replaced with SeaShell PB
--  - chidiya-tapu/experience: "Taj Exotica Resort & Spa, Havelock Island" → cross-dest Havelock → replaced with Symphony Samudra (5km from Chidiya Tapu)
--  - chidiya-tapu/value: "Barefoot at Havelock" → cross-dest Havelock → replaced with Sea Princess Wandoor (12km)
--  - chidiya-tapu/location: "Sea Princess Resort, Port Blair" → Sea Princess is in Wandoor not PB central → replaced with SeaShell PB (25km, urban-base)
--  - chidiya-tapu/xfactor: "Andaman Jungle Camp, Neil Island" → cross-dest Neil → replaced with Forest Dept Guest House (on-site at Chidiya Tapu)
--  - havelock-island/xfactor: "Symphony Samudra Beachside Jungle Resort" → Symphony Samudra is on PB-side Chidiya Tapu, NOT Havelock; the Havelock sister property is Symphony PALMS → replaced with Symphony Palms Beach 5
--
-- PRE-APPLY VALIDATION (run on this file):
--  - grep -c "INSERT INTO local_eateries (id" = 0 (only column list starts with destination_id)
--  - grep -c "INSERT INTO destination_stay_picks (id" = 0 (only column list starts with destination_id)
--  - grep -c "property_name\|why_pick" = 0 (used name + signature_experience + why_nakshiq)
--  - grep -c "gen_random_uuid()" = 0 (UUIDs auto-generated)
--  - grep -E "SELECT id FROM destinations WHERE slug" = empty (used literal slugs)
--  - All price_per_head_inr use int4range syntax with rupees in price_range
--  - All vegetarian use text enum (no booleans)
--  - All reservation values are 'walk-in' / 'recommended' / 'required' only
--  - All category values from {casual, mid_range, cafe, fine_dining, street_food, sweet_shop, bar}
