import { createClient } from "@supabase/supabase-js";

/** Server-side Supabase client for Next.js server components and route handlers */
export function createServerSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    // In development without Supabase, return null
    // Pages should handle this gracefully with mock data
    return null;
  }

  return createClient(url, key, {
    auth: { persistSession: false },
  });
}
