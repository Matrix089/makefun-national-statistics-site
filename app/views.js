// Page renderers for China in Figures. Each function returns the HTML for
// one hash route and wires up that page's controls (range buttons, the
// compare selector, the sources search and the CSV download). Every figure
// shown names its source and year next to it.

import { YEARS, SERIES, META, AGE_2024, latest, latestYear } from './data.js';
import { lineChart, barChart, donutChart, fmtNum, fmtCompact, fmtTrillions } from './charts.js';

const SRC = 'Source: World Bank, World Development Indicators';

function pageHead(title, intro, sourceNote) {
  return `<header class="page-head">
    <h1>${title}</h1>
    <p class="lede">${intro}</p>
    ${sourceNote ? `<p class="source-note">${sourceNote}</p>` : ''}
  </header>`;
}

function kpiCard(label, value, sub, link, linkLabel) {
  return `<article class="kpi">
    <div class="kpi-label">${label}</div>
    <div class="kpi-value">${value}</div>
    <div class="kpi-sub">${sub}</div>
    <a class="kpi-link" href="${link}">${linkLabel} →</a>
  </article>`;
}

function card(title, body, note) {
  return `<section class="card"><h2>${title}</h2>${body}${note ? `<p class="card-note">${note}</p>` : ''}</section>`;
}

// A table with one row per year (newest first) and one column per series key.
function yearTable(keys, fromYear = 2014) {
  const rows = [];
  for (let i = YEARS.length - 1; i >= 0; i--) {
    if (YEARS[i] < fromYear) continue;
    const cells = keys.map((k) => {
      const v = SERIES[k].chn[i];
      return `<td>${v === null || v === undefined ? '—' : fmtNum(v, k === 'gdp' || k === 'gdpPpp' ? 2 : 2)}</td>`;
    }).join('');
    rows.push(`<tr><th scope="row">${YEARS[i]}</th>${cells}</tr>`);
  }
  const head = keys.map((k) => `<th scope="col">${SERIES[k].label}<span class="th-unit">${SERIES[k].unit}</span></th>`).join('');
  return `<div class="table-wrap"><table class="data-table"><thead><tr><th scope="col">Year</th>${head}</tr></thead><tbody>${rows.join('')}</tbody></table></div>`;
}

function sliceYears(years, values, fromYear) {
  const idx = years.map((y, i) => [y, i]).filter(([y]) => y >= fromYear);
  return {
    years: idx.map(([y]) => y),
    values: idx.map(([, i]) => values[i]),
  };
}

export function renderOverview() {
  const pop = latest('pop');
  const gdp = latest('gdp');
  const gdpPc = latest('gdpPc');
  const life = latest('lifeExp');
  const cards = [
    kpiCard('Population', fmtCompact(pop.value), `${pop.year} · down from 1.412bn in 2021`, '#/population', 'Population'),
    kpiCard('GDP', fmtTrillions(gdp.value), `${gdp.year} · current US$`, '#/economy', 'Economy'),
    kpiCard('GDP per capita', '$' + fmtNum(gdpPc.value, 0), `${gdpPc.year} · current US$`, '#/economy', 'Economy'),
    kpiCard('Life expectancy', fmtNum(life.value, 1) + ' years', `${life.year} · at birth`, '#/health', 'Health'),
  ].join('');

  const glanceKeys = ['pop', 'gdpPc', 'gdpGrowth', 'unemp', 'inflation', 'lifeExp', 'infantMort', 'urban'];
  const glanceRows = glanceKeys.map((k) => {
    const l = latest(k);
    return `<tr><th scope="row">${SERIES[k].label}</th><td>${l.value === null ? '—' : fmtNum(l.value, 2)}</td><td>${SERIES[k].unit}</td><td>${l.year}</td></tr>`;
  }).join('');

  return `${pageHead('China in Figures', 'The numbers that describe a country of 1.4 billion people — population, economy, health, education and environment, from the World Bank, in one place.', SRC + ' · data retrieved 2026-11-26.')}
  <div class="kpi-grid">${cards}</div>
  ${card('Population, 2014–2024', lineChart({
    title: 'Population of China, 2014 to 2024',
    years: YEARS,
    series: [{ label: 'China', color: '#b3271e', values: SERIES.pop.chn }],
    format: (v) => (v / 1e9).toFixed(2) + 'bn',
    yLabel: 'people',
  }), 'Population peaked at 1.412 billion in 2021 and has fallen for three years running: 1.409 billion in 2024. ' + SRC + '.')}
  ${card('GDP, 2014–2024', lineChart({
    title: 'GDP of China, 2014 to 2024',
    years: YEARS,
    series: [{ label: 'China', color: '#2f6f6a', values: SERIES.gdp.chn }],
    format: (v) => '$' + (v / 1e12).toFixed(1) + 'T',
    yLabel: 'current US$',
  }), 'GDP reached $18.73 trillion in 2024, up from $10.67 trillion in 2014. ' + SRC + '.')}
  ${card('At a glance — latest values', `<div class="table-wrap"><table class="data-table"><thead><tr><th scope="col">Indicator</th><th scope="col">Value</th><th scope="col">Unit</th><th scope="col">Year</th></tr></thead><tbody>${glanceRows}</tbody></table></div>`, SRC + '.')}
  ${card('Three things the numbers say', `<ol class="takeaways">
    <li><strong>China is shrinking and ageing.</strong> Population fell for a third straight year in 2024, and 14.7% of people are now 65 or older, up from 9.7% in 2014.</li>
    <li><strong>The economy is far bigger, and richer per person.</strong> GDP per capita rose from $7,781 in 2014 to $13,293 in 2024, while growth settled near 5% a year.</li>
    <li><strong>Health has improved fast.</strong> Infant deaths fell from 8.9 to 4.1 per 1,000 live births between 2014 and 2024, and life expectancy reached 78.0 years.</li>
  </ol>`, 'Each claim is backed by the figures on this site; see Sources for the indicator codes.')}
  <p class="next-link">Next: <a href="#/population">Population →</a></p>`;
}

