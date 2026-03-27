// ============================================
// Pothiq AI — SQLite Database Setup & Migrations
// ============================================

import * as SQLite from 'expo-sqlite';
import { SEED_STOPS, SEED_BUSES, SEED_ROUTES } from './seedData';
import type { Stop, Bus, Route, SearchResult } from '../types';
import { parseStopsOrder, routeMatchesStops, getIntermediateStopIds } from '../utils';
import { FARE_PER_KM, MIN_FARE } from '../constants';

let db: SQLite.SQLiteDatabase | null = null;

export async function getDatabase(): Promise<SQLite.SQLiteDatabase> {
  if (db) return db;
  db = await SQLite.openDatabaseAsync('pothiq_ai.db');
  return db;
}

export async function initializeDatabase(): Promise<void> {
  const database = await getDatabase();

  // Create tables
  await database.execAsync(`
    PRAGMA journal_mode = WAL;

    CREATE TABLE IF NOT EXISTS stops (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name_en TEXT NOT NULL,
      name_bn TEXT NOT NULL,
      area TEXT NOT NULL,
      lat REAL DEFAULT 0,
      lng REAL DEFAULT 0,
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS buses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      operator TEXT NOT NULL,
      type TEXT NOT NULL,
      notes TEXT DEFAULT ''
    );

    CREATE TABLE IF NOT EXISTS routes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      bus_id INTEGER NOT NULL,
      start_stop_id INTEGER NOT NULL,
      end_stop_id INTEGER NOT NULL,
      fixed_fare REAL NOT NULL,
      distance_km REAL NOT NULL,
      stops_order TEXT NOT NULL DEFAULT '[]',
      direction TEXT NOT NULL DEFAULT 'both',
      is_active INTEGER NOT NULL DEFAULT 1,
      FOREIGN KEY (bus_id) REFERENCES buses(id),
      FOREIGN KEY (start_stop_id) REFERENCES stops(id),
      FOREIGN KEY (end_stop_id) REFERENCES stops(id)
    );
  `);

  // Check if data already seeded
  const result = await database.getFirstAsync<{ count: number }>('SELECT COUNT(*) as count FROM stops');
  if (result && result.count > 0) return;

  // Seed stops
  for (const stop of SEED_STOPS) {
    await database.runAsync(
      'INSERT INTO stops (name_en, name_bn, area, lat, lng) VALUES (?, ?, ?, ?, ?)',
      [stop.name_en, stop.name_bn, stop.area, stop.lat, stop.lng]
    );
  }

  // Seed buses
  for (const bus of SEED_BUSES) {
    await database.runAsync(
      'INSERT INTO buses (name, operator, type, notes) VALUES (?, ?, ?, ?)',
      [bus.name, bus.operator, bus.type, bus.notes]
    );
  }

  // Seed routes
  for (const route of SEED_ROUTES) {
    await database.runAsync(
      'INSERT INTO routes (bus_id, start_stop_id, end_stop_id, fixed_fare, distance_km, stops_order, direction, is_active) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [route.bus_id, route.start_stop_id, route.end_stop_id, route.fixed_fare, route.distance_km, route.stops_order, route.direction, route.is_active]
    );
  }
}

// ==================== STOP QUERIES ====================

export async function getAllStops(): Promise<Stop[]> {
  const database = await getDatabase();
  return database.getAllAsync<Stop>('SELECT * FROM stops ORDER BY name_en');
}

export async function getStopById(id: number): Promise<Stop | null> {
  const database = await getDatabase();
  return database.getFirstAsync<Stop>('SELECT * FROM stops WHERE id = ?', [id]);
}

export async function insertStop(stop: Omit<Stop, 'id' | 'created_at'>): Promise<number> {
  const database = await getDatabase();
  const result = await database.runAsync(
    'INSERT INTO stops (name_en, name_bn, area, lat, lng) VALUES (?, ?, ?, ?, ?)',
    [stop.name_en, stop.name_bn, stop.area, stop.lat || 0, stop.lng || 0]
  );
  return result.lastInsertRowId;
}

