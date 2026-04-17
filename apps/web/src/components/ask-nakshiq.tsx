"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  role: "user" | "assistant";
  content: string;
  sources?: { type: string; id: string; name: string; similarity: number }[];
}

const SUGGESTED_QUESTIONS = [
  "Best time to visit Ladakh?",
  "Kid-friendly places in Rajasthan",
  "Compare Manali vs Rishikesh",
  "Hidden gems in Northeast India",
  "Budget destinations for December",
];

export function AskNakshIQ() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const locale = useLocale();

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (open && messages.length === 0) {
      inputRef.current?.focus();
    }
    scrollToBottom();
  }, [open, messages, scrollToBottom]);

  async function sendMessage(text?: string) {
    const question = (text || input).trim();
    if (!question || loading) return;

    setInput("");
    setError(null);
    const userMsg: Message = { role: "user", content: question };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question,
          history: messages.slice(-6),
        }),
      });

      const data = await res.json();

      if (!res.ok && data.answer) {
        // Rate limit with message
        setMessages((prev) => [...prev, { role: "assistant", content: data.answer, sources: [] }]);
      } else if (!res.ok) {
        setError(data.error || "Something went wrong");
      } else {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.answer, sources: data.sources },
        ]);
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
      case "poi": return null; // POIs don't have their own pages
      case "article": return `/${locale}/articles/${source.id}`;
      case "stay": return null;
      case "state": return `/${locale}/state/${source.id}`;
      default: return null;
    }
  }

  return (
    <>
      {/* Floating trigger button — bottom-left on desktop, above tab bar on mobile */}
      <button
        onClick={() => setOpen((v) => !v)}
        className={`fixed z-[1000] flex items-center gap-2 rounded-full shadow-2xl transition-all duration-300 ${
          open
            ? "bottom-[500px] md:bottom-[520px] right-4 md:right-6 bg-muted/80 px-3 py-2 text-muted-foreground hover:bg-muted"
            : "bottom-[calc(4.5rem+env(safe-area-inset-bottom))] md:bottom-6 right-4 md:right-6 bg-primary px-4 py-3 text-primary-foreground hover:shadow-primary/30 hover:-translate-y-0.5"
        }`}
        aria-label={open ? "Close Ask NakshIQ" : "Ask NakshIQ"}
      >
        {open ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6 6 18" /><path d="m6 6 12 12" />
          </svg>
        ) : (
          <>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            <span className="text-sm font-semibold hidden sm:inline">Ask NakshIQ</span>
          </>
        )}
      </button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-[calc(4.5rem+env(safe-area-inset-bottom))] md:bottom-6 right-4 md:right-6 z-[1000] w-[calc(100vw-2rem)] sm:w-[400px] h-[min(440px,calc(100vh-6rem-env(safe-area-inset-bottom)))] md:h-[480px] rounded-2xl border border-border bg-card shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-border px-4 py-3 bg-card">
              <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold">Ask NakshIQ</div>
                <div className="text-[10px] text-muted-foreground">AI travel assistant — powered by your data</div>
              </div>
              <button
                onClick={() => { setMessages([]); setError(null); }}
                className="text-[10px] text-muted-foreground hover:text-foreground px-2 py-1 rounded-md hover:bg-muted transition-colors"
              >
                Clear
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 scrollbar-none">
              {messages.length === 0 && (
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground text-center py-2">
                    Ask me anything about traveling in India
                  </p>
                  <div className="flex flex-wrap gap-1.5 justify-center">
                    {SUGGESTED_QUESTIONS.map((q) => (
                      <button
                        key={q}
                        onClick={() => sendMessage(q)}
                        className="rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors"
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
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground rounded-br-md"
                        : "bg-muted/50 text-foreground rounded-bl-md"
                    }`}
                  >
                    {msg.role === "assistant" ? (
                      <div className="space-y-2">
                        <div className="whitespace-pre-wrap">{msg.content}</div>
                        {msg.sources && msg.sources.length > 0 && (
                          <div className="flex flex-wrap gap-1 pt-1 border-t border-border/30">
                            {msg.sources.map((s) => {
                              const url = getSourceUrl(s);
                              return url ? (
                                <a
                                  key={s.id}
                                  href={url}
                                  className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary hover:bg-primary/20 transition-colors"
                                >
                                  {s.name}
                                </a>
                              ) : (
                                <span
                                  key={s.id}
                                  className="inline-flex items-center gap-1 rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground"
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
                  <div className="bg-muted/50 rounded-2xl rounded-bl-md px-4 py-3">
                    <div className="flex gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}

              {error && (
                <div className="text-center text-xs text-red-400 py-1">{error}</div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="border-t border-border px-3 py-2.5 bg-card">
              <form
                onSubmit={(e) => { e.preventDefault(); sendMessage(); }}
                className="flex items-center gap-2"
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about any destination..."
                  className="flex-1 rounded-xl border border-border bg-muted/30 px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 transition-colors"
                  disabled={loading}
                  maxLength={500}
                />
                <button
                  type="submit"
                  disabled={loading || !input.trim()}
                  className="rounded-xl bg-primary px-3 py-2.5 text-primary-foreground disabled:opacity-40 transition-opacity"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                </button>
              </form>
              <div className="mt-1.5 text-center text-[9px] text-muted-foreground/40">
                Powered by NakshIQ data — answers may not be perfect
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
