// China in Figures — the data behind the site.
//
// Every series below is a World Bank World Development Indicators (WDI)
// series, fetched from api.worldbank.org on 2026-11-26. Values are rounded
// for display; each indicator carries its WDI code, unit, source and the
// years covered, and the Sources page lists them all. A `null` means the
// World Bank publishes no value for that year.
//
// Country codes: CHN = China, WLD = World, EAS = East Asia & Pacific.

export const YEARS = [2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024];

export const META = {
  country: 'China',
  updated: '2026-11-26',
  sourceName: 'World Bank, World Development Indicators',
  note: 'Figures are as published by the World Bank. China internet use is shown through 2022, the last year before a break in the published series; government education spending is published for 2023 only.',
};

// Series: [label, unit, wdi code, years covered, CHN values, WLD values, EAS values]
// Values are aligned with YEARS; null = not published for that year.
export const SERIES = {
  pop: {
    label: 'Population, total',
    unit: 'people',
    code: 'SP.POP.TOTL',
    chn: [1371860000, 1379860000, 1387790000, 1396220000, 1402760000, 1407750000, 1411100000, 1412360000, 1412180000, 1410710000, 1408980000],
    wld: [7353530000, 7441080000, 7528220000, 7613790000, 7696160000, 7777160000, 7853860000, 7919570000, 7988550000, 8062920000, 8140900000],
    eas: [2284390000, 2300840000, 2317080000, 2333480000, 2347580000, 2359760000, 2369420000, 2375120000, 2379620000, 2384440000, 2388320000],
  },
  popGrowth: {
    label: 'Population growth',
    unit: '% per year',
    code: 'SP.POP.GROW',
    chn: [0.63, 0.58, 0.57, 0.61, 0.47, 0.35, 0.24, 0.09, -0.01, -0.10, -0.12],
    wld: [1.21, 1.18, 1.16, 1.13, 1.08, 1.05, 0.98, 0.83, 0.87, 0.93, 0.96],
    eas: [0.76, 0.72, 0.70, 0.71, 0.60, 0.52, 0.41, 0.24, 0.19, 0.20, 0.16],
  },
  pop65: {
    label: 'Population ages 65 and above',
    unit: '% of total',
    code: 'SP.POP.65UP.TO.ZS',
    chn: [9.67, 10.05, 10.49, 10.98, 11.52, 12.06, 12.65, 13.21, 13.78, 14.32, 14.67],
    wld: [8.08, 8.26, 8.45, 8.66, 8.88, 9.11, 9.33, 9.53, 9.74, 9.98, 10.20],
    eas: [9.70, 10.02, 10.37, 10.74, 11.15, 11.57, 12.02, 12.45, 12.88, 13.31, 13.65],
  },
  pop014: {
    label: 'Population ages 0–14',
    unit: '% of total',
    code: 'SP.POP.0014.TO.ZS',
    chn: [18.33, 18.32, 18.30, 18.35, 18.33, 18.20, 17.95, 17.58, 17.12, 16.59, 16.01],
    wld: [26.77, 26.63, 26.49, 26.36, 26.21, 26.03, 25.83, 25.61, 25.35, 25.04, 24.73],
    eas: [20.38, 20.30, 20.21, 20.17, 20.08, 19.92, 19.68, 19.36, 18.97, 18.53, 18.06],
  },
  urban: {
    label: 'Urban population',
    unit: '% of total',
    code: 'SP.URB.TOTL.IN.ZS',
    chn: [55.75, 57.33, 58.84, 60.24, 61.50, 62.71, 63.52, 64.72, 65.22, 65.53, 65.89],
    wld: [53.91, 54.43, 54.89, 55.32, 55.75, 56.14, 56.44, 56.81, 57.07, 57.31, 57.57],
    eas: [56.61, 57.72, 58.79, 59.80, 60.85, 61.74, 62.37, 63.24, 63.68, 64.02, 64.37],
  },
  density: {
    label: 'Population density',
    unit: 'people per sq. km of land area',
    code: 'EN.POP.DNST',
    chn: [146.13, 146.98, 147.82, 148.72, 149.42, 149.95, 150.31, 150.44, 150.42, 150.26, 150.08],
    wld: [56.60, 57.27, 57.93, 58.59, 59.23, 59.85, 60.43, 61.01, 61.56, 62.14, null],
    eas: [93.39, 94.07, 94.69, 95.36, 95.94, 96.44, 96.83, 97.01, 97.33, 97.52, null],
  },
  lifeExp: {
    label: 'Life expectancy at birth',
    unit: 'years',
    code: 'SP.DYN.LE00.IN',
    chn: [76.71, 76.98, 77.21, 77.24, 77.71, 77.94, 78.02, 78.12, 78.20, 77.95, 78.02],
    wld: [71.78, 71.97, 72.19, 72.37, 72.64, 72.87, 72.18, 71.22, 72.97, 73.33, 73.48],
    eas: [75.56, 75.79, 75.99, 76.08, 76.39, 76.59, 76.54, 76.15, 76.68, 76.66, 76.74],
  },
  infantMort: {
    label: 'Infant mortality rate',
    unit: 'per 1,000 live births',
    code: 'SP.DYN.IMRT.IN',
    chn: [8.9, 8.2, 7.6, 7.0, 6.4, 6.0, 5.5, 5.1, 4.8, 4.4, 4.1],
    wld: [32.1, 31.5, 30.6, 30.0, 29.6, 29.2, 29.1, 29.3, 29.3, 28.4, 27.7],
    eas: [13.8, 13.3, 12.6, 11.9, 11.9, 11.5, 11.6, 11.5, 11.4, 11.1, 10.7],
  },
  gdp: {
    label: 'GDP',
    unit: 'current US$',
    code: 'NY.GDP.MKTP.CD',
    chn: [10.67e12, 11.28e12, 11.46e12, 12.54e12, 14.15e12, 14.56e12, 15.00e12, 18.20e12, 18.32e12, 18.27e12, 18.73e12],
    wld: [80.24e12, 75.84e12, 77.09e12, 82.11e12, 87.31e12, 88.80e12, 86.39e12, 98.78e12, 102.86e12, 107.35e12, 111.67e12],
    eas: [22.46e12, 22.39e12, 23.20e12, 24.76e12, 26.97e12, 27.56e12, 27.72e12, 31.87e12, 31.46e12, 31.60e12, 32.20e12],
  },
  gdpPc: {
    label: 'GDP per capita',
    unit: 'current US$',
    code: 'NY.GDP.PCAP.CD',
    chn: [7781, 8175, 8255, 8980, 10086, 10343, 10628, 12887, 12971, 12951, 13293],
    wld: [10912, 10192, 10240, 10784, 11345, 11418, 11000, 12473, 12876, 13314, 13717],
    eas: [9832, 9731, 10012, 10613, 11488, 11677, 11698, 13417, 13220, 13252, 13483],
  },
  gdpGrowth: {
    label: 'GDP growth',
    unit: '% per year',
    code: 'NY.GDP.MKTP.KD.ZG',
    chn: [7.46, 6.98, 6.77, 6.89, 6.76, 6.07, 2.34, 8.57, 3.13, 5.42, 4.96],
    wld: [3.17, 3.13, 2.79, 3.45, 3.29, 2.68, -2.89, 6.49, 3.44, 2.86, 2.90],
    eas: [4.92, 4.76, 4.63, 5.04, 4.81, 4.04, -0.09, 6.48, 3.05, 4.07, 3.73],
  },
  gdpPpp: {
    label: 'GDP, PPP',
    unit: 'current international $',
    code: 'NY.GDP.MKTP.PP.CD',
    chn: [17.75e12, 18.58e12, 19.65e12, 20.97e12, 22.86e12, 24.78e12, 25.78e12, 29.44e12, 32.52e12, 35.55e12, 38.24e12],
    wld: [111.15e12, 113.72e12, 118.46e12, 125.09e12, 133.10e12, 141.02e12, 140.66e12, 157.33e12, 175.80e12, 188.53e12, 199.81e12],
    eas: [34.34e12, 35.71e12, 37.30e12, 39.41e12, 42.29e12, 45.09e12, 46.07e12, 51.30e12, 56.64e12, 61.40e12, 65.53e12],
  },
  unemp: {
    label: 'Unemployment, total',
    unit: '% of labour force, modelled ILO estimate',
    code: 'SL.UEM.TOTL.ZS',
    chn: [4.63, 4.65, 4.56, 4.47, 4.31, 4.56, 5.00, 4.55, 4.98, 4.67, 4.59],
    wld: [5.96, 6.00, 5.97, 5.90, 5.76, 5.59, 6.59, 6.05, 5.23, 4.85, 4.81],
    eas: [4.03, 4.09, 4.00, 3.87, 3.75, 3.82, 4.30, 4.06, 4.10, 3.86, 3.81],
  },
  inflation: {
    label: 'Inflation, consumer prices',
    unit: '% per year',
    code: 'FP.CPI.TOTL.ZG',
    chn: [1.92, 1.44, 2.00, 1.59, 2.07, 2.90, 2.42, 0.98, 1.97, 0.23, 0.22],
    wld: [2.39, 1.44, 1.60, 2.25, 2.45, 2.22, 1.92, 3.47, 8.00, 5.73, 3.01],
    eas: [2.51, 0.80, 1.28, 1.80, 2.37, 1.71, 0.85, 2.48, 5.52, 4.25, 2.28],
  },
  trade: {
    label: 'Trade',
    unit: '% of GDP',
    code: 'NE.TRD.GNFS.ZS',
    chn: [44.07, 38.70, 36.18, 36.95, 36.89, 35.45, 34.34, 36.64, 37.51, 36.74, 37.96],
    wld: [58.03, 55.62, 53.79, 55.46, 56.99, 55.80, 51.87, 56.50, 62.15, 58.07, 56.72],
    eas: [61.36, 55.83, 52.19, 54.12, 55.12, 52.98, 50.02, 54.86, 59.69, 57.15, 58.36],
  },
  exports: {
    label: 'Exports of goods and services',
    unit: '% of GDP',
    code: 'NE.EXP.GNFS.ZS',
    chn: [23.07, 20.94, 19.20, 19.34, 18.77, 18.14, 18.27, 19.44, 20.23, 19.40, 20.44],
    wld: [29.73, 28.05, 27.08, 28.00, 28.88, 27.94, 26.03, 28.46, 30.72, 29.07, 29.08],
    eas: [31.78, 29.70, 27.65, 28.65, 28.58, 27.42, 26.12, 28.35, 30.81, 29.67, 31.12],
  },
  healthExp: {
    label: 'Current health expenditure',
    unit: '% of GDP',
    code: 'SH.XPD.CHEX.GD.ZS',
    chn: [4.70, 4.85, 4.88, 4.97, 5.07, 5.27, 5.50, 5.26, 5.88, 5.94, null],
    wld: [9.39, 9.66, 9.79, 9.67, 9.58, 9.69, 10.75, 10.29, 10.01, 10.06, null],
    eas: [6.46, 6.44, 6.51, 6.47, 6.48, 6.65, 6.97, 6.84, 7.03, 6.82, null],
  },
  eduExp: {
    label: 'Government expenditure on education',
    unit: '% of government expenditure',
    code: 'SE.XPD.TOTL.GB.ZS',
    chn: [null, null, null, null, null, null, null, null, null, 11.91, null],
    wld: [14.25, 14.11, 13.98, 14.50, 14.10, 13.47, 13.63, 12.79, 13.11, 13.96, null],
    eas: [15.53, 15.15, 15.37, 14.69, 14.56, 13.47, 13.62, 12.11, 13.25, 12.95, null],
  },
  internet: {
    label: 'Individuals using the Internet',
    unit: '% of population',
    code: 'IT.NET.USER.ZS',
    chn: [47.9, 50.3, 53.2, 54.3, 65.4, 64.1, 70.1, 73.1, 75.6, null, null],
    wld: [37.4, 39.9, 43.6, 46.3, 49.4, 53.9, 60.1, 63.8, 67.0, 69.2, 71.2],
    eas: [45.5, 48.3, 53.9, 57.8, 62.5, 67.1, 73.9, 78.8, 82.4, 84.9, 86.6],
  },
  energyPc: {
    label: 'Energy use',
    unit: 'kg of oil equivalent per capita',
    code: 'EG.USE.PCAP.KG.OE',
    chn: [2177.6, 2175.2, 2149.2, 2215.9, 2310.9, 2399.5, 2466.9, 2631.1, 2679.7, 2858.7, 2946.8],
    wld: [1811.4, 1791.3, 1786.1, 1803.9, 1826.9, 1828.2, 1761.8, 1853.1, 1853.4, 1869.5, 1892.2],
    eas: [2009.2, 1999.9, 1993.3, 2043.6, 2112.9, 2164.6, 2177.8, 2292.8, 2327.0, 2428.4, 2487.6],
  },
  elecPc: {
    label: 'Electric power consumption',
    unit: 'kWh per capita',
    code: 'EG.USE.ELEC.KH.PC',
    chn: [4006, 4017, 4238, 4571, 4842, 5082, 5262, 5848, 6112, 6586, 7038],
    wld: [3083, 3083, 3136, 3208, 3292, 3306, 3257, 3438, 3497, 3578, 3708],
    eas: [3722, 3735, 3898, 4123, 4310, 4455, 4538, 4938, 5116, 5406, 5715],
  },
  forest: {
    label: 'Forest area',
    unit: '% of land area',
    code: 'AG.LND.FRST.ZS',
    chn: [22.19, 22.40, 22.59, 22.77, 22.96, 23.15, 23.34, 23.51, 23.68, 23.85, 24.02],
    wld: [31.41, 31.37, 31.34, 31.29, 31.25, 31.21, 31.17, 31.17, 31.13, 31.10, null],
    eas: [26.92, 26.98, 27.09, 27.09, 27.12, 27.15, 27.18, 27.19, 27.23, 27.26, null],
  },
  renew: {
    label: 'Renewable energy consumption',
    unit: '% of total final energy consumption',
    code: 'EG.FEC.RNEW.ZS',
    chn: [11.9, 12.2, 12.6, 13.1, 13.5, 14.3, 14.9, 15.2, null, null, null],
    wld: [17.33, 17.40, 17.63, 17.85, 18.11, 18.58, 19.74, null, null, null, null],
    eas: [13.18, 12.98, 13.33, 13.58, 13.79, 14.24, 14.81, null, null, null, null],
  },
  pm25: {
    label: 'PM2.5 air pollution, mean annual exposure',
    unit: 'micrograms per cubic meter',
    code: 'EN.ATM.PM25.MC.M3',
    chn: [52.51, 49.47, 45.28, 43.09, 38.51, 37.20, 33.69, 31.92, 31.90, 31.99, null],
    wld: [35.90, 36.54, 35.48, 35.01, 34.74, 33.38, 32.50, 33.20, 32.73, 32.87, null],
    eas: [40.86, 38.97, 35.74, 33.85, 31.39, 31.19, 28.16, 27.27, 27.31, 27.30, null],
  },
  tertEnr: {
    label: 'School enrollment, tertiary',
    unit: '% gross',
    code: 'SE.TER.ENRR',
    chn: [43.71, 47.12, 49.31, 51.07, 53.40, 56.61, 61.61, 66.82, 71.58, 74.59, 76.88],
    wld: [35.56, 36.61, 37.14, 37.50, 37.85, 38.67, 39.71, 41.07, 42.05, 43.20, 43.62],
    eas: [41.89, 44.26, 45.94, 46.56, 47.40, 49.48, 52.65, 56.08, 59.33, 61.89, 63.33],
  },
};

// Age structure for 2024, derived from the 0–14 and 65+ shares above.
export const AGE_2024 = [
  { label: 'Ages 0–14', value: 16.01, color: '#2f6f6a' },
  { label: 'Ages 15–64', value: 69.32, color: '#b3271e' },
  { label: 'Ages 65+', value: 14.67, color: '#d9a441' },
];

// Latest-value helpers used by the pages.
export function latest(key, region = 'chn') {
  const values = SERIES[key][region];
  for (let i = values.length - 1; i >= 0; i--) {
    if (values[i] !== null && values[i] !== undefined) return { year: YEARS[i], value: values[i] };
  }
  return { year: null, value: null };
}

export function latestYear(key, region = 'chn') {
  return latest(key, region).year;
}

// Section pages of the site, in nav order.
export const SECTIONS = [
  { path: '#/', label: 'Overview' },
  { path: '#/population', label: 'Population' },
  { path: '#/economy', label: 'Economy' },
  { path: '#/health', label: 'Health' },
  { path: '#/education', label: 'Education' },
  { path: '#/environment', label: 'Environment' },
  { path: '#/compare', label: 'Compare' },
  { path: '#/sources', label: 'Sources' },
];
