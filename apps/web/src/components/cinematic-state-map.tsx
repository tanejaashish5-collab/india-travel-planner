import indiaMapData from "@svg-maps/india";

/**
 * Cinematic destination-page state map.
 *
 * Renders the India outline (no neighbouring countries — `@svg-maps/india`
 * is India-only paths) with this destination's parent state highlighted
 * in vermillion. All other states render in a dimmed bone tone so the
 * eye lands immediately on "you are here".
 *
 * Server component — `@svg-maps/india` is a pure data import; no
 * interactivity (hover/click/tooltip) so we keep it off the client
 * bundle and avoid hydration cost across 505 destination pages.
 *
 * Brings back the SaaS-era choropleth look the user asked for — but
 * focused on a single destination rather than the whole corpus
 * (the all-states choropleth still lives at /states via `<IndiaMap>`).
 */

// Slug → SVG id. Mirrors the mapping in india-map.tsx — keep in sync if
// new states ship in @svg-maps/india or our seo-maps slugs change.
const SLUG_TO_SVG: Record<string, string> = {
  "himachal-pradesh": "hp",
  uttarakhand: "ut",
  "jammu-kashmir": "jk",
  ladakh: "jk", // shares J&K path
  rajasthan: "rj",
  punjab: "pb",
  delhi: "dl",
  "uttar-pradesh": "up",
  chandigarh: "ch",
  haryana: "hr",
  "madhya-pradesh": "mp",
  sikkim: "sk",
  "west-bengal": "wb",
  "arunachal-pradesh": "ar",
  assam: "as",
  meghalaya: "ml",
  nagaland: "nl",
  manipur: "mn",
  mizoram: "mz",
  tripura: "tr",
  bihar: "br",
  jharkhand: "jh",
  chhattisgarh: "ct",
  "andaman-nicobar": "an",
  lakshadweep: "ld",
  puducherry: "py",
  "daman-diu": "dd",
  karnataka: "ka",
  kerala: "kl",
  "tamil-nadu": "tn",
  goa: "ga",
  maharashtra: "mh",
  gujarat: "gj",
  odisha: "or",
  telangana: "tg",
  "andhra-pradesh": "ap",
};

type MapLocation = { id: string; name: string; path: string };
const mapData = ((indiaMapData as unknown) as { default?: { viewBox: string; locations: MapLocation[] } }).default
  ?? ((indiaMapData as unknown) as { viewBox: string; locations: MapLocation[] });

export function CinematicStateMap({
  stateId,
  stateName,
  destinationName,
}: {
  /** Our state slug (e.g. "karnataka", "jammu-kashmir"). */
  stateId: string | null | undefined;
  /** Display name for the kicker overlay ("Karnataka", "J&K"). */
  stateName: string | null | undefined;
  /** Destination name for the centred overlay caption. */
  destinationName: string;
}) {
  const svgId = stateId ? SLUG_TO_SVG[stateId] : null;

  return (
    <div
      style={{
        position: "relative",
        border: "1px solid var(--hair)",
        background: "radial-gradient(ellipse at 50% 30%, rgba(245, 241, 232, 0.04) 0%, var(--paper) 80%)",
        overflow: "hidden",
        aspectRatio: "10/11",
      }}
    >
      {/* Kicker overlay — top-left */}
      <div
        style={{
          position: "absolute",
          top: 16,
          left: 18,
          zIndex: 2,
          maxWidth: "60%",
        }}
      >
        <p
          className="nq-kicker"
          style={{
            color: "var(--vermillion)",
            margin: 0,
            letterSpacing: "0.22em",
            fontSize: 10,
          }}
        >
          WHERE EXACTLY · {(stateName ?? "INDIA").toUpperCase()}
        </p>
        <p
          style={{
            fontFamily: "var(--cinema-display)",
            fontStyle: "italic",
            fontWeight: 500,
            fontSize: "clamp(18px, 2vw, 22px)",
            lineHeight: 1.15,
            color: "var(--bone)",
            margin: "6px 0 0",
            letterSpacing: "-0.01em",
          }}
        >
          {destinationName}.
        </p>
      </div>

      {/* India outline — choropleth-style with current state highlighted */}
      <svg
        viewBox={mapData.viewBox}
        preserveAspectRatio="xMidYMid meet"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          padding: 24,
        }}
        role="img"
        aria-label={`Map of India highlighting ${stateName ?? "this destination"}`}
      >
        {mapData.locations.map((loc) => {
          const isCurrent = loc.id === svgId;
          return (
            <path
              key={loc.id}
              d={loc.path}
              fill={isCurrent ? "var(--vermillion)" : "rgba(245, 241, 232, 0.06)"}
              stroke={isCurrent ? "var(--vermillion)" : "var(--hair)"}
              strokeWidth={isCurrent ? 1 : 0.6}
              style={{
                opacity: isCurrent ? 1 : 0.55,
              }}
            >
              <title>{loc.name}</title>
            </path>
          );
        })}
      </svg>

      {/* Mono caption — bottom-left */}
      <p
        className="nq-mono"
        style={{
          position: "absolute",
          bottom: 16,
          left: 18,
          zIndex: 2,
          fontSize: 10,
          letterSpacing: "0.22em",
          color: "var(--bone-faint)",
          margin: 0,
        }}
      >
        INDIA OUTLINE · ONE STATE PER PATH · NO NEIGHBOURS
      </p>
    </div>
  );
}
