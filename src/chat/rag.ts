import Fuse from 'fuse.js';
import * as db from '../db/database';
import { formatFare, getStopName, parseStopsOrder } from '../utils';
import type { Bus, Route, SearchResult, Stop } from '../types';

type Lang = 'en' | 'bn';

interface KnowledgeBase {
  stops: Stop[];
  buses: Bus[];
  routes: Route[];
  stopFuse: Fuse<Stop>;
  busFuse: Fuse<Bus>;
  stopById: Record<number, Stop>;
  busById: Record<number, Bus>;
}

let kbPromise: Promise<KnowledgeBase> | null = null;
let kbBuiltAt = 0;
const KB_TTL_MS = 60 * 1000;

function normalize(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9\u0980-\u09ff\s]/g, ' ').replace(/\s+/g, ' ').trim();
}

function createStopFuse(stops: Stop[]) {
  return new Fuse(stops, {
    keys: ['name_en', 'name_bn', 'area'],
    threshold: 0.35,
    distance: 120,
    minMatchCharLength: 2,
  });
}

function createBusFuse(buses: Bus[]) {
  return new Fuse(buses, {
    keys: ['name', 'operator', 'type'],
    threshold: 0.35,
    distance: 120,
    minMatchCharLength: 2,
  });
}

async function buildKnowledgeBase(): Promise<KnowledgeBase> {
  const [stops, buses, routes] = await Promise.all([
    db.getAllStops(),
    db.getAllBuses(),
    db.getAllRoutesIncludingInactive(),
  ]);
  const stopById: Record<number, Stop> = {};
  const busById: Record<number, Bus> = {};
  stops.forEach(s => { stopById[s.id] = s; });
  buses.forEach(b => { busById[b.id] = b; });
  return {
    stops,
    buses,
    routes,
    stopFuse: createStopFuse(stops),
    busFuse: createBusFuse(buses),
    stopById,
    busById,
  };
}

async function getKnowledgeBase() {
  const now = Date.now();
  if (!kbPromise || now - kbBuiltAt > KB_TTL_MS) {
    kbPromise = buildKnowledgeBase();
    kbBuiltAt = now;
  }
  return kbPromise;
}

function findStopsFromPattern(query: string, kb: KnowledgeBase): [Stop | null, Stop | null] {
  const cleaned = normalize(query);
  const m = cleaned.match(/(?:from|frm)\s+(.+?)\s+(?:to|2)\s+(.+)/) || cleaned.match(/(.+?)\s+(?:to|2)\s+(.+)/);
  if (!m) return [null, null];

  const fromText = m[1].trim();
  const toText = m[2].trim();
  const from = kb.stopFuse.search(fromText, { limit: 1 })[0]?.item ?? null;
  const to = kb.stopFuse.search(toText, { limit: 1 })[0]?.item ?? null;
  return [from, to];
}

function topStopMatches(query: string, kb: KnowledgeBase, limit = 3): Stop[] {
  return kb.stopFuse.search(normalize(query), { limit }).map(m => m.item);
}

function topBusMatches(query: string, kb: KnowledgeBase, limit = 3): Bus[] {
  return kb.busFuse.search(normalize(query), { limit }).map(m => m.item);
}

function formatRouteAnswer(results: SearchResult[], lang: Lang): string {
  if (!results.length) {
    return lang === 'bn'
      ? 'এই রুটে সরাসরি বাস পাওয়া যায়নি। কাছাকাছি স্টপের বানান যাচাই করে আবার চেষ্টা করুন।'
      : 'No direct route found for those stops. Please check the stop spelling and try again.';
  }

  const top = results.slice(0, 3).map((r, idx) => {
    const via = r.intermediateStops.slice(0, 3).map(s => getStopName(s, lang)).join(', ');
    const viaText = via ? (lang === 'bn' ? ` | পথে: ${via}` : ` | via: ${via}`) : '';
    return `${idx + 1}. ${r.bus.name} (${getStopName(r.startStop, lang)} → ${getStopName(r.endStop, lang)}) | ${lang === 'bn' ? 'ভাড়া' : 'fare'} ${formatFare(r.fixedFare)}${viaText}`;
  });

  return (lang === 'bn' ? 'সবচেয়ে প্রাসঙ্গিক রুটগুলো:\n' : 'Most relevant routes:\n') + top.join('\n');
}

