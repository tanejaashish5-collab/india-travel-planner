import { useState, useEffect } from "react";
import { View, Text, ScrollView, StyleSheet, Linking, TouchableOpacity } from "react-native";
import { Stack } from "expo-router";
import { colors, spacing, fontSize, borderRadius } from "../lib/theme";
import { supabase } from "../lib/supabase";

export default function AboutScreen() {
  const [stats, setStats] = useState({ destinations: 0, places: 0, treks: 0, festivals: 0, routes: 0, states: 0 });

  useEffect(() => {
    Promise.all([
      supabase.from("destinations").select("id", { count: "exact", head: true }),
      supabase.from("sub_destinations").select("id", { count: "exact", head: true }),
      supabase.from("hidden_gems").select("id", { count: "exact", head: true }),
      supabase.from("treks").select("id", { count: "exact", head: true }),
      supabase.from("festivals").select("id", { count: "exact", head: true }),
      supabase.from("routes").select("id", { count: "exact", head: true }),
      supabase.from("states").select("id", { count: "exact", head: true }),
    ]).then(([d, sub, gem, t, f, r, st]) => {
      setStats({
        destinations: d.count ?? 297,
        places: (d.count ?? 0) + (sub.count ?? 0) + (gem.count ?? 0),
        treks: t.count ?? 68,
        festivals: f.count ?? 199,
        routes: r.count ?? 39,
        states: st.count ?? 26,
      });
    });
  }, []);

  return (
    <ScrollView style={s.container} contentContainerStyle={s.content}>
      <Stack.Screen options={{ title: "About NakshIQ" }} />

      <Text style={s.title}>Naksh<Text style={{ color: colors.vermillion }}>IQ</Text></Text>
      <Text style={s.tagline}>The honest answers your guidebook won't give you.</Text>

      {/* Why this exists */}
      <Text style={s.section}>Why this exists</Text>
      <Text style={s.body}>
        I'm an Indian father raising two daughters abroad. They speak limited Hindi. They've spent more time at beaches than Indian hill stations. And one day, probably sooner than I think, they're going to want to see India for themselves.
      </Text>
      <Text style={s.body}>
        I won't always be there to take them. Some of those trips will happen when I'm older, or busy, or — eventually — gone. They'll be going to a country that should feel like home but won't quite, with a language they half-understand, navigating roads I learned by trial and error and they never had the chance to.
      </Text>
      <Text style={s.body}>
        I started NakshIQ so that when that day comes, they have the guide I would have written for them in person if I could. Every destination scored honestly. Every road condition checked. Every "don't go there alone after dark" said clearly.
      </Text>
      <View style={s.pullQuote}>
        <Text style={s.pullQuoteText}>Would I want my daughter to read this before she goes?</Text>
      </View>
      <Text style={s.body}>If yes, it ships. If no, we rewrite it.</Text>

      {/* Who's building this */}
      <Text style={s.section}>Who's building this</Text>
      <Text style={s.body}>
        NakshIQ is built by my family. I write most of the destination pages. My wife Aurore writes the family-perspective and women's-safety pieces. Our extended family across India helps verify what's actually true on the ground.
      </Text>
      <Text style={s.body}>
        There is no team. There are no investors. There are no outside writers, no sponsored content, no tourism boards funding our recommendations. Every word on this site was written by one of us and stands behind both of our names.
      </Text>

      {/* What we do */}
      <Text style={s.section}>What we actually do</Text>
      <Text style={s.body}>We score every destination honestly, every month, across the things that actually matter:</Text>
      <View style={s.featureCard}>
        <Text style={s.featureTitle}>Monthly suitability scores</Text>
        <Text style={s.featureDesc}>Every place rated 1-5 for every month. Not "best time: March-June" — we tell you exactly why March is 5/5 and July is 1/5.</Text>
      </View>
      <View style={s.featureCard}>
        <Text style={s.featureTitle}>Family and safety intelligence</Text>
        <Text style={s.featureDesc}>Kids ratings that account for altitude, medical access, road safety, phone signal. If the nearest hospital is four hours away, we tell you.</Text>
      </View>
      <View style={s.featureCard}>
        <Text style={s.featureTitle}>Honest infrastructure data</Text>
        <Text style={s.featureDesc}>Working ATMs. Phone signal by carrier. Nearest hospital and police station. Fuel stations. The practical reality nobody else publishes.</Text>
      </View>
      <View style={s.featureCard}>
        <Text style={s.featureTitle}>The Skip List</Text>
        <Text style={s.featureDesc}>Dozens of overhyped places we'd actively recommend skipping, with honest reasons and better alternatives.</Text>
      </View>

      {/* Stats */}
      <Text style={s.section}>By the Numbers</Text>
      <View style={s.statsGrid}>
        {[
          { label: "Destinations", value: stats.destinations },
          { label: "Places", value: stats.places },
          { label: "States", value: stats.states },
          { label: "Routes", value: stats.routes },
          { label: "Treks", value: stats.treks },
          { label: "Festivals", value: stats.festivals },
        ].map((st) => (
          <View key={st.label} style={s.statCard}>
            <Text style={s.statValue}>{st.value}+</Text>
            <Text style={s.statLabel}>{st.label}</Text>
          </View>
        ))}
      </View>

      {/* Note to parents */}
      <View style={s.parentNote}>
        <Text style={s.parentNoteTitle}>A note to fellow parents</Text>
        <Text style={s.parentNoteBody}>
          If you're reading this and you're a parent worrying about a trip your child is planning — we built this with you in mind. We can't make every road safe. But we can give you the most honest information available and the most carefully verified safety resources we can build.
        </Text>
      </View>

      {/* Signature */}
      <Text style={s.signature}>— A.T.</Text>
      <Text style={s.signatureSub}>Editor, NakshIQ</Text>

      <TouchableOpacity style={s.linkBtn} onPress={() => Linking.openURL("https://nakshiq.com")}>
        <Text style={s.linkText}>Visit Website →</Text>
      </TouchableOpacity>

      <Text style={s.footer}>
        NakshIQ is built by a family-owned company. We have no outside investors, no employees, and no commercial relationships with the destinations we cover.
      </Text>
      <Text style={s.version}>Version 1.0.0</Text>
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg },
  title: { fontSize: 32, fontWeight: "800", color: colors.foreground },
  tagline: { fontSize: fontSize.sm, color: colors.mutedForeground, marginTop: spacing.xs, fontStyle: "italic" },
  section: { fontSize: fontSize.lg, fontWeight: "700", color: colors.foreground, marginTop: spacing.xxl },
  body: { fontSize: fontSize.sm, color: colors.mutedForeground, marginTop: spacing.sm, lineHeight: 22 },
  pullQuote: {
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
    borderLeftWidth: 3,
    borderLeftColor: colors.primary,
    paddingLeft: spacing.md,
    paddingVertical: spacing.xs,
  },
  pullQuoteText: { fontSize: fontSize.md, fontWeight: "600", fontStyle: "italic", color: colors.foreground },
  featureCard: {
    marginTop: spacing.sm,
    backgroundColor: colors.card,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  featureTitle: { fontSize: fontSize.sm, fontWeight: "700", color: colors.foreground },
  featureDesc: { fontSize: fontSize.xs, color: colors.mutedForeground, marginTop: 4, lineHeight: 20 },
  statsGrid: { flexDirection: "row", flexWrap: "wrap", gap: spacing.sm, marginTop: spacing.md },
  statCard: { width: "30%", backgroundColor: colors.card, borderRadius: borderRadius.md, padding: spacing.md, alignItems: "center", borderWidth: 1, borderColor: colors.border },
  statValue: { fontSize: fontSize.xl, fontWeight: "700", color: colors.primary },
  statLabel: { fontSize: 10, color: colors.mutedForeground, marginTop: 2, textTransform: "uppercase", letterSpacing: 0.5 },
  parentNote: {
    marginTop: spacing.xxl,
    backgroundColor: colors.primary + "08",
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.primary + "20",
  },
  parentNoteTitle: { fontSize: fontSize.md, fontWeight: "700", color: colors.foreground },
  parentNoteBody: { fontSize: fontSize.sm, color: colors.mutedForeground, marginTop: spacing.sm, lineHeight: 22 },
  signature: { fontSize: fontSize.md, fontStyle: "italic", color: colors.mutedForeground, textAlign: "right", marginTop: spacing.xl },
  signatureSub: { fontSize: fontSize.xs, color: colors.mutedForeground, textAlign: "right", marginTop: 2, opacity: 0.6 },
  linkBtn: { marginTop: spacing.xl, backgroundColor: colors.card, borderRadius: borderRadius.md, padding: spacing.md, alignItems: "center", borderWidth: 1, borderColor: colors.border },
  linkText: { fontSize: fontSize.sm, fontWeight: "600", color: colors.primary },
  footer: { fontSize: 10, color: colors.mutedForeground, textAlign: "center", marginTop: spacing.xxl, opacity: 0.5, lineHeight: 16 },
  version: { fontSize: fontSize.xs, color: colors.mutedForeground, textAlign: "center", marginTop: spacing.lg, opacity: 0.3 },
});
