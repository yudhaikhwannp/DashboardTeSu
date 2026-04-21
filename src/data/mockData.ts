export type Branch = {
  code: string;
  class: string;
  name: string;
  cm: number;
  nii: number;
  assetSpread: number;
  liabilitiesSpread: number;
  fbi: number;
};

export const branches: Branch[] = [
  // B.1
  { code: '12400', class: 'B.1', name: 'Jakarta Casablanca', cm: 12.5, nii: 8.2, assetSpread: 3.1, liabilitiesSpread: 2.8, fbi: 4.5 },
  { code: '12402', class: 'B.1', name: 'Jakarta Graha Irama', cm: 10.2, nii: 7.1, assetSpread: 2.5, liabilitiesSpread: 2.1, fbi: 3.2 },
  { code: '12403', class: 'B.1', name: 'Jakarta Kuningan', cm: 15.8, nii: 10.5, assetSpread: 4.2, liabilitiesSpread: 3.5, fbi: 5.1 },
  { code: '12422', class: 'B.1', name: 'Jakarta M.T. Haryono', cm: 11.4, nii: 7.8, assetSpread: 2.9, liabilitiesSpread: 2.4, fbi: 3.8 },
  
  // B.2
  { code: '12401', class: 'B.2', name: 'Jakarta Rasuna Said', cm: 9.5, nii: 6.2, assetSpread: 2.1, liabilitiesSpread: 1.8, fbi: 2.9 },
  { code: '12404', class: 'B.2', name: 'Jakarta Tebet Supomo', cm: 8.7, nii: 5.8, assetSpread: 1.9, liabilitiesSpread: 1.6, fbi: 2.5 },
  { code: '12405', class: 'B.2', name: 'Jakarta Plaza Setiabudi', cm: 9.1, nii: 6.0, assetSpread: 2.0, liabilitiesSpread: 1.7, fbi: 2.7 },
  { code: '12408', class: 'B.2', name: 'Jakarta Saharjo', cm: 7.8, nii: 5.1, assetSpread: 1.7, liabilitiesSpread: 1.4, fbi: 2.2 },
  { code: '12414', class: 'B.2', name: 'Jakarta Trinity Tower', cm: 8.4, nii: 5.5, assetSpread: 1.8, liabilitiesSpread: 1.5, fbi: 2.4 },
  { code: '12417', class: 'B.2', name: 'Jakarta Kalibata', cm: 7.2, nii: 4.8, assetSpread: 1.5, liabilitiesSpread: 1.3, fbi: 2.0 },
  { code: '12418', class: 'B.2', name: 'Jakarta Pasar Minggu', cm: 8.9, nii: 5.9, assetSpread: 2.0, liabilitiesSpread: 1.6, fbi: 2.6 },
  { code: '12423', class: 'B.2', name: 'Jakarta Pancoran L\'Avenue', cm: 7.5, nii: 5.0, assetSpread: 1.6, liabilitiesSpread: 1.4, fbi: 2.1 },
  { code: '12433', class: 'B.2', name: 'Jakarta Plaza BP Jamsostek', cm: 8.1, nii: 5.3, assetSpread: 1.7, liabilitiesSpread: 1.5, fbi: 2.3 },
  
  // B.3
  { code: '12406', class: 'B.3', name: 'Jakarta Lapangan Ros', cm: 5.4, nii: 3.5, assetSpread: 1.2, liabilitiesSpread: 1.0, fbi: 1.5 },
  { code: '12409', class: 'B.3', name: 'Jakarta Tebet Barat', cm: 6.1, nii: 4.0, assetSpread: 1.3, liabilitiesSpread: 1.1, fbi: 1.7 },
  { code: '12410', class: 'B.3', name: 'Jakarta Wisma Tugu', cm: 5.8, nii: 3.8, assetSpread: 1.2, liabilitiesSpread: 1.0, fbi: 1.6 },
  { code: '12411', class: 'B.3', name: 'Jakarta Pasar Rumput', cm: 4.9, nii: 3.2, assetSpread: 1.0, liabilitiesSpread: 0.9, fbi: 1.3 },
  { code: '12412', class: 'B.3', name: 'Jakarta Tebet Timur', cm: 5.2, nii: 3.4, assetSpread: 1.1, liabilitiesSpread: 0.9, fbi: 1.4 },
  { code: '12424', class: 'B.3', name: 'Jakarta Wisma IKPT', cm: 5.6, nii: 3.7, assetSpread: 1.2, liabilitiesSpread: 1.0, fbi: 1.5 },
  
  // B.4
  { code: '12415', class: 'B.4', name: 'Jakarta Rasuna Episentrum', cm: 3.8, nii: 2.5, assetSpread: 0.8, liabilitiesSpread: 0.7, fbi: 1.0 },
  { code: '12419', class: 'B.4', name: 'Jakarta Kalibata Rawajati', cm: 3.2, nii: 2.1, assetSpread: 0.7, liabilitiesSpread: 0.6, fbi: 0.9 },
  { code: '12425', class: 'B.4', name: 'Jakarta Gedung Sucofindo', cm: 4.1, nii: 2.7, assetSpread: 0.9, liabilitiesSpread: 0.8, fbi: 1.1 },
  { code: '12426', class: 'B.4', name: 'Jakarta Multivision Tower', cm: 3.5, nii: 2.3, assetSpread: 0.8, liabilitiesSpread: 0.6, fbi: 0.9 },
  { code: '12428', class: 'B.4', name: 'Jakarta Kota Kasablanka', cm: 4.5, nii: 3.0, assetSpread: 1.0, liabilitiesSpread: 0.8, fbi: 1.2 },
  { code: '12429', class: 'B.4', name: 'Jakarta Menara Kuningan', cm: 3.9, nii: 2.6, assetSpread: 0.9, liabilitiesSpread: 0.7, fbi: 1.0 },
  { code: '12431', class: 'B.4', name: 'Jakarta Kementerian Kesehatan', cm: 4.2, nii: 2.8, assetSpread: 0.9, liabilitiesSpread: 0.8, fbi: 1.1 },
  { code: '12432', class: 'B.4', name: 'Jakarta Menara Cyber 2', cm: 3.6, nii: 2.4, assetSpread: 0.8, liabilitiesSpread: 0.7, fbi: 1.0 },
];

