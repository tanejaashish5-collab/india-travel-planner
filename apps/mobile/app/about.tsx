import { useState, useEffect } from "react";
import { View, Text, ScrollView, StyleSheet, Linking, TouchableOpacity } from "react-native";
import { Stack } from "expo-router";
import { colors, spacing, fontSize, borderRadius } from "../lib/theme";
import { supabase } from "../lib/supabase";

export default function AboutScreen() {
  const [stats, setStats] = useState({ destinations: 0, treks: 0, festivals: 0, routes: 0 });

  useEffect(() => {
    Promise.all([
      supabase.from("destinations").select("id", { count: "exact", head: true }),
      supabase.from("treks").select("id", { count: "exact", head: true }),
      supabase.from("festivals").select("id", { count: "exact", head: true }),
      supabase.from("routes").select("id", { count: "exact", head: true }),
    ]).then(([d, t, f, r]) => {
      setStats({
        destinations: d.count ?? 0,
        treks: t.count ?? 0,
        festivals: f.count ?? 0,
        routes: r.count ?? 0,
      });
    });
  }, []);

  return (
    <ScrollView style={s.container} contentContainerStyle={s.content}>
      <Stack.Screen options={{ title: "About" }} />

      <Text style={s.title}>Naksh<Text style={{ color: colors.vermillion }}>.</Text>iq</Text>
      <Text style={s.tagline}>Travel with IQ</Text>

      <Text style={s.section}>Our Mission</Text>
      <Text style={s.body}>
        We believe every Indian destination deserves honest, data-driven intelligence — not just pretty photos and vague reviews.
        We score every place, every month, with real infrastructure data so you travel with confidence, not anxiety.
      </Text>

      <Text style={s.section}>What Makes Us Different</Text>
      <Text style={s.body}>• Monthly suitability scores (1-5) for every destination</Text>
      <Text style={s.body}>• Kids-friendly ratings with real reasons, not guesswork</Text>
      <Text style={s.body}>• Infrastructure reality: network, medical, ATM, road quality</Text>
      <Text style={s.body}>• Tourist trap alternatives — we tell you where to go instead</Text>
      <Text style={s.body}>• AI itineraries built on verified data, not hallucinations</Text>

      <Text style={s.section}>By the Numbers</Text>
      <View style={s.statsGrid}>
        {[
          { label: "Destinations", value: stats.destinations },
          { label: "Treks", value: stats.treks },
          { label: "Festivals", value: stats.festivals },
          { label: "Routes", value: stats.routes },
        ].map((st) => (
          <View key={st.label} style={s.statCard}>
            <Text style={s.statValue}>{st.value}+</Text>
            <Text style={s.statLabel}>{st.label}</Text>
          </View>
        ))}
      </View>

      <Text style={s.section}>Methodology</Text>
      <Text style={s.body}>
        Every destination is scored 0-5 for each month based on weather, crowd levels, accessibility, and seasonal events.
        Kids ratings factor in terrain difficulty, medical access, altitude, and available activities.
        All data is verified and updated regularly.
      </Text>

      <TouchableOpacity style={s.linkBtn} onPress={() => Linking.openURL("https://nakshiq.com")}>
        <Text style={s.linkText}>Visit Website →</Text>
      </TouchableOpacity>

      <Text style={s.closing}>Go with confidence.</Text>
      <Text style={s.version}>Version 1.0.0</Text>
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg },
  title: { fontSize: fontSize["2xl"], fontWeight: "700", color: colors.foreground },
  tagline: { fontSize: fontSize.base, color: colors.mutedForeground, marginTop: spacing.xs },
  section: { fontSize: fontSize.lg, fontWeight: "700", color: colors.foreground, marginTop: spacing.xl },
  body: { fontSize: fontSize.sm, color: colors.mutedForeground, marginTop: spacing.sm, lineHeight: 22 },
  statsGrid: { flexDirection: "row", flexWrap: "wrap", gap: spacing.sm, marginTop: spacing.md },
  statCard: { width: "47%", backgroundColor: colors.card, borderRadius: borderRadius.md, padding: spacing.md, alignItems: "center", borderWidth: 1, borderColor: colors.border },
  statValue: { fontSize: fontSize["2xl"], fontWeight: "700", color: colors.primary },
  statLabel: { fontSize: fontSize.xs, color: colors.mutedForeground, marginTop: 4 },
  linkBtn: { marginTop: spacing.xl, backgroundColor: colors.card, borderRadius: borderRadius.md, padding: spacing.md, alignItems: "center", borderWidth: 1, borderColor: colors.border },
  linkText: { fontSize: fontSize.sm, fontWeight: "600", color: colors.primary },
  closing: { fontSize: fontSize.lg, fontStyle: "italic", color: colors.foreground, textAlign: "center", marginTop: spacing.xxl, opacity: 0.7 },
  version: { fontSize: fontSize.xs, color: colors.mutedForeground, textAlign: "center", marginTop: spacing.lg },
});
