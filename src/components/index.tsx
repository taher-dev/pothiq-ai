// ============================================
// Pothiq AI — Reusable UI Components
// ============================================

import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { Text, Card, Chip, Divider, IconButton } from 'react-native-paper';
import { useAppStore } from '../store';
import { useThemeColors, useLabel } from '../hooks';
export { useThemeColors, useLabel };
import { COLORS, ENGLISH_LABELS, BENGALI_LABELS } from '../constants';
import { getStopName, formatFare, calcDistanceFare, formatDistance } from '../utils';
import type { Stop, SearchResult } from '../types';
export { ChatWidget } from './ChatWidget';

// ==================== STOP AUTOCOMPLETE ====================

interface StopAutocompleteProps {
  placeholder: string;
  stops: Stop[];
  selectedStop: Stop | null;
  onSelect: (stop: Stop | null) => void;
  searchFn: (query: string) => Stop[];
  autoFocus?: boolean;
}

export function StopAutocomplete({ placeholder, stops, selectedStop, onSelect, searchFn, autoFocus }: StopAutocompleteProps) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Stop[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const lang = useAppStore(s => s.language);
  const colors = useThemeColors();

  useEffect(() => {
    if (selectedStop) {
      setQuery(getStopName(selectedStop, lang));
    }
  }, [selectedStop, lang]);

  const handleChangeText = (text: string) => {
    setQuery(text);
    if (text.length > 0) {
      const results = searchFn(text);
      setSuggestions(results);
    } else {
      setSuggestions([]);
    }
  };

  const handleSelect = (stop: Stop) => {
    onSelect(stop);
    setQuery(getStopName(stop, lang));
    setSuggestions([]);
    setIsFocused(false);
  };

  const handleClear = () => {
    setQuery('');
    setSuggestions([]);
    onSelect(null as any);
  };

  return (
    <View style={styles.autocompleteContainer}>
      <View style={[styles.inputRow, { backgroundColor: colors.input }]}>
        <TextInput
          style={[styles.input, { color: colors.inputText }]}
          placeholder={placeholder}
          placeholderTextColor={colors.placeholder}
          value={query}
          onChangeText={handleChangeText}
          onFocus={() => setIsFocused(true)}
          autoFocus={autoFocus}
        />
        {query.length > 0 && (
          <IconButton icon="close-circle" size={20} iconColor={colors.textSecondary} onPress={handleClear} />
        )}
      </View>
      {isFocused && suggestions.length > 0 && (
        <View style={[styles.suggestionsList, { backgroundColor: colors.surface, borderColor: colors.divider }]}>
          {suggestions.map((stop, idx) => (
            <TouchableOpacity
              key={stop.id}
              style={[styles.suggestionItem, idx < suggestions.length - 1 && { borderBottomWidth: 1, borderBottomColor: colors.divider }]}
              onPress={() => handleSelect(stop)}
            >
              <Text style={[styles.suggestionName, { color: colors.text }]}>{getStopName(stop, lang)}</Text>
              <Text style={[styles.suggestionArea, { color: colors.textSecondary }]}>{stop.area}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}

// ==================== SEARCH RESULT CARD ====================

interface ResultCardProps {
  result: SearchResult;
  onPress?: () => void;
}

export function ResultCard({ result, onPress }: ResultCardProps) {
  const { bus, startStop, endStop, intermediateStops, fixedFare, distanceFare, route } = result;
  const lang = useAppStore(s => s.language);
  const colors = useThemeColors();

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <Card style={[styles.resultCard, { backgroundColor: colors.card }]} mode="elevated">
        <Card.Content>
          {/* Bus name & type badge */}
          <View style={styles.resultHeader}>
            <View style={{ flex: 1 }}>
              <Text style={[styles.busName, { color: colors.text }]}>🚌 {bus.name}</Text>
            </View>
          </View>

          <Divider style={{ marginVertical: 8, backgroundColor: colors.divider }} />

          {/* Route path */}
          <View style={styles.routePath}>
            <View style={styles.routeStop}>
              <View style={[styles.dot, { backgroundColor: COLORS.success }]} />
              <Text style={[styles.stopName, { color: colors.text }]}>{getStopName(startStop, lang)}</Text>
            </View>
            {intermediateStops.length > 0 && (
              <View style={styles.intermediateContainer}>
                <View style={[styles.line, { borderColor: COLORS.primaryLight }]} />
                <Text style={[styles.intermediateLabel, { color: colors.textSecondary }]}>
                  {intermediateStops.length} {lang === 'bn' ? 'স্টপ' : 'stops'}
                </Text>
              </View>
            )}
            <View style={styles.routeStop}>
              <View style={[styles.dot, { backgroundColor: COLORS.error }]} />
              <Text style={[styles.stopName, { color: colors.text }]}>{getStopName(endStop, lang)}</Text>
            </View>
          </View>

          <Divider style={{ marginVertical: 8, backgroundColor: colors.divider }} />

          {/* Fare info */}
          <View style={styles.fareRow}>
            <View style={styles.fareItem}>
              <Text style={[styles.fareLabel, { color: colors.textSecondary }]}>
                {lang === 'bn' ? BENGALI_LABELS.fixedFare : 'Fixed Fare'}
              </Text>
              <Text style={[styles.fareValue, { color: COLORS.primary }]}>{formatFare(fixedFare)}</Text>
            </View>
            <View style={styles.fareItem}>
              <Text style={[styles.fareLabel, { color: colors.textSecondary }]}>
                {lang === 'bn' ? BENGALI_LABELS.distanceFare : 'Distance Fare'}
              </Text>
              <Text style={[styles.fareValue, { color: COLORS.accent }]}>{formatFare(distanceFare)}</Text>
            </View>
            <View style={styles.fareItem}>
              <Text style={[styles.fareLabel, { color: colors.textSecondary }]}>
                {lang === 'bn' ? BENGALI_LABELS.distance : 'Distance'}
              </Text>
              <Text style={[styles.fareValue, { color: colors.text }]}>{formatDistance(result.segmentDistance)}</Text>
            </View>
          </View>

          {/* Intermediate stops chips */}
          {intermediateStops.length > 0 && (
            <View style={styles.interStopsRow}>
              <Text style={[styles.interStopsLabel, { color: colors.textSecondary }]}>
                {lang === 'bn' ? BENGALI_LABELS.intermediateStops : 'Via'}:
              </Text>
              <View style={styles.chipsRow}>
                {intermediateStops.slice(0, 10).map(s => (
                  <Chip
                    key={s.id}
                    style={[styles.stopChip, { backgroundColor: colors.input }]}
                    textStyle={[styles.stopChipText, { color: colors.text }]}
                  >
                    {getStopName(s, lang)}
                  </Chip>
                ))}
                {intermediateStops.length > 10 && (
                  <Chip
                    style={[styles.stopChip, { backgroundColor: colors.input }]}
                    textStyle={[styles.stopChipText, { color: colors.textSecondary }]}
                  >
                    +{intermediateStops.length - 10}
                  </Chip>
                )}
              </View>
            </View>
          )}
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
}

// ==================== SKELETON LOADING ====================

export function SkeletonCard() {
  const colors = useThemeColors();
  return (
    <Card style={[styles.resultCard, { backgroundColor: colors.card }]} mode="elevated">
      <Card.Content>
        <View style={[styles.skeleton, { width: '60%', height: 20, backgroundColor: colors.input }]} />
        <View style={[styles.skeleton, { width: '40%', height: 14, marginTop: 8, backgroundColor: colors.input }]} />
        <Divider style={{ marginVertical: 8 }} />
        <View style={styles.fareRow}>
          <View style={[styles.skeleton, { width: 60, height: 30, backgroundColor: colors.input }]} />
          <View style={[styles.skeleton, { width: 60, height: 30, backgroundColor: colors.input }]} />
          <View style={[styles.skeleton, { width: 60, height: 30, backgroundColor: colors.input }]} />
        </View>
      </Card.Content>
    </Card>
  );
}

// ==================== EMPTY STATE ====================

interface EmptyStateProps {
  emoji: string;
  title: string;
  subtitle?: string;
}

export function EmptyState({ emoji, title, subtitle }: EmptyStateProps) {
  const colors = useThemeColors();
  return (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyEmoji}>{emoji}</Text>
      <Text style={[styles.emptyTitle, { color: colors.text }]}>{title}</Text>
      {subtitle && <Text style={[styles.emptySubtitle, { color: colors.textSecondary }]}>{subtitle}</Text>}
    </View>
  );
}

// ==================== STYLES ====================

const styles = StyleSheet.create({
  autocompleteContainer: {
    position: 'relative',
    zIndex: 10,
    marginBottom: 4,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 52,
  },
  input: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
  },
  suggestionsList: {
    position: 'absolute',
    top: 56,
    left: 0,
    right: 0,
    borderRadius: 12,
    borderWidth: 1,
    maxHeight: 200,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    zIndex: 100,
  },
  suggestionItem: {
    paddingVertical: 12,
    paddingHorizontal: 14,
  },
  suggestionName: {
    fontSize: 14,
    fontWeight: '600',
  },
  suggestionArea: {
    fontSize: 11,
    marginTop: 2,
  },
  resultCard: {
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  resultHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  busName: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  typeBadge: {
    alignSelf: 'flex-start',
    height: 24,
  },
  routePath: {
    paddingLeft: 8,
  },
  routeStop: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  stopName: {
    fontSize: 14,
    fontWeight: '600',
  },
  intermediateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 4,
    paddingVertical: 2,
  },
  line: {
    width: 2,
    height: 20,
    borderLeftWidth: 2,
    borderStyle: 'dashed',
    marginRight: 12,
  },
  intermediateLabel: {
    fontSize: 12,
    fontStyle: 'italic',
  },
  fareRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  fareItem: {
    alignItems: 'center',
    flex: 1,
  },
  fareLabel: {
    fontSize: 11,
    marginBottom: 2,
  },
  fareValue: {
    fontSize: 18,
    fontWeight: '800',
  },
  interStopsRow: {
    marginTop: 10,
    width: '100%',
  },
  interStopsLabel: {
    fontSize: 12,
    marginBottom: 6,
    fontWeight: '600',
  },
  chipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    width: '100%',
  },
  stopChip: {
    height: 32,
    marginBottom: 4,
    justifyContent: 'center',
  },
  stopChipText: {
    fontSize: 12,
    lineHeight: 16,
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  skeleton: {
    borderRadius: 6,
    opacity: 0.6,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    paddingHorizontal: 30,
  },
  emptyEmoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
});
