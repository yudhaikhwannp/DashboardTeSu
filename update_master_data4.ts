import * as fs from 'fs';

let content = fs.readFileSync('src/data/MasterData.ts', 'utf8');

// We need to add 'transaction' and 'prioritas' and extend 'kredit.lagging' and 'kredit.leading'.
// Also need to add type definitions at the top.

const typeReplacements = `export type SummaryLaggingMetric = { today: number; target: number; percentTarget: number; wtd?: number; mtd?: number; ytd?: number; yoy?: number; };
export type SummaryTransaction = {
  newEDC: LeadingMetric;
  svEDC: FundingLagging;
  newLVM: LeadingMetric;
  svLvmMTD: FundingLagging;
  newLivinUreg: LeadingMetric;
  newUregKopra: LeadingMetric;
};
export type SummaryPrioritas = {
  ntp: LeadingMetric;
  ntb: LeadingMetric;
};
`;

if (!content.includes('SummaryTransaction')) {
  // Add to top after imports
  content = content.replace(/(export type Branch =.*?)/, `${typeReplacements}\n$1`);
}

// Expand UnifiedBranch
if (!content.includes('transaction: SummaryTransaction')) {
  content = content.replace(/ekosistem: EkosistemBranch\["ekosistem"\];/,
    `ekosistem: EkosistemBranch["ekosistem"];
  transaction: SummaryTransaction;
  prioritas: SummaryPrioritas;`
  );
  
  // Extend kredit types
  content = content.replace(/lagging: \{ sme: KreditMetrics; cl: KreditMetrics; ksm: KreditMetrics; cc: KreditMetrics; micro: KreditMetrics; \};/, 
    `lagging: { sme: KreditMetrics; smeReferral: KreditMetrics; cl: KreditMetrics; ksm: KreditMetrics; cc: KreditMetrics; micro: KreditMetrics; clBookingRegular: KreditMetrics; clBookingFLPP: KreditMetrics; ccAplikasi: KreditMetrics; kkb: KreditMetrics; };`
  );
  content = content.replace(/leading: \{ bookingSME: KreditLeadingMetrics; bookingCL: KreditLeadingMetrics; bookingKSM: KreditLeadingMetrics; bookingCC: KreditLeadingMetrics; bookingMicro: KreditLeadingMetrics; \};/,
    `leading: { bookingSME: KreditLeadingMetrics; bookingCL: KreditLeadingMetrics; bookingKSM: KreditLeadingMetrics; bookingCC: KreditLeadingMetrics; bookingMicro: KreditLeadingMetrics; bookingKKB: KreditLeadingMetrics; };`
  );
}

// Now replace data entries in sumberDataTerpadu
// We use regex to find each branch object and inject fields
const branchRegex = /"funding":\s*\{([\s\S]*?)\},\s*"ekosistem":\s*\{([\s\S]*?)\n\s*\}/g;

const fallbackData = (prefix: string) => `{ today: 0, wtd: 0, mtd: 0, ytd: 0, yoy: 0, target: 0, percentTarget: 0 }`;
const leadingData = () => `{ "today": Math.floor(Math.random() * 50), "target": Math.floor(Math.random() * 50) + 10, "percentTarget": 100 }`;
const laggingData = () => `{ "today": Math.floor(Math.random() * 100000), "wtd": 0, "mtd": 0, "ytd": 0, "yoy": 0, "target": Math.floor(Math.random() * 100000) + 10000, "percentTarget": 100 }`;

let updatedContent = content.replace(branchRegex, (match, funding, ekosistem) => {
  // If it already has transaction, skip
  if (match.includes('"transaction":')) return match;

  const transactionData = `"transaction": {
      "newEDC": ${leadingData()},
      "svEDC": ${laggingData()},
      "newLVM": ${leadingData()},
      "svLvmMTD": ${laggingData()},
      "newLivinUreg": ${leadingData()},
      "newUregKopra": ${leadingData()}
    }`;
    
  const prioritasData = `"prioritas": {
      "ntp": ${leadingData()},
      "ntb": ${leadingData()}
    }`;

  return `"funding": {${funding}},
    "ekosistem": {${ekosistem}
    },
    ${transactionData},
    ${prioritasData}`;
});

