import { View, Text, ScrollView, TouchableOpacity, StyleSheet, ActivityIndicator, Share, Linking } from "react-native";
import { useLocalSearchParams, Stack, router } from "expo-router";
import { colors, spacing, fontSize, borderRadius } from "../../lib/theme";
import { useArticle, useArticles } from "../../hooks/useArticles";

const CAT_LABELS: Record<string, string> = {
  "best-time": "Best Time to Visit",
  comparison: "Comparison",
  guide: "Intelligence Guide",
  "data-story": "Data Story",
};

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default function BlogArticleScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const { article, loading } = useArticle(slug);
  const { articles: allArticles, loading: allLoading } = useArticles();

  if (loading || !article) {
    return <View style={s.center}><Stack.Screen options={{ title: "Loading..." }} /><ActivityIndicator size="large" color={colors.primary} /></View>;
  }

  const sections = parseContent(article.content);

  // Related articles: same category or shared tags, excluding current
  const related = allArticles
    .filter((a) => a.slug !== article.slug)
    .filter((a) => a.category === article.category || a.tags?.some((t) => article.tags?.includes(t)))
    .slice(0, 3);

  async function handleShare() {
    await Share.share({
      message: `${article!.title}\n\nRead on NakshIQ: https://nakshiq.com/en/blog/${article!.slug}`,
      title: article!.title,
    });
  }

  function handleWhatsAppShare() {
    const msg = encodeURIComponent(`${article!.title}\n\nRead: https://nakshiq.com/en/blog/${article!.slug}`);
    Linking.openURL(`https://wa.me/?text=${msg}`);
  }

  return (
    <ScrollView style={s.container} contentContainerStyle={s.content}>
      <Stack.Screen options={{ title: "" }} />

      {/* Back to blog */}
      <TouchableOpacity style={s.backRow} onPress={() => router.push("/blog")}>
        <Text style={s.backArrow}>←</Text>
        <Text style={s.backText}>All Articles</Text>
      </TouchableOpacity>

      {/* Header */}
      <View style={s.metaRow}>
        <Text style={s.catLabel}>{CAT_LABELS[article.category] || article.category}</Text>
        <Text style={s.dot}>·</Text>
        <Text style={s.readTime}>{article.reading_time} min read</Text>
        {article.depth && (
          <>
            <Text style={s.dot}>·</Text>
            <View style={[s.depthBadge, article.depth === "deep-dive" ? s.depthDeep : s.depthBrief]}>
              <Text style={[s.depthText, article.depth === "deep-dive" ? s.depthDeepText : s.depthBriefText]}>
                {article.depth === "deep-dive" ? "Deep Dive" : "Brief"}
              </Text>
            </View>
          </>
        )}
      </View>

      <Text style={s.title}>{article.title}</Text>
      {article.subtitle && <Text style={s.subtitle}>{article.subtitle}</Text>}

      {/* Author & date metadata */}
      <View style={s.authorRow}>
        <Text style={s.authorText}>By {(article as any).author || "NakshIQ"}</Text>
        <Text style={s.authorDot}>·</Text>
        <Text style={s.authorText}>{formatDate(article.published_at)}</Text>
        {article.reading_time > 0 && (
          <>
            <Text style={s.authorDot}>·</Text>
            <Text style={s.authorText}>{article.reading_time} min read</Text>
          </>
        )}
      </View>

      {/* Share actions */}
      <View style={s.shareRow}>
        <TouchableOpacity style={s.shareBtn} onPress={handleShare}>
          <Text style={s.shareBtnText}>Share</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[s.shareBtn, s.whatsappBtn]} onPress={handleWhatsAppShare}>
          <Text style={[s.shareBtnText, { color: "#fff" }]}>WhatsApp</Text>
        </TouchableOpacity>
      </View>

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

      {/* Related articles / Read Next */}
      {related.length > 0 ? (
        <View style={s.relatedSection}>
          <Text style={s.relatedTitle}>Read Next</Text>
          {related.map((r) => (
            <TouchableOpacity key={r.slug} style={s.relatedCard} onPress={() => router.push(`/blog/${r.slug}`)}>
              <Text style={s.relatedCat}>{CAT_LABELS[r.category] || r.category}</Text>
              <Text style={s.relatedCardTitle} numberOfLines={2}>{r.title}</Text>
              {r.reading_time > 0 && <Text style={s.relatedMeta}>{r.reading_time} min read</Text>}
            </TouchableOpacity>
          ))}
        </View>
      ) : (
        <View style={s.relatedSection}>
          <TouchableOpacity style={s.browseAllBtn} onPress={() => router.push("/blog")}>
            <Text style={s.browseAllText}>Browse all articles →</Text>
          </TouchableOpacity>
        </View>
      )}

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
  backRow: { flexDirection: "row", alignItems: "center", gap: 6, marginBottom: spacing.lg },
  backArrow: { fontSize: fontSize.lg, color: colors.vermillion },
  backText: { fontSize: fontSize.sm, color: colors.vermillion, fontWeight: "600" },
  depthBadge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: borderRadius.sm },
  depthDeep: { backgroundColor: colors.vermillion + "15" },
  depthBrief: { backgroundColor: colors.score4 + "15" },
  depthText: { fontSize: 10, fontWeight: "700" },
  depthDeepText: { color: colors.vermillion },
  depthBriefText: { color: colors.score4 },
  metaRow: { flexDirection: "row", alignItems: "center", gap: 6, marginBottom: spacing.md, flexWrap: "wrap" },
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
  authorRow: { flexDirection: "row", alignItems: "center", gap: 6, marginTop: spacing.md, flexWrap: "wrap" },
  authorText: { fontSize: fontSize.xs, color: colors.mutedForeground },
  authorDot: { fontSize: fontSize.xs, color: colors.mutedForeground, opacity: 0.5 },
  shareRow: { flexDirection: "row", gap: spacing.sm, marginTop: spacing.md },
  shareBtn: { borderRadius: borderRadius.full, borderWidth: 1, borderColor: colors.border, paddingHorizontal: 16, paddingVertical: spacing.sm, alignItems: "center" },
  shareBtnText: { fontSize: fontSize.sm, fontWeight: "600", color: colors.mutedForeground },
  whatsappBtn: { backgroundColor: "#25D366", borderColor: "#25D366" },
  relatedSection: { marginTop: spacing.xxl },
  relatedTitle: { fontSize: fontSize.xl, fontWeight: "700", color: colors.foreground, marginBottom: spacing.md },
  relatedCard: { backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border, borderRadius: borderRadius.md, padding: spacing.md, marginBottom: spacing.sm },
  relatedCat: { fontSize: 10, fontWeight: "700", color: colors.vermillion, marginBottom: 4 },
  relatedCardTitle: { fontSize: fontSize.base, fontWeight: "600", color: colors.foreground, lineHeight: 22 },
  relatedMeta: { fontSize: fontSize.xs, color: colors.mutedForeground, marginTop: 4 },
  browseAllBtn: { borderRadius: borderRadius.full, borderWidth: 1, borderColor: colors.vermillion, paddingVertical: spacing.md, alignItems: "center" },
  browseAllText: { fontSize: fontSize.sm, fontWeight: "600", color: colors.vermillion },
});
