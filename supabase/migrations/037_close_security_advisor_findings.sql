-- Migration 037: address Supabase security advisor findings (2026-04-29).
--
-- Triggered by Supabase's daily security email which flagged
-- `spatial_ref_sys` as "Table publicly accessible — anyone with your project
-- URL can read, edit, and delete all data." That's misleading: spatial_ref_sys
-- is the PostGIS reference table (EPSG codes), no user data, and we don't own
-- it (PostGIS does), so we can't ENABLE RLS on it. Workaround = REVOKE the
-- PostgREST role grants instead, which achieves the same net effect: anon and
-- authenticated can no longer SELECT from it via the API.
--
-- Closed by this migration:
--  1. function_search_path_mutable: local_eateries_set_updated_at
--  2. anon_security_definer_function_executable: handle_new_user
--  3. authenticated_security_definer_function_executable: handle_new_user
--
-- Functionally addressed (linter may still flag — see notes inline):
--  4. rls_disabled_in_public: spatial_ref_sys — REVOKE achieves the same net
--     effect; linter still flags because it specifically checks the RLS flag,
--     which we cannot toggle without superuser. Documented false positive.
--  5. anon/authenticated_security_definer_function_executable: st_estimatedextent
--     (3 overloads) — REVOKE EXECUTE issued but PostGIS owns the function and
--     the REVOKE may be a no-op without owner privilege. Acceptable: function
--     returns a bbox estimate from pg_statistic, no PII or write capability.
--
-- Intentionally NOT fixed (not bugs):
--  - membership_waitlist no-policy (INFO): table is service_role-only by API
--    design. Adding a policy would LOOSEN security, not tighten it.
--  - Permissive INSERT policies on chat_logs, newsletter_subscribers,
--    safety_reports, traveler_notes, user_suggestions: intentional content-
--    submission flows. Tightening would break newsletter signup, anon safety
--    reports from people in distress, edit-suggestion submissions.
--  - Extensions in public (postgis, vector): high-risk to move retroactively.
--    Defer to a planned schema-migration sprint.
--
-- Manual / dashboard actions required (cannot be done via SQL):
--  - Enable Leaked Password Protection (Auth → Settings)
--  - Review `videos` bucket: change "Public read access for videos" policy
--    from broad SELECT (allows listing) to per-object access only

-- 1. spatial_ref_sys — revoke direct PostgREST role grants (RLS not toggleable)
REVOKE ALL ON TABLE public.spatial_ref_sys FROM anon;
REVOKE ALL ON TABLE public.spatial_ref_sys FROM authenticated;

-- 2. handle_new_user — revoke EXECUTE from client roles
--    The function is invoked by an auth.users trigger, which bypasses role
--    grants. Revoking EXECUTE removes the RPC attack surface without breaking
--    the trigger.
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM anon, authenticated, public;

-- 3. st_estimatedextent — revoke EXECUTE on all 3 overloads (best effort)
REVOKE EXECUTE ON FUNCTION public.st_estimatedextent(text, text) FROM anon, authenticated, public;
REVOKE EXECUTE ON FUNCTION public.st_estimatedextent(text, text, text) FROM anon, authenticated, public;
REVOKE EXECUTE ON FUNCTION public.st_estimatedextent(text, text, text, boolean) FROM anon, authenticated, public;

-- 4. local_eateries_set_updated_at — pin search_path
ALTER FUNCTION public.local_eateries_set_updated_at() SET search_path = public, pg_catalog;
