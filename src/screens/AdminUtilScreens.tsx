// ============================================
// Pothiq AI — Bulk Import, Backup/Restore, Change PIN
// ============================================

import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { Text, Card, Divider } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import Papa from 'papaparse';
import Toast from 'react-native-toast-message';
import { useThemeColors } from '../components';
import { useAppStore, useAdminStore } from '../store';
import { COLORS, ENGLISH_LABELS, BENGALI_LABELS, APP_VERSION } from '../constants';
import { validateStopCsv, validateBusCsv, validateRouteCsv } from '../utils';
import * as db from '../db/database';
import type { BackupData } from '../types';

// ==================== BULK IMPORT ====================

export function BulkImportScreen() {
  const colors = useThemeColors();
  const lang = useAppStore(s => s.language);
  const { refreshActivity } = useAdminStore();
  const labels = lang === 'bn' ? BENGALI_LABELS : ENGLISH_LABELS;
  const [importing, setImporting] = useState(false);

  const handleImportCsv = async (type: 'stops' | 'buses' | 'routes') => {
    refreshActivity();
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['text/csv', 'text/comma-separated-values', 'application/octet-stream'],
        copyToCacheDirectory: true,
      });

      if (result.canceled || !result.assets?.[0]) return;

      setImporting(true);
      const fileUri = result.assets[0].uri;
      const content = await FileSystem.readAsStringAsync(fileUri);

      const parsed = Papa.parse(content, { header: true, skipEmptyLines: true });

      if (parsed.errors.length > 0) {
        Toast.show({ type: 'error', text1: labels.error, text2: 'CSV parsing errors found' });
        setImporting(false);
        return;
      }

      let count = 0;
      if (type === 'stops') {
        const validation = validateStopCsv(parsed.data);
        if (!validation.valid) {
          Toast.show({ type: 'error', text1: labels.error, text2: validation.errors[0] });
          setImporting(false);
          return;
        }
        count = await db.bulkInsertStops(parsed.data as any[]);
      } else if (type === 'buses') {
        const validation = validateBusCsv(parsed.data);
        if (!validation.valid) {
          Toast.show({ type: 'error', text1: labels.error, text2: validation.errors[0] });
          setImporting(false);
          return;
        }
        count = await db.bulkInsertBuses(parsed.data as any[]);
      } else {
        const validation = validateRouteCsv(parsed.data);
        if (!validation.valid) {
          Toast.show({ type: 'error', text1: labels.error, text2: validation.errors[0] });
          setImporting(false);
          return;
        }
        count = await db.bulkInsertRoutes(parsed.data as any[]);
      }

      Toast.show({
        type: 'success',
        text1: '✅',
        text2: lang === 'bn' ? `${count}টি ${type} ইম্পোর্ট হয়েছে` : `${count} ${type} imported`,
      });
    } catch (e: any) {
      Toast.show({ type: 'error', text1: labels.error, text2: e.message || 'Import failed' });
    }
    setImporting(false);
  };

  const csvFormats = [
    { type: 'stops' as const, label: labels.stops, format: 'name_en, name_bn, area, lat, lng', emoji: '📍' },
    { type: 'buses' as const, label: labels.buses, format: 'name, operator, type, notes', emoji: '🚌' },
    { type: 'routes' as const, label: labels.routes, format: 'bus_id, start_stop_id, end_stop_id, fixed_fare, distance_km, stops_order, direction, is_active', emoji: '🛣️' },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.bg }]}>
      <Card style={[styles.card, { backgroundColor: colors.card }]} mode="elevated">
        <Card.Content>
          <Text style={[styles.title, { color: colors.text }]}>📤 {labels.bulkImport}</Text>
          <Text style={[styles.hint, { color: colors.textSecondary }]}>
            {lang === 'bn' ? 'CSV ফাইল থেকে ডেটা ইম্পোর্ট করুন' : 'Import data from CSV files'}
          </Text>
        </Card.Content>
      </Card>

      {csvFormats.map(item => (
        <Card key={item.type} style={[styles.card, { backgroundColor: colors.card }]} mode="elevated">
          <Card.Content>
            <Text style={[styles.sectionHeader, { color: colors.text }]}>
              {item.emoji} {item.label}
            </Text>
            <Divider style={{ marginVertical: 8, backgroundColor: colors.divider }} />
            <Text style={[styles.formatLabel, { color: colors.textSecondary }]}>
              {lang === 'bn' ? 'CSV ফরম্যাট:' : 'CSV Format:'}
            </Text>
            <View style={[styles.formatBox, { backgroundColor: colors.input }]}>
              <Text style={{ color: colors.text, fontSize: 12, fontFamily: 'monospace' }}>
                {item.format}
              </Text>
            </View>
            <TouchableOpacity
              style={[styles.importBtn, { backgroundColor: COLORS.primary, opacity: importing ? 0.6 : 1 }]}
              onPress={() => handleImportCsv(item.type)}
              disabled={importing}
            >
              <Text style={styles.importBtnText}>
                📂 {lang === 'bn' ? `${item.label} ইম্পোর্ট` : `Import ${item.label}`}
              </Text>
            </TouchableOpacity>
          </Card.Content>
        </Card>
      ))}
    </ScrollView>
  );
}