export function renderPopulation() {
  return `${pageHead('Population', 'How many people live in China, how fast that number is changing, and how old the population is getting.', SRC + ' · 2014–2024.')}
  <div class="range-row" role="group" aria-label="Chart range">
    <span class="range-label">Show:</span>
    <button class="range-btn active" data-range="2014">2014–2024</button>
    <button class="range-btn" data-range="2019">2019–2024</button>
  </div>
  <div id="pop-chart">${card('Population, total', lineChart({
    title: 'Population of China',
    years: YEARS,
    series: [{ label: 'China', color: '#b3271e', values: SERIES.pop.chn }],
    format: (v) => (v / 1e9).toFixed(2) + 'bn',
    yLabel: 'people',
  }), 'Peak: 1.412 billion (2021). 2024: 1.409 billion. ' + SRC + '.')}</div>
  <div class="two-col">
    ${card('Age structure, 2024', donutChart({ title: 'Age structure of China in 2024', parts: AGE_2024 }), 'Children (0–14) are 16.0% of the population, down from 18.3% in 2014; people 65+ are 14.7%, up from 9.7%. ' + SRC + '.')}
    ${card('Urban share', lineChart({
    title: 'Urban population share of China',
    years: YEARS,
    series: [{ label: 'China', color: '#2f6f6a', values: SERIES.urban.chn }],
    format: (v) => v.toFixed(0) + '%',
    yLabel: '% of total population',
  }), 'Two in three people now live in towns and cities: 65.9% in 2024, up from 55.8% in 2014. ' + SRC + '.')}
  </div>
  ${card('Population growth', barChart({
    title: 'Population growth of China',
    years: YEARS,
    values: SERIES.popGrowth.chn,
    format: (v) => v.toFixed(1) + '%',
  }), 'Growth turned negative in 2022 (−0.01%) and reached −0.12% in 2024. ' + SRC + '.')}
  ${card('Population in full', yearTable(['pop', 'popGrowth', 'pop65', 'pop014', 'urban', 'density']), SRC + '. Population is shown in people; the rest in percent or people per sq. km.')}
  <p class="next-link">Next: <a href="#/economy">Economy →</a></p>`;
}

