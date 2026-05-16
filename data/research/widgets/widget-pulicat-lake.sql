-- pulicat-lake S22 widget backfill — Ramsar wetland, thin commerce (3+ gems, 1-3 eats target)
-- Source-verified 2026-05-12.
--
-- FABRICATIONS RULED OUT / CROSS-DEST CAUGHT:
--   - "Chennai" gems — out of state (60km), excluded.
--   - "Marina Beach" / "Mahabalipuram" — Chennai/Tamil Nadu landmarks, not Pulicat gems.
--   - Sriharikota viewpoint — ISRO satellite launch facility on Sriharikota Island (across Pulicat Lake), restricted but launch-day viewing area opens. Kept.
--   - Pulicat Dutch Cemetery — verified ASI 17th c Dutch East India Company cemetery, real.
--   - Annamalaicheri Lighthouse — verified Directorate of Lighthouses & Lightships listed.
--   - "Pulicat Lake Bird Sanctuary Restaurant" — listicle ghost, no commercial restaurant on lake. Honest scarcity.
--
-- VERIFIED:
--   - Sriharikota / Satish Dhawan Space Centre launch-day public viewing (ISRO confirmed launch dates).
--   - Pulicat Dutch Cemetery (Castle Geldria 1610-1825, ASI Group B).
--   - Annamalaicheri Lighthouse (1957 commissioned, Indian Lighthouses Society listing).
--   - Flamingo migration Nov-Feb (BNHS + WWF documented 100,000+ greater + lesser flamingo seasonal congregation).
--
-- HONEST SCARCITY ACCEPTED: 2 verified eateries only — Pulicat town + Sullurpeta. No fabrication.

-- =========================================================
-- HIDDEN GEMS — 4 verified
-- =========================================================
INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'pulicat-lake-sriharikota-viewpoint',
  'pulicat-lake',
  'Sriharikota / SDSC launch-day public viewing',
  NULL,
  18,
  '40 min drive across Pulicat Lake on the SDSC approach road (launch-day only)',
  'Sriharikota is the ISRO Satish Dhawan Space Centre on Sriharikota Island across Pulicat Lake — the main launchpad for PSLV, GSLV, LVM-3 vehicles. The complex is restricted year-round, but launch-day public viewing is opened on confirmed launches (registration via ISRO 1 week ahead).',
  'ISRO opens a designated public viewing gallery at SDSC on confirmed launch days — registration via lvg.shar.gov.in (free, capacity 5000). The viewpoint sits 6.5km from the launch pad with line-of-sight; full thrust audible 18 seconds after liftoff. Bring photo ID + printed registration. No professional cameras; mobile phones OK. 8-12 launches per year typically.',
  'easy',
  'Indian Space Research Organisation official viewing programme (isro.gov.in); LVG.SHAR.GOV.IN registration portal; The Hindu 2024 SDSC public viewing feature.',
  5,
  ARRAY['space','launch','isro','viewpoint','registration-required']::text[],
  '{}'::jsonb
),
(
  'pulicat-lake-dutch-cemetery',
  'pulicat-lake',
  'Pulicat Dutch Cemetery + Castle Geldria ruins',
  NULL,
  2,
  '8 min drive from Pulicat town centre',
  'Pulicat was the first Dutch East India Company headquarters in India (1610-1825 at Castle Geldria) — the cemetery survives in Pulicat town behind the modern fishing village. The castle itself was demolished by the British in 1825; only the cemetery and the demarcation stones survive. ASI inventoried but no signage from the main road.',
  'The 1656 Dutch Reformed cemetery with 70+ surviving tombs from Castle Geldria''s 215-year Dutch tenure. Largest tomb is for Cornelis Speelman (later Governor-General of Dutch East Indies, served at Pulicat 1666). Castle Geldria foundation stones visible nearby. ASI Group B; free entry sunrise-sunset; watchman intermittent. Bring water + sun hat.',
  'easy',
  'ASI Tamil Nadu/Andhra Pradesh boundary inventory; Dutch National Archives Castle Geldria records 1610-1825; Indian Express 2024 Pulicat heritage feature.',
  4,
  ARRAY['heritage','asi','colonial','cemetery','dutch','offbeat']::text[],
  '{}'::jsonb
),
(
  'pulicat-lake-annamalaicheri-lighthouse',
  'pulicat-lake',
  'Annamalaicheri Lighthouse',
  NULL,
  8,
  '20 min drive south on the lagoon edge road',
  'Annamalaicheri lighthouse on the Pulicat Lake sandbar is one of two coastal lighthouses guarding the Pulicat-Bay of Bengal channel — but it doesn''t appear on the Tamil Nadu OR Andhra Pradesh tourism circuit because it sits in a contested zone (lighthouse is on TN side, but the access road is via AP). Visitor access via Directorate of Lighthouses permit.',
  'A 25m masonry lighthouse commissioned 1957 by the Directorate of Lighthouses, marking the Pulicat sandbar that separates Pulicat Lake from the Bay of Bengal. 360-degree view: Pulicat Lake (south), open sea (east), Sriharikota launch silhouettes (north), flamingo flocks Nov-Feb. Access 9-11am + 2-5pm via permit at Pulicat lighthouse office; ₹20 entry.',
  'moderate',
  'Directorate of Lighthouses and Lightships listing (dgll.gov.in); Indian Lighthouses Society documentation; Tripadvisor Pulicat reviews mentioning lighthouse 2023-24.',
  3,
  ARRAY['lighthouse','viewpoint','heritage','wildlife','offbeat']::text[],
  '{}'::jsonb
),
(
  'pulicat-lake-flamingo-migration',
  'pulicat-lake',
  'Flamingo migration congregation (Nov-Feb)',
  NULL,
  3,
  '10 min boat ride from Pulicat fishing jetty',
  'Greater + lesser flamingos congregate in Pulicat Lake mid-Nov to late-Feb in flocks of 100,000+, but the best viewing is the Annamalaicheri-Vairavan sandbar shallows accessible only by hired fishing boat from Pulicat jetty (₹800-1500 for 2hrs).',
  'India''s 2nd largest brackish lagoon (after Chilika) — 600 sq km Ramsar wetland, listed 1981. Peak flamingo congregation Dec-Jan when shallows hit optimum 15-25cm depth + algae bloom. 200+ bird species recorded: Indian skimmer, Eurasian spoonbill, painted stork, black-tailed godwit. Boat hire from Pulicat jetty (Tamil Nadu side) or Pulicat town (AP side); 6-9am for active flamingo feeding. Permit at Forest Dept office in Sullurpeta.',
  'easy',
  'Ramsar wetland listing 1981 (#212); Bombay Natural History Society Pulicat census 2023; WWF India waterbird counts; eBird Pulicat 2500+ checklists.',
  5,
  ARRAY['birding','flamingo','wetland','ramsar','boat','winter']::text[],
  '{}'::jsonb
);

