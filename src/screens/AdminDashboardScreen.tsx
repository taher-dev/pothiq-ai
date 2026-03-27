// ============================================
// Pothiq AI — Admin Dashboard Screen
// ============================================

import React, { useEffect } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Card, Divider } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useThemeColors } from '../components';
import { useAdminStore, useAppStore } from '../store';
import { useDashboard } from '../hooks';
import { COLORS, ENGLISH_LABELS, BENGALI_LABELS } from '../constants';
import type { SettingsStackParamList } from '../types';

type Nav = NativeStackNavigationProp<SettingsStackParamList>;

export default function AdminDashboardScreen() {
  const navigation = useNavigation<Nav>();
  const colors = useThemeColors();
  const lang = useAppStore(s => s.language);
  const { logout, checkAutoLock, refreshActivity } = useAdminStore();
  const { counts, loading, reload } = useDashboard();
  const labels = lang === 'bn' ? BENGALI_LABELS : ENGLISH_LABELS;

  useEffect(() => {
    checkAutoLock();
    const interval = setInterval(checkAutoLock, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const unsub = navigation.addListener('focus', () => {
      refreshActivity();
      reload();
    });
    return unsub;
  }, [navigation]);

  const handleLogout = () => {
    logout();
    navigation.goBack();
  };

  const menuItems = [
    { icon: '🛣️', label: labels.manageRoutes, screen: 'ManageRoutes' as const },
    { icon: '🚌', label: labels.manageBuses, screen: 'ManageBuses' as const },
    { icon: '📍', label: labels.manageStops, screen: 'ManageStops' as const },
    { icon: '📤', label: labels.bulkImport, screen: 'BulkImport' as const },
    { icon: '💾', label: labels.backupRestore, screen: 'BackupRestore' as const },
    { icon: '🔑', label: labels.changePin, screen: 'ChangePin' as const },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.bg }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: COLORS.primary }]}>
        <Text style={styles.headerEmoji}>📊</Text>
        <View style={{ flex: 1 }}>
          <Text style={styles.headerTitle}>{labels.dashboard}</Text>
          <Text style={styles.headerSubtitle}>
            {lang === 'bn' ? 'অ্যাডমিন প্যানেল' : 'Admin Panel'}
          </Text>
        </View>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutBtn}>
          <Text style={styles.logoutText}>🚪 {labels.logout}</Text>
        </TouchableOpacity>
      </View>

      {/* Stats */}
      <View style={styles.statsRow}>
        <Card style={[styles.statCard, { backgroundColor: '#E8F5E9' }]} mode="elevated">
          <Card.Content style={styles.statContent}>
            <Text style={styles.statEmoji}>🛣️</Text>
            <Text style={[styles.statNumber, { color: COLORS.primary }]}>{counts.routes}</Text>
            <Text style={styles.statLabel}>{labels.totalRoutes}</Text>
          </Card.Content>
        </Card>
        <Card style={[styles.statCard, { backgroundColor: '#FFF3E0' }]} mode="elevated">
          <Card.Content style={styles.statContent}>
            <Text style={styles.statEmoji}>🚌</Text>
            <Text style={[styles.statNumber, { color: COLORS.accent }]}>{counts.buses}</Text>
            <Text style={styles.statLabel}>{labels.totalBuses}</Text>
          </Card.Content>
        </Card>
        <Card style={[styles.statCard, { backgroundColor: '#E3F2FD' }]} mode="elevated">
          <Card.Content style={styles.statContent}>
            <Text style={styles.statEmoji}>📍</Text>
            <Text style={[styles.statNumber, { color: '#1565C0' }]}>{counts.stops}</Text>
            <Text style={styles.statLabel}>{labels.totalStops}</Text>
          </Card.Content>
        </Card>
      </View>

      {/* Menu */}
      <Card style={[styles.menuCard, { backgroundColor: colors.card }]} mode="elevated">
        <Card.Content>
          {menuItems.map((item, idx) => (
            <React.Fragment key={item.screen}>
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => {
                  refreshActivity();
                  navigation.navigate(item.screen as any);
                }}
              >
                <Text style={styles.menuIcon}>{item.icon}</Text>
                <Text style={[styles.menuLabel, { color: colors.text }]}>{item.label}</Text>
                <Text style={{ color: colors.textSecondary, fontSize: 18 }}>→</Text>
              </TouchableOpacity>
              {idx < menuItems.length - 1 && (
                <Divider style={{ backgroundColor: colors.divider }} />
              )}
            </React.Fragment>
          ))}
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
  headerSubtitle: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.85)',
    marginTop: 2,
  },
  logoutBtn: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  logoutText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
  statsRow: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingTop: 16,
    gap: 8,
  },
  statCard: {
    flex: 1,
    borderRadius: 16,
  },
  statContent: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  statEmoji: {
    fontSize: 28,
    marginBottom: 6,
  },
  statNumber: {
    fontSize: 28,
    fontWeight: '900',
  },
  statLabel: {
    fontSize: 11,
    color: '#666',
    marginTop: 2,
    textAlign: 'center',
  },
  menuCard: {
    margin: 16,
    borderRadius: 16,
    marginBottom: 30,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    gap: 12,
  },
  menuIcon: {
    fontSize: 22,
  },
  menuLabel: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
  },
});
