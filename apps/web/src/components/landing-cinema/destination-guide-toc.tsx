"use client";

import { useEffect, useState } from "react";

/* ============================================================
   In-guide TOC — labelled right-edge rail. Sister to the dots-only
   ScrollRail; this one shows the section names so readers can
   navigate deliberately ("take me to Q&A", not "scroll past three
   acts and check"). Auto-hidden until the cover scrolls out.

   The user has asked for this three times. It must not look like
   the production DestinationSectionNav (white shadcn dots on dark)
   — vermillion dot · uppercase mono label · brighten on active.
   ============================================================ */

export type TocItem = {
  id: string;       // anchor id, e.g. "dest-act-2"
  label: string;    // uppercase short label, e.g. "VERDICT"
};

export function DestinationGuideToc({ items }: { items: TocItem[] }) {
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!items.length) return;

    // Active-section tracking via scroll position. IntersectionObserver
    // with intersectionRatio is unreliable for sections taller than the
    // viewport — once you're mid-section no entries fire and the active
    // index stops updating (user noticed: scrolled into Stay & Eat but
    // TOC still highlighted Verdict). Strategy: every scroll frame, pick
    // the section whose top is closest at-or-above 38% of the viewport.
    // That tracks an editorial "now reading" line consistently.
    const updateActive = () => {
      const targets = items
        .map((a) => document.getElementById(a.id))
        .filter((el): el is HTMLElement => !!el);
      if (!targets.length) return;
      const midline = window.innerHeight * 0.38;
      let bestIdx = 0;
      let bestTop = -Infinity;
      targets.forEach((el) => {
        const top = el.getBoundingClientRect().top;
        if (top <= midline && top > bestTop) {
          bestTop = top;
          const idx = items.findIndex((a) => a.id === el.id);
          if (idx >= 0) bestIdx = idx;
        }
      });
      setActive((prev) => (prev !== bestIdx ? bestIdx : prev));
    };

    let rafId: number | null = null;
    const onScroll = () => {
      if (rafId != null) return;
      rafId = requestAnimationFrame(() => {
        updateActive();
        rafId = null;
      });
    };

    updateActive();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    // Hide on hero — only show once cover (#dest-act-1) is largely scrolled past.
    const cover = document.getElementById("dest-act-1");
    let hideObs: IntersectionObserver | null = null;
    if (cover) {
      hideObs = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            setVisible(!e.isIntersecting);
          }
        },
        { threshold: 0 },
      );
      hideObs.observe(cover);
    } else {
      setVisible(true);
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafId != null) cancelAnimationFrame(rafId);
      hideObs?.disconnect();
    };
  }, [items]);

  if (!items.length) return null;

  return (
    <nav
      aria-label="In-guide jump navigation"
      style={{
        position: "fixed",
        top: "50%",
        right: 36,
        transform: "translateY(-50%)",
        zIndex: 28,
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
        transition: "opacity 0.5s cubic-bezier(0.25,0.46,0.45,0.94)",
        display: "flex",
        flexDirection: "column",
        gap: 4,
        maxWidth: 200,
      }}
    >
      <div
        className="nq-mono"
        style={{
          fontSize: 10,
          color: "var(--vermillion)",
          letterSpacing: "0.26em",
          marginBottom: 8,
          textAlign: "right",
        }}
      >
        IN THIS GUIDE
      </div>
      {items.map((item, i) => {
        const isActive = i === active;
        return (
          <a
            key={item.id}
            href={`#${item.id}`}
            onClick={(e) => {
              e.preventDefault();
              document
                .getElementById(item.id)
                ?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              gap: 10,
              padding: "6px 0",
              fontFamily: "var(--cinema-mono)",
              fontSize: 11,
              color: isActive ? "var(--bone)" : "var(--bone-faint)",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              textDecoration: "none",
              transition: "color 0.25s ease",
              whiteSpace: "nowrap",
            }}
          >
            <span>{item.label}</span>
            <span
              style={{
                display: "inline-block",
                width: isActive ? 8 : 6,
                height: isActive ? 8 : 6,
                borderRadius: "50%",
                background: isActive ? "var(--vermillion)" : "rgba(229,86,66,0.32)",
                transition: "all 0.25s ease",
                flexShrink: 0,
              }}
            />
          </a>
        );
      })}
    </nav>
  );
}
