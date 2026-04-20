import { useMemo, useState } from "react";
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Dimensions, ScrollView } from "react-native";
import { router, Stack } from "expo-router";
import { colors, spacing, fontSize, borderRadius } from "../lib/theme";
import { useCollections } from "../hooks/useCollections";

const REGION_TAG_MAP: Record<string, string> = {
  "north-india": "North",
  "south-india": "South",
  "east-india": "East",
  "west-india": "West",
  "central-india": "Central",
  "northeast-india": "Northeast",
  "islands": "Islands",
};
const REGION_TAGS = Object.keys(REGION_TAG_MAP);

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
  const [search, setSearch] = useState("");
  const [regionTag, setRegionTag] = useState<string | null>(null);
  const [themeTag, setThemeTag] = useState<string | null>(null);

  const themeTags = useMemo(() => {
    const counts = new Map<string, number>();
    collections.forEach((c) => {
      (c.tags ?? []).forEach((t) => {
        if (REGION_TAGS.includes(t)) return;
        counts.set(t, (counts.get(t) ?? 0) + 1);
      });
    });
    return Array.from(counts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 12)
      .map(([tag]) => tag);
  }, [collections]);

  const filtered = useMemo(() => {
    return collections.filter((c) => {
      if (regionTag && !(c.tags ?? []).includes(regionTag)) return false;
      if (themeTag && !(c.tags ?? []).includes(themeTag)) return false;
      if (search) {
        const q = search.toLowerCase();
        if (
          !c.name.toLowerCase().includes(q) &&
          !(c.description ?? "").toLowerCase().includes(q)
        ) return false;
      }
      return true;
    });
  }, [collections, regionTag, themeTag, search]);

  if (loading) return <View style={s.center}><Stack.Screen options={{ title: "Collections" }} /><ActivityIndicator size="large" color={colors.primary} /></View>;

  const header = (
    <View>
      <View style={s.searchBar}>
        <Text style={s.searchIcon}>🔍</Text>
        <TextInput
          style={s.searchInput}
          placeholder="Search collections..."
          placeholderTextColor={colors.mutedForeground}
          value={search}
          onChangeText={setSearch}
        />
        {search ? (
          <TouchableOpacity onPress={() => setSearch("")}>
            <Text style={s.clearBtn}>✕</Text>
          </TouchableOpacity>
        ) : null}
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.chipRow}>
        <TouchableOpacity
          style={[s.chip, !regionTag && s.chipActive]}
          onPress={() => setRegionTag(null)}
        >
          <Text style={[s.chipText, !regionTag && s.chipTextActive]}>All India</Text>
        </TouchableOpacity>
        {REGION_TAGS.map((tag) => (
          <TouchableOpacity
            key={tag}
            style={[s.chip, regionTag === tag && s.chipActive]}
            onPress={() => setRegionTag(regionTag === tag ? null : tag)}
          >
            <Text style={[s.chipText, regionTag === tag && s.chipTextActive]}>{REGION_TAG_MAP[tag]}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {themeTags.length > 0 && (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.chipRow}>
          <TouchableOpacity
            style={[s.chip, !themeTag && s.chipActive]}
            onPress={() => setThemeTag(null)}
          >
            <Text style={[s.chipText, !themeTag && s.chipTextActive]}>All themes</Text>
          </TouchableOpacity>
          {themeTags.map((tag) => (
            <TouchableOpacity
              key={tag}
              style={[s.chip, themeTag === tag && s.chipActive]}
              onPress={() => setThemeTag(themeTag === tag ? null : tag)}
            >
              <Text style={[s.chipText, themeTag === tag && s.chipTextActive]}>{tag}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}

      <Text style={s.resultCount}>{filtered.length} of {collections.length} collections</Text>
    </View>
  );

  return (
    <View style={s.container}>
      <Stack.Screen options={{ title: `${collections.length} Collections` }} />
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={{ gap: spacing.sm, paddingHorizontal: spacing.md }}
        contentContainerStyle={{ gap: spacing.sm, paddingBottom: spacing.xxl }}
        ListHeaderComponent={header}
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
  searchBar: { flexDirection: "row", alignItems: "center", marginHorizontal: spacing.md, marginTop: spacing.md, backgroundColor: colors.card, borderRadius: borderRadius.md, borderWidth: 1, borderColor: colors.border, paddingHorizontal: spacing.md },
  searchIcon: { fontSize: 14, marginRight: spacing.sm },
  searchInput: { flex: 1, paddingVertical: 10, fontSize: fontSize.sm, color: colors.foreground },
  clearBtn: { fontSize: fontSize.sm, color: colors.mutedForeground, padding: spacing.xs },
  chipRow: { flexDirection: "row", paddingHorizontal: spacing.md, paddingVertical: spacing.sm, gap: 6 },
  chip: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: borderRadius.full, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.card, marginRight: 6 },
  chipActive: { borderColor: colors.primary, backgroundColor: colors.primary + "15" },
  chipText: { fontSize: fontSize.xs, fontWeight: "600", color: colors.mutedForeground, textTransform: "capitalize" },
  chipTextActive: { color: colors.primary },
  resultCount: { fontSize: fontSize.xs, color: colors.mutedForeground, paddingHorizontal: spacing.md, paddingBottom: spacing.sm },
  card: { width: CARD_WIDTH, backgroundColor: colors.card, borderRadius: borderRadius.md, borderWidth: 1, borderColor: colors.border, overflow: "hidden" },
  accentBar: { height: 3 },
  cardInner: { padding: spacing.md },
  cardTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: spacing.sm },
  typeIcon: { fontSize: 22 },
  typeBadge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: borderRadius.full },
  typeText: { fontSize: 11, fontWeight: "700", textTransform: "uppercase", letterSpacing: 0.5 },
  cardName: { fontSize: fontSize.sm, fontWeight: "700", color: colors.foreground, lineHeight: 20 },
  cardDesc: { fontSize: fontSize.xs, color: colors.mutedForeground, marginTop: spacing.xs, lineHeight: 16 },
  count: { fontSize: 10, color: colors.mutedForeground, marginTop: spacing.sm, fontFamily: "monospace" },
});