export async function answerTransitQuery(query: string, lang: Lang): Promise<string> {
  const q = normalize(query);
  const kb = await getKnowledgeBase();

  if (!q) {
    return lang === 'bn'
      ? 'আপনি কোথা থেকে কোথায় যেতে চান তা লিখুন। উদাহরণ: from Farmgate to Motijheel'
      : 'Tell me your source and destination. Example: from Farmgate to Motijheel';
  }

  const hasTimingIntent = /\b(time|timing|schedule|when|last bus|first bus)\b/.test(q);
  if (hasTimingIntent) {
    return lang === 'bn'
      ? 'বর্তমান ডেটাসেটে নির্দিষ্ট বাস সময়সূচি নেই। তবে আমি রুট, স্টপ এবং ভাড়ার তথ্য দিতে পারি।'
      : 'Exact bus timing data is not available in the current dataset yet. I can still provide route, stop, and fare information.';
  }

  const [fromStop, toStop] = findStopsFromPattern(q, kb);
  if (fromStop && toStop) {
    const results = await db.searchRoutes(fromStop.id, toStop.id);
    return formatRouteAnswer(results, lang);
  }

  if (/\b(fare|price|cost|ভাড়া)\b/.test(q)) {
    if (fromStop && toStop) {
      const results = await db.searchRoutes(fromStop.id, toStop.id);
      if (results.length) {
        const best = results[0];
        return lang === 'bn'
          ? `${best.bus.name} বাসে ${getStopName(fromStop, lang)} থেকে ${getStopName(toStop, lang)} ভাড়া ${formatFare(best.fixedFare)}।`
          : `Fare from ${getStopName(fromStop, lang)} to ${getStopName(toStop, lang)} on ${best.bus.name} is ${formatFare(best.fixedFare)}.`;
      }
    }

    const buses = topBusMatches(q, kb, 2);
    if (buses.length) {
      const routes = kb.routes.filter(r => r.bus_id === buses[0].id && r.is_active === 1);
      if (routes.length) {
        const cheapest = routes.reduce((min, r) => r.fixed_fare < min.fixed_fare ? r : min, routes[0]);
        return lang === 'bn'
          ? `${buses[0].name} বাসে রুটভেদে ভাড়া পরিবর্তন হয়। উদাহরণ: ${formatFare(cheapest.fixed_fare)} থেকে শুরু।`
          : `Fare on ${buses[0].name} varies by route segment. Example fares start around ${formatFare(cheapest.fixed_fare)}.`;
      }
    }
  }

  if (/\b(bus|route|go|reach|যাব|কীভাবে|বাস)\b/.test(q)) {
    const matchedStops = topStopMatches(q, kb, 2);
    if (matchedStops.length === 2 && matchedStops[0].id !== matchedStops[1].id) {
      const results = await db.searchRoutes(matchedStops[0].id, matchedStops[1].id);
      return formatRouteAnswer(results, lang);
    }
  }

  const nearbyStops = topStopMatches(q, kb, 3);
  if (nearbyStops.length) {
    const stop = nearbyStops[0];
    const stopRoutes = await db.getRoutesByStopId(stop.id);
    const busNames = stopRoutes
      .map(r => kb.busById[r.bus_id]?.name)
      .filter(Boolean)
      .slice(0, 5)
      .join(', ');
    if (busNames) {
      return lang === 'bn'
        ? `${getStopName(stop, lang)} স্টপে চলাচলকারী বাস: ${busNames}`
        : `Buses serving ${getStopName(stop, lang)}: ${busNames}`;
    }
  }

  const buses = topBusMatches(q, kb, 1);
  if (buses.length) {
    const bus = buses[0];
    const busRoutes = kb.routes.filter(r => r.bus_id === bus.id && r.is_active === 1);
    if (busRoutes.length) {
      const r = busRoutes[0];
      const start = kb.stopById[r.start_stop_id];
      const end = kb.stopById[r.end_stop_id];
      const stopsCount = parseStopsOrder(r.stops_order).length;
      return lang === 'bn'
        ? `${bus.name} (${bus.operator}) সাধারণত ${start ? getStopName(start, lang) : 'শুরু'} থেকে ${end ? getStopName(end, lang) : 'শেষ'} রুটে চলে। মোট স্টপ ~${stopsCount}।`
        : `${bus.name} (${bus.operator}) usually runs from ${start ? getStopName(start, lang) : 'start'} to ${end ? getStopName(end, lang) : 'end'} with about ${stopsCount} stops.`;
    }
  }

  return lang === 'bn'
    ? 'আমি আপনার প্রশ্নের জন্য নির্ভরযোগ্য ডেটা খুঁজে পাইনি। স্টপ/বাসের নাম আরেকটু নির্দিষ্ট করে লিখুন।'
    : "I couldn't find reliable data for that query. Please provide a more specific stop or bus name.";
}

