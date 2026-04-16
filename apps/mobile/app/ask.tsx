import { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { Stack } from "expo-router";
import { colors, spacing, fontSize, borderRadius } from "../lib/theme";

interface Message {
  role: "user" | "assistant";
  content: string;
  sources?: { name: string; type: string }[];
}

const SUGGESTIONS = [
  "Best islands for snorkeling in December?",
  "Family-friendly hill stations near Delhi",
  "Offbeat destinations in Northeast India",
  "Is Ladakh safe in October?",
];

const API_BASE = process.env.EXPO_PUBLIC_SUPABASE_URL?.replace(".supabase.co", "")
  ? "https://www.nakshiq.com"
  : "https://www.nakshiq.com";

export default function AskNakshIQScreen() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<ScrollView>(null);

  async function sendMessage(question: string) {
    if (!question.trim() || loading) return;

    const userMsg: Message = { role: "user", content: question.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: question.trim(),
          history: messages.slice(-6),
        }),
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.answer || "Sorry, I couldn't process that. Try again.",
          sources: data.sources ?? [],
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Network error. Check your connection and try again.", sources: [] },
      ]);
    } finally {
      setLoading(false);
      setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 100);
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={90}
    >
      <Stack.Screen options={{ title: "Ask NakshIQ", headerBackTitle: "Back" }} />

      <ScrollView
        ref={scrollRef}
        style={styles.messages}
        contentContainerStyle={styles.messagesContent}
        onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: true })}
      >
        {messages.length === 0 && (
          <View style={styles.empty}>
            <Text style={styles.emptyTitle}>Ask me anything about India travel</Text>
            <Text style={styles.emptySubtitle}>
              480 destinations, 36 states, safety data, monthly scores — I know it all.
            </Text>
            <View style={styles.suggestions}>
              {SUGGESTIONS.map((s, i) => (
                <TouchableOpacity key={i} style={styles.suggestion} onPress={() => sendMessage(s)}>
                  <Text style={styles.suggestionText}>{s}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {messages.map((msg, i) => (
          <View key={i} style={[styles.bubble, msg.role === "user" ? styles.userBubble : styles.assistantBubble]}>
            <Text style={[styles.bubbleText, msg.role === "user" && styles.userBubbleText]}>{msg.content}</Text>
            {msg.sources && msg.sources.length > 0 && (
              <View style={styles.sources}>
                {msg.sources.slice(0, 3).map((s, j) => (
                  <Text key={j} style={styles.sourceChip}>{s.name}</Text>
                ))}
              </View>
            )}
          </View>
        ))}

        {loading && (
          <View style={[styles.bubble, styles.assistantBubble]}>
            <ActivityIndicator size="small" color={colors.primary} />
          </View>
        )}
      </ScrollView>

      <View style={styles.inputBar}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Ask about any destination..."
          placeholderTextColor={colors.mutedForeground}
          returnKeyType="send"
          onSubmitEditing={() => sendMessage(input)}
          editable={!loading}
        />
        <TouchableOpacity
          style={[styles.sendBtn, (!input.trim() || loading) && styles.sendBtnDisabled]}
          onPress={() => sendMessage(input)}
          disabled={!input.trim() || loading}
        >
          <Text style={styles.sendBtnText}>→</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  messages: { flex: 1 },
  messagesContent: { padding: spacing.md, paddingBottom: spacing.xl },
  empty: { alignItems: "center", paddingTop: spacing.xxl, paddingHorizontal: spacing.lg },
  emptyTitle: { fontSize: fontSize.xl, fontWeight: "700", color: colors.foreground, textAlign: "center" },
  emptySubtitle: { fontSize: fontSize.sm, color: colors.mutedForeground, textAlign: "center", marginTop: spacing.sm },
  suggestions: { marginTop: spacing.lg, gap: spacing.sm, width: "100%" },
  suggestion: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
  },
  suggestionText: { color: colors.foreground, fontSize: fontSize.sm },
  bubble: {
    maxWidth: "85%",
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  userBubble: {
    alignSelf: "flex-end",
    backgroundColor: colors.saffron + "22",
    borderWidth: 1,
    borderColor: colors.saffron + "44",
  },
  assistantBubble: {
    alignSelf: "flex-start",
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
  },
  bubbleText: { color: colors.foreground, fontSize: fontSize.sm, lineHeight: 20 },
  userBubbleText: { color: colors.saffron },
  sources: { flexDirection: "row", flexWrap: "wrap", gap: 4, marginTop: spacing.sm },
  sourceChip: {
    fontSize: 10,
    color: colors.mutedForeground,
    backgroundColor: colors.muted,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: borderRadius.sm,
  },
  inputBar: {
    flexDirection: "row",
    alignItems: "center",
    padding: spacing.sm,
    paddingBottom: Platform.OS === "ios" ? spacing.md : spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.background,
    gap: spacing.sm,
  },
  input: {
    flex: 1,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.lg,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 2,
    color: colors.foreground,
    fontSize: fontSize.sm,
  },
  sendBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.saffron,
    alignItems: "center",
    justifyContent: "center",
  },
  sendBtnDisabled: { opacity: 0.3 },
  sendBtnText: { color: "#fff", fontSize: 18, fontWeight: "700" },
});
