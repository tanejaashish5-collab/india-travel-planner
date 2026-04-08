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

// Sign up with email
export async function signUpWithEmail(email: string, password: string, name: string) {
  const supabase = getAuthClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { name } },
  });

  // Create profile if sign up successful
  if (data.user && !error) {
    await supabase.from("profiles").upsert({
      id: data.user.id,
      name,
      email,
    });
  }

  return { data, error };
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
}
