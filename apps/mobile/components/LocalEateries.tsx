import { useState } from "react";
import { View, Text, TouchableOpacity, Linking, StyleSheet } from "react-native";
import { colors, spacing, fontSize, borderRadius } from "../lib/theme";

// Mobile mirror of apps/web/src/components/destination-eateries.tsx. Mobile
// has no i18n today, so copy is inlined English; when i18n lands, replace
// inline strings with useTranslation lookups using the same scarcity.* keys
// already mirrored on web.

export interface LocalEatery {
  id: string;
  name: string;
  area: string | null;
  cuisine: string[] | null;
  category: string | null;
  signature_dish: string | null;
  must_try: string[] | null;
  price_range: string | null;
  vegetarian: string | null;
  kid_friendly: boolean | null;
  reservation: string | null;
  established_year: number | null;
  why_it_matters: string | null;
  insider_tip: string | null;
  signature_address: string | null;
  google_maps_url: string | null;
  is_legendary: boolean;
}

interface Props {
  destinationName: string;
  eateries: LocalEatery[];
}

const INITIAL_VISIBLE = 4;

function categoryLabel(cat: string | null): string | null {
  if (!cat) return null;
  return cat.replace(/_/g, " ").toUpperCase();
}

function EateryCard({ eatery }: { eatery: LocalEatery }) {
  return (
    <View style={[styles.card, eatery.is_legendary && styles.cardLegendary]}>
      <View style={styles.cardHeader}>
        <View style={styles.kickerRow}>
          {eatery.is_legendary ? (
            <Text style={styles.legendaryKicker}>★ LEGENDARY</Text>
          ) : eatery.category ? (
            <Text style={styles.kicker}>{categoryLabel(eatery.category)}</Text>
          ) : null}
          {eatery.established_year && (
            <Text style={styles.estYear}>EST. {eatery.established_year}</Text>
          )}
        </View>
        {eatery.price_range && <Text style={styles.priceBand}>{eatery.price_range}</Text>}
      </View>

      <Text style={styles.name}>{eatery.name}</Text>

      {eatery.signature_dish && (
        <Text style={styles.signature}>Signature: {eatery.signature_dish}</Text>
      )}

      {eatery.why_it_matters && (
        <Text style={styles.body}>{eatery.why_it_matters}</Text>
      )}

      {eatery.insider_tip && (
        <Text style={styles.tip}>Tip: {eatery.insider_tip}</Text>
      )}

      <View style={styles.metaRow}>
        {eatery.area && <Text style={styles.metaText}>{eatery.area}</Text>}
        {eatery.vegetarian === "pure-veg" && <Text style={styles.metaText}>· PURE-VEG</Text>}
        {eatery.kid_friendly && <Text style={styles.metaText}>· KIDS OK</Text>}
        {eatery.reservation === "recommended" && <Text style={styles.metaText}>· BOOK AHEAD</Text>}
        {eatery.reservation === "required" && <Text style={styles.metaText}>· RESERVATION REQUIRED</Text>}
      </View>

      {eatery.google_maps_url && (
        <TouchableOpacity
          onPress={() => Linking.openURL(eatery.google_maps_url!)}
          style={styles.mapsLink}
        >
          <Text style={styles.mapsLinkText}>Find it ↗</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

export default function LocalEateries({ destinationName: _destinationName, eateries }: Props) {
  const [showAll, setShowAll] = useState(false);
  if (!eateries || eateries.length === 0) return null;

  const visible = showAll ? eateries : eateries.slice(0, INITIAL_VISIBLE);
  const hidden = eateries.length - INITIAL_VISIBLE;

  return (
    <View style={styles.container}>
      <Text style={styles.sectionKicker}>
        WHERE TO EAT · {eateries.length} VERIFIED PICK{eateries.length === 1 ? "" : "S"}
      </Text>

      {visible.map((e) => (
        <EateryCard key={e.id} eatery={e} />
      ))}

      {hidden > 0 && !showAll && (
        <TouchableOpacity onPress={() => setShowAll(true)} style={styles.expandButton}>
          <Text style={styles.expandButtonText}>Show {hidden} more eater{hidden === 1 ? "y" : "ies"}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: spacing.md,
  },
  sectionKicker: {
    fontSize: fontSize.sm,
    fontWeight: "600",
    color: colors.vermillion,
    letterSpacing: 2,
    marginBottom: spacing.md,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.md,
    padding: spacing.lg,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardLegendary: {
    borderColor: "rgba(229,86,66,0.45)",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  kickerRow: {
    flexDirection: "row",
    gap: spacing.sm,
    alignItems: "center",
  },
  kicker: {
    fontSize: 10,
    fontWeight: "600",
    color: colors.mutedForeground,
    letterSpacing: 1.5,
  },
  legendaryKicker: {
    fontSize: 10,
    fontWeight: "700",
    color: colors.vermillion,
    letterSpacing: 1.5,
  },
  estYear: {
    fontSize: 9,
    color: colors.mutedForeground,
    letterSpacing: 1,
  },
  priceBand: {
    fontSize: fontSize.sm,
    color: colors.mutedForeground,
    fontWeight: "500",
  },
  name: {
    fontSize: fontSize.lg,
    fontWeight: "600",
    color: colors.foreground,
    marginBottom: spacing.xs,
  },
  signature: {
    fontSize: fontSize.sm,
    color: colors.vermillion,
    fontStyle: "italic",
    marginBottom: spacing.sm,
  },
  body: {
    fontSize: fontSize.sm,
    lineHeight: fontSize.sm * 1.5,
    color: colors.mutedForeground,
    marginBottom: spacing.sm,
  },
  tip: {
    fontSize: fontSize.sm,
    lineHeight: fontSize.sm * 1.5,
    color: colors.saffron,
    marginBottom: spacing.sm,
  },
  metaRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.xs,
    marginTop: spacing.xs,
  },
  metaText: {
    fontSize: 10,
    color: colors.mutedForeground,
    letterSpacing: 1,
  },
  mapsLink: {
    marginTop: spacing.md,
    alignSelf: "flex-start",
  },
  mapsLinkText: {
    fontSize: fontSize.sm,
    color: colors.vermillion,
    fontWeight: "500",
    letterSpacing: 1,
  },
  expandButton: {
    paddingVertical: spacing.md,
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.md,
    backgroundColor: "rgba(245,241,232,0.02)",
  },
  expandButtonText: {
    fontSize: fontSize.sm,
    color: colors.mutedForeground,
    fontWeight: "500",
  },
});
