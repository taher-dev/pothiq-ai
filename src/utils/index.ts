// ============================================
// Pothiq AI — Utility Functions
// ============================================

import { FARE_PER_KM, MIN_FARE } from '../constants';
import Fuse from 'fuse.js';
import type { Stop, SearchResult } from '../types';

/** Calculate distance-based fare using official Government rates */
export function calcDistanceFare(distanceKm: number): number {
  const fare = distanceKm * FARE_PER_KM;
  // Official minimum fare is 10 BDT
  return Math.max(Math.ceil(fare / 2) * 2, MIN_FARE); 
}

/** Calculate fare between two specific points on a route */
export function calculateStoppageFare(numStages: number): number {
  // Average distance between Dhaka bus stages is approx 1.5km
  const estimatedDistance = numStages * 1.5;
  return calcDistanceFare(estimatedDistance);
}

/** Format fare as BDT string */
export function formatFare(amount: number): string {
  return `৳${Math.round(amount)}`;
}

/** Format distance */
export function formatDistance(km: number): string {
  return `${km.toFixed(1)} km`;
}

/** Get stop name based on language */
export function getStopName(stop: Stop, lang: 'en' | 'bn'): string {
  if (lang === 'bn' && stop.name_bn) return stop.name_bn;
  return stop.name_en;
}

/** Create fuzzy search instance for stops */
export function createStopFuse(stops: Stop[], lang: 'en' | 'bn'): Fuse<Stop> {
  const keys = lang === 'bn'
    ? ['name_bn', 'name_en', 'area']
    : ['name_en', 'name_bn', 'area'];

  return new Fuse(stops, {
    keys,
    threshold: 0.4,
    distance: 100,
    minMatchCharLength: 1,
  });
}

/** Search stops with fuzzy matching */
export function fuzzySearchStops(fuse: Fuse<Stop>, query: string): Stop[] {
  if (!query.trim()) return [];
  return fuse.search(query).map(r => r.item).slice(0, 10);
}

/** Generate unique ID */
export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

/** Parse stops_order JSON safely */
export function parseStopsOrder(stopsOrder: string): number[] {
  try {
    const parsed = JSON.parse(stopsOrder);
    if (Array.isArray(parsed)) return parsed;
    return [];
  } catch {
    return [];
  }
}

/** Check if a route passes through start and end stops (including intermediate) */
export function routeMatchesStops(
  stopsOrder: number[],
  startStopId: number,
  endStopId: number
): boolean {
  const startIdx = stopsOrder.indexOf(startStopId);
  const endIdx = stopsOrder.indexOf(endStopId);
  // Route must contain both stops and start must come before end
  return startIdx !== -1 && endIdx !== -1 && startIdx < endIdx;
}

/** Get intermediate stops between start and end in a route */
export function getIntermediateStopIds(
  stopsOrder: number[],
  startStopId: number,
  endStopId: number
): number[] {
  const startIdx = stopsOrder.indexOf(startStopId);
  const endIdx = stopsOrder.indexOf(endStopId);
  if (startIdx === -1 || endIdx === -1 || startIdx >= endIdx) return [];
  return stopsOrder.slice(startIdx + 1, endIdx);
}

/** Validate CSV data for stops */
export function validateStopCsv(data: any[]): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  const required = ['name_en', 'name_bn', 'area'];

  data.forEach((row, i) => {
    required.forEach(field => {
      if (!row[field]) errors.push(`Row ${i + 1}: missing ${field}`);
    });
  });

  return { valid: errors.length === 0, errors };
}

/** Validate CSV data for buses */
export function validateBusCsv(data: any[]): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  const required = ['name', 'operator', 'type'];

  data.forEach((row, i) => {
    required.forEach(field => {
      if (!row[field]) errors.push(`Row ${i + 1}: missing ${field}`);
    });
  });

  return { valid: errors.length === 0, errors };
}

/** Validate CSV data for routes */
export function validateRouteCsv(data: any[]): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  const required = ['bus_id', 'start_stop_id', 'end_stop_id', 'fixed_fare', 'distance_km'];

  data.forEach((row, i) => {
    required.forEach(field => {
      if (!row[field]) errors.push(`Row ${i + 1}: missing ${field}`);
    });
  });

  return { valid: errors.length === 0, errors };
}
