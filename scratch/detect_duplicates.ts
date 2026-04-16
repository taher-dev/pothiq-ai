
import { FARE_TEMPLATES } from '../src/db/fareTemplates';

function normalize(name: string) {
    return name.toLowerCase().replace(/[^a-z0-9]/g, '');
}

const allStops: any[] = [];
for (const bus of Object.values(FARE_TEMPLATES)) {
    for (const stop of bus.stops) {
        allStops.push(stop);
    }
}

const groups: Record<string, string[]> = {};
allStops.forEach(s => {
    const norm = normalize(s.name_en);
    if (!groups[norm]) groups[norm] = [];
    groups[norm].push(s.name_en);
});

console.log("Potential Duplicates (Normalized Groups):");
for (const [norm, names] of Object.entries(groups)) {
    const uniqueNames = [...new Set(names)];
    if (uniqueNames.length > 1) {
        console.log(`- ${norm}: [${uniqueNames.join(', ')}]`);
    } else {
        // Find things like "Airport" vs "Airport Road" ? No, normalize is better for exact but punctuation-diff
    }
}

// Check for sub-strings or similar names?
const uniqueNorms = Object.keys(groups);
console.log("\nChecking for similar names (e.g. Malibagh vs Malibaag Moor)...");
for (let i = 0; i < uniqueNorms.length; i++) {
    for (let j = i + 1; j < uniqueNorms.length; j++) {
        const n1 = uniqueNorms[i];
        const n2 = uniqueNorms[j];
        if (n1.includes(n2) || n2.includes(n1)) {
           // console.log(`- Potential match: ${groups[n1][0]} vs ${groups[n2][0]}`);
        }
    }
}
