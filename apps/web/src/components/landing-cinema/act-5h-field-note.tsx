"use client";

import { useTranslations } from "next-intl";
import { destinationImage } from "@/lib/image-url";
import { useInView } from "./use-in-view";
import { currentMonthLongIST } from "@itp/shared";

/* ============================================================
   ACT V½ — Field Note (interstitial)

   A thin breathing-room moment between Director's Cut and Dailies.
   Full-bleed ambient image + a 30-word transcribed quote that gives
   the page its "alive in real-time" feel without claiming editor identity.

   Quote attribution rule: "— NakshIQ · {month} dispatch" (NO initials).
   Per locked plan, no fabricated humans (`feedback_no_fake_data.md`).

   The note rotates daily once a real `field-notes/{YYYY-MM}.json` lands.
   For now we use the top dispatch hero's tagline + state as the editorial
   anchor — that's already verified, real-time copy that comes from the
   actual on-site research timestamps.
   ============================================================ */

export type FieldNote = {
  destinationId: string;
  destinationName: string;
  state: string;
  quote: string; // 25-35 words ideally
  verifiedAt: string | null;
};

export function Act5hFieldNote({ note }: { note: FieldNote | null }) {
  const t = useTranslations("cinema");
  const monthLong = currentMonthLongIST();
  const [ref, seen] = useInView<HTMLDivElement>({ threshold: 0.25 });

  if (!note) return null;

  return (
    <section
      ref={ref}
      style={{
        position: "relative",
        height: "70vh",
        minHeight: 520,
        overflow: "hidden",
        borderBottom: "1px solid var(--hair)",
        background: "#000",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={destinationImage(note.destinationId, 2400)}
        alt={`${note.destinationName} — field note`}
        loading="lazy"
        decoding="async"
        className="nq-kb-2"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          filter: "saturate(0.78) brightness(0.6)",
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.2) 40%, rgba(0,0,0,0.85) 100%)",
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 48px",
        }}
      >
        <div
          className={`nq-fadeup ${seen ? "in" : ""}`}
          style={{ maxWidth: 880, textAlign: "center" }}
        >
          <div className="nq-kicker" style={{ marginBottom: 28 }}>
            {t("fieldNoteKicker", { state: note.state, name: note.destinationName })}
          </div>
          <p
            style={{
              fontFamily: "var(--cinema-display)",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "clamp(28px, 3.2vw, 42px)",
              lineHeight: 1.32,
              color: "var(--bone)",
              margin: 0,
              textWrap: "balance",
            }}
          >
            &ldquo;{note.quote}&rdquo;
          </p>
          <div
            className="nq-meta"
            style={{ marginTop: 32, color: "var(--bone-dim)" }}
          >
            {t("fieldNoteAttribution", { month: monthLong })}
          </div>
        </div>
      </div>
    </section>
  );
}
