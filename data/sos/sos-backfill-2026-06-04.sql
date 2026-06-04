-- emergency_sos backfill for 45 previously-rowless destinations (2026-06-04)
-- National numbers are universal/official. District control-room + hospital written ONLY where independently verified.
-- Idempotent: ON CONFLICT (destination_id) DO NOTHING.

INSERT INTO emergency_sos (destination_id, police, ambulance, fire, women_helpline, tourist_helpline, road_accident, rescue_contact, nearest_hospital, hospital_has_er, local_helpers, verified, verified_by, verified_date, report_count, source_url, source_label, updated_at)
VALUES ('borra-caves', '100', '108', '101', '1091', '1363', '1073', 'Visakhapatnam District Collectorate Disaster Management Control Room: 0891-2590102', NULL, NULL, '[]'::jsonb, TRUE, 'sos-backfill-2026-06-04', '2026-06-04', 0, 'https://www.yovizag.com/control-room-set-up-at-visakhapatnam-collectorate-amidst-heavy-rains/', 'Visakhapatnam District Collectorate Disaster Management Control Room', now())
ON CONFLICT (destination_id) DO NOTHING;

INSERT INTO emergency_sos (destination_id, police, ambulance, fire, women_helpline, tourist_helpline, road_accident, rescue_contact, nearest_hospital, hospital_has_er, local_helpers, verified, verified_by, verified_date, report_count, source_url, source_label, updated_at)
VALUES ('tirumala', '100', '108', '101', '1091', '1363', '1073', 'Tirupati District Collectorate Control Room: 08772236007', NULL, NULL, '[]'::jsonb, TRUE, 'sos-backfill-2026-06-04', '2026-06-04', 0, 'https://tirupati.ap.gov.in/helpline/', 'Tirupati District Collectorate Control Room', now())
ON CONFLICT (destination_id) DO NOTHING;

INSERT INTO emergency_sos (destination_id, police, ambulance, fire, women_helpline, tourist_helpline, road_accident, rescue_contact, nearest_hospital, hospital_has_er, local_helpers, verified, verified_by, verified_date, report_count, source_url, source_label, updated_at)
VALUES ('aalo', '100', '108', '101', '1091', '1363', '1073', 'West Siang District Police Control Room: 03783-222252', 'General Hospital Aalo', TRUE, '[]'::jsonb, TRUE, 'sos-backfill-2026-06-04', '2026-06-04', 0, 'https://arunpol.nic.in/districts/westsiang.html', 'West Siang District Police Control Room', now())
ON CONFLICT (destination_id) DO NOTHING;

INSERT INTO emergency_sos (destination_id, police, ambulance, fire, women_helpline, tourist_helpline, road_accident, rescue_contact, nearest_hospital, hospital_has_er, local_helpers, verified, verified_by, verified_date, report_count, source_url, source_label, updated_at)
VALUES ('dambuk', '100', '108', '101', '1091', '1363', '1073', 'Lower Dibang Valley District Police Control Room: 03803-222228', 'District Hospital, Roing (Tel: 03803-222253)', TRUE, '[]'::jsonb, TRUE, 'sos-backfill-2026-06-04', '2026-06-04', 0, 'https://roing.nic.in/disaster-contact-list/', 'Lower Dibang Valley District Police Control Room', now())
ON CONFLICT (destination_id) DO NOTHING;

INSERT INTO emergency_sos (destination_id, police, ambulance, fire, women_helpline, tourist_helpline, road_accident, rescue_contact, nearest_hospital, hospital_has_er, local_helpers, verified, verified_by, verified_date, report_count, source_url, source_label, updated_at)
VALUES ('assagao', '100', '108', '101', '1091', '1363', '1073', 'North Goa District Control Room / Collectorate: 0832-2225383', 'Goa Medical College (Tel: 0832-2495169)', TRUE, '[]'::jsonb, TRUE, 'sos-backfill-2026-06-04', '2026-06-04', 0, 'https://northgoa.gov.in/disaster-management/', 'North Goa District Control Room / Collectorate', now())
ON CONFLICT (destination_id) DO NOTHING;

