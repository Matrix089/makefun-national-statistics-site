// Small SVG chart builders for China in Figures. No library: every chart is
// drawn from the series data with plain string building, so the site stays
// light (a few kilobytes of JavaScript) and works with no network at all.

function niceNumber(raw, decimals) {
  return raw.toLocaleString('en-US', { maximumFractionDigits: decimals ?? 2 });
}

function axisTicks(min, max, count) {
  if (min === max) { min -= 1; max += 1; }
  const step = (max - min) / count;
  const ticks = [];
  for (let i = 0; i <= count; i++) ticks.push(min + step * i);
  return ticks;
}

// A line chart for one series, with an optional second series overlaid.
// `series` is [{ label, color, values, dashed }]; values align with `years`.
export function lineChart({ title, years, series, height = 260, format, yLabel = '' }) {
  const width = 760;
  const padL = 64;
  const padR = 16;
  const padT = 14;
  const padB = 34;
  const innerW = width - padL - padR;
  const innerH = height - padT - padB;

  let min = Infinity;
  let max = -Infinity;
  for (const s of series) {
    for (const v of s.values) {
      if (v === null || v === undefined) continue;
      if (v < min) min = v;
      if (v > max) max = v;
    }
  }
  const span = max - min || 1;
  min -= span * 0.08;
  max += span * 0.08;

  const x = (i) => padL + (i / (years.length - 1)) * innerW;
  const y = (v) => padT + innerH - ((v - min) / (max - min)) * innerH;
  const fmt = format ?? ((v) => niceNumber(v));

  let out = `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="${title}" class="chart">`;
  for (const t of axisTicks(min, max, 4)) {
    const yy = y(t);
    out += `<line x1="${padL}" y1="${yy}" x2="${width - padR}" y2="${yy}" class="grid"/>`;
    out += `<text x="${padL - 8}" y="${yy + 4}" class="tick" text-anchor="end">${fmt(t)}</text>`;
  }
  for (let i = 0; i < years.length; i++) {
    if (i % 2 === 0 || i === years.length - 1) {
      out += `<text x="${x(i)}" y="${height - 10}" class="tick" text-anchor="middle">${years[i]}</text>`;
    }
  }
  for (const s of series) {
    let d = '';
    let started = false;
    const dots = [];
    s.values.forEach((v, i) => {
      if (v === null || v === undefined) { started = false; return; }
      d += (started ? ' L' : 'M') + x(i).toFixed(1) + ' ' + y(v).toFixed(1);
      started = true;
      dots.push([x(i), y(v)]);
    });
    out += `<path d="${d}" fill="none" stroke="${s.color}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"${s.dashed ? ' stroke-dasharray="6 4"' : ''}/>`;
    for (const [cx, cy] of dots) {
      out += `<circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="3.2" fill="${s.color}" stroke="#fff" stroke-width="1.2"/>`;
    }
    // With one series, name its latest value above the last point, anchored
    // at the right edge so the label can never run off the chart. With
    // several series the labels would collide, so the table below carries
    // the values instead.
    if (series.length === 1) {
      const last = s.values.map((v, i) => [v, i]).filter(([v]) => v !== null && v !== undefined).pop();
      if (last) {
        out += `<text x="${width - padR}" y="${Math.max(y(last[0]) - 10, 12)}" class="series-label" text-anchor="end" fill="${s.color}">${fmt(last[0])}</text>`;
      }
    }
  }
  if (yLabel) out += `<text x="${padL}" y="12" class="axis-note">${yLabel}</text>`;
  out += '</svg>';
  return out;
}

