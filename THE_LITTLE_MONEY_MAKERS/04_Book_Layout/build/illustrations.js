// Renders every scene to 03_Illustrations/Page_XX/ as editable SVG + 300 DPI PNG/JPEG.
// Usage: node build/illustrations.js [sceneId ...]
const fs = require('fs');
const path = require('path');
const { svgDoc } = require('../src/lib');
const { svgToImage, close } = require('../src/render');
const scenes = Object.assign({}, require('../src/scenes_a'), (() => { try { return require('../src/scenes_b'); } catch (e) { if (e.code !== 'MODULE_NOT_FOUND') throw e; return {}; } })());

const ROOT = path.resolve(__dirname, '../../03_Illustrations');
const ART_WIDTH_IN = { cover: 8.75, back: 8.75, p01: 8.75 }; // full-bleed pieces
const DEFAULT_WIDTH_IN = 7.5; // printed width of an in-page illustration

const ids = Object.keys(scenes).filter((k) => typeof scenes[k] === 'function' && /^(cover|back|p\d\d|w\d)$/.test(k));

(async () => {
  const want = process.argv.slice(2);
  const list = want.length ? ids.filter((i) => want.includes(i)) : ids;
  const meta = fs.existsSync(path.join(ROOT, 'index.json')) ? JSON.parse(fs.readFileSync(path.join(ROOT, 'index.json'))) : {};
  for (const id of list) {
    const s = scenes[id]();
    const dir = path.join(ROOT, id === 'cover' || id === 'back' ? 'Cover_Art' : id[0] === 'w' ? 'Worksheets' : 'Page_' + id.slice(1));
    fs.mkdirSync(dir, { recursive: true });
    const svg = svgDoc(s.w, s.h, s.art, { over: s.over, seed: parseInt(id.slice(1)) || 7 });
    const name = id === 'cover' ? 'front_cover_art' : id === 'back' ? 'back_cover_art' : id[0] === 'w' ? `worksheet_${id.slice(1)}_art` : `page_${id.slice(1)}_illustration`;
    fs.writeFileSync(path.join(dir, name + '.svg'), svg);
    const widthIn = ART_WIDTH_IN[id] || DEFAULT_WIDTH_IN;
    const outW = Math.round(widthIn * 300);
    await svgToImage(svg, s.w, s.h, path.join(dir, name + '.png'), { outW });
    meta[id] = { file: path.relative(ROOT, path.join(dir, name + '.png')), w: s.w, h: s.h, px: [outW, Math.round((outW * s.h) / s.w)], dpi: 300, printWidthIn: widthIn };
    console.log('rendered', id, meta[id].px.join('x'));
  }
  fs.writeFileSync(path.join(ROOT, 'index.json'), JSON.stringify(meta, null, 2));
  await close();
})();
