-- ============================================================================
-- SOS local_helpers fabrication purge + corrected re-backfill — 2026-06-09
-- ============================================================================
-- Replayable record of the data-integrity fix applied live on 2026-06-09 (via
-- the Supabase MCP). Idempotent: the purge keeps only verified numbers; the
-- re-backfill appends only if the number is not already present.
--
-- WHY: an adversarial audit of all 108 distinct "real" numbers in
-- destinations.deep_dive.local_helpers + emergency_sos.local_helpers found
-- 21 verified / 33 wrong / 54 unverifiable (80% fabricated/wrong), incl.
-- machine-generated sequential numbers and a wrong HP-Police number live on
-- great-himalayan-np. Full audit: data/audits/sos-fabrication-purge-2026-06-09.md
-- (+ data/audits/sos-deepdive-enrich-2026-06-09.md for the earlier 19-dest enrich).
--
-- KEEP set = national short-codes (^[0-9]{3,4}$) + the 1363 tourist helpline
--            + phone-less descriptive entries + the 18 official-govt-verified numbers.
-- Everything else (the 90 unverified) is removed from BOTH fields.
-- Then 15 double-verified official numbers are (re-)added to the rendered
-- emergency_sos.local_helpers only, mapped by jurisdiction.
-- ============================================================================

-- The 18 verified survivors (verified=true AND source_authority=official-govt):
-- 0135-2559898, 01982-252010, 0361-2547102, 1800-233-7777, +91-11-23365358,
-- +91-1374-222123, +91-172-2756565, 0522-2308916, 03592-221634, 033-22143024,
-- 0612-2201977, 0389-2333475, 0172-2702955, 011-23365358, 0172-2749194,
-- 03776-262429, 0542-2506670, 0562-2421204

-- ---------------------------------------------------------------------------
-- PURGE 1 — destinations.deep_dive.local_helpers (unrendered backing store)
-- ---------------------------------------------------------------------------
UPDATE destinations d
SET deep_dive = jsonb_set(d.deep_dive, '{local_helpers}', COALESCE((
      SELECT jsonb_agg(e)
      FROM jsonb_array_elements(d.deep_dive->'local_helpers') e
      WHERE COALESCE(e->>'phone','')=''
         OR (e->>'phone') ~ '^[0-9]{3,4}$'
         OR (e->>'phone') ILIKE '%1363%'
         OR (e->>'phone') = ANY(ARRAY['0135-2559898','01982-252010','0361-2547102','1800-233-7777','+91-11-23365358','+91-1374-222123','+91-172-2756565','0522-2308916','03592-221634','033-22143024','0612-2201977','0389-2333475','0172-2702955','011-23365358','0172-2749194','03776-262429','0542-2506670','0562-2421204'])
    ), '[]'::jsonb)),
    content_reviewed_at = now()
WHERE d.deep_dive ? 'local_helpers'
  AND EXISTS (SELECT 1 FROM jsonb_array_elements(d.deep_dive->'local_helpers') e
     WHERE COALESCE(e->>'phone','')<>'' AND (e->>'phone') !~ '^[0-9]{3,4}$' AND (e->>'phone') NOT ILIKE '%1363%'
       AND (e->>'phone') <> ALL(ARRAY['0135-2559898','01982-252010','0361-2547102','1800-233-7777','+91-11-23365358','+91-1374-222123','+91-172-2756565','0522-2308916','03592-221634','033-22143024','0612-2201977','0389-2333475','0172-2702955','011-23365358','0172-2749194','03776-262429','0542-2506670','0562-2421204']));

-- ---------------------------------------------------------------------------
-- PURGE 2 — emergency_sos.local_helpers (the RENDERED field)
-- ---------------------------------------------------------------------------
UPDATE emergency_sos es
SET local_helpers = COALESCE((
      SELECT jsonb_agg(e)
      FROM jsonb_array_elements(es.local_helpers) e
      WHERE COALESCE(e->>'phone','')=''
         OR (e->>'phone') ~ '^[0-9]{3,4}$'
         OR (e->>'phone') ILIKE '%1363%'
         OR (e->>'phone') = ANY(ARRAY['0135-2559898','01982-252010','0361-2547102','1800-233-7777','+91-11-23365358','+91-1374-222123','+91-172-2756565','0522-2308916','03592-221634','033-22143024','0612-2201977','0389-2333475','0172-2702955','011-23365358','0172-2749194','03776-262429','0542-2506670','0562-2421204'])
    ), '[]'::jsonb),
    verified_by='deepdive-fabrication-purge-2026-06-09', verified_date=CURRENT_DATE, last_verified_attempt_at=now()
WHERE jsonb_typeof(es.local_helpers)='array'
  AND EXISTS (SELECT 1 FROM jsonb_array_elements(es.local_helpers) e
     WHERE COALESCE(e->>'phone','')<>'' AND (e->>'phone') !~ '^[0-9]{3,4}$' AND (e->>'phone') NOT ILIKE '%1363%'
       AND (e->>'phone') <> ALL(ARRAY['0135-2559898','01982-252010','0361-2547102','1800-233-7777','+91-11-23365358','+91-1374-222123','+91-172-2756565','0522-2308916','03592-221634','033-22143024','0612-2201977','0389-2333475','0172-2702955','011-23365358','0172-2749194','03776-262429','0542-2506670','0562-2421204']));

