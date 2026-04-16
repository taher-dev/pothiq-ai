// ============================================
// Pothiq AI — Manage Routes, Buses, Stops Screens
// ============================================

import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  ScrollView,
  FlatList,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Switch,
} from 'react-native';
import { Text, Card, Divider, Chip } from 'react-native-paper';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Toast from 'react-native-toast-message';
import { useThemeColors } from '../components';
import { useAppStore, useAdminStore } from '../store';
import { COLORS, ENGLISH_LABELS, BENGALI_LABELS, PAGE_SIZE } from '../constants';
import { getStopName, formatFare } from '../utils';
import * as db from '../db/database';
import type { Route, Bus, Stop, SettingsStackParamList } from '../types';

type Nav = NativeStackNavigationProp<SettingsStackParamList>;

// ==================== MANAGE ROUTES ====================

export function ManageRoutesScreen() {
  const navigation = useNavigation<Nav>();
  const colors = useThemeColors();
  const lang = useAppStore(s => s.language);
  const { refreshActivity } = useAdminStore();
  const labels = lang === 'bn' ? BENGALI_LABELS : ENGLISH_LABELS;

  const [routes, setRoutes] = useState<Route[]>([]);
  const [busMap, setBusMap] = useState<Record<number, Bus>>({});
  const [stopMap, setStopMap] = useState<Record<number, Stop>>({});
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    refreshActivity();
    const r = await db.getAllRoutesIncludingInactive();
    const buses = await db.getAllBuses();
    const stops = await db.getAllStops();
    setRoutes(r);
    const bm: Record<number, Bus> = {};
    const sm: Record<number, Stop> = {};
    buses.forEach(b => bm[b.id] = b);
    stops.forEach(s => sm[s.id] = s);
    setBusMap(bm);
    setStopMap(sm);
    setLoading(false);
  }, []);

  useEffect(() => {
    const unsub = navigation.addListener('focus', load);
    return unsub;
  }, [navigation, load]);

  const handleDelete = (id: number) => {
    Alert.alert(
      labels.delete,
      lang === 'bn' ? 'এই রুটটি মুছে ফেলতে চান?' : 'Delete this route?',
      [
        { text: labels.cancel, style: 'cancel' },
        {
          text: labels.delete,
          style: 'destructive',
          onPress: async () => {
            await db.deleteRoute(id);
            Toast.show({ type: 'success', text1: '✅', text2: lang === 'bn' ? 'রুট মুছে ফেলা হয়েছে' : 'Route deleted' });
            load();
          },
        },
      ]
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      <TouchableOpacity
        style={[styles.addBtn, { backgroundColor: COLORS.primary }]}
        onPress={() => navigation.navigate('RouteForm', {})}
      >
        <Text style={styles.addBtnText}>➕ {labels.add} {labels.route}</Text>
      </TouchableOpacity>

      {loading ? (
        <ActivityIndicator style={{ marginTop: 40 }} color={COLORS.primary} size="large" />
      ) : (
        <FlatList
          data={routes}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={{ paddingBottom: 20 }}
          renderItem={({ item }) => {
            const bus = busMap[item.bus_id];
            const start = stopMap[item.start_stop_id];
            const end = stopMap[item.end_stop_id];
            return (
              <Card style={[styles.listCard, { backgroundColor: colors.card }]} mode="elevated">
                <Card.Content>
                  <View style={styles.cardRow}>
                    <View style={{ flex: 1 }}>
                      <Text style={[styles.cardTitle, { color: colors.text }]}>
                        🚌 {bus?.name || '?'}
                      </Text>
                      <Text style={{ color: colors.textSecondary, fontSize: 13, marginTop: 2 }}>
                        {start ? getStopName(start, lang) : '?'} → {end ? getStopName(end, lang) : '?'}
                      </Text>
                      <View style={styles.chipRow}>
                        <Chip style={{ height: 24, backgroundColor: item.is_active ? '#E8F5E9' : '#FFEBEE' }}
                          textStyle={{ fontSize: 10, color: item.is_active ? COLORS.success : COLORS.error }}>
                          {item.is_active ? labels.active : labels.inactive}
                        </Chip>
                        <Text style={{ color: COLORS.primary, fontWeight: '700' }}>{formatFare(item.fixed_fare)}</Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.actionRow}>
                    <TouchableOpacity
                      style={[styles.actionBtn, { backgroundColor: '#E3F2FD' }]}
                      onPress={() => navigation.navigate('RouteForm', { routeId: item.id })}
                    >
                      <Text style={{ color: '#1565C0', fontWeight: '600' }}>✏️ {labels.edit}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.actionBtn, { backgroundColor: '#FFEBEE' }]}
                      onPress={() => handleDelete(item.id)}
                    >
                      <Text style={{ color: COLORS.error, fontWeight: '600' }}>🗑️ {labels.delete}</Text>
                    </TouchableOpacity>
                  </View>
                </Card.Content>
              </Card>
            );
          }}
        />
      )}
    </View>
  );
}