export const getAreaTotal = (): Branch => {
  return branches.reduce((acc, branch) => ({
    code: '124',
    class: 'A.1',
    name: 'Area Jakarta Tebet Supomo',
    cm: acc.cm + branch.cm,
    nii: acc.nii + branch.nii,
    assetSpread: acc.assetSpread + branch.assetSpread,
    liabilitiesSpread: acc.liabilitiesSpread + branch.liabilitiesSpread,
    fbi: acc.fbi + branch.fbi,
  }), {
    code: '124',
    class: 'A.1',
    name: 'Area Jakarta Tebet Supomo',
    cm: 0,
    nii: 0,
    assetSpread: 0,
    liabilitiesSpread: 0,
    fbi: 0,
  });
};

export type FundingLagging = {
  today: number;
  wtd: number;
  mtd: number;
  ytd: number;
  yoy: number;
  target: number;
  percentTarget: number;
};

export type LeadingMetric = {
  today: number;
  target: number;
  percentTarget: number;
};

export type FundingLeading = {
  newCifTabungan: LeadingMetric;
  newCifGiro: LeadingMetric;
  newCifTabunganBisnis: LeadingMetric;
  newToPriority: LeadingMetric;
};

export type FundingBranch = {
  code: string;
  class: string;
  name: string;
  lagging: {
    tabungan: FundingLagging;
    giro: FundingLagging;
    deposito: FundingLagging;
  };
  leading: FundingLeading;
};