-- ---------------------------------------------------------------------------
-- RE-BACKFILL — 15 double-verified official numbers → emergency_sos.local_helpers
-- (rendered field only; deep_dive left clean). append + dedupe. verified twice
-- vs official .gov.in/agency sources. 4 rejected on 2nd pass (Jabalpur Police,
-- Mizoram Police, Chandigarh Tourism, GTA Darjeeling) + Arunachal (aggregator).
-- ---------------------------------------------------------------------------

-- State desks → all dests in state (via state_id)
UPDATE emergency_sos SET local_helpers = (CASE WHEN jsonb_typeof(local_helpers)='array' THEN local_helpers ELSE '[]'::jsonb END) || '[{"name":"Bhopal Police Control Room","role":"State-capital police control room (escalation)","phone":"0755-2555922","availability":"24/7"}]'::jsonb, verified_by='deepdive-recorrect-2026-06-09', verified_date=CURRENT_DATE, last_verified_attempt_at=now()
WHERE destination_id IN (SELECT id FROM destinations WHERE state_id='madhya-pradesh') AND NOT (local_helpers @> '[{"phone":"0755-2555922"}]');

UPDATE emergency_sos SET local_helpers = (CASE WHEN jsonb_typeof(local_helpers)='array' THEN local_helpers ELSE '[]'::jsonb END) || '[{"name":"Nagaland Tourism","role":"State tourism assistance","phone":"0370-2243124","availability":"Mon-Fri 9am-4pm"}]'::jsonb, verified_by='deepdive-recorrect-2026-06-09', verified_date=CURRENT_DATE, last_verified_attempt_at=now()
WHERE destination_id IN (SELECT id FROM destinations WHERE state_id='nagaland') AND NOT (local_helpers @> '[{"phone":"0370-2243124"}]');

UPDATE emergency_sos SET local_helpers = (CASE WHEN jsonb_typeof(local_helpers)='array' THEN local_helpers ELSE '[]'::jsonb END) || '[{"name":"Tripura Tourism (TTDC)","role":"State tourism assistance","phone":"0381-2325930"}]'::jsonb, verified_by='deepdive-recorrect-2026-06-09', verified_date=CURRENT_DATE, last_verified_attempt_at=now()
WHERE destination_id IN (SELECT id FROM destinations WHERE state_id='tripura') AND NOT (local_helpers @> '[{"phone":"0381-2325930"}]');
UPDATE emergency_sos SET local_helpers = (CASE WHEN jsonb_typeof(local_helpers)='array' THEN local_helpers ELSE '[]'::jsonb END) || '[{"name":"Tripura Police Control Room (PHQ)","role":"State police control room","phone":"0381-2310177","availability":"24/7"}]'::jsonb, verified_by='deepdive-recorrect-2026-06-09', verified_date=CURRENT_DATE, last_verified_attempt_at=now()
WHERE destination_id IN (SELECT id FROM destinations WHERE state_id='tripura') AND NOT (local_helpers @> '[{"phone":"0381-2310177"}]');

UPDATE emergency_sos SET local_helpers = (CASE WHEN jsonb_typeof(local_helpers)='array' THEN local_helpers ELSE '[]'::jsonb END) || '[{"name":"Jharkhand Tourism (JTDC)","role":"State tourism assistance","phone":"0651-2331828","availability":"Mon-Sat 10am-6pm"}]'::jsonb, verified_by='deepdive-recorrect-2026-06-09', verified_date=CURRENT_DATE, last_verified_attempt_at=now()
WHERE destination_id IN (SELECT id FROM destinations WHERE state_id='jharkhand') AND NOT (local_helpers @> '[{"phone":"0651-2331828"}]');
UPDATE emergency_sos SET local_helpers = (CASE WHEN jsonb_typeof(local_helpers)='array' THEN local_helpers ELSE '[]'::jsonb END) || '[{"name":"Jharkhand Police DG Control Room","role":"State police control room","phone":"0651-2446607","availability":"24/7"}]'::jsonb, verified_by='deepdive-recorrect-2026-06-09', verified_date=CURRENT_DATE, last_verified_attempt_at=now()
WHERE destination_id IN (SELECT id FROM destinations WHERE state_id='jharkhand') AND NOT (local_helpers @> '[{"phone":"0651-2446607"}]');

UPDATE emergency_sos SET local_helpers = (CASE WHEN jsonb_typeof(local_helpers)='array' THEN local_helpers ELSE '[]'::jsonb END) || '[{"name":"Chhattisgarh Tourism Board","role":"State tourism assistance","phone":"0771-4224600"}]'::jsonb, verified_by='deepdive-recorrect-2026-06-09', verified_date=CURRENT_DATE, last_verified_attempt_at=now()
WHERE destination_id IN (SELECT id FROM destinations WHERE state_id='chhattisgarh') AND NOT (local_helpers @> '[{"phone":"0771-4224600"}]');
UPDATE emergency_sos SET local_helpers = (CASE WHEN jsonb_typeof(local_helpers)='array' THEN local_helpers ELSE '[]'::jsonb END) || '[{"name":"Chhattisgarh Police Control Room (Raipur)","role":"State police control room","phone":"0771-4247191","availability":"24/7"}]'::jsonb, verified_by='deepdive-recorrect-2026-06-09', verified_date=CURRENT_DATE, last_verified_attempt_at=now()
WHERE destination_id IN (SELECT id FROM destinations WHERE state_id='chhattisgarh') AND NOT (local_helpers @> '[{"phone":"0771-4247191"}]');

