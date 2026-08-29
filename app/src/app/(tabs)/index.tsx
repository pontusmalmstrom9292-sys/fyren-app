import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, fontFamily, fontSize, spacing } from '../../theme';

export default function HemScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.header}>FYREN</Text>
        <View style={styles.heroCard}>
          <Text style={styles.quote}>
            "Ett mikrosteg räcker. Du behöver inte planera hela dagen nu."
          </Text>
        </View>
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>NÄRVARO</Text>
            <Text style={styles.statValue}>7</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>RITUAL</Text>
            <Text style={styles.statValueGold}>God morgon</Text>
          </View>
        </View>
        <View style={styles.compassCard}>
          <Text style={styles.compassTitle}>KOMPASSRÅD</Text>
          <Text style={styles.compassText}>
            Klicka ett steg i taget. Din riktning är viktigare än din fart.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.lg,
    gap: spacing.lg,
  },
  header: {
    color: colors.textPrimary,
    fontSize: fontSize.lg,
    fontWeight: '600',
    textAlign: 'center',
    letterSpacing: 4,
  },
  heroCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: spacing['2xl'],
    alignItems: 'center',
  },
  quote: {
    color: colors.textPrimary,
    fontSize: fontSize.lg,
    fontStyle: 'italic',
    textAlign: 'center',
    lineHeight: 24,
  },
  statsRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  statLabel: {
    color: colors.textMuted,
    fontSize: fontSize.xs,
    letterSpacing: 2,
    marginBottom: spacing.xs,
  },
  statValue: {
    color: colors.textPrimary,
    fontSize: fontSize['3xl'],
    fontWeight: '700',
  },
  statValueGold: {
    color: colors.gold,
    fontSize: fontSize.lg,
    fontWeight: '600',
  },
  compassCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: spacing.lg,
  },
  compassTitle: {
    color: colors.textMuted,
    fontSize: fontSize.xs,
    letterSpacing: 2,
    marginBottom: spacing.sm,
  },
  compassText: {
    color: colors.textSecondary,
    fontSize: fontSize.md,
    lineHeight: 22,
  },
});
