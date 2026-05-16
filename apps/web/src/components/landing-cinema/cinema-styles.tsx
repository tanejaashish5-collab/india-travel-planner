"use client";

// Lightweight component that exists only to pull cinema.css into the bundle
// for routes that need its scoped utilities (.nq-grain, .nq-glow-radial,
// .nq-glow-bookend, .nq-display, .nq-kicker, etc.) but live OUTSIDE the
// landing-cinema folder. Dynamic-route segments like [locale] choke on
// direct CSS imports via @/ alias and `..` relative paths under Turbopack,
// so we route the import through this collocated client component instead.
//
// Usage in a server page:
//   import { CinemaStyles } from "@/components/landing-cinema/cinema-styles";
//   <CinemaStyles />  // anywhere in the JSX tree
import "./cinema.css";

export function CinemaStyles() {
  return null;
}
