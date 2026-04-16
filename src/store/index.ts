// ============================================
// Pothiq AI — Zustand Global Store
// ============================================

import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import * as Crypto from 'expo-crypto';
import type { Language, ThemeMode, AdminState, Stop, RecentSearch, AppSettings } from '../types';
import {
  SETTINGS_KEY,
  RECENT_SEARCHES_KEY,
  ADMIN_PIN_KEY,
  DEFAULT_PIN,
  MAX_FAILED_ATTEMPTS,
  LOCK_DURATION_MS,
  AUTO_LOCK_MS,
  MAX_RECENT_SEARCHES,
} from '../constants';

// ==================== APP STORE ====================

interface AppStore {
  language: Language;
  themeMode: ThemeMode;
  isLoading: boolean;
  recentSearches: RecentSearch[];
  setLanguage: (lang: Language) => void;
  setThemeMode: (mode: ThemeMode) => void;
  setLoading: (loading: boolean) => void;
  loadSettings: () => Promise<void>;
  addRecentSearch: (from: Stop, to: Stop) => Promise<void>;
  loadRecentSearches: () => Promise<void>;
  clearRecentSearches: () => Promise<void>;
}

export const useAppStore = create<AppStore>((set, get) => ({
  language: 'en',
  themeMode: 'light',
  isLoading: true,
  recentSearches: [],

  setLanguage: async (lang: Language) => {
    set({ language: lang });
    const settings: AppSettings = { language: lang, themeMode: get().themeMode };
    await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  },

  setThemeMode: async (mode: ThemeMode) => {
    set({ themeMode: mode });
    const settings: AppSettings = { language: get().language, themeMode: mode };
    await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  },

  setLoading: (loading: boolean) => set({ isLoading: loading }),

  loadSettings: async () => {
    try {
      const raw = await AsyncStorage.getItem(SETTINGS_KEY);
      if (raw) {
        const settings: AppSettings = JSON.parse(raw);
        set({ language: settings.language, themeMode: settings.themeMode });
      }
    } catch {}
    set({ isLoading: false });
  },

  addRecentSearch: async (from: Stop, to: Stop) => {
    const searches = [...get().recentSearches];
    // Remove existing duplicate
    const filtered = searches.filter(
      s => !(s.fromStop.id === from.id && s.toStop.id === to.id)
    );
    const newSearch: RecentSearch = {
      id: Date.now().toString(),
      fromStop: from,
      toStop: to,
      timestamp: Date.now(),
    };
    const updated = [newSearch, ...filtered].slice(0, MAX_RECENT_SEARCHES);
    set({ recentSearches: updated });
    await AsyncStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
  },

  loadRecentSearches: async () => {
    try {
      const raw = await AsyncStorage.getItem(RECENT_SEARCHES_KEY);
      if (raw) {
        set({ recentSearches: JSON.parse(raw) });
      }
    } catch {}
  },

  clearRecentSearches: async () => {
    set({ recentSearches: [] });
    await AsyncStorage.removeItem(RECENT_SEARCHES_KEY);
  },
}));

// ==================== ADMIN STORE ====================

interface AdminStore extends AdminState {
  login: (pin: string) => Promise<boolean>;
  logout: () => void;
  changePin: (currentPin: string, newPin: string) => Promise<boolean>;
  initPin: () => Promise<void>;
  checkAutoLock: () => void;
  refreshActivity: () => void;
}

const PIN_HASH_NAMESPACE = 'pothiq_admin_pin_v1';

async function hashPin(pin: string): Promise<string> {
  return Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    `${PIN_HASH_NAMESPACE}:${pin}`
  );
}

function isLegacyBcryptHash(hash: string): boolean {
  return hash.startsWith('$2a$') || hash.startsWith('$2b$') || hash.startsWith('$2y$');
}

