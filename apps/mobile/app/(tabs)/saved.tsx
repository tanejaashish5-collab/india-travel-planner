import { View, Text, StyleSheet } from "react-native";
import { colors, spacing, fontSize } from "../../lib/theme";

export default function SavedScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>❤️</Text>
      <Text style={styles.title}>Saved Destinations</Text>
      <Text style={styles.subtitle}>Your travel shortlist</Text>
      <Text style={styles.description}>
        Browse destinations and tap the heart to save them here. Build your trip board and share with friends.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, justifyContent: "center", alignItems: "center", padding: spacing.xl },
  emoji: { fontSize: 48, marginBottom: spacing.md },
  title: { fontSize: fontSize["2xl"], fontWeight: "700", color: colors.foreground },
  subtitle: { fontSize: fontSize.sm, color: colors.mutedForeground, marginTop: spacing.xs },
  description: { fontSize: fontSize.sm, color: colors.mutedForeground, textAlign: "center", marginTop: spacing.md, lineHeight: 22 },
});
