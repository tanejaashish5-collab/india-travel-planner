"use client";

import { useState } from "react";

type Topic = "correction" | "press" | "partnership" | "contributor" | "other";

export function ContactForm({ locale }: { locale: string }) {
  const isHindi = locale === "hi";
  const [topic, setTopic] = useState<Topic>("correction");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [hp, setHp] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!message.trim()) {
      setError(isHindi ? "कृपया संदेश लिखें।" : "Please write a message.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/suggestions", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          target_table: "contact",
          target_id: topic,
          field_path: null,
          current_value: null,
          suggested_value: null,
          message: `[${topic}] ${message}`,
          submitter_email: email || null,
          hp,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setError(
          data.error === "too_many"
            ? isHindi
              ? "बहुत अधिक संदेश — एक घंटे बाद कोशिश करें।"
              : "Too many messages from this network — try again in an hour."
            : isHindi
              ? "भेजने में समस्या। कुछ मिनट में फिर कोशिश करें।"
              : "Couldn't send. Please try again in a moment."
        );
      } else {
        setDone(true);
        setMessage("");
        setEmail("");
      }
    } catch {
      setError(
        isHindi
          ? "नेटवर्क समस्या। कुछ मिनट में फिर कोशिश करें।"
          : "Network error. Please try again in a moment."
      );
    } finally {
      setLoading(false);
    }
  }

  if (done) {
    return (
      <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-6">
        <p className="text-sm font-medium text-emerald-400">
          {isHindi ? "धन्यवाद — आपका संदेश मिल गया।" : "Thanks — your message landed in our inbox."}
        </p>
        <p className="mt-2 text-xs text-muted-foreground">
          {isHindi
            ? "जब जवाब देने लायक होगा, हम आपके ईमेल पर लिखेंगे।"
            : "If it calls for a reply, we'll email you back. If it was a correction, you'll see it in the next editorial pass."}
        </p>
      </div>
    );
  }

  const topics: Array<{ id: Topic; en: string; hi: string }> = [
    { id: "correction", en: "Correction / fact-check", hi: "सुधार / तथ्य-जाँच" },
    { id: "press", en: "Press or media", hi: "प्रेस / मीडिया" },
    { id: "partnership", en: "Partnership", hi: "साझेदारी" },
    { id: "contributor", en: "Local expert / contributor", hi: "स्थानीय विशेषज्ञ" },
    { id: "other", en: "Something else", hi: "अन्य" },
  ];

  return (
    <form onSubmit={submit} className="space-y-4 rounded-xl border border-border bg-card p-6">
      {/* Honeypot — hidden from humans, tempting to bots */}
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        value={hp}
        onChange={(e) => setHp(e.target.value)}
        style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
        aria-hidden="true"
      />

      <div>
        <label htmlFor="contact-topic" className="mb-1.5 block text-xs font-medium text-muted-foreground">
          {isHindi ? "विषय" : "Topic"}
        </label>
        <select
          id="contact-topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value as Topic)}
          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none"
        >
          {topics.map((t) => (
            <option key={t.id} value={t.id}>
              {isHindi ? t.hi : t.en}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="contact-email" className="mb-1.5 block text-xs font-medium text-muted-foreground">
          {isHindi ? "ईमेल (वैकल्पिक)" : "Email (optional — only if you want a reply)"}
        </label>
        <input
          id="contact-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none"
        />
      </div>

      <div>
        <label htmlFor="contact-message" className="mb-1.5 block text-xs font-medium text-muted-foreground">
          {isHindi ? "संदेश" : "Message"}
        </label>
        <textarea
          id="contact-message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={5}
          maxLength={2000}
          placeholder={
            isHindi
              ? "क्या बताना चाहते हैं?"
              : "What would you like to say? Include a URL if you're flagging something specific."
          }
          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none"
          required
        />
        <p className="mt-1 text-right text-xs text-muted-foreground/60">
          {message.length}/2000
        </p>
      </div>

      {error && (
        <p className="text-xs text-red-400" role="alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading
          ? isHindi
            ? "भेज रहे हैं…"
            : "Sending…"
          : isHindi
            ? "संदेश भेजें"
            : "Send message"}
      </button>
    </form>
  );
}
