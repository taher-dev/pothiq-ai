// ============================================
// Pothiq AI — Route Detail Screen
// ============================================

import React, { useEffect, useMemo, useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Card, Chip, Divider } from 'react-native-paper';
import { useRoute, RouteProp } from '@react-navigation/native';
import { RouteMap, useThemeColors } from '../components';
import { useAppStore } from '../store';
import { COLORS, ENGLISH_LABELS, BENGALI_LABELS } from '../constants';
import { getStopName, formatFare, calcDistanceFare, formatDistance, parseStopsOrder } from '../utils';
import * as db from '../db/database';
import type { Route, Bus, Stop, HomeStackParamList } from '../types';

export default function RouteDetailScreen() {
  const route = useRoute<RouteProp<HomeStackParamList, 'RouteDetail'>>();
  const routeId = route.params.routeId;
  const colors = useThemeColors();
  const lang = useAppStore(s => s.language);
  const labels = lang === 'bn' ? BENGALI_LABELS : ENGLISH_LABELS;

  const [routeData, setRouteData] = useState<Route | null>(null);
  const [bus, setBus] = useState<Bus | null>(null);
  const [allStops, setAllStops] = useState<Stop[]>([]);
  const [loading, setLoading] = useState(true);

  // New segment-specific state
  const [segmentData, setSegmentData] = useState<{ fare: number; distance: number } | null>(null);

  // Interactive Calculator State
  const [calcFrom, setCalcFrom] = useState<Stop | null>(null);
  const [calcTo, setCalcTo] = useState<Stop | null>(null);
  const [calcResult, setCalcResult] = useState<{ fare: number; distance: number } | null>(null);

  useEffect(() => {
    loadData();
  }, [routeId]);

  useEffect(() => {
    if (allStops.length > 1) {
      setCalcFrom(allStops[0]);
      setCalcTo(allStops[allStops.length - 1]);
    }
  }, [allStops]);

  useEffect(() => {
    updateCalc();
  }, [calcFrom, calcTo]);

  const loadData = async () => {
    setLoading(true);
    const r = await db.getRouteById(routeId);
    if (r) {
      setRouteData(r);
      const b = await db.getBusById(r.bus_id);
      setBus(b);
      const stopsOrder = parseStopsOrder(r.stops_order);
      const stops = await db.getAllStops();
      const sm: Record<number, Stop> = {};
      stops.forEach(s => (sm[s.id] = s));
      const orderedStops = stopsOrder.map(sid => sm[sid]).filter(Boolean);
      setAllStops(orderedStops);

      // Fetch segment data for start-to-end as default
      const database = await db.getDatabase();
      const matrix = await database.getFirstAsync<{ fare: number; distance_km: number }>(
        'SELECT fare, distance_km FROM fare_matrix WHERE bus_id = ? AND from_id = ? AND to_id = ?',
        [r.bus_id, r.start_stop_id, r.end_stop_id]
      );
      if (matrix) {
        setSegmentData({ fare: matrix.fare, distance: matrix.distance_km });
      }
    }
    setLoading(false);
  };

  const updateCalc = async () => {
    if (!calcFrom || !calcTo || !routeData) return;
    const database = await db.getDatabase();
    const matrix = await database.getFirstAsync<{ fare: number; distance_km: number }>(
      'SELECT fare, distance_km FROM fare_matrix WHERE bus_id = ? AND from_id = ? AND to_id = ?',
      [routeData.bus_id, calcFrom.id, calcTo.id]
    );
    if (matrix) {
      setCalcResult({ fare: matrix.fare, distance: matrix.distance_km });
    } else {
      // Fallback logic
      const fromIdx = allStops.findIndex(s => s.id === calcFrom.id);
      const toIdx = allStops.findIndex(s => s.id === calcTo.id);
      const stages = Math.abs(toIdx - fromIdx);
      const dist = stages * 1.5;
      setCalcResult({ fare: Math.max(10, Math.ceil(dist * 2.45)), distance: dist });
    }
  };

  const mapStops = useMemo(() => {
    if (allStops.length < 2 || !calcFrom || !calcTo) return allStops;
    const fromIdx = allStops.findIndex(s => s.id === calcFrom.id);
    const toIdx = allStops.findIndex(s => s.id === calcTo.id);
    if (fromIdx === -1 || toIdx === -1) return allStops;
    if (fromIdx <= toIdx) return allStops.slice(fromIdx, toIdx + 1);
    return allStops.slice(toIdx, fromIdx + 1).reverse();
  }, [allStops, calcFrom, calcTo]);
  const displayFare = segmentData?.fare || routeData?.fixed_fare || 0;
  const displayDist = segmentData?.distance || routeData?.distance_km || 0;
  const operatingHours = lang === 'bn' ? '০৬:০০ - ২৩:০০' : '06:00 - 23:00';
  const mapDistance = calcResult?.distance || displayDist;

  if (loading || !routeData || !bus) {
    return (
      <View style={[styles.container, { backgroundColor: colors.bg }]}>
        <View style={styles.loadingContainer}>
          <Text style={{ fontSize: 40 }}>🔄</Text>
          <Text style={{ color: colors.textSecondary, marginTop: 10 }}>Loading...</Text>
        </View>
      </View>
    );
  }

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.bg }]}>
      {/* Bus info header */}
      <Card style={[styles.headerCard, { backgroundColor: COLORS.primary }]}>
        <Card.Content>
          <Text style={styles.busNameLarge}>🚌 {bus.name}</Text>
          <View style={styles.badgeRow}>
            <Chip style={[styles.badge, { backgroundColor: 'rgba(255,255,255,0.2)' }]} textStyle={{ color: '#fff', fontSize: 11 }}>
              {bus.operator}
            </Chip>
            <Chip
              style={[styles.badge, { backgroundColor: routeData.is_active ? '#4CAF50' : '#F44336' }]}
              textStyle={{ color: '#fff', fontSize: 11 }}
            >
              {routeData.is_active ? labels.active : labels.inactive}
            </Chip>
          </View>
        </Card.Content>
      </Card>

      {/* Fare summary */}
      <Card style={[styles.fareCard, { backgroundColor: colors.card }]} mode="elevated">
        <Card.Content>
          <View style={styles.fareGrid}>
            <View style={styles.fareBox}>
              <Text style={[styles.fareAmount, { color: COLORS.primary }]}>{formatFare(displayFare)}</Text>
              <Text style={[styles.fareDesc, { color: colors.textSecondary }]}>{labels.fixedFare}</Text>
            </View>
            <View style={[styles.fareDivider, { backgroundColor: colors.divider }]} />
            <View style={styles.fareBox}>
              <Text style={[styles.fareAmount, { color: COLORS.accent }]}>{formatFare(displayFare)}</Text>
              <Text style={[styles.fareDesc, { color: colors.textSecondary }]}>{labels.distanceFare}</Text>
            </View>
            <View style={[styles.fareDivider, { backgroundColor: colors.divider }]} />
            <View style={styles.fareBox}>
              <Text style={[styles.fareAmount, { color: colors.text }]}>{formatDistance(displayDist)}</Text>
              <Text style={[styles.fareDesc, { color: colors.textSecondary }]}>{labels.distance}</Text>
            </View>
          </View>
        </Card.Content>
      </Card>

      <RouteMap
        stops={mapStops}
        distanceKm={mapDistance}
        serviceType={bus.type || (lang === 'bn' ? 'সেমি-সিটিং' : 'Semi-Seating')}
        operatingHours={operatingHours}
        routeKey={`${routeData.id}-${bus.id}-${bus.name}`}
      />

      {/* Full stop sequence */}
      <Card style={[styles.stopsCard, { backgroundColor: colors.card }]} mode="elevated">
        <Card.Content>
          <Text style={[styles.sectionHeader, { color: colors.text }]}>
            📍 {lang === 'bn' ? 'সম্পূর্ণ স্টপ ক্রম' : 'Complete Stop Sequence'}
          </Text>
          <Divider style={{ marginBottom: 12, backgroundColor: colors.divider }} />
          {allStops.map((stop, idx) => (
            <View key={stop.id} style={styles.stopRow}>
              <View style={styles.stopTimeline}>
                <View
                  style={[
                    styles.stopDot,
                    {
                      backgroundColor:
                        idx === 0 ? COLORS.success
                          : idx === allStops.length - 1 ? COLORS.error
                            : COLORS.primaryLight,
                    },
                  ]}
                />
                {idx < allStops.length - 1 && (
                  <View style={[styles.stopLineConnector, { backgroundColor: COLORS.primaryLight }]} />
                )}
              </View>
              <View style={styles.stopInfo}>
                <Text style={[styles.stopNameText, { color: colors.text }]}>
                  {getStopName(stop, lang)}
                </Text>
                <Text style={[styles.stopAreaText, { color: colors.textSecondary }]}>
                  {stop.area}
                </Text>
              </View>
              <Text style={{ color: colors.textSecondary, fontSize: 12 }}>
                {idx === 0 ? '🟢' : idx === allStops.length - 1 ? '🔴' : `#${idx + 1}`}
              </Text>
            </View>
          ))}
        </Card.Content>
      </Card>

      {/* Stoppage Fare Calculator */}
      <Card style={[styles.infoCard, { backgroundColor: colors.card, marginTop: 4 }]} mode="elevated">
        <Card.Content>
          <Text style={[styles.sectionHeader, { color: colors.text }]}>
            🎫 {lang === 'bn' ? 'স্টপেজ অনুযায়ী ভাড়া' : 'Stoppage Fare Calculator'}
          </Text>

          <View style={styles.calcRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.calcLabel}>{labels.from}</Text>
              <TouchableOpacity
                onPress={() => {
                  const idx = allStops.findIndex(s => s.id === calcFrom?.id);
                  setCalcFrom(allStops[(idx + 1) % allStops.length]);
                }}
                style={[styles.calcSelect, { backgroundColor: colors.input, borderColor: colors.divider }]}
              >
                <Text numberOfLines={1} style={{ color: colors.text, fontSize: 13 }}>
                  {calcFrom ? getStopName(calcFrom, lang) : '...'}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{ width: 30, alignItems: 'center', justifyContent: 'center', paddingTop: 20 }}>
              <Text style={{ color: colors.textSecondary }}>→</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.calcLabel}>{labels.to}</Text>
              <TouchableOpacity
                onPress={() => {
                  const idx = allStops.findIndex(s => s.id === calcTo?.id);
                  setCalcTo(allStops[(idx + 1) % allStops.length]);
                }}
                style={[styles.calcSelect, { backgroundColor: colors.input, borderColor: colors.divider }]}
              >
                <Text numberOfLines={1} style={{ color: colors.text, fontSize: 13 }}>
                  {calcTo ? getStopName(calcTo, lang) : '...'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <Divider style={{ marginVertical: 15, backgroundColor: colors.divider }} />

          <View style={styles.calcResultRow}>
            <View>
              <Text style={[styles.calcTotalLabel, { color: colors.textSecondary }]}>{lang === 'bn' ? 'মোট ভাড়া' : 'Total Fare'}</Text>
              <Text style={[styles.calcTotalAmount, { color: COLORS.success }]}>{formatFare(calcResult?.fare || 0)}</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={[styles.calcTotalLabel, { color: colors.textSecondary, textAlign: 'right' }]}>{labels.distance}</Text>
              <Text style={[styles.calcTotalAmount, { color: colors.text, textAlign: 'right', fontSize: 18 }]}>
                {calcResult?.distance.toFixed(1) || '0.0'} km
              </Text>
            </View>
          </View>

          <Text style={{ fontSize: 10, color: colors.textSecondary, marginTop: 10, fontStyle: 'italic' }}>
            {lang === 'bn' ? '* স্টপেজে ক্লিক করে স্টপ পরিবর্তন করুন' : '* Tap on the stops to change selection'}
          </Text>
        </Card.Content>
      </Card>

      {/* Direction info */}
      <Card style={[styles.infoCard, { backgroundColor: colors.card, marginVertical: 12, marginBottom: 30 }]} mode="elevated">
        <Card.Content>
          <View style={styles.infoRow}>
            <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>{lang === 'bn' ? 'দিক' : 'Direction'}</Text>
            <Chip style={{ backgroundColor: colors.input }}>
              {routeData.direction === 'both'
                ? lang === 'bn'
                  ? 'উভয়'
                  : 'Both Ways'
                : routeData.direction === 'up'
                  ? lang === 'bn'
                    ? 'উপরে'
                    : 'Up'
                  : lang === 'bn'
                    ? 'নিচে'
                    : 'Down'}
            </Chip>
          </View>
          {bus.notes ? (
            <View style={[styles.infoRow, { marginTop: 8 }]}>
              <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>{lang === 'bn' ? 'নোট' : 'Notes'}</Text>
              <Text style={{ color: colors.text, flex: 1, textAlign: 'right', fontSize: 13 }}>{bus.notes}</Text>
            </View>
          ) : null}
        </Card.Content>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerCard: {
    margin: 16,
    borderRadius: 16,
  },
  busNameLarge: {
    fontSize: 20,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 8,
  },
  badgeRow: {
    flexDirection: 'row',
    gap: 6,
    flexWrap: 'wrap',
  },
  badge: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    height: 28,
  },
  fareCard: {
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 16,
  },
  fareGrid: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fareBox: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  fareAmount: {
    fontSize: 22,
    fontWeight: '800',
  },
  fareDesc: {
    fontSize: 11,
    marginTop: 4,
  },
  fareDivider: {
    width: 1,
    height: 40,
  },
  stopsCard: {
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 16,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 8,
  },
  stopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 50,
  },
  stopTimeline: {
    width: 30,
    alignItems: 'center',
  },
  stopDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    zIndex: 1,
  },
  stopLineConnector: {
    width: 2,
    height: 36,
    marginTop: -2,
  },
  stopInfo: {
    flex: 1,
    marginLeft: 10,
    paddingVertical: 6,
  },
  stopNameText: {
    fontSize: 14,
    fontWeight: '600',
  },
  stopAreaText: {
    fontSize: 11,
    marginTop: 1,
  },
  infoCard: {
    marginHorizontal: 16,
    borderRadius: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  calcRow: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  calcLabel: {
    fontSize: 10,
    fontWeight: '700',
    marginBottom: 4,
    textTransform: 'uppercase',
    opacity: 0.6,
  },
  calcSelect: {
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    height: 40,
    justifyContent: 'center',
  },
  calcResultRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  calcTotalLabel: {
    fontSize: 12,
    fontWeight: '500',
  },
  calcTotalAmount: {
    fontSize: 24,
    fontWeight: '800',
  },
});