INSERT INTO emergency_sos (destination_id, police, ambulance, fire, women_helpline, tourist_helpline, road_accident, rescue_contact, nearest_hospital, hospital_has_er, local_helpers, verified, verified_by, verified_date, report_count, source_url, source_label, updated_at)
VALUES ('candolim', '100', '108', '101', '1091', '1363', '1073', 'North Goa District Control Room / Collectorate: 0832-2225383', 'Goa Medical College (Tel: 0832-2495169)', TRUE, '[]'::jsonb, TRUE, 'sos-backfill-2026-06-04', '2026-06-04', 0, 'https://northgoa.gov.in/disaster-management/', 'North Goa District Control Room / Collectorate', now())
ON CONFLICT (destination_id) DO NOTHING;

INSERT INTO emergency_sos (destination_id, police, ambulance, fire, women_helpline, tourist_helpline, road_accident, rescue_contact, nearest_hospital, hospital_has_er, local_helpers, verified, verified_by, verified_date, report_count, source_url, source_label, updated_at)
VALUES ('siolim', '100', '108', '101', '1091', '1363', '1073', 'North Goa District Control Room / Collectorate: 0832-2225383', 'Goa Medical College (Tel: 0832-2495169)', TRUE, '[]'::jsonb, TRUE, 'sos-backfill-2026-06-04', '2026-06-04', 0, 'https://northgoa.gov.in/disaster-management/', 'North Goa District Control Room / Collectorate', now())
ON CONFLICT (destination_id) DO NOTHING;

INSERT INTO emergency_sos (destination_id, police, ambulance, fire, women_helpline, tourist_helpline, road_accident, rescue_contact, nearest_hospital, hospital_has_er, local_helpers, verified, verified_by, verified_date, report_count, source_url, source_label, updated_at)
VALUES ('chandratal', '100', '108', '101', '1091', '1363', '1073', 'Lahaul and Spiti District Disaster Management Control Room (DPCR) — Keylong: 01900-202025', 'Civil Hospital, Keylong (Tel: 01900-202211)', TRUE, '[]'::jsonb, TRUE, 'sos-backfill-2026-06-04', '2026-06-04', 0, 'https://pragya.net/dms/district.php?id=Lahaul+Spiti', 'Lahaul and Spiti District Disaster Management Control Room (DPCR) — Keylong', now())
ON CONFLICT (destination_id) DO NOTHING;

INSERT INTO emergency_sos (destination_id, police, ambulance, fire, women_helpline, tourist_helpline, road_accident, rescue_contact, nearest_hospital, hospital_has_er, local_helpers, verified, verified_by, verified_date, report_count, source_url, source_label, updated_at)
VALUES ('kaza', '100', '108', '101', '1091', '1363', '1073', 'Lahaul and Spiti District Disaster Management Control Room (DPCR) — Keylong: 01900-202025', 'Civil Hospital, Keylong (Tel: 01900-202211)', TRUE, '[]'::jsonb, TRUE, 'sos-backfill-2026-06-04', '2026-06-04', 0, 'https://pragya.net/dms/district.php?id=Lahaul+Spiti', 'Lahaul and Spiti District Disaster Management Control Room (DPCR) — Keylong', now())
ON CONFLICT (destination_id) DO NOTHING;

INSERT INTO emergency_sos (destination_id, police, ambulance, fire, women_helpline, tourist_helpline, road_accident, rescue_contact, nearest_hospital, hospital_has_er, local_helpers, verified, verified_by, verified_date, report_count, source_url, source_label, updated_at)
VALUES ('shrikhand-mahadev', '100', '108', '101', '1091', '1363', '1073', 'District Emergency Operation Center (DEOC), Kullu: 01902-225630', NULL, NULL, '[]'::jsonb, TRUE, 'sos-backfill-2026-06-04', '2026-06-04', 0, 'https://hpkullu.nic.in/helpline/', 'District Emergency Operation Center (DEOC), Kullu', now())
ON CONFLICT (destination_id) DO NOTHING;

INSERT INTO emergency_sos (destination_id, police, ambulance, fire, women_helpline, tourist_helpline, road_accident, rescue_contact, nearest_hospital, hospital_has_er, local_helpers, verified, verified_by, verified_date, report_count, source_url, source_label, updated_at)
VALUES ('katra', '100', '108', '101', '1091', '1363', '1073', NULL, NULL, NULL, '[]'::jsonb, FALSE, 'sos-backfill-2026-06-04', '2026-06-04', 0, NULL, 'India-wide emergency numbers (district desk not yet verified)', now())
ON CONFLICT (destination_id) DO NOTHING;

