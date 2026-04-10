"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { getAuthClient, signOut } from "@/lib/auth";
import { AuthModal } from "./auth-modal";

export function UserButton() {
  const t = useTranslations("ui");
  const [user, setUser] = useState<any>(null);
  const [showAuth, setShowAuth] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const supabase = getAuthClient();

    // Check current session
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (!user) {
    return (
      <>
        <button
          onClick={() => setShowAuth(true)}
          className="rounded-lg border border-border px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:border-muted-foreground transition-colors"
        >
          {t("signIn")}
        </button>
        <AuthModal
          open={showAuth}
          onClose={() => setShowAuth(false)}
          onSuccess={() => window.location.reload()}
        />
      </>
    );
  }

  const initial = (user.user_metadata?.name || user.email || "U").charAt(0).toUpperCase();

  return (
    <div className="relative">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground hover:ring-2 hover:ring-primary/50 transition-all"
      >
        {initial}
      </button>

      {showMenu && (
        <div className="absolute right-0 top-full mt-2 w-48 rounded-xl border border-border bg-card shadow-xl z-50">
          <div className="p-3 border-b border-border">
            <p className="text-sm font-medium truncate">{user.user_metadata?.name || "Traveler"}</p>
            <p className="text-xs text-muted-foreground truncate">{user.email}</p>
          </div>
          <button
            onClick={async () => {
              await signOut();
              setShowMenu(false);
              window.location.reload();
            }}
            className="w-full text-left px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-colors"
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}