const generateRandomLagging = (base: number): FundingLagging => {
  const today = base * (0.8 + Math.random() * 0.4);
  const target = today * (0.9 + Math.random() * 0.3);
  return {
    today,
    wtd: today * (Math.random() * 0.05 - 0.02),
    mtd: today * (Math.random() * 0.1 - 0.05),
    ytd: today * (Math.random() * 0.2 - 0.1),
    yoy: today * (Math.random() * 0.3 - 0.15),
    target,
    percentTarget: (today / target) * 100,
  };
};

const generateRandomLeading = (base: number): LeadingMetric => {
  const today = Math.floor(Math.random() * base) + Math.floor(base * 0.2);
  const target = Math.floor(today * (0.9 + Math.random() * 0.3)) + 1;
  return {
    today,
    target,
    percentTarget: (today / target) * 100,
  };
};

export const fundingBranches: FundingBranch[] = branches.map(b => ({
  code: b.code,
  class: b.class,
  name: b.name,
  lagging: {
    tabungan: generateRandomLagging(b.cm * 10),
    giro: generateRandomLagging(b.cm * 15),
    deposito: generateRandomLagging(b.cm * 20),
  },
  leading: {
    newCifTabungan: generateRandomLeading(100),
    newCifGiro: generateRandomLeading(20),
    newCifTabunganBisnis: generateRandomLeading(30),
    newToPriority: generateRandomLeading(10),
  }
}));

export const getFundingAreaTotal = (): FundingBranch => {
  const total: FundingBranch = {
    code: '124',
    class: 'A.1',
    name: 'Area Jakarta Tebet Supomo',
    lagging: {
      tabungan: { today: 0, wtd: 0, mtd: 0, ytd: 0, yoy: 0, target: 0, percentTarget: 0 },
      giro: { today: 0, wtd: 0, mtd: 0, ytd: 0, yoy: 0, target: 0, percentTarget: 0 },
      deposito: { today: 0, wtd: 0, mtd: 0, ytd: 0, yoy: 0, target: 0, percentTarget: 0 },
    },
    leading: {
      newCifTabungan: { today: 0, target: 0, percentTarget: 0 },
      newCifGiro: { today: 0, target: 0, percentTarget: 0 },
      newCifTabunganBisnis: { today: 0, target: 0, percentTarget: 0 },
      newToPriority: { today: 0, target: 0, percentTarget: 0 },
    }
  };

  fundingBranches.forEach(b => {
    (['tabungan', 'giro', 'deposito'] as const).forEach(type => {
      total.lagging[type].today += b.lagging[type].today;
      total.lagging[type].wtd += b.lagging[type].wtd;
      total.lagging[type].mtd += b.lagging[type].mtd;
      total.lagging[type].ytd += b.lagging[type].ytd;
      total.lagging[type].yoy += b.lagging[type].yoy;
      total.lagging[type].target += b.lagging[type].target;
    });
    (['newCifTabungan', 'newCifGiro', 'newCifTabunganBisnis', 'newToPriority'] as const).forEach(type => {
      total.leading[type].today += b.leading[type].today;
      total.leading[type].target += b.leading[type].target;
    });
  });

  (['tabungan', 'giro', 'deposito'] as const).forEach(type => {
    total.lagging[type].percentTarget = (total.lagging[type].today / total.lagging[type].target) * 100;
  });
  (['newCifTabungan', 'newCifGiro', 'newCifTabunganBisnis', 'newToPriority'] as const).forEach(type => {
    total.leading[type].percentTarget = (total.leading[type].today / total.leading[type].target) * 100;
  });

  return total;
};

export type KreditMetrics = {
  today: number;
  wtd: number;
  mtd: number;
  ytd: number;
  yoy: number;
  target: number;
  percentTarget: number;
};

export type KreditLeadingMetrics = {
  today: number;
  target: number;
  percentTarget: number;
};

export type EkosistemMetrics = {
  today: number;
  target: number;
  percentTarget: number;
};