INSERT INTO emergency_sos (destination_id, police, ambulance, fire, women_helpline, tourist_helpline, road_accident, rescue_contact, nearest_hospital, hospital_has_er, local_helpers, verified, verified_by, verified_date, report_count, source_url, source_label, updated_at)
VALUES ('khardung-la', '100', '108', '101', '1091', '1363', '1073', 'Leh District Control Room (DC Office Leh): 01982-257416', NULL, NULL, '[]'::jsonb, TRUE, 'sos-backfill-2026-06-04', '2026-06-04', 0, 'https://leh.nic.in/important-contact-details/', 'Leh District Control Room (DC Office Leh)', now())
ON CONFLICT (destination_id) DO NOTHING;

INSERT INTO emergency_sos (destination_id, police, ambulance, fire, women_helpline, tourist_helpline, road_accident, rescue_contact, nearest_hospital, hospital_has_er, local_helpers, verified, verified_by, verified_date, report_count, source_url, source_label, updated_at)
VALUES ('turtuk', '100', '108', '101', '1091', '1363', '1073', 'Leh District Control Room (DC Office Leh): 01982-257416', NULL, NULL, '[]'::jsonb, TRUE, 'sos-backfill-2026-06-04', '2026-06-04', 0, 'https://leh.nic.in/important-contact-details/', 'Leh District Control Room (DC Office Leh)', now())
ON CONFLICT (destination_id) DO NOTHING;

INSERT INTO emergency_sos (destination_id, police, ambulance, fire, women_helpline, tourist_helpline, road_accident, rescue_contact, nearest_hospital, hospital_has_er, local_helpers, verified, verified_by, verified_date, report_count, source_url, source_label, updated_at)
VALUES ('astavinayak-circuit', '100', '108', '101', '1091', '1363', '1073', 'Ahmednagar District Control Room: 0241-2323844', 'Government District Hospital, Ahmednagar (Tel: 0241-2430506)', NULL, '[]'::jsonb, TRUE, 'sos-backfill-2026-06-04', '2026-06-04', 0, 'https://ahmednagar.nic.in/telephone-directory/', 'Ahmednagar District Control Room', now())
ON CONFLICT (destination_id) DO NOTHING;

INSERT INTO emergency_sos (destination_id, police, ambulance, fire, women_helpline, tourist_helpline, road_accident, rescue_contact, nearest_hospital, hospital_has_er, local_helpers, verified, verified_by, verified_date, report_count, source_url, source_label, updated_at)
VALUES ('kanheri-caves', '100', '108', '101', '1091', '1363', '1073', 'Mumbai Suburban District Emergency Operation Centre (Disaster Management): 022-22694725', 'Rajawadi Hospital (Tel: 022-25115066)', TRUE, '[]'::jsonb, TRUE, 'sos-backfill-2026-06-04', '2026-06-04', 0, 'https://mumbaisuburban.gov.in/en/helpline/', 'Mumbai Suburban District Emergency Operation Centre (Disaster Management)', now())
ON CONFLICT (destination_id) DO NOTHING;

INSERT INTO emergency_sos (destination_id, police, ambulance, fire, women_helpline, tourist_helpline, road_accident, rescue_contact, nearest_hospital, hospital_has_er, local_helpers, verified, verified_by, verified_date, report_count, source_url, source_label, updated_at)
VALUES ('karla-bhaja-caves', '100', '108', '101', '1091', '1363', '1073', 'Pune District Disaster Management Control Room: 020-26123371', 'Aundh Government Hospital (Tel: 020-27280237)', TRUE, '[]'::jsonb, TRUE, 'sos-backfill-2026-06-04', '2026-06-04', 0, 'https://pune.gov.in/en/disaster-management-control-room/', 'Pune District Disaster Management Control Room', now())
ON CONFLICT (destination_id) DO NOTHING;

INSERT INTO emergency_sos (destination_id, police, ambulance, fire, women_helpline, tourist_helpline, road_accident, rescue_contact, nearest_hospital, hospital_has_er, local_helpers, verified, verified_by, verified_date, report_count, source_url, source_label, updated_at)
VALUES ('lenyadri', '100', '108', '101', '1091', '1363', '1073', 'Pune District Disaster Management Control Room: 020-26123371', 'Aundh Government Hospital (Tel: 020-27280237)', TRUE, '[]'::jsonb, TRUE, 'sos-backfill-2026-06-04', '2026-06-04', 0, 'https://pune.gov.in/en/disaster-management-control-room/', 'Pune District Disaster Management Control Room', now())
ON CONFLICT (destination_id) DO NOTHING;

