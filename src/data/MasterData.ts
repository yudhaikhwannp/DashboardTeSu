export type Branch = { code: string; class: string; name: string; cm: number; nii: number; assetSpread: number; liabilitiesSpread: number; fbi: number; };
export type FundingLagging = { today: number; wtd: number; mtd: number; ytd: number; yoy: number; target: number; percentTarget: number; };
export type LeadingMetric = { today: number; target: number; percentTarget: number; };
export type FundingLeading = { newCifTabungan: LeadingMetric; newCifGiro: LeadingMetric; newCifTabunganBisnis: LeadingMetric; newToPriority: LeadingMetric; };
export type FundingBranch = { code: string; class: string; name: string; lagging: { tabungan: FundingLagging; giro: FundingLagging; deposito: FundingLagging; }; leading: FundingLeading; };
export type KreditMetrics = { today: number; wtd: number; mtd: number; ytd: number; yoy: number; target: number; percentTarget: number; };
export type KreditLeadingMetrics = { today: number; target: number; percentTarget: number; };
export type EkosistemMetrics = { today: number; target: number; percentTarget: number; };
export interface EkosistemBranch { code: string; name: string; class: string; ekosistem: { bodBocSME: EkosistemMetrics; bodBocCMC: EkosistemMetrics; bodBocCB: EkosistemMetrics; familyTree: EkosistemMetrics; warungViral: EkosistemMetrics; spbu: EkosistemMetrics; kdkmp: EkosistemMetrics; sppg: EkosistemMetrics; billReminder: EkosistemMetrics; }; }
export type KreditBranch = { code: string; class: string; name: string; lagging: { sme: KreditMetrics; cl: KreditMetrics; ksm: KreditMetrics; cc: KreditMetrics; micro: KreditMetrics; }; leading: { bookingSME: KreditLeadingMetrics; bookingCL: KreditLeadingMetrics; bookingKSM: KreditLeadingMetrics; bookingCC: KreditLeadingMetrics; bookingMicro: KreditLeadingMetrics; }; };

export const sidebarDateText = "20 April 2026";
export const positionDateTexts = {
  bpa: "Posisi Data: Senin, 20 April 2026 Pukul 08:30 WIB",
  funding: "Posisi Data: Senin, 20 April 2026 Pukul 09:15 WIB",
  kredit: "Posisi Data: Senin, 20 April 2026 Pukul 10:45 WIB",
  ekosistem: "Posisi Data: Senin, 20 April 2026 Pukul 11:20 WIB"
};

export interface UnifiedBranch {
  code: string; class: string; name: string;
  bpa: { cm: number; nii: number; assetSpread: number; liabilitiesSpread: number; fbi: number; };
  funding: { lagging: { tabungan: FundingLagging; giro: FundingLagging; deposito: FundingLagging; }; leading: FundingLeading; };
  kredit: { lagging: { sme: KreditMetrics; cl: KreditMetrics; ksm: KreditMetrics; cc: KreditMetrics; micro: KreditMetrics; }; leading: { bookingSME: KreditLeadingMetrics; bookingCL: KreditLeadingMetrics; bookingKSM: KreditLeadingMetrics; bookingCC: KreditLeadingMetrics; bookingMicro: KreditLeadingMetrics; }; };
  ekosistem: EkosistemBranch["ekosistem"];
}

