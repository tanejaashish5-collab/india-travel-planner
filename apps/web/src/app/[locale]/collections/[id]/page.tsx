import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { CollectionDetail } from "@/components/collection-detail";
import { PrevNextNav } from "@/components/prev-next-nav";
import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";
import { localeAlternates } from "@/lib/seo-utils";
import { CinemaStyles } from "@/components/landing-cinema/cinema-styles";
import { CinematicRelatedRail } from "@/components/cinematic-related-rail";
import { videoSrc } from "@/lib/video-url";

export const revalidate = 86400;
export const dynamicParams = true;

// Next 16: a dynamic-segment route without generateStaticParams is treated as
// fully dynamic (Cache-Control: private/no-cache/no-store) regardless of the
// `revalidate` value. Return [] to opt into ISR-on-demand without pre-building.
export async function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; id: string}> }): Promise<Metadata> {
  const { locale, id } = await params;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return {
  };
  const supabase = createClient(url, key);
  const { data } = await supabase
    .from("collections")
    .select("name, description")
    .eq("id", id)
    .single();
  if (!data) return {};
  // Localize the section label even though the curated collection names
  // (e.g. "Best Beaches in India") live English-only in the DB. No
  // translations column exists on `collections` yet — back-translating those
  // 90+ rows is a content-team task. Until then this at least swaps the
  // "— Collection" suffix to Hindi so the title isn't entirely English.
  const isHi = locale === "hi";
  const collectionLabel = isHi ? "संग्रह" : "Collection";
  return {
    title: `${data.name} — ${collectionLabel}`,
    description: data.description,
    ...localeAlternates(locale, `/collections/${id}`),
  };
}

async function getCollection(id: string) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;

  const supabase = createClient(url, key);
  const { data } = await supabase
    .from("collections")
    .select("*")
    .eq("id", id)
    .single();
  if (!data) return null;

  const destIds = (data.items ?? []).map((i: any) => i.destination_id);
  const contentType = data.content_type || "destinations";
  const showFood = ["food", "mixed"].includes(contentType);
  const showStays = ["stays", "mixed"].includes(contentType);
  const isCircuit = contentType === "circuit";

  const [destsResult, eatsResult, staysResult, coordsResult, allColls] = await Promise.all([
    supabase.from("destinations").select("id, name, tagline, difficulty, elevation_m, state:states(name)").in("id", destIds),
    showFood ? supabase.from("viral_eats").select("*").in("destination_id", destIds).order("name") : Promise.resolve({ data: [] }),
    showStays ? supabase.from("local_stays").select("*").in("destination_id", destIds).order("name") : Promise.resolve({ data: [] }),
    isCircuit ? supabase.from("destinations_with_coords").select("id, lat, lng").in("id", destIds) : Promise.resolve({ data: [] }),
    supabase.from("collections").select("id, name").order("name"),
  ]);

  const coordsMap = new Map<string, { lat: number; lng: number }>(
    (coordsResult.data ?? []).map((c: any) => [c.id, { lat: c.lat, lng: c.lng }])
  );
  const destinationsEnriched = (destsResult.data ?? []).map((d: any) => ({
    ...d,
    coords: coordsMap.get(d.id) ?? null,
  }));

  return {
    ...data,
    destinations: destinationsEnriched,
    viral_eats: eatsResult.data ?? [],
    local_stays: staysResult.data ?? [],
    allCollections: allColls.data ?? [],
  };
}

export default async function CollectionDetailPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  const collection = await getCollection(id);
  if (!collection) notFound();

  const items = collection.items ?? [];
  const contentType = collection.content_type || "destinations";
  const isCircuit = contentType === "circuit";
  const countLabel = isCircuit
    ? `CIRCUIT · ${items.length} STOPS`
    : `COLLECTION · ${items.length} DESTINATIONS`;

  return (
    <div className="nakshiq-cinema" style={{ minHeight: "100vh" }}>
      <CinemaStyles />
      <Nav />

      {/* Full-bleed 100vh hero — cover_video if present, cover_image fallback,
          paper gradient last resort. Vermillion kicker + Fraunces italic title
          overlay centred at lower-third. Same shape as /state/[stateSlug]
          cinematic hero. */}
      <section
        style={{
          position: "relative",
          width: "100vw",
          marginLeft: "calc(50% - 50vw)",
          height: "100vh",
          overflow: "hidden",
          background: "#000",
        }}
        aria-label={`${collection.name} hero`}
      >
        {collection.cover_video ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          >
            <source src={videoSrc(collection.cover_video)} type="video/mp4" />
          </video>
        ) : collection.cover_image_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={collection.cover_image_url}
            alt={collection.name}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        ) : null}
        {/* Bottom-up gradient veil — keeps the photo/video legible while making
            the title overlay readable. */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.05) 40%, rgba(10,10,8,0.85) 100%)",
          }}
        />
        {/* Title overlay — lower-third, full-bleed-readable. */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            padding: "0 24px 80px",
          }}
        >
          <div style={{ maxWidth: 1100, width: "100%", textAlign: "center" }}>
            <p
              className="nq-kicker"
              style={{
                color: "var(--vermillion)",
                marginBottom: 20,
                letterSpacing: "0.22em",
              }}
            >
              {countLabel}
            </p>
            <h1
              className="nq-display"
              style={{
                fontFamily: "var(--cinema-display)",
                fontStyle: "italic",
                fontWeight: 400,
                fontSize: "clamp(40px, 7vw, 96px)",
                lineHeight: 0.98,
                letterSpacing: "-0.025em",
                margin: 0,
                color: "var(--bone)",
                textWrap: "balance",
                textShadow: "0 2px 24px rgba(0,0,0,0.4)",
              }}
            >
              {collection.name}.
            </h1>
            {collection.description && (
              <p
                style={{
                  fontFamily: "var(--cinema-display)",
                  fontStyle: "italic",
                  fontWeight: 400,
                  fontSize: "clamp(16px, 1.8vw, 22px)",
                  lineHeight: 1.4,
                  color: "var(--bone-dim)",
                  margin: "20px auto 0",
                  maxWidth: 720,
                  textShadow: "0 2px 12px rgba(0,0,0,0.4)",
                }}
              >
                {collection.description}
              </p>
            )}
          </div>
        </div>
        {/* Breadcrumb chip — top-left, paper-on-dark for contrast. */}
        <div style={{ position: "absolute", top: 100, left: 24 }}>
          <Link
            href={`/${locale}/collections`}
            className="nq-mono"
            style={{
              fontSize: 10,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "var(--bone-dim)",
              textDecoration: "none",
              padding: "8px 14px",
              border: "1px solid rgba(245, 241, 232, 0.2)",
              background: "rgba(10, 10, 8, 0.4)",
              backdropFilter: "blur(8px)",
            }}
          >
            ← Collections
          </Link>
        </div>
      </section>

      <main
        id="main-content"
        className="nq-grain"
        style={{ position: "relative", padding: "64px 24px" }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <CollectionDetail collection={collection} hideHero />
          <PrevNextNav
            items={collection.allCollections}
            currentId={id}
            basePath="collections"
            backLabel="All Collections"
            backHref="collections"
          />
        </div>
      </main>

      <CinematicRelatedRail />
      <Footer />
    </div>
  );
}
