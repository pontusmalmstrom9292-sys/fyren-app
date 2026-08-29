import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { colors, fontSize, spacing, radius } from '../../theme';
import { Card } from '../../components/Card';

function SettingsRow({ icon, label, value, onPress, hasToggle, toggleValue, onToggle }: any) {
  return (
    <TouchableOpacity style={styles.settingsRow} onPress={onPress} disabled={hasToggle}>
      <Ionicons name={icon} size={22} color={colors.textMuted} />
      <Text style={styles.settingsLabel}>{label}</Text>
      {hasToggle ? (
        <Switch value={toggleValue} onValueChange={onToggle} trackColor={{ true: colors.gold, false: colors.border }} thumbColor={colors.white} />
      ) : (
        <View style={styles.settingsRight}>
          {value && <Text style={styles.settingsValue}>{value}</Text>}
          <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
        </View>
      )}
    </TouchableOpacity>
  );
}

export default function MerScreen() {
  const router = useRouter();
  const [morningReminder, setMorningReminder] = useState(true);
  const [eveningReminder, setEveningReminder] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.header}>MER</Text>

        {/* Profile */}
        <Card style={styles.profileCard}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={32} color={colors.gold} />
          </View>
          <Text style={styles.profileName}>Pontus Malmström</Text>
          <Text style={styles.profileEmail}>pontus@fyren.se</Text>
          <View style={styles.statRow}>
            <View style={styles.profileStat}>
              <Text style={styles.profileStatValue}>42</Text>
              <Text style={styles.profileStatLabel}>Reflektioner</Text>
            </View>
            <View style={styles.profileStat}>
              <Text style={styles.profileStatValue}>7</Text>
              <Text style={styles.profileStatLabel}>Streak</Text>
            </View>
            <View style={styles.profileStat}>
              <Text style={styles.profileStatValue}>89%</Text>
              <Text style={styles.profileStatLabel}>Konsistens</Text>
            </View>
          </View>
        </Card>

        {/* Settings groups */}
        <Text style={styles.sectionTitle}>KONTO</Text>
        <Card style={styles.settingsGroup}>
          <SettingsRow icon="person-outline" label="Redigera profil" />
          <SettingsRow icon="people-outline" label="Familj" value="4 medlemmar" />
          <SettingsRow icon="star-outline" label="Premium" value="Aktiv" />
        </Card>

        <Text style={styles.sectionTitle}>PÅMINNELSER</Text>
        <Card style={styles.settingsGroup}>
          <SettingsRow icon="sunny-outline" label="Morgonpåminnelse" hasToggle toggleValue={morningReminder} onToggle={setMorningReminder} />
          <SettingsRow icon="moon-outline" label="Kvällspåminnelse" hasToggle toggleValue={eveningReminder} onToggle={setEveningReminder} />
          <SettingsRow icon="time-outline" label="Tider" value="07:00 / 21:00" />
        </Card>

        <Text style={styles.sectionTitle}>OM FYREN</Text>
        <Card style={styles.settingsGroup}>
          <SettingsRow icon="information-circle-outline" label="Om appen" />
          <SettingsRow icon="shield-checkmark-outline" label="Integritet" />
          <SettingsRow icon="help-circle-outline" label="Hjälp" />
        </Card>

        <Text style={styles.version}>Fyren v1.0.0</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg, gap: spacing.md, paddingBottom: 100 },
  header: { color: colors.textPrimary, fontSize: fontSize.lg, fontWeight: '600', textAlign: 'center', letterSpacing: 4 },
  profileCard: { alignItems: 'center', gap: spacing.sm, paddingVertical: spacing['2xl'] },
  avatar: { width: 72, height: 72, borderRadius: 36, backgroundColor: colors.card, alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: colors.gold },
  profileName: { color: colors.textPrimary, fontSize: fontSize.xl, fontWeight: '600' },
  profileEmail: { color: colors.textMuted, fontSize: fontSize.sm },
  statRow: { flexDirection: 'row', gap: spacing['3xl'], marginTop: spacing.md },
  profileStat: { alignItems: 'center' },
  profileStatValue: { color: colors.gold, fontSize: fontSize['2xl'], fontWeight: '700' },
  profileStatLabel: { color: colors.textMuted, fontSize: fontSize.xs, marginTop: 2 },
  sectionTitle: { color: colors.textMuted, fontSize: fontSize.xs, letterSpacing: 2, marginTop: spacing.sm },
  settingsGroup: { padding: 0, gap: 0 },
  settingsRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, padding: spacing.lg, borderBottomWidth: 1, borderBottomColor: colors.card },
  settingsLabel: { flex: 1, color: colors.textPrimary, fontSize: fontSize.md },
  settingsRight: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs },
  settingsValue: { color: colors.textMuted, fontSize: fontSize.sm },
  version: { color: colors.textDim, fontSize: fontSize.xs, textAlign: 'center', marginTop: spacing.xl },
});
