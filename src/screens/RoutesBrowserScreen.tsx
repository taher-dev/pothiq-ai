// ============================================
// Pothiq AI — Routes Browser Screen (3 sub-tabs)
// ============================================

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import {
  View,
  FlatList,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { Text, Card, Chip, Divider } from 'react-native-paper';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useThemeColors } from '../components';
import { EmptyState } from '../components';
import { useStops, useBuses, useRoutes } from '../hooks';
import { useAppStore } from '../store';
import { COLORS, ENGLISH_LABELS, BENGALI_LABELS, PAGE_SIZE } from '../constants';
import { getStopName, formatFare, parseStopsOrder } from '../utils';
import * as db from '../db/database';
import type { Route, Bus, Stop, RoutesStackParamList } from '../types';

type Nav = NativeStackNavigationProp<RoutesStackParamList>;

export default function RoutesBrowserScreen() {
  const [activeTab, setActiveTab] = useState<'routes' | 'buses' | 'stops'>('routes');
  const colors = useThemeColors();
  const lang = useAppStore(s => s.language);
  const labels = lang === 'bn' ? BENGALI_LABELS : ENGLISH_LABELS;

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      {/* Tab bar */}
      <View style={[styles.tabBar, { backgroundColor: colors.surface }]}>
        {(['routes', 'buses', 'stops'] as const).map(tab => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tab,
              activeTab === tab && styles.activeTab,
              activeTab === tab && { borderBottomColor: COLORS.primary },
            ]}
            onPress={() => setActiveTab(tab)}
          >
            <Text
              style={[
                styles.tabText,
                { color: activeTab === tab ? COLORS.primary : colors.textSecondary },
              ]}
            >
              {tab === 'routes' ? labels.allRoutes : tab === 'buses' ? labels.buses : labels.stops}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {activeTab === 'routes' && <AllRoutesTab />}
      {activeTab === 'buses' && <BusesTab />}
      {activeTab === 'stops' && <StopsTab />}
    </View>
  );
}

// ==================== ALL ROUTES TAB ====================

