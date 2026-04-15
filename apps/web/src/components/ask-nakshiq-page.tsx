"use client";

import { useState, useRef, useEffect, useCallback } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
  sources?: { type: string; id: string; name: string; similarity: number }[];
}

const SUGGESTED = [
  "Best time to visit Ladakh with kids?",
  "Kid-friendly places in Rajasthan",
  "Compare Manali vs Shimla for December",
  "Hidden gems in Northeast India",
  "5-day Uttarakhand itinerary",
  "Safest destinations for solo female travel",
  "Best temples in Varanasi",
  "Budget destinations under ₹5,000",
];

export function AskNakshIQPage({ locale }: { locale: string }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => { scrollToBottom(); }, [messages, scrollToBottom]);

  async function sendMessage(text?: string) {
    const question = (text || input).trim();
    if (!question || loading) return;
    setInput("");
    setError(null);
    setMessages((prev) => [...prev, { role: "user", content: question }]);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, history: messages.slice(-6) }),
      });
      const data = await res.json();
      if (!res.ok && data.answer) {
        setMessages((prev) => [...prev, { role: "assistant", content: data.answer, sources: [] }]);
      } else if (!res.ok) {
        setError(data.error || "Something went wrong");
      } else {
        setMessages((prev) => [...prev, { role: "assistant", content: data.answer, sources: data.sources }]);
      }
    } catch {
      setError("Failed to connect. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function getSourceUrl(source: { type: string; id: string }) {
    switch (source.type) {
      case "destination": return `/${locale}/destination/${source.id}`;
      case "article": return `/${locale}/articles/${source.id}`;
      case "state": return `/${locale}/state/${source.id}`;
      default: return null;
    }
  }

  return (
    <div className="rounded-2xl border border-border bg-card/50 overflow-hidden">
      {/* Messages area */}
      <div className="min-h-[400px] max-h-[60vh] overflow-y-auto px-4 sm:px-6 py-6 space-y-4 scrollbar-none">
        {messages.length === 0 && (
          <div className="space-y-6 py-8">
            <div className="text-center">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 mb-4">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-primary">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </div>
              <p className="text-muted-foreground">
                I know about 340+ destinations, 710+ places, monthly scores, kids ratings, and more.
                <br />Ask me anything about traveling in India.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 justify-center max-w-lg mx-auto">
              {SUGGESTED.map((q) => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  className="rounded-full border border-border px-3.5 py-2 text-xs text-muted-foreground hover:text-foreground hover:border-primary/40 hover:bg-primary/5 transition-all"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                msg.role === "user"
                  ? "bg-primary text-primary-foreground rounded-br-md"
                  : "bg-muted/40 text-foreground rounded-bl-md"
              }`}
            >
              {msg.role === "assistant" ? (
                <div className="space-y-2">
                  <div className="whitespace-pre-wrap">{msg.content}</div>
                  {msg.sources && msg.sources.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-2 border-t border-border/30">
                      <span className="text-[10px] text-muted-foreground/60 self-center mr-1">Sources:</span>
                      {msg.sources.map((s) => {
                        const url = getSourceUrl(s);
                        return url ? (
                          <a
                            key={s.id}
                            href={url}
                            className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-0.5 text-[11px] font-medium text-primary hover:bg-primary/20 transition-colors"
                          >
                            {s.name}
                          </a>
                        ) : (
                          <span
                            key={s.id}
                            className="inline-flex items-center rounded-full bg-muted px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground"
                          >
                            {s.name}
                          </span>
                        );
                      })}
                    </div>
                  )}
                </div>
              ) : (
                msg.content
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-muted/40 rounded-2xl rounded-bl-md px-5 py-3.5">
              <div className="flex gap-1.5">
                <span className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}

        {error && <div className="text-center text-xs text-red-400 py-1">{error}</div>}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-border px-4 sm:px-6 py-3 bg-card">
        <form onSubmit={(e) => { e.preventDefault(); sendMessage(); }} className="flex items-end gap-2">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
            }}
            placeholder="Ask about any destination, best time to visit, safety, kids..."
            className="flex-1 rounded-xl border border-border bg-muted/30 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 transition-colors resize-none"
            rows={1}
            disabled={loading}
            maxLength={500}
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="rounded-xl bg-primary px-4 py-3 text-primary-foreground disabled:opacity-40 transition-opacity shrink-0"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </form>
        <div className="mt-2 text-center text-[10px] text-muted-foreground/40">
          20 questions/day — answers powered by NakshIQ verified data
        </div>
      </div>
    </div>
  );
}
