"use client";

import { LazyMotion, domMax } from "framer-motion";
import type { ReactNode } from "react";

/**
 * LazyMotion wrapper — mounts once at the locale layout level and defers
 * framer-motion's features bundle. Every component in the tree uses the
 * light `m.*` primitives instead of `motion.*`, so initial JS ships
 * ~7KB lighter. `domMax` features are loaded so drag + layout animations
 * still work (used in the nav indicator, destination-detail active-tab
 * shared element, and the personalisation-quiz drag-to-dismiss sheet).
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <LazyMotion features={domMax}>{children}</LazyMotion>;
}
