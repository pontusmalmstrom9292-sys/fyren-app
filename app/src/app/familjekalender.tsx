import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { colors, fontSize, spacing, radius } from '../theme';
import { Card } from '../components/Card';
import { MOCK_FAMILY_EVENTS } from '../store/useAppStore';

const WEEKDAYS = ['M', 'T', 'O', 'T', 'F', 'L', 'S'];

function generateCalendarDays(year: number, month: number) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const offset = firstDay === 0 ? 6 : firstDay - 1;
  const days: (number | null)[] = [];
  for (let i = 0; i < offset; i++) days.push(null);
  for (let i = 1; i <= daysInMonth; i++) days.push(i);
  return days;
}

export default function FamiljekalenderScreen() {
  const router = useRouter();
  const [selectedDay, setSelectedDay] = useState(29);
  const today = 29;
  const year = 2026;
  const month = 7; // August (0-indexed)
  const days = generateCalendarDays(year, month);
  const monthNames = ['Januari', 'Februari', 'Mars', 'April', 'Maj', 'Juni', 'Juli', 'Augusti', 'September', 'Oktober', 'November', 'December'];

  const moodDays: Record<number, string> = { 1: '#D4AF37', 3: '#D4AF37', 5: '#D4AF37', 7: '#2CC6C6', 10: '#D4AF37', 12: '#94A3B8', 15: '#D4AF37', 18: '#D4AF37', 20: '#D4AF37', 22: '#2CC6C6', 25: '#D4AF37', 27: '#D4AF37', 28: '#D4AF37' };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>FAMILJEKALENDER</Text>
        <TouchableOpacity>
          <Ionicons name="add-circle-outline" size={24} color={colors.gold} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Month nav */}
        <View style={styles.monthNav}>
          <TouchableOpacity><Ionicons name="chevron-back" size={20} color={colors.textPrimary} /></TouchableOpacity>
          <Text style={styles.monthTitle}>{monthNames[month].toUpperCase()} {year}</Text>
          <TouchableOpacity><Ionicons name="chevron-forward" size={20} color={colors.textPrimary} /></TouchableOpacity>
        </View>

        {/* Weekday headers */}
        <View style={styles.weekRow}>
          {WEEKDAYS.map((d, i) => (
            <Text key={i} style={styles.weekDay}>{d}</Text>
          ))}
        </View>

        {/* Calendar grid */}
        <View style={styles.calGrid}>
          {days.map((day, i) => (
            <TouchableOpacity
              key={i}
              style={[
                styles.dayCell,
                day === today && styles.dayToday,
                day === selectedDay && styles.daySelected,
              ]}
              onPress={() => day && setSelectedDay(day)}
              disabled={!day}
            >
              {day && (
                <>
                  <Text style={[
                    styles.dayText,
                    day === today && styles.dayTodayText,
                    day === selectedDay && styles.daySelectedText,
                  ]}>{day}</Text>
                  {moodDays[day] && <View style={[styles.moodDot, { backgroundColor: moodDays[day] }]} />}
                </>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Today's events */}
        <View style={styles.eventsHeader}>
          <Text style={styles.eventsTitle}>IDAG · {selectedDay} AUGUSTI</Text>
        </View>

        {MOCK_FAMILY_EVENTS.map(event => (
          <Card key={event.id} style={styles.eventCard}>
            <View style={[styles.eventColor, { backgroundColor: event.color }]} />
            <View style={styles.eventInfo}>
              <Text style={styles.eventTitle}>{event.title} - {event.member}</Text>
              <Text style={styles.eventTime}>{event.time}{event.location ? ` · ${event.location}` : ''}</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
          </Card>
        ))}
      </ScrollView>

      {/* Add event FAB */}
      <TouchableOpacity style={styles.fab}>
        <Ionicons name="add" size={28} color={colors.black} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: spacing.lg },
  headerTitle: { color: colors.textPrimary, fontSize: fontSize.md, fontWeight: '600', letterSpacing: 2 },
  content: { padding: spacing.lg, gap: spacing.md, paddingBottom: 100 },
  monthNav: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  monthTitle: { color: colors.textPrimary, fontSize: fontSize.xl, fontWeight: '600', letterSpacing: 2 },
  weekRow: { flexDirection: 'row', justifyContent: 'space-around' },
  weekDay: { color: colors.textMuted, fontSize: fontSize.sm, fontWeight: '600', width: 44, textAlign: 'center' },
  calGrid: { flexDirection: 'row', flexWrap: 'wrap' },
  dayCell: { width: '14.28%', aspectRatio: 1, alignItems: 'center', justifyContent: 'center' },
  dayText: { color: colors.textSecondary, fontSize: fontSize.md },
  dayToday: { backgroundColor: colors.gold, borderRadius: 20 },
  dayTodayText: { color: colors.black, fontWeight: '700' },
  daySelected: { borderWidth: 1, borderColor: colors.gold, borderRadius: 20 },
  daySelectedText: { color: colors.gold },
  moodDot: { width: 4, height: 4, borderRadius: 2, marginTop: 2 },
  eventsHeader: { borderTopWidth: 1, borderTopColor: colors.surface, paddingTop: spacing.lg },
  eventsTitle: { color: colors.textMuted, fontSize: fontSize.xs, letterSpacing: 2 },
  eventCard: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  eventColor: { width: 4, height: 40, borderRadius: 2 },
  eventInfo: { flex: 1 },
  eventTitle: { color: colors.textPrimary, fontSize: fontSize.md, fontWeight: '500' },
  eventTime: { color: colors.textMuted, fontSize: fontSize.sm, marginTop: 2 },
  fab: { position: 'absolute', bottom: 100, right: 24, width: 56, height: 56, borderRadius: 28, backgroundColor: colors.gold, alignItems: 'center', justifyContent: 'center' },
});