export function renderEconomy() {
  return `${pageHead('Economy', 'The size of the economy, how fast it grows, what people earn, and what it costs to live.', SRC + ' · 2014–2024.')}
  ${card('GDP, current US$', lineChart({
    title: 'GDP of China',
    years: YEARS,
    series: [{ label: 'China', color: '#2f6f6a', values: SERIES.gdp.chn }],
    format: (v) => '$' + (v / 1e12).toFixed(1) + 'T',
    yLabel: 'current US$',
  }), 'GDP: $18.73 trillion in 2024. In purchasing-power terms it is $38.24 trillion. ' + SRC + '.')}
  <div class="two-col">
    ${card('GDP growth', barChart({
    title: 'GDP growth of China',
    years: YEARS,
    values: SERIES.gdpGrowth.chn,
    format: (v) => v.toFixed(1) + '%',
  }), 'Growth was 4.96% in 2024, after 2.34% in the pandemic year 2020 and a rebound of 8.57% in 2021. ' + SRC + '.')}
    ${card('GDP per capita', lineChart({
    title: 'GDP per capita of China',
    years: YEARS,
    series: [{ label: 'China', color: '#b3271e', values: SERIES.gdpPc.chn }],
    format: (v) => '$' + Math.round(v).toLocaleString('en-US'),
    yLabel: 'current US$',
  }), 'GDP per capita: $13,293 in 2024, up from $7,781 in 2014. ' + SRC + '.')}
  </div>
  ${card('Prices, jobs and trade', yearTable(['unemp', 'inflation', 'trade', 'exports']), 'Unemployment is the modelled ILO estimate. Trade and exports are shares of GDP. ' + SRC + '.')}
  ${card('What this means', `<ul class="takeaways">
    <li><strong>Unemployment has stayed near 4–5%</strong> on the ILO modelled measure for the whole decade (4.59% in 2024).</li>
    <li><strong>Inflation is nearly flat.</strong> Consumer prices rose just 0.22% in 2024, after 0.23% in 2023 — the softest prices in the series.</li>
    <li><strong>Trade is a smaller share of the economy than it was.</strong> Trade was 44.1% of GDP in 2014 and 38.0% in 2024; exports were 20.4% of GDP in 2024.</li>
  </ul>`, SRC + '.')}
  <p class="next-link">Next: <a href="#/health">Health →</a></p>`;
}

export function renderHealth() {
  return `${pageHead('Health', 'How long people live, how many infants survive, and what the country spends on health.', SRC + ' · 2014–2024.')}
  <div class="two-col">
    ${card('Life expectancy at birth', lineChart({
    title: 'Life expectancy at birth in China',
    years: YEARS,
    series: [{ label: 'China', color: '#2f6f6a', values: SERIES.lifeExp.chn }],
    format: (v) => v.toFixed(1) + ' yrs',
    yLabel: 'years',
  }), 'Life expectancy: 78.0 years in 2024, up from 76.7 in 2014, and 4.5 years above the world average. ' + SRC + '.')}
    ${card('Infant mortality', lineChart({
    title: 'Infant mortality rate in China',
    years: YEARS,
    series: [{ label: 'China', color: '#b3271e', values: SERIES.infantMort.chn }],
    format: (v) => v.toFixed(1),
    yLabel: 'per 1,000 live births',
  }), 'Infant deaths fell by more than half in a decade: 4.1 per 1,000 live births in 2024, against 27.7 worldwide. ' + SRC + '.')}
  </div>
  ${card('Health spending', lineChart({
    title: 'Current health expenditure in China',
    years: YEARS,
    series: [{ label: 'China', color: '#b3271e', values: SERIES.healthExp.chn }],
    format: (v) => v.toFixed(1) + '%',
    yLabel: '% of GDP',
  }), 'Health spending was 5.94% of GDP in 2023, the latest year published, up from 4.70% in 2014 — still below the world average of 10.06%. ' + SRC + '.')}
  ${card('Health in full', yearTable(['lifeExp', 'infantMort', 'healthExp']), SRC + '. Health spending is published through 2023.')}
  <p class="next-link">Next: <a href="#/education">Education →</a></p>`;
}

export function renderEducation() {
  return `${pageHead('Education', 'Who goes on to higher education, who is online, and what government spends on schools.', SRC + ' · 2014–2024.')}
  ${card('Tertiary enrollment', lineChart({
    title: 'Tertiary school enrollment in China',
    years: YEARS,
    series: [{ label: 'China', color: '#b3271e', values: SERIES.tertEnr.chn }],
    format: (v) => v.toFixed(0) + '%',
    yLabel: '% gross',
  }), 'More than three in four young people now enter tertiary education: 76.9% gross enrollment in 2024, up from 43.7% in 2014. ' + SRC + '.')}
  <div class="two-col">
    ${card('Internet use', lineChart({
    title: 'Individuals using the Internet in China',
    years: YEARS,
    series: [{ label: 'China', color: '#2f6f6a', values: SERIES.internet.chn }],
    format: (v) => v.toFixed(0) + '%',
    yLabel: '% of population',
  }), 'Internet use reached 75.6% of the population in 2022, the latest year shown; the World Bank series breaks after 2022, so later years are left blank rather than guessed. ' + SRC + '.')}
    ${card('What government spends on education', `<p class="big-stat">11.91<span class="big-unit">% of government spending</span></p><p>That is what China spent on education in 2023, the only year the World Bank publishes for this indicator — below the world average of 13.96% and the East Asia &amp; Pacific average of 12.95% in the same year.</p>`, SRC + ' · indicator SE.XPD.TOTL.GB.ZS.')}
  </div>
  ${card('Education in full', yearTable(['tertEnr', 'internet', 'eduExp']), SRC + '. Blank cells mean the World Bank publishes no value for that year.')}
  <p class="next-link">Next: <a href="#/environment">Environment →</a></p>`;
}

