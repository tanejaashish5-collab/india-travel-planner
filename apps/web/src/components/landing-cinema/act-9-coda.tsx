"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { destinationImage } from "@/lib/image-url";
import { useInView } from "./use-in-view";
import { getIssueNumber } from "./helpers";
import { NewsletterSignup } from "../newsletter-signup";
import { currentMonthLongIST } from "@itp/shared";

/* ============================================================
   ACT IX — The Coda
   Source: data/research/Landing Page/v7.2-reel/reel2.jsx:365-415 R09_Closing
         + data/research/Landing Page/v1-editorial/app.jsx:298-313 NewsletterEditorial

   The dramatic close: full-bleed ambient image (rotates between top
   dispatch heroes, Ken Burns), giant "Go with confidence." italic
   typewriter, bureau credits, two CTAs, and the absorbed footer line
   at the very bottom edge — no separate <Footer/> renders below
   on landing (locked decision; ACT IX is the page sign-off).

   The footer line carries: Naksh.iq · Editorial · About · Contact ·
   © {year} NakshIQ · Issue Nº XX · privacy · terms.
   ============================================================ */

export function Act9Coda({
  ambientImageIds,
}: {
  // Top destination IDs for the ambient image carousel. Defaults to a
  // safe fallback if upstream passes nothing.
  ambientImageIds: string[];
}) {
  const t = useTranslations("cinema");
  const locale = useLocale();
  const monthLong = currentMonthLongIST();
  const [ref, seen] = useInView<HTMLDivElement>({ threshold: 0.25 });
  const [typed, setTyped] = useState(false);
  const [imgIdx, setImgIdx] = useState(0);
  const issueNum = getIssueNumber();
  const year = new Date().getFullYear();

  // Cycle ambient images every 6 seconds for the closing carousel.
  useEffect(() => {
    if (!ambientImageIds.length || ambientImageIds.length < 2) return;
    const id = setInterval(() => {
      setImgIdx((i) => (i + 1) % ambientImageIds.length);
    }, 6000);
    return () => clearInterval(id);
  }, [ambientImageIds.length]);

  useEffect(() => {
    if (seen) {
      const id = setTimeout(() => setTyped(true), 700);
      return () => clearTimeout(id);
    }
  }, [seen]);

  const fallbackImage = "spiti-valley";
  const images = ambientImageIds.length ? ambientImageIds : [fallbackImage];

  return (
    <section
      ref={ref}
      style={{
        position: "relative",
        minHeight: "100vh",
        overflow: "hidden",
        background: "#000",
      }}
    >
      {/* Ambient image carousel */}
      {images.map((id, i) => (
        <div
          key={id}
          aria-hidden={i === imgIdx ? undefined : true}
          style={{
            position: "absolute",
            inset: 0,
            opacity: i === imgIdx ? 1 : 0,
            transition: "opacity 1500ms cubic-bezier(.25,.46,.45,.94)",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={destinationImage(id, 2400)}
            alt=""
            loading="lazy"
            decoding="async"
            className="nq-kb-1"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              filter: "saturate(0.86) brightness(0.65)",
            }}
          />
        </div>
      ))}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 50% 60%, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.7) 70%, rgba(0,0,0,0.95) 100%)",
        }}
      />

      <div
        style={{
          position: "relative",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "calc(8vh + 80px) 48px calc(4vh + 24px)",
          maxWidth: 1500,
          margin: "0 auto",
        }}
      >
        {/* Lede */}
        <div className={`nq-fadeup ${seen ? "in" : ""}`}>
          <p className="nq-meta" style={{ color: "var(--bone-dim)", marginBottom: 24 }}>
            — {t("codaLabel")}
          </p>
          <p
            style={{
              fontFamily: "var(--cinema-display)",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: 22,
              lineHeight: 1.4,
              color: "var(--bone-dim)",
              margin: 0,
              maxWidth: 680,
              textWrap: "balance",
            }}
          >
            {t.rich("codaLede", {
              em: (chunks) => <span style={{ color: "var(--bone)" }}>{chunks}</span>,
            })}
          </p>
        </div>

        {/* Big sign-off */}
        <h2
          className="nq-display"
          style={{
            fontSize: "clamp(56px, 9vw, 132px)",
            lineHeight: 0.86,
            letterSpacing: "-0.04em",
            color: "var(--bone)",
            margin: "60px 0",
            textWrap: "balance",
          }}
        >
          <Typewriter text={t("codaSignoff")} on={typed} speed={42} />
          <span className="dot">.</span>
        </h2>

        {/* Newsletter + bureau credits */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)",
            gap: 60,
            alignItems: "end",
          }}
        >
          <div className={`nq-fadeup ${seen ? "in" : ""}`} style={{ transitionDelay: "1.4s" }}>
            <NewsletterSignup
              source="cinema-coda"
              headline={t("windowHeadline")}
              subhead={t("windowSubhead")}
              buttonLabel={t("windowSubscribe")}
              footnote={t("windowFootnote")}
            />
          </div>
          <div
            className={`nq-fadeup ${seen ? "in" : ""}`}
            style={{
              transitionDelay: "1.6s",
              borderLeft: "1px solid var(--hair)",
              paddingLeft: 36,
            }}
          >
            <span className="nq-meta" style={{ marginBottom: 14, display: "block" }}>
              {t("credits")}
            </span>
            <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
              {[
                ["bureau", t("creditsBureau")],
                ["founded", t("creditsFounded")],
                ["nextDrop", t("creditsNextDrop")],
              ].map(([k, v], i, arr) => (
                <li
                  key={k}
                  style={{
                    padding: "12px 0",
                    borderBottom:
                      i < arr.length - 1 ? "1px solid var(--hair-2)" : "none",
                    fontFamily: "var(--cinema-ui)",
                    fontWeight: 400,
                    fontSize: 14,
                    lineHeight: 1.4,
                    color: "var(--bone-dim)",
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 18,
                  }}
                >
                  <span className="nq-meta">{t(`creditsLabels.${k}`)}</span>
                  <span style={{ color: "var(--bone)" }}>{v}</span>
                </li>
              ))}
            </ul>
            <div style={{ display: "flex", gap: 12, marginTop: 28 }}>
              <Link
                href={`/${locale}/explore`}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 14,
                  padding: "16px 24px",
                  background: "var(--bone)",
                  color: "var(--paper)",
                  fontFamily: "var(--cinema-ui)",
                  fontWeight: 700,
                  fontSize: 11,
                  lineHeight: 1,
                  textTransform: "uppercase",
                  letterSpacing: "0.18em",
                  textDecoration: "none",
                }}
              >
                {t("openMonthAtlas", { month: monthLong })}
              </Link>
              <Link
                href={`/${locale}/plan`}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 14,
                  padding: "16px 24px",
                  background: "transparent",
                  color: "var(--bone)",
                  border: "1px solid rgba(245,241,232,0.4)",
                  fontFamily: "var(--cinema-ui)",
                  fontWeight: 700,
                  fontSize: 11,
                  lineHeight: 1,
                  textTransform: "uppercase",
                  letterSpacing: "0.18em",
                  textDecoration: "none",
                }}
              >
                {t("tellUsYourTrip")}
              </Link>
            </div>
          </div>
        </div>

        {/* ── Absorbed footer line ─────────────────────────────────
           Sits at the very bottom edge of the Coda image. Replaces a
           separate <Footer/> on landing. ────────────────────────── */}
        <div
          style={{
            marginTop: 64,
            paddingTop: 24,
            borderTop: "1px solid var(--hair-2)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 16,
            fontFamily: "var(--cinema-mono)",
            fontWeight: 500,
            fontSize: 11,
            color: "var(--bone-faint)",
            letterSpacing: "0.06em",
          }}
        >
          <div style={{ display: "flex", gap: 18, alignItems: "center", flexWrap: "wrap" }}>
            <span
              style={{
                fontFamily: "var(--cinema-display)",
                fontStyle: "italic",
                fontWeight: 500,
                fontSize: 18,
                color: "var(--bone)",
                letterSpacing: "-0.015em",
              }}
            >
              Naksh<span style={{ color: "var(--vermillion)" }}>.</span>iq
            </span>
            <Link
              href={`/${locale}/about#methodology`}
              style={{ color: "var(--bone-dim)", textDecoration: "none" }}
            >
              {t("footerEditorial")}
            </Link>
            <Link
              href={`/${locale}/about`}
              style={{ color: "var(--bone-dim)", textDecoration: "none" }}
            >
              {t("footerAbout")}
            </Link>
            <a
              href="mailto:hello@nakshiq.com"
              style={{ color: "var(--bone-dim)", textDecoration: "none" }}
            >
              {t("footerContact")}
            </a>
          </div>
          <div style={{ display: "flex", gap: 18, alignItems: "center", flexWrap: "wrap" }}>
            <span>
              © {year} NakshIQ · Issue Nº {issueNum}
            </span>
            <Link
              href={`/${locale}/privacy`}
              style={{ color: "var(--bone-faint)", textDecoration: "none" }}
            >
              {t("footerPrivacy")}
            </Link>
            <Link
              href={`/${locale}/terms`}
              style={{ color: "var(--bone-faint)", textDecoration: "none" }}
            >
              {t("footerTerms")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   Typewriter — local copy, simple. The full helper version was for
   non-cinema usage; this one matches the v7.2-reel sign-off style.
   ============================================================ */
function Typewriter({ text, on, speed = 42 }: { text: string; on: boolean; speed?: number }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!on) {
      setN(0);
      return;
    }
    let i = 0;
    const id = setInterval(() => {
      i++;
      setN(i);
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [on, text, speed]);
  return <span>{text.slice(0, n)}</span>;
}
