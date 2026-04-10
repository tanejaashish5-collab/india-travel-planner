import { useState, useMemo, useCallback } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator, ScrollView, RefreshControl } from "react-native";
import { router, Stack } from "expo-router";
import { colors, spacing, fontSize, borderRadius } from "../lib/theme";
import { useStays } from "../hooks/useStays";

const TYPE_COLORS: Record<string, string> = {
  homestay: colors.topographic,
  hotel: colors.score4,
  camp: colors.saffron,
  resort: colors.vermillion,
  hostel: colors.score3,
};

function getTypeColor(type: string): string {
  return TYPE_COLORS[type?.toLowerCase()] || colors.mutedForeground;
}

export default function StaysScreen() {
  const { stays, loading } = useStays();
  const [typeFilter, setTypeFilter] = useState("all");
  const [refreshing, setRefreshing] = useState(false);

  const types = useMemo(() => {
    const set = new Set(stays.map((s: any) => s.type));
    return ["all", ...Array.from(set).sort()];
  }, [stays]);

  const filtered = useMemo(() => {
    if (typeFilter === "all") return stays;
    return stays.filter((s: any) => s.type === typeFilter);
  }, [stays, typeFilter]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1200);
  }, []);

  if (loading)
    return (
      <View style={s.center}>
        <Stack.Screen options={{ headerShown: false }} />
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={s.loadingText}>Loading stays...</Text>
      </View>
    );

  const renderCard = ({ item: stay }: any) => {
    const destName = Array.isArray(stay.destinations)
      ? (stay.destinations as any)[0]?.name
      : stay.destinations?.name;
    const typeColor = getTypeColor(stay.type);

    return (
      <View style={s.card}>
        {/* Header row */}
        <View style={s.cardHeader}>
          <View style={s.nameRow}>
            <Text style={s.cardName} numberOfLines={1}>
              {stay.name}
            </Text>
            {stay.verified && (
              <View style={s.verifiedPill}>
                <Text style={s.verifiedText}>✓ Verified</Text>
              </View>
            )}
          </View>
          <View style={[s.typeBadge, { backgroundColor: typeColor + "18", borderColor: typeColor + "40" }]}>
            <View style={[s.typeDot, { backgroundColor: typeColor }]} />
            <Text style={[s.typeText, { color: typeColor }]}>{stay.type}</Text>
          </View>
        </View>

        {/* Destination */}
        {destName && (
          <TouchableOpacity
            onPress={() =>
              stay.destination_id
                ? router.push(`/destination/${stay.destination_id}`)
                : null
            }
            activeOpacity={0.7}
          >
            <Text style={s.dest}>📍 {destName}</Text>
          </TouchableOpacity>
        )}

        {/* Why special */}
        {stay.why_special && (
          <Text style={s.special} numberOfLines={3}>
            "{stay.why_special}"
          </Text>
        )}

        {/* Meta row */}
        <View style={s.metaRow}>
          {stay.price_range && (
            <View style={s.pricePill}>
              <Text style={s.priceText}>{stay.price_range}</Text>
            </View>
          )}
          {stay.best_for && (
            <View style={s.bestForPill}>
              <Text style={s.bestForText}>{stay.best_for}</Text>
            </View>
          )}
        </View>
      </View>
    );
  };

  const renderEmpty = () => (
    <View style={s.emptyContainer}>
      <Text style={s.emptyIcon}>🏠</Text>
      <Text style={s.emptyTitle}>No stays found</Text>
      <Text style={s.emptySubtitle}>
        {typeFilter !== "all"
          ? `No ${typeFilter} stays available. Try a different type.`
          : "Check back soon for vetted stays."}
      </Text>
      {typeFilter !== "all" && (
        <TouchableOpacity style={s.emptyButton} onPress={() => setTypeFilter("all")}>
          <Text style={s.emptyButtonText}>Show all stays</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <View style={s.container}>
      <Stack.Screen options={{ headerShown: false }} />

      {/* Branded header */}
      <View style={s.header}>
        <View style={s.accentLine} />
        <View style={s.headerContent}>
          <View style={s.headerLeft}>
            <TouchableOpacity onPress={() => router.back()} style={s.backButton}>
              <Text style={s.backArrow}>←</Text>
            </TouchableOpacity>
            <View>
              <Text style={s.headerTitle}>Local Stays</Text>
              <Text style={s.headerSubtitle}>Handpicked homestays, camps & boutique stays</Text>
            </View>
          </View>
          <View style={s.countBadge}>
            <Text style={s.countText}>{filtered.length}</Text>
          </View>
        </View>
      </View>

      {/* Type chips - horizontal scroll */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={s.chipScroll}
        style={s.chipContainer}
      >
        {types.map((t) => {
          const isActive = typeFilter === t;
          const chipColor = t === "all" ? colors.saffron : getTypeColor(t);
          return (
            <TouchableOpacity
              key={t}
              style={[
                s.chip,
                isActive && {
                  borderColor: chipColor,
                  backgroundColor: chipColor + "15",
                },
              ]}
              onPress={() => setTypeFilter(t)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  s.chipText,
                  isActive && { color: chipColor },
                ]}
              >
                {t === "all" ? "All" : t}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* List */}
      <FlatList
        data={filtered}
        keyExtractor={(item: any) => item.id}
        contentContainerStyle={{ padding: spacing.md, paddingTop: spacing.xs, flexGrow: 1 }}
        renderItem={renderCard}
        ListEmptyComponent={renderEmpty}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.saffron}
            colors={[colors.saffron]}
          />
        }
      />
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  center: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    color: colors.mutedForeground,
    fontSize: fontSize.sm,
    marginTop: spacing.md,
  },

  /* Header */
  header: {
    paddingTop: 56,
    paddingBottom: spacing.md,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.card,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  accentLine: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: colors.saffron,
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: borderRadius.full,
    backgroundColor: colors.muted,
    justifyContent: "center",
    alignItems: "center",
    marginRight: spacing.md,
  },
  backArrow: {
    fontSize: fontSize.lg,
    color: colors.foreground,
  },
  headerTitle: {
    fontSize: fontSize["2xl"],
    fontWeight: "800",
    color: colors.foreground,
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: fontSize.xs,
    color: colors.mutedForeground,
    marginTop: 2,
  },
  countBadge: {
    backgroundColor: colors.saffron + "20",
    borderWidth: 1,
    borderColor: colors.saffron + "40",
    borderRadius: borderRadius.full,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  countText: {
    fontSize: fontSize.sm,
    fontWeight: "700",
    color: colors.saffron,
    fontFamily: "monospace",
  },

  /* Chips */
  chipContainer: {
    flexGrow: 0,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    backgroundColor: colors.background,
  },
  chipScroll: {
    flexDirection: "row",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: colors.border,
    marginRight: 6,
  },
  chipText: {
    fontSize: fontSize.xs,
    fontWeight: "600",
    color: colors.mutedForeground,
    textTransform: "capitalize",
  },

  /* Card */
  card: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: spacing.sm,
  },
  nameRow: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    flexWrap: "wrap",
  },
  cardName: {
    fontSize: fontSize.base,
    fontWeight: "700",
    color: colors.foreground,
    flexShrink: 1,
  },
  typeBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    gap: 5,
  },
  typeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  typeText: {
    fontSize: 11,
    fontWeight: "700",
    textTransform: "capitalize",
  },
  verifiedPill: {
    backgroundColor: colors.score5 + "18",
    borderWidth: 1,
    borderColor: colors.score5 + "40",
    borderRadius: borderRadius.full,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  verifiedText: {
    fontSize: 10,
    fontWeight: "700",
    color: colors.score5,
  },
  dest: {
    fontSize: fontSize.sm,
    color: colors.score4,
    marginTop: spacing.sm,
    fontWeight: "500",
  },
  special: {
    fontSize: fontSize.sm,
    color: colors.mutedForeground,
    marginTop: spacing.sm,
    lineHeight: 20,
    fontStyle: "italic",
  },
  metaRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: spacing.sm,
  },
  pricePill: {
    backgroundColor: colors.saffron + "15",
    borderWidth: 1,
    borderColor: colors.saffron + "30",
    borderRadius: borderRadius.full,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  priceText: {
    fontSize: fontSize.xs,
    fontWeight: "700",
    color: colors.saffron,
    fontFamily: "monospace",
  },
  bestForPill: {
    backgroundColor: colors.muted,
    borderRadius: borderRadius.full,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  bestForText: {
    fontSize: 11,
    fontWeight: "600",
    color: colors.mutedForeground,
  },

  /* Empty */
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 80,
    paddingHorizontal: spacing.xl,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: spacing.md,
  },
  emptyTitle: {
    fontSize: fontSize.xl,
    fontWeight: "700",
    color: colors.foreground,
    marginBottom: spacing.xs,
  },
  emptySubtitle: {
    fontSize: fontSize.sm,
    color: colors.mutedForeground,
    textAlign: "center",
    lineHeight: 20,
  },
  emptyButton: {
    marginTop: spacing.lg,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: borderRadius.full,
    backgroundColor: colors.saffron + "20",
    borderWidth: 1,
    borderColor: colors.saffron + "40",
  },
  emptyButtonText: {
    fontSize: fontSize.sm,
    fontWeight: "600",
    color: colors.saffron,
  },
});
