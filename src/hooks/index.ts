// ============================================
// Pothiq AI — Custom Hooks
// ============================================

import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import Fuse from 'fuse.js';
import type { Stop, Bus, Route, SearchResult } from '../types';
import { useAppStore } from '../store';
import { COLORS, BENGALI_LABELS, ENGLISH_LABELS } from '../constants';
import * as db from '../db/database';
import { createStopFuse, fuzzySearchStops } from '../utils';

// ==================== THEME HOOK ====================

export function useThemeColors() {
  const themeMode = useAppStore(s => s.themeMode);
  const isDark = themeMode === 'dark';

  return {
    isDark,
    bg: isDark ? COLORS.darkBackground : COLORS.background,
    surface: isDark ? COLORS.darkSurface : COLORS.surface,
    text: isDark ? COLORS.darkText : COLORS.text,
    textSecondary: isDark ? COLORS.darkTextSecondary : COLORS.textSecondary,
    divider: isDark ? COLORS.darkDivider : COLORS.divider,
    primary: COLORS.primary,
    primaryLight: COLORS.primaryLight,
    accent: COLORS.accent,
    card: isDark ? '#252525' : '#FFFFFF',
    input: isDark ? '#2A2A2A' : '#F0F0F0',
    inputText: isDark ? '#FAFAFA' : '#212121',
    placeholder: isDark ? '#888888' : '#999999',
  };
}

export function useLabel(key: string): string {
  const lang = useAppStore(s => s.language);
  return lang === 'bn' ? BENGALI_LABELS[key] || ENGLISH_LABELS[key] || key : ENGLISH_LABELS[key] || key;
}

/** Hook to load all stops */
export function useStops() {
  const [stops, setStops] = useState<Stop[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await db.getAllStops();
      setStops(data);
    } catch (e) {
      console.error('Failed to load stops:', e);
    }
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  return { stops, loading, reload: load };
}

/** Hook to load all buses */
export function useBuses() {
  const [buses, setBuses] = useState<Bus[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await db.getAllBuses();
      setBuses(data);
    } catch (e) {
      console.error('Failed to load buses:', e);
    }
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  return { buses, loading, reload: load };
}

/** Hook to load all routes */
export function useRoutes(includeInactive = false) {
  const [routes, setRoutes] = useState<Route[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = includeInactive ? await db.getAllRoutesIncludingInactive() : await db.getAllRoutes();
      setRoutes(data);
    } catch (e) {
      console.error('Failed to load routes:', e);
    }
    setLoading(false);
  }, [includeInactive]);

  useEffect(() => { load(); }, [load]);

  return { routes, loading, reload: load };
}

/** Hook for fuzzy search on stops */
export function useStopSearch(stops: Stop[]) {
  const language = useAppStore(s => s.language);
  const fuse = useMemo(() => createStopFuse(stops, language), [stops, language]);

  const search = useCallback((query: string): Stop[] => {
    return fuzzySearchStops(fuse, query);
  }, [fuse]);

  return { search };
}

/** Hook for route search */
export function useRouteSearch() {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const searchRoutes = useCallback(async (fromStopId: number, toStopId: number) => {
    setLoading(true);
    setSearched(true);
    try {
      const data = await db.searchRoutes(fromStopId, toStopId);
      setResults(data);
    } catch (e) {
      console.error('Failed to search routes:', e);
      setResults([]);
    }
    setLoading(false);
  }, []);

  const clearResults = useCallback(() => {
    setResults([]);
    setSearched(false);
  }, []);

  return { results, loading, searched, searchRoutes, clearResults };
}

/** Hook for dashboard counts */
export function useDashboard() {
  const [counts, setCounts] = useState({ routes: 0, buses: 0, stops: 0 });
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await db.getCounts();
      setCounts(data);
    } catch (e) {
      console.error('Failed to load counts:', e);
    }
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  return { counts, loading, reload: load };
}

/** Hook to get label based on language */
export function useLabels() {
  const language = useAppStore(s => s.language);

  const getLabel = useCallback((key: string, labels_en: Record<string, string>, labels_bn: Record<string, string>) => {
    return language === 'bn' ? labels_bn[key] || labels_en[key] || key : labels_en[key] || key;
  }, [language]);

  return { language, getLabel };
}