function AllRoutesTab() {
  const navigation = useNavigation<Nav>();
  const colors = useThemeColors();
  const lang = useAppStore(s => s.language);
  const { routes, loading } = useRoutes();
  const [searchQuery, setSearchQuery] = useState('');
  const [stopMap, setStopMap] = useState<Record<number, Stop>>({});
  const [busMap, setBusMap] = useState<Record<number, Bus>>({});
  const [page, setPage] = useState(1);

  useEffect(() => {
    loadMaps();
  }, []);

  const loadMaps = async () => {
    const stops = await db.getAllStops();
    const buses = await db.getAllBuses();
    const sm: Record<number, Stop> = {};
    const bm: Record<number, Bus> = {};
    stops.forEach(s => sm[s.id] = s);
    buses.forEach(b => bm[b.id] = b);
    setStopMap(sm);
    setBusMap(bm);
  };

  const filteredRoutes = useMemo(() => {
    if (!searchQuery.trim()) return routes;
    const q = searchQuery.toLowerCase();
    return routes.filter(r => {
      const bus = busMap[r.bus_id];
      const start = stopMap[r.start_stop_id];
      const end = stopMap[r.end_stop_id];
      return (
        (bus?.name?.toLowerCase().includes(q)) ||
        (start?.name_en?.toLowerCase().includes(q)) ||
        (start?.name_bn?.includes(q)) ||
        (end?.name_en?.toLowerCase().includes(q)) ||
        (end?.name_bn?.includes(q))
      );
    });
  }, [routes, searchQuery, busMap, stopMap]);

  const pagedRoutes = filteredRoutes.slice(0, page * PAGE_SIZE);

  const renderRoute = ({ item }: { item: Route }) => {
    const bus = busMap[item.bus_id];
    const start = stopMap[item.start_stop_id];
    const end = stopMap[item.end_stop_id];
    if (!bus || !start || !end) return null;

    return (
      <TouchableOpacity onPress={() => navigation.navigate('RouteDetail', { routeId: item.id })}>
        <Card style={[styles.listCard, { backgroundColor: colors.card }]} mode="elevated">
          <Card.Content style={styles.routeRow}>
            <View style={{ flex: 1 }}>
              <Text style={[styles.routeBusName, { color: colors.text }]}>🚌 {bus.name}</Text>
              <Text style={[styles.routeStops, { color: colors.textSecondary }]}>
                {getStopName(start, lang)} → {getStopName(end, lang)}
              </Text>
            </View>
            <View style={styles.routeFare}>
              <Text style={[styles.fareText, { color: COLORS.primary }]}>{formatFare(item.fixed_fare)}</Text>
              <Chip style={{ backgroundColor: bus.type === 'AC' ? '#E3F2FD' : '#FFF3E0', height: 24 }}
                textStyle={{ fontSize: 10, color: bus.type === 'AC' ? '#1565C0' : '#E65100' }}>
                {bus.type}
              </Chip>
            </View>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <SearchBar value={searchQuery} onChangeText={setSearchQuery} placeholder={lang === 'bn' ? 'রুট খুঁজুন...' : 'Search routes...'} />
      {loading ? (
        <ActivityIndicator style={{ marginTop: 40 }} color={COLORS.primary} size="large" />
      ) : (
        <FlatList
          data={pagedRoutes}
          renderItem={renderRoute}
          keyExtractor={item => item.id.toString()}
          onEndReached={() => setPage(p => p + 1)}
          onEndReachedThreshold={0.3}
          contentContainerStyle={{ paddingBottom: 20, paddingTop: 8 }}
          ListEmptyComponent={<EmptyState emoji="📭" title={lang === 'bn' ? 'কোনো রুট নেই' : 'No routes'} />}
        />
      )}
    </View>
  );
}

// ==================== BUSES TAB ====================

function BusesTab() {
  const navigation = useNavigation<Nav>();
  const colors = useThemeColors();
  const lang = useAppStore(s => s.language);
  const { buses, loading } = useBuses();
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);

  const filteredBuses = useMemo(() => {
    if (!searchQuery.trim()) return buses;
    const q = searchQuery.toLowerCase();
    return buses.filter(b =>
      b.name.toLowerCase().includes(q) ||
      b.operator.toLowerCase().includes(q) ||
      b.type.toLowerCase().includes(q)
    );
  }, [buses, searchQuery]);

  const pagedBuses = filteredBuses.slice(0, page * PAGE_SIZE);

  const renderBus = ({ item }: { item: Bus }) => (
    <TouchableOpacity onPress={() => navigation.navigate('BusRoutes', { busId: item.id })}>
      <Card style={[styles.listCard, { backgroundColor: colors.card }]} mode="elevated">
        <Card.Content style={styles.routeRow}>
          <View style={{ flex: 1 }}>
            <Text style={[styles.routeBusName, { color: colors.text }]}>🚌 {item.name}</Text>
            <Text style={[styles.routeStops, { color: colors.textSecondary }]}>
              {item.operator} • {item.type}
            </Text>
          </View>
          <Text style={{ fontSize: 20 }}>→</Text>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1 }}>
      <SearchBar value={searchQuery} onChangeText={setSearchQuery} placeholder={lang === 'bn' ? 'বাস খুঁজুন...' : 'Search buses...'} />
      {loading ? (
        <ActivityIndicator style={{ marginTop: 40 }} color={COLORS.primary} size="large" />
      ) : (
        <FlatList
          data={pagedBuses}
          renderItem={renderBus}
          keyExtractor={item => item.id.toString()}
          onEndReached={() => setPage(p => p + 1)}
          onEndReachedThreshold={0.3}
          contentContainerStyle={{ paddingBottom: 20, paddingTop: 8 }}
          ListEmptyComponent={<EmptyState emoji="🚌" title={lang === 'bn' ? 'কোনো বাস নেই' : 'No buses'} />}
        />
      )}
    </View>
  );
}

// ==================== STOPS TAB ====================

