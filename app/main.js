// Router and page wiring for China in Figures.
//
// The site is one page with hash routes: #/ is the overview, #/population
// and friends are the sections. Changing the hash re-renders the main
// region, marks the matching nav link, and moves focus to the top, so every
// link in the site does what it says.

import { SECTIONS } from './data.js';
import {
  renderOverview,
  renderPopulation,
  renderEconomy,
  renderHealth,
  renderEducation,
  renderEnvironment,
  renderCompare,
  renderCompareChart,
  renderSources,
  renderPopulationRange,
  buildCsv,
} from './views.js';

const ROUTES = {
  '/': { title: 'China in Figures — National Statistics', render: renderOverview },
  '/population': { title: 'Population — China in Figures', render: renderPopulation },
  '/economy': { title: 'Economy — China in Figures', render: renderEconomy },
  '/health': { title: 'Health — China in Figures', render: renderHealth },
  '/education': { title: 'Education — China in Figures', render: renderEducation },
  '/environment': { title: 'Environment — China in Figures', render: renderEnvironment },
  '/compare': { title: 'Compare — China in Figures', render: renderCompare },
  '/sources': { title: 'Sources & methods — China in Figures', render: renderSources },
};

const app = document.getElementById('app');
const nav = document.getElementById('main-nav');

function routeFromHash() {
  const hash = window.location.hash || '#/';
  const path = hash.slice(1).split('?')[0] || '/';
  return ROUTES[path] ? path : '/';
}

function render() {
  const path = routeFromHash();
  const route = ROUTES[path];
  app.innerHTML = route.render();
  document.title = route.title;
  for (const link of nav.querySelectorAll('a')) {
    const on = link.getAttribute('href') === '#' + path;
    link.classList.toggle('active', on);
    if (on) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  }
  window.scrollTo(0, 0);
  afterRender(path);
}

// Controls that only exist on one page get wired up here, after each render.
function afterRender(path) {
  if (path === '/population') {
    for (const btn of app.querySelectorAll('.range-btn')) {
      btn.addEventListener('click', () => {
        for (const b of app.querySelectorAll('.range-btn')) b.classList.toggle('active', b === btn);
        const fromYear = Number(btn.dataset.range);
        document.getElementById('pop-chart').innerHTML = renderPopulationRange(fromYear);
      });
    }
  }
  if (path === '/compare') {
    const select = document.getElementById('compare-select');
    const draw = (key) => {
      const { chart, table } = renderCompareChart(key);
      const s = document.getElementById('compare-chart');
      const t = document.getElementById('compare-table');
      s.innerHTML = `<section class="card"><h2>${chartTitle(key)}</h2>${chart}<p class="card-note">Source: World Bank, World Development Indicators.</p></section>`;
      t.innerHTML = `<section class="card"><h2>Values</h2>${table}</section>`;
    };
    select.addEventListener('change', () => draw(select.value));
    draw(select.value);
  }
  if (path === '/sources') {
    const search = document.getElementById('source-search');
    const count = document.getElementById('sources-count');
    search.addEventListener('input', () => {
      const q = search.value.trim().toLowerCase();
      let shown = 0;
      for (const row of document.querySelectorAll('#sources-table tbody tr')) {
        const hit = !q || row.dataset.search.includes(q);
        row.style.display = hit ? '' : 'none';
        if (hit) shown++;
      }
      count.textContent = shown === 0
        ? 'No indicators match that search.'
        : `${shown} indicator${shown === 1 ? '' : 's'} shown. Source: World Bank, World Development Indicators.`;
    });
    document.getElementById('download-csv').addEventListener('click', () => {
      const blob = new Blob([buildCsv()], { type: 'text/csv;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'china-in-figures-data.csv';
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    });
  }
}

function chartTitle(key) {
  const labels = {
    pop: 'Population, total',
    gdpPc: 'GDP per capita',
    gdpGrowth: 'GDP growth',
    lifeExp: 'Life expectancy at birth',
    infantMort: 'Infant mortality rate',
    urban: 'Urban population',
    pop65: 'Population ages 65 and above',
    unemp: 'Unemployment, total',
    internet: 'Individuals using the Internet',
    tertEnr: 'School enrollment, tertiary',
    energyPc: 'Energy use',
    forest: 'Forest area',
  };
  return labels[key] || key;
}

// Build the top navigation from the section list in data.js.
nav.innerHTML = SECTIONS.map((s) => `<a href="${s.path}">${s.label}</a>`).join('');

window.addEventListener('hashchange', render);
render();
