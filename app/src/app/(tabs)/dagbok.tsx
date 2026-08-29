import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, fontSize, spacing } from '../../theme';

export default function DagbokScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>DAGBOK</Text>
      <Text style={styles.subtitle}>Dina reflektioner</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.lg,
  },
  header: {
    color: colors.textPrimary,
    fontSize: fontSize.lg,
    fontWeight: '600',
    textAlign: 'center',
    letterSpacing: 4,
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: fontSize.md,
    textAlign: 'center',
    marginTop: spacing.sm,
  },
});
