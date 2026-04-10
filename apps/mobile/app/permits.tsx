import { useState, useCallback } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator, Linking, RefreshControl } from "react-native";
import { router, Stack } from "expo-router";
import { colors, spacing, fontSize, borderRadius } from "../lib/theme";
import { usePermits } from "../hooks/usePermits";

export default function PermitsScreen() {
  const { permits, loading } = usePermits();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1200);
  }, []);

  if (loading)
    return (
      <View style={s.center}>
        <Stack.Screen options={{ headerShown: false }} />
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={s.loadingText}>Loading permits...</Text>
      </View>
    );

  const renderCard = ({ item: p }: any) => {
    const destName = Array.isArray(p.destinations)
      ? (p.destinations as any)[0]?.name
      : p.destinations?.name;
    const isMandatory = p.type?.toLowerCase()?.includes("mandatory") || !p.type?.toLowerCase()?.includes("optional");
    const accentColor = isMandatory ? colors.vermillion : colors.saffron;
    const isFree = !p.cost_inr || p.cost_inr === 0;

    return (
      <View style={[s.card, { borderLeftWidth: 3, borderLeftColor: accentColor }]}>
        {/* Header: type + cost */}
        <View style={s.cardHeader}>
          <View style={[s.typeBadge, { backgroundColor: accentColor + "18", borderColor: accentColor + "40" }]}>
            <View style={[s.typeDot, { backgroundColor: accentColor }]} />
            <Text style={[s.typeText, { color: accentColor }]}>{p.type || "Permit"}</Text>
          </View>
          <View style={[s.costPill, isFree ? s.costFree : s.costPaid]}>
            <Text style={[s.costText, isFree ? s.costFreeText : s.costPaidText]}>
              {isFree ? "Free" : `₹${p.cost_inr?.toLocaleString()}`}
            </Text>
          </View>
        </View>

        {/* Destination */}
        {destName && (
          <TouchableOpacity
            onPress={() =>
              p.destination_id
                ? router.push(`/destination/${p.destination_id}`)
                : null
            }
            activeOpacity={0.7}
          >
            <Text style={s.dest}>📍 {destName}</Text>
          </TouchableOpacity>
        )}

        {/* Who needs */}
        {p.who_needs && (
          <Text style={s.whoNeeds}>
            <Text style={s.whoNeedsLabel}>Who needs it: </Text>
            {p.who_needs}
          </Text>
        )}

        {/* Stats row: processing time + validity */}
        {(p.processing_time || p.validity) && (
          <View style={s.statsRow}>
            {p.processing_time && (
              <View style={s.statPill}>
                <Text style={s.statLabel}>⏱</Text>
                <Text style={s.statText}>{p.processing_time}</Text>
              </View>
            )}
            {p.validity && (
              <View style={s.statPill}>
                <Text style={s.statLabel}>📅</Text>
                <Text style={s.statText}>{p.validity}</Text>
              </View>
            )}
          </View>
        )}

        {/* How to get */}
        {p.how_to_get && (
          <Text style={s.howTo} numberOfLines={3}>
            {p.how_to_get}
          </Text>
        )}

        {/* Documents needed */}
        {p.documents_needed?.length > 0 && (
          <View style={s.docsContainer}>
            <Text style={s.docsTitle}>Documents needed</Text>
            {p.documents_needed.map((d: string, i: number) => (
              <View key={i} style={s.docRow}>
                <Text style={s.docCheck}>✓</Text>
                <Text style={s.docItem}>{d}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Pro tip */}
        {p.pro_tip && (
          <View style={s.tipBox}>
            <Text style={s.tipLabel}>💡 Pro tip</Text>
            <Text style={s.tipText}>{p.pro_tip}</Text>
          </View>
        )}

        {/* Government link */}
        {p.government_link && (
          <TouchableOpacity
            style={s.linkButton}
            onPress={() => Linking.openURL(p.government_link!)}
            activeOpacity={0.7}
          >
            <Text style={s.linkButtonText}>🔗  Official Website →</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  const renderEmpty = () => (
    <View style={s.emptyContainer}>
      <Text style={s.emptyIcon}>📋</Text>
      <Text style={s.emptyTitle}>No permits found</Text>
      <Text style={s.emptySubtitle}>
        Permit data is being updated. Check back soon.
      </Text>
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
              <Text style={s.headerTitle}>Permits & Passes</Text>
              <Text style={s.headerSubtitle}>Required documentation for restricted areas</Text>
            </View>
          </View>
          <View style={s.countBadge}>
            <Text style={s.countText}>{permits.length}</Text>
          </View>
        </View>
      </View>

      {/* List */}
      <FlatList
        data={permits}
        keyExtractor={(item: any) => item.id}
        contentContainerStyle={{ padding: spacing.md, flexGrow: 1 }}
        renderItem={renderCard}
        ListEmptyComponent={renderEmpty}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.vermillion}
            colors={[colors.vermillion]}
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
    backgroundColor: colors.vermillion,
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
    backgroundColor: colors.vermillion + "20",
    borderWidth: 1,
    borderColor: colors.vermillion + "40",
    borderRadius: borderRadius.full,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  countText: {
    fontSize: fontSize.sm,
    fontWeight: "700",
    color: colors.vermillion,
    fontFamily: "monospace",
  },

  /* Card */
  card: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
  costPill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: borderRadius.full,
    borderWidth: 1,
  },
  costFree: {
    backgroundColor: colors.score5 + "18",
    borderColor: colors.score5 + "40",
  },
  costPaid: {
    backgroundColor: colors.saffron + "15",
    borderColor: colors.saffron + "30",
  },
  costText: {
    fontSize: fontSize.sm,
    fontWeight: "700",
    fontFamily: "monospace",
  },
  costFreeText: {
    color: colors.score5,
  },
  costPaidText: {
    color: colors.saffron,
  },
  dest: {
    fontSize: fontSize.sm,
    color: colors.score4,
    marginTop: spacing.sm,
    fontWeight: "500",
  },
  whoNeeds: {
    fontSize: fontSize.sm,
    color: colors.mutedForeground,
    marginTop: spacing.sm,
    lineHeight: 20,
  },
  whoNeedsLabel: {
    fontWeight: "700",
    color: colors.foreground,
  },

  /* Stats */
  statsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: spacing.sm,
  },
  statPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.muted,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: borderRadius.full,
    gap: 4,
  },
  statLabel: {
    fontSize: 11,
  },
  statText: {
    fontSize: 11,
    fontWeight: "600",
    color: colors.foreground,
  },

  howTo: {
    fontSize: fontSize.sm,
    color: colors.mutedForeground,
    marginTop: spacing.sm,
    lineHeight: 20,
  },

  /* Documents */
  docsContainer: {
    marginTop: spacing.sm,
    backgroundColor: colors.muted,
    borderRadius: borderRadius.md,
    padding: spacing.sm,
  },
  docsTitle: {
    fontSize: fontSize.xs,
    fontWeight: "700",
    color: colors.foreground,
    marginBottom: 6,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  docRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 6,
    marginBottom: 4,
  },
  docCheck: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.score5,
    marginTop: 1,
  },
  docItem: {
    fontSize: fontSize.sm,
    color: colors.mutedForeground,
    flex: 1,
    lineHeight: 18,
  },

  /* Pro tip */
  tipBox: {
    marginTop: spacing.sm,
    backgroundColor: colors.saffron + "10",
    borderWidth: 1,
    borderColor: colors.saffron + "25",
    borderRadius: borderRadius.md,
    padding: spacing.sm,
  },
  tipLabel: {
    fontSize: fontSize.xs,
    fontWeight: "700",
    color: colors.saffron,
    marginBottom: 4,
  },
  tipText: {
    fontSize: fontSize.sm,
    color: colors.mutedForeground,
    lineHeight: 20,
  },

  /* Government link button */
  linkButton: {
    marginTop: spacing.sm,
    backgroundColor: colors.score4 + "15",
    borderWidth: 1,
    borderColor: colors.score4 + "30",
    borderRadius: borderRadius.md,
    paddingVertical: 10,
    paddingHorizontal: spacing.md,
    alignItems: "center",
  },
  linkButtonText: {
    fontSize: fontSize.sm,
    fontWeight: "600",
    color: colors.score4,
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
});
