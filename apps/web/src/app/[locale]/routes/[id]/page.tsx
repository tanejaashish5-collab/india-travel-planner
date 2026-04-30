import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { RouteDetail } from "@/components/route-detail";
import { PrevNextNav } from "@/components/prev-next-nav";
import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";
import { localeAlternates } from "@/lib/seo-utils";

export const revalidate = 86400;
export const dynamicParams = true;

export async function generateMetadata({ params }: { params: Promise<{ id: string; locale: string }> }): Promise<Metadata> {
  const { id, locale } = await params;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return {};
  const supabase = createClient(url, key);
  const { data } = await supabase.from("routes").select("name, days, difficulty, highlights, description").eq("id", id).single();
  if (!data) return {};
  return {
    title: `${data.name} — ${data.days}-day road trip`,
    description: data.description
      ? String(data.description).slice(0, 160)
      : `${data.days}-day ${data.difficulty} road trip. ${data.highlights?.slice(0, 3).join(", ") || ""}. Day-by-day itinerary with stops, distances, and tips.`,
    ...localeAlternates(locale, `/routes/${id}`),
  };
}

async function getRoute(id: string) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;

  const supabase = createClient(url, key);
  const [routeData, allRoutes] = await Promise.all([
    supabase.from("routes").select("*").eq("id", id).single(),
    supabase.from("routes").select("id, name").order("name"),
  ]);
  if (!routeData.data) return null;

  // Pull destination coords + names for each stop ID so Trip/ItemList schemas
  // can cite real GeoCoordinates per stop. `destinations.coords` is PostGIS
  // GEOGRAPHY and arrives as a raw WKB hex string from PostgREST — so we read
  // through the `destinations_with_coords` view that already splits it into
  // numeric lat/lng. (Direct `dest.coords.lat` access used to throw a
  // TypeError and 500 the route page.)
  const stops: string[] = Array.isArray(routeData.data.stops) ? routeData.data.stops : [];
  let stopDests: Array<{ id: string; name: string; coords?: { lat: number; lng: number } | null }> = [];
  if (stops.length > 0) {
    const [destsRes, coordsRes] = await Promise.all([
      supabase.from("destinations").select("id, name").in("id", stops),
      supabase.from("destinations_with_coords").select("id, lat, lng").in("id", stops),
    ]);
    const coordsMap = new Map<string, { lat: number; lng: number }>(
      (coordsRes.data ?? [])
        .filter((c: any) => typeof c.lat === "number" && typeof c.lng === "number")
        .map((c: any) => [c.id, { lat: c.lat, lng: c.lng }]),
    );
    stopDests = (destsRes.data ?? []).map((d: any) => ({
      id: d.id,
      name: d.name,
      coords: coordsMap.get(d.id) ?? null,
    }));
  }

  return { ...routeData.data, allRoutes: allRoutes.data ?? [], stopDests };
}

export default async function RouteDetailPage({
  params,
}: {
  params: Promise<{ id: string; locale: string }>;
}) {
  const { id, locale } = await params;
  const route = await getRoute(id);
  if (!route) notFound();

  const routeUrl = `https://www.nakshiq.com/${locale}/routes/${id}`;
  const stops: string[] = Array.isArray(route.stops) ? route.stops : [];
  const stopDests: Array<{ id: string; name: string; coords?: { lat: number; lng: number } | null }> =
    route.stopDests ?? [];
  const stopByIdMap = new Map(stopDests.map((d) => [d.id, d]));

  // Schema.org — TouristTrip envelope + ItemList of TouristDestination stops.
  // Each stop carries its own @type + GeoCoordinates so answer engines can
  // render the trip as a visual itinerary or pull individual legs.
  const touristTripLd = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    "@id": `${routeUrl}#trip`,
    name: route.name,
    description: route.description || `${route.days}-day ${route.difficulty} itinerary across ${stops.length} stops.`,
    url: routeUrl,
    inLanguage: locale === "hi" ? "hi-IN" : "en-IN",
    touristType: route.kids_suitable ? "Family"
      : route.bike_route ? "Motorcycle"
      : route.difficulty === "extreme" ? "Adventure"
      : "General",
    provider: { "@id": "https://www.nakshiq.com#organization" },
    isPartOf: { "@id": "https://www.nakshiq.com#website" },
    ...(route.best_months && route.best_months.length > 0 && {
      availableIn: route.best_months.map((m: number) =>
        ["", "January","February","March","April","May","June","July","August","September","October","November","December"][m]
      ).filter(Boolean),
    }),
    itinerary: {
      "@type": "ItemList",
      "@id": `${routeUrl}#itinerary`,
      numberOfItems: stops.length,
      itemListOrder: "https://schema.org/ItemListOrderAscending",
      itemListElement: stops.map((stopId: string, idx: number) => {
        const dest = stopByIdMap.get(stopId);
        const destUrl = `https://www.nakshiq.com/${locale}/destination/${stopId}`;
        return {
          "@type": "ListItem",
          position: idx + 1,
          item: {
            "@type": "TouristDestination",
            "@id": `${destUrl}#destination`,
            name: dest?.name ?? stopId.replace(/-/g, " "),
            url: destUrl,
            ...(typeof dest?.coords?.lat === "number" && typeof dest?.coords?.lng === "number" && {
              geo: {
                "@type": "GeoCoordinates",
                latitude: Number(dest.coords.lat.toFixed(4)),
                longitude: Number(dest.coords.lng.toFixed(4)),
              },
            }),
          },
        };
      }),
    },
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `https://www.nakshiq.com/${locale}` },
      { "@type": "ListItem", position: 2, name: "Routes", item: `https://www.nakshiq.com/${locale}/routes` },
      { "@type": "ListItem", position: 3, name: route.name, item: routeUrl },
    ],
  };

  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(touristTripLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <Nav />
      <main className="mx-auto max-w-4xl px-4 py-8">
        <RouteDetail route={route} />
        <PrevNextNav
          items={route.allRoutes}
          currentId={id}
          basePath="routes"
          backLabel="All Routes"
          backHref="routes"
        />
      </main>
    </div>
  );
}