export async function updateStop(id: number, stop: Partial<Stop>): Promise<void> {
  const database = await getDatabase();
  const fields: string[] = [];
  const values: any[] = [];

  if (stop.name_en !== undefined) { fields.push('name_en = ?'); values.push(stop.name_en); }
  if (stop.name_bn !== undefined) { fields.push('name_bn = ?'); values.push(stop.name_bn); }
  if (stop.area !== undefined) { fields.push('area = ?'); values.push(stop.area); }
  if (stop.lat !== undefined) { fields.push('lat = ?'); values.push(stop.lat); }
  if (stop.lng !== undefined) { fields.push('lng = ?'); values.push(stop.lng); }

  if (fields.length > 0) {
    values.push(id);
    await database.runAsync(`UPDATE stops SET ${fields.join(', ')} WHERE id = ?`, values);
  }
}

export async function deleteStop(id: number): Promise<void> {
  const database = await getDatabase();
  await database.runAsync('DELETE FROM stops WHERE id = ?', [id]);
}

// ==================== BUS QUERIES ====================

export async function getAllBuses(): Promise<Bus[]> {
  const database = await getDatabase();
  return database.getAllAsync<Bus>('SELECT * FROM buses ORDER BY name');
}

export async function getBusById(id: number): Promise<Bus | null> {
  const database = await getDatabase();
  return database.getFirstAsync<Bus>('SELECT * FROM buses WHERE id = ?', [id]);
}

export async function insertBus(bus: Omit<Bus, 'id'>): Promise<number> {
  const database = await getDatabase();
  const result = await database.runAsync(
    'INSERT INTO buses (name, operator, type, notes) VALUES (?, ?, ?, ?)',
    [bus.name, bus.operator, bus.type, bus.notes || '']
  );
  return result.lastInsertRowId;
}

export async function updateBus(id: number, bus: Partial<Bus>): Promise<void> {
  const database = await getDatabase();
  const fields: string[] = [];
  const values: any[] = [];

  if (bus.name !== undefined) { fields.push('name = ?'); values.push(bus.name); }
  if (bus.operator !== undefined) { fields.push('operator = ?'); values.push(bus.operator); }
  if (bus.type !== undefined) { fields.push('type = ?'); values.push(bus.type); }
  if (bus.notes !== undefined) { fields.push('notes = ?'); values.push(bus.notes); }

  if (fields.length > 0) {
    values.push(id);
    await database.runAsync(`UPDATE buses SET ${fields.join(', ')} WHERE id = ?`, values);
  }
}

export async function deleteBus(id: number): Promise<void> {
  const database = await getDatabase();
  await database.runAsync('DELETE FROM buses WHERE id = ?', [id]);
}

// ==================== ROUTE QUERIES ====================

export async function getAllRoutes(): Promise<Route[]> {
  const database = await getDatabase();
  return database.getAllAsync<Route>('SELECT * FROM routes WHERE is_active = 1 ORDER BY id');
}

export async function getAllRoutesIncludingInactive(): Promise<Route[]> {
  const database = await getDatabase();
  return database.getAllAsync<Route>('SELECT * FROM routes ORDER BY id');
}

export async function getRouteById(id: number): Promise<Route | null> {
  const database = await getDatabase();
  return database.getFirstAsync<Route>('SELECT * FROM routes WHERE id = ?', [id]);
}

export async function getRoutesByBusId(busId: number): Promise<Route[]> {
  const database = await getDatabase();
  return database.getAllAsync<Route>('SELECT * FROM routes WHERE bus_id = ? AND is_active = 1', [busId]);
}

export async function getRoutesByStopId(stopId: number): Promise<Route[]> {
  const database = await getDatabase();
  const allRoutes = await database.getAllAsync<Route>('SELECT * FROM routes WHERE is_active = 1');
  return allRoutes.filter(route => {
    const stopsOrder = parseStopsOrder(route.stops_order);
    return stopsOrder.includes(stopId) || route.start_stop_id === stopId || route.end_stop_id === stopId;
  });
}

