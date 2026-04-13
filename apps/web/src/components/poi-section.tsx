"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface POI {
  id: string;
  name: string;
  type: string;
  description: string | null;
  time_needed: string | null;
  entry_fee: string | null;
  kids_suitable: boolean;
  tags: string[];
}

const TYPE_ICONS: Record<string, string> = {
  temple: "🛕", mosque: "🕌", church: "⛪", gurudwara: "🙏", monastery: "☸️",
  museum: "🏛️", fort: "🏰", palace: "👑", park: "🌳", garden: "🌺",
  lake: "🏞️", waterfall: "💧", viewpoint: "🏔️", market: "🛍️", bazaar: "🛍️",
  dhaba: "🍛", cafe: "☕", restaurant: "🍽️", ghat: "🌊", bridge: "🌉",
  cave: "🕳️", beach: "🏖️", "hot-spring": "♨️", wildlife: "🐅",
  monument: "🗿", ruins: "🏚️", other: "📍",
};

const TYPE_LABELS: Record<string, string> = {
  temple: "Temples", mosque: "Mosques", church: "Churches", gurudwara: "Gurudwaras",
  monastery: "Monasteries", museum: "Museums", fort: "Forts", palace: "Palaces",
  park: "Parks", garden: "Gardens", lake: "Lakes", waterfall: "Waterfalls",
  viewpoint: "Viewpoints", market: "Markets", bazaar: "Bazaars", dhaba: "Dhabas",
  cafe: "Cafés", restaurant: "Restaurants", ghat: "Ghats", bridge: "Bridges",
  cave: "Caves", beach: "Beaches", "hot-spring": "Hot Springs", wildlife: "Wildlife",
  monument: "Monuments", ruins: "Ruins", other: "Other",
};

export function POISection({ pois, destName }: { pois: POI[]; destName: string }) {
  const [activeType, setActiveType] = useState<string | null>(null);

  // Get unique types present in this destination's POIs
  const types = useMemo(() => {
    const seen = new Set<string>();
    pois.forEach((p) => seen.add(p.type));
    return Array.from(seen).sort();
  }, [pois]);

  const filtered = useMemo(() => {
    if (!activeType) return pois;
    return pois.filter((p) => p.type === activeType);
  }, [pois, activeType]);

  if (pois.length === 0) return null;

  return (
    <section>
      <h2 className="text-xl font-semibold mb-4">Places to Visit in {destName}</h2>

      {/* Type filter pills */}
      {types.length > 1 && (
        <div className="flex flex-wrap gap-2 mb-5">
          <button
            onClick={() => setActiveType(null)}
            className={`rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
              !activeType ? "bg-foreground text-background" : "bg-muted/30 text-muted-foreground hover:text-foreground"
            }`}
          >
            All ({pois.length})
          </button>
          {types.map((type) => {
            const count = pois.filter((p) => p.type === type).length;
            return (
              <button
                key={type}
                onClick={() => setActiveType(activeType === type ? null : type)}
                className={`rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
                  activeType === type ? "bg-foreground text-background" : "bg-muted/30 text-muted-foreground hover:text-foreground"
                }`}
              >
                {TYPE_ICONS[type] ?? "📍"} {TYPE_LABELS[type] ?? type} ({count})
              </button>
            );
          })}
        </div>
      )}

      {/* POI cards */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeType ?? "all"}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.15 }}
          className="grid gap-3 sm:grid-cols-2"
        >
          {filtered.map((poi, i) => (
            <motion.div
              key={poi.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(i * 0.04, 0.4), duration: 0.25 }}
              className="rounded-xl border border-border/50 bg-card/50 p-4 hover:border-primary/30 transition-colors"
            >
              <div className="flex items-start gap-3">
                <span className="text-xl mt-0.5">{TYPE_ICONS[poi.type] ?? "📍"}</span>
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-semibold">{poi.name}</h3>
                  {poi.description && (
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2 leading-relaxed">
                      {poi.description}
                    </p>
                  )}
                  <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] text-muted-foreground/70">
                    {poi.time_needed && (
                      <span>🕐 {poi.time_needed}</span>
                    )}
                    {poi.entry_fee && (
                      <span>🎫 {poi.entry_fee}</span>
                    )}
                    {poi.kids_suitable && (
                      <span>👶 Kid-friendly</span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