// ==================== MANAGE BUSES ====================

export function ManageBusesScreen() {
  const navigation = useNavigation<Nav>();
  const colors = useThemeColors();
  const lang = useAppStore(s => s.language);
  const { refreshActivity } = useAdminStore();
  const labels = lang === 'bn' ? BENGALI_LABELS : ENGLISH_LABELS;

  const [buses, setBuses] = useState<Bus[]>([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    refreshActivity();
    const data = await db.getAllBuses();
    setBuses(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    const unsub = navigation.addListener('focus', load);
    return unsub;
  }, [navigation, load]);

  const handleDelete = (id: number) => {
    Alert.alert(
      labels.delete,
      lang === 'bn' ? 'এই বাসটি মুছে ফেলতে চান?' : 'Delete this bus?',
      [
        { text: labels.cancel, style: 'cancel' },
        {
          text: labels.delete,
          style: 'destructive',
          onPress: async () => {
            await db.deleteBus(id);
            Toast.show({ type: 'success', text1: '✅', text2: lang === 'bn' ? 'বাস মুছে ফেলা হয়েছে' : 'Bus deleted' });
            load();
          },
        },
      ]
    );
  };

  const filteredBuses = buses.filter(bus => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return (
      bus.name.toLowerCase().includes(q) ||
      bus.operator.toLowerCase().includes(q) ||
      bus.type.toLowerCase().includes(q)
    );
  });

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      <TouchableOpacity
        style={[styles.addBtn, { backgroundColor: COLORS.primary }]}
        onPress={() => navigation.navigate('BusForm', {})}
      >
        <Text style={styles.addBtnText}>➕ {labels.add} {labels.bus}</Text>
      </TouchableOpacity>
      <View style={styles.searchWrap}>
        <TextInput
          style={[styles.searchInput, { backgroundColor: colors.input, color: colors.inputText }]}
          placeholder={lang === 'bn' ? 'নাম/অপারেটর দিয়ে খুঁজুন' : 'Find by name/operator'}
          placeholderTextColor={colors.placeholder}
          value={query}
          onChangeText={setQuery}
        />
      </View>

      {loading ? (
        <ActivityIndicator style={{ marginTop: 40 }} color={COLORS.primary} size="large" />
      ) : (
        <FlatList
          data={filteredBuses}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={{ paddingBottom: 20 }}
          renderItem={({ item }) => (
            <Card style={[styles.listCard, { backgroundColor: colors.card }]} mode="elevated">
              <Card.Content>
                <Text style={[styles.cardTitle, { color: colors.text }]}>🚌 {item.name}</Text>
                <Text style={{ color: colors.textSecondary, fontSize: 13, marginTop: 2 }}>
                  {item.operator} • {item.type}
                </Text>
                {item.notes ? (
                  <Text style={{ color: colors.textSecondary, fontSize: 12, marginTop: 4, fontStyle: 'italic' }}>
                    {item.notes}
                  </Text>
                ) : null}
                <View style={styles.actionRow}>
                  <TouchableOpacity
                    style={[styles.actionBtn, { backgroundColor: '#E3F2FD' }]}
                    onPress={() => navigation.navigate('BusForm', { busId: item.id })}
                  >
                    <Text style={{ color: '#1565C0', fontWeight: '600' }}>✏️ {labels.edit}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.actionBtn, { backgroundColor: '#FFEBEE' }]}
                    onPress={() => handleDelete(item.id)}
                  >
                    <Text style={{ color: COLORS.error, fontWeight: '600' }}>🗑️ {labels.delete}</Text>
                  </TouchableOpacity>
                </View>
              </Card.Content>
            </Card>
          )}
        />
      )}
    </View>
  );
}