// A vertical bar chart for one series (used for growth rates).
export function barChart({ title, years, values, color = '#b3271e', height = 240, format, zeroLine = true }) {
  const width = 760;
  const padL = 56;
  const padR = 16;
  const padT = 14;
  const padB = 34;
  const innerW = width - padL - padR;
  const innerH = height - padT - padB;

  const nums = values.filter((v) => v !== null && v !== undefined);
  let min = Math.min(0, ...nums);
  let max = Math.max(0, ...nums);
  if (min === max) { min -= 1; max += 1; }
  min -= (max - min) * 0.06;
  max += (max - min) * 0.06;

  const x = (i) => padL + (i + 0.5) * (innerW / years.length);
  const y = (v) => padT + innerH - ((v - min) / (max - min)) * innerH;
  const fmt = format ?? ((v) => niceNumber(v, 1));
  const barW = Math.min(34, (innerW / years.length) * 0.62);

  let out = `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="${title}" class="chart">`;
  for (const t of axisTicks(min, max, 4)) {
    const yy = y(t);
    out += `<line x1="${padL}" y1="${yy}" x2="${width - padR}" y2="${yy}" class="grid"/>`;
    out += `<text x="${padL - 8}" y="${yy + 4}" class="tick" text-anchor="end">${fmt(t)}</text>`;
  }
  if (zeroLine) {
    out += `<line x1="${padL}" y1="${y(0)}" x2="${width - padR}" y2="${y(0)}" class="zero"/>`;
  }
  values.forEach((v, i) => {
    if (v === null || v === undefined) return;
    const top = Math.min(y(0), y(v));
    const h = Math.abs(y(v) - y(0));
    out += `<rect x="${(x(i) - barW / 2).toFixed(1)}" y="${top.toFixed(1)}" width="${barW.toFixed(1)}" height="${Math.max(h, 1.5).toFixed(1)}" rx="2" fill="${v < 0 ? '#5b7fa6' : color}"><title>${years[i]}: ${fmt(v)}</title></rect>`;
    if (i % 2 === 0 || i === years.length - 1) {
      out += `<text x="${x(i)}" y="${height - 10}" class="tick" text-anchor="middle">${years[i]}</text>`;
    }
  });
  out += '</svg>';
  return out;
}

// A donut chart for a small set of shares (age structure).
export function donutChart({ title, parts, size = 260 }) {
  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - 14;
  const inner = r * 0.62;
  const total = parts.reduce((a, p) => a + p.value, 0);
  let angle = -Math.PI / 2;
  let slices = '';
  for (const p of parts) {
    const frac = p.value / total;
    const a0 = angle;
    const a1 = angle + frac * Math.PI * 2;
    const large = frac > 0.5 ? 1 : 0;
    const x0 = cx + r * Math.cos(a0);
    const y0 = cy + r * Math.sin(a0);
    const x1 = cx + r * Math.cos(a1);
    const y1 = cy + r * Math.sin(a1);
    const xi1 = cx + inner * Math.cos(a1);
    const yi1 = cy + inner * Math.sin(a1);
    const xi0 = cx + inner * Math.cos(a0);
    const yi0 = cy + inner * Math.sin(a0);
    slices += `<path d="M ${x0.toFixed(1)} ${y0.toFixed(1)} A ${r} ${r} 0 ${large} 1 ${x1.toFixed(1)} ${y1.toFixed(1)} L ${xi1.toFixed(1)} ${yi1.toFixed(1)} A ${inner} ${inner} 0 ${large} 0 ${xi0.toFixed(1)} ${yi0.toFixed(1)} Z" fill="${p.color}"><title>${p.label}: ${p.value}%</title></path>`;
    angle = a1;
  }
  const legend = parts.map((p) => `<li><span class="swatch" style="background:${p.color}"></span>${p.label} — <strong>${p.value}%</strong></li>`).join('');
  return `<div class="donut-wrap">
    <svg viewBox="0 0 ${size} ${size}" role="img" aria-label="${title}" class="donut">${slices}
      <text x="${cx}" y="${cy - 4}" class="donut-big" text-anchor="middle">2024</text>
      <text x="${cx}" y="${cy + 18}" class="donut-small" text-anchor="middle">age structure</text>
    </svg>
    <ul class="legend">${legend}</ul>
  </div>`;
}

// Format helpers shared by the pages.
export function fmtBillions(v) {
  return (v / 1e9).toLocaleString('en-US', { maximumFractionDigits: 0 });
}

export function fmtTrillions(v) {
  return '$' + (v / 1e12).toLocaleString('en-US', { maximumFractionDigits: 2 }) + ' trillion';
}

export function fmtCompact(v) {
  if (v >= 1e12) return (v / 1e12).toLocaleString('en-US', { maximumFractionDigits: 2 }) + 'T';
  if (v >= 1e9) return (v / 1e9).toLocaleString('en-US', { maximumFractionDigits: 1 }) + 'bn';
  if (v >= 1e6) return (v / 1e6).toLocaleString('en-US', { maximumFractionDigits: 1 }) + 'm';
  return v.toLocaleString('en-US');
}

export function fmtNum(v, decimals = 2) {
  if (v === null || v === undefined) return '—';
  return v.toLocaleString('en-US', { maximumFractionDigits: decimals, minimumFractionDigits: decimals });
}

// Change between the first and last published values of a series.
export function changeOver(key, region, seriesData) {
  const values = seriesData[key][region];
  const first = values.find((v) => v !== null && v !== undefined);
  let last = null;
  for (let i = values.length - 1; i >= 0; i--) {
    if (values[i] !== null && values[i] !== undefined) { last = values[i]; break; }
  }
  if (first === null || first === undefined || last === null) return null;
  return last - first;
}
