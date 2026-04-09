import { View, Text, ScrollView, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { useLocalSearchParams, Stack, router } from "expo-router";
import { colors, spacing, fontSize, borderRadius } from "../../lib/theme";
import { useArticle } from "../../hooks/useArticles";

const CAT_LABELS: Record<string, string> = {
  "best-time": "Best Time to Visit",
  comparison: "Comparison",
  guide: "Intelligence Guide",
  "data-story": "Data Story",
};

export default function BlogArticleScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const { article, loading } = useArticle(slug);

  if (loading || !article) {
    return <View style={s.center}><Stack.Screen options={{ title: "Loading..." }} /><ActivityIndicator size="large" color={colors.foreground} /></View>;
  }

  const sections = parseContent(article.content);

  return (
    <ScrollView style={s.container} contentContainerStyle={s.content}>
      <Stack.Screen options={{ title: "" }} />

      {/* Header */}
      <View style={s.metaRow}>
        <Text style={s.catLabel}>{CAT_LABELS[article.category] || article.category}</Text>
        <Text style={s.dot}>·</Text>
        <Text style={s.readTime}>{article.reading_time} min read</Text>
        <Text style={s.dot}>·</Text>
        <Text style={s.readTime}>
          {new Date(article.published_at).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" })}
        </Text>
      </View>

      <Text style={s.title}>{article.title}</Text>
      {article.subtitle && <Text style={s.subtitle}>{article.subtitle}</Text>}

      {/* Linked destinations */}
      {article.destinations?.length > 0 && (
        <View style={s.destRow}>
          {article.destinations.map((destId) => (
            <TouchableOpacity key={destId} style={s.destChip} onPress={() => router.push(`/destination/${destId}`)}>
              <Text style={s.destChipText}>{destId.replace(/-/g, " ")}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Content */}
      {sections.map((section, i) => (
        <View key={i}>
          {section.heading && <Text style={s.h2}>{section.heading}</Text>}
          {section.paragraphs.map((p, j) => (
            <Text key={j} style={s.paragraph}>{p}</Text>
          ))}
        </View>
      ))}

      {/* Tags */}
      {article.tags?.length > 0 && (
        <View style={s.tagRow}>
          {article.tags.map((tag) => (
            <View key={tag} style={s.tag}><Text style={s.tagText}>{tag}</Text></View>
          ))}
        </View>
      )}

      {/* Closing */}
      <Text style={s.closing}>Go with confidence.</Text>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

function parseContent(content: string): Array<{ heading?: string; paragraphs: string[] }> {
  if (!content) return [];
  const lines = content.split("\n");
  const sections: Array<{ heading?: string; paragraphs: string[] }> = [];
  let current: { heading?: string; paragraphs: string[] } = { paragraphs: [] };

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith("## ")) {
      if (current.paragraphs.length > 0 || current.heading) sections.push(current);
      current = { heading: trimmed.replace(/^##\s+/, ""), paragraphs: [] };
    } else if (trimmed) {
      current.paragraphs.push(trimmed);
    }
  }
  if (current.paragraphs.length > 0 || current.heading) sections.push(current);
  return sections;
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg },
  center: { flex: 1, backgroundColor: colors.background, justifyContent: "center", alignItems: "center" },
  metaRow: { flexDirection: "row", alignItems: "center", gap: 6, marginBottom: spacing.md },
  catLabel: { fontSize: fontSize.xs, fontWeight: "700", color: colors.vermillion },
  dot: { color: colors.mutedForeground },
  readTime: { fontSize: fontSize.xs, color: colors.mutedForeground },
  title: { fontSize: fontSize["3xl"], fontWeight: "800", color: colors.foreground, lineHeight: 38 },
  subtitle: { fontSize: fontSize.lg, color: colors.mutedForeground, marginTop: spacing.sm },
  destRow: { flexDirection: "row", flexWrap: "wrap", gap: 6, marginTop: spacing.lg, marginBottom: spacing.md },
  destChip: { backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border, borderRadius: borderRadius.sm, paddingHorizontal: 10, paddingVertical: 6 },
  destChipText: { fontSize: fontSize.xs, color: colors.foreground, textTransform: "capitalize" },
  h2: { fontSize: fontSize.xl, fontWeight: "700", color: colors.foreground, marginTop: spacing.xl, marginBottom: spacing.md },
  paragraph: { fontSize: fontSize.base, color: colors.mutedForeground, lineHeight: 26, marginBottom: spacing.md },
  tagRow: { flexDirection: "row", flexWrap: "wrap", gap: 6, marginTop: spacing.xl },
  tag: { borderWidth: 1, borderColor: colors.border, borderRadius: borderRadius.full, paddingHorizontal: 10, paddingVertical: 4 },
  tagText: { fontSize: fontSize.xs, color: colors.mutedForeground },
  closing: { fontSize: fontSize.lg, fontStyle: "italic", color: colors.foreground, textAlign: "center", marginTop: spacing.xxl, opacity: 0.7 },
});