function StopsTab() {
  const navigation = useNavigation<Nav>();
  const colors = useThemeColors();
  const lang = useAppStore(s => s.language);
  const { stops, loading } = useStops();
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);

  const filteredStops = useMemo(() => {
    if (!searchQuery.trim()) return stops;
    const q = searchQuery.toLowerCase();
    return stops.filter(s =>
      s.name_en.toLowerCase().includes(q) ||
      s.name_bn.includes(q) ||
      s.area.toLowerCase().includes(q)
    );
  }, [stops, searchQuery]);

  const pagedStops = filteredStops.slice(0, page * PAGE_SIZE);

  const renderStop = ({ item }: { item: Stop }) => (
    <TouchableOpacity onPress={() => navigation.navigate('StopRoutes', { stopId: item.id })}>
      <Card style={[styles.listCard, { backgroundColor: colors.card }]} mode="elevated">
        <Card.Content style={styles.routeRow}>
          <View style={{ flex: 1 }}>
            <Text style={[styles.routeBusName, { color: colors.text }]}>📍 {getStopName(item, lang)}</Text>
            <Text style={[styles.routeStops, { color: colors.textSecondary }]}>{item.area}</Text>
          </View>
          <Text style={{ fontSize: 20 }}>→</Text>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1 }}>
      <SearchBar value={searchQuery} onChangeText={setSearchQuery} placeholder={lang === 'bn' ? 'স্টপ খুঁজুন...' : 'Search stops...'} />
      {loading ? (
        <ActivityIndicator style={{ marginTop: 40 }} color={COLORS.primary} size="large" />
      ) : (
        <FlatList
          data={pagedStops}
          renderItem={renderStop}
          keyExtractor={item => item.id.toString()}
          onEndReached={() => setPage(p => p + 1)}
          onEndReachedThreshold={0.3}
          contentContainerStyle={{ paddingBottom: 20, paddingTop: 8 }}
          ListEmptyComponent={<EmptyState emoji="📍" title={lang === 'bn' ? 'কোনো স্টপ নেই' : 'No stops'} />}
        />
      )}
    </View>
  );
}

// ==================== BUS ROUTES SCREEN ====================