// INI ADALAH SUMBER DATA TERPADU UNTUK SELURUH HALAMAN
export const sumberDataTerpadu: UnifiedBranch[] = [
  {
    "code": "12400",
    "class": "B.1",
    "name": "Jakarta Casablanca",
    "bpa": {
      "cm": 12.5,
      "nii": 8.2,
      "assetSpread": 3.1,
      "liabilitiesSpread": 2.8,
      "fbi": 4.5
    },
    "funding": {
      "lagging": {
        "tabungan": {
          "today": 108.66,
          "wtd": 2.14,
          "mtd": -5.28,
          "ytd": -5.79,
          "yoy": -1.42,
          "target": 98.29,
          "percentTarget": 110.55
        },
        "giro": {
          "today": 200.24,
          "wtd": 5.75,
          "mtd": -3.48,
          "ytd": 7.61,
          "yoy": 0.06,
          "target": 223.18,
          "percentTarget": 89.72
        },
        "deposito": {
          "today": 203.31,
          "wtd": -2.72,
          "mtd": -8.28,
          "ytd": -13.33,
          "yoy": -23.57,
          "target": 210.91,
          "percentTarget": 96.39
        }
      },
      "leading": {
        "newCifTabungan": {
          "today": 68,
          "target": 75,
          "percentTarget": 90.67
        },
        "newCifGiro": {
          "today": 22,
          "target": 26,
          "percentTarget": 84.62
        },
        "newCifTabunganBisnis": {
          "today": 20,
          "target": 23,
          "percentTarget": 86.96
        },
        "newToPriority": {
          "today": 2,
          "target": 2,
          "percentTarget": 100
        }
      }
    },
    "kredit": {
      "lagging": {
        "sme": {
          "today": 1679.02,
          "wtd": 0.05,
          "mtd": -0.87,
          "ytd": 27.27,
          "yoy": 27.58,
          "target": 1723.34,
          "percentTarget": 97.43
        },
        "cl": {
          "today": 1048.96,
          "wtd": -0.02,
          "mtd": 2.42,
          "ytd": -8.8,
          "yoy": 36.88,
          "target": 1145.87,
          "percentTarget": 91.54
        },
        "ksm": {
          "today": 635.06,
          "wtd": 2.43,
          "mtd": 8.98,
          "ytd": -4.87,
          "yoy": 3.81,
          "target": 646.69,
          "percentTarget": 98.2
        },
        "cc": {
          "today": 461.01,
          "wtd": 1.92,
          "mtd": 1.63,
          "ytd": -0.07,
          "yoy": 4.36,
          "target": 466.66,
          "percentTarget": 98.79
        },
        "micro": {
          "today": 300.4,
          "wtd": -1.95,
          "mtd": -4.63,
          "ytd": 9.24,
          "yoy": 15.16,
          "target": 330.31,
          "percentTarget": 90.94
        }
      },
      "leading": {
        "bookingSME": {
          "today": 38,
          "target": 43,
          "percentTarget": 88.37
        },
        "bookingCL": {
          "today": 59,
          "target": 61,
          "percentTarget": 96.72
        },
        "bookingKSM": {
          "today": 66,
          "target": 76,
          "percentTarget": 86.84
        },
        "bookingCC": {
          "today": 181,
          "target": 209,
          "percentTarget": 86.6
        },
        "bookingMicro": {
          "today": 126,
          "target": 145,
          "percentTarget": 86.9
        }
      }
    },
    "ekosistem": {
      "bodBocSME": {
        "today": 29,
        "target": 27,
        "percentTarget": 107.41
      },
      "bodBocCMC": {
        "today": 90,
        "target": 85,
        "percentTarget": 105.88
      },
      "bodBocCB": {
        "today": 12,
        "target": 15,
        "percentTarget": 80.0
      },
      "familyTree": {
        "today": 14,
        "target": 13,
        "percentTarget": 107.69
      },
      "warungViral": {
        "today": 134,
        "target": 115,
        "percentTarget": 116.52
      },
      "spbu": {
        "today": 9,
        "target": 8,
        "percentTarget": 112.5
      },
      "kdkmp": {
        "today": 12,
        "target": 14,
        "percentTarget": 85.71
      },
      "sppg": {
        "today": 21,
        "target": 20,
        "percentTarget": 105
      },
      "billReminder": {
        "today": 152,
        "target": 128,
        "percentTarget": 118.75
      }
    }
  },
  {
    "code": "12402",
    "class": "B.1",
    "name": "Jakarta Graha Irama",
    "bpa": {
      "cm": 10.2,
      "nii": 7.1,
      "assetSpread": 2.5,
      "liabilitiesSpread": 2.1,
      "fbi": 3.2
    },
    "funding": {
      "lagging": {
        "tabungan": {
          "today": 101.27,
          "wtd": 1.71,
          "mtd": 0.32,
          "ytd": -0.15,
          "yoy": 14.71,
          "target": 103.19,
          "percentTarget": 98.14
        },
        "giro": {
          "today": 141.27,
          "wtd": 0.64,
          "mtd": 1.72,
          "ytd": -11.9,
          "yoy": 16.33,
          "target": 137.1,
          "percentTarget": 103.04
        },
        "deposito": {
          "today": 168.56,
          "wtd": -1.89,
          "mtd": -7.63,
          "ytd": -2.71,
          "yoy": 18.58,
          "target": 196.47,
          "percentTarget": 85.79
        }
      },
      "leading": {
        "newCifTabungan": {
          "today": 80,
          "target": 84,
          "percentTarget": 95.24
        },
        "newCifGiro": {
          "today": 19,
          "target": 19,
          "percentTarget": 100
        },
        "newCifTabunganBisnis": {
          "today": 34,
          "target": 33,
          "percentTarget": 103.03
        },
        "newToPriority": {
          "today": 9,
          "target": 11,
          "percentTarget": 81.82
        }
      }
    },
    "kredit": {
      "lagging": {
        "sme": {
          "today": 1748.11,
          "wtd": 0.88,
          "mtd": 8.36,
          "ytd": 5.35,
          "yoy": 2.02,
          "target": 1843.7,
          "percentTarget": 94.82
        },
        "cl": {
          "today": 1050.71,
          "wtd": -1.23,
          "mtd": 0.12,
          "ytd": 39.49,
          "yoy": 35.13,
          "target": 1058.58,
          "percentTarget": 99.26
        },
        "ksm": {
          "today": 627.32,
          "wtd": -1.87,
          "mtd": -3.79,
          "ytd": 6.92,
          "yoy": -2.54,
          "target": 652.27,
          "percentTarget": 96.18
        },
        "cc": {
          "today": 491.82,
          "wtd": 0.76,
          "mtd": 9.01,
          "ytd": 11.85,
          "yoy": -9.76,
          "target": 498.33,
          "percentTarget": 98.69
        },
        "micro": {
          "today": 302.12,
          "wtd": 1.98,
          "mtd": 0.6,
          "ytd": 30.75,
          "yoy": 9.74,
          "target": 303.21,
          "percentTarget": 99.64
        }
      },
      "leading": {
        "bookingSME": {
          "today": 34,
          "target": 37,
          "percentTarget": 91.89
        },
        "bookingCL": {
          "today": 50,
          "target": 54,
          "percentTarget": 92.59
        },
        "bookingKSM": {
          "today": 77,
          "target": 82,
          "percentTarget": 93.9
        },
        "bookingCC": {
          "today": 198,
          "target": 222,
          "percentTarget": 89.19
        },
        "bookingMicro": {
          "today": 126,
          "target": 138,
          "percentTarget": 91.3
        }
      }
    },
    "ekosistem": {
      "bodBocSME": {
        "today": 24,
        "target": 24,
        "percentTarget": 100
      },
      "bodBocCMC": {
        "today": 89,
        "target": 89,
        "percentTarget": 100
      },
      "bodBocCB": {
        "today": 12,
        "target": 15,
        "percentTarget": 80.0
      },
      "familyTree": {
        "today": 12,
        "target": 12,
        "percentTarget": 100
      },
      "warungViral": {
        "today": 110,
        "target": 99,
        "percentTarget": 111.11
      },
      "spbu": {
        "today": 4,
        "target": 4,
        "percentTarget": 100
      },
      "kdkmp": {
        "today": 31,
        "target": 36,
        "percentTarget": 86.11
      },
      "sppg": {
        "today": 16,
        "target": 16,
        "percentTarget": 100
      },
      "billReminder": {
        "today": 363,
        "target": 370,
        "percentTarget": 98.11
      }
    }
  },
  {
    "code": "12403",
    "class": "B.1",
    "name": "Jakarta Kuningan",
    "bpa": {
      "cm": 15.8,
      "nii": 10.5,
      "assetSpread": 4.2,
      "liabilitiesSpread": 3.5,
      "fbi": 5.1
    },
    "funding": {
      "lagging": {
        "tabungan": {
          "today": 152.52,
          "wtd": -0.2,
          "mtd": -0.59,
          "ytd": 0.3,
          "yoy": 12.22,
          "target": 138.77,
          "percentTarget": 109.91
        },
        "giro": {
          "today": 244.36,
          "wtd": 7.03,
          "mtd": -8.5,
          "ytd": 16.87,
          "yoy": 32.57,
          "target": 243.62,
          "percentTarget": 100.3
        },
        "deposito": {
          "today": 345.4,
          "wtd": 2.89,
          "mtd": -13.82,
          "ytd": -18.45,
          "yoy": 40.17,
          "target": 320.9,
          "percentTarget": 107.64
        }
      },
      "leading": {
        "newCifTabungan": {
          "today": 97,
          "target": 94,
          "percentTarget": 103.19
        },
        "newCifGiro": {
          "today": 6,
          "target": 7,
          "percentTarget": 85.71
        },
        "newCifTabunganBisnis": {
          "today": 31,
          "target": 33,
          "percentTarget": 93.94
        },
        "newToPriority": {
          "today": 3,
          "target": 3,
          "percentTarget": 100
        }
      }
    },
    "kredit": {
      "lagging": {
        "sme": {
          "today": 1745.99,
          "wtd": -0.11,
          "mtd": -1.57,
          "ytd": 23.41,
          "yoy": 37.96,
          "target": 1793.27,
          "percentTarget": 97.36
        },
        "cl": {
          "today": 1021.3,
          "wtd": 0.51,
          "mtd": 7.22,
          "ytd": 20.25,
          "yoy": 5.12,
          "target": 1067.13,
          "percentTarget": 95.71
        },
        "ksm": {
          "today": 628.76,
          "wtd": -0.45,
          "mtd": 2.6,
          "ytd": 18.35,
          "yoy": 65.82,
          "target": 648.07,
          "percentTarget": 97.02
        },
        "cc": {
          "today": 469.67,
          "wtd": -1.42,
          "mtd": -3.43,
          "ytd": 19.58,
          "yoy": -15.57,
          "target": 487.82,
          "percentTarget": 96.28
        },
        "micro": {
          "today": 335.97,
          "wtd": 0.32,
          "mtd": -1.38,
          "ytd": 38.06,
          "yoy": -19.36,
          "target": 347.89,
          "percentTarget": 96.58
        }
      },
      "leading": {
        "bookingSME": {
          "today": 30,
          "target": 31,
          "percentTarget": 96.77
        },
        "bookingCL": {
          "today": 52,
          "target": 56,
          "percentTarget": 92.86
        },
        "bookingKSM": {
          "today": 86,
          "target": 102,
          "percentTarget": 84.31
        },
        "bookingCC": {
          "today": 184,
          "target": 188,
          "percentTarget": 97.87
        },
        "bookingMicro": {
          "today": 95,
          "target": 102,
          "percentTarget": 93.14
        }
      }
    },
    "ekosistem": {
      "bodBocSME": {
        "today": 27,
        "target": 26,
        "percentTarget": 103.85
      },
      "bodBocCMC": {
        "today": 80,
        "target": 73,
        "percentTarget": 109.59
      },
      "bodBocCB": {
        "today": 12,
        "target": 15,
        "percentTarget": 80.0
      },
      "familyTree": {
        "today": 15,
        "target": 14,
        "percentTarget": 107.14
      },
      "warungViral": {
        "today": 228,
        "target": 205,
        "percentTarget": 111.22
      },
      "spbu": {
        "today": 6,
        "target": 7,
        "percentTarget": 85.71
      },
      "kdkmp": {
        "today": 14,
        "target": 15,
        "percentTarget": 93.33
      },
      "sppg": {
        "today": 51,
        "target": 43,
        "percentTarget": 118.6
      },
      "billReminder": {
        "today": 136,
        "target": 130,
        "percentTarget": 104.62
      }
    }
  },
  {
    "code": "12422",
    "class": "B.1",
    "name": "Jakarta M.T. Haryono",
    "bpa": {
      "cm": 11.4,
      "nii": 7.8,
      "assetSpread": 2.9,
      "liabilitiesSpread": 2.4,
      "fbi": 3.8
    },
    "funding": {
      "lagging": {
        "tabungan": {
          "today": 99.09,
          "wtd": 1.61,
          "mtd": 4.78,
          "ytd": -0.52,
          "yoy": -13.11,
          "target": 97.32,
          "percentTarget": 101.82
        },
        "giro": {
          "today": 151.56,
          "wtd": 3.91,
          "mtd": 2.2,
          "ytd": 0.25,
          "yoy": -5.99,
          "target": 144.34,
          "percentTarget": 105.01
        },
        "deposito": {
          "today": 243.22,
          "wtd": 7.16,
          "mtd": 8.35,
          "ytd": -22.8,
          "yoy": -21.85,
          "target": 238.99,
          "percentTarget": 101.77
        }
      },
      "leading": {
        "newCifTabungan": {
          "today": 90,
          "target": 85,
          "percentTarget": 105.88
        },
        "newCifGiro": {
          "today": 17,
          "target": 16,
          "percentTarget": 106.25
        },
        "newCifTabunganBisnis": {
          "today": 32,
          "target": 35,
          "percentTarget": 91.43
        },
        "newToPriority": {
          "today": 2,
          "target": 2,
          "percentTarget": 100
        }
      }
    },
    "kredit": {
      "lagging": {
        "sme": {
          "today": 1786.5,
          "wtd": 0.84,
          "mtd": 0.6,
          "ytd": 13.12,
          "yoy": 25.82,
          "target": 1867.22,
          "percentTarget": 95.68
        },
        "cl": {
          "today": 954.68,
          "wtd": 0.95,
          "mtd": -2.31,
          "ytd": 2.83,
          "yoy": 44.28,
          "target": 957.39,
          "percentTarget": 99.72
        },
        "ksm": {
          "today": 658.68,
          "wtd": -1.14,
          "mtd": 5.02,
          "ytd": 12.72,
          "yoy": -12.81,
          "target": 669.62,
          "percentTarget": 98.37
        },
        "cc": {
          "today": 473.11,
          "wtd": -0.85,
          "mtd": -1.01,
          "ytd": 0.39,
          "yoy": 55.55,
          "target": 505.27,
          "percentTarget": 93.64
        },
        "micro": {
          "today": 306.56,
          "wtd": -1.65,
          "mtd": -4.95,
          "ytd": -8.71,
          "yoy": 54.1,
          "target": 310.68,
          "percentTarget": 98.68
        }
      },
      "leading": {
        "bookingSME": {
          "today": 37,
          "target": 38,
          "percentTarget": 97.37
        },
        "bookingCL": {
          "today": 56,
          "target": 60,
          "percentTarget": 93.33
        },
        "bookingKSM": {
          "today": 79,
          "target": 90,
          "percentTarget": 87.78
        },
        "bookingCC": {
          "today": 216,
          "target": 226,
          "percentTarget": 95.58
        },
        "bookingMicro": {
          "today": 92,
          "target": 101,
          "percentTarget": 91.09
        }
      }
    },
    "ekosistem": {
      "bodBocSME": {
        "today": 24,
        "target": 30,
        "percentTarget": 80
      },
      "bodBocCMC": {
        "today": 40,
        "target": 36,
        "percentTarget": 111.11
      },
      "bodBocCB": {
        "today": 12,
        "target": 15,
        "percentTarget": 80.0
      },
      "familyTree": {
        "today": 21,
        "target": 25,
        "percentTarget": 84
      },
      "warungViral": {
        "today": 175,
        "target": 176,
        "percentTarget": 99.43
      },
      "spbu": {
        "today": 3,
        "target": 3,
        "percentTarget": 100
      },
      "kdkmp": {
        "today": 44,
        "target": 49,
        "percentTarget": 89.8
      },
      "sppg": {
        "today": 60,
        "target": 53,
        "percentTarget": 113.21
      },
      "billReminder": {
        "today": 461,
        "target": 398,
        "percentTarget": 115.83
      }
    }
  },
  {
    "code": "12401",
    "class": "B.2",
    "name": "Jakarta Rasuna Said",
    "bpa": {
      "cm": 9.5,
      "nii": 6.2,
      "assetSpread": 2.1,
      "liabilitiesSpread": 1.8,
      "fbi": 2.9
    },
    "funding": {
      "lagging": {
        "tabungan": {
          "today": 113.75,
          "wtd": 0.67,
          "mtd": 1.25,
          "ytd": -0.56,
          "yoy": 6.07,
          "target": 117.29,
          "percentTarget": 96.98
        },
        "giro": {
          "today": 157.71,
          "wtd": 0.01,
          "mtd": 4.81,
          "ytd": -14.47,
          "yoy": 16.71,
          "target": 188.49,
          "percentTarget": 83.67
        },
        "deposito": {
          "today": 206.51,
          "wtd": 0.7,
          "mtd": 8.28,
          "ytd": -13.91,
          "yoy": -8.69,
          "target": 219.31,
          "percentTarget": 94.16
        }
      },
      "leading": {
        "newCifTabungan": {
          "today": 80,
          "target": 85,
          "percentTarget": 94.12
        },
        "newCifGiro": {
          "today": 23,
          "target": 22,
          "percentTarget": 104.55
        },
        "newCifTabunganBisnis": {
          "today": 10,
          "target": 11,
          "percentTarget": 90.91
        },
        "newToPriority": {
          "today": 6,
          "target": 7,
          "percentTarget": 85.71
        }
      }
    },
    "kredit": {
      "lagging": {
        "sme": {
          "today": 1029.59,
          "wtd": -1.72,
          "mtd": -1.48,
          "ytd": -4.06,
          "yoy": 26,
          "target": 1066.49,
          "percentTarget": 96.54
        },
        "cl": {
          "today": 643.98,
          "wtd": 2.43,
          "mtd": 2.65,
          "ytd": -2.76,
          "yoy": 69.63,
          "target": 683.85,
          "percentTarget": 94.17
        },
        "ksm": {
          "today": 405.82,
          "wtd": 1.27,
          "mtd": 8.63,
          "ytd": 13.09,
          "yoy": 32.79,
          "target": 417.1,
          "percentTarget": 97.3
        },
        "cc": {
          "today": 343.21,
          "wtd": -0.1,
          "mtd": 6.48,
          "ytd": 20.46,
          "yoy": 6.67,
          "target": 353.16,
          "percentTarget": 97.18
        },
        "micro": {
          "today": 228.26,
          "wtd": 0.98,
          "mtd": -2.1,
          "ytd": 37.75,
          "yoy": 27.97,
          "target": 248.4,
          "percentTarget": 91.89
        }
      },
      "leading": {
        "bookingSME": {
          "today": 29,
          "target": 34,
          "percentTarget": 85.29
        },
        "bookingCL": {
          "today": 38,
          "target": 42,
          "percentTarget": 90.48
        },
        "bookingKSM": {
          "today": 47,
          "target": 53,
          "percentTarget": 88.68
        },
        "bookingCC": {
          "today": 135,
          "target": 142,
          "percentTarget": 95.07
        },
        "bookingMicro": {
          "today": 75,
          "target": 89,
          "percentTarget": 84.27
        }
      }
    },
    "ekosistem": {
      "bodBocSME": {
        "today": 19,
        "target": 20,
        "percentTarget": 95
      },
      "bodBocCMC": {
        "today": 116,
        "target": 102,
        "percentTarget": 113.73
      },
      "bodBocCB": {
        "today": 12,
        "target": 15,
        "percentTarget": 80.0
      },
      "familyTree": {
        "today": 9,
        "target": 8,
        "percentTarget": 112.5
      },
      "warungViral": {
        "today": 210,
        "target": 191,
        "percentTarget": 109.95
      },
      "spbu": {
        "today": 9,
        "target": 9,
        "percentTarget": 100
      },
      "kdkmp": {
        "today": 14,
        "target": 14,
        "percentTarget": 100
      },
      "sppg": {
        "today": 13,
        "target": 13,
        "percentTarget": 100
      },
      "billReminder": {
        "today": 103,
        "target": 122,
        "percentTarget": 84.43
      }
    }
  },
  {
    "code": "12404",
    "class": "B.2",
    "name": "Jakarta Tebet Supomo",
    "bpa": {
      "cm": 8.7,
      "nii": 5.8,
      "assetSpread": 1.9,
      "liabilitiesSpread": 1.6,
      "fbi": 2.5
    },
    "funding": {
      "lagging": {
        "tabungan": {
          "today": 84,
          "wtd": -0.45,
          "mtd": 3.29,
          "ytd": 0.39,
          "yoy": -11.92,
          "target": 81.98,
          "percentTarget": 102.47
        },
        "giro": {
          "today": 122.06,
          "wtd": 3.16,
          "mtd": -2.19,
          "ytd": 1.44,
          "yoy": -5.38,
          "target": 127.11,
          "percentTarget": 96.02
        },
        "deposito": {
          "today": 177.05,
          "wtd": 4.62,
          "mtd": 0.01,
          "ytd": -5.21,
          "yoy": 23.61,
          "target": 180.03,
          "percentTarget": 98.35
        }
      },
      "leading": {
        "newCifTabungan": {
          "today": 54,
          "target": 56,
          "percentTarget": 96.43
        },
        "newCifGiro": {
          "today": 9,
          "target": 10,
          "percentTarget": 90
        },
        "newCifTabunganBisnis": {
          "today": 6,
          "target": 6,
          "percentTarget": 100
        },
        "newToPriority": {
          "today": 11,
          "target": 10,
          "percentTarget": 110
        }
      }
    },
    "kredit": {
      "lagging": {
        "sme": {
          "today": 1184.42,
          "wtd": -0.91,
          "mtd": 0.35,
          "ytd": 4.6,
          "yoy": 45.31,
          "target": 1276.18,
          "percentTarget": 92.81
        },
        "cl": {
          "today": 611.86,
          "wtd": 1.98,
          "mtd": 0.87,
          "ytd": 10.57,
          "yoy": 62.28,
          "target": 639.97,
          "percentTarget": 95.61
        },
        "ksm": {
          "today": 453.95,
          "wtd": 1.25,
          "mtd": 0.18,
          "ytd": 36.12,
          "yoy": -9.55,
          "target": 475.51,
          "percentTarget": 95.46
        },
        "cc": {
          "today": 305.36,
          "wtd": 2.01,
          "mtd": 2.48,
          "ytd": -5.86,
          "yoy": -1.75,
          "target": 332.21,
          "percentTarget": 91.92
        },
        "micro": {
          "today": 209.29,
          "wtd": 1.47,
          "mtd": 5.95,
          "ytd": 24.82,
          "yoy": 62.87,
          "target": 210.43,
          "percentTarget": 99.46
        }
      },
      "leading": {
        "bookingSME": {
          "today": 23,
          "target": 27,
          "percentTarget": 85.19
        },
        "bookingCL": {
          "today": 32,
          "target": 34,
          "percentTarget": 94.12
        },
        "bookingKSM": {
          "today": 51,
          "target": 55,
          "percentTarget": 92.73
        },
        "bookingCC": {
          "today": 128,
          "target": 129,
          "percentTarget": 99.22
        },
        "bookingMicro": {
          "today": 83,
          "target": 99,
          "percentTarget": 83.84
        }
      }
    },
    "ekosistem": {
      "bodBocSME": {
        "today": 32,
        "target": 35,
        "percentTarget": 91.43
      },
      "bodBocCMC": {
        "today": 51,
        "target": 43,
        "percentTarget": 118.6
      },
      "bodBocCB": {
        "today": 12,
        "target": 15,
        "percentTarget": 80.0
      },
      "familyTree": {
        "today": 15,
        "target": 13,
        "percentTarget": 115.38
      },
      "warungViral": {
        "today": 68,
        "target": 73,
        "percentTarget": 93.15
      },
      "spbu": {
        "today": 2,
        "target": 2,
        "percentTarget": 100
      },
      "kdkmp": {
        "today": 27,
        "target": 30,
        "percentTarget": 90
      },
      "sppg": {
        "today": 46,
        "target": 41,
        "percentTarget": 112.2
      },
      "billReminder": {
        "today": 123,
        "target": 109,
        "percentTarget": 112.84
      }
    }
  },
  {
    "code": "12405",
    "class": "B.2",
    "name": "Jakarta Plaza Setiabudi",
    "bpa": {
      "cm": 9.1,
      "nii": 6,
      "assetSpread": 2,
      "liabilitiesSpread": 1.7,
      "fbi": 2.7
    },
    "funding": {
      "lagging": {
        "tabungan": {
          "today": 81.76,
          "wtd": 0.81,
          "mtd": 4,
          "ytd": 1.28,
          "yoy": -0.88,
          "target": 73.65,
          "percentTarget": 111.01
        },
        "giro": {
          "today": 132,
          "wtd": -0.67,
          "mtd": 2.25,
          "ytd": -9.27,
          "yoy": 12.14,
          "target": 153.17,
          "percentTarget": 86.18
        },
        "deposito": {
          "today": 211.07,
          "wtd": 0.09,
          "mtd": -7.33,
          "ytd": -18.67,
          "yoy": -19.49,
          "target": 207.09,
          "percentTarget": 101.92
        }
      },
      "leading": {
        "newCifTabungan": {
          "today": 44,
          "target": 53,
          "percentTarget": 83.02
        },
        "newCifGiro": {
          "today": 10,
          "target": 10,
          "percentTarget": 100
        },
        "newCifTabunganBisnis": {
          "today": 21,
          "target": 22,
          "percentTarget": 95.45
        },
        "newToPriority": {
          "today": 10,
          "target": 10,
          "percentTarget": 100
        }
      }
    },
    "kredit": {
      "lagging": {
        "sme": {
          "today": 1084.72,
          "wtd": 0.26,
          "mtd": -2.42,
          "ytd": 39.61,
          "yoy": -4.65,
          "target": 1124.45,
          "percentTarget": 96.47
        },
        "cl": {
          "today": 652.65,
          "wtd": 2.03,
          "mtd": 8.74,
          "ytd": 16.62,
          "yoy": 37.4,
          "target": 664.68,
          "percentTarget": 98.19
        },
        "ksm": {
          "today": 433.8,
          "wtd": -1.79,
          "mtd": 1.89,
          "ytd": 3.39,
          "yoy": 73.02,
          "target": 465.06,
          "percentTarget": 93.28
        },
        "cc": {
          "today": 311.09,
          "wtd": 1.39,
          "mtd": 4.53,
          "ytd": -1.84,
          "yoy": -2.59,
          "target": 312.36,
          "percentTarget": 99.59
        },
        "micro": {
          "today": 204.4,
          "wtd": -0.12,
          "mtd": 6.42,
          "ytd": 16.08,
          "yoy": -16.65,
          "target": 218.83,
          "percentTarget": 93.4
        }
      },
      "leading": {
        "bookingSME": {
          "today": 29,
          "target": 31,
          "percentTarget": 93.55
        },
        "bookingCL": {
          "today": 36,
          "target": 40,
          "percentTarget": 90
        },
        "bookingKSM": {
          "today": 48,
          "target": 50,
          "percentTarget": 96
        },
        "bookingCC": {
          "today": 130,
          "target": 144,
          "percentTarget": 90.28
        },
        "bookingMicro": {
          "today": 75,
          "target": 81,
          "percentTarget": 92.59
        }
      }
    },
    "ekosistem": {
      "bodBocSME": {
        "today": 31,
        "target": 35,
        "percentTarget": 88.57
      },
      "bodBocCMC": {
        "today": 128,
        "target": 112,
        "percentTarget": 114.29
      },
      "bodBocCB": {
        "today": 12,
        "target": 15,
        "percentTarget": 80.0
      },
      "familyTree": {
        "today": 23,
        "target": 24,
        "percentTarget": 95.83
      },
      "warungViral": {
        "today": 91,
        "target": 86,
        "percentTarget": 105.81
      },
      "spbu": {
        "today": 7,
        "target": 8,
        "percentTarget": 87.5
      },
      "kdkmp": {
        "today": 37,
        "target": 42,
        "percentTarget": 88.1
      },
      "sppg": {
        "today": 28,
        "target": 33,
        "percentTarget": 84.85
      },
      "billReminder": {
        "today": 330,
        "target": 336,
        "percentTarget": 98.21
      }
    }
  },
  {
    "code": "12408",
    "class": "B.2",
    "name": "Jakarta Saharjo",
    "bpa": {
      "cm": 7.8,
      "nii": 5.1,
      "assetSpread": 1.7,
      "liabilitiesSpread": 1.4,
      "fbi": 2.2
    },
    "funding": {
      "lagging": {
        "tabungan": {
          "today": 64.5,
          "wtd": -0.1,
          "mtd": -0.5,
          "ytd": -0.78,
          "yoy": 6.49,
          "target": 75.57,
          "percentTarget": 85.35
        },
        "giro": {
          "today": 125.91,
          "wtd": -2.16,
          "mtd": -1.47,
          "ytd": 6.62,
          "yoy": -10.39,
          "target": 117.76,
          "percentTarget": 106.92
        },
        "deposito": {
          "today": 180.41,
          "wtd": -0.32,
          "mtd": -2.19,
          "ytd": 2.73,
          "yoy": 23.56,
          "target": 169.69,
          "percentTarget": 106.32
        }
      },
      "leading": {
        "newCifTabungan": {
          "today": 23,
          "target": 23,
          "percentTarget": 100
        },
        "newCifGiro": {
          "today": 9,
          "target": 9,
          "percentTarget": 100
        },
        "newCifTabunganBisnis": {
          "today": 20,
          "target": 24,
          "percentTarget": 83.33
        },
        "newToPriority": {
          "today": 5,
          "target": 5,
          "percentTarget": 100
        }
      }
    },
    "kredit": {
      "lagging": {
        "sme": {
          "today": 1100.07,
          "wtd": -1.13,
          "mtd": -3.73,
          "ytd": 6.85,
          "yoy": -6.59,
          "target": 1142.02,
          "percentTarget": 96.33
        },
        "cl": {
          "today": 630.96,
          "wtd": -1.83,
          "mtd": 7.24,
          "ytd": 14.87,
          "yoy": 4.09,
          "target": 685.29,
          "percentTarget": 92.07
        },
        "ksm": {
          "today": 449.4,
          "wtd": -1.45,
          "mtd": 8.22,
          "ytd": -7.03,
          "yoy": 27.37,
          "target": 469.39,
          "percentTarget": 95.74
        },
        "cc": {
          "today": 305.96,
          "wtd": 1.51,
          "mtd": 5.99,
          "ytd": 32.63,
          "yoy": 39.42,
          "target": 324.34,
          "percentTarget": 94.33
        },
        "micro": {
          "today": 221.28,
          "wtd": -0.75,
          "mtd": 5.46,
          "ytd": 28.31,
          "yoy": 51.58,
          "target": 233.32,
          "percentTarget": 94.84
        }
      },
      "leading": {
        "bookingSME": {
          "today": 20,
          "target": 20,
          "percentTarget": 100
        },
        "bookingCL": {
          "today": 42,
          "target": 49,
          "percentTarget": 85.71
        },
        "bookingKSM": {
          "today": 51,
          "target": 53,
          "percentTarget": 96.23
        },
        "bookingCC": {
          "today": 131,
          "target": 134,
          "percentTarget": 97.76
        },
        "bookingMicro": {
          "today": 63,
          "target": 68,
          "percentTarget": 92.65
        }
      }
    },
    "ekosistem": {
      "bodBocSME": {
        "today": 36,
        "target": 40,
        "percentTarget": 90
      },
      "bodBocCMC": {
        "today": 105,
        "target": 91,
        "percentTarget": 115.38
      },
      "bodBocCB": {
        "today": 12,
        "target": 15,
        "percentTarget": 80.0
      },
      "familyTree": {
        "today": 21,
        "target": 21,
        "percentTarget": 100
      },
      "warungViral": {
        "today": 184,
        "target": 226,
        "percentTarget": 81.42
      },
      "spbu": {
        "today": 6,
        "target": 7,
        "percentTarget": 85.71
      },
      "kdkmp": {
        "today": 34,
        "target": 29,
        "percentTarget": 117.24
      },
      "sppg": {
        "today": 20,
        "target": 21,
        "percentTarget": 95.24
      },
      "billReminder": {
        "today": 212,
        "target": 207,
        "percentTarget": 102.42
      }
    }
  },
  {
    "code": "12414",
    "class": "B.2",
    "name": "Jakarta Trinity Tower",
    "bpa": {
      "cm": 8.4,
      "nii": 5.5,
      "assetSpread": 1.8,
      "liabilitiesSpread": 1.5,
      "fbi": 2.4
    },
    "funding": {
      "lagging": {
        "tabungan": {
          "today": 93.1,
          "wtd": -1.62,
          "mtd": -1.99,
          "ytd": -8.42,
          "yoy": 1.41,
          "target": 92.72,
          "percentTarget": 100.41
        },
        "giro": {
          "today": 146.68,
          "wtd": 1.39,
          "mtd": 6.96,
          "ytd": 8.05,
          "yoy": 6.47,
          "target": 134.17,
          "percentTarget": 109.32
        },
        "deposito": {
          "today": 134.8,
          "wtd": 3.48,
          "mtd": 0.96,
          "ytd": 10.31,
          "yoy": -9.02,
          "target": 127.28,
          "percentTarget": 105.91
        }
      },
      "leading": {
        "newCifTabungan": {
          "today": 116,
          "target": 125,
          "percentTarget": 92.8
        },
        "newCifGiro": {
          "today": 7,
          "target": 8,
          "percentTarget": 87.5
        },
        "newCifTabunganBisnis": {
          "today": 27,
          "target": 31,
          "percentTarget": 87.1
        },
        "newToPriority": {
          "today": 5,
          "target": 6,
          "percentTarget": 83.33
        }
      }
    },
    "kredit": {
      "lagging": {
        "sme": {
          "today": 1110.59,
          "wtd": 0.08,
          "mtd": 7.53,
          "ytd": 33.21,
          "yoy": -12.42,
          "target": 1141.59,
          "percentTarget": 97.28
        },
        "cl": {
          "today": 676.76,
          "wtd": -1.8,
          "mtd": -0.22,
          "ytd": 25.33,
          "yoy": -6.5,
          "target": 722.69,
          "percentTarget": 93.64
        },
        "ksm": {
          "today": 448.82,
          "wtd": -0.26,
          "mtd": -0.18,
          "ytd": 25.01,
          "yoy": -0.09,
          "target": 450.26,
          "percentTarget": 99.68
        },
        "cc": {
          "today": 338.88,
          "wtd": 1.87,
          "mtd": -1.56,
          "ytd": 39.19,
          "yoy": -13.81,
          "target": 372.55,
          "percentTarget": 90.96
        },
        "micro": {
          "today": 213.23,
          "wtd": 1.09,
          "mtd": -0.4,
          "ytd": -9.75,
          "yoy": 78.32,
          "target": 227.09,
          "percentTarget": 93.9
        }
      },
      "leading": {
        "bookingSME": {
          "today": 28,
          "target": 33,
          "percentTarget": 84.85
        },
        "bookingCL": {
          "today": 44,
          "target": 44,
          "percentTarget": 100
        },
        "bookingKSM": {
          "today": 48,
          "target": 55,
          "percentTarget": 87.27
        },
        "bookingCC": {
          "today": 136,
          "target": 150,
          "percentTarget": 90.67
        },
        "bookingMicro": {
          "today": 88,
          "target": 104,
          "percentTarget": 84.62
        }
      }
    },
    "ekosistem": {
      "bodBocSME": {
        "today": 25,
        "target": 28,
        "percentTarget": 89.29
      },
      "bodBocCMC": {
        "today": 32,
        "target": 28,
        "percentTarget": 114.29
      },
      "bodBocCB": {
        "today": 12,
        "target": 15,
        "percentTarget": 80.0
      },
      "familyTree": {
        "today": 19,
        "target": 18,
        "percentTarget": 105.56
      },
      "warungViral": {
        "today": 101,
        "target": 98,
        "percentTarget": 103.06
      },
      "spbu": {
        "today": 5,
        "target": 5,
        "percentTarget": 100
      },
      "kdkmp": {
        "today": 27,
        "target": 23,
        "percentTarget": 117.39
      },
      "sppg": {
        "today": 48,
        "target": 50,
        "percentTarget": 96
      },
      "billReminder": {
        "today": 202,
        "target": 247,
        "percentTarget": 81.78
      }
    }
  },
  {
    "code": "12417",
    "class": "B.2",
    "name": "Jakarta Kalibata",
    "bpa": {
      "cm": 7.2,
      "nii": 4.8,
      "assetSpread": 1.5,
      "liabilitiesSpread": 1.3,
      "fbi": 2
    },
    "funding": {
      "lagging": {
        "tabungan": {
          "today": 85.18,
          "wtd": -1.44,
          "mtd": -1.28,
          "ytd": -6.2,
          "yoy": 4.83,
          "target": 93.82,
          "percentTarget": 90.79
        },
        "giro": {
          "today": 109.53,
          "wtd": 1.43,
          "mtd": -0.01,
          "ytd": 9.87,
          "yoy": -0.36,
          "target": 98.88,
          "percentTarget": 110.78
        },
        "deposito": {
          "today": 139.59,
          "wtd": -0.93,
          "mtd": -0.58,
          "ytd": 4.45,
          "yoy": 18.12,
          "target": 153.17,
          "percentTarget": 91.13
        }
      },
      "leading": {
        "newCifTabungan": {
          "today": 116,
          "target": 127,
          "percentTarget": 91.34
        },
        "newCifGiro": {
          "today": 4,
          "target": 4,
          "percentTarget": 100
        },
        "newCifTabunganBisnis": {
          "today": 15,
          "target": 14,
          "percentTarget": 107.14
        },
        "newToPriority": {
          "today": 4,
          "target": 5,
          "percentTarget": 80
        }
      }
    },
    "kredit": {
      "lagging": {
        "sme": {
          "today": 1144.03,
          "wtd": -1.79,
          "mtd": 4.28,
          "ytd": 19.11,
          "yoy": 61.72,
          "target": 1238.8,
          "percentTarget": 92.35
        },
        "cl": {
          "today": 611.33,
          "wtd": 1.76,
          "mtd": 7.26,
          "ytd": 0.52,
          "yoy": 20.61,
          "target": 654.66,
          "percentTarget": 93.38
        },
        "ksm": {
          "today": 412.46,
          "wtd": 0.21,
          "mtd": -4.84,
          "ytd": 13.82,
          "yoy": -11.08,
          "target": 451.82,
          "percentTarget": 91.29
        },
        "cc": {
          "today": 337.1,
          "wtd": 2.44,
          "mtd": 0.1,
          "ytd": 16.95,
          "yoy": -2.17,
          "target": 358.97,
          "percentTarget": 93.91
        },
        "micro": {
          "today": 232.59,
          "wtd": 2.72,
          "mtd": 0.14,
          "ytd": 35.18,
          "yoy": 52.33,
          "target": 240.63,
          "percentTarget": 96.66
        }
      },
      "leading": {
        "bookingSME": {
          "today": 24,
          "target": 26,
          "percentTarget": 92.31
        },
        "bookingCL": {
          "today": 33,
          "target": 37,
          "percentTarget": 89.19
        },
        "bookingKSM": {
          "today": 51,
          "target": 57,
          "percentTarget": 89.47
        },
        "bookingCC": {
          "today": 107,
          "target": 108,
          "percentTarget": 99.07
        },
        "bookingMicro": {
          "today": 62,
          "target": 71,
          "percentTarget": 87.32
        }
      }
    },
    "ekosistem": {
      "bodBocSME": {
        "today": 65,
        "target": 55,
        "percentTarget": 118.18
      },
      "bodBocCMC": {
        "today": 46,
        "target": 58,
        "percentTarget": 79.31
      },
      "bodBocCB": {
        "today": 12,
        "target": 15,
        "percentTarget": 80.0
      },
      "familyTree": {
        "today": 34,
        "target": 31,
        "percentTarget": 109.68
      },
      "warungViral": {
        "today": 109,
        "target": 97,
        "percentTarget": 112.37
      },
      "spbu": {
        "today": 7,
        "target": 9,
        "percentTarget": 77.78
      },
      "kdkmp": {
        "today": 24,
        "target": 29,
        "percentTarget": 82.76
      },
      "sppg": {
        "today": 25,
        "target": 27,
        "percentTarget": 92.59
      },
      "billReminder": {
        "today": 118,
        "target": 100,
        "percentTarget": 118
      }
    }
  },
  {
    "code": "12418",
    "class": "B.2",
    "name": "Jakarta Pasar Minggu",
    "bpa": {
      "cm": 8.9,
      "nii": 5.9,
      "assetSpread": 2,
      "liabilitiesSpread": 1.6,
      "fbi": 2.6
    },
    "funding": {
      "lagging": {
        "tabungan": {
          "today": 103.26,
          "wtd": -0.1,
          "mtd": 1.68,
          "ytd": -9.26,
          "yoy": -2.7,
          "target": 115.48,
          "percentTarget": 89.42
        },
        "giro": {
          "today": 146.34,
          "wtd": 1.75,
          "mtd": 6.62,
          "ytd": 9.07,
          "yoy": 18.02,
          "target": 170.43,
          "percentTarget": 85.86
        },
        "deposito": {
          "today": 208.66,
          "wtd": -0.55,
          "mtd": -3.73,
          "ytd": 20.38,
          "yoy": -14.31,
          "target": 248.42,
          "percentTarget": 84
        }
      },
      "leading": {
        "newCifTabungan": {
          "today": 46,
          "target": 47,
          "percentTarget": 97.87
        },
        "newCifGiro": {
          "today": 14,
          "target": 15,
          "percentTarget": 93.33
        },
        "newCifTabunganBisnis": {
          "today": 25,
          "target": 24,
          "percentTarget": 104.17
        },
        "newToPriority": {
          "today": 8,
          "target": 10,
          "percentTarget": 80
        }
      }
    },
    "kredit": {
      "lagging": {
        "sme": {
          "today": 1054.07,
          "wtd": 1.91,
          "mtd": 3.15,
          "ytd": -4.02,
          "yoy": 33.89,
          "target": 1141.26,
          "percentTarget": 92.36
        },
        "cl": {
          "today": 678.78,
          "wtd": 0.11,
          "mtd": 1.52,
          "ytd": -5.55,
          "yoy": 30.38,
          "target": 740.18,
          "percentTarget": 91.71
        },
        "ksm": {
          "today": 450,
          "wtd": -1.17,
          "mtd": 8.22,
          "ytd": 15.3,
          "yoy": 27.08,
          "target": 470.64,
          "percentTarget": 95.62
        },
        "cc": {
          "today": 327.04,
          "wtd": 1.93,
          "mtd": 9.14,
          "ytd": 19.95,
          "yoy": -6.43,
          "target": 354.66,
          "percentTarget": 92.21
        },
        "micro": {
          "today": 222.75,
          "wtd": 2.84,
          "mtd": 8.73,
          "ytd": 16.68,
          "yoy": -9.8,
          "target": 241.22,
          "percentTarget": 92.34
        }
      },
      "leading": {
        "bookingSME": {
          "today": 25,
          "target": 29,
          "percentTarget": 86.21
        },
        "bookingCL": {
          "today": 37,
          "target": 40,
          "percentTarget": 92.5
        },
        "bookingKSM": {
          "today": 52,
          "target": 58,
          "percentTarget": 89.66
        },
        "bookingCC": {
          "today": 143,
          "target": 143,
          "percentTarget": 100
        },
        "bookingMicro": {
          "today": 89,
          "target": 95,
          "percentTarget": 93.68
        }
      }
    },
    "ekosistem": {
      "bodBocSME": {
        "today": 45,
        "target": 53,
        "percentTarget": 84.91
      },
      "bodBocCMC": {
        "today": 60,
        "target": 73,
        "percentTarget": 82.19
      },
      "bodBocCB": {
        "today": 12,
        "target": 15,
        "percentTarget": 80.0
      },
      "familyTree": {
        "today": 29,
        "target": 24,
        "percentTarget": 120.83
      },
      "warungViral": {
        "today": 174,
        "target": 157,
        "percentTarget": 110.83
      },
      "spbu": {
        "today": 2,
        "target": 2,
        "percentTarget": 100
      },
      "kdkmp": {
        "today": 10,
        "target": 10,
        "percentTarget": 100
      },
      "sppg": {
        "today": 36,
        "target": 42,
        "percentTarget": 85.71
      },
      "billReminder": {
        "today": 295,
        "target": 262,
        "percentTarget": 112.6
      }
    }
  },
  {
    "code": "12423",
    "class": "B.2",
    "name": "Jakarta Pancoran L'Avenue",
    "bpa": {
      "cm": 7.5,
      "nii": 5,
      "assetSpread": 1.6,
      "liabilitiesSpread": 1.4,
      "fbi": 2.1
    },
    "funding": {
      "lagging": {
        "tabungan": {
          "today": 72.74,
          "wtd": 0.19,
          "mtd": -3.61,
          "ytd": -3.55,
          "yoy": -7.56,
          "target": 79.28,
          "percentTarget": 91.76
        },
        "giro": {
          "today": 110.42,
          "wtd": 3.14,
          "mtd": -4.6,
          "ytd": 0.91,
          "yoy": -11.22,
          "target": 118.25,
          "percentTarget": 93.37
        },
        "deposito": {
          "today": 148.97,
          "wtd": 2.07,
          "mtd": 0.67,
          "ytd": -9.69,
          "yoy": 1.82,
          "target": 144.67,
          "percentTarget": 102.98
        }
      },
      "leading": {
        "newCifTabungan": {
          "today": 117,
          "target": 120,
          "percentTarget": 97.5
        },
        "newCifGiro": {
          "today": 14,
          "target": 16,
          "percentTarget": 87.5
        },
        "newCifTabunganBisnis": {
          "today": 18,
          "target": 19,
          "percentTarget": 94.74
        },
        "newToPriority": {
          "today": 7,
          "target": 8,
          "percentTarget": 87.5
        }
      }
    },
    "kredit": {
      "lagging": {
        "sme": {
          "today": 1160.13,
          "wtd": -0.58,
          "mtd": 3.8,
          "ytd": 9.58,
          "yoy": 17.93,
          "target": 1164.08,
          "percentTarget": 99.66
        },
        "cl": {
          "today": 634.25,
          "wtd": -1.12,
          "mtd": 4.34,
          "ytd": 22.71,
          "yoy": 44.57,
          "target": 695.81,
          "percentTarget": 91.15
        },
        "ksm": {
          "today": 426.38,
          "wtd": -1.47,
          "mtd": 7.7,
          "ytd": -2.59,
          "yoy": 6.04,
          "target": 447.86,
          "percentTarget": 95.2
        },
        "cc": {
          "today": 334.14,
          "wtd": -1.56,
          "mtd": 2.21,
          "ytd": 28.56,
          "yoy": 53.42,
          "target": 350.99,
          "percentTarget": 95.2
        },
        "micro": {
          "today": 224.38,
          "wtd": -0.03,
          "mtd": 2.02,
          "ytd": 15.46,
          "yoy": 73.78,
          "target": 235.37,
          "percentTarget": 95.33
        }
      },
      "leading": {
        "bookingSME": {
          "today": 28,
          "target": 32,
          "percentTarget": 87.5
        },
        "bookingCL": {
          "today": 43,
          "target": 50,
          "percentTarget": 86
        },
        "bookingKSM": {
          "today": 45,
          "target": 53,
          "percentTarget": 84.91
        },
        "bookingCC": {
          "today": 117,
          "target": 132,
          "percentTarget": 88.64
        },
        "bookingMicro": {
          "today": 84,
          "target": 99,
          "percentTarget": 84.85
        }
      }
    },
    "ekosistem": {
      "bodBocSME": {
        "today": 52,
        "target": 54,
        "percentTarget": 96.3
      },
      "bodBocCMC": {
        "today": 42,
        "target": 39,
        "percentTarget": 107.69
      },
      "bodBocCB": {
        "today": 12,
        "target": 15,
        "percentTarget": 80.0
      },
      "familyTree": {
        "today": 34,
        "target": 30,
        "percentTarget": 113.33
      },
      "warungViral": {
        "today": 63,
        "target": 69,
        "percentTarget": 91.3
      },
      "spbu": {
        "today": 2,
        "target": 2,
        "percentTarget": 100
      },
      "kdkmp": {
        "today": 38,
        "target": 45,
        "percentTarget": 84.44
      },
      "sppg": {
        "today": 41,
        "target": 37,
        "percentTarget": 110.81
      },
      "billReminder": {
        "today": 228,
        "target": 240,
        "percentTarget": 95
      }
    }
  },
  {
    "code": "12433",
    "class": "B.2",
    "name": "Jakarta Plaza BP Jamsostek",
    "bpa": {
      "cm": 8.1,
      "nii": 5.3,
      "assetSpread": 1.7,
      "liabilitiesSpread": 1.5,
      "fbi": 2.3
    },
    "funding": {
      "lagging": {
        "tabungan": {
          "today": 72.02,
          "wtd": -0.13,
          "mtd": -1.8,
          "ytd": 4.68,
          "yoy": 3.5,
          "target": 80.61,
          "percentTarget": 89.34
        },
        "giro": {
          "today": 113.78,
          "wtd": -1.24,
          "mtd": -0.99,
          "ytd": -8.95,
          "yoy": -7.12,
          "target": 109.73,
          "percentTarget": 103.69
        },
        "deposito": {
          "today": 133.11,
          "wtd": -2.43,
          "mtd": 2.99,
          "ytd": 9.67,
          "yoy": -7.02,
          "target": 141.91,
          "percentTarget": 93.8
        }
      },
      "leading": {
        "newCifTabungan": {
          "today": 24,
          "target": 23,
          "percentTarget": 104.35
        },
        "newCifGiro": {
          "today": 15,
          "target": 18,
          "percentTarget": 83.33
        },
        "newCifTabunganBisnis": {
          "today": 23,
          "target": 22,
          "percentTarget": 104.55
        },
        "newToPriority": {
          "today": 5,
          "target": 5,
          "percentTarget": 100
        }
      }
    },
    "kredit": {
      "lagging": {
        "sme": {
          "today": 1142.3,
          "wtd": 2.5,
          "mtd": 3.29,
          "ytd": 13,
          "yoy": -10.11,
          "target": 1157.81,
          "percentTarget": 98.66
        },
        "cl": {
          "today": 686.78,
          "wtd": 2.9,
          "mtd": -0.06,
          "ytd": -8.63,
          "yoy": -1.22,
          "target": 712.48,
          "percentTarget": 96.39
        },
        "ksm": {
          "today": 413.9,
          "wtd": -1.14,
          "mtd": 5.7,
          "ytd": -8.57,
          "yoy": 35.77,
          "target": 441.32,
          "percentTarget": 93.79
        },
        "cc": {
          "today": 354.68,
          "wtd": 0.53,
          "mtd": 10,
          "ytd": 11.29,
          "yoy": 57.89,
          "target": 387.03,
          "percentTarget": 91.64
        },
        "micro": {
          "today": 207.06,
          "wtd": 1.72,
          "mtd": 6.77,
          "ytd": 33.01,
          "yoy": 67.32,
          "target": 221.53,
          "percentTarget": 93.47
        }
      },
      "leading": {
        "bookingSME": {
          "today": 29,
          "target": 33,
          "percentTarget": 87.88
        },
        "bookingCL": {
          "today": 36,
          "target": 42,
          "percentTarget": 85.71
        },
        "bookingKSM": {
          "today": 54,
          "target": 57,
          "percentTarget": 94.74
        },
        "bookingCC": {
          "today": 136,
          "target": 146,
          "percentTarget": 93.15
        },
        "bookingMicro": {
          "today": 82,
          "target": 87,
          "percentTarget": 94.25
        }
      }
    },
    "ekosistem": {
      "bodBocSME": {
        "today": 40,
        "target": 39,
        "percentTarget": 102.56
      },
      "bodBocCMC": {
        "today": 67,
        "target": 60,
        "percentTarget": 111.67
      },
      "bodBocCB": {
        "today": 12,
        "target": 15,
        "percentTarget": 80.0
      },
      "familyTree": {
        "today": 31,
        "target": 29,
        "percentTarget": 106.9
      },
      "warungViral": {
        "today": 180,
        "target": 187,
        "percentTarget": 96.26
      },
      "spbu": {
        "today": 9,
        "target": 11,
        "percentTarget": 81.82
      },
      "kdkmp": {
        "today": 27,
        "target": 28,
        "percentTarget": 96.43
      },
      "sppg": {
        "today": 13,
        "target": 15,
        "percentTarget": 86.67
      },
      "billReminder": {
        "today": 360,
        "target": 314,
        "percentTarget": 114.65
      }
    }
  },
  {
    "code": "12406",
    "class": "B.3",
    "name": "Jakarta Lapangan Ros",
    "bpa": {
      "cm": 5.4,
      "nii": 3.5,
      "assetSpread": 1.2,
      "liabilitiesSpread": 1,
      "fbi": 1.5
    },
    "funding": {
      "lagging": {
        "tabungan": {
          "today": 52.26,
          "wtd": -0.53,
          "mtd": 2.37,
          "ytd": 2.9,
          "yoy": 4.98,
          "target": 47.19,
          "percentTarget": 110.75
        },
        "giro": {
          "today": 80.75,
          "wtd": 2.3,
          "mtd": -0.84,
          "ytd": 4.71,
          "yoy": 8.26,
          "target": 80.02,
          "percentTarget": 100.91
        },
        "deposito": {
          "today": 126.3,
          "wtd": -0.92,
          "mtd": -6.24,
          "ytd": 1.28,
          "yoy": 10.05,
          "target": 116.28,
          "percentTarget": 108.61
        }
      },
      "leading": {
        "newCifTabungan": {
          "today": 111,
          "target": 104,
          "percentTarget": 106.73
        },
        "newCifGiro": {
          "today": 8,
          "target": 10,
          "percentTarget": 80
        },
        "newCifTabunganBisnis": {
          "today": 22,
          "target": 21,
          "percentTarget": 104.76
        },
        "newToPriority": {
          "today": 7,
          "target": 8,
          "percentTarget": 87.5
        }
      }
    },
    "kredit": {
      "lagging": {
        "sme": {
          "today": 571.64,
          "wtd": -0.19,
          "mtd": 7.37,
          "ytd": 3.29,
          "yoy": 35.51,
          "target": 575.5,
          "percentTarget": 99.33
        },
        "cl": {
          "today": 333.41,
          "wtd": -0.83,
          "mtd": 0.01,
          "ytd": 15.92,
          "yoy": 54.3,
          "target": 339.79,
          "percentTarget": 98.12
        },
        "ksm": {
          "today": 221.28,
          "wtd": -1.91,
          "mtd": -2.48,
          "ytd": 12.2,
          "yoy": -11.69,
          "target": 224.01,
          "percentTarget": 98.78
        },
        "cc": {
          "today": 179.01,
          "wtd": 2,
          "mtd": 0.69,
          "ytd": 36.99,
          "yoy": 9.97,
          "target": 180.27,
          "percentTarget": 99.3
        },
        "micro": {
          "today": 116.2,
          "wtd": -0.62,
          "mtd": 4.49,
          "ytd": 27.98,
          "yoy": 13.74,
          "target": 116.54,
          "percentTarget": 99.71
        }
      },
      "leading": {
        "bookingSME": {
          "today": 14,
          "target": 16,
          "percentTarget": 87.5
        },
        "bookingCL": {
          "today": 22,
          "target": 24,
          "percentTarget": 91.67
        },
        "bookingKSM": {
          "today": 20,
          "target": 20,
          "percentTarget": 100
        },
        "bookingCC": {
          "today": 51,
          "target": 56,
          "percentTarget": 91.07
        },
        "bookingMicro": {
          "today": 44,
          "target": 47,
          "percentTarget": 93.62
        }
      }
    },
    "ekosistem": {
      "bodBocSME": {
        "today": 14,
        "target": 17,
        "percentTarget": 82.35
      },
      "bodBocCMC": {
        "today": 38,
        "target": 37,
        "percentTarget": 102.7
      },
      "bodBocCB": {
        "today": 12,
        "target": 15,
        "percentTarget": 80.0
      },
      "familyTree": {
        "today": 28,
        "target": 28,
        "percentTarget": 100
      },
      "warungViral": {
        "today": 180,
        "target": 167,
        "percentTarget": 107.78
      },
      "spbu": {
        "today": 6,
        "target": 7,
        "percentTarget": 85.71
      },
      "kdkmp": {
        "today": 13,
        "target": 16,
        "percentTarget": 81.25
      },
      "sppg": {
        "today": 42,
        "target": 44,
        "percentTarget": 95.45
      },
      "billReminder": {
        "today": 327,
        "target": 275,
        "percentTarget": 118.91
      }
    }
  },
  {
    "code": "12409",
    "class": "B.3",
    "name": "Jakarta Tebet Barat",
    "bpa": {
      "cm": 6.1,
      "nii": 4,
      "assetSpread": 1.3,
      "liabilitiesSpread": 1.1,
      "fbi": 1.7
    },
    "funding": {
      "lagging": {
        "tabungan": {
          "today": 60.63,
          "wtd": -1.14,
          "mtd": 2.29,
          "ytd": -1.17,
          "yoy": -1.85,
          "target": 69.26,
          "percentTarget": 87.54
        },
        "giro": {
          "today": 75,
          "wtd": 1.41,
          "mtd": -3.23,
          "ytd": -4.98,
          "yoy": -1.38,
          "target": 68.25,
          "percentTarget": 109.88
        },
        "deposito": {
          "today": 118.63,
          "wtd": -2.36,
          "mtd": -2.23,
          "ytd": -0.89,
          "yoy": 6.02,
          "target": 113.64,
          "percentTarget": 104.39
        }
      },
      "leading": {
        "newCifTabungan": {
          "today": 83,
          "target": 79,
          "percentTarget": 105.06
        },
        "newCifGiro": {
          "today": 7,
          "target": 9,
          "percentTarget": 77.78
        },
        "newCifTabunganBisnis": {
          "today": 29,
          "target": 32,
          "percentTarget": 90.63
        },
        "newToPriority": {
          "today": 3,
          "target": 4,
          "percentTarget": 75
        }
      }
    },
    "kredit": {
      "lagging": {
        "sme": {
          "today": 571.37,
          "wtd": 0.17,
          "mtd": -3.1,
          "ytd": 10.13,
          "yoy": 18.82,
          "target": 593.04,
          "percentTarget": 96.35
        },
        "cl": {
          "today": 334.18,
          "wtd": 0.67,
          "mtd": -3.08,
          "ytd": -3.84,
          "yoy": 3.74,
          "target": 346.75,
          "percentTarget": 96.38
        },
        "ksm": {
          "today": 227.25,
          "wtd": -0.42,
          "mtd": 8.1,
          "ytd": 37.54,
          "yoy": 10.94,
          "target": 246.88,
          "percentTarget": 92.05
        },
        "cc": {
          "today": 157.34,
          "wtd": 0.71,
          "mtd": 2.69,
          "ytd": 2.21,
          "yoy": -10.94,
          "target": 167.92,
          "percentTarget": 93.7
        },
        "micro": {
          "today": 109.98,
          "wtd": -1.54,
          "mtd": 9.09,
          "ytd": -2.77,
          "yoy": 56.09,
          "target": 113.01,
          "percentTarget": 97.32
        }
      },
      "leading": {
        "bookingSME": {
          "today": 13,
          "target": 14,
          "percentTarget": 92.86
        },
        "bookingCL": {
          "today": 15,
          "target": 15,
          "percentTarget": 100
        },
        "bookingKSM": {
          "today": 27,
          "target": 28,
          "percentTarget": 96.43
        },
        "bookingCC": {
          "today": 54,
          "target": 58,
          "percentTarget": 93.1
        },
        "bookingMicro": {
          "today": 33,
          "target": 35,
          "percentTarget": 94.29
        }
      }
    },
    "ekosistem": {
      "bodBocSME": {
        "today": 48,
        "target": 44,
        "percentTarget": 109.09
      },
      "bodBocCMC": {
        "today": 91,
        "target": 112,
        "percentTarget": 81.25
      },
      "bodBocCB": {
        "today": 12,
        "target": 15,
        "percentTarget": 80.0
      },
      "familyTree": {
        "today": 26,
        "target": 30,
        "percentTarget": 86.67
      },
      "warungViral": {
        "today": 60,
        "target": 75,
        "percentTarget": 80
      },
      "spbu": {
        "today": 9,
        "target": 10,
        "percentTarget": 90
      },
      "kdkmp": {
        "today": 11,
        "target": 13,
        "percentTarget": 84.62
      },
      "sppg": {
        "today": 15,
        "target": 18,
        "percentTarget": 83.33
      },
      "billReminder": {
        "today": 335,
        "target": 282,
        "percentTarget": 118.79
      }
    }
  },
  {
    "code": "12410",
    "class": "B.3",
    "name": "Jakarta Wisma Tugu",
    "bpa": {
      "cm": 5.8,
      "nii": 3.8,
      "assetSpread": 1.2,
      "liabilitiesSpread": 1,
      "fbi": 1.6
    },
    "funding": {
      "lagging": {
        "tabungan": {
          "today": 64.26,
          "wtd": 1.27,
          "mtd": -3.08,
          "ytd": -4.41,
          "yoy": -3.09,
          "target": 65.08,
          "percentTarget": 98.73
        },
        "giro": {
          "today": 86.68,
          "wtd": -0.61,
          "mtd": 4.1,
          "ytd": -5.93,
          "yoy": 5.53,
          "target": 102.47,
          "percentTarget": 84.59
        },
        "deposito": {
          "today": 115.95,
          "wtd": -0.51,
          "mtd": -0.3,
          "ytd": 4.45,
          "yoy": -0.94,
          "target": 132.96,
          "percentTarget": 87.21
        }
      },
      "leading": {
        "newCifTabungan": {
          "today": 89,
          "target": 89,
          "percentTarget": 100
        },
        "newCifGiro": {
          "today": 12,
          "target": 12,
          "percentTarget": 100
        },
        "newCifTabunganBisnis": {
          "today": 12,
          "target": 15,
          "percentTarget": 80
        },
        "newToPriority": {
          "today": 3,
          "target": 3,
          "percentTarget": 100
        }
      }
    },
    "kredit": {
      "lagging": {
        "sme": {
          "today": 586.6,
          "wtd": -1.24,
          "mtd": 7.77,
          "ytd": 22.81,
          "yoy": 12.34,
          "target": 596.02,
          "percentTarget": 98.42
        },
        "cl": {
          "today": 326.76,
          "wtd": -1.11,
          "mtd": 2.98,
          "ytd": 10.43,
          "yoy": 46.82,
          "target": 344.34,
          "percentTarget": 94.89
        },
        "ksm": {
          "today": 220.33,
          "wtd": -1.85,
          "mtd": 3.91,
          "ytd": 34.79,
          "yoy": 75.34,
          "target": 220.59,
          "percentTarget": 99.88
        },
        "cc": {
          "today": 152.5,
          "wtd": 1.49,
          "mtd": 5.11,
          "ytd": 27.26,
          "yoy": 30.19,
          "target": 155.31,
          "percentTarget": 98.19
        },
        "micro": {
          "today": 110.38,
          "wtd": 1.35,
          "mtd": -3.06,
          "ytd": 13.83,
          "yoy": 42.48,
          "target": 114.98,
          "percentTarget": 96
        }
      },
      "leading": {
        "bookingSME": {
          "today": 13,
          "target": 13,
          "percentTarget": 100
        },
        "bookingCL": {
          "today": 18,
          "target": 19,
          "percentTarget": 94.74
        },
        "bookingKSM": {
          "today": 23,
          "target": 25,
          "percentTarget": 92
        },
        "bookingCC": {
          "today": 51,
          "target": 58,
          "percentTarget": 87.93
        },
        "bookingMicro": {
          "today": 34,
          "target": 38,
          "percentTarget": 89.47
        }
      }
    },
    "ekosistem": {
      "bodBocSME": {
        "today": 51,
        "target": 50,
        "percentTarget": 102
      },
      "bodBocCMC": {
        "today": 114,
        "target": 119,
        "percentTarget": 95.8
      },
      "bodBocCB": {
        "today": 12,
        "target": 15,
        "percentTarget": 80.0
      },
      "familyTree": {
        "today": 29,
        "target": 29,
        "percentTarget": 100
      },
      "warungViral": {
        "today": 82,
        "target": 77,
        "percentTarget": 106.49
      },
      "spbu": {
        "today": 10,
        "target": 10,
        "percentTarget": 100
      },
      "kdkmp": {
        "today": 28,
        "target": 25,
        "percentTarget": 112
      },
      "sppg": {
        "today": 48,
        "target": 53,
        "percentTarget": 90.57
      },
      "billReminder": {
        "today": 148,
        "target": 127,
        "percentTarget": 116.54
      }
    }
  },
  {
    "code": "12411",
    "class": "B.3",
    "name": "Jakarta Pasar Rumput",
    "bpa": {
      "cm": 4.9,
      "nii": 3.2,
      "assetSpread": 1,
      "liabilitiesSpread": 0.9,
      "fbi": 1.3
    },
    "funding": {
      "lagging": {
        "tabungan": {
          "today": 56.11,
          "wtd": -0.55,
          "mtd": 0.54,
          "ytd": 0.27,
          "yoy": -7.39,
          "target": 51.49,
          "percentTarget": 108.96
        },
        "giro": {
          "today": 59.83,
          "wtd": -1.01,
          "mtd": 1.29,
          "ytd": -4.3,
          "yoy": -6.06,
          "target": 69.38,
          "percentTarget": 86.23
        },
        "deposito": {
          "today": 114.45,
          "wtd": 1.89,
          "mtd": 1.75,
          "ytd": 2.09,
          "yoy": 3.66,
          "target": 118.4,
          "percentTarget": 96.66
        }
      },
      "leading": {
        "newCifTabungan": {
          "today": 40,
          "target": 48,
          "percentTarget": 83.33
        },
        "newCifGiro": {
          "today": 12,
          "target": 12,
          "percentTarget": 100
        },
        "newCifTabunganBisnis": {
          "today": 24,
          "target": 26,
          "percentTarget": 92.31
        },
        "newToPriority": {
          "today": 3,
          "target": 4,
          "percentTarget": 75
        }
      }
    },
    "kredit": {
      "lagging": {
        "sme": {
          "today": 527.76,
          "wtd": -0.35,
          "mtd": 2.91,
          "ytd": -9.5,
          "yoy": 34.05,
          "target": 564.59,
          "percentTarget": 93.48
        },
        "cl": {
          "today": 314.13,
          "wtd": 0.22,
          "mtd": 4.75,
          "ytd": -8.9,
          "yoy": 78.16,
          "target": 345.48,
          "percentTarget": 90.92
        },
        "ksm": {
          "today": 218.76,
          "wtd": -1.16,
          "mtd": -2.68,
          "ytd": -0.05,
          "yoy": 68.42,
          "target": 234.25,
          "percentTarget": 93.39
        },
        "cc": {
          "today": 175.27,
          "wtd": 1.48,
          "mtd": 5.57,
          "ytd": 36.42,
          "yoy": -11.34,
          "target": 182.05,
          "percentTarget": 96.27
        },
        "micro": {
          "today": 117.78,
          "wtd": 1.37,
          "mtd": 9.27,
          "ytd": 0.67,
          "yoy": 54.07,
          "target": 123.07,
          "percentTarget": 95.71
        }
      },
      "leading": {
        "bookingSME": {
          "today": 11,
          "target": 12,
          "percentTarget": 91.67
        },
        "bookingCL": {
          "today": 17,
          "target": 19,
          "percentTarget": 89.47
        },
        "bookingKSM": {
          "today": 22,
          "target": 23,
          "percentTarget": 95.65
        },
        "bookingCC": {
          "today": 72,
          "target": 77,
          "percentTarget": 93.51
        },
        "bookingMicro": {
          "today": 31,
          "target": 33,
          "percentTarget": 93.94
        }
      }
    },
    "ekosistem": {
      "bodBocSME": {
        "today": 33,
        "target": 28,
        "percentTarget": 117.86
      },
      "bodBocCMC": {
        "today": 99,
        "target": 99,
        "percentTarget": 100
      },
      "bodBocCB": {
        "today": 12,
        "target": 15,
        "percentTarget": 80.0
      },
      "familyTree": {
        "today": 40,
        "target": 33,
        "percentTarget": 121.21
      },
      "warungViral": {
        "today": 254,
        "target": 241,
        "percentTarget": 105.39
      },
      "spbu": {
        "today": 5,
        "target": 5,
        "percentTarget": 100
      },
      "kdkmp": {
        "today": 13,
        "target": 13,
        "percentTarget": 100
      },
      "sppg": {
        "today": 53,
        "target": 47,
        "percentTarget": 112.77
      },
      "billReminder": {
        "today": 222,
        "target": 219,
        "percentTarget": 101.37
      }
    }
  },
  {
    "code": "12412",
    "class": "B.3",
    "name": "Jakarta Tebet Timur",
    "bpa": {
      "cm": 5.2,
      "nii": 3.4,
      "assetSpread": 1.1,
      "liabilitiesSpread": 0.9,
      "fbi": 1.4
    },
    "funding": {
      "lagging": {
        "tabungan": {
          "today": 43.86,
          "wtd": -0.14,
          "mtd": 0.47,
          "ytd": -1.05,
          "yoy": -5.97,
          "target": 40.69,
          "percentTarget": 107.79
        },
        "giro": {
          "today": 70.59,
          "wtd": 1.16,
          "mtd": -0.46,
          "ytd": 3.41,
          "yoy": -5.36,
          "target": 68.8,
          "percentTarget": 102.59
        },
        "deposito": {
          "today": 114.44,
          "wtd": -0.03,
          "mtd": 2.64,
          "ytd": -3.96,
          "yoy": 7.16,
          "target": 111.89,
          "percentTarget": 102.28
        }
      },
      "leading": {
        "newCifTabungan": {
          "today": 33,
          "target": 37,
          "percentTarget": 89.19
        },
        "newCifGiro": {
          "today": 23,
          "target": 23,
          "percentTarget": 100
        },
        "newCifTabunganBisnis": {
          "today": 33,
          "target": 35,
          "percentTarget": 94.29
        },
        "newToPriority": {
          "today": 11,
          "target": 12,
          "percentTarget": 91.67
        }
      }
    },
    "kredit": {
      "lagging": {
        "sme": {
          "today": 534.66,
          "wtd": 0.73,
          "mtd": -0.19,
          "ytd": 5.71,
          "yoy": -12.14,
          "target": 569.17,
          "percentTarget": 93.94
        },
        "cl": {
          "today": 356.15,
          "wtd": -1.65,
          "mtd": 8.71,
          "ytd": 25.19,
          "yoy": 46.02,
          "target": 358.1,
          "percentTarget": 99.46
        },
        "ksm": {
          "today": 232.18,
          "wtd": 2.37,
          "mtd": -1.44,
          "ytd": 32.42,
          "yoy": 4.51,
          "target": 237.19,
          "percentTarget": 97.89
        },
        "cc": {
          "today": 163.69,
          "wtd": 2.63,
          "mtd": -0.75,
          "ytd": 26.31,
          "yoy": -3.51,
          "target": 167.46,
          "percentTarget": 97.75
        },
        "micro": {
          "today": 111.09,
          "wtd": 1.35,
          "mtd": 5.21,
          "ytd": 4.34,
          "yoy": 46.02,
          "target": 113.03,
          "percentTarget": 98.28
        }
      },
      "leading": {
        "bookingSME": {
          "today": 11,
          "target": 11,
          "percentTarget": 100
        },
        "bookingCL": {
          "today": 15,
          "target": 17,
          "percentTarget": 88.24
        },
        "bookingKSM": {
          "today": 20,
          "target": 22,
          "percentTarget": 90.91
        },
        "bookingCC": {
          "today": 66,
          "target": 79,
          "percentTarget": 83.54
        },
        "bookingMicro": {
          "today": 39,
          "target": 43,
          "percentTarget": 90.7
        }
      }
    },
    "ekosistem": {
      "bodBocSME": {
        "today": 29,
        "target": 29,
        "percentTarget": 100
      },
      "bodBocCMC": {
        "today": 84,
        "target": 96,
        "percentTarget": 87.5
      },
      "bodBocCB": {
        "today": 12,
        "target": 15,
        "percentTarget": 80.0
      },
      "familyTree": {
        "today": 30,
        "target": 26,
        "percentTarget": 115.38
      },
      "warungViral": {
        "today": 137,
        "target": 156,
        "percentTarget": 87.82
      },
      "spbu": {
        "today": 6,
        "target": 7,
        "percentTarget": 85.71
      },
      "kdkmp": {
        "today": 40,
        "target": 40,
        "percentTarget": 100
      },
      "sppg": {
        "today": 43,
        "target": 39,
        "percentTarget": 110.26
      },
      "billReminder": {
        "today": 191,
        "target": 233,
        "percentTarget": 81.97
      }
    }
  },
  {
    "code": "12424",
    "class": "B.3",
    "name": "Jakarta Wisma IKPT",
    "bpa": {
      "cm": 5.6,
      "nii": 3.7,
      "assetSpread": 1.2,
      "liabilitiesSpread": 1,
      "fbi": 1.5
    },
    "funding": {
      "lagging": {
        "tabungan": {
          "today": 64.56,
          "wtd": 1.64,
          "mtd": 0.78,
          "ytd": -0.36,
          "yoy": -4.46,
          "target": 66.33,
          "percentTarget": 97.33
        },
        "giro": {
          "today": 92.28,
          "wtd": 0.36,
          "mtd": -2.66,
          "ytd": -3.73,
          "yoy": 5.35,
          "target": 98.7,
          "percentTarget": 93.5
        },
        "deposito": {
          "today": 100.31,
          "wtd": 1.9,
          "mtd": 3.94,
          "ytd": -3.68,
          "yoy": 14.14,
          "target": 104.68,
          "percentTarget": 95.83
        }
      },
      "leading": {
        "newCifTabungan": {
          "today": 105,
          "target": 108,
          "percentTarget": 97.22
        },
        "newCifGiro": {
          "today": 10,
          "target": 12,
          "percentTarget": 83.33
        },
        "newCifTabunganBisnis": {
          "today": 21,
          "target": 24,
          "percentTarget": 87.5
        },
        "newToPriority": {
          "today": 8,
          "target": 10,
          "percentTarget": 80
        }
      }
    },
    "kredit": {
      "lagging": {
        "sme": {
          "today": 581.08,
          "wtd": -1.79,
          "mtd": 9.36,
          "ytd": 12.84,
          "yoy": 48.4,
          "target": 635.37,
          "percentTarget": 91.46
        },
        "cl": {
          "today": 329.14,
          "wtd": 2.08,
          "mtd": 1.35,
          "ytd": 24.42,
          "yoy": 5.44,
          "target": 335.93,
          "percentTarget": 97.98
        },
        "ksm": {
          "today": 205.26,
          "wtd": -1.06,
          "mtd": -0.7,
          "ytd": -8.65,
          "yoy": -9.27,
          "target": 214.4,
          "percentTarget": 95.74
        },
        "cc": {
          "today": 161.37,
          "wtd": 1.28,
          "mtd": 3.31,
          "ytd": 32.12,
          "yoy": 43.18,
          "target": 165.31,
          "percentTarget": 97.62
        },
        "micro": {
          "today": 102.9,
          "wtd": 0.32,
          "mtd": 0.5,
          "ytd": 20.33,
          "yoy": 14.92,
          "target": 108.31,
          "percentTarget": 95.01
        }
      },
      "leading": {
        "bookingSME": {
          "today": 11,
          "target": 12,
          "percentTarget": 91.67
        },
        "bookingCL": {
          "today": 19,
          "target": 20,
          "percentTarget": 95
        },
        "bookingKSM": {
          "today": 21,
          "target": 21,
          "percentTarget": 100
        },
        "bookingCC": {
          "today": 74,
          "target": 75,
          "percentTarget": 98.67
        },
        "bookingMicro": {
          "today": 39,
          "target": 41,
          "percentTarget": 95.12
        }
      }
    },
    "ekosistem": {
      "bodBocSME": {
        "today": 35,
        "target": 33,
        "percentTarget": 106.06
      },
      "bodBocCMC": {
        "today": 96,
        "target": 103,
        "percentTarget": 93.2
      },
      "bodBocCB": {
        "today": 12,
        "target": 15,
        "percentTarget": 80.0
      },
      "familyTree": {
        "today": 37,
        "target": 34,
        "percentTarget": 108.82
      },
      "warungViral": {
        "today": 96,
        "target": 98,
        "percentTarget": 97.96
      },
      "spbu": {
        "today": 5,
        "target": 4,
        "percentTarget": 125
      },
      "kdkmp": {
        "today": 23,
        "target": 26,
        "percentTarget": 88.46
      },
      "sppg": {
        "today": 54,
        "target": 48,
        "percentTarget": 112.5
      },
      "billReminder": {
        "today": 122,
        "target": 117,
        "percentTarget": 104.27
      }
    }
  },
  {
    "code": "12415",
    "class": "B.4",
    "name": "Jakarta Rasuna Episentrum",
    "bpa": {
      "cm": 3.8,
      "nii": 2.5,
      "assetSpread": 0.8,
      "liabilitiesSpread": 0.7,
      "fbi": 1
    },
    "funding": {
      "lagging": {
        "tabungan": {
          "today": 34.69,
          "wtd": 0.06,
          "mtd": -1.01,
          "ytd": 1.76,
          "yoy": -2.94,
          "target": 37.89,
          "percentTarget": 91.56
        },
        "giro": {
          "today": 55.09,
          "wtd": -0.61,
          "mtd": 0.1,
          "ytd": -2.46,
          "yoy": -6.86,
          "target": 52.69,
          "percentTarget": 104.56
        },
        "deposito": {
          "today": 80.65,
          "wtd": -1.56,
          "mtd": 1.03,
          "ytd": 0.68,
          "yoy": 7.4,
          "target": 76.07,
          "percentTarget": 106.03
        }
      },
      "leading": {
        "newCifTabungan": {
          "today": 71,
          "target": 70,
          "percentTarget": 101.43
        },
        "newCifGiro": {
          "today": 8,
          "target": 10,
          "percentTarget": 80
        },
        "newCifTabunganBisnis": {
          "today": 17,
          "target": 16,
          "percentTarget": 106.25
        },
        "newToPriority": {
          "today": 7,
          "target": 8,
          "percentTarget": 87.5
        }
      }
    },
    "kredit": {
      "lagging": {
        "sme": {
          "today": 250.98,
          "wtd": 0.9,
          "mtd": 6.26,
          "ytd": 9.18,
          "yoy": 17.24,
          "target": 261.18,
          "percentTarget": 96.1
        },
        "cl": {
          "today": 157.19,
          "wtd": -1.85,
          "mtd": 1.71,
          "ytd": 15.01,
          "yoy": 59.84,
          "target": 171.57,
          "percentTarget": 91.62
        },
        "ksm": {
          "today": 103.19,
          "wtd": 0.71,
          "mtd": -4.67,
          "ytd": -6.81,
          "yoy": 45.56,
          "target": 112.32,
          "percentTarget": 91.87
        },
        "cc": {
          "today": 78.59,
          "wtd": 2.22,
          "mtd": -3.97,
          "ytd": -8.95,
          "yoy": 20.92,
          "target": 83.42,
          "percentTarget": 94.2
        },
        "micro": {
          "today": 55.43,
          "wtd": 2.67,
          "mtd": 0.09,
          "ytd": -9.15,
          "yoy": 41.57,
          "target": 55.71,
          "percentTarget": 99.49
        }
      },
      "leading": {
        "bookingSME": {
          "today": 5,
          "target": 5,
          "percentTarget": 100
        },
        "bookingCL": {
          "today": 10,
          "target": 11,
          "percentTarget": 90.91
        },
        "bookingKSM": {
          "today": 10,
          "target": 11,
          "percentTarget": 90.91
        },
        "bookingCC": {
          "today": 29,
          "target": 31,
          "percentTarget": 93.55
        },
        "bookingMicro": {
          "today": 17,
          "target": 20,
          "percentTarget": 85
        }
      }
    },
    "ekosistem": {
      "bodBocSME": {
        "today": 9,
        "target": 10,
        "percentTarget": 90
      },
      "bodBocCMC": {
        "today": 84,
        "target": 76,
        "percentTarget": 110.53
      },
      "bodBocCB": {
        "today": 12,
        "target": 15,
        "percentTarget": 80.0
      },
      "familyTree": {
        "today": 21,
        "target": 22,
        "percentTarget": 95.45
      },
      "warungViral": {
        "today": 156,
        "target": 137,
        "percentTarget": 113.87
      },
      "spbu": {
        "today": 9,
        "target": 9,
        "percentTarget": 100
      },
      "kdkmp": {
        "today": 45,
        "target": 38,
        "percentTarget": 118.42
      },
      "sppg": {
        "today": 29,
        "target": 32,
        "percentTarget": 90.63
      },
      "billReminder": {
        "today": 261,
        "target": 237,
        "percentTarget": 110.13
      }
    }
  },
  {
    "code": "12419",
    "class": "B.4",
    "name": "Jakarta Kalibata Rawajati",
    "bpa": {
      "cm": 3.2,
      "nii": 2.1,
      "assetSpread": 0.7,
      "liabilitiesSpread": 0.6,
      "fbi": 0.9
    },
    "funding": {
      "lagging": {
        "tabungan": {
          "today": 31.03,
          "wtd": -0.28,
          "mtd": -0.28,
          "ytd": 1.63,
          "yoy": -4.64,
          "target": 28.09,
          "percentTarget": 110.46
        },
        "giro": {
          "today": 57.5,
          "wtd": 0.13,
          "mtd": -2.85,
          "ytd": -4.68,
          "yoy": -0.2,
          "target": 59.51,
          "percentTarget": 96.63
        },
        "deposito": {
          "today": 62.06,
          "wtd": 0.43,
          "mtd": -0.95,
          "ytd": 4.23,
          "yoy": 1.83,
          "target": 72.31,
          "percentTarget": 85.82
        }
      },
      "leading": {
        "newCifTabungan": {
          "today": 71,
          "target": 81,
          "percentTarget": 87.65
        },
        "newCifGiro": {
          "today": 19,
          "target": 23,
          "percentTarget": 82.61
        },
        "newCifTabunganBisnis": {
          "today": 7,
          "target": 7,
          "percentTarget": 100
        },
        "newToPriority": {
          "today": 7,
          "target": 7,
          "percentTarget": 100
        }
      }
    },
    "kredit": {
      "lagging": {
        "sme": {
          "today": 284.25,
          "wtd": 0.06,
          "mtd": 1.45,
          "ytd": 11.5,
          "yoy": 2.86,
          "target": 290.03,
          "percentTarget": 98.01
        },
        "cl": {
          "today": 174.99,
          "wtd": -1.24,
          "mtd": 6.36,
          "ytd": 21.75,
          "yoy": 39.83,
          "target": 175.28,
          "percentTarget": 99.84
        },
        "ksm": {
          "today": 116.75,
          "wtd": 2.01,
          "mtd": -2.23,
          "ytd": 7.24,
          "yoy": 48.12,
          "target": 127.53,
          "percentTarget": 91.55
        },
        "cc": {
          "today": 79.31,
          "wtd": 1.19,
          "mtd": 1.98,
          "ytd": 15.5,
          "yoy": 60.95,
          "target": 82.27,
          "percentTarget": 96.41
        },
        "micro": {
          "today": 52.83,
          "wtd": -1.83,
          "mtd": -3.07,
          "ytd": -2.39,
          "yoy": -13.19,
          "target": 54.52,
          "percentTarget": 96.91
        }
      },
      "leading": {
        "bookingSME": {
          "today": 5,
          "target": 5,
          "percentTarget": 100
        },
        "bookingCL": {
          "today": 8,
          "target": 9,
          "percentTarget": 88.89
        },
        "bookingKSM": {
          "today": 14,
          "target": 15,
          "percentTarget": 93.33
        },
        "bookingCC": {
          "today": 34,
          "target": 36,
          "percentTarget": 94.44
        },
        "bookingMicro": {
          "today": 17,
          "target": 18,
          "percentTarget": 94.44
        }
      }
    },
    "ekosistem": {
      "bodBocSME": {
        "today": 12,
        "target": 12,
        "percentTarget": 100
      },
      "bodBocCMC": {
        "today": 87,
        "target": 94,
        "percentTarget": 92.55
      },
      "bodBocCB": {
        "today": 12,
        "target": 15,
        "percentTarget": 80.0
      },
      "familyTree": {
        "today": 31,
        "target": 27,
        "percentTarget": 114.81
      },
      "warungViral": {
        "today": 153,
        "target": 158,
        "percentTarget": 96.84
      },
      "spbu": {
        "today": 5,
        "target": 6,
        "percentTarget": 83.33
      },
      "kdkmp": {
        "today": 48,
        "target": 45,
        "percentTarget": 106.67
      },
      "sppg": {
        "today": 45,
        "target": 46,
        "percentTarget": 97.83
      },
      "billReminder": {
        "today": 275,
        "target": 238,
        "percentTarget": 115.55
      }
    }
  },
  {
    "code": "12425",
    "class": "B.4",
    "name": "Jakarta Gedung Sucofindo",
    "bpa": {
      "cm": 4.1,
      "nii": 2.7,
      "assetSpread": 0.9,
      "liabilitiesSpread": 0.8,
      "fbi": 1.1
    },
    "funding": {
      "lagging": {
        "tabungan": {
          "today": 35.3,
          "wtd": 0.01,
          "mtd": 0.3,
          "ytd": -0.79,
          "yoy": -2.53,
          "target": 41.53,
          "percentTarget": 84.99
        },
        "giro": {
          "today": 51.83,
          "wtd": 0.55,
          "mtd": -2.49,
          "ytd": -4.22,
          "yoy": -6.6,
          "target": 48.8,
          "percentTarget": 106.22
        },
        "deposito": {
          "today": 67,
          "wtd": 0.71,
          "mtd": -2.93,
          "ytd": 1.12,
          "yoy": 4.42,
          "target": 63.3,
          "percentTarget": 105.84
        }
      },
      "leading": {
        "newCifTabungan": {
          "today": 113,
          "target": 118,
          "percentTarget": 95.76
        },
        "newCifGiro": {
          "today": 14,
          "target": 13,
          "percentTarget": 107.69
        },
        "newCifTabunganBisnis": {
          "today": 23,
          "target": 28,
          "percentTarget": 82.14
        },
        "newToPriority": {
          "today": 8,
          "target": 8,
          "percentTarget": 100
        }
      }
    },
    "kredit": {
      "lagging": {
        "sme": {
          "today": 259.7,
          "wtd": 1.79,
          "mtd": -4.04,
          "ytd": 39.86,
          "yoy": 4.37,
          "target": 272.96,
          "percentTarget": 95.14
        },
        "cl": {
          "today": 178.73,
          "wtd": 1.89,
          "mtd": 7.98,
          "ytd": 11.98,
          "yoy": 40.83,
          "target": 183.73,
          "percentTarget": 97.28
        },
        "ksm": {
          "today": 108.39,
          "wtd": -1.72,
          "mtd": 4.07,
          "ytd": 32.05,
          "yoy": -0.3,
          "target": 118.4,
          "percentTarget": 91.54
        },
        "cc": {
          "today": 78.43,
          "wtd": 0.79,
          "mtd": -2.37,
          "ytd": 33.49,
          "yoy": 44.47,
          "target": 78.86,
          "percentTarget": 99.45
        },
        "micro": {
          "today": 55.1,
          "wtd": -0.73,
          "mtd": 3.19,
          "ytd": -9.48,
          "yoy": -11.9,
          "target": 55.51,
          "percentTarget": 99.27
        }
      },
      "leading": {
        "bookingSME": {
          "today": 7,
          "target": 8,
          "percentTarget": 87.5
        },
        "bookingCL": {
          "today": 8,
          "target": 8,
          "percentTarget": 100
        },
        "bookingKSM": {
          "today": 11,
          "target": 12,
          "percentTarget": 91.67
        },
        "bookingCC": {
          "today": 36,
          "target": 42,
          "percentTarget": 85.71
        },
        "bookingMicro": {
          "today": 19,
          "target": 20,
          "percentTarget": 95
        }
      }
    },
    "ekosistem": {
      "bodBocSME": {
        "today": 40,
        "target": 37,
        "percentTarget": 108.11
      },
      "bodBocCMC": {
        "today": 109,
        "target": 118,
        "percentTarget": 92.37
      },
      "bodBocCB": {
        "today": 12,
        "target": 15,
        "percentTarget": 80.0
      },
      "familyTree": {
        "today": 35,
        "target": 30,
        "percentTarget": 116.67
      },
      "warungViral": {
        "today": 274,
        "target": 247,
        "percentTarget": 110.93
      },
      "spbu": {
        "today": 7,
        "target": 7,
        "percentTarget": 100
      },
      "kdkmp": {
        "today": 40,
        "target": 38,
        "percentTarget": 105.26
      },
      "sppg": {
        "today": 12,
        "target": 10,
        "percentTarget": 120
      },
      "billReminder": {
        "today": 314,
        "target": 302,
        "percentTarget": 103.97
      }
    }
  },
  {
    "code": "12426",
    "class": "B.4",
    "name": "Jakarta Multivision Tower",
    "bpa": {
      "cm": 3.5,
      "nii": 2.3,
      "assetSpread": 0.8,
      "liabilitiesSpread": 0.6,
      "fbi": 0.9
    },
    "funding": {
      "lagging": {
        "tabungan": {
          "today": 37.96,
          "wtd": -0.37,
          "mtd": -1.56,
          "ytd": -1.89,
          "yoy": 0.81,
          "target": 42.59,
          "percentTarget": 89.12
        },
        "giro": {
          "today": 46.15,
          "wtd": 1.14,
          "mtd": 1.05,
          "ytd": 2.25,
          "yoy": 5.58,
          "target": 42.85,
          "percentTarget": 107.69
        },
        "deposito": {
          "today": 58.01,
          "wtd": -0.28,
          "mtd": -2.43,
          "ytd": -0.96,
          "yoy": -8.14,
          "target": 58.03,
          "percentTarget": 99.96
        }
      },
      "leading": {
        "newCifTabungan": {
          "today": 32,
          "target": 36,
          "percentTarget": 88.89
        },
        "newCifGiro": {
          "today": 11,
          "target": 13,
          "percentTarget": 84.62
        },
        "newCifTabunganBisnis": {
          "today": 7,
          "target": 7,
          "percentTarget": 100
        },
        "newToPriority": {
          "today": 7,
          "target": 8,
          "percentTarget": 87.5
        }
      }
    },
    "kredit": {
      "lagging": {
        "sme": {
          "today": 268.34,
          "wtd": 2.69,
          "mtd": 7.02,
          "ytd": 33.18,
          "yoy": -7.68,
          "target": 271.58,
          "percentTarget": 98.81
        },
        "cl": {
          "today": 171.82,
          "wtd": 1,
          "mtd": 3.1,
          "ytd": 5.15,
          "yoy": 67.34,
          "target": 180.37,
          "percentTarget": 95.26
        },
        "ksm": {
          "today": 107.85,
          "wtd": 2.98,
          "mtd": 3.49,
          "ytd": -9.32,
          "yoy": 50.12,
          "target": 117.06,
          "percentTarget": 92.13
        },
        "cc": {
          "today": 88.64,
          "wtd": -1.28,
          "mtd": 8.31,
          "ytd": 8.1,
          "yoy": -9.07,
          "target": 90.91,
          "percentTarget": 97.51
        },
        "micro": {
          "today": 54.97,
          "wtd": 1.2,
          "mtd": 5.69,
          "ytd": 38.61,
          "yoy": 72.98,
          "target": 58.53,
          "percentTarget": 93.93
        }
      },
      "leading": {
        "bookingSME": {
          "today": 6,
          "target": 6,
          "percentTarget": 100
        },
        "bookingCL": {
          "today": 7,
          "target": 7,
          "percentTarget": 100
        },
        "bookingKSM": {
          "today": 10,
          "target": 10,
          "percentTarget": 100
        },
        "bookingCC": {
          "today": 35,
          "target": 37,
          "percentTarget": 94.59
        },
        "bookingMicro": {
          "today": 19,
          "target": 20,
          "percentTarget": 95
        }
      }
    },
    "ekosistem": {
      "bodBocSME": {
        "today": 48,
        "target": 48,
        "percentTarget": 100
      },
      "bodBocCMC": {
        "today": 35,
        "target": 37,
        "percentTarget": 94.59
      },
      "bodBocCB": {
        "today": 12,
        "target": 15,
        "percentTarget": 80.0
      },
      "familyTree": {
        "today": 4,
        "target": 5,
        "percentTarget": 80
      },
      "warungViral": {
        "today": 195,
        "target": 184,
        "percentTarget": 105.98
      },
      "spbu": {
        "today": 3,
        "target": 3,
        "percentTarget": 100
      },
      "kdkmp": {
        "today": 12,
        "target": 12,
        "percentTarget": 100
      },
      "sppg": {
        "today": 16,
        "target": 18,
        "percentTarget": 88.89
      },
      "billReminder": {
        "today": 238,
        "target": 258,
        "percentTarget": 92.25
      }
    }
  },
  {
    "code": "12428",
    "class": "B.4",
    "name": "Jakarta Kota Kasablanka",
    "bpa": {
      "cm": 4.5,
      "nii": 3,
      "assetSpread": 1,
      "liabilitiesSpread": 0.8,
      "fbi": 1.2
    },
    "funding": {
      "lagging": {
        "tabungan": {
          "today": 41.53,
          "wtd": 0.09,
          "mtd": -1.34,
          "ytd": 0.9,
          "yoy": 2.11,
          "target": 43.29,
          "percentTarget": 95.93
        },
        "giro": {
          "today": 79.59,
          "wtd": 1.4,
          "mtd": 2.87,
          "ytd": 1.45,
          "yoy": -0.23,
          "target": 81.27,
          "percentTarget": 97.93
        },
        "deposito": {
          "today": 75.76,
          "wtd": 1,
          "mtd": 1,
          "ytd": 7.17,
          "yoy": 3.73,
          "target": 68.59,
          "percentTarget": 110.45
        }
      },
      "leading": {
        "newCifTabungan": {
          "today": 44,
          "target": 44,
          "percentTarget": 100
        },
        "newCifGiro": {
          "today": 6,
          "target": 7,
          "percentTarget": 85.71
        },
        "newCifTabunganBisnis": {
          "today": 6,
          "target": 6,
          "percentTarget": 100
        },
        "newToPriority": {
          "today": 8,
          "target": 8,
          "percentTarget": 100
        }
      }
    },
    "kredit": {
      "lagging": {
        "sme": {
          "today": 291,
          "wtd": -1.19,
          "mtd": 4.49,
          "ytd": 12.37,
          "yoy": 21.81,
          "target": 312.83,
          "percentTarget": 93.02
        },
        "cl": {
          "today": 162.12,
          "wtd": 0.29,
          "mtd": 1.39,
          "ytd": 21.33,
          "yoy": 19.08,
          "target": 171.35,
          "percentTarget": 94.62
        },
        "ksm": {
          "today": 116.22,
          "wtd": 2.75,
          "mtd": -0.91,
          "ytd": 13.78,
          "yoy": 57.49,
          "target": 124.12,
          "percentTarget": 93.64
        },
        "cc": {
          "today": 82.82,
          "wtd": 0.96,
          "mtd": -1.57,
          "ytd": 16.47,
          "yoy": 66.96,
          "target": 89.88,
          "percentTarget": 92.15
        },
        "micro": {
          "today": 55.83,
          "wtd": -1.03,
          "mtd": 1.88,
          "ytd": 19.59,
          "yoy": 9.84,
          "target": 56.34,
          "percentTarget": 99.09
        }
      },
      "leading": {
        "bookingSME": {
          "today": 6,
          "target": 6,
          "percentTarget": 100
        },
        "bookingCL": {
          "today": 8,
          "target": 8,
          "percentTarget": 100
        },
        "bookingKSM": {
          "today": 13,
          "target": 14,
          "percentTarget": 92.86
        },
        "bookingCC": {
          "today": 27,
          "target": 29,
          "percentTarget": 93.1
        },
        "bookingMicro": {
          "today": 18,
          "target": 20,
          "percentTarget": 90
        }
      }
    },
    "ekosistem": {
      "bodBocSME": {
        "today": 22,
        "target": 26,
        "percentTarget": 84.62
      },
      "bodBocCMC": {
        "today": 56,
        "target": 65,
        "percentTarget": 86.15
      },
      "bodBocCB": {
        "today": 12,
        "target": 15,
        "percentTarget": 80.0
      },
      "familyTree": {
        "today": 7,
        "target": 7,
        "percentTarget": 100
      },
      "warungViral": {
        "today": 144,
        "target": 142,
        "percentTarget": 101.41
      },
      "spbu": {
        "today": 3,
        "target": 3,
        "percentTarget": 100
      },
      "kdkmp": {
        "today": 48,
        "target": 41,
        "percentTarget": 117.07
      },
      "sppg": {
        "today": 13,
        "target": 12,
        "percentTarget": 108.33
      },
      "billReminder": {
        "today": 326,
        "target": 296,
        "percentTarget": 110.14
      }
    }
  },
  {
    "code": "12429",
    "class": "B.4",
    "name": "Jakarta Menara Kuningan",
    "bpa": {
      "cm": 3.9,
      "nii": 2.6,
      "assetSpread": 0.9,
      "liabilitiesSpread": 0.7,
      "fbi": 1
    },
    "funding": {
      "lagging": {
        "tabungan": {
          "today": 45.01,
          "wtd": -0.54,
          "mtd": 2.09,
          "ytd": 2.83,
          "yoy": -2.57,
          "target": 53.53,
          "percentTarget": 84.07
        },
        "giro": {
          "today": 57.99,
          "wtd": 0.08,
          "mtd": 0.56,
          "ytd": 0.78,
          "yoy": -2.8,
          "target": 52.29,
          "percentTarget": 110.9
        },
        "deposito": {
          "today": 75.96,
          "wtd": -0.27,
          "mtd": 2.91,
          "ytd": -0.36,
          "yoy": -3.79,
          "target": 85.94,
          "percentTarget": 88.38
        }
      },
      "leading": {
        "newCifTabungan": {
          "today": 115,
          "target": 137,
          "percentTarget": 83.94
        },
        "newCifGiro": {
          "today": 12,
          "target": 13,
          "percentTarget": 92.31
        },
        "newCifTabunganBisnis": {
          "today": 31,
          "target": 33,
          "percentTarget": 93.94
        },
        "newToPriority": {
          "today": 6,
          "target": 7,
          "percentTarget": 85.71
        }
      }
    },
    "kredit": {
      "lagging": {
        "sme": {
          "today": 271.49,
          "wtd": 0.44,
          "mtd": -3.79,
          "ytd": 1.69,
          "yoy": 74.21,
          "target": 285.39,
          "percentTarget": 95.13
        },
        "cl": {
          "today": 175.42,
          "wtd": 0.98,
          "mtd": -3.36,
          "ytd": -0.79,
          "yoy": 69.88,
          "target": 186.72,
          "percentTarget": 93.95
        },
        "ksm": {
          "today": 111.56,
          "wtd": -0.5,
          "mtd": -3.71,
          "ytd": -7.15,
          "yoy": 35.44,
          "target": 120.64,
          "percentTarget": 92.48
        },
        "cc": {
          "today": 85.32,
          "wtd": 1.99,
          "mtd": 8.15,
          "ytd": -8.86,
          "yoy": -2.88,
          "target": 87.71,
          "percentTarget": 97.28
        },
        "micro": {
          "today": 58.86,
          "wtd": 0.19,
          "mtd": 8.73,
          "ytd": 20.21,
          "yoy": 55.75,
          "target": 63.05,
          "percentTarget": 93.35
        }
      },
      "leading": {
        "bookingSME": {
          "today": 5,
          "target": 5,
          "percentTarget": 100
        },
        "bookingCL": {
          "today": 9,
          "target": 10,
          "percentTarget": 90
        },
        "bookingKSM": {
          "today": 10,
          "target": 11,
          "percentTarget": 90.91
        },
        "bookingCC": {
          "today": 28,
          "target": 30,
          "percentTarget": 93.33
        },
        "bookingMicro": {
          "today": 20,
          "target": 20,
          "percentTarget": 100
        }
      }
    },
    "ekosistem": {
      "bodBocSME": {
        "today": 48,
        "target": 57,
        "percentTarget": 84.21
      },
      "bodBocCMC": {
        "today": 34,
        "target": 33,
        "percentTarget": 103.03
      },
      "bodBocCB": {
        "today": 12,
        "target": 15,
        "percentTarget": 80.0
      },
      "familyTree": {
        "today": 20,
        "target": 21,
        "percentTarget": 95.24
      },
      "warungViral": {
        "today": 243,
        "target": 247,
        "percentTarget": 98.38
      },
      "spbu": {
        "today": 4,
        "target": 4,
        "percentTarget": 100
      },
      "kdkmp": {
        "today": 28,
        "target": 24,
        "percentTarget": 116.67
      },
      "sppg": {
        "today": 14,
        "target": 15,
        "percentTarget": 93.33
      },
      "billReminder": {
        "today": 346,
        "target": 329,
        "percentTarget": 105.17
      }
    }
  },
  {
    "code": "12431",
    "class": "B.4",
    "name": "Jakarta Kementerian Kesehatan",
    "bpa": {
      "cm": 4.2,
      "nii": 2.8,
      "assetSpread": 0.9,
      "liabilitiesSpread": 0.8,
      "fbi": 1.1
    },
    "funding": {
      "lagging": {
        "tabungan": {
          "today": 46.57,
          "wtd": -0.43,
          "mtd": -1.02,
          "ytd": -1.92,
          "yoy": 0.83,
          "target": 51.01,
          "percentTarget": 91.29
        },
        "giro": {
          "today": 58.26,
          "wtd": -0.06,
          "mtd": 2.42,
          "ytd": -1.16,
          "yoy": -0.79,
          "target": 62.92,
          "percentTarget": 92.58
        },
        "deposito": {
          "today": 72.4,
          "wtd": -0.2,
          "mtd": 1.13,
          "ytd": 6.08,
          "yoy": -0.75,
          "target": 67.64,
          "percentTarget": 107.04
        }
      },
      "leading": {
        "newCifTabungan": {
          "today": 111,
          "target": 127,
          "percentTarget": 87.4
        },
        "newCifGiro": {
          "today": 19,
          "target": 18,
          "percentTarget": 105.56
        },
        "newCifTabunganBisnis": {
          "today": 24,
          "target": 26,
          "percentTarget": 92.31
        },
        "newToPriority": {
          "today": 8,
          "target": 9,
          "percentTarget": 88.89
        }
      }
    },
    "kredit": {
      "lagging": {
        "sme": {
          "today": 270.59,
          "wtd": 1.56,
          "mtd": 4.04,
          "ytd": -3.52,
          "yoy": 20.65,
          "target": 283.43,
          "percentTarget": 95.47
        },
        "cl": {
          "today": 167,
          "wtd": -0.15,
          "mtd": -4.14,
          "ytd": -3.25,
          "yoy": -1.62,
          "target": 177.05,
          "percentTarget": 94.33
        },
        "ksm": {
          "today": 113.59,
          "wtd": 2.28,
          "mtd": 8.26,
          "ytd": 4.59,
          "yoy": 57.09,
          "target": 120.59,
          "percentTarget": 94.19
        },
        "cc": {
          "today": 88.35,
          "wtd": -0.85,
          "mtd": 8.4,
          "ytd": -3.31,
          "yoy": 16.58,
          "target": 95.01,
          "percentTarget": 93
        },
        "micro": {
          "today": 56.07,
          "wtd": 2.31,
          "mtd": 5.34,
          "ytd": 29.64,
          "yoy": -9.81,
          "target": 58.29,
          "percentTarget": 96.19
        }
      },
      "leading": {
        "bookingSME": {
          "today": 7,
          "target": 7,
          "percentTarget": 100
        },
        "bookingCL": {
          "today": 7,
          "target": 8,
          "percentTarget": 87.5
        },
        "bookingKSM": {
          "today": 11,
          "target": 13,
          "percentTarget": 84.62
        },
        "bookingCC": {
          "today": 25,
          "target": 26,
          "percentTarget": 96.15
        },
        "bookingMicro": {
          "today": 20,
          "target": 23,
          "percentTarget": 86.96
        }
      }
    },
    "ekosistem": {
      "bodBocSME": {
        "today": 48,
        "target": 41,
        "percentTarget": 117.07
      },
      "bodBocCMC": {
        "today": 42,
        "target": 41,
        "percentTarget": 102.44
      },
      "bodBocCB": {
        "today": 12,
        "target": 15,
        "percentTarget": 80.0
      },
      "familyTree": {
        "today": 17,
        "target": 19,
        "percentTarget": 89.47
      },
      "warungViral": {
        "today": 120,
        "target": 104,
        "percentTarget": 115.38
      },
      "spbu": {
        "today": 8,
        "target": 10,
        "percentTarget": 80
      },
      "kdkmp": {
        "today": 42,
        "target": 36,
        "percentTarget": 116.67
      },
      "sppg": {
        "today": 53,
        "target": 46,
        "percentTarget": 115.22
      },
      "billReminder": {
        "today": 262,
        "target": 300,
        "percentTarget": 87.33
      }
    }
  },
  {
    "code": "12432",
    "class": "B.4",
    "name": "Jakarta Menara Cyber 2",
    "bpa": {
      "cm": 3.6,
      "nii": 2.4,
      "assetSpread": 0.8,
      "liabilitiesSpread": 0.7,
      "fbi": 1
    },
    "funding": {
      "lagging": {
        "tabungan": {
          "today": 34.58,
          "wtd": 0.19,
          "mtd": 1.11,
          "ytd": 2.92,
          "yoy": -3.07,
          "target": 40.91,
          "percentTarget": 84.52
        },
        "giro": {
          "today": 58.19,
          "wtd": -0.9,
          "mtd": -0.91,
          "ytd": 1.37,
          "yoy": -4,
          "target": 69.7,
          "percentTarget": 83.48
        },
        "deposito": {
          "today": 67.4,
          "wtd": 1.03,
          "mtd": -2.46,
          "ytd": 4.65,
          "yoy": -3.5,
          "target": 70.83,
          "percentTarget": 95.16
        }
      },
      "leading": {
        "newCifTabungan": {
          "today": 75,
          "target": 86,
          "percentTarget": 87.21
        },
        "newCifGiro": {
          "today": 9,
          "target": 11,
          "percentTarget": 81.82
        },
        "newCifTabunganBisnis": {
          "today": 24,
          "target": 27,
          "percentTarget": 88.89
        },
        "newToPriority": {
          "today": 2,
          "target": 3,
          "percentTarget": 66.67
        }
      }
    },
    "kredit": {
      "lagging": {
        "sme": {
          "today": 262.29,
          "wtd": 1.63,
          "mtd": 3.47,
          "ytd": 14.02,
          "yoy": 73.97,
          "target": 281.2,
          "percentTarget": 93.27
        },
        "cl": {
          "today": 163.85,
          "wtd": -1.92,
          "mtd": 9.59,
          "ytd": 33.23,
          "yoy": 32.5,
          "target": 173.62,
          "percentTarget": 94.37
        },
        "ksm": {
          "today": 115.24,
          "wtd": -1.24,
          "mtd": 7.19,
          "ytd": 29.27,
          "yoy": 5.44,
          "target": 120.16,
          "percentTarget": 95.91
        },
        "cc": {
          "today": 78.28,
          "wtd": -1.39,
          "mtd": 5.96,
          "ytd": 39.13,
          "yoy": -9.5,
          "target": 84.38,
          "percentTarget": 92.78
        },
        "micro": {
          "today": 56.36,
          "wtd": -1.08,
          "mtd": 9.53,
          "ytd": 18.43,
          "yoy": -13.53,
          "target": 56.84,
          "percentTarget": 99.14
        }
      },
      "leading": {
        "bookingSME": {
          "today": 6,
          "target": 6,
          "percentTarget": 100
        },
        "bookingCL": {
          "today": 8,
          "target": 9,
          "percentTarget": 88.89
        },
        "bookingKSM": {
          "today": 11,
          "target": 13,
          "percentTarget": 84.62
        },
        "bookingCC": {
          "today": 30,
          "target": 34,
          "percentTarget": 88.24
        },
        "bookingMicro": {
          "today": 22,
          "target": 22,
          "percentTarget": 100
        }
      }
    },
    "ekosistem": {
      "bodBocSME": {
        "today": 33,
        "target": 29,
        "percentTarget": 113.79
      },
      "bodBocCMC": {
        "today": 108,
        "target": 119,
        "percentTarget": 90.76
      },
      "bodBocCB": {
        "today": 12,
        "target": 15,
        "percentTarget": 80.0
      },
      "familyTree": {
        "today": 25,
        "target": 23,
        "percentTarget": 108.7
      },
      "warungViral": {
        "today": 119,
        "target": 100,
        "percentTarget": 119
      },
      "spbu": {
        "today": 6,
        "target": 7,
        "percentTarget": 85.71
      },
      "kdkmp": {
        "today": 17,
        "target": 17,
        "percentTarget": 100
      },
      "sppg": {
        "today": 61,
        "target": 59,
        "percentTarget": 103.39
      },
      "billReminder": {
        "today": 211,
        "target": 208,
        "percentTarget": 101.44
      }
    }
  }
];

