import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator, Linking } from "react-native";
import { router, Stack } from "expo-router";
import { colors, spacing, fontSize, borderRadius } from "../lib/theme";
import { usePermits } from "../hooks/usePermits";

export default function PermitsScreen() {
  const { permits, loading } = usePermits();

  if (loading) return <View style={s.center}><Stack.Screen options={{ title: "Permits" }} /><ActivityIndicator size="large" color={colors.primary} /></View>;

  return (
    <View style={s.container}>
      <Stack.Screen options={{ title: `${permits.length} Permits & Passes` }} />
      <FlatList
        data={permits}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: spacing.md }}
        renderItem={({ item: p }) => {
          const destName = Array.isArray(p.destinations) ? (p.destinations as any)[0]?.name : p.destinations?.name;
          return (
            <View style={s.card}>
              <View style={s.cardHeader}>
                <View style={s.typeBadge}><Text style={s.typeText}>{p.type}</Text></View>
                {p.cost_inr > 0 && <Text style={s.cost}>₹{p.cost_inr}</Text>}
              </View>
              {destName && (
                <TouchableOpacity onPress={() => p.destination_id ? router.push(`/destination/${p.destination_id}`) : null}>
                  <Text style={s.dest}>📍 {destName}</Text>
                </TouchableOpacity>
              )}
              {p.who_needs && <Text style={s.info}>Who needs it: {p.who_needs}</Text>}
              {p.processing_time && <Text style={s.info}>Processing: {p.processing_time}</Text>}
              {p.validity && <Text style={s.info}>Valid for: {p.validity}</Text>}
              {p.how_to_get && <Text style={s.howTo}>{p.how_to_get}</Text>}
              {p.documents_needed?.length > 0 && (
                <View style={s.docs}>
                  <Text style={s.docsTitle}>Documents needed:</Text>
                  {p.documents_needed.map((d, i) => <Text key={i} style={s.docItem}>• {d}</Text>)}
                </View>
              )}
              {p.pro_tip && <Text style={s.tip}>💡 {p.pro_tip}</Text>}
              {p.government_link && (
                <TouchableOpacity onPress={() => Linking.openURL(p.government_link!)}>
                  <Text style={s.link}>Official website →</Text>
                </TouchableOpacity>
              )}
            </View>
          );
        }}
      />
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  center: { flex: 1, backgroundColor: colors.background, justifyContent: "center", alignItems: "center" },
  card: { backgroundColor: colors.card, borderRadius: borderRadius.md, padding: spacing.md, marginBottom: spacing.sm, borderWidth: 1, borderColor: colors.border },
  cardHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  typeBadge: { backgroundColor: colors.muted, paddingHorizontal: 10, paddingVertical: 4, borderRadius: borderRadius.full },
  typeText: { fontSize: fontSize.xs, fontWeight: "700", color: colors.foreground },
  cost: { fontSize: fontSize.base, fontWeight: "700", color: colors.score5, fontFamily: "monospace" },
  dest: { fontSize: fontSize.sm, color: colors.score4, marginTop: spacing.sm },
  info: { fontSize: fontSize.sm, color: colors.mutedForeground, marginTop: 4 },
  howTo: { fontSize: fontSize.sm, color: colors.mutedForeground, marginTop: spacing.sm, lineHeight: 20 },
  docs: { marginTop: spacing.sm, backgroundColor: colors.muted, borderRadius: borderRadius.sm, padding: spacing.sm },
  docsTitle: { fontSize: fontSize.xs, fontWeight: "700", color: colors.foreground, marginBottom: 4 },
  docItem: { fontSize: fontSize.sm, color: colors.mutedForeground, marginBottom: 2 },
  tip: { fontSize: fontSize.sm, color: colors.score5, marginTop: spacing.sm, lineHeight: 20 },
  link: { fontSize: fontSize.sm, color: colors.score4, marginTop: spacing.sm, fontWeight: "600" },
});