INSERT INTO emergency_sos (destination_id, police, ambulance, fire, women_helpline, tourist_helpline, road_accident, rescue_contact, nearest_hospital, hospital_has_er, local_helpers, verified, verified_by, verified_date, report_count, source_url, source_label, updated_at)
VALUES ('mahad-raigad', '100', '108', '101', '1091', '1363', '1073', 'Raigad District Police Control Room: 02141-222100', 'Civil Hospital, Alibag (Tel: 02141-222667)', TRUE, '[]'::jsonb, TRUE, 'sos-backfill-2026-06-04', '2026-06-04', 0, 'https://raigad.gov.in/en/whoswho/police-control-room/', 'Raigad District Police Control Room', now())
ON CONFLICT (destination_id) DO NOTHING;

INSERT INTO emergency_sos (destination_id, police, ambulance, fire, women_helpline, tourist_helpline, road_accident, rescue_contact, nearest_hospital, hospital_has_er, local_helpers, verified, verified_by, verified_date, report_count, source_url, source_label, updated_at)
VALUES ('morgaon', '100', '108', '101', '1091', '1363', '1073', 'Pune District Disaster Management Control Room: 020-26123371', 'Aundh Government Hospital (Tel: 020-27280237)', TRUE, '[]'::jsonb, TRUE, 'sos-backfill-2026-06-04', '2026-06-04', 0, 'https://pune.gov.in/en/disaster-management-control-room/', 'Pune District Disaster Management Control Room', now())
ON CONFLICT (destination_id) DO NOTHING;

INSERT INTO emergency_sos (destination_id, police, ambulance, fire, women_helpline, tourist_helpline, road_accident, rescue_contact, nearest_hospital, hospital_has_er, local_helpers, verified, verified_by, verified_date, report_count, source_url, source_label, updated_at)
VALUES ('ozar', '100', '108', '101', '1091', '1363', '1073', 'Ahmednagar District Control Room: 0241-2323844', 'Government District Hospital, Ahmednagar (Tel: 0241-2430506)', NULL, '[]'::jsonb, TRUE, 'sos-backfill-2026-06-04', '2026-06-04', 0, 'https://ahmednagar.nic.in/telephone-directory/', 'Ahmednagar District Control Room', now())
ON CONFLICT (destination_id) DO NOTHING;

INSERT INTO emergency_sos (destination_id, police, ambulance, fire, women_helpline, tourist_helpline, road_accident, rescue_contact, nearest_hospital, hospital_has_er, local_helpers, verified, verified_by, verified_date, report_count, source_url, source_label, updated_at)
VALUES ('pali-raigad', '100', '108', '101', '1091', '1363', '1073', 'Raigad District Police Control Room: 02141-222100', 'Civil Hospital, Alibag (Tel: 02141-222667)', TRUE, '[]'::jsonb, TRUE, 'sos-backfill-2026-06-04', '2026-06-04', 0, 'https://raigad.gov.in/en/whoswho/police-control-room/', 'Raigad District Police Control Room', now())
ON CONFLICT (destination_id) DO NOTHING;

INSERT INTO emergency_sos (destination_id, police, ambulance, fire, women_helpline, tourist_helpline, road_accident, rescue_contact, nearest_hospital, hospital_has_er, local_helpers, verified, verified_by, verified_date, report_count, source_url, source_label, updated_at)
VALUES ('ranjangaon', '100', '108', '101', '1091', '1363', '1073', 'Pune District Disaster Management Control Room: 020-26123371', 'Aundh Government Hospital (Tel: 020-27280237)', TRUE, '[]'::jsonb, TRUE, 'sos-backfill-2026-06-04', '2026-06-04', 0, 'https://pune.gov.in/en/disaster-management-control-room/', 'Pune District Disaster Management Control Room', now())
ON CONFLICT (destination_id) DO NOTHING;

