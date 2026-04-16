
const { FARE_TEMPLATES } = require('./src/db/fareTemplates');

function normalize(name) {
    return name.toLowerCase().replace(/[^a-z0-9]/g, '');
}

const allStops = [];
for (const bus of Object.values(FARE_TEMPLATES)) {
    for (const stop of bus.stops) {
        allStops.push(stop);
    }
}

const groups = {};
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
    }
}
