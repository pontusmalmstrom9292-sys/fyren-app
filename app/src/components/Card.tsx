import { View, StyleSheet, ViewProps } from 'react-native';
import { colors, spacing, radius } from '../theme';

interface CardProps extends ViewProps {
  variant?: 'default' | 'outlined' | 'gold';
}

export function Card({ variant = 'default', style, children, ...props }: CardProps) {
  return (
    <View
      style={[
        styles.base,
        variant === 'outlined' && styles.outlined,
        variant === 'gold' && styles.gold,
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.lg,
  },
  outlined: {
    borderWidth: 1,
    borderColor: colors.border,
  },
  gold: {
    borderWidth: 1,
    borderColor: colors.gold,
  },
});
