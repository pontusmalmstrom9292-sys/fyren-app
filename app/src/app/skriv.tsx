import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { colors, fontSize, spacing, radius } from '../theme';
import { Button } from '../components/Button';
import { MoodPicker } from '../components/MoodPicker';
import { Mood } from '../store/useAppStore';

const PROMPTS = [
  'Vad är du tacksam för idag?',
  'Vad gav dig energi?',
  'Vad vill du släppa?',
  'Beskriv ditt bästa ögonblick idag.',
];

export default function SkrivScreen() {
  const router = useRouter();
  const [mood, setMood] = useState<Mood | undefined>();
  const [text, setText] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');

  const addTag = () => {
    if (tagInput.trim() && tags.length < 5) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag));
  };

  const handleSave = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>DAGBOK</Text>
        <TouchableOpacity onPress={handleSave}>
          <Text style={styles.saveBtn}>Spara</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <MoodPicker selected={mood} onSelect={setMood} />

        {/* Prompts */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.promptScroll}>
          {PROMPTS.map((prompt, i) => (
            <TouchableOpacity
              key={i}
              style={styles.promptChip}
              onPress={() => setText(text + (text ? '\n\n' : '') + prompt + '\n')}
            >
              <Text style={styles.promptText}>{prompt}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Text Input */}
        <TextInput
          style={styles.input}
          placeholder="Skriv fritt..."
          placeholderTextColor={colors.textMuted}
          multiline
          value={text}
          onChangeText={setText}
          autoFocus
        />

        {/* Tags */}
        <View style={styles.tagSection}>
          <View style={styles.tagRow}>
            {tags.map(tag => (
              <TouchableOpacity key={tag} style={styles.tag} onPress={() => removeTag(tag)}>
                <Text style={styles.tagText}>{tag} ×</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.tagInputRow}>
            <TextInput
              style={styles.tagInput}
              placeholder="Lägg till tagg..."
              placeholderTextColor={colors.textMuted}
              value={tagInput}
              onChangeText={setTagInput}
              onSubmitEditing={addTag}
              returnKeyType="done"
            />
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button title="SPARA REFLEKTION" onPress={handleSave} size="lg" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: spacing.lg },
  headerTitle: { color: colors.textPrimary, fontSize: fontSize.md, fontWeight: '600', letterSpacing: 3 },
  saveBtn: { color: colors.gold, fontSize: fontSize.md, fontWeight: '600' },
  content: { padding: spacing.lg, gap: spacing.xl },
  promptScroll: { marginVertical: spacing.sm },
  promptChip: { backgroundColor: colors.surface, borderRadius: radius.full, paddingHorizontal: spacing.lg, paddingVertical: spacing.sm, marginRight: spacing.sm },
  promptText: { color: colors.textSecondary, fontSize: fontSize.sm },
  input: { color: colors.textPrimary, fontSize: fontSize.lg, minHeight: 200, textAlignVertical: 'top', lineHeight: 28 },
  tagSection: { gap: spacing.sm },
  tagRow: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  tag: { backgroundColor: colors.gold, borderRadius: radius.full, paddingHorizontal: spacing.md, paddingVertical: spacing.xs },
  tagText: { color: colors.black, fontSize: fontSize.sm, fontWeight: '600' },
  tagInputRow: { flexDirection: 'row', gap: spacing.sm },
  tagInput: { flex: 1, color: colors.textPrimary, fontSize: fontSize.md, borderBottomWidth: 1, borderBottomColor: colors.border, paddingVertical: spacing.sm },
  footer: { padding: spacing.lg, paddingBottom: spacing['3xl'] },
});
