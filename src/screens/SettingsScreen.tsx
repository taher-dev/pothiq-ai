// ============================================
// Pothiq AI — Settings Screen
// ============================================

import React from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Card, Switch, Divider } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useThemeColors } from '../components';
import { useAppStore, useAdminStore } from '../store';
import { COLORS, ENGLISH_LABELS, BENGALI_LABELS, APP_VERSION } from '../constants';
import type { SettingsStackParamList } from '../types';

type Nav = NativeStackNavigationProp<SettingsStackParamList>;

export default function SettingsScreen() {
  const navigation = useNavigation<Nav>();
  const colors = useThemeColors();
  const lang = useAppStore(s => s.language);
  const themeMode = useAppStore(s => s.themeMode);
  const setLanguage = useAppStore(s => s.setLanguage);
  const setThemeMode = useAppStore(s => s.setThemeMode);
  const isAdmin = useAdminStore(s => s.isAuthenticated);
  const labels = lang === 'bn' ? BENGALI_LABELS : ENGLISH_LABELS;

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.bg }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: COLORS.primary }]}>
        <Text style={styles.headerEmoji}>⚙️</Text>
        <Text style={styles.headerTitle}>{labels.settings}</Text>
      </View>

      {/* Language */}
      <Card style={[styles.card, { backgroundColor: colors.card }]} mode="elevated">
        <Card.Content>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>🌐 {labels.language}</Text>
          <Divider style={{ marginVertical: 8, backgroundColor: colors.divider }} />
          <View style={styles.settingRow}>
            <Text style={[styles.settingLabel, { color: colors.text }]}>
              {lang === 'en' ? 'English' : 'ইংরেজি'}
            </Text>
            <Switch
              value={lang === 'bn'}
              onValueChange={(val) => setLanguage(val ? 'bn' : 'en')}
              color={COLORS.primary}
            />
            <Text style={[styles.settingLabel, { color: colors.text }]}>
              {lang === 'en' ? 'Bengali' : 'বাংলা'}
            </Text>
          </View>
        </Card.Content>
      </Card>

      {/* Theme */}
      <Card style={[styles.card, { backgroundColor: colors.card }]} mode="elevated">
        <Card.Content>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>🎨 {labels.theme}</Text>
          <Divider style={{ marginVertical: 8, backgroundColor: colors.divider }} />
          <View style={styles.settingRow}>
            <Text style={[styles.settingLabel, { color: colors.text }]}>☀️ {labels.lightMode}</Text>
            <Switch
              value={themeMode === 'dark'}
              onValueChange={(val) => setThemeMode(val ? 'dark' : 'light')}
              color={COLORS.primary}
            />
            <Text style={[styles.settingLabel, { color: colors.text }]}>🌙 {labels.darkMode}</Text>
          </View>
        </Card.Content>
      </Card>

      {/* About */}
      <Card style={[styles.card, { backgroundColor: colors.card }]} mode="elevated">
        <Card.Content>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>ℹ️ {labels.about}</Text>
          <Divider style={{ marginVertical: 8, backgroundColor: colors.divider }} />
          <View style={styles.aboutRow}>
            <Text style={{ color: colors.textSecondary }}>
              {lang === 'bn' ? 'পথিক এআই - স্মার্ট ঢাকা ট্রানজিট' : 'Pothiq AI - Smart Dhaka Transit'}
            </Text>
          </View>
          <View style={styles.aboutRow}>
            <Text style={{ color: colors.textSecondary }}>{labels.version}: {APP_VERSION}</Text>
          </View>
          <View style={styles.aboutRow}>
            <Text style={{ color: colors.textSecondary }}>
              {lang === 'bn' ? 'ঢাকার বাস রুট খুঁজুন সহজেই' : 'Find Dhaka bus routes easily'}
            </Text>
          </View>
        </Card.Content>
      </Card>

      {/* Admin */}
      <Card style={[styles.card, { backgroundColor: colors.card, marginBottom: 30 }]} mode="elevated">
        <Card.Content>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>🔐 {labels.adminLogin}</Text>
          <Divider style={{ marginVertical: 8, backgroundColor: colors.divider }} />

          {isAdmin ? (
            <View>
              <TouchableOpacity
                style={[styles.adminBtn, { backgroundColor: COLORS.primary }]}
                onPress={() => navigation.navigate('AdminDashboard')}
              >
                <Text style={styles.adminBtnText}>📊 {labels.dashboard}</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              style={[styles.adminBtn, { backgroundColor: COLORS.accent }]}
              onPress={() => navigation.navigate('AdminLogin')}
            >
              <Text style={styles.adminBtnText}>🔑 {labels.adminLogin}</Text>
            </TouchableOpacity>
          )}
        </Card.Content>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    gap: 12,
  },
  headerEmoji: { fontSize: 30 },
  headerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#fff',
  },
  card: {
    marginHorizontal: 16,
    marginTop: 12,
    borderRadius: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    paddingVertical: 8,
  },
  settingLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  aboutRow: {
    paddingVertical: 4,
  },
  adminBtn: {
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  adminBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});
