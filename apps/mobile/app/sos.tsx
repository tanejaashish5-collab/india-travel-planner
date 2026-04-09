import { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Linking, Share, Alert, TextInput } from "react-native";
import { Stack } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { colors, spacing, fontSize, borderRadius } from "../lib/theme";

const SOS_CONTACTS_KEY = "sos_emergency_contacts";

interface EmergencyContact {
  name: string;
  phone: string;
}

export default function SOSScreen() {
  const [contacts, setContacts] = useState<EmergencyContact[]>([]);
  const [addingContact, setAddingContact] = useState(false);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");

  useEffect(() => {
    AsyncStorage.getItem(SOS_CONTACTS_KEY).then((raw) => {
      if (raw) setContacts(JSON.parse(raw));
    });
  }, []);

  async function saveContacts(updated: EmergencyContact[]) {
    setContacts(updated);
    await AsyncStorage.setItem(SOS_CONTACTS_KEY, JSON.stringify(updated));
  }

  function addContact() {
    if (!newName || !newPhone) return;
    saveContacts([...contacts, { name: newName, phone: newPhone }]);
    setNewName("");
    setNewPhone("");
    setAddingContact(false);
  }

  function removeContact(index: number) {
    Alert.alert("Remove Contact", `Remove ${contacts[index].name}?`, [
      { text: "Cancel", style: "cancel" },
      { text: "Remove", style: "destructive", onPress: () => saveContacts(contacts.filter((_, i) => i !== index)) },
    ]);
  }

  async function shareLocation() {
    try {
      const { default: ExpoLocation } = await import("expo-location");
      const { status } = await ExpoLocation.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Location Permission", "Enable location to share your position.");
        return;
      }
      const loc = await ExpoLocation.getCurrentPositionAsync({ accuracy: ExpoLocation.Accuracy.High });
      const url = `https://maps.google.com/?q=${loc.coords.latitude},${loc.coords.longitude}`;
      const message = `EMERGENCY! I need help. My location: ${url}`;

      await Share.share({ message, title: "Emergency Location" });
    } catch {
      Alert.alert("Error", "Could not get location. Try again.");
    }
  }

  function callEmergency() {
    Linking.openURL("tel:112");
  }

  function callContact(phone: string) {
    Linking.openURL(`tel:${phone}`);
  }

  return (
    <ScrollView style={s.container} contentContainerStyle={s.content}>
      <Stack.Screen options={{ title: "SOS Emergency", headerStyle: { backgroundColor: "#1a0000" } }} />

      {/* Emergency button */}
      <TouchableOpacity style={s.sosBtn} onPress={callEmergency}>
        <Text style={s.sosBtnEmoji}>🆘</Text>
        <Text style={s.sosBtnTitle}>Call Emergency</Text>
        <Text style={s.sosBtnSub}>Dial 112 (Police, Ambulance, Fire)</Text>
      </TouchableOpacity>

      {/* Quick actions */}
      <View style={s.actionsRow}>
        <TouchableOpacity style={s.actionCard} onPress={shareLocation}>
          <Text style={s.actionEmoji}>📍</Text>
          <Text style={s.actionLabel}>Share Location</Text>
          <Text style={s.actionDesc}>SMS / WhatsApp</Text>
        </TouchableOpacity>

        <TouchableOpacity style={s.actionCard} onPress={() => Linking.openURL("tel:108")}>
          <Text style={s.actionEmoji}>🚑</Text>
          <Text style={s.actionLabel}>Ambulance</Text>
          <Text style={s.actionDesc}>Call 108</Text>
        </TouchableOpacity>
      </View>

      {/* Emergency contacts */}
      <Text style={s.sectionTitle}>Your Emergency Contacts</Text>
      <Text style={s.sectionDesc}>Add people who should be notified in an emergency.</Text>

      {contacts.map((c, i) => (
        <View key={i} style={s.contactCard}>
          <View style={{ flex: 1 }}>
            <Text style={s.contactName}>{c.name}</Text>
            <Text style={s.contactPhone}>{c.phone}</Text>
          </View>
          <TouchableOpacity style={s.callBtn} onPress={() => callContact(c.phone)}>
            <Text style={s.callBtnText}>Call</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => removeContact(i)}>
            <Text style={s.removeText}>✕</Text>
          </TouchableOpacity>
        </View>
      ))}

      {addingContact ? (
        <View style={s.addForm}>
          <TextInput style={s.input} placeholder="Name" placeholderTextColor={colors.mutedForeground} value={newName} onChangeText={setNewName} />
          <TextInput style={s.input} placeholder="Phone" placeholderTextColor={colors.mutedForeground} value={newPhone} onChangeText={setNewPhone} keyboardType="phone-pad" />
          <View style={s.addBtns}>
            <TouchableOpacity style={s.saveBtn} onPress={addContact}><Text style={s.saveBtnText}>Save</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => setAddingContact(false)}><Text style={s.cancelText}>Cancel</Text></TouchableOpacity>
          </View>
        </View>
      ) : (
        <TouchableOpacity style={s.addBtn} onPress={() => setAddingContact(true)}>
          <Text style={s.addBtnText}>+ Add Emergency Contact</Text>
        </TouchableOpacity>
      )}

      {/* Useful numbers */}
      <Text style={s.sectionTitle}>Useful Numbers</Text>
      {[
        { label: "National Emergency", number: "112" },
        { label: "Ambulance", number: "108" },
        { label: "Police", number: "100" },
        { label: "Fire", number: "101" },
        { label: "Women Helpline", number: "1091" },
        { label: "Tourist Helpline", number: "1363" },
        { label: "Road Accident Emergency", number: "1073" },
      ].map((n) => (
        <TouchableOpacity key={n.number} style={s.numRow} onPress={() => Linking.openURL(`tel:${n.number}`)}>
          <Text style={s.numLabel}>{n.label}</Text>
          <Text style={s.numValue}>{n.number}</Text>
        </TouchableOpacity>
      ))}

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg },
  sosBtn: { backgroundColor: "#dc2626", borderRadius: borderRadius.xl, padding: spacing.xl, alignItems: "center", marginBottom: spacing.lg },
  sosBtnEmoji: { fontSize: 48 },
  sosBtnTitle: { fontSize: fontSize["2xl"], fontWeight: "700", color: "#fff", marginTop: spacing.sm },
  sosBtnSub: { fontSize: fontSize.sm, color: "rgba(255,255,255,0.8)", marginTop: 4 },
  actionsRow: { flexDirection: "row", gap: spacing.sm, marginBottom: spacing.xl },
  actionCard: { flex: 1, backgroundColor: colors.card, borderRadius: borderRadius.md, padding: spacing.md, alignItems: "center", borderWidth: 1, borderColor: colors.border },
  actionEmoji: { fontSize: 28 },
  actionLabel: { fontSize: fontSize.sm, fontWeight: "700", color: colors.foreground, marginTop: spacing.xs },
  actionDesc: { fontSize: fontSize.xs, color: colors.mutedForeground, marginTop: 2 },
  sectionTitle: { fontSize: fontSize.lg, fontWeight: "700", color: colors.foreground, marginTop: spacing.lg },
  sectionDesc: { fontSize: fontSize.sm, color: colors.mutedForeground, marginTop: 4, marginBottom: spacing.md },
  contactCard: { flexDirection: "row", alignItems: "center", backgroundColor: colors.card, borderRadius: borderRadius.sm, padding: spacing.md, marginBottom: spacing.sm, borderWidth: 1, borderColor: colors.border, gap: spacing.sm },
  contactName: { fontSize: fontSize.base, fontWeight: "700", color: colors.foreground },
  contactPhone: { fontSize: fontSize.sm, color: colors.mutedForeground, fontFamily: "monospace" },
  callBtn: { backgroundColor: colors.score5, paddingHorizontal: 14, paddingVertical: 6, borderRadius: borderRadius.full },
  callBtnText: { fontSize: fontSize.xs, fontWeight: "700", color: "#fff" },
  removeText: { fontSize: fontSize.lg, color: colors.mutedForeground, paddingHorizontal: 4 },
  addForm: { backgroundColor: colors.card, borderRadius: borderRadius.md, padding: spacing.md, borderWidth: 1, borderColor: colors.border, gap: spacing.sm },
  input: { backgroundColor: colors.background, borderWidth: 1, borderColor: colors.border, borderRadius: borderRadius.sm, paddingHorizontal: spacing.md, paddingVertical: 10, fontSize: fontSize.sm, color: colors.foreground },
  addBtns: { flexDirection: "row", gap: spacing.sm, alignItems: "center" },
  saveBtn: { backgroundColor: colors.primary, paddingHorizontal: 20, paddingVertical: 10, borderRadius: borderRadius.sm },
  saveBtnText: { fontSize: fontSize.sm, fontWeight: "700", color: colors.primaryForeground },
  cancelText: { fontSize: fontSize.sm, color: colors.mutedForeground },
  addBtn: { borderWidth: 1, borderColor: colors.border, borderStyle: "dashed", borderRadius: borderRadius.md, padding: spacing.md, alignItems: "center" },
  addBtnText: { fontSize: fontSize.sm, color: colors.primary, fontWeight: "600" },
  numRow: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: colors.border },
  numLabel: { fontSize: fontSize.sm, color: colors.foreground },
  numValue: { fontSize: fontSize.sm, color: colors.primary, fontWeight: "700", fontFamily: "monospace" },
});
