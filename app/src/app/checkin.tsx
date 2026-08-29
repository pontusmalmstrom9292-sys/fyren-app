import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { colors, fontSize, spacing, radius } from '../theme';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { MoodPicker } from '../components/MoodPicker';
import { Mood } from '../store/useAppStore';

export default function CheckinScreen() {
  const router = useRouter();
  const [mood, setMood] = useState<Mood | undefined>();
  const [text, setText] = useState('');

  const handleSave = () => {
    // Save reflection
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="close" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.date}>29 AUG 2026 · FREDAG KVÄLL</Text>
        <View style={{ width: 24 }} />
      </View>

      <Text style={styles.title}>Kvällsreflektion</Text>

      <Card style={styles.moodCard}>
        <MoodPicker selected={mood} onSelect={setMood} />
      </Card>

      <Card style={styles.textCard}>
        <Text style={styles.textLabel}>Hur mår du just nu?</Text>
        <TextInput
          style={styles.input}
          placeholder="Skriv fritt, ingen bedömer..."
          placeholderTextColor={colors.textMuted}
          multiline
          value={text}
          onChangeText={setText}
          maxLength={500}
        />
        <Text style={styles.charCount}>{text.length} / 500</Text>
      </Card>

      <View style={styles.actions}>
        <Button title="SPARA REFLEKTION" onPress={handleSave} size="lg" disabled={!mood} />
        <Button title="BARA KÄNSLAN" onPress={handleSave} variant="secondary" size="lg" disabled={!mood} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: spacing.lg },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.xl },
  date: { color: colors.textMuted, fontSize: fontSize.xs, letterSpacing: 1 },
  title: { color: colors.textPrimary, fontSize: fontSize['3xl'], fontWeight: '700', marginBottom: spacing.xl },
  moodCard: { marginBottom: spacing.lg },
  textCard: { marginBottom: spacing['2xl'], gap: spacing.sm },
  textLabel: { color: colors.textPrimary, fontSize: fontSize.lg, fontWeight: '500' },
  input: { color: colors.textPrimary, fontSize: fontSize.md, minHeight: 120, textAlignVertical: 'top', lineHeight: 22 },
  charCount: { color: colors.textMuted, fontSize: fontSize.sm, textAlign: 'right' },
  actions: { gap: spacing.md },
});
