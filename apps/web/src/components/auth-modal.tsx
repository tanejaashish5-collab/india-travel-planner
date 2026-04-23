"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { m as motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { signInWithEmail, signUpWithEmail, signInWithGoogle } from "@/lib/auth";

export function AuthModal({
  open,
  onClose,
  onSuccess,
}: {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [mode, setMode] = useState<"signin" | "signup" | "check-email">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const ta = useTranslations("auth");
  const tu = useTranslations("ui");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (mode === "signin") {
        const { error } = await signInWithEmail(email, password);
        if (error) { setError(error.message); return; }
        onSuccess();
        onClose();
      } else {
        const { error, needsConfirmation } = await signUpWithEmail(email, password, name);
        if (error) { setError(error.message); return; }
        if (needsConfirmation) {
          // Show the check-your-email state, don't close the modal.
          setMode("check-email");
          return;
        }
        // Auto-confirm was on — we're already signed in.
        onSuccess();
        onClose();
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogle() {
    setLoading(true);
    try {
      await signInWithGoogle();
    } catch (err: any) {
      setError(err.message || "Google sign-in failed");
      setLoading(false);
    }
  }

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!open || !mounted) return null;

  return createPortal(
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 backdrop-blur-md px-4"
        onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      >
        <motion.div
          initial={{ scale: 0.95, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.95, y: 20 }}
          className={`relative w-full rounded-2xl border border-border bg-card shadow-2xl overflow-hidden ${
            mode === "check-email" ? "max-w-md" : "max-w-sm"
          }`}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-muted-foreground hover:text-foreground text-lg"
          >
            ✕
          </button>

          <div className="p-6 sm:p-8">
            {mode === "check-email" ? (
              <div className="py-2">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-primary/40 bg-primary/5 text-primary">
                  {/* Envelope glyph */}
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><polyline points="3,7 12,13 21,7"/></svg>
                </div>
                <h2 className="text-2xl font-semibold mb-3 text-center">Check your email</h2>
                <p className="text-sm text-muted-foreground mb-2 text-center">
                  We sent a confirmation link to
                </p>
                <p className="text-base font-medium text-foreground mb-6 text-center font-mono break-all px-2">
                  {email}
                </p>
                <div className="rounded-xl border border-border bg-muted/20 p-5 text-sm text-muted-foreground space-y-3 mb-6">
                  <p className="flex items-start gap-3">
                    <span className="flex-shrink-0 flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-semibold">1</span>
                    <span>Open your inbox (and check <span className="text-foreground font-medium">spam/junk</span> — confirmation emails often land there)</span>
                  </p>
                  <p className="flex items-start gap-3">
                    <span className="flex-shrink-0 flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-semibold">2</span>
                    <span>Click the link to finish creating your account</span>
                  </p>
                  <p className="flex items-start gap-3">
                    <span className="flex-shrink-0 flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-semibold">3</span>
                    <span>Return here and sign in</span>
                  </p>
                </div>
                <p className="text-xs text-muted-foreground mb-4 text-center">
                  Didn&apos;t get it? Check spam or try again in 2 minutes.
                </p>
                <button
                  onClick={() => { setMode("signin"); setPassword(""); }}
                  className="w-full rounded-xl border border-border py-3 text-sm font-medium hover:bg-muted/30 transition-colors"
                >
                  Back to sign in
                </button>
              </div>
            ) : (
              <>
            <h2 className="text-2xl font-semibold mb-1">
              {mode === "signin" ? ta("welcomeBack") : ta("joinTheJourney")}
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
              {mode === "signin"
                ? ta("signInToSync")
                : ta("createToSave")}
            </p>

            {/* Google */}
            <button
              onClick={handleGoogle}
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 rounded-xl border border-border py-3 text-sm font-medium hover:bg-muted/30 transition-colors disabled:opacity-50 mb-4"
            >
              <svg width="18" height="18" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
              {ta("continueWithGoogle")}
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="flex-1 h-px bg-border" />
              <span className="text-xs text-muted-foreground">{ta("or")}</span>
              <div className="flex-1 h-px bg-border" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              {mode === "signup" && (
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={ta("name")}
                  required
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              )}
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={ta("email")}
                required
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={ta("password")}
                required
                minLength={6}
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />

              {error && (
                <p className="text-sm text-red-400">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50"
              >
                {loading ? "..." : mode === "signin" ? tu("signIn") : tu("createAccount")}
              </button>
            </form>

            <p className="mt-4 text-center text-sm text-muted-foreground">
              {mode === "signin" ? (
                <>{ta("noAccount")} <button onClick={() => setMode("signup")} className="text-primary hover:underline">{tu("signUp")}</button></>
              ) : (
                <>{ta("haveAccount")} <button onClick={() => setMode("signin")} className="text-primary hover:underline">{tu("signIn")}</button></>
              )}
            </p>
              </>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
}
