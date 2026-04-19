"use client";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Module-level singleton so the whole browser tab shares one GoTrueClient
// (supabase-js warns "Multiple GoTrueClient instances detected…" otherwise,
// which can cause undefined auth behaviour under concurrent usage).
//
// Typed as SupabaseClient<any, "public", any> to match exactly what
// createClient(url, key) resolves to at a fresh call site — any looser type
// (e.g. bare ReturnType<typeof createClient>) collapses table schema inference
// to `never` in callers. See BUG-017 note in NakshIQ_Test_Report_2026-04-19.
type AnyClient = SupabaseClient<any, "public", any>;

let _client: AnyClient | null = null;

export function getBrowserSupabase(): AnyClient | null {
  if (_client) return _client;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  _client = createClient(url, key);
  return _client;
}
