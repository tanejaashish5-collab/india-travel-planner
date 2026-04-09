import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator, Dimensions } from "react-native";
import { router, Stack } from "expo-router";
import { colors, spacing, fontSize, borderRadius } from "../lib/theme";
import { useCollections } from "../hooks/useCollections";

const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - spacing.md * 2 - spacing.sm) / 2;

const TYPE_COLORS: Record<string, string> = {
  destinations: colors.score4,
  food: "#f59e0b",
  stays: "#ec4899",
  activities: "#10b981",
  mixed: "#8b5cf6",
};

const TYPE_ICONS: Record<string, string> = {
  destinations: "🗺️",
  food: "🍜",
  stays: "🏡",
  activities: "🎯",
  mixed: "✨",
};

export default function CollectionsScreen() {
  const { collections, loading } = useCollections();

  if (loading) return <View style={s.center}><Stack.Screen options={{ title: "Collections" }} /><ActivityIndicator size="large" color={colors.primary} /></View>;

  return (
    <View style={s.container}>
      <Stack.Screen options={{ title: `${collections.length} Collections` }} />
      <FlatList
        data={collections}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={{ gap: spacing.sm }}
        contentContainerStyle={{ padding: spacing.md, gap: spacing.sm }}
        renderItem={({ item: c }) => {
          const ct = c.content_type || "destinations";
          const typeColor = TYPE_COLORS[ct] || colors.score4;
          const typeIcon = TYPE_ICONS[ct] || "📚";
          return (
            <TouchableOpacity style={s.card} onPress={() => router.push(`/collection/${c.id}`)} activeOpacity={0.85}>
              {/* Color accent top */}
              <View style={[s.accentBar, { backgroundColor: typeColor }]} />
              <View style={s.cardInner}>
                <View style={s.cardTop}>
                  <Text style={s.typeIcon}>{typeIcon}</Text>
                  <View style={[s.typeBadge, { backgroundColor: typeColor + "20" }]}>
                    <Text style={[s.typeText, { color: typeColor }]}>{ct}</Text>
                  </View>
                </View>
                <Text style={s.cardName} numberOfLines={2}>{c.name}</Text>
                {c.description && <Text style={s.cardDesc} numberOfLines={2}>{c.description}</Text>}
                <Text style={s.count}>{c.items?.length ?? 0} items</Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  center: { flex: 1, backgroundColor: colors.background, justifyContent: "center", alignItems: "center" },
  card: { width: CARD_WIDTH, backgroundColor: colors.card, borderRadius: borderRadius.md, borderWidth: 1, borderColor: colors.border, overflow: "hidden" },
  accentBar: { height: 3 },
  cardInner: { padding: spacing.md },
  cardTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: spacing.sm },
  typeIcon: { fontSize: 22 },
  typeBadge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: borderRadius.full },
  typeText: { fontSize: 9, fontWeight: "700", textTransform: "uppercase", letterSpacing: 0.5 },
  cardName: { fontSize: fontSize.sm, fontWeight: "700", color: colors.foreground, lineHeight: 20 },
  cardDesc: { fontSize: fontSize.xs, color: colors.mutedForeground, marginTop: spacing.xs, lineHeight: 16 },
  count: { fontSize: 10, color: colors.mutedForeground, marginTop: spacing.sm, fontFamily: "monospace" },
});