export async function insertRoute(route: Omit<Route, 'id'>): Promise<number> {
  const database = await getDatabase();
  const result = await database.runAsync(
    'INSERT INTO routes (bus_id, start_stop_id, end_stop_id, fixed_fare, distance_km, stops_order, direction, is_active) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [route.bus_id, route.start_stop_id, route.end_stop_id, route.fixed_fare, route.distance_km, route.stops_order, route.direction, route.is_active]
  );
  return result.lastInsertRowId;
}

export async function updateRoute(id: number, route: Partial<Route>): Promise<void> {
  const database = await getDatabase();
  const fields: string[] = [];
  const values: any[] = [];

  if (route.bus_id !== undefined) { fields.push('bus_id = ?'); values.push(route.bus_id); }
  if (route.start_stop_id !== undefined) { fields.push('start_stop_id = ?'); values.push(route.start_stop_id); }
  if (route.end_stop_id !== undefined) { fields.push('end_stop_id = ?'); values.push(route.end_stop_id); }
  if (route.fixed_fare !== undefined) { fields.push('fixed_fare = ?'); values.push(route.fixed_fare); }
  if (route.distance_km !== undefined) { fields.push('distance_km = ?'); values.push(route.distance_km); }
  if (route.stops_order !== undefined) { fields.push('stops_order = ?'); values.push(route.stops_order); }
  if (route.direction !== undefined) { fields.push('direction = ?'); values.push(route.direction); }
  if (route.is_active !== undefined) { fields.push('is_active = ?'); values.push(route.is_active); }

  if (fields.length > 0) {
    values.push(id);
    await database.runAsync(`UPDATE routes SET ${fields.join(', ')} WHERE id = ?`, values);
  }
}

export async function deleteRoute(id: number): Promise<void> {
  const database = await getDatabase();
  await database.runAsync('DELETE FROM routes WHERE id = ?', [id]);
}

// ==================== SEARCH QUERIES ====================

export async function searchRoutes(fromStopId: number, toStopId: number): Promise<SearchResult[]> {
  const database = await getDatabase();
  const allRoutes = await database.getAllAsync<Route>('SELECT * FROM routes WHERE is_active = 1');
  const results: SearchResult[] = [];

  for (const route of allRoutes) {
    const stopsOrder = parseStopsOrder(route.stops_order);

    // Check direct match (start and end stops)
    const isDirectMatch = route.start_stop_id === fromStopId && route.end_stop_id === toStopId;

    // Check intermediate match (from and to stops exist in the stops_order)
    const isIntermediateMatch = routeMatchesStops(stopsOrder, fromStopId, toStopId);

    if (isDirectMatch || isIntermediateMatch) {
      const bus = await database.getFirstAsync<Bus>('SELECT * FROM buses WHERE id = ?', [route.bus_id]);
      const startStop = await database.getFirstAsync<Stop>('SELECT * FROM stops WHERE id = ?', [fromStopId]);
      const endStop = await database.getFirstAsync<Stop>('SELECT * FROM stops WHERE id = ?', [toStopId]);

      if (bus && startStop && endStop) {
        const intermediateIds = getIntermediateStopIds(stopsOrder, fromStopId, toStopId);
        const intermediateStops: Stop[] = [];

        for (const sid of intermediateIds) {
          const s = await database.getFirstAsync<Stop>('SELECT * FROM stops WHERE id = ?', [sid]);
          if (s) intermediateStops.push(s);
        }

        // Dynamic segment fare: calculate based on number of stages (stops between + 1)
        const numStages = intermediateIds.length + 1;
        const segmentDistance = numStages * 1.5; // Estimated 1.5km per stop
        const distanceFare = Math.max(segmentDistance * FARE_PER_KM, MIN_FARE);

        results.push({
          route,
          bus,
          startStop,
          endStop,
          intermediateStops,
          fixedFare: Math.round(distanceFare), // Use calculated segment fare
          distanceFare: Math.round(distanceFare),
        });
      }
    }
  }

  return results;
}

