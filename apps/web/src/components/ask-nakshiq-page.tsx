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

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

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
      case "destination":
        return `/${locale}/destination/${source.id}`;
      case "article":
        return `/${locale}/articles/${source.id}`;
      case "state":
        return `/${locale}/state/${source.id}`;
      default:
        return null;
    }
  }

  return (
    <div style={{ border: "1px solid var(--hair)", background: "var(--paper)" }}>
      {/* Messages area */}
      <div
        style={{
          minHeight: 400,
          maxHeight: "60vh",
          overflowY: "auto",
          padding: "24px 20px",
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
      >
        {messages.length === 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 24, padding: "32px 0" }}>
            <div style={{ textAlign: "center" }}>
              <p
                style={{
                  fontFamily: "var(--cinema-mono)",
                  fontSize: 10,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "var(--vermillion)",
                  marginBottom: 12,
                }}
              >
                Start anywhere
              </p>
              <p
                style={{
                  fontFamily: "var(--cinema-display)",
                  fontStyle: "italic",
                  fontWeight: 500,
                  fontSize: "clamp(20px, 2.5vw, 26px)",
                  lineHeight: 1.25,
                  color: "var(--bone)",
                  margin: "0 auto 12px",
                  maxWidth: 520,
                  textWrap: "balance",
                }}
              >
                505 destinations, monthly scores, kids ratings, safety data.
              </p>
              <p
                style={{
                  fontFamily: "var(--cinema-ui)",
                  fontSize: 13,
                  lineHeight: 1.65,
                  color: "var(--bone-dim)",
                  margin: 0,
                  maxWidth: 460,
                  marginInline: "auto",
                }}
              >
                Ask anything about travelling in India.
              </p>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center", maxWidth: 640, marginInline: "auto" }}>
              {SUGGESTED.map((q) => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  style={{
                    fontFamily: "var(--cinema-ui)",
                    fontSize: 12,
                    padding: "8px 14px",
                    background: "transparent",
                    border: "1px solid var(--hair)",
                    color: "var(--bone-dim)",
                    cursor: "pointer",
                  }}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
            }}
          >
            <div
              style={{
                maxWidth: "82%",
                padding: "12px 16px",
                fontFamily: "var(--cinema-ui)",
                fontSize: 14,
                lineHeight: 1.65,
                ...(msg.role === "user"
                  ? {
                      background: "var(--vermillion)",
                      color: "var(--paper)",
                      borderTop: "1px solid var(--vermillion)",
                    }
                  : {
                      background: "rgba(245, 241, 232, 0.04)",
                      color: "var(--bone)",
                      border: "1px solid var(--hair)",
                    }),
              }}
            >
              {msg.role === "assistant" ? (
                <div>
                  <div style={{ whiteSpace: "pre-wrap" }}>{msg.content}</div>
                  {msg.sources && msg.sources.length > 0 && (
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 6,
                        marginTop: 12,
                        paddingTop: 10,
                        borderTop: "1px solid var(--hair)",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--cinema-mono)",
                          fontSize: 10,
                          letterSpacing: "0.18em",
                          textTransform: "uppercase",
                          color: "var(--bone-faint)",
                          alignSelf: "center",
                          marginRight: 4,
                        }}
                      >
                        Sources:
                      </span>
                      {msg.sources.map((s) => {
                        const url = getSourceUrl(s);
                        const chip = {
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 4,
                          padding: "3px 10px",
                          fontFamily: "var(--cinema-mono)",
                          fontSize: 11,
                          letterSpacing: "0.05em",
                          border: `1px solid ${url ? "var(--vermillion)" : "var(--hair)"}`,
                          color: url ? "var(--vermillion)" : "var(--bone-faint)",
                          textDecoration: "none",
                        };
                        return url ? (
                          <a key={s.id} href={url} style={chip}>
                            {s.name}
                          </a>
                        ) : (
                          <span key={s.id} style={chip}>
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
          <div style={{ display: "flex", justifyContent: "flex-start" }}>
            <div
              style={{
                padding: "12px 18px",
                background: "rgba(245, 241, 232, 0.04)",
                border: "1px solid var(--hair)",
                display: "flex",
                gap: 6,
              }}
            >
              {[0, 150, 300].map((delay) => (
                <span
                  key={delay}
                  style={{
                    height: 8,
                    width: 8,
                    borderRadius: "50%",
                    background: "var(--vermillion)",
                    opacity: 0.5,
                    animation: "nq-pulse 1.2s ease-in-out infinite",
                    animationDelay: `${delay}ms`,
                  }}
                />
              ))}
              <style>{`@keyframes nq-pulse { 0%, 80%, 100% { opacity: 0.3; transform: scale(0.8); } 40% { opacity: 1; transform: scale(1); } }`}</style>
            </div>
          </div>
        )}

        {error && (
          <p
            style={{
              fontFamily: "var(--cinema-mono)",
              fontSize: 11,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--vermillion)",
              textAlign: "center",
              margin: "4px 0",
            }}
          >
            {error}
          </p>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div style={{ borderTop: "1px solid var(--hair)", padding: "14px 20px" }}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage();
          }}
          style={{ display: "flex", alignItems: "flex-end", gap: 8 }}
        >
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
            placeholder="Ask about any destination, best time, safety, kids..."
            style={{
              flex: 1,
              minWidth: 0,
              border: "1px solid var(--hair)",
              background: "rgba(245, 241, 232, 0.02)",
              color: "var(--bone)",
              padding: "10px 14px",
              fontFamily: "var(--cinema-ui)",
              fontSize: 14,
              resize: "none",
              outline: "none",
            }}
            rows={1}
            disabled={loading}
            maxLength={500}
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            aria-label="Send question"
            style={{
              fontFamily: "var(--cinema-mono)",
              fontSize: 11,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              padding: "10px 16px",
              background: input.trim() && !loading ? "var(--vermillion)" : "transparent",
              color: input.trim() && !loading ? "var(--paper)" : "var(--bone-faint)",
              border: `1px solid ${input.trim() && !loading ? "var(--vermillion)" : "var(--hair)"}`,
              cursor: input.trim() && !loading ? "pointer" : "not-allowed",
              flexShrink: 0,
            }}
          >
            Send →
          </button>
        </form>
        <p
          style={{
            fontFamily: "var(--cinema-mono)",
            fontSize: 10,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "var(--bone-faint)",
            textAlign: "center",
            margin: "10px 0 0",
          }}
        >
          20 questions/day · answers from NakshIQ verified data
        </p>
      </div>
    </div>
  );
}
