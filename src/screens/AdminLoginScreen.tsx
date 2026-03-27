// ============================================
// Pothiq AI — Admin Login Screen
// ============================================

import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput, StyleSheet, Animated } from 'react-native';
import { Text, Card } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Toast from 'react-native-toast-message';
import { useThemeColors } from '../components';
import { useAdminStore, useAppStore } from '../store';
import { COLORS, ENGLISH_LABELS, BENGALI_LABELS, MAX_FAILED_ATTEMPTS } from '../constants';
import type { SettingsStackParamList } from '../types';

type Nav = NativeStackNavigationProp<SettingsStackParamList>;

export default function AdminLoginScreen() {
  const navigation = useNavigation<Nav>();
  const colors = useThemeColors();
  const lang = useAppStore(s => s.language);
  const { login, failedAttempts, lockUntil, initPin } = useAdminStore();
  const labels = lang === 'bn' ? BENGALI_LABELS : ENGLISH_LABELS;

  const [pin, setPin] = useState('');
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const shakeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    initPin();
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (lockUntil && lockUntil > Date.now()) {
      const updateCountdown = () => {
        const remaining = Math.max(0, Math.ceil((lockUntil - Date.now()) / 1000));
        setCountdown(remaining);
        if (remaining <= 0) {
          clearInterval(timer);
        }
      };
      updateCountdown();
      timer = setInterval(updateCountdown, 1000);
    }
    return () => clearInterval(timer);
  }, [lockUntil]);

  const shake = () => {
    Animated.sequence([
      Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 0, duration: 50, useNativeDriver: true }),
    ]).start();
  };

  const handlePinChange = async (text: string) => {
    const cleaned = text.replace(/[^0-9]/g, '').slice(0, 6);
    setPin(cleaned);

    if (cleaned.length === 6) {
      setLoading(true);
      const success = await login(cleaned);
      setLoading(false);

      if (success) {
        Toast.show({ type: 'success', text1: '✅', text2: lang === 'bn' ? 'সফলভাবে লগইন হয়েছে' : 'Login successful' });
        navigation.replace('AdminDashboard');
      } else {
        shake();
        setPin('');
        const remaining = MAX_FAILED_ATTEMPTS - (failedAttempts + 1);
        if (remaining > 0) {
          Toast.show({
            type: 'error',
            text1: labels.error,
            text2: lang === 'bn' ? `ভুল পিন। ${remaining} বার চেষ্টা বাকি` : `Wrong PIN. ${remaining} attempts left`,
          });
        }
      }
    }
  };

  const isLocked = lockUntil !== null && lockUntil > Date.now();

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      <Card style={[styles.card, { backgroundColor: colors.card }]} mode="elevated">
        <Card.Content style={styles.content}>
          <Text style={styles.lockIcon}>{isLocked ? '🔒' : '🔐'}</Text>
          <Text style={[styles.title, { color: colors.text }]}>{labels.adminLogin}</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            {lang === 'bn' ? '৬ সংখ্যার পিন দিন' : 'Enter 6-digit PIN'}
          </Text>

          {isLocked ? (
            <View style={styles.lockedContainer}>
              <Text style={[styles.lockedText, { color: COLORS.error }]}>
                {labels.locked}
              </Text>
              <Text style={[styles.countdownText, { color: colors.textSecondary }]}>
                {labels.tryAgainIn} {countdown} {labels.seconds}
              </Text>
            </View>
          ) : (
            <Animated.View style={{ transform: [{ translateX: shakeAnim }] }}>
              {/* PIN dots */}
              <View style={styles.dotsRow}>
                {[0, 1, 2, 3, 4, 5].map(i => (
                  <View
                    key={i}
                    style={[
                      styles.dot,
                      {
                        backgroundColor: i < pin.length ? COLORS.primary : colors.input,
                        borderColor: i < pin.length ? COLORS.primary : colors.divider,
                      },
                    ]}
                  />
                ))}
              </View>

              <TextInput
                style={[styles.hiddenInput, { color: 'transparent' }]}
                value={pin}
                onChangeText={handlePinChange}
                keyboardType="number-pad"
                maxLength={6}
                autoFocus
                secureTextEntry
              />
            </Animated.View>
          )}

          {failedAttempts > 0 && !isLocked && (
            <Text style={[styles.attemptsText, { color: COLORS.warning }]}>
              {lang === 'bn'
                ? `${MAX_FAILED_ATTEMPTS - failedAttempts} বার চেষ্টা বাকি`
                : `${MAX_FAILED_ATTEMPTS - failedAttempts} attempts remaining`}
            </Text>
          )}
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    borderRadius: 20,
  },
  content: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  lockIcon: {
    fontSize: 50,
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 24,
  },
  dotsRow: {
    flexDirection: 'row',
    gap: 14,
    marginBottom: 20,
  },
  dot: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
  },
  hiddenInput: {
    position: 'absolute',
    width: '100%',
    height: 60,
    top: -10,
    opacity: 0,
  },
  lockedContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  lockedText: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
  },
  countdownText: {
    fontSize: 16,
  },
  attemptsText: {
    fontSize: 13,
    marginTop: 12,
  },
});
