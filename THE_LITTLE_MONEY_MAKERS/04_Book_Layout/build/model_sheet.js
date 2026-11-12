// Builds the character model sheet (02_Character_Design) used to check consistency.
const path = require('path');
const { P, svgDoc, txt } = require('../src/lib');
const { person } = require('../src/characters');
const { svgToImage, close } = require('../src/render');

const OUT = path.resolve(__dirname, '../../02_Character_Design');

(async () => {
  const W = 2400, H = 1500;
  let c = `<rect width="${W}" height="${H}" fill="${P.cream}"/>`;
  const row1 = [['dad', 'Dad'], ['mum', 'Mum'], ['aarav', 'Aarav (8)'], ['anya', 'Anya (6)'], ['rohan', 'Rohan'], ['kapoor', 'Mrs Kapoor'], ['rao', 'Ms Rao']];
  row1.forEach(([n, label], i) => {
    const x = 170 + i * 340, y = 640;
    c += `<ellipse cx="${x}" cy="${y}" rx="110" ry="14" fill="#000" opacity=".08"/>`;
    c += person(n, { x, y, scale: n === 'dad' || n === 'mum' || n === 'kapoor' || n === 'rao' ? 1.1 : 1.6, pose: i % 2 ? 'wave' : 'down', expr: 'happy' }).svg;
    c += txt(x, y + 60, label, 40);
  });
  const ex = ['happy', 'joy', 'talk', 'surprised', 'sad', 'worried', 'think', 'determined', 'proud'];
  ex.forEach((e, i) => {
    const x = 140 + i * 255, y = 1260;
    c += person('aarav', { x, y, scale: 1.25, expr: e, pose: e === 'think' ? 'think' : e === 'joy' ? 'cheer' : e === 'sad' ? 'sad' : e === 'proud' ? 'hips' : 'down' }).svg;
    c += txt(x, y + 50, e, 34, { weight: 600 });
  });
  c += person('meera', { x: 2290, y: 1260, scale: 1.25 }).svg + person('kabir', { x: 2290 - 0, y: 640, scale: 0.01 }).svg;
  const svg = svgDoc(W, H, c, { seed: 4 });
  await svgToImage(svg, W, H, path.join(OUT, 'model_sheet_preview.png'), { outW: 2400 });
  // second sheet: classmates + sitting modes
  let c2 = '';
  [['meera', 'Meera'], ['kabir', 'Kabir'], ['ishaan', 'Ishaan']].forEach(([n, l], i) => {
    const x = 200 + i * 330; c2 += person(n, { x, y: 620, scale: 1.6, pose: 'hold' }).svg + txt(x, 680, l, 40);
  });
  c2 += person('aarav', { x: 1250, y: 620, scale: 1.6, sit: 'chair', pose: 'write' }).svg + txt(1250, 680, 'sit: chair', 34);
  c2 += person('aarav', { x: 1600, y: 620, scale: 1.6, sit: 'cross', pose: 'hold' }).svg + txt(1600, 680, 'sit: cross', 34);
  c2 += person('dad', { x: 1950, y: 620, scale: 1.0, sit: 'chair', pose: 'point', point: true, expr: 'talk' }).svg;
  c2 += person('anya', { x: 2250, y: 620, scale: 1.6, sit: 'chair', pose: 'cheer', expr: 'joy' }).svg;
  await svgToImage(svgDoc(2400, 760, c2, { seed: 4 }), 2400, 760, path.join(OUT, 'model_sheet_2.png'), { outW: 2400 });
  await close();
})();
