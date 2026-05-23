"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { resolveCover } from "@/lib/collection-covers";
import { imageUrl } from "@/lib/image-url";
import { useInView } from "./use-in-view";
import { SectionLabel } from "./helpers";

/* ============================================================
   ACT VIII — Map-led Stories
   Source: data/research/Landing Page/v3-atlas/app.jsx:197-233 Stories

   Four collection cards, each with a route line drawn over the photo
   to imply a journey through the destinations inside it. Reuses the
   existing `collections` data already passed through to the landing.
   ============================================================ */

export type StoryCollection = {
  id: string;
  name: string;
  description: string | null;
  count?: number; // number of destinations in the collection (optional)
  cover?: string | null;
};

export function Act8Stories({ collections }: { collections: StoryCollection[] }) {
  const t = useTranslations("cinema");
  const locale = useLocale();
  const [ref, seen] = useInView<HTMLDivElement>({ threshold: 0.2 });
  const items = collections.slice(0, 4);
  if (!items.length) return null;

  return (
    <section
      id="stories"
      style={{
        position: "relative",
        padding: "120px 48px",
        background: "var(--film-2)",
        borderBottom: "1px solid var(--hair)",
      }}
    >
      <div ref={ref} style={{ maxWidth: 1500, margin: "0 auto" }}>
        <SectionLabel num="VIII" name={t("storiesSection")} right={t("storiesMeta")} />

        <h2
          className={`nq-display nq-fadeup ${seen ? "in" : ""}`}
          style={{
            fontSize: "clamp(40px, 5vw, 88px)",
            lineHeight: 1.0,
            letterSpacing: "-0.018em",
            margin: "0 0 36px",
            maxWidth: 1000,
            textWrap: "balance",
          }}
        >
          {t("storiesHeadline")}
          <span className="dot">.</span>
        </h2>

        <div
          className="nq-stories-grid"
          style={{
            paddingTop: 36,
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 24,
            borderTop: "1px solid var(--hair)",
          }}
        >
          {items.map((c, i) => {
            // Raw <img> below bypasses Next/Image's r2Loader, so we must
            // resolve to the R2 WebP variant explicitly. Without this,
            // post-mig-047 collections (sapta-puris etc.) 404 because their
            // JPGs live only on R2, not in public/images/collections/.
            const coverUrl = imageUrl(resolveCover(c as never), 800);
            return (
              <Link
                key={c.id}
                href={`/${locale}/collections/${c.id}`}
                className={`nq-fadeup ${seen ? "in" : ""}`}
                style={{
                  transitionDelay: `${i * 80}ms`,
                  display: "block",
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                <article style={{ cursor: "pointer" }}>
                  <div
                    style={{
                      position: "relative",
                      aspectRatio: "4/5",
                      overflow: "hidden",
                      border: "1px solid var(--hair)",
                    }}
                  >
                    {coverUrl ? (
                      <>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={coverUrl}
                          alt={c.name}
                          loading="lazy"
                          decoding="async"
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            filter: "saturate(0.9) brightness(0.78)",
                          }}
                        />
                      </>
                    ) : (
                      <div
                        style={{
                          width: "100%",
                          height: "100%",
                          background: "var(--paper-2)",
                        }}
                      />
                    )}

                    {/* Schematic route line — gives the "map-led" hint */}
                    <svg
                      style={{
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        pointerEvents: "none",
                      }}
                      viewBox="0 0 100 130"
                      aria-hidden
                    >
                      <path
                        d="M 14 22 Q 36 30 48 50 Q 60 72 80 88 L 92 110"
                        fill="none"
                        stroke="var(--vermillion)"
                        strokeWidth="0.6"
                        strokeDasharray="2 1.5"
                      />
                      {[
                        [14, 22],
                        [48, 50],
                        [80, 88],
                        [92, 110],
                      ].map(([x, y], idx) => (
                        <circle key={idx} cx={x} cy={y} r="1.6" fill="var(--vermillion)" />
                      ))}
                    </svg>

                    <div
                      aria-hidden
                      style={{
                        position: "absolute",
                        inset: 0,
                        background:
                          "linear-gradient(180deg, transparent 50%, rgba(0,0,0,.8) 100%)",
                      }}
                    />
                    {typeof c.count === "number" && c.count > 0 && (
                      <div
                        style={{
                          position: "absolute",
                          bottom: 14,
                          left: 18,
                          right: 18,
                        }}
                      >
                        <div
                          className="nq-meta"
                          style={{ color: "var(--bone)", letterSpacing: "0.06em" }}
                        >
                          {t("storyStops", { count: c.count })}
                        </div>
                      </div>
                    )}
                  </div>
                  <h4
                    className="nq-display"
                    style={{
                      fontSize: 22,
                      lineHeight: 1.1,
                      letterSpacing: "-0.005em",
                      margin: "14px 0 6px",
                      color: "var(--bone)",
                    }}
                  >
                    {c.name}
                  </h4>
                  {c.description && (
                    <p
                      style={{
                        fontFamily: "var(--cinema-ui)",
                        fontWeight: 400,
                        fontSize: 13,
                        lineHeight: 1.5,
                        color: "var(--bone-dim)",
                        margin: 0,
                      }}
                    >
                      {c.description}
                    </p>
                  )}
                </article>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
