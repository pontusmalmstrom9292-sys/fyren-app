import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { colors, fontSize, spacing, radius } from '../../theme';
import { Card } from '../../components/Card';
import { MOCK_REFLECTIONS, MOOD_EMOJIS } from '../../store/useAppStore';

export default function DagbokScreen() {
  const router = useRouter();

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    const days = ['Sön', 'Mån', 'Tis', 'Ons', 'Tor', 'Fre', 'Lör'];
    const months = ['jan', 'feb', 'mar', 'apr', 'maj', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'dec'];
    return `${days[d.getDay()]} ${d.getDate()} ${months[d.getMonth()]}`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.header}>DAGBOK</Text>
        <Text style={styles.subtitle}>Kvällsreflektion</Text>

        {/* Write new */}
        <TouchableOpacity onPress={() => router.push('/skriv')}>
          <Card variant="gold" style={styles.writeCard}>
            <Ionicons name="create-outline" size={24} color={colors.gold} />
            <View style={styles.writeInfo}>
              <Text style={styles.writeTitle}>Hur mår du just nu?</Text>
              <Text style={styles.writeSub}>Skriv fritt, ingen bedömer...</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
          </Card>
        </TouchableOpacity>

        {/* Streak */}
        <View style={styles.streakRow}>
          <Ionicons name="flame-outline" size={18} color={colors.gold} />
          <Text style={styles.streakText}>5 dagars skriv-streak</Text>
        </View>

        {/* Past entries */}
        <Text style={styles.sectionTitle}>SENASTE REFLEKTIONER</Text>
        {MOCK_REFLECTIONS.map(entry => (
          <TouchableOpacity key={entry.id}>
            <Card style={styles.entryCard}>
              <View style={styles.entryHeader}>
                <Text style={styles.entryDate}>{formatDate(entry.date)}</Text>
                <Text style={styles.entryMood}>{MOOD_EMOJIS[entry.mood]}</Text>
              </View>
              <Text style={styles.entryText} numberOfLines={2}>{entry.text}</Text>
              <View style={styles.tagRow}>
                {entry.tags.map(tag => (
                  <View key={tag} style={styles.tag}>
                    <Text style={styles.tagText}>{tag}</Text>
                  </View>
                ))}
              </View>
            </Card>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* FAB */}
      <TouchableOpacity style={styles.fab} onPress={() => router.push('/skriv')}>
        <Ionicons name="add" size={28} color={colors.black} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg, gap: spacing.md, paddingBottom: 100 },
  header: { color: colors.textPrimary, fontSize: fontSize.lg, fontWeight: '600', textAlign: 'center', letterSpacing: 4 },
  subtitle: { color: colors.textMuted, fontSize: fontSize.md, textAlign: 'center' },
  writeCard: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  writeInfo: { flex: 1 },
  writeTitle: { color: colors.textPrimary, fontSize: fontSize.lg, fontWeight: '500' },
  writeSub: { color: colors.textMuted, fontSize: fontSize.sm, marginTop: 2 },
  streakRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, justifyContent: 'center' },
  streakText: { color: colors.gold, fontSize: fontSize.sm, fontWeight: '600' },
  sectionTitle: { color: colors.textMuted, fontSize: fontSize.xs, letterSpacing: 2, marginTop: spacing.md },
  entryCard: { gap: spacing.sm },
  entryHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  entryDate: { color: colors.textMuted, fontSize: fontSize.sm },
  entryMood: { fontSize: 20 },
  entryText: { color: colors.textPrimary, fontSize: fontSize.md, lineHeight: 22 },
  tagRow: { flexDirection: 'row', gap: spacing.sm },
  tag: { backgroundColor: colors.card, borderRadius: radius.full, paddingHorizontal: spacing.md, paddingVertical: spacing.xs },
  tagText: { color: colors.textMuted, fontSize: fontSize.xs },
  fab: { position: 'absolute', bottom: 100, right: 24, width: 56, height: 56, borderRadius: 28, backgroundColor: colors.gold, alignItems: 'center', justifyContent: 'center', elevation: 8, shadowColor: colors.gold, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8 },
});
