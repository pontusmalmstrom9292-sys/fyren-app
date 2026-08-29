import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, fontSize, spacing, radius } from '../../theme';
import { Card } from '../../components/Card';
import { MOCK_GOALS } from '../../store/useAppStore';

function ProgressRing({ progress, size = 60 }: { progress: number; size?: number }) {
  const percentage = Math.round(progress * 100);
  return (
    <View style={[{ width: size, height: size }, styles.ring]}>
      <View style={[styles.ringOuter, { width: size, height: size, borderRadius: size / 2 }]}>
        <View style={[styles.ringInner, { width: size - 8, height: size - 8, borderRadius: (size - 8) / 2 }]}>
          <Text style={styles.ringText}>{percentage}%</Text>
        </View>
      </View>
    </View>
  );
}

export default function FyrmalScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.header}>FYRMÅL</Text>
        <Text style={styles.subtitle}>Dina mål och framsteg</Text>

        {MOCK_GOALS.map(goal => (
          <TouchableOpacity key={goal.id}>
            <Card style={styles.goalCard}>
              <View style={styles.goalHeader}>
                <View style={styles.goalInfo}>
                  <Text style={styles.goalTitle}>{goal.title}</Text>
                  <View style={styles.streakBadge}>
                    <Ionicons name="flame" size={14} color={colors.gold} />
                    <Text style={styles.streakCount}>{goal.streak} dagar</Text>
                  </View>
                </View>
                <ProgressRing progress={goal.progress} />
              </View>

              {/* Milestones */}
              <View style={styles.milestones}>
                {goal.milestones.map((m, i) => (
                  <View key={i} style={styles.milestone}>
                    <Ionicons
                      name={m.done ? 'checkmark-circle' : 'ellipse-outline'}
                      size={18}
                      color={m.done ? colors.gold : colors.border}
                    />
                    <Text style={[styles.milestoneText, m.done && styles.milestoneDone]}>{m.text}</Text>
                  </View>
                ))}
              </View>

              {/* Progress bar */}
              <View style={styles.progressBg}>
                <View style={[styles.progressFill, { width: `${goal.progress * 100}%` }]} />
              </View>
            </Card>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg, gap: spacing.md, paddingBottom: 100 },
  header: { color: colors.textPrimary, fontSize: fontSize.lg, fontWeight: '600', textAlign: 'center', letterSpacing: 4 },
  subtitle: { color: colors.textMuted, fontSize: fontSize.md, textAlign: 'center' },
  goalCard: { gap: spacing.md },
  goalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  goalInfo: { flex: 1, gap: spacing.sm },
  goalTitle: { color: colors.textPrimary, fontSize: fontSize.xl, fontWeight: '600' },
  streakBadge: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  streakCount: { color: colors.gold, fontSize: fontSize.sm, fontWeight: '600' },
  ring: { alignItems: 'center', justifyContent: 'center' },
  ringOuter: { borderWidth: 4, borderColor: colors.gold, alignItems: 'center', justifyContent: 'center' },
  ringInner: { backgroundColor: colors.surface, alignItems: 'center', justifyContent: 'center' },
  ringText: { color: colors.gold, fontSize: fontSize.sm, fontWeight: '700' },
  milestones: { gap: spacing.sm },
  milestone: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  milestoneText: { color: colors.textSecondary, fontSize: fontSize.sm },
  milestoneDone: { color: colors.textMuted, textDecorationLine: 'line-through' },
  progressBg: { height: 4, backgroundColor: colors.card, borderRadius: 2 },
  progressFill: { height: 4, backgroundColor: colors.gold, borderRadius: 2 },
});