export function BusRoutesScreen() {
  const route = useRoute<RouteProp<RoutesStackParamList, 'BusRoutes'>>();
  const busId = route.params?.busId || 0;
  const navigation = useNavigation<Nav>();
  const colors = useThemeColors();
  const lang = useAppStore(s => s.language);
  const [bus, setBus] = useState<Bus | null>(null);
  const [routes, setRoutes] = useState<Route[]>([]);
  const [stopMap, setStopMap] = useState<Record<number, Stop>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    load();
  }, [busId]);

  const load = async () => {
    setLoading(true);
    const b = await db.getBusById(busId);
    setBus(b);
    const r = await db.getRoutesByBusId(busId);
    setRoutes(r);
    const stops = await db.getAllStops();
    const sm: Record<number, Stop> = {};
    stops.forEach(s => sm[s.id] = s);
    setStopMap(sm);
    setLoading(false);
  };

  if (loading) {
    return <View style={[styles.container, { backgroundColor: colors.bg }]}><ActivityIndicator style={{ marginTop: 40 }} color={COLORS.primary} size="large" /></View>;
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      {bus && (
        <Card style={[styles.headerInfo, { backgroundColor: COLORS.primary }]}>
          <Card.Content>
            <Text style={{ color: '#fff', fontSize: 18, fontWeight: '800' }}>🚌 {bus.name}</Text>
            <Text style={{ color: 'rgba(255,255,255,0.8)', marginTop: 4 }}>{bus.operator} • {bus.type}</Text>
          </Card.Content>
        </Card>
      )}
      <FlatList
        data={routes}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 20 }}
        ListEmptyComponent={<EmptyState emoji="📭" title={lang === 'bn' ? 'কোনো রুট নেই' : 'No routes for this bus'} />}
        renderItem={({ item }) => {
          const start = stopMap[item.start_stop_id];
          const end = stopMap[item.end_stop_id];
          return (
            <TouchableOpacity onPress={() => navigation.navigate('RouteDetail', { routeId: item.id })}>
              <Card style={[styles.listCard, { backgroundColor: colors.card }]} mode="elevated">
                <Card.Content style={styles.routeRow}>
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.routeStops, { color: colors.text, fontWeight: '600' }]}>
                      {start ? getStopName(start, lang) : '?'} → {end ? getStopName(end, lang) : '?'}
                    </Text>
                    <Text style={{ color: colors.textSecondary, fontSize: 12, marginTop: 2 }}>
                      {formatFare(item.fixed_fare)} • {item.distance_km} km
                    </Text>
                  </View>
                  <Text style={{ fontSize: 20 }}>→</Text>
                </Card.Content>
              </Card>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

// ==================== STOP ROUTES SCREEN ====================

export function StopRoutesScreen() {
  const route = useRoute<RouteProp<RoutesStackParamList, 'StopRoutes'>>();
  const stopId = route.params?.stopId || 0;
  const navigation = useNavigation<Nav>();
  const colors = useThemeColors();
  const lang = useAppStore(s => s.language);
  const [stop, setStop] = useState<Stop | null>(null);
  const [routes, setRoutes] = useState<Route[]>([]);
  const [busMap, setBusMap] = useState<Record<number, Bus>>({});
  const [stopMap, setStopMap] = useState<Record<number, Stop>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    load();
  }, [stopId]);

  const load = async () => {
    setLoading(true);
    const s = await db.getStopById(stopId);
    setStop(s);
    const r = await db.getRoutesByStopId(stopId);
    setRoutes(r);
    const buses = await db.getAllBuses();
    const stops = await db.getAllStops();
    const bm: Record<number, Bus> = {};
    const sm: Record<number, Stop> = {};
    buses.forEach(b => bm[b.id] = b);
    stops.forEach(s => sm[s.id] = s);
    setBusMap(bm);
    setStopMap(sm);
    setLoading(false);
  };

  if (loading) {
    return <View style={[styles.container, { backgroundColor: colors.bg }]}><ActivityIndicator style={{ marginTop: 40 }} color={COLORS.primary} size="large" /></View>;
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      {stop && (
        <Card style={[styles.headerInfo, { backgroundColor: COLORS.primary }]}>
          <Card.Content>
            <Text style={{ color: '#fff', fontSize: 18, fontWeight: '800' }}>📍 {getStopName(stop, lang)}</Text>
            <Text style={{ color: 'rgba(255,255,255,0.8)', marginTop: 4 }}>{stop.area}</Text>
          </Card.Content>
        </Card>
      )}
      <FlatList
        data={routes}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 20 }}
        ListEmptyComponent={<EmptyState emoji="📭" title={lang === 'bn' ? 'কোনো রুট নেই' : 'No routes through this stop'} />}
        renderItem={({ item }) => {
          const bus = busMap[item.bus_id];
          const start = stopMap[item.start_stop_id];
          const end = stopMap[item.end_stop_id];
          return (
            <TouchableOpacity onPress={() => navigation.navigate('RouteDetail', { routeId: item.id })}>
              <Card style={[styles.listCard, { backgroundColor: colors.card }]} mode="elevated">
                <Card.Content style={styles.routeRow}>
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.routeBusName, { color: colors.text }]}>🚌 {bus?.name || '?'}</Text>
                    <Text style={[styles.routeStops, { color: colors.textSecondary }]}>
                      {start ? getStopName(start, lang) : '?'} → {end ? getStopName(end, lang) : '?'}
                    </Text>
                  </View>
                  <Text style={[styles.fareText, { color: COLORS.primary }]}>{formatFare(item.fixed_fare)}</Text>
                </Card.Content>
              </Card>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

// ==================== SEARCH BAR COMPONENT ====================

function SearchBar({ value, onChangeText, placeholder }: { value: string; onChangeText: (t: string) => void; placeholder: string }) {
  const colors = useThemeColors();
  return (
    <View style={[styles.searchBarContainer, { backgroundColor: colors.surface }]}>
      <TextInput
        style={[styles.searchBarInput, { backgroundColor: colors.input, color: colors.inputText }]}
        placeholder={placeholder}
        placeholderTextColor={colors.placeholder}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
}

// ==================== STYLES ====================

const styles = StyleSheet.create({
  container: { flex: 1 },
  tabBar: {
    flexDirection: 'row',
    paddingTop: 50,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 14,
    alignItems: 'center',
    borderBottomWidth: 3,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomWidth: 3,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '700',
  },
  searchBarContainer: {
    padding: 12,
  },
  searchBarInput: {
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 14,
  },
  listCard: {
    marginHorizontal: 12,
    marginBottom: 8,
    borderRadius: 12,
  },
  routeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  routeBusName: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 2,
  },
  routeStops: {
    fontSize: 13,
  },
  routeFare: {
    alignItems: 'flex-end',
    gap: 4,
  },
  fareText: {
    fontSize: 18,
    fontWeight: '800',
  },
  headerInfo: {
    margin: 12,
    borderRadius: 16,
  },
});