// ==================== BACKUP & RESTORE ====================

export function BackupRestoreScreen() {
  const colors = useThemeColors();
  const lang = useAppStore(s => s.language);
  const { refreshActivity } = useAdminStore();
  const labels = lang === 'bn' ? BENGALI_LABELS : ENGLISH_LABELS;
  const [working, setWorking] = useState(false);

  const handleExport = async () => {
    refreshActivity();
    setWorking(true);
    try {
      const data = await db.exportAllData();
      const backup: BackupData = {
        version: APP_VERSION,
        exportedAt: new Date().toISOString(),
        ...data,
      };
      const json = JSON.stringify(backup, null, 2);
      const filename = `pothiq_backup_${Date.now()}.json`;
      const fileUri = new FileSystem.File(FileSystem.Paths.cache, filename).uri;
      await FileSystem.writeAsStringAsync(fileUri, json);

      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(fileUri, {
          mimeType: 'application/json',
          dialogTitle: lang === 'bn' ? 'ব্যাকআপ শেয়ার করুন' : 'Share Backup',
        });
      }

      Toast.show({
        type: 'success',
        text1: '✅',
        text2: lang === 'bn' ? 'ব্যাকআপ এক্সপোর্ট সম্পন্ন' : 'Backup exported successfully',
      });
    } catch (e: any) {
      Toast.show({ type: 'error', text1: labels.error, text2: e.message || 'Export failed' });
    }
    setWorking(false);
  };

  const handleImport = async () => {
    refreshActivity();
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['application/json', 'application/octet-stream'],
        copyToCacheDirectory: true,
      });

      if (result.canceled || !result.assets?.[0]) return;

      Alert.alert(
        lang === 'bn' ? 'সতর্কতা' : 'Warning',
        lang === 'bn' ? 'এটি সকল বিদ্যমান ডেটা প্রতিস্থাপন করবে। আপনি কি নিশ্চিত?' : 'This will replace all existing data. Are you sure?',
        [
          { text: labels.cancel, style: 'cancel' },
          {
            text: labels.import,
            style: 'destructive',
            onPress: async () => {
              setWorking(true);
              try {
                const content = await FileSystem.readAsStringAsync(result.assets![0].uri);
                const backup: BackupData = JSON.parse(content);

                if (!backup.stops || !backup.buses || !backup.routes) {
                  throw new Error('Invalid backup format');
                }

                await db.importAllData(backup);

                Toast.show({
                  type: 'success',
                  text1: '✅',
                  text2: lang === 'bn' ? 'ডেটা রিস্টোর সম্পন্ন' : 'Data restored successfully',
                });
              } catch (e: any) {
                Toast.show({ type: 'error', text1: labels.error, text2: e.message || 'Import failed' });
              }
              setWorking(false);
            },
          },
        ]
      );
    } catch (e: any) {
      Toast.show({ type: 'error', text1: labels.error, text2: e.message || 'Import failed' });
    }
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.bg }]}>
      <Card style={[styles.card, { backgroundColor: colors.card }]} mode="elevated">
        <Card.Content>
          <Text style={[styles.title, { color: colors.text }]}>💾 {labels.backupRestore}</Text>
        </Card.Content>
      </Card>

      <Card style={[styles.card, { backgroundColor: colors.card }]} mode="elevated">
        <Card.Content>
          <Text style={[styles.sectionHeader, { color: colors.text }]}>📤 {labels.export}</Text>
          <Text style={[styles.hint, { color: colors.textSecondary }]}>
            {lang === 'bn' ? 'সকল ডেটা JSON ফাইল হিসেবে এক্সপোর্ট করুন' : 'Export all data as a JSON file'}
          </Text>
          <TouchableOpacity
            style={[styles.importBtn, { backgroundColor: COLORS.primary, opacity: working ? 0.6 : 1 }]}
            onPress={handleExport}
            disabled={working}
          >
            <Text style={styles.importBtnText}>📤 {lang === 'bn' ? 'এক্সপোর্ট শুরু করুন' : 'Start Export'}</Text>
          </TouchableOpacity>
        </Card.Content>
      </Card>

      <Card style={[styles.card, { backgroundColor: colors.card }]} mode="elevated">
        <Card.Content>
          <Text style={[styles.sectionHeader, { color: colors.text }]}>📥 {labels.import}</Text>
          <Text style={[styles.hint, { color: colors.textSecondary }]}>
            {lang === 'bn' ? 'JSON ব্যাকআপ থেকে ডেটা রিস্টোর করুন' : 'Restore data from a JSON backup'}
          </Text>
          <TouchableOpacity
            style={[styles.importBtn, { backgroundColor: COLORS.warning, opacity: working ? 0.6 : 1 }]}
            onPress={handleImport}
            disabled={working}
          >
            <Text style={styles.importBtnText}>📥 {lang === 'bn' ? 'রিস্টোর শুরু করুন' : 'Start Restore'}</Text>
          </TouchableOpacity>
        </Card.Content>
      </Card>
    </ScrollView>
  );
}