export const branches: Branch[] = sumberDataTerpadu.map(b => ({
  code: b.code, class: b.class, name: b.name, cm: b.bpa.cm, nii: b.bpa.nii, assetSpread: b.bpa.assetSpread, liabilitiesSpread: b.bpa.liabilitiesSpread, fbi: b.bpa.fbi
}));

export const fundingBranches: FundingBranch[] = sumberDataTerpadu.map(b => ({
  code: b.code, class: b.class, name: b.name, lagging: b.funding.lagging, leading: b.funding.leading
}));

export const kreditBranches: KreditBranch[] = sumberDataTerpadu.map(b => ({
  code: b.code, class: b.class, name: b.name, lagging: b.kredit.lagging, leading: b.kredit.leading
}));

export const ekosistemBranches: EkosistemBranch[] = sumberDataTerpadu.map(b => ({
  code: b.code, class: b.class, name: b.name, ekosistem: b.ekosistem
}));

export const getAreaTotal = (): Branch => {
  return branches.reduce((acc, branch) => ({
    code: "124", class: "A.1", name: "Area Jakarta Tebet Supomo",
    cm: acc.cm + branch.cm, nii: acc.nii + branch.nii, assetSpread: acc.assetSpread + branch.assetSpread,
    liabilitiesSpread: acc.liabilitiesSpread + branch.liabilitiesSpread, fbi: acc.fbi + branch.fbi,
  }), { code: "124", class: "A.1", name: "Area Jakarta Tebet Supomo", cm: 0, nii: 0, assetSpread: 0, liabilitiesSpread: 0, fbi: 0 });
};

