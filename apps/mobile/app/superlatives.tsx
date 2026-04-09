import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { router, Stack } from "expo-router";
import { colors, spacing, fontSize, borderRadius } from "../lib/theme";
import { useSuperlatives } from "../hooks/useSuperlatives";

export default function SuperlativesScreen() {
  const { superlatives, loading } = useSuperlatives();

  if (loading) return <View style={s.center}><Stack.Screen options={{ title: "Records" }} /><ActivityIndicator size="large" color={colors.primary} /></View>;

  return (
    <View style={s.container}>
      <Stack.Screen options={{ title: "India's Records" }} />
      <FlatList
        data={superlatives}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: spacing.md }}
        renderItem={({ item: sup, index }) => {
          const destName = Array.isArray(sup.destinations) ? sup.destinations[0]?.name : sup.destinations?.name;
          return (
            <TouchableOpacity style={s.card} onPress={() => sup.destination_id ? router.push(`/destination/${sup.destination_id}`) : null}>
              <View style={s.numBadge}><Text style={s.numText}>{index + 1}</Text></View>
              <View style={{ flex: 1 }}>
                <Text style={s.title}>{sup.title}</Text>
                {sup.name && <Text style={s.name}>{sup.name}</Text>}
                {sup.detail && <Text style={s.detail}>{sup.detail}</Text>}
                {destName && <Text style={s.dest}>📍 {destName}</Text>}
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
  card: { backgroundColor: colors.card, borderRadius: borderRadius.md, padding: spacing.md, marginBottom: spacing.sm, borderWidth: 1, borderColor: colors.border, flexDirection: "row", gap: spacing.md },
  numBadge: { width: 32, height: 32, borderRadius: 16, backgroundColor: colors.primary, justifyContent: "center", alignItems: "center" },
  numText: { fontSize: fontSize.sm, fontWeight: "700", color: colors.primaryForeground },
  title: { fontSize: fontSize.sm, fontWeight: "700", color: colors.score4 },
  name: { fontSize: fontSize.base, fontWeight: "700", color: colors.foreground, marginTop: 2 },
  detail: { fontSize: fontSize.sm, color: colors.mutedForeground, marginTop: spacing.xs, lineHeight: 20 },
  dest: { fontSize: fontSize.xs, color: colors.mutedForeground, marginTop: spacing.xs },
});