// Also need to update the KreditBranch types and total aggregators since they share the same types.
// Wait, UnifiedBranch extends them. Let's just update the objects in 'kredit:' inside the entries.

const kreditLaggingRegex = /"sme":\s*\{([\s\S]*?)\},\s*"cl":\s*\{([\s\S]*?)\},\s*"ksm":\s*\{([\s\S]*?)\},\s*"cc":\s*\{([\s\S]*?)\},\s*"micro":\s*\{([\s\S]*?)\}/g;
updatedContent = updatedContent.replace(kreditLaggingRegex, (match, sme, cl, ksm, cc, micro) => {
  if (match.includes('"smeReferral":')) return match;
  return `"sme": {${sme}},
        "cl": {${cl}},
        "ksm": {${ksm}},
        "cc": {${cc}},
        "micro": {${micro}},
        "smeReferral": ${laggingData()},
        "clBookingRegular": ${laggingData()},
        "clBookingFLPP": ${laggingData()},
        "ccAplikasi": ${laggingData()},
        "kkb": ${laggingData()}`;
});

const kreditLeadingRegex = /"bookingSME":\s*\{([\s\S]*?)\},\s*"bookingCL":\s*\{([\s\S]*?)\},\s*"bookingKSM":\s*\{([\s\S]*?)\},\s*"bookingCC":\s*\{([\s\S]*?)\},\s*"bookingMicro":\s*\{([\s\S]*?)\}/g;
updatedContent = updatedContent.replace(kreditLeadingRegex, (match, sme, cl, ksm, cc, micro) => {
  if (match.includes('"bookingKKB":')) return match;
  return `"bookingSME": {${sme}},
        "bookingCL": {${cl}},
        "bookingKSM": {${ksm}},
        "bookingCC": {${cc}},
        "bookingMicro": {${micro}},
        "bookingKKB": ${leadingData()}`;
});


// Also update getKreditAreaTotal to include these
updatedContent = updatedContent.replace(/micro: \{ today: 0, wtd: 0, mtd: 0, ytd: 0, yoy: 0, target: 0, percentTarget: 0 \} \}/, 
  `micro: { today: 0, wtd: 0, mtd: 0, ytd: 0, yoy: 0, target: 0, percentTarget: 0 },
    smeReferral: { today: 0, wtd: 0, mtd: 0, ytd: 0, yoy: 0, target: 0, percentTarget: 0 },
    clBookingRegular: { today: 0, wtd: 0, mtd: 0, ytd: 0, yoy: 0, target: 0, percentTarget: 0 },
    clBookingFLPP: { today: 0, wtd: 0, mtd: 0, ytd: 0, yoy: 0, target: 0, percentTarget: 0 },
    ccAplikasi: { today: 0, wtd: 0, mtd: 0, ytd: 0, yoy: 0, target: 0, percentTarget: 0 },
    kkb: { today: 0, wtd: 0, mtd: 0, ytd: 0, yoy: 0, target: 0, percentTarget: 0 } }`);

updatedContent = updatedContent.replace(/bookingMicro: \{ today: 0, target: 0, percentTarget: 0 \} \}/,
  `bookingMicro: { today: 0, target: 0, percentTarget: 0 },
    bookingKKB: { today: 0, target: 0, percentTarget: 0 } }`);

updatedContent = updatedContent.replace(/\(\["sme", "cl", "ksm", "cc", "micro"\] as const\)/g, 
  `(["sme", "cl", "ksm", "cc", "micro", "smeReferral", "clBookingRegular", "clBookingFLPP", "ccAplikasi", "kkb"] as const)`);

updatedContent = updatedContent.replace(/\(\["bookingSME", "bookingCL", "bookingKSM", "bookingCC", "bookingMicro"\] as const\)/g,
  `(["bookingSME", "bookingCL", "bookingKSM", "bookingCC", "bookingMicro", "bookingKKB"] as const)`);

