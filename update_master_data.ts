import fs from 'fs';

const content = fs.readFileSync('src/data/MasterData.ts', 'utf8');

// Replace typing
let newContent = content.replace(
  /bodBoc: EkosistemMetrics; turunan: EkosistemMetrics;/g,
  'bodBocSME: EkosistemMetrics; bodBocCMC: EkosistemMetrics; bodBocCB: EkosistemMetrics;'
);

// We also need to replace the data block inside `sumberDataTerpadu`
newContent = newContent.replace(/"ekosistem":\s*\{([\s\S]*?)\}/g, (match, inner) => {
  if (inner.includes('"bodBoc"')) {
    return match
      .replace(/"bodBoc":/g, '"bodBocSME":')
      .replace(/"turunan":/g, '"bodBocCMC":')
      .replace(/"familyTree":\s*\{/g, '"bodBocCB": {\n          "today": 5,\n          "target": 10,\n          "percentTarget": 50\n        },\n        "familyTree": {');
  }
  return match;
});

// also for properties without double quotes
newContent = newContent.replace(/ekosistem:\s*\{([\s\S]*?)\}/g, (match, inner) => {
    if (inner.includes('bodBoc:')) {
      return match
        .replace(/bodBoc:/g, 'bodBocSME:')
        .replace(/turunan:/g, 'bodBocCMC:')
        .replace(/familyTree:\s*\{/g, 'bodBocCB: {\n        today: 5,\n        target: 10,\n        percentTarget: 50\n      },\n      familyTree: {');
    }
    return match;
  });

// fix getEkosistemAreaTotal default
newContent = newContent.replace(
  /bodBoc:\s*\{\s*today: 0,\s*target: 0,\s*percentTarget: 0\s*\},\s*turunan:\s*\{\s*today: 0,\s*target: 0,\s*percentTarget: 0\s*\}/g,
  'bodBocSME: { today: 0, target: 0, percentTarget: 0 },\n      bodBocCMC: { today: 0, target: 0, percentTarget: 0 },\n      bodBocCB: { today: 0, target: 0, percentTarget: 0 }'
);

newContent = newContent.replace(
  /bodBoc:\s*\{\s*today: 0,\s*target: 0,\s*percentTarget: 0\s*\},\s*turunan:\s*\{\s*today: 0,\s*target: 0,\s*percentTarget: 0\s*\}/g,
  'bodBocSME: { today: 0, target: 0, percentTarget: 0 },\nbodBocCMC: { today: 0, target: 0, percentTarget: 0 },\nbodBocCB: { today: 0, target: 0, percentTarget: 0 }'
);


fs.writeFileSync('src/data/MasterData.ts', newContent);
console.log('Update done');
