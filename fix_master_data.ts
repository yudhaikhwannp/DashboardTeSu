import * as fs from 'fs';

let content = fs.readFileSync('src/data/MasterData.ts', 'utf8');

// Move transaction and prioritas out of ekosistem to before it.
content = content.replace(/"ekosistem":\s*\{\s*"bodBocSME":\s*\{\s*"today":\s*(\d+),\s*"target":\s*(\d+),\s*"percentTarget":\s*([\d\.]+)\s*\},([\s\S]*?)"prioritas":\s*\{([\s\S]*?ntb[\s\S]*?)\},/g, 
(match, today, target, pct, trans, prioritas) => {
  return `  ${trans}"prioritas": {${prioritas}},
    "ekosistem": {
      "bodBocSME": {
        "today": ${today},
        "target": ${target},
        "percentTarget": ${pct}
      },`;
});

fs.writeFileSync('src/data/MasterData.ts', content);