// Create `getSummaryAreaTotal`
const getSummaryAreaTotalCode = `
export const getSummaryAreaTotal = (): UnifiedBranch => {
  const total = JSON.parse(JSON.stringify(sumberDataTerpadu[0]));
  total.code = "all";
  total.name = "AREA JAKARTA TEBET SUPOMO";
  total.class = "A.1";
  
  // Reset all to 0
  const resetObject = (obj: any) => {
    for (const key in obj) {
      if (typeof obj[key] === 'number') obj[key] = 0;
      else if (typeof obj[key] === 'object') resetObject(obj[key]);
    }
  };
  resetObject(total.bpa);
  resetObject(total.funding);
  resetObject(total.kredit);
  resetObject(total.ekosistem);
  resetObject(total.transaction);
  resetObject(total.prioritas);

  sumberDataTerpadu.forEach(b => {
    // Add all values
    const addObject = (tObj: any, sObj: any) => {
        for (const key in sObj) {
            if (typeof sObj[key] === 'number' && key !== 'percentTarget') {
                tObj[key] += sObj[key];
            } else if (typeof sObj[key] === 'object' && tObj[key]) {
                addObject(tObj[key], sObj[key]);
            }
        }
    }
    addObject(total.funding, b.funding);
    addObject(total.kredit, b.kredit);
    addObject(total.transaction, b.transaction);
    addObject(total.prioritas, b.prioritas);
  });

  // Calculate percentages
  const calcPercent = (obj: any) => {
    if (obj && typeof obj.target === 'number' && typeof obj.today === 'number') {
        obj.percentTarget = obj.target > 0 ? (obj.today / obj.target) * 100 : 0;
    }
    for (const key in obj) {
        if (typeof obj[key] === 'object') calcPercent(obj[key]);
    }
  };
  calcPercent(total.funding);
  calcPercent(total.kredit);
  calcPercent(total.transaction);
  calcPercent(total.prioritas);

  return total;
};
`;

if (!updatedContent.includes('getSummaryAreaTotal')) {
  updatedContent += getSummaryAreaTotalCode;
}

updatedContent = updatedContent.replace(/summary: "Posisi Data/, 'summary: "Posisi Data: Senin, 20 April 2026 Pukul 08:30 WIB",\n  bpa: "Posisi Data');
if (!updatedContent.includes('summary: "Posisi Data')) {
  updatedContent = updatedContent.replace(/bpa: "Posisi Data/, 'summary: "Posisi Data: Senin, 20 April 2026 Pukul 08:30 WIB",\n  bpa: "Posisi Data');
}


// Fix missing property in KreditBranch type
updatedContent = updatedContent.replace(/export type KreditBranch = \{ code: string; class: string; name: string; lagging: \{ sme: KreditMetrics; cl: KreditMetrics; ksm: KreditMetrics; cc: KreditMetrics; micro: KreditMetrics; \}; leading: \{ bookingSME: KreditLeadingMetrics; bookingCL: KreditLeadingMetrics; bookingKSM: KreditLeadingMetrics; bookingCC: KreditLeadingMetrics; bookingMicro: KreditLeadingMetrics; \}; \};/,
`export type KreditBranch = { code: string; class: string; name: string; lagging: { sme: KreditMetrics; smeReferral: KreditMetrics; cl: KreditMetrics; ksm: KreditMetrics; cc: KreditMetrics; micro: KreditMetrics; clBookingRegular: KreditMetrics; clBookingFLPP: KreditMetrics; ccAplikasi: KreditMetrics; kkb: KreditMetrics; }; leading: { bookingSME: KreditLeadingMetrics; bookingCL: KreditLeadingMetrics; bookingKSM: KreditLeadingMetrics; bookingCC: KreditLeadingMetrics; bookingMicro: KreditLeadingMetrics; bookingKKB: KreditLeadingMetrics; }; };`
);

fs.writeFileSync('src/data/MasterData.ts', updatedContent);
