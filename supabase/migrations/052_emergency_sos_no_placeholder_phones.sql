-- 052: emergency_sos — reject placeholder phone strings.
--
-- Context: 2026-05-10 daily QA caught `+91-94120-XXXXX` for "Taxi Union Uttarkashi"
-- on /en/destination/uttarkashi (qa/findings/2026-05-10.json NEW-2026-05-10-001).
-- Corpus-wide audit found 110 such placeholders across 70 destinations, concentrated
-- in UK/HP/Ladakh and templated by carrier prefix (94180/98160 = HP, 94120/96340 = UK,
-- 94190/96220 = Ladakh).
--
-- All 110 entries were stripped from emergency_sos.local_helpers in the same session
-- (UPDATE applied via Supabase MCP execute_sql on 2026-05-10). This migration ships
-- the guardrail so they cannot return.
--
-- Why a trigger and not a CHECK constraint:
--   CHECK constraints disallow subqueries, and the local_helpers jsonb array needs
--   jsonb_array_elements() to scan each element. A BEFORE INSERT/UPDATE trigger gives
--   per-element validation with a clear error message naming the offending field.
--
-- Patterns rejected (case-insensitive where applicable):
--   - X{2,}           literal redacted-template placeholders like "94120-XXXXX"
--   - #{2,}           hash-mask placeholders
--   - 0{6,} / 9{6,}   runs of repeated digits (real Indian numbers max ~4-5 zeros)
--   - TBD|TODO|PLACEHOLDER|REPLACE|FIXME|TKTK|UNKNOWN  literal stand-in words
--
-- Honest scarcity (NULL on scalar columns, '[]'::jsonb on local_helpers) is preferred
-- over fabricated/placeholder numbers per CLAUDE.md.

CREATE OR REPLACE FUNCTION public.is_placeholder_phone(p text)
RETURNS boolean
LANGUAGE sql
IMMUTABLE
PARALLEL SAFE
AS $$
  SELECT p IS NOT NULL AND (
    p ~ 'X{2,}'
    OR p ~ '#{2,}'
    OR p ~ '0{6,}'
    OR p ~ '9{6,}'
    OR p ~* '\m(TBD|TODO|PLACEHOLDER|REPLACE|FIXME|TKTK|UNKNOWN)\M'
  );
$$;

CREATE OR REPLACE FUNCTION public.emergency_sos_reject_placeholder_phones()
RETURNS trigger
LANGUAGE plpgsql
AS $$
DECLARE
  bad_field text;
  bad_phone text;
BEGIN
  IF public.is_placeholder_phone(NEW.police) THEN bad_field := 'police'; bad_phone := NEW.police;
  ELSIF public.is_placeholder_phone(NEW.ambulance) THEN bad_field := 'ambulance'; bad_phone := NEW.ambulance;
  ELSIF public.is_placeholder_phone(NEW.fire) THEN bad_field := 'fire'; bad_phone := NEW.fire;
  ELSIF public.is_placeholder_phone(NEW.women_helpline) THEN bad_field := 'women_helpline'; bad_phone := NEW.women_helpline;
  ELSIF public.is_placeholder_phone(NEW.tourist_helpline) THEN bad_field := 'tourist_helpline'; bad_phone := NEW.tourist_helpline;
  ELSIF public.is_placeholder_phone(NEW.road_accident) THEN bad_field := 'road_accident'; bad_phone := NEW.road_accident;
  ELSIF public.is_placeholder_phone(NEW.mechanic_contact) THEN bad_field := 'mechanic_contact'; bad_phone := NEW.mechanic_contact;
  ELSIF public.is_placeholder_phone(NEW.tow_service) THEN bad_field := 'tow_service'; bad_phone := NEW.tow_service;
  ELSIF public.is_placeholder_phone(NEW.rescue_contact) THEN bad_field := 'rescue_contact'; bad_phone := NEW.rescue_contact;
  ELSIF public.is_placeholder_phone(NEW.mountain_rescue) THEN bad_field := 'mountain_rescue'; bad_phone := NEW.mountain_rescue;
  ELSIF public.is_placeholder_phone(NEW.embassy_emergency_line) THEN bad_field := 'embassy_emergency_line'; bad_phone := NEW.embassy_emergency_line;
  END IF;

  IF bad_field IS NOT NULL THEN
    RAISE EXCEPTION 'placeholder phone rejected on emergency_sos.%: %. Use NULL for honest scarcity (CLAUDE.md: no fabricated phones).', bad_field, bad_phone;
  END IF;

  IF NEW.local_helpers IS NOT NULL AND jsonb_typeof(NEW.local_helpers) = 'array' THEN
    SELECT elem->>'phone' INTO bad_phone
    FROM jsonb_array_elements(NEW.local_helpers) AS elem
    WHERE public.is_placeholder_phone(elem->>'phone')
    LIMIT 1;

    IF bad_phone IS NOT NULL THEN
      RAISE EXCEPTION 'placeholder phone rejected in emergency_sos.local_helpers: %. Drop the helper element instead (CLAUDE.md: no fabricated phones).', bad_phone;
    END IF;
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS emergency_sos_reject_placeholder_phones_trg ON public.emergency_sos;
CREATE TRIGGER emergency_sos_reject_placeholder_phones_trg
  BEFORE INSERT OR UPDATE ON public.emergency_sos
  FOR EACH ROW
  EXECUTE FUNCTION public.emergency_sos_reject_placeholder_phones();

COMMENT ON FUNCTION public.emergency_sos_reject_placeholder_phones() IS
  'Enforces CLAUDE.md "no fabricated phones" rule. Added 2026-05-10 after audit found 110 placeholder phones across 70 dests (qa/findings/2026-05-10.json NEW-2026-05-10-001). Honest scarcity (NULL or []) preferred.';
