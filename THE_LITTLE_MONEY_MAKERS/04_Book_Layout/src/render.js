// Headless Chromium renderer: SVG/HTML -> PNG/JPEG/PDF with the book's licensed fonts embedded.
const path = require('path');
const fs = require('fs');
const { chromium } = require('playwright');

const FONT_DIR = path.resolve(__dirname, '../fonts');
const fontCSS = () => {
  const ff = (fam, file, weight, style = 'normal', range = '') =>
    `@font-face{font-family:'${fam}';src:url('file://${FONT_DIR}/${file}') format('woff2');font-weight:${weight};font-style:${style};font-display:block;${range}}`;
  const out = [];
  for (const w of [500, 600, 700, 800]) for (const s of ['latin', 'latin-ext']) out.push(ff('Baloo 2', `baloo-2-${s}-${w}-normal.woff2`, w));
  for (const w of [400, 700]) for (const st of ['normal', 'italic']) for (const s of ['latin', 'latin-ext']) out.push(ff('Andika', `andika-${s}-${w}-${st}.woff2`, w, st));
  for (const s of ['latin', 'latin-ext']) out.push(ff('Patrick Hand', `patrick-hand-${s}-400-normal.woff2`, 400));
  return out.join('\n');
};

let browser;
async function getBrowser() {
  if (!browser) browser = await chromium.launch({ args: ['--allow-file-access-from-files'] });
  return browser;
}
async function close() { if (browser) await browser.close(); browser = null; }

async function waitFonts(page) {
  await page.evaluate(async () => {
    const fams = ["700 20px 'Baloo 2'", "800 20px 'Baloo 2'", "600 20px 'Baloo 2'", "400 20px 'Andika'", "700 20px 'Andika'", "400 20px 'Patrick Hand'"];
    await Promise.all(fams.map((f) => document.fonts.load(f, 'Aa₹')));
    await document.fonts.ready;
  });
}

// Render an SVG string to an image of pixel size outW x outH.
async function svgToImage(svg, w, h, outFile, { outW, type = 'png', quality = 92 } = {}) {
  const b = await getBrowser();
  const scale = (outW || w) / w;
  const page = await b.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: scale });
  const tmp = path.join(path.dirname(outFile), `.tmp_${path.basename(outFile)}.html`);
  fs.writeFileSync(tmp, `<!doctype html><html><head><meta charset="utf-8"><style>${fontCSS()} html,body{margin:0;padding:0;background:#fff} svg{display:block}</style></head><body>${svg}</body></html>`);
  await page.goto('file://' + tmp);
  await waitFonts(page);
  await page.screenshot({ path: outFile, type, quality: type === 'jpeg' ? quality : undefined, clip: { x: 0, y: 0, width: w, height: h } });
  await page.close();
  fs.unlinkSync(tmp);
}

module.exports = { fontCSS, getBrowser, close, svgToImage, waitFonts, FONT_DIR };