// ==================== DASHBOARD QUERIES ====================

export async function getCounts(): Promise<{ routes: number; buses: number; stops: number }> {
  const database = await getDatabase();
  const routeCount = await database.getFirstAsync<{ count: number }>('SELECT COUNT(*) as count FROM routes');
  const busCount = await database.getFirstAsync<{ count: number }>('SELECT COUNT(*) as count FROM buses');
  const stopCount = await database.getFirstAsync<{ count: number }>('SELECT COUNT(*) as count FROM stops');
  return {
    routes: routeCount?.count || 0,
    buses: busCount?.count || 0,
    stops: stopCount?.count || 0,
  };
}

// ==================== EXPORT/IMPORT ====================

export async function exportAllData(): Promise<{ stops: Stop[]; buses: Bus[]; routes: Route[] }> {
  const database = await getDatabase();
  const stops = await database.getAllAsync<Stop>('SELECT * FROM stops');
  const buses = await database.getAllAsync<Bus>('SELECT * FROM buses');
  const routes = await database.getAllAsync<Route>('SELECT * FROM routes');
  return { stops, buses, routes };
}

export async function importAllData(data: { stops: Stop[]; buses: Bus[]; routes: Route[] }): Promise<void> {
  const database = await getDatabase();

  await database.execAsync('DELETE FROM routes');
  await database.execAsync('DELETE FROM buses');
  await database.execAsync('DELETE FROM stops');

  for (const stop of data.stops) {
    await database.runAsync(
      'INSERT INTO stops (id, name_en, name_bn, area, lat, lng, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [stop.id, stop.name_en, stop.name_bn, stop.area, stop.lat, stop.lng, stop.created_at]
    );
  }

  for (const bus of data.buses) {
    await database.runAsync(
      'INSERT INTO buses (id, name, operator, type, notes) VALUES (?, ?, ?, ?, ?)',
      [bus.id, bus.name, bus.operator, bus.type, bus.notes]
    );
  }

  for (const route of data.routes) {
    await database.runAsync(
      'INSERT INTO routes (id, bus_id, start_stop_id, end_stop_id, fixed_fare, distance_km, stops_order, direction, is_active) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [route.id, route.bus_id, route.start_stop_id, route.end_stop_id, route.fixed_fare, route.distance_km, route.stops_order, route.direction, route.is_active]
    );
  }
}

export async function bulkInsertStops(stops: Omit<Stop, 'id' | 'created_at'>[]): Promise<number> {
  const database = await getDatabase();
  let count = 0;
  for (const stop of stops) {
    await database.runAsync(
      'INSERT INTO stops (name_en, name_bn, area, lat, lng) VALUES (?, ?, ?, ?, ?)',
      [stop.name_en, stop.name_bn, stop.area, stop.lat || 0, stop.lng || 0]
    );
    count++;
  }
  return count;
}

export async function bulkInsertBuses(buses: Omit<Bus, 'id'>[]): Promise<number> {
  const database = await getDatabase();
  let count = 0;
  for (const bus of buses) {
    await database.runAsync(
      'INSERT INTO buses (name, operator, type, notes) VALUES (?, ?, ?, ?)',
      [bus.name, bus.operator, bus.type, bus.notes || '']
    );
    count++;
  }
  return count;
}

export async function bulkInsertRoutes(routes: Omit<Route, 'id'>[]): Promise<number> {
  const database = await getDatabase();
  let count = 0;
  for (const route of routes) {
    await database.runAsync(
      'INSERT INTO routes (bus_id, start_stop_id, end_stop_id, fixed_fare, distance_km, stops_order, direction, is_active) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [route.bus_id, route.start_stop_id, route.end_stop_id, route.fixed_fare, route.distance_km, route.stops_order, route.direction, route.is_active]
    );
    count++;
  }
  return count;
}
