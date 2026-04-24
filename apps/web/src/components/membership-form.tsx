"use client";

import { useState } from "react";

const INTERESTS = [
  "I travel solo",
  "I travel with my partner",
  "I travel with young kids",
  "I travel with older parents",
  "I'm planning my first big India trip",
  "Digital nomad / long stays",
  "Photography / astrophotography",
  "Wellness / yoga / retreats",
  "Food + regional cuisine",
  "Bikes / motorcycle routes",
  "Something else",
];

export function MembershipForm({ locale }: { locale: string }) {
  const isHindi = locale === "hi";
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [interest, setInterest] = useState("");
  const [hp, setHp] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const trimmed = email.trim();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setError(isHindi ? "सही ईमेल दें।" : "Please enter a valid email.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/membership", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email: trimmed, name: name.trim() || null, interest: interest || null, hp }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setError(
          data.error === "too_many"
            ? isHindi ? "बहुत ज़्यादा अनुरोध। थोड़ी देर बाद कोशिश करें।" : "Too many requests. Try again in an hour."
            : data.error === "invalid_email"
              ? isHindi ? "सही ईमेल दें।" : "That doesn't look like a valid email."
              : isHindi ? "कुछ गलत हुआ। फिर कोशिश करें।" : "Something went wrong. Try again in a moment."
        );
        setLoading(false);
        return;
      }
      setDone(true);
    } catch {
      setError(isHindi ? "नेटवर्क समस्या।" : "Network error. Try again.");
    } finally {
      setLoading(false);
    }
  }

  if (done) {
    return (
      <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-6">
        <p className="text-sm font-medium text-emerald-400 mb-1">
          {isHindi ? "आप सूची में हैं।" : "You're on the list."}
        </p>
        <p className="text-sm text-muted-foreground">
          {isHindi
            ? "हम 2026 लॉन्च पर सबसे पहले आपको ईमेल करेंगे। कोई कार्ड नहीं, कोई प्रतिबद्धता नहीं।"
            : "We'll email you first when Membership launches in 2026 — and you'll get locked-in launch pricing. No card needed until then."}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="rounded-2xl border border-border bg-card/40 p-6 space-y-4">
      {/* Honeypot */}
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        value={hp}
        onChange={(e) => setHp(e.target.value)}
        style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
        aria-hidden="true"
      />

      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label htmlFor="mb-email" className="mb-1.5 block text-xs font-medium text-muted-foreground">
            {isHindi ? "ईमेल" : "Email"}
          </label>
          <input
            id="mb-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm focus:border-primary focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="mb-name" className="mb-1.5 block text-xs font-medium text-muted-foreground">
            {isHindi ? "नाम (वैकल्पिक)" : "Name (optional)"}
          </label>
          <input
            id="mb-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={isHindi ? "पहला नाम" : "Your first name"}
            className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm focus:border-primary focus:outline-none"
          />
        </div>
      </div>

      <div>
        <label htmlFor="mb-interest" className="mb-1.5 block text-xs font-medium text-muted-foreground">
          {isHindi ? "आप कैसे यात्रा करते हैं? (वैकल्पिक)" : "How do you travel? (optional — helps us tailor Member content)"}
        </label>
        <select
          id="mb-interest"
          value={interest}
          onChange={(e) => setInterest(e.target.value)}
          className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm focus:border-primary focus:outline-none"
        >
          <option value="">—</option>
          {INTERESTS.map((i) => <option key={i} value={i}>{i}</option>)}
        </select>
      </div>

      {error && <p className="text-xs text-red-400" role="alert">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading
          ? isHindi ? "जोड़ रहे हैं…" : "Adding…"
          : isHindi ? "प्रतीक्षा सूची में शामिल हों" : "Join the waitlist"}
      </button>

      <p className="text-xs text-muted-foreground/80">
        {isHindi
          ? "ईमेल को किसी के साथ साझा नहीं किया जाएगा। 2026 लॉन्च पर ही संपर्क।"
          : "We'll email you at launch. Nothing before. Your email is never shared with affiliates or partners."}
      </p>
    </form>
  );
}