UPDATE emergency_sos SET local_helpers = (CASE WHEN jsonb_typeof(local_helpers)='array' THEN local_helpers ELSE '[]'::jsonb END) || '[{"name":"West Bengal Tourism","role":"State tourism assistance","phone":"1800-212-1655","availability":"24/7 toll-free"}]'::jsonb, verified_by='deepdive-recorrect-2026-06-09', verified_date=CURRENT_DATE, last_verified_attempt_at=now()
WHERE destination_id IN (SELECT id FROM destinations WHERE state_id='west-bengal') AND NOT (local_helpers @> '[{"phone":"1800-212-1655"}]');

UPDATE emergency_sos SET local_helpers = (CASE WHEN jsonb_typeof(local_helpers)='array' THEN local_helpers ELSE '[]'::jsonb END) || '[{"name":"Delhi Police Control Room","role":"Police control room (escalation)","phone":"011-27491106","availability":"24/7"}]'::jsonb, verified_by='deepdive-recorrect-2026-06-09', verified_date=CURRENT_DATE, last_verified_attempt_at=now()
WHERE destination_id IN (SELECT id FROM destinations WHERE state_id='delhi') AND NOT (local_helpers @> '[{"phone":"011-27491106"}]');

-- Institution-specific → exact dest(s)
UPDATE emergency_sos SET local_helpers = (CASE WHEN jsonb_typeof(local_helpers)='array' THEN local_helpers ELSE '[]'::jsonb END) || '[{"name":"Great Himalayan National Park office","role":"Park office - permits, ranger & visitor emergency","phone":"01902-265320"}]'::jsonb, verified_by='deepdive-recorrect-2026-06-09', verified_date=CURRENT_DATE, last_verified_attempt_at=now()
WHERE destination_id='great-himalayan-np' AND NOT (local_helpers @> '[{"phone":"01902-265320"}]');
UPDATE emergency_sos SET local_helpers = (CASE WHEN jsonb_typeof(local_helpers)='array' THEN local_helpers ELSE '[]'::jsonb END) || '[{"name":"Sundarbans Tiger Reserve","role":"Reserve office - boat & wildlife emergency","phone":"03218-255280"}]'::jsonb, verified_by='deepdive-recorrect-2026-06-09', verified_date=CURRENT_DATE, last_verified_attempt_at=now()
WHERE destination_id='sundarbans' AND NOT (local_helpers @> '[{"phone":"03218-255280"}]');
UPDATE emergency_sos SET local_helpers = (CASE WHEN jsonb_typeof(local_helpers)='array' THEN local_helpers ELSE '[]'::jsonb END) || '[{"name":"Landour Community Hospital","role":"24/7 emergency hospital (Mussoorie)","phone":"0135-2632053","availability":"24/7"}]'::jsonb, verified_by='deepdive-recorrect-2026-06-09', verified_date=CURRENT_DATE, last_verified_attempt_at=now()
WHERE destination_id='mussoorie' AND NOT (local_helpers @> '[{"phone":"0135-2632053"}]');
UPDATE emergency_sos SET local_helpers = (CASE WHEN jsonb_typeof(local_helpers)='array' THEN local_helpers ELSE '[]'::jsonb END) || '[{"name":"Takht Sri Damdama Sahib Management","role":"Gurudwara management - visitor assistance, shelter, langar","phone":"01655-220236"}]'::jsonb, verified_by='deepdive-recorrect-2026-06-09', verified_date=CURRENT_DATE, last_verified_attempt_at=now()
WHERE destination_id='damdama-sahib' AND NOT (local_helpers @> '[{"phone":"01655-220236"}]');
UPDATE emergency_sos SET local_helpers = (CASE WHEN jsonb_typeof(local_helpers)='array' THEN local_helpers ELSE '[]'::jsonb END) || '[{"name":"ITBP Pithoragarh Sector HQ","role":"Indo-Tibetan Border Police - high-altitude trek & border emergency","phone":"05964-256076"}]'::jsonb, verified_by='deepdive-recorrect-2026-06-09', verified_date=CURRENT_DATE, last_verified_attempt_at=now()
WHERE destination_id IN ('munsiyari','chaukori','pithoragarh') AND NOT (local_helpers @> '[{"phone":"05964-256076"}]');

-- Result (2026-06-09): deep_dive 867->589 entries (405 blocks intact); emergency_sos
-- local_helpers nonempty 205->171 (purge) ->178 (re-backfill, 47 dests, 67 entries).
-- 0 fabricated/unverified numbers remain. No safety regression (112 + structured cols always render).