INSERT INTO emergency_sos (destination_id, police, ambulance, fire, women_helpline, tourist_helpline, road_accident, rescue_contact, nearest_hospital, hospital_has_er, local_helpers, verified, verified_by, verified_date, report_count, source_url, source_label, updated_at)
VALUES ('siddhatek', '100', '108', '101', '1091', '1363', '1073', 'Ahmednagar District Control Room: 0241-2323844', 'Government District Hospital, Ahmednagar (Tel: 0241-2430506)', NULL, '[]'::jsonb, TRUE, 'sos-backfill-2026-06-04', '2026-06-04', 0, 'https://ahmednagar.nic.in/telephone-directory/', 'Ahmednagar District Control Room', now())
ON CONFLICT (destination_id) DO NOTHING;

INSERT INTO emergency_sos (destination_id, police, ambulance, fire, women_helpline, tourist_helpline, road_accident, rescue_contact, nearest_hospital, hospital_has_er, local_helpers, verified, verified_by, verified_date, report_count, source_url, source_label, updated_at)
VALUES ('theur', '100', '108', '101', '1091', '1363', '1073', 'Pune District Disaster Management Control Room: 020-26123371', 'Aundh Government Hospital (Tel: 020-27280237)', TRUE, '[]'::jsonb, TRUE, 'sos-backfill-2026-06-04', '2026-06-04', 0, 'https://pune.gov.in/en/disaster-management-control-room/', 'Pune District Disaster Management Control Room', now())
ON CONFLICT (destination_id) DO NOTHING;

INSERT INTO emergency_sos (destination_id, police, ambulance, fire, women_helpline, tourist_helpline, road_accident, rescue_contact, nearest_hospital, hospital_has_er, local_helpers, verified, verified_by, verified_date, report_count, source_url, source_label, updated_at)
VALUES ('palani', '100', '108', '101', '1091', '1363', '1073', 'Dindigul District Collectorate Control Room: 1077', 'Government Hospital, Palani (Tel: 04545-240581)', TRUE, '[]'::jsonb, TRUE, 'sos-backfill-2026-06-04', '2026-06-04', 0, 'https://dindigul.nic.in/helpline/', 'Dindigul District Collectorate Control Room', now())
ON CONFLICT (destination_id) DO NOTHING;

INSERT INTO emergency_sos (destination_id, police, ambulance, fire, women_helpline, tourist_helpline, road_accident, rescue_contact, nearest_hospital, hospital_has_er, local_helpers, verified, verified_by, verified_date, report_count, source_url, source_label, updated_at)
VALUES ('pazhamudircholai', '100', '108', '101', '1091', '1363', '1073', NULL, 'Government Rajaji Hospital, Madurai (Tel: 04522533230)', TRUE, '[]'::jsonb, TRUE, 'sos-backfill-2026-06-04', '2026-06-04', 0, 'https://madurai.nic.in/public-utility-category/hospitals/', 'District government hospital directory', now())
ON CONFLICT (destination_id) DO NOTHING;

INSERT INTO emergency_sos (destination_id, police, ambulance, fire, women_helpline, tourist_helpline, road_accident, rescue_contact, nearest_hospital, hospital_has_er, local_helpers, verified, verified_by, verified_date, report_count, source_url, source_label, updated_at)
VALUES ('swamimalai', '100', '108', '101', '1091', '1363', '1073', NULL, 'Thanjavur Medical College Hospital (Tel: 04362-240822)', TRUE, '[]'::jsonb, TRUE, 'sos-backfill-2026-06-04', '2026-06-04', 0, 'https://thanjavur.nic.in/public-utility/thanjavur-medical-college/', 'District government hospital directory', now())
ON CONFLICT (destination_id) DO NOTHING;

INSERT INTO emergency_sos (destination_id, police, ambulance, fire, women_helpline, tourist_helpline, road_accident, rescue_contact, nearest_hospital, hospital_has_er, local_helpers, verified, verified_by, verified_date, report_count, source_url, source_label, updated_at)
VALUES ('tiruchendur', '100', '108', '101', '1091', '1363', '1073', 'Thoothukudi District Collector''s Office / Disaster Control Room: 0461-2340101', 'Govt. Medical College Thoothukudi (Tel: 0461-2330094)', TRUE, '[]'::jsonb, TRUE, 'sos-backfill-2026-06-04', '2026-06-04', 0, 'https://thoothukudi.nic.in/disaster-management/', 'Thoothukudi District Collector''s Office / Disaster Control Room', now())
ON CONFLICT (destination_id) DO NOTHING;