export function renderEnvironment() {
  return `${pageHead('Environment', 'Energy, electricity, forests, clean power and the air people breathe.', SRC + ' · 2014–2024.')}
  <div class="two-col">
    ${card('Energy use per person', lineChart({
    title: 'Energy use per capita in China',
    years: YEARS,
    series: [{ label: 'China', color: '#b3271e', values: SERIES.energyPc.chn }],
    format: (v) => Math.round(v).toLocaleString('en-US'),
    yLabel: 'kg of oil equivalent per capita',
  }), 'Energy use: 2,947 kg of oil equivalent per person in 2024, up 35% from 2014 and well above the world average of 1,892. ' + SRC + '.')}
    ${card('Electricity use per person', lineChart({
    title: 'Electric power consumption per capita in China',
    years: YEARS,
    series: [{ label: 'China', color: '#2f6f6a', values: SERIES.elecPc.chn }],
    format: (v) => Math.round(v).toLocaleString('en-US') + ' kWh',
    yLabel: 'kWh per capita',
  }), 'Electricity use: 7,038 kWh per person in 2024, up from 4,006 in 2014. ' + SRC + '.')}
  </div>
  <div class="two-col">
    ${card('Forest area', lineChart({
    title: 'Forest area in China',
    years: YEARS,
    series: [{ label: 'China', color: '#2f6f6a', values: SERIES.forest.chn }],
    format: (v) => v.toFixed(1) + '%',
    yLabel: '% of land area',
  }), 'Forests cover 24.0% of the land in 2024, up from 22.2% in 2014. ' + SRC + '.')}
    ${card('Air quality — PM2.5', lineChart({
    title: 'PM2.5 exposure in China',
    years: YEARS,
    series: [{ label: 'China', color: '#b3271e', values: SERIES.pm25.chn }],
    format: (v) => v.toFixed(0) + ' µg/m³',
    yLabel: 'micrograms per cubic meter',
  }), 'Average PM2.5 exposure fell from 52.5 µg/m³ in 2014 to 32.0 in 2023, the latest year published — still about six times the WHO guideline of 5. ' + SRC + '.')}
  </div>
  ${card('Renewable energy', lineChart({
    title: 'Renewable energy consumption in China',
    years: YEARS,
    series: [{ label: 'China', color: '#2f6f6a', values: SERIES.renew.chn }],
    format: (v) => v.toFixed(1) + '%',
    yLabel: '% of total final energy consumption',
  }), 'Renewables were 15.2% of final energy use in 2021, the latest year published, up from 11.9% in 2014. ' + SRC + '.')}
  <p class="next-link">Next: <a href="#/compare">Compare →</a></p>`;
}

const COMPARE_KEYS = ['pop', 'gdpPc', 'gdpGrowth', 'lifeExp', 'infantMort', 'urban', 'pop65', 'unemp', 'internet', 'tertEnr', 'energyPc', 'forest'];

export function renderCompare() {
  const options = COMPARE_KEYS.map((k) => `<option value="${k}">${SERIES[k].label}</option>`).join('');
  return `${pageHead('Compare', 'China against the world and against East Asia &amp; Pacific, on the same indicator and the same years.', SRC + ' · 2014–2024.')}
  <div class="compare-controls">
    <label for="compare-select">Indicator</label>
    <select id="compare-select">${options}</select>
  </div>
  <div id="compare-chart"></div>
  <div id="compare-table"></div>
  <p class="next-link">Next: <a href="#/sources">Sources &amp; methods →</a></p>`;
}

