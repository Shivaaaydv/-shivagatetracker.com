// Cover files: ebook cover (JPEG), front/back panels (PNG), KDP paperback full-wrap PDF (+ guides preview).
// Paperback spec (verify with KDP's cover calculator before upload):
//   trim 8.5 x 8.5 in, premium colour paper, spine = pages x 0.002347 in, 0.125 in bleed on all outer edges,
//   no spine text under 79 pages, barcode area 2 x 1.2 in kept clear at the lower right of the back cover.
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { META, BACK, PAGES } = require('../src/book');
const { fontCSS, getBrowser, close, waitFonts } = require('../src/render');
const { textPath } = require('../src/typeset');

const ROOT = path.resolve(__dirname, '../..');
const OUT = path.join(ROOT, '08_Cover_Design');
const CACHE = path.join(__dirname, 'cache');
const img = (f) => 'file://' + path.join(CACHE, f);

const PAGE_COUNT = PAGES.length;              // interior pages (must match the interior PDF)
const PAPER_FACTOR = 0.002347;                 // premium colour, inches per page
const SPINE = +(PAGE_COUNT * PAPER_FACTOR).toFixed(4);
const TRIM = 8.5, BLEED = 0.125;
const WRAP_W = +(BLEED + TRIM + SPINE + TRIM + BLEED).toFixed(4), WRAP_H = TRIM + 2 * BLEED;