export const getFundingAreaTotal = (): FundingBranch => {
  const total: FundingBranch = {
    code: "124", class: "A.1", name: "Area Jakarta Tebet Supomo",
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
    (["tabungan", "giro", "deposito"] as const).forEach(type => {
      total.lagging[type].today += b.lagging[type].today;
      total.lagging[type].wtd += b.lagging[type].wtd;
      total.lagging[type].mtd += b.lagging[type].mtd;
      total.lagging[type].ytd += b.lagging[type].ytd;
      total.lagging[type].yoy += b.lagging[type].yoy;
      total.lagging[type].target += b.lagging[type].target;
    });
    (["newCifTabungan", "newCifGiro", "newCifTabunganBisnis", "newToPriority"] as const).forEach(type => {
      total.leading[type].today += b.leading[type].today;
      total.leading[type].target += b.leading[type].target;
    });
  });
  (["tabungan", "giro", "deposito"] as const).forEach(type => { total.lagging[type].percentTarget = total.lagging[type].target > 0 ? (total.lagging[type].today / total.lagging[type].target) * 100 : 0; });
  (["newCifTabungan", "newCifGiro", "newCifTabunganBisnis", "newToPriority"] as const).forEach(type => { total.leading[type].percentTarget = total.leading[type].target > 0 ? (total.leading[type].today / total.leading[type].target) * 100 : 0; });
  return total;
};

