import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, spacing, fontSize } from '../theme';
import { Mood, MOOD_EMOJIS, MOOD_LABELS } from '../store/useAppStore';

interface MoodPickerProps {
  selected?: Mood;
  onSelect: (mood: Mood) => void;
}

const moods: Mood[] = ['great', 'good', 'okay', 'low', 'bad'];

export function MoodPicker({ selected, onSelect }: MoodPickerProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>VÄLJ KVÄLLENS KÄNSLA</Text>
      <View style={styles.row}>
        {moods.map((mood) => (
          <TouchableOpacity
            key={mood}
            style={[
              styles.moodButton,
              selected === mood && styles.moodSelected,
            ]}
            onPress={() => onSelect(mood)}
          >
            <Text style={styles.emoji}>{MOOD_EMOJIS[mood]}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: spacing.md,
  },
  label: {
    color: colors.textMuted,
    fontSize: fontSize.xs,
    letterSpacing: 2,
  },
  row: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  moodButton: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  moodSelected: {
    backgroundColor: colors.surfaceLight,
    borderWidth: 2,
    borderColor: colors.gold,
  },
  emoji: {
    fontSize: 24,
  },
});
