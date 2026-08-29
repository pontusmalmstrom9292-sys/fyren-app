import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { colors, fontSize, spacing } from '../theme';
import { Card } from '../components/Card';

const NOTIFICATIONS = [
  { id: '1', icon: 'flame', color: colors.gold, title: '7-dagars streak!', text: 'Grattis! Du har reflekterat 7 dagar i rad.', time: 'Idag, 09:00', unread: true },
  { id: '2', icon: 'moon-outline', color: colors.accent, title: 'Kvällspåminnelse', text: 'Dags att reflektera över din dag.', time: 'Igår, 21:00', unread: true },
  { id: '3', icon: 'trophy-outline', color: colors.goldLight, title: 'Ny prestation!', text: 'Du har låst upp "Nattugla" — 5 kvällsreflektioner.', time: 'Igår, 21:15', unread: false },
  { id: '4', icon: 'bar-chart-outline', color: colors.textSecondary, title: 'Veckosammanfattning', text: 'Din vecka: 85% humör, 5/7 dagars streak.', time: 'Mån, 08:00', unread: false },
  { id: '5', icon: 'sunny-outline', color: colors.gold, title: 'Morgonpåminnelse', text: 'God morgon! Börja dagen med din ritual.', time: 'Mån, 07:00', unread: false },
];

export default function NotiserScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>NOTISER</Text>
        <TouchableOpacity>
          <Text style={styles.markRead}>Markera alla</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {NOTIFICATIONS.map(n => (
          <Card key={n.id} style={[styles.notifCard, n.unread && styles.unread]}>
            <View style={[styles.iconCircle, { backgroundColor: n.color + '20' }]}>
              <Ionicons name={n.icon as any} size={20} color={n.color} />
            </View>
            <View style={styles.notifContent}>
              <Text style={styles.notifTitle}>{n.title}</Text>
              <Text style={styles.notifText}>{n.text}</Text>
              <Text style={styles.notifTime}>{n.time}</Text>
            </View>
            {n.unread && <View style={styles.dot} />}
          </Card>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: spacing.lg },
  headerTitle: { color: colors.textPrimary, fontSize: fontSize.md, fontWeight: '600', letterSpacing: 3 },
  markRead: { color: colors.gold, fontSize: fontSize.sm },
  content: { padding: spacing.lg, gap: spacing.sm },
  notifCard: { flexDirection: 'row', alignItems: 'flex-start', gap: spacing.md },
  unread: { borderLeftWidth: 3, borderLeftColor: colors.gold },
  iconCircle: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  notifContent: { flex: 1, gap: 2 },
  notifTitle: { color: colors.textPrimary, fontSize: fontSize.md, fontWeight: '600' },
  notifText: { color: colors.textSecondary, fontSize: fontSize.sm, lineHeight: 20 },
  notifTime: { color: colors.textMuted, fontSize: fontSize.xs, marginTop: 4 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.gold, marginTop: 6 },
});
