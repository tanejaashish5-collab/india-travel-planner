/* ============================================================
   Shared helpers for /guide/[sub] cinematic redesigns. Avoids
   duplicating <FAQList /> + prose style objects across each
   guide page file. Strictly cinematic-palette (--bone, --bone-
   dim, --hair, var(--cinema-ui/display/mono)).
   ============================================================ */

import type { CSSProperties } from "react";

export const guideProse: CSSProperties = {
  fontFamily: "var(--cinema-ui)",
  fontSize: 16,
  lineHeight: 1.75,
  color: "var(--bone-dim)",
  margin: 0,
};

export const guideProseBold: CSSProperties = {
  fontFamily: "var(--cinema-ui)",
  fontSize: 16,
  lineHeight: 1.5,
  color: "var(--bone)",
  margin: 0,
  fontWeight: 600,
};

export const guideInlineLink: CSSProperties = {
  color: "var(--vermillion)",
  textDecoration: "underline",
  textUnderlineOffset: "3px",
};

/* FAQ list — mirrors /guide/visa pattern. Renders inside a guide
   section, NOT as its own section header (caller wraps it). */
export function GuideFaqList({
  faqs,
}: {
  faqs: { question: string; answer: string }[];
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {faqs.map((faq, i) => (
        <div
          key={i}
          style={{
            paddingTop: i === 0 ? 0 : 16,
            borderTop: i === 0 ? "none" : "1px solid var(--hair)",
          }}
        >
          <h3
            style={{
              fontFamily: "var(--cinema-display)",
              fontStyle: "italic",
              fontWeight: 500,
              fontSize: 19,
              lineHeight: 1.3,
              color: "var(--bone)",
              margin: "0 0 8px",
            }}
          >
            {faq.question}
          </h3>
          <p style={guideProse}>{faq.answer}</p>
        </div>
      ))}
    </div>
  );
}

/* Bordered card row — for "do this" lists where each item has a
   strong title + body. Replaces the rounded-xl border pattern
   used in the legacy guides. */
export function GuideCardRow({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <li
      style={{
        listStyle: "none",
        padding: "16px 18px",
        border: "1px solid var(--hair)",
        background: "rgba(245, 241, 232, 0.025)",
        marginBottom: 12,
      }}
    >
      <p style={{ ...guideProseBold, marginBottom: 6 }}>{title}</p>
      <p style={guideProse}>{children}</p>
    </li>
  );
}

/* Bulleted list with cinematic typography. */
export function GuideBullets({
  items,
}: {
  items: React.ReactNode[];
}) {
  return (
    <ul style={{ ...guideProse, paddingLeft: 24, margin: 0 }}>
      {items.map((item, i) => (
        <li key={i} style={{ marginBottom: 8 }}>{item}</li>
      ))}
    </ul>
  );
}

/* Numbered steps — for STEPS arrays (scams, transport). */
export function GuideSteps({
  steps,
}: {
  steps: { name: string; text: string }[];
}) {
  return (
    <ol style={{ listStyle: "none", padding: 0, margin: 0 }}>
      {steps.map((s, i) => (
        <li
          key={i}
          style={{
            display: "grid",
            gridTemplateColumns: "40px 1fr",
            gap: 18,
            padding: "16px 0",
            borderTop: i === 0 ? "none" : "1px solid var(--hair)",
          }}
        >
          <span
            style={{
              fontFamily: "var(--cinema-mono)",
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: "0.12em",
              color: "var(--vermillion)",
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {String(i + 1).padStart(2, "0")}
          </span>
          <div>
            <p style={{ ...guideProseBold, marginBottom: 6 }}>{s.name}</p>
            <p style={guideProse}>{s.text}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