// ==================== MANAGE STOPS ====================

export function ManageStopsScreen() {
  const navigation = useNavigation<Nav>();
  const colors = useThemeColors();
  const lang = useAppStore(s => s.language);
  const { refreshActivity } = useAdminStore();
  const labels = lang === 'bn' ? BENGALI_LABELS : ENGLISH_LABELS;

  const [stops, setStops] = useState<Stop[]>([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    refreshActivity();
    const data = await db.getAllStops();
    setStops(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    const unsub = navigation.addListener('focus', load);
    return unsub;
  }, [navigation, load]);

  const handleDelete = (id: number) => {
    Alert.alert(
      labels.delete,
      lang === 'bn' ? 'এই স্টপটি মুছে ফেলতে চান?' : 'Delete this stop?',
      [
        { text: labels.cancel, style: 'cancel' },
        {
          text: labels.delete,
          style: 'destructive',
          onPress: async () => {
            await db.deleteStop(id);
            Toast.show({ type: 'success', text1: '✅', text2: lang === 'bn' ? 'স্টপ মুছে ফেলা হয়েছে' : 'Stop deleted' });
            load();
          },
        },
      ]
    );
  };

  const filteredStops = stops.filter(stop => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return (
      stop.name_en.toLowerCase().includes(q) ||
      stop.name_bn.toLowerCase().includes(q) ||
      stop.area.toLowerCase().includes(q)
    );
  });

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      <TouchableOpacity
        style={[styles.addBtn, { backgroundColor: COLORS.primary }]}
        onPress={() => navigation.navigate('StopForm', {})}
      >
        <Text style={styles.addBtnText}>➕ {labels.add} {labels.stop}</Text>
      </TouchableOpacity>
      <View style={styles.searchWrap}>
        <TextInput
          style={[styles.searchInput, { backgroundColor: colors.input, color: colors.inputText }]}
          placeholder={lang === 'bn' ? 'বানান/এলাকা দিয়ে খুঁজুন' : 'Find by spelling or area'}
          placeholderTextColor={colors.placeholder}
          value={query}
          onChangeText={setQuery}
        />
      </View>

      {loading ? (
        <ActivityIndicator style={{ marginTop: 40 }} color={COLORS.primary} size="large" />
      ) : (
        <FlatList
          data={filteredStops}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={{ paddingBottom: 20 }}
          renderItem={({ item }) => (
            <Card style={[styles.listCard, { backgroundColor: colors.card }]} mode="elevated">
              <Card.Content>
                <Text style={[styles.cardTitle, { color: colors.text }]}>📍 {getStopName(item, lang)}</Text>
                <Text style={{ color: colors.textSecondary, fontSize: 13, marginTop: 2 }}>
                  {item.area} • {item.name_en} / {item.name_bn}
                </Text>
                <View style={styles.actionRow}>
                  <TouchableOpacity
                    style={[styles.actionBtn, { backgroundColor: '#E3F2FD' }]}
                    onPress={() => navigation.navigate('StopForm', { stopId: item.id })}
                  >
                    <Text style={{ color: '#1565C0', fontWeight: '600' }}>✏️ {labels.edit}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.actionBtn, { backgroundColor: '#FFEBEE' }]}
                    onPress={() => handleDelete(item.id)}
                  >
                    <Text style={{ color: COLORS.error, fontWeight: '600' }}>🗑️ {labels.delete}</Text>
                  </TouchableOpacity>
                </View>
              </Card.Content>
            </Card>
          )}
        />
      )}
    </View>
  );
}

// ==================== STYLES ====================

const styles = StyleSheet.create({
  container: { flex: 1 },
  addBtn: {
    margin: 12,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  addBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  listCard: {
    marginHorizontal: 12,
    marginBottom: 8,
    borderRadius: 12,
  },
  searchWrap: {
    marginHorizontal: 12,
    marginBottom: 8,
  },
  searchInput: {
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '700',
  },
  chipRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 6,
  },
  actionRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 10,
  },
  actionBtn: {
    flex: 1,
    borderRadius: 8,
    paddingVertical: 8,
    alignItems: 'center',
  },
});
