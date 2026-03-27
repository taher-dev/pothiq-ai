// ============================================
// Pothiq AI — Home Screen (Route Search)
// ============================================

import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Text, IconButton, Divider, Surface } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Toast from 'react-native-toast-message';
import { StopAutocomplete, ResultCard, SkeletonCard, EmptyState, useThemeColors, useLabel } from '../components';
import { useStops, useStopSearch, useRouteSearch } from '../hooks';
import { useAppStore } from '../store';
import { COLORS, ENGLISH_LABELS, BENGALI_LABELS } from '../constants';
import { getStopName } from '../utils';
import type { Stop, HomeStackParamList } from '../types';

type Nav = NativeStackNavigationProp<HomeStackParamList>;

export default function HomeScreen() {
  const navigation = useNavigation<Nav>();
  const colors = useThemeColors();
  const lang = useAppStore(s => s.language);
  const recentSearches = useAppStore(s => s.recentSearches);
  const addRecentSearch = useAppStore(s => s.addRecentSearch);
  const loadRecentSearches = useAppStore(s => s.loadRecentSearches);
  const labels = lang === 'bn' ? BENGALI_LABELS : ENGLISH_LABELS;

  const { stops, loading: stopsLoading } = useStops();
  const { search } = useStopSearch(stops);
  const { results, loading: searchLoading, searched, searchRoutes, clearResults } = useRouteSearch();

  const [fromStop, setFromStop] = useState<Stop | null>(null);
  const [toStop, setToStop] = useState<Stop | null>(null);

  useEffect(() => {
    loadRecentSearches();
  }, []);

  useEffect(() => {
    if (!fromStop || !toStop) {
      clearResults();
    }
  }, [fromStop, toStop, clearResults]);

  const handleSearch = useCallback(async () => {
    if (!fromStop || !toStop) {
      Toast.show({ type: 'error', text1: labels.error, text2: lang === 'bn' ? 'দুটি স্টপ নির্বাচন করুন' : 'Please select both stops' });
      return;
    }
    if (fromStop.id === toStop.id) {
      Toast.show({ type: 'error', text1: labels.error, text2: lang === 'bn' ? 'ভিন্ন স্টপ নির্বাচন করুন' : 'Please select different stops' });
      return;
    }
    await searchRoutes(fromStop.id, toStop.id);
    addRecentSearch(fromStop, toStop);
  }, [fromStop, toStop, searchRoutes, addRecentSearch]);

  const handleSwap = () => {
    const temp = fromStop;
    setFromStop(toStop);
    setToStop(temp);
    clearResults();
  };

  const handleRecentTap = (from: Stop, to: Stop) => {
    setFromStop(from);
    setToStop(to);
    searchRoutes(from.id, to.id);
    addRecentSearch(from, to);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      {/* Header */}
      <Surface style={[styles.header, { backgroundColor: COLORS.primary }]} elevation={4}>
        <Text style={styles.headerEmoji}>🚌</Text>
        <View>
          <Text style={styles.headerTitle}>{labels.appName || 'Pothiq AI'}</Text>
          <Text style={styles.headerSubtitle}>{labels.smartDhakaTransit || 'Smart Dhaka Transit'}</Text>
        </View>
      </Surface>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          {/* Search Panel */}
          <Surface style={[styles.searchPanel, { backgroundColor: colors.surface }]} elevation={2}>
            <View style={{ zIndex: 20 }}>
              <StopAutocomplete
                placeholder={labels.from}
                stops={stops}
                selectedStop={fromStop}
                onSelect={setFromStop}
                searchFn={search}
                autoFocus
              />
            </View>

            {/* Swap button */}
            <View style={styles.swapRow}>
              <View style={[styles.swapLine, { backgroundColor: colors.divider }]} />
              <TouchableOpacity
                style={[styles.swapBtn, { backgroundColor: COLORS.primaryLight }]}
                onPress={handleSwap}
              >
                <Text style={styles.swapIcon}>⇅</Text>
              </TouchableOpacity>
              <View style={[styles.swapLine, { backgroundColor: colors.divider }]} />
            </View>

            <View style={{ zIndex: 10 }}>
              <StopAutocomplete
                placeholder={labels.to}
                stops={stops}
                selectedStop={toStop}
                onSelect={setToStop}
                searchFn={search}
              />
            </View>

            {/* Search button */}
            <TouchableOpacity
              style={[styles.searchBtn, { backgroundColor: COLORS.primary, opacity: fromStop && toStop ? 1 : 0.5 }]}
              onPress={handleSearch}
              disabled={!fromStop || !toStop}
            >
              <Text style={styles.searchBtnText}>🔍  {labels.searchRoutes}</Text>
            </TouchableOpacity>
          </Surface>

          {/* Results or Recent Searches */}
          {searchLoading ? (
            <View>
              <SkeletonCard />
              <SkeletonCard />
            </View>
          ) : searched && results.length === 0 ? (
            <EmptyState
              emoji="🔍"
              title={labels.noResults}
              subtitle={labels.noResultsHint}
            />
          ) : results.length > 0 ? (
            <View>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>
                {lang === 'bn' ? `${results.length}টি রুট পাওয়া গেছে` : `${results.length} Route${results.length > 1 ? 's' : ''} Found`}
              </Text>
              {results.map((r, idx) => (
                <ResultCard
                  key={`${r.route.id}-${idx}`}
                  result={r}
                  onPress={() => navigation.navigate('RouteDetail', { routeId: r.route.id })}
                />
              ))}
            </View>
          ) : recentSearches.length > 0 ? (
            <View>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>
                🕐  {labels.recentSearches}
              </Text>
              {recentSearches.map(rs => (
                <TouchableOpacity
                  key={rs.id}
                  style={[styles.recentItem, { backgroundColor: colors.card, borderColor: colors.divider }]}
                  onPress={() => handleRecentTap(rs.fromStop, rs.toStop)}
                >
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.recentText, { color: colors.text }]}>
                      {getStopName(rs.fromStop, lang)} → {getStopName(rs.toStop, lang)}
                    </Text>
                  </View>
                  <Text style={{ color: colors.textSecondary, fontSize: 20 }}>→</Text>
                </TouchableOpacity>
              ))}
            </View>
          ) : (
            <EmptyState
              emoji="🗺️"
              title={lang === 'bn' ? 'ঢাকার বাস রুট খুঁজুন' : 'Find Dhaka Bus Routes'}
              subtitle={lang === 'bn' ? 'উপরে যাত্রা শুরু ও গন্তব্য স্থান লিখুন' : 'Enter your starting point and destination above'}
            />
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
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
    gap: 14,
  },
  headerEmoji: { fontSize: 36 },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#fff',
    letterSpacing: 0.5,
  },
  headerSubtitle: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.85)',
    fontWeight: '500',
    marginTop: 2,
  },
  content: {
    paddingBottom: 30,
  },
  searchPanel: {
    margin: 16,
    borderRadius: 20,
    padding: 16,
  },
  swapRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
    paddingHorizontal: 10,
  },
  swapLine: {
    flex: 1,
    height: 1,
  },
  swapBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  swapIcon: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  searchBtn: {
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 12,
  },
  searchBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginHorizontal: 20,
    marginTop: 12,
    marginBottom: 10,
  },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 8,
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
  },
  recentText: {
    fontSize: 14,
    fontWeight: '600',
  },
});
