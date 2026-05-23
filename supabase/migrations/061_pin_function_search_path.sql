-- 061_pin_function_search_path.sql
--
-- Fixes Supabase Security Advisor warning "Function Search Path Mutable"
-- (lint 0011) on two functions:
--   * public.is_placeholder_phone(text)
--   * public.emergency_sos_reject_placeholder_phones()
--
-- A function with no fixed search_path resolves unqualified object names
-- against the caller's search_path, which a hostile caller could redirect
-- to point at malicious objects. Pinning search_path closes that.
--
-- Both functions are safe to pin to an empty search_path:
--   * is_placeholder_phone(text) is pure regex over its argument and
--     references no database objects at all.
--   * emergency_sos_reject_placeholder_phones() already calls
--     public.is_placeholder_phone fully schema-qualified, and otherwise
--     uses only pg_catalog built-ins (jsonb_typeof, jsonb_array_elements),
--     which remain in scope regardless of search_path.
--
-- Apply with:
--   npm run db:migrate
--
-- Applied to prod project dudzsdzfvikjjhurxrgc on 2026-05-20.

ALTER FUNCTION public.is_placeholder_phone(text) SET search_path = '';
ALTER FUNCTION public.emergency_sos_reject_placeholder_phones() SET search_path = '';
