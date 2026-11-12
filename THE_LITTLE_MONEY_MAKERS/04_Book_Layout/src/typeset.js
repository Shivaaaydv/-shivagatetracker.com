// Display lettering as vector outlines (HarfBuzz-shaped), used for the title page and covers.
const path = require('path');
const { execFileSync } = require('child_process');
const FONTS = {
  b800: path.resolve(__dirname, '../fonts/baloo-2-latin-800-normal.woff2'),
  b700: path.resolve(__dirname, '../fonts/baloo-2-latin-700-normal.woff2'),
  b600: path.resolve(__dirname, '../fonts/baloo-2-latin-600-normal.woff2'),
};
const cache = new Map();
function shape(text, font, size, ls = 0) {
  const k = [text, font, size, ls].join('|');
  if (!cache.has(k)) {
    const out = execFileSync('python3', ['-I', path.resolve(__dirname, '../build/textpath.py')], { input: JSON.stringify([{ font: FONTS[font], text, size, ls }]) });
    cache.set(k, JSON.parse(out)[0]);
  }
  return cache.get(k);
}
// returns an SVG <path> for text with its baseline at y; anchor 'middle' | 'start' | 'end'
function textPath(text, { x = 0, y = 0, size = 40, font = 'b800', anchor = 'middle', fill = '#3b2a20', stroke, sw = 0, ls = 0 } = {}) {
  const s = shape(text, font, size, ls);
  const dx = anchor === 'middle' ? -s.width / 2 : anchor === 'end' ? -s.width : 0;
  const st = stroke ? ` stroke="${stroke}" stroke-width="${sw}" stroke-linejoin="round" paint-order="stroke"` : '';
  return `<path transform="translate(${(x + dx).toFixed(2)} ${y})" d="${s.d}" fill="${fill}"${st}/>`;
}
module.exports = { textPath, shape };