export function renderCompareChart(key) {
  const s = SERIES[key];
  const regionValues = {
    chn: s.chn,
    wld: s.wld,
    eas: s.eas,
  };
  const format = key === 'pop'
    ? (v) => (v / 1e9).toFixed(1) + 'bn'
    : key === 'gdpPc' || key === 'energyPc'
      ? (v) => '$' + Math.round(v).toLocaleString('en-US')
      : (v) => v.toFixed(1);
  const chart = lineChart({
    title: `${s.label}: China, world and East Asia & Pacific`,
    years: YEARS,
    series: [
      { label: 'China', color: '#b3271e', values: regionValues.chn },
      { label: 'World', color: '#5b7fa6', values: regionValues.wld, dashed: true },
      { label: 'East Asia & Pacific', color: '#2f6f6a', values: regionValues.eas, dashed: true },
    ],
    format,
    yLabel: s.unit,
  });
  const rows = [];
  for (let i = YEARS.length - 1; i >= 0; i--) {
    const c = regionValues.chn[i];
    const w = regionValues.wld[i];
    const e = regionValues.eas[i];
    rows.push(`<tr><th scope="row">${YEARS[i]}</th><td>${c === null || c === undefined ? '—' : fmtNum(c, 2)}</td><td>${w === null || w === undefined ? '—' : fmtNum(w, 2)}</td><td>${e === null || e === undefined ? '—' : fmtNum(e, 2)}</td></tr>`);
  }
  const table = `<div class="table-wrap"><table class="data-table"><thead><tr><th scope="col">Year</th><th scope="col">China</th><th scope="col">World</th><th scope="col">East Asia &amp; Pacific</th></tr></thead><tbody>${rows.join('')}</tbody></table></div>`;
  return { chart, table };
}

export function renderSources() {
  const rows = Object.entries(SERIES).map(([key, s]) => {
    const first = YEARS.find((y, i) => s.chn[i] !== null && s.chn[i] !== undefined) ?? '—';
    const last = [...YEARS].reverse().find((y, ri) => s.chn[YEARS.length - 1 - ri] !== null && s.chn[YEARS.length - 1 - ri] !== undefined) ?? '—';
    const l = latest(key);
    return `<tr data-search="${(s.label + ' ' + s.code + ' ' + s.unit).toLowerCase()}">
      <th scope="row">${s.label}</th><td><code>${s.code}</code></td><td>${s.unit}</td>
      <td>${first}–${last}</td><td>${l.value === null ? '—' : fmtNum(l.value, 2)}</td><td>${l.year ?? '—'}</td>
    </tr>`;
  }).join('');
  return `${pageHead('Sources & methods', 'Every figure on this site comes from one place — the World Bank’s World Development Indicators — so you can check any number yourself.', '')}
  ${card('About the data', `<p>All series were retrieved from the World Bank API (api.worldbank.org) on ${META.updated} and cover 2014–2024. Values are shown as published; where the World Bank publishes no value for a year, the cell is left blank rather than filled in. Regional comparisons use the World Bank’s <em>World</em> and <em>East Asia &amp; Pacific</em> aggregates. Population figures are mid-year estimates. GDP is in current US dollars unless marked PPP (purchasing power parity, current international dollars).</p>
  <p>China’s internet-use series is shown through 2022: the World Bank’s published values for 2023–2024 break with the earlier series, so they are left out instead of shown as if they were comparable. Government education spending is published for 2023 only.</p>`, '')}
  <div class="sources-controls">
    <label for="source-search">Find an indicator</label>
    <input id="source-search" type="search" placeholder="Try “life expectancy” or “SP.POP”" autocomplete="off">
    <button id="download-csv" type="button">Download all data (.csv)</button>
  </div>
  ${card('Indicator list', `<div class="table-wrap"><table class="data-table" id="sources-table"><thead><tr><th scope="col">Indicator</th><th scope="col">WDI code</th><th scope="col">Unit</th><th scope="col">Years</th><th scope="col">Latest value</th><th scope="col">Year</th></tr></thead><tbody>${rows}</tbody></table></div><p class="card-note" id="sources-count">${Object.keys(SERIES).length} indicators. ${SRC}.</p>`, '')}
  <p class="next-link"><a href="#/">← Back to the overview</a></p>`;
}

export function buildCsv() {
  const lines = ['indicator,code,unit,year,china,world,east_asia_pacific'];
  for (const [key, s] of Object.entries(SERIES)) {
    YEARS.forEach((y, i) => {
      const cell = (v) => (v === null || v === undefined ? '' : v);
      lines.push(`"${s.label}",${s.code},"${s.unit}",${y},${cell(s.chn[i])},${cell(s.wld[i])},${cell(s.eas[i])}`);
    });
  }
  return lines.join('\n');
}

export function renderPopulationRange(fromYear) {
  const pop = sliceYears(YEARS, SERIES.pop.chn, fromYear);
  return card(`Population, ${fromYear}–2024`, lineChart({
    title: 'Population of China',
    years: pop.years,
    series: [{ label: 'China', color: '#b3271e', values: pop.values }],
    format: (v) => (v / 1e9).toFixed(2) + 'bn',
    yLabel: 'people',
  }), `Peak: 1.412 billion (2021). 2024: 1.409 billion. ${SRC}.`);
}

export { latestYear };
