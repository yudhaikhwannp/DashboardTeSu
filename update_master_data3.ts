import fs from 'fs';

let content = fs.readFileSync('src/data/MasterData.ts', 'utf8');

// Replace standard JSON keys
content = content.replace(/"turunan":/g, '"bodBocCMC":');
content = content.replace(/"familyTree":/g, '"bodBocCB": {\n        "today": 12,\n        "target": 15,\n        "percentTarget": 80.0\n      },\n      "familyTree":');

content = content.replace(/turunan:/g, 'bodBocCMC:');
content = content.replace(/familyTree:\s*\{\s*today/g, 'bodBocCB: { today: 0, target: 0, percentTarget: 0 },\n        familyTree: { today');

fs.writeFileSync('src/data/MasterData.ts', content);