INSERT INTO emergency_sos (destination_id, police, ambulance, fire, women_helpline, tourist_helpline, road_accident, rescue_contact, nearest_hospital, hospital_has_er, local_helpers, verified, verified_by, verified_date, report_count, source_url, source_label, updated_at)
VALUES ('tiruparankundram', '100', '108', '101', '1091', '1363', '1073', NULL, 'Government Rajaji Hospital, Madurai (Tel: 04522533230)', TRUE, '[]'::jsonb, TRUE, 'sos-backfill-2026-06-04', '2026-06-04', 0, 'https://madurai.nic.in/public-utility-category/hospitals/', 'District government hospital directory', now())
ON CONFLICT (destination_id) DO NOTHING;

INSERT INTO emergency_sos (destination_id, police, ambulance, fire, women_helpline, tourist_helpline, road_accident, rescue_contact, nearest_hospital, hospital_has_er, local_helpers, verified, verified_by, verified_date, report_count, source_url, source_label, updated_at)
VALUES ('tiruttani', '100', '108', '101', '1091', '1363', '1073', 'Collectorate Disaster Control Room, Ranipet District: 1077', 'Government Head Quarters Hospital, Walajah (Tel: 04172-232538)', NULL, '[]'::jsonb, TRUE, 'sos-backfill-2026-06-04', '2026-06-04', 0, 'https://ranipet.nic.in/district-helpline/collectorate-disaster-control-room/', 'Collectorate Disaster Control Room, Ranipet District', now())
ON CONFLICT (destination_id) DO NOTHING;

INSERT INTO emergency_sos (destination_id, police, ambulance, fire, women_helpline, tourist_helpline, road_accident, rescue_contact, nearest_hospital, hospital_has_er, local_helpers, verified, verified_by, verified_date, report_count, source_url, source_label, updated_at)
VALUES ('tiruvannamalai', '100', '108', '101', '1091', '1363', '1073', 'Tiruvannamalai District Disaster Management Control Room: 04175-232260', 'Government Tiruvannamalai Medical College and Hospital (Tel: 04175-233315)', TRUE, '[]'::jsonb, TRUE, 'sos-backfill-2026-06-04', '2026-06-04', 0, 'https://tiruvannamalai.nic.in/disaster-management/', 'Tiruvannamalai District Disaster Management Control Room', now())
ON CONFLICT (destination_id) DO NOTHING;

INSERT INTO emergency_sos (destination_id, police, ambulance, fire, women_helpline, tourist_helpline, road_accident, rescue_contact, nearest_hospital, hospital_has_er, local_helpers, verified, verified_by, verified_date, report_count, source_url, source_label, updated_at)
VALUES ('har-ki-doon', '100', '108', '101', '1091', '1363', '1073', 'Uttarkashi District Disaster Management Control Room: 01374-226126', NULL, NULL, '[]'::jsonb, TRUE, 'sos-backfill-2026-06-04', '2026-06-04', 0, 'https://uttarkashi.nic.in/telephone-directory/', 'Uttarkashi District Disaster Management Control Room', now())
ON CONFLICT (destination_id) DO NOTHING;

INSERT INTO emergency_sos (destination_id, police, ambulance, fire, women_helpline, tourist_helpline, road_accident, rescue_contact, nearest_hospital, hospital_has_er, local_helpers, verified, verified_by, verified_date, report_count, source_url, source_label, updated_at)
VALUES ('hemkund-sahib', '100', '108', '101', '1091', '1363', '1073', 'Chamoli District Disaster Management Office: 01372-251437', 'District Hospital Gopeshwar (Tel: 01372-252245)', TRUE, '[]'::jsonb, TRUE, 'sos-backfill-2026-06-04', '2026-06-04', 0, 'https://chamoli.gov.in/disaster-management/', 'Chamoli District Disaster Management Office', now())
ON CONFLICT (destination_id) DO NOTHING;

INSERT INTO emergency_sos (destination_id, police, ambulance, fire, women_helpline, tourist_helpline, road_accident, rescue_contact, nearest_hospital, hospital_has_er, local_helpers, verified, verified_by, verified_date, report_count, source_url, source_label, updated_at)
VALUES ('mansarovar-kailash', '100', '108', '101', '1091', '1363', '1073', 'Pithoragarh District Control Room: 05964-226651', 'B.D Pandey District Hospital, Pithoragarh (Tel: 05964-225687)', TRUE, '[]'::jsonb, TRUE, 'sos-backfill-2026-06-04', '2026-06-04', 0, 'https://pithoragarh.nic.in/helpline/', 'Pithoragarh District Control Room', now())
ON CONFLICT (destination_id) DO NOTHING;

