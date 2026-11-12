// Builds the interior PDFs.
//   node build/book.js            -> digital + print
//   node build/book.js digital    -> one edition
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { P, svgDoc } = require('../src/lib');
const X = require('../src/props');
const { bookHTML, WS_ICONS } = require('../src/layout');
const { getBrowser, close, svgToImage, waitFonts } = require('../src/render');
const { META } = require('../src/book');

const ROOT = path.resolve(__dirname, '../..');
const CACHE = path.join(__dirname, 'cache');
fs.mkdirSync(CACHE, { recursive: true });

async function prepare() {
  const idx = JSON.parse(fs.readFileSync(path.join(ROOT, '03_Illustrations/index.json')));
  for (const [id, m] of Object.entries(idx)) {
    const src = path.join(ROOT, '03_Illustrations', m.file), dst = path.join(CACHE, id + '.jpg');
    if (!fs.existsSync(dst) || fs.statSync(dst).mtimeMs < fs.statSync(src).mtimeMs)
      execFileSync('convert', [src, '-quality', '92', '-sampling-factor', '4:4:4', dst]);
    const web = path.join(CACHE, id + '_web.jpg');
    if (!fs.existsSync(web) || fs.statSync(web).mtimeMs < fs.statSync(src).mtimeMs)
      execFileSync('convert', [src, '-resize', `${Math.round(m.printWidthIn * 200)}x`, '-quality', '84', web]);
  }
  const paper = path.join(CACHE, 'paper.jpg');
  if (!fs.existsSync(paper) || require('child_process').execFileSync('identify', ['-format', '%w', paper]).toString() !== '2640') {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1300" height="1300" viewBox="0 0 1300 1300"><defs><filter id="pp"><feTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves="3" seed="5"/><feColorMatrix type="matrix" values="0 0 0 0 0.55  0 0 0 0 0.45  0 0 0 0 0.3  0 0 0 -1.5 0.9"/></filter><radialGradient id="v" r=".75"><stop offset=".6" stop-color="#fdf7e8" stop-opacity="0"/><stop offset="1" stop-color="#ecd9b0" stop-opacity=".55"/></radialGradient></defs><rect width="1300" height="1300" fill="#fdf7e8"/><rect width="1300" height="1300" filter="url(#pp)" opacity=".10"/><rect width="1300" height="1300" fill="url(#v)"/></svg>`;
    await svgToImage(svg, 1300, 1300, path.join(CACHE, 'paper.png'), { outW: 2640 });
    execFileSync('convert', [path.join(CACHE, 'paper.png'), '-quality', '88', paper]);
  }
  for (const [ic] of WS_ICONS) {
    const out = path.join(CACHE, `icon_${ic}.png`);
    if (fs.existsSync(out)) continue;
    const svg = svgDoc(300, 300, X.icon(ic, ic === 'bike' ? 150 : 150, ic === 'bike' ? 214 : 236, ic === 'bike' ? 1.95 : 1.75), { bg: '#ffffff', paper: 0, seed: 9 });
    await svgToImage(svg, 300, 300, out, { outW: 300 });
  }
}

async function build(ed) {
  const html = bookHTML(ed);
  const file = path.join(__dirname, `book_${ed}.html`);
  fs.writeFileSync(file, html);
  const b = await getBrowser();
  const page = await b.newPage();
  await page.goto('file://' + file, { waitUntil: 'load' });
  await waitFonts(page);
  await page.evaluate(() => Promise.all([...document.images].map((i) => i.complete ? 1 : new Promise((r) => { i.onload = i.onerror = r; }))));
  // auto-fit: shrink the main illustration until the page content fits (never shrink text)
  const report = await page.evaluate(() => {
    const out = [];
    document.querySelectorAll('section.page').forEach((s) => {
      const c = s.querySelector('.content'); if (!c) return;
      const fig = c.querySelector('figure.art');
      let w = 100;
      const over = () => c.scrollHeight - c.clientHeight;
      while (fig && over() > 0 && w > 55) { w -= 1; fig.style.width = w + '%'; }
      const box = c.getBoundingClientRect();
      let hOver = 0;
      c.querySelectorAll('*:not(.tape)').forEach((e) => { const r = e.getBoundingClientRect(); if (r.width && (r.right > box.right + 1 || r.left < box.left - 1)) hOver++; });
      out.push({ n: +s.dataset.n, artWidthPct: w, overflowPx: Math.max(0, over()), spareVerticalPx: Math.max(0, -over()), horizontalOverflowElems: hOver });
    });
    return out;
  });
  const qc = path.join(ROOT, '11_Quality_Control');
  fs.mkdirSync(qc, { recursive: true });
  fs.writeFileSync(path.join(qc, `layout_fit_${ed}.json`), JSON.stringify(report, null, 1));
  const bad = report.filter((r) => r.overflowPx > 0 || r.horizontalOverflowElems > 0);
  console.log(ed, 'pages:', report.length + 1, 'problems:', JSON.stringify(bad));
  const out = ed === 'print'
    ? path.join(ROOT, '07_Print_Edition', 'The_Little_Money_Makers_Print_Interior_8.5x8.5_bleed.pdf')
    : path.join(ROOT, '05_Final_PDF', 'The_Little_Money_Makers_Digital_Edition.pdf');
  await page.pdf({ path: out, preferCSSPageSize: true, printBackground: true, outline: true, tagged: true });
  await page.close();
  // document metadata
  execFileSync('python3', ['-I', path.join(__dirname, 'set_meta.py'), out, `${META.title}: ${META.subtitle}`, META.author || '', META.tagline]);
  console.log('wrote', path.relative(ROOT, out), (fs.statSync(out).size / 1e6).toFixed(1) + ' MB');
}

(async () => {
  await prepare();
  const eds = process.argv.slice(2).length ? process.argv.slice(2) : ['digital', 'print'];
  for (const ed of eds) await build(ed);
  await close();
})();