export const useAdminStore = create<AdminStore>((set, get) => ({
  isAuthenticated: false,
  lastActivity: 0,
  failedAttempts: 0,
  lockUntil: null,

  initPin: async () => {
    try {
      const storedHash = await SecureStore.getItemAsync(ADMIN_PIN_KEY);
      if (!storedHash) {
        const hash = await hashPin(DEFAULT_PIN);
        await SecureStore.setItemAsync(ADMIN_PIN_KEY, hash);
      }
    } catch (e) {
      console.log('SecureStore not available, using AsyncStorage fallback');
      try {
        const storedHash = await AsyncStorage.getItem(ADMIN_PIN_KEY);
        if (!storedHash) {
          const hash = await hashPin(DEFAULT_PIN);
          await AsyncStorage.setItem(ADMIN_PIN_KEY, hash);
        }
      } catch {}
    }
  },

  login: async (pin: string) => {
    const { failedAttempts, lockUntil } = get();

    // Check lock
    if (lockUntil && Date.now() < lockUntil) {
      return false;
    }

    // Reset lock if expired
    if (lockUntil && Date.now() >= lockUntil) {
      set({ lockUntil: null, failedAttempts: 0 });
    }

    let storedHash: string | null = null;
    try {
      storedHash = await SecureStore.getItemAsync(ADMIN_PIN_KEY);
    } catch {
      storedHash = await AsyncStorage.getItem(ADMIN_PIN_KEY);
    }

    if (!storedHash) {
      // First time — set default
      const hash = await hashPin(DEFAULT_PIN);
      try {
        await SecureStore.setItemAsync(ADMIN_PIN_KEY, hash);
      } catch {
        await AsyncStorage.setItem(ADMIN_PIN_KEY, hash);
      }
      storedHash = hash;
    }

    let match = false;
    if (isLegacyBcryptHash(storedHash)) {
      const { compareSync } = await import('bcryptjs');
      match = compareSync(pin, storedHash);
    } else {
      const candidate = await hashPin(pin);
      match = candidate === storedHash;
    }

    if (match) {
      set({
        isAuthenticated: true,
        lastActivity: Date.now(),
        failedAttempts: 0,
        lockUntil: null,
      });
      return true;
    }

    const newAttempts = failedAttempts + 1;
    if (newAttempts >= MAX_FAILED_ATTEMPTS) {
      set({
        failedAttempts: newAttempts,
        lockUntil: Date.now() + LOCK_DURATION_MS,
      });
    } else {
      set({ failedAttempts: newAttempts });
    }
    return false;
  },

  logout: () => {
    set({ isAuthenticated: false, lastActivity: 0 });
  },

  changePin: async (currentPin: string, newPin: string) => {
    let storedHash: string | null = null;
    try {
      storedHash = await SecureStore.getItemAsync(ADMIN_PIN_KEY);
    } catch {
      storedHash = await AsyncStorage.getItem(ADMIN_PIN_KEY);
    }

    if (!storedHash) {
      return false;
    }

    let currentMatches = false;
    if (isLegacyBcryptHash(storedHash)) {
      const { compareSync } = await import('bcryptjs');
      currentMatches = compareSync(currentPin, storedHash);
    } else {
      const currentHash = await hashPin(currentPin);
      currentMatches = currentHash === storedHash;
    }

    if (!currentMatches) {
      return false;
    }

    const newHash = await hashPin(newPin);
    try {
      await SecureStore.setItemAsync(ADMIN_PIN_KEY, newHash);
    } catch {
      await AsyncStorage.setItem(ADMIN_PIN_KEY, newHash);
    }
    return true;
  },

  checkAutoLock: () => {
    const { isAuthenticated, lastActivity } = get();
    if (isAuthenticated && lastActivity && Date.now() - lastActivity > AUTO_LOCK_MS) {
      set({ isAuthenticated: false, lastActivity: 0 });
    }
  },

  refreshActivity: () => {
    if (get().isAuthenticated) {
      set({ lastActivity: Date.now() });
    }
  },
}));
