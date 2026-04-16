// ============================================
// Pothiq AI — SQLite Database Setup & Migrations
// ============================================

import * as SQLite from 'expo-sqlite';
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
    PRAGMA foreign_keys = ON;

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
      FOREIGN KEY (bus_id) REFERENCES buses(id) ON DELETE CASCADE,
      FOREIGN KEY (start_stop_id) REFERENCES stops(id),
      FOREIGN KEY (end_stop_id) REFERENCES stops(id)
    );

    CREATE TABLE IF NOT EXISTS fare_matrix (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      bus_id INTEGER NOT NULL,
      from_id INTEGER NOT NULL,
      to_id INTEGER NOT NULL,
      fare INTEGER NOT NULL,
      distance_km REAL DEFAULT 0,
      FOREIGN KEY (bus_id) REFERENCES buses(id) ON DELETE CASCADE,
      FOREIGN KEY (from_id) REFERENCES stops(id),
      FOREIGN KEY (to_id) REFERENCES stops(id)
    );
  `);

  const counts = await getCounts();
  if (counts.routes > 0 || counts.buses > 0 || counts.stops > 0) {
    return;
  }

  const { FARE_TEMPLATES } = require('./fareTemplates');
  
  // Track stops by normalized name to avoid duplicates
  const stopMap: Record<string, number> = {};
  const normalizeName = (name: string) => name.toLowerCase().replace(/[^a-z0-9]/g, '');

  for (const [busName, template] of Object.entries(FARE_TEMPLATES as any)) {
      // 1. Insert Bus
      const busResult = await database.runAsync(
        'INSERT INTO buses (name, operator, type, notes) VALUES (?, ?, ?, ?)',
        [busName, (template as any).operator, 'Local', 'Clean Template Data']
      );
      const busId = busResult.lastInsertRowId;

      // 2. Insert/Get Stops for this bus
      const stopIds: number[] = [];
      for (const stopObj of (template as any).stops) {
          const sName = stopObj.name_en;
          const norm = normalizeName(sName);
          if (!stopMap[norm]) {
             const res = await database.runAsync(
               'INSERT INTO stops (name_en, name_bn, area) VALUES (?, ?, ?)',
               [sName, stopObj.name_bn || sName, stopObj.area || 'Unknown']
             );
             stopMap[norm] = res.lastInsertRowId;
          }
          stopIds.push(stopMap[norm]);
      }

      // 3. Create main route record
      if (stopIds.length >= 2) {
        const startName = (template as any).stops[0].name_en;
        const endName = (template as any).stops[(template as any).stops.length - 1].name_en;
        const fullRouteKey = `${startName} - ${endName}`;
        
        const fullFareEntry = (template as any).fares.find((f: any) => f.from_to === fullRouteKey);
        const fullFare = fullFareEntry ? fullFareEntry.fare : ((template as any).fares[(template as any).fares.length - 1]?.fare || 10);
        const fullKm = fullFareEntry ? fullFareEntry.km : ((template as any).fares[(template as any).fares.length - 1]?.km || 1);

        await database.runAsync(
          'INSERT INTO routes (bus_id, start_stop_id, end_stop_id, fixed_fare, distance_km, stops_order, direction, is_active) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
          [busId, stopIds[0], stopIds[stopIds.length-1], fullFare, fullKm, JSON.stringify(stopIds), 'both', 1]
        );
      }

      // 4. Create fare matrix (Bidirectional Interchangeable)
      for (const fareEntry of (template as any).fares) {
          const parts = fareEntry.from_to.split(' - ');
          const fromId = stopMap[normalizeName(parts[0])];
          const toId = stopMap[normalizeName(parts[1])];
          
          if (fromId && toId) {
             // Forward
             await database.runAsync(
               'INSERT INTO fare_matrix (bus_id, from_id, to_id, fare, distance_km) VALUES (?, ?, ?, ?, ?)',
               [busId, fromId, toId, fareEntry.fare, fareEntry.km || 0]
             );
             // Backward (Interchangeable)
             await database.runAsync(
               'INSERT INTO fare_matrix (bus_id, from_id, to_id, fare, distance_km) VALUES (?, ?, ?, ?, ?)',
               [busId, toId, fromId, fareEntry.fare, fareEntry.km || 0]
             );
          }
      }
  }
}

// ... then search updated below

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
  const normalizedNameEn = stop.name_en.trim();
  const normalizedNameBn = stop.name_bn.trim();
  const normalizedArea = stop.area.trim();
  const result = await database.runAsync(
    'INSERT INTO stops (name_en, name_bn, area, lat, lng) VALUES (?, ?, ?, ?, ?)',
    [normalizedNameEn, normalizedNameBn, normalizedArea, stop.lat || 0, stop.lng || 0]
  );
  return result.lastInsertRowId;
}

export async function updateStop(id: number, stop: Partial<Stop>): Promise<void> {
  const database = await getDatabase();
  const fields: string[] = [];
  const values: any[] = [];

  if (stop.name_en !== undefined) { fields.push('name_en = ?'); values.push(stop.name_en.trim()); }
  if (stop.name_bn !== undefined) { fields.push('name_bn = ?'); values.push(stop.name_bn.trim()); }
  if (stop.area !== undefined) { fields.push('area = ?'); values.push(stop.area.trim()); }
  if (stop.lat !== undefined) { fields.push('lat = ?'); values.push(stop.lat); }
  if (stop.lng !== undefined) { fields.push('lng = ?'); values.push(stop.lng); }

  if (fields.length > 0) {
    values.push(id);
    await database.runAsync(`UPDATE stops SET ${fields.join(', ')} WHERE id = ?`, values);
  }
}

export async function deleteStop(id: number): Promise<void> {
  const database = await getDatabase();
  const allRoutes = await database.getAllAsync<Route>('SELECT id, stops_order FROM routes');
  for (const route of allRoutes) {
    const stopIds = parseStopsOrder(route.stops_order).map(Number);
    if (stopIds.includes(id)) {
      await database.runAsync('DELETE FROM routes WHERE id = ?', [route.id]);
    }
  }
  await database.runAsync('DELETE FROM fare_matrix WHERE from_id = ? OR to_id = ?', [id, id]);
  await database.runAsync('DELETE FROM routes WHERE start_stop_id = ? OR end_stop_id = ?', [id, id]);
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
  const normalizedName = bus.name.trim();
  const normalizedOperator = bus.operator.trim();
  const normalizedType = bus.type.trim();
  const result = await database.runAsync(
    'INSERT INTO buses (name, operator, type, notes) VALUES (?, ?, ?, ?)',
    [normalizedName, normalizedOperator, normalizedType, bus.notes?.trim() || '']
  );
  return result.lastInsertRowId;
}

export async function updateBus(id: number, bus: Partial<Bus>): Promise<void> {
  const database = await getDatabase();
  const fields: string[] = [];
  const values: any[] = [];

  if (bus.name !== undefined) { fields.push('name = ?'); values.push(bus.name.trim()); }
  if (bus.operator !== undefined) { fields.push('operator = ?'); values.push(bus.operator.trim()); }
  if (bus.type !== undefined) { fields.push('type = ?'); values.push(bus.type.trim()); }
  if (bus.notes !== undefined) { fields.push('notes = ?'); values.push(bus.notes.trim()); }

  if (fields.length > 0) {
    values.push(id);
    await database.runAsync(`UPDATE buses SET ${fields.join(', ')} WHERE id = ?`, values);
  }
}

export async function deleteBus(id: number): Promise<void> {
  const database = await getDatabase();
  await database.runAsync('DELETE FROM fare_matrix WHERE bus_id = ?', [id]);
  await database.runAsync('DELETE FROM routes WHERE bus_id = ?', [id]);
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

  const fId = Number(fromStopId);
  const tId = Number(toStopId);

  for (const route of allRoutes) {
    const stopsOrder = parseStopsOrder(route.stops_order);
    
    // Coerce IDs for robust comparison
    const rStartId = Number(route.start_stop_id);
    const rEndId = Number(route.end_stop_id);

    // Check direct match (start and end stops)
    const isDirectMatch = rStartId === fId && rEndId === tId;

    // Check intermediate match (from and to stops exist in the stops_order)
    const isIntermediateMatch = routeMatchesStops(stopsOrder, fId, tId);

    if (isDirectMatch || isIntermediateMatch) {
      const bus = await database.getFirstAsync<Bus>('SELECT * FROM buses WHERE id = ?', [route.bus_id]);
      const startStop = await database.getFirstAsync<Stop>('SELECT * FROM stops WHERE id = ?', [fId]);
      const endStop = await database.getFirstAsync<Stop>('SELECT * FROM stops WHERE id = ?', [tId]);

      if (bus && startStop && endStop) {
        const intermediateIds = getIntermediateStopIds(stopsOrder, fromStopId, toStopId);
        const intermediateStops: Stop[] = [];

        for (const sid of intermediateIds) {
          const s = await database.getFirstAsync<Stop>('SELECT * FROM stops WHERE id = ?', [sid]);
          if (s) intermediateStops.push(s);
        }

        // 1. Try to get official fare from matrix (directional interchangeable)
        const matrixEntry = await database.getFirstAsync<{ fare: number; distance_km: number }>(
          'SELECT fare, distance_km FROM fare_matrix WHERE bus_id = ? AND from_id = ? AND to_id = ?',
          [route.bus_id, fromStopId, toStopId]
        );

        let finalFare = matrixEntry ? matrixEntry.fare : 0;
        let finalDistance = matrixEntry ? matrixEntry.distance_km : 0;

        // 2. Fallback to stage-based calculation if matrix entry missing
        if (!finalFare) {
           const numStages = intermediateIds.length + 1;
           finalDistance = numStages * 1.5;
           finalFare = Math.max(10, Math.ceil(finalDistance * 2.45 / 5) * 5);
        }

        results.push({
          route,
          bus,
          startStop,
          endStop,
          intermediateStops,
          fixedFare: finalFare,
          distanceFare: finalFare,
          segmentDistance: finalDistance,
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
