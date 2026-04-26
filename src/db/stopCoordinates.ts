/**
 * Pothiq AI — Real Dhaka Bus Stop Coordinates
 * Accurate lat/lng for all known bus stops used in fare templates.
 * Keyed by normalized stop name (lowercase, alphanumeric only).
 */

export interface StopCoord {
  lat: number;
  lng: number;
}

const coords: Record<string, StopCoord> = {
  // ── Uttara / North Dhaka ──
  'diabarichourasta':     { lat: 23.8962, lng: 90.3860 },
  'mascotplaza':          { lat: 23.8738, lng: 90.3955 },
  'airport':              { lat: 23.8513, lng: 90.4068 },
  'rajlakshmi':           { lat: 23.8420, lng: 90.4010 },
  'abdullahpur':          { lat: 23.8780, lng: 90.3980 },
  'kamarpara':            { lat: 23.8890, lng: 90.3920 },

  // ── Kuril / Badda / Bhatara ──
  'kurilflyover':         { lat: 23.8230, lng: 90.4210 },
  'kuril':                { lat: 23.8245, lng: 90.4200 },
  'kurilbishwaroad':      { lat: 23.8195, lng: 90.4230 },
  'notunbazar':           { lat: 23.8085, lng: 90.4190 },
  'badda':                { lat: 23.7900, lng: 90.4260 },
  'shahjadpur':           { lat: 23.7960, lng: 90.4210 },
  'bashundhara':          { lat: 23.8130, lng: 90.4310 },

  // ── Rampura / Banasree ──
  'rampura':              { lat: 23.7630, lng: 90.4260 },
  'banasree':             { lat: 23.7570, lng: 90.4370 },

  // ── Khilgaon / Bashabo / Kamalapur ──
  'khilgaonflyover':      { lat: 23.7480, lng: 90.4300 },
  'bashabo':              { lat: 23.7445, lng: 90.4275 },
  'ttpara':               { lat: 23.7370, lng: 90.4210 },
  'kamalapur':            { lat: 23.7318, lng: 90.4265 },

  // ── Sayedabad / Jatrabari ──
  'sayedabad':            { lat: 23.7255, lng: 90.4210 },
  'jatrabari':            { lat: 23.7105, lng: 90.4320 },
  'postagola':            { lat: 23.6990, lng: 90.4350 },
  'signboard':            { lat: 23.7030, lng: 90.4350 },
  'matuail':              { lat: 23.6930, lng: 90.4390 },
  'rayerbag':             { lat: 23.7055, lng: 90.4355 },

  // ── Mirpur ──
  'chiriyakhana':         { lat: 23.8130, lng: 90.3520 },
  'mirpur2':              { lat: 23.8070, lng: 90.3570 },
  'mirpur1':              { lat: 23.7945, lng: 90.3530 },
  'mirpur10':             { lat: 23.8065, lng: 90.3688 },
  'mirpur12':             { lat: 23.8160, lng: 90.3790 },
  'pallabi':              { lat: 23.8192, lng: 90.3720 },
  'kalshi':               { lat: 23.8280, lng: 90.3820 },
  'kazipara':             { lat: 23.7930, lng: 90.3730 },
  'shewrapara':           { lat: 23.7870, lng: 90.3770 },
  'duairipara':           { lat: 23.8110, lng: 90.3500 },
  'ansarcamp':            { lat: 23.7985, lng: 90.3540 },
  'darussalam':           { lat: 23.7810, lng: 90.3560 },
  'technical':            { lat: 23.7805, lng: 90.3590 },

  // ── Kallyanpur / Shyamoli / Mohammadpur ──
  'kallyanpur':           { lat: 23.7830, lng: 90.3620 },
  'shyamoli':             { lat: 23.7740, lng: 90.3650 },
  'collegegate':          { lat: 23.7690, lng: 90.3590 },
  'asadgate':             { lat: 23.7640, lng: 90.3700 },
  'mohammadpur':          { lat: 23.7660, lng: 90.3590 },
  'bosila':               { lat: 23.7540, lng: 90.3410 },

  // ── Agargaon ──
  'agargaon':             { lat: 23.7780, lng: 90.3790 },

  // ── Farmgate / Kawran Bazar / Tejgaon ──
  'farmgate':             { lat: 23.7570, lng: 90.3870 },
  'kawranbazar':          { lat: 23.7510, lng: 90.3930 },
  'bijoysarani':          { lat: 23.7660, lng: 90.3910 },
  'shatrasta':            { lat: 23.7630, lng: 90.3960 },

  // ── Shahbagh / Ramna ──
  'shahbagh':             { lat: 23.7385, lng: 90.3960 },
  'banglamotor':          { lat: 23.7430, lng: 90.3950 },
  'pressclub':            { lat: 23.7280, lng: 90.4085 },

  // ── Dhanmondi ──
  'newmarket':            { lat: 23.7340, lng: 90.3830 },
  'kalabagan':            { lat: 23.7430, lng: 90.3780 },
  'dhanmondi32':          { lat: 23.7520, lng: 90.3760 },
  'sciencelab':           { lat: 23.7350, lng: 90.3860 },
  'azimpur':              { lat: 23.7282, lng: 90.3825 },

  // ── Paltan / Motijheel / Gulistan ──
  'paltan':               { lat: 23.7340, lng: 90.4120 },
  'motijheel':            { lat: 23.7290, lng: 90.4175 },
  'gulistan':             { lat: 23.7243, lng: 90.4130 },
  'stadium':              { lat: 23.7270, lng: 90.4150 },
  'ittefaq':              { lat: 23.7240, lng: 90.4200 },

  // ── Old Dhaka / Sadarghat ──
  'sadarghat':            { lat: 23.7085, lng: 90.4070 },
  'nayabazar':            { lat: 23.7140, lng: 90.4060 },
  'golapshah mazar':      { lat: 23.7200, lng: 90.4100 },
  'golapshahmazar':       { lat: 23.7200, lng: 90.4100 },
  'babubazar':            { lat: 23.7130, lng: 90.4060 },

  // ── Mohakhali / Gulshan / Banani ──
  'mohakhali':            { lat: 23.7780, lng: 90.4050 },
  'gulshan1':             { lat: 23.7810, lng: 90.4165 },
  'banani':               { lat: 23.7940, lng: 90.4030 },

  // ── Mogbazar / Malibagh / Mouchak ──
  'mogbazar':             { lat: 23.7490, lng: 90.4060 },
  'malibagh':             { lat: 23.7490, lng: 90.4145 },
  'mouchak':              { lat: 23.7470, lng: 90.4120 },

  // ── Tongi / Gazipur ──
  'tongibazar':           { lat: 23.8860, lng: 90.4080 },
  'cheragali':            { lat: 23.9100, lng: 90.4070 },
  'boardbazar':           { lat: 23.9350, lng: 90.4070 },
  'gazipurchourasta':     { lat: 23.9900, lng: 90.4060 },

  // ── Gabtoli / Savar ──
  'gabtoli':              { lat: 23.7700, lng: 90.3440 },
  'savar':                { lat: 23.8440, lng: 90.2660 },

  // ── Demra ──
  'demrastaffquarter':    { lat: 23.7250, lng: 90.4750 },

  // ── Munshiganj ──
  'maowa':                { lat: 23.4600, lng: 90.3960 },
};

/**
 * Look up real coordinates for a stop by its English name.
 * Returns { lat, lng } or null if no match found.
 */
export function getStopCoordinates(nameEn: string): StopCoord | null {
  const normalized = nameEn.toLowerCase().replace(/[^a-z0-9]/g, '');
  return coords[normalized] ?? null;
}
