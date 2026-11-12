// Marketing images: cover mockup, interior spread previews, product presentation image.
const fs = require('fs');
const path = require('path');
const { fontCSS, getBrowser, close, waitFonts } = require('../src/render');
const { textPath } = require('../src/typeset');

const ROOT = path.resolve(__dirname, '../..');
const OUT = path.join(ROOT, '09_Marketing_Assets');
const pg = (n) => 'file://' + path.join(ROOT, '06_Kindle_Edition/Kindle_Page_Images_2048px', `page-${String(n).padStart(2, '0')}.jpg`);
const cover = 'file://' + path.join(ROOT, '08_Cover_Design/Ebook_Cover_2560x2560.jpg');
const back = 'file://' + path.join(ROOT, '08_Cover_Design/Back_Cover_8.5in_300dpi.png');

const base = (w, h, body, bg) => `<!doctype html><html><head><meta charset="utf-8"><style>${fontCSS()} html,body{margin:0} body{width:${w}px;height:${h}px;overflow:hidden;position:relative;background:${bg};font-family:'Andika'} .book{position:absolute;transform-style:preserve-3d}
.shadow{position:absolute;border-radius:50%;background:radial-gradient(closest-side,rgba(60,40,20,.35),rgba(60,40,20,0))}</style></head><body>${body}</body></html>`;

function book3d(x, y, size, rot = -24) {
  const t = Math.round(size * 0.02);
  return `<div style="position:absolute;left:${x}px;top:${y}px;width:${size}px;height:${size}px;perspective:${size * 3.2}px">
   <div style="position:absolute;inset:0;transform:rotateY(${rot}deg) rotateX(4deg);transform-style:preserve-3d">
    <div style="position:absolute;left:${-t}px;top:0;width:${t}px;height:${size}px;background:#c94a3e;transform:rotateY(-90deg);transform-origin:right"></div>
    <div style="position:absolute;inset:0;background:url('${cover}') center/cover;border-radius:2px 6px 6px 2px;box-shadow:inset 6px 0 10px rgba(0,0,0,.18), 0 30px 60px rgba(60,40,20,.35)"></div>
    <div style="position:absolute;left:4px;top:0;width:10px;height:100%;background:linear-gradient(90deg,rgba(255,255,255,.35),rgba(0,0,0,.12))"></div>
   </div></div>`;
}

function spread(x, y, w, a, b) {
  const h = w / 2;
  return `<div style="position:absolute;left:${x}px;top:${y}px;width:${w}px;height:${h}px;box-shadow:0 24px 50px rgba(60,40,20,.3);background:#fff">
   <img src="${pg(a)}" style="position:absolute;left:0;top:0;width:50%;height:100%"/><img src="${pg(b)}" style="position:absolute;right:0;top:0;width:50%;height:100%"/>
   <div style="position:absolute;left:44%;width:12%;top:0;height:100%;background:linear-gradient(90deg,rgba(0,0,0,0),rgba(0,0,0,.16) 48%,rgba(255,255,255,.18) 50%,rgba(0,0,0,.1) 52%,rgba(0,0,0,0))"></div></div>`;
}

async function shot(html, file, w, h, scale = 1) {
  const tmp = path.join(__dirname, '.mk.html');
  fs.writeFileSync(tmp, html);
  const b = await getBrowser();
  const p = await b.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: scale });
  await p.goto('file://' + tmp); await waitFonts(p);
  await p.evaluate(() => Promise.all([...document.images].map((i) => i.complete ? 1 : new Promise((r) => { i.onload = i.onerror = r; }))));
  await p.screenshot({ path: file, type: 'jpeg', quality: 90 });
  await p.close(); fs.unlinkSync(tmp);
}

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const soft = 'radial-gradient(circle at 50% 35%, #fff8e8, #f3dfb6)';
  // 1) cover mockup
  await shot(base(1600, 1600, `<div class="shadow" style="left:330px;top:1290px;width:1000px;height:120px"></div>${book3d(330, 260, 1000)}`, soft), path.join(OUT, '01_Front_Cover_Mockup.jpg'), 1600, 1600);
  // 2) interior previews (spreads)
  const pairs = [[2, 3], [6, 7], [14, 15], [24, 25], [30, 31]];
  for (const [i, [a, bb]] of pairs.entries())
    await shot(base(2000, 1150, spread(100, 75, 1800, a, bb), '#f6ead2'), path.join(OUT, `0${i + 2}_Interior_Preview_pages_${a}-${bb}.jpg`), 2000, 1150);
  // 3) product presentation image
  const tilt = (n, x, y, s, r) => `<img src="${pg(n)}" style="position:absolute;left:${x}px;top:${y}px;width:${s}px;height:${s}px;transform:rotate(${r}deg);box-shadow:0 18px 40px rgba(60,40,20,.3);border:6px solid #fff"/>`;
  const head = `<svg style="position:absolute;left:0;top:50px;width:2400px" viewBox="0 0 2400 150">${textPath('Turn big dreams into smart habits!', { x: 1200, y: 105, size: 96, fill: '#e2584a', stroke: '#fff', sw: 10 })}</svg>`;
  const pts = ['28-page illustrated story', 'Saving, budgeting &amp; goal setting', 'Habits, leadership &amp; kindness', '6 printable worksheets', 'Parent discussion guide', 'For ages 6–10'];
  const list = `<div style="position:absolute;left:1430px;top:1050px;width:830px;background:rgba(255,255,255,.92);border:4px solid #3b2a20;border-radius:30px;padding:28px 40px;font:600 40px/1.5 'Baloo 2'">${pts.map((t) => `<div>✔&#xFE0E; ${t}</div>`).join('').replace(/✔&#xFE0E;/g, '<span style="color:#3f8f4f">●</span>')}</div>`;
  const body = head + tilt(14, 1500, 250, 640, 7) + tilt(30, 1830, 520, 520, -5) + tilt(7, 1450, 560, 520, -9) + `<div class="shadow" style="left:120px;top:1450px;width:1200px;height:130px"></div>` + book3d(170, 330, 1150, -18) + list;
  await shot(base(2400, 1800, body, 'radial-gradient(circle at 40% 40%, #fffaf0, #f2d9a8)'), path.join(OUT, '07_Product_Presentation.jpg'), 2400, 1800);
  // 4) back + front side by side
  await shot(base(2200, 1150, `<img src="${back}" style="position:absolute;left:80px;top:75px;width:1000px;box-shadow:0 20px 40px rgba(0,0,0,.25)"/><img src="${cover}" style="position:absolute;left:1120px;top:75px;width:1000px;box-shadow:0 20px 40px rgba(0,0,0,.25)"/>`, '#f6ead2'), path.join(OUT, '08_Front_and_Back_Covers.jpg'), 2200, 1150);
  await close();
  console.log(fs.readdirSync(OUT));
})();
