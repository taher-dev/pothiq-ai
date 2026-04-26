// ============================================
// Pothiq AI — Route Map (Leaflet via WebView)
// Clean implementation using OpenStreetMap tiles
// ============================================

import React, { memo, useEffect, useMemo, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { Card, Text } from 'react-native-paper';
import * as Location from 'expo-location';
import type { Stop } from '../types';
import { getStopCoordinates } from '../db/stopCoordinates';

// ── Types ──────────────────────────────────────

type LatLng = { latitude: number; longitude: number };

interface RouteMapProps {
  stops: Stop[];
  distanceKm: number;
  operatingHours: string;
  serviceType: string;
  routeKey: string;
}

// ── Constants ──────────────────────────────────

const DHAKA_CENTER: LatLng = { latitude: 23.8103, longitude: 90.4125 };

const MAP_COLORS = {
  routePrimary: '#2E7D32',
  routeOutline: '#1B5E2066',
  originFill: '#4CAF50',
  originBorder: '#2E7D32',
  destFill: '#F44336',
  destBorder: '#C62828',
  intermediateFill: '#FF9800',
  intermediateBorder: '#EF6C00',
  userFill: '#2196F3',
  userBorder: '#1565C0',
};

// ── Helpers ────────────────────────────────────

function isValidCoord(stop: Stop): boolean {
  return (
    Number.isFinite(stop.lat) &&
    Number.isFinite(stop.lng) &&
    Math.abs(stop.lat) > 0.01 &&
    Math.abs(stop.lng) > 0.01
  );
}

function normalizeStops(stops: Stop[]): Stop[] {
  if (stops.every(isValidCoord)) return stops;
  return stops.map(s => {
    if (isValidCoord(s)) return s;
    // Look up real coordinates by stop name
    const coord = getStopCoordinates(s.name_en);
    return {
      ...s,
      lat: coord?.lat ?? DHAKA_CENTER.latitude,
      lng: coord?.lng ?? DHAKA_CENTER.longitude,
    };
  });
}

// ── Leaflet HTML builder ───────────────────────

interface MapData {
  origin: { lat: number; lng: number; name: string; area: string };
  destination: { lat: number; lng: number; name: string; area: string };
  intermediates: { lat: number; lng: number; name: string; area: string }[];
  routeCoords: [number, number][];
  userLocation: LatLng | null;
}

function buildMapHtml(data: MapData): string {
  const { origin, destination, intermediates, routeCoords, userLocation } = data;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    html, body, #map { width: 100%; height: 100%; }
    body { background: #f5f5f5; }

    /* Custom popup styling */
    .leaflet-popup-content-wrapper {
      border-radius: 10px;
      box-shadow: 0 4px 16px rgba(0,0,0,0.15);
      padding: 0;
    }
    .leaflet-popup-content {
      margin: 10px 14px;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }
    .leaflet-popup-content .popup-name {
      font-weight: 700;
      font-size: 13px;
      color: #1a1a1a;
      margin-bottom: 2px;
    }
    .leaflet-popup-content .popup-area {
      font-size: 11px;
      color: #666;
    }
    .leaflet-popup-content .popup-badge {
      display: inline-block;
      font-size: 9px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      padding: 2px 6px;
      border-radius: 4px;
      margin-bottom: 4px;
    }
    .popup-badge.origin { background: #E8F5E9; color: #2E7D32; }
    .popup-badge.dest   { background: #FFEBEE; color: #C62828; }
    .popup-badge.stop   { background: #FFF3E0; color: #EF6C00; }
  </style>
</head>
<body>
  <div id="map"></div>
  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
  <script>
    (function() {
      // ── Data ──
      var origin = ${JSON.stringify(origin)};
      var dest   = ${JSON.stringify(destination)};
      var intermediates = ${JSON.stringify(intermediates)};
      var routeCoords   = ${JSON.stringify(routeCoords)};
      var userLoc = ${JSON.stringify(userLocation)};

      // ── Map setup ──
      var map = L.map('map', {
        zoomControl: true,
        attributionControl: false
      });

      // Use an attractive tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
      }).addTo(map);

      // ── Attribution (compact) ──
      L.control.attribution({ prefix: false, position: 'bottomright' })
        .addAttribution('© <a href="https://osm.org">OSM</a>')
        .addTo(map);

      // ── Helper: create circle marker icon ──
      function circleIcon(fillColor, borderColor, radius) {
        radius = radius || 8;
        var size = radius * 2 + 4;
        return L.divIcon({
          className: '',
          iconSize: [size, size],
          iconAnchor: [size / 2, size / 2],
          html: '<div style="'
            + 'width:' + (radius * 2) + 'px;'
            + 'height:' + (radius * 2) + 'px;'
            + 'border-radius:50%;'
            + 'background:' + fillColor + ';'
            + 'border:2.5px solid ' + borderColor + ';'
            + 'box-shadow:0 2px 6px rgba(0,0,0,0.25);'
            + '"></div>'
        });
      }

      // ── Popup builder ──
      function makePopup(name, area, type) {
        var badgeClass = type === 'origin' ? 'origin' : type === 'dest' ? 'dest' : 'stop';
        var label = type === 'origin' ? 'ORIGIN' : type === 'dest' ? 'DESTINATION' : 'STOP';
        return '<div>'
          + '<span class="popup-badge ' + badgeClass + '">' + label + '</span>'
          + '<div class="popup-name">' + name + '</div>'
          + '<div class="popup-area">' + area + '</div>'
          + '</div>';
      }

      // ── Route polyline ──
      if (routeCoords.length >= 2) {
        // Shadow line
        L.polyline(routeCoords, {
          color: '${MAP_COLORS.routeOutline}',
          weight: 8,
          lineCap: 'round',
          lineJoin: 'round',
        }).addTo(map);

        // Main line
        L.polyline(routeCoords, {
          color: '${MAP_COLORS.routePrimary}',
          weight: 4,
          lineCap: 'round',
          lineJoin: 'round',
        }).addTo(map);
      }

      // ── Intermediate markers ──
      intermediates.forEach(function(s) {
        L.marker([s.lat, s.lng], {
          icon: circleIcon('${MAP_COLORS.intermediateFill}', '${MAP_COLORS.intermediateBorder}', 5),
          zIndexOffset: 100,
        })
        .bindPopup(makePopup(s.name, s.area, 'stop'))
        .addTo(map);
      });

      // ── Origin marker ──
      L.marker([origin.lat, origin.lng], {
        icon: circleIcon('${MAP_COLORS.originFill}', '${MAP_COLORS.originBorder}', 9),
        zIndexOffset: 300,
      })
      .bindPopup(makePopup(origin.name, origin.area, 'origin'))
      .addTo(map);

      // ── Destination marker ──
      L.marker([dest.lat, dest.lng], {
        icon: circleIcon('${MAP_COLORS.destFill}', '${MAP_COLORS.destBorder}', 9),
        zIndexOffset: 300,
      })
      .bindPopup(makePopup(dest.name, dest.area, 'dest'))
      .addTo(map);

      // ── User location ──
      if (userLoc) {
        L.marker([userLoc.latitude, userLoc.longitude], {
          icon: circleIcon('${MAP_COLORS.userFill}', '${MAP_COLORS.userBorder}', 7),
          zIndexOffset: 200,
        })
        .bindPopup('<div class="popup-name">📍 You are here</div>')
        .addTo(map);
      }

      // ── Fit bounds ──
      if (routeCoords.length >= 2) {
        map.fitBounds(L.latLngBounds(routeCoords), { padding: [24, 24], maxZoom: 15 });
      } else {
        map.setView([origin.lat, origin.lng], 14);
      }
    })();
  </script>
</body>
</html>`;
}

// ── Component ──────────────────────────────────

function RouteMapComponent({ stops, distanceKm, operatingHours, serviceType, routeKey }: RouteMapProps) {
  const [userLocation, setUserLocation] = useState<LatLng | null>(null);

  const normalizedStops = useMemo(() => normalizeStops(stops), [stops]);

  // Fetch user location once
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') return;
        const pos = await Location.getCurrentPositionAsync({});
        if (mounted) {
          setUserLocation({ latitude: pos.coords.latitude, longitude: pos.coords.longitude });
        }
      } catch {}
    })();
    return () => { mounted = false; };
  }, []);

  const durationMin = Math.max(6, Math.round((distanceKm / 18) * 60));

  // Don't render if we have fewer than 2 stops
  if (normalizedStops.length < 2) return null;

  const origin = normalizedStops[0];
  const destination = normalizedStops[normalizedStops.length - 1];
  const intermediates = normalizedStops.length > 2 ? normalizedStops.slice(1, -1) : [];

  const mapData: MapData = {
    origin: { lat: origin.lat, lng: origin.lng, name: origin.name_en, area: origin.area },
    destination: { lat: destination.lat, lng: destination.lng, name: destination.name_en, area: destination.area },
    intermediates: intermediates.map(s => ({ lat: s.lat, lng: s.lng, name: s.name_en, area: s.area })),
    routeCoords: normalizedStops.map(s => [s.lat, s.lng] as [number, number]),
    userLocation,
  };

  const html = buildMapHtml(mapData);

  return (
    <Card style={styles.card} mode="elevated">
      <Card.Content>
        <Text style={styles.title}>🗺️ Route Visualization</Text>

        <View style={styles.mapContainer}>
          <WebView
            originWhitelist={['*']}
            source={{ html }}
            style={styles.map}
            javaScriptEnabled
            domStorageEnabled
            mixedContentMode="always"
            setSupportMultipleWindows={false}
            scrollEnabled={false}
            nestedScrollEnabled={false}
          />
        </View>

        {/* Route summary pills */}
        <View style={styles.pillRow}>
          <View style={[styles.pill, styles.pillGreen]}>
            <Text style={styles.pillText}>🕒 ~{durationMin} min</Text>
          </View>
          <View style={[styles.pill, styles.pillBlue]}>
            <Text style={[styles.pillText, styles.pillTextBlue]}>📏 {distanceKm.toFixed(1)} km</Text>
          </View>
          <View style={[styles.pill, styles.pillOrange]}>
            <Text style={[styles.pillText, styles.pillTextOrange]}>📍 {normalizedStops.length} stops</Text>
          </View>
        </View>

        {/* Meta info */}
        <View style={styles.metaRow}>
          <Text style={styles.metaText}>Service: {serviceType}</Text>
          <Text style={styles.metaText}>Hours: {operatingHours}</Text>
        </View>
      </Card.Content>
    </Card>
  );
}

export const RouteMap = memo(RouteMapComponent);

// ── Styles ─────────────────────────────────────

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 10,
  },
  mapContainer: {
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
  },
  map: {
    width: '100%',
    height: 300,
    backgroundColor: '#f5f5f5',
  },
  pillRow: {
    marginTop: 12,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  pill: {
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 14,
  },
  pillGreen: {
    backgroundColor: '#E8F5E9',
  },
  pillBlue: {
    backgroundColor: '#E3F2FD',
  },
  pillOrange: {
    backgroundColor: '#FFF3E0',
  },
  pillText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#2E7D32',
  },
  pillTextBlue: {
    color: '#1565C0',
  },
  pillTextOrange: {
    color: '#EF6C00',
  },
  metaRow: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 6,
  },
  metaText: {
    fontSize: 12,
    color: '#5A6169',
    fontWeight: '600',
  },
});
