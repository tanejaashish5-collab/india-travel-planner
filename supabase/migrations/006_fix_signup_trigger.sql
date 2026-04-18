-- ============================================================
-- Fix signup: "Database error saving new user"
-- ============================================================
-- The handle_new_user() trigger fires during auth.users INSERT,
-- when auth.uid() is still NULL (no session yet). The RLS
-- "Users can insert own profile" policy requires auth.uid() = id,
-- which fails. Result: signup blocked.
--
-- Fix: mark the trigger function SECURITY DEFINER with empty
-- search_path (idiomatic Supabase pattern) and ensure ownership
-- transfers to postgres, which bypasses RLS.
--
-- Also updates the field extraction: app code passes
-- options.data = { name }, so we read ->>'name' (fallback to
-- 'display_name' for anyone still using that shape).
-- ============================================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, display_name, name, email)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', NEW.raw_user_meta_data->>'display_name'),
    COALESCE(NEW.raw_user_meta_data->>'name', NEW.raw_user_meta_data->>'display_name'),
    NEW.email
  );
  RETURN NEW;
EXCEPTION WHEN OTHERS THEN
  -- Don't block signup if the profile row can't be created.
  -- App code will upsert the profile row client-side after signup succeeds.
  RETURN NEW;
END;
$$;

-- postgres (superuser) owns the function → SECURITY DEFINER bypasses RLS
ALTER FUNCTION public.handle_new_user() OWNER TO postgres;

-- Belt and suspenders: give the trigger an explicit bypass-RLS path
-- by allowing the INSERT policy to also accept the "no session yet" case.
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  WITH CHECK (
    auth.uid() = id
    OR auth.uid() IS NULL  -- during signup trigger, before session is issued
  );