INSERT INTO emergency_sos (destination_id, police, ambulance, fire, women_helpline, tourist_helpline, road_accident, rescue_contact, nearest_hospital, hospital_has_er, local_helpers, verified, verified_by, verified_date, report_count, source_url, source_label, updated_at)
VALUES ('bhoramdeo', '100', '108', '101', '1091', '1363', '1073', NULL, 'District Hospital, Kabirdham (Tel: 07741-233553)', TRUE, '[]'::jsonb, TRUE, 'sos-backfill-2026-06-04', '2026-06-04', 0, 'https://kawardha.gov.in/en/public-utility/district-hospital-kabirdham/', 'District government hospital directory', now())
ON CONFLICT (destination_id) DO NOTHING;

INSERT INTO emergency_sos (destination_id, police, ambulance, fire, women_helpline, tourist_helpline, road_accident, rescue_contact, nearest_hospital, hospital_has_er, local_helpers, verified, verified_by, verified_date, report_count, source_url, source_label, updated_at)
VALUES ('chitrakote-falls', '100', '108', '101', '1091', '1363', '1073', 'Deputy Collector Bastar - District Disaster Management: 07782-223122', NULL, NULL, '[]'::jsonb, TRUE, 'sos-backfill-2026-06-04', '2026-06-04', 0, 'https://bastar.gov.in/en/disaster-management/', 'Deputy Collector Bastar - District Disaster Management', now())
ON CONFLICT (destination_id) DO NOTHING;

INSERT INTO emergency_sos (destination_id, police, ambulance, fire, women_helpline, tourist_helpline, road_accident, rescue_contact, nearest_hospital, hospital_has_er, local_helpers, verified, verified_by, verified_date, report_count, source_url, source_label, updated_at)
VALUES ('kinner-kailash', '100', '108', '101', '1091', '1363', '1073', 'Kinnaur District Disaster Control Room: 01786-223151', 'Regional Hospital Kinnaur (Tel: 01786-222319)', NULL, '[]'::jsonb, TRUE, 'sos-backfill-2026-06-04', '2026-06-04', 0, 'https://hpkinnaur.nic.in/helpline/', 'Kinnaur District Disaster Control Room', now())
ON CONFLICT (destination_id) DO NOTHING;

INSERT INTO emergency_sos (destination_id, police, ambulance, fire, women_helpline, tourist_helpline, road_accident, rescue_contact, nearest_hospital, hospital_has_er, local_helpers, verified, verified_by, verified_date, report_count, source_url, source_label, updated_at)
VALUES ('manimahesh-kailash', '100', '108', '101', '1091', '1363', '1073', 'Chamba District Police Control Room: 01899-222380', 'Regional Hospital, Chamba (Tel: 01899-222392)', TRUE, '[]'::jsonb, TRUE, 'sos-backfill-2026-06-04', '2026-06-04', 0, 'https://www.chambaonline.in/guide/emergency-services-in-chamba', 'Chamba District Police Control Room', now())
ON CONFLICT (destination_id) DO NOTHING;

INSERT INTO emergency_sos (destination_id, police, ambulance, fire, women_helpline, tourist_helpline, road_accident, rescue_contact, nearest_hospital, hospital_has_er, local_helpers, verified, verified_by, verified_date, report_count, source_url, source_label, updated_at)
VALUES ('betla', '100', '108', '101', '1091', '1363', '1073', 'Latehar District Collectorate / Deputy Commissioner''s Office (Disaster Management Authority): 06565-247422', NULL, NULL, '[]'::jsonb, TRUE, 'sos-backfill-2026-06-04', '2026-06-04', 0, 'https://latehar.nic.in/contact-us/', 'Latehar District Collectorate / Deputy Commissioner''s Office (Disaster Management Authority)', now())
ON CONFLICT (destination_id) DO NOTHING;

