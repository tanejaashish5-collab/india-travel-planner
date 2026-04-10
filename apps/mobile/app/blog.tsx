import { useState, useMemo, useCallback } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator, ScrollView, RefreshControl } from "react-native";
import { router, Stack } from "expo-router";
import { colors, spacing, fontSize, borderRadius } from "../lib/theme";
import { useArticles } from "../hooks/useArticles";

const CAT_COLORS: Record<string, { bg: string; text: string }> = {
  "best-time": { bg: "rgba(16,185,129,0.15)", text: colors.score5 },
  comparison: { bg: "rgba(59,130,246,0.15)", text: colors.score4 },
  guide: { bg: "rgba(139,92,246,0.15)", text: "#8b5cf6" },
  "data-story": { bg: "rgba(245,158,11,0.15)", text: colors.saffron },
};

const CAT_LABELS: Record<string, string> = {
  "best-time": "Best Time to Visit",
  comparison: "Comparison",
  guide: "Intelligence Guide",
  "data-story": "Data Story",
};

export default function BlogScreen() {
  const { articles, loading } = useArticles();
  const [filter, setFilter] = useState("all");
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => { setRefreshing(true); setTimeout(() => setRefreshing(false), 1000); }, []);

  const filtered = useMemo(() => {
    if (filter === "all") return articles;
    return articles.filter((a) => a.category === filter);
  }, [articles, filter]);

  if (loading) return <View style={s.center}><Stack.Screen options={{ title: "Blog" }} /><ActivityIndicator size="large" color={colors.foreground} /></View>;

  return (
    <View style={s.container}>
      <Stack.Screen options={{ title: "Travel Intelligence" }} />

      {/* Branded Header */}
      <View style={s.header}>
        <View style={s.headerAccent} />
        <View style={s.headerRow}>
          <View>
            <Text style={s.headerTitle}>Travel Intelligence</Text>
            <Text style={s.headerSub}>Data-driven guides and comparisons</Text>
          </View>
          <View style={s.headerCount}><Text style={s.headerCountText}>{articles.length}</Text></View>
        </View>
      </View>

      {/* Filters */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.chipRow}>
        {["all", "best-time", "comparison", "guide", "data-story"].map((c) => {
          const catStyle = CAT_COLORS[c] || { bg: colors.muted, text: colors.foreground };
          return (
            <TouchableOpacity
              key={c}
              style={[s.chip, filter === c && { borderColor: c === "all" ? colors.foreground : catStyle.text, backgroundColor: (c === "all" ? colors.foreground : catStyle.text) + "15" }]}
              onPress={() => setFilter(c)}
            >
              <Text style={[s.chipText, filter === c && { color: c === "all" ? colors.foreground : catStyle.text }]}>
                {c === "all" ? `All (${articles.length})` : CAT_LABELS[c] || c}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: spacing.md, paddingTop: 0 }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.vermillion} />}
        renderItem={({ item: a }) => {
          const catStyle = CAT_COLORS[a.category] || { bg: colors.muted, text: colors.foreground };
          return (
            <TouchableOpacity style={s.card} onPress={() => router.push(`/blog/${a.slug}`)} activeOpacity={0.85}>
              {/* Category + reading time */}
              <View style={s.cardTop}>
                <View style={[s.catBadge, { backgroundColor: catStyle.bg }]}>
                  <Text style={[s.catText, { color: catStyle.text }]}>{CAT_LABELS[a.category] || a.category}</Text>
                </View>
                <Text style={s.readTime}>{a.reading_time} min</Text>
                {a.depth === "deep-dive" && <View style={s.depthBadge}><Text style={s.depthText}>Deep Dive</Text></View>}
                {a.depth === "brief" && <View style={s.briefBadge}><Text style={s.briefText}>Brief</Text></View>}
                {a.featured && <Text style={s.featBadge}>Featured</Text>}
              </View>

              <Text style={s.cardTitle} numberOfLines={2}>{a.title}</Text>
              {a.subtitle && <Text style={s.cardSubtitle} numberOfLines={1}>{a.subtitle}</Text>}
              {a.excerpt && <Text style={s.cardExcerpt} numberOfLines={3}>{a.excerpt}</Text>}

              {a.tags?.length > 0 && (
                <View style={s.tagRow}>
                  {a.tags.slice(0, 3).map((tag) => (
                    <View key={tag} style={s.tag}><Text style={s.tagText}>{tag}</Text></View>
                  ))}
                </View>
              )}
            </TouchableOpacity>
          );
        }}
        ListEmptyComponent={<Text style={s.empty}>No articles yet. Check back soon.</Text>}
      />
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  center: { flex: 1, backgroundColor: colors.background, justifyContent: "center", alignItems: "center" },
  header: { paddingHorizontal: spacing.md, paddingTop: spacing.md, paddingBottom: spacing.sm },
  headerAccent: { width: 32, height: 3, backgroundColor: colors.vermillion, borderRadius: 2, marginBottom: spacing.sm },
  headerRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  headerTitle: { fontSize: fontSize["2xl"], fontWeight: "800", color: colors.foreground },
  headerSub: { fontSize: fontSize.sm, color: colors.mutedForeground, marginTop: 2 },
  headerCount: { backgroundColor: colors.vermillion + "15", paddingHorizontal: 12, paddingVertical: 6, borderRadius: borderRadius.full },
  headerCountText: { fontSize: fontSize.sm, fontWeight: "800", color: colors.vermillion },
  chipRow: { flexDirection: "row", paddingHorizontal: spacing.md, paddingVertical: spacing.sm, gap: 6 },
  chip: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: borderRadius.full, borderWidth: 1, borderColor: colors.border },
  chipActive: { borderColor: colors.foreground, backgroundColor: colors.foreground + "10" },
  chipText: { fontSize: 11, fontWeight: "600", color: colors.mutedForeground },
  chipTextActive: { color: colors.foreground },
  card: { backgroundColor: colors.card, borderRadius: borderRadius.md, padding: spacing.md, marginBottom: spacing.md, borderWidth: 1, borderColor: colors.border },
  cardTop: { flexDirection: "row", alignItems: "center", gap: spacing.sm, marginBottom: spacing.sm },
  catBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: borderRadius.full },
  catText: { fontSize: 10, fontWeight: "700" },
  readTime: { fontSize: fontSize.xs, color: colors.mutedForeground },
  depthBadge: { backgroundColor: colors.vermillion + "15", paddingHorizontal: 6, paddingVertical: 2, borderRadius: borderRadius.sm },
  depthText: { fontSize: 10, fontWeight: "700", color: colors.vermillion },
  briefBadge: { backgroundColor: colors.score4 + "15", paddingHorizontal: 6, paddingVertical: 2, borderRadius: borderRadius.sm },
  briefText: { fontSize: 10, fontWeight: "700", color: colors.score4 },
  featBadge: { fontSize: 10, color: colors.saffron, fontWeight: "700" },
  cardTitle: { fontSize: fontSize.lg, fontWeight: "700", color: colors.foreground, lineHeight: 24 },
  cardSubtitle: { fontSize: fontSize.sm, color: colors.mutedForeground, marginTop: 2 },
  cardExcerpt: { fontSize: fontSize.sm, color: colors.mutedForeground, marginTop: spacing.sm, lineHeight: 20 },
  tagRow: { flexDirection: "row", gap: 4, marginTop: spacing.sm },
  tag: { backgroundColor: colors.muted, paddingHorizontal: 6, paddingVertical: 2, borderRadius: borderRadius.sm },
  tagText: { fontSize: 10, color: colors.mutedForeground },
  empty: { fontSize: fontSize.sm, color: colors.mutedForeground, textAlign: "center", marginTop: spacing.xl },
});