export const getKreditAreaTotal = (): KreditBranch => {
  const total: KreditBranch = {
    code: "all", class: "A.1", name: "Area Jakarta Tebet Supomo",
    lagging: { sme: { today: 0, wtd: 0, mtd: 0, ytd: 0, yoy: 0, target: 0, percentTarget: 0 }, cl: { today: 0, wtd: 0, mtd: 0, ytd: 0, yoy: 0, target: 0, percentTarget: 0 }, ksm: { today: 0, wtd: 0, mtd: 0, ytd: 0, yoy: 0, target: 0, percentTarget: 0 }, cc: { today: 0, wtd: 0, mtd: 0, ytd: 0, yoy: 0, target: 0, percentTarget: 0 }, micro: { today: 0, wtd: 0, mtd: 0, ytd: 0, yoy: 0, target: 0, percentTarget: 0 } },
    leading: { bookingSME: { today: 0, target: 0, percentTarget: 0 }, bookingCL: { today: 0, target: 0, percentTarget: 0 }, bookingKSM: { today: 0, target: 0, percentTarget: 0 }, bookingCC: { today: 0, target: 0, percentTarget: 0 }, bookingMicro: { today: 0, target: 0, percentTarget: 0 } }
  };
  kreditBranches.forEach(b => {
    (["sme", "cl", "ksm", "cc", "micro"] as const).forEach(type => {
      total.lagging[type].today += b.lagging[type].today;
      total.lagging[type].wtd += b.lagging[type].wtd;
      total.lagging[type].mtd += b.lagging[type].mtd;
      total.lagging[type].ytd += b.lagging[type].ytd;
      total.lagging[type].yoy += b.lagging[type].yoy;
      total.lagging[type].target += b.lagging[type].target;
    });
    (["bookingSME", "bookingCL", "bookingKSM", "bookingCC", "bookingMicro"] as const).forEach(type => {
      total.leading[type].today += b.leading[type].today;
      total.leading[type].target += b.leading[type].target;
    });
  });
  (["sme", "cl", "ksm", "cc", "micro"] as const).forEach(type => { total.lagging[type].percentTarget = total.lagging[type].target > 0 ? (total.lagging[type].today / total.lagging[type].target) * 100 : 0; });
  (["bookingSME", "bookingCL", "bookingKSM", "bookingCC", "bookingMicro"] as const).forEach(type => { total.leading[type].percentTarget = total.leading[type].target > 0 ? (total.leading[type].today / total.leading[type].target) * 100 : 0; });
  return total;
};

