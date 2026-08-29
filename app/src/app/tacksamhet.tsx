import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { colors, fontSize, spacing, radius } from '../theme';
import { Card } from '../components/Card';
import { Button } from '../components/Button';

export default function TacksamhetScreen() {
  const router = useRouter();
  const [items, setItems] = useState(['', '', '']);

  const updateItem = (index: number, text: string) => {
    const updated = [...items];
    updated[index] = text;
    setItems(updated);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>TACKSAMHET</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Ionicons name="heart" size={48} color={colors.gold} style={{ alignSelf: 'center' }} />
        <Text style={styles.title}>Tre saker du är tacksam för idag</Text>
        <Text style={styles.subtitle}>Att öva tacksamhet styr hjärnan mot det positiva.</Text>

        {items.map((item, i) => (
          <Card key={i} variant="outlined" style={styles.itemCard}>
            <Text style={styles.itemNumber}>{i + 1}</Text>
            <TextInput
              style={styles.itemInput}
              placeholder={['Min hälsa och energi...', 'Samtal med en vän...', 'Solskenet på morgonen...'][i]}
              placeholderTextColor={colors.textMuted}
              value={item}
              onChangeText={(text) => updateItem(i, text)}
              multiline
            />
          </Card>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <Button
          title="SPARA TACKSAMHET"
          onPress={() => router.back()}
          size="lg"
          disabled={items.every(i => !i.trim())}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: spacing.lg },
  headerTitle: { color: colors.textPrimary, fontSize: fontSize.md, fontWeight: '600', letterSpacing: 3 },
  content: { padding: spacing.lg, gap: spacing.lg },
  title: { color: colors.textPrimary, fontSize: fontSize['2xl'], fontWeight: '700', textAlign: 'center' },
  subtitle: { color: colors.textMuted, fontSize: fontSize.md, textAlign: 'center', lineHeight: 22 },
  itemCard: { flexDirection: 'row', alignItems: 'flex-start', gap: spacing.md },
  itemNumber: { color: colors.gold, fontSize: fontSize['2xl'], fontWeight: '700', width: 28 },
  itemInput: { flex: 1, color: colors.textPrimary, fontSize: fontSize.md, minHeight: 60, textAlignVertical: 'top', lineHeight: 22 },
  footer: { padding: spacing.lg, paddingBottom: spacing['3xl'] },
});
