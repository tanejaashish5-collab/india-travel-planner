import type { ReactNode } from "react";

// Names like "Ooty (Udagamandalam)" or "Pondicherry (Puducherry)" carry
// a popular name plus an alternate/official one in parens. Rendered raw,
// the parenthetical competes with the headline. This helper splits the
// two so the primary stays at full display weight and the alt sits
// smaller and dimmer beside it.
export function splitDisplayName(name: string): { primary: string; alt: string | null } {
  const m = name.match(/^(.+?)\s*\(([^)]+)\)\s*$/);
  if (!m) return { primary: name, alt: null };
  return { primary: m[1], alt: m[2] };
}

export function renderDisplayName(name: string): ReactNode {
  const { primary, alt } = splitDisplayName(name);
  if (!alt) return name;
  return (
    <>
      {primary}
      {" "}
      <span
        style={{
          fontSize: "0.5em",
          fontWeight: 400,
          color: "var(--bone-dim, rgba(255,255,255,0.6))",
          letterSpacing: "0.02em",
          whiteSpace: "nowrap",
          verticalAlign: "0.18em",
        }}
      >
        ({alt})
      </span>
    </>
  );
}
