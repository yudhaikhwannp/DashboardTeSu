import fs from 'fs';

let content = fs.readFileSync('src/data/MasterData.ts', 'utf8');

// The field is "turunan", let's replace "turunan": with "bodBocCMC": and also append "bodBocCB":
content = content.replace(/"turunan":\s*\{/g, '"bodBocCMC": {\n        "today": 15,\n        "target": 18,\n        "percentTarget": 83\n      },\n      "bodBocCB": {');

// The area total getter has 'turunan:' instead of '"turunan":'. Wait, let's fix the getter.
content = content.replace(/turunan:\s*\{\s*today: 0,\s*target: 0,\s*percentTarget: 0\s*\}/g,
  'bodBocCMC: { today: 0, target: 0, percentTarget: 0 },\n      bodBocCB: { today: 0, target: 0, percentTarget: 0 }'
);

// We had already added bodBocCB in the previous script by replacing familyTree. Oh, wait, did we?
// Let's check line 176-186
fs.writeFileSync('src/data/MasterData.ts', content);