// ==================== CHANGE PIN ====================

export function ChangePinScreen() {
  const navigation = useNavigation<any>();
  const colors = useThemeColors();
  const lang = useAppStore(s => s.language);
  const { changePin, refreshActivity } = useAdminStore();
  const labels = lang === 'bn' ? BENGALI_LABELS : ENGLISH_LABELS;

  const [currentPin, setCurrentPin] = useState('');
  const [newPin, setNewPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [saving, setSaving] = useState(false);

  const handleChange = async () => {
    refreshActivity();
    if (currentPin.length !== 6 || newPin.length !== 6) {
      Toast.show({ type: 'error', text1: labels.error, text2: lang === 'bn' ? '৬ সংখ্যার পিন দিন' : 'PIN must be 6 digits' });
      return;
    }
    if (newPin !== confirmPin) {
      Toast.show({ type: 'error', text1: labels.error, text2: lang === 'bn' ? 'পিন মিলছে না' : 'PINs do not match' });
      return;
    }
    setSaving(true);
    const success = await changePin(currentPin, newPin);
    setSaving(false);
    if (success) {
      Toast.show({ type: 'success', text1: '✅', text2: lang === 'bn' ? 'পিন পরিবর্তন হয়েছে' : 'PIN changed successfully' });
      navigation.goBack();
    } else {
      Toast.show({ type: 'error', text1: labels.error, text2: lang === 'bn' ? 'বর্তমান পিন ভুল' : 'Current PIN is incorrect' });
    }
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.bg }]} keyboardShouldPersistTaps="handled">
      <Card style={[styles.card, { backgroundColor: colors.card }]} mode="elevated">
        <Card.Content>
          <Text style={[styles.title, { color: colors.text }]}>🔑 {labels.changePin}</Text>

          <Text style={[styles.pinLabel, { color: colors.textSecondary }]}>
            {lang === 'bn' ? 'বর্তমান পিন' : 'Current PIN'}
          </Text>
          <TextInput
            style={[styles.pinInput, { backgroundColor: colors.input, color: colors.inputText }]}
            value={currentPin}
            onChangeText={t => setCurrentPin(t.replace(/[^0-9]/g, '').slice(0, 6))}
            keyboardType="number-pad"
            maxLength={6}
            secureTextEntry
            placeholder="••••••"
            placeholderTextColor={colors.placeholder}
          />

          <Text style={[styles.pinLabel, { color: colors.textSecondary }]}>
            {lang === 'bn' ? 'নতুন পিন' : 'New PIN'}
          </Text>
          <TextInput
            style={[styles.pinInput, { backgroundColor: colors.input, color: colors.inputText }]}
            value={newPin}
            onChangeText={t => setNewPin(t.replace(/[^0-9]/g, '').slice(0, 6))}
            keyboardType="number-pad"
            maxLength={6}
            secureTextEntry
            placeholder="••••••"
            placeholderTextColor={colors.placeholder}
          />

          <Text style={[styles.pinLabel, { color: colors.textSecondary }]}>
            {lang === 'bn' ? 'পিন নিশ্চিত করুন' : 'Confirm PIN'}
          </Text>
          <TextInput
            style={[styles.pinInput, { backgroundColor: colors.input, color: colors.inputText }]}
            value={confirmPin}
            onChangeText={t => setConfirmPin(t.replace(/[^0-9]/g, '').slice(0, 6))}
            keyboardType="number-pad"
            maxLength={6}
            secureTextEntry
            placeholder="••••••"
            placeholderTextColor={colors.placeholder}
          />

          <TouchableOpacity
            style={[styles.importBtn, { backgroundColor: COLORS.primary, opacity: saving ? 0.6 : 1 }]}
            onPress={handleChange}
            disabled={saving}
          >
            <Text style={styles.importBtnText}>💾 {labels.save}</Text>
          </TouchableOpacity>
        </Card.Content>
      </Card>
    </ScrollView>
  );
}

// ==================== STYLES ====================

const styles = StyleSheet.create({
  container: { flex: 1 },
  card: {
    margin: 12,
    marginBottom: 4,
    borderRadius: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
  },
  hint: {
    fontSize: 13,
    marginTop: 4,
    lineHeight: 18,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: '700',
  },
  formatLabel: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 4,
  },
  formatBox: {
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  importBtn: {
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 10,
  },
  importBtnText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
  },
  pinLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 6,
  },
  pinInput: {
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 14,
    fontSize: 18,
    textAlign: 'center',
    letterSpacing: 8,
  },
});
