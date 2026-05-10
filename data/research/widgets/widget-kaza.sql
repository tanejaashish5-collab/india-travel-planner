-- Kaza widget backfill — needs +3 stays (target 4 to fill all slots; existing 0)
-- Source-verified 2026-05-10. Caught fabrications: "Hotel Snowmount" not in any Kaza listing. "Yarab Tso" is in Leh/Nubra (120km north of Leh), NOT Spiti — wrong-state contamination. "Hotel Spiti Heritage Home" not verified. Skipped all.
-- Verified picks below: Sakya Abode (first hotel in Spiti, family-run since 1990s, Tripadvisor #1-3), Spiti Sarai (8km Rangrik, Ramesh Lotey), Hotel Deyzor (10-room boutique, Travelers Choice 2017-2023), Norling Homestay Kibber (8km from Kaza, 4080m village).

INSERT INTO destination_stay_picks (
  destination_id, slot, name, property_type, price_band,
  why_nakshiq, source, confidence, published, sources
) VALUES (
  'kaza',
  'experience',
  'Hotel Deyzor',
  'boutique-hotel',
  '₹4,500–₹7,000 per night (May-Oct)',
  'Ten-room owner-built property by Spitian artist Ishita and Mehul. Behind BSNL office in Kaza main bazaar but oriented away from the road — south-facing rooms get Chau Chau Kang Nilda peak views. Tripadvisor Travelers Choice four years running (2017, 2019, 2021, 2023). In-house kitchen does Spitian thukpa and momos better than any standalone in town.',
  'web_search',
  0.80,
  true,
  '["https://hoteldeyzor.com/", "https://www.tripadvisor.com/Hotel_Review-g1156028-d4755367-Reviews-Hotel_Deyzor-Kaza_Lahaul_and_Spiti_District_Himachal_Pradesh.html"]'::jsonb
),
(
  'kaza',
  'location',
  'Hotel Sakya Abode',
  'heritage-stay',
  '₹2,500–₹4,000 per night',
  'The first hotel in Spiti — built by the Sakya family before tourism was a thing here. 12 ensuite double rooms plus a dorm on two floors, Himalayan-style architecture, walking distance to the bazaar. Run by Tsering Bodh and family. Booking direct via locals, not OTA, gets you the river-side rooms.',
  'web_search',
  0.78,
  true,
  '["https://discoverwithdheeraj.com/sakya-abode-kaza-spiti-valley/", "https://www.tripadvisor.in/Hotel_Review-g1156028-d1887817-Reviews-Hotel_Sakya_Abode-Kaza_Lahaul_and_Spiti_District_Himachal_Pradesh.html"]'::jsonb
),
(
  'kaza',
  'value',
  'Spiti Sarai',
  'eco-stay',
  '₹2,000–₹3,500 per night (twin sharing, all meals)',
  'Eight kilometres outside Kaza in Rangrik village, owned by Ramesh Lotey. Quiet riverside compound, mountain-fed water, the closest stay to Key Monastery (40 min drive). Trades market-walk convenience for cleaner air and silence — pick this if Kaza bazaar noise bothers you.',
  'web_search',
  0.72,
  true,
  '["https://www.guestreservations.com/spiti-sarai-resort/booking", "https://blog.spititrips.com/best-hotels-and-places-to-stay-in-spiti-valley/"]'::jsonb
),
(
  'kaza',
  'xfactor',
  'Norling Homestay Kibber',
  'village-homestay',
  '₹1,500–₹2,200 per night (twin sharing, dinner+breakfast)',
  'In Kibber village (4080m), 18km from Kaza, run by Tsering Norphel. Nine deluxe + three standard rooms looking out at Rhinmo Khapdang peaks. Stay here if you want to wake up at one of the world''s highest motorable villages — and skip the Kaza accommodation circuit entirely. Dinner is yak butter tea and tsampa if you ask for it.',
  'web_search',
  0.70,
  true,
  '["https://www.tripadvisor.com/Hotel_Review-g12445892-d10781849-Reviews-Norling_Home_Stay-Kibber_Lahaul_and_Spiti_District_Himachal_Pradesh.html"]'::jsonb
);
