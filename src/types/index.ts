// ============================================
// Pothiq AI — TypeScript Type Definitions
// ============================================

export interface Stop {
  id: number;
  name_en: string;
  name_bn: string;
  area: string;
  lat: number;
  lng: number;
  created_at: string;
}

export interface Bus {
  id: number;
  name: string;
  operator: string;
  type: string;
  notes: string;
}

export interface Route {
  id: number;
  bus_id: number;
  start_stop_id: number;
  end_stop_id: number;
  fixed_fare: number;
  distance_km: number;
  stops_order: string; // JSON array of stop IDs
  direction: 'both' | 'up' | 'down';
  is_active: number; // 0 or 1
}

export interface SearchResult {
  route: Route;
  bus: Bus;
  startStop: Stop;
  endStop: Stop;
  intermediateStops: Stop[];
  fixedFare: number;
  distanceFare: number;
  segmentDistance: number;
}

export interface RecentSearch {
  id: string;
  fromStop: Stop;
  toStop: Stop;
  timestamp: number;
}

export interface AdminState {
  isAuthenticated: boolean;
  lastActivity: number;
  failedAttempts: number;
  lockUntil: number | null;
}

export type Language = 'en' | 'bn';
export type ThemeMode = 'light' | 'dark';

export interface AppSettings {
  language: Language;
  themeMode: ThemeMode;
}

export interface BackupData {
  version: string;
  exportedAt: string;
  stops: Stop[];
  buses: Bus[];
  routes: Route[];
}

// Navigation types
export type RootTabParamList = {
  HomeTab: undefined;
  RoutesTab: undefined;
  SOSTab: undefined;
  SettingsTab: undefined;
};

export type HomeStackParamList = {
  Home: undefined;
  SearchResults: { fromStopId: number; toStopId: number };
  RouteDetail: { routeId: number };
};

export type RoutesStackParamList = {
  RoutesBrowser: undefined;
  RouteDetail: { routeId: number };
  BusRoutes: { busId: number };
  StopRoutes: { stopId: number };
};

export type SettingsStackParamList = {
  SettingsMain: undefined;
  AdminLogin: undefined;
  AdminDashboard: undefined;
  ManageRoutes: undefined;
  ManageBuses: undefined;
  ManageStops: undefined;
  RouteForm: { routeId?: number };
  BusForm: { busId?: number };
  StopForm: { stopId?: number };
  BulkImport: undefined;
  BackupRestore: undefined;
  ChangePin: undefined;
};