export interface EkosistemBranch {
  code: string;
  name: string;
  class: string;
  ekosistem: {
    bodBoc: EkosistemMetrics;
    turunan: EkosistemMetrics;
    familyTree: EkosistemMetrics;
    warungViral: EkosistemMetrics;
    spbu: EkosistemMetrics;
    kdkmp: EkosistemMetrics;
    sppg: EkosistemMetrics;
    billReminder: EkosistemMetrics;
  };
}

export type KreditBranch = {
  code: string;
  class: string;
  name: string;
  lagging: {
    sme: KreditMetrics;
    cl: KreditMetrics;
    ksm: KreditMetrics;
    cc: KreditMetrics;
    micro: KreditMetrics;
  };
  leading: {
    bookingSME: KreditLeadingMetrics;
    bookingCL: KreditLeadingMetrics;
    bookingKSM: KreditLeadingMetrics;
    bookingCC: KreditLeadingMetrics;
    bookingMicro: KreditLeadingMetrics;
  };
};

const generateKreditMetrics = (base: number): KreditMetrics => {
  const today = base + (Math.random() * base * 0.2);
  const target = today * (1 + Math.random() * 0.1);
  return {
    today,
    wtd: (Math.random() * 5) - 2,
    mtd: (Math.random() * 15) - 5,
    ytd: (Math.random() * 50) - 10,
    yoy: (Math.random() * 100) - 20,
    target,
    percentTarget: (today / target) * 100
  };
};

const generateKreditLeadingMetrics = (base: number): KreditLeadingMetrics => {
  const today = Math.floor(base + (Math.random() * base * 0.5));
  const target = Math.floor(today * (1 + Math.random() * 0.2));
  return {
    today,
    target,
    percentTarget: (today / target) * 100
  };
};

export const kreditBranches: KreditBranch[] = branches.map(b => {
  const multiplier = b.class === 'B.1' ? 3 : b.class === 'B.2' ? 2 : b.class === 'B.3' ? 1 : 0.5;
  return {
    code: b.code,
    class: b.class,
    name: b.name,
    lagging: {
      sme: generateKreditMetrics(500 * multiplier),
      cl: generateKreditMetrics(300 * multiplier),
      ksm: generateKreditMetrics(200 * multiplier),
      cc: generateKreditMetrics(150 * multiplier),
      micro: generateKreditMetrics(100 * multiplier),
    },
    leading: {
      bookingSME: generateKreditLeadingMetrics(10 * multiplier),
      bookingCL: generateKreditLeadingMetrics(15 * multiplier),
      bookingKSM: generateKreditLeadingMetrics(20 * multiplier),
      bookingCC: generateKreditLeadingMetrics(50 * multiplier),
      bookingMicro: generateKreditLeadingMetrics(30 * multiplier),
    }
  };
});

export const getKreditAreaTotal = (): KreditBranch => {
  const total: KreditBranch = {
    code: 'all',
    class: 'A.1',
    name: 'Area Jakarta Tebet Supomo',
    lagging: {
      sme: { today: 0, wtd: 0, mtd: 0, ytd: 0, yoy: 0, target: 0, percentTarget: 0 },
      cl: { today: 0, wtd: 0, mtd: 0, ytd: 0, yoy: 0, target: 0, percentTarget: 0 },
      ksm: { today: 0, wtd: 0, mtd: 0, ytd: 0, yoy: 0, target: 0, percentTarget: 0 },
      cc: { today: 0, wtd: 0, mtd: 0, ytd: 0, yoy: 0, target: 0, percentTarget: 0 },
      micro: { today: 0, wtd: 0, mtd: 0, ytd: 0, yoy: 0, target: 0, percentTarget: 0 },
    },
    leading: {
      bookingSME: { today: 0, target: 0, percentTarget: 0 },
      bookingCL: { today: 0, target: 0, percentTarget: 0 },
      bookingKSM: { today: 0, target: 0, percentTarget: 0 },
      bookingCC: { today: 0, target: 0, percentTarget: 0 },
      bookingMicro: { today: 0, target: 0, percentTarget: 0 },
    }
  };

  kreditBranches.forEach(b => {
    (['sme', 'cl', 'ksm', 'cc', 'micro'] as const).forEach(type => {
      total.lagging[type].today += b.lagging[type].today;
      total.lagging[type].wtd += b.lagging[type].wtd;
      total.lagging[type].mtd += b.lagging[type].mtd;
      total.lagging[type].ytd += b.lagging[type].ytd;
      total.lagging[type].yoy += b.lagging[type].yoy;
      total.lagging[type].target += b.lagging[type].target;
    });
    (['bookingSME', 'bookingCL', 'bookingKSM', 'bookingCC', 'bookingMicro'] as const).forEach(type => {
      total.leading[type].today += b.leading[type].today;
      total.leading[type].target += b.leading[type].target;
    });
  });

  (['sme', 'cl', 'ksm', 'cc', 'micro'] as const).forEach(type => {
    total.lagging[type].percentTarget = (total.lagging[type].today / total.lagging[type].target) * 100;
  });
  (['bookingSME', 'bookingCL', 'bookingKSM', 'bookingCC', 'bookingMicro'] as const).forEach(type => {
    total.leading[type].percentTarget = (total.leading[type].today / total.leading[type].target) * 100;
  });

  return total;
};