export const getEkosistemAreaTotal = (): EkosistemBranch => {
  const total: EkosistemBranch = {
    code: "124", class: "A.1", name: "Area Jakarta Tebet Supomo",
    ekosistem: { bodBocSME: { today: 0, target: 0, percentTarget: 0 }, bodBocCMC: { today: 0, target: 0, percentTarget: 0 }, bodBocCB: { today: 0, target: 0, percentTarget: 0 },
        familyTree: { today: 0, target: 0, percentTarget: 0 }, warungViral: { today: 0, target: 0, percentTarget: 0 }, spbu: { today: 0, target: 0, percentTarget: 0 }, kdkmp: { today: 0, target: 0, percentTarget: 0 }, sppg: { today: 0, target: 0, percentTarget: 0 }, billReminder: { today: 0, target: 0, percentTarget: 0 } }
  };
  ekosistemBranches.forEach(b => {
    (["bodBocSME", "bodBocCMC", "bodBocCB", "familyTree", "warungViral", "spbu", "kdkmp", "sppg", "billReminder"] as const).forEach(type => {
      total.ekosistem[type].today += b.ekosistem[type].today;
      total.ekosistem[type].target += b.ekosistem[type].target;
    });
  });
  (["bodBocSME", "bodBocCMC", "bodBocCB", "familyTree", "warungViral", "spbu", "kdkmp", "sppg", "billReminder"] as const).forEach(type => {
    total.ekosistem[type].percentTarget = total.ekosistem[type].target > 0 ? (total.ekosistem[type].today / total.ekosistem[type].target) * 100 : 0;
  });
  return total;
};