INSERT INTO emergency_sos (destination_id, police, ambulance, fire, women_helpline, tourist_helpline, road_accident, rescue_contact, nearest_hospital, hospital_has_er, local_helpers, verified, verified_by, verified_date, report_count, source_url, source_label, updated_at)
VALUES ('kiphire', '100', '108', '101', '1091', '1363', '1073', NULL, 'District Hospital, Kiphire', TRUE, '[]'::jsonb, TRUE, 'sos-backfill-2026-06-04', '2026-06-04', 0, 'https://kiphire.nic.in/public-utility/hospital/', 'District government hospital directory', now())
ON CONFLICT (destination_id) DO NOTHING;

INSERT INTO emergency_sos (destination_id, police, ambulance, fire, women_helpline, tourist_helpline, road_accident, rescue_contact, nearest_hospital, hospital_has_er, local_helpers, verified, verified_by, verified_date, report_count, source_url, source_label, updated_at)
VALUES ('jampui-hills', '100', '108', '101', '1091', '1363', '1073', 'North Tripura District Disaster Control Room: 03822-234349', 'North Tripura District Hospital (Tel: 03822-234270)', TRUE, '[]'::jsonb, TRUE, 'sos-backfill-2026-06-04', '2026-06-04', 0, 'https://northtripura.nic.in/disaster-management/', 'North Tripura District Disaster Control Room', now())
ON CONFLICT (destination_id) DO NOTHING;

INSERT INTO emergency_sos (destination_id, police, ambulance, fire, women_helpline, tourist_helpline, road_accident, rescue_contact, nearest_hospital, hospital_has_er, local_helpers, verified, verified_by, verified_date, report_count, source_url, source_label, updated_at)
VALUES ('adi-kailash', '100', '108', '101', '1091', '1363', '1073', 'Pithoragarh District Control Room: 05964-226651', 'B.D Pandey District Hospital, Pithoragarh (Tel: 05964-225687)', TRUE, '[]'::jsonb, TRUE, 'sos-backfill-2026-06-04', '2026-06-04', 0, 'https://pithoragarh.nic.in/helpline/', 'Pithoragarh District Control Room', now())
ON CONFLICT (destination_id) DO NOTHING;

INSERT INTO emergency_sos (destination_id, police, ambulance, fire, women_helpline, tourist_helpline, road_accident, rescue_contact, nearest_hospital, hospital_has_er, local_helpers, verified, verified_by, verified_date, report_count, source_url, source_label, updated_at)
VALUES ('karnaprayag', '100', '108', '101', '1091', '1363', '1073', 'Chamoli District Disaster Management Office: 01372-251437', 'District Hospital Gopeshwar (Tel: 01372-252245)', TRUE, '[]'::jsonb, TRUE, 'sos-backfill-2026-06-04', '2026-06-04', 0, 'https://chamoli.gov.in/disaster-management/', 'Chamoli District Disaster Management Office', now())
ON CONFLICT (destination_id) DO NOTHING;

INSERT INTO emergency_sos (destination_id, police, ambulance, fire, women_helpline, tourist_helpline, road_accident, rescue_contact, nearest_hospital, hospital_has_er, local_helpers, verified, verified_by, verified_date, report_count, source_url, source_label, updated_at)
VALUES ('nandaprayag', '100', '108', '101', '1091', '1363', '1073', 'Chamoli District Disaster Management Office: 01372-251437', 'District Hospital Gopeshwar (Tel: 01372-252245)', TRUE, '[]'::jsonb, TRUE, 'sos-backfill-2026-06-04', '2026-06-04', 0, 'https://chamoli.gov.in/disaster-management/', 'Chamoli District Disaster Management Office', now())
ON CONFLICT (destination_id) DO NOTHING;

INSERT INTO emergency_sos (destination_id, police, ambulance, fire, women_helpline, tourist_helpline, road_accident, rescue_contact, nearest_hospital, hospital_has_er, local_helpers, verified, verified_by, verified_date, report_count, source_url, source_label, updated_at)
VALUES ('vishnuprayag', '100', '108', '101', '1091', '1363', '1073', 'Chamoli District Disaster Management Office: 01372-251437', 'District Hospital Gopeshwar (Tel: 01372-252245)', TRUE, '[]'::jsonb, TRUE, 'sos-backfill-2026-06-04', '2026-06-04', 0, 'https://chamoli.gov.in/disaster-management/', 'Chamoli District Disaster Management Office', now())
ON CONFLICT (destination_id) DO NOTHING;