const generateEkosistemMetrics = (baseAmount: number): EkosistemMetrics => {
  const target = baseAmount;
  const today = Math.round(baseAmount * (0.8 + Math.random() * 0.4));
  return {
    today,
    target,
    percentTarget: target > 0 ? (today / target) * 100 : 0
  };
};

export const ekosistemBranches: EkosistemBranch[] = branches.map(b => ({
  code: b.code,
  name: b.name,
  class: b.class,
  ekosistem: {
    bodBoc: generateEkosistemMetrics(Math.floor(Math.random() * 50) + 10),
    turunan: generateEkosistemMetrics(Math.floor(Math.random() * 100) + 20),
    familyTree: generateEkosistemMetrics(Math.floor(Math.random() * 30) + 5),
    warungViral: generateEkosistemMetrics(Math.floor(Math.random() * 200) + 50),
    spbu: generateEkosistemMetrics(Math.floor(Math.random() * 10) + 2),
    kdkmp: generateEkosistemMetrics(Math.floor(Math.random() * 40) + 10),
    sppg: generateEkosistemMetrics(Math.floor(Math.random() * 50) + 10),
    billReminder: generateEkosistemMetrics(Math.floor(Math.random() * 300) + 100),
  }
}));

export const getEkosistemAreaTotal = (): EkosistemBranch => {
  const total: EkosistemBranch = {
    code: '124',
    class: 'A.1',
    name: 'Area Jakarta Tebet Supomo',
    ekosistem: {
      bodBoc: { today: 0, target: 0, percentTarget: 0 },
      turunan: { today: 0, target: 0, percentTarget: 0 },
      familyTree: { today: 0, target: 0, percentTarget: 0 },
      warungViral: { today: 0, target: 0, percentTarget: 0 },
      spbu: { today: 0, target: 0, percentTarget: 0 },
      kdkmp: { today: 0, target: 0, percentTarget: 0 },
      sppg: { today: 0, target: 0, percentTarget: 0 },
      billReminder: { today: 0, target: 0, percentTarget: 0 },
    }
  };

  ekosistemBranches.forEach(b => {
    (['bodBoc', 'turunan', 'familyTree', 'warungViral', 'spbu', 'kdkmp', 'sppg', 'billReminder'] as const).forEach(type => {
      total.ekosistem[type].today += b.ekosistem[type].today;
      total.ekosistem[type].target += b.ekosistem[type].target;
    });
  });

  (['bodBoc', 'turunan', 'familyTree', 'warungViral', 'spbu', 'kdkmp', 'sppg', 'billReminder'] as const).forEach(type => {
    total.ekosistem[type].percentTarget = total.ekosistem[type].target > 0 ? (total.ekosistem[type].today / total.ekosistem[type].target) * 100 : 0;
  });

  return total;
};
