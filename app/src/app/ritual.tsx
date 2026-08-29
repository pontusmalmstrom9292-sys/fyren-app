import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState, useEffect, useRef } from 'react';
import { colors, fontSize, spacing, radius } from '../theme';
import { Button } from '../components/Button';

export default function RitualScreen() {
  const router = useRouter();
  const [seconds, setSeconds] = useState(300); // 5 min
  const [isRunning, setIsRunning] = useState(false);
  const [totalSeconds] = useState(300);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (isRunning && seconds > 0) {
      intervalRef.current = setInterval(() => {
        setSeconds(s => s - 1);
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [isRunning, seconds]);

  const progress = 1 - seconds / totalSeconds;
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;

  const reset = () => { setIsRunning(false); setSeconds(totalSeconds); };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="close" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>RITUAL</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.center}>
        <Text style={styles.ritualName}>Andas lugnt</Text>
        <Text style={styles.ritualSub}>5 minuters andningsövning</Text>

        {/* Timer circle */}
        <View style={styles.timerOuter}>
          <View style={styles.timerInner}>
            <Text style={styles.timerText}>
              {minutes}:{secs.toString().padStart(2, '0')}
            </Text>
            <Text style={styles.timerLabel}>{isRunning ? 'Pågår...' : seconds === totalSeconds ? 'Redo' : 'Pausad'}</Text>
          </View>
        </View>

        {/* Progress bar */}
        <View style={styles.progressBg}>
          <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
        </View>

        {/* Controls */}
        <View style={styles.controls}>
          <TouchableOpacity style={styles.controlBtn} onPress={reset}>
            <Ionicons name="refresh" size={28} color={colors.textMuted} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.playBtn, isRunning && styles.pauseBtn]}
            onPress={() => setIsRunning(!isRunning)}
          >
            <Ionicons name={isRunning ? 'pause' : 'play'} size={36} color={isRunning ? colors.gold : colors.black} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.controlBtn} onPress={() => router.back()}>
            <Ionicons name="stop" size={28} color={colors.textMuted} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.tipLabel}>TIPS</Text>
        <Text style={styles.tipText}>Andas in i 4 sekunder, håll i 4, andas ut i 6. Upprepa.</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: spacing.lg },
  headerTitle: { color: colors.textPrimary, fontSize: fontSize.md, fontWeight: '600', letterSpacing: 3 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: spacing.xl, padding: spacing.lg },
  ritualName: { color: colors.textPrimary, fontSize: fontSize['3xl'], fontWeight: '700' },
  ritualSub: { color: colors.textMuted, fontSize: fontSize.md },
  timerOuter: { width: 200, height: 200, borderRadius: 100, borderWidth: 4, borderColor: colors.gold, alignItems: 'center', justifyContent: 'center' },
  timerInner: { alignItems: 'center' },
  timerText: { color: colors.textPrimary, fontSize: fontSize['5xl'], fontWeight: '200', fontVariant: ['tabular-nums'] },
  timerLabel: { color: colors.textMuted, fontSize: fontSize.sm, marginTop: spacing.xs },
  progressBg: { width: '80%', height: 4, backgroundColor: colors.card, borderRadius: 2 },
  progressFill: { height: 4, backgroundColor: colors.gold, borderRadius: 2 },
  controls: { flexDirection: 'row', alignItems: 'center', gap: spacing['3xl'] },
  controlBtn: { width: 56, height: 56, borderRadius: 28, backgroundColor: colors.surface, alignItems: 'center', justifyContent: 'center' },
  playBtn: { width: 72, height: 72, borderRadius: 36, backgroundColor: colors.gold, alignItems: 'center', justifyContent: 'center' },
  pauseBtn: { backgroundColor: colors.surface, borderWidth: 2, borderColor: colors.gold },
  footer: { padding: spacing.xl, paddingBottom: spacing['3xl'], alignItems: 'center', gap: spacing.sm },
  tipLabel: { color: colors.textMuted, fontSize: fontSize.xs, letterSpacing: 2 },
  tipText: { color: colors.textSecondary, fontSize: fontSize.sm, textAlign: 'center', lineHeight: 20 },
});
