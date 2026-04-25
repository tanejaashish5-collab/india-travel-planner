import { cache } from "react";
import { createClient } from "@supabase/supabase-js";
import type { AuthorRecord } from "@/components/author-byline";

// Sprint 19 / R4 §9 #2 — destination + article pages need a Person byline
// (not just Organization) for E-E-A-T. `cache()` dedupes the fetch within a
// single request so multiple page sections can call it without N round-trips.
export const getPrimaryEditor = cache(async (): Promise<AuthorRecord | null> => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;

  const supabase = createClient(url, key);
  const { data } = await supabase
    .from("authors")
    .select("*")
    .eq("role", "editor")
    .order("created_at")
    .limit(1)
    .maybeSingle();

  return (data as AuthorRecord) ?? null;
});
