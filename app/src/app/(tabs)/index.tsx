import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { colors, fontSize, spacing, radius } from '../../theme';
import { Card } from '../../components/Card';
import { MOCK_HABITS } from '../../store/useAppStore';
import { useState } from 'react';

export default function HemScreen() {
  const router = useRouter();
  const [habits, setHabits] = useState(MOCK_HABITS);
  const streak = 7;
  const completedCount = habits.filter(h => h.completedToday).length;

  const toggleHabit = (id: string) => {
    setHabits(prev => prev.map(h =>
      h.id === id ? { ...h, completedToday: !h.completedToday, streak: h.completedToday ? h.streak - 1 : h.streak + 1 } : h
    ));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity><Ionicons name="menu-outline" size={24} color={colors.textPrimary} /></TouchableOpacity>
          <Text style={styles.headerTitle}>FYREN</Text>
          <TouchableOpacity onPress={() => router.push('/notiser')}>
            <Ionicons name="notifications-outline" size={24} color={colors.textPrimary} />
          </TouchableOpacity>
        </View>

        {/* Hero Quote */}
        <Card style={styles.heroCard}>
          <View style={styles.fireIcon}>
            <Ionicons name="bonfire-outline" size={48} color={colors.gold} />
          </View>
          <Text style={styles.quote}>
            "Ett mikrosteg räcker. Du behöver inte planera hela dagen nu."
          </Text>
        </Card>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          <Card variant="outlined" style={styles.statCard}>
            <Text style={styles.statLabel}>NÄRVARO</Text>
            <Text style={styles.statValue}>{streak}</Text>
          </Card>
          <Card variant="outlined" style={styles.statCard}>
            <Text style={styles.statLabel}>RITUAL</Text>
            <Text style={styles.statValueGold}>God morgon</Text>
          </Card>
        </View>

        {/* Compass */}
        <Card style={styles.compassCard}>
          <View style={styles.compassHeader}>
            <Ionicons name="compass-outline" size={20} color={colors.gold} />
            <Text style={styles.compassTitle}>KOMPASSRÅD</Text>
          </View>
          <Text style={styles.compassText}>
            Klicka ett steg i taget. Din riktning är viktigare än din fart.
          </Text>
        </Card>

        {/* Today's Habits */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>DAGENS VANOR</Text>
          <Text style={styles.sectionSub}>{completedCount}/{habits.length} klara</Text>
        </View>
        {habits.map(habit => (
          <TouchableOpacity key={habit.id} onPress={() => toggleHabit(habit.id)}>
            <Card style={[styles.habitCard, habit.completedToday && styles.habitDone]}>
              <View style={styles.habitRow}>
                <Ionicons name={habit.icon as any} size={22} color={habit.completedToday ? colors.gold : colors.textMuted} />
                <View style={styles.habitInfo}>
                  <Text style={[styles.habitName, habit.completedToday && styles.habitNameDone]}>{habit.name}</Text>
                  <Text style={styles.habitStreak}>{habit.streak} dagars streak</Text>
                </View>
                <Ionicons
                  name={habit.completedToday ? 'checkmark-circle' : 'ellipse-outline'}
                  size={26}
                  color={habit.completedToday ? colors.gold : colors.border}
                />
              </View>
            </Card>
          </TouchableOpacity>
        ))}

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.quickBtn} onPress={() => router.push('/checkin')}>
            <Ionicons name="happy-outline" size={24} color={colors.gold} />
            <Text style={styles.quickLabel}>Check-in</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickBtn} onPress={() => router.push('/ritual')}>
            <Ionicons name="timer-outline" size={24} color={colors.gold} />
            <Text style={styles.quickLabel}>Ritual</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickBtn} onPress={() => router.push('/tacksamhet')}>
            <Ionicons name="heart-outline" size={24} color={colors.gold} />
            <Text style={styles.quickLabel}>Tacksamhet</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg, gap: spacing.md, paddingBottom: 100 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.sm },
  headerTitle: { color: colors.textPrimary, fontSize: fontSize.lg, fontWeight: '600', letterSpacing: 4 },
  heroCard: { alignItems: 'center', paddingVertical: spacing['3xl'] },
  fireIcon: { marginBottom: spacing.lg, width: 80, height: 80, borderRadius: 40, backgroundColor: colors.card, alignItems: 'center', justifyContent: 'center' },
  quote: { color: colors.textPrimary, fontSize: fontSize.lg, fontStyle: 'italic', textAlign: 'center', lineHeight: 26 },
  statsRow: { flexDirection: 'row', gap: spacing.md },
  statCard: { flex: 1 },
  statLabel: { color: colors.textMuted, fontSize: fontSize.xs, letterSpacing: 2, marginBottom: spacing.xs },
  statValue: { color: colors.textPrimary, fontSize: fontSize['4xl'], fontWeight: '700' },
  statValueGold: { color: colors.gold, fontSize: fontSize.xl, fontWeight: '600' },
  compassCard: { gap: spacing.sm },
  compassHeader: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  compassTitle: { color: colors.textMuted, fontSize: fontSize.xs, letterSpacing: 2 },
  compassText: { color: colors.textSecondary, fontSize: fontSize.md, lineHeight: 22 },
  section: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: spacing.md },
  sectionTitle: { color: colors.textMuted, fontSize: fontSize.xs, letterSpacing: 2 },
  sectionSub: { color: colors.gold, fontSize: fontSize.sm },
  habitCard: { marginBottom: 0 },
  habitDone: { opacity: 0.7 },
  habitRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  habitInfo: { flex: 1 },
  habitName: { color: colors.textPrimary, fontSize: fontSize.md, fontWeight: '500' },
  habitNameDone: { textDecorationLine: 'line-through', color: colors.textMuted },
  habitStreak: { color: colors.textMuted, fontSize: fontSize.sm, marginTop: 2 },
  quickActions: { flexDirection: 'row', gap: spacing.md, marginTop: spacing.md },
  quickBtn: { flex: 1, backgroundColor: colors.surface, borderRadius: radius.md, padding: spacing.lg, alignItems: 'center', gap: spacing.sm },
  quickLabel: { color: colors.textSecondary, fontSize: fontSize.sm },
});