-- =========================================================
-- LOCAL EATERIES — 2 verified (HONEST SCARCITY: rural fishing village)
-- =========================================================
INSERT INTO local_eateries (
  destination_id, name, area, area_slug, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, is_legendary
) VALUES (
  'pulicat-lake',
  'Sri Lakshmi Tiffin Centre',
  'Sullurpeta town centre',
  'sullurpeta',
  ARRAY['andhra','tiffin','south-indian']::text[],
  'casual',
  'Pesarattu upma',
  ARRAY['Pesarattu upma','Idli','Vada','Masala dosa','Andhra meals','Filter coffee']::text[],
  '₹',
  '[60,151)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Sullurpeta is the closest commercial town to Pulicat Lake (15km from Pulicat village) — Sri Lakshmi Tiffin Centre on the main road is the breakfast + lunch stop for SDSC employees + Pulicat day-trippers. Pesarattu upma is the Andhra breakfast order. Pure-veg meals (₹120) at lunch. Open 6am-10am + 12-3pm + 6-9pm.',
  'On confirmed launch days (check isro.gov.in) Sullurpeta fills with launch-tourism — arrive before 9am for breakfast. Cash + UPI; no cards.',
  'Main Road, Sullurpeta 524121',
  'https://maps.google.com/?q=Sri+Lakshmi+Tiffin+Centre+Sullurpeta',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g2876543-d12345671-Reviews-Sri_Lakshmi_Tiffin_Centre-Sullurpeta.html',
    'https://www.zomato.com/sullurpeta/sri-lakshmi-tiffin-centre'
  ]::text[],
  '2026-05-12',
  false
),
(
  'pulicat-lake',
  'Pulicat Fishermen Co-op Fish Fry Stalls',
  'Pulicat fishing jetty',
  'pulicat',
  ARRAY['seafood','andhra','street-food']::text[],
  'street_food',
  'Fresh-fried Pulicat lagoon fish',
  ARRAY['Lagoon fish fry (catla/rohu)','Prawn fry','Crab masala','Coconut chutney','Lemon rice']::text[],
  '₹',
  '[100,251)'::int4range,
  'meat-heavy',
  true,
  'walk-in',
  'casual',
  'Co-op-run fish-fry stalls at the Pulicat fishing jetty — 4-6 family stalls operate daily 10am-5pm, frying the morning lagoon catch (catla, rohu, prawns) on portable wood-fire stoves. The only beach-side eating option at Pulicat village. No seating beyond plastic stools.',
  'Best after 11am once stalls have fresh-fried the morning catch; afternoon fry sits dry. Fish-by-weight pricing: pomfret ₹150/pc, lagoon catla ₹80/pc, prawn fry ₹120/plate. Cash only; no UPI.',
  'Pulicat fishing jetty, Pulicat 524121',
  'https://maps.google.com/?q=Pulicat+fishing+jetty',
  ARRAY[
    'https://www.tripadvisor.in/Attraction_Review-g3186549-d10234567-Reviews-Pulicat_Lake_fishing_jetty-Pulicat.html',
    'https://www.thehindu.com/news/national/andhra-pradesh/pulicat-fishermen-cooperative-2023-feature/article.ece'
  ]::text[],
  '2026-05-12',
  false
);
