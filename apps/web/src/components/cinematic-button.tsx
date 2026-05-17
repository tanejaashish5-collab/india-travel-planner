"use client";

/* ============================================================
   <CinematicButton> — design-system primitive that replaces the
   inline `ctaPrimary` / `ctaSecondary` CSSProperties objects from
   landing-cinema/editorial.tsx. Use this for any cinematic page
   CTA going forward.

   Variants:
     primary   — vermillion fill, paper text (the conversion CTA)
     secondary — bone outline, bone text (default action)
     ghost     — no border, bone text, mono caps (utility/inline)

   Sizes (vertical padding × font size):
     sm — 12px / 11px
     md — 18px / 11px (default — matches existing ctaPrimary)
     lg — 22px / 13px

   Polymorphic: pass `href` to render <a>, otherwise renders <button>.

   Usage:
     <CinematicButton href="/en/explore">View all destinations</CinematicButton>
     <CinematicButton variant="primary" size="lg" onClick={...}>Plan with AI</CinematicButton>
   ============================================================ */

import type { CSSProperties, ReactNode, MouseEventHandler } from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

type CommonProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  /** Optional trailing arrow / icon node. Renders right of the label. */
  trailing?: ReactNode;
  /** Additional inline styles merged on top of the variant defaults. */
  style?: CSSProperties;
  className?: string;
};

type AsLink = CommonProps & {
  href: string;
  onClick?: never;
  type?: never;
  disabled?: never;
};

type AsButton = CommonProps & {
  href?: undefined;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
};

export type CinematicButtonProps = AsLink | AsButton;

const SIZE_STYLES: Record<Size, CSSProperties> = {
  sm: { padding: "12px 22px", fontSize: 11 },
  md: { padding: "18px 28px", fontSize: 11 },
  lg: { padding: "22px 32px", fontSize: 13 },
};

const VARIANT_STYLES: Record<Variant, CSSProperties> = {
  primary: {
    background: "var(--vermillion)",
    color: "var(--paper)",
    border: "1px solid var(--vermillion)",
  },
  secondary: {
    background: "transparent",
    color: "var(--bone)",
    border: "1px solid var(--hair)",
  },
  ghost: {
    background: "transparent",
    color: "var(--bone)",
    border: "1px solid transparent",
  },
};

const BASE_STYLE: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 14,
  fontFamily: "var(--cinema-ui)",
  fontWeight: 700,
  lineHeight: 1,
  textTransform: "uppercase",
  letterSpacing: "0.18em",
  textDecoration: "none",
  cursor: "pointer",
  transition: "background 200ms ease, color 200ms ease, border-color 200ms ease, opacity 200ms ease",
};

export function CinematicButton(props: CinematicButtonProps) {
  const { children, variant = "secondary", size = "md", trailing, style, className } = props;

  const merged: CSSProperties = {
    ...BASE_STYLE,
    ...SIZE_STYLES[size],
    ...VARIANT_STYLES[variant],
    ...style,
  };

  const content = (
    <>
      <span>{children}</span>
      {trailing ? <span aria-hidden>{trailing}</span> : null}
    </>
  );

  if ("href" in props && props.href) {
    return (
      <a href={props.href} className={className} style={merged}>
        {content}
      </a>
    );
  }

  const { onClick, type = "button", disabled } = props as AsButton;
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={className}
      style={{ ...merged, opacity: disabled ? 0.5 : 1 }}
    >
      {content}
    </button>
  );
}
