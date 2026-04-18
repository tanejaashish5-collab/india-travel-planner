import { createClient } from "@supabase/supabase-js";

// Browser client for auth operations
export function getAuthClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) throw new Error("Supabase not configured");
  return createClient(url, key);
}

// Sign in with email
export async function signInWithEmail(email: string, password: string) {
  const supabase = getAuthClient();
  return supabase.auth.signInWithPassword({ email, password });
}

// Sign up with email.
// Returns { data, error, needsConfirmation } — when Supabase requires email
// confirmation, data.user exists but data.session is null → the user must
// click the confirmation link before they can sign in.
export async function signUpWithEmail(email: string, password: string, name: string) {
  const supabase = getAuthClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { name },
      emailRedirectTo: typeof window !== "undefined" ? `${window.location.origin}/en/auth/callback` : undefined,
    },
  });

  // Create profile row client-side when we have a session (confirmation not required).
  // If confirmation IS required, the handle_new_user() trigger already seeded the row.
  if (data.user && data.session && !error) {
    await supabase.from("profiles").upsert({
      id: data.user.id,
      name,
      email,
    });
  }

  const needsConfirmation = !!(data?.user && !data?.session && !error);

  return { data, error, needsConfirmation };
}

// Sign in with Google
export async function signInWithGoogle() {
  const supabase = getAuthClient();
  return supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: typeof window !== "undefined" ? `${window.location.origin}/en/auth/callback` : undefined,
    },
  });
}

// Sign out
export async function signOut() {
  const supabase = getAuthClient();
  return supabase.auth.signOut();
}

// Get current session
export async function getSession() {
  const supabase = getAuthClient();
  return supabase.auth.getSession();
}

// Get current user
export async function getUser() {
  const supabase = getAuthClient();
  const { data } = await supabase.auth.getUser();
  return data.user;
}

// Sync localStorage data to user profile on login
export async function syncLocalDataToProfile(userId: string) {
  const supabase = getAuthClient();

  // Sync saved destinations
  const savedIds = JSON.parse(localStorage.getItem("savedDestinations") || "[]");
  if (savedIds.length > 0) {
    await supabase.from("profiles").update({
      saved_destinations: savedIds,
    }).eq("id", userId);
  }

  // Sync trip board
  const tripBoard = localStorage.getItem("tripBoard");
  if (tripBoard) {
    await supabase.from("profiles").update({
      trip_board: JSON.parse(tripBoard),
    }).eq("id", userId);
  }

  // Sync Gap Year plan — if one exists in localStorage and no row yet, insert it
  // so the user lands signed-in with their plan already in the DB and a shareable token.
  const gapPlanRaw = localStorage.getItem("gapYearPlan");
  const existingToken = localStorage.getItem("gapYearShareToken");
  if (gapPlanRaw && !existingToken) {
    try {
      const plan = JSON.parse(gapPlanRaw);
      const { data, error } = await supabase
        .from("gap_year_plans")
        .insert({
          user_id: userId,
          title: plan.title,
          start_month: plan.input.startMonth,
          duration_months: plan.input.durationMonths,
          persona: plan.input.persona,
          budget: plan.input.budget ?? null,
          origin: plan.input.origin ?? null,
          interests: plan.input.interests ?? [],
          plan,
        })
        .select("share_token")
        .single();
      if (!error && data?.share_token) {
        localStorage.setItem("gapYearShareToken", data.share_token);
      }
    } catch (err) {
      console.warn("Gap Year plan sync failed:", err);
    }
  }
}