const tick = `<svg width="15" height="15" viewBox="0 0 20 20"><path d="M3 10.5l4.5 4.5L17 4.5" fill="none" stroke="#3f8f4f" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

// Front panel: positioned inside a box whose trim area starts at (tx, ty) inches; art bleeds to the box edges.
function front(tx, ty) {
  const title = `<svg style="position:absolute;left:${tx + 0.35}in;top:${ty + 0.32}in;width:7.8in" viewBox="0 0 780 330">
    ${textPath('The Little', { x: 390, y: 98, size: 92, fill: '#3f7fcc', stroke: '#3b2a20', sw: 13 })}
    ${textPath('Money Makers', { x: 390, y: 210, size: 108, fill: '#e2584a', stroke: '#3b2a20', sw: 13, ls: 1 })}
    <g transform="translate(390 284)"><path d="M-275 -30 L275 -30 L256 0 L275 30 L-275 30 L-256 0Z" fill="#fbe3a0" stroke="#3b2a20" stroke-width="3.5" stroke-linejoin="round"/>${textPath(META.subtitle, { y: 12, size: 33, font: 'b700' })}</g></svg>`;
  const badge = `<svg style="position:absolute;left:${tx + 6.95}in;top:${ty + 3.55}in;width:1.25in" viewBox="0 0 120 120"><circle cx="60" cy="60" r="54" fill="#3f8f4f" stroke="#3b2a20" stroke-width="4"/><circle cx="60" cy="60" r="45" fill="none" stroke="#fff" stroke-width="2.5" stroke-dasharray="6 5"/>${textPath('AGES', { x: 60, y: 52, size: 22, font: 'b700', fill: '#fff' })}${textPath('6–10', { x: 60, y: 86, size: 36, font: 'b800', fill: '#fff' })}</svg>`;
  const tag = `<svg style="position:absolute;left:${tx + 1.05}in;top:${ty + 7.62}in;width:6.4in" viewBox="0 0 640 60"><rect x="3" y="3" width="634" height="54" rx="27" fill="#fdf7e8" stroke="#3b2a20" stroke-width="3.5"/>${textPath(META.tagline, { x: 320, y: 41, size: 29, font: 'b700' })}</svg>`;
  const author = META.author ? `<svg style="position:absolute;left:${tx + 1.5}in;top:${ty + 3.55}in;width:5.5in" viewBox="0 0 550 50">${textPath('by ' + META.author, { x: 275, y: 36, size: 30, font: 'b700', fill: '#3b2a20', stroke: '#fdf7e8', sw: 6 })}</svg>` : '';
  return title + badge + tag + author;
}

function back(tx, ty) {
  return `<div style="position:absolute;left:${tx}in;top:${ty}in;width:${TRIM}in;height:${TRIM}in">
   <div style="position:absolute;left:.6in;right:.6in;top:.55in">
    <svg style="width:100%;display:block" viewBox="0 0 730 52">${textPath('Can Aarav save enough for his dream?', { x: 365, y: 40, size: 40, font: 'b800', fill: '#e2584a' })}</svg>
    <p style="font:15pt/1.45 'Andika';margin:.16in 0 .18in;text-align:center">${BACK.blurb}</p>
    <div style="background:#fff;border:2pt solid #3f8f4f;border-radius:14px;padding:.08in .2in .1in">
      <div style="font:800 15pt 'Baloo 2';color:#3f8f4f;margin-bottom:2px">Inside, children discover:</div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:2px .2in;font:13.5pt/1.38 'Andika'">${BACK.benefits.map((b) => `<div style="display:flex;gap:6px;align-items:center">${tick}${b}</div>`).join('')}</div>
    </div>
   </div>
   <img src="${img('back.jpg')}" style="position:absolute;left:.6in;bottom:.55in;width:4.9in;border-radius:14px;border:2.4pt solid #3b2a20"/>
   <div style="position:absolute;left:5.75in;bottom:2.1in;width:2.15in;text-align:center;font:700 13pt/1.25 'Baloo 2'">A warm story about money, habits and kindness for ages 6–10</div>
  </div>`;
}

const page = (w, h, body, extraCSS = '') => `<!doctype html><html><head><meta charset="utf-8"><style>${fontCSS()} @page{size:${w}in ${h}in;margin:0} html,body{margin:0;padding:0} body{width:${w}in;height:${h}in;position:relative;overflow:hidden;color:#3b2a20;-webkit-print-color-adjust:exact;print-color-adjust:exact} ${extraCSS}</style></head><body>${body}</body></html>`;

async function render(html, name, { pdf, png, pxW, w, h }) {
  const file = path.join(__dirname, `.${name}.html`);
  fs.writeFileSync(file, html);
  const b = await getBrowser();
  const vw = Math.round(w * 96), vh = Math.round(h * 96);
  const p = await b.newPage({ viewport: { width: vw, height: vh }, deviceScaleFactor: pxW ? pxW / vw : 1 });
  await p.goto('file://' + file); await waitFonts(p);
  await p.evaluate(() => Promise.all([...document.images].map((i) => i.complete ? 1 : new Promise((r) => { i.onload = i.onerror = r; }))));
  if (pdf) await p.pdf({ path: pdf, width: `${w}in`, height: `${h}in`, printBackground: true, pageRanges: '1' });
  if (png) await p.screenshot({ path: png, type: png.endsWith('.jpg') ? 'jpeg' : 'png', quality: png.endsWith('.jpg') ? 92 : undefined, clip: { x: 0, y: 0, width: vw, height: vh } });
  await p.close(); fs.unlinkSync(file);
}

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const art = `<img src="${img('cover.jpg')}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover"/>`;
  // 1) ebook / marketplace cover: square, trim only
  await render(page(TRIM, TRIM, art + front(0, 0)), 'ebook', { png: path.join(OUT, 'Ebook_Cover_2560x2560.jpg'), pxW: 2560, w: TRIM, h: TRIM });
  await render(page(TRIM, TRIM, art + front(0, 0)), 'front_png', { png: path.join(OUT, 'Front_Cover_8.5in_300dpi.png'), pxW: 2550, w: TRIM, h: TRIM });
  // 2) back panel alone (trim size)
  const backBg = `<div style="position:absolute;inset:0;background:#fdf7e8 url('${img('paper.jpg')}') center/cover"></div>`;
  await render(page(TRIM, TRIM, backBg + back(0, 0)), 'back_png', { png: path.join(OUT, 'Back_Cover_8.5in_300dpi.png'), pxW: 2550, w: TRIM, h: TRIM });
  // 3) full wrap for KDP paperback
  const fx = BLEED + TRIM + SPINE; // left edge of front trim
  const wrapBody = `<div style="position:absolute;left:0;top:0;width:${BLEED + TRIM + SPINE / 2}in;height:${WRAP_H}in;background:#fdf7e8 url('${img('paper.jpg')}') center/cover"></div>
    <div style="position:absolute;left:${BLEED + TRIM}in;top:0;width:${SPINE}in;height:${WRAP_H}in;background:#e2584a"></div>
    <div style="position:absolute;left:${fx}in;top:0;width:${TRIM + BLEED}in;height:${WRAP_H}in;overflow:hidden">${art.replace('inset:0', 'left:0;top:0')}${front(0, BLEED)}</div>
    ${back(BLEED, BLEED)}`;
  const wrapPdf = path.join(OUT, `Paperback_Full_Wrap_Cover_${PAGE_COUNT}pp_PremiumColour_${WRAP_W}x${WRAP_H}in.pdf`);
  await render(page(WRAP_W, WRAP_H, wrapBody), 'wrap', { pdf: wrapPdf, png: path.join(OUT, 'Paperback_Full_Wrap_Cover_preview.png'), pxW: Math.round(WRAP_W * 150), w: WRAP_W, h: WRAP_H });
  require('child_process').execFileSync('python3', ['-I', path.join(__dirname, 'fix_cover_box.py'), wrapPdf, String(WRAP_W), String(WRAP_H), String(BLEED)]);
  // 4) guides overlay preview (not for upload)
  const guides = `<div style="position:absolute;inset:0;pointer-events:none">
    <div style="position:absolute;left:${BLEED}in;top:${BLEED}in;width:${WRAP_W - 2 * BLEED}in;height:${TRIM}in;outline:2px solid #0a0"></div>
    <div style="position:absolute;left:${BLEED + TRIM}in;top:0;width:${SPINE}in;height:${WRAP_H}in;outline:2px solid #00f"></div>
    <div style="position:absolute;left:${BLEED + 0.25}in;top:${BLEED + 0.25}in;width:${TRIM - 0.5}in;height:${TRIM - 0.5}in;outline:2px dashed #f0f"></div>
    <div style="position:absolute;left:${fx + 0.25}in;top:${BLEED + 0.25}in;width:${TRIM - 0.5}in;height:${TRIM - 0.5}in;outline:2px dashed #f0f"></div>
    <div style="position:absolute;left:${BLEED + TRIM - 0.25 - 2}in;top:${BLEED + TRIM - 0.25 - 1.2}in;width:2in;height:1.2in;background:rgba(255,255,0,.55);outline:2px solid #c90;font:700 11pt sans-serif;display:flex;align-items:center;justify-content:center">BARCODE AREA</div></div>`;
  await render(page(WRAP_W, WRAP_H, wrapBody + guides), 'guides', { png: path.join(OUT, 'Paperback_Full_Wrap_Cover_GUIDES_not_for_upload.png'), pxW: Math.round(WRAP_W * 100), w: WRAP_W, h: WRAP_H });
  const spec = { pageCount: PAGE_COUNT, paper: 'Premium colour (white)', spineFactorInPerPage: PAPER_FACTOR, spineIn: SPINE, trimIn: [TRIM, TRIM], bleedIn: BLEED, fullWrapIn: [WRAP_W, WRAP_H], fullWrapPx300: [Math.round(WRAP_W * 300), Math.round(WRAP_H * 300)], spineText: 'none (KDP allows spine text only above 79 pages)', barcodeArea: '2 x 1.2 in, lower right of back cover, 0.25 in from trim edges' };
  fs.writeFileSync(path.join(OUT, 'cover_spec.json'), JSON.stringify(spec, null, 2));
  console.log(spec);
  await close();
})();
