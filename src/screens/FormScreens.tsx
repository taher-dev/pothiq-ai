// ============================================
// Pothiq AI — Form Screens (Route, Bus, Stop)
// ============================================

import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Switch,
  ActivityIndicator,
} from 'react-native';
import { Text, Card, Chip, Divider } from 'react-native-paper';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { useThemeColors } from '../components';
import { useAppStore, useAdminStore } from '../store';
import { COLORS, ENGLISH_LABELS, BENGALI_LABELS } from '../constants';
import { getStopName } from '../utils';
import * as db from '../db/database';
import type { Bus, Stop, SettingsStackParamList } from '../types';

// ==================== ROUTE FORM ====================

export function RouteFormScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<RouteProp<SettingsStackParamList, 'RouteForm'>>();
  const routeId = route.params?.routeId;
  const colors = useThemeColors();
  const lang = useAppStore(s => s.language);
  const { refreshActivity } = useAdminStore();
  const labels = lang === 'bn' ? BENGALI_LABELS : ENGLISH_LABELS;

  const [buses, setBuses] = useState<Bus[]>([]);
  const [stops, setStops] = useState<Stop[]>([]);
  const [busId, setBusId] = useState<number>(0);
  const [startStopId, setStartStopId] = useState<number>(0);
  const [endStopId, setEndStopId] = useState<number>(0);
  const [fixedFare, setFixedFare] = useState('');
  const [distanceKm, setDistanceKm] = useState('');
  const [direction, setDirection] = useState<'both' | 'up' | 'down'>('both');
  const [isActive, setIsActive] = useState(true);
  const [selectedStopIds, setSelectedStopIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const b = await db.getAllBuses();
    const s = await db.getAllStops();
    setBuses(b);
    setStops(s);

    if (routeId) {
      const r = await db.getRouteById(routeId);
      if (r) {
        setBusId(r.bus_id);
        setStartStopId(r.start_stop_id);
        setEndStopId(r.end_stop_id);
        setFixedFare(r.fixed_fare.toString());
        setDistanceKm(r.distance_km.toString());
        setDirection(r.direction);
        setIsActive(r.is_active === 1);
        try {
          setSelectedStopIds(JSON.parse(r.stops_order));
        } catch {}
      }
    }
    setLoading(false);
  };

  const handleSave = async () => {
    refreshActivity();
    if (!busId || !startStopId || !endStopId || !fixedFare || !distanceKm) {
      Toast.show({ type: 'error', text1: labels.error, text2: lang === 'bn' ? 'সব ফিল্ড পূরণ করুন' : 'Fill all required fields' });
      return;
    }
    if (startStopId === endStopId) {
      Toast.show({ type: 'error', text1: labels.error, text2: lang === 'bn' ? 'শুরু এবং শেষ স্টপ ভিন্ন হতে হবে' : 'Start and end stop must be different' });
      return;
    }
    const fare = parseFloat(fixedFare);
    const distance = parseFloat(distanceKm);
    if (Number.isNaN(fare) || Number.isNaN(distance) || fare <= 0 || distance <= 0) {
      Toast.show({ type: 'error', text1: labels.error, text2: lang === 'bn' ? 'ভাড়া এবং দূরত্ব সঠিক দিন' : 'Enter valid fare and distance' });
      return;
    }
    setSaving(true);
    const orderedStops = selectedStopIds.length > 0 ? selectedStopIds : [startStopId, endStopId];
    const normalizedStops = Array.from(new Set([startStopId, ...orderedStops, endStopId]));
    const data = {
      bus_id: busId,
      start_stop_id: startStopId,
      end_stop_id: endStopId,
      fixed_fare: fare,
      distance_km: distance,
      stops_order: JSON.stringify(normalizedStops),
      direction,
      is_active: isActive ? 1 : 0,
    };

    if (routeId) {
      await db.updateRoute(routeId, data);
    } else {
      await db.insertRoute(data);
    }
    setSaving(false);
    Toast.show({ type: 'success', text1: '✅', text2: lang === 'bn' ? 'রুট সংরক্ষিত' : 'Route saved' });
    navigation.goBack();
  };

  const toggleStopInOrder = (stopId: number) => {
    setSelectedStopIds(prev => {
      if (prev.includes(stopId)) {
        return prev.filter(id => id !== stopId);
      }
      return [...prev, stopId];
    });
  };

  if (loading) {
    return <View style={[styles.container, { backgroundColor: colors.bg }]}><ActivityIndicator style={{ marginTop: 40 }} color={COLORS.primary} size="large" /></View>;
  }

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.bg }]} keyboardShouldPersistTaps="handled">
      <Card style={[styles.formCard, { backgroundColor: colors.card }]} mode="elevated">
        <Card.Content>
          <Text style={[styles.formTitle, { color: colors.text }]}>
            {routeId ? `✏️ ${labels.edit} ${labels.route}` : `➕ ${labels.add} ${labels.route}`}
          </Text>

          {/* Bus selector */}
          <Text style={[styles.label, { color: colors.textSecondary }]}>{labels.bus} *</Text>
          <View style={styles.selectorRow}>
            {buses.map(b => (
              <TouchableOpacity
                key={b.id}
                style={[styles.selectorChip, { backgroundColor: busId === b.id ? COLORS.primary : colors.input }]}
                onPress={() => setBusId(b.id)}
              >
                <Text style={{ color: busId === b.id ? '#fff' : colors.text, fontSize: 12, fontWeight: '600' }} numberOfLines={1}>
                  {b.name.split(' ')[0]}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Start stop */}
          <Text style={[styles.label, { color: colors.textSecondary }]}>{labels.from} *</Text>
          <View style={styles.selectorRow}>
            {stops.map(s => (
              <TouchableOpacity
                key={s.id}
                style={[styles.selectorChip, { backgroundColor: startStopId === s.id ? COLORS.success : colors.input }]}
                onPress={() => setStartStopId(s.id)}
              >
                <Text style={{ color: startStopId === s.id ? '#fff' : colors.text, fontSize: 11 }} numberOfLines={1}>
                  {getStopName(s, lang)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* End stop */}
          <Text style={[styles.label, { color: colors.textSecondary }]}>{labels.to} *</Text>
          <View style={styles.selectorRow}>
            {stops.map(s => (
              <TouchableOpacity
                key={s.id}
                style={[styles.selectorChip, { backgroundColor: endStopId === s.id ? COLORS.error : colors.input }]}
                onPress={() => setEndStopId(s.id)}
              >
                <Text style={{ color: endStopId === s.id ? '#fff' : colors.text, fontSize: 11 }} numberOfLines={1}>
                  {getStopName(s, lang)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Fare & Distance */}
          <View style={styles.row}>
            <View style={{ flex: 1 }}>
              <Text style={[styles.label, { color: colors.textSecondary }]}>{labels.fixedFare} (৳) *</Text>
              <TextInput
                style={[styles.textInput, { backgroundColor: colors.input, color: colors.inputText }]}
                value={fixedFare}
                onChangeText={setFixedFare}
                keyboardType="numeric"
                placeholder="0"
                placeholderTextColor={colors.placeholder}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[styles.label, { color: colors.textSecondary }]}>{labels.distance} (km) *</Text>
              <TextInput
                style={[styles.textInput, { backgroundColor: colors.input, color: colors.inputText }]}
                value={distanceKm}
                onChangeText={setDistanceKm}
                keyboardType="numeric"
                placeholder="0"
                placeholderTextColor={colors.placeholder}
              />
            </View>
          </View>

          {/* Direction */}
          <Text style={[styles.label, { color: colors.textSecondary }]}>
            {lang === 'bn' ? 'দিক' : 'Direction'}
          </Text>
          <View style={styles.directionRow}>
            {(['both', 'up', 'down'] as const).map(d => (
              <TouchableOpacity
                key={d}
                style={[styles.directionBtn, { backgroundColor: direction === d ? COLORS.primary : colors.input }]}
                onPress={() => setDirection(d)}
              >
                <Text style={{ color: direction === d ? '#fff' : colors.text, fontWeight: '600' }}>
                  {d === 'both' ? '↕ Both' : d === 'up' ? '↑ Up' : '↓ Down'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Active toggle */}
          <View style={[styles.row, { alignItems: 'center', marginTop: 12 }]}>
            <Text style={[styles.label, { color: colors.textSecondary, marginBottom: 0 }]}>{labels.active}</Text>
            <Switch value={isActive} onValueChange={setIsActive} trackColor={{ true: COLORS.primary, false: '#ccc' }} />
          </View>

          {/* Intermediate stops */}
          <Text style={[styles.label, { color: colors.textSecondary, marginTop: 12 }]}>
            {labels.intermediateStops} ({lang === 'bn' ? 'ক্রমানুসারে নির্বাচন করুন' : 'Select in order'})
          </Text>
          <View style={styles.selectorRow}>
            {stops.map(s => (
              <TouchableOpacity
                key={s.id}
                style={[styles.selectorChip, {
                  backgroundColor: selectedStopIds.includes(s.id) ? COLORS.primaryLight : colors.input,
                }]}
                onPress={() => toggleStopInOrder(s.id)}
              >
                <Text style={{ color: selectedStopIds.includes(s.id) ? '#fff' : colors.text, fontSize: 11 }} numberOfLines={1}>
                  {selectedStopIds.includes(s.id) ? `${selectedStopIds.indexOf(s.id) + 1}. ` : ''}{getStopName(s, lang)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Save button */}
          <TouchableOpacity
            style={[styles.saveBtn, { backgroundColor: COLORS.primary, opacity: saving ? 0.6 : 1 }]}
            onPress={handleSave}
            disabled={saving}
          >
            <Text style={styles.saveBtnText}>💾 {labels.save}</Text>
          </TouchableOpacity>
        </Card.Content>
      </Card>
    </ScrollView>
  );
}

// ==================== BUS FORM ====================

export function BusFormScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<RouteProp<SettingsStackParamList, 'BusForm'>>();
  const busId = route.params?.busId;
  const colors = useThemeColors();
  const lang = useAppStore(s => s.language);
  const { refreshActivity } = useAdminStore();
  const labels = lang === 'bn' ? BENGALI_LABELS : ENGLISH_LABELS;

  const [name, setName] = useState('');
  const [operator, setOperator] = useState('');
  const [type, setType] = useState('Non-AC');
  const [notes, setNotes] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (busId) loadBus();
  }, [busId]);

  const loadBus = async () => {
    const b = await db.getBusById(busId!);
    if (b) {
      setName(b.name);
      setOperator(b.operator);
      setType(b.type);
      setNotes(b.notes);
    }
  };

  const handleSave = async () => {
    refreshActivity();
    const cleanedName = name.trim();
    const cleanedOperator = operator.trim();
    const cleanedType = type.trim();
    const cleanedNotes = notes.trim();
    if (!cleanedName || !cleanedOperator || !cleanedType) {
      Toast.show({ type: 'error', text1: labels.error, text2: lang === 'bn' ? 'সব ফিল্ড পূরণ করুন' : 'Fill all required fields' });
      return;
    }
    setSaving(true);
    if (busId) {
      await db.updateBus(busId, { name: cleanedName, operator: cleanedOperator, type: cleanedType, notes: cleanedNotes });
    } else {
      await db.insertBus({ name: cleanedName, operator: cleanedOperator, type: cleanedType, notes: cleanedNotes });
    }
    setSaving(false);
    Toast.show({ type: 'success', text1: '✅', text2: lang === 'bn' ? 'বাস সংরক্ষিত' : 'Bus saved' });
    navigation.goBack();
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.bg }]} keyboardShouldPersistTaps="handled">
      <Card style={[styles.formCard, { backgroundColor: colors.card }]} mode="elevated">
        <Card.Content>
          <Text style={[styles.formTitle, { color: colors.text }]}>
            {busId ? `✏️ ${labels.edit} ${labels.bus}` : `➕ ${labels.add} ${labels.bus}`}
          </Text>

          <Text style={[styles.label, { color: colors.textSecondary }]}>
            {lang === 'bn' ? 'নাম' : 'Name'} *
          </Text>
          <TextInput style={[styles.textInput, { backgroundColor: colors.input, color: colors.inputText }]} value={name} onChangeText={setName} placeholder="Bus name" placeholderTextColor={colors.placeholder} />

          <Text style={[styles.label, { color: colors.textSecondary }]}>{labels.operator} *</Text>
          <TextInput style={[styles.textInput, { backgroundColor: colors.input, color: colors.inputText }]} value={operator} onChangeText={setOperator} placeholder="Operator" placeholderTextColor={colors.placeholder} />

          <Text style={[styles.label, { color: colors.textSecondary }]}>{labels.type} *</Text>
          <View style={styles.directionRow}>
            {['AC', 'Non-AC', 'CNG'].map(t => (
              <TouchableOpacity
                key={t}
                style={[styles.directionBtn, { backgroundColor: type === t ? COLORS.primary : colors.input }]}
                onPress={() => setType(t)}
              >
                <Text style={{ color: type === t ? '#fff' : colors.text, fontWeight: '600' }}>{t}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={[styles.label, { color: colors.textSecondary }]}>
            {lang === 'bn' ? 'নোট' : 'Notes'}
          </Text>
          <TextInput style={[styles.textInput, { backgroundColor: colors.input, color: colors.inputText }]} value={notes} onChangeText={setNotes} placeholder="Notes" placeholderTextColor={colors.placeholder} multiline />

          <TouchableOpacity
            style={[styles.saveBtn, { backgroundColor: COLORS.primary, opacity: saving ? 0.6 : 1 }]}
            onPress={handleSave}
            disabled={saving}
          >
            <Text style={styles.saveBtnText}>💾 {labels.save}</Text>
          </TouchableOpacity>
        </Card.Content>
      </Card>
    </ScrollView>
  );
}

// ==================== STOP FORM ====================

export function StopFormScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<RouteProp<SettingsStackParamList, 'StopForm'>>();
  const stopId = route.params?.stopId;
  const colors = useThemeColors();
  const lang = useAppStore(s => s.language);
  const { refreshActivity } = useAdminStore();
  const labels = lang === 'bn' ? BENGALI_LABELS : ENGLISH_LABELS;

  const [nameEn, setNameEn] = useState('');
  const [nameBn, setNameBn] = useState('');
  const [area, setArea] = useState('');
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (stopId) loadStop();
  }, [stopId]);

  const loadStop = async () => {
    const s = await db.getStopById(stopId!);
    if (s) {
      setNameEn(s.name_en);
      setNameBn(s.name_bn);
      setArea(s.area);
      setLat(s.lat?.toString() || '');
      setLng(s.lng?.toString() || '');
    }
  };

  const handleSave = async () => {
    refreshActivity();
    const cleanedNameEn = nameEn.trim();
    const cleanedNameBn = nameBn.trim();
    const cleanedArea = area.trim();
    if (!cleanedNameEn || !cleanedNameBn || !cleanedArea) {
      Toast.show({ type: 'error', text1: labels.error, text2: lang === 'bn' ? 'সব ফিল্ড পূরণ করুন' : 'Fill all required fields' });
      return;
    }
    setSaving(true);
    const data = {
      name_en: cleanedNameEn,
      name_bn: cleanedNameBn,
      area: cleanedArea,
      lat: parseFloat(lat) || 0,
      lng: parseFloat(lng) || 0,
    };

    if (stopId) {
      await db.updateStop(stopId, data);
    } else {
      await db.insertStop(data);
    }
    setSaving(false);
    Toast.show({ type: 'success', text1: '✅', text2: lang === 'bn' ? 'স্টপ সংরক্ষিত' : 'Stop saved' });
    navigation.goBack();
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.bg }]} keyboardShouldPersistTaps="handled">
      <Card style={[styles.formCard, { backgroundColor: colors.card }]} mode="elevated">
        <Card.Content>
          <Text style={[styles.formTitle, { color: colors.text }]}>
            {stopId ? `✏️ ${labels.edit} ${labels.stop}` : `➕ ${labels.add} ${labels.stop}`}
          </Text>

          <Text style={[styles.label, { color: colors.textSecondary }]}>Name (English) *</Text>
          <TextInput style={[styles.textInput, { backgroundColor: colors.input, color: colors.inputText }]} value={nameEn} onChangeText={setNameEn} placeholder="Stop name in English" placeholderTextColor={colors.placeholder} />

          <Text style={[styles.label, { color: colors.textSecondary }]}>নাম (বাংলা) *</Text>
          <TextInput style={[styles.textInput, { backgroundColor: colors.input, color: colors.inputText }]} value={nameBn} onChangeText={setNameBn} placeholder="স্টপের নাম বাংলায়" placeholderTextColor={colors.placeholder} />

          <Text style={[styles.label, { color: colors.textSecondary }]}>{labels.area} *</Text>
          <TextInput style={[styles.textInput, { backgroundColor: colors.input, color: colors.inputText }]} value={area} onChangeText={setArea} placeholder="Area" placeholderTextColor={colors.placeholder} />

          <View style={styles.row}>
            <View style={{ flex: 1 }}>
              <Text style={[styles.label, { color: colors.textSecondary }]}>Latitude</Text>
              <TextInput style={[styles.textInput, { backgroundColor: colors.input, color: colors.inputText }]} value={lat} onChangeText={setLat} keyboardType="numeric" placeholder="23.xxxx" placeholderTextColor={colors.placeholder} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[styles.label, { color: colors.textSecondary }]}>Longitude</Text>
              <TextInput style={[styles.textInput, { backgroundColor: colors.input, color: colors.inputText }]} value={lng} onChangeText={setLng} keyboardType="numeric" placeholder="90.xxxx" placeholderTextColor={colors.placeholder} />
            </View>
          </View>

          <TouchableOpacity
            style={[styles.saveBtn, { backgroundColor: COLORS.primary, opacity: saving ? 0.6 : 1 }]}
            onPress={handleSave}
            disabled={saving}
          >
            <Text style={styles.saveBtnText}>💾 {labels.save}</Text>
          </TouchableOpacity>
        </Card.Content>
      </Card>
    </ScrollView>
  );
}

// ==================== STYLES ====================

const styles = StyleSheet.create({
  container: { flex: 1 },
  formCard: {
    margin: 12,
    borderRadius: 16,
    marginBottom: 30,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 16,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    marginTop: 10,
    marginBottom: 6,
  },
  textInput: {
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
  },
  row: {
    flexDirection: 'row',
    gap: 10,
  },
  selectorRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  selectorChip: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    maxWidth: 120,
  },
  directionRow: {
    flexDirection: 'row',
    gap: 8,
  },
  directionBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  saveBtn: {
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 20,
  },
  saveBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});
