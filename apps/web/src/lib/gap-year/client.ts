"use client";

import { getAuthClient } from "@/lib/auth";
import type { GapYearPlan } from "./types";

const LOCAL_KEY = "gapYearPlan";
const LOCAL_TOKEN_KEY = "gapYearShareToken";

export function saveLocal(plan: GapYearPlan) {
  if (typeof window === "undefined") return;
  localStorage.setItem(LOCAL_KEY, JSON.stringify(plan));
}

export function loadLocal(): GapYearPlan | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(LOCAL_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as GapYearPlan;
  } catch {
    return null;
  }
}

export function loadLocalToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(LOCAL_TOKEN_KEY);
}

export function clearLocal() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(LOCAL_KEY);
  localStorage.removeItem(LOCAL_TOKEN_KEY);
}

/**
 * Save the plan to Supabase when the user is authenticated. Returns the
 * share_token to use in the public URL. Falls back to localStorage-only when
 * not signed in — caller is responsible for prompting sign-in if they want
 * persistence.
 */
export async function saveToSupabase(plan: GapYearPlan): Promise<{ shareToken: string | null; planId: string | null }> {
  const supabase = getAuthClient();
  const { data: session } = await supabase.auth.getSession();
  if (!session.session?.user) {
    saveLocal(plan);
    return { shareToken: null, planId: null };
  }

  const userId = session.session.user.id;

  const row = {
    user_id: userId,
    title: plan.title,
    start_month: plan.input.startMonth,
    duration_months: plan.input.durationMonths,
    persona: plan.input.persona,
    budget: plan.input.budget ?? null,
    origin: plan.input.origin ?? null,
    interests: plan.input.interests,
    plan,
  };

  const existingToken = loadLocalToken();
  let inserted;
  if (existingToken) {
    // Update-in-place on repeat saves for the same user + token
    const { data, error } = await supabase
      .from("gap_year_plans")
      .update({ ...row, updated_at: new Date().toISOString() })
      .eq("share_token", existingToken)
      .eq("user_id", userId)
      .select("id, share_token")
      .single();
    if (error || !data) {
      // fallback to insert
      const { data: d2, error: e2 } = await supabase
        .from("gap_year_plans")
        .insert(row)
        .select("id, share_token")
        .single();
      if (e2) throw e2;
      inserted = d2;
    } else {
      inserted = data;
    }
  } else {
    const { data, error } = await supabase
      .from("gap_year_plans")
      .insert(row)
      .select("id, share_token")
      .single();
    if (error) throw error;
    inserted = data;
  }

  if (typeof window !== "undefined" && inserted?.share_token) {
    localStorage.setItem(LOCAL_TOKEN_KEY, inserted.share_token);
  }

  saveLocal(plan);
  return { shareToken: inserted?.share_token ?? null, planId: inserted?.id ?? null };
}